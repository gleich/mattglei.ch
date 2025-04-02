<script lang="ts">
	const {
		src,
		alt,
		placeholder,
		aspectRatio,
		width,
		height
	}: {
		src: string;
		alt: string;
		placeholder?: string;
		aspectRatio?: string;
		width: number;
		height: number;
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
	{width}
	{height}
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
