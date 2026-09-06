<script lang="ts">
	import { Card } from '@gleich/ui';
	import type { Snippet } from 'svelte';

	const { title, children }: { title: string; children: Snippet } = $props();
</script>

<Card>
	<h4>{title}</h4>
	<div class="markdown markdown-section">
		{@render children()}
	</div>
</Card>

<style>
	h4 {
		margin-bottom: 10px;
	}
</style>
