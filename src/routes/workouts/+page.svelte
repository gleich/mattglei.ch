<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Error from '$lib/error.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import Workout from '$lib/index/sections/workouts/workout.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import type { WorkoutData } from './+page.server';

	const { data }: { data: WorkoutData } = $props();
</script>

<DynamicHead title="Workouts" description="Recent workouts from Hevy/Strava" />

{#if data.workouts}
	<h2>Workouts</h2>
	<div class="workouts">
		{#each data.workouts.data.slice(0, 14) as workout}
			<div class="workout">
				<Workout {workout} />
			</div>
		{/each}
	</div>
	<a class="view-more" href="https://www.strava.com/athletes/30124266" target="_blank">
		<ViewButton more on="Strava" icon={Strava} /></a
	>
{:else}
	<Error msg="Failed to load workouts" />
{/if}

<style>
	h2 {
		margin-bottom: 30px;
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

	.view-more {
		text-decoration: inherit;
		margin-top: 30px;
	}

	@media (max-width: 760px) {
		.workout {
			width: 100%;
			max-width: 500px;
		}
	}
</style>
