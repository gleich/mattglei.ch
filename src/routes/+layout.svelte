<script lang="ts">
	import '../styles/global.css';
	import '../styles/fonts.css';
	import '../styles/variables.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';
	import Copyright from '$lib/copyright.svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<Fonts />

<div class="container">
	<div class="main">
		<Nav />
		{@render children()}
		<div class="copyright">
			<Copyright />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		min-height: 100vh;
		overflow: hidden;
	}

	.main {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		max-width: 1000px;
		padding: 0 20px;
		padding-bottom: 0;
		animation: fade-up 0.5s ease-out forwards;
		opacity: 0;
	}

	.copyright {
		margin-top: auto;
	}

	@media (max-width: 450px) {
		.main {
			padding: 0px 10px;
		}
	}

	@keyframes fade-up {
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
