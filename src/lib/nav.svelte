<script lang="ts">
	import Github from '$lib/icons/github.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Logo from '$lib/logo.svelte';
	import type { Component } from 'svelte';
	import { page } from '$app/state';

	const links = ['', 'writing', 'photos', 'workouts'];
</script>

{#snippet social(name: string, href: string, Icon: Component)}
	<a {href} title={name} target="_blank" class="social">
		<Icon />
	</a>
{/snippet}

{#snippet socials(className: string)}
	<div class={className}>
		{@render social('GitHub', 'https://github.com/gleich', Github)}
		{@render social('Instagram', 'https://instagram.com/mattglei.ch', Instagram)}
		{@render social('Linkedin', 'https://www.linkedin.com/in/matt-gleich/', Linkedin)}
	</div>
{/snippet}

<nav>
	<div class="bar">
		<a href="/" class="left">
			<div class="logo">
				<Logo invert stroke="8" />
			</div>
			<h1 class="name">Matt Gleich</h1>
		</a>
		{@render socials('bar-socials')}
	</div>
	{@render socials('socials-under-name')}
	<div class="links">
		{#each links as link (link)}
			<a href={`/${link}`} class={page.url.pathname === `/${link}` ? 'current-link' : ''}
				>{link === '' ? 'home' : link}</a
			>
		{/each}
	</div>
</nav>

<style>
	nav {
		width: 100%;
		margin-top: 50px;
		margin-bottom: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 99;
		overflow: hidden;
		width: 100%;
	}

	.links {
		display: flex;
		max-width: 600px;
		width: 98%;
		background-color: var(--background);
		border-radius: var(--border-radius);
		border: 1px solid var(--border);
		padding-bottom: 1px;
		align-items: center;
		flex-wrap: wrap;
		font-size: 1rem;
		justify-content: space-evenly;
		margin: 0px 20px;
	}

	.links a {
		padding: 2px 10px;
		margin: 5px;
		text-decoration: none;
		color: var(--foreground);
	}

	.current-link {
		background-color: var(--green-background);
		color: var(--green-foreground) !important;
		border-radius: 2px;
	}

	.left {
		display: flex;
		align-items: center;
		color: var(--foreground);
		text-decoration: none;
	}

	.bar-socials {
		display: flex;
		gap: 15px;
		margin-right: 15px;
	}

	.socials-under-name {
		display: none;
		gap: 50px;
		margin: 5px 0;
	}

	.social {
		width: 30px;
		height: 30px;
		color: var(--foreground);
	}

	.name {
		font-family: 'Inter';
		font-weight: bold;
		line-height: 75%;
		margin-left: 10px;
		margin-right: 10px;
		text-wrap: nowrap;
	}

	.logo {
		width: 50px;
		height: 50px;
		padding: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 3px;
		background-color: var(--foreground);
		border-radius: var(--border-radius);
	}

	@media (max-width: 500px) {
		.links {
			justify-content: center;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			width: 90%;
		}

		nav {
			align-items: center;
			justify-content: center;
		}

		.links a {
			margin: 4px;
			padding: 5px;
			text-align: center;
			width: 80%;
		}

		.bar {
			align-items: center;
			justify-content: center;
		}

		.bar-socials {
			display: none;
		}

		.socials-under-name {
			display: flex;
		}
	}

	@media (max-width: 400px) {
		nav {
			margin-top: 20px;
		}

		.name {
			font-size: 12vw;
		}

		.links {
			padding: 2px;
		}
	}
</style>
