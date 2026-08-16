---
title: "SurtGIS fue aceptado en Environmental Modelling & Software (Elsevier, Q1)"
excerpt: "Nuestro motor geoespacial en Rust fue publicado en una de las revistas de referencia en modelación ambiental. Qué significa esto y por qué importa para proyectos en Chile."
author: "Francisco Parra"
date: "2026-08-15"
readingTime: 5
category: "investigacion"
tags: ["SurtGIS", "Rust", "GIS", "Publicación Científica", "Análisis Geoespacial", "Chile", "Environmental Modelling"]
featured: true
---

# SurtGIS fue aceptado en Environmental Modelling & Software (Elsevier, Q1)

El pasado mes de agosto, **SurtGIS** fue aceptado para publicación en [*Environmental Modelling & Software*](https://doi.org/10.1016/j.envsoft.2026.107102) (Elsevier), una de las revistas de mayor impacto en modelación ambiental y ciencias de la computación aplicadas (JIF ~4.9, Q1). Para Territorio Digital, es la primera publicación científica que respalda formalmente el trabajo técnico que hacemos en análisis geoespacial.

## Qué es SurtGIS y qué problema resuelve

Quien trabaja con datos geoespaciales en Chile sabe el problema: los flujos de trabajo GIS son lentos. Procesar un modelo digital de elevación (DEM) de la cuenca del Maule, calcular redes de drenaje para una cuenca en la Araucanía, o generar mapas de pendiente para un estudio de riesgo en zonas cordilleranas puede tomar horas en herramientas convencionales como GDAL o GRASS GIS.

SurtGIS fue construido para resolver exactamente eso. Es un motor de análisis geoespacial escrito desde cero en **Rust** — el lenguaje que combina velocidad de C con seguridad de memoria — sin depender de GDAL ni de ninguna librería externa de C/C++. Los benchmarks del paper son directos:

| Herramienta | Tiempo relativo (cálculo de pendiente) |
|---|---|
| **SurtGIS** | 1× (referencia) |
| GDAL | 8.2× más lento |
| GRASS GIS | 21.7× más lento |

Esto no es una mejora marginal. En un proyecto con decenas de cuencas o con DEMs de alta resolución (1 m o 5 m), la diferencia entre horas y minutos cambia lo que es viable en un plazo de proyecto.

## Qué incluye el motor

El paper describe 105 algoritmos organizados en nueve categorías:

- **Terreno**: pendiente, aspecto, curvatura (sistema completo de 14 variables de Florinsky), índices de posición topográfica, viewshed, sky view factor
- **Hidrología**: relleno de depresiones (Priority-Flood), direcciones de flujo (D8, D-infinito, MFD), TWI, extracción de red de drenaje, delineación de cuencas
- **Imágenes**: índices de vegetación y humedad, clasificación supervisada

Una característica que no tiene equivalente en herramientas existentes: el mismo código compila a **binario nativo** (para servidores y desktop) y a **WebAssembly** (para ejecutar en el navegador). Esto permite construir aplicaciones GIS que corren completamente en el cliente, sin servidor, lo que tiene aplicaciones directas en sistemas de consulta pública o plataformas educativas.

## Por qué esto importa para proyectos en Chile

Chile tiene una geografía que exige análisis geoespacial intensivo: glaciares en retroceso, cuencas hídricas bajo presión, zonas de riesgo volcánico, incendios forestales que avanzan por terreno accidentado. Los proyectos que necesitan modelar estos fenómenos — estudios de impacto ambiental, planes de manejo de cuencas, sistemas de alerta temprana — dependen de herramientas que puedan procesar grandes volúmenes de datos en plazos reales.

La publicación en Environmental Modelling & Software valida que SurtGIS cumple los estándares de reproducibilidad y rigor metodológico que ese tipo de proyectos requiere. No es solo rápido — es verificable.

## Próximos pasos

SurtGIS es open source. La publicación completa está disponible en [doi.org/10.1016/j.envsoft.2026.107102](https://doi.org/10.1016/j.envsoft.2026.107102). Si trabajas en análisis de cuencas, modelación de riesgo, teledetección o cualquier flujo de trabajo que hoy dependa de GDAL o GRASS y quieres explorar si SurtGIS puede acelerar tu pipeline, escríbenos.

---

*Francisco Parra es investigador y fundador de Territorio Digital. Desarrolló SurtGIS en el contexto de proyectos geoespaciales para organizaciones públicas y privadas en Chile.*
