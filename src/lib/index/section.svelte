<script lang="ts">
	import Since from '$lib/time/since.svelte';
	import { Card } from '@gleich/ui';
	import { type Component, type Snippet } from 'svelte';

	export interface Source {
		name: string;
		icon: Component;
		url: string;
		iconLeftMargin?: string;
		iconRightMargin?: string;
	}

	export interface LiveData {
		sources: Source[];
		updated?: Date;
	}

	const { name, liveData, children }: { name: string; liveData?: LiveData; children: Snippet } =
		$props();
</script>

<Card padding="0">
	<section id={name.toLowerCase()}>
		<div class="header-container">
			<h3 class="section-name">{name}</h3>
			{#if liveData}
				<div class="live">
					<p class="live-from"><span class="live-word">LIVE</span> FROM</p>
					{#each liveData.sources as source, index (source.name)}
						<a class="live-source" href={source.url} target="_blank">
							<div
								class="live-source-icon"
								style={`margin-left: ${source.iconLeftMargin ?? '10px'}; margin-right: ${source.iconRightMargin ?? '9px'}`}
							>
								<source.icon />
							</div>
							<p class="live-source-name">{source.name.toUpperCase()}</p>
						</a>
						{#if index + 1 != liveData.sources.length}
							<p class="live-source-separator">/</p>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="children">
			{@render children()}
		</div>
		{#if liveData}
			<p class="updated-container">
				{#if liveData.updated}
					<svg
						class="satellite-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path class="satellite-dot" d="M5 19V15.5A3.5 3.5 0 0 1 8.5 19Z" />
						<path class="satellite-wave satellite-wave-1" d="M5 11A8 8 0 0 1 13 19" />
						<path class="satellite-wave satellite-wave-2" d="M5 7A12 12 0 0 1 17 19" />
						<path class="satellite-wave satellite-wave-3" d="M5 3A16 16 0 0 1 21 19" />
					</svg>
					Cached by&nbsp;<a href="/writing/lcp" class="lcp-link">lcp</a>&nbsp;[<Since
						time={liveData.updated}
					/>]
				{:else}
					<span class="loading"> loading </span>
				{/if}
			</p>
		{/if}
	</section>
</Card>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
	}

	.section-name {
		background-color: var(--section-name-background-color);
		border: 1px solid var(--border);
		border-top: 0;
		border-left: 0;
		padding: 2px 15px;
		padding-bottom: 3px;
		border-bottom-right-radius: var(--border-radius);
		box-shadow: inset 0px 0px 6px var(--box-shadow-color);
	}

	.live {
		background-color: var(--red-background);
		border-bottom-left-radius: var(--border-radius);
		border-left: 1px solid var(--red-border);
		border-bottom: 1px solid var(--red-border);
		display: flex;
		align-items: center;
		padding: 4px 15px;
		padding-right: 12px;
		font-family: 'IBM Plex Mono', 'IBM Plex Mono Fallback', monospace;
		font-weight: 500;
		height: 28px;
		flex-grow: 0;
		overflow: hidden;
	}

	.live-word {
		font-size: inherit;
		animation: blink 1s ease-in-out infinite;
	}

	.live-from {
		color: var(--red-foreground);
		flex-grow: 0;
	}

	.live-from,
	.live-source-name {
		font-size: 13.5px;
	}

	.live-source {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--red-foreground);
	}

	.live-source-icon {
		width: 14.5px;
		height: 14.5px;
		display: flex;
	}

	.live-source-separator {
		padding-left: 8px;
		color: var(--red-foreground);
	}

	.children {
		padding: 10px;
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.updated-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		color: var(--green-foreground);
		background: var(--green-background);
		border-top: 1px solid var(--green-border);
		font-family: 'IBM Plex Mono', 'IBM Plex Mono Fallback', monospace;
		font-weight: 500;
		font-size: 13.5px;
	}

	.satellite-icon {
		width: 18px;
		height: 18px;
		color: var(--green-foreground);
		margin-right: 8px;
		flex-shrink: 0;
		overflow: visible;
	}

	.satellite-dot {
		fill: currentColor;
	}

	.satellite-wave {
		will-change: opacity;
		animation: satellite-pulse 2.1s ease-in-out infinite;
	}

	.satellite-wave-2 {
		animation-delay: 0.3s;
	}

	.satellite-wave-3 {
		animation-delay: 0.6s;
	}

	.lcp-link {
		color: inherit;
		font-size: inherit;
	}

	.loading {
		line-height: 20px;
	}

	@media (max-width: 450px) {
		.children {
			padding: 5px;
		}

		.section-name {
			padding-top: 3px;
			padding-bottom: 4px;
		}

		.live {
			padding-top: 2px;
			padding-bottom: 3px;
			padding-left: 10px;
			padding-right: 5px;
		}

		.live-source-icon {
			display: none;
		}

		.live-from::after {
			content: '\00a0';
		}

		.live-source-separator {
			padding-left: 0px;
		}

		.updated-container {
			margin-top: 10px;
		}

		.satellite-icon {
			display: none;
		}
	}

	@media (max-width: 370px) {
		.section-name {
			padding-left: 8px;
			padding-right: 8px;
			box-shadow: inset 0px 0px 4px var(--box-shadow-color);
		}
	}

	@-webkit-keyframes blink {
		0%,
		70% {
			opacity: 100%;
		}
		100% {
			opacity: 30%;
		}
	}

	@keyframes blink {
		0%,
		70% {
			opacity: 100%;
		}
		100% {
			opacity: 30%;
		}
	}

	@keyframes satellite-pulse {
		0% {
			opacity: 0.4;
		}
		20% {
			opacity: 1;
		}
		45%,
		100% {
			opacity: 0.4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.satellite-wave {
			animation: none;
		}
	}
</style>
