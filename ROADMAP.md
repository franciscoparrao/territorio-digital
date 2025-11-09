# Hoja de Ruta - Territorio Digital

**Empresa:** Territorio Digital
**Proyecto:** Sitio web corporativo multi-página
**Stack:** SvelteKit + Rust Backend
**Estilo:** Minimalista y profesional
**Fecha inicio:** 2025-11-07

---

## 🎯 Visión General

Desarrollar un sitio web profesional multi-página que posicione la empresa como referente en:
- Desarrollo Web
- Data Science & Machine Learning
- Análisis Satelital & Geoespacial
- Ingeniería de Datos
- Asesoría Técnica

---

## 📋 Fases del Proyecto

### **FASE 1: Setup & Fundamentos**
**Duración estimada:** 1-2 días

#### Hito 1.1: Configuración Inicial
- [x] Decidir stack final: SvelteKit + Rust Backend
- [x] Definir nombre de la empresa: Territorio Digital
- [ ] Crear proyecto SvelteKit
- [ ] Crear proyecto Rust Backend (Axum/Actix-web)
- [ ] Configurar estructura de carpetas (monorepo)
- [ ] Setup de Git y control de versiones
- [ ] Configurar herramientas de desarrollo (ESLint, Prettier, TypeScript, Rustfmt)

#### Hito 1.2: Diseño & Branding
- [ ] Definir paleta de colores (minimalista/profesional)
- [ ] Seleccionar tipografías
- [ ] Crear logo o marca visual básica
- [ ] Diseñar wireframes de páginas principales
- [ ] Definir sistema de diseño (componentes base)

---

### **FASE 2: Desarrollo Core**
**Duración estimada:** 1-2 semanas

#### Hito 2.1: Estructura Base
- [ ] Implementar layout principal (header, footer, navegación)
- [ ] Sistema de routing entre páginas
- [ ] Componentes reutilizables base (Button, Card, Section)
- [ ] Responsive design base
- [ ] Sistema de navegación móvil (hamburger menu)

#### Hito 2.2: Páginas Principales
- [ ] **Home**
  - Hero section con propuesta de valor
  - Resumen de servicios
  - Call-to-actions
  - Sección de clientes/testimonios (opcional)

- [ ] **Servicios** (/servicios)
  - Página principal de servicios
  - Subpáginas individuales por servicio:
    - Desarrollo Web
    - Data Science & ML
    - Análisis Satelital
    - Ingeniería de Datos
    - Asesoría Técnica

- [ ] **Sobre mí** (/about)
  - Presentación profesional
  - Experiencia y expertise
  - Tecnologías y herramientas
  - Timeline de carrera

- [ ] **Contacto** (/contacto)
  - Formulario de contacto funcional
  - Información de contacto
  - Mapa o ubicación (si aplica)
  - Enlaces a redes sociales/LinkedIn

---

### **FASE 3: Características Avanzadas**
**Duración estimada:** 2-3 semanas

#### Hito 3.1: Portfolio
- [ ] Diseño de página de portfolio
- [ ] Sistema de filtrado por categorías
- [ ] Cards de proyectos
- [ ] Páginas de detalle de cada proyecto
- [ ] Integración de imágenes/screenshots
- [ ] Sección de resultados/impacto

**Proyectos a incluir:**
- Casos de desarrollo web
- Proyectos de análisis de datos
- Ejemplos de análisis satelital
- Automatizaciones realizadas

#### Hito 3.2: Sistema de Blog
- [ ] Arquitectura del blog (Markdown-based)
- [ ] Página de listado de artículos
- [ ] Página de detalle de artículo
- [ ] Sistema de categorías/tags
- [ ] Búsqueda de artículos
- [ ] RSS feed (opcional)
- [ ] Sintaxis highlighting para código

**Contenidos iniciales sugeridos:**
- "Introducción al análisis satelital con Python"
- "Cómo implementar ML en tu negocio"
- "5 casos de uso de datos geoespaciales"
- "Stack tecnológico moderno para 2025"

#### Hito 3.3: Demos Interactivas
- [ ] Página de demos
- [ ] **Demo 1: Análisis Satelital**
  - Mapa interactivo (Leaflet/MapLibre)
  - Visualización de imágenes satelitales
  - Ejemplo de clasificación de cobertura terrestre

- [ ] **Demo 2: Visualización de Datos**
  - Dashboard interactivo
  - Gráficos dinámicos (D3.js/Chart.js)
  - Ejemplo de insights de datos

- [ ] **Demo 3: ML en Acción** (opcional)
  - Ejemplo de predicción en tiempo real
  - Visualización de modelo de ML

---

