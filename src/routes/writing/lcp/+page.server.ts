import type { CacheData } from '$lib/lcp/applemusic';
import type { Repository } from '$lib/lcp/github';
import { Cache, loadFromLCP, type LcpResponse, type SvelteFetch } from '$lib/lcp/lcp.server';
import type { Game } from '$lib/lcp/steam';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export interface LCPData {
	workouts: LcpResponse<Workout[]> | null;
	music: LcpResponse<CacheData> | null;
	projects: LcpResponse<Repository[]> | null;
	games: LcpResponse<Game[]> | null;
}

export const load: PageServerLoad = async ({ fetch }: { fetch: SvelteFetch }) => ({
	workouts: loadFromLCP(Cache.Workouts, fetch),
	music: loadFromLCP(Cache.AppleMusic, fetch),
	projects: loadFromLCP(Cache.GitHub, fetch),
	games: loadFromLCP(Cache.Steam, fetch)
});
