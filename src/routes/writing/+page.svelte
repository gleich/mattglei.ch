<script lang="ts">
	import writings from './writings';
	import Card from '$lib/card.svelte';
	import DynamicHead from '$lib/dynamic-head.svelte';
</script>

<DynamicHead title="Writing" description="Matt Gleich's writings" />

<h2>Writings</h2>

<div class="writings">
	{#each writings as [slug, writing]}
		<Card>
			<a href={`/writing/${slug}`} class="writing">
				<h3 class="title">{writing.title}</h3>
				<p class="date">{writing.publishedDate}</p>
				<p>{writing.description}</p>
			</a>
		</Card>
	{/each}
</div>

<style>
	.writings {
		margin-top: 30px;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.writing {
		color: inherit;
		text-decoration: inherit;
	}

	.title,
	.date {
		text-align: center;
	}

	.date {
		color: grey;
		margin-bottom: 10px;
	}

	@media (max-width: 600px) {
		.writings {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 500px) {
		h2 {
			margin-bottom: 20px;
			margin-left: 10px;
		}

		.writings {
			margin: 0 10px;
		}
	}
</style>
