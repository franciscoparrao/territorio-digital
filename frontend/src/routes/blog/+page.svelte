<script lang="ts">
	import { Button, Section } from '$lib/components';
</script>

<svelte:head>
	<title>Blog - Territorio Digital</title>
	<meta
		name="description"
		content="Artículos sobre desarrollo web, data science, análisis satelital y tecnología."
	/>
</svelte:head>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">Blog</h1>
		<p class="mt-6 text-lg text-secondary-600">
			El blog está en construcción. Pronto encontrarás artículos técnicos, tutoriales y casos de
			uso.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="primary" href="/contacto">Contáctame</Button>
			<Button variant="secondary" href="/servicios">Ver servicios</Button>
		</div>
	</div>
</Section>
