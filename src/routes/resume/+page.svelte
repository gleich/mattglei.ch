<script lang="ts">
	import { DynamicHead } from '@gleich/ui';
	import Section from '$lib/index/section.svelte';
	import Entry from '$lib/resume/entry.svelte';
	import FileIcon from '$lib/icons/file-icon.svelte';
	import GitHubIcon from '$lib/icons/github-icon.svelte';
	import LinkedinIcon from '$lib/icons/linkedin-icon.svelte';

	const skills = [
		{
			name: 'AI tooling',
			description:
				'MCP servers, Codex, Claude Code, agentic loops, SDK generation, validation, skills, hooks, local models'
		},
		{
			name: 'Programming',
			description:
				'Go (Golang), TypeScript, JavaScript, Python, Rust, SQL, Bash, HTML, CSS, Unit Testing'
		},
		{
			name: 'Development',
			description:
				'Git, GitHub, REST APIs, SDKs, CLIs, PostgreSQL, GraphQL, Redis, S3, SvelteKit, Node.js, Express, Axum, SQLx'
		},
		{
			name: 'Engineering',
			description:
				'Object-Oriented Design, Concurrency, gRPC, Protobuf, OAuth2, Webhooks, Server-Sent Events (SSE)'
		},
		{
			name: 'Infrastructure',
			description:
				'Docker Compose, AWS, Terraform, Kubernetes, Puppet, GitHub Actions, CI/CD, Prometheus, Grafana, Loki'
		}
	];
</script>

<DynamicHead
	title="Resume | Matt Gleich"
	description="Matt Gleich's software engineering resume: experience, projects, skills, and education. Graduating from RIT in May 2027."
/>

