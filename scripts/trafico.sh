#!/usr/bin/env bash
# Resumen de tráfico a partir del log de acceso de nginx.
#
# No requiere cookies ni consentimiento: nginx ya registra cada petición y este
# script solo la agrega. Útil sobre todo para medir el efecto de una
# publicación en redes sobre /visor/, que al ser un archivo estático queda
# fuera del Analytics del sitio.
#
# Uso:
#   ./trafico.sh              resumen general
#   ./trafico.sh /visor/      solo esa ruta
#   ./trafico.sh /visor/ 3    solo esa ruta, últimos 3 días

set -euo pipefail

SERVIDOR="${TD_SERVIDOR:-root@161.35.134.23}"
RUTA="${1:-}"
DIAS="${2:-0}"

# Se descarta el ruido que no representa visitas reales.
BOTS='bot|crawl|spider|slurp|bingpreview|headless|curl|wget|python-requests|semrush|ahrefs|dataprovider|facebookexternalhit|okhttp'
# Escáneres de internet que aparecen como referente sin ser visitas reales.
ESCANERES='internet-measurement|censys|modat\.io|scrapy|example\.com|getodin|shodan|leakix|netsystems|paloaltonetworks'

# Desde el 29-ago los logs se escriben en archivos del host y ya no en
# `docker logs`. Se incluyen los rotados y el histórico rescatado antes
# del cambio, para no perder continuidad.
echo "Descargando el log de acceso…"
CRUDO=$(mktemp) && trap 'rm -f "$CRUDO"' EXIT
ssh "$SERVIDOR" "
	cd /var/log/territorio-digital 2>/dev/null || exit 0
	zcat -f acceso-historico-*.log.gz 2>/dev/null
	zcat -f access.log.*.gz 2>/dev/null
	cat access.log.[0-9]* 2>/dev/null
	cat access.log 2>/dev/null
" > "$CRUDO"

# Ventana temporal opcional
if [ "$DIAS" -gt 0 ]; then
	PATRON=""
	for i in $(seq 0 $((DIAS - 1))); do
		D=$(date -u -d "-$i day" +%d/%b/%Y)
		PATRON="${PATRON}${PATRON:+|}\[$D"
	done
	FILTRADO=$(mktemp) && trap 'rm -f "$CRUDO" "$FILTRADO"' EXIT
	grep -E "$PATRON" "$CRUDO" > "$FILTRADO" || true
	CRUDO="$FILTRADO"
	echo "Ventana: últimos $DIAS día(s)"
fi

# Solo peticiones de página con éxito, excluyendo automatismos
HUMANO=$(mktemp) && trap 'rm -f "$HUMANO"' EXIT
grep -E '"GET [^"]*" (200|304)' "$CRUDO" | grep -viE "$BOTS" > "$HUMANO" || true

if [ -n "$RUTA" ]; then
	VISTA=$(grep -F "GET $RUTA " "$HUMANO" || true)
	TITULO="$RUTA"
else
	# Solo documentos, no recursos estáticos
	VISTA=$(grep -vE '\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2?|ttf|eot|wasm|tif|json|xml|txt)[ ?]' "$HUMANO" || true)
	TITULO="todo el sitio"
fi

TOTAL=$(printf '%s' "$VISTA" | grep -c . || true)
UNICOS=$(printf '%s\n' "$VISTA" | awk '{print $1}' | sort -u | grep -c . || true)

echo
echo "════════ TRÁFICO · $TITULO ════════"
printf "  %-22s %s\n" "visitas" "$TOTAL"
printf "  %-22s %s\n" "direcciones únicas" "$UNICOS"

echo
echo "── de dónde llegan ──"
printf '%s\n' "$VISTA" | awk -F'" "' '{print $2}' \
	| grep -vE '^-$|^$|territorio-digital\.cl' \
	| grep -viE "$ESCANERES" \
	| grep -oE 'https?://[^/]+' | sed 's|https\?://||;s/^www\.//' \
	| sort | uniq -c | sort -rn | head -10 | awk '{printf "  %-34s %s\n", $2, $1}' || echo "  (sin referentes externos)"

echo
echo "── páginas más vistas ──"
printf '%s\n' "$VISTA" | awk '{print $7}' | cut -d'?' -f1 \
	| sort | uniq -c | sort -rn | head -10 | awk '{printf "  %-34s %s\n", $2, $1}'

echo
echo "── por día ──"
printf '%s\n' "$VISTA" | grep -oE '\[[0-9]{2}/[A-Za-z]{3}/[0-9]{4}' | tr -d '[' \
	| awk -F/ 'BEGIN{split("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec",m," ");
		for(i in m) n[m[i]]=sprintf("%02d",i)}
		{printf "%s-%s-%s\n", $3, n[$2], $1}' \
	| sort | uniq -c | tail -10 | awk '{printf "  %-14s %s\n", $2, $1}'

if [ -n "$RUTA" ]; then
	echo
	echo "── redes sociales hacia $RUTA ──"
	for RED in linkedin twitter x.com facebook instagram t.co; do
		N=$(printf '%s\n' "$VISTA" | grep -ci "$RED" || true)
		[ "$N" -gt 0 ] && printf "  %-14s %s\n" "$RED" "$N"
	done
	echo "  (sin coincidencias significa que aún no llega tráfico desde ahí)"
fi
echo
