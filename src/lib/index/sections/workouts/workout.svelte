<script lang="ts">
	import HevyWorkout from '$lib/icons/hevy-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import type { Workout } from '$lib/lcp/workouts';
	import FormattedDate from '$lib/time/formatted-date.svelte';
	import { Card, Scrolling } from '@gleich/ui';
	import Lift from './lift.svelte';
	import SportIcon from './sport-icon.svelte';
	import Stats from './stats.svelte';
	import Graph from './graph.svelte';
	import Map from './map.svelte';

	const { workout }: { workout: Workout } = $props();
</script>

<Card padding="0">
	<div class="workout">
		<div class="header">
			<SportIcon sport_type={workout.sport_type} />
			<a
				href={workout.platform === 'strava'
					? `https://www.strava.com/activities/${workout.id}`
					: `https://hevy.com/workout/${workout.id}`}
				title={`View "${workout.name}" on ${workout.platform === 'strava' ? 'Strava' : 'Hevy'}`}
				class="header-link"
				target="_blank"
			>
				<Scrolling>
					<h4 class="workout-name">{workout.name}</h4>
				</Scrolling>
				<div class="platform-icon">
					{#if workout.platform === 'strava'}
						<StravaIcon />
					{:else if workout.platform === 'hevy'}
						<HevyWorkout />
					{/if}
				</div>
			</a>
		</div>
		<p class="time">
			<FormattedDate time={workout.start_date} />
		</p>
		<div class="data">
			{#if workout.platform === 'strava'}
				{#if workout.has_map}
					<Map {workout} />
				{:else if workout.heartrate_data.length != 0}
					<Graph {workout} />
				{/if}
			{:else if workout.platform === 'hevy'}
				<Lift {workout} />
			{/if}
		</div>
		<Stats {workout} />
	</div>
</Card>

<style>
	.workout {
		width: 100%;
		padding: 10px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
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
		margin-right: 5px;
		margin-left: 10px;
		flex-shrink: 0;
	}

	.time {
		color: grey;
		font-family: 'IBM Plex Mono';
		font-size: 13.5px;
		font-weight: 400;
		margin-top: 1.5px;
		margin-bottom: 4px;
		margin-left: 2px;
	}

	.data {
		border-radius: var(--border-radius);
		overflow: hidden;
		border: 1px solid var(--border);
	}

	@media (max-width: 500px) {
		.workout-name {
			font-size: 1.4rem;
		}

		.platform-icon {
			width: 19px;
			height: 19px;
		}

		.time {
			font-size: 12.5px;
		}
	}
</style>
