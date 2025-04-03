<script lang="ts">
	import Logo from './logo.svelte';

	const { expectedHeight }: { expectedHeight: string } = $props();
</script>

<div class="container" style:--expected-height={expectedHeight}>
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
