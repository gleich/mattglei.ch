<script lang="ts">
	import Error from '$lib/error.svelte';
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import { type Workout as LcpWorkout } from '$lib/lcp/workouts';
	import Loading from '$lib/loading.svelte';
	import Section from '../../section.svelte';
	import Workout from './workout.svelte';

	const { workouts, loading }: { workouts?: LcpResponse<LcpWorkout[]> | null; loading?: boolean } =
		$props();

	const stravaURL = 'https://www.strava.com/about';
	const hevyURL = 'https://www.hevyapp.com';
</script>

<Section
	name="Workouts"
	liveData={{
		sources: [
			{
				name: 'Strava',
				icon: Strava,
				url: stravaURL,
				iconLeftMargin: '8px',
				iconRightMargin: '5px'
			},
			{
				name: 'Hevy',
				icon: Hevy,
				url: hevyURL,
				iconLeftMargin: '10px',
				iconRightMargin: '8px'
			}
		],
		updated: workouts?.updated
	}}
>
	{#if loading}
		<Loading expectedHeight="521px" />
	{:else if workouts != null}
		<p>
			One of my favorite things is staying active and enjoying the outdoors. I grew up in New
			Hampshire hiking, biking, snowshoeing, and traveling with my family. Out of all of those
			things I especially love cycling mainly through gravel cycling, road cycling, and mountain
			biking. Recently I've been getting into lifting which has been a ton of fun. Below are 2 of my
			most recent <a href={stravaURL} target="_blank">Strava</a>/<a href={hevyURL}>Hevy</a> workouts:
		</p>
		<div class="workouts">
			{#each workouts.data.slice(0, 2) as workout}
				<div class="workout">
					<Workout {workout} />
				</div>
			{/each}
		</div>
		<a href="/workouts"><button>View More Workouts</button></a>
	{:else}
		<Error msg="Failed to load" />
	{/if}
</Section>

<style>
	.workouts {
		display: flex;
		gap: 10px;
	}

	button {
		width: 100%;
		padding: 5px;
	}

	.workout {
		width: 50%;
	}

	@media (max-width: 730px) {
		.workout {
			width: 100%;
		}
	}

	@media (max-width: 715px) {
		.workouts {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
