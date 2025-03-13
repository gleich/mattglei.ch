<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic';
	import Scrolling from '$lib/scrolling.svelte';

	const { song, width }: { song: AppleMusicSong; width: string } = $props();
</script>

<div class="container" style={`width: ${width};`}>
	<div class="image">
		<Image
			src={song.album_art_url}
			alt={`${song.track} by ${song.artist}`}
			placeholder={song.album_art_blurhash}
			aspectRatio="1/1"
		/>
	</div>
	<Scrolling gap={15} delay={2} speed={15}><span class="track">{song.track}</span></Scrolling>
	<Scrolling gap={15} delay={2} speed={15}><span class="artist">{song.artist}</span></Scrolling>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		flex: 1;
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
	}

	.artist {
		color: grey;
	}
</style>
