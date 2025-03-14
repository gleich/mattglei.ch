<script lang="ts">
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import type { Workout } from '$lib/lcp/workouts';
	import Section from '../../section.svelte';

	const { workouts, loading }: { workouts?: LcpResponse<Workout[] | null>; loading?: boolean } =
		$props();
</script>

<Section
	name="Workouts"
	liveData={{
		sources: [
			{
				name: 'Strava',
				icon: Strava,
				url: 'https://www.strava.com/about',
				iconLeftMargin: '8px',
				iconRightMargin: '5px'
			},
			{
				name: 'Hevy',
				icon: Hevy,
				url: 'https://www.hevyapp.com',
				iconLeftMargin: '10px',
				iconRightMargin: '8px'
			}
		],
		updated: workouts?.updated
	}}
>
	{#if loading}
		<p>loading workouts...</p>
	{:else}
		<p>foo</p>
	{/if}
</Section>
