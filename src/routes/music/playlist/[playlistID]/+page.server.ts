import { loadPlaylistFromLCP, type AppleMusicPlaylist } from '$lib/lcp/applemusic.server';
import { type SvelteFetch } from '$lib/lcp/lcp.server';
import type { PageServerLoad } from './$types';

export interface PlaylistData {
	playlist: AppleMusicPlaylist | undefined;
}

export const load: PageServerLoad = async ({
	params,
	fetch
}: {
	params: Record<string, string>;
	fetch: SvelteFetch;
}) => ({
	playlist: await loadPlaylistFromLCP(params.playlistID, fetch)
});
