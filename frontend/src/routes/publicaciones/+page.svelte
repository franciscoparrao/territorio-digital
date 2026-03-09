<script lang="ts">
	import { Button, Card, Section, SEO, BreadcrumbSchema } from '$lib/components';
</script>

<SEO
	title="Publicaciones Científicas - Francisco Parra"
	description="Artículos científicos publicados en revistas indexadas. Investigación en teledetección, volcanes, deep learning y análisis geoespacial."
	url="https://territorio-digital.cl/publicaciones"
	type="website"
	image="https://territorio-digital.cl/papers/volcanic-change-embeddings-summary.png"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Publicaciones', url: 'https://territorio-digital.cl/publicaciones' }
	]}
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<div
			class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600"
		>
			<svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
		</div>
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Publicaciones Científicas
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Investigación en teledetección, deep learning y análisis geoespacial publicada en revistas
			internacionales con revisión por pares.
		</p>
	</div>
</Section>

<!-- Featured Publication -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-5xl">
		<!-- Journal Badge -->
		<div class="mb-6 flex flex-wrap items-center gap-3">
			<span
				class="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800"
			>
				Remote Sensing Applications: Society and Environment
			</span>
			<span
				class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
			>
				Publicado 2026
			</span>
			<span
				class="inline-flex items-center rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700"
			>
				Elsevier
			</span>
		</div>

		<!-- Title -->
		<h2 class="text-2xl font-bold leading-tight text-secondary-900 sm:text-3xl">
			Unsupervised volcanic change detection using deep learning embeddings: Case studies of
			Nevados de Chillán and Llaima volcanoes, Chile (2017–2023)
		</h2>

		<!-- Author and DOI -->
		<div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary-600">
			<span class="font-medium text-secondary-900">Francisco Parra</span>
			<span>Article 101959</span>
			<a
				href="https://doi.org/10.1016/j.rsase.2026.101959"
				target="_blank"
				rel="noopener noreferrer"
				class="font-mono text-primary-600 hover:text-primary-800 hover:underline"
			>
				DOI: 10.1016/j.rsase.2026.101959
			</a>
		</div>

		<!-- Summary Figure -->
		<div class="mt-8 overflow-hidden rounded-xl border border-secondary-200 shadow-sm">
			<img
				src="/papers/volcanic-change-embeddings-summary.png"
				alt="Resumen visual del análisis de embeddings satelitales en Nevados de Chillán: clustering, series temporales, trayectorias UMAP y heatmaps de embeddings (2017-2023)"
				class="w-full"
				loading="lazy"
			/>
			<div class="bg-secondary-50 px-4 py-3 text-sm text-secondary-600">
				Resultados del análisis de embeddings satelitales en Nevados de Chillán (2017–2023):
				distribución de cambios, evaluación de clustering, mapa de clasificación, serie temporal
				del cráter, trayectoria UMAP y heatmap de embeddings.
			</div>
		</div>

		<!-- Abstract -->
		<div class="mt-10">
			<h3 class="text-xl font-semibold text-secondary-900">Abstract</h3>
			<div class="mt-4 space-y-4 text-base leading-relaxed text-secondary-700">
				<p>
					Satellite embeddings—compact numerical representations derived from deep learning
					models applied to satellite imagery—offer a new paradigm for environmental monitoring
					that bypasses traditional spectral index selection. This study demonstrates that
					64-dimensional embeddings from a Vision Transformer (ViT) model, accessed through
					Google Earth Engine's public ImageCollection, can detect and classify volcanic surface
					changes without supervised training or manual feature engineering.
				</p>
				<p>
					Applied to Nevados de Chillán and Llaima volcanoes in Chile (2017–2023), our
					unsupervised approach identified distinct surface classes through K-means clustering of
					embeddings, tracked temporal evolution through embedding distance metrics and UMAP
					trajectory visualization, and detected both dramatic post-eruption changes and subtle
					ongoing surface modifications.
				</p>
				<p>
					At Nevados de Chillán, the method revealed four distinct surface classes and captured
					the progressive stabilization following the 2016–present eruption cycle. At Llaima,
					three surface classes were identified with notably smaller temporal changes, consistent
					with the volcano's current quiescent state. The embedding-based approach achieved high
					cluster separability (silhouette scores of 0.52–0.59) and produced physically
					interpretable results consistent with known volcanic activity.
				</p>
				<p>
					These findings suggest that satellite embeddings could complement traditional remote
					sensing approaches for operational volcano monitoring, particularly for detecting
					gradual surface changes that may precede volcanic unrest.
				</p>
			</div>
		</div>

		<!-- Key Results -->
		<div class="mt-10">
			<h3 class="text-xl font-semibold text-secondary-900">Resultados clave</h3>
			<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card variant="bordered" padding="sm">
					<div class="text-center">
						<p class="text-2xl font-bold text-primary-600">64-dim</p>
						<p class="mt-1 text-sm text-secondary-600">Embeddings ViT</p>
					</div>
				</Card>
				<Card variant="bordered" padding="sm">
					<div class="text-center">
						<p class="text-2xl font-bold text-primary-600">0.52–0.59</p>
						<p class="mt-1 text-sm text-secondary-600">Silhouette score</p>
					</div>
				</Card>
				<Card variant="bordered" padding="sm">
					<div class="text-center">
						<p class="text-2xl font-bold text-primary-600">7 años</p>
						<p class="mt-1 text-sm text-secondary-600">Período 2017–2023</p>
					</div>
				</Card>
				<Card variant="bordered" padding="sm">
					<div class="text-center">
						<p class="text-2xl font-bold text-primary-600">2 volcanes</p>
						<p class="mt-1 text-sm text-secondary-600">Chillán y Llaima</p>
					</div>
				</Card>
			</div>
		</div>

		<!-- Access Links -->
		<div class="mt-10">
			<h3 class="text-xl font-semibold text-secondary-900">Acceso al artículo</h3>
			<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<!-- DOI -->
				<Card variant="elevated" padding="md" hover={true}>
					<div class="flex items-start gap-3">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100"
						>
							<svg
								class="h-5 w-5 text-primary-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-secondary-900">Versión publicada</h4>
							<p class="mt-1 text-sm text-secondary-600">Referencia permanente (DOI)</p>
							<a
								href="https://doi.org/10.1016/j.rsase.2026.101959"
								target="_blank"
								rel="noopener noreferrer"
								class="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
							>
								Abrir en Elsevier &rarr;
							</a>
						</div>
					</div>
				</Card>

				<!-- Share Link -->
				<Card variant="elevated" padding="md" hover={true}>
					<div class="flex items-start gap-3">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100"
						>
							<svg
								class="h-5 w-5 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-secondary-900">Acceso gratuito</h4>
							<p class="mt-1 text-sm text-secondary-600">
								Share link de Elsevier (expira 28 abril 2026)
							</p>
							<a
								href="https://authors.elsevier.com/a/1mki48M-mn1KSR"
								target="_blank"
								rel="noopener noreferrer"
								class="mt-2 inline-block text-sm font-medium text-green-600 hover:text-green-800 hover:underline"
							>
								Leer gratis &rarr;
							</a>
						</div>
					</div>
				</Card>

				<!-- Manuscript PDF -->
				<Card variant="elevated" padding="md" hover={true}>
					<div class="flex items-start gap-3">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100"
						>
							<svg
								class="h-5 w-5 text-red-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-secondary-900">Manuscrito aceptado</h4>
							<p class="mt-1 text-sm text-secondary-600">PDF descargable (versión del autor)</p>
							<a
								href="/papers/volcanic-change-embeddings.pdf"
								download
								class="mt-2 inline-block text-sm font-medium text-red-600 hover:text-red-800 hover:underline"
							>
								Descargar PDF &rarr;
							</a>
						</div>
					</div>
				</Card>
			</div>

			<!-- Legal Note for Manuscript -->
			<p class="mt-4 text-xs text-secondary-500">
				Accepted manuscript. Licensed under CC BY-NC-ND. The published version is available at
				<a
					href="https://doi.org/10.1016/j.rsase.2026.101959"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary-600 hover:underline"
				>
					doi.org/10.1016/j.rsase.2026.101959</a
				>.
			</p>
		</div>

		<!-- Code Repository -->
		<div class="mt-10">
			<h3 class="text-xl font-semibold text-secondary-900">Código fuente</h3>
			<Card variant="bordered" padding="md" hover={true}>
				<div class="flex items-center gap-4">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary-900"
					>
						<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</div>
					<div class="flex-1">
						<h4 class="font-semibold text-secondary-900">volcanic-change-embeddings</h4>
						<p class="mt-1 text-sm text-secondary-600">
							Todo el código, datos y notebooks para reproducir los resultados del artículo.
						</p>
					</div>
					<a
						href="https://github.com/franciscoparrao/volcanic-change-embeddings"
						target="_blank"
						rel="noopener noreferrer"
						class="shrink-0"
					>
						<Button variant="outline" size="sm">Ver en GitHub</Button>
					</a>
				</div>
			</Card>
		</div>

		<!-- Citation -->
		<div class="mt-10">
			<h3 class="text-xl font-semibold text-secondary-900">Citar este artículo</h3>
			<div class="mt-4 rounded-lg bg-secondary-50 p-4">
				<p class="font-mono text-sm leading-relaxed text-secondary-700">
					Parra, F. (2026). Unsupervised volcanic change detection using deep learning
					embeddings: Case studies of Nevados de Chillán and Llaima volcanoes, Chile
					(2017–2023). <em>Remote Sensing Applications: Society and Environment</em>, 101959.
					https://doi.org/10.1016/j.rsase.2026.101959
				</p>
			</div>
		</div>
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900">
			¿Interesado en análisis geoespacial con IA?
		</h2>
		<p class="mt-4 text-lg text-secondary-600">
			Aplicamos técnicas de deep learning y teledetección a problemas reales en agricultura,
			medioambiente, minería y más.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Conversemos</Button>
			<Button variant="outline" size="lg" href="/servicios/analisis-satelital"
				>Ver servicios satelitales</Button
			>
		</div>
	</div>
</Section>
