<script>
	import FileIcon from './icons/file-icon.svelte';
</script>

<a href="/resume.pdf" target="_blank" class="container">
	<span class="icon">
		<FileIcon />
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
		bottom: -2.75px;
		margin-left: 2px;
	}
</style>
