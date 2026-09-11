<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		name,
		role,
		dates,
		href,
		icon,
		lightIcon = false,
		children
	}: {
		name: string;
		role: string;
		dates: string;
		href?: string;
		icon?: string;
		lightIcon?: boolean;
		children?: Snippet;
	} = $props();
</script>

<article>
	<header>
		{#if icon}
			<div class="icon" class:light={lightIcon}>
				<img src={icon} alt="" width="28" height="28" loading="lazy" decoding="async" />
			</div>
		{/if}
		<div class="heading">
			<div class="identity">
				<h4>
					{#if href}
						<a {href} target="_blank" rel="noopener noreferrer">{name}</a>
					{:else}
						{name}
					{/if}
				</h4>
				<p class="role">{role}</p>
			</div>
			<p class="dates">{dates}</p>
		</div>
	</header>
	{#if children}
		<div class="details">
			{@render children()}
		</div>
	{/if}
</article>

<style>
	article {
		padding: 4px 2px 8px;
		min-width: 0;
	}

	:global(article) + article {
		border-top: 1px solid var(--border);
		margin-top: 4px;
		padding-top: 12px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.icon {
		width: 28px;
		height: 28px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.icon img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.icon.light {
		padding: 3px;
		background-color: #fbfbfc;
	}

	.heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 6px 16px;
		flex: 1;
		min-width: 0;
	}

	.identity {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px 10px;
		min-width: 0;
	}

	h4 {
		font-size: 1.125rem;
		text-wrap: pretty;
	}

	h4 a {
		color: inherit;
		text-decoration: none;
	}

	h4 a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.role {
		padding: 2px 4px;
		width: fit-content;
		font-size: 0.875rem;
		line-height: 1.25;
		color: var(--green-foreground);
		background-color: var(--green-background);
		border-radius: 2px;
	}

	.dates {
		flex-shrink: 0;
		font-size: 0.875rem;
		line-height: 1.4;
		text-align: right;
		white-space: nowrap;
		color: color-mix(in srgb, var(--foreground) 68%, var(--background));
	}

	.details {
		margin-top: 6px;
		line-height: 1.45;
	}

	@media (max-width: 700px) {
		header {
			align-items: flex-start;
		}

		.heading {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.dates {
			text-align: left;
			white-space: normal;
			text-wrap: balance;
		}
	}

	@media (max-width: 450px) {
		article {
			padding-left: 4px;
			padding-right: 4px;
		}
	}
</style>
