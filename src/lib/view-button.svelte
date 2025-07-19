<script lang="ts">
	import type { Component } from 'svelte';

	const {
		on,
		of,
		more,
		icon: Icon,
		iconPaddingBottom = '3px',
		iconColor = 'inherit'
	}: {
		on?: string;
		more?: boolean;
		of?: string;
		icon?: Component;
		iconPaddingBottom?: string;
		iconColor?: string;
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
		<div
			class="icon"
			style:--icon-padding-bottom={iconPaddingBottom}
			style:--icon-color={iconColor}
		>
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
		margin-left: 7px;
		margin-right: 6px;
		margin-bottom: var(--icon-padding-bottom);
		color: var(--icon-color);
	}

	@media (max-width: 500px) {
		.icon {
			width: 16px;
			height: 16px;
			margin-bottom: calc(var(--icon-padding-bottom) - 3px);
		}
	}
</style>
