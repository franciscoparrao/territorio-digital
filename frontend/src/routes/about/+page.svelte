<script lang="ts">
	import { Button, Card, Section } from '$lib/components';

	const skills = [
		{
			category: 'Desarrollo Web',
			items: ['SvelteKit', 'React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Rust']
		},
		{
			category: 'Data Science & ML',
			items: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy']
		},
		{
			category: 'Análisis Geoespacial',
			items: ['GDAL', 'Rasterio', 'GeoPandas', 'QGIS', 'Earth Engine', 'Sentinel']
		},
		{
			category: 'Ingeniería de Datos',
			items: ['Airflow', 'dbt', 'PostgreSQL', 'MongoDB', 'Kafka', 'Docker']
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

<svelte:head>
	<title>Sobre Nosotros - Territorio Digital</title>
	<meta
		name="description"
		content="Equipo de especialistas en desarrollo web, data science y análisis satelital. Transformamos datos en decisiones inteligentes."
	/>
</svelte:head>

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
					Un equipo de profesionales especializados en desarrollo web moderno, ciencia de datos y
					análisis geoespacial. Ayudamos a empresas y organizaciones a transformar sus datos en
					decisiones estratégicas mediante tecnología de vanguardia.
				</p>
				<p class="mt-4 text-lg text-secondary-600">
					Con experiencia en proyectos que van desde aplicaciones web escalables hasta análisis
					satelital para monitoreo ambiental, combinamos habilidades técnicas profundas con enfoque
					en resultados de negocio concretos.
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
							<div class="text-3xl font-bold text-primary-600">5+</div>
							<div class="text-sm text-secondary-600">Años de experiencia</div>
						</div>
						<div>
							<div class="text-3xl font-bold text-primary-600">20+</div>
							<div class="text-sm text-secondary-600">Proyectos completados</div>
						</div>
						<div>
							<div class="text-3xl font-bold text-primary-600">100%</div>
							<div class="text-sm text-secondary-600">Clientes satisfechos</div>
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
				Nuestro camino en tecnología comenzó con la curiosidad por entender cómo funcionan las cosas
				y cómo la programación puede resolver problemas reales. Esta curiosidad nos llevó a
				especializarnos en áreas donde los datos y el desarrollo de software se encuentran.
			</p>
			<p>
				Hemos trabajado en proyectos que van desde aplicaciones web para startups hasta sistemas de
				análisis de imágenes satelitales para monitoreo ambiental. Cada proyecto nos ha enseñado
				algo nuevo y nos ha permitido desarrollar un enfoque integral para resolver problemas
				complejos.
			</p>
			<p>
				Hoy, combinamos experiencia en desarrollo web full-stack, ciencia de datos y análisis
				geoespacial para ofrecer soluciones completas que generan valor real para nuestros clientes.
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
				Nuestro equipo está liderado por Francisco Parra, ingeniero de software con más de 5 años de
				experiencia en proyectos de desarrollo web, data science y análisis satelital, trabajando
				con empresas y organizaciones en soluciones tecnológicas innovadoras.
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
