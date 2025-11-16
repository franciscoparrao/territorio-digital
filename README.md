# Territorio Digital

Sitio web corporativo para Territorio Digital - Especialistas en desarrollo web, análisis satelital, data science y soluciones tecnológicas inteligentes.

## 🚀 Stack Tecnológico

### Frontend
- **Framework:** SvelteKit 2.47.1
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS v3
- **Blog:** mdsvex (Markdown para Svelte)
- **SEO:** Sitemap, robots.txt, structured data

### Backend
- **Framework:** Axum (Rust 1.83)
- **Runtime:** Tokio
- **Base de datos:** MongoDB 7.0
- **Email:** Lettre (SMTP)

### Infraestructura
- **Contenedores:** Docker + Docker Compose
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt / Certbot
- **Hosting:** Digital Ocean
- **Dominio:** territorio-digital.cl

## 📁 Estructura del Proyecto

```
territorio-digital/
├── frontend/              # Aplicación SvelteKit
│   ├── src/
│   │   ├── routes/       # Páginas y rutas
│   │   │   ├── blog/    # Sistema de blog con mdsvex
│   │   │   └── portfolio/ # Portfolio de proyectos
│   │   ├── lib/          # Componentes y utilidades
│   │   └── posts/        # Artículos en Markdown
│   ├── static/           # Assets estáticos
│   ├── Dockerfile        # Imagen Docker para producción
│   └── package.json
│
├── backend/              # API en Rust con Axum
│   ├── src/
│   │   └── main.rs      # API REST + MongoDB
│   ├── Cargo.toml
│   ├── Dockerfile        # Imagen Docker para producción
│   └── .env.example
│
├── docker-compose.yml    # Orquestación de servicios
├── nginx.conf           # Configuración de reverse proxy
├── deploy.sh            # Script de deploy automatizado
├── setup-server.sh      # Setup inicial del servidor
├── DEPLOY.md            # Guía completa de deployment
├── ROADMAP.md           # Hoja de ruta del proyecto
└── README.md            # Este archivo
```

## 🛠️ Instalación y Desarrollo

### Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Rust** >= 1.70
- **MongoDB** >= 6.0 (corriendo en puerto 27019)

### Frontend (SvelteKit)

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Backend (Rust/Axum)

```bash
cd backend

# Copiar archivo de variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones
nano .env

# Ejecutar en modo desarrollo
cargo run
```

El backend estará disponible en `http://localhost:3000`

#### Endpoints Disponibles

- `GET /` - Raíz de la API
- `GET /health` - Health check
- `POST /api/contact` - Formulario de contacto (envía email)

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
cargo test
```

## 📦 Build para Producción

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview del build
```

### Backend
```bash
cd backend
cargo build --release
```

El binario estará en `backend/target/release/territorio-digital-api`

## 🚢 Deployment

Esta aplicación está configurada para despliegue en **Digital Ocean** usando Docker.

### Deploy Completo (Recomendado)

Ver la guía completa en [DEPLOY.md](./DEPLOY.md) que incluye:

- Configuración del servidor Digital Ocean
- Setup de dominio `territorio-digital.cl`
- Configuración SSL con Let's Encrypt
- Monitoreo y mantenimiento
- Troubleshooting

### Quick Start - Deploy Local con Docker

```bash
# 1. Configurar variables de entorno
cp .env.production.example .env.production
nano .env.production  # Editar con tus credenciales

# 2. Build y deploy
./deploy.sh

# O manualmente:
docker compose --env-file .env.production up -d --build
```

### Deploy en Servidor

```bash
# 1. Setup inicial del servidor (una sola vez)
curl -fsSL https://raw.githubusercontent.com/franciscoparrao/territorio-digital/master/setup-server.sh | sudo bash

# 2. Deploy de la aplicación
./deploy.sh
```

La aplicación estará disponible en:
- **Producción:** https://territorio-digital.cl
- **API:** https://territorio-digital.cl/api

## 📝 Servicios

- **Desarrollo Web** - Aplicaciones web modernas y escalables
- **Data Science & ML** - Análisis de datos y modelos predictivos
- **Análisis Satelital** - Procesamiento de imágenes satelitales y GIS
- **Ingeniería de Datos** - Pipelines de datos y arquitecturas modernas
- **Asesoría Técnica** - Consultoría en arquitectura y optimización

## 🗺️ Roadmap

Ver [ROADMAP.md](./ROADMAP.md) para la hoja de ruta detallada del proyecto.

## 📄 Licencia

Propietario - Territorio Digital © 2025

## 👤 Autor

**Francisco Parra**
- LinkedIn: [Tu LinkedIn]
- Email: contacto@territoriodigital.cl

---

**Territorio Digital** - Transformando datos en decisiones inteligentes
