<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Section from '$lib/index/section.svelte';
	import type { AppleMusicPlaylistSummary, AppleMusicSong, CacheData } from '$lib/lcp/applemusic';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import SectionLoading from '$lib/loading/section-loading.svelte';
	import { Error } from '@gleich/ui';
	import Playlist from './playlist.svelte';
	import Song from './song.svelte';
	import { source } from 'sveltekit-sse';
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	interface Artist {
		name: string;
		url: string;
	}

	const favArtists: Artist[] = [
		{ name: 'Daft Punk', url: 'https://www.daftpunk.com' },
		{ name: 'Mac DeMarco', url: 'https://www.macdemarco.com' },
		{ name: 'The Smiths', url: 'https://www.officialsmiths.co.uk' },
		{ name: 'Maxwell', url: 'https://musze.com' },
		{ name: 'Fleetwood Mac', url: 'https://www.fleetwoodmacofficial.com' },
		{ name: 'Cigarettes After Sex', url: 'https://www.cigarettesaftersex.com/' },
		{ name: 'Deftones', url: 'https://www.deftones.com' }
	];

	const { music: response, loading }: { music?: LcpResponse<CacheData> | null; loading?: boolean } =
		$props();
	let recently_played = $derived<AppleMusicSong[] | undefined>(response?.data.recently_played);
	let playlists = $derived<AppleMusicPlaylistSummary[] | undefined>(
		response?.data.playlist_summaries
	);
	let updated = $derived<Date | undefined>(response?.updated);

	let songsContainer: HTMLDivElement | null = $state(null);
	let playlistsContainer: HTMLDivElement | null = $state(null);

	let songsScrollLeft = $state(0);
	let songsScrollWidth = $state(0);
	let songsClientWidth = $state(0);

	let playlistsScrollLeft = $state(0);
	let playlistsScrollWidth = $state(0);
	let playlistsClientWidth = $state(0);

	let songsCanScrollLeft = $derived(songsScrollLeft > 0);
	let songsCanScrollRight = $derived(songsScrollLeft + songsClientWidth < songsScrollWidth);

	let playlistsCanScrollLeft = $derived(playlistsScrollLeft > 0);
	let playlistsCanScrollRight = $derived(
		playlistsScrollLeft + playlistsClientWidth < playlistsScrollWidth
	);

	function updateSongsScroll() {
		if (!songsContainer) return;
		songsScrollLeft = songsContainer.scrollLeft;
		songsScrollWidth = songsContainer.scrollWidth;
		songsClientWidth = songsContainer.clientWidth;
	}

	function updatePlaylistsScroll() {
		if (!playlistsContainer) return;
		playlistsScrollLeft = playlistsContainer.scrollLeft;
		playlistsScrollWidth = playlistsContainer.scrollWidth;
		playlistsClientWidth = playlistsContainer.clientWidth;
	}

	function scrollSection(el: HTMLDivElement | null, direction: 'left' | 'right') {
		if (!el) return;
		el.scrollBy({ left: direction === 'left' ? -el.clientWidth : el.clientWidth, behavior: 'smooth' });
	}

	$effect(() => {
		recently_played;
		tick().then(() => updateSongsScroll());
	});

	$effect(() => {
		playlists;
		tick().then(() => updatePlaylistsScroll());
	});

	onMount(() => {
		const stream = source('https://lcp.mattglei.ch/applemusic/stream').select('message');
		stream.subscribe((s) => {
			if (s) {
				const streamedResponse: LcpResponse<CacheData> = JSON.parse(s);
				recently_played = streamedResponse.data.recently_played;
				playlists = streamedResponse.data.playlist_summaries;
				updated = streamedResponse.updated;
			}
		});

		window.addEventListener('resize', updateSongsScroll);
		window.addEventListener('resize', updatePlaylistsScroll);
		return () => {
			window.removeEventListener('resize', updateSongsScroll);
			window.removeEventListener('resize', updatePlaylistsScroll);
		};
	});
</script>

<Section
	name="Music"
	liveData={{
		sources: [
			{ name: 'Apple Music', icon: AppleMusicIcon, url: 'https://www.apple.com/apple-music/' }
		],
		updated
	}}
>
	{#if loading}
		<SectionLoading name="music" height={708} />
	{:else if response && recently_played && playlists}
		<p>
			I love a lot of different types of music ranging from electronic to jazz. A few of my favorite
			artists are
			{#each favArtists as artist, index (artist.url)}
				{#if index != favArtists.length && index != 0},{/if}
				{#if index + 1 === favArtists.length}
					and
				{/if}
				<a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a>
			{/each}. Below is my recently played music as well as a collection of playlists that I've made
			over the years.
		</p>

		<div>
			<div class="section-header">
				<h3 class="header">Recently Played Songs</h3>
				<div class="scroll-controls">
					<button
						class="scroll-btn"
						disabled={!songsCanScrollLeft}
						onclick={() => scrollSection(songsContainer, 'left')}
						aria-label="Scroll songs left"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
					</button>
					<button
						class="scroll-btn"
						disabled={!songsCanScrollRight}
						onclick={() => scrollSection(songsContainer, 'right')}
						aria-label="Scroll songs right"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			</div>
			<div class="section songs" bind:this={songsContainer} onscroll={updateSongsScroll}>
				{#each recently_played as song (song.id)}
					<div
						class="song"
						animate:flip={{ duration: 400 }}
						transition:fly={{ y: -24, duration: 350 }}
					>
						<Song {song} />
					</div>
				{/each}
			</div>
		</div>

		<div>
			<div class="section-header">
				<h3 class="header">Playlists</h3>
				<div class="scroll-controls">
					<button
						class="scroll-btn"
						disabled={!playlistsCanScrollLeft}
						onclick={() => scrollSection(playlistsContainer, 'left')}
						aria-label="Scroll playlists left"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
					</button>
					<button
						class="scroll-btn"
						disabled={!playlistsCanScrollRight}
						onclick={() => scrollSection(playlistsContainer, 'right')}
						aria-label="Scroll playlists right"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
					</button>
				</div>
			</div>
			<div class="section playlists" bind:this={playlistsContainer} onscroll={updatePlaylistsScroll}>
				{#each playlists as playlist (playlist.id)}
					<Playlist {playlist} />
				{/each}
			</div>
		</div>
	{:else}
		<Error msg="Failed to load music data" />
	{/if}
</Section>

<style>
	.section-header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		min-width: 0;
		padding: 5px 0;
		font-size: 14px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--muted-foreground, var(--foreground));
	}

	.header::before,
	.header::after {
		content: '';
		flex: 1;
		border-top: 1px solid var(--border);
	}

	.scroll-controls {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}

	.scroll-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		padding: 0;
		border-radius: 50%;
		background: transparent;
		color: var(--foreground);
		cursor: pointer;
		transition: opacity 0.15s;
	}

	.scroll-btn:disabled {
		opacity: 0.25;
		cursor: default;
	}

	.section {
		display: flex;
		overflow-x: scroll;
		gap: 15px;
		padding: 10px;
	}

	.song {
		min-width: 200px;
	}

	.playlists {
		padding-bottom: 10px;
	}

	@media (max-width: 500px) {
		.section {
			gap: 10px;
			padding-left: 5px;
		}

		.song {
			min-width: 150px;
		}
	}
</style>
