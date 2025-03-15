<script lang="ts">
	import Error from '$lib/error.svelte';
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import { type Workout as LcpWorkout } from '$lib/lcp/workouts';
	import Loading from '$lib/loading.svelte';
	import Scrolling from '$lib/scrolling.svelte';
	import FormattedDate from '$lib/time/formatted-date.svelte';
	import Section from '../../section.svelte';
	import Map from './map.svelte';
	import SportIcon from './sport-icon.svelte';
	import Stats from './stats.svelte';

	const { workouts, loading }: { workouts?: LcpResponse<LcpWorkout[]> | null; loading?: boolean } =
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
		<Loading />
	{:else if workouts != null}
		<div class="workouts">
			{#each workouts.data.slice(0, 2) as workout}
				<div class="workout">
					<div class="header">
						<SportIcon sport_type={workout.sport_type} />
						<Scrolling gap={10} speed={20}>
							<h3>{workout.name}</h3>
						</Scrolling>
					</div>
					<p class="time">
						<FormattedDate time={workout.start_date} timezone={workout.timezone.split(' ')[1]} />
					</p>
					{#if workout.platform === 'strava'}
						{#if workout.has_map}
							<Map {workout} />
						{/if}
					{/if}
					<div class="stats">
						<Stats {workout} />
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<Error msg="Failed to load" />
	{/if}
</Section>

<style>
	.workouts {
		display: flex;
		gap: 15px;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	.time {
		color: grey;
		font-family: 'IBM Plex Mono';
		font-size: 13.5px;
		font-weight: 400;
		margin-bottom: 5px;
	}

	.workout {
		width: 50%;
	}

	.stats {
		margin-top: 5px;
	}
</style>
