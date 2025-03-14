<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import type { AppleMusicPlaylist } from '$lib/lcp/applemusic.server';
	import { renderDuration } from '$lib/time';
	import TimeSince from '$lib/time-since.svelte';

	const { data }: { data: AppleMusicPlaylist | null } = $props();
</script>

{#await data}
	<p>loading</p>
{:then playlistData}
	{#if playlistData}
		<DynamicHead
			title={`${playlistData.name} playlist`}
			description={`${playlistData.tracks.length} tracks`}
		/>

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
