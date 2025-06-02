<script lang="ts">
	import Section from '$lib/index/section.svelte';
	import dayjs from 'dayjs';
	import Experience from './experience.svelte';
	import Resume from '$lib/resume.svelte';
	import LinkedinButton from '$lib/icons/linkedin-icon.svelte';
	import ViewButton from '$lib/view-button.svelte';
</script>

<Section name="Experience">
	<p>
		Here are some of my professional software experiences, working with startups like <a
			href="https://stainless.com"
			target="_blank">Stainless</a
		>
		as well as large-mature fintech companies like
		<a href="https://bottomline.com" target="_blank">Bottomline Technologies</a>. You can find more
		information in my <Resume /> or on my
		<a href="https://linkedin.com/matt-gleich" target="_blank">LinkedIn</a>.
	</p>

	<div class="experiences">
		<Experience
			role="Current DevOps Intern"
			icon="kcftech.webp"
			company="KCF Technologies"
			url="https://kcftech.com"
			startDate={dayjs(new Date(2025, 5))}
			description="I am currently at KCF Technologies as a DevOps intern. I work with a wide array of technologies such as Terraform, AWS, Go, Python, and a number of other tools. I'm also handling some Linux administration tasks using infrastructure as code."
		/>

		<div class="past-experiences">
			<Experience
				role="Engineering Developer"
				icon="stainless.webp"
				company="Stainless"
				startDate={dayjs(new Date(2022, 5))}
				endDate={dayjs(new Date(2022, 11))}
				url="https://stainless.com"
				description="Served as the automation project owner, spearheaded the company's API, built GitHub actions to automate delivery and testing, and worked closely with a small, talented developer team."
			/>
			<Experience
				role="Contracted Developer"
				icon="rootly.webp"
				company="Rootly"
				startDate={dayjs(new Date(2021, 1))}
				endDate={dayjs(new Date(2021, 11))}
				url="https://rootly.com"
				description="Developed the official CLI for rootly.com and wrote its documentation, built a Go-based library for interacting with the Rootly API, and implemented both a GitHub action and a Homebrew tap for the CLI."
			/>
		</div>
	</div>

	<a class="view-more" href="https://www.linkedin.com/in/matt-gleich/" target="_blank">
		<ViewButton more on="LinkedIn" icon={LinkedinButton} iconPaddingBottom="1.5px" /></a
	>
</Section>

<style>
	.experiences {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.past-experiences {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.view-more {
		text-decoration: inherit;
		margin-bottom: 5px;
	}

	@media (max-width: 820px) {
		.past-experiences {
			grid-template-columns: 1fr;
		}
	}
</style>
