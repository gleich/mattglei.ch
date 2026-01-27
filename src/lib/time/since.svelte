<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { fromNow } from '$lib/time';

	const { time }: { time: Date } = $props();

	let dayjsTime = $derived(dayjs(time));
	let now = $state(dayjs());
	onMount(() => {
		const interval = setInterval(
			() => {
				now = dayjs();
			},
			now.diff(dayjsTime, 'hour') >= 1 ? 1000 : 10
		);
		return () => clearInterval(interval);
	});
</script>

{fromNow(dayjsTime, now)}
