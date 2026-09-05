import type { Pagination } from './pagination';

export async function loadPlaylistFromLCP(
	id: string,
	page: number,
	fetch: typeof globalThis.fetch,
	signal?: AbortSignal
): Promise<AppleMusicPlaylistResponse | null> {
	try {
		const res = await fetch(
			`https://lcp.mattglei.ch/applemusic/playlists/${encodeURIComponent(id)}?page=${page}`,
			{
				cache: 'no-store',
				signal
			}
		);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

export interface CacheData {
	recently_played: AppleMusicSong[];
	playlist_summaries: AppleMusicPlaylistSummary[];
}

export interface AppleMusicSong {
	track: string;
	artist: string;
	duration_in_millis: number;
	album_art_url: string | undefined;
	album_art_blurhash: string | undefined;
	url: string;
	id: string;
	preview_audio_url: string | undefined;
}

export interface AppleMusicPlaylistResponse {
	playlist: AppleMusicPlaylist;
	pagination: Pagination;
}

export interface AppleMusicPlaylist {
	name: string;
	id: string;
	duration_in_millis: number;
	track_count: number;
	tracks: AppleMusicSong[];
	last_modified: Date;
	url: string;
	spotify_id: string;
}

export interface AppleMusicPlaylistSummary {
	name: string;
	id: string;
	track_count: number;
	first_four_tracks: AppleMusicSong[];
}
