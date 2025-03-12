<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic';

	const { song }: { song: AppleMusicSong } = $props();
</script>

<div class="container">
	<div class="image">
		<Image
			src={song.album_art_url}
			alt={`${song.track} by ${song.artist}`}
			placeholder={song.album_art_blurhash}
			aspectRatio="1/1"
		/>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.image {
		width: 100%;
		height: auto;
		flex-grow: 0;
		border-radius: var(--border-radius);
		overflow: hidden;
	}
</style>
