<script lang="ts">
	const { stats }: { stats: Map<string, string> } = $props();
</script>

<div class="container">
	{#each [...stats] as [valueName, value] (valueName + value)}
		<div class="stat">
			<p class="value">
				{value}
			</p>
			<p class="value-name">
				{valueName}
			</p>
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-family: 'IBM Plex Mono';
		font-weight: 600;
		width: 100%;
	}

	.stat {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.value {
		font-size: 17px;
	}

	.value-name {
		font-weight: normal;
		font-size: 12px;
		color: grey;
	}

	@media (max-width: 550px) {
		.value {
			font-size: 16px;
		}

		.value-name {
			font-size: 10px;
		}
	}
</style>
