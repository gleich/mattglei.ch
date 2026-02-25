<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import { renderDuration } from '$lib/time';
	import Since from '$lib/time/since.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead, Error } from '@gleich/ui';
	import SpotifyIcon from '$lib/icons/spotify-icon.svelte';
	import { loadPlaylistFromLCP } from '$lib/lcp/applemusic';
	import type { PlaylistData } from './+page.server';
	import { onMount } from 'svelte';

	const { data }: { data: PlaylistData } = $props();

	let tracks = $derived(data.response?.playlist?.tracks ?? []);
	let currentPage = $state(1);
	let loading = $state(false);
	let hasMore = $derived(
		data.response ? tracks.length < data.response.playlist.track_count : false
	);

	onMount(() => {
		tracks = data.response?.playlist.tracks ?? [];
		currentPage = 1;
		loading = false;
		hasMore = data.response ? tracks.length < data.response?.playlist.track_count : false;
	});

	async function loadNextPage() {
		if (!data || !data.response || loading || !hasMore) return;

		loading = true;
		try {
			const nextPage = currentPage + 1;
			const next = await loadPlaylistFromLCP(data.response?.playlist.id, nextPage, fetch);
			const nextTracks = next?.playlist?.tracks ?? [];

			if (nextTracks.length > 0) {
				tracks = [...tracks, ...nextTracks];
				currentPage = nextPage;
			}

			if (!next?.pagination.next) {
				hasMore = false;
				return;
			}

			hasMore = tracks.length < data.response.playlist.track_count;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	function onScroll() {
		const threshold = 700;

		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const viewportHeight = window.innerHeight;
		const docHeight = document.documentElement.scrollHeight;

		const nearBottom = scrollTop + viewportHeight >= docHeight - threshold;

		if (nearBottom) {
			void loadNextPage();
		}
	}
</script>

<svelte:window on:scroll={onScroll} />

{#if data.response}
	<DynamicHead
		title={`${data.response.playlist.name} Playlist`}
		description={`${data.response.playlist.tracks.length} tracks`}
		opengraphImage={data.response.playlist?.tracks[0].album_art_url != null
			? { url: data.response.playlist?.tracks[0].album_art_url, height: '600', width: '600' }
			: undefined}
	/>
{:else}
	<DynamicHead title="404 Not found" description="Playlist Not Found" />
{/if}

{#if data.response}
	<div class="header">
		<div class="header-info">
			<h2>{data.response.playlist.name} Playlist</h2>
			<div class="stats">
				<p>Last updated <Since time={data.response.playlist.last_modified} /></p>
				<p>
					{data.response.playlist.track_count} songs - {renderDuration(
						data.response.playlist.duration_in_millis / 1000
					)}
				</p>
			</div>
		</div>
		<div class="view-on-buttons">
			<a
				class="view-on-button"
				href={`https://open.spotify.com/playlist/${data.response.playlist.spotify_id}`}
				target="_blank"
			>
				<ViewButton on="Spotify" icon={SpotifyIcon} iconPaddingBottom="1px" iconColor="#24db68" />
			</a>
			<a class="view-on-button" href={data.response.playlist.url} target="_blank">
				<ViewButton
					on="Apple Music"
					icon={AppleMusicIcon}
					iconPaddingBottom="0.5px"
					iconColor="#fb455d"
				/>
			</a>
		</div>
	</div>
	<div class="songs">
		{#each tracks as song (song)}
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
		width: 192px;
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

		.song {
			width: calc(50% - 5px);
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
