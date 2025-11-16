#!/bin/bash
# Script completo de setup para territorio-digital en 161.35.134.23
# Este script se ejecutará en el servidor después de la actualización del sistema

set -e

echo "=== Instalando Docker ==="
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh
apt install -y docker-compose-plugin

echo "=== Instalando dependencias ==="
apt install -y git ufw fail2ban certbot python3-certbot-nginx

echo "=== Configurando firewall ==="
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "=== Creando usuario deployer ==="
if ! id "deployer" &>/dev/null; then
    adduser --disabled-password --gecos "" deployer
fi
usermod -aG docker deployer
usermod -aG sudo deployer

echo "=== Configurando swap (2GB) ==="
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "=== Configurando timezone ==="
timedatectl set-timezone America/Santiago

echo "=== Habilitando fail2ban ==="
systemctl enable fail2ban
systemctl start fail2ban

echo "✓ Configuración del servidor completada!"
echo ""
echo "Ahora cambia a usuario deployer con: su - deployer"
