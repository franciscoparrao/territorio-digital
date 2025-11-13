<script lang="ts">
	import { Button, Section } from '$lib/components';
</script>

<svelte:head>
	<title>Ingeniería de Datos - Servicios | Territorio Digital</title>
	<meta
		name="description"
		content="Pipelines ETL, data warehousing y arquitecturas de datos escalables para tu organización."
	/>
</svelte:head>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Ingeniería de Datos
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Diseño e implementación de pipelines robustos, data warehouses y arquitecturas modernas que
			transforman datos crudos en activos estratégicos.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Solicitar consulta</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Servicios</h2>
		<div class="mt-6 space-y-4 text-secondary-600">
			<p>
				<strong>Data Pipelines:</strong> ETL/ELT automatizados con orquestación robusta y manejo de errores.
			</p>
			<p>
				<strong>Data Warehousing:</strong> Diseño de modelos dimensionales y arquitecturas para analytics.
			</p>
			<p>
				<strong>Stream Processing:</strong> Procesamiento en tiempo real con Apache Kafka y tecnologías
				similares.
			</p>
			<p>
				<strong>Data Quality:</strong> Validación, limpieza y gobernanza de datos.
			</p>
		</div>

		<div class="mt-12">
			<h3 class="text-xl font-semibold text-secondary-900">Stack</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Apache Airflow', 'dbt', 'PostgreSQL', 'MongoDB', 'Kafka', 'Spark', 'Docker', 'Kubernetes'] as tech (tech)}
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
