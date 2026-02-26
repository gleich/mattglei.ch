<script lang="ts">
	import PauseIcon from '$lib/icons/pause-icon.svelte';
	import PlayIcon from '$lib/icons/play-icon.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic';
	import { Card, Image, Scrolling } from '@gleich/ui';
	import { currentAudio } from './playing';

	const { song }: { song: AppleMusicSong } = $props();

	let audioElement: HTMLAudioElement | null = $state(null);
	let paused = $state(true);

	function toggle() {
		if (paused) {
			currentAudio.update((prev) => {
				if (prev && prev !== audioElement) {
					prev.pause();
				}
				return audioElement;
			});
			audioElement?.play();
		} else {
			audioElement?.pause();
			currentAudio.update((prev) => (prev === audioElement ? null : prev));
		}
	}
</script>

<Card padding="0">
	<div class="container">
		<div class="image">
			{#if song.album_art_url}
				<Image
					src={song.album_art_url as string}
					alt={`${song.track} by ${song.artist}`}
					placeholder={song.album_art_blurhash as string}
					height={217}
					width={217}
					aspectRatio="1/1"
				/>
			{:else}
				<div class="no-album-art-container">No Album Art</div>
			{/if}
			{#if song.preview_audio_url}
				<button
					title={`${paused ? 'Play' : 'Pause'} preview of "${song.track}"`}
					class="play-audio-button"
					onclick={toggle}
				>
					<audio bind:this={audioElement} bind:paused src={song.preview_audio_url} loop></audio>
					{#if paused}
						<PlayIcon />
					{:else}
						<PauseIcon />
					{/if}
				</button>
			{/if}
		</div>
		<a
			href={song.url}
			title={`View "${song.track}" on Apple Music`}
			target="_blank"
			class="apple-music-link"
		>
			<Scrolling><span class="track">{song.track}</span></Scrolling>
			<Scrolling><span class="artist">{song.artist}</span></Scrolling>
		</a>
	</div>
</Card>

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
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		overflow: hidden;
		position: relative;
	}

	.no-album-art-container {
		height: 216px;
		width: 217px;
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: grey;
		border-bottom: 1px solid var(--border);
	}

	.play-audio-button {
		background-color: var(--green-background);
		backdrop-filter: blur(4px);
		color: var(--green-foreground);
		cursor: pointer;
		border-radius: 50%;
		width: fit-content;
		position: absolute;
		z-index: 10;
		width: 27px;
		height: 27px;
		bottom: 5px;
		left: 5px;
		padding: 0;
		box-shadow: none;
	}

	.apple-music-link,
	.track,
	.artist {
		font-size: 14.5px;
		text-decoration: none;
		color: var(--foreground);
	}

	.apple-music-link {
		margin: 5px 8px;
	}

	.artist {
		color: grey;
		font-size: 13.5px;
	}
</style>
