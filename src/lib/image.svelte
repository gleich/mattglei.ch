<script lang="ts">
	const {
		src,
		alt,
		placeholder,
		height,
		width,
		aspectRatio
	}: {
		src: string;
		alt: string;
		height: number;
		width: number;
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
	{height}
	{width}
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
