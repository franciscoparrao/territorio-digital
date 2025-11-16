<script lang="ts">
	import { Button, Card, Section, SEO } from '$lib/components';
	import { posts, categories, type BlogCategory } from '$lib/data/posts';

	let selectedCategory = $state<BlogCategory | 'all'>('all');

	const filteredPosts = $derived(() => {
		if (selectedCategory === 'all') return posts;
		return posts.filter((p) => p.category === selectedCategory);
	});

	const featuredPosts = $derived(() => posts.filter((p) => p.featured));

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-CL', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<SEO
	title="Blog"
	description="Artículos sobre desarrollo web, data science, machine learning, análisis geoespacial y tecnología. Tutoriales, investigación y casos de uso reales."
	url="https://territoriodigital.cl/blog"
	type="website"
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Blog de <span class="text-primary-600">Tecnología</span>
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Tutoriales, investigación y casos de uso sobre desarrollo web, data science, machine
			learning y análisis geoespacial.
		</p>
	</div>
</Section>

<!-- Featured Posts -->
{#if featuredPosts().length > 0}
	<Section background="white" padding="lg">
		<div class="mx-auto max-w-6xl">
			<h2 class="text-2xl font-bold text-secondary-900">Artículos Destacados</h2>
			<div class="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredPosts() as post (post.slug)}
					<Card variant="elevated" padding="md" hover={true}>
						<div class="mb-3">
							<span
								class="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800"
							>
								⭐ Destacado
							</span>
						</div>

						<h3 class="text-xl font-semibold text-secondary-900">{post.title}</h3>

						<div class="mt-2 flex items-center gap-2 text-sm text-secondary-600">
							<span>{formatDate(post.date)}</span>
							<span>•</span>
							<span>{post.readingTime} min lectura</span>
						</div>

						<p class="mt-3 text-secondary-700">{post.excerpt}</p>

						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each post.tags.slice(0, 3) as tag (tag)}
								<span
									class="inline-flex items-center rounded-md bg-secondary-100 px-2 py-1 text-xs font-medium text-secondary-700"
								>
									#{tag}
								</span>
							{/each}
						</div>

						<div class="mt-6">
							<a
								href="/blog/{post.slug}"
								class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
							>
								Leer artículo
								<svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	</Section>
{/if}

<!-- Category Filter -->
<Section background="gray" padding="md">
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-wrap gap-2">
			<button
				onclick={() => (selectedCategory = 'all')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
				'all'
					? 'bg-primary-600 text-white'
					: 'bg-white text-secondary-700 hover:bg-secondary-100'}"
			>
				Todos
			</button>
			{#each categories as category (category.id)}
				<button
					onclick={() => (selectedCategory = category.id)}
					class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {selectedCategory ===
					category.id
						? 'bg-primary-600 text-white'
						: 'bg-white text-secondary-700 hover:bg-secondary-100'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>
</Section>

<!-- All Posts -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-6xl">
		<h2 class="text-2xl font-bold text-secondary-900">
			{selectedCategory === 'all' ? 'Todos los Artículos' : categories.find((c) => c.id === selectedCategory)?.name}
		</h2>

		{#if filteredPosts().length === 0}
			<div class="mt-12 text-center">
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
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				<h3 class="mt-4 text-lg font-medium text-secondary-900">No hay artículos</h3>
				<p class="mt-2 text-secondary-600">Aún no hay artículos en esta categoría.</p>
			</div>
		{:else}
			<div class="mt-8 space-y-8">
				{#each filteredPosts() as post (post.slug)}
					<article class="flex flex-col gap-6 border-b border-secondary-200 pb-8 md:flex-row">
						<!-- Content -->
						<div class="flex-1">
							<div class="flex items-center gap-2 text-sm text-secondary-600">
								<span class="font-medium text-primary-600">{categories.find((c) => c.id === post.category)?.name}</span>
								<span>•</span>
								<time datetime={post.date}>{formatDate(post.date)}</time>
								<span>•</span>
								<span>{post.readingTime} min</span>
							</div>

							<h3 class="mt-2 text-2xl font-bold text-secondary-900">
								<a href="/blog/{post.slug}" class="hover:text-primary-600 transition-colors">
									{post.title}
								</a>
							</h3>

							<p class="mt-3 text-secondary-700">{post.excerpt}</p>

							<div class="mt-4 flex flex-wrap gap-2">
								{#each post.tags as tag (tag)}
									<span
										class="inline-flex items-center rounded-md border border-secondary-300 bg-white px-2.5 py-0.5 text-xs text-secondary-700"
									>
										#{tag}
									</span>
								{/each}
							</div>

							<div class="mt-4 flex items-center gap-4">
								<a
									href="/blog/{post.slug}"
									class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
								>
									Leer más
									<svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</a>

								<span class="text-sm text-secondary-600">Por {post.author}</span>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">
			¿Tienes una pregunta técnica?
		</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Si hay un tema específico que te gustaría que cubriera, contáctame.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Enviar sugerencia</Button>
		</div>
	</div>
</Section>
