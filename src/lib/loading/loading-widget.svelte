<script>
	import { fly } from 'svelte/transition';
</script>

<div class="container" transition:fly={{ y: 60, duration: 300 }}>
	<div class="spinner"></div>
</div>

<style>
	.container {
		color: var(--green-foreground);
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 9999;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid var(--green-border);
		border-top-color: var(--green-foreground);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
