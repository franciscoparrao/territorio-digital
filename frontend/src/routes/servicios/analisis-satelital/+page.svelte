<script lang="ts">
	import { Button, Section, SEO, BreadcrumbSchema } from '$lib/components';

	const faqs = [
		{
			question: '¿Qué tipo de imágenes satelitales usan?',
			answer:
				'Trabajamos con imágenes multiespectrales e hiperespectrales de múltiples fuentes: Sentinel-2 (resolución 10 m, gratuito, actualización cada 5 días), Landsat 8/9 (30 m, gratuito), Planet (3-5 m, suscripción), y datos LiDAR para análisis de terreno en alta resolución. Para proyectos de riesgo volcánico, incendios o cuencas hidrográficas en Chile, combinamos fuentes según el nivel de detalle requerido.'
		},
		{
			question: '¿Pueden monitorear glaciares, incendios forestales o recursos hídricos?',
			answer:
				'Sí. Son algunos de los casos de uso más frecuentes en Chile. Para glaciares: análisis multitemporal de área y volumen con Sentinel-2 y DEM de alta resolución. Para incendios: cartografía de área quemada (NBR, dNBR), mapas de severidad y análisis de regeneración post-incendio. Para recursos hídricos: índices de agua (NDWI, MNDWI), detección de cuerpos de agua y análisis de cuencas con hidrología automatizada. Todo bajo metodologías reproducibles y con rigor metodológico publicado.'
		},
		{
			question: '¿Con qué resolución espacial trabajan?',
			answer:
				'Desde 10 metros (Sentinel-2, estándar para la mayoría de proyectos ambientales) hasta 1 metro o menos (imágenes comerciales Planet o fusión pancromática). Para análisis de terreno, SurtGIS — nuestra plataforma GIS propia — procesa DEMs de 5 m o 1 m disponibles en Chile (IGM, SRTM, ALOS AW3D). La resolución óptima depende del área de estudio y el nivel de detalle requerido en el informe final.'
		},
		{
			question: '¿Cuánto tiempo toma un proyecto de análisis satelital?',
			answer:
				'Un análisis básico de cobertura de suelo o detección de cambios sobre un área definida puede entregarse en 1 a 2 semanas. Proyectos más complejos — susceptibilidad a múltiples amenazas, modelos hidrológicos calibrados, clasificación supervisada con validación de campo — toman entre 4 y 8 semanas. Para proyectos que requieren series temporales largas (5-10 años), el procesamiento se realiza en paralelo vía Google Earth Engine.'
		},
		{
			question: '¿Necesito tener datos propios para contratar este servicio?',
			answer:
				'No es necesario. Accedemos a repositorios satelitales abiertos (Copernicus/ESA, USGS, NASA) sin costo adicional. Si el proyecto requiere imágenes de alta resolución comerciales (Planet, Maxar), gestionamos la adquisición. Para datos de terreno locales (estaciones meteorológicas, muestreos de campo), la coordinación depende del proyecto — en algunos casos el cliente aporta datos existentes, en otros los generamos dentro del alcance del proyecto.'
		},
		{
			question: '¿Qué diferencia a su análisis GIS del uso de QGIS o ArcGIS directamente?',
			answer:
				'Las herramientas estándar son excelentes para análisis unitarios, pero no para pipelines reproducibles, series temporales largas o procesamiento de grandes volúmenes. Nuestra plataforma SurtGIS (publicada en Environmental Modelling & Software, Elsevier Q1) es 8× más rápida que GDAL y 21× más rápida que GRASS GIS para operaciones de terreno. Además, entregamos flujos de trabajo automatizados en Python que permiten re-ejecutar el análisis completo con nuevos datos o sobre nuevas áreas sin intervención manual.'
		}
	];

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};

	const useCases = [
		{
			title: 'Estudios de Impacto Ambiental',
			description: 'Cartografía de línea base, análisis de cobertura y monitoreo de cambios para EIAs en sectores minero, energético e inmobiliario.'
		},
		{
			title: 'Gestión de Cuencas Hidrográficas',
			description: 'Modelamiento de redes de drenaje, cálculo de TWI, delimitación de cuencas y análisis de vulnerabilidad hídrica.'
		},
		{
			title: 'Monitoreo de Incendios Forestales',
			description: 'Cartografía de área quemada, índices de severidad (dNBR), análisis de combustibles y mapas de riesgo para CONAF y municipios.'
		},
		{
			title: 'Riesgo Volcánico y Geológico',
			description: 'Susceptibilidad a remoción en masa, lahares, flujos de lava y análisis de multi-amenaza para SERNAGEOMIN y planes de emergencia.'
		},
		{
			title: 'Agricultura de Precisión',
			description: 'Monitoreo de vigor de cultivos (NDVI, EVI), detección temprana de estrés hídrico y fitosanitario sobre áreas de miles de hectáreas.'
		},
		{
			title: 'Monitoreo de Glaciares',
			description: 'Series temporales de área, volumen y retroceso glaciar con Sentinel-2 y DEM multitemporal. Alineado con metodologías DGA/CR2.'
		}
	];
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<SEO
	title="Análisis Satelital & Geoespacial en Chile"
	description="Procesamiento de imágenes satelitales, modelamiento GIS y monitoreo ambiental para Chile. EIA, cuencas, incendios y riesgo geológico con Sentinel, Landsat y SurtGIS."
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

<Section background="gray" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Casos de Uso en Chile</h2>
		<p class="mt-2 text-secondary-600">Aplicamos análisis geoespacial a los problemas más críticos del territorio chileno.</p>
		<div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each useCases as useCase (useCase.title)}
				<div class="rounded-lg border border-secondary-200 bg-white p-5">
					<h3 class="font-semibold text-secondary-900">{useCase.title}</h3>
					<p class="mt-2 text-sm text-secondary-600">{useCase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Preguntas Frecuentes</h2>
		<div class="mt-8 divide-y divide-secondary-200">
			{#each faqs as faq (faq.question)}
				<div class="py-6">
					<h3 class="text-lg font-semibold text-secondary-900">{faq.question}</h3>
					<p class="mt-3 text-secondary-600">{faq.answer}</p>
				</div>
			{/each}
		</div>
		<div class="mt-10">
			<Button variant="primary" href="/contacto">Consultar por un proyecto</Button>
		</div>
	</div>
</Section>
