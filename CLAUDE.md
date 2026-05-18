# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Territorio Digital is a professional services website (territorio-digital.cl) built with a SvelteKit frontend and Rust/Axum backend, deployed via Docker on Digital Ocean.

## Architecture

- **Frontend** (`frontend/`): SvelteKit 2 + TypeScript + TailwindCSS. Uses adapter-node for Docker. Blog powered by mdsvex (Markdown). All pages are prerendered (SSG).
- **Backend** (`backend/`): Rust with Axum 0.7 + Tokio. Single API endpoint: `POST /api/contact` with anti-spam timestamp validation. Sends emails via Brevo API (not SMTP — DO blocks port 25/587).
- **Database**: MongoDB 7.0 — stores contact form submissions in `contact_messages` collection.
- **Nginx**: Reverse proxy with SSL termination, rate limiting (API: 10 req/s, general: 50 req/s), gzip, and security headers.
- **Docker Compose**: Orchestrates mongodb → backend → frontend → nginx.

## Common Commands

### Frontend (from `frontend/`)
```bash
npm run dev           # Dev server on :5173
npm run build         # Production build to build/
npm run check         # svelte-check type checking
npm run lint          # ESLint
npm run format        # Prettier
```

### Backend (from `backend/`)
```bash
cargo run             # Debug server on :3000
cargo build --release # Production build
cargo test            # Run tests
cargo clippy          # Lint
cargo fmt             # Format
```

### Docker (from root)
```bash
docker compose up -d --build                              # Dev
docker compose --env-file .env.production up -d --build   # Production
docker compose logs -f [service]                          # Logs
```

`deploy.sh` provides an interactive menu for common deployment tasks including backups.

## Key Files

