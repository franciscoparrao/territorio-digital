<script lang="ts">
	import { Button, Section } from '$lib/components';
</script>

<svelte:head>
	<title>Asesoría Técnica - Servicios | Territorio Digital</title>
	<meta
		name="description"
		content="Consultoría en arquitectura de software, code review, optimización y mejores prácticas de desarrollo."
	/>
</svelte:head>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Asesoría Técnica
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Consultoría especializada para mejorar la calidad, escalabilidad y mantenibilidad de tus
			proyectos tecnológicos.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Solicitar consulta</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Áreas de Asesoría</h2>
		<div class="mt-6 space-y-4 text-secondary-600">
			<p>
				<strong>Revisión de Arquitectura:</strong> Análisis de diseño actual y recomendaciones para escalabilidad.
			</p>
			<p>
				<strong>Code Review:</strong> Evaluación de calidad de código, identificación de code smells
				y refactoring.
			</p>
			<p>
				<strong>Performance Optimization:</strong> Identificación de cuellos de botella y optimización
				de sistemas.
			</p>
			<p>
				<strong>Tech Stack Selection:</strong> Ayuda en la selección de tecnologías apropiadas para tu
				proyecto.
			</p>
			<p>
				<strong>Mentoría Técnica:</strong> Capacitación de equipos en mejores prácticas y nuevas tecnologías.
			</p>
		</div>

		<div class="mt-12">
			<h3 class="text-xl font-semibold text-secondary-900">Enfoque</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Arquitectura', 'DevOps', 'CI/CD', 'Testing', 'Security', 'Performance', 'Scalability', 'Best Practices'] as area (area)}
					<span class="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
						{area}
					</span>
				{/each}
			</div>
		</div>

		<div class="mt-12 flex gap-4">
			<Button variant="primary" href="/contacto">Solicitar consulta</Button>
			<Button variant="secondary" href="/servicios">Volver a servicios</Button>
		</div>
	</div>
</Section>
