<script lang="ts">
	import '@gleich/ui/styles.css';
	import '../styles/global.css';
	import '../styles/fonts.css';
	import '../styles/font-fallbacks.css';

	import Nav from '$lib/nav.svelte';
	import Fonts from '$lib/fonts.svelte';
	import { page } from '$app/state';
	import { Layout, siteName } from '@gleich/ui';
	import { onMount, type Snippet } from 'svelte';

	siteName.set('mattglei.ch');

	const { children }: { children: Snippet } = $props();

	let mounted = $state(false);
	onMount(() => (mounted = true));
</script>

<Fonts />

<svelte:head>
	{#if mounted || page.route.id === '/resume'}
		{#each ['regular', 'semibold', 'bold'] as weight (weight)}
			<link
				rel="preload"
				href="/resume/fonts/inter-{weight}.woff2"
				as="font"
				type="font/woff2"
				crossorigin="anonymous"
			/>
		{/each}
	{/if}
</svelte:head>

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
