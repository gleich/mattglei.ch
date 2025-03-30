<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children, padding = '10px' }: { children: Snippet; padding?: string } = $props();
</script>

<div style:--card-padding={padding}>
	{@render children()}
</div>

<style>
	div {
		border: 1px solid var(--border);
		padding: var(--card-padding);
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		background-color: var(--background);
		overflow: hidden;
	}

	@media (max-width: 400px) {
		div {
			padding: calc(var(--card-padding) / 2);
		}
	}
</style>
