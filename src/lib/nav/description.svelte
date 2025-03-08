<script lang="ts">
	import { onMount } from 'svelte';

	const descriptions = ['student @ RIT', 'software engineer', 'cyclist', 'photographer'];
	let index = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			index = (index + 1) % descriptions.length;
		}, 2000);
		return () => clearInterval(interval);
	});
</script>

<div>
	{descriptions[index]}
</div>

<style>
	div {
		font-family: 'IBM Plex Mono';
		font-style: italic;
		font-weight: 600;
		font-size: var(--font-size);
	}
</style>
