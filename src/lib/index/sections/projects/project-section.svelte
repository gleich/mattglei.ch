<script lang="ts">
	import Error from '$lib/error.svelte';
	import Github from '$lib/icons/github.svelte';
	import Section from '$lib/index/section.svelte';
	import type { Repository } from '$lib/lcp/github';
	import type { LcpResponse } from '$lib/lcp/lcp.server';
	import Loading from '$lib/loading.svelte';
	import Since from '$lib/time/since.svelte';

	const { projects, loading }: { projects?: LcpResponse<Repository[]> | null; loading?: boolean } =
		$props();

	function hexToRgb(hex: string) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				}
			: null;
	}

	projects?.data.forEach((p) => {
		const rgb = hexToRgb(p.language_color);
		if (rgb) {
			p.language_color = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
		}
	});
</script>

<Section
	name="Projects"
	liveData={{
		sources: [{ name: 'GitHub', icon: Github, url: 'https://github.com' }],
		updated: projects?.updated
	}}
>
	{#if loading}
		<Loading expectedHeight="402px" />
	{:else if projects != null}
		<p class="intro">
			I love to build and explore everything from <a
				href="https://github.com/gleich/pcbs"
				target="_blank">PCBs</a
			>
			to <a href="https://github.com/gleich/lcp-2" target="_blank">REST APIs</a>. Recently I've
			really been enjoying working with
			<a href="https://svelte.dev" target="_blank">Svelte/SvelteKit</a>
			and <a href="https://go.dev" target="_blank">Go</a>. Here are a few of my top projects that
			are open-source from my GitHub:
		</p>
		<div class="projects">
			{#each projects.data as project}
				<a
					class="project"
					href={project.url}
					title={`View "${project.owner}/${project.name}" on GitHub`}
					target="_blank"
				>
					<div class="top">
						<div class="name">
							<div class="github-icon">
								<Github />
							</div>
							<p>{project.owner}/{project.name}</p>
						</div>
						<p class="language" style:--language-color={project.language_color}>
							{project.language}
						</p>
					</div>
					<p class="description">{project.description}</p>
					<p class="updated">Updated <Since time={project.updated_at} /></p>
				</a>
			{/each}
		</div>
		<a href="https://github.com/gleich?tab=repositories" target="_blank">
			<button>View More Projects</button>
		</a>
	{:else}
		<Error msg="Failed to load projects" />
	{/if}
</Section>

<style>
	.projects {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.project {
		text-decoration: inherit;
		color: inherit;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid var(--border);
		box-shadow: var(--box-shadow);
		border-radius: var(--border-radius);
		padding: 5px;
		gap: 8px;
	}

	.top {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.name {
		display: flex;
		color: var(--green-foreground);
		background-color: var(--green-background);
		border: 1px solid var(--green-border);
		padding: 1px 5px;
		border-radius: 2px;
		gap: 7px;
	}

	.github-icon {
		width: 15px;
		height: 15px;
		padding-top: 2.5px;
	}

	.description {
		align-self: center;
		text-align: center;
	}

	.language {
		display: flex;
		align-items: center;
		background-color: rgba(var(--language-color), 0.4);
		border: 1px solid rgb(var(--language-color));
		padding: 0 5px;
		border-radius: 2px;
		gap: 5px;
	}

	.updated {
		color: grey;
		font-size: 14.5px;
	}

	button {
		width: 100%;
		padding: 5px;
	}

	@media (max-width: 670px) {
		.projects {
			grid-template-columns: 1fr;
		}
	}
</style>
