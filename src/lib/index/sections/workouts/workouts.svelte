<script lang="ts">
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import type { Response } from '$lib/lcp/lcp.server';
	import type { Workout } from '$lib/lcp/workouts';
	import Section from '../../section.svelte';

	const { workouts }: { workouts: Response<Workout[]> } = $props();
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
				iconRightMargin: '7px'
			}
		],
		updated: workouts.updated
	}}
>
	<p>foo</p>
</Section>
