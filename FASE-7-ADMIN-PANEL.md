# FASE 7: Panel de Administración de Emails con ImprovMX API

## Contexto del Proyecto

**Objetivo:** Crear un panel de administración integrado en el sitio web de Territorio Digital que permita gestionar emails, aliases, y monitorear el formulario de contacto usando la API de ImprovMX Premium.

**Valor Agregado:**
- Demostración de habilidades técnicas avanzadas (integración de APIs, dashboard interactivo)
- Funcionalidad única que diferencia el sitio
- Herramienta útil para gestión diaria de emails
- Caso de uso presentable a stakeholders

**Stack Actual:**
- Frontend: SvelteKit 2.47.1 + TypeScript + TailwindCSS v3
- Backend: Rust 1.83 (Axum) + MongoDB 7.0
- Hosting: Digital Ocean (161.35.134.23)
- Dominio: territorio-digital.cl
- Email: ImprovMX Premium

---

## Documentación de la API de ImprovMX

### Base URL
```
https://api.improvmx.com/v3
```

### Autenticación
```bash
# Basic Authentication
Usuario: api
Password: TU_API_KEY_DE_IMPROVMX
```

### Funcionalidades Principales

#### 1. **Gestión de Cuentas**
```http
GET /account
```
Respuesta: detalles de la cuenta, plan, límites, facturación.

#### 2. **Gestión de Dominios**
```http
GET /domains                          # Listar todos los dominios
GET /domains/{domain}                 # Obtener detalles de un dominio
POST /domains                         # Agregar nuevo dominio
PUT /domains/{domain}                 # Actualizar dominio
DELETE /domains/{domain}              # Eliminar dominio
GET /domains/{domain}/check           # Verificar DNS (MX, SPF, DKIM, DMARC)
```

#### 3. **Gestión de Aliases**
```http
GET /domains/{domain}/aliases         # Listar todos los aliases
POST /domains/{domain}/aliases        # Crear nuevo alias
GET /domains/{domain}/aliases/{alias} # Obtener alias específico
PUT /domains/{domain}/aliases/{alias} # Actualizar alias
DELETE /domains/{domain}/aliases/{alias} # Eliminar alias
```

**Operaciones por lotes:**
```http
POST /domains/{domain}/aliases/batch  # Crear hasta 500 aliases
DELETE /domains/{domain}/aliases/batch # Eliminar múltiples aliases
```

**Estructura de un Alias:**
```json
{
  "alias": "contacto",
  "forward": "territoriodigitalchile@gmail.com",
  "domain": "territorio-digital.cl"
}
```

#### 4. **SMTP (Envío de Correos) - Premium**
```http
GET /domains/{domain}/credentials     # Listar credenciales SMTP
POST /domains/{domain}/credentials    # Crear nueva credencial
PUT /domains/{domain}/credentials/{username} # Actualizar credencial
DELETE /domains/{domain}/credentials/{username} # Eliminar credencial
```

**Ejemplo de creación:**
```json
POST /domains/territorio-digital.cl/credentials
{
  "username": "contacto",
  "password": "ContraseñaSegura123!"
}
```

**Credenciales SMTP resultantes:**
```
Host: smtp.improvmx.com
Port: 587 (STARTTLS)
Usuario: contacto@territorio-digital.cl
Password: ContraseñaSegura123!
```

#### 5. **Logs de Emails**
```http
GET /domains/{domain}/logs
```

**Parámetros de filtro:**
- `q`: búsqueda por palabra clave
- `alias`: filtrar por alias específico
- `limit`: número de resultados (default 100, max 1000)
- `page`: paginación

**Estados posibles:**
- `QUEUED`: En cola
- `DELIVERED`: Entregado
- `REFUSED`: Rechazado
- `SOFT-BOUNCE`: Rebote temporal
- `HARD-BOUNCE`: Rebote permanente

**Estructura de respuesta:**
```json
{
  "logs": [
    {
      "id": "log_123",
      "created": "2025-01-15T10:30:00Z",
      "local": "contacto",
      "domain": "territorio-digital.cl",
      "sender": "cliente@example.com",
      "recipient": "francisco.parra.o@usach.cl",
      "subject": "Consulta sobre servicios",
      "status": "DELIVERED"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 100
}
```

