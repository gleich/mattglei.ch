<script lang="ts">
	import AppleMusicIcon from '$lib/icons/apple-music-icon.svelte';
	import Section from '$lib/index/section.svelte';
	import type { CacheData } from '$lib/lcp/applemusic.server';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import Loading from '$lib/loading.svelte';
	import { Error } from '@gleich/ui';
	import Playlist from './playlist.svelte';
	import Song from './song.svelte';
	import { source } from 'sveltekit-sse';
	import { onMount } from 'svelte';

	interface Artist {
		name: string;
		url: string;
	}

	const favArtists: Artist[] = [
		{ name: 'Daft Punk', url: 'https://www.daftpunk.com' },
		{ name: 'Mac DeMarco', url: 'https://www.macdemarco.com' },
		{ name: 'The Smiths', url: 'https://www.officialsmiths.co.uk' },
		{ name: 'Eagles', url: 'https://eagles.com' },
		{ name: 'Fleetwood Mac', url: 'https://www.fleetwoodmacofficial.com' },
		{ name: 'Cigarettes After Sex', url: 'https://www.cigarettesaftersex.com/' },
		{ name: 'Deftones', url: 'https://www.deftones.com' }
	];

	const { music: initial, loading }: { music?: LcpResponse<CacheData> | null; loading?: boolean } =
		$props();
	let music = $state<LcpResponse<CacheData> | null>(initial ?? null);

	onMount(() => {
		const stream = source('https://lcp.mattglei.ch/applemusic/stream').select('message');
		stream.subscribe((s) => {
			if (s) {
				music = JSON.parse(s);
			}
		});
	});
</script>

{#key music}
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
			<Loading height={744} />
		{:else if music != null}
			<p>
				I love a lot of different types of music ranging from electronic to jazz. A few of my
				favorite artists are
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
					{#each music.data!.recently_played as song (song.id)}
						<div class="song">
							<Song {song} />
						</div>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="header">Playlists</h3>
				<div class="section playlists">
					{#each music.data!.playlist_summaries as playlist (playlist.id)}
						<Playlist {playlist} />
					{/each}
				</div>
			</div>
		{:else}
			<Error msg="Failed to load music data" />
		{/if}
	</Section>
{/key}

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
