<script lang="ts">
	let { children } = $props();
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		box-shadow: 0 0 20px black;
	}
</style>
