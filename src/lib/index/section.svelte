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
					Data <span class="updated-detailed">&nbsp;cached & processed&nbsp;</span><span
						class="updated-concise">&nbsp;updated&nbsp;</span
					>
					by&nbsp;<a href="/writing/lcp" class="lcp-link">lcp</a>&nbsp;<span
						class="updated-detailed">[</span
					><Since time={liveData.updated} /><span class="updated-detailed">]</span>
				{:else}
					loading
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
		font-family: 'IBM Plex Mono';
		font-weight: 500;
		height: 28px;
		flex-grow: 0;
		overflow: hidden;
	}

	.live-word {
		font-size: inherit;
		animation: blink 1s ease infinite;
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
		padding: 5px;
		color: var(--green-foreground);
		background: var(--green-background);
		border-top: 1px solid var(--green-border);
		font-family: 'IBM Plex Mono';
		font-weight: 500;
		font-size: 13.5px;
		margin-top: 5px;
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

		.updated-detailed {
			display: none;
		}

		.updated-concise {
			display: block;
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
		80%,
		100% {
			opacity: 30%;
		}
	}

	@keyframes blink {
		0%,
		70% {
			opacity: 100%;
		}
		80%,
		100% {
			opacity: 30%;
		}
	}
</style>
