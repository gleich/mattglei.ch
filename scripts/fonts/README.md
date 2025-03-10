# fonts script

looks in [/static/fonts](../../static/fonts/) and automatically generates the follow CSS and Svelte code based on the files in that directory:

```css
/* generated from /scripts/fonts. do not manually edit. */

@font-face {
	font-family: 'IBM Plex Mono';
	src: url('/fonts/ibm_plex_mono/semibold_italic.woff2');
	font-weight: 600;
	font-style: italic;
}

@font-face {
	font-family: 'IBM Plex Sans';
	src: url('/fonts/ibm_plex_sans/medium.woff2');
	font-weight: 500;
}

@font-face {
	font-family: 'Inter';
	src: url('/fonts/inter/bold.woff2');
	font-weight: 700;
}

@font-face {
	font-family: 'Inter';
	src: url('/fonts/inter/extra_bold.woff2');
	font-weight: 800;
}
```

```svelte
<!-- generated from /scripts/fonts. do not manually edit. -->

<svelte:head>
	<link
		rel="preload"
		href="/fonts/ibm_plex_mono/semibold_italic.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/ibm_plex_sans/medium.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/inter/bold.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/inter/extra_bold.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>
```
