<script lang="ts">
	const {
		src,
		alt,
		placeholder,
		aspectRatio
	}: {
		src: string;
		alt: string;
		placeholder?: string;
		aspectRatio?: string;
	} = $props();

	let img: HTMLElement;

	function removeBackground() {
		if (img.style.backgroundImage && placeholder) {
			img.style.backgroundImage = 'none';
		}
	}
</script>

<img
	{src}
	bind:this={img}
	onload={removeBackground}
	loading="lazy"
	decoding="async"
	{alt}
	style={`${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''} ${placeholder ? `background-image: url('${placeholder}');` : ''}`}
/>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: block;
	}
</style>
