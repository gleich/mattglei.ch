import type { CacheData } from '$lib/lcp/applemusic';
import { Cache, loadFromLCP, type Response as LcpResponse } from '$lib/lcp/lcp.server';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export interface SectionData {
	workouts: LcpResponse<Workout[]>;
	music: LcpResponse<CacheData>;
}

export type SvelteFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export const load: PageServerLoad = async ({ fetch }: { fetch: SvelteFetch }) => {
	return {
		workouts: loadFromLCP<Workout[]>(Cache.Workouts, fetch),
		music: loadFromLCP<CacheData>(Cache.AppleMusic, fetch)
	};
};
