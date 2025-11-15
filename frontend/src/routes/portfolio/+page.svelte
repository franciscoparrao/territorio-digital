<script lang="ts">
	import { Button, Card, Section, SEO } from '$lib/components';
	import { projects, categories, type ProjectCategory } from '$lib/data/projects';

	let selectedCategory = $state<ProjectCategory | 'all'>('all');
	let showOnlyFeatured = $state(false);

	const filteredProjects = $derived(() => {
		let filtered = projects;

		// Filter by category
		if (selectedCategory !== 'all') {
			filtered = filtered.filter((p) => p.category === selectedCategory);
		}

		// Filter by featured
		if (showOnlyFeatured) {
			filtered = filtered.filter((p) => p.featured);
		}

		return filtered;
	});

	const stats = $derived(() => ({
		total: projects.length,
		featured: projects.filter((p) => p.featured).length,
		categories: new Set(projects.map((p) => p.category)).size
	}));
</script>

<SEO
	title="Portfolio"
	description="Casos de éxito y proyectos destacados en desarrollo web, data science, machine learning y análisis geoespacial."
	url="https://territoriodigital.cl/portfolio"
	type="website"
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Portfolio de <span class="text-primary-600">Proyectos</span>
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Explorá nuestra experiencia en desarrollo web, data science, machine learning y análisis
			geoespacial.
		</p>

		<!-- Stats -->
		<div class="mt-10 grid grid-cols-3 gap-4">
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<div class="text-3xl font-bold text-primary-600">{stats().total}</div>
				<div class="text-sm text-secondary-600">Proyectos</div>
			</div>
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<div class="text-3xl font-bold text-primary-600">{stats().featured}</div>
				<div class="text-sm text-secondary-600">Destacados</div>
			</div>
			<div class="rounded-lg bg-white p-4 shadow-sm">
				<div class="text-3xl font-bold text-primary-600">{stats().categories}</div>
				<div class="text-sm text-secondary-600">Categorías</div>
			</div>
		</div>
	</div>
</Section>

<!-- Filters -->
<Section background="white" padding="md">
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<!-- Category Filter -->
			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => (selectedCategory = 'all')}
					class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
					'all'
						? 'bg-primary-600 text-white'
						: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'}"
				>
					Todos
				</button>
				{#each categories as category (category.id)}
					<button
						onclick={() => (selectedCategory = category.id)}
						class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
						category.id
							? 'bg-primary-600 text-white'
							: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'}"
					>
						{category.name}
					</button>
				{/each}
			</div>

			<!-- Featured Filter -->
			<label class="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					bind:checked={showOnlyFeatured}
					class="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
				/>
				<span class="text-sm font-medium text-secondary-700">Solo destacados</span>
			</label>
		</div>
	</div>
</Section>

<!-- Projects Grid -->
<Section background="secondary" padding="lg">
	<div class="mx-auto max-w-6xl">
		{#if filteredProjects().length === 0}
			<div class="text-center py-12">
				<svg
					class="mx-auto h-12 w-12 text-secondary-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h3 class="mt-4 text-lg font-medium text-secondary-900">No hay proyectos</h3>
				<p class="mt-2 text-secondary-600">Intenta con otros filtros.</p>
			</div>
		{:else}
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredProjects() as project (project.id)}
					<Card variant="elevated" padding="md" hover={true}>
						<!-- Featured Badge -->
						{#if project.featured}
							<div class="mb-3">
								<span
									class="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
								>
									⭐ Destacado
								</span>
							</div>
						{/if}

						<h3 class="text-xl font-semibold text-secondary-900">{project.title}</h3>

						<!-- Category & Year -->
						<div class="mt-2 flex items-center gap-2 text-sm text-secondary-600">
							<span>{categories.find((c) => c.id === project.category)?.name}</span>
							<span>•</span>
							<span>{project.year}</span>
						</div>

						<p class="mt-3 text-secondary-700">{project.shortDescription}</p>

						<!-- Technologies -->
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each project.technologies.slice(0, 4) as tech (tech)}
								<span
									class="inline-flex items-center rounded-md bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-700"
								>
									{tech}
								</span>
							{/each}
							{#if project.technologies.length > 4}
								<span
									class="inline-flex items-center rounded-md bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-700"
								>
									+{project.technologies.length - 4}
								</span>
							{/if}
						</div>

						<!-- Metrics -->
						{#if project.metrics}
							<div class="mt-4 grid grid-cols-3 gap-2 border-t border-secondary-200 pt-4">
								{#each project.metrics as metric (metric.label)}
									<div>
										<div class="text-xs text-secondary-600">{metric.label}</div>
										<div class="font-semibold text-secondary-900">{metric.value}</div>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Actions -->
						<div class="mt-6 flex gap-2">
							<a
								href="/portfolio/{project.id}"
								class="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-700 transition-colors"
							>
								Ver detalles
							</a>
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="rounded-lg border border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
									title="Ver en GitHub"
								>
									<svg
										class="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">
			¿Tienes un proyecto en mente?
		</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Iniciar proyecto</Button>
		</div>
	</div>
</Section>
