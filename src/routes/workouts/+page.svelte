<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Workout from '$lib/index/sections/workouts/workout.svelte';
	import type { WorkoutData } from './+page.server';

	const { data }: { data: WorkoutData } = $props();
</script>

<DynamicHead title="Workouts" description="Recent workouts from Hevy and Strava" />

{#if data.workouts}
	<p class="intro">Here are {data.workouts.data.length} of my latest workouts from Strava/Hevy:</p>
	<div class="workouts">
		{#each data.workouts.data as workout}
			<div class="workout">
				<Workout {workout} />
			</div>
		{/each}
	</div>
{:else}
	<Error msg="Failed to load workouts" />
{/if}

<style>
	.intro {
		padding-bottom: 20px;
	}

	.workouts {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.workout {
		width: calc(50% - 5px);
	}

	@media (max-width: 760px) {
		.workout {
			width: 100%;
			max-width: 500px;
		}
	}
</style>
