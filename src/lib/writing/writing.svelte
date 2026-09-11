<script lang="ts">
	import { DynamicHead } from '@gleich/ui';
	import type { Snippet } from 'svelte';
	import { formatPublishedDate, type WritingData } from './metadata';

	const { writing, children }: { writing: WritingData; children: Snippet } = $props();
</script>

<DynamicHead title={writing.title} description={writing.description} keywords={writing.keywords} />

<div class="container">
	<header>
		<h2>{writing.title}</h2>
		<div class="subtitle">
			<p>Estimated read time: ~{writing.readTime}min</p>
			<p>
				{formatPublishedDate(writing.publishedDate)}
			</p>
		</div>
	</header>
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
