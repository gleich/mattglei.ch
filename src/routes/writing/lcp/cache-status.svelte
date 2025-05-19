<script lang="ts">
	import RefreshIcon from '$lib/icons/refresh-icon.svelte';
	import Since from '$lib/time/since.svelte';
	import { Card } from '@gleich/ui';

	const {
		name,
		updated,
		updateFrequency
	}: { name: string; updated?: Date; updateFrequency: string } = $props();
</script>

<Card padding="0">
	<div class="container">
		<div class="header">
			<p class="cache-name">{name} Cache</p>
			{#if updated}
				<p class="online">ONLINE</p>
			{:else}
				<p class="offline">OFFLINE</p>
			{/if}
		</div>
	</div>
	<div class="refresh">
		<div class="refresh-icon">
			<RefreshIcon />
		</div>
		<p>{updateFrequency}</p>
	</div>
	<div class="updated">
		{#if updated}
			Updated <Since time={updated} />
		{:else}
			Cache is currently offline
		{/if}
	</div>
</Card>

<style>
	.cache-name {
		font-size: 19px;
		padding-left: 10px;
		padding-top: 6px;
		font-family: 'Inter';
		font-weight: 700;
		background-color: #343537;
		box-shadow: inset 0px 0px 6px var(--box-shadow-color);
		border: 1px solid var(--border);
		border-top: 0;
		border-left: 0;
		border-bottom-right-radius: var(--border-radius);
		padding-bottom: 5px;
		padding-right: 10px;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.online,
	.offline {
		font-family: 'IBM Plex Mono';
		display: flex;
		align-items: center;
		padding: 4px 10px;
		height: fit-content;
		border-top: 0 !important;
		border-right: 0 !important;
		font-size: 13px;
		border-bottom-left-radius: var(--border-radius);
	}

	.online {
		color: var(--green-foreground);
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
	}

	.offline {
		color: var(--red-foreground);
		background-color: var(--red-background);
		border: 1px solid var(--red-border);
	}

	.refresh {
		padding: 20px 10px;
		padding-bottom: 15px;
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon :global(svg) {
		position: relative;
		top: 1px;
		width: 14px;
		height: 14px;
		animation: spin 3s linear infinite;
		transform-origin: center;
	}

	.updated {
		color: grey;
		padding: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 500px) {
		.cache-name {
			font-size: 15.5px;
		}
	}
</style>
