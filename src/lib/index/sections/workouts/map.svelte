<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { Image } from '@gleich/ui';

	const { workout }: { workout: Workout } = $props();
</script>

<div class="image">
	<Image
		src={workout.map_image_url as string}
		alt="Mapbox Map"
		placeholder={workout.map_blur_image}
		height={504}
		width={924}
	/>
</div>
