<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Song from '$lib/index/sections/music/song.svelte';
	import type { AppleMusicPlaylist } from '$lib/lcp/applemusic.server';

	const { data }: { data: AppleMusicPlaylist | null } = $props();
</script>

{#await data}
	<p>loading</p>
{:then playlistData}
	{#if playlistData}
		<DynamicHead
			title={`${playlistData.name} playlist`}
			description={`${playlistData.tracks.length} tracks`}
		/>

		<div class="header">
			<h2>{data!.name}</h2>
		</div>
		<div class="songs">
			{#each playlistData.tracks as song}
				<div class="song">
					<Song {song} />
				</div>
			{/each}
		</div>
	{:else}
		<Error msg="404: Playlist not found" />
	{/if}
{/await}

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40px;
		margin-bottom: 30px;
	}

	.songs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}

	.song {
		width: 185px;
	}

	@media (max-width: 400px) {
		.song {
			width: 40vw;
		}
	}
</style>
