<script lang="ts">
	import '@gleich/ui/styles.css';
	import '../styles/global.css';
	import '../styles/fonts.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';
	import { FadeUp, Copyright } from '@gleich/ui';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<Fonts />

<div class="container">
	<FadeUp>
		<div class="main">
			<Nav />
			<div class="children">
				{@render children()}
			</div>
			<div class="copyright">
				<Copyright repo="gleich/mattglei.ch" />
			</div>
		</div>
	</FadeUp>
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
		padding: 50px 20px;
	}

	.children {
		flex: 1;
	}

	.copyright {
		margin-top: 60px;
	}
</style>
