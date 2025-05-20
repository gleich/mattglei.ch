<script lang="ts">
	import { Card, DynamicHead } from '@gleich/ui';
	import writings from './writings';
</script>

<DynamicHead title="Writing" description="Matt Gleich's writings" siteName="mattglei.ch" />

<h2>Writing</h2>

<div class="writings">
	{#each writings as [slug, writing] (slug)}
		<Card>
			<a href={`/writing/${slug}`} class="writing">
				<div class="title">
					<h4>{writing.title}</h4>
					<p class="date">{writing.publishedDate}</p>
				</div>
				<div class="keywords">
					{#each writing.keywords as keyword (keyword)}
						<p class="keyword">{keyword}</p>
					{/each}
				</div>
				<p class="description">{writing.description}</p>
				<button class="read-button"
					><p>Read</p>
					<p class="estimated-time">Estimated Time: ~{writing.readTime}min</p></button
				>
			</a>
		</Card>
	{/each}
</div>

<style>
	.title {
		display: flex;
		justify-content: space-between;
	}

	.writings {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.writing {
		color: inherit;
		text-decoration: inherit;
	}

	.keywords {
		display: flex;
		gap: 10px;
		margin: 5px 0;
	}

	.keyword {
		color: var(--green-foreground);
		background-color: var(--green-background);
		padding: 3px 5px;
		border-radius: 2px;
		font-size: 14px;
	}

	.date {
		color: grey;
		margin-bottom: 10px;
	}

	.description {
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.read-button {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
	}

	.estimated-time {
		font-size: 14px;
		color: grey;
	}

	@media (max-width: 600px) {
		.title {
			flex-direction: column;
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
