<script lang="ts">
	import type { Component } from 'svelte';
	import Github from './icons/github.svelte';
	import Instagram from './icons/instagram.svelte';
	import Strava from './icons/strava.svelte';
	import Linkedin from './icons/linkedin.svelte';

	interface account {
		name: string;
		href: string;
		icon: Component;
	}

	const accounts: account[] = [
		{ name: 'github', href: 'https://github.com/gleich', icon: Github },
		{ name: 'instagram', href: 'https://www.instagram.com/mattglei.ch', icon: Instagram },
		{ name: 'strava', href: 'https://www.strava.com/athletes/mattgleich', icon: Strava },
		{ name: 'linkedin', href: 'https://www.linkedin.com/in/matt-gleich/', icon: Linkedin }
	];
</script>

<div class="container">
	{#each accounts as account}
		<a href={account.href} target="_blank" title={account.name}>
			<div class="icon">
				<svelte:component this={account.icon} class="icon" />
			</div>
		</a>
	{/each}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
	}

	.icon {
		height: 30px;
		width: 30px;
	}
</style>
