<script lang="ts">
	import { page } from '$app/state';
</script>

<main>
	<div class="container">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
			></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line
				x1="12"
				y1="16"
				x2="12.01"
				y2="16"
			></line></svg
		>
		<h1>{page.status} {page.error?.message}</h1>
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60%;
	}

	svg {
		height: 40px;
		width: auto;
	}

	.container {
		display: flex;
		align-items: center;
		gap: 20px;
		background-color: var(--red-background);
		color: var(--red-foreground);
		padding: 30px;
		border-radius: var(--border-radius);
	}
</style>
