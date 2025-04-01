<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import Scrolling from '$lib/scrolling.svelte';

	const { workout }: { workout: Workout } = $props();
</script>

<div class="container">
	<div class="table">
		{#each workout.hevy_exercises ?? [] as exercise, exerciseIndex (exercise.exercise_template_id)}
			<div>
				<a
					href={`https://hevy.com/exercise/${exercise.exercise_template_id}`}
					target="_blank"
					class="exercise-name"
				>
					<Scrolling>
						{`#${exerciseIndex + 1}: ${exercise.title.replaceAll('(', '[').replaceAll(')', ']')}`}
					</Scrolling>
				</a>
				<div class="sets">
					{#each exercise.sets as set, setIndex (set.type + setIndex)}
						<div class={`${set.type === 'warmup' ? 'warmup-set' : ''} set`}>
							<div class={`${set.type === 'warmup' ? 'warmup-set-number' : ''} set-number`}>
								{set.type === 'warmup' ? 'Warmup Set' : `Set #${setIndex + 1}`}
							</div>
							<div class="set-value">
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
		overflow-x: hidden;
		aspect-ratio: 440/240;
		height: auto;
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

	.warmup-set-number {
		color: rgb(255, 115, 0);
		background-color: rgb(55, 36, 0) !important;
		border: 1.5px solid rgb(158, 71, 0) !important;
	}

	.set-number {
		border: 1.5px solid var(--border);
		background-color: rgb(46, 49, 52);
		padding: 0px 7px;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}

	.set-value {
		width: 110px;
		font-size: 14.5px;
		white-space: nowrap;
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

	.warmup-set {
		grid-column: span 2;
	}

	@media (prefers-color-scheme: light) {
		.set-number {
			background-color: rgb(205, 205, 205);
		}

		.warmup-set-number {
			background-color: rgb(255, 199, 125) !important;
			border-color: rgb(211, 137, 0) !important;
			color: black;
		}
	}

	@media (max-width: 850px) {
		.sets {
			grid-template-columns: 1fr;
			gap: 4px;
		}

		.set-number {
			width: 25%;
		}

		.warmup-set {
			grid-column: span 1;
		}
	}

	@media (max-width: 715px) {
		.sets {
			grid-template-columns: 1fr 1fr;
		}

		.warmup-set {
			grid-column: span 2;
		}
	}

	@media (max-width: 420px) {
		.warmup-set {
			grid-column: span 1;
		}

		.set-number {
			width: 28%;
			min-width: 100px;
		}

		.sets {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
