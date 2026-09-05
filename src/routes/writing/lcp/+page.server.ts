import type { CacheData } from '$lib/lcp/applemusic';
import type { Repository } from '$lib/lcp/github';
import { Cache, loadFromLCP } from '$lib/lcp/lcp.server';
import type { Game } from '$lib/lcp/steam';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export const load = (({ fetch }) => ({
	workouts: loadFromLCP<Workout[]>(Cache.Workouts, fetch),
	music: loadFromLCP<CacheData>(Cache.AppleMusic, fetch),
	projects: loadFromLCP<Repository[]>(Cache.GitHub, fetch),
	games: loadFromLCP<Game[]>(Cache.Steam, fetch)
})) satisfies PageServerLoad;
