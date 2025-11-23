# Especificaciones de Imágenes Open Graph

Este documento detalla las imágenes Open Graph necesarias para el sitio web.

## Especificaciones Técnicas

- **Dimensiones recomendadas:** 1200x630 píxeles
- **Ratio de aspecto:** 1.91:1
- **Tamaño máximo:** 8 MB
- **Formato:** JPG o PNG (JPG preferido para menor peso)
- **Ubicación:** `/frontend/static/` (raíz del sitio web)

## Imágenes Requeridas

### 1. `/og-image.jpg` (Imagen principal/homepage)
- **Título:** "Territorio Digital"
- **Subtítulo:** "Desarrollo Web, Data Science y Análisis Satelital"
- **Elementos visuales:** Logo, iconos tecnológicos
- **Usado en:** Homepage (`/`)

### 2. `/og-servicios.jpg`
- **Título:** "Servicios Tecnológicos Integrales"
- **Subtítulo:** "Desarrollo Web, Data Science, Análisis Satelital"
- **Usado en:** `/servicios`

### 3. `/og-desarrollo-web.jpg`
- **Título:** "Desarrollo Web Moderno"
- **Subtítulo:** "SvelteKit, React, TypeScript"
- **Iconos:** Navegador web, código, responsive design
- **Usado en:** `/servicios/desarrollo-web`

### 4. `/og-data-science.jpg`
- **Título:** "Data Science & Machine Learning"
- **Subtítulo:** "Python, TensorFlow, scikit-learn"
- **Iconos:** Gráficos, redes neuronales, análisis
- **Usado en:** `/servicios/data-science`

### 5. `/og-analisis-satelital.jpg`
- **Título:** "Análisis Satelital & Geoespacial"
- **Subtítulo:** "GIS, Google Earth Engine, Python"
- **Iconos:** Satélite, mapas, imágenes satelitales
- **Usado en:** `/servicios/analisis-satelital`

### 6. `/og-ingenieria-datos.jpg`
- **Título:** "Ingeniería de Datos"
- **Subtítulo:** "ETL/ELT, Data Warehousing, Pipelines"
- **Iconos:** Flujo de datos, bases de datos, pipelines
- **Usado en:** `/servicios/ingenieria-datos`

### 7. `/og-asesoria.jpg`
- **Título:** "Asesoría Técnica"
- **Subtítulo:** "Arquitectura, Code Review, Performance"
- **Iconos:** Checklist, optimización, consultoría
- **Usado en:** `/servicios/asesoria`

## Paleta de Colores Recomendada

Basada en el diseño del sitio:
- **Primary:** #3B82F6 (Azul)
- **Secondary:** Tonos grises (#1F2937, #6B7280)
- **Fondo:** Blanco o gradiente suave
- **Texto:** Oscuro (#111827) sobre fondo claro

## Herramientas Sugeridas para Crear las Imágenes

1. **Figma** (recomendado) - Diseño profesional
2. **Canva** - Templates prediseñados
3. **Adobe Express** - Rápido y fácil
4. **Photoshop/Illustrator** - Control total

## Template Sugerido

```
┌─────────────────────────────────────────┐
│                                         │
│  [Logo Territorio Digital]              │
│                                         │
│  TÍTULO PRINCIPAL                       │
│  Subtítulo descriptivo                  │
│                                         │
│  [Iconos relevantes]                    │
│                                         │
│  territorio-digital.cl                  │
│                                         │
└─────────────────────────────────────────┘
```

## Imagen Temporal/Placeholder

Mientras tanto, se puede usar una imagen genérica o crear un SVG simple con el logo y texto.

## Verificación

Una vez creadas, verificar con:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## Notas

- Las imágenes deben ser representativas del contenido
- Incluir siempre el dominio "territorio-digital.cl"
- Mantener consistencia visual en todas las imágenes
- El texto debe ser legible incluso en miniaturas pequeñas
