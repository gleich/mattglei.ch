<script lang="ts">
	import type { AppleMusicSong } from '$lib/lcp/applemusic';
	import { Card, Image, Scrolling } from '@gleich/ui';

	const { song }: { song: AppleMusicSong } = $props();
</script>

<Card padding="0">
	<a
		href={song.url}
		title={`View "${song.track}" on Apple Music`}
		target="_blank"
		class="container"
	>
		<div class="image">
			{#if song.album_art_url}
				<Image
					src={song.album_art_url}
					alt={`${song.track} by ${song.artist}`}
					placeholder={song.album_art_blurhash}
					height={217}
					width={217}
					aspectRatio="1/1"
				/>
			{:else}
				<div class="no-album-art-container">No Album Art</div>
			{/if}
		</div>
		<div class="info" style={song.album_art_url ? `--album-art: url('${song.album_art_url}')` : ''}>
			<Scrolling><span class="track">{song.track}</span></Scrolling>
			<Scrolling><span class="artist">{song.artist}</span></Scrolling>
		</div>
	</a>
</Card>

<style>
	.container {
		display: flex;
		flex-direction: column;
		text-decoration: none;
	}

	.image {
		width: 100%;
		line-height: 0;
		height: auto;
		border-radius: var(--border-radius);
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		overflow: hidden;
		position: relative;
	}

	.no-album-art-container {
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: grey;
		line-height: normal;
		border-bottom: 1px solid var(--border);
	}

	.info,
	.track,
	.artist {
		font-size: 14.5px;
		text-decoration: none;
		color: var(--foreground);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
	}

	.info {
		padding: 5px 8px;
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.info::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: var(--album-art);
		background-size: cover;
		background-position: center;
		filter: blur(15px);
		transform: scale(1.5);
		opacity: 0.7;
		z-index: -1;
	}

	.artist {
		color: var(--foreground);
		opacity: 0.65;
		font-size: 13.5px;
	}

	@media (prefers-color-scheme: light) {
		.info,
		.track,
		.artist {
			text-shadow: 0 1px 4px rgba(255, 255, 255, 0.8);
		}

		.info::before {
			opacity: 0.35;
		}

		.artist {
			opacity: 0.8;
		}
	}
</style>
