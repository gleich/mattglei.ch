export interface Game {
	name: string;
	app_id: number;
	url: string;
	icon_url: string;
	header_url: string;
	header_blur_hash: string;
	library_url: string | undefined;
	playtime_forever: number;
	achievement_progress: number | undefined;
	achievements: Achievement[] | undefined;
}

export interface Achievement {
	api_name: string;
	achieved: boolean;
	icon: string;
	display_name: string;
	description: string | undefined;
}
