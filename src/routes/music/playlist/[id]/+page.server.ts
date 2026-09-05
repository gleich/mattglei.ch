import { loadPlaylistFromLCP } from '$lib/lcp/applemusic';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => ({
	response: await loadPlaylistFromLCP(params.id, 1, fetch)
})) satisfies PageServerLoad;
