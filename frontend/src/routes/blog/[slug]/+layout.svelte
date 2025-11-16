<script lang="ts">
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<article class="prose prose-lg prose-secondary mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	{@render children()}
</article>

<style>
	:global(.prose) {
		color: theme('colors.secondary.900');
		max-width: 65ch;
	}

	:global(.prose h1) {
		color: theme('colors.secondary.900');
		font-weight: 800;
		font-size: 2.5rem;
		margin-top: 0;
		margin-bottom: 2rem;
		line-height: 1.2;
	}

	:global(.prose h2) {
		color: theme('colors.secondary.900');
		font-weight: 700;
		font-size: 2rem;
		margin-top: 3rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid theme('colors.secondary.200');
	}

	:global(.prose h3) {
		color: theme('colors.secondary.900');
		font-weight: 600;
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose p) {
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
		line-height: 1.75;
	}

	:global(.prose a) {
		color: theme('colors.primary.600');
		text-decoration: none;
		font-weight: 500;
	}

	:global(.prose a:hover) {
		color: theme('colors.primary.700');
		text-decoration: underline;
	}

	:global(.prose code) {
		color: theme('colors.primary.700');
		background-color: theme('colors.secondary.100');
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: 'JetBrains Mono', monospace;
	}

	:global(.prose pre) {
		background-color: theme('colors.secondary.900');
		color: theme('colors.secondary.100');
		padding: 1.5rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	:global(.prose pre code) {
		background-color: transparent;
		color: inherit;
		padding: 0;
		font-size: 0.875rem;
		line-height: 1.7;
	}

	:global(.prose ul) {
		list-style-type: disc;
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
		padding-left: 1.625rem;
	}

	:global(.prose ol) {
		list-style-type: decimal;
		margin-top: 1.25rem;
		margin-bottom: 1.25rem;
		padding-left: 1.625rem;
	}

	:global(.prose li) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose blockquote) {
		border-left: 4px solid theme('colors.primary.600');
		padding-left: 1.5rem;
		font-style: italic;
		color: theme('colors.secondary.700');
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	:global(.prose hr) {
		border-color: theme('colors.secondary.300');
		margin-top: 3rem;
		margin-bottom: 3rem;
	}

	:global(.prose table) {
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 2rem;
		border-collapse: collapse;
	}

	:global(.prose th) {
		background-color: theme('colors.secondary.100');
		padding: 0.75rem;
		text-align: left;
		font-weight: 600;
		border: 1px solid theme('colors.secondary.300');
	}

	:global(.prose td) {
		padding: 0.75rem;
		border: 1px solid theme('colors.secondary.300');
	}

	/* Syntax highlighting adjustments */
	:global(.prose .shiki) {
		background-color: theme('colors.secondary.900') !important;
		padding: 1.5rem;
		border-radius: 0.5rem;
		overflow-x: auto;
	}
</style>
