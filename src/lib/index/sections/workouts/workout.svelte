<script lang="ts">
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import type { Workout } from '$lib/lcp/workouts';
	import Scrolling from '$lib/scrolling.svelte';
	import FormattedDate from '$lib/time/formatted-date.svelte';
	import Lift from './lift.svelte';
	import Map from './map.svelte';
	import SportIcon from './sport-icon.svelte';
	import Stats from './stats.svelte';

	const { workout }: { workout: Workout } = $props();
</script>

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

<style>
	.workout {
		width: 100%;
		border: 1px solid var(--border);
		padding: 5px 10px;
		border-radius: var(--border-radius);
		box-shadow: var(--box-shadow);
		background-color: var(--real-background);
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

	.stats {
		margin-top: 5px;
	}
</style>
