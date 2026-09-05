import { LCP_TOKEN } from '$env/static/private';

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
	fetch: typeof globalThis.fetch
): Promise<LcpResponse<T> | null> {
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
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${LCP_TOKEN}`
			},
			signal: controller.signal
		});

		if (!res.ok) return null;
		return await res.json();
	} catch (err: unknown) {
		if (err instanceof DOMException && err.name === 'AbortError') {
			console.error(`Timed out after 15s: ${url}`);
		} else {
			console.error(`Error fetching ${url}:`, err);
		}
		return null;
	} finally {
		clearTimeout(timeoutId);
	}
}
