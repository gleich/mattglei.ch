<script lang="ts">
	import { Logo } from '@gleich/ui';

	const { height }: { height: number } = $props();
</script>

<div class="container" style:--expected-height={`${height}px`}>
	<div class="logo">
		<Logo />
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(var(--expected-height) - 20px);
	}

	.logo {
		width: 100px;
		height: auto;
	}
</style>
