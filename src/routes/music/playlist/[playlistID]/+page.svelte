<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import { renderDuration } from '$lib/time';
	import Since from '$lib/time/since.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead, Error } from '@gleich/ui';
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
		<div class="header-info">
			<h2>{data.playlist.name} Playlist</h2>
			<div class="stats">
				<p>Last updated <Since time={data.playlist.last_modified} /></p>
				<p>
					{data.playlist.tracks.length} songs - {renderDuration(
						data.playlist.tracks.reduce(
							(total: number, s: { duration_in_millis: number }) => total + s.duration_in_millis,
							0
						) / 1000
					)}
				</p>
			</div>
		</div>
		<a class="view-on-apple-music" href={data.playlist.url} target="_blank">
			<ViewButton on="Apple Music" icon={AppleMusicIcon} iconPaddingBottom="1.5px" />
		</a>
	</div>
	<div class="songs">
		{#each data.playlist.tracks as song (song)}
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
		margin-bottom: 30px;
		flex-direction: column;
	}

	.header-info {
		display: flex;
		justify-content: space-between;
	}

	.stats {
		color: grey;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
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
		margin-top: 20px;
		text-decoration: inherit;
	}

	@media (max-width: 500px) {
		.header-info {
			flex-direction: column;
		}

		.stats {
			align-items: flex-start;
		}
	}

	@media (max-width: 400px) {
		.song {
			width: 40vw;
		}
	}
</style>
