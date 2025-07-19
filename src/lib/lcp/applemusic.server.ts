export interface CacheData {
	recently_played: AppleMusicSong[];
	playlists: AppleMusicPlaylist[];
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
	preview_audio_url: string | null;
}

export interface AppleMusicPlaylist {
	name: string;
	id: string;
	tracks: AppleMusicSong[];
	last_modified: Date;
	url: string;
	spotify_url: string;
}
