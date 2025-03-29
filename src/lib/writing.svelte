<script lang="ts">
	import dayjs from 'dayjs';
	import type { Snippet } from 'svelte';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	dayjs.extend(advancedFormat);

	const {
		title,
		publishedTime,
		children
	}: { title: string; publishedTime: Date; children: Snippet } = $props();
</script>

<div class="container">
	<h2 class="title">{title}</h2>
	<p class="subtitle">
		{dayjs(publishedTime).format('MMMM Do YYYY')}
	</p>
	<div class="children">
		{@render children()}
	</div>
</div>

<style>
	.title {
		margin-top: 30px;
	}

	.subtitle {
		color: grey;
	}

	.children {
		margin-top: 30px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
