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
		<Loading expectedHeight="500px" />
	{:else if projects != null}
		<div class="projects">
			{#each projects.data as project}
				<div class="project">
					<div class="top">
						<div class="name">
							<div class="github-icon">
								<Github />
							</div>
							<p>{project.name}</p>
						</div>
						<p class="language" style:--language-color={project.language_color}>
							{project.language}
						</p>
					</div>
					<p class="description">{project.description}</p>
					<p class="updated">Updated <Since time={project.updated_at} /></p>
				</div>
			{/each}
		</div>
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
		padding: 0px 5px;
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
</style>
