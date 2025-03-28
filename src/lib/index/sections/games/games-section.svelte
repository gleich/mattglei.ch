<script lang="ts">
	import Error from '$lib/error.svelte';
	import Steam from '$lib/icons/steam.svelte';
	import Section from '$lib/index/section.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import type { Game } from '$lib/lcp/steam';
	import Loading from '$lib/loading.svelte';
	import Scrolling from '$lib/scrolling.svelte';
	import Stats from '$lib/stats.svelte';
	import { renderDuration } from '$lib/time';

	const { loading, games }: { loading?: boolean; games?: LcpResponse<Game[]> | null } = $props();
</script>

<Section
	name="Games"
	liveData={{
		sources: [{ name: 'Steam', icon: Steam, url: 'https://store.steampowered.com/about/' }],
		updated: games?.updated
	}}
>
	{#if loading}
		<Loading expectedHeight="450px" />
	{:else if games != null}
		<p>
			To relax I like to occasionally play games with some of my friends. Here are my recently
			played games from <a href="https://store.steampowered.com/about/" target="_blank">Steam</a>:
		</p>

		<div class="games">
			{#each games.data.slice(0, 6) as game}
				<a href={game.url} target="_blank" class="game" title={`View "${game.name}" on Steam`}>
					<img class="game-picture" src={game.header_url} alt={`${game.name} header`} />
					<div class="stats">
						<Stats
							stats={new Map([
								['Playtime', renderDuration(game.playtime_forever)],
								[
									'Achievements',
									typeof game.achievement_progress === 'number'
										? game.achievement_progress.toPrecision(3) + '%'
										: 'N/A'
								]
							])}
						/>
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<Error msg="Failed to load games" />
	{/if}
</Section>

<style>
	.games {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}

	.game-picture {
		width: 100%;
		height: auto;
	}

	.game {
		border: 1px solid var(--border);
		box-shadow: var(--box-shadow);
		border-radius: var(--border-radius);
		overflow: hidden;
		color: inherit;
		text-decoration: inherit;
	}

	.stats {
		padding: 5px 0;
		padding-top: 2px;
	}

	@media (max-width: 710px) {
		.games {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 500px) {
		.games {
			grid-template-columns: 1fr;
		}
	}
</style>
