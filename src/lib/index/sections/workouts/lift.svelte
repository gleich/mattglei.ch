<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import Scrolling from '$lib/scrolling.svelte';

	const { workout }: { workout: Workout } = $props();
</script>

<div class="container">
	<div class="table">
		{#each workout.hevy_exercises ?? [] as exercise, exerciseIndex}
			<div>
				<a
					href={`https://hevy.com/exercise/${exercise.exercise_template_id}`}
					target="_blank"
					class="exercise-name"
				>
					<Scrolling>
						{`#${exerciseIndex + 1}: ${exercise.title.replaceAll('(', ']').replaceAll(')', ']')}`}
					</Scrolling>
				</a>
				<div class="sets">
					{#each exercise.sets as set, setIndex}
						<div class="set">
							<div class="set-number" title={set.type == 'warmup' ? 'Warmup Set' : undefined}>
								{set.type === 'warmup' ? 'Warmup Set' : `Set #${setIndex + 1}`}
							</div>
							<div>
								{Math.round(set.weight_kg * 2.2046226218)} lbs × {set.reps} reps
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 100%;
		overflow-y: scroll;
		aspect-ratio: 440/240;
		height: auto;
		margin-bottom: 10px;
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
	}

	.exercise-name {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
		color: var(--green-foreground);
		border-right: 0;
		border-left: 0;
		text-decoration: inherit;
	}

	.set-number {
		border: 1.5px solid var(--border);
		background-color: rgb(46, 49, 52);
		padding: 0px 7px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sets {
		display: grid;
		grid-template-columns: 1fr 1fr;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		grid-column: 50%;
		gap: 5px;
		margin: 5px 0px;
	}

	.set {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		font-size: 15px;
	}

	@media (max-width: 800px) {
		.sets {
			gap: 2px;
		}
	}

	@media (max-width: 770px) {
		.sets {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 715px) {
		.sets {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 380px) {
		.sets {
			grid-template-columns: 1fr;
		}
	}
</style>
