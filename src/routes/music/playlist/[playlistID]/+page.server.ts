import { type AppleMusicPlaylist, type CacheData } from '$lib/lcp/applemusic.server';
import { Cache, loadFromLCP, type SvelteFetch } from '$lib/lcp/lcp.server';
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
	playlist: (await loadFromLCP<CacheData>(Cache.AppleMusic, fetch))?.data.playlists.find(
		(p) => p.id === params.playlistID
	)
});
