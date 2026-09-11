<script lang="ts">
	import Section from '$lib/index/section.svelte';
	import dayjs from 'dayjs';
	import Experience from './experience.svelte';
	import Resume from '$lib/resume.svelte';
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
			role="Software Engineering Intern"
			icon="synthient.webp"
			company="Synthient"
			url="https://synthient.com"
			startDate={dayjs(new Date(2026, 0))}
			description="Built an agentic pipeline that implemented, tested, and documented SDKs in 10 languages. Developed a Go SDK and CLI for IP and domain intelligence, automated ClickHouse backups for terabytes of data, and built an MCP server and plugins for AI coding tools."
		/>
		<Experience
			role="Associate DevOps Engineer"
			icon="kcftech.webp"
			company="KCF Technologies"
			url="https://kcftech.com"
			startDate={dayjs(new Date(2025, 5))}
			endDate={dayjs(new Date(2025, 11))}
			description="Implemented role-management APIs in Rust with Axum, SQLx, and PostgreSQL, and managed AWS infrastructure with Terraform. Migrated Packer AMI pipelines from Azure DevOps to GitHub Actions, reducing CI costs and improving reliability."
		/>
		<Experience
			role="Engineering Developer"
			icon="stainless.webp"
			company="Stainless"
			startDate={dayjs(new Date(2022, 5))}
			endDate={dayjs(new Date(2022, 11))}
			url="https://stainless.com"
			description="Built a REST API with Node.js and Express to give customers programmatic access to the platform. Automated SDK generation and delivery from OpenAPI changes and owned GitHub Actions workflows for testing, builds, and deployments."
		/>
		<Experience
			role="Contracted Developer"
			icon="rootly.webp"
			company="Rootly"
			startDate={dayjs(new Date(2021, 1))}
			endDate={dayjs(new Date(2021, 11))}
			url="https://rootly.com"
			description="Created Rootly's original Go CLI for reporting deployments from terminals and CI/CD pipelines. Automated releases with GoReleaser and Homebrew, added a Docker-based GitHub Action, and wrote customer documentation."
		/>
	</div>

	<a class="view-more" href="/resume">
		<span class="button-label">View more in resume</span>
	</a>
</Section>

<style>
	.experiences {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.view-more {
		text-decoration: inherit;
		margin-bottom: 5px;
	}

	.button-label {
		padding: 10px;
	}

	@media (max-width: 830px) {
		.experiences {
			grid-template-columns: 1fr;
		}
	}
</style>
