#!/bin/bash

# Script de deploy automatizado para Territorio Digital
# Uso: ./deploy.sh [opciones]

set -e  # Salir si cualquier comando falla

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones helper
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════╗"
echo "║   Territorio Digital - Deploy Script     ║"
echo "║   Francisco Parra                         ║"
echo "╚═══════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "docker-compose.yml" ]; then
    log_error "No se encontró docker-compose.yml. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
fi

# Verificar que existe .env.production
if [ ! -f ".env.production" ]; then
    log_warning "No se encontró .env.production"
    log_info "Copiando .env.production.example a .env.production..."
    cp .env.production.example .env.production
    log_warning "Por favor edita .env.production con tus credenciales reales antes de continuar."
    log_info "Ejecuta: nano .env.production"
    exit 1
fi

# Menú de opciones
echo ""
log_info "¿Qué deseas hacer?"
echo "1) Deploy completo (build + up)"
echo "2) Solo rebuild (sin down)"
echo "3) Reiniciar servicios"
echo "4) Ver logs"
echo "5) Ver estado de servicios"
echo "6) Detener todo"
echo "7) Actualizar desde git y deploy"
echo "8) Backup de MongoDB"
echo "9) Salir"
echo ""
read -p "Selecciona una opción [1-9]: " option

case $option in
    1)
        log_info "Iniciando deploy completo..."

        # Pull latest images si es necesario
        log_info "Actualizando imágenes base..."
        docker compose pull mongodb nginx 2>/dev/null || true

        # Build
        log_info "Construyendo imágenes... (esto puede tomar varios minutos)"
        docker compose build --no-cache

        # Down (si algo estaba corriendo)
        log_info "Deteniendo servicios anteriores..."
        docker compose down

        # Up
        log_info "Iniciando servicios..."
        docker compose --env-file .env.production up -d

        # Wait for services
        log_info "Esperando a que los servicios estén listos..."
        sleep 5

        # Check status
        log_info "Estado de los servicios:"
        docker compose ps

        # Test health
        log_info "Verificando health endpoint..."
        sleep 2
        curl -f http://localhost/health && log_success "Health check OK!" || log_error "Health check falló"

        log_success "Deploy completo finalizado!"
        log_info "Verifica los logs con: docker compose logs -f"
        ;;

    2)
        log_info "Reconstruyendo servicios..."
        docker compose --env-file .env.production up -d --build
        log_success "Rebuild completado!"
        docker compose ps
        ;;

    3)
        log_info "Reiniciando servicios..."
        docker compose restart
        sleep 3
        docker compose ps
        log_success "Servicios reiniciados!"
        ;;

    4)
        log_info "Mostrando logs (Ctrl+C para salir)..."
        echo ""
        docker compose logs -f
        ;;

    5)
        log_info "Estado de los servicios:"
        echo ""
        docker compose ps
        echo ""
        log_info "Uso de recursos:"
        docker stats --no-stream
        ;;

    6)
        log_warning "Deteniendo todos los servicios..."
        docker compose down
        log_success "Servicios detenidos!"
        ;;

    7)
        log_info "Actualizando código desde Git..."

        # Check for uncommitted changes
        if ! git diff-index --quiet HEAD --; then
            log_error "Hay cambios sin commitear. Haz commit o stash primero."
            exit 1
        fi

        # Pull
        log_info "Descargando últimos cambios..."
        git pull origin master

        # Build and deploy
        log_info "Construyendo nuevas imágenes..."
        docker compose build

        log_info "Reiniciando servicios..."
        docker compose --env-file .env.production up -d

        log_success "Actualización completada!"
        docker compose ps
        ;;

    8)
        log_info "Creando backup de MongoDB..."

        # Crear directorio de backups
        BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
        mkdir -p "$BACKUP_DIR"

        # Leer credenciales del .env
        source .env.production

        # Crear backup
        docker compose exec -T mongodb mongodump \
            --username="$MONGO_ROOT_USER" \
            --password="$MONGO_ROOT_PASSWORD" \
            --authenticationDatabase=admin \
            --db="$MONGODB_DATABASE" \
            --out=/data/backup

        # Copiar backup al host
        docker cp territorio-digital-mongodb:/data/backup "$BACKUP_DIR/"

        log_success "Backup creado en: $BACKUP_DIR"

        # Limpiar backup dentro del contenedor
        docker compose exec -T mongodb rm -rf /data/backup

        # Mostrar tamaño
        du -sh "$BACKUP_DIR"
        ;;

    9)
        log_info "Saliendo..."
        exit 0
        ;;

    *)
        log_error "Opción inválida"
        exit 1
        ;;
esac

echo ""
log_success "Operación completada!"
echo ""
