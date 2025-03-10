<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
	import Intro from '$lib/index/sections/intro.svelte';
	import Workouts from '$lib/index/sections/workouts.svelte';
</script>

<DynamicHead
	title="Matt Gleich"
	description="student, software engineer, cyclist, and photographer"
/>

<Intro />
<Workouts />
