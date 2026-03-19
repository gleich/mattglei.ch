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
	import { onMount } from 'svelte';
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
			{/each}. Below is my collection of playlists that I've made over the years as well as my
			recently played music.
		</p>

		<div>
			<h3 class="header">Recently Played Songs</h3>
			<div class="section songs">
				{#each recently_played as song (song.id)}
					<div class="song" animate:flip={{ duration: 400 }} transition:fly={{ y: -24, duration: 350 }}>
						<Song {song} />
					</div>
				{/each}
			</div>
		</div>

		<div>
			<h3 class="header">Playlists</h3>
			<div class="section playlists">
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
	.header {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
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
