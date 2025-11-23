export const prerender = true;

export async function GET() {
	const baseUrl = 'https://territorio-digital.cl';

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/about', priority: '0.9', changefreq: 'monthly' },
		{ url: '/servicios', priority: '0.9', changefreq: 'monthly' },
		{ url: '/servicios/desarrollo-web', priority: '0.8', changefreq: 'monthly' },
		{ url: '/servicios/data-science', priority: '0.8', changefreq: 'monthly' },
		{ url: '/servicios/analisis-satelital', priority: '0.8', changefreq: 'monthly' },
		{ url: '/servicios/ingenieria-datos', priority: '0.8', changefreq: 'monthly' },
		{ url: '/servicios/asesoria', priority: '0.8', changefreq: 'monthly' },
		{ url: '/portfolio', priority: '0.7', changefreq: 'weekly' },
		{ url: '/blog', priority: '0.7', changefreq: 'weekly' },
		{ url: '/contacto', priority: '0.9', changefreq: 'monthly' },
		{ url: '/privacidad', priority: '0.3', changefreq: 'yearly' },
		{ url: '/terminos', priority: '0.3', changefreq: 'yearly' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
