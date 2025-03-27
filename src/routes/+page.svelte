<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Intro from '$lib/index/sections/intro.svelte';
	import MusicSection from '$lib/index/sections/music/music-section.svelte';
	import PhotoSection from '$lib/index/sections/photos/photo-section.svelte';
	import ProjectSection from '$lib/index/sections/projects/project-section.svelte';
	import WorkoutsSection from '$lib/index/sections/workouts/workouts-section.svelte';
	import type { SectionData } from './+page.server';

	const { data }: { data: SectionData } = $props();
</script>

<DynamicHead
	title="Matt Gleich"
	description="student, software engineer, cyclist, and photographer"
/>

<Intro />

<div class="sections">
	{#await data.projects}
		<ProjectSection loading />
	{:then projects}
		<ProjectSection {projects} />
	{/await}

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
</div>

<style>
	.sections {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
