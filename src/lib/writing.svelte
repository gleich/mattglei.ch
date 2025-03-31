<script lang="ts">
	import type { Snippet } from 'svelte';
	import DynamicHead, { type OpenGraphImage } from './dynamic-head.svelte';

	export interface WritingData {
		title: string;
		publishedDate: string;
		description: string;
	}

	const { writing, children }: { writing: WritingData; children: Snippet } = $props();
</script>

<DynamicHead title={writing.title} description={writing.description} />

<div class="container">
	<h2 class="title">{writing.title}</h2>
	<p class="subtitle">
		{writing.publishedDate}
	</p>
	<div class="children">
		{@render children()}
	</div>
</div>

<style>
	.title {
		text-align: center;
	}

	.subtitle {
		text-align: center;
		color: grey;
	}

	.children {
		margin-top: 40px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
