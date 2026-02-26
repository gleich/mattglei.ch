<script lang="ts">
	import { Logo } from '@gleich/ui';
</script>

<div class="container">
	<div class="logo">
		<Logo />
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(60vh - 10px);
	}

	.logo {
		width: 100px;
		height: 100px;
	}
</style>
