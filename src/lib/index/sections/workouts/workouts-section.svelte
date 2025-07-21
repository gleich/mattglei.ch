<script lang="ts">
	import HevyIcon from '$lib/icons/hevy-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import { type Workout as LcpWorkout } from '$lib/lcp/workouts';
	import Loading from '$lib/loading.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { Error } from '@gleich/ui';
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
				icon: StravaIcon,
				url: stravaURL,
				iconLeftMargin: '8px',
				iconRightMargin: '5px'
			},
			{
				name: 'Hevy',
				icon: HevyIcon,
				url: hevyURL,
				iconLeftMargin: '10px',
				iconRightMargin: '8px'
			}
		],
		updated: workouts?.updated
	}}
>
	{#if loading}
		<Loading height={529.91} />
	{:else if workouts != null}
		<p>
			One of my favorite things is staying active and enjoying the outdoors. I grew up in New
			Hampshire hiking, biking, snowshoeing, and traveling with my family. Out of all of those
			things I especially love cycling mainly through gravel cycling, road cycling, and mountain
			biking. Recently I've been getting into lifting which has been a ton of fun. Below are 2 of my
			most recent <a href={stravaURL} target="_blank">Strava</a>/<a href={hevyURL}>Hevy</a> workouts:
		</p>
		<div class="workouts">
			{#each workouts.data.slice(0, 2) as workout (workout.id)}
				<div class="workout">
					<Workout {workout} />
				</div>
			{/each}
		</div>
		<a class="view-more" href="/workouts">
			<ViewButton more of="workouts" />
		</a>
	{:else}
		<Error msg="Failed to load workout data" />
	{/if}
</Section>

<style>
	.workouts {
		display: flex;
		gap: 10px;
	}

	.workout {
		width: 50%;
	}

	.view-more {
		text-decoration: inherit;
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
