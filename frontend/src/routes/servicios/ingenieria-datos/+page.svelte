<script lang="ts">
	import { Button, Section, SEO, BreadcrumbSchema } from '$lib/components';

	const faqs = [
		{
			question: '¿Pueden trabajar con mis sistemas legacy (Oracle, SAP, planillas Excel)?',
			answer:
				'Sí. La mayoría de los proyectos de ingeniería de datos involucra fuentes heterogéneas: bases de datos relacionales antiguas, APIs REST, archivos CSV/Excel que llegan por correo, o sistemas de ERP como SAP o sistemas contables locales. Construimos conectores a medida para cada fuente y los integramos en un pipeline unificado. No descartamos ninguna fuente — si los datos están ahí, los podemos leer.'
		},
		{
			question: '¿Qué diferencia hay entre ETL y ELT?',
			answer:
				'En ETL (Extract, Transform, Load), los datos se transforman antes de cargarlos al destino — útil cuando el destino tiene restricciones de espacio o cuando la transformación es compleja. En ELT (Extract, Load, Transform), se cargan los datos crudos primero y se transforman dentro del data warehouse — mejor cuando el destino tiene suficiente capacidad de cómputo (como BigQuery o Snowflake). Para la mayoría de proyectos en Chile con data warehouse en PostgreSQL o DuckDB, ELT con dbt es la arquitectura más práctica y mantenible.'
		},
		{
			question: '¿Qué pasa si falla un pipeline en producción?',
			answer:
				'Los pipelines se construyen con reintentos automáticos, alertas por email o Slack cuando falla una tarea, y logs detallados para diagnóstico. En Airflow, cada tarea queda registrada con su estado, duración y error exacto. Diseñamos pipelines idempotentes — si se cae a mitad y se vuelve a ejecutar, no duplica datos. Para proyectos críticos incluimos un SLA de respuesta en el retainer de soporte.'
		},
		{
			question: '¿Necesito un data warehouse para empezar?',
			answer:
				'No necesariamente. Para proyectos pequeños (pocos millones de registros, un puñado de fuentes), PostgreSQL o DuckDB son suficientes y más simples de operar. Un data warehouse en la nube (BigQuery, Snowflake, Redshift) tiene sentido cuando hay volúmenes grandes, múltiples equipos consultando en paralelo, o necesidad de federación de datos. En el diagnóstico inicial evaluamos cuál es la arquitectura adecuada para tu volumen actual y el crecimiento esperado.'
		},
		{
			question: '¿En cuánto tiempo pueden automatizar un proceso manual de reportería?',
			answer:
				'Un reporte que hoy se hace manualmente en Excel (juntar datos de 3-4 fuentes, calcular KPIs, formatear) se puede automatizar en 2-4 semanas. El resultado es un pipeline que corre automáticamente (diario, semanal, en tiempo real según necesites) y envía el reporte por correo o lo publica en un dashboard. No vuelves a tocar el proceso manualmente.'
		},
		{
			question: '¿Qué es dbt y por qué lo usan?',
			answer:
				'dbt (data build tool) es el estándar actual para transformaciones dentro de data warehouses. Permite escribir las transformaciones en SQL con control de versiones, tests de calidad de datos automáticos, y documentación del linaje de datos (qué tabla vino de dónde). Es lo que hace que el trabajo de ingeniería de datos sea mantenible a largo plazo — no un montón de scripts SQL sueltos sin documentar.'
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
			title: 'Consolidación de fuentes heterogéneas',
			description: 'ERP, CRM, planillas Excel y APIs externas unificadas en un solo repositorio limpio y actualizado automáticamente.'
		},
		{
			title: 'Automatización de reportes',
			description: 'Reemplazar procesos manuales de reportería (Excel + email) por pipelines que generan y distribuyen informes sin intervención humana.'
		},
		{
			title: 'Data warehouse para analytics',
			description: 'Diseño de modelo dimensional, implementación con dbt, y conexión a herramientas de BI (Metabase, Power BI, Tableau).'
		},
		{
			title: 'Integración de APIs externas',
			description: 'Sincronización automática con proveedores, clientes o plataformas (Mercado Libre, SII, bancos, sistemas de facturación).'
		},
		{
			title: 'Migración de datos',
			description: 'Traslado de datos desde sistemas legacy a arquitecturas modernas, con validación de integridad y sin downtime.'
		},
		{
			title: 'Monitoreo de KPIs en tiempo real',
			description: 'Dashboards que se actualizan con datos frescos para operaciones, logística o ventas — sin esperar el cierre del día.'
		}
	];

	const pricing = [
		{
			name: 'Diagnóstico',
			price: 'desde $290.000',
			period: 'pago único',
			description: 'Auditoría del estado actual de tus datos: fuentes, calidad, duplicados, silos. Entregable: mapa de datos y propuesta de arquitectura.',
			includes: ['Inventario de fuentes de datos', 'Informe de calidad', 'Propuesta de arquitectura', 'Estimación de proyecto']
		},
		{
			name: 'Pipeline productivo',
			price: 'desde $890.000',
			period: 'pago único',
			description: 'Pipeline ETL/ELT completo con orquestación, monitoreo y documentación. Desde las fuentes hasta el destino final operativo.',
			includes: ['Conectores a todas las fuentes', 'Transformaciones con dbt o Pandas', 'Orquestación con Airflow', 'Alertas de fallo', 'Documentación completa'],
			featured: true
		},
		{
			name: 'Retainer mensual',
			price: 'desde $220.000',
			period: 'por mes',
			description: 'Soporte, ajustes y evolución de los pipelines existentes. Ideal cuando los datos o las fuentes cambian frecuentemente.',
			includes: ['Monitoreo de pipelines', 'Ajustes por cambios en fuentes', '4h de soporte técnico', 'Informe mensual de salud']
		}
	];
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<SEO
	title="Ingeniería de Datos en Chile"
	description="Pipelines ETL/ELT, data warehouses y automatización de reportes para organizaciones en Chile. dbt, Apache Airflow, PostgreSQL, DuckDB. Sin datos sueltos en Excel."
	url="https://territorio-digital.cl/servicios/ingenieria-datos"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Ingeniería de Datos', url: 'https://territorio-digital.cl/servicios/ingenieria-datos' }
	]}
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Ingeniería de Datos
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Pipelines robustos, data warehouses y automatización de reportería. Convertimos datos
			dispersos en silos o planillas en activos estratégicos disponibles cuando los necesitas.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Solicitar diagnóstico</Button>
			<Button variant="secondary" size="lg" href="/portfolio">Ver proyectos</Button>
		</div>
	</div>
