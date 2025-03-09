<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Nav from '$lib/nav/nav.svelte';
</script>

<DynamicHead
	title="Matt Gleich"
	description="student, software engineer, cyclist, and photographer"
/>

<main>
	<div class="content">
		<Nav />
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 0 20px;
		width: 100%;
	}

	.content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 900px;
	}
</style>
