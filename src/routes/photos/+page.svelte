<script>
	import InstagramIcon from '$lib/icons/instagram-icon.svelte';
	import PhotoGallery from '$lib/index/sections/photos/photo-gallery.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead } from '@gleich/ui';
</script>

<DynamicHead title="Photos" description="Photos gallery taken with my Nikon Z7II" />

<main>
	<h2>Photo Gallery</h2>

	<PhotoGallery />

	<a class="view-more" href="https://instagram.com/mattglei.ch" target="_blank">
		<ViewButton more on="Instagram" icon={InstagramIcon} iconPaddingBottom="0px" />
	</a>
</main>

<style>
	h2 {
		margin-bottom: 30px;
	}

	.view-more {
		display: inline-block;
		text-decoration: inherit;
		margin-top: 30px;
		width: 100%;
	}
</style>
