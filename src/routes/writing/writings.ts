import type { WritingData } from '$lib/writing.svelte';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const dateFormat = 'MMMM Do YYYY';

const writings: Map<string, WritingData> = new Map([
	[
		'lcp',
		{
			title: 'lcp: Lightweight Cache & Proxy',
			publishedDate: dayjs('2025-03-30').format(dateFormat),
			description:
				'Technical writeup of a lightweight cache proxy written in Go. Backend service for caching, processing, and aggregating data from APIs like the Strava and GitHub API.',
			opengraphImage: {
				url: 'https://beta.mattglei.ch/writings/lcp/opengraph.png',
				width: '1200',
				height: '630'
			}
		}
	]
]);

export default writings;
