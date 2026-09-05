<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import PlaylistTracks from '$lib/index/sections/music/playlist-tracks.svelte';
	import { renderDuration } from '$lib/time';
	import Since from '$lib/time/since.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead, Error } from '@gleich/ui';
	import SpotifyIcon from '$lib/icons/spotify-icon.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const response = $derived(data.response);
</script>

{#if response}
	<DynamicHead
		title={`${response.playlist.name} Playlist`}
		description={`${response.playlist.track_count} tracks`}
		opengraphImage={response.playlist.tracks[0]?.album_art_url
			? { url: response.playlist.tracks[0]?.album_art_url, height: '600', width: '600' }
			: undefined}
	/>
{:else}
	<DynamicHead title="404 Not found" description="Playlist Not Found" />
{/if}

{#if response}
	<div class="header">
		<div class="header-info">
			<h2>{response.playlist.name} Playlist</h2>
			<div class="stats">
				<p>Last updated <Since time={response.playlist.last_modified} /></p>
				<p>
					{response.playlist.track_count} songs - {renderDuration(
						response.playlist.duration_in_millis / 1000
					)}
				</p>
			</div>
		</div>
		<div class="view-on-buttons">
			<a
				class="view-on-button"
				href={`https://open.spotify.com/playlist/${response.playlist.spotify_id}`}
				target="_blank"
			>
				<ViewButton on="Spotify" icon={SpotifyIcon} iconPaddingBottom="1px" iconColor="#24db68" />
			</a>
			<a class="view-on-button" href={response.playlist.url} target="_blank">
				<ViewButton
					on="Apple Music"
					icon={AppleMusicIcon}
					iconPaddingBottom="0.5px"
					iconColor="#fb455d"
				/>
			</a>
		</div>
	</div>
	{#key response}
		<PlaylistTracks {response} />
	{/key}
{:else}
	<Error msg="404: Playlist Not Found" />
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

	.view-on-buttons {
		display: flex;
		gap: 10px;
		margin-top: 30px;
		margin-bottom: 10px;
	}

	.view-on-button {
		flex: 1;
		text-decoration: inherit;
	}

	@media (max-width: 550px) {
		.header-info {
			flex-direction: column;
		}
	}

	@media (max-width: 500px) {
		.stats {
			align-items: flex-start;
		}

		.view-on-buttons {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
