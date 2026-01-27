<script lang="ts">
	import WritingSection from '$lib/writing/writing-section.svelte';
	import Writing from '$lib/writing/writing.svelte';
	import writings from '../writings';
	import Gear from './gear.svelte';
</script>

<Writing writing={writings.get('audio')!}>
	<WritingSection title="The Start">
		<p>
			In the fall of 2024 I found myself listening to a lot of music as I was focusing on my
			studies. My dad, who is really into music and audio gear, gave me a pair of his old <a
				href="https://etymotic.com/earphones/"
				target="_blank">Etymōtic</a
			> IEMs from the early 2000s/late 90s. I really loved the isolation and high-resolution audio they
			provided compared to the Apple Airpods Pro 2 that I was using at the time.
		</p>
		<br />
		<p>
			For Christmas of 2024, only a few months after I started using those Etymōtics, I got a new
			pair of Etymōtics as well as my first speaker setup! Here is all of the gear that I got then:
		</p>
		<div class="gear-collection">
			<Gear name="Etymōtics ER4XR IEMs" />
			<Gear name="Snell Acoustics KIII Speakers" />
			<Gear name="Yamaha R-S202" />
			<Gear name="Music Hall mmf-1.3" />
		</div>
	</WritingSection>
</Writing>

<style>
	.gear-collection {
		margin-top: 15px;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		gap: 10px;
	}
</style>
