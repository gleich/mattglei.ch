<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Applemusic from '$lib/icons/applemusic.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import { renderDuration } from '$lib/time';
	import Since from '$lib/time/since.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import type { PlaylistData } from './proxy+page.server';

	const { data }: { data: PlaylistData } = $props();
</script>

{#if data.playlist}
	<DynamicHead
		title={`${data.playlist.name} playlist`}
		description={`${data.playlist.tracks.length} tracks`}
		opengraphImage={{ url: data.playlist.tracks[0].album_art_url, height: '600', width: '600' }}
	/>
{:else}
	<DynamicHead title="404 Not found" description="Playlist not found" />
{/if}

{#if data.playlist}
	<div class="header">
		<h2>{data.playlist.name}</h2>
		<div class="stats">
			<p>
				{data.playlist.tracks.length} songs - {renderDuration(
					data.playlist.tracks.reduce(
						(total: number, s: { duration_in_millis: number }) => total + s.duration_in_millis,
						0
					) / 1000
				)}
			</p>
			<p>Last updated <Since time={data.playlist.last_modified} /></p>
		</div>
		<a class="view-on-apple-music" href={data.playlist.url} target="_blank">
			<ViewButton on="Apple Music" icon={Applemusic} iconPaddingBottom="1.5px" />
		</a>
	</div>
	<div class="songs">
		{#each data.playlist.tracks as song (song.id)}
			<div class="song">
				<Song {song} />
			</div>
		{/each}
	</div>
{:else}
	<Error msg="404: Playlist not found" />
{/if}

<style>
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}

	.stats {
		color: grey;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.songs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.song {
		width: 184px;
	}

	.view-on-apple-music {
		text-decoration: inherit;
		margin-top: 20px;
		width: 100%;
		max-width: 250px;
	}

	@media (max-width: 400px) {
		.song {
			width: 40vw;
		}
	}
</style>
