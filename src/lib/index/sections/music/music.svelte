<script lang="ts">
	import Applemusic from '$lib/icons/applemusic.svelte';
	import Section from '$lib/index/section.svelte';
	import type { CacheData } from '$lib/lcp/applemusic';
	import type { Response } from '$lib/lcp/lcp.server';
	import Playlist from './playlist.svelte';
	import Song from './song.svelte';

	interface Artist {
		name: string;
		url: string;
	}

	const favArtists: Artist[] = [
		{ name: 'Daft Punk', url: 'https://www.daftpunk.com' },
		{ name: 'The Smiths', url: 'https://www.officialsmiths.co.uk' },
		{ name: 'Eagles', url: 'https://eagles.com' },
		{ name: 'Mac DeMarco', url: 'https://www.macdemarco.com' },
		{ name: 'Fleetwood Mac', url: 'https://www.fleetwoodmacofficial.com' },
		{ name: 'Oasis', url: 'https://oasisinet.com' },
		{ name: 'Deftones', url: 'https://www.deftones.com' }
	];

	const { music, loading }: { music?: Response<CacheData>; loading?: boolean } = $props();
</script>

<Section
	name="Music"
	liveData={{
		sources: [{ name: 'Apple Music', icon: Applemusic, url: 'https://www.apple.com/apple-music/' }],
		updated: music?.updated
	}}
>
	{#if loading}
		<p>loading music...</p>
	{:else if music}
		<div class="container">
			<p>
				I love a lot of different types of music ranging from electronic to jazz. A few of my
				favorite artists are
				{#each favArtists as artist, index}
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
					{#each music.data.recently_played.slice(0, 4) as song}
						<div class="song">
							<Song {song} />
						</div>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="header">Playlists</h3>
				<div class="section">
					{#each music.data.playlist_summaries as summary}
						<Playlist {summary} />
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<p>Failed to load music</p>
	{/if}
</Section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		gap: 15px;
	}

	.header {
		width: 100%;
		text-align: center;
		padding: 5px 0px;
	}

	.section {
		display: flex;
		overflow-x: scroll;
		gap: 15px;
		border-top: 1.3px solid var(--border);
		padding: 10px;
	}

	.songs {
		overflow-x: auto;
		align-items: stretch;
		justify-content: center;
	}

	.song {
		width: calc(25% - 10px);
	}

	@media (max-width: 700px) {
		.song:nth-child(3) {
			display: none;
		}

		.song {
			width: calc(33% - 10px);
		}
	}

	@media (max-width: 500px) {
		.song:nth-child(4) {
			display: none;
		}

		.song {
			width: calc(50% - 10px);
		}
	}
</style>