| File | Purpose |
|------|---------|
| `frontend/svelte.config.js` | SvelteKit + mdsvex config, CSP directives |
| `frontend/tailwind.config.js` | Custom color palette (primary: blue #0ea5e9) and fonts (Inter, JetBrains Mono) |
| `backend/src/handlers/contact.rs` | Contact form handler with anti-spam validation |
| `backend/src/services/email.rs` | Brevo API email service (HTML templates) |
| `backend/src/config/mod.rs` | Environment variable loading |
| `nginx.conf` | Reverse proxy, rate limiting, SSL, caching |
| `docker-compose.yml` | Service orchestration |
| `DESIGN_SYSTEM.md` | Design tokens and component patterns |

## Frontend Conventions

- File-based routing in `src/routes/`. Top-level pages: `about/`, `contacto/`, `portfolio/`, `publicaciones/`, `privacidad/`, `terminos/`, plus `servicios/` and `blog/[slug]/`. `sitemap.xml` is generated as a route.
- Reusable components in `src/lib/components/` (Header, Footer, SEO, CookieConsent, StructuredData, etc.).
- Static data (portfolio projects, blog metadata) in `src/lib/data/` as TypeScript files.
- Every page includes the `SEO` component for meta tags and Open Graph.
- Svelte 5 runes for reactivity. No external state management library.

## Backend Conventions

- Modular structure: `config/`, `db/`, `handlers/`, `models/`, `routes/`, `services/`. Routes registered in `routes/mod.rs::create_routes`.
- Contact form validation via `validator` crate with derive macros.
- CORS is fully permissive (`Any` origin/methods/headers) — set in `main.rs`. There is no `CORS_ORIGINS` env var; tighten this in `main.rs` if restricting origins becomes necessary.
- Server listens on `0.0.0.0:3000` in production (Docker networking requirement).

## Environment Setup

Copy `.env.example` → `.env` at root. Key variables:
- `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`, `MONGODB_DATABASE`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_PASSWORD` (Brevo API key)
- `SMTP_USER` (used by `backend/.env` for local dev) **vs** `SMTP_USERNAME` (used by `docker-compose.yml` to inject into the backend container) — these are the same value but the variable name differs between contexts. Watch out when copying configs.
- `EMAIL_FROM` (sender address; only injected by docker-compose, missing from root `.env.example`)
- `ADMIN_EMAIL` (receives contact notifications)
- `VITE_API_URL` (dev: `http://localhost:3001`, prod: relative `/api`)

Backend also has its own `.env.example` for local development without Docker.

## API Contract

**POST /api/contact** — JSON body:
```json
{
  "name": "string (2-100 chars)",
  "email": "valid email",
  "company": "optional (max 100)",
  "service": "optional (max 50)",
  "message": "string (10-2000 chars)",
  "timestamp": "unix ms (anti-spam: 3s min, 1h max)"
}
```

**GET /health** — Returns `{"status": "healthy", "version": "0.1.0"}`

## Deployment

Production runs on Digital Ocean (`161.35.134.23`) with Let's Encrypt SSL. MongoDB is restricted to `127.0.0.1:27017`. See `DEPLOY.md` for the complete guide and `setup-server.sh` for initial server provisioning.

### Shared droplet — co-tenant `sanvicentetenisclub.cl`

The `territorio-digital-nginx` container is a **shared reverse proxy** that also serves `sanvicentetenisclub.cl` (containers `club-tenis-frontend`, `club-tenis-backend`, `club-tenis-db`). Its server block lives in this repo's `nginx.conf` alongside the territorio block; both share the `api_limit`/`general_limit` zones declared at the `http {}` level. The club's SSL cert is bind-mounted at `/etc/nginx/ssl/club/`.

**Consequences for any deploy touching nginx:**
- A naive `docker compose up -d --build` will recreate nginx and reload its config from this repo. If `nginx.conf` is missing the club server block, the club site goes down.
- Backup before pulling: `cp nginx.conf nginx.conf.bak.$(date +%F)` on the droplet (`/home/deployer/territorio-digital/`).
- Frontend-only deploys are safe: `docker compose --env-file .env.production up -d --no-deps --force-recreate frontend`.

### Docker bind-mount inode gotcha (important)

`nginx.conf` is bind-mounted into the container: `./nginx.conf:/etc/nginx/nginx.conf:ro`. When `git pull` (or any tool that rewrites the file rather than editing in place) **replaces** `nginx.conf`, a **new inode** is created — but the running container is still bound to the old inode. Result: `docker exec nginx cat /etc/nginx/nginx.conf` shows the **old** content, and `nginx -s reload` re-reads the old file.

**Symptom:** you pulled new nginx config, ran reload, but production behavior didn't change.

**Fix:** recreate the container so the bind mount re-resolves to the current inode:
```bash
docker compose --env-file .env.production up -d --no-deps --force-recreate nginx
```
Brief (~3s) downtime affects both territorio and club. Alternative for in-place edits: `sed -i ...` preserves the inode and `nginx -s reload` works.

### Legacy URL redirects (SEO / Search Console)

When you rename or remove a portfolio slug, blog slug, or any URL that Google has likely indexed, add a 301 redirect to `nginx.conf` **in the same commit** that removes the old route. This prevents Search Console from reporting 404s and preserves link equity.

Place new redirects inside the territorio-digital main HTTPS server block (right after the security headers), grouped under a comment so they don't sprawl. Example:

```nginx
# Legacy portfolio redirects (projects renamed/removed; Google still has them indexed)
location = /portfolio/<old-slug>            { return 301 /portfolio/<new-slug>; }
location = /portfolio/<another-old>         { return 301 /portfolio; }
```

Rules of thumb for the redirect target:
- Prefer the **direct successor** if one exists (best for SEO and UX).
- Fall back to the **category/index page** (e.g. `/portfolio`, `/blog`) if no successor — still beats a 404.
- Only redirect to `/` if the page was truly unrelated to anything that exists now.

After deploying the redirect, go to Search Console → Pages → the 404 report → click the URL → **Validar corrección** (Validate Fix) so Google re-crawls sooner.

## SEO architecture

- **Canonical URL**: every page passes `url` to `<SEO>` (component at `src/lib/components/SEO.svelte`). The default is `https://territorio-digital.cl` (with the dash — the real domain). The default OG image is `/og-image.jpg`. **Do not** introduce variants without a dash (`territoriodigital.cl`) — that was the root cause of "duplicada, sin canónica" warnings in Search Console.
- **Schema.org JSON-LD**: structured data is split across reusable components — `StructuredData` (Organization/Person/LocalBusiness on home + about) and `BreadcrumbSchema` (used on blog posts, portfolio items, servicios subpages). Blog posts also emit `BlogPosting` schema inline in `blog/[slug]/+page.svelte`. The desarrollo-web service page emits `FAQPage` schema.
- **Sitemap** (`src/routes/sitemap.xml/+server.ts`): dynamically built from `posts.ts` and `projects.ts`. Each entry has only `<loc>` and `<lastmod>` — Google has ignored `changefreq` and `priority` since 2023. Blog post `lastmod` uses `post.date`; static and portfolio pages use the build timestamp.
- **`/llms.txt`** in `frontend/static/` is a curated Markdown map for LLM crawlers (Perplexity, ChatGPT). Update it when the portfolio or major sections change.
- **Analytics consent**: GA4 (`G-V1040V9ZS2`) and Google Ads (`AW-979698901`) are loaded by `Analytics.svelte` only after the user accepts the cookie banner. Never put `gtag` scripts directly in `app.html` — it bypasses consent and violates Ley 19.628.
