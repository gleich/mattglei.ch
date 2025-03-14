<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import Loading from '$lib/loading.svelte';
	import { renderDuration } from '$lib/time';
	import TimeSince from '$lib/time-since.svelte';
	import type { PlaylistData } from './proxy+page.server';

	const { data }: { data: PlaylistData } = $props();
</script>

<svelte:head>
	{#await data.playlist then playlistData}
		{#if playlistData}
			<DynamicHead
				title={`${playlistData.name} playlist`}
				description={`${playlistData.tracks.length} tracks`}
			/>
		{:else}
			<DynamicHead title="404 Not found" description="Playlist not found" />
		{/if}
	{/await}
</svelte:head>

{#await data.playlist}
	<div class="loading">
		<Loading />
	</div>
{:then playlistData}
	{#if playlistData}
		<div class="header">
			<h2>{playlistData.name}</h2>
			<div class="stats">
				<p>
					{playlistData.tracks.length} songs - {renderDuration(
						playlistData.tracks.reduce(
							(total: number, s: { duration_in_millis: number }) => total + s.duration_in_millis,
							0
						) / 1000
					)}
				</p>
				<p>Last updated <TimeSince time={playlistData.last_modified} /></p>
			</div>
		</div>
		<div class="songs">
			{#each playlistData.tracks as song}
				<div class="song">
					<Song {song} />
				</div>
			{/each}
		</div>
	{:else}
		<Error msg="404: Playlist not found" />
	{/if}
{/await}

<style>
	.loading {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 40px;
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
		width: 185px;
	}

	@media (max-width: 400px) {
		.song {
			width: 40vw;
		}
	}
</style>
