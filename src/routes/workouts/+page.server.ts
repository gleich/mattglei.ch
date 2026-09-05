import { Cache, loadFromLCP } from '$lib/lcp/lcp.server';
import type { Workout } from '$lib/lcp/workouts';
import type { PageServerLoad } from './$types';

export const load = (({ fetch }) => ({
	workouts: loadFromLCP<Workout[]>(Cache.Workouts, fetch)
})) satisfies PageServerLoad;
