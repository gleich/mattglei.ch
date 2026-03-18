<script lang="ts">
	import type { Workout } from '$lib/lcp/workouts';
	import { Image } from '@gleich/ui';

	const { workout }: { workout: Workout } = $props();
</script>

<div class="map-wrapper">
	<Image
		src={workout.map_image_url as string}
		alt="Mapbox Map"
		placeholder={workout.map_blur_image}
		height={504}
		width={924}
	/>
	{#if workout.location}
		<p class="location">{workout.location}</p>
	{/if}
</div>

<style>
	.map-wrapper {
		position: relative;
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.map-wrapper :global(img) {
		border-radius: var(--border-radius);
		display: block;
	}

	.location {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(84, 84, 84, 0.7);
		color: white;
		backdrop-filter: blur(4px);
		width: 100%;
		text-align: center;
		font-size: 14.5px;
		padding: 1px 0;
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
	}

	@media (max-width: 500px) {
		.location {
			font-size: 14px;
		}
	}

	@media (prefers-color-scheme: light) {
		.location {
			background-color: rgba(128, 128, 128, 0.7);
		}
	}
</style>
