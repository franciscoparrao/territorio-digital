// Acceso a imágenes Sentinel-2 desde el navegador.
//
// El catálogo STAC de Earth Search y el bucket sentinel-cogs de AWS entregan
// cabeceras CORS abiertas y aceptan peticiones de rango, así que los COG se
// leen directamente sin proxy — a diferencia del DEM Copernicus.

const STAC = 'https://earth-search.aws.element84.com/v1/search';

// Nombres de banda del estándar Awesome Spectral Indices → assets de Earth Search.
// Ojo: en el estándar "S2" es la banda SWIR-2, no el satélite Sentinel-2.
export const BANDA_A_ASSET = {
	A: 'coastal', B: 'blue', G: 'green', R: 'red',
	RE1: 'rededge1', RE2: 'rededge2', RE3: 'rededge3',
	N: 'nir', N2: 'nir08', S1: 'swir16', S2: 'swir22', WV: 'nir09'
};

export async function buscarEscenas(bounds, maxNubes = 30, limite = 8) {
	const cuerpo = {
		collections: ['sentinel-2-l2a'],
		bbox: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
		query: { 'eo:cloud_cover': { lt: maxNubes } },
		sortby: [{ field: 'properties.datetime', direction: 'desc' }],
		limit: limite
	};
	const r = await fetch(STAC, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(cuerpo)
	});
	if (!r.ok) throw new Error('El catálogo satelital no respondió');
	const d = await r.json();
	return (d.features || []).map(f => ({
		id: f.id,
		fecha: (f.properties.datetime || '').slice(0, 10),
		nubes: f.properties['eo:cloud_cover'] ?? null,
		epsg: f.properties['proj:epsg'],
		assets: f.assets
	}));
}

// proj4 solo trae WGS84 y Web Mercator predefinidos. Las zonas UTM se derivan
// del propio código EPSG: 326xx es zona xx norte y 327xx es zona xx sur.
function definirProyeccion(epsg) {
	const clave = `EPSG:${epsg}`;
	if (proj4.defs(clave)) return clave;
	const zona = epsg % 100;
	const franja = Math.floor(epsg / 100);
	if (franja !== 326 && franja !== 327) throw new Error(`Proyección no soportada: ${clave}`);
	proj4.defs(clave, `+proj=utm +zone=${zona}${franja === 327 ? ' +south' : ''} +datum=WGS84 +units=m +no_defs`);
	return clave;
}

// Lee las bandas pedidas recortadas al área, todas remuestreadas al mismo
// tamaño. Es indispensable: las bandas de Sentinel-2 tienen resoluciones
// nativas distintas (10, 20 y 60 m) y el evaluador exige dimensiones iguales.
export async function leerBandas(escena, bounds, nombresEstandar, ladoMax = 420) {
	if (typeof proj4 === 'undefined') throw new Error('Falta proj4 para convertir coordenadas');
	const aUTM = proj4('EPSG:4326', definirProyeccion(escena.epsg));

	// Las cuatro esquinas, porque el rectángulo geográfico no es rectángulo en UTM.
	const esquinas = [
		[bounds.getWest(), bounds.getSouth()], [bounds.getEast(), bounds.getSouth()],
		[bounds.getWest(), bounds.getNorth()], [bounds.getEast(), bounds.getNorth()]
	].map(c => aUTM.forward(c));
	const xs = esquinas.map(c => c[0]), ys = esquinas.map(c => c[1]);
	const utm = { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };

	// Tamaño de salida: se apunta a 10 m por píxel y se limita el lado mayor.
	const relacion = (utm.maxX - utm.minX) / (utm.maxY - utm.minY);
	let ancho = Math.round(Math.min(ladoMax, (utm.maxX - utm.minX) / 10));
	let alto = Math.round(ancho / relacion);
	if (alto > ladoMax) { alto = ladoMax; ancho = Math.round(alto * relacion); }
	ancho = Math.max(16, ancho); alto = Math.max(16, alto);

	const bandas = {};
	for (const nombre of nombresEstandar) {
		const asset = BANDA_A_ASSET[nombre];
		const href = asset && escena.assets[asset]?.href;
		if (!href) throw new Error(`La escena no trae la banda ${nombre}`);

		const img = await (await GeoTIFF.fromUrl(href)).getImage();
		const bb = img.getBoundingBox();          // en la proyección de la escena
		const W = img.getWidth(), H = img.getHeight();
		const aPixX = x => ((x - bb[0]) / (bb[2] - bb[0])) * W;
		const aPixY = y => ((bb[3] - y) / (bb[3] - bb[1])) * H;

		const v = [
			Math.floor(aPixX(utm.minX)), Math.floor(aPixY(utm.maxY)),
			Math.ceil(aPixX(utm.maxX)), Math.ceil(aPixY(utm.minY))
		];
		const ventana = [
			Math.max(0, Math.min(W - 1, v[0])), Math.max(0, Math.min(H - 1, v[1])),
			Math.max(1, Math.min(W, v[2])), Math.max(1, Math.min(H, v[3]))
		];
		if (ventana[2] - ventana[0] < 2 || ventana[3] - ventana[1] < 2) {
			throw new Error('El área queda fuera de la escena satelital');
		}

		const [datos] = await img.readRasters({ window: ventana, width: ancho, height: alto, resampleMethod: 'bilinear' });

		// Sentinel-2 L2A viene en enteros escalados por 10.000. Los índices
		// asumen reflectancia entre 0 y 1, así que se normaliza acá.
		const f = new Float32Array(datos.length);
		for (let i = 0; i < datos.length; i++) {
			const x = datos[i];
			f[i] = (x === 0 || x == null) ? NaN : x / 10000;
		}
		bandas[nombre] = f;
	}
	return { bandas, ancho, alto, utm };
}
