<script lang="ts">
	import { DynamicHead } from '@gleich/ui';
	import HumanWritten from '$lib/writing/human-written.svelte';
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

<DynamicHead title={writing.title} description={writing.description} keywords={writing.keywords} />

<div class="container">
	<header class="writing-header">
		<div>
			<h2>{writing.title}</h2>
			<div class="subtitle">
				<p>Estimated read time: ~{writing.readTime}min</p>
				<p>
					{writing.publishedDate}
				</p>
			</div>
		</div>
		<HumanWritten />
	</header>
	<div class="children">
		{@render children()}
	</div>
</div>

<style>
	.writing-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 24px;
	}

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

	@media (max-width: 700px) {
		.writing-header {
			flex-direction: column;
			gap: 14px;
		}
	}
</style>
