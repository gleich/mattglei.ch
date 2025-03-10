<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	export interface Source {
		name: string;
		icon: Component;
		url: string;
		iconLeftMargin: string;
		iconRightMargin: string;
	}

	export interface LiveData {
		sources: Source[];
		updated: Date;
	}

	const { name, children, liveData }: { name: string; children: Snippet; liveData?: LiveData } =
		$props();
</script>

<section id={name.toLowerCase()}>
	<div class="header-container">
		<h2 class="section-name">{name}</h2>
		{#if liveData}
			<div class="live-sources">
				<span class="live-circle"></span>
				<p class="live-from">LIVE FROM</p>
				{#each liveData.sources as source, index}
					<a class="live-source" href={source.url} target="_blank">
						<div
							class="live-source-icon"
							style={`margin-left: ${source.iconLeftMargin}; margin-right: ${source.iconRightMargin}`}
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
	{@render children()}
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
	}

	.section-name {
		font-size: 1.5rem;
		color: var(--background);
		background-color: var(--foreground);
		padding: 2px 15px;
		border-bottom-right-radius: var(--border-radius);
		font-family: 'Inter';
		font-weight: 800;
	}

	.live-sources {
		background-color: var(--red-background);
		border-bottom-left-radius: var(--border-radius);
		display: flex;
		align-items: center;
		padding: 0px 10px;
		font-family: 'IBM Plex Mono';
	}

	.live-circle {
		width: 7px;
		height: 7px;
		margin-right: 13px;
		margin-left: 5px;
		background-color: var(--red-foreground);
		border-radius: 50%;
		animation: dot-blink 0.4s linear alternate infinite;
	}

	.live-from {
		color: var(--red-foreground);
	}

	.live-from,
	.live-source-name {
		font-size: 14.5px;
	}

	.live-source {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--red-foreground);
	}

	.live-source-icon {
		width: 17px;
		height: 17px;
	}

	.live-source-separator {
		padding-left: 8px;
		color: var(--red-foreground);
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
