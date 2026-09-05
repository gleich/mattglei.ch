<script lang="ts">
	import {
		loadPlaylistFromLCP,
		type AppleMusicPlaylistResponse,
		type AppleMusicSong
	} from '$lib/lcp/applemusic';
	import LoadingWidget from '$lib/loading/loading-widget.svelte';
	import { onDestroy } from 'svelte';
	import Song from './song.svelte';

	const { response }: { response: AppleMusicPlaylistResponse } = $props();
	const controller = new AbortController();
	let additionalTracks: AppleMusicSong[] = $state([]);
	let nextResponse = $state.raw<AppleMusicPlaylistResponse | null>(null);
	let loading = $state(false);
	let failed = $state(false);
	const tracks = $derived([...response.playlist.tracks, ...additionalTracks]);
	const nextPage = $derived((nextResponse ?? response).pagination.next);

	onDestroy(() => controller.abort());

	async function loadNextPage() {
		if (loading || nextPage === null) return;

		loading = true;
		failed = false;
		try {
			const next = await loadPlaylistFromLCP(
				response.playlist.id,
				nextPage,
				fetch,
				controller.signal
			);
			if (controller.signal.aborted) return;
			if (!next) {
				failed = true;
				return;
			}

			additionalTracks.push(...next.playlist.tracks);
			nextResponse = next;
		} finally {
			loading = false;
		}
	}

	function onScroll() {
		if (
			!failed &&
			window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 700
		) {
			void loadNextPage();
		}
	}
</script>

<svelte:window onscroll={onScroll} />

{#if loading}
	<LoadingWidget />
{/if}

<div class="songs">
	{#each tracks as song, index (index)}
		<div class="song">
			<Song {song} />
		</div>
	{/each}
</div>

{#if failed}
	<p>Failed to load more tracks. <button onclick={loadNextPage}>Try again</button></p>
{/if}

<style>
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

	@media (max-width: 550px) {
		.song {
			width: calc(50% - 5px);
		}
	}
</style>
