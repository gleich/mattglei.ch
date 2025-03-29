<script lang="ts">
	import dayjs from 'dayjs';
	import writings from './writings';
</script>

{#each writings as [name, date]}
	<p>{name}</p>
	<p>{dayjs(date).format('MMM YYYY')}</p>
{/each}
