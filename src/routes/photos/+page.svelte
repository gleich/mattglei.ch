<script>
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import PhotoGallery from '$lib/index/sections/photos/photo-gallery.svelte';
	import ViewButton from '$lib/view-button.svelte';
</script>

<DynamicHead title="Photos" description="Photos gallery taken with my Nikon Z7II" />

<h2>Photo Gallery</h2>

<PhotoGallery />

<a class="view-more" href="https://instagram.com/mattglei.ch" target="_blank">
	<ViewButton more on="Instagram" icon={Instagram} iconPaddingBottom="0px" />
</a>

<style>
	h2 {
		margin-bottom: 30px;
	}

	.view-more {
		text-decoration: inherit;
		margin-top: 20px;
	}
</style>
