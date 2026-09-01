<script lang="ts">
	import UserIcon from '$lib/icons/user-icon.svelte';

	const { compact = false }: { compact?: boolean } = $props();
</script>

<div class="human-written" class:compact>
	<span class="icon" aria-hidden="true">
		<UserIcon />
	</span>
	<div>
		<p class="label">Human Written</p>
		{#if !compact}
			<p class="description">This article was not written with AI</p>
		{/if}
	</div>
</div>

<style>
	.human-written {
		display: flex;
		align-items: center;
		gap: 8px;
		width: fit-content;
		padding: 6px 10px 6px 8px;
		flex-shrink: 0;
		color: var(--green-foreground);
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
		border-radius: 8px;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		flex-shrink: 0;
	}

	.label {
		font-family: 'Inter', 'Inter Fallback', sans-serif;
		font-size: 13px;
		font-weight: 800;
		line-height: 1.2;
		white-space: nowrap;
	}

	.description {
		margin-top: 2px;
		font-size: 12px;
		line-height: 1.3;
	}

	.compact {
		gap: 5px;
		padding: 3px 7px 3px 5px;
		border-radius: 5px;
	}

	.compact .icon {
		width: 16px;
		height: 16px;
	}

	.compact .label {
		font-size: 12px;
	}
</style>
