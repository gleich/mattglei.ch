import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(duration);
dayjs.extend(advancedFormat);

export function renderDate(date: Dayjs, now: Dayjs, lowercaseDayOfWeek: boolean = false): string {
	const dayjsDate = dayjs(date);
	const yesterday = now.subtract(1, 'day');
	const tomorrow = now.add(1, 'day');
	let dayOfWeek: string;

	if (
		now.date() === dayjsDate.date() &&
		now.year() === dayjsDate.year() &&
		now.month() === dayjsDate.month()
	) {
		dayOfWeek = 'Today';
	} else if (
		yesterday.date() === dayjsDate.date() &&
		yesterday.year() === dayjsDate.year() &&
		yesterday.month() === dayjsDate.month()
	) {
		dayOfWeek = 'Yesterday';
	} else if (
		tomorrow.date() === dayjsDate.date() &&
		tomorrow.year() === dayjsDate.year() &&
		tomorrow.month() === dayjsDate.month()
	) {
		dayOfWeek = 'Tomorrow';
	} else {
		dayOfWeek = dayjsDate.format('dddd, MMM Do');
	}

	return dayjsDate.format(
		`[${lowercaseDayOfWeek ? dayOfWeek.toLowerCase() : dayOfWeek}] [at] h:mm A`
	);
}

export function fromNow(date: Dayjs, currentTime: Dayjs): string {
	const yearsDiff = Math.abs(date.diff(currentTime, 'year'));
	const totalMonthsDiff = Math.abs(date.diff(currentTime, 'month'));
	const monthsDiff = totalMonthsDiff % 12;

	const totalDaysDiff = Math.abs(date.diff(currentTime, 'day'));
	const weeksDiff = totalDaysDiff >= 7 ? Math.floor(totalDaysDiff / 7) : 0;
	const daysDiff = weeksDiff > 0 ? totalDaysDiff % 7 : totalDaysDiff % 30;

	const hoursDiff = Math.abs(date.diff(currentTime, 'hour')) % 24;
	const minutesDiff = Math.abs(date.diff(currentTime, 'minute')) % 60;
	const msDiff = Math.abs(date.diff(currentTime, 'millisecond'));
	const secondsDiff = (msDiff / 1000) % 60;

	let fromNowStr = '';

	if (yearsDiff > 0) {
		fromNowStr = `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'}`;
		if (monthsDiff > 0) {
			fromNowStr += ` ${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'}`;
		}
	} else if (monthsDiff > 0) {
		fromNowStr = `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'}`;
		if (daysDiff > 0) {
			fromNowStr += ` ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'}`;
		}
	} else if (weeksDiff > 0) {
		fromNowStr = `${weeksDiff} ${weeksDiff === 1 ? 'week' : 'weeks'}`;
		if (daysDiff > 0) {
			fromNowStr += ` ${daysDiff}d`;
		}
	} else if (totalDaysDiff > 0) {
		fromNowStr = `${daysDiff}d`;
		if (hoursDiff > 0) {
			fromNowStr += ` ${hoursDiff}hr`;
		}
	} else if (hoursDiff > 0) {
		fromNowStr = `${hoursDiff}hr`;
		if (minutesDiff > 0) {
			fromNowStr += ` ${minutesDiff}m`;
		}
	} else if (minutesDiff > 0) {
		fromNowStr = `${minutesDiff}m`;
		if (secondsDiff > 0) {
			fromNowStr += ` ${secondsDiff.toFixed(2)}s`;
		}
	} else {
		fromNowStr = `${secondsDiff.toFixed(2)}s`;
	}

	return fromNowStr + ' ago';
}

export function renderDuration(seconds: number): string {
	const duration = dayjs.duration(seconds, 'seconds');
	let formattedDuration: string;

	const totalHours = Math.floor(duration.asHours());
	const minutes = duration.minutes();
	if (totalHours > 0) {
		formattedDuration = `${totalHours}hr`;
		if (minutes > 0) {
			formattedDuration += ` ${minutes}m`;
		}
	} else if (seconds < 3660 && seconds > 3540) {
		formattedDuration = '1hr';
	} else {
		const remainingSeconds = duration.seconds();
		formattedDuration = `${minutes}m`;
		if (remainingSeconds > 0) {
			formattedDuration += ` ${remainingSeconds}s`;
		}
	}
	return formattedDuration;
}
