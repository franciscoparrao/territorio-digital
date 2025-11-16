# Instrucciones de Deploy - Territorio Digital
## IP del Servidor: 161.35.134.23

Esta es tu guía personalizada de deploy con la IP específica de tu droplet.

---

## PASO 1: Configurar DNS (HACER PRIMERO)

Ve al panel de administración de tu dominio `territorio-digital.cl` y agrega estos registros DNS:

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | @ | 161.35.134.23 | 3600 |
| A | www | 161.35.134.23 | 3600 |

**IMPORTANTE:** La propagación DNS puede tomar de 5 a 30 minutos. Mientras tanto, puedes continuar con los siguientes pasos.

### Verificar propagación DNS

Desde tu máquina local, ejecuta:

```bash
dig territorio-digital.cl
dig www.territorio-digital.cl
```

Deberías ver `161.35.134.23` en la sección ANSWER.

---

## PASO 2: Conectarse al Servidor

```bash
ssh root@161.35.134.23
```

Si es la primera vez, te preguntará si confías en el servidor, escribe `yes`.

---

## PASO 3: Configuración Inicial del Servidor

Copia y pega este comando completo en el servidor:

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && rm get-docker.sh

# Instalar Docker Compose
apt install -y docker-compose-plugin git ufw fail2ban

# Verificar instalaciones
docker --version
docker compose version

# Crear usuario deployer
adduser --disabled-password --gecos "" deployer || true
usermod -aG docker deployer
usermod -aG sudo deployer

# Configurar firewall
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Configurar swap (2GB)
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Instalar Certbot para SSL
apt install -y certbot python3-certbot-nginx

# Configurar timezone
timedatectl set-timezone America/Santiago

echo "✓ Servidor configurado correctamente!"
```

---

## PASO 4: Cambiar a Usuario Deployer

```bash
su - deployer
```

---

## PASO 5: Clonar el Repositorio

```bash
# Asegúrate de estar en el home de deployer
cd ~

# Clonar el proyecto (ajusta la URL si es necesario)
git clone https://github.com/franciscoparrao/territorio-digital.git

# Entrar al directorio
cd territorio-digital

# Verificar que estás en el directorio correcto
pwd
# Debería mostrar: /home/deployer/territorio-digital
```

---

## PASO 6: Configurar Variables de Entorno

```bash
# Copiar el template
cp .env.production.example .env.production

# Editar el archivo
nano .env.production
```

Configura estos valores (usa las flechas del teclado para moverte):

```bash
# MongoDB Configuration
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=TuPasswordSuperSegura2025!

# MongoDB Database
MONGODB_DATABASE=territorio_digital

# Backend API Configuration - Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx  # App Password de Gmail (16 caracteres)
ADMIN_EMAIL=francisco.parra.o@usach.cl

# Frontend Configuration
VITE_API_URL=https://territorio-digital.cl/api

# Production URLs
PRODUCTION_URL=https://territorio-digital.cl
```

**IMPORTANTE sobre SMTP_PASSWORD:**
1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos" si no la tienes
3. Busca "Contraseñas de aplicaciones" o "App passwords"
4. Genera una nueva para "Mail"
5. Copia la contraseña de 16 caracteres (sin espacios)

Guardar: `Ctrl + O`, `Enter`, `Ctrl + X`

---

## PASO 7: Build y Deploy (Primera vez)

```bash
# Dar permisos al script de deploy
chmod +x deploy.sh

# Construir las imágenes (puede tomar 5-10 minutos)
docker compose build

# Iniciar todos los servicios
docker compose --env-file .env.production up -d

# Ver los logs en tiempo real
docker compose logs -f
```

Espera a ver mensajes como:
- `MongoDB started`
- `Backend listening on 0.0.0.0:3000`
- `Frontend running on port 3000`

Presiona `Ctrl + C` para salir de los logs (los servicios seguirán corriendo).

---

## PASO 8: Verificar que Funciona

```bash
# Verificar estado de los servicios
docker compose ps

# Deberías ver 4 servicios "running":
# - territorio-digital-mongodb
# - territorio-digital-backend
# - territorio-digital-frontend
# - territorio-digital-nginx

# Probar el health endpoint
curl http://localhost/health
# Debería responder: healthy
```

### Probar desde tu navegador

Abre tu navegador y ve a:
```
http://161.35.134.23
```

Deberías ver tu sitio web funcionando (aún sin HTTPS).

---

## PASO 9: Configurar SSL (HTTPS)

**IMPORTANTE:** Espera a que el DNS esté propagado antes de hacer esto. Verifica con `dig territorio-digital.cl` que apunte a `161.35.134.23`.

```bash
# Detener nginx temporalmente
docker compose stop nginx

