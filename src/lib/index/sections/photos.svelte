<script>
	import PhotoGallery from '$lib/photo-gallery.svelte';
	import Section from '../section.svelte';
</script>

<Section name="Photos">
	<p>
		I've been really into photography for about seven years now. Starting with nature photography,
		mainly landscapes and macro, I've recently delved into automotive photography, especially during
		my time college with the RIT car club. I primarily use Nikon gear, with my current camera being
		a Nikon Z7II. Here is a few of my favorite photo's I've taken over the years:
	</p>
	<PhotoGallery count={6} />
	<a href="/photos"><button>View More Photos</button></a>
</Section>

<style>
	button {
		width: 100%;
		padding: 5px 0;
	}
</style>
