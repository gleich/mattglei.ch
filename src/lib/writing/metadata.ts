import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export interface WritingData {
	title: string;
	publishedDate: string;
	description: string;
	keywords: string[];
	readTime: number;
}

export function formatPublishedDate(date: string): string {
	return dayjs(date).format('MMMM Do YYYY');
}
