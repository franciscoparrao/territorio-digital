# Sistema de Diseño - Territorio Digital

## 🎨 Paleta de Colores

### Colores Primarios
Basados en tonos de azul que transmiten profesionalismo, tecnología y confianza.

```css
primary-50:  #f0f9ff (muy claro - fondos sutiles)
primary-100: #e0f2fe
primary-200: #bae6fd
primary-300: #7dd3fc
primary-400: #38bdf8
primary-500: #0ea5e9 (base)
primary-600: #0284c7 (principal - botones, enlaces)
primary-700: #0369a1 (hover states)
primary-800: #075985
primary-900: #0c4a6e (muy oscuro - textos importantes)
primary-950: #082f49
```

**Uso:**
- `primary-600`: Color principal para CTAs, botones primarios, enlaces
- `primary-700`: Estados hover de botones primarios
- `primary-50`: Fondos sutiles para secciones destacadas
- `primary-900`: Textos importantes con alto contraste

### Colores Secundarios (Grises Neutros)
Para textos, bordes y fondos con estilo minimalista profesional.

```css
secondary-50:  #fafaf9 (fondos muy claros)
secondary-100: #f5f5f4
secondary-200: #e7e5e4 (bordes sutiles)
secondary-300: #d6d3d1
secondary-400: #a8a29e (textos deshabilitados)
secondary-500: #78716c (textos secundarios)
secondary-600: #57534e (textos principales alternativos)
secondary-700: #44403c
secondary-800: #292524 (textos oscuros)
secondary-900: #1c1917 (textos principales)
secondary-950: #0c0a09 (negro casi absoluto)
```

**Uso:**
- `secondary-900`: Textos principales (headings, body text importante)
- `secondary-600`: Textos secundarios
- `secondary-400`: Textos deshabilitados, placeholders
- `secondary-200`: Bordes y divisores
- `secondary-50`: Fondos de secciones alternadas

### Colores de Estado (Usando defaults de Tailwind)
```css
success: green-500 (#10b981)
warning: yellow-500 (#f59e0b)
error:   red-500 (#ef4444)
info:    blue-500 (#3b82f6)
```

---

## 📝 Tipografía

### Fuentes

#### Sans-serif (Principal)
**Inter** - Fuente principal para UI, textos de cuerpo y headings
- Moderna y altamente legible
- Excelente para interfaces digitales
- Variable font para mejor performance

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

#### Monospace (Código)
**JetBrains Mono** - Para bloques de código y contenido técnico
- Diseñada específicamente para desarrolladores
- Excelente legibilidad en tamaños pequeños
- Ligaduras opcionales para código

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Escala Tipográfica

```css
/* Headings */
h1: 3.75rem (60px) - font-bold - leading-tight
h2: 3rem (48px) - font-bold - leading-tight
h3: 2.25rem (36px) - font-semibold - leading-snug
h4: 1.875rem (30px) - font-semibold - leading-snug
h5: 1.5rem (24px) - font-medium - leading-normal
h6: 1.25rem (20px) - font-medium - leading-normal

/* Body */
text-xl: 1.25rem (20px) - subtítulos, lead paragraphs
text-lg: 1.125rem (18px) - textos destacados
text-base: 1rem (16px) - texto principal
text-sm: 0.875rem (14px) - textos pequeños, captions
text-xs: 0.75rem (12px) - labels, badges
```

### Pesos de Fuente
```css
font-light:     300
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
font-extrabold: 800
```

---

## 🔲 Espaciado

Sistema de espaciado basado en múltiplos de 4px (escala de Tailwind):

```css
0:   0px
1:   0.25rem (4px)
2:   0.5rem (8px)
3:   0.75rem (12px)
4:   1rem (16px)
5:   1.25rem (20px)
6:   1.5rem (24px)
8:   2rem (32px)
10:  2.5rem (40px)
12:  3rem (48px)
16:  4rem (64px)
20:  5rem (80px)
24:  6rem (96px)
```

