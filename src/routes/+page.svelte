<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Header from './header.svelte';
</script>

<DynamicHead
	title="Matt Gleich"
	description="College Student @ RIT (Rochester Institute of Technology), software engineer, cyclist, and photographer"
/>

<main>
	<Header />
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding: 0 20px;
	}
</style>
