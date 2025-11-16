#!/bin/bash

# Script de configuración inicial del servidor Digital Ocean
# Ejecutar como ROOT en el servidor recién creado
# Uso: bash <(curl -s https://raw.githubusercontent.com/TU_USUARIO/territorio-digital/master/setup-server.sh)

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
echo "║   Territorio Digital                      ║"
echo "║   Configuración Inicial del Servidor      ║"
echo "╚═══════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar que se ejecuta como root
if [ "$EUID" -ne 0 ]; then
    log_error "Este script debe ejecutarse como root"
    log_info "Usa: sudo bash setup-server.sh"
    exit 1
fi

# 1. Actualizar sistema
log_info "Actualizando sistema operativo..."
apt update -qq
apt upgrade -y -qq
log_success "Sistema actualizado"

# 2. Instalar dependencias básicas
log_info "Instalando dependencias básicas..."
apt install -y -qq curl git ufw fail2ban
log_success "Dependencias instaladas"

# 3. Instalar Docker
log_info "Instalando Docker..."
if command -v docker &> /dev/null; then
    log_warning "Docker ya está instalado"
else
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    log_success "Docker instalado"
fi

# 4. Instalar Docker Compose
log_info "Instalando Docker Compose..."
apt install -y -qq docker-compose-plugin
log_success "Docker Compose instalado"

# Verificar versiones
DOCKER_VERSION=$(docker --version)
COMPOSE_VERSION=$(docker compose version)
log_info "Docker: $DOCKER_VERSION"
log_info "Compose: $COMPOSE_VERSION"

# 5. Crear usuario deployer
log_info "Creando usuario 'deployer'..."
if id "deployer" &>/dev/null; then
    log_warning "Usuario 'deployer' ya existe"
else
    adduser --disabled-password --gecos "" deployer
    log_success "Usuario 'deployer' creado"
fi

# Agregar a grupos
usermod -aG docker deployer
usermod -aG sudo deployer
log_success "Usuario agregado a grupos docker y sudo"

# 6. Configurar firewall
log_info "Configurando firewall UFW..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
log_success "Firewall configurado"

ufw status

# 7. Configurar fail2ban (protección contra fuerza bruta)
log_info "Configurando fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban
log_success "fail2ban activado"

# 8. Configurar swap (2GB)
log_info "Configurando memoria swap..."
if [ -f /swapfile ]; then
    log_warning "Swap ya existe"
else
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    log_success "Swap de 2GB configurado"
fi

# 9. Optimizaciones de sistema
log_info "Aplicando optimizaciones de sistema..."
cat >> /etc/sysctl.conf << EOF

# Optimizaciones para aplicación web
vm.swappiness=10
net.core.somaxconn=65535
net.ipv4.tcp_max_syn_backlog=8192
EOF
sysctl -p
log_success "Optimizaciones aplicadas"

# 10. Configurar timezone a Santiago
log_info "Configurando timezone a America/Santiago..."
timedatectl set-timezone America/Santiago
log_success "Timezone configurado"

# 11. Instalar Certbot para SSL
log_info "Instalando Certbot para certificados SSL..."
apt install -y -qq certbot python3-certbot-nginx
log_success "Certbot instalado"

# 12. Configurar cron para renovación de certificados
log_info "Configurando renovación automática de certificados..."
cat > /etc/cron.d/certbot-renew << 'EOF'
0 3 * * * root certbot renew --quiet --deploy-hook "cd /home/deployer/territorio-digital && cp /etc/letsencrypt/live/territorio-digital.cl/fullchain.pem ssl/ && cp /etc/letsencrypt/live/territorio-digital.cl/privkey.pem ssl/ && docker compose restart nginx"
EOF
chmod 644 /etc/cron.d/certbot-renew
log_success "Renovación automática configurada"

# 13. Configurar SSH más seguro
log_info "Mejorando seguridad SSH..."
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
log_warning "IMPORTANTE: Asegúrate de tener SSH keys configuradas antes de desconectar"
log_info "Reiniciando SSH..."
systemctl restart sshd
log_success "SSH configurado"

# 14. Crear directorios para el proyecto
log_info "Preparando directorios para deployer..."
mkdir -p /home/deployer/territorio-digital
chown -R deployer:deployer /home/deployer
log_success "Directorios creados"

# 15. Configurar logrotate para Docker
log_info "Configurando rotación de logs de Docker..."
cat > /etc/docker/daemon.json << EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
systemctl restart docker
log_success "Rotación de logs configurada"

# Resumen final
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✓ Configuración completada!            ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════╝${NC}"
echo ""

log_info "Resumen de lo instalado:"
echo "  ✓ Docker y Docker Compose"
echo "  ✓ Usuario 'deployer' creado"
echo "  ✓ Firewall UFW configurado (puertos 22, 80, 443)"
echo "  ✓ Fail2ban activado"
echo "  ✓ Swap de 2GB"
echo "  ✓ Timezone: America/Santiago"
echo "  ✓ Certbot para SSL"
echo "  ✓ SSH endurecido"
echo "  ✓ Logs de Docker con rotación"
echo ""

log_warning "SIGUIENTES PASOS:"
echo ""
echo "1. Cambiar a usuario deployer:"
echo "   su - deployer"
echo ""
echo "2. Clonar el repositorio:"
echo "   git clone https://github.com/franciscoparrao/territorio-digital.git"
echo "   cd territorio-digital"
echo ""
echo "3. Configurar variables de entorno:"
echo "   cp .env.production.example .env.production"
echo "   nano .env.production"
echo ""
echo "4. Ejecutar deploy:"
echo "   ./deploy.sh"
echo ""
echo "5. Configurar DNS apuntando a esta IP:"
IP=$(curl -s ifconfig.me)
echo "   A record: @ -> $IP"
echo "   A record: www -> $IP"
echo ""
echo "6. Una vez DNS propagado, configurar SSL:"
echo "   sudo certbot certonly --standalone -d territorio-digital.cl -d www.territorio-digital.cl"
echo ""

log_success "¡Servidor listo para deploy!"
