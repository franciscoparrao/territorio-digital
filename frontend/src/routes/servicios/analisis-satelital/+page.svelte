<script lang="ts">
	import { Button, Section, SEO, BreadcrumbSchema } from '$lib/components';
</script>

<SEO
	title="Análisis Satelital & Geoespacial"
	description="Procesamiento de imágenes satelitales, análisis geoespacial y monitoreo ambiental con tecnologías GIS y Python."
	url="https://territorio-digital.cl/servicios/analisis-satelital"
	image="https://territorio-digital.cl/og-analisis-satelital.jpg"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Análisis Satelital', url: 'https://territorio-digital.cl/servicios/analisis-satelital' }
	]}
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Análisis Satelital & Geoespacial
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Procesamiento de imágenes satelitales y análisis geoespacial para monitoreo ambiental,
			agricultura de precisión y toma de decisiones basadas en datos geográficos.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Solicitar consulta</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Capacidades</h2>
		<div class="mt-6 space-y-4 text-secondary-600">
			<p>
				<strong>Procesamiento de Imágenes:</strong> Corrección atmosférica, índices de vegetación (NDVI,
				EVI) y análisis multiespectrales.
			</p>
			<p>
				<strong>Detección de Cambios:</strong> Monitoreo temporal de cambios en cobertura terrestre,
				deforestación y urbanización.
			</p>
			<p>
				<strong>Clasificación:</strong> Mapeo automático de usos de suelo y cobertura terrestre.
			</p>
			<p>
				<strong>Análisis GIS:</strong> Sistemas de información geográfica para análisis espacial complejo.
			</p>
		</div>

		<div class="mt-12">
			<h3 class="text-xl font-semibold text-secondary-900">Herramientas</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Python', 'GDAL', 'Rasterio', 'GeoPandas', 'QGIS', 'Google Earth Engine', 'Sentinel', 'Landsat'] as tech (tech)}
					<span class="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<div class="mt-12 flex gap-4">
			<Button variant="primary" href="/contacto">Iniciar proyecto</Button>
			<Button variant="secondary" href="/servicios">Volver a servicios</Button>
		</div>
	</div>
</Section>
