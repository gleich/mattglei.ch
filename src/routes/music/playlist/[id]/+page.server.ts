import { loadPlaylistFromLCP, type AppleMusicPlaylistResponse } from '$lib/lcp/applemusic';
import { type SvelteFetch } from '$lib/lcp/lcp.server';
import type { PageServerLoad } from './$types';

export interface PlaylistMeta {
	name: string;
	firstTrackArtUrl: string | null;
	trackCount: number;
}

export interface PlaylistData {
	meta: PlaylistMeta | null;
	response: Promise<AppleMusicPlaylistResponse | null>;
}

export const load: PageServerLoad = async ({
	params,
	fetch
}: {
	params: Record<string, string>;
	fetch: SvelteFetch;
}) => {
	const responsePromise = loadPlaylistFromLCP(params.id, 1, fetch);
	const response = await responsePromise;
	return {
		meta: response
			? {
					name: response.playlist.name,
					firstTrackArtUrl: response.playlist.tracks[0]?.album_art_url ?? null,
					trackCount: response.playlist.track_count
				}
			: null,
		response: responsePromise
	};
};
