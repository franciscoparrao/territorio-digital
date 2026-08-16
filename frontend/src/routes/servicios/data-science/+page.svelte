<script lang="ts">
	import { Button, Card, Section, SEO, BreadcrumbSchema } from '$lib/components';

	const faqs = [
		{
			question: '¿En qué se diferencia de hacer el análisis en Excel?',
			answer:
				'Excel es adecuado para exploración manual de hasta unos pocos miles de filas. Con Python y librerías especializadas podemos procesar millones de registros, automatizar el análisis completo (sin paso manual), aplicar modelos estadísticos o de ML que Excel no puede ejecutar, y entregar el resultado como un pipeline reproducible: cuando llegan datos nuevos, el análisis se corre de nuevo con un solo comando. El output suele ser un dashboard interactivo, una API REST con el modelo, o un reporte automatizado.'
		},
		{
			question: '¿Cuántos datos necesito para entrenar un modelo de machine learning?',
			answer:
				'Depende del tipo de problema. Para clasificación o regresión tabular (los casos más frecuentes en empresas), modelos como XGBoost o Random Forest pueden funcionar bien desde 1.000–5.000 registros con variables bien elegidas. Para deep learning o visión por computadora, generalmente se necesitan decenas de miles. Si tienes pocos datos, existen técnicas de augmentation, transfer learning y modelos probabilísticos que permiten trabajar igual. En la primera reunión revisamos tus datos reales y te damos una estimación honesta de qué es factible.'
		},
		{
			question: '¿El modelo queda funcionando en mis sistemas o necesito mantenerlo con ustedes?',
			answer:
				'Los modelos se entregan desplegados y operativos en tu infraestructura (o en cloud si lo prefieres). El código fuente es tuyo. Documentamos todo para que tu equipo técnico pueda mantenerlo. Si prefieres un retainer mensual para monitorear drift del modelo, re-entrenamiento periódico y ajustes, lo ofrecemos desde $250.000 CLP/mes. Pero no es obligatorio — muchos clientes se llevan el modelo y lo administran ellos mismos sin problemas.'
		},
		{
			question: '¿Cuánto tiempo toma un proyecto de machine learning?',
			answer:
				'Un análisis exploratorio con entregable (informe + visualizaciones) toma 1–2 semanas. Un modelo predictivo completo — desde limpieza de datos hasta deployment en producción con monitoreo — toma entre 4 y 10 semanas según la complejidad. Los proyectos con datos desordenados, múltiples fuentes o integraciones a sistemas legacy toman más. Trabajamos en sprints con entregables intermedios para que puedas ver el avance cada semana.'
		},
		{
			question: '¿Pueden trabajar con datos sensibles o confidenciales?',
			answer:
				'Sí. Trabajamos bajo NDA desde el inicio y podemos operar con datos sin salir de tu infraestructura si es necesario (procesamiento on-premise). Para proyectos con datos personales, aplicamos técnicas de anonimización o pseudonimización compatibles con Ley 19.628 (Chile) y, cuando aplica, con GDPR. Si el proyecto involucra datos de salud, financieros o de menores, lo coordinamos con tu área legal desde el comienzo.'
		},
		{
			question: '¿Qué entregables recibo al final del proyecto?',
			answer:
				'Depende del proyecto, pero el paquete estándar incluye: (1) modelo entrenado y desplegado, (2) código fuente documentado con tests, (3) reporte técnico con métricas de rendimiento (accuracy, F1, RMSE, etc.), (4) documentación de uso para tu equipo, y (5) sesión de traspaso. Si el proyecto incluye dashboard o visualización, también se entrega configurado. Nada queda como caja negra.'
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
			title: 'Predicción de demanda',
			description: 'Forecasting de ventas, inventario y recursos para retail, logística y manufactura. Reducción de quiebre de stock y sobrestock.'
		},
		{
			title: 'Modelos de churn y retención',
			description: 'Identificación de clientes en riesgo de abandono antes de que ocurra, con priorización para acciones de retención.'
		},
		{
			title: 'Detección de anomalías',
			description: 'Fraude financiero, fallas de equipos industriales, desviaciones en procesos de calidad — detección automática sin reglas manuales.'
		},
		{
			title: 'Clasificación de documentos e imágenes',
			description: 'Categorización automática de facturas, contratos, formularios o imágenes de producto con NLP y visión por computadora.'
		},
		{
			title: 'Análisis de riesgo geoespacial',
			description: 'Modelos de susceptibilidad a remociones en masa, inundaciones y sequía para EIAs, planes de emergencia y seguros.'
		},
		{
			title: 'Dashboards y reportería automática',
			description: 'Reemplazar reportes manuales en Excel por dashboards interactivos que se actualizan solos cuando llegan datos nuevos.'
		}
	];

	const pricing = [
		{
			name: 'Diagnóstico',
			price: 'desde $390.000',
			period: 'pago único',
			description: 'Análisis exploratorio de tus datos, identificación de oportunidades y entrega de un roadmap con los modelos más prometedores para tu negocio.',
			includes: ['Análisis exploratorio completo', 'Reporte de calidad de datos', 'Propuesta de modelos', 'Sesión de presentación (1h)']
		},
		{
			name: 'Modelo en producción',
			price: 'desde $1.490.000',
			period: 'pago único',
			description: 'Desde limpieza de datos hasta deployment del modelo en tu infraestructura, con código documentado y sesión de traspaso.',
			includes: ['Modelo entrenado y desplegado', 'Código fuente con tests', 'Reporte de métricas', 'Documentación de uso', '90 días de garantía'],
			featured: true
		},
		{
			name: 'Retainer mensual',
			price: 'desde $250.000',
			period: 'por mes',
			description: 'Monitoreo de drift, re-entrenamiento periódico, ajustes de modelos y soporte técnico para equipos que ya tienen modelos en producción.',
			includes: ['Monitoreo de drift mensual', 'Re-entrenamiento cuando corresponda', '4h de soporte técnico', 'Informe mensual']
		}
	];
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<SEO
	title="Data Science & Machine Learning en Chile"
	description="Modelos predictivos, análisis de datos y machine learning para organizaciones en Chile. Desde diagnóstico hasta deployment en producción. Python, scikit-learn, XGBoost."
	url="https://territorio-digital.cl/servicios/data-science"
	type="website"
