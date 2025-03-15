<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Intro from '$lib/index/sections/intro.svelte';
	import Music from '$lib/index/sections/music/music.svelte';
	import Workouts from '$lib/index/sections/workouts/workouts.svelte';
	import type { SectionData } from './+page.server';

	const { data }: { data: SectionData } = $props();
</script>

<svelte:head>
	<DynamicHead
		title="Matt Gleich"
		description="student, software engineer, cyclist, and photographer"
		opengraphImage={{ url: 'https://mattglei.ch/opengraph.png', width: '1200', height: '630' }}
	/>
</svelte:head>

<Intro />

<div class="sections">
	{#await data.workouts}
		<Workouts loading />
	{:then workouts}
		<Workouts {workouts} />
	{/await}

	{#await data.music}
		<Music loading />
	{:then music}
		<Music {music} />
	{/await}
</div>

<style>
	.sections {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
