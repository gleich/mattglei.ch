import type { SvelteFetch } from './lcp.server';
import type { Pagination } from './pagination';

export async function loadPlaylistFromLCP(
	id: string,
	page: number,
	fetch: SvelteFetch
): Promise<AppleMusicPlaylistResponse | null> {
	// uncomment to check loading animation
	// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	// await sleep(1000);
	try {
		const res = await fetch(`https://lcp.mattglei.ch/applemusic/playlists/${id}?page=${page}`, {
			method: 'GET',
			cache: 'no-store'
		});
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
	album_art_url: string | null;
	album_art_blurhash: string | null;
	url: string;
	id: string;
	preview_audio_url: string | null;
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
