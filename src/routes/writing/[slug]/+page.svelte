<script lang="ts">
	import Writing from '$lib/writing/writing.svelte';
	import '$lib/writing/markdown.css';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<Writing writing={data.metadata}>
	<div class="markdown markdown-post">
		<data.Content {data} />
	</div>
</Writing>
