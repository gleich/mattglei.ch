<script>
	import Description from '$lib/nav/description.svelte';
	import Socials from '$lib/nav/socials.svelte';
</script>

<div class="container">
	<div class="text">
		<h1>Matt Gleich</h1>
		<Description --font-size="17px" />
	</div>
	<div class="socials">
		<Socials />
	</div>
</div>

<style>
	h1 {
		font-family: 'Inter';
		font-size: 64px;
		font-weight: 700;
		margin-bottom: 4px;
		line-height: 75%;
	}

	.container {
		display: flex;
		align-items: center;
	}

	.text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.socials {
		display: flex;
		gap: 7px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
