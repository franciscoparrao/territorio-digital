// Client-safe types and static category data for the blog.
// The posts list itself is derived from markdown frontmatter in
// $lib/server/posts.ts (server-only) and reaches pages via load functions,
// so post content never lands in the client bundle.

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	date: string;
	readingTime: number; // minutes
	category: BlogCategory;
	tags: string[];
	featured: boolean;
	coverImage?: string;
}

export type BlogCategory =
	| 'tutoriales'
	| 'investigacion'
	| 'desarrollo-web'
	| 'data-science'
	| 'opinion';

export const categories: { id: BlogCategory; name: string; description: string }[] = [
	{
		id: 'tutoriales',
		name: 'Tutoriales',
		description: 'Guías paso a paso y tutoriales técnicos'
	},
	{
		id: 'investigacion',
		name: 'Investigación',
		description: 'Análisis y papers de investigación'
	},
	{
		id: 'desarrollo-web',
		name: 'Desarrollo Web',
		description: 'Frameworks, herramientas y mejores prácticas'
	},
	{
		id: 'data-science',
		name: 'Data Science',
		description: 'Machine learning, análisis de datos y visualización'
	},
	{
		id: 'opinion',
		name: 'Opinión',
		description: 'Reflexiones y análisis del ecosistema tech'
	}
];
