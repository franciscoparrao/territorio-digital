import { error } from '@sveltejs/kit';
import type { BlogPost } from '$lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// The .md frontmatter is the single source of truth for post metadata;
	// the same dynamic import provides both content and metadata, so no
	// client-side registry of all posts is needed.
	try {
		const module = await import(`./posts/${params.slug}.md`);

		const post: BlogPost = {
			slug: params.slug,
			...(module.metadata as Omit<BlogPost, 'slug'>)
		};

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
