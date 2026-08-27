// Generador mínimo de GeoTIFF float32, little-endian, una banda, una sola tira.
// Solo escribe lo que SurtGIS necesita leer; en particular ModelPixelScale,
// que se entrega en METROS para que los cálculos de pendiente sean correctos.
export function escribirGeoTIFF(datos, ancho, alto, escalaX, escalaY, origenX = 0, origenY = 0) {
	const ENTRADAS = [
		[256, 4, 1, ancho],          // ImageWidth
		[257, 4, 1, alto],           // ImageLength
		[258, 3, 1, 32],             // BitsPerSample
		[259, 3, 1, 1],              // Compression: ninguna
		[262, 3, 1, 1],              // PhotometricInterpretation: BlackIsZero
		[273, 4, 1, null],           // StripOffsets      (se calcula)
		[277, 3, 1, 1],              // SamplesPerPixel
		[278, 4, 1, alto],           // RowsPerStrip
		[279, 4, 1, ancho * alto * 4], // StripByteCounts
		[284, 3, 1, 1],              // PlanarConfiguration
		[339, 3, 1, 3],              // SampleFormat: 3 = punto flotante IEEE
		[33550, 12, 3, null],        // ModelPixelScale   (fuera de línea)
		[33922, 12, 6, null]         // ModelTiepoint     (fuera de línea)
	];

	const nEntradas = ENTRADAS.length;
	const inicioIFD = 8;
	const finIFD = inicioIFD + 2 + nEntradas * 12 + 4;
	const offEscala = finIFD;              // 3 doubles = 24 bytes
	const offTiepoint = offEscala + 24;    // 6 doubles = 48 bytes
	// Los datos deben quedar alineados a 4 bytes para poder mapearlos como Float32Array.
	const offDatos = Math.ceil((offTiepoint + 48) / 4) * 4;
	const total = offDatos + ancho * alto * 4;

	const buf = new ArrayBuffer(total);
	const dv = new DataView(buf);
	const LE = true;

	dv.setUint16(0, 0x4949, LE);   // "II"
	dv.setUint16(2, 42, LE);
	dv.setUint32(4, inicioIFD, LE);

	dv.setUint16(inicioIFD, nEntradas, LE);
	ENTRADAS.forEach(([tag, tipo, cuenta, valor], i) => {
		const p = inicioIFD + 2 + i * 12;
		dv.setUint16(p, tag, LE);
		dv.setUint16(p + 2, tipo, LE);
		dv.setUint32(p + 4, cuenta, LE);
		if (tag === 273) dv.setUint32(p + 8, offDatos, LE);
		else if (tag === 33550) dv.setUint32(p + 8, offEscala, LE);
		else if (tag === 33922) dv.setUint32(p + 8, offTiepoint, LE);
		else if (tipo === 3) dv.setUint16(p + 8, valor, LE);  // SHORT va justificado a la izquierda
		else dv.setUint32(p + 8, valor, LE);
	});
	dv.setUint32(inicioIFD + 2 + nEntradas * 12, 0, LE); // no hay más IFD

	dv.setFloat64(offEscala, escalaX, LE);
	dv.setFloat64(offEscala + 8, escalaY, LE);
	dv.setFloat64(offEscala + 16, 0, LE);

	for (let i = 0; i < 6; i++) dv.setFloat64(offTiepoint + i * 8, 0, LE);
	dv.setFloat64(offTiepoint + 24, origenX, LE);
	dv.setFloat64(offTiepoint + 32, origenY, LE);

	const salida = new Float32Array(buf, offDatos, ancho * alto);
	salida.set(datos);
	return new Uint8Array(buf);
}