#### 6. **Reglas Avanzadas**
```http
GET /domains/{domain}/rules           # Listar reglas
POST /domains/{domain}/rules          # Crear regla
PUT /domains/{domain}/rules/{id}      # Actualizar regla
DELETE /domains/{domain}/rules/{id}   # Eliminar regla
```

**Tipos de reglas:**
1. **Por Alias:** Basado en dirección específica
2. **Por Regex:** Filtrado por patrón (remitente, asunto, cuerpo)
3. **CEL (Common Expression Language):** Expresiones condicionales complejas

---

## Arquitectura de la Feature

### Estructura de Rutas

```
/admin (Protegido con autenticación)
│
├── /dashboard
│   ├── Resumen general de emails
│   ├── Gráficos de actividad (últimos 7/30 días)
│   ├── Estado del dominio (DNS check)
│   └── Estadísticas clave (tasa entrega, bounces, etc.)
│
├── /aliases
│   ├── Tabla de aliases existentes
│   ├── Formulario crear nuevo alias
│   ├── Editar/eliminar aliases
│   └── Operaciones por lotes
│
├── /logs
│   ├── Tabla de logs de emails
│   ├── Filtros (fecha, estado, alias, búsqueda)
│   ├── Paginación
│   └── Detalles de cada email
│
├── /smtp
│   ├── Lista de credenciales SMTP activas
│   ├── Crear nueva credencial
│   ├── Regenerar contraseña
│   └── Eliminar credencial
│
└── /contact-submissions
    ├── Formularios recibidos desde el sitio
    ├── Estado de envío
    ├── Búsqueda y filtros
    └── Estadísticas de conversión
```

### Base de Datos (MongoDB)

**Colección: `contact_submissions`**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: Date,
  ipAddress: String,
  userAgent: String,
  emailSentAt: Date,
  emailStatus: String, // "sent", "failed", "pending"
  improvmxLogId: String // Link al log de ImprovMX
}
```

**Colección: `email_stats_cache`** (opcional para optimizar)
```javascript
{
  _id: ObjectId,
  date: Date,
  emailsSent: Number,
  emailsReceived: Number,
  deliveryRate: Number,
  bounceRate: Number,
  createdAt: Date
}
```

---

## Stack Técnico Detallado

### Backend (Rust + Axum)

**Dependencias nuevas a agregar en `Cargo.toml`:**
```toml
[dependencies]
# Existentes
axum = "0.7"
tokio = { version = "1", features = ["full"] }
mongodb = "2.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Nuevas para esta feature
reqwest = { version = "0.11", features = ["json"] } # Cliente HTTP para ImprovMX API
base64 = "0.21" # Para autenticación Basic
chrono = { version = "0.4", features = ["serde"] } # Manejo de fechas
jsonwebtoken = "9.2" # Para autenticación del panel admin
bcrypt = "0.15" # Hash de passwords de admin
```

**Estructura del código:**

```
backend/src/
├── main.rs
├── routes/
│   ├── mod.rs
│   ├── contact.rs          # Existente
│   └── admin/
│       ├── mod.rs
│       ├── auth.rs         # Login del admin
│       ├── dashboard.rs    # Stats y overview
│       ├── aliases.rs      # CRUD de aliases
│       ├── logs.rs         # Logs de emails
│       ├── smtp.rs         # Gestión SMTP
│       └── submissions.rs  # Formularios recibidos
├── services/
│   ├── mod.rs
│   ├── email.rs            # Existente (Lettre)
│   └── improvmx.rs         # NUEVO: Cliente de ImprovMX API
├── models/
│   ├── mod.rs
│   ├── contact.rs          # Existente
│   ├── admin.rs            # NUEVO: Admin user
│   └── email_stats.rs      # NUEVO: Estadísticas
└── middleware/
    ├── mod.rs
    └── auth.rs             # NUEVO: Verificación JWT
```

**Ejemplo de implementación del cliente ImprovMX:**

```rust
// backend/src/services/improvmx.rs
use reqwest::{Client, Response};
use base64::{Engine as _, engine::general_purpose};
use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct ImprovMXClient {
    client: Client,
    api_key: String,
    base_url: String,
}

