import type { ServerLoad } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const loaders = import.meta.glob<ServerLoad>('/writings/*/index.server.ts', {
	import: 'load'
});

export const load = (async (event) => {
	const loadModule = loaders[`/writings/${event.params.slug}/index.server.ts`];
	if (!loadModule) return {};

	const loadPostData = await loadModule();
	return loadPostData(event);
}) satisfies PageServerLoad;
