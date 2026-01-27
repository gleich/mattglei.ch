import type { WritingData } from '$lib/writing/writing.svelte';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const dateFormat = 'MMMM Do YYYY';

const writings: Map<string, WritingData> = new Map([
	[
		'audio',
		{
			title: 'My Audio Setup',
			publishedDate: dayjs('2026-01-27').format(dateFormat),
			description:
				'A full showcase of my current audio setup (as of January 27th 2026). My main speakers, receiver, IEMs, DACs, and Amps.',
			keywords: ['Audio', 'Music'],
			readTime: 5
		}
	],
	[
		'lcp',
		{
			title: 'lcp: Lightweight Cache & Proxy',
			publishedDate: dayjs('2025-03-30').format(dateFormat),
			description:
				'Technical writeup of a lightweight cache proxy written in Go. Backend service for caching, processing, and aggregating data from APIs like the Strava and GitHub API. Used to power the live data on mattglei.ch and terminal.mattglei.ch',
			keywords: ['Programming', 'Technical', 'Go'],
			readTime: 5
		}
	]
]);

export default writings;
