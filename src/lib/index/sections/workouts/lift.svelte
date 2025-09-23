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
		<div class="table">
			{#each workout.hevy_exercises ?? [] as exercise (exercise.exercise_template_id)}
				<div>
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
									<th>Sets</th>
									<th>Weight & Reps</th>
								</tr>
							</thead>
							<tbody>
								{#each exercise.sets as set (set)}
									<tr>
										<td>{formatWeight(set.weight_kg)}</td>
										<td>{set.reps}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.scroll-container {
		max-width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		aspect-ratio: 440/240;
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
		margin: 12px 0px;
	}
</style>
