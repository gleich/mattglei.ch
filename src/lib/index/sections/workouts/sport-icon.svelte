<script lang="ts">
	import { iconFromType, nameFromType } from '$lib/lcp/workouts';

	const { sport_type }: { sport_type: string } = $props();

	const sport = { icon: iconFromType(sport_type), name: nameFromType(sport_type) };
</script>

<div class="icon" title={sport.name}>
	<sport.icon></sport.icon>
</div>

<style>
	.icon {
		width: 25px;
		height: 25px;
	}
</style>