</Section>

<Section background="white" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Qué ofrecemos</h2>
		<div class="mt-8 grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Pipelines ETL/ELT</h3>
				<p class="mt-2 text-sm text-secondary-600">Extracción desde múltiples fuentes, transformación con validación de calidad y carga al destino. Orquestados con Apache Airflow o herramientas equivalentes según el tamaño del proyecto.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Data Warehousing</h3>
				<p class="mt-2 text-sm text-secondary-600">Diseño de modelo dimensional, implementación con dbt, documentación de linaje. Compatible con PostgreSQL, DuckDB, BigQuery o Snowflake según el volumen y presupuesto.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Data Quality & Gobernanza</h3>
				<p class="mt-2 text-sm text-secondary-600">Tests automáticos de integridad, detección de anomalías en los datos, alertas cuando algo sale del rango esperado. Documentación del catálogo de datos.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Stream Processing</h3>
				<p class="mt-2 text-sm text-secondary-600">Para casos que requieren datos en tiempo real: procesamiento de eventos con Kafka, actualización de dashboards operacionales con latencia de segundos.</p>
			</div>
		</div>

		<div class="mt-10">
			<h3 class="text-lg font-semibold text-secondary-900">Stack tecnológico</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Python', 'dbt', 'Apache Airflow', 'PostgreSQL', 'DuckDB', 'MongoDB', 'Kafka', 'Spark', 'Docker', 'Kubernetes', 'Great Expectations', 'Metabase'] as tech (tech)}
					<span class="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</Section>

<Section background="gray" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Casos de uso</h2>
		<p class="mt-2 text-secondary-600">Los problemas de datos más frecuentes que resolvemos en organizaciones chilenas.</p>
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
		<h2 class="text-2xl font-bold text-secondary-900">Precios orientativos</h2>
		<p class="mt-2 text-secondary-600">Todos los proyectos se cotizan a medida según complejidad y número de fuentes. Estos rangos son un punto de partida.</p>
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
			<Button variant="primary" href="/contacto">Consultar por un proyecto</Button>
		</div>
	</div>
</Section>

<Section background="primary" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="text-3xl font-bold text-secondary-900">¿Tus datos están dispersos o sin explotar?</h2>
		<p class="mt-4 text-lg text-secondary-700">
			La primera llamada es gratuita. Mapeamos tus fuentes de datos actuales y te decimos qué se
			puede automatizar y en cuánto tiempo.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Agendar llamada</Button>
			<Button variant="outline" size="lg" href="/servicios">Ver todos los servicios</Button>
		</div>
	</div>
</Section>
