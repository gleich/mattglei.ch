<script lang="ts">
	import { page } from '$app/state';
	import Error from '$lib/error.svelte';
</script>

<main>
	<Error msg={`${page.status} ${page.error?.message}`} />
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60vh;
	}
</style>
