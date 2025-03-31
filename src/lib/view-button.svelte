<script lang="ts">
	import type { Component } from 'svelte';

	const {
		on,
		of,
		more,
		icon: Icon,
		iconPaddingBottom = '3px'
	}: {
		on?: string;
		more?: boolean;
		of?: string;
		icon?: Component;
		iconPaddingBottom?: string;
	} = $props();
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
		<div class="icon" style:--icon-padding-bottom={iconPaddingBottom}>
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
		width: 16px;
		height: 16px;
		color: var(--foreground);
		margin-left: 7px;
		margin-right: 6px;
		margin-bottom: var(--icon-padding-bottom);
	}
</style>
