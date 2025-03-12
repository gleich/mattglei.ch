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
</script>

<img
	{src}
	loading="lazy"
	decoding="async"
	{alt}
	style={`${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''} ${placeholder ? `background-image: url('${placeholder}');` : ''}`}
/>

<style>
	img {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
