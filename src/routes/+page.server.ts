import type { CacheData } from '$lib/lcp/applemusic.server';
import { Cache, loadFromLCP, type LcpResponse, type SvelteFetch } from '$lib/lcp/lcp.server';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export interface SectionData {
	workouts: LcpResponse<Workout[] | null>;
	music: LcpResponse<CacheData | null>;
}

export const load: PageServerLoad = async ({ fetch }: { fetch: SvelteFetch }) => ({
	workouts: loadFromLCP(Cache.Workouts, fetch),
	music: loadFromLCP(Cache.AppleMusic, fetch)
});
