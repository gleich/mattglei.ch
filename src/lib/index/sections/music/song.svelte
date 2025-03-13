<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic';
	import Scrolling from '$lib/scrolling.svelte';

	const { song }: { song: AppleMusicSong } = $props();
</script>

<a href={song.url} title={`View "${song.track}" on Apple Music`} class="container" target="_blank">
	<div class="image">
		<Image
			src={song.album_art_url}
			alt={`${song.track} by ${song.artist}`}
			placeholder={song.album_art_blurhash}
			aspectRatio="1/1"
		/>
	</div>
	<div>
		<Scrolling gap={15} delay={2} speed={15}><span class="track">{song.track}</span></Scrolling>
		<Scrolling gap={15} delay={2} speed={15}><span class="artist">{song.artist}</span></Scrolling>
	</div>
</a>

<style>
	.container {
		display: flex;
		flex-direction: column;
		text-decoration: none;
	}

	.image {
		width: 100%;
		height: auto;
		border-radius: var(--border-radius);
		overflow: hidden;
		margin-bottom: 3px;
	}

	.track,
	.artist {
		font-size: 14.5px;
		text-decoration: none;
		color: var(--foreground);
	}

	.artist {
		color: grey;
	}
</style>
