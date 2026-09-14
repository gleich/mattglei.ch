<script lang="ts">
	import type { Snippet } from 'svelte';

	const { name, children }: { name: string; children: Snippet } = $props();
</script>

<section id={name.toLowerCase()} aria-labelledby={`resume-${name.toLowerCase()}`}>
	<h3 id={`resume-${name.toLowerCase()}`}>{name}</h3>
	{@render children()}
</section>

<style>
	h3 {
		margin-bottom: 5px;
		padding: 3px 7px;
		background: var(--foreground);
		color: var(--actual-background-color);
		font-family: inherit;
		font-size: 1.105em;
		font-weight: 600;
		line-height: 1.2;
		text-wrap: wrap;
	}

	@media (max-width: 600px) {
		h3 {
			font-size: 1.4em;
		}
	}
</style>
