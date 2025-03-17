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
	import Lift from './lift.svelte';
	import Map from './map.svelte';
	import SportIcon from './sport-icon.svelte';
	import Stats from './stats.svelte';

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
		<Loading />
	{:else if workouts != null}
		<div class="container">
			<p>
				One of my favorite things is staying active and enjoying the outdoors. I grew up in New
				Hampshire hiking, biking, snowshoeing, and traveling with my family. Out of all of those
				things I especially love cycling mainly through gravel cycling, road cycling, and mountain
				biking. Recently I've been getting into lifting which has been a ton of fun. Below are 2 of
				my most recent <a href={stravaURL} target="_blank">Strava</a>/<a href={hevyURL}>Hevy</a> workouts:
			</p>
			<div class="workouts">
				{#each workouts.data.slice(0, 2) as workout}
					<div class="workout">
						<div class="header">
							<SportIcon sport_type={workout.sport_type} />
							<a
								href={workout.platform === 'strava'
									? `https://www.strava.com/activities/${workout.id}`
									: `https://hevy.com/workout/${workout.id}`}
								class="header-link"
								target="_blank"
							>
								<Scrolling>
									<h3>{workout.name}</h3>
								</Scrolling>
								<div class="platform-icon">
									{#if workout.platform === 'strava'}
										<Strava />
									{:else if workout.platform === 'hevy'}
										<Hevy />
									{/if}
								</div>
							</a>
						</div>
						<p class="time">
							<FormattedDate time={workout.start_date} timezone={workout.timezone.split(' ')[1]} />
						</p>
						{#if workout.platform === 'strava'}
							{#if workout.has_map}
								<Map {workout} />
							{/if}
						{:else if workout.platform === 'hevy'}
							<Lift {workout} />
						{/if}
						<div class="stats">
							<Stats {workout} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<Error msg="Failed to load" />
	{/if}
</Section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.workouts {
		padding-top: 10px;
		display: flex;
		gap: 10px;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	.header-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		color: inherit;
		text-decoration: inherit;
	}

	.platform-icon {
		width: 21px;
		height: 21px;
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
		border: 1px solid var(--border);
		padding: 5px 10px;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
	}

	.stats {
		margin-top: 5px;
	}

	@media (max-width: 715px) {
		.workouts {
			flex-direction: column;
			align-items: center;
		}

		.workout {
			width: 100%;
			max-width: 500px;
		}
	}
</style>
