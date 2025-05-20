<script lang="ts">
	import { DynamicHead } from '@gleich/ui';
	import type { Snippet } from 'svelte';

	export interface WritingData {
		title: string;
		publishedDate: string;
		description: string;
		keywords: string[];
		readTime: number;
	}

	const { writing, children }: { writing: WritingData; children: Snippet } = $props();
</script>

<DynamicHead
	title={writing.title}
	description={writing.description}
	keywords={writing.keywords}
	siteName="mattglei.ch"
/>

<div class="container">
	<h2>{writing.title}</h2>
	<div class="subtitle">
		<p>Estimated read time: ~{writing.readTime}min</p>
		<p>
			{writing.publishedDate}
		</p>
	</div>
	<div class="children">
		{@render children()}
	</div>
</div>

<style>
	.subtitle {
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
