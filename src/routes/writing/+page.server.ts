import type { WritingData } from '$lib/writing/metadata';
import type { PageServerLoad } from './$types';

const posts = import.meta.glob<WritingData>('/writings/*/index.md', {
	eager: true,
	import: 'metadata'
});

export const load = (() => ({
	writings: Object.entries(posts)
		.map(([path, metadata]) => ({
			...metadata,
			slug: path.slice('/writings/'.length, -'/index.md'.length)
		}))
		.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
})) satisfies PageServerLoad;
