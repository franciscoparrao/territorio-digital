export interface Project {
	id: string;
	title: string;
	shortDescription: string;
	fullDescription: string;
	category: ProjectCategory;
	tags: string[];
	technologies: string[];
	image?: string;
	githubUrl?: string;
	liveUrl?: string;
	year: number;
	featured: boolean;
	highlights?: string[];
	metrics?: {
		label: string;
		value: string;
	}[];
}

export type ProjectCategory =
	| 'desarrollo-web'
	| 'data-science'
	| 'analisis-satelital'
	| 'machine-learning'
	| 'geoespacial'
	| 'investigacion';

export const projects: Project[] = [
	{
		id: 'chatbot-admision-usach',
		title: 'Chatbot de Admisión USACH',
		shortDescription:
			'Sistema de chatbot inteligente con IA para asistir a estudiantes con información sobre admisión, carreras y becas.',
		fullDescription:
			'Sistema completo de chatbot que utiliza OpenRouter API (GPT-5-nano) con sistema RAG para búsqueda inteligente de 1,770 FAQs. Implementa stemming Snowball en español, modales de carreras, y arquitectura fullstack con Go + React.',
		category: 'desarrollo-web',
		tags: ['Chatbot', 'IA', 'RAG', 'Educación', 'USACH'],
		technologies: ['Go', 'React', 'MongoDB', 'OpenRouter', 'Docker', 'Tailwind CSS', 'Vite'],
		githubUrl: 'https://github.com/citiaps/proyecto-chatbot-admision-usach',
		year: 2024,
		featured: true,
		highlights: [
			'1,770 FAQs con búsqueda inteligente mediante stemming',
			'Integración con OpenRouter para múltiples modelos LLM',
			'71 carreras con información detallada',
			'Sistema de sesiones con contexto conversacional',
			'Respuestas con formato markdown y enlaces clickeables'
		],
		metrics: [
			{ label: 'FAQs', value: '1,770' },
			{ label: 'Carreras', value: '71' },
			{ label: 'Modelo', value: 'GPT-5-nano' }
		]
	},
	{
		id: 'google-earth-engine-research',
		title: 'Análisis Sistemático Google Earth Engine',
		shortDescription:
			'Revisión sistemática de 6,358 publicaciones sobre GEE en Web of Science con enfoque en oportunidades para Chile.',
		fullDescription:
			'Proyecto de investigación que analiza la producción científica global sobre Google Earth Engine (2007-2025), identificando oportunidades de investigación para Chile en glaciares, sequía, ecosistemas áridos e incendios forestales.',
		category: 'investigacion',
		tags: ['Teledetección', 'GEE', 'Investigación', 'Chile', 'Bibliometría'],
		technologies: ['Python', 'Web of Science', 'Google Earth Engine', 'Análisis Bibliométrico'],
		githubUrl: 'https://github.com/franciscoparrao/Google-earth-engine',
		year: 2025,
		featured: true,
		highlights: [
			'Análisis de 6,358 publicaciones científicas',
			'Identificación de 21 publicaciones chilenas',
			'Propuesta de 4 áreas prioritarias para Chile',
			'Análisis de ventajas comparativas únicas',
			'Roadmap de investigación estratégica'
		],
		metrics: [
			{ label: 'Publicaciones', value: '6,358' },
			{ label: 'Países', value: '100+' },
			{ label: 'Período', value: '2007-2025' }
		]
	},
	{
		id: 'terrapy',
		title: 'Terrapy - Geospatial Analysis Package',
		shortDescription:
			'Paquete Python de alto rendimiento para análisis geoespacial con backend en Rust.',
		fullDescription:
			'Framework completo para análisis geoespacial que combina lo mejor de Terra (R), WhiteboxTools y SAGA GIS en una API unificada. Backend en Rust/C++ para máximo rendimiento, con soporte para análisis de terreno, hidrología y operaciones raster.',
		category: 'geoespacial',
		tags: ['Geoespacial', 'Python', 'Rust', 'GIS', 'Open Source'],
		technologies: ['Python', 'Rust', 'GDAL', 'NumPy', 'PyTorch', 'TensorFlow'],
		githubUrl: 'https://github.com/franciscoparrao/terrapy',
		year: 2024,
		featured: true,
		highlights: [
			'Backend Rust para máximo rendimiento',
			'API unificada inspirada en Terra R',
			'Análisis de terreno (slope, aspect, hillshade, TPI)',
			'Funciones hidrológicas (flow direction, watersheds)',
			'Integración con ML (PyTorch, TensorFlow)',
			'Soporte para datos cloud (STAC, Google Earth Engine)'
		],
		metrics: [
			{ label: 'Lenguajes', value: 'Python + Rust' },
			{ label: 'Performance', value: 'C++ Backend' },
			{ label: 'Estado', value: 'Fase 4' }
		]
	},
	{
		id: 'machine-learning-algorithms',
		title: 'Adaptive Feature Boost (AFB)',
		shortDescription:
			'Algoritmo avanzado de machine learning con optimización adaptativa de características.',
		fullDescription:
			'Investigación y desarrollo de un nuevo algoritmo de gradient boosting con selección adaptativa de características. Incluye análisis comparativo con XGBoost, CatBoost en múltiples datasets, y preparación de paper para JMLR.',
		category: 'machine-learning',
		tags: ['Machine Learning', 'Gradient Boosting', 'Investigación', 'JMLR'],
		technologies: ['Python', 'Scikit-learn', 'XGBoost', 'CatBoost', 'Optuna', 'NumPy'],
		year: 2024,
		featured: true,
		highlights: [
			'Algoritmo DDC (Dynamic Discriminant Cascade)',
			'Optimización con Optuna en 7+ datasets',
			'Análisis estadístico de rendimiento',
			'Paper en preparación para JMLR',
			'Estudios de ablación y validación'
		],
		metrics: [
			{ label: 'Datasets', value: '7+' },
			{ label: 'Versiones', value: '5' },
			{ label: 'Target', value: 'JMLR' }
		]
	},
	{
		id: 'allimpresiones',
		title: 'Sistema de Gestión para Imprenta',
		shortDescription:
			'Sistema web fullstack para gestión de cotizaciones y clientes de imprenta digital.',
		fullDescription:
			'Aplicación completa para gestión de imprenta con autenticación JWT, roles y permisos, sistema de cotizaciones, gestión de clientes y catálogo de productos. Stack moderno con Rust + SvelteKit + PostgreSQL.',
		category: 'desarrollo-web',
		tags: ['ERP', 'Gestión', 'Imprenta', 'Fullstack'],
		technologies: ['Rust', 'Axum', 'SvelteKit', 'PostgreSQL', 'JWT', 'Docker'],
		year: 2025,
		featured: false,
		highlights: [
			'Autenticación JWT completa',
			'Sistema de roles y permisos',
			'Gestión de cotizaciones',
			'Panel de administración',
			'API REST en Rust'
		]
	},
	{
		id: 'junaeb-deployment',
		title: 'Sistema de Gestión JUNAEB',
		shortDescription: 'Plataforma para gestión de beneficios estudiantiles de JUNAEB.',
		fullDescription:
			'Sistema completo para la gestión de beneficios estudiantiles con múltiples módulos para administración, seguimiento y reporting. Implementa arquitectura escalable con microservicios.',
		category: 'desarrollo-web',
		tags: ['Gestión Pública', 'Educación', 'Beneficios', 'Enterprise'],
		technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'Microservicios'],
		year: 2024,
		featured: false,
		highlights: [
			'Gestión de beneficios estudiantiles',
			'Arquitectura de microservicios',
			'Sistema de reporting completo',
			'Integración con sistemas gubernamentales'
		]
	},
	{
		id: 'dashboard-upbp',
		title: 'Dashboard UPBP',
		shortDescription: 'Dashboard interactivo para visualización de datos de bienestar universitario.',
		fullDescription:
			'Plataforma de visualización de datos para la Unidad de Promoción de Bienestar y Permanencia, con gráficos interactivos, métricas en tiempo real y exportación de reportes.',
		category: 'data-science',
		tags: ['Dashboard', 'Visualización', 'BI', 'Universidad'],
		technologies: ['React', 'D3.js', 'Python', 'Pandas', 'FastAPI'],
		year: 2025,
		featured: false,
		highlights: [
			'Visualizaciones interactivas con D3.js',
			'Métricas en tiempo real',
			'Exportación de reportes',
			'Análisis de datos estudiantiles'
		]
	},
	{
		id: 'control-asistencia',
		title: 'Sistema de Control de Asistencia',
		shortDescription: 'Plataforma para registro y control de asistencia con análisis estadístico.',
		fullDescription:
			'Sistema completo para gestión de asistencia con registro automático, generación de reportes, análisis de patrones y alertas tempranas de ausentismo.',
		category: 'desarrollo-web',
		tags: ['Gestión', 'Asistencia', 'Educación', 'Analytics'],
		technologies: ['SvelteKit', 'Python', 'MongoDB', 'Chart.js'],
		year: 2024,
		featured: false,
		highlights: [
			'Registro automático de asistencia',
			'Análisis de patrones de ausentismo',
			'Alertas tempranas',
			'Reportes estadísticos'
		]
	}
];

export const categories: { id: ProjectCategory; name: string; description: string }[] = [
	{
		id: 'desarrollo-web',
		name: 'Desarrollo Web',
		description: 'Aplicaciones web modernas y escalables'
	},
	{
		id: 'data-science',
		name: 'Data Science',
		description: 'Análisis de datos y visualización'
	},
	{
		id: 'analisis-satelital',
		name: 'Análisis Satelital',
		description: 'Procesamiento de imágenes satelitales'
	},
	{
		id: 'machine-learning',
		name: 'Machine Learning',
		description: 'Algoritmos y modelos predictivos'
	},
	{
		id: 'geoespacial',
		name: 'Análisis Geoespacial',
		description: 'GIS y análisis de datos espaciales'
	},
	{
		id: 'investigacion',
		name: 'Investigación',
		description: 'Proyectos de investigación científica'
	}
];
