---
title: "¿Pueden los satélites monitorear las aguas subterráneas? Lo pusimos a prueba en Coquimbo"
excerpt: "Validamos GRACE, ERA5-Land y MODIS contra 56 años de datos de 121 pozos DGA en nueve cuencas de la región de Coquimbo. Los resultados —publicados en Journal of Hydrology (Elsevier, Q1)— dicen algo incómodo sobre la megasequía."
author: "Francisco Parra"
date: "2026-08-16"
readingTime: 6
category: "investigacion"
tags: ["Hidrología", "GRACE", "Teledetección", "Aguas Subterráneas", "Coquimbo", "Sequía", "Google Earth Engine", "Publicación Científica"]
featured: true
---

# ¿Pueden los satélites monitorear las aguas subterráneas? Lo pusimos a prueba en Coquimbo

Las aguas subterráneas son el recurso hídrico más difícil de monitorear: están bajo tierra, los pozos de observación son caros de mantener, y las redes de medición tienen vacíos temporales y espaciales enormes. Por eso la promesa de monitorearlas desde el espacio —con misiones como GRACE, que mide cambios en la masa de agua terrestre— es tan atractiva para regiones áridas como el norte de Chile.

Pero, ¿qué tan bien funcionan realmente estos productos satelitales en cuencas chilenas? Esa es la pregunta que respondimos en un estudio recién publicado en [*Journal of Hydrology*](https://doi.org/10.1016/j.jhydrol.2026.136157) (Elsevier, Q1), una de las revistas de referencia mundial en ciencias hídricas.

## Qué hicimos

Validamos tres productos satelitales de acceso gratuito —**GRACE/GRACE-FO** (almacenamiento total de agua), **ERA5-Land** (precipitación) y **MODIS NDVI** (vigor de vegetación)— contra el estándar de oro: mediciones directas de profundidad de nivel freático.

La base de comparación no fue menor:

- **121 pozos de monitoreo DGA** con registros de hasta **56 años** (1970–2025)
- **Nueve cuencas** de la región de Coquimbo: Elqui, Limarí, Choapa, Los Choros, Quilimarí y las cuencas costeras intermedias
- **~39.500 km²** de territorio semiárido

Todo el procesamiento satelital se hizo con Google Earth Engine, y el código completo del análisis es [abierto y reproducible](https://github.com/franciscoparrao).

## Qué encontramos

**1. GRACE sí detecta la señal de las aguas subterráneas a escala de cuenca — en las cuencas grandes.** En Limarí, Elqui y Los Choros, la correlación anual entre el satélite y los pozos alcanzó valores de r = −0.69 a −0.76 (el signo negativo es el esperado: cuando el satélite ve más agua almacenada, la profundidad al nivel freático disminuye). Para planificación hídrica a escala regional, esa señal es utilizable.

**2. En cuencas chicas, no.** En Choapa y Quilimarí la correlación fue prácticamente nula. La resolución espacial de GRACE (~300 km) simplemente no resuelve cuencas pequeñas o acuíferos con dinámicas locales dominadas por extracción.

**3. El hallazgo incómodo: la megasequía rompió la relación.** Antes de la megasequía (2002–2009), la correlación anual entre GRACE y los pozos era fuerte: **r = −0.85**. Durante la megasequía (2010–2021), colapsó a **r = −0.12** — estadísticamente indistinguible de cero.

¿Por qué importa esto? Porque el período en que más se necesita monitorear las aguas subterráneas —una sequía prolongada con extracción intensiva— es exactamente cuando el satélite pierde la pista. Nuestra interpretación: durante la megasequía, el bombeo desacopló los niveles freáticos de la señal climática que GRACE observa. El acuífero dejó de responder al clima y empezó a responder a las bombas.

## Qué significa para la gestión hídrica en Chile

- **Los satélites son un complemento, no un reemplazo, de las redes de pozos.** Cualquier propuesta de "monitoreo satelital de acuíferos" que no lo diga con esa claridad está sobrevendiendo la tecnología.
- **A escala de cuenca grande y en condiciones climáticas normales, GRACE aporta información real** — útil para balances hídricos regionales, reportes de estado y detección de tendencias de largo plazo.
- **Las redes de monitoreo in situ (DGA) son más valiosas que nunca**, precisamente porque son el único instrumento que sigue funcionando cuando la extracción domina la dinámica del acuífero.
- **La validación local no es opcional.** Los productos satelitales globales se calibran con datos de otras latitudes; antes de usarlos para decisiones en Chile, hay que contrastarlos con datos de terreno chilenos. Ese es exactamente el tipo de estudio que hicimos.

## Próximos pasos

El artículo está disponible en [doi.org/10.1016/j.jhydrol.2026.136157](https://doi.org/10.1016/j.jhydrol.2026.136157). Si tu organización —sanitaria, agrícola, minera o servicio público— necesita evaluar qué productos satelitales sirven (y cuáles no) para su territorio específico, ese análisis de validación es un servicio que ofrecemos: mismos métodos, misma rigurosidad, aplicados a tu cuenca.

---

*Francisco Parra es investigador y fundador de Territorio Digital. Doctor en Ciencias de la Ingeniería mención Informática (USACH) y Geólogo (Universidad de Chile). El estudio fue desarrollado junto a J. F. Rubilar.*
