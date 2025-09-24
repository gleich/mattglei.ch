<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { renderDuration } from '$lib/time';
	import { Scrolling } from '@gleich/ui';
	import { onMount } from 'svelte';

	const { workout }: { workout: Workout } = $props();

	let imperialUnits = $state(false);

	function formatWeight(weight: number): string {
		const fixedWeight = weight.toFixed(1);
		if (Number.isInteger(+fixedWeight)) {
			return Math.round(weight).toString();
		} else {
			return fixedWeight;
		}
	}

	onMount(() => {
		imperialUnits = navigator.language === 'en-US';
	});
</script>

<div class="container">
	<div class="scroll-container">
		{#each workout.hevy_exercises ?? [] as exercise (exercise.exercise_template_id)}
			<div class="exercise">
				<a
					href={`https://hevy.com/exercise/${exercise.exercise_template_id}`}
					target="_blank"
					class="exercise-name"
				>
					<Scrolling>
						<p>
							{`${exercise.title.replaceAll('(', '[').replaceAll(')', ']')}`}
						</p>
					</Scrolling>
				</a>
				<div class="sets">
					<table>
						<thead>
							<tr>
								<th>Set #</th>
								<th>Type</th>
								{#if exercise.sets.at(0)?.duration_seconds}
									<th>Time</th>
								{:else if exercise.sets.every((s) => s.weight_kg === 0)}
									<th>Reps</th>
								{:else}
									<th>Weight & Reps</th>
								{/if}
							</tr>
						</thead>
						<tbody>
							{#each exercise.sets as set, index (set)}
								<tr>
									<td class="index">{index + 1}</td>
									{#if set.type == 'warmup'}
										<td class="warmup set">Warmup</td>
									{:else if set.type == 'failure'}
										<td class="failure set">Till Failure</td>
									{:else if set.type === 'dropset'}
										<td class="drop set">Dropset</td>
									{:else}
										<td class="normal set">Normal</td>
									{/if}
									<td>
										{#if set.duration_seconds}
											{renderDuration(set.duration_seconds)}
										{:else if exercise.sets.every((s) => s.weight_kg == 0)}
											{set.reps} reps
										{:else}
											{imperialUnits
												? `${formatWeight(set.weight_kg * 2.2046226218)} lbs`
												: `${formatWeight(set.weight_kg)} kg`} × {set.reps}
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.scroll-container {
		max-width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		aspect-ratio: 440/240;
		font-size: 15px;
	}

	.exercise-name {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--green-background);
		border: 0.5px solid var(--green-border);
		color: var(--green-foreground);
		border-right: 0;
		border-left: 0;
		padding: 2px;
		text-decoration: inherit;
		font-size: 15.5px;
	}

	.sets {
		display: flex;
		flex-direction: column;
		grid-column: 50%;
		gap: 5px;
	}

	.exercise {
		margin-bottom: 20px;
	}

	.exercise:last-child {
		margin-bottom: 0;
	}

	table {
		border-collapse: collapse;
	}

	table,
	thead,
	th {
		margin-top: 0;
		padding-top: 0;
	}

	td {
		text-align: center;
	}

	tr {
		border: 0;
	}

	th {
		color: grey;
		font-weight: normal;
	}

	th,
	td {
		border-left: 1px solid var(--border);
	}

	th:first-child,
	td:first-child {
		border-left: 0;
	}

	thead th {
		border-bottom: 1px solid var(--border);
	}

	tbody td {
		border-top: 1px solid var(--border);
	}

	tbody tr:last-child td {
		border-bottom: 1px solid var(--border);
	}

	.index {
		color: grey;
	}

	.set {
		margin: 2px 0;
		padding: 1px 10px;
		width: fit-content;
	}

	.failure {
		background-color: var(--red-background);
		color: var(--red-foreground);
	}

	.normal {
		background-color: #333333;
	}

	.drop {
		background-color: #222c41;
		color: var(--blue-foreground);
	}

	.warmup {
		color: rgb(255, 115, 0);
		background-color: rgb(55, 36, 0);
	}

	@media (prefers-color-scheme: light) {
		.warmup {
			background-color: rgb(248 200 151);
			color: black;
		}

		.normal {
			background-color: #fff;
		}

		.drop {
			background-color: #c3e4ff;
		}
	}
</style>