### **FASE 4: Backend & Funcionalidades**
**Duración estimada:** 1-2 semanas

#### Hito 4.1: Backend API
- [x] Decidir arquitectura: Rust backend separado (Axum/Actix-web)
- [ ] Implementar API para formulario de contacto
- [ ] Sistema de envío de emails
- [ ] Validación de formularios
- [ ] Rate limiting / protección spam
- [ ] Base de datos (si es necesario)

#### Hito 4.2: CMS para Blog
- [ ] Sistema de gestión de contenido
- [ ] Parser de Markdown
- [ ] Metadata de artículos (fecha, autor, tags)
- [ ] Generación automática de previews
- [ ] Sistema de drafts vs publicados

---

### **FASE 5: Optimización & SEO**
**Duración estimada:** 1 semana

#### Hito 5.1: Performance
- [ ] Optimización de imágenes (WebP, lazy loading)
- [ ] Code splitting
- [ ] Minificación de assets
- [ ] Caché strategies
- [ ] Lighthouse score > 90

#### Hito 5.2: SEO
- [ ] Meta tags en todas las páginas
- [ ] Open Graph tags (para redes sociales)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Schema.org markup (JSON-LD)
- [ ] Análisis de keywords
- [ ] URLs SEO-friendly

#### Hito 5.3: Accesibilidad
- [ ] Navegación por teclado
- [ ] ARIA labels
- [ ] Contraste de colores adecuado
- [ ] Alt text en imágenes
- [ ] Test con screen readers

---

### **FASE 6: Testing & Deploy**
**Duración estimada:** 3-5 días

#### Hito 6.1: Testing
- [ ] Tests unitarios (componentes clave)
- [ ] Tests de integración (formularios, navegación)
- [ ] Tests E2E con Playwright
- [ ] Tests cross-browser
- [ ] Tests en dispositivos móviles

#### Hito 6.2: Deployment
- [ ] Configurar CI/CD
- [ ] Seleccionar hosting (Vercel/Netlify/VPS)
- [ ] Configurar dominio
- [ ] Certificado SSL
- [ ] Deploy a producción
- [ ] Configurar analytics (Google Analytics/Plausible)
- [ ] Configurar monitoreo de errores (Sentry)

---

## 🚀 Post-Launch

### Mantenimiento & Mejoras Continuas
- [ ] Publicar primer artículo de blog
- [ ] Agregar nuevos casos al portfolio
- [ ] Recopilar feedback de usuarios
- [ ] Iteraciones de diseño basadas en analytics
- [ ] Actualizaciones de contenido regulares

### Mejoras Futuras (Backlog)
- [ ] Versión en inglés del sitio
- [ ] Sistema de newsletters
- [ ] Integración con GitHub para mostrar contribuciones
- [ ] Chatbot con IA para consultas
- [ ] Calculadora/estimador de proyectos
- [ ] Área de cliente con login
- [ ] API pública para demos

---

## 📊 Métricas de Éxito

**Técnicas:**
- Lighthouse Score > 90 en todas las categorías
- Tiempo de carga < 2 segundos
- 100% responsive (mobile, tablet, desktop)
- 0 errores de consola
- Cobertura de tests > 70%

**Negocio:**
- Al menos 3 contactos/leads por mes
- 500+ visitas mensuales en 3 meses
- 10+ artículos de blog en 6 meses
- Presencia en primera página de Google para keywords clave

---

## 🛠️ Stack Tecnológico Propuesto

### Frontend
- **Framework:** SvelteKit
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS o CSS vanilla modular
- **Mapas:** Leaflet / MapLibre GL
- **Gráficos:** D3.js / Chart.js
- **Animaciones:** Svelte transitions + CSS

### Backend (Seleccionado)
- **Framework:** Actix-web o Axum (Rust)
- **Base de datos:** PostgreSQL + SQLx
- **Email:** Lettre (Rust) o servicio externo (SendGrid/Resend)
- **Serialización:** Serde
- **Validación:** Validator

### Contenido
- **Blog:** Markdown + frontmatter
- **CMS:** Sistema custom o Decap CMS (opcional)

### DevOps
- **Control de versiones:** Git + GitHub
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (recomendado) / Netlify / VPS
- **Analytics:** Plausible o Google Analytics
- **Monitoreo:** Sentry

---

## 📝 Notas

- Priorizar MVP (Minimum Viable Product) antes de características avanzadas
- Iterar basándose en feedback real de usuarios
- Mantener el diseño minimalista y enfocado en conversión
- Documentar decisiones técnicas importantes
- Hacer commits frecuentes con mensajes descriptivos

---

**Última actualización:** 2025-11-07
**Próxima revisión:** Después de completar FASE 1
