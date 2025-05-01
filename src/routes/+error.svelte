<script lang="ts">
	import { page } from '$app/state';
	import { DynamicHead, Error } from '@gleich/ui';
</script>

<DynamicHead
	title={`${page.status} ${page.error?.message}`}
	description="Error occurred while trying to load page"
/>

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
