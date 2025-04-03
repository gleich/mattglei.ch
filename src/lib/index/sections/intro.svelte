<script>
	import RitIcon from '$lib/icons/rit-icon.svelte';
	import Resume from '$lib/resume.svelte';
</script>

<div class="container">
	<p>Hey, I'm Matt Gleich</p>
	<div>
		I'm a third-year Computer Science student at the

		<a href="https://rit.edu" target="_blank" class="rit-link">
			<span class="rit-icon">
				<RitIcon />
			</span>Rochester Institute of Technology (RIT)
		</a>. This website serves as a portfolio showcasing some of my projects, work experience, and
		personal interests. I am committed to applying my technical skills to develop practical
		solutions and consistently strive to expand my expertise. If you'd like to discuss a project or
		explore potential opportunities, please contact me at
		<a href="mailto:mail@mattglei.ch">mail@mattglei.ch</a>. Additional details about my professional
		work are in my <Resume />.
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin: 10px;
		margin-bottom: 60px;
	}

	.rit-icon {
		width: 19px;
		height: 19px;
		position: relative;
		bottom: -4px;
		margin: 0 2px;
		margin-right: 5px;
		display: inline-block;
		color: #f76900;
	}

	.rit-link {
		color: #f76900;
		display: inline-block;
	}

	@media (max-width: 500px) {
		.container {
			gap: 10px;
		}

		.rit-icon {
			width: 17px;
			height: 17px;
		}
	}

	@media (max-width: 400px) {
		.container {
			margin-top: 40px;
			margin-bottom: 30px;
		}
	}
</style>
