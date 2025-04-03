<script lang="ts">
	import Card from '$lib/card.svelte';
	import HevyWorkout from '$lib/icons/hevy-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import type { Workout } from '$lib/lcp/workouts';
	import Scrolling from '$lib/scrolling.svelte';
	import FormattedDate from '$lib/time/formatted-date.svelte';
	import Lift from './lift.svelte';
	import Map from './map.svelte';
	import SportIcon from './sport-icon.svelte';
	import Stats from './stats.svelte';

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
					<h3>{workout.name}</h3>
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
		{#if workout.platform === 'strava'}
			{#if workout.has_map}
				<Map {workout} />
			{/if}
		{:else if workout.platform === 'hevy'}
			<Lift {workout} />
		{/if}
		<Stats {workout} />
	</div>
</Card>

<style>
	h3 {
		line-height: 120%;
		overflow-y: hidden;
	}

	.workout {
		width: 100%;
		padding: 5px;
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
	}

	.time {
		color: grey;
		font-family: 'IBM Plex Mono';
		font-size: 13.5px;
		font-weight: 400;
		margin-top: 2px;
		margin-bottom: 3px;
	}
</style>
