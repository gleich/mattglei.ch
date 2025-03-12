<script>
	import File from './icons/file.svelte';
</script>

<a href="/resume.pdf" target="_blank" class="container">
	<span class="icon">
		<File />
	</span>
	<span class="text">résumé</span>
</a>

<style>
	.container {
		display: inline-flex;
		height: 15px;
	}

	.icon {
		width: 15px;
		height: 15px;
		margin-right: 5px;
		position: relative;
		bottom: -2px;
		margin-left: 2px;
	}
</style>
