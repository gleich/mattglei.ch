<script lang="ts">
	import Error from '$lib/error.svelte';
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Section from '$lib/index/section.svelte';
	import type { CacheData } from '$lib/lcp/applemusic.server';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import Loading from '$lib/loading.svelte';
	import Scrolling from '$lib/scrolling.svelte';
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

	const { music, loading }: { music?: LcpResponse<CacheData> | null; loading?: boolean } = $props();
</script>

<Section
	name="Music"
	liveData={{
		sources: [
			{ name: 'Apple Music', icon: AppleMusicIcon, url: 'https://www.apple.com/apple-music/' }
		],
		updated: music?.updated
	}}
>
	{#if loading}
		<Loading expectedHeight="744.37px" />
	{:else if music != null}
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
			<Scrolling gap={15}>
				<div class="section songs">
					{#each music.data!.recently_played as song (song.id)}
						<div class="song">
							<Song {song} />
						</div>
					{/each}
				</div>
			</Scrolling>
		</div>

		<div>
			<h3 class="header">Playlists</h3>
			<div class="section playlists">
				{#each music.data!.playlist_summaries as summary (summary.id)}
					<Playlist {summary} />
				{/each}
			</div>
		</div>
	{:else}
		<Error msg="Failed to load music data" />
	{/if}
</Section>

<style>
	.header {
		width: 100%;
		text-align: center;
		padding: 5px 0;
	}

	.section {
		display: flex;
		overflow-x: scroll;
		gap: 15px;
		border-top: 1px solid var(--border);
		padding-top: 10px;
		padding: 10px;
	}

	.song {
		max-width: 200px;
	}

	.playlists {
		padding-bottom: 10px;
	}

	@media (max-width: 500px) {
		.section {
			gap: 10px;
		}

		.song {
			min-width: 150px;
		}
	}
</style>
