import type { CacheData } from '$lib/lcp/applemusic';
import type { Repository } from '$lib/lcp/github';
import { Cache, loadFromLCP, type LcpResponse } from '$lib/lcp/lcp.server';
import type { Game } from '$lib/lcp/steam';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

function first<T>(res: Promise<LcpResponse<T[]> | null>, count: number) {
	return res.then((r) => r && { ...r, data: r.data.slice(0, count) });
}

export const load = (({ fetch }) => ({
	workouts: first(loadFromLCP<Workout[]>(Cache.Workouts, fetch), 2),
	music: loadFromLCP<CacheData>(Cache.AppleMusic, fetch),
	projects: loadFromLCP<Repository[]>(Cache.GitHub, fetch),
	games: first(loadFromLCP<Game[]>(Cache.Steam, fetch), 6)
})) satisfies PageServerLoad;
