import { loadPlaylistFromLCP, type AppleMusicPlaylistResponse } from '$lib/lcp/applemusic';
import { type SvelteFetch } from '$lib/lcp/lcp.server';
import type { PageServerLoad } from './$types';

export interface PlaylistData {
	response: AppleMusicPlaylistResponse | undefined;
}

export const load: PageServerLoad = async ({
	params,
	fetch
}: {
	params: Record<string, string>;
	fetch: SvelteFetch;
}) => ({
	response: await loadPlaylistFromLCP(params.id, 1, fetch)
});
