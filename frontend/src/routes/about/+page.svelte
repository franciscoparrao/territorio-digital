<script lang="ts">
	import { Button, Card, Section, SEO, StructuredData } from '$lib/components';

	const skills = [
		{
			category: 'Desarrollo Web & Programación',
			items: [
				'Python',
				'R',
				'JavaScript',
				'TypeScript',
				'Rust',
				'Go',
				'Julia',
				'C',
				'C++',
				'Java',
				'SvelteKit',
				'React',
				'Vue.js',
				'Next.js',
				'Node.js',
				'Nest.js',
				'TailwindCSS'
			]
		},
		{
			category: 'Data Science & Machine Learning',
			items: [
				'PyTorch',
				'TensorFlow',
				'scikit-learn',
				'XGBoost',
				'CatBoost',
				'Pandas',
				'NumPy',
				'Matplotlib',
				'Xarray',
				'MLR3',
				'Tidyverse',
				'Shiny',
				'Rhino'
			]
		},
		{
			category: 'Análisis Geoespacial & GIS',
			items: [
				'QGIS',
				'ArcGIS',
				'Grass GIS',
				'Saga GIS',
				'Envi',
				'Global Mapper',
				'GDAL',
				'Rasterio',
				'GeoPandas',
				'PostGIS',
				'Terra',
				'Sf',
				'Earth Engine',
				'Sentinel',
				'Landsat',
				'ASTER'
			]
		},
		{
			category: 'Bases de Datos & DevOps',
			items: [
				'PostgreSQL',
				'MongoDB',
				'PostGIS',
				'SQL',
				'DuckDB',
				'Airflow',
				'dbt',
				'Kafka',
				'Spark',
				'Docker',
				'Kubernetes'
			]
		},
		{
			category: 'Modelamiento Geológico & Hidrológico',
			items: ['Leapfrog', 'MODFLOW', 'Flopy', 'HEC-RAS', 'Procesos Gaussianos', 'Tgpy']
		},
		{
			category: 'Deep Learning & IA Avanzada',
			items: [
				'Redes Convolucionales',
				'GANs',
				'Redes Neuronales Profundas',
				'ChatGPT',
				'Claude',
				'Claude Code',
				'Gemini',
				'Fine-tuning',
				'Prompt Engineering'
			]
		}
	];

	const values = [
		{
			title: 'Excelencia Técnica',
			description: 'Código limpio, arquitecturas sólidas y mejores prácticas en cada proyecto.'
		},
		{
			title: 'Enfoque en Resultados',
			description: 'Soluciones que generan valor real y resuelven problemas de negocio.'
		},
		{
			title: 'Aprendizaje Continuo',
			description: 'Actualización constante en las últimas tecnologías y metodologías.'
		},
		{
			title: 'Comunicación Clara',
			description: 'Transparencia y claridad en cada etapa del proyecto.'
		}
	];
</script>

<SEO
	title="Sobre Nosotros - Territorio Digital"
	description="Equipo liderado por Francisco Parra, Doctor en Ingeniería Informática con experiencia en desarrollo web full-stack, machine learning y análisis geoespacial con tecnologías satelitales."
	url="https://territorio-digital.cl/about"
	type="profile"
/>

<StructuredData
	type="person"
	person={{
		name: 'Francisco José Parra Ortiz',
		jobTitle: 'Doctor en Ciencias de la Ingeniería mención Informática',
		email: 'francisco.parra.o@usach.cl',
		telephone: '+56956826682',
		url: 'https://territoriodigital.cl',
		sameAs: ['https://www.linkedin.com/in/franciscojoseparraortiz'],
		alumniOf: [
			{
				name: 'Universidad de Santiago de Chile',
				url: 'https://www.usach.cl'
			},
			{
				name: 'Universidad de Chile',
				url: 'https://www.uchile.cl'
			}
		]
	}}
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-5xl">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Content -->
			<div>
				<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
					Somos <span class="text-primary-600">Territorio Digital</span>
				</h1>
				<p class="mt-6 text-lg text-secondary-600">
					Un equipo multidisciplinario de especialistas en desarrollo web, ciencia de datos,
					análisis geoespacial e inteligencia artificial. Transformamos datos en decisiones
					estratégicas mediante soluciones tecnológicas avanzadas y metodologías científicas
					rigurosas.
				</p>
				<p class="mt-4 text-lg text-secondary-600">
					Con experiencia en proyectos que abarcan desde aplicaciones web full-stack hasta sistemas
					de detección de desastres naturales basados en Machine Learning, análisis satelital para
					monitoreo ambiental, y modelamiento geoespacial para evaluaciones de impacto ambiental.
					Combinamos formación académica de posgrado con experiencia práctica en proyectos reales.
				</p>
				<div class="mt-8 flex gap-4">
					<Button variant="primary" href="/contacto">Trabajemos juntos</Button>
					<Button variant="secondary" href="/portfolio">Ver portfolio</Button>
				</div>
			</div>

			<!-- Image placeholder / Stats -->
			<div class="flex items-center justify-center lg:justify-end">
				<Card variant="elevated" padding="lg" class="w-full max-w-md">
					<h3 class="text-xl font-semibold text-secondary-900">En números</h3>
					<div class="mt-6 space-y-6">
						<div>
							<div class="text-3xl font-bold text-primary-600">15+</div>
							<div class="text-sm text-secondary-600">Años de experiencia combinada</div>
						</div>
						<div>
							<div class="text-3xl font-bold text-primary-600">PhD</div>
							<div class="text-sm text-secondary-600">Doctor en Informática</div>
						</div>
						<div>
							<div class="text-3xl font-bold text-primary-600">30+</div>
							<div class="text-sm text-secondary-600">Proyectos completados</div>
						</div>
						<div>
							<div class="text-3xl font-bold text-primary-600">10+</div>
							<div class="text-sm text-secondary-600">Publicaciones científicas</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</Section>

