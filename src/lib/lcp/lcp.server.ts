import { LCP_TOKEN } from '$env/static/private';

export type SvelteFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface LcpResponse<T> {
	updated: Date;
	data: T;
}

export enum Cache {
	Workouts,
	GitHub,
	Steam,
	AppleMusic
}

export async function loadFromLCP<T>(
	cache: Cache,
	fetch: SvelteFetch
): Promise<LcpResponse<T> | null> {
	// uncomment to check loading animation for each section
	// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	// await sleep(10000);

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
	const url = `https://lcp.dev.mattglei.ch/${pathName}`;
	try {
		const res = await fetch(url, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${LCP_TOKEN}`
			}
		});
		return await res.json();
	} catch (error) {
		console.error(`error when trying to fetch ${url}:`, error);
		return null;
	}
}
