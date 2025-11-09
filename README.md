# Territorio Digital

Sitio web corporativo para Territorio Digital - Especialistas en desarrollo web, análisis satelital, data science y soluciones tecnológicas inteligentes.

## 🚀 Stack Tecnológico

### Frontend
- **Framework:** SvelteKit
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS (próximamente)
- **Deploy:** Vercel / Netlify

### Backend
- **Framework:** Axum (Rust)
- **Runtime:** Tokio
- **Base de datos:** MongoDB
- **Email:** Lettre

## 📁 Estructura del Proyecto

```
territorio-digital/
├── frontend/          # Aplicación SvelteKit
│   ├── src/
│   │   ├── routes/   # Páginas y rutas
│   │   └── lib/      # Componentes y utilidades
│   ├── static/       # Assets estáticos
│   └── package.json
│
├── backend/          # API en Rust con Axum
│   ├── src/
│   │   └── main.rs
│   ├── Cargo.toml
│   └── .env.example
│
├── docs/             # Documentación
├── ROADMAP.md        # Hoja de ruta del proyecto
└── README.md         # Este archivo
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

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Docker - próximamente)
```bash
cd backend
docker build -t territorio-digital-api .
docker run -p 3000:3000 territorio-digital-api
```

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

**Francisco Parrão**
- LinkedIn: [Tu LinkedIn]
- Email: contacto@territoriodigital.cl

---

**Territorio Digital** - Transformando datos en decisiones inteligentes
