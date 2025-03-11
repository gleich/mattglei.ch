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

	const loaded = $state(false);
	function onload() {}
</script>

{#if !loaded && placeholder}
	<img
		{src}
		{alt}
		{height}
		{width}
		style={aspectRatio ? `aspect-ratio: ${aspectRatio}` : undefined}
	/>
{/if}
<img
	{src}
	loading="lazy"
	decoding="async"
	{alt}
	{height}
	{width}
	{onload}
	style={`display: ${loaded ? 'block' : 'none'}; ${aspectRatio ? `aspect-ratio: ${aspectRatio}` : ''}`}
/>
