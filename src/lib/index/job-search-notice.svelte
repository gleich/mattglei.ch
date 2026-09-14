<script lang="ts">
	import EmailIcon from '$lib/icons/email-icon.svelte';
	import FileIcon from '$lib/icons/file-icon.svelte';
	import InfoIcon from '$lib/icons/info-icon.svelte';
</script>

<aside aria-label="Job search" class="notice">
	<span class="icon"><InfoIcon /></span>
	<p>Looking for software engineering roles in the Greater New York City Area</p>
	<div class="actions">
		<a href="/resume">
			<span class="action-icon" aria-hidden="true"><FileIcon /></span>
			View my resume
		</a>
		<a href="mailto:email@mattglei.ch" title="email@mattglei.ch">
			<span class="action-icon" aria-hidden="true"><EmailIcon /></span>
			Contact me
		</a>
	</div>
</aside>

<style>
	.notice {
		--notice-accent: color-mix(in srgb, var(--blue-foreground) 80%, var(--foreground));
		--notice-foreground: color-mix(in srgb, var(--blue-foreground) 45%, var(--foreground));
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr) auto;
		align-items: center;
		gap: 10px;
		margin: 0 10px 20px;
		padding: 8px 14px;
		border: 1px solid color-mix(in srgb, var(--blue-foreground) 30%, var(--background));
		border-radius: var(--border-radius);
		background: color-mix(in srgb, var(--blue-foreground) 8%, var(--actual-background-color));
		color: var(--notice-foreground);
		line-height: 1.45;
	}

	.icon {
		display: flex;
		width: 24px;
		height: 24px;
		color: var(--notice-accent);
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: 2px 14px;
		font-size: 0.9375rem;
	}

	a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 24px;
		color: var(--notice-accent);
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		white-space: nowrap;
		border-radius: 2px;
	}

	a:hover {
		text-decoration-thickness: 2px;
	}

	.action-icon {
		display: flex;
		flex-shrink: 0;
		width: 16px;
		height: 16px;
	}

	@media (max-width: 800px) {
		.notice {
			grid-template-columns: 24px minmax(0, 1fr);
			row-gap: 2px;
		}

		.icon {
			align-self: start;
		}

		.actions {
			grid-column: 2;
			justify-content: flex-start;
		}
	}

	@media (max-width: 500px) {
		.notice {
			column-gap: 8px;
			margin: 0 0 16px;
			padding: 8px 12px;
		}
	}
</style>
