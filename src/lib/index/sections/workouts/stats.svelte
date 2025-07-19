<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import Stats from '$lib/stats.svelte';
	import { renderDuration } from '$lib/time';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const { workout }: { workout: Workout } = $props();

	let imperialUnits = $state(false);
	let stats = $derived(
		new SvelteMap<string, string>([['Duration', renderDuration(workout.moving_time)]])
	);

	onMount(() => {
		const locale = navigator.language;
		imperialUnits = locale === 'en-US';

		if (workout.distance) {
			const distanceKm = workout.distance / 1000;
			const distanceMiles = distanceKm * 0.621371;

			stats.set(
				'Distance',
				imperialUnits
					? `${distanceMiles < 1 ? distanceMiles.toPrecision(2) : distanceMiles.toPrecision(3)} mi`
					: `${distanceKm.toPrecision(3)} km`
			);
		} else if (workout.calories) {
			stats.set('Calories Burned', workout.calories?.toLocaleString() + ' cal');
		}

		if (workout.sport_type === 'Run' && workout.distance) {
			if (imperialUnits) {
				const distanceKm = workout.distance / 1000;
				const distanceMiles = distanceKm * 0.621371;
				const totalSecondsPerMile = workout.moving_time / distanceMiles;
				const minutesPerMile = Math.floor(totalSecondsPerMile / 60);
				const secondsPerMile = Math.floor(totalSecondsPerMile % 60);
				stats.set(
					'Avg. Pace',
					`${minutesPerMile}:${secondsPerMile.toString().padStart(2, '0')}/mi`
				);
			} else {
				const distanceKm = workout.distance / 1000;
				const totalSecondsPerKm = workout.moving_time / distanceKm;
				const minutesPerKm = Math.floor(totalSecondsPerKm / 60);
				const secondsPerKm = Math.floor(totalSecondsPerKm % 60);
				stats.set('Avg. Pace', `${minutesPerKm}:${secondsPerKm.toString().padStart(2, '0')}/km`);
			}
		} else if (workout.total_elevation_gain && workout.total_elevation_gain > 228.6) {
			// show elevation if greater than 750ft
			stats.set(
				'Elevation Gain',
				`${Math.round(
					imperialUnits ? workout.total_elevation_gain * 3.28084 : workout.total_elevation_gain
				).toLocaleString()} ${imperialUnits ? 'ft' : 'm'}`
			);
		} else if (workout.average_heartrate) {
			stats.set('Avg. Heart Rate', `${workout.average_heartrate} bpm`);
		}

		if (workout.hevy_volume_kg) {
			stats.set(
				'Total Volume',
				`${Math.round(
					imperialUnits ? workout.hevy_volume_kg * 2.2046226218 : workout.hevy_volume_kg
				).toLocaleString()} ${imperialUnits ? 'lbs' : 'kg'}`
			);
		}

		if (workout.hevy_set_count) {
			stats.set('Sets', `${workout.hevy_set_count ?? 0}`);
		}

		stats = new SvelteMap(stats);
	});
</script>

<div class="container">
	<Stats {stats} />
</div>

<style>
	.container {
		margin-top: 10px;
	}
</style>
