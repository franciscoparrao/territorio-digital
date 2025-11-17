import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	],
	extensions: ['.svelte', '.md'],

	kit: {
		// Using adapter-node for Docker deployment
		// This generates a standalone Node.js server in the build/ directory
		adapter: adapter(),

		// Performance optimizations
		prerender: {
			// Prerender static pages for better performance
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: 'warn'
		},

		// CSP configuration for security
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline', 'fonts.googleapis.com'],
				'font-src': ['self', 'fonts.gstatic.com'],
				'img-src': ['self', 'data:', 'https:'],
				'connect-src': ['self', 'localhost:3000']
			}
		}
	}
};

export default config;
