export interface CacheData {
	recently_played: Song[];
	playlist_summaries: PlaylistSummary[];
}

export interface Song {
	track: string;
	artist: string;
	duration_in_millis: number;
	album_art_url: string;
	album_art_blurhash: string;
	url: string;
	id: string;
}

export interface PlaylistSummary {
	name: string;
	id: string;
	track_count: number;
	first_four_tracks: Song[];
}

export interface Playlist {
	name: string;
	id: string;
	tracks: Song[];
	last_modified: Date;
	url: string;
}
