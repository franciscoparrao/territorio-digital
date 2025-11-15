import { projects } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Proyecto no encontrado');
	}

	return {
		project
	};
};

// Disable prerendering for dynamic project pages
export const prerender = 'auto';
