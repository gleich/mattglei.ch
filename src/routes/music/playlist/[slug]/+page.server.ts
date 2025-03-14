import { loadPlaylistFromLCP } from '$lib/lcp/applemusic.server';
import { type SvelteFetch } from '$lib/lcp/lcp.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params,
	fetch
}: {
	params: Record<string, string>;
	fetch: SvelteFetch;
}) => loadPlaylistFromLCP(params.slug, fetch);
