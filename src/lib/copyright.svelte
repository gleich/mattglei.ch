<script>
	import GithubIcon from './icons/github-icon.svelte';
</script>

<div class="container">
	<p class="copyright">
		© Matt Gleich {new Date().getFullYear()}<span class="all-rights-reserved">
			. All rights reserved.</span
		>
	</p>
	<a class="github-link" href="https://github.com/gleich/mattglei.ch" target="_blank">
		<div class="github-icon"><GithubIcon /></div>
		gleich/mattglei.ch</a
	>
</div>

<style>
	.container {
		width: 100%;
		border-top: 0.5px solid var(--border);
		padding: 5px 0;
		margin-top: 30px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
	}

	.github-icon {
		color: grey;
		width: 15px;
		height: 15px;
	}

	.github-link {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.github-link,
	.copyright {
		color: grey;
	}

	@media (max-width: 530px) {
		.all-rights-reserved {
			display: none;
		}
	}
</style>
