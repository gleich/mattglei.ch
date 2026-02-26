import type { CacheData } from '$lib/lcp/applemusic';
import type { Repository } from '$lib/lcp/github';
import { Cache, loadFromLCP, type LcpResponse, type SvelteFetch } from '$lib/lcp/lcp.server';
import type { Game } from '$lib/lcp/steam';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export interface SectionData {
	workouts: Promise<LcpResponse<Workout[]> | null>;
	music: Promise<LcpResponse<CacheData> | null>;
	projects: Promise<LcpResponse<Repository[]> | null>;
	games: Promise<LcpResponse<Game[]> | null>;
}

export const load: PageServerLoad = async ({ fetch }: { fetch: SvelteFetch }) => ({
	workouts: loadFromLCP(Cache.Workouts, fetch),
	music: loadFromLCP(Cache.AppleMusic, fetch),
	projects: loadFromLCP(Cache.GitHub, fetch),
	games: loadFromLCP(Cache.Steam, fetch)
});
