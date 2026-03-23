---
title: "SurtGIS Quickstart: Análisis de terreno de los Andes en 5 minutos"
excerpt: "De instalación a mapa de pendientes de la cordillera de los Andes en 10 comandos. Sin Python, sin GDAL, sin configuración."
author: "Francisco Parra"
date: "2026-03-22"
readingTime: 8
category: "tutoriales"
tags: ["SurtGIS", "Rust", "GIS", "Terrain Analysis", "CLI", "STAC", "DEM"]
featured: true
---

# SurtGIS Quickstart: Análisis de terreno de los Andes en 5 minutos

SurtGIS es una herramienta de análisis geoespacial de alto rendimiento escrita en Rust. En este tutorial vamos de cero a un análisis completo de terreno de la cordillera de los Andes — descarga de datos, 17 factores de terreno, hidrología, y landscape metrics — todo desde la línea de comandos.

**Requisito**: tener Rust instalado (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`).

## 1. Instalación

```bash
cargo install surtgis
```

Verifica:

```bash
surtgis --version
surtgis --help
```

## 2. Descargar un DEM desde la nube

SurtGIS tiene un cliente STAC integrado que descarga datos de Planetary Computer y Earth Search. Descargamos un DEM Copernicus de 30m de una zona de la cordillera central de Chile:

```bash
surtgis stac fetch-mosaic \
  --catalog es \
  --bbox -70.5,-33.6,-70.2,-33.3 \
  --collection cop-dem-glo-30 \
  --asset data \
  --max-items 10 \
  dem_andes.tif
```

Esto automáticamente:
- Busca los tiles que cubren tu área de interés
- Descarga solo la ventana que necesitas (HTTP range requests)
- Une los tiles en un solo raster (mosaic)

Verificamos:

```bash
surtgis info dem_andes.tif
```

```
Dimensions: 1080 x 1080 (1166400 cells)
Cell size: 0.000277...
Bounds: (-70.5, -33.6) - (-70.2, -33.3)
CRS: EPSG:4326
```

## 3. Todos los factores de terreno en un comando

```bash
surtgis terrain all dem_andes.tif --outdir factores/ --compress
```

Esto calcula **17 productos** en una sola pasada:
- slope, aspect, hillshade
- northness, eastness
- curvature, TPI, TRI
- geomorphons (clasificación de landforms)
- DEV, VRM (rugosidad)
- convergence index
- openness positiva y negativa
- Sky View Factor
- MRVBF y MRRTF

```
Computing all terrain factors...
  slope.tif
  aspect.tif
  hillshade.tif
  ...
  mrvbf.tif, mrrtf.tif

All terrain factors saved to: factores/
  17 products, processing time: 2.31s
```

## 4. Pipeline hidrológico completo

```bash
surtgis hydrology all dem_andes.tif --outdir hidro/ --compress --threshold 500
```

Genera **8 productos** en cadena (fill → flow direction → flow accumulation → TWI → HAND → streams):

```
Computing full hydrology pipeline...
  filled.tif
  flow_direction_d8.tif
  flow_direction_dinf.tif
  flow_accumulation.tif
  flow_accumulation_mfd.tif
  twi.tif
  stream_network.tif
  hand.tif

Full hydrology pipeline saved to: hidro/
  8 products, processing time: 0.85s
```

## 5. Recortar por un polígono

Si tienes un shapefile o GeoJSON de tu área de estudio:

```bash
surtgis clip --polygon mi_cuenca.shp factores/slope.tif slope_cuenca.tif
```

Soporta `.geojson`, `.shp`, y `.gpkg` — auto-detecta el formato.

## 6. Índices espectrales con expresiones

Calcula cualquier índice espectral con una expresión matemática:

```bash
surtgis imagery calc \
  --expression "(NIR - Red) / (NIR + Red)" \
  --band NIR=nir.tif --band Red=red.tif \
  ndvi.tif
```

O usa los índices predefinidos:

```bash
surtgis imagery ndvi --nir nir.tif --red red.tif ndvi.tif
surtgis imagery ndbi --swir swir.tif --nir nir.tif ndbi.tif
surtgis imagery msavi --nir nir.tif --red red.tif msavi.tif
```

## 7. Composite satelital cloud-free (avanzado)

El comando más potente de SurtGIS. Un solo comando que:
1. Busca escenas Sentinel-2 en Planetary Computer
2. Agrupa por fecha
3. Une tiles espacialmente
4. Enmascara nubes con la banda SCL
5. Calcula la mediana temporal

```bash
surtgis stac composite \
  --catalog pc \
  --bbox -70.5,-33.6,-70.2,-33.3 \
  --collection sentinel-2-l2a \
  --asset red \
  --datetime 2024-01-01/2024-12-31 \
  --max-scenes 10 \
  composite_red.tif
```

**Ninguna otra herramienta CLI ofrece esto sin Python.**

## 8. Landscape metrics

Si tienes un raster clasificado (uso de suelo, geomorphons):

```bash
surtgis landscape analyze factores/geomorphons.tif \
  --output-labels labels.tif \
  --output-csv metricas_parches.csv
```

```
Patches: 45231

Class      Proportion    Patches       AI Cohesion   MeanArea
------------------------------------------------------------------
2              0.0365    16516     30.5       41.1      220.9
5              0.3322    44040     55.0       82.4      754.3
...

Landscape: SHDI=1.3319  SIDI=0.7083  classes=9
```

## 9. Streaming para DEMs grandes

Para DEMs que no caben en memoria (>500MB), SurtGIS automáticamente procesa por strips:

```bash
surtgis --streaming terrain slope dem_grande.tif slope.tif
```

Memoria constante de ~200MB independientemente del tamaño del DEM.

## 10. Compresión

Agrega `--compress` a cualquier comando para output DEFLATE:

```bash
surtgis --compress terrain slope dem.tif slope.tif
# 3.9MB → 3.4MB (13% ahorro en float32)
# Hasta 89% ahorro en datos categóricos
```

## Referencia rápida

| Tarea | Comando |
|-------|---------|
| Info de un raster | `surtgis info dem.tif` |
| Slope | `surtgis terrain slope dem.tif slope.tif` |
| Todos los factores | `surtgis terrain all dem.tif --outdir out/` |
| Pipeline hidrológico | `surtgis hydrology all dem.tif --outdir out/` |
| NDVI | `surtgis imagery ndvi --nir nir.tif --red red.tif ndvi.tif` |
| Índice custom | `surtgis imagery calc --expression "..." --band X=x.tif out.tif` |
| Clip por polígono | `surtgis clip --polygon area.shp raster.tif out.tif` |
| Mosaic de tiles | `surtgis mosaic -i a.tif -i b.tif out.tif` |
| Descargar DEM | `surtgis stac fetch-mosaic --collection cop-dem-glo-30 --bbox ... out.tif` |
| Composite S2 | `surtgis stac composite --collection sentinel-2-l2a --asset red ... out.tif` |
| Landscape analysis | `surtgis landscape analyze class.tif --output-csv metrics.csv` |
| Rasterizar vector | `surtgis rasterize --reference dem.tif poly.shp out.tif` |

## Links

- **Código fuente**: [github.com/franciscoparrao/surtgis](https://github.com/franciscoparrao/surtgis)
- **Paper**: En revisión en *Environmental Modelling & Software* (Elsevier)
- **90 subcomandos CLI**: `surtgis terrain --help`, `surtgis hydrology --help`, `surtgis imagery --help`

---

*SurtGIS es software libre bajo licencia MIT/Apache-2.0. Desarrollado en la Universidad de Santiago de Chile.*
