<script lang="ts">
	import { fromNow } from '$lib/time';
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
		updated: Date;
	}

	const { name, liveData, children }: { name: string; liveData?: LiveData; children: Snippet } =
		$props();

	const updated = dayjs(liveData?.updated);
	let now = $state(dayjs());
	onMount(() => {
		const interval = setInterval(() => {
			now = dayjs();
		}, 10);
		return () => clearInterval(interval);
	});
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
		<div class="updated-container">
			Data cached & processed by [{fromNow(updated, now)}]
		</div>
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
	}

	.section-name::selection {
		color: var(--foreground);
		background-color: var(--background);
	}

	.live {
		background-color: var(--red-background);
		border-bottom-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		border: 1px solid var(--red-border);
		display: flex;
		align-items: center;
		padding: 5px 10px;
		font-family: 'IBM Plex Mono';
		font-weight: 600;
		height: fit-content;
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
		font-size: 13.5px;
	}

	.live-source {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--red-foreground);
	}

	.live-source-icon {
		width: 16px;
		height: 16px;
		margin-bottom: 1px;
	}

	.live-source-separator {
		padding-left: 8px;
		color: var(--red-foreground);
	}

	.children {
		padding: 10px;
	}

	.updated-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		color: var(--green-foreground);
		background: var(--green-background);
		border: 1px solid var(--green-border);
		font-family: 'IBM Plex Mono';
		font-weight: 500;
		font-size: 13.5px;
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}

	@media (max-width: 500px) {
		.live-source-icon {
			display: none;
		}
		.live-source-separator {
			padding-left: 0px;
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
