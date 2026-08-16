<script lang="ts">
	import { Button, Section, SEO, BreadcrumbSchema } from '$lib/components';

	const faqs = [
		{
			question: '¿Cómo funciona una sesión de asesoría técnica?',
			answer:
				'Empieza con una llamada de diagnóstico gratuita (30 min) donde nos cuentas el problema. Si tiene sentido avanzar, hacemos una sesión de trabajo de 2 horas donde revisamos el código, la arquitectura o los logs en detalle y definimos las acciones concretas. Al final de la sesión recibes un informe escrito con los hallazgos y las recomendaciones priorizadas. No hay compromiso de implementación incluido en la asesoría — si quieres que la implementemos nosotros, se cotiza aparte.'
		},
		{
			question: '¿Pueden revisar código en cualquier lenguaje?',
			answer:
				'Con profundidad: Rust, Python, Go, TypeScript/JavaScript, SQL. Con conocimiento general: Java, C, C++, R, Julia. Para frameworks y librerías específicas (SvelteKit, React, Axum, FastAPI, Django, etc.), normalmente tenemos experiencia directa. Si el lenguaje o framework es muy específico y no lo manejamos, te lo decimos antes de cobrar — no tiene sentido hacer un review superficial.'
		},
		{
			question: '¿La asesoría incluye la implementación de los cambios?',
			answer:
				'No por defecto — la asesoría es diagnóstico y recomendaciones. Si además quieres que implementemos los cambios, se cotiza como proyecto de desarrollo separado. Esta separación existe porque muchos clientes tienen su propio equipo de desarrollo que puede implementar las recomendaciones; pagar por la implementación cuando no la necesitan sería ineficiente.'
		},
		{
			question: '¿Cuántas horas de consultoría necesito para ver resultados?',
			answer:
				'Para un code review de un módulo específico o revisión de una arquitectura: 2-4 horas de sesión, más el tiempo de preparar el informe. Para un diagnóstico completo de un sistema con múltiples componentes: 8-16 horas distribuidas en varias sesiones. Para mentoría continua de un equipo: normalmente un retainer de 4-8 horas mensuales durante 3-6 meses para ver un cambio real en la calidad del código.'
		},
		{
			question: '¿Trabajan bajo NDA?',
			answer:
				'Sí, siempre. Antes de ver cualquier código, arquitectura o dato confidencial, firmamos un acuerdo de confidencialidad. Si tu empresa tiene su propio NDA estándar, lo revisamos y firmamos. Si prefieres usar el nuestro, tenemos uno simple de 2 páginas para proyectos de asesoría.'
		},
		{
			question: '¿Para qué sirve la mentoría técnica y a quién va dirigida?',
			answer:
				'Va dirigida a equipos de desarrollo que quieren mejorar sus prácticas pero no tienen un senior interno que pueda guiarlos. También a CTOs o tech leads de startups que quieren una segunda opinión experta antes de tomar decisiones de arquitectura importantes. Las sesiones combinan revisión de código real del equipo, explicación de patrones y principios aplicados al contexto específico, y feedback directo sobre las decisiones tomadas. No es un curso teórico — es trabajo con el código real del equipo.'
		}
	];

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	};

	const useCases = [
		{
			title: 'Deuda técnica acumulada',
			description: 'Código heredado sin tests, arquitectura que creció sin plan y se volvió difícil de mantener. Diagnóstico y roadmap de mejora por etapas.'
		},
		{
			title: 'Validación de arquitectura',
			description: 'Segunda opinión experta antes de comprometerse con una decisión de arquitectura o stack. Ideal antes de escalar o de contratar más desarrolladores.'
		},
		{
			title: 'Problemas de performance',
			description: 'Backend lento, queries que tardan demasiado, memoria que crece sin control. Diagnóstico con profiling real, no suposiciones.'
		},
		{
			title: 'Mentoría de equipo',
			description: 'Equipo junior o mid que necesita un senior de referencia para mejorar la calidad del código y las prácticas de ingeniería semana a semana.'
		},
		{
			title: 'Selección de tecnología',
			description: '¿PostgreSQL o MongoDB? ¿SvelteKit o Next.js? ¿Rust o Go para el backend? Análisis técnico imparcial basado en el caso específico, sin vendor bias.'
		},
		{
			title: 'Revisión de seguridad',
			description: 'Identificación de vulnerabilidades comunes (OWASP Top 10), revisión de manejo de autenticación, autorización, datos sensibles y configuración de infraestructura.'
		}
	];

	const pricing = [
		{
			name: 'Sesión única',
			price: '$95.000',
			period: 'sesión de 2h',
			description: 'Una sesión enfocada en un problema específico: revisión de arquitectura, debug de un problema de performance, o decisión técnica puntual.',
			includes: ['2h de sesión en vivo', 'Informe escrito con hallazgos', 'Recomendaciones priorizadas', 'NDA incluido']
		},
		{
			name: 'Code review completo',
			price: 'desde $290.000',
			period: 'pago único',
			description: 'Revisión exhaustiva de un componente o módulo: arquitectura, calidad de código, seguridad, tests, documentación y performance.',
			includes: ['Revisión de todo el código del scope', 'Informe de hallazgos categorizados', 'Roadmap de mejoras', 'Sesión de presentación (1h)', 'NDA incluido'],
			featured: true
		},
		{
			name: 'Retainer mensual',
			price: 'desde $250.000',
			period: 'por mes',
			description: 'Acceso mensual para preguntas, revisiones de PR y sesiones de mentoría. Para equipos que quieren un senior de referencia permanente.',
			includes: ['4-8h de disponibilidad mensual', 'Revisión de PRs cuando necesites', 'Sesión mensual de mentoría (1h)', 'Respuesta en 24h hábiles']
		}
	];
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<SEO
	title="Asesoría Técnica en Desarrollo de Software"
	description="Consultoría técnica en arquitectura, code review, performance y mentoría de equipos. Para startups, empresas y CTOs en Chile que necesitan una segunda opinión experta."
	url="https://territorio-digital.cl/servicios/asesoria"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Asesoría Técnica', url: 'https://territorio-digital.cl/servicios/asesoria' }
	]}
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Asesoría Técnica
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Segunda opinión experta para decisiones de arquitectura, diagnóstico de problemas de
			performance y mentoría de equipos. Sin compromiso de implementación — solo criterio técnico
			independiente.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Agendar diagnóstico gratuito</Button>
			<Button variant="secondary" size="lg" href="/about">Ver perfil técnico</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Áreas de asesoría</h2>
		<div class="mt-8 grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Revisión de Arquitectura</h3>
				<p class="mt-2 text-sm text-secondary-600">Análisis del diseño actual: acoplamiento, separación de responsabilidades, escalabilidad, patrones usados y anti-patrones. Recomendaciones concretas y priorizadas.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Code Review</h3>
				<p class="mt-2 text-sm text-secondary-600">Revisión profunda de código: calidad, seguridad (OWASP Top 10), mantenibilidad, cobertura de tests y documentación. Informe con hallazgos categorizados por severidad.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Performance & Diagnóstico</h3>
				<p class="mt-2 text-sm text-secondary-600">Profiling de backend (Rust, Python, Go), optimización de queries SQL, diagnóstico de memory leaks y cuellos de botella. Basado en métricas reales, no suposiciones.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Mentoría de Equipos</h3>
				<p class="mt-2 text-sm text-secondary-600">Sesiones regulares con el equipo de desarrollo para mejorar prácticas: TDD, code review interno, CI/CD, documentación. Feedback sobre código real del equipo.</p>
			</div>
		</div>

		<div class="mt-10">
			<h3 class="text-lg font-semibold text-secondary-900">Lenguajes y frameworks con los que trabajamos</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Rust', 'Python', 'Go', 'TypeScript', 'SQL', 'SvelteKit', 'React', 'Axum', 'FastAPI', 'Docker', 'PostgreSQL', 'MongoDB'] as tech (tech)}
					<span class="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</Section>

