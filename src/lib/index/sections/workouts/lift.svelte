<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { renderDuration } from '$lib/time';
	import { Scrolling } from '@gleich/ui';
	import { onMount } from 'svelte';

	const { workout }: { workout: Workout } = $props();

	let imperialUnits = $state(false);

	onMount(() => {
		imperialUnits = navigator.language === 'en-US';
	});
</script>

<div class="container">
	<div class="scroll-container">
		<div class="table">
			{#each workout.hevy_exercises ?? [] as exercise, exerciseIndex (exercise.exercise_template_id)}
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
						{#if exercise.superset_id != undefined}
							<p class="superset">Superset #{exercise.superset_id}</p>
						{/if}
					</a>
					<div class="sets">
						{#each exercise.sets as set, setIndex (set.type + setIndex)}
							<div
								class={`${set.type === 'warmup' && exercise.sets.length != 2 ? 'warmup-set' : ''} set`}
							>
								<div class={`${set.type === 'warmup' ? 'warmup-set-number' : ''} set-number`}>
									{set.type === 'warmup' ? 'Warmup' : `Set #${setIndex + 1}`}
								</div>
								<div class="set-value">
									{#if set.duration_seconds}
										{renderDuration(set.duration_seconds)}
									{:else}
										{imperialUnits
											? `${Math.round(set.weight_kg * 2.2046226218)} lbs`
											: `${Math.round(set.weight_kg)}} kg`} × {set.reps} reps
									{/if}
								</div>
							</div>
						{/each}
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

	.warmup-set-number {
		color: rgb(255, 115, 0);
		background-color: rgb(55, 36, 0) !important;
		border: 1.5px dashed rgb(158, 71, 0) !important;
		padding: 0 15px !important;
		padding-bottom: 1px !important;
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
		border-radius: 3px;
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
		margin: 12px 0px;
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

	.superset {
		font-size: 14px;
		line-height: 80%;
		margin-bottom: 3px;
	}

	@media (prefers-color-scheme: light) {
		.set-number {
			background-color: rgb(205, 205, 205);
		}

		.warmup-set-number {
			background-color: rgb(248 200 151) !important;
			border-color: rgba(255, 128, 0, 0.627) !important;
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
