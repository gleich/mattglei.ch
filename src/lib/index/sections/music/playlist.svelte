<script lang="ts">
	import type { AppleMusicPlaylist } from '$lib/lcp/applemusic.server';
	import { Card, Image } from '@gleich/ui';

	const { playlist }: { playlist: AppleMusicPlaylist } = $props();
</script>

<a href={`/music/playlist/${playlist.id}`} class="container">
	<Card padding="0">
		<div class="collage-container">
			<div class="collage">
				{#each playlist.tracks.slice(0, 4) as track (track.id)}
					<div class="collage-image">
						<Image
							src={track.album_art_preview_url}
							alt={`Album art for ${track.track} by ${track.artist}`}
							placeholder={track.album_art_blurhash}
							height={100}
							width={100}
							aspectRatio="1/1"
						/>
					</div>
				{/each}
			</div>
			<p class="name">{playlist.name}</p>
		</div>
		<button class="view-more">
			View {playlist.tracks.length} tracks
		</button>
	</Card>
</a>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: inherit;
	}

	.collage-container {
		position: relative;
	}

	.collage {
		border-radius: var(--border-radius);
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		overflow: hidden;
		width: 200px;
		height: 200px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 1fr;
	}

	.collage-image {
		width: 100%;
		height: 100%;
	}

	.name {
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background-color: rgba(28, 21, 33, 0.7);
		backdrop-filter: blur(4px);
		color: white;
		padding: 2px 4px;
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.view-more {
		margin: 10px;
		padding: 3px 0px;
		font-size: 14px;
		width: calc(100% - 20px);
	}

	@media (max-width: 500px) {
		.collage {
			width: 150px;
			height: 150px;
		}
	}
</style>
