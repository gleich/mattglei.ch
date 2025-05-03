<script lang="ts">
	import '@gleich/ui/styles.css';
	import '../styles/global.css';
	import '../styles/fonts.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';
	import { Layout } from '@gleich/ui';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<Fonts />

<Layout repo="gleich/mattglei.ch">
	<Nav />
	<div class="children">
		{@render children()}
	</div>
</Layout>

<style>
	.children {
		padding-bottom: 40px;
	}
</style>
