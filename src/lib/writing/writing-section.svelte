<script lang="ts">
	import Card from '$lib/card.svelte';
	import type { Snippet } from 'svelte';

	const { title, children }: { title: string; children: Snippet } = $props();
</script>

<Card>
	<h3>{title}</h3>
	{@render children()}
</Card>

<style>
	h3 {
		margin-bottom: 5px;
	}
</style>
