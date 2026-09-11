<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import GithubIcon from '$lib/icons/github-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import SteamIcon from '$lib/icons/steam-icon.svelte';
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import PlayIcon from '$lib/icons/play-icon.svelte';
	import PauseIcon from '$lib/icons/pause-icon.svelte';

	const sources = [
		{
			name: 'Strava',
			api: 'Strava + Hevy',
			icon: StravaIcon,
			endpoint: '/workouts',
			data: 'Workouts',
			trigger: 'On activity changes',
			detail: 'A Strava webhook triggers a refresh of workout data from Strava and Hevy.',
			processing: 'Fetch activities and lifts, then combine them into one workout feed.'
		},
		{
			name: 'GitHub',
			api: 'GitHub API',
			icon: GithubIcon,
			endpoint: '/github',
			data: 'Projects',
			trigger: 'Every 5 seconds',
			detail: 'A background loop waits 5 seconds between GitHub refreshes.',
			processing: 'Fetch pinned repositories and prepare the project data.'
		},
		{
			name: 'Apple Music',
			api: 'Apple Music API',
			icon: AppleMusicIcon,
			endpoint: '/applemusic',
			data: 'Music',
			trigger: 'Every 10 seconds',
			detail: 'A background loop waits 10 seconds between Apple Music refreshes.',
			processing: 'Fetch listening history and playlists, then prepare the music data.'
		},
		{
			name: 'Steam',
			api: 'Steam API',
			icon: SteamIcon,
			endpoint: '/steam',
			data: 'Games',
			trigger: 'Every 10 minutes',
			detail: 'A background loop waits 10 minutes between Steam refreshes.',
			processing: 'Fetch games and their achievements, then combine the responses.'
		}
	];

	type Flow = 'refresh' | 'request';
	let selectedSource = $state(0);
	let flow = $state<Flow>('refresh');
	let step = $state(-1);
	let playing = $state(false);
	let progress = $state(0);
	let visible = $state(false);
	let pageVisible = $state(true);
	let reducedMotion = $state(false);
	let graph = $state<HTMLDivElement>();
	const stepDuration = 6000;
	const packetDuration = 700;
	const packetDelay = 150;
	const fetchOffsets = [0, 500, 1000];
	const running = $derived(playing && visible && pageVisible);
	const source = $derived(sources[selectedSource]);
	const steps = $derived(
		flow === 'refresh'
			? [
					{ title: 'Trigger a refresh', description: source.detail },
					{ title: 'Fetch & process', description: source.processing },
					{
						title: 'Update the snapshot',
						description:
							'If the data changed, lcp replaces the snapshot under a mutex lock and saves a copy to disk.'
					},
					{
						title: 'Stream the change',
						description:
							'Connected browsers receive the updated snapshot through server-sent events (SSE).'
					}
				]
			: [
					{
						title: 'Request the data',
						description: `When the page loads, the website server requests GET ${source.endpoint} from lcp.`
					},
					{
						title: 'Read from memory',
						description:
							'lcp reads the existing snapshot from protected memory. No upstream API request is needed.'
					},
					{
						title: 'Return the JSON',
						description:
							'The response contains the cached data and the timestamp of its last change.'
					},
					{
						title: 'Render the page',
						description: `The website displays the ${source.data.toLowerCase()} from the cache. Background refreshes run independently.`
					}
				]
	);
	const refreshing = $derived(flow === 'refresh' && step >= 0);
	const requesting = $derived(flow === 'request' && step >= 0);

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		function updateMotionPreference() {
			reducedMotion = motion.matches;
			if (reducedMotion) playing = false;
		}
		function updatePageVisibility() {
			pageVisible = !document.hidden;
		}

		updateMotionPreference();
		updatePageVisibility();
		if (!reducedMotion) {
			step = 0;
			playing = true;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		if (graph) observer.observe(graph);
		motion.addEventListener('change', updateMotionPreference);
		document.addEventListener('visibilitychange', updatePageVisibility);

		return () => {
			observer.disconnect();
			motion.removeEventListener('change', updateMotionPreference);
			document.removeEventListener('visibilitychange', updatePageVisibility);
		};
	});

	$effect(() => {
		if (!running) return;
		let previousTime: number | undefined;
		let frame: number;

		function advance(time: number) {
			if (previousTime !== undefined) {
				progress += Math.min(time - previousTime, 64) / stepDuration;
				if (progress >= 1) {
					if (reducedMotion && step === steps.length - 1) {
						progress = 1;
						playing = false;
						return;
					}
					step = (step + 1) % steps.length;
					progress %= 1;
				}
			}
			previousTime = time;
			frame = requestAnimationFrame(advance);
		}

		frame = requestAnimationFrame(advance);
		return () => cancelAnimationFrame(frame);
	});

	function reset() {
		step = playing ? 0 : -1;
		progress = 0;
	}

	function togglePlayback() {
		if (playing) {
			playing = false;
			return;
		}
		if (step === -1 || progress === 1) {
			step = 0;
			progress = 0;
		}
		playing = true;
	}

	function packetProgress(delay = packetDelay) {
		return Math.max(0, Math.min(1, (progress * stepDuration - delay) / packetDuration));
	}
