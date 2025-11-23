<script lang="ts">
	import { Button, Section, SEO, BreadcrumbSchema } from '$lib/components';
</script>

<SEO
	title="Data Science & Machine Learning"
	description="Análisis de datos avanzado, modelos predictivos y machine learning para decisiones basadas en datos con Python, TensorFlow y scikit-learn."
	url="https://territorio-digital.cl/servicios/data-science"
	image="https://territorio-digital.cl/og-data-science.jpg"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Data Science', url: 'https://territorio-digital.cl/servicios/data-science' }
	]}
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Data Science & Machine Learning
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Transformo datos en insights accionables usando análisis estadístico, machine learning y
			visualización avanzada.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Solicitar consulta</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Servicios ofrecidos</h2>
		<div class="mt-6 space-y-4 text-secondary-600">
			<p>
				<strong>Análisis Exploratorio de Datos:</strong> Descubrimiento de patrones, tendencias y anomalías
				en tus datos.
			</p>
			<p>
				<strong>Modelos Predictivos:</strong> Forecasting, clasificación y regresión para anticipar comportamientos
				futuros.
			</p>
			<p>
				<strong>Machine Learning & Deep Learning:</strong> Desde modelos tradicionales hasta redes neuronales
				avanzadas.
			</p>
			<p>
				<strong>MLOps:</strong> Deployment, monitoreo y mantenimiento de modelos en producción.
			</p>
		</div>

		<div class="mt-12">
			<h3 class="text-xl font-semibold text-secondary-900">Stack Tecnológico</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'] as tech (tech)}
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
