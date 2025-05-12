<script>
	import Resume from '$lib/resume.svelte';
</script>

<div class="container">
	<p>Hey, I'm Matt Gleich</p>
	<div>
		I'm a rising fourth-year Computer Science student at the

		<a href="https://rit.edu" target="_blank"> Rochester Institute of Technology (RIT) </a>. This
		website serves as a portfolio showcasing some of my projects, work experience, and personal
		interests. I am committed to applying my technical skills to develop practical solutions and
		consistently strive to expand my expertise. If you'd like to discuss a project or explore
		potential opportunities, please contact me at
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
		margin-top: 0;
		margin-bottom: 60px;
	}

	@media (max-width: 500px) {
		.container {
			gap: 10px;
			margin-left: 0;
			margin-right: 0;
		}
	}

	@media (max-width: 400px) {
		.container {
			margin-bottom: 30px;
		}
	}
</style>
