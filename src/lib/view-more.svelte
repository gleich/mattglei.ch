<script lang="ts">
	import type { Component } from 'svelte';

	const {
		on,
		of,
		url,
		newTab,
		icon: Icon
	}: { on?: string; of?: string; url: string; newTab?: boolean; icon?: Component } = $props();
</script>

<a href={url} target={newTab ? '_blank' : '_self'}>
	<button>
		View more

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
</a>

<style>
	a {
		color: inherit;
		text-decoration: inherit;
	}

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
		margin-left: 7px;
		margin-right: 5px;
		display: flex;
		align-items: center;
	}
</style>