<!-- Skills -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">Habilidades Técnicas</h2>
		<p class="mt-4 text-center text-lg text-secondary-600">
			Tecnologías y herramientas con las que trabajamos regularmente
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-2">
			{#each skills as skillGroup (skillGroup.category)}
				<Card variant="bordered" padding="lg">
					<h3 class="text-xl font-semibold text-secondary-900">{skillGroup.category}</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each skillGroup.items as skill (skill)}
							<span
								class="rounded-md bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700"
							>
								{skill}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- Values -->
<Section background="gray" padding="lg">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">Valores y Enfoque</h2>
		<div class="mt-12 grid gap-8 md:grid-cols-2">
			{#each values as value (value.title)}
				<div class="flex gap-4">
					<div class="flex-shrink-0">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
							<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
					</div>
					<div>
						<h3 class="text-xl font-semibold text-secondary-900">{value.title}</h3>
						<p class="mt-2 text-secondary-600">{value.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- Background -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-3xl font-bold text-secondary-900">Nuestra Trayectoria</h2>
		<div class="mt-8 space-y-6 text-secondary-600">
			<p>
				Nuestro camino comenzó en la intersección entre las ciencias de la tierra y la informática,
				con formación en Geología y un Minor en Física Cuántica de la Universidad de Chile. Esta
				base multidisciplinaria nos permitió desarrollar una visión única para abordar problemas
				complejos que requieren tanto comprensión científica como expertise técnico.
			</p>
			<p>
				Con un Doctorado en Ciencias de la Ingeniería mención Informática y un Magíster en
				Informática, ambos de la Universidad de Santiago, enfocados en sistemas de prevención y
				detección de desastres naturales basados en inteligencia artificial, hemos consolidado
				nuestra especialización en Data Science, Machine Learning y análisis geoespacial.
			</p>
			<p>
				Hemos participado en más de 30 proyectos que abarcan desde evaluaciones de impacto ambiental
				y modelamiento de inundaciones, hasta desarrollo de sistemas web escalables y análisis de
				imágenes satelitales para concentración geoquímica. Nuestra experiencia incluye trabajo con
				proyectos FONDAP-CONICYT, FONDEF, y consultorías para empresas en sectores inmobiliario,
				minero e industrial.
			</p>
			<p>
				Hoy, combinamos rigor académico con experiencia práctica, ofreciendo soluciones que integran
				desarrollo web moderno, Machine Learning avanzado, análisis geoespacial y modelamiento
				científico para generar valor real y medible en cada proyecto.
			</p>
		</div>

		<div class="mt-12">
			<h3 class="text-2xl font-semibold text-secondary-900">¿Por qué trabajar con nosotros?</h3>
			<ul class="mt-6 space-y-3 text-secondary-600">
				<li class="flex items-start">
					<svg
						class="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="ml-3"
						><strong>Versatilidad técnica:</strong> Podemos abordar proyectos end-to-end, desde el frontend
						hasta análisis de datos complejos.</span
					>
				</li>
				<li class="flex items-start">
					<svg
						class="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="ml-3"
						><strong>Enfoque en calidad:</strong> Código limpio, testeado y documentado que es fácil
						de mantener y escalar.</span
					>
				</li>
				<li class="flex items-start">
					<svg
						class="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="ml-3"
						><strong>Comunicación efectiva:</strong> Mantenemos informados a los clientes en cada etapa
						del proyecto.</span
					>
				</li>
				<li class="flex items-start">
					<svg
						class="mt-1 h-5 w-5 flex-shrink-0 text-primary-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="ml-3"
						><strong>Orientación a resultados:</strong> Nos enfocamos en entregar soluciones que resuelven
						problemas reales de negocio.</span
					>
				</li>
			</ul>
		</div>

		<div class="mt-12 rounded-lg border border-primary-200 bg-primary-50 p-6">
			<h3 class="text-lg font-semibold text-secondary-900">Liderado por Francisco Parra</h3>
			<p class="mt-2 text-secondary-600">
				Nuestro equipo está liderado por <strong>Francisco José Parra Ortiz</strong>, Doctor en
				Ciencias de la Ingeniería mención Informática y Magíster en Informática (Universidad de
				Santiago). Geólogo titulado con Minor en Física Cuántica (Universidad de Chile),
				especializado en ciencia de datos, Machine Learning, análisis geoespacial y desarrollo de
				software.
			</p>
			<p class="mt-2 text-secondary-600">
				Con más de 15 años de experiencia combinada, Francisco ha liderado proyectos que van desde
				sistemas de detección de desastres naturales usando Deep Learning, hasta evaluaciones de
				impacto ambiental y desarrollo de aplicaciones web. Profesor de cátedra en la Universidad de
				Santiago (Innovación y Emprendimiento, Geoinformática) y autor de publicaciones científicas
				en journals internacionales. Ha participado en proyectos FONDAP-CONICYT, FONDEF IDeA, y
				consultorías especializadas en modelamiento geológico, hidrogeológico y análisis satelital.
			</p>
		</div>
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">¿Tienes un proyecto en mente?</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Nos encantaría conocer tus ideas y ayudarte a hacerlas realidad.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Hablemos de tu proyecto</Button>
		</div>
	</div>
</Section>
