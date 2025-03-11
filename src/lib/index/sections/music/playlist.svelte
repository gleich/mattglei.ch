<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { PlaylistSummary } from '$lib/lcp/applemusic';

	const { summary }: { summary: PlaylistSummary } = $props();
</script>

<div class="container">
	<p>{summary.name}</p>
	<div class="collage">
		{#each summary.first_four_tracks as track}
			<Image
				src={track.album_art_url}
				alt={track.track}
				height={100}
				width={100}
				placeholder={track.album_art_blurhash}
				aspectRatio="1/1"
			/>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.collage {
		border-radius: var(--border-radius);
		overflow: hidden;
		width: 200px;
		height: 200px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
	}
</style>
