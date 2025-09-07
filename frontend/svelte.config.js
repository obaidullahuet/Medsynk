import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	// compilerOptions: {
	// 	runes: true //  enable Svelte 5 runes API
	// },

	kit: {
		adapter: adapter()
	}
};

export default config;