**Convenciones:**
- Padding de componentes: `p-4` o `p-6`
- Margin entre secciones: `my-16` o `my-20`
- Spacing en cards: `p-6` o `p-8`

---

## 📐 Bordes y Sombras

### Border Radius
```css
rounded-none: 0
rounded-sm:   0.125rem (2px)
rounded:      0.25rem (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem (8px) - principal para cards
rounded-xl:   0.75rem (12px)
rounded-2xl:  1rem (16px)
rounded-full: 9999px (circular)
```

### Sombras
```css
shadow-sm:   /* Sombra sutil para bordes elevados */
shadow:      /* Sombra estándar para cards */
shadow-md:   /* Sombra media para elementos flotantes */
shadow-lg:   /* Sombra grande para modales */
shadow-xl:   /* Sombra extra grande para popups */
```

---

## 🎯 Componentes Base

### Botones

#### Botón Primario
```html
<button class="btn-primary">
  Contactar
</button>
```

CSS (ya definido en app.css):
```css
.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700
         px-6 py-3 rounded-lg font-medium
         transition-all duration-200
         focus:outline-none focus:ring-2 focus:ring-primary-500;
}
```

#### Botón Secundario
```html
<button class="btn-secondary">
  Ver más
</button>
```

### Contenedores

#### Container Principal
```html
<div class="container-custom">
  <!-- Contenido -->
</div>
```

Max-width de 1280px (7xl) con padding responsivo.

#### Secciones
```html
<section class="section">
  <!-- py-16 sm:py-20 lg:py-24 -->
</section>
```

---

## 📱 Responsive Breakpoints

```css
sm:  640px  @media (min-width: 640px)
md:  768px  @media (min-width: 768px)
lg:  1024px @media (min-width: 1024px)
xl:  1280px @media (min-width: 1280px)
2xl: 1536px @media (min-width: 1536px)
```

### Mobile First
Todos los estilos se escriben mobile-first, luego se expanden con breakpoints:

```html
<div class="text-base md:text-lg lg:text-xl">
  <!-- 16px en móvil, 18px en tablet, 20px en desktop -->
</div>
```

---

## ✨ Animaciones y Transiciones

### Duraciones
```css
duration-75:   75ms
duration-100:  100ms
duration-150:  150ms
duration-200:  200ms (estándar para la mayoría)
duration-300:  300ms
duration-500:  500ms
```

### Timing Functions
```css
ease-linear:    linear
ease-in:        cubic-bezier(0.4, 0, 1, 1)
ease-out:       cubic-bezier(0, 0, 0.2, 1)
ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1) (estándar)
```

### Ejemplo de Transición
```html
<a href="#" class="text-primary-600 hover:text-primary-700 transition-colors duration-200">
  Enlace
</a>
```

---

## 🎨 Estilo Visual General

### Principios de Diseño
1. **Minimalista**: Espacios en blanco generosos, pocas distracciones
2. **Profesional**: Colores sobrios, tipografía limpia
3. **Moderno**: Bordes redondeados sutiles, sombras suaves
4. **Accesible**: Alto contraste de texto, tamaños legibles
5. **Responsivo**: Mobile-first, fluido en todos los tamaños

### Ejemplos de Uso

#### Hero Section
```html
<section class="bg-gradient-to-br from-primary-50 to-white py-20">
  <div class="container-custom">
    <h1 class="text-5xl md:text-6xl font-bold text-secondary-900">
      Transformamos datos en decisiones inteligentes
    </h1>
    <p class="mt-6 text-xl text-secondary-600">
      Especialistas en desarrollo web, data science y análisis satelital
    </p>
    <button class="btn-primary mt-8">
      Comenzar proyecto
    </button>
  </div>
</section>
```

#### Card
```html
<div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
  <h3 class="text-2xl font-semibold text-secondary-900">Servicio</h3>
  <p class="mt-4 text-secondary-600">Descripción del servicio...</p>
</div>
```

---

**Última actualización:** 2025-11-08
