# Guía de Deploy - Territorio Digital

Esta guía detalla el proceso completo para desplegar Territorio Digital en Digital Ocean.

## Tabla de Contenidos

1. [Prerequisitos](#prerequisitos)
2. [Configuración del Servidor](#configuración-del-servidor)
3. [Configuración del Dominio](#configuración-del-dominio)
4. [Deploy de la Aplicación](#deploy-de-la-aplicación)
5. [Configuración SSL (HTTPS)](#configuración-ssl-https)
6. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisitos

### Lo que necesitas tener listo:

- ✅ Cuenta en Digital Ocean
- ✅ Dominio: `territorio-digital.cl` configurado
- ✅ Credenciales SMTP para envío de emails (Gmail recomendado)
- ✅ Contraseñas seguras para MongoDB
- ✅ Cliente SSH instalado en tu máquina local

### Costos estimados en Digital Ocean:

- **Droplet Basic**: $6-12 USD/mes (2GB RAM recomendado)
- **Dominio**: Ya lo tienes
- **SSL**: Gratis con Let's Encrypt

---

## Configuración del Servidor

### Paso 1: Crear un Droplet en Digital Ocean

1. Ingresa a tu cuenta de Digital Ocean
2. Click en "Create" → "Droplets"
3. Selecciona las siguientes opciones:
   - **Región**: Más cercana a Chile (Santiago si disponible, o New York)
   - **Imagen**: Ubuntu 22.04 LTS x64
   - **Plan**: Basic ($12/mes - 2GB RAM, 1 CPU, 50GB SSD)
   - **Autenticación**: SSH Key (recomendado) o Password
   - **Hostname**: `territorio-digital`

4. Click en "Create Droplet"
5. Espera 1-2 minutos a que el droplet se cree
6. Anota la **IP pública** que te asignan (ejemplo: 164.90.xxx.xxx)

### Paso 2: Conectarte al Servidor via SSH

```bash
# Desde tu máquina local
ssh root@TU_IP_PUBLICA

# Ejemplo:
# ssh root@164.90.123.456
```

### Paso 3: Configuración Inicial del Servidor

Una vez conectado al servidor, ejecuta estos comandos:

```bash
# 1. Actualizar el sistema
apt update && apt upgrade -y

# 2. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Instalar Docker Compose
apt install docker-compose-plugin -y

# 4. Verificar instalación
docker --version
docker compose version

# 5. Instalar Git
apt install git -y

# 6. Crear usuario no-root (más seguro)
adduser deployer
usermod -aG docker deployer
usermod -aG sudo deployer

# 7. Configurar firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

---

## Configuración del Dominio

### Paso 1: Configurar DNS en tu proveedor de dominio

Necesitas agregar estos registros DNS en el panel de tu proveedor de `territorio-digital.cl`:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | TU_IP_PUBLICA | 3600 |
| A | www | TU_IP_PUBLICA | 3600 |
| CNAME | api | territorio-digital.cl | 3600 |

**Ejemplo con IP ficticia 164.90.123.456:**
```
A     @     164.90.123.456
A     www   164.90.123.456
CNAME api   territorio-digital.cl
```

### Paso 2: Verificar propagación DNS

Espera 5-30 minutos y verifica con:

```bash
# Desde tu máquina local
dig territorio-digital.cl
dig www.territorio-digital.cl

# Deberías ver tu IP pública en la sección ANSWER
```

---

## Deploy de la Aplicación

### Paso 1: Clonar el repositorio

Conéctate como usuario `deployer`:

```bash
# Desde root
su - deployer

# Clonar el proyecto
cd ~
git clone https://github.com/franciscoparrao/territorio-digital.git
cd territorio-digital
```

### Paso 2: Configurar variables de entorno

```bash
# Copiar el template de producción
cp .env.production.example .env.production

# Editar el archivo con tus credenciales
nano .env.production
```

Configura estos valores:

```bash
# MongoDB Configuration
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=TU_CONTRASEÑA_SUPER_SEGURA_AQUÍ

# MongoDB Database
MONGODB_DATABASE=territorio_digital

# Backend API Configuration - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password-de-gmail
ADMIN_EMAIL=francisco.parra.o@usach.cl

# Frontend Configuration
VITE_API_URL=https://territorio-digital.cl/api

# Production URLs
PRODUCTION_URL=https://territorio-digital.cl
```

**IMPORTANTE sobre SMTP_PASSWORD:**
- NO uses tu contraseña de Gmail normal
- Usa una "App Password":
  1. Ve a https://myaccount.google.com/security
  2. Activa "Verificación en 2 pasos" si no la tienes
  3. Ve a "App passwords"
  4. Genera una nueva contraseña para "Mail"
  5. Usa esa contraseña de 16 caracteres

Guarda el archivo: `Ctrl + O`, `Enter`, `Ctrl + X`

### Paso 3: Construir e iniciar los contenedores

```bash
# Construir las imágenes (puede tomar 5-10 minutos)
docker compose build

# Iniciar todos los servicios
docker compose --env-file .env.production up -d

# Ver los logs
docker compose logs -f

# Verificar que todos los servicios estén corriendo
docker compose ps
```

Deberías ver 4 servicios activos:
- `territorio-digital-mongodb`
- `territorio-digital-backend`
- `territorio-digital-frontend`
- `territorio-digital-nginx`

### Paso 4: Verificar que funcione

```bash
# Desde el servidor
curl http://localhost/health
# Debería responder: healthy

# Desde tu navegador
http://TU_IP_PUBLICA
# Debería cargar tu sitio (sin HTTPS aún)
```

---

## Configuración SSL (HTTPS)

### Paso 1: Instalar Certbot

```bash
# En el servidor como deployer
sudo apt install certbot python3-certbot-nginx -y
```

### Paso 2: Detener Nginx temporalmente

```bash
cd ~/territorio-digital
docker compose stop nginx
```

### Paso 3: Obtener certificados SSL

```bash
sudo certbot certonly --standalone -d territorio-digital.cl -d www.territorio-digital.cl
```

Sigue las instrucciones:
- Ingresa tu email (usará el del ADMIN_EMAIL)
- Acepta los términos de servicio
- Los certificados se guardarán en: `/etc/letsencrypt/live/territorio-digital.cl/`

### Paso 4: Copiar certificados al proyecto

```bash
# Crear directorio ssl en el proyecto
mkdir -p ~/territorio-digital/ssl

# Copiar certificados
sudo cp /etc/letsencrypt/live/territorio-digital.cl/fullchain.pem ~/territorio-digital/ssl/
sudo cp /etc/letsencrypt/live/territorio-digital.cl/privkey.pem ~/territorio-digital/ssl/

# Dar permisos correctos
sudo chown -R deployer:deployer ~/territorio-digital/ssl
sudo chmod 644 ~/territorio-digital/ssl/fullchain.pem
sudo chmod 600 ~/territorio-digital/ssl/privkey.pem
```

### Paso 5: Activar SSL en Nginx

Edita el archivo `nginx.conf`:

```bash
cd ~/territorio-digital
nano nginx.conf
```

Descomenta estas líneas:

```nginx
# En la línea ~34-39, descomentar el bloque de redirect HTTP → HTTPS:
server {
    listen 80;
    server_name territorio-digital.cl www.territorio-digital.cl;
    return 301 https://$server_name$request_uri;
}

# En la línea ~47-52, descomentar la configuración SSL:
listen 443 ssl http2;
ssl_certificate /etc/nginx/ssl/fullchain.pem;
ssl_certificate_key /etc/nginx/ssl/privkey.pem;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

Y **comenta** la línea 43:
```nginx
# listen 80;  <- agregar # al inicio
```

Guarda: `Ctrl + O`, `Enter`, `Ctrl + X`

### Paso 6: Reiniciar Nginx

```bash
docker compose up -d nginx
docker compose logs nginx
```

### Paso 7: Configurar renovación automática

Los certificados de Let's Encrypt duran 90 días. Configura renovación automática:

```bash
# Crear script de renovación
sudo nano /etc/cron.d/certbot-renew
```

Agrega este contenido:

```
0 3 * * * root certbot renew --quiet --deploy-hook "cd /home/deployer/territorio-digital && cp /etc/letsencrypt/live/territorio-digital.cl/fullchain.pem ssl/ && cp /etc/letsencrypt/live/territorio-digital.cl/privkey.pem ssl/ && docker compose restart nginx"
```

Guarda y dale permisos:

```bash
sudo chmod 644 /etc/cron.d/certbot-renew
```

### Paso 8: Verificar HTTPS

Visita en tu navegador:
- https://territorio-digital.cl
- https://www.territorio-digital.cl

Deberías ver el candado verde de SSL.

---

## Monitoreo y Mantenimiento

### Comandos útiles

```bash
# Ver estado de todos los servicios
docker compose ps

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
docker compose logs -f mongodb

# Reiniciar un servicio
docker compose restart backend

# Reiniciar todo
docker compose restart

# Detener todo
docker compose down

# Detener y eliminar volúmenes (¡CUIDADO! Borra la base de datos)
docker compose down -v

# Ver uso de recursos
docker stats
```

### Actualizaciones del código

Cuando hagas cambios en tu repositorio:

```bash
# Conectarse al servidor
ssh deployer@territorio-digital.cl

# Ir al directorio del proyecto
cd ~/territorio-digital

# Descargar cambios
git pull origin master

# Reconstruir e reiniciar
docker compose --env-file .env.production up -d --build

# Ver logs para verificar
docker compose logs -f
```

### Backups de MongoDB

```bash
# Crear backup manual
docker compose exec mongodb mongodump \
  --username=admin \
  --password=TU_PASSWORD \
  --authenticationDatabase=admin \
  --db=territorio_digital \
  --out=/data/backup

# Copiar backup a tu máquina local
docker cp territorio-digital-mongodb:/data/backup ./backup-$(date +%Y%m%d)

# Programar backups automáticos (agregar a crontab)
crontab -e

# Agregar esta línea (backup diario a las 2 AM):
0 2 * * * cd /home/deployer/territorio-digital && docker compose exec -T mongodb mongodump --username=admin --password=TU_PASSWORD --authenticationDatabase=admin --db=territorio_digital --out=/data/backup-$(date +\%Y\%m\%d)
```

### Monitoreo de espacio en disco

```bash
# Ver uso de disco
df -h

# Ver tamaño de contenedores e imágenes
docker system df

# Limpiar imágenes no usadas (recuperar espacio)
docker system prune -a
```

---

## Troubleshooting

### El sitio no carga

```bash
# 1. Verificar que los servicios estén corriendo
docker compose ps

# 2. Ver logs de nginx
docker compose logs nginx

# 3. Verificar firewall
sudo ufw status

# 4. Probar localmente
curl http://localhost/health
```

### Error 502 Bad Gateway

Significa que Nginx no puede conectarse al backend o frontend:

```bash
# Verificar que backend y frontend estén corriendo
docker compose ps

# Ver logs del servicio que falla
docker compose logs backend
docker compose logs frontend

# Reiniciar servicios
docker compose restart backend frontend
```

### MongoDB no se conecta

```bash
# Ver logs de MongoDB
docker compose logs mongodb

# Verificar health check
docker compose ps mongodb

# Verificar credenciales en .env.production
cat .env.production | grep MONGO

# Reiniciar MongoDB
docker compose restart mongodb
```

### Los emails no se envían

```bash
# Ver logs del backend
docker compose logs backend | grep -i smtp

# Verificar credenciales SMTP
cat .env.production | grep SMTP

# Probar manualmente desde el servidor
curl -X POST https://territorio-digital.cl/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
```

### SSL no funciona

```bash
# Verificar certificados
ls -la ~/territorio-digital/ssl/

# Ver logs de nginx
docker compose logs nginx | grep -i ssl

# Verificar configuración de nginx
cat nginx.conf | grep -A 5 "ssl_certificate"

# Renovar certificado manualmente
sudo certbot renew --force-renewal
```

### Out of Memory

Si el servidor se queda sin memoria:

```bash
# Ver uso de recursos
docker stats

# Aumentar swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Hacer permanente
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Ver logs de errores específicos

```bash
# Errores del backend (Rust)
docker compose logs backend | grep -i error

# Errores del frontend (SvelteKit)
docker compose logs frontend | grep -i error

# Errores de nginx
docker compose logs nginx | grep -i error

# Últimas 100 líneas de logs
docker compose logs --tail=100 backend
```

---

## Checklist Pre-Deploy

Antes de hacer deploy a producción, verifica:

- [ ] `.env.production` está configurado con credenciales reales
- [ ] Contraseñas de MongoDB son seguras (mínimo 16 caracteres aleatorios)
- [ ] SMTP está configurado con App Password de Gmail
- [ ] DNS apunta a la IP correcta del servidor
- [ ] Firewall permite puertos 80 y 443
- [ ] Docker y Docker Compose están instalados
- [ ] SSL certificados están generados
- [ ] Nginx tiene configuración SSL descomentada
- [ ] Has probado el sitio en HTTP primero
- [ ] Backups automáticos están configurados

---

## Recursos Adicionales

- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [Let's Encrypt Docs](https://letsencrypt.org/docs/)
- [Digital Ocean Tutorials](https://www.digitalocean.com/community/tutorials)
- [SvelteKit Deployment](https://kit.svelte.dev/docs/adapter-node)

---

## Soporte

Si tienes problemas, revisa:
1. Los logs con `docker compose logs -f`
2. La sección de Troubleshooting de esta guía
3. El estado de los servicios con `docker compose ps`

Para reportar bugs: francisco.parra.o@usach.cl
