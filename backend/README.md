# Territorio Digital - Backend API

API REST desarrollada con Rust y Axum para el sitio web de Territorio Digital.

## Stack Tecnológico

- **Framework**: Axum 0.7
- **Runtime**: Tokio (async)
- **Base de datos**: MongoDB 3.1
- **Email**: Lettre 0.11
- **Validación**: Validator 0.18
- **Logging**: Tracing + Tracing-subscriber

## Requisitos

- Rust >= 1.70
- MongoDB >= 6.0 (corriendo en puerto 27019)
- Cuenta de email SMTP (Gmail, etc.)

## Configuración

### 1. Copiar archivo de variables de entorno

```bash
cp .env.example .env
```

### 2. Configurar variables de entorno

Edita el archivo `.env` con tus credenciales:

```bash
# Server Configuration
HOST=127.0.0.1
PORT=3000

# Database Configuration (MongoDB)
MONGODB_URI=mongodb://localhost:27019
MONGODB_DATABASE=territorio_digital

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password
EMAIL_FROM=noreply@territoriodigital.cl

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:4173

# Logging
RUST_LOG=territorio_digital_api=debug,tower_http=debug
```

**Nota sobre Gmail**: Si usas Gmail, necesitas crear una "App Password":
1. Ve a https://myaccount.google.com/security
2. Activa la verificación en dos pasos
3. Ve a "App passwords" y genera una contraseña para la aplicación
4. Usa esa contraseña en `SMTP_PASSWORD`

### 3. Iniciar MongoDB

```bash
# Si tienes MongoDB instalado localmente
mongod --port 27019 --dbpath /path/to/data
```

O con Docker:

```bash
docker run -d -p 27019:27017 --name territorio-mongo mongo:latest
```

## Desarrollo

### Compilar y ejecutar

```bash
cargo run
```

El servidor estará disponible en `http://localhost:3000`

### Modo desarrollo con auto-reload

Instala cargo-watch:

```bash
cargo install cargo-watch
```

Ejecuta con auto-reload:

```bash
cargo watch -x run
```

### Tests

```bash
cargo test
```

### Linting y formateo

```bash
# Formatear código
cargo fmt

# Linter
cargo clippy
```

## Endpoints Disponibles

### GET /

Endpoint raíz de la API

**Respuesta**:
```
Territorio Digital API - Ready to serve
```

### GET /health

Health check del servidor

**Respuesta**:
```json
{
  "status": "healthy",
  "version": "0.1.0"
}
```

### POST /api/contact

Endpoint para el formulario de contacto

**Request Body**:
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Mi Empresa", // opcional
  "service": "desarrollo-web", // opcional
  "message": "Me interesa conocer más sobre sus servicios..."
}
```

**Validaciones**:
- `name`: 2-100 caracteres
- `email`: debe ser un email válido
- `company`: máximo 100 caracteres (opcional)
- `service`: máximo 50 caracteres (opcional)
- `message`: 10-2000 caracteres

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Te responderemos pronto."
}
```

**Respuesta error (400/500)**:
```json
{
  "success": false,
  "message": "Error de validación: ..."
}
```

**Funcionalidades**:
1. Valida los datos del formulario
2. Guarda el mensaje en MongoDB (colección `contact_messages`)
3. Envía email de notificación al administrador
4. Envía email de confirmación al usuario

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración de la aplicación
│   ├── db/              # Conexión a MongoDB
│   ├── handlers/        # Handlers de los endpoints
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── services/        # Servicios (email, etc.)
│   └── main.rs          # Punto de entrada
├── Cargo.toml           # Dependencias
├── .env.example         # Ejemplo de variables de entorno
└── README.md            # Este archivo
```

## Build para Producción

```bash
cargo build --release
```

El binario estará en `target/release/territorio-digital-api`

## Docker (Próximamente)

```bash
docker build -t territorio-digital-api .
docker run -p 3000:3000 territorio-digital-api
```

## Troubleshooting

### Error: "Failed to connect to MongoDB"

- Verifica que MongoDB esté corriendo en el puerto 27019
- Verifica la variable `MONGODB_URI` en `.env`

### Error: "Failed to send email"

- Verifica tus credenciales SMTP en `.env`
- Si usas Gmail, asegúrate de usar una App Password
- Verifica que el puerto 587 no esté bloqueado

### Error: "Address already in use"

- El puerto 3000 ya está en uso
- Cambia el `PORT` en `.env` o detén el otro proceso

## Licencia

Propietario - Territorio Digital © 2025
