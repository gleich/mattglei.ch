<script lang="ts">
	import type { Component } from 'svelte';

	const {
		on,
		of,
		more,
		icon: Icon
	}: { on?: string; more?: boolean; of?: string; icon?: Component } = $props();
</script>

<button>
	View

	{#if more}
		more
	{/if}

	{#if on}
		on
	{/if}

	{#if Icon}
		<div class="icon">
			<Icon />
		</div>
	{/if}
	{on ?? of}
</button>

<style>
	button {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.icon {
		width: 15px;
		height: 15px;
		color: var(--foreground);
		margin-left: 7px;
		margin-right: 6px;
		margin-bottom: 2.5px;
	}
</style>
