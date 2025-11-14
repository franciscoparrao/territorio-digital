<script lang="ts">
	import { Button, Card, Section, SEO, StructuredData } from '$lib/components';
</script>

<SEO
	title="Territorio Digital"
	description="Especialistas en desarrollo web, data science, machine learning y análisis satelital. Transformamos datos en decisiones inteligentes."
	url="https://territoriodigital.cl"
	type="website"
/>

<StructuredData
	type="organization"
	organization={{
		name: 'Territorio Digital',
		description:
			'Equipo multidisciplinario especializado en desarrollo web, data science, machine learning y análisis satelital',
		url: 'https://territoriodigital.cl',
		logo: 'https://territoriodigital.cl/logo.png',
		email: 'francisco.parra.o@usach.cl',
		telephone: '+56956826682',
		address: {
			streetAddress: '',
			addressLocality: 'Santiago',
			addressRegion: 'Región Metropolitana',
			addressCountry: 'CL'
		},
		sameAs: ['https://www.linkedin.com/in/franciscojoseparraortiz']
	}}
/>

<!-- Hero Section -->
<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-4xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl lg:text-6xl">
			Transformamos datos en <span class="text-primary-600">decisiones inteligentes</span>
		</h1>
		<p class="mt-6 text-lg leading-8 text-secondary-600 sm:text-xl">
			Especialistas en desarrollo web, data science, machine learning y análisis satelital.
			Soluciones tecnológicas que impulsan tu negocio.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="primary" size="lg" href="/contacto">Comenzar proyecto</Button>
			<Button variant="secondary" size="lg" href="/portfolio">Ver portfolio</Button>
		</div>
	</div>
</Section>

<!-- Services Overview -->
<Section background="white" padding="lg">
	<div class="mb-12 text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">Servicios</h2>
		<p class="mt-4 text-lg text-secondary-600">
			Soluciones tecnológicas adaptadas a tus necesidades
		</p>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		<Card variant="elevated" hover={true}>
			<div class="text-primary-600">
				<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
					/>
				</svg>
			</div>
			<h3 class="mt-4 text-xl font-semibold text-secondary-900">Desarrollo Web</h3>
			<p class="mt-2 text-secondary-600">
				Aplicaciones web modernas, escalables y de alto rendimiento con las últimas tecnologías.
			</p>
			<div class="mt-4">
				<a href="/servicios/desarrollo-web" class="text-primary-600 hover:text-primary-700">
					Saber más →
				</a>
			</div>
		</Card>

		<Card variant="elevated" hover={true}>
			<div class="text-primary-600">
				<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			</div>
			<h3 class="mt-4 text-xl font-semibold text-secondary-900">Data Science & ML</h3>
			<p class="mt-2 text-secondary-600">
				Análisis de datos avanzado y modelos predictivos que generan valor para tu empresa.
			</p>
			<div class="mt-4">
				<a href="/servicios/data-science" class="text-primary-600 hover:text-primary-700">
					Saber más →
				</a>
			</div>
		</Card>

		<Card variant="elevated" hover={true}>
			<div class="text-primary-600">
				<svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<h3 class="mt-4 text-xl font-semibold text-secondary-900">Análisis Satelital</h3>
			<p class="mt-2 text-secondary-600">
				Procesamiento de imágenes satelitales y análisis geoespacial para toma de decisiones.
			</p>
			<div class="mt-4">
				<a href="/servicios/analisis-satelital" class="text-primary-600 hover:text-primary-700">
					Saber más →
				</a>
			</div>
		</Card>
	</div>

	<div class="mt-12 text-center">
		<Button variant="outline" href="/servicios">Ver todos los servicios</Button>
	</div>
</Section>

<!-- CTA Section -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">
			¿Listo para transformar tu negocio?
		</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Contactar ahora</Button>
		</div>
	</div>
</Section>
