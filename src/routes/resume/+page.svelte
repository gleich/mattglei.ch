<script lang="ts">
	import { DynamicHead } from '@gleich/ui';
	import Section from '$lib/resume/section.svelte';
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
				'Concurrency, gRPC, Protobuf, OAuth2, Webhooks, Server-Sent Events (SSE), Object-Oriented Design'
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
	<div class="resume-actions">
		<a class="download" href="/matt-gleich-resume.pdf" download>
			<span class="button-label">
				<span class="download-icon" aria-hidden="true"><FileIcon /></span>
				Download PDF
			</span>
		</a>
	</div>

	<div class="resume-document">
		<header class="resume-header">
			<div class="title">
				<h2>Matt Gleich</h2>
				<p class="profession">Software Engineer <span>[Graduating May 2027]</span></p>
			</div>
			<img class="mark" src="/resume/mark.svg" alt="" width="82" height="82" />
			<address>
				<a href="mailto:email@mattglei.ch">
					<img src="/resume/email.svg" alt="" width="14" height="14" />
					email@mattglei.ch
				</a>
				<a href="https://mattglei.ch">
					<img src="/resume/website.svg" alt="" width="14" height="14" />
					mattglei.ch
				</a>
				<span class="contact">
					<img src="/resume/location.svg" alt="" width="14" height="14" />
					Greater New York City Area
				</span>
				<a href="tel:+16033257895">
					<img src="/resume/phone.svg" alt="" width="14" height="14" />
					+1 (603) 325-7895
				</a>
				<a href="https://github.com/gleich" target="_blank" rel="noopener noreferrer">
					<span class="contact-icon" aria-hidden="true"><GitHubIcon /></span>
					github.com/gleich
				</a>
				<a
					href="https://www.linkedin.com/in/matt-gleich/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span class="contact-icon" aria-hidden="true"><LinkedinIcon /></span>
					linkedin.com/in/matt-gleich
				</a>
			</address>
		</header>

		<div class="sections">
			<Section name="Experience">
				<Entry
					name="Synthient"
					role="Software Engineering Intern"
					dates="Jan 2026 - Present"
					href="https://synthient.com/"
					icon="/resume/synthient.svg"
				>
					<ul>
						<li>
							Developed an agentic pipeline that implemented, tested, and documented SDKs from
							scratch in 10 languages using OpenAPI.
						</li>
						<li>
							Independently developed the <a
								href="https://github.com/synthient/cli"
								target="_blank"
								rel="noopener noreferrer"
								><span class="inline-icon" aria-hidden="true"><GitHubIcon /></span> Synthient CLI</a
							>
							and Go SDK for IP and domain intelligence, paginated Parquet snapshots, and cancellable
							real-time feeds; automated CLI releases across macOS, Linux, and Windows.
						</li>
						<li>
							Automated ClickHouse backups for terabytes of data with Go: hourly Parquet exports to
							S3-compatible storage, deduplication, concurrent historical backfills, and Prometheus
							monitoring.
						</li>
						<li>
							Centralized API metrics and logs across development and production with Docker,
							Grafana, Prometheus, Loki, and Alloy.
						</li>
						<li>
							Enabled customer integrations, threat intelligence queries, and migrations from
							competing platforms through <a
								href="https://docs.synthient.com/ai/codex"
								target="_blank"
								rel="noopener noreferrer"
								>Codex <img src="/resume/external-link.svg" alt="" width="13" height="13" /></a
							>
							and
							<a
								href="https://docs.synthient.com/ai/claude"
								target="_blank"
								rel="noopener noreferrer"
								>Claude Code <img
									src="/resume/external-link.svg"
									alt=""
									width="13"
									height="13"
								/></a
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
					icon="/resume/kcf-technologies.svg"
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
							Migrated Packer AMI pipelines from Azure DevOps to GitHub Actions, reducing CI costs
							and improving reliability.
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
					icon="/resume/stainless.svg"
					preserveIconColors
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
					icon="/resume/rootly.svg"
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
					icon="/resume/bottomline.svg"
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
							Helped diagnose and resolve defects in Terraform, Puppet, and Kubernetes platforms
							used in private data centers.
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
							Deployed with Docker, Redis, and MinIO; automated tests, linting, image publishing,
							and deployments via GitHub Actions.
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
							Automated asset preparation with Go: image dimensions, BlurHash previews, font CSS,
							and preload tags for photos and fonts.
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
				<div class="education">
					<span class="education-icon">
						<img src="/resume/rit.svg" alt="" width="22" height="22" loading="lazy" />
					</span>
					<h4>Rochester Institute of Technology</h4>
					<p class="education-dates">Aug 2022 - Expected May 2027</p>
					<p class="degree">
						Bachelor of Science in Computer Science <span>Five-year co-op program</span>
					</p>
				</div>
			</Section>
		</div>
	</div>
</main>

