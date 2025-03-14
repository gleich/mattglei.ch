<script lang="ts">
	import { fromNow } from '$lib/time';
	import TimeSince from '$lib/time-since.svelte';
	import dayjs from 'dayjs';
	import { onMount, type Component, type Snippet } from 'svelte';

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

<section id={name.toLowerCase()}>
	<div class="header-container">
		<h2 class="section-name">{name}</h2>
		{#if liveData}
			<div class="live">
				<span class="live-circle"></span>
				<p class="live-from">LIVE FROM</p>
				{#each liveData.sources as source, index}
					<a class="live-source" href={source.url} target="_blank">
						<div
							class="live-source-icon"
							style={`margin-left: ${source.iconLeftMargin ?? '10px'}; margin-right: ${source.iconRightMargin ?? '9px'}`}
						>
							<source.icon color={'var(--red-foreground)'} />
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
				Data <span class="updated-detailed">&nbsp;cached & processed&nbsp;</span><span
					class="updated-concise">&nbsp;updated&nbsp;</span
				>
				by&nbsp;<a href="/lcp" class="lcp-link">lcp</a>&nbsp;<span class="updated-detailed">[</span
				><TimeSince time={liveData.updated} /><span class="updated-detailed">]</span>
			{:else}
				loading
			{/if}
		</p>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		margin-bottom: 20px;
		width: 100%;
		border-radius: var(--border-radius);
		border: 1px solid var(--border);
		box-shadow: var(--box-shadow);
		background-color: var(--real-background);
		overflow: hidden;
	}

	.header-container {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.section-name {
		color: var(--background);
		background-color: var(--foreground);
		padding: 2px 15px;
		border-bottom-right-radius: var(--border-radius);
		font-family: 'Inter';
		font-weight: 800;
		height: fit-content;
	}

	.section-name::selection {
		color: var(--foreground);
		background-color: var(--background);
	}

	.live {
		background-color: var(--red-background);
		border-bottom-left-radius: var(--border-radius);
		border-left: 1px solid var(--red-border);
		border-bottom: 1px solid var(--red-border);
		display: flex;
		align-items: center;
		padding: 5px 10px;
		font-family: 'IBM Plex Mono';
		font-weight: 600;
		height: fit-content;
		overflow: hidden;
	}

	.live-circle {
		width: 7px;
		height: 7px;
		margin-right: 12px;
		margin-left: 4px;
		background-color: var(--red-foreground);
		border-radius: 50%;
		animation: dot-blink 0.4s linear alternate infinite;
	}

	.live-from {
		color: var(--red-foreground);
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
		width: 15px;
		height: 15px;
		margin-bottom: 2.5px;
	}

	.live-source-separator {
		padding-left: 8px;
		color: var(--red-foreground);
	}

	.children {
		padding: 10px;
		padding-top: 20px;
		padding-bottom: 10px;
	}

	.updated-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		color: var(--green-foreground);
		background: var(--green-background);
		border-top: 1px solid var(--green-border);
		font-family: 'IBM Plex Mono';
		font-weight: 500;
		font-size: 13.5px;
	}

	.lcp-link {
		color: inherit;
		font-size: inherit;
	}

	.updated-detailed,
	.updated-concise {
		font-size: inherit;
	}

	.updated-concise {
		display: none;
	}

	@media (max-width: 450px) {
		.live {
			padding-top: 3px;
			padding-bottom: 3px;
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

		.updated-detailed {
			display: none;
		}

		.updated-concise {
			display: block;
		}
	}

	@media (max-width: 370px) {
		.live-circle {
			display: none;
		}

		.section-name {
			padding-left: 8px;
			padding-right: 8px;
		}
	}

	@-webkit-keyframes dot-blink {
		0% {
			opacity: 20%;
		}
		50% {
			opacity: 100%;
		}
		100% {
			opacity: 100%;
		}
	}

	@keyframes dot-blink {
		0% {
			opacity: 20%;
		}
		50% {
			opacity: 100%;
		}
		100% {
			opacity: 100%;
		}
	}
</style>
