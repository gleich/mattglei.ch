<script lang="ts">
	import '../styles/global.css';
	import '../styles/fonts.css';
	import '../styles/variables.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';

	let { children } = $props();
</script>

<Fonts />

<div class="container">
	<div class="main">
		<Nav />

		{@render children()}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		min-height: 100vh;
	}

	.main {
		display: flex;
		align-content: center;
		flex-direction: column;
		width: 100%;
		max-width: 1000px;
		padding: 0px 10px;
		padding-bottom: 30px;
	}

	@media (max-width: 450px) {
		.main {
			padding: 0px 5px;
		}
	}
</style>
