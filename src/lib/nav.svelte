<script lang="ts">
	import Github from '$lib/icons/github.svelte';
	import Instagram from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Logo from '$lib/logo.svelte';
	import type { Component } from 'svelte';
	import { page } from '$app/state';
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
	<div class="links">
		<a href="/" class={page.url.pathname === '/' ? 'current-link' : ''}>home</a>
		<a href="/writing" class={page.url.pathname === '/writing' ? 'current-link' : ''}>writing</a>
		<a href="/photos" class={page.url.pathname === '/photos' ? 'current-link' : ''}>photos</a>
		<a href="/workouts" class={page.url.pathname === '/workouts' ? 'current-link' : ''}>workouts</a>
		<a href="/music" class={page.url.pathname === '/music' ? 'current-link' : ''}>music</a>
		<a href="/contact" class={page.url.pathname === '/contact' ? 'current-link' : ''}>contact</a>
	</div>
	{@render socials('socials-under-bar')}
</nav>

<style>
	nav {
		width: 100%;
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		box-shadow: var(--box-shadow);
	}

	.links {
		display: flex;
		max-width: 600px;
		width: 98%;
		background-color: var(--real-background);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: 0px 10px;
		padding-top: 2px;
		padding-bottom: 1px;
		align-items: center;
		flex-wrap: wrap;
		font-size: 1rem;
		justify-content: space-evenly;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
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

	.socials-under-bar {
		display: none;
		gap: 30px;
		margin: 5px 0;
		margin-top: 20px;
	}

	.social {
		width: 30px;
		height: 30px;
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
		width: 55px;
		height: 55px;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 3px;
		background-color: var(--foreground);
	}

	@media (max-width: 500px) {
		.links {
			justify-content: center;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			width: 90%;
		}

		.links a {
			margin: 4px;
			padding: 5px;
			text-align: center;
		}

		.bar-socials {
			display: none;
		}

		.socials-under-bar {
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
