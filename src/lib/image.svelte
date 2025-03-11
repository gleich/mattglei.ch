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
		placeholder?: string;
		height: number;
		width: number;
		aspectRatio?: string;
	} = $props();
</script>

<img
	{src}
	loading="lazy"
	decoding="async"
	{alt}
	{height}
	{width}
	style={`${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''} ${placeholder ? `background-image: url('${placeholder}');` : ''}`}
/>

<style>
	img {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
