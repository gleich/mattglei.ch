<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import ExternalLinkIcon from './icons/external-link-icon.svelte';

	const {
		name,
		role,
		dates,
		href,
		icon: Icon,
		preserveIconColors = false,
		children
	}: {
		name: string;
		role: string;
		dates: string;
		href: string;
		icon?: Component;
		preserveIconColors?: boolean;
		children: Snippet;
	} = $props();
</script>

<article>
	<header>
		{#if Icon}
			<div class="icon" style:--resume-icon-filter={preserveIconColors ? 'none' : undefined}>
				<Icon />
			</div>
		{/if}
		<div class="identity">
			<h4>
				<a {href} target="_blank" rel="noopener noreferrer">
					{name}
					<ExternalLinkIcon />
				</a>
			</h4>
			<p class="role">{role}</p>
		</div>
		<p class="dates">{dates}</p>
	</header>
	<div class="details">
		{@render children()}
	</div>
</article>

<style>
	article {
		min-width: 0;
		margin-bottom: 5px;
	}

	article:last-child {
		margin-bottom: 0;
	}

	header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4px 12px;
		padding: 3px 7px;
		background: color-mix(in srgb, var(--foreground) 4%, var(--background));
		line-height: 1.2;
	}

	.icon {
		position: absolute;
		right: calc(100% + 8px);
		top: 0;
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		padding: 2px;
		border: 1px solid var(--border);
		background: var(--background);
	}

	.icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
	}

	h4 {
		font-family: inherit;
		font-size: 1.105em;
		font-weight: 600;
		line-height: inherit;
		text-wrap: wrap;
	}

	h4 a {
		display: inline-flex;
		align-items: baseline;
		gap: 4px;
		color: inherit;
		text-decoration: none;
	}

	h4 a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	h4 :global(svg) {
		flex-shrink: 0;
	}

	.role {
		padding-left: 12px;
		border-left: 1px solid var(--border);
		color: var(--resume-muted);
		text-wrap: wrap;
	}

	.dates {
		flex-shrink: 0;
		color: var(--resume-muted);
		font-size: 0.947em;
		text-align: right;
		white-space: nowrap;
	}

	.details {
		margin-top: 3px;
	}

	@media (max-width: 900px) {
		header {
			flex-wrap: wrap;
		}

		.dates {
			margin-left: auto;
		}
	}

	@media (max-width: 600px) {
		article {
			margin-bottom: 12px;
		}

		header {
			gap: 6px;
			padding: 7px 8px;
		}

		.icon {
			right: calc(100% + 6px);
			top: 6px;
			width: 22px;
			height: 22px;
		}

		.identity {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		h4 {
			font-size: 1.25em;
		}

		.role {
			padding-left: 0;
			border-left: 0;
		}

		.dates {
			width: 100%;
			margin-left: 0;
			text-align: left;
			white-space: normal;
			text-wrap: wrap;
		}

		.details {
			margin-top: 6px;
		}
	}
</style>
