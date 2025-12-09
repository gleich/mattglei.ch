<script lang="ts">
	import { iconFromType, nameFromType } from '$lib/lcp/workouts';

	const { sport_type }: { sport_type: string } = $props();

	const Icon = $derived(iconFromType(sport_type));
	const name = $derived(nameFromType(sport_type));
</script>

<div class="icon" title={name}>
	<Icon class="sport-icon"></Icon>
</div>

<style>
	.icon {
		display: flex;
		width: 27px;
		height: 25px;
		background-color: var(--green-background);
		color: var(--green-foreground);
		padding: 3px 5px;
		border-radius: 2px;
	}
</style>
