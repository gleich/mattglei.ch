<script lang="ts">
	import Github from '$lib/icons/github.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Logo from '$lib/logo.svelte';
	import type { Component } from 'svelte';
</script>

{#snippet social(name: string, href: string, icon: Component)}
	<a {href} title={name} target="_blank" class="social">
		<svelte:component this={icon} />
	</a>
{/snippet}

<nav>
	<div class="bar">
		<div class="left">
			<div class="logo">
				<Logo invert />
			</div>
			<h2 class="name">Matt Gleich</h2>
		</div>
		<div class="socials">
			{@render social('GitHub', 'https://github.com/gleich', Github)}
			{@render social('Instagram', 'https://instagram.com/mattglei.ch', Instagram)}
			{@render social('Linkedin', 'https://www.linkedin.com/in/matt-gleich/', Linkedin)}
		</div>
	</div>
</nav>

<style>
	nav {
		flex: 1;
		display: flex;
	}

	.bar {
		display: flex;
		border-radius: var(--border-radius);
		background-color: var(--real-background);
		border: 1px solid var(--border);
		align-items: center;
		justify-content: space-between;
		z-index: 99;
		overflow: hidden;
		width: 100%;
	}

	.left {
		display: flex;
		align-items: center;
	}

	.socials {
		display: flex;
		gap: 15px;
		margin-right: 15px;
	}

	.social {
		width: 30px;
		height: 30px;
	}

	.name {
		font-family: 'Inter';
		font-weight: bold;
		font-size: 2.9rem;
		line-height: 75%;
		margin-left: 10px;
		margin-right: 10px;
	}

	.logo {
		width: 55px;
		height: 55px;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 3px;
		background-color: var(--foreground);
		z-index: -1;
	}
</style>
