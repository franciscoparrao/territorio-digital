import { getPostBySlug } from '$lib/data/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const post = getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Artículo no encontrado');
	}

	// Import the markdown file dynamically
	try {
		const module = await import(`./${params.slug}.md`);

		return {
			post,
			Content: module.default,
			metadata: module.metadata
		};
	} catch (e) {
		console.error(`Error loading post ${params.slug}:`, e);
		throw error(404, 'Artículo no encontrado');
	}
};

export const prerender = 'auto';
