<script>
	import DynamicHead from '$lib/dynamic-head.svelte';
	import PhotoGallery from '$lib/photo-gallery.svelte';
</script>

<DynamicHead title="Photos" description="Photos gallery taken with my Nikon Z7II" />

<main>
	<PhotoGallery />
</main>

<style>
	main {
		margin-top: 50px;
	}
</style>