<Section background="gray" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Cuándo tiene sentido contratar asesoría</h2>
		<p class="mt-2 text-secondary-600">Situaciones donde una perspectiva externa independiente agrega más valor que seguir internamente.</p>
		<div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each useCases as useCase (useCase.title)}
				<div class="rounded-lg border border-secondary-200 bg-white p-5">
					<h3 class="font-semibold text-secondary-900">{useCase.title}</h3>
					<p class="mt-2 text-sm text-secondary-600">{useCase.description}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Precios</h2>
		<p class="mt-2 text-secondary-600">Sin horas mínimas ni contratos de largo plazo obligatorios. Empieza con lo que necesitas.</p>
		<div class="mt-8 grid gap-6 md:grid-cols-3">
			{#each pricing as plan (plan.name)}
				<div class="rounded-xl border {plan.featured ? 'border-primary-400 ring-2 ring-primary-200' : 'border-secondary-200'} bg-white p-6">
					{#if plan.featured}
						<span class="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800">Más solicitado</span>
					{/if}
					<h3 class="text-lg font-bold text-secondary-900">{plan.name}</h3>
					<p class="mt-1 text-2xl font-bold text-primary-600">{plan.price}</p>
					<p class="text-sm text-secondary-500">{plan.period}</p>
					<p class="mt-3 text-sm text-secondary-600">{plan.description}</p>
					<ul class="mt-4 space-y-2">
						{#each plan.includes as item (item)}
							<li class="flex items-start gap-2 text-sm text-secondary-700">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
								</svg>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<p class="mt-6 text-sm text-secondary-500">Precios en CLP + IVA. Para proyectos fuera de Chile, se ajustan a USD/EUR equivalente.</p>
	</div>
</Section>

<Section background="gray" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Preguntas frecuentes</h2>
		<div class="mt-8 divide-y divide-secondary-200">
			{#each faqs as faq (faq.question)}
				<div class="py-6">
					<h3 class="text-lg font-semibold text-secondary-900">{faq.question}</h3>
					<p class="mt-3 text-secondary-600">{faq.answer}</p>
				</div>
			{/each}
		</div>
		<div class="mt-10">
			<Button variant="primary" href="/contacto">Agendar diagnóstico gratuito (30 min)</Button>
		</div>
	</div>
</Section>

<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900">¿Tienes un problema técnico que no logras resolver?</h2>
		<p class="mt-4 text-lg text-secondary-700">
			La primera llamada de diagnóstico es gratuita y sin compromiso. Cuéntanos el problema y te
			decimos si podemos ayudarte — y cómo.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Agendar llamada gratuita</Button>
			<Button variant="outline" size="lg" href="/servicios">Ver todos los servicios</Button>
		</div>
	</div>
</Section>
