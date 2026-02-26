<script lang="ts">
	import HevyIcon from '$lib/icons/hevy-icon.svelte';
	import StravaIcon from '$lib/icons/strava-icon.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import { type Workout as LcpWorkout } from '$lib/lcp/workouts';
	import SectionLoading from '$lib/section-loading.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import { Error } from '@gleich/ui';
	import Section from '../../section.svelte';
	import Workout from './workout.svelte';
	import { resolve } from '$app/paths';
	import { source } from 'sveltekit-sse';
	import { onMount } from 'svelte';

	const {
		workouts: response,
		loading
	}: { workouts?: LcpResponse<LcpWorkout[]> | null; loading?: boolean } = $props();
	let workouts = $derived<LcpWorkout[] | null>(response?.data ?? null);
	let updated = $derived<Date | undefined>(response?.updated);

	const stravaURL = 'https://www.strava.com/about';
	const hevyURL = 'https://www.hevyapp.com';

	onMount(() => {
		const stream = source('https://lcp.mattglei.ch/workouts/stream').select('message');
		stream.subscribe((s) => {
			if (s) {
				const streamedResponse: LcpResponse<LcpWorkout[]> = JSON.parse(s);
				workouts = streamedResponse.data;
				updated = streamedResponse.updated;
			}
		});
	});
</script>

<Section
	name="Workouts"
	liveData={{
		sources: [
			{
				name: 'Strava',
				icon: StravaIcon,
				url: stravaURL,
				iconLeftMargin: '8px',
				iconRightMargin: '5px'
			},
			{
				name: 'Hevy',
				icon: HevyIcon,
				url: hevyURL,
				iconLeftMargin: '10px',
				iconRightMargin: '8px'
			}
		],
		updated
	}}
>
	{#if loading}
		<SectionLoading name="workouts" height={529.91} />
	{:else if workouts}
		<p>
			One of my favorite things is staying active and enjoying the outdoors. I grew up in New
			Hampshire hiking, biking, snowshoeing, and traveling with my family. Out of all of those
			things I especially love cycling mainly through gravel cycling, road cycling, and mountain
			biking. Recently I've been getting into lifting which has been a ton of fun. Below are 2 of my
			most recent <a href={stravaURL} rel="external" target="_blank">Strava</a>/<a
				href={hevyURL}
				rel="external">Hevy</a
			>
			workouts:
		</p>
		<div class="workouts">
			{#each workouts.slice(0, 2) as workout (workout.id)}
				<div class="workout">
					<Workout {workout} />
				</div>
			{/each}
		</div>
		<a class="view-more" href={resolve('/workouts')}>
			<ViewButton more of="workouts" />
		</a>
	{:else}
		<Error msg="Failed to load workout data" />
	{/if}
</Section>

<style>
	.workouts {
		display: flex;
		gap: 10px;
	}

	.workout {
		width: 50%;
	}

	.view-more {
		text-decoration: inherit;
	}

	@media (max-width: 730px) {
		.workout {
			width: 100%;
		}
	}

	@media (max-width: 715px) {
		.workouts {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
