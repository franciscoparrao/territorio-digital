<script lang="ts">
	import { Button, SEO } from '$lib/components';
	import { categories } from '$lib/data/posts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { post, Content } = data;

	const category = categories.find((c) => c.id === post.category);

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
	title={post.title}
	description={post.excerpt}
	url="https://territoriodigital.cl/blog/{post.slug}"
	type="article"
	article={{
		publishedTime: post.date,
		author: post.author,
		tags: post.tags
	}}
/>

<!-- Header -->
<header class="border-b border-secondary-200 bg-gradient-to-br from-primary-50 to-white py-12">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Breadcrumb -->
		<nav class="mb-6 flex items-center gap-2 text-sm text-secondary-600">
			<a href="/" class="hover:text-primary-600">Inicio</a>
			<span>→</span>
			<a href="/blog" class="hover:text-primary-600">Blog</a>
			<span>→</span>
			<span class="text-secondary-900">{post.title}</span>
		</nav>

		<!-- Category Badge -->
		{#if category}
			<div class="mb-4">
				<a
					href="/blog?category={post.category}"
					class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 hover:bg-primary-200"
				>
					{category.name}
				</a>
			</div>
		{/if}

		<!-- Title -->
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			{post.title}
		</h1>

		<!-- Meta Info -->
		<div class="mt-6 flex flex-wrap items-center gap-4 text-secondary-600">
			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
				<span>{post.author}</span>
			</div>

			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<time datetime={post.date}>{formatDate(post.date)}</time>
			</div>

			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{post.readingTime} min de lectura</span>
			</div>
		</div>

		<!-- Tags -->
		<div class="mt-6 flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}
				<span
					class="inline-flex items-center rounded-md border border-secondary-300 bg-white px-2.5 py-1 text-sm text-secondary-700"
				>
					#{tag}
				</span>
			{/each}
		</div>
	</div>
</header>

<!-- Article Content -->
<Content />

<!-- Footer -->
<footer class="border-t border-secondary-200 bg-secondary-50 py-12">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Author Info -->
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<div class="flex items-start gap-4">
				<div class="flex-shrink-0">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700"
					>
						FP
					</div>
				</div>
				<div class="flex-1">
					<h3 class="text-lg font-semibold text-secondary-900">{post.author}</h3>
					<p class="mt-1 text-secondary-600">
						Doctor en Ciencias de la Ingeniería mención Informática (USACH). Especializado en
						desarrollo web, data science y análisis geoespacial.
					</p>
					<div class="mt-4">
						<a
							href="/about"
							class="text-sm font-medium text-primary-600 hover:text-primary-700"
						>
							Más sobre el autor →
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Navigation -->
		<div class="mt-8 flex items-center justify-between">
			<Button variant="outline" href="/blog">← Volver al blog</Button>
			<Button variant="primary" href="/contacto">Contactar</Button>
		</div>
	</div>
</footer>