impl ImprovMXClient {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: "https://api.improvmx.com/v3".to_string(),
        }
    }

    fn auth_header(&self) -> String {
        let credentials = format!("api:{}", self.api_key);
        let encoded = general_purpose::STANDARD.encode(credentials.as_bytes());
        format!("Basic {}", encoded)
    }

    // Listar aliases
    pub async fn list_aliases(&self, domain: &str) -> Result<Vec<Alias>, Box<dyn std::error::Error>> {
        let url = format!("{}/domains/{}/aliases", self.base_url, domain);
        let response = self.client
            .get(&url)
            .header("Authorization", self.auth_header())
            .send()
            .await?;

        let data: AliasesResponse = response.json().await?;
        Ok(data.aliases)
    }

    // Crear alias
    pub async fn create_alias(&self, domain: &str, alias: &str, forward: &str) -> Result<Alias, Box<dyn std::error::Error>> {
        let url = format!("{}/domains/{}/aliases", self.base_url, domain);
        let payload = CreateAliasRequest {
            alias: alias.to_string(),
            forward: forward.to_string(),
        };

        let response = self.client
            .post(&url)
            .header("Authorization", self.auth_header())
            .json(&payload)
            .send()
            .await?;

        let data: AliasResponse = response.json().await?;
        Ok(data.alias)
    }

    // Obtener logs
    pub async fn get_logs(&self, domain: &str, params: LogParams) -> Result<LogsResponse, Box<dyn std::error::Error>> {
        let url = format!("{}/domains/{}/logs", self.base_url, domain);
        let response = self.client
            .get(&url)
            .header("Authorization", self.auth_header())
            .query(&params)
            .send()
            .await?;

        Ok(response.json().await?)
    }

    // Verificar DNS
    pub async fn check_dns(&self, domain: &str) -> Result<DnsCheck, Box<dyn std::error::Error>> {
        let url = format!("{}/domains/{}/check", self.base_url, domain);
        let response = self.client
            .get(&url)
            .header("Authorization", self.auth_header())
            .send()
            .await?;

        Ok(response.json().await?)
    }

    // Crear credencial SMTP
    pub async fn create_smtp_credential(&self, domain: &str, username: &str, password: &str) -> Result<SmtpCredential, Box<dyn std::error::Error>> {
        let url = format!("{}/domains/{}/credentials", self.base_url, domain);
        let payload = CreateSmtpRequest {
            username: username.to_string(),
            password: password.to_string(),
        };

        let response = self.client
            .post(&url)
            .header("Authorization", self.auth_header())
            .json(&payload)
            .send()
            .await?;

        Ok(response.json().await?)
    }
}

