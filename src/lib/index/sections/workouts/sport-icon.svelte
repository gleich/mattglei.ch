<script lang="ts">
	import { iconFromType, nameFromType } from '$lib/lcp/workouts';

	const { sport_type }: { sport_type: string } = $props();

	const sport = { icon: iconFromType(sport_type), name: nameFromType(sport_type) };
</script>

<div class="icon" title={sport.name}>
	<sport.icon class="sport-icon"></sport.icon>
</div>

<style>
	.icon {
		display: flex;
		width: 30px;
		height: 28px;
		background-color: var(--green-background);
		color: var(--green-foreground);
		padding: 3px 5px;
		border-radius: 2px;
	}
</style>
