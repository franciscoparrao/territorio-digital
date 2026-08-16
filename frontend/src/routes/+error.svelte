<script lang="ts">
	import { page } from '$app/state';
	import { Button, Section, SEO } from '$lib/components';

	const suggestions = [
		{ href: '/', label: 'Inicio', description: 'Volver a la página principal' },
		{ href: '/servicios', label: 'Servicios', description: 'Desarrollo web, data science y análisis geoespacial' },
		{ href: '/portfolio', label: 'Portfolio', description: 'Proyectos que hemos desarrollado' },
		{ href: '/blog', label: 'Blog', description: 'Artículos técnicos y casos de estudio' },
		{ href: '/contacto', label: 'Contacto', description: 'Escríbenos directamente' }
	];
</script>

<SEO
	title={page.status === 404 ? 'Página no encontrada' : 'Error'}
	description="La página que buscas no existe o fue movida."
	url="https://territorio-digital.cl"
	type="website"
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-2xl text-center">
		<p class="font-mono text-6xl font-bold text-primary-600 sm:text-7xl">{page.status}</p>
		<h1 class="mt-6 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
			{#if page.status === 404}
				Página no encontrada
			{:else}
				Algo salió mal
			{/if}
		</h1>
		<p class="mt-4 text-lg text-secondary-600">
			{#if page.status === 404}
				La página que buscas no existe o fue movida. Puede que el enlace esté desactualizado o que
				hayas escrito mal la dirección.
			{:else}
				Ocurrió un error inesperado. Si el problema persiste, escríbenos a
				contacto@territorio-digital.cl.
			{/if}
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/">Volver al inicio</Button>
		</div>
	</div>
</Section>

{#if page.status === 404}
	<Section background="white" padding="lg">
		<div class="mx-auto max-w-2xl">
			<h2 class="text-center text-xl font-semibold text-secondary-900">Quizás buscabas</h2>
			<div class="mt-8 space-y-3">
				{#each suggestions as link (link.href)}
					<a
						href={link.href}
						class="flex items-center justify-between rounded-lg border border-secondary-200 px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-50"
					>
						<div>
							<span class="font-semibold text-secondary-900">{link.label}</span>
							<span class="ml-3 text-sm text-secondary-500">{link.description}</span>
						</div>
						<svg class="h-5 w-5 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{/each}
			</div>
		</div>
	</Section>
{/if}