// Modelos
#[derive(Debug, Serialize, Deserialize)]
pub struct Alias {
    pub alias: String,
    pub forward: String,
    pub domain: String,
    pub created: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AliasesResponse {
    pub aliases: Vec<Alias>,
}

#[derive(Debug, Serialize, Deserialize)]
struct AliasResponse {
    pub alias: Alias,
}

#[derive(Debug, Serialize)]
struct CreateAliasRequest {
    pub alias: String,
    pub forward: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EmailLog {
    pub id: String,
    pub created: String,
    pub local: String,
    pub domain: String,
    pub sender: String,
    pub recipient: String,
    pub subject: String,
    pub status: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LogsResponse {
    pub logs: Vec<EmailLog>,
    pub total: u32,
    pub page: u32,
    pub limit: u32,
}

#[derive(Debug, Serialize)]
pub struct LogParams {
    pub q: Option<String>,
    pub alias: Option<String>,
    pub limit: Option<u32>,
    pub page: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DnsCheck {
    pub mx: DnsRecord,
    pub spf: DnsRecord,
    pub dkim: DnsRecord,
    pub dmarc: DnsRecord,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DnsRecord {
    pub valid: bool,
    pub records: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SmtpCredential {
    pub username: String,
    pub created: String,
}

#[derive(Debug, Serialize)]
struct CreateSmtpRequest {
    pub username: String,
    pub password: String,
}
```

**Ejemplo de endpoint para el dashboard:**

```rust
// backend/src/routes/admin/dashboard.rs
use axum::{
    extract::State,
    Json,
};
use serde::{Deserialize, Serialize};
use crate::services::improvmx::ImprovMXClient;

#[derive(Debug, Serialize)]
pub struct DashboardStats {
    pub total_aliases: u32,
    pub recent_emails: u32,
    pub delivery_rate: f32,
    pub dns_status: DnsStatus,
}

#[derive(Debug, Serialize)]
pub struct DnsStatus {
    pub mx_valid: bool,
    pub spf_valid: bool,
    pub dkim_valid: bool,
    pub dmarc_valid: bool,
}

pub async fn get_dashboard_stats(
    State(improvmx): State<ImprovMXClient>,
) -> Result<Json<DashboardStats>, StatusCode> {
    let domain = "territorio-digital.cl";

    // Obtener aliases
    let aliases = improvmx.list_aliases(domain).await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // Obtener logs recientes
    let logs = improvmx.get_logs(domain, LogParams {
        limit: Some(100),
        page: Some(1),
        q: None,
        alias: None,
    }).await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // Verificar DNS
    let dns = improvmx.check_dns(domain).await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    // Calcular tasa de entrega
    let delivered = logs.logs.iter()
        .filter(|log| log.status == "DELIVERED")
        .count() as f32;
    let delivery_rate = if logs.total > 0 {
        (delivered / logs.total as f32) * 100.0
    } else {
        100.0
    };

    let stats = DashboardStats {
        total_aliases: aliases.len() as u32,
        recent_emails: logs.total,
        delivery_rate,
        dns_status: DnsStatus {
            mx_valid: dns.mx.valid,
            spf_valid: dns.spf.valid,
            dkim_valid: dns.dkim.valid,
            dmarc_valid: dns.dmarc.valid,
        },
    };

    Ok(Json(stats))
}
```

---

### Frontend (SvelteKit + TypeScript)

**Estructura de rutas:**

```
frontend/src/routes/
├── (public)/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── servicios/
│   ├── portfolio/
│   ├── blog/
│   └── contacto/
│
└── admin/
    ├── +layout.svelte        # Layout con sidebar, auth check
    ├── +page.svelte          # Redirect a /admin/dashboard
    ├── login/
    │   └── +page.svelte
    ├── dashboard/
    │   ├── +page.svelte
    │   └── +page.ts          # Load stats from API
    ├── aliases/
    │   ├── +page.svelte
    │   └── +page.ts
    ├── logs/
    │   ├── +page.svelte
    │   └── +page.ts
    ├── smtp/
    │   ├── +page.svelte
    │   └── +page.ts
    └── submissions/
        ├── +page.svelte
        └── +page.ts
```

**Componentes reutilizables:**

```
frontend/src/lib/components/admin/
├── Sidebar.svelte           # Navegación del panel
├── StatsCard.svelte         # Cards de estadísticas
├── EmailLogTable.svelte     # Tabla de logs
├── AliasForm.svelte         # Formulario crear alias
├── AliasTable.svelte        # Tabla de aliases
├── DnsStatusBadge.svelte    # Badge de estado DNS
├── Chart.svelte             # Gráfico reutilizable
└── Pagination.svelte        # Paginación de tablas
```

**Ejemplo de página del Dashboard:**

```svelte
<!-- frontend/src/routes/admin/dashboard/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import StatsCard from '$lib/components/admin/StatsCard.svelte';
  import Chart from '$lib/components/admin/Chart.svelte';
  import DnsStatusBadge from '$lib/components/admin/DnsStatusBadge.svelte';

  export let data;

  $: stats = data.stats;
  $: emailActivity = data.emailActivity;
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

  <!-- DNS Status -->
  <div class="mb-6 bg-white rounded-lg shadow p-4">
    <h2 class="text-xl font-semibold mb-4">Estado DNS</h2>
    <div class="flex gap-4">
      <DnsStatusBadge label="MX" valid={stats.dns_status.mx_valid} />
      <DnsStatusBadge label="SPF" valid={stats.dns_status.spf_valid} />
      <DnsStatusBadge label="DKIM" valid={stats.dns_status.dkim_valid} />
      <DnsStatusBadge label="DMARC" valid={stats.dns_status.dmarc_valid} />
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <StatsCard
      title="Total Aliases"
      value={stats.total_aliases}
      icon="📧"
    />
    <StatsCard
      title="Emails Recientes"
      value={stats.recent_emails}
      icon="📨"
    />
    <StatsCard
      title="Tasa de Entrega"
      value="{stats.delivery_rate.toFixed(1)}%"
      icon="✅"
    />
  </div>

  <!-- Email Activity Chart -->
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Actividad de Emails (Últimos 7 días)</h2>
    <Chart data={emailActivity} />
  </div>
</div>
```

**Ejemplo de +page.ts para cargar datos:**

```typescript
// frontend/src/routes/admin/dashboard/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/admin/dashboard');

  if (!response.ok) {
    throw new Error('Failed to load dashboard data');
  }

  const stats = await response.json();

  // También podemos cargar actividad de emails para el gráfico
  const activityResponse = await fetch('/api/admin/email-activity?days=7');
  const emailActivity = await activityResponse.json();

  return {
    stats,
    emailActivity
  };
};
```

**Ejemplo de tabla de aliases:**

```svelte
<!-- frontend/src/lib/components/admin/AliasTable.svelte -->
<script lang="ts">
  export let aliases: Array<{
    alias: string;
    forward: string;
    created: string;
  }>;

  let loading = false;

  async function deleteAlias(alias: string) {
    if (!confirm(`¿Eliminar alias ${alias}@territorio-digital.cl?`)) return;

    loading = true;
    try {
      const response = await fetch(`/api/admin/aliases/${alias}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        aliases = aliases.filter(a => a.alias !== alias);
        alert('Alias eliminado correctamente');
      } else {
        alert('Error al eliminar alias');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar alias');
    } finally {
      loading = false;
    }
  }
</script>

<div class="overflow-x-auto">
  <table class="min-w-full bg-white">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Alias
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Reenvía a
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Creado
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      {#each aliases as alias}
        <tr>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="font-mono text-sm">{alias.alias}@territorio-digital.cl</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            {alias.forward}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(alias.created).toLocaleDateString()}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <button
              on:click={() => deleteAlias(alias.alias)}
              disabled={loading}
              class="text-red-600 hover:text-red-900 disabled:opacity-50"
            >
              Eliminar
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if aliases.length === 0}
  <div class="text-center py-8 text-gray-500">
    No hay aliases configurados
  </div>
{/if}
```

---

## Autenticación del Panel Admin

### Backend: JWT + Bcrypt

```rust
// backend/src/models/admin.rs
use serde::{Deserialize, Serialize};
use mongodb::bson::oid::ObjectId;

#[derive(Debug, Serialize, Deserialize)]
pub struct Admin {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub username: String,
    pub password_hash: String, // Bcrypt hash
    pub created_at: String,
}

// backend/src/routes/admin/auth.rs
use axum::{
    extract::State,
    Json,
    http::StatusCode,
};
use jsonwebtoken::{encode, EncodingKey, Header};
use bcrypt::{verify, DEFAULT_COST, hash};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub token: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // username
    pub exp: usize,  // expiration
}

pub async fn login(
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {
    // TODO: Buscar admin en MongoDB
    // Por ahora, credenciales hardcoded para testing
    let valid_username = "admin";
    let valid_password_hash = "$2b$12$..."; // Hash de "admin123" por ejemplo

    if payload.username != valid_username {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let is_valid = verify(&payload.password, valid_password_hash)
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    if !is_valid {
        return Err(StatusCode::UNAUTHORIZED);
    }

    // Crear JWT
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .unwrap()
        .timestamp() as usize;

    let claims = Claims {
        sub: payload.username,
        exp: expiration,
    };

    let jwt_secret = std::env::var("JWT_SECRET")
        .unwrap_or_else(|_| "secret".to_string());

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(jwt_secret.as_bytes()),
    ).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(LoginResponse { token }))
}
```

### Frontend: Auth Store + Guards

```typescript
// frontend/src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    token: browser ? localStorage.getItem('admin_token') : null,
    isAuthenticated: false
  });

  return {
    subscribe,
    login: (token: string) => {
      if (browser) {
        localStorage.setItem('admin_token', token);
      }
      set({ token, isAuthenticated: true });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('admin_token');
      }
      set({ token: null, isAuthenticated: false });
    },
    checkAuth: () => {
      const token = browser ? localStorage.getItem('admin_token') : null;
      update(state => ({
        ...state,
        token,
        isAuthenticated: !!token
      }));
    }
  };
}

export const auth = createAuthStore();
```

```svelte
<!-- frontend/src/routes/admin/+layout.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth';
  import Sidebar from '$lib/components/admin/Sidebar.svelte';

  onMount(() => {
    auth.checkAuth();

    const unsubscribe = auth.subscribe(state => {
      if (!state.isAuthenticated) {
        goto('/admin/login');
      }
    });

    return unsubscribe;
  });
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar />
  <main class="flex-1 overflow-y-auto">
    <slot />
  </main>
</div>
```

---

## Variables de Entorno Adicionales

Agregar a `.env.production`:

```bash
# ImprovMX API
IMPROVMX_API_KEY=your_api_key_here

# JWT para panel admin
JWT_SECRET=tu_secret_super_seguro_aqui

# Admin credentials (iniciales)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$... # Generar con bcrypt
```

---

## Plan de Implementación

### Fase 7.1: Backend API Integration
- [ ] Implementar cliente ImprovMX en Rust
- [ ] Crear endpoints para aliases (CRUD)
- [ ] Crear endpoint para logs
- [ ] Crear endpoint para SMTP credentials
- [ ] Crear endpoint para DNS check
- [ ] Implementar autenticación JWT
- [ ] Proteger rutas con middleware

### Fase 7.2: Frontend Dashboard
- [ ] Crear layout del panel admin
- [ ] Implementar página de login
- [ ] Crear dashboard con estadísticas
- [ ] Implementar gestión de aliases
- [ ] Implementar visualización de logs
- [ ] Crear gráficos de actividad

### Fase 7.3: Contact Submissions Tracking
- [ ] Guardar submissions en MongoDB
- [ ] Crear endpoint para listar submissions
- [ ] Página de submissions en el admin panel
- [ ] Link con logs de ImprovMX

### Fase 7.4: Testing & Polish
- [ ] Testing de integración con ImprovMX
- [ ] Testing de autenticación
- [ ] UI/UX polish
- [ ] Responsive design
- [ ] Documentación de uso

---

## Tecnologías y Librerías

### Backend
- `reqwest` - Cliente HTTP para ImprovMX API
- `jsonwebtoken` - Autenticación JWT
- `bcrypt` - Hashing de passwords
- `chrono` - Manejo de fechas
- `base64` - Encoding para Basic Auth

### Frontend
- Chart.js o Recharts - Gráficos
- TailwindCSS - Estilos
- Svelte Stores - State management
- SvelteKit Forms - Manejo de formularios

---

## Seguridad

### Consideraciones
1. **API Key de ImprovMX**: Nunca exponer en frontend, solo en backend
2. **JWT**: Usar secret fuerte, expiración de 24h
3. **Bcrypt**: Cost factor de 12 para passwords
4. **HTTPS**: Obligatorio para panel admin
5. **Rate Limiting**: Limitar requests al API de ImprovMX
6. **CORS**: Configurar correctamente para el admin panel

### Rate Limiting
ImprovMX tiene límites en su API:
- Free: 100 requests/día
- Premium: 10,000 requests/día

Implementar cache local para reducir requests:
- Cache de aliases: 5 minutos
- Cache de stats: 1 minuto
- Logs: Sin cache (siempre fresh)

---

## Deployment

### Actualización de docker-compose.yml

```yaml
backend:
  environment:
    # ... variables existentes
    IMPROVMX_API_KEY: ${IMPROVMX_API_KEY}
    JWT_SECRET: ${JWT_SECRET}
    ADMIN_USERNAME: ${ADMIN_USERNAME}
    ADMIN_PASSWORD_HASH: ${ADMIN_PASSWORD_HASH}
```

### Script de actualización

```bash
# En el servidor
cd ~/territorio-digital
git pull origin master
docker compose build backend frontend
docker compose --env-file .env.production up -d
```

---

## Métricas de Éxito

- ✅ Panel accesible solo con autenticación
- ✅ Visualización en tiempo real de estadísticas
- ✅ CRUD completo de aliases funcional
- ✅ Logs actualizados y filtrables
- ✅ Tracking de formularios de contacto
- ✅ Interfaz responsive y usable
- ✅ Performance: < 2s carga de dashboard
- ✅ Zero downtime durante updates

---

## Roadmap Futuro (Post-FASE 7)

- [ ] Notificaciones push cuando llega un email
- [ ] Webhooks de ImprovMX para eventos en tiempo real
- [ ] Analytics avanzados (gráficos de tendencias)
- [ ] Exportar datos a CSV
- [ ] Templates de respuesta automática
- [ ] Multi-admin con roles
- [ ] API pública para integración con otros sistemas
- [ ] Mobile app (PWA)

---

## Referencias

- [ImprovMX API Docs](https://improvmx.com/api)
- [Axum Web Framework](https://docs.rs/axum/latest/axum/)
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

---

**Última actualización:** 2025-01-16
**Autor:** Claude Code + Francisco Parra
**Estado:** Diseño Completo - Pendiente de Implementación
