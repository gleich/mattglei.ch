<script lang="ts">
	import ExperienceSection from '$lib/index/sections/experience/experience-section.svelte';
	import GamesSection from '$lib/index/sections/games/games-section.svelte';
	import Intro from '$lib/index/sections/intro.svelte';
	import MusicSection from '$lib/index/sections/music/music-section.svelte';
	import PhotoSection from '$lib/index/sections/photos/photo-section.svelte';
	import ProjectSection from '$lib/index/sections/projects/project-section.svelte';
	import WorkoutsSection from '$lib/index/sections/workouts/workouts-section.svelte';
	import { DynamicHead } from '@gleich/ui';
	import type { SectionData } from './+page.server';

	const { data }: { data: SectionData } = $props();
</script>

<DynamicHead
	title="Matt Gleich"
	description="Rising 4th year computer science student at the Rochester Institute of Technology (RIT) & DevOps intern for KCF Technologies."
/>

<Intro />

<div class="sections">
	{#await data.workouts}
		<WorkoutsSection loading />
	{:then workouts}
		<WorkoutsSection {workouts} />
	{/await}

	{#await data.music}
		<MusicSection loading />
	{:then music}
		<MusicSection {music} />
	{/await}

	<PhotoSection />

	{#await data.projects}
		<ProjectSection loading />
	{:then projects}
		<ProjectSection {projects} />
	{/await}

	<ExperienceSection />

	{#await data.games}
		<GamesSection loading />
	{:then games}
		<GamesSection {games} />
	{/await}
</div>

<style>
	.sections {
		display: flex;
		flex-direction: column;
		gap: 60px;
	}
</style>
