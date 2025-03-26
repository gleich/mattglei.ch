<script lang="ts">
	import '../styles/global.css';
	import '../styles/fonts.css';
	import '../styles/variables.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';
	import Copyright from '$lib/copyright.svelte';

	let { children } = $props();
</script>

<Fonts />

<div class="container">
	<div class="main">
		<Nav />
		{@render children()}
		<Copyright />
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		min-height: calc(100vh - 10px);
		opacity: 0;
		animation: fadeUp 0.5s ease-out forwards;
	}

	.main {
		display: flex;
		align-content: center;
		flex-direction: column;
		width: 100%;
		max-width: 1000px;
		padding: 0 20px;
		padding-bottom: 30px;
	}

	@media (max-width: 450px) {
		.main {
			padding: 0px 5px;
		}
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