</script>

<figure
	class="system-diagram"
	style:--progress={packetProgress()}
	aria-label="How lcp refreshes and serves cached data"
>
	<div class="sources" role="group" aria-label="Data source">
		{#each sources as item, index (item.name)}
			<button
				class="source-button"
				aria-pressed={selectedSource === index}
				onclick={() => {
					selectedSource = index;
					reset();
				}}
			>
				<span class="source-icon" aria-hidden="true"><item.icon /></span>
				<span>{item.name}<small>{item.trigger}</small></span>
			</button>
		{/each}
	</div>

	<div class="flow-controls">
		<div class="flows" role="group" aria-label="Data flow">
			<button
				aria-pressed={flow === 'refresh'}
				onclick={() => {
					flow = 'refresh';
					reset();
				}}>Cache refresh</button
			>
			<button
				aria-pressed={flow === 'request'}
				onclick={() => {
					flow = 'request';
					reset();
				}}>Page request</button
			>
		</div>
		<span class="simulation-label">Interactive walkthrough</span>
	</div>

	<div class="graph" bind:this={graph}>
		<div class="node upstream" class:active={refreshing && step < 2}>
			<span class="node-label">Upstream</span>
			<span class="api-icon" aria-hidden="true"><source.icon /></span>
			<strong>{source.api}</strong>
			<span class="node-detail">{source.trigger}</span>
		</div>

		<div class="connection" class:muted={flow === 'request'}>
			<div class="route reverse" class:active={refreshing && step === 1}>
				<span>Fetches</span>
				<div class="track">
					{#each fetchOffsets as offset (offset)}
						<span class="packet" style:--progress={packetProgress(packetDelay + offset)}></span>
					{/each}
				</div>
			</div>
			<div class="route" class:active={refreshing && step === 1}>
				<div class="track">
					{#each fetchOffsets as offset (offset)}
						<span
							class="packet"
							style:--progress={packetProgress(packetDuration + packetDelay * 2 + offset)}
						></span>
					{/each}
				</div>
				<span>Process data</span>
			</div>
		</div>

		<div
			class="node cache"
			class:active={(refreshing && (step === 1 || step === 2)) || (requesting && step === 1)}
		>
			<span class="node-label">lcp</span>
			<div class="memory" class:updated={refreshing && step >= 2} aria-hidden="true">
				<span></span><span></span><span></span>
			</div>
			<strong>{source.data} cache</strong>
			<span class="node-detail">Protected memory</span>
			<span class="snapshot"
				>{refreshing && step >= 2 ? 'New snapshot saved' : 'Snapshot ready'}</span
			>
		</div>

		<div class="connection delivery">
			<div class="route reverse" class:active={requesting && step === 0}>
				<span>GET {source.endpoint}</span>
				<div class="track"><span class="packet"></span></div>
			</div>
			<div class="route" class:active={(refreshing && step === 3) || (requesting && step === 2)}>
				<div class="track"><span class="packet"></span></div>
				<span>{flow === 'refresh' ? 'SSE update' : 'Cached JSON'}</span>
			</div>
		</div>

		<div class="node website" class:active={step === 3 || (requesting && step === 0)}>
			<span class="node-label">Website</span>
			<div class="mini-page" class:updated={step === 3} aria-hidden="true">
				<div class="mini-toolbar"><i></i><i></i><i></i></div>
				<div class="mini-content"><span></span><span></span><span></span></div>
			</div>
			<strong>mattglei.ch</strong>
			<span class="node-detail">{source.data} section</span>
		</div>
	</div>

	<div class="walkthrough">
		<div class="playback">
			<button class="play-button" onclick={togglePlayback}>
				<span aria-hidden="true"
					>{#if playing}<PauseIcon />{:else}<PlayIcon />{/if}</span
				>
				{playing ? 'Pause' : progress === 1 ? 'Replay' : step < 0 ? 'Play' : 'Resume'}
			</button>
			<div class="steps" role="group" aria-label="Walkthrough steps">
				{#each steps as item, index (item.title)}
					<button
						aria-label={`Step ${index + 1}: ${item.title}`}
						aria-pressed={step === index}
						class:complete={step > index}
						onclick={() => {
							playing = false;
							step = index;
							progress = 0;
						}}>{index + 1}</button
					>
				{/each}
			</div>
		</div>
		<div
			class="explanation"
			role="status"
			aria-live={playing ? 'off' : 'polite'}
			aria-atomic="true"
		>
			{#key `${selectedSource}-${flow}-${step}`}
				<div class="explanation-content" transition:fade={{ duration: reducedMotion ? 0 : 240 }}>
					<strong
						>{step < 0 ? 'Refresh in the background. Read from memory.' : steps[step].title}</strong
					>
					<p>
						{step < 0
							? 'Choose a flow and press play, or select a step to follow the data.'
							: steps[step].description}
					</p>
				</div>
			{/key}
		</div>
	</div>
	<div
		class="step-progress"
		role="progressbar"
		aria-label="Current step progress"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(progress * 100)}
	>
		<span style:transform={`scaleX(${progress})`}></span>
	</div>
	<figcaption>
		{flow === 'refresh'
			? 'Only changed data is saved and streamed. If an API fails, the previous snapshot stays available.'
			: 'A page request only reads the cache. It does not trigger a refresh of the upstream APIs.'}
		<span>Timing is illustrative.</span>
	</figcaption>
</figure>

<style>
	.system-diagram {
		--muted: color-mix(in srgb, var(--foreground) 66%, var(--background));
		--transition: 450ms ease;
		margin: 20px 0;
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		font-size: 14px;
	}

	button {
		font: inherit;
		color: inherit;
		box-shadow: none;
		cursor: pointer;
	}

	button:focus-visible {
		outline: 2px solid var(--blue-foreground);
		outline-offset: -3px;
	}

	.sources {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		border-bottom: 1px solid var(--border);
	}

	.source-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 16px 8px;
		border: 0;
		border-bottom: 2px solid transparent;
		border-radius: 0;
		background: transparent;
		text-align: left;
	}

	.source-button[aria-pressed='true'] {
		border-bottom-color: var(--green-foreground);
		background: var(--green-background);
	}

	small {
		display: block;
		margin-top: 3px;
		font-size: 11px;
		color: var(--muted);
	}

	.source-icon,
	.api-icon {
		display: block;
		width: 23px;
		height: 23px;
		flex-shrink: 0;
	}

	.source-icon :global(svg),
	.api-icon :global(svg),
	.play-button :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.flow-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 20px 20px 0;
	}

	.flows {
		display: flex;
		gap: 4px;
	}

	.flows button {
		padding: 7px 10px;
		border: 1px solid transparent;
		border-radius: 5px;
		background: transparent;
		color: var(--muted);
	}

	.flows button[aria-pressed='true'] {
		border-color: var(--border);
		background: var(--section-name-background-color);
		color: var(--foreground);
	}

	.simulation-label {
		font-size: 12px;
		color: var(--muted);
	}

	.graph {
		display: grid;
		grid-template-columns: 1fr minmax(90px, 0.7fr) 1.15fr minmax(116px, 0.8fr) 1fr;
		align-items: center;
		padding: 34px 24px;
	}

	.node {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		min-width: 0;
		padding: 16px 8px;
		border: 1px solid var(--border);
		border-radius: 6px;
		text-align: center;
		transition:
			border-color var(--transition),
			background-color var(--transition);
	}

	.node-label {
		font-size: 12px;
		color: var(--muted);
		margin-bottom: 6px;
	}

	.api-icon {
		width: 38px;
		height: 38px;
		margin: 2px 0 8px;
	}

	.node strong {
		font-size: 15px;
	}

	.node-detail {
		font-size: 12px;
		color: var(--muted);
	}

	.cache {
		border-color: var(--green-border);
		background: color-mix(in srgb, var(--green-background) 45%, var(--background));
	}

	.cache .node-label {
		font-family: 'Inter', 'Inter Fallback', sans-serif;
		font-size: 21px;
		font-weight: 700;
		color: var(--foreground);
	}

	.snapshot {
		margin-top: 4px;
		color: var(--green-foreground);
		font-size: 11px;
	}

	.memory {
		display: grid;
		gap: 4px;
		width: 62px;
		margin-bottom: 8px;
	}

	.memory span {
		height: 9px;
		border: 1px solid var(--green-border);
		border-radius: 2px;
		background: var(--green-background);
		transition: border-color var(--transition);
	}

	.memory span::before {
		content: '';
		display: block;
		width: 3px;
		height: 3px;
		margin: 3px 5px;
		border-radius: 50%;
		background: var(--green-foreground);
	}

	.memory.updated span {
		border-color: var(--green-foreground);
	}

	.connection {
		display: grid;
		gap: 18px;
		color: var(--muted);
		transition: opacity var(--transition);
	}

	.connection.muted {
		opacity: 0.4;
	}

	.route {
		display: grid;
		gap: 8px;
		text-align: center;
		font-size: 11px;
		transition: color var(--transition);
	}

	.track {
		position: relative;
		height: 1px;
		background: var(--border);
		transition: background-color var(--transition);
	}

	.track::after {
		content: '';
		position: absolute;
		top: -3px;
		right: 1px;
		width: 6px;
		height: 6px;
		border-top: 1px solid var(--muted);
		border-right: 1px solid var(--muted);
		transform: rotate(45deg);
		transition: border-color var(--transition);
	}

	.reverse .track {
		transform: rotate(180deg);
	}

	.route.active {
		color: var(--green-foreground);
	}

	.route.active .track {
		background: var(--green-foreground);
	}

	.route.active .track::after {
		border-color: var(--green-foreground);
	}

	.packet {
		position: absolute;
		left: 0;
		top: -3px;
		width: calc(100% - 7px);
		height: 7px;
		opacity: 0;
		transform: translateX(calc(var(--progress) * 100%));
		pointer-events: none;
	}

	.packet::before {
		content: '';
		display: block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--green-foreground);
		box-shadow: 0 0 8px var(--green-foreground);
	}

	.route.active .packet {
		opacity: clamp(0, min(var(--progress) * 8, (1 - var(--progress)) * 8), 1);
	}

	.node.active {
		border-color: var(--green-foreground);
		background-color: var(--green-background);
	}

	.mini-page {
		width: 66px;
		margin: 0 0 7px;
		border: 1px solid var(--muted);
		border-radius: 3px;
		overflow: hidden;
	}

	.mini-toolbar {
		display: flex;
		gap: 3px;
		padding: 5px;
		border-bottom: 1px solid var(--border);
	}

	.mini-toolbar i {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--muted);
	}

	.mini-content {
		display: grid;
		gap: 4px;
		padding: 7px;
	}

	.mini-content span {
		height: 3px;
		background: var(--border);
		transition: background-color var(--transition);
	}

	.mini-content span:last-child {
		width: 65%;
	}

	.updated .mini-content span {
		background: var(--green-foreground);
	}

	.walkthrough {
		display: flex;
		align-items: center;
		gap: 24px;
		padding: 20px;
		border-top: 1px solid var(--border);
		background: color-mix(in srgb, var(--foreground) 3%, var(--background));
	}

	.playback {
		display: grid;
		gap: 12px;
		flex-shrink: 0;
	}

	.play-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 8px 14px;
		border: 1px solid var(--green-border);
		border-radius: 5px;
		background: var(--green-background);
		color: var(--green-foreground);
	}

	.play-button > span {
		width: 22px;
		height: 22px;
	}

	.steps {
		display: flex;
		gap: 6px;
	}

	.steps button {
		width: 28px;
		height: 28px;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--background);
		color: var(--muted);
		font-size: 12px;
		transition:
			color var(--transition),
			border-color var(--transition),
			background-color var(--transition);
	}

	.steps button[aria-pressed='true'] {
		border-color: var(--green-foreground);
		color: var(--green-foreground);
		background: var(--green-background);
	}

	.steps button.complete {
		border-color: var(--green-border);
		color: var(--green-foreground);
	}

	button:hover {
		background-color: color-mix(in srgb, var(--foreground) 8%, var(--background));
	}

	.explanation {
		display: grid;
		min-height: 72px;
		line-height: 1.5;
	}

	.explanation-content {
		grid-area: 1 / 1;
	}

	.explanation p {
		margin-top: 5px;
		color: var(--muted);
		font-size: 13px;
	}

	.step-progress {
		height: 2px;
		background: var(--green-background);
	}

	.step-progress span {
		display: block;
		height: 100%;
		background: var(--green-foreground);
		transform-origin: left;
	}

	figcaption {
		padding: 12px 20px;
		border-top: 1px solid var(--border);
		color: var(--muted);
		font-size: 11px;
		line-height: 1.6;
	}

	figcaption span {
		white-space: nowrap;
	}

	@media (max-width: 750px) {
		.sources {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.source-button {
			justify-content: flex-start;
			padding: 12px 16px;
		}

		.simulation-label {
			display: none;
		}

		.graph {
			grid-template-columns: minmax(0, 1fr);
			justify-items: center;
			padding: 20px;
		}

		.node {
			display: grid;
			grid-template-columns: 64px minmax(0, 1fr);
			gap: 4px 12px;
			box-sizing: border-box;
			width: min(100%, 320px);
			padding: 12px;
			text-align: left;
		}

		.node-label,
		.node strong,
		.node-detail,
		.snapshot {
			grid-column: 2;
			margin: 0;
		}

		.api-icon,
		.memory,
		.mini-page {
			grid-column: 1;
			grid-row: 1 / span 4;
			justify-self: center;
			margin: 0;
		}

		.mini-page {
			width: 60px;
		}

		.connection {
			display: flex;
			justify-content: center;
			gap: 44px;
			height: 72px;
			width: 100%;
		}

		.route {
			position: relative;
			display: block;
			width: 1px;
		}

		.track {
			position: absolute;
			top: 0;
			left: 0;
			width: 72px;
			transform: rotate(90deg);
			transform-origin: 0 0;
		}

		.reverse .track {
			top: 72px;
			transform: rotate(-90deg);
		}

		.route > span {
			position: absolute;
			top: 50%;
			left: 12px;
			width: max-content;
			transform: translateY(-50%);
		}

		.reverse > span {
			left: auto;
			right: 12px;
		}

		.walkthrough {
			flex-direction: column;
			align-items: stretch;
			gap: 16px;
		}

		.playback {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.play-button {
			min-width: 94px;
		}

		.explanation {
			min-height: 100px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.system-diagram {
			--transition: 0s;
		}

		.packet {
			display: none;
		}
	}
</style>
