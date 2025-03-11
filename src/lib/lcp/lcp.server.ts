import { LCP_TOKEN } from '$env/static/private';
import type { SvelteFetch } from '../../routes/+page.server';

export interface Response<T> {
	updated: Date;
	data: T;
}

export enum Cache {
	Workouts,
	GitHub,
	Steam,
	AppleMusic
}

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loadFromLCP<T>(cache: Cache, fetch: SvelteFetch): Promise<Response<T>> {
	// await sleep(5000);
	let pathName: string;
	switch (cache) {
		case Cache.Workouts:
			pathName = 'workouts';
			break;
		case Cache.GitHub:
			pathName = 'github';
			break;
		case Cache.Steam:
			pathName = 'steam';
			break;
		case Cache.AppleMusic:
			pathName = 'applemusic';
			break;
	}
	const res = await fetch(`https://lcp.dev.mattglei.ch/${pathName}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${LCP_TOKEN}`
		}
	});
	const data: Response<T> = await res.json();
	return data;
}
