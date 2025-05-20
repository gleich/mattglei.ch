<script lang="ts">
	import HevyIcon from '$lib/icons/hevy-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import Workout from '$lib/index/sections/workouts/workout.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { DynamicHead, Error } from '@gleich/ui';
	import type { WorkoutData } from './+page.server';

	const { data }: { data: WorkoutData } = $props();
</script>

<DynamicHead
	title="Workouts"
	description="Recent workouts from Hevy/Strava"
	siteName="mattglei.ch"
/>

{#if data.workouts}
	<h2>Workouts</h2>
	<div class="workouts">
		{#each data.workouts.data.slice(0, 14) as workout (workout.id)}
			<div class="workout">
				<Workout {workout} />
			</div>
		{/each}
	</div>
	<div class="view-more-buttons">
		<a class="view-more" href="https://www.strava.com/athletes/30124266" target="_blank">
			<ViewButton more on="Strava" icon={StravaIcon} /></a
		>
		<a class="view-more" href="https://hevy.com/user/gleich" target="_blank">
			<ViewButton more on="Hevy" icon={HevyIcon} iconPaddingBottom="0px" /></a
		>
	</div>
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

	.view-more-buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 30px;
	}

	.view-more {
		text-decoration: inherit;
	}

	@media (max-width: 760px) {
		.workout {
			width: 100%;
			max-width: 500px;
		}
	}
</style>
