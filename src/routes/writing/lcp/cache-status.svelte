<script lang="ts">
	import Since from '$lib/time/since.svelte';
	import { onMount } from 'svelte';

	const loadingFrames = [
		'[    ]', // 0%
		'[=   ]', // 6.25%
		'[==  ]', // 12.5%
		'[=== ]', // 18.75%
		'[ ===]', // 25%
		'[  ==]', // 31.25%
		'[   =]', // 37.5%
		'[    ]', // 43.75%
		'[   =]', // 50%
		'[  ==]', // 56.25%
		'[ ===]', // 62.5%
		'[====]', // 68.75%
		'[=== ]', // 75%
		'[==  ]', // 81.25%
		'[=   ]', // 87.5%
		'[    ]', // 93.75%
		'[    ]' // 100%
	];
	let frameIndex = $state(0);
	let frame = $derived(loadingFrames[frameIndex]);

	onMount(() => {
		const interval = setInterval(() => {
			frameIndex = (frameIndex + 1) % loadingFrames.length;
		}, 40);
		return () => clearInterval(interval);
	});

	const { name, updated }: { name: string; updated?: Date } = $props();
</script>

<div class="container">
	<p class="frame">{@html frame}</p>
	<p class="online">ONLINE</p>
	<p class="name">{name} <span class="cache-text"> cache</span></p>
	<p class="updated"><Since time={updated ?? new Date()} /></p>
</div>

<style>
	.container {
		display: flex;
		gap: 5px;
	}

	.frame {
		white-space: pre;
		display: inline-block;
		font-family: 'IBM Plex Mono';
		font-weight: 600;
	}

	.name {
		width: 120px;
	}

	.online {
		color: var(--green-foreground);
		background-color: var(--green-background);
		padding: 0 5px;
		border-radius: 2px;
	}

	.updated {
		margin-left: 5px;
		color: grey;
	}

	@media (max-width: 450px) {
		.cache-text {
			display: none;
		}

		.name {
			width: 80px;
		}
	}
</style>
