<script lang="ts">
	import { Button, Card, Section, SEO, BreadcrumbSchema } from '$lib/components';

	const faqs = [
		{
			question: '¿Cuánto cuesta desarrollar un sitio web?',
			answer:
				'Para un sitio web informativo profesional el rango típico va de $890.000 a $1.500.000 CLP. Aplicaciones web con funcionalidad personalizada (sistema de reservas, e-commerce, panel de administración, etc.) parten desde $2.290.000 CLP. El precio final depende del alcance: cantidad de páginas, integraciones, idiomas, y nivel de personalización del diseño.'
		},
		{
			question: '¿Cuánto tiempo toma desarrollar un proyecto?',
			answer:
				'Un sitio web informativo se entrega típicamente en 2 a 4 semanas. Aplicaciones web con backend personalizado toman entre 6 y 10 semanas. Trabajamos en sprints de entregas incrementales para que el cliente pueda revisar y dar feedback continuo durante todo el proceso.'
		},
		{
			question: '¿El hosting y el dominio están incluidos?',
			answer:
				'El hosting cloud profesional, certificado SSL, backup diario y monitoreo de uptime están incluidos en una tarifa anual desde $80.000 CLP. El dominio (.cl, .com) se gestiona y paga directamente por el cliente ante el registrar correspondiente (NIC Chile para .cl, aproximadamente $9.000 CLP/año).'
		},
		{
			question: '¿Qué stack tecnológico usan?',
			answer:
				'Para frontend: SvelteKit y React con TypeScript, TailwindCSS. Para backend: Rust (Axum) cuando el proyecto requiere alto rendimiento, Node.js o Go para casos más estándar. Bases de datos: PostgreSQL y MongoDB. Todo el código se entrega abierto al cliente al final del proyecto.'
		},
		{
			question: '¿Trabajan con clientes fuera de Chile?',
			answer:
				'Sí. Trabajamos remotamente con clientes en toda Latinoamérica y España. Las reuniones se coordinan por videollamada en horario flexible. Los precios se mantienen en pesos chilenos (CLP) o se ajustan al equivalente en USD/EUR según el cliente.'
		},
		{
			question: '¿Qué pasa después de la entrega del proyecto?',
			answer:
				'Ofrecemos 90 días de garantía sobre el desarrollo entregado, durante los cuales corregimos sin costo cualquier bug encontrado. Posteriormente, los cambios y mejoras se cotizan a $35.000 CLP/hora. El hosting con soporte se renueva anualmente y mantiene el sitio operativo, seguro y respaldado.'
		}
	];

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<SEO
	title="Desarrollo Web Moderno"
	description="Aplicaciones web modernas con SvelteKit, React y TypeScript. SPAs, PWAs y arquitecturas escalables para tu negocio."
	url="https://territorio-digital.cl/servicios/desarrollo-web"
	image="https://territorio-digital.cl/og-desarrollo-web.jpg"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Desarrollo Web', url: 'https://territorio-digital.cl/servicios/desarrollo-web' }
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
					d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
				/>
			</svg>
		</div>
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Desarrollo Web Moderno
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Aplicaciones web rápidas, escalables y con experiencia de usuario excepcional usando las
			tecnologías más avanzadas del mercado.
		</p>
		<div class="mt-8">
			<Button variant="primary" size="lg" href="/contacto">Iniciar proyecto</Button>
		</div>
	</div>
</Section>

<!-- What I Offer -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">¿Qué ofrezco?</h2>
		<div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">Single Page Applications</h3>
				<p class="mt-2 text-secondary-600">
					SPAs con navegación fluida, carga rápida y experiencia similar a apps nativas.
				</p>
			</Card>

			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">Progressive Web Apps</h3>
				<p class="mt-2 text-secondary-600">
					PWAs que funcionan offline, son instalables y ofrecen experiencia móvil superior.
				</p>
			</Card>

			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">APIs REST & GraphQL</h3>
				<p class="mt-2 text-secondary-600">
					Backends robustos y escalables con documentación completa y mejores prácticas.
				</p>
			</Card>

			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">Arquitectura Escalable</h3>
				<p class="mt-2 text-secondary-600">
					Diseño de sistemas que crecen con tu negocio sin sacrificar performance.
				</p>
			</Card>

			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">Performance Optimization</h3>
				<p class="mt-2 text-secondary-600">
					Optimización de carga, rendering y experiencia para Lighthouse 90+.
				</p>
			</Card>

			<Card variant="bordered" padding="md" hover={true}>
				<h3 class="text-xl font-semibold text-secondary-900">SEO & Accesibilidad</h3>
				<p class="mt-2 text-secondary-600">
					Sitios optimizados para buscadores y accesibles para todos los usuarios.
				</p>
			</Card>
		</div>
	</div>
