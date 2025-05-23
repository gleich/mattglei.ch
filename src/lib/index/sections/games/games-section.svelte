<script lang="ts">
	import SteamIcon from '$lib/icons/steam-icon.svelte';
	import Section from '$lib/index/section.svelte';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import type { Game } from '$lib/lcp/steam';
	import Loading from '$lib/loading.svelte';
	import Stats from '$lib/stats.svelte';
	import { renderDuration } from '$lib/time';
	import { Card, Error, Image } from '@gleich/ui';

	const { loading, games }: { loading?: boolean; games?: LcpResponse<Game[]> | null } = $props();
</script>

<Section
	name="Games"
	liveData={{
		sources: [{ name: 'Steam', icon: SteamIcon, url: 'https://store.steampowered.com/about/' }],
		updated: games?.updated
	}}
>
	{#if loading}
		<Loading height={483.63} />
	{:else if games != null}
		<p>
			To relax I like to occasionally play games with some of my friends. My favorite game of all
			time is <a href="https://www.firewatchgame.com" target="_blank">Firewatch</a> (I've probably
			replayed it ~8 times over the years). Here are my recently played games from
			<a href="https://store.steampowered.com/about/" target="_blank">Steam</a>:
		</p>

		<div class="games">
			{#each games.data.slice(0, 6) as game (game.app_id)}
				<Card padding="0">
					<a href={game.url} target="_blank" class="game" title={`View "${game.name}" on Steam`}>
						<div class="game-picture">
							<Image
								src={game.header_url}
								alt={game.name}
								width={460}
								height={215}
								placeholder={game.header_blur_hash}
							/>
						</div>
						<div class="stats">
							<Stats
								stats={new Map([
									['Playtime', renderDuration(game.playtime_forever * 60)],
									[
										'Achievements',
										typeof game.achievement_progress === 'number'
											? game.achievement_progress === 0.0
												? '0%'
												: game.achievement_progress.toPrecision(3) + '%'
											: 'N/A'
									]
								])}
							/>
						</div>
					</a>
				</Card>
			{/each}
		</div>
	{:else}
		<Error msg="Failed to load game data" />
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
		overflow: hidden;
		color: inherit;
		text-decoration: inherit;
	}

	.stats {
		padding: 5px 0;
	}

	@media (max-width: 710px) {
		.games {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 385px) {
		.games {
			grid-template-columns: 1fr;
		}

		.games > *:nth-child(n + 4) {
			display: none;
		}
	}
</style>