<main>
	<header class="resume-header">
		<h2>Resume</h2>
		<p class="profession">Software Engineer <span>[Graduating May 2027]</span></p>
		<address>
			<a href="mailto:email@mattglei.ch">email@mattglei.ch</a>
			<span>Greater New York City Area</span>
			<a href="tel:+16033257895">+1 (603) 325-7895</a>
			<a
				class="social-contact"
				href="https://github.com/gleich"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="contact-icon" aria-hidden="true"><GitHubIcon /></span>
				github.com/gleich
			</a>
			<a
				class="social-contact"
				href="https://www.linkedin.com/in/matt-gleich/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="contact-icon" aria-hidden="true"><LinkedinIcon /></span>
				linkedin.com/in/matt-gleich
			</a>
		</address>
		<a class="download" href="/matt-gleich-resume.pdf" target="_blank" rel="noopener noreferrer">
			<span class="button-label">
				<span class="download-icon" aria-hidden="true"><FileIcon /></span>
				Download PDF
			</span>
		</a>
	</header>

	<div class="sections">
		<Section name="Experience">
			<Entry
				name="Synthient"
				role="Software Engineering Intern"
				dates="Jan 2026 - Present"
				href="https://synthient.com/"
				icon="/experiences/synthient.webp"
			>
				<ul>
					<li>
						Developed an agentic pipeline that implemented, tested, and documented SDKs from scratch
						in 10 languages using OpenAPI.
					</li>
					<li>
						Independently developed the <a
							href="https://github.com/synthient/cli"
							target="_blank"
							rel="noopener noreferrer">Synthient CLI</a
						>
						and Go SDK for IP and domain intelligence, paginated Parquet snapshots, and cancellable real-time
						feeds; automated CLI releases across macOS, Linux, and Windows.
					</li>
					<li>
						Automated ClickHouse backups for terabytes of data with Go: hourly Parquet exports to
						S3-compatible storage, deduplication, concurrent historical backfills, and Prometheus
						monitoring.
					</li>
					<li>
						Centralized API metrics and logs across development and production with Docker, Grafana,
						Prometheus, Loki, and Alloy.
					</li>
					<li>
						Enabled customer integrations, threat intelligence queries, and migrations from
						competing platforms through <a
							href="https://docs.synthient.com/ai/codex"
							target="_blank"
							rel="noopener noreferrer">Codex</a
						>
						and
						<a href="https://docs.synthient.com/ai/claude" target="_blank" rel="noopener noreferrer"
							>Claude Code</a
						> plugins and an eight-tool Model Context Protocol (MCP) server.
					</li>
					<li>
						Improved React documentation rendering and accessibility; added interactive onboarding
						and Markdown exports for AI tools.
					</li>
				</ul>
			</Entry>
			<Entry
				name="KCF Technologies"
				role="Associate DevOps Engineer"
				dates="Jun 2025 - Dec 2025"
				href="https://kcftech.com/"
				icon="/experiences/kcftech.webp"
			>
				<ul>
					<li>
						Implemented transactional role-management endpoints in Rust with Axum, SQLx, and
						PostgreSQL for three permission levels.
					</li>
					<li>
						Provisioned EC2, Lambda, AMI permissions, and KMS access through Terraform across AWS
						accounts and environments.
					</li>
					<li>
						Migrated Packer AMI pipelines from Azure DevOps to GitHub Actions, reducing CI costs and
						improving reliability.
					</li>
					<li>
						Standardized monorepo builds, linting, and infrastructure validation by refactoring
						shared CI/CD, shell, and Docker tooling.
					</li>
				</ul>
			</Entry>
			<Entry
				name="Stainless"
				role="Engineering Developer"
				dates="Jun 2022 - Dec 2022"
				href="https://www.stainless.com/"
				icon="/experiences/stainless.webp"
			>
				<ul>
					<li>
						Implemented a customer-facing REST API with Node.js and Express, enabling programmatic
						access to the platform.
					</li>
					<li>
						Automated SDK generation and delivery from OpenAPI changes via a GitHub Action in
						customer CI, replacing manual emails.
					</li>
					<li>
						Owned product CI/CD, implementing GitHub Actions workflows for testing, building, and
						deployment.
					</li>
				</ul>
			</Entry>
			<Entry
				name="Rootly"
				role="Contracted Developer"
				dates="Feb 2021 - Dec 2021"
				href="https://rootly.com/"
				icon="/experiences/rootly.webp"
			>
				<ul>
					<li>
						Created Rootly’s original Go/Cobra CLI for deployment execution, status, and metadata
						reporting from terminals and CI/CD.
					</li>
					<li>
						Automated multi-platform CLI releases with GoReleaser, GitHub Releases, installation
						scripts, and Homebrew.
					</li>
					<li>
						Implemented a Docker GitHub Action and wrote customer documentation and examples for
						deployment reporting.
					</li>
				</ul>
			</Entry>
			<Entry
				name="Bottomline Technologies"
				role="Cloud Automation Intern"
				dates="Jun 2021 - Aug 2021; Jun 2020 - Aug 2020"
				href="https://www.bottomline.com/us"
				icon="/experiences/bottomline.svg"
				lightIcon
			>
				<ul>
					<li>
						Rewrote a Python module automating weekly Puppet releases, supporting updates to over
						10,000 virtual machines across private data centers on two continents.
					</li>
					<li>
						Automated documentation in Go and GitLab release notes; contributed reusable CI/CD and
						GitOps pipeline components.
					</li>
					<li>
						Helped diagnose and resolve defects in Terraform, Puppet, and Kubernetes platforms used
						in private data centers.
					</li>
				</ul>
			</Entry>
		</Section>

		<Section name="Projects">
			<Entry
				name="lcp"
				role="Lightweight Cache & Proxy"
				dates="Jun 2023 - Present"
				href="https://mattglei.ch/writing/lcp"
			>
				<ul>
					<li>
						Aggregated REST and GraphQL APIs in a Go backend with microsecond in-memory responses;
						kept cached responses available across restarts and upstream outages using generics,
						polling, webhooks, and disk persistence.
					</li>
					<li>
						Streamed live updates with Server-Sent Events, change detection, and buffered channels
						that isolated slow clients.
					</li>
					<li>
						Deployed with Docker, Redis, and MinIO; automated tests, linting, image publishing, and
						deployments via GitHub Actions.
					</li>
				</ul>
			</Entry>
			<Entry
				name="mattglei.ch"
				role="Personal Website"
				dates="Jun 2024 - Present"
				href="https://mattglei.ch"
			>
				<ul>
					<li>
						Implemented progressive loading and live project, music, and fitness updates in
						SvelteKit and TypeScript using concurrent requests and Server-Sent Events; added
						playlist pagination, retries, and cancellation to prevent stale updates.
					</li>
					<li>
						Enabled mdsvex posts with live data, Svelte components, automatic discovery, and
						frontmatter, removing per-post route files.
					</li>
					<li>
						Automated asset preparation with Go: image dimensions, BlurHash previews, font CSS, and
						preload tags for photos and fonts.
					</li>
				</ul>
			</Entry>
		</Section>

		<Section name="Skills">
			<dl class="skills">
				{#each skills as skill (skill.name)}
					<div>
						<dt>{skill.name}</dt>
						<dd>{skill.description}</dd>
					</div>
				{/each}
			</dl>
		</Section>

		<Section name="Education">
			<Entry
				name="Rochester Institute of Technology"
				role="Bachelor of Science in Computer Science"
				dates="Aug 2022 - Expected May 2027"
				icon="/resume/rit.svg"
				lightIcon
			>
				<p>Five-year co-op program</p>
			</Entry>
		</Section>
	</div>
</main>

<style>
	.resume-header {
		margin: 0 0 20px;
	}

	h2 {
		margin-bottom: 8px;
	}

	.download {
		display: block;
		width: 100%;
		margin: 16px auto 0;
		text-decoration: none;
	}

	.download .button-label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		min-height: 52px;
		padding: 16px 24px;
		font-size: 1rem;
	}

	.download-icon {
		display: flex;
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.profession {
		font-size: 1.125rem;
		line-height: 1.5;
	}

	.profession span {
		color: color-mix(in srgb, var(--foreground) 68%, var(--background));
	}

	address {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 18px;
		margin-top: 10px;
		font-size: 0.9375rem;
		font-style: normal;
		line-height: 1.4;
	}

	address a {
		width: fit-content;
		color: var(--foreground);
		text-decoration-color: currentColor;
	}

	.social-contact {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.contact-icon {
		display: flex;
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.sections {
		--section-content-gap: 0px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	ul {
		padding-left: 18px;
		list-style-position: outside;
	}

	li + li {
		margin-top: 3px;
	}

	.skills {
		margin: 0;
		padding: 2px;
		line-height: 1.45;
	}

	.skills div {
		display: grid;
		grid-template-columns: 112px minmax(0, 1fr);
		gap: 10px;
	}

	.skills div + div {
		margin-top: 6px;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0;
	}

	@media (max-width: 500px) {
		.profession span {
			display: block;
		}

		.sections {
			gap: 16px;
		}

		.skills div {
			grid-template-columns: minmax(0, 1fr);
			gap: 3px;
		}
	}
</style>