<style>
	@font-face {
		font-family: 'Resume Inter';
		src: url('/resume/fonts/inter-regular.woff2') format('woff2');
		font-weight: 400;
		font-style: normal;
		font-display: optional;
	}

	@font-face {
		font-family: 'Resume Inter';
		src: url('/resume/fonts/inter-semibold.woff2') format('woff2');
		font-weight: 600;
		font-style: normal;
		font-display: optional;
	}

	@font-face {
		font-family: 'Resume Inter';
		src: url('/resume/fonts/inter-bold.woff2') format('woff2');
		font-weight: 700;
		font-style: normal;
		font-display: optional;
	}

	main {
		max-width: 960px;
		margin: 0 auto;
	}

	.resume-actions {
		margin-bottom: 16px;
	}

	.download {
		display: block;
		text-decoration: none;
	}

	.download .button-label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-height: 44px;
		padding: 12px 18px;
		font-size: 0.9375rem;
	}

	.download-icon {
		display: flex;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.resume-document {
		--resume-muted: color-mix(in srgb, var(--foreground) 68%, var(--actual-background-color));
		--resume-icon-filter: invert(1);
		padding-left: 32px;
		color: var(--foreground);
		font-family: 'Resume Inter', 'Inter Fallback', Arial, sans-serif;
		font-size: 0.9375rem;
		font-weight: 400;
		font-feature-settings: normal;
		font-variant-ligatures: none;
		line-height: 1.25;
	}

	.resume-document :global(a) {
		color: inherit;
		text-decoration: none;
		text-underline-offset: 3px;
	}

	.resume-document :global(a:hover) {
		text-decoration: underline;
	}

	.resume-document :global(img) {
		filter: var(--resume-icon-filter);
	}

	.resume-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 10px 16px;
		margin-bottom: 10px;
	}

	h2 {
		font-family: inherit;
		font-size: 2.737em;
		font-weight: 700;
		line-height: 1.12;
		text-wrap: wrap;
	}

	.profession {
		margin-top: 5px;
		color: var(--resume-muted);
		font-size: 1.105em;
		text-wrap: wrap;
	}

	.profession span {
		display: inline-block;
		margin-left: 5px;
	}

	.mark {
		grid-column: 2;
		grid-row: 1 / 3;
		align-self: start;
		width: 82px;
		height: 82px;
	}

	address {
		display: grid;
		grid-template-columns: max-content max-content minmax(0, 1fr);
		gap: 3px 24px;
		font-size: 0.947em;
		font-style: normal;
		line-height: 1.3;
	}

	address a,
	.contact {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	address a {
		width: fit-content;
		text-decoration: none;
	}

	address a:hover {
		text-decoration: underline;
	}

	.contact-icon,
	address img {
		display: flex;
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	ul {
		padding-left: 16px;
		list-style-position: outside;
	}

	li + li {
		margin-top: 2px;
	}

	li a {
		white-space: nowrap;
	}

	.inline-icon {
		display: inline-flex;
		width: 14px;
		height: 14px;
		vertical-align: -2px;
	}

	.skills {
		margin: 0;
	}

	.skills div {
		display: grid;
		grid-template-columns: 100px minmax(0, 1fr);
		gap: 8px;
	}

	dt {
		font-weight: 600;
		text-align: right;
	}

	dd {
		margin: 0;
	}

	.education {
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr) auto;
		align-items: center;
		gap: 4px 10px;
		padding-top: 3px;
	}

	.education-icon {
		grid-row: 1 / 3;
		align-self: start;
		width: 28px;
		height: 28px;
		padding: 2px;
		border: 1px solid var(--border);
		background: var(--background);
	}

	.education-icon img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	h4 {
		font-family: inherit;
		font-size: 1.105em;
		font-weight: 600;
		line-height: inherit;
		text-wrap: wrap;
	}

	.education-dates {
		color: var(--resume-muted);
		font-size: 0.947em;
		text-align: right;
	}

	.degree {
		grid-column: 2 / -1;
		text-wrap: wrap;
	}

	.degree span {
		display: inline-block;
		margin-left: 12px;
		color: var(--resume-muted);
	}

	@media (prefers-color-scheme: light) {
		.resume-document {
			--resume-icon-filter: none;
		}
	}

	@media (max-width: 900px) {
		address {
			grid-column: 1 / -1;
		}

		.mark {
			grid-row: 1;
		}
	}

	@media (max-width: 700px) {
		address {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 8px 16px;
		}

		.education {
			grid-template-columns: 28px minmax(0, 1fr);
		}

		.education-dates {
			grid-column: 2;
			text-align: left;
		}
	}

	@media (max-width: 600px) {
		.resume-document {
			padding-left: 28px;
			line-height: 1.45;
		}

		.resume-header {
			grid-template-columns: minmax(0, 1fr);
			gap: 12px;
			margin-bottom: 16px;
		}

		h2 {
			font-size: 2.15em;
		}

		.mark {
			display: none;
		}

		.profession span {
			display: block;
			margin-left: 0;
		}

		address {
			grid-template-columns: minmax(0, 1fr);
			gap: 8px;
			overflow-wrap: anywhere;
		}

		.sections {
			gap: 16px;
		}

		li + li {
			margin-top: 5px;
		}

		.skills div {
			grid-template-columns: minmax(0, 1fr);
			gap: 2px;
		}

		.skills div + div {
			margin-top: 8px;
		}

		dt {
			text-align: left;
		}

		.degree span {
			display: block;
			margin-left: 0;
		}
	}
</style>
