# [mattglei.ch](https://mattglei.ch)

[![lint](https://github.com/gleich/mattglei.ch/actions/workflows/lint.yml/badge.svg)](https://github.com/gleich/mattglei.ch/actions/workflows/lint.yml)

Personal website written with [svelte](https://svelte.dev).

## Writing posts

Posts use [mdsvex](https://svelte.dev/docs/cli/mdsvex), which compiles Markdown into Svelte components.
Create `writings/<slug>/index.md` at the repository root to publish a post at `/writing/<slug>`.
Keep post-specific components and optional server loaders in the same folder. No route files are needed.
The writing index discovers posts automatically and sorts them newest first using their frontmatter.
Every post needs these metadata fields; quote the date and use `YYYY-MM-DD`:

```md
---
title: 'My post'
publishedDate: '2026-09-06'
description: 'A short summary for the writing index and search engines.'
keywords:
  - Programming
  - Svelte
readTime: 5
---

## A heading

Write paragraphs with **bold text**, _emphasis_, [links](https://svelte.dev), lists, and code blocks.

![An image description](/writings/my-post/photo.webp)
```

`readTime` is the estimated reading time in minutes. The shared writing layout renders the title,
date, reading time, and page metadata from frontmatter.

Place images in `static/writings/<slug>/` and reference them with `/writings/<slug>/filename`.
For images under `src`, import the file in a `<script>` and use `<img src={photo} alt="..." />`.
Custom Svelte components work directly in Markdown, including the existing `Image` component:

```md
<script>
	import { Image } from '@gleich/ui';
	import WritingSection from '$lib/writing/writing-section.svelte';
	import MyWidget from './my-widget.svelte';
</script>

<MyWidget />

<Image src="/writings/my-post/photo.webp" alt="An image description" width={1200} height={800} />

<WritingSection title="A section in a card">

Markdown works inside components too. Leave blank lines around the Markdown content.

</WritingSection>
```

Keep the script after frontmatter. Use Svelte 5 runes such as `$state()` and `$props()` as needed.
For posts that need server data, optionally add `writings/<slug>/index.server.ts` exporting a
SvelteKit `ServerLoad` function named `load`. The shared route calls it only for that post.
Access loader data with `const { data } = $props()` and pass it to components, as the
[lcp post](writings/lcp/index.md) does with its live cache overview. Ordinary posts only need
the Markdown file.
