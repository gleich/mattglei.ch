<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Intro from '$lib/index/sections/intro.svelte';
	import Workouts from '$lib/index/sections/workouts/workouts.svelte';
	import type { SectionData } from './+page.server';

	const { data }: { data: SectionData } = $props();
</script>

<DynamicHead
	title="Matt Gleich"
	description="student, software engineer, cyclist, and photographer"
/>

<Intro />

{#await data.workouts}
	<p>Loading...</p>
{:then workouts}
	<Workouts {workouts} />
{/await}
