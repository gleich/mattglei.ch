<script lang="ts">
	import DynamicHead from '$lib/dynamic-head.svelte';
</script>

<DynamicHead
	title="Matt Gleich"
	description="student, software engineer, cyclist, and photographer"
/>

<main>
	<div class="introduction">
		<p>Hey, I'm Matt Gleich</p>
		<p>
			I'm a third-year Computer Science student at the <a href="https://rit.edu" about="_blank"
				>Rochester Institute of Technology (RIT)</a
			>. This website serves as portfolio showcasing some of my projects, work experience, and
			personal interests. For any inquiries or potential collaborations, please contact me at
			<a href="mailto:mail@mattglei.ch">mail@mattglei.ch</a>.
		</p>
	</div>
</main>

<style>
	main {
		padding: 0 20px;
		max-width: 1000px;
	}

	.introduction {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 10px;
	}
</style>
