<script lang="ts">
	import Error from '$lib/error.svelte';
	import type { AppleMusicPlaylist } from '$lib/lcp/applemusic.server';

	const { data }: { data: AppleMusicPlaylist | null } = $props();
</script>

{#await data}
	<p>loading</p>
{:then playlistData}
	{#if playlistData}
		<div class="header">
			{data!.name}
		</div>
	{:else}
		<Error msg="404: Playlist not found" />
	{/if}
{/await}
