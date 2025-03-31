<script>
	import PhotoGallery from '$lib/index/sections/photos/photo-gallery.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import Section from '../../section.svelte';
</script>

<Section name="Photos">
	<p>
		I've been really into photography for about seven years now. Starting with nature photography,
		mainly landscapes and macro, I've recently delved into automotive photography, especially during
		my time college with the RIT car club. I primarily use Nikon gear, with my current camera being
		a Nikon Z7II. Below is a few of my favorite photo's I've taken over the years. You can see more
		of my photos over on my <a href="https://instagram.com/mattglei.ch" target="_blank">Instagram</a
		>.
	</p>
	<PhotoGallery count={6} />
	<a class="view-more" href="/photos"><ViewButton of="photo gallery" /></a>
</Section>

<style>
	.view-more {
		text-decoration: inherit;
	}
</style>
