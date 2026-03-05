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
		id: 'mcp-gateway',
		title: 'MCP Gateway — Orquestador GIS con IA',
		shortDescription:
			'Plataforma de orquestación que integra 1,100+ herramientas geoespaciales de 5 backends en una interfaz unificada para LLMs.',
		fullDescription:
			'Capa de orquestación que agrega herramientas de OTB, QGIS, GRASS, SAGA y Planetary Computer en un solo protocolo MCP (Model Context Protocol), permitiendo que modelos de lenguaje ejecuten análisis geoespaciales complejos de forma autónoma.',
		category: 'geoespacial',
		tags: ['MCP', 'LLM', 'GIS', 'Orquestación', 'Open Source'],
		technologies: ['Python', 'MCP Protocol', 'OTB', 'QGIS', 'GRASS', 'SAGA', 'Planetary Computer'],
		year: 2025,
		featured: true,
		highlights: [
			'1,122 herramientas geoespaciales integradas',
			'5 backends GIS profesionales orquestados',
			'6 meta-tools para acceso unificado',
			'Motor de búsqueda inteligente de herramientas',
			'Reduce ~200K tokens de contexto a 6 herramientas',
			'Roadmap para 15+ backends adicionales'
		],
		metrics: [
			{ label: 'Herramientas', value: '1,122' },
			{ label: 'Backends', value: '5' },
			{ label: 'Reducción contexto', value: '97%' }
		]
	},
	{
		id: 'surtgis',
		title: 'SurtGIS — Plataforma GIS de Alto Rendimiento',
		shortDescription:
			'Motor de análisis geoespacial en Rust con 105 algoritmos, GUI desktop, WebAssembly y bindings Python. 2-20x más rápido que GDAL/SAGA.',
		fullDescription:
			'Plataforma GIS completa escrita desde cero en Rust sin dependencia de GDAL. Incluye 105 algoritmos en 9 categorías (terreno, hidrología, imágenes, clasificación), con deployment multiplataforma: CLI, GUI desktop (egui), WebAssembly para navegador y bindings Python vía PyO3.',
		category: 'geoespacial',
		tags: ['GIS', 'Rust', 'Alto Rendimiento', 'WebAssembly', 'Open Source'],
		technologies: ['Rust', 'egui', 'WebAssembly', 'PyO3', 'STAC', 'COG', 'Rayon'],
		year: 2025,
		featured: true,
		highlights: [
			'105 algoritmos en 9 categorías',
			'2-20x más rápido que GDAL, SAGA y WhiteboxTools',
			'Sin dependencia de GDAL — implementación nativa',
			'GUI desktop estilo SAGA con visor 3D',
			'33 algoritmos disponibles en WebAssembly',
			'Soporte nativo para datos cloud (STAC/COG)'
		],
		metrics: [
			{ label: 'Algoritmos', value: '105' },
			{ label: 'Speedup', value: '2-20x' },
			{ label: 'Plataformas', value: '5' }
		]
	},
	{
		id: 'chatbot-admision-usach',
		title: 'Chatbot de Admisión USACH',
		shortDescription:
			'Sistema de chatbot inteligente con IA para asistir a estudiantes con información sobre admisión, carreras y becas.',
		fullDescription:
			'Sistema completo de chatbot que utiliza OpenRouter API con sistema RAG para búsqueda inteligente de 1,770 FAQs. Implementa stemming Snowball en español, modales de carreras, y arquitectura fullstack con Go + React.',
		category: 'desarrollo-web',
		tags: ['Chatbot', 'IA', 'RAG', 'Educación', 'USACH'],
		technologies: ['Go', 'React', 'MongoDB', 'OpenRouter', 'Docker', 'Tailwind CSS', 'Vite'],
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
			{ label: 'Resolución', value: '70%+' }
		]
	},
	{
		id: 'crm-clinicas',
		title: 'CRM Clínicas — SaaS de Gestión Clínica',
		shortDescription:
			'Sistema multi-tenant de gestión integral para clínicas estéticas: agenda, fichas, pagos, facturación electrónica SII y chatbot IA.',
		fullDescription:
			'Plataforma SaaS completa en Rust (Actix-web) con arquitectura de microservicios y 8 crates internos. Incluye agenda con FullCalendar, fichas clínicas con galería fotográfica, integración con MercadoPago, facturación electrónica SII, programa de fidelización y chatbot con IA.',
		category: 'desarrollo-web',
		tags: ['SaaS', 'Salud', 'Multi-tenant', 'Facturación', 'Enterprise'],
		technologies: ['Rust', 'Actix-web', 'PostgreSQL', 'Redis', 'MercadoPago', 'OpenAI', 'Docker'],
		year: 2025,
		featured: true,
		highlights: [
			'Arquitectura multi-tenant (múltiples clínicas)',
			'Facturación electrónica integrada con SII',
			'Pagos online con MercadoPago',
			'Chatbot IA para agendamiento',
			'Fichas clínicas con galería antes/después',
			'Dashboard personalizable con drag-and-drop'
		],
		metrics: [
			{ label: 'Crates', value: '8' },
			{ label: 'Integraciones', value: '5+' },
			{ label: 'Roles', value: '3' }
		]
	},
	{
		id: 'agrowatch',
		title: 'AgroWatch — Observatorio Agroclimático',
		shortDescription:
			'Plataforma de inteligencia agrícola para pequeños agricultores chilenos con monitoreo hídrico, alertas fitosanitarias y cuaderno de campo digital.',
		fullDescription:
			'Observatorio agroclimático desarrollado para CITIAPS/USACH que combina datos satelitales, estaciones meteorológicas y alertas SAG en una PWA offline-first. Incluye integración con WhatsApp y SMS para zonas sin conectividad.',
		category: 'data-science',
		tags: ['Agricultura', 'IoT', 'PWA', 'Satelital', 'CITIAPS'],
		technologies: ['Nuxt 3', 'Go', 'MongoDB', 'MCP Gateway', 'Google Earth Engine', 'WhatsApp API'],
		year: 2025,
		featured: false,
		highlights: [
			'3 módulos: cuaderno de campo, monitoreo hídrico, alertas',
			'PWA offline-first para zonas rurales',
			'Integración WhatsApp y SMS',
			'Datos satelitales vía MCP Gateway',
			'Target: 285,000 pequeños agricultores'
		],
		metrics: [
			{ label: 'Módulos', value: '3' },
			{ label: 'Target', value: '285K agricultores' },
			{ label: 'Canales', value: 'Web + WhatsApp + SMS' }
		]
	},
	{
		id: 'sernapesca-dashboard',
		title: 'Dashboard SERNAPESCA',
		shortDescription:
			'Dashboard de trazabilidad y monitoreo de producción acuícola con visualización geográfica y múltiples perfiles de usuario.',
		fullDescription:
			'Plataforma de visualización para la trazabilidad de producción acuícola nacional. Soporta 4 roles de usuario (Director Nacional, Administrador Regional, Titular, Subsecretaría) con filtros por región, tipo de centro y declaraciones operacionales.',
		category: 'data-science',
		tags: ['Dashboard', 'Sector Público', 'Acuicultura', 'GIS', 'Trazabilidad'],
		technologies: ['React', 'Redux Toolkit', 'OpenLayers', 'Recharts', 'Ant Design', 'TanStack Query'],
		year: 2025,
		featured: false,
		highlights: [
			'4 perfiles de usuario con vistas diferenciadas',
			'Mapas interactivos con OpenLayers',
			'Tracking de declaraciones y producción',
			'Filtros multi-región y tipo de centro',
			'Integración con datos geográficos costeros'
		]
	},
	{
		id: 'chatbot-factory',
		title: 'Chatbot Factory — Plataforma Enterprise',
		shortDescription:
			'Plataforma para crear, desplegar y operar chatbots institucionales estandarizados con IA, analytics y múltiples canales.',
		fullDescription:
			'Sistema enterprise desarrollado para CITIAPS/USACH que consolida múltiples chatbots institucionales en una fábrica reutilizable. Soporta WhatsApp, Teams y web, con analytics en ClickHouse, conectores a SharePoint/Oracle/SAP y modelos de IA locales o cloud.',
		category: 'desarrollo-web',
		tags: ['Chatbot', 'Enterprise', 'Multi-canal', 'IA', 'CITIAPS'],
		technologies: ['Go', 'Nuxt 3', 'MongoDB', 'ClickHouse', 'OpenAI', 'Claude API', 'WhatsApp'],
		year: 2025,
		featured: false,
		highlights: [
			'5 chatbots institucionales consolidados',
			'Multi-canal: WhatsApp, Teams, Web',
			'Analytics con ClickHouse/InfluxDB',
			'Conectores empresariales (SharePoint, Oracle, SAP)',
			'70%+ resolución sin escalamiento humano'
		]
	},
	{
		id: 'wavemind',
		title: 'WaveMind — Análisis Musical con IA',
		shortDescription:
			'DAW inteligente que analiza audio para extraer notas, acordes, tonalidad, tempo y estructura usando deep learning.',
		fullDescription:
			'Aplicación de escritorio que combina IA (Basic Pitch, Demucs) con procesamiento de señales para generar partituras latentes desde audio crudo. Motor de audio en Rust para máximo rendimiento, interfaz con Tauri + Svelte.',
		category: 'machine-learning',
		tags: ['Audio', 'IA', 'Deep Learning', 'Música', 'Rust'],
		technologies: ['Python', 'Rust', 'Tauri', 'Svelte', 'librosa', 'Basic Pitch', 'Demucs'],
		year: 2025,
		featured: false,
		highlights: [
			'Transcripción polifónica con Basic Pitch (ONNX)',
			'Separación de fuentes con Demucs',
			'Detección de tonalidad con modulaciones',
			'Motor de audio en Rust (cpal + dasp)',
			'Multi-género: rock, clásica, bossa nova, electrónica'
		],
		metrics: [
			{ label: 'Precisión', value: 'Multi-género' },
			{ label: 'Engine', value: 'Rust' },
			{ label: 'UI', value: 'Tauri + Svelte' }
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
		year: 2025,
		featured: false,
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
		shortDescription:
			'Dashboard interactivo para visualización de datos de bienestar universitario.',
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
