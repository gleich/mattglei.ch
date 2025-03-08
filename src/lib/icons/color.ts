import { readable } from 'svelte/store';

const darkmode = '#FFFFFF';
const lightmode = '#1C1F21';

export const strokeColor = readable(lightmode, (set) => {
	// only run on client
	if (typeof window === 'undefined') {
		return () => {};
	}

	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	set(mediaQuery.matches ? darkmode : lightmode);
	const update = (e: MediaQueryListEvent) => {
		set(e.matches ? darkmode : lightmode);
	};
	mediaQuery.addEventListener('change', update);
	return () => mediaQuery.removeEventListener('change', update);
});