# Obtener certificados SSL (ejecutar como root)
exit  # Salir de deployer, volver a root
sudo certbot certonly --standalone -d territorio-digital.cl -d www.territorio-digital.cl
```

Te preguntará:
- Email: `francisco.parra.o@usach.cl`
- Términos de servicio: `Y`
- Compartir email con EFF: `N` (opcional)

Los certificados se guardarán en: `/etc/letsencrypt/live/territorio-digital.cl/`

```bash
# Copiar certificados al proyecto
sudo mkdir -p /home/deployer/territorio-digital/ssl
sudo cp /etc/letsencrypt/live/territorio-digital.cl/fullchain.pem /home/deployer/territorio-digital/ssl/
sudo cp /etc/letsencrypt/live/territorio-digital.cl/privkey.pem /home/deployer/territorio-digital/ssl/
sudo chown -R deployer:deployer /home/deployer/territorio-digital/ssl
sudo chmod 644 /home/deployer/territorio-digital/ssl/fullchain.pem
sudo chmod 600 /home/deployer/territorio-digital/ssl/privkey.pem

# Volver a usuario deployer
su - deployer
cd ~/territorio-digital
```

---

## PASO 10: Activar HTTPS en Nginx

```bash
# Editar configuración de nginx
nano nginx.conf
```

Hacer estos cambios:

### 1. Descomentar bloque de redirect HTTP → HTTPS (líneas ~34-39):

ANTES:
```nginx
# server {
#     listen 80;
#     server_name territorio-digital.cl www.territorio-digital.cl;
#     return 301 https://$server_name$request_uri;
# }
```

DESPUÉS:
```nginx
server {
    listen 80;
    server_name territorio-digital.cl www.territorio-digital.cl;
    return 301 https://$server_name$request_uri;
}
```

### 2. Comentar el listen 80 del bloque principal (línea ~43):

ANTES:
```nginx
    listen 80;
```

DESPUÉS:
```nginx
    # listen 80;
```

### 3. Descomentar configuración SSL (líneas ~47-52):

ANTES:
```nginx
    # listen 443 ssl http2;
    # ssl_certificate /etc/nginx/ssl/fullchain.pem;
    # ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    # ssl_protocols TLSv1.2 TLSv1.3;
    # ssl_ciphers HIGH:!aNULL:!MD5;
    # ssl_prefer_server_ciphers on;
```

DESPUÉS:
```nginx
    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
```

Guardar: `Ctrl + O`, `Enter`, `Ctrl + X`

---

## PASO 11: Reiniciar Nginx con SSL

```bash
# Reiniciar nginx
docker compose up -d nginx

# Ver logs para verificar
docker compose logs nginx

# Verificar todos los servicios
docker compose ps
```

---

## PASO 12: Verificar HTTPS Funciona

Abre tu navegador y ve a:
```
https://territorio-digital.cl
https://www.territorio-digital.cl
```

Deberías ver:
- ✅ Candado verde de SSL
- ✅ Tu sitio web cargando correctamente
- ✅ HTTP redirige automáticamente a HTTPS

---

## PASO 13: Configurar Renovación Automática de SSL

Como root:

```bash
exit  # Salir de deployer
sudo nano /etc/cron.d/certbot-renew
```

Agregar esta línea:

```
0 3 * * * root certbot renew --quiet --deploy-hook "cd /home/deployer/territorio-digital && cp /etc/letsencrypt/live/territorio-digital.cl/fullchain.pem ssl/ && cp /etc/letsencrypt/live/territorio-digital.cl/privkey.pem ssl/ && docker compose restart nginx"
```

Guardar y dar permisos:

```bash
sudo chmod 644 /etc/cron.d/certbot-renew
```

---

## ✅ DEPLOY COMPLETADO!

Tu aplicación está funcionando en:
- 🌐 **Sitio web:** https://territorio-digital.cl
- 🔌 **API:** https://territorio-digital.cl/api
- 📧 **Contacto:** https://territorio-digital.cl/contacto

---

## Comandos Útiles para el Día a Día

```bash
# Conectarse al servidor
ssh deployer@161.35.134.23

# Ver estado de servicios
cd ~/territorio-digital
docker compose ps

# Ver logs
docker compose logs -f

# Reiniciar un servicio
docker compose restart backend
docker compose restart frontend
docker compose restart nginx

# Actualizar código y redeploy
git pull origin master
docker compose --env-file .env.production up -d --build

# Backup de MongoDB
./deploy.sh  # Opción 8

# Ver uso de recursos
docker stats
```

---

## Troubleshooting Rápido

### El sitio no carga
```bash
# Verificar servicios
docker compose ps

# Ver logs de nginx
docker compose logs nginx
```

### Error 502
```bash
# Reiniciar backend y frontend
docker compose restart backend frontend
```

### Problemas con MongoDB
```bash
docker compose logs mongodb
docker compose restart mongodb
```

---

## Contacto en Caso de Problemas

Si tienes problemas:
1. Revisa los logs: `docker compose logs -f`
2. Verifica el estado: `docker compose ps`
3. Consulta DEPLOY.md para troubleshooting completo

**Email de soporte:** francisco.parra.o@usach.cl
