<script lang="ts">
	import WritingSection from '$lib/writing/writing-section.svelte';
	import type { load } from './index.server';
	import CacheStatus from './cache-status.svelte';

	const { data }: { data: ReturnType<typeof load> } = $props();
</script>

<WritingSection title="Cache Status Overview">
	<div class="statuses">
		{#await data.projects}
			<CacheStatus name="Projects" loading />
		{:then projects}
			<CacheStatus
				name="Projects"
				updated={projects?.updated}
				updateFrequency="Refreshes every 5 seconds"
			/>
		{/await}
		{#await data.workouts}
			<CacheStatus name="Workouts" loading />
		{:then workouts}
			<CacheStatus
				name="Workouts"
				updated={workouts?.updated}
				updateFrequency="Refreshes on Strava events"
			/>
		{/await}
		{#await data.music}
			<CacheStatus name="Music" loading />
		{:then music}
			<CacheStatus
				name="Music"
				updated={music?.updated}
				updateFrequency="Refreshes every 10 seconds"
			/>
		{/await}
		{#await data.games}
			<CacheStatus name="Games" loading />
		{:then games}
			<CacheStatus
				name="Games"
				updated={games?.updated}
				updateFrequency="Refreshes every 10 minutes"
			/>
		{/await}
	</div>
</WritingSection>

<style>
	.statuses {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 5px;
		gap: 10px;
		align-items: center;
		width: 100%;
	}

	@media (max-width: 830px) {
		.statuses {
			grid-template-columns: 1fr;
		}
	}
</style>
