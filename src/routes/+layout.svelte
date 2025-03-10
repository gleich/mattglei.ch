<script lang="ts">
	import Nav from '$lib/nav.svelte';

	let { children } = $props();
</script>

<div class="container">
	<div class="main">
		<Nav />

		{@render children()}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		min-height: 100vh;
	}

	.main {
		display: flex;
		align-content: center;
		flex-direction: column;
		width: 100%;
		max-width: 1000px;
	}
</style>
