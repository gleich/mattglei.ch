<script lang="ts">
	import { Card } from '@gleich/ui';

	const { name }: { name: string } = $props();
</script>

<Card>
	<p>{name}</p>
</Card>
