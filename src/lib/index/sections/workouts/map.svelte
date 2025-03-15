<script lang="ts">
	import Image from '$lib/image.svelte';
	import type { Workout } from '$lib/lcp/workouts';

	const { workout }: { workout: Workout } = $props();
</script>

<div class="image">
	<Image
		src={workout.map_image_url as string}
		alt="Mapbox Map"
		placeholder={workout.map_blur_image}
	/>
</div>

<style>
	.image {
		border-radius: var(--border-radius);
		overflow: hidden;
	}
</style>
