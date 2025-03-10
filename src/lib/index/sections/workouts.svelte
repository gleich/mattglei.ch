<script>
	import Hevy from '$lib/icons/hevy.svelte';
	import Strava from '$lib/icons/strava.svelte';
	import Section from '../section.svelte';
</script>

<Section
	name="Workouts"
	liveData={{
		sources: [
			{
				name: 'Strava',
				icon: Strava,
				url: 'https://www.strava.com/about',
				iconLeftMargin: '8px',
				iconRightMargin: '5px'
			},
			{
				name: 'Hevy',
				icon: Hevy,
				url: 'https://www.hevyapp.com',
				iconLeftMargin: '10px',
				iconRightMargin: '7px'
			}
		],
		updated: new Date()
	}}
>
	<p>foo</p>
</Section>
