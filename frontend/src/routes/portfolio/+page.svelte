<script lang="ts">
	import { Button, Section } from '$lib/components';
</script>

<svelte:head>
	<title>Portfolio - Territorio Digital</title>
	<meta
		name="description"
		content="Casos de éxito y proyectos destacados en desarrollo web, data science y análisis satelital."
	/>
</svelte:head>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">Portfolio</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Esta sección está en construcción. Pronto podrás ver casos de éxito y proyectos destacados.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contacto">Contáctame</Button>
			<Button variant="secondary" href="/servicios">Ver servicios</Button>
		</div>
	</div>
</Section>
