<script lang="ts">
	import File from './icons/file.svelte';
</script>

<a href="/resume.pdf" target="_blank" class="container"
	><span class="icon"><File size={15} /></span>
	<span class="text">résumé</span></a
>

<style>
	.container {
		text-decoration: none;
		white-space: nowrap;
	}

	.icon {
		position: relative;
		vertical-align: bottom;
		padding-right: 2px;
		bottom: -3px;
		padding-left: 2px;
	}

	.text {
		text-decoration: underline;
	}
</style>
