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

export const posts: BlogPost[] = [
	{
		slug: 'chatbot-ia-go-react',
		title: 'Cómo construir un chatbot con IA usando Go y React',
		excerpt:
			'Guía completa para crear un chatbot inteligente con sistema RAG, OpenRouter API y más de 1,700 FAQs. Aprende a implementar búsqueda semántica con stemming en español.',
		author: 'Francisco Parra',
		date: '2024-11-15',
		readingTime: 15,
		category: 'tutoriales',
		tags: ['Go', 'React', 'IA', 'Chatbot', 'RAG', 'OpenRouter'],
		featured: true
	},
	{
		slug: 'google-earth-engine-chile',
		title: 'Google Earth Engine para análisis ambiental en Chile',
		excerpt:
			'Descubre cómo usar Google Earth Engine para monitorear glaciares, sequía e incendios en Chile. Casos prácticos con scripts y datos reales.',
		author: 'Francisco Parra',
		date: '2024-11-14',
		readingTime: 12,
		category: 'tutoriales',
		tags: ['GEE', 'Teledetección', 'Chile', 'Medio Ambiente', 'Python'],
		featured: true
	},
	{
		slug: 'svelte-5-runes',
		title: 'Svelte 5 Runes: La nueva forma de manejar estado',
		excerpt:
			'Explora las nuevas Runes de Svelte 5 ($state, $derived, $effect) y aprende cómo simplifican el manejo de estado reactivo en tus aplicaciones.',
		author: 'Francisco Parra',
		date: '2024-11-13',
		readingTime: 10,
		category: 'desarrollo-web',
		tags: ['Svelte', 'SvelteKit', 'JavaScript', 'Frontend', 'Runes'],
		featured: true
	}
];

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

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
	return posts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
	return posts.filter((post) => post.featured);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
	return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}
