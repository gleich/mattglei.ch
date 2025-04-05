<script lang="ts">
	import { type Snippet } from 'svelte';

	const {
		gap = 15,
		delay = 2,
		speed = 15,
		children
	}: {
		gap?: number;
		speed?: number;
		delay?: number;
		children: Snippet;
	} = $props();

	let containerWidth = $state(0);
	let marqueeWidth = $state(0);
	let overflowing = $derived(containerWidth < marqueeWidth);
	let duration = $derived(
		marqueeWidth < containerWidth ? containerWidth / speed : (marqueeWidth + gap) / speed
	);
</script>

<div
	bind:clientWidth={containerWidth}
	class="container"
	style:--duration={`${duration}s`}
	style:--delay={`${delay}s`}
	style:--gradient-width={overflowing ? '10px' : '0px'}
	style:--gap={overflowing ? `${gap}px` : '0px'}
>
	<div
		class={`marquee ${overflowing ? 'scroll-animation' : ''}`}
		style={overflowing ? 'padding-left: 10px' : ''}
	>
		<div bind:clientWidth={marqueeWidth} class="initial-child-container">
			{@render children()}
		</div>
	</div>
	{#if overflowing}
		<div class="marquee scroll-animation">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.container {
		overflow-x: hidden;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.container::before,
	.container::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: var(--gradient-width);
		z-index: 2;
		pointer-events: none;
	}

	.container::before {
		left: 0;
		background: linear-gradient(to right, var(--background), rgba(255, 255, 255, 0));
	}

	.container::after {
		right: 0;
		background: linear-gradient(to left, var(--background), rgba(255, 255, 255, 0));
	}

	.marquee {
		flex: 0 0 auto;
		min-width: 100%;
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding-right: var(--gap);
	}

	.scroll-animation {
		animation: scroll var(--duration) linear var(--delay) infinite;
	}

	.initial-child-container {
		flex: 0 0 auto;
		display: flex;
		min-width: auto;
		flex-direction: row;
		align-items: center;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
