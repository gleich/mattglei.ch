<script lang="ts">
	import PauseIcon from '$lib/icons/pause-icon.svelte';
	import PlayIcon from '$lib/icons/play-icon.svelte';
	import type { AppleMusicSong } from '$lib/lcp/applemusic.server';
	import { Card, Image, Scrolling } from '@gleich/ui';

	const { song }: { song: AppleMusicSong } = $props();

	let paused = $state(true);
</script>

<Card padding="0">
	<div class="container">
		<div class="image">
			<Image
				src={song.album_art_url}
				alt={`${song.track} by ${song.artist}`}
				placeholder={song.album_art_blurhash}
				height={217}
				width={217}
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
	}

	.apple-music-link,
	.track,
	.artist {
		font-size: 14.5px;
		text-decoration: none;
		color: var(--foreground);
	}

	.apple-music-link {
		margin: 5px 3px;
	}

	.artist {
		color: grey;
		font-size: 13.5px;
	}
</style>
