<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Footer } from '$lib/components';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Territorio Digital - Desarrollo Web, Data Science y Análisis Satelital</title>
	<meta
		name="description"
		content="Especialistas en desarrollo web, data science, machine learning y análisis satelital. Transformamos datos en decisiones inteligentes."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>
