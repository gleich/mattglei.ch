<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { PlaylistSummary } from '$lib/lcp/applemusic';

	const { summary }: { summary: PlaylistSummary } = $props();
</script>

<div class="container">
	<div class="collage-container">
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
		<p class="name">{summary.name}</p>
	</div>
	<button class="view-more">
		View {summary.track_count} tracks
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
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
</style>
