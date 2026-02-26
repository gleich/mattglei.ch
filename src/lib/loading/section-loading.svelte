<script lang="ts">
	import { Logo } from '@gleich/ui';

	const { height, name }: { height: number; name: string } = $props();
</script>

<div class="container" style:--expected-height={`${height}px`}>
	<div class="logo">
		<Logo />
	</div>
	<p class="loading">loading {name}</p>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: calc(var(--expected-height) - 20px);
	}

	.logo {
		width: 100px;
		height: 100px;
	}

	.loading {
		color: grey;
		font-family: 'IBM Plex Mono';
		font-size: 14.5px;
	}
</style>