</Section>

<!-- Tech Stack -->
<Section background="gray" padding="lg">
	<div class="mx-auto max-w-5xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">Stack Tecnológico</h2>
		<p class="mt-4 text-center text-lg text-secondary-600">
			Trabajo con tecnologías modernas y probadas en producción
		</p>

		<div class="mt-12 grid gap-8 md:grid-cols-2">
			<Card variant="elevated" padding="lg">
				<h3 class="text-xl font-semibold text-secondary-900">Frontend</h3>
				<ul class="mt-4 space-y-2 text-secondary-600">
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">SvelteKit:</strong> Framework moderno con performance excepcional
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">React:</strong> Ecosistema maduro para apps complejas
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">TypeScript:</strong> Type safety y mejor DX
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">TailwindCSS:</strong> Utility-first CSS framework
					</li>
				</ul>
			</Card>

			<Card variant="elevated" padding="lg">
				<h3 class="text-xl font-semibold text-secondary-900">Backend</h3>
				<ul class="mt-4 space-y-2 text-secondary-600">
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">Node.js:</strong> Runtime JavaScript escalable
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">Rust:</strong> Performance y seguridad para APIs críticas
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">PostgreSQL:</strong> Base de datos relacional robusta
					</li>
					<li class="flex items-center">
						<span class="mr-2 text-primary-600">▸</span>
						<strong class="mr-2">MongoDB:</strong> NoSQL flexible para datos no estructurados
					</li>
				</ul>
			</Card>
		</div>
	</div>
</Section>

<!-- Process -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">Proceso de Trabajo</h2>
		<div class="mt-12 space-y-8">
			{#each [{ number: '01', title: 'Descubrimiento', description: 'Entendemos tus objetivos, usuarios y requerimientos técnicos.' }, { number: '02', title: 'Planificación', description: 'Diseñamos la arquitectura, definimos el stack y creamos el roadmap.' }, { number: '03', title: 'Desarrollo', description: 'Implementación iterativa con entregas incrementales y feedback continuo.' }, { number: '04', title: 'Testing & QA', description: 'Pruebas exhaustivas de funcionalidad, performance y accesibilidad.' }, { number: '05', title: 'Deploy & Monitoreo', description: 'Despliegue a producción y monitoreo continuo de métricas clave.' }] as step (step.number)}
				<div class="flex gap-6">
					<div class="flex-shrink-0">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white"
						>
							{step.number}
						</div>
					</div>
					<div>
						<h3 class="text-xl font-semibold text-secondary-900">{step.title}</h3>
						<p class="mt-2 text-secondary-600">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- FAQ -->
<Section background="gray" padding="lg">
	<div class="mx-auto max-w-3xl">
		<h2 class="text-center text-3xl font-bold text-secondary-900">Preguntas Frecuentes</h2>
		<p class="mt-4 text-center text-lg text-secondary-600">
			Las dudas más comunes de quienes contactan por un proyecto web
		</p>

		<div class="mt-12 space-y-4">
			{#each faqs as faq, i (i)}
				<details class="group rounded-lg border border-secondary-200 bg-white p-6 transition-shadow hover:shadow-md">
					<summary class="flex cursor-pointer items-center justify-between text-lg font-semibold text-secondary-900">
						<span>{faq.question}</span>
						<svg
							class="h-5 w-5 flex-shrink-0 text-secondary-500 transition-transform group-open:rotate-180"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</summary>
					<p class="mt-4 text-secondary-600">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</Section>

<!-- CTA -->
<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900 sm:text-4xl">
			¿Listo para tu nuevo proyecto web?
		</h2>
		<p class="mt-4 text-lg text-secondary-700">
			Conversemos sobre tus necesidades y te ayudaré a crear una solución a medida.
		</p>
		<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button variant="primary" size="lg" href="/contacto">Contactar ahora</Button>
			<Button variant="secondary" size="lg" href="/servicios">Ver otros servicios</Button>
		</div>
	</div>
</Section>
