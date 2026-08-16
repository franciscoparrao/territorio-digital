import type { BlogPost } from '$lib/data/posts';

// Single source of truth: the frontmatter of each .md file in routes/blog/[slug]/posts/.
// To publish a post, create the .md with full frontmatter — no registration needed.
// Server-only module: the eager glob pulls every compiled post into the bundle,
// which is fine on the server but must never reach the client.
// (Brackets in the glob are escaped so picomatch treats [slug] literally.)
const modules = import.meta.glob('../../routes/blog/\\[slug\\]/posts/*.md', {
	eager: true,
	import: 'metadata'
}) as Record<string, Omit<BlogPost, 'slug'>>;

export const posts: BlogPost[] = Object.entries(modules)
	.map(([path, metadata]) => ({
		slug: path.split('/').pop()!.replace(/\.md$/, ''),
		...metadata
	}))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
	return posts.filter((post) => post.featured);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
	return posts.slice(0, limit);
}
