<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { LineChart } from '@carbon/charts-svelte';
	import { ScaleTypes, type LineChartOptions } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	const { workout }: { workout: Workout } = $props();

	const data = workout.heartrate_data.map((n, i) => ({ value: n, index: i }));
	const options: LineChartOptions = {
		axes: {
			bottom: {
				domain: [0, 90],
				mapsTo: 'index',
				title: '',

				ticks: {
					values: []
				}
			},
			left: {
				domain: [Math.min(...workout.heartrate_data), Math.max(...workout.heartrate_data)],
				mapsTo: 'value',
				title: 'Heart Rate (bpm)',
				scaleType: ScaleTypes.LINEAR
			}
		},
		toolbar: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		height: '100%'
	};
</script>

<div class="container">
	<LineChart {data} {options} style="padding: 15px 10px; background-color: none !important;" />
</div>

<style>
	.container {
		aspect-ratio: 440/240;
	}
</style>
