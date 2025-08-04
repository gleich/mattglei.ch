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
	// await sleep(1000);

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

	const url = `https://lcp.mattglei.ch/${pathName}`;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 15_000);

	try {
		const res = await fetch(url, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${LCP_TOKEN}`
			},
			signal: controller.signal
		});

		clearTimeout(timeoutId);
		return await res.json();
	} catch (err: unknown) {
		if (err instanceof DOMException && err.name === 'AbortError') {
			console.error(`Timed out after 15 s: ${url}`);
		} else {
			console.error(`Error fetching ${url}:`, err);
		}
		return null;
	}
}
