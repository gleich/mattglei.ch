<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import { renderDuration } from '$lib/time';
	import Since from '$lib/time/since.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead, Error } from '@gleich/ui';
	import SpotifyIcon from '$lib/icons/spotify-icon.svelte';
	import { loadPlaylistFromLCP, type AppleMusicSong } from '$lib/lcp/applemusic';
	import type { PlaylistData } from './+page.server';
	import { onMount } from 'svelte';
	import PageLoading from '$lib/loading/page-loading.svelte';
	import { page } from '$app/state';
	import LoadingWidget from '$lib/loading/loading-widget.svelte';

	const { data }: { data: PlaylistData } = $props();

	let tracks: AppleMusicSong[] | undefined = $state();
	let currentPage = $state(1);
	let loading = $state(false);
	let hasMore = $state(false);

	onMount(() => {
		data.response.then((resp) => {
			tracks = resp?.playlist.tracks ?? [];
			currentPage = 1;
			loading = false;
			hasMore = resp?.pagination.next != null;
		});
	});

	async function loadNextPage() {
		if (!data || !data.response || loading || !hasMore || !page.params.id) return;

		loading = true;
		try {
			const nextPage = currentPage + 1;
			const next = await loadPlaylistFromLCP(page.params.id, nextPage, fetch);
			const nextTracks = next?.playlist?.tracks ?? [];

			if (nextTracks.length > 0 && tracks) {
				tracks = [...tracks, ...nextTracks];
				currentPage = nextPage;
			}

			if (!next?.pagination.next) {
				hasMore = false;
				loading = false;
				return;
			}

			hasMore = next.pagination.next != null;
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

{#await data.response}
	<PageLoading />
{:then response}
	{#if response}
		<DynamicHead
			title={`${response.playlist.name} Playlist`}
			description={`${response.playlist.tracks.length} tracks`}
			opengraphImage={response.playlist?.tracks[0].album_art_url != null
				? { url: response.playlist?.tracks[0].album_art_url, height: '600', width: '600' }
				: undefined}
		/>

		{#if loading}
			<LoadingWidget />
		{/if}

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
		<div class="songs">
			{#each tracks as song (song)}
				<div class="song">
					<Song {song} />
				</div>
			{/each}
		</div>
	{:else}
		<DynamicHead title="404 Not found" description="Playlist Not Found" />
		<Error msg="404: Playlist Not Found" />
	{/if}
{/await}

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
