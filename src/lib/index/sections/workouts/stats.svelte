<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import Stats from '$lib/stats.svelte';
	import { renderDuration } from '$lib/time';

	const { workout }: { workout: Workout } = $props();

	const stats = new Map<string, string>([['Duration', renderDuration(workout.moving_time)]]);
	const distanceInMiles = (workout.distance * 0.621) / 1000;
	if (workout.distance) {
		stats.set('Distance', `${distanceInMiles.toPrecision(3)} mi`);
	} else if (workout.calories) {
		stats.set('Calories Burned', workout.calories?.toLocaleString() + ' cal');
	}
	if (workout.sport_type == 'Run') {
		const totalSecondsPerMile = workout.moving_time / distanceInMiles;
		const minutesPerMile = Math.floor(totalSecondsPerMile / 60);
		const secondsPerMile = Math.floor(totalSecondsPerMile % 60);
		stats.set('Avg. Pace', `${minutesPerMile}:${secondsPerMile.toString().padStart(2, '0')}/mi`);
	} else if (workout.total_elevation_gain > 304.8) {
		// if more than 1,000 ft of elevation gain
		stats.set(
			'Elevation Gain',
			`${Math.round(workout.total_elevation_gain * 3.280839895).toLocaleString()} ft`
		);
	} else if (workout.average_heartrate) {
		stats.set('Avg. Heart Rate', `${workout.average_heartrate} bpm`);
	}

	if (workout.hevy_volume_kg) {
		stats.set(
			'Total Volume',
			`${Math.round(workout.hevy_volume_kg * 2.2046226218).toLocaleString()} lbs`
		);
	}
	if (workout.hevy_set_count) {
		stats.set('Sets', `${workout.hevy_set_count ?? 0}`);
	}
</script>

<div class="container">
	<Stats {stats} />
</div>

<style>
	.container {
		margin-top: 10px;
	}
</style>
