<script>
	import Resume from '$lib/resume.svelte';
</script>

<div class="container">
	<p>Hey, I'm Matt Gleich</p>
	<p>
		I'm a third-year Computer Science student at the <a href="https://rit.edu" target="_blank"
			>Rochester Institute of Technology (RIT)</a
		>. This website serves as portfolio showcasing some of my projects, work experience, and
		personal interests. For any inquiries or potential collaborations, please contact me at
		<a href="mailto:mail@mattglei.ch">mail@mattglei.ch</a>. More of my professional work is detailed
		in my <Resume />.
	</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 10px;
		margin-bottom: 40px;
	}

	@media (max-width: 400px) {
		.container {
			margin-top: 40px;
			margin-bottom: 30px;
		}
	}
</style>
