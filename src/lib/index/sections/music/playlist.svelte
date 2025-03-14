<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { AppleMusicPlaylistSummary } from '$lib/lcp/applemusic.server';

	const { summary }: { summary: AppleMusicPlaylistSummary } = $props();
</script>

<a href={`/music/playlist/${summary.id}`} class="container">
	<div class="collage-container">
		<div class="collage">
			{#each summary.first_four_tracks as track}
				<div class="collage-image">
					<Image
						src={track.album_art_preview_url}
						alt={`Album art for ${track.track} by ${track.artist}`}
						placeholder={track.album_art_blurhash}
						aspectRatio="1/1"
					/>
				</div>
			{/each}
		</div>
		<p class="name">{summary.name}</p>
	</div>
	<button class="view-more">
		View {summary.track_count} tracks
	</button>
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
		background-color: rgba(28, 21, 33, 0.7);
		backdrop-filter: blur(4px);
		color: white;
		border-radius: var(--border-radius);
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		padding: 2px 4px;
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.view-more {
		margin-top: 10px;
		padding: 3px 0px;
		font-size: 14px;
		width: 100%;
	}

	@media (max-width: 500px) {
		.collage {
			width: 150px;
			height: 150px;
		}
	}
</style>
