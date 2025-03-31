import { LCP_TOKEN } from '$env/static/private';
import type { SvelteFetch } from './lcp.server';

export async function loadPlaylistFromLCP(
	id: string,
	fetch: SvelteFetch
): Promise<AppleMusicPlaylist | null> {
	try {
		const res = await fetch(`https://lcp.dev.mattglei.ch/applemusic/playlists/${id}`, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${LCP_TOKEN}`
			}
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
	album_art_url: string;
	album_art_preview_url: string;
	album_art_blurhash: string;
	url: string;
	id: string;
}

export interface AppleMusicPlaylistSummary {
	name: string;
	id: string;
	track_count: number;
	first_four_tracks: AppleMusicSong[];
}

export interface AppleMusicPlaylist {
	name: string;
	id: string;
	tracks: AppleMusicSong[];
	last_modified: Date;
	url: string;
}
