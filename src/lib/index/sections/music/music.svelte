<script lang="ts">
	import Applemusic from '$lib/icons/applemusic.svelte';
	import Section from '$lib/index/section.svelte';
	import type { CacheData } from '$lib/lcp/applemusic';
	import type { Response } from '$lib/lcp/lcp.server';
	import Playlist from './playlist.svelte';

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

	const { music }: { music: Response<CacheData> } = $props();
</script>

<Section
	name="Music"
	liveData={{
		sources: [{ name: 'Apple Music', icon: Applemusic, url: 'https://www.apple.com/apple-music/' }],
		updated: music.updated
	}}
>
	<div class="container">
		<p>
			I love a lot of different types of music ranging from electronic to jazz. A few of my favorite
			artists are
			{#each favArtists as artist, index}
				{#if index != favArtists.length && index != 0},{/if}
				{#if index + 1 === favArtists.length}
					and
				{/if}
				<a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a>
			{/each}. Below is my collection of playlists that I've made over the years as well as my
			recently played music.
		</p>

		<h3 class="playlists-header">Playlists</h3>
		<div class="playlists">
			{#each music.data.playlist_summaries as summary}
				<Playlist {summary} />
			{/each}
		</div>
	</div>
</Section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.playlists {
		display: flex;
		overflow-x: scroll;
		gap: 15px;
		padding-bottom: 8px;
		border: 1.5px dashed var(--border);
		padding: 10px;
	}

	.playlists-header {
		width: 100%;
		text-align: center;
		padding: 5px 0px;
	}
</style>
