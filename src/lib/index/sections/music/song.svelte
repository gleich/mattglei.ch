<script lang="ts">
	import PauseIcon from '$lib/icons/pause-icon.svelte';
	import PlayIcon from '$lib/icons/play-icon.svelte';
	import Image from '$lib/image.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic.server';
	import Scrolling from '$lib/scrolling.svelte';

	const {
		song,
		scrollingColor = 'var(--actual-background-color)'
	}: { song: AppleMusicSong; scrollingColor?: string } = $props();

	let paused = $state(true);
</script>

<div class="container">
	<div class="image">
		<Image
			src={song.album_art_url}
			alt={`${song.track} by ${song.artist}`}
			placeholder={song.album_art_blurhash}
			aspectRatio="1/1"
		/>
		{#if song.preview_audio_url}
			<div
				title={`${paused ? 'Play' : 'Pause'} preview of "${song.track}"`}
				class="play-audio-button"
				onpointerdown={() => (paused = !paused)}
			>
				<audio bind:paused src={song.preview_audio_url} loop></audio>
				{#if paused}
					<PlayIcon />
				{:else}
					<PauseIcon />
				{/if}
			</div>
		{/if}
	</div>
	<a
		href={song.url}
		title={`View "${song.track}" on Apple Music`}
		target="_blank"
		class="apple-music-link"
	>
		<Scrolling backgroundColor={scrollingColor}><span class="track">{song.track}</span></Scrolling>
		<Scrolling backgroundColor={scrollingColor}><span class="artist">{song.artist}</span></Scrolling
		>
	</a>
</div>

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
		position: relative;
	}

	.play-audio-button {
		background-color: var(--green-background);
		backdrop-filter: blur(4px);
		color: var(--green-foreground);
		border: 2px solid var(--green-border);
		cursor: pointer;
		border-radius: 50%;
		width: fit-content;
		position: absolute;
		z-index: 10;
		width: 27px;
		height: 27px;
		bottom: 5px;
		left: 5px;
	}

	.apple-music-link,
	.track,
	.artist {
		font-size: 14.5px;
		text-decoration: none;
		color: var(--foreground);
	}

	.artist {
		color: grey;
		font-size: 13.5px;
	}
</style>
