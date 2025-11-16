<script lang="ts">
	import { Button, Card, Section, SEO } from '$lib/components';
	import { categories } from '$lib/data/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { project } = data;

	const category = categories.find((c) => c.id === project.category);
</script>

<SEO
	title={project.title}
	description={project.shortDescription}
	url="https://territoriodigital.cl/portfolio/{project.id}"
	type="article"
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-4xl">
		<!-- Breadcrumb -->
		<nav class="mb-8 flex items-center gap-2 text-sm text-secondary-600">
			<a href="/" class="hover:text-primary-600">Inicio</a>
			<span>→</span>
			<a href="/portfolio" class="hover:text-primary-600">Portfolio</a>
			<span>→</span>
			<span class="text-secondary-900">{project.title}</span>
		</nav>

		<!-- Featured Badge -->
		{#if project.featured}
			<div class="mb-4">
				<span
					class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800"
				>
					⭐ Proyecto Destacado
				</span>
			</div>
		{/if}

		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			{project.title}
		</h1>

		<!-- Meta Info -->
		<div class="mt-4 flex flex-wrap items-center gap-4 text-secondary-600">
			{#if category}
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
						/>
					</svg>
					<span>{category.name}</span>
				</div>
			{/if}

			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span>{project.year}</span>
			</div>
		</div>

		<p class="mt-6 text-xl text-secondary-700">{project.shortDescription}</p>
	</div>
</Section>

<!-- Main Content -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<div class="grid gap-12 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2">
				<!-- Description -->
				<div class="prose prose-secondary max-w-none">
					<h2 class="text-2xl font-bold text-secondary-900">Descripción del Proyecto</h2>
					<p class="mt-4 text-lg text-secondary-700">{project.fullDescription}</p>
				</div>

				<!-- Highlights -->
				{#if project.highlights && project.highlights.length > 0}
					<div class="mt-12">
						<h2 class="text-2xl font-bold text-secondary-900">Características Principales</h2>
						<ul class="mt-6 space-y-3">
							{#each project.highlights as highlight (highlight)}
								<li class="flex items-start gap-3">
									<svg
										class="mt-0.5 h-6 w-6 flex-shrink-0 text-primary-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span class="text-secondary-700">{highlight}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Technologies -->
				<div class="mt-12">
					<h2 class="text-2xl font-bold text-secondary-900">Tecnologías Utilizadas</h2>
					<div class="mt-6 flex flex-wrap gap-2">
						{#each project.technologies as tech (tech)}
							<span
								class="inline-flex items-center rounded-lg bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-800"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>

				<!-- Tags -->
				<div class="mt-12">
					<h2 class="text-2xl font-bold text-secondary-900">Etiquetas</h2>
					<div class="mt-6 flex flex-wrap gap-2">
						{#each project.tags as tag (tag)}
							<span
								class="inline-flex items-center rounded-lg border border-secondary-300 bg-white px-3 py-1.5 text-sm text-secondary-700"
							>
								#{tag}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<div class="sticky top-8 space-y-6">
					<!-- Metrics Card -->
					{#if project.metrics && project.metrics.length > 0}
						<Card variant="bordered" padding="md">
							<h3 class="font-semibold text-secondary-900">Métricas del Proyecto</h3>
							<dl class="mt-4 space-y-4">
								{#each project.metrics as metric (metric.label)}
									<div>
										<dt class="text-sm text-secondary-600">{metric.label}</dt>
										<dd class="mt-1 text-2xl font-bold text-primary-600">{metric.value}</dd>
									</div>
								{/each}
							</dl>
						</Card>
					{/if}

					<!-- Links Card -->
					<Card variant="bordered" padding="md">
						<h3 class="font-semibold text-secondary-900">Enlaces</h3>
						<div class="mt-4 space-y-3">
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
								>
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
										<path
											fill-rule="evenodd"
											d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
											clip-rule="evenodd"
										/>
									</svg>
									Ver en GitHub
								</a>
							{/if}

							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
								>
									<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									Ver proyecto en vivo
								</a>
							{/if}
						</div>
					</Card>

					<!-- Back Button -->
					<Button variant="outline" href="/portfolio" class="w-full">← Volver al portfolio</Button>
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">¿Te interesa un proyecto similar?</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Conversemos sobre cómo podemos ayudarte a construir tu solución.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Contactar ahora</Button>
		</div>
	</div>
</Section>
