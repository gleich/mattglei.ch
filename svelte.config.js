import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			smartypants: false
		}),
		{
			name: 'mdsvex-module-syntax',
			markup({ content, filename }) {
				if (!filename?.endsWith('.md')) return;
				return {
					code: content.replace(/^<script context="module">/, '<script module>')
				};
			}
		},
		vitePreprocess()
	],

	kit: {
		typescript: {
			config(config) {
				config.include.push('../writings/**/*.ts', '../writings/**/*.svelte');
			}
		},
		alias: {
			$writings: './writings'
		},
		adapter: adapter()
	}
};

export default config;
