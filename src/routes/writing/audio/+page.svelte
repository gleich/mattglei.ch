<script lang="ts">
	import WritingSection from '$lib/writing/writing-section.svelte';
	import Writing from '$lib/writing/writing.svelte';
	import writings from '../writings';
</script>

<Writing writing={writings.get('audio')!}>
	<WritingSection title="The Start">
		<p>
			Last fall I found myself listening to a lot of music as I was focusing on my studies. My dad,
			who is really into music and audio gear, gave me a pair of his old <a
				href="https://etymotic.com/earphones/"
				target="_blank">Etymōtic</a
			> IEMs from the early 2000s/late 90s. I really loved the isolation high-resolution that provided
			compared to the Apple Airpods Pro 2 that I was using at the time.
		</p>
		<br />
		<p>
			For Christmas of last year, only a few months after I started using those Etymōtics, I got
			some new pair of Etymōtics as well as my first speaker setup! Here is all of the gear that I
			got then:
		</p>
	</WritingSection>
</Writing>
