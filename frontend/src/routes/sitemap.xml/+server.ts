import { posts } from '$lib/data/posts';
import { projects } from '$lib/data/projects';

export const prerender = true;

export async function GET() {
	const baseUrl = 'https://territorio-digital.cl';
	const buildDate = new Date().toISOString();

	const latestPostDate = posts.reduce(
		(latest, p) => (p.date > latest ? p.date : latest),
		'2025-11-08'
	);

	const staticPages = [
		{ url: '', lastmod: buildDate },
		{ url: '/about', lastmod: buildDate },
		{ url: '/servicios', lastmod: buildDate },
		{ url: '/servicios/desarrollo-web', lastmod: buildDate },
		{ url: '/servicios/data-science', lastmod: buildDate },
		{ url: '/servicios/analisis-satelital', lastmod: buildDate },
		{ url: '/servicios/ingenieria-datos', lastmod: buildDate },
		{ url: '/servicios/asesoria', lastmod: buildDate },
		{ url: '/publicaciones', lastmod: buildDate },
		{ url: '/portfolio', lastmod: buildDate },
		{ url: '/blog', lastmod: latestPostDate },
		{ url: '/contacto', lastmod: buildDate },
		{ url: '/privacidad', lastmod: '2025-11-22' },
		{ url: '/terminos', lastmod: '2025-11-22' }
	];

	const postPages = posts.map((p) => ({
		url: `/blog/${p.slug}`,
		lastmod: p.date
	}));

	const projectPages = projects.map((p) => ({
		url: `/portfolio/${p.id}`,
		lastmod: buildDate
	}));

	const pages = [...staticPages, ...postPages, ...projectPages];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
