<script lang="ts">
	import Card from '$lib/card.svelte';
	import Image from '$lib/image.svelte';
	import type { Dayjs } from 'dayjs';

	const {
		role,
		company,
		startDate,
		endDate,
		url,
		icon,
		description
	}: {
		role: string;
		company: string;
		startDate?: Dayjs | null;
		endDate?: Dayjs | null;
		url: string;
		icon: string;
		description: string;
	} = $props();

	const timeFormat = 'MMM YY';
</script>

<Card>
	<div class="container">
		<a href={url} target="_blank" class="title">
			<div class="icon">
				<Image src={`/experiences/${icon}`} alt={company} width={100} height={100} />
			</div>
			<div class="title-text">
				<div class="left">
					<h3 class="company">{company}</h3>
					<p class="role">{role}</p>
				</div>
				<div class="right">
					<p class="date">
						{#if startDate && endDate}
							{startDate.format(timeFormat)} - {endDate.format(timeFormat)}
						{:else if startDate}
							{startDate.format(timeFormat)} - Present
						{:else}
							Incoming
						{/if}
					</p>
				</div>
			</div>
		</a>
		<p>{description}</p>
	</div>
</Card>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.title {
		display: flex;
		gap: 10px;
		align-items: center;
		text-decoration: inherit;
		color: inherit;
	}

	.title-text {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.left {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.company {
		line-height: 95%;
	}

	.icon {
		width: 45px;
		height: 45px;
		border-radius: var(--border-radius);
		flex-shrink: 0;
		overflow: hidden;
	}

	.role {
		color: var(--green-foreground);
		font-size: 14px;
		background-color: var(--green-background);
		width: fit-content;
		padding: 2px 4px;
		line-height: 100%;
		border-radius: 2px;
	}

	.date {
		color: grey;
		font-size: 15px;
	}

	@media (max-width: 500px) {
		.title {
			gap: 5px;
		}

		.role {
			font-size: 13px;
		}

		.date {
			font-size: 14px;
		}
	}
</style>