/>

<BreadcrumbSchema
	items={[
		{ name: 'Inicio', url: 'https://territorio-digital.cl' },
		{ name: 'Servicios', url: 'https://territorio-digital.cl/servicios' },
		{ name: 'Data Science & ML', url: 'https://territorio-digital.cl/servicios/data-science' }
	]}
/>

<Section background="gradient" padding="xl">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Data Science & Machine Learning
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			Modelos predictivos y análisis de datos que generan valor real: menos tiempo en Excel, más
			decisiones respaldadas en datos. Con rigor metodológico de investigación científica aplicado a
			problemas de negocio.
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
				<h3 class="font-semibold text-secondary-900">Análisis Exploratorio</h3>
				<p class="mt-2 text-sm text-secondary-600">Diagnóstico de calidad de datos, descubrimiento de patrones, tendencias y anomalías. Entregable: reporte ejecutivo + visualizaciones interactivas.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Modelos Predictivos</h3>
				<p class="mt-2 text-sm text-secondary-600">Forecasting, clasificación y regresión con validación cruzada espacial o temporal. Modelos interpretables con explicabilidad (SHAP, importancia de variables).</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">Deep Learning & NLP</h3>
				<p class="mt-2 text-sm text-secondary-600">Redes neuronales para imágenes, series temporales y texto. Transfer learning desde modelos pre-entrenados para minimizar datos requeridos.</p>
			</div>
			<div class="rounded-lg border border-secondary-200 p-5">
				<h3 class="font-semibold text-secondary-900">MLOps & Deployment</h3>
				<p class="mt-2 text-sm text-secondary-600">Modelos en producción como API REST o batch job. Monitoreo de drift, re-entrenamiento automatizado, CI/CD para ML.</p>
			</div>
		</div>

		<div class="mt-10">
			<h3 class="text-lg font-semibold text-secondary-900">Stack tecnológico</h3>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each ['Python', 'scikit-learn', 'XGBoost', 'CatBoost', 'PyTorch', 'TensorFlow', 'Pandas', 'Polars', 'MLflow', 'FastAPI', 'Docker', 'Jupyter'] as tech (tech)}
					<span class="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</Section>

<Section background="gray" padding="lg">
	<div class="mx-auto max-w-4xl">
		<h2 class="text-2xl font-bold text-secondary-900">Casos de uso</h2>
		<p class="mt-2 text-secondary-600">Problemas reales que resolvemos con machine learning y análisis de datos.</p>
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
		<p class="mt-2 text-secondary-600">Todos los proyectos se cotizan a medida. Estos rangos te ayudan a evaluar el presupuesto inicial.</p>
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
		<h2 class="text-3xl font-bold text-secondary-900">¿Tienes datos que no estás aprovechando?</h2>
		<p class="mt-4 text-lg text-secondary-700">
			La primera conversación es gratuita. Revisamos tus datos, tu problema y te decimos qué es
			factible antes de cotizar.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<Button variant="primary" size="lg" href="/contacto">Agendar llamada</Button>
			<Button variant="outline" size="lg" href="/servicios">Ver todos los servicios</Button>
		</div>
	</div>
</Section>
