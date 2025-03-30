<script>
	import DynamicHead from '$lib/dynamic-head.svelte';
	import PhotoGallery from '$lib/index/sections/photos/photo-gallery.svelte';
</script>

<DynamicHead title="Photos" description="Photos gallery taken with my Nikon Z7II" />

<h2>Photo Gallery</h2>

<PhotoGallery />

<style>
	h2 {
		margin-bottom: 30px;
	}
</style>
