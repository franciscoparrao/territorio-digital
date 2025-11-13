<script lang="ts">
	import { Button, Card, Section } from '$lib/components';

	const services = [
		{
			id: 'desarrollo-web',
			title: 'Desarrollo Web',
			description:
				'Aplicaciones web modernas, escalables y de alto rendimiento construidas con tecnologías de vanguardia.',
			icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
			features: [
				'Single Page Applications (SPA)',
				'Progressive Web Apps (PWA)',
				'API REST y GraphQL',
				'Arquitecturas escalables',
				'Performance optimization',
				'SEO y accesibilidad'
			],
			technologies: ['SvelteKit', 'React', 'TypeScript', 'TailwindCSS', 'Node.js'],
			link: '/servicios/desarrollo-web'
		},
		{
			id: 'data-science',
			title: 'Data Science & Machine Learning',
			description:
				'Análisis de datos avanzado y modelos predictivos que transforman información en decisiones estratégicas.',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			features: [
				'Análisis exploratorio de datos',
				'Modelos predictivos y clasificación',
				'Machine Learning y Deep Learning',
				'Visualización de datos',
				'A/B Testing y experimentación',
				'MLOps y deployment de modelos'
			],
			technologies: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas'],
			link: '/servicios/data-science'
		},
		{
			id: 'analisis-satelital',
			title: 'Análisis Satelital & Geoespacial',
			description:
				'Procesamiento de imágenes satelitales y análisis geoespacial para monitoreo ambiental y toma de decisiones.',
			icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			features: [
				'Procesamiento de imágenes satelitales',
				'Detección de cambios temporales',
				'Clasificación de cobertura terrestre',
				'Análisis multiespectrales',
				'Sistemas de Información Geográfica (GIS)',
				'Monitoreo ambiental'
			],
			technologies: ['Python', 'GDAL', 'Rasterio', 'GeoPandas', 'QGIS'],
			link: '/servicios/analisis-satelital'
		},
		{
			id: 'ingenieria-datos',
			title: 'Ingeniería de Datos',
			description:
				'Diseño e implementación de pipelines de datos robustos y arquitecturas modernas de almacenamiento.',
			icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
			features: [
				'Data pipelines ETL/ELT',
				'Data warehousing',
				'Stream processing en tiempo real',
				'Orquestación de workflows',
				'Data quality y governance',
				'Migración de datos'
			],
			technologies: ['Apache Airflow', 'dbt', 'PostgreSQL', 'MongoDB', 'Kafka'],
			link: '/servicios/ingenieria-datos'
		},
		{
			id: 'asesoria',
			title: 'Asesoría Técnica',
			description:
				'Consultoría especializada en arquitectura de software, optimización y mejores prácticas de desarrollo.',
			icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
			features: [
				'Revisión de arquitectura',
				'Code review y refactoring',
				'Optimización de performance',
				'Mejores prácticas y estándares',
				'Tech stack selection',
				'Mentoría técnica'
			],
			technologies: ['Arquitectura', 'DevOps', 'CI/CD', 'Testing', 'Security'],
			link: '/servicios/asesoria'
		}
	];
</script>

<svelte:head>
	<title>Servicios - Territorio Digital</title>
	<meta
		name="description"
		content="Desarrollo web, data science, análisis satelital, ingeniería de datos y asesoría técnica. Soluciones tecnológicas integrales para tu negocio."
	/>
</svelte:head>

<!-- Hero Section -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Servicios Tecnológicos <span class="text-primary-600">Integrales</span>
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Soluciones personalizadas que combinan desarrollo web moderno, ciencia de datos avanzada y
			tecnologías geoespaciales para impulsar tu negocio.
		</p>
	</div>
</Section>

<!-- Services Grid -->
<Section background="white" padding="lg">
	<div class="space-y-16">
		{#each services as service, index (service.id)}
			<Card variant="bordered" padding="lg" class="overflow-hidden">
				<div
					class="grid gap-8 lg:grid-cols-2 lg:gap-12 {index % 2 === 1 ? 'lg:grid-flow-dense' : ''}"
				>
					<!-- Content -->
					<div class={index % 2 === 1 ? 'lg:col-start-2' : ''}>
						<div class="flex items-center space-x-3">
							<div class="rounded-lg bg-primary-100 p-3 text-primary-600">
								<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d={service.icon}
									/>
								</svg>
							</div>
							<h2 class="text-2xl font-bold text-secondary-900 sm:text-3xl">
								{service.title}
							</h2>
						</div>

						<p class="mt-4 text-lg text-secondary-600">
							{service.description}
						</p>

						<div class="mt-6">
							<h3 class="text-sm font-semibold uppercase tracking-wide text-secondary-900">
								Características
							</h3>
							<ul class="mt-3 space-y-2">
								{#each service.features as feature (feature)}
									<li class="flex items-start">
										<svg
											class="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span class="ml-3 text-secondary-600">{feature}</span>
									</li>
								{/each}
							</ul>
						</div>

						<div class="mt-8">
							<Button variant="primary" href={service.link}>
								Saber más sobre {service.title}
							</Button>
						</div>
					</div>

					<!-- Technologies -->
					<div class={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
						<div class="rounded-lg bg-secondary-50 p-8">
							<h3 class="text-lg font-semibold text-secondary-900">Tecnologías principales</h3>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each service.technologies as tech (tech)}
									<span
										class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-secondary-700 ring-1 ring-inset ring-secondary-200"
									>
										{tech}
									</span>
								{/each}
							</div>

							<div class="mt-8">
								<h3 class="text-lg font-semibold text-secondary-900">
									¿Por qué elegir este servicio?
								</h3>
								<ul class="mt-4 space-y-3 text-sm text-secondary-600">
									<li class="flex items-start">
										<svg
											class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="ml-2">Experiencia comprobada en proyectos reales</span>
									</li>
									<li class="flex items-start">
										<svg
											class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="ml-2">Mejores prácticas y código de calidad</span>
									</li>
									<li class="flex items-start">
										<svg
											class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clip-rule="evenodd"
											/>
										</svg>
										<span class="ml-2">Soluciones escalables y mantenibles</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</Section>

<!-- CTA Section -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">
			¿Necesitas ayuda con tu proyecto?
		</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Conversemos sobre tus necesidades y te ayudaré a encontrar la mejor solución tecnológica.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="primary" size="lg" href="/contacto">Solicitar consulta</Button>
			<Button variant="secondary" size="lg" href="/portfolio">Ver casos de éxito</Button>
		</div>
	</div>
</Section>
