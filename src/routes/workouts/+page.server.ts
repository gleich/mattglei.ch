import type { LcpResponse, SvelteFetch } from '$lib/lcp/lcp.server';
import { Cache } from '$lib/lcp/lcp.server';
import { loadFromLCP } from '$lib/lcp/lcp.server';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export interface WorkoutData {
	workouts: Promise<LcpResponse<Workout[]> | null>;
}

export const load: PageServerLoad = async ({ fetch }: { fetch: SvelteFetch }) => ({
	workouts: loadFromLCP(Cache.Workouts, fetch)
});
