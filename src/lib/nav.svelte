<script lang="ts">
	import GitHubIcon from '$lib/icons/github-icon.svelte';
	import InstagramIcon from '$lib/icons/instagram-icon.svelte';
	import LinkedinIcon from '$lib/icons/linkedin-icon.svelte';
	import type { Component } from 'svelte';
	import { page } from '$app/state';
	import { NavLogo } from '@gleich/ui';

	const links = ['', 'writing', 'photos', 'workouts'];

	let linkEls: HTMLAnchorElement[] = [];
	let linksContainer: HTMLDivElement;
	let indicatorLeft = $state(0);
	let indicatorTop = $state(0);
	let indicatorWidth = $state(0);
	let indicatorHeight = $state(0);
	let indicatorVisible = $state(false);

	function updateIndicator() {
		const idx = links.findIndex((link) => `/${link}` === page.url.pathname);
		if (idx === -1 || !linkEls[idx] || !linksContainer) return;
		const el = linkEls[idx];
		const containerRect = linksContainer.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		indicatorLeft = elRect.left - containerRect.left;
		indicatorTop = elRect.top - containerRect.top;
		indicatorWidth = elRect.width;
		indicatorHeight = elRect.height;
		indicatorVisible = true;
	}

	$effect(() => {
		updateIndicator();
	});
</script>

{#snippet social(name: string, href: string, Icon: Component)}
	<a {href} title={name} target="_blank" class="social">
		<Icon />
	</a>
{/snippet}

{#snippet socials(className: string)}
	<div class={className}>
		{@render social('GitHub', 'https://github.com/gleich', GitHubIcon)}
		{@render social('Instagram', 'https://instagram.com/mattglei.ch', InstagramIcon)}
		{@render social('Linkedin', 'https://www.linkedin.com/in/matt-gleich/', LinkedinIcon)}
	</div>
{/snippet}

<nav>
	<div class="bar">
		<a href="/" class="left">
			<NavLogo />
			<h1 class="name">Matt Gleich</h1>
		</a>
		{@render socials('bar-socials')}
	</div>
	{@render socials('socials-under-name')}
	<div class="links" bind:this={linksContainer}>
		<div
			class="indicator"
			style:left="{indicatorLeft}px"
			style:top="{indicatorTop}px"
			style:width="{indicatorWidth}px"
			style:height="{indicatorHeight}px"
			style:opacity={indicatorVisible ? 1 : 0}
		></div>
		{#each links as link, i (link)}
			<a
				bind:this={linkEls[i]}
				href={`/${link}`}
				class={page.url.pathname === `/${link}` ? 'current-link' : ''}
				>{link === '' ? 'home' : link}</a
			>
		{/each}
	</div>
</nav>

<style>
	nav {
		width: 100%;
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
		position: relative;
		display: flex;
		max-width: 600px;
		width: 98%;
		background-color: var(--background);
		border-radius: var(--border-radius);
		border: 0.5px solid var(--border);
		box-shadow: var(--box-shadow);
		padding-bottom: 1px;
		align-items: center;
		flex-wrap: wrap;
		font-size: 1rem;
		justify-content: space-evenly;
		margin: 0px 20px;
	}

	.indicator {
		position: absolute;
		background-color: var(--green-background);
		border-radius: 2px;
		pointer-events: none;
		transition:
			left 0.25s ease,
			top 0.25s ease,
			width 0.25s ease,
			height 0.25s ease,
			opacity 0.15s ease;
	}

	.links a {
		position: relative;
		z-index: 1;
		padding: 2px 10px;
		margin: 5px;
		text-decoration: none;
		color: var(--foreground);
		border-radius: 2px;
		transition: color 0.25s ease;
	}

	.current-link {
		color: var(--green-foreground) !important;
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
		width: 32px;
		height: 32px;
		color: var(--foreground);
	}

	.name {
		font-weight: bold;
		line-height: 75%;
		margin-left: 10px;
		margin-right: 10px;
		text-wrap: nowrap;
	}

	@media (max-width: 500px) {
		.links {
			display: grid;
			justify-content: center;
			grid-template-columns: repeat(2, 1fr);
			width: 90%;
		}

		nav {
			align-items: center;
			justify-content: center;
			margin-bottom: 60px;
		}

		.links a {
			margin: 4px;
			padding: 5px;
			text-align: center;
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
		.name {
			font-size: 13vw;
			margin-right: 0;
		}

		.links {
			padding: 2px;
		}
	}
</style>
