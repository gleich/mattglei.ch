<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { onDestroy, onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';

	const { workout }: { workout: Workout } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			const hr = $state.snapshot(workout.heartrate_data);
			chart = new Chart(canvas, {
				type: 'line',
				data: {
					labels: hr.map((_, i) => i.toString()),
					datasets: [
						{
							data: hr,
							borderColor: 'rgb(243, 9, 40)'
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							xAlign: 'center'
						}
					},
					animation: false,
					interaction: {
						intersect: false
					},
					scales: {
						x: {
							display: false
						},
						y: {
							grid: {
								color: 'rgb(67, 67, 67)'
							},
							border: {
								color: 'rgb(67, 67, 67)'
							},
							ticks: {
								count: 6,
								color: 'rgb(100, 100, 100)',
								font: {
									family: 'IBM Plex Sans'
								}
							}
						}
					},
					layout: {
						padding: {
							left: 5,
							right: 10,
							top: 15
						}
					},
					elements: {
						point: {
							radius: 0
						},
						line: {
							tension: 0.5,
							borderCapStyle: 'round',
							borderWidth: 2
						}
					}
				}
			});
		}
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<div class="container">
	<div class="chart-wrapper">
		<canvas class="canvas" bind:this={canvas}></canvas>
	</div>
	<p class="title">heartrate data in bpm</p>
</div>

<style>
	.container {
		aspect-ratio: 440/240;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.chart-wrapper {
		flex: 1 1 auto;
		position: relative;
	}

	.chart-wrapper canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.canvas {
		flex: 1 1 auto;
		display: block;
		width: 100%;
	}

	.title {
		color: var(--red-foreground);
		background-color: var(--red-background);
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 4px;
		padding-top: 2px;
		font-family: 'IBM Plex Mono';
		font-size: 13px;
		flex: 0 0 auto;
	}
</style>
