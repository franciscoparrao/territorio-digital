import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Ruta dinámica: no prerenderizar (el layout raíz activa prerender globalmente).
export const prerender = false;

const BUCKET = 'https://copernicus-dem-30m.s3.amazonaws.com';

// Solo se aceptan nombres de tile del DEM Copernicus GLO-30.
// El host es fijo y el path se construye acá, de modo que el cliente
// nunca puede inducir una petición a otro destino.
const TILE = /^Copernicus_DSM_COG_10_[NS]\d{2}_00_[EW]\d{3}_00_DEM$/;

// Tope por petición: geotiff.js lee cabeceras y bloques pequeños.
// Un tile completo pesa ~46 MB; cortamos muy por debajo para evitar abuso.
const MAX_RANGE = 12 * 1024 * 1024;

function rangePedido(header: string | null): string | null {
	if (!header) return null;
	const m = /^bytes=(\d+)-(\d*)$/.exec(header.trim());
	if (!m) return null;
	const inicio = Number(m[1]);
	const fin = m[2] === '' ? inicio + MAX_RANGE - 1 : Number(m[2]);
	if (!Number.isFinite(inicio) || !Number.isFinite(fin) || fin < inicio) return null;
	return `bytes=${inicio}-${Math.min(fin, inicio + MAX_RANGE - 1)}`;
}

async function reenviar(tile: string, rangeHeader: string | null, soloCabeceras: boolean) {
	if (!TILE.test(tile)) throw error(400, 'Identificador de tile no válido');

	const rango = rangePedido(rangeHeader);
	if (rangeHeader && !rango) throw error(416, 'Rango solicitado no válido');

	const upstream = await fetch(`${BUCKET}/${tile}/${tile}.tif`, {
		method: soloCabeceras ? 'HEAD' : 'GET',
		headers: rango ? { Range: rango } : {}
	});

	if (!upstream.ok && upstream.status !== 206) {
		throw error(upstream.status === 404 ? 404 : 502, 'No se pudo obtener el modelo de elevación');
	}

	const cabeceras = new Headers({
		'Content-Type': 'image/tiff',
		'Accept-Ranges': 'bytes',
		// El DEM Copernicus es estático: se puede cachear agresivamente.
		'Cache-Control': 'public, max-age=604800, immutable'
	});
	for (const h of ['Content-Length', 'Content-Range', 'ETag']) {
		const v = upstream.headers.get(h);
		if (v) cabeceras.set(h, v);
	}

	return new Response(soloCabeceras ? null : upstream.body, {
		status: upstream.status,
		headers: cabeceras
	});
}

export const GET: RequestHandler = ({ params, request }) =>
	reenviar(params.tile, request.headers.get('range'), false);

export const HEAD: RequestHandler = ({ params, request }) =>
	reenviar(params.tile, request.headers.get('range'), true);
