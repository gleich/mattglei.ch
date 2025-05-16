<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { fromNow, renderDate } from '$lib/time';
	import utc from 'dayjs/plugin/utc';
	import timezonePlugin from 'dayjs/plugin/timezone';

	dayjs.extend(utc);
	dayjs.extend(timezonePlugin);

	const { time, lowercase = false }: { time: Date; lowercase?: boolean } = $props();

	let dayjsTime = dayjs(time);
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

{renderDate(dayjsTime, now, lowercase)} [{fromNow(dayjsTime, now)}]
