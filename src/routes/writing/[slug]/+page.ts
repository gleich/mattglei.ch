import type { WritingData } from '$lib/writing/metadata';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

const posts = import.meta.glob<{
	default: Component<{ data: Record<string, unknown> }>;
	metadata: WritingData;
}>('/writings/*/index.md');

export const load = (async ({ params, data }) => {
	const loadPost = posts[`/writings/${params.slug}/index.md`];
	if (!loadPost) error(404, 'Post not found');

	const post = await loadPost();
	return { ...data, Content: post.default, metadata: post.metadata };
}) satisfies PageLoad;
