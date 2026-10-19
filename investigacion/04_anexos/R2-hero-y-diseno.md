# R2 · Hero con vídeo a pantalla completa y diseño web premium (2025-2026)

Línea de research para la auditoría de Spiralia AI (`/home/user/spiralia-ia-web`). Fecha: 19-oct-2026.

**Método.** Solo WebSearch: WebFetch no funciona en este entorno, así que no he podido abrir ninguna de las webs citadas. Cuando una afirmación sale de un resumen de búsqueda y no de la página original, lo digo. He revisado además la web en local (`http://localhost:8851/?still=1`) con capturas a 1440×900 y 390×844, el código del hero (`src/index.template.html`, `src/css/site.css`, `src/js/motion.js`) y el bucle descartado de `motion/_descartado/bucle-s/`. La investigación previa (`investigacion/01-03`) no se repite: se cita cuando hace falta.

**Etiquetas.** [Hecho]: comprobado en una fuente o en el repo. [Estudio]: dato de una investigación o documentación técnica. [Vendedor]: dato de una empresa que vende el servicio. [Opinión]: criterio mío. [No verificado]: no he podido comprobarlo.

---

## 0. Resumen ejecutivo

1. **El vídeo de fondo en el hero ya no es cosa de webs de premio: ahora es habitual en webs de empresa.** [Estudio, fuente secundaria] Un escaneo publicado el 15-oct-2026 lo encontró en el 37 % de 68 webs recientes premiadas como Site of the Day en Awwwards y en el 30 % de 69 webs B2B SaaS. En cambio, el cursor personalizado (43 % frente a 1 %) y el scroll suavizado con Lenis (66 % frente a 4 %) aparecen casi solo en las webs de premio ([webyansh](https://webyansh.com/post/top-web-design-trends)). McKinsey, BCG, BCG X, Bain y PwC España ya usan vídeo ambiental en el hero (`investigacion/01`, sección A).
2. **El vídeo no puede llevar texto, y tiene que dejar oscura la zona donde va el titular.** La legibilidad no se arregla después con una capa encima: se diseña en el propio vídeo. Además, un vídeo sin texto vale para ES y EN, así que hay un solo archivo por formato en vez de dos (hoy hay `film-es` y `film-en`).
3. **Cifras para Spiralia** [Opinión, a partir de fuentes de vendedores y del repo]: bucle de 12 s a 24-25 fps. Para la pieza de HyperFrames, ≤ 1,2 MB en horizontal 1920×1080 y ≤ 0,7 MB en vertical 720×1280. Para metraje real, ≤ 3 MB y ≤ 1,8 MB. Cartel (póster) en WebP de ≤ 80 KB. H.264 como formato base. AV1 solo si ahorra al menos un 25 % con la misma calidad: en mi prueba con el bucle descartado, un AV1 con CRF 38 pesó **más** (974 KB) que el H.264 original (724 KB).
4. **El elemento de LCP será el cartel, no el vídeo.** Hay que precargarlo con `fetchpriority="high"`, debe coincidir píxel a píxel con el fotograma 0 y el vídeo entra después, con un fundido. Chrome no precarga archivos de vídeo y el LCP de un `<video>` cuenta el póster o el primer fotograma, lo que llegue antes ([web.dev](https://web.dev/articles/lcp), [DebugBear](https://debugbear.com/blog/optimize-video-lcp)). La web ya usa este patrón en la película actual: basta con extenderlo.
5. **Accesibilidad y entornos sin vídeo.** Un bucle de más de 5 s junto a otro contenido necesita un botón de pausa (WCAG 2.2.2, nivel A). Con «reducir movimiento», Save-Data, 2G o el modo de bajo consumo de iOS, el cartel tiene que verse como un diseño terminado, no como un fallo.
6. **Concepto de vídeo recomendado (provisional con HyperFrames): «La organización se enciende».** Una retícula de miles de puntos (personas, puestos) que se iluminan desde unos pocos focos y se conectan con trazos curvos. Cuenta «la ventaja se despliega» y la escala de Spiralia (50.000) sin Ana y sin el logo en primer plano. El bucle anterior de la S, que se desenrollaba, se descartó, y este concepto no lo repite. **Objetivo final: metraje real de sesiones**, con un rodaje de un día y la lista de planos de la sección 7.10.
7. **Combinar dos vídeos.** De fondo, un vídeo de ambiente sin texto. En el hero, un botón «Ver la película · 20 s» que abre la película explicativa actual en un modal. La investigación previa pedía «vídeo que explica, no que decora» y el cliente pide «vídeo a pantalla completa»: así se cumplen las dos cosas.
8. **Barra de navegación** [Opinión]:
   - Transparente sobre el vídeo y sólida (la actual, azul noche al 86 % con desenfoque) cuando el vídeo ya no queda detrás.
   - «Hablemos» siempre visible.
   - **Falta un menú en móvil y tableta**: por debajo de 980 px la navegación desaparece y no hay botón de menú (hallazgo en `site.css`).
9. **Tendencias** [Opinión]:
   - **Adoptar:** serif editorial (Butler ya lo es), grano muy sutil, efecto cristal solo en la barra y en los controles, un único momento ligado al scroll y un pie con la marca grande.
   - **Evitar:** cursor personalizado, scroll suavizado que secuestra el gesto, 3D WebGL pesado, iconos 3D tipo 3dicons (no casan con «seriedad y clase») y la librería React de glass.samasante.com (la web no usa React).
10. **Menos «Ana», más Spiralia en CTA y pie** [Hecho en el repo, Opinión en la propuesta]:
    - Hoy el email de toda la página es `ana.iza@spiralia.es`, la reserva va a su agenda y el cierre lleva su foto.
    - Propuesta: un buzón genérico, Bookings de equipo y, en el cierre, una imagen de sesión o de equipo en lugar de dos retratos.

---

## 1. Punto de partida: cómo es hoy el hero

Capturas en local con `?still=1`, sin animaciones. [Hecho]

| Aspecto | Escritorio (1440×900) | Móvil (390×844) |
|---|---|---|
| Composición | En dos columnas: texto a la izquierda; a la derecha, una tarjeta 4:5 con la película de 20 s y su cartel final (S, SPIRALIA y 3 cifras). El hero mide 900 px. | En una columna: la película queda **por debajo del pliegue**. El hero mide **1.547 px**, casi dos pantallas. |
| H1 | Butler Light 53 px en dos líneas, bien. | 37 px. «La inteligencia se / compra.» se parte mal. |
| CTA | Principal relleno y secundario fantasma, largo («¿Dónde está tu empresa? Diagnóstico en 3 minutos»). | El secundario ocupa dos líneas dentro de la píldora. |
| Prueba social | «Más de 50.000» y 12 logos en dos filas bajo una línea fina. El 50.000 aparece también en el cartel de la película: se repite. | Los logos quedan muy abajo. |
| Barra | Sólida, 86 % de opacidad, con desenfoque y CTA «Hablemos». | Solo logo, EN y «Hablemos». **No hay menú**: `.bar-nav{display:none}` por debajo de 980 px y no existe botón alternativo. |

**Lo que ya está bien hecho y conviene conservar** [Hecho, `src/js/motion.js`, bloque M1]:
- **Arranque del vídeo:** se carga con `preload="none"`, asigna `src` solo cuando la portada está a la vista y se pausa al salir de pantalla o al ocultar la pestaña.
- **Cartel en vez de vídeo:** no se carga con `?still=1`, Save-Data ni conexiones 2G.
- **Pausa:** botón de pausa accesible.
- **Póster:** `<img>` aparte con el mismo fotograma.

Es la base técnica del nuevo hero. Falta respetar `prefers-reduced-motion` en el JS, porque hoy lo hace solo el CSS ocultando controles. Tampoco se trata el rechazo de `play()` en el modo de bajo consumo de iOS.

**Lo que ya se probó y se descartó** [Hecho, `motion/_descartado/bucle-s/`]: un bucle de pantalla completa (1920×1080 y 720×1280, 24 s, 724 KB y 679 KB, unos 240 kbps) en el que la S de Spiralia se desenrollaba en líneas horizontales. **Lección** [Opinión]: un bucle que solo anima el logotipo habla de la marca, no del cliente. El nuevo vídeo tiene que enseñar el resultado (una organización trabajando con IA) o a personas, nunca el logo como protagonista.

---

## 2. Buenas prácticas del hero con vídeo de fondo

### 2.1 Legibilidad del texto sobre el vídeo

- **Umbral de contraste:** el texto sobre imagen, degradado o desenfoque necesita 4,5:1, y 3:1 si es grande (24 px o 18,7 px en negrita), según el criterio 1.4.3 de WCAG aplicado a texto sobre imagen ([Acquia](https://docs.acquia.com/web-governance/text-top-image-gradient-or-backdrop-filter-should-have-minimum-contrast)). [Estudio]
- **Capas recomendadas por los sistemas de diseño:**
  - Un velo de color uniforme y un degradado que oscurezca la parte inferior para crear una «zona segura» de texto. Si la imagen es muy movida, añadir desenfoque junto con el velo ([Amazon APL](https://developer.amazon.com/en-US/alexa/alexa-haus/visual-design/apl-components/apl-background)).
  - El vídeo debe ser «secundario a la experiencia, no llamativo». [Estudio, guía de diseño]
  - La Universidad de Maryland pide además un botón de pausa en su componente de hero con vídeo ([UMD](https://designsystem.umd.edu/components/overlay-hero)).
- **Cálculo para la paleta de Spiralia** [Hecho, calculado con la fórmula de luminancia relativa de WCAG]:
  - `#E0DFDA` (texto claro) sobre `#051A2B` da 13,2:1, y `#A9B1B8` (segunda línea del H1, textos grises) da 8,1:1.
  - Con vídeo debajo, el contraste depende del píxel más claro que quede bajo cada texto. Para cumplir:
    - **Subtítulo y H1 en `#E0DFDA`:** el fondo compuesto (vídeo + velos) no debe pasar de **0,12 de luminancia relativa**, más o menos un gris `#616161`.
    - **Segunda línea del H1 en `#A9B1B8`** (texto grande, 3:1): ≤ 0,11, un gris `#5C5C5C`.
    - **Textos pequeños en `#A9B1B8`** (antetítulo, etiquetas, 4,5:1): ≤ 0,057, un gris `#444`. Por eso conviene que en el hero el antetítulo vaya en `#E0DFDA`.
- **Butler Light es una letra de trazo fino.** [Opinión] Aunque legalmente sea «texto grande», hay que apuntar a 7:1 o más en el H1: un fondo ≤ 0,06 bajo el titular.
- **Cómo comprobarlo** [Opinión, procedimiento]: exportar 1 fotograma por segundo con FFmpeg, aplicar encima el velo con su opacidad y medir la luminancia máxima dentro del rectángulo de cada bloque de texto. Hay que pasar la prueba en todos los fotogramas, no solo en el póster.

### 2.2 Duración y bucle

- **Duración:**
  - Las guías de vendedores hablan de bucles de 6-15 s ([Elfsight](https://elfsight.com/guides/video-background-website/)) o de 15-30 s ([Jeff Bullas](https://www.jeffbullas.com/thread/what-is-the-best-video-size-for-website-background)). [Vendedor]
  - BCG X usa un bucle de 15 s (`bcg_x_launch_film-15s_loop.mp4`, `investigacion/01`, A.2). [Hecho]
  - **Recomendación: 12 s** [Opinión]. Es lo bastante largo para no notar la repetición mientras se lee el titular (unos 5-8 s) y lo bastante corto para pesar poco.
- **Bucle sin salto:** el último fotograma debe enlazar con el primero. El script descartado ya lo resolvía renderizando N+1 fotogramas y quedándose con los N primeros (`-frames:v 720`). [Hecho, `motion/_descartado/bucle-s/render.sh`]
- **Ritmo:** lento, con cámara que deriva y sin cortes bruscos. Un hero que se mueve rápido compite con el titular. [Opinión, coherente con Amazon APL]

### 2.3 Peso y resolución

- **Lo que dicen las guías** [Vendedor]: entre 2 y 5 MB, y nunca más de 10 MB. Otra guía más estricta pide menos de 3 MB, idealmente 1,5 MB, y añade que con un velo oscuro basta 720p ([Jeff Bullas](https://www.jeffbullas.com/thread/what-is-the-best-video-size-for-website-background)). Una página de ayuda da 5 MB como techo ([Adventist Connect](https://support.adventistconnect.org/help/hero-video-best-practices)).
- **Referencias del repo** [Hecho]:
  - El bucle de líneas de 1080p ocupaba 240 kbps (724 KB en 24 s).
  - La película actual, 1080×1350, ocupa 184 kbps (467 KB en 20 s).
  - Una pieza con degradados, puntos y desenfoque necesitará más bitrate [estimación: 500-900 kbps].
- **Objetivos para Spiralia** [Opinión]: ver la tabla de la sección 7.11.

### 2.4 Códecs y contenedores

- **H.264 en MP4 es la base universal.** Perfil High, `yuv420p`, `+faststart` y sin pista de audio ([web.dev](https://web.dev/articles/replace-gifs-with-videos), [Jeff Bullas](https://www.jeffbullas.com/thread/what-is-the-best-video-size-for-website-background)). [Estudio]
- **AV1:**
  - Chrome, Edge y Firefox lo soportan. En Safari el soporte es «parcial»: solo en equipos con decodificador por hardware, es decir, Apple M3 o posterior y el iPad Pro M4 ([caniuse](https://caniuse.com/av1), [Bitmovin](https://bitmovin.com/blog/av1-playback-support/)). [Estudio]
  - Apple recomienda mantener siempre una versión H.264 o HEVC.
- **WebM (VP9):** iOS no lo soporta del todo hasta Safari 17.4 ([caniuse](https://caniuse.com/webm)). [Estudio] No compensa añadirlo si ya hay H.264 y, opcionalmente, AV1. [Opinión]
- **Prueba propia** [Hecho]: volví a codificar en AV1 el bucle descartado con `libsvtav1`, preset 8 y CRF 38. Pesó **974 KB, frente a 724 KB** del H.264 original.
  - No es una comparación limpia: partía de un archivo ya comprimido y el CRF no estaba calibrado.
  - Aun así, demuestra que **AV1 no ahorra peso por sí solo** con gráficos simples sobre fondo plano.
  - **Regla** [Opinión]: para la pieza de HyperFrames, solo H.264. Para metraje real, probar AV1 a calidad equivalente y quedárselo solo si ahorra un 25 % o más.

### 2.5 Póster y Core Web Vitals (LCP)

- **Cómo cuenta el LCP un vídeo** [Estudio, [web.dev](https://web.dev/articles/lcp)]:
  - En un `<video>` cuenta la carga del póster o el primer fotograma, lo que llegue antes.
  - Bueno: ≤ 2,5 s. Malo: > 4 s.
- **Precarga** [Estudio]:
  - Con `fetchpriority="high"` el póster empieza a descargarse en paralelo y no después de la hoja de estilos ([Chrome Learn Performance](https://chrome.dev/f/learn_performance_video/7/)).
  - Un `<link rel="preload">` con `fetchpriority="high"` mejora algo más. Precargar el vídeo no sirve: «Chrome no soporta la precarga de archivos de vídeo» ([DebugBear](https://debugbear.com/blog/optimize-video-lcp)).
  - No conviene precargar demasiados recursos ni cargar el hero en diferido.
- **Implicación** [Opinión]:
  - El póster como `<img>` (con `<picture>` para vertical y horizontal) es el elemento de LCP. Tiene que pesar poco y estar precargado.
  - **Debe ser el fotograma 0 del bucle, con la misma conversión de color.** Si no, se nota un salto al entrar el vídeo. `render_film.sh` ya corrige la matriz de color al extraer el póster: hay que reutilizarlo.
  - Hoy la película usa el **último** fotograma porque se queda en el cartel final. En un bucle tiene que ser el **primero**.
- **Las fuentes también pesan** [Hecho, repo]: `SofiaSansCondensed-VF.ttf` pesa 343 KB y se precarga en el `<head>`. Al sumar vídeo al hero conviene pasar las fuentes a `woff2` con subconjunto (ya está pendiente en `LEEME.md`). [Estimación: 40-60 KB]

### 2.6 Reproducción automática

- **Regla general:** se permite la reproducción automática si el vídeo está silenciado ([MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)). [Estudio]
- **iOS:**
  - Hace falta `playsinline`; sin él, Safari en iOS abre el vídeo a pantalla completa ([Swarmify](https://swarmify.com/blog/how-to-make-an-autoplaying-background-video/)).
  - **Modo de bajo consumo:** `play()` se rechaza con `NotAllowedError` y puede verse un botón de reproducir encima ([WebKit 216887](https://bugs.webkit.org/show_bug.cgi?id=216887), [Apple Developer Forums](https://developer.apple.com/forums/thread/709821)). [Estudio / informes de errores]
  - **Qué hacer:** capturar la promesa, dejar el póster, no mostrar nada roto y ocultar el botón de pausa.
- **Atributos** [Opinión]:
  - Sin `autoplay` en el HTML: el JS asigna `src` y llama a `play()` solo si se cumplen las condiciones. Así quien pide menos movimiento o tiene Save-Data no descarga ni un byte de vídeo.
  - `muted`, `loop`, `playsinline`, `disablepictureinpicture`, `disableremoteplayback`. `aria-hidden="true"` en el vídeo de fondo, que es decorativo.

### 2.7 Accesibilidad

- **WCAG 2.2.2 «Pause, Stop, Hide» (nivel A)** [Estudio, [W3C](https://www.w3.org/WAI/WCAG20/Understanding/pause-stop-hide)]: el contenido en movimiento que arranca solo, dura más de 5 s y convive con otro contenido necesita un mecanismo para pausarlo, detenerlo u ocultarlo. Un control en la página (técnica G186) basta.
  - El botón tiene que ser accesible: contraste, teclado, foco visible y nombre accesible ([Accessible Web](https://accessibleweb.com/question-answer/does-an-auto-play-video-with-a-pause-button-meet-accessibility-guidelines/)).
- **`prefers-reduced-motion`:**
  - Comprobar con `matchMedia` y escuchar el evento `change`.
  - Mostrar por defecto el póster fijo a quien pide menos movimiento ([specification.website](https://specification.website/spec/accessibility/reduced-motion/), [Scott O'Hara](https://www.scottohara.me/note/2019/07/12/reduced-motion-video.html), [thoughtbot](https://thoughtbot.com/blog/can-auto-playing-videos-be-accessible)). [Estudio]
- **NN/g, citado en fuentes secundarias** [Estudio, no verificado en el original]: el vídeo solo ayuda si el usuario lo controla, y su información debe estar también en texto ([A11y Project](https://www.a11yproject.com/posts/never-use-auto-play/)).
  - Para Spiralia esto confirma que el **vídeo de fondo no debe contar nada imprescindible**. El mensaje está en el H1 y en el texto.

### 2.8 Save-Data y conexión

- `navigator.connection.saveData` solo existe en Chrome, Chrome para Android y Samsung Internet. Hay que comprobar antes si existe ([web.dev](https://web.dev/articles/optimizing-content-efficiency-save-data)).
- En 2019 se pidió a WebKit que lo expusiera para no reproducir vídeos de fondo con el ahorro de datos de iOS ([WebKit 199101](https://bugs.webkit.org/show_bug.cgi?id=199101)). No consta que se haya implementado. [Estudio]
- La web ya lo comprueba junto a `effectiveType` 2G. Hay que añadir `slow-2g` (la expresión `/2g/` ya lo cubre) y valorar `3g` en móvil para el metraje real, que pesa más. [Opinión]

### 2.9 Móvil: vertical u horizontal

- **El atributo `media` en `<source>` vuelve a funcionar** en Firefox 120 y Chrome 120, y Safari nunca lo quitó. Sirve para dar un vídeo vertical u horizontal según la orientación. **Pero solo se evalúa al cargar la página**, no al girar el móvil ([Scott Jehl](https://scottjehl.com/posts/using-responsive-video/), [HTMHell 2024](https://htmhell.dev/adventcalendar/2024/19/)). [Estudio]
- **`object-fit: cover`** recorta el vídeo para llenar el contenedor. Sin archivo vertical, en un 9:16 se pierde el 68 % del ancho de un 16:9. [Hecho, cálculo]
- **Recomendación** [Opinión]:
  - Dos archivos (16:9 y 9:16) compuestos por separado en HyperFrames (el bucle descartado ya lo hacía) o reencuadrados en el rodaje.
  - Elegir con JS al asignar `src` (`matchMedia('(orientation: portrait)')`), como ya hace `motion.js` con `data-src`.
  - Póster con `<picture>` y `media`.

### 2.10 ¿Convierte más un hero con vídeo?

- No hay test A/B público y riguroso que aísle vídeo frente a imagen fija. [Hecho, búsqueda sin resultados]
- **Unbounce** [Vendedor]: el vídeo de fondo puede ralentizar la página y restar atención al CTA, y encaja en páginas que transmiten un ambiente. Recomienda un A/B frente a imagen fija ([Unbounce](https://unbounce.com/landing-pages/do-video-backgrounds-help-or-hurt-conversions/)).
- **Personizely y Stellar** solo dan estimaciones o promedios de cambios en el hero en general.
- **Conclusión** [Opinión]: el vídeo de fondo se justifica por **marca y aspiración**, que es lo que pide el cliente, no por conversión. Por eso tiene que costar casi nada en rendimiento y no tapar el CTA.
  - Medir antes y después: clics en «Hablemos de tu caso» y en el diagnóstico, y LCP p75 en móvil.

### 2.11 Lista de comprobación del vídeo de fondo

| # | Requisito | Estado hoy (película 4:5) | Nuevo hero |
|---|---|---|---|
| 1 | Sin texto dentro del vídeo | ✗ (la película es texto) | ✓ obligatorio |
| 2 | Zona de texto oscura diseñada en el propio vídeo | — | ✓ |
| 3 | Póster = fotograma 0, precargado, `fetchpriority="high"` | Póster = último fotograma, sin precarga | ✓ |
| 4 | `muted playsinline loop`, sin `autoplay` en el HTML | ✓ (sin `loop`) | ✓ |
| 5 | Botón de pausa visible y accesible | ✓ | ✓ |
| 6 | `prefers-reduced-motion` en el JS (no descargar) | Parcial (solo CSS) | ✓ |
| 7 | Save-Data / 2G → solo póster | ✓ | ✓ |
| 8 | Rechazo de `play()` (bajo consumo de iOS) → póster limpio | ✗ | ✓ |
| 9 | Pausar fuera de pantalla y con la pestaña oculta | ✓ | ✓ |
| 10 | Archivo vertical para móvil | — | ✓ |
| 11 | Un solo archivo para ES y EN | ✗ | ✓ |
| 12 | Peso dentro del objetivo de la sección 7.11 | ✓ | ✓ |

---

## 3. Tendencias de diseño premium 2025-2026 (Awwwards y más)

### 3.1 Qué premia Awwwards y qué se ha visto

- **Pesos del jurado:** Diseño 40 %, Usabilidad 30 %, Creatividad 20 %, Contenido 10 %. [Fuente secundaria, no verificado en Awwwards]
- **Site of the Year 2025:**
  - En los listados de Awwwards, **Lando Norris** (OFF+BRAND.) aparece con la etiqueta de Site of the Year 2025. Fue Site of the Day el 17-nov-2025 con 8,18 de nota: creatividad 8,71, usabilidad 7,9 ([Awwwards](https://www.awwwards.com/sites/lando-norris)).
  - Rasgos: capas «blob» que reaccionan al cursor sobre la imagen del hero, dos colores (#D2FF00 y #111112) y una estructura modular. [Hecho, resumen de búsqueda]
  - **Messenger** (abeto) también aparece con la etiqueta de Site of the Year 2025. No he podido aclarar si son categorías distintas. [No verificado]
- **Webs de 2026 cercanas a Spiralia** [Hecho, resúmenes de búsqueda]:
  - **«AI in Design Report 2026»**, Site of the Day el 26-ago-2026 (7,4): «un informe de investigación convertido en una experiencia editorial digital» ([Awwwards](https://www.awwwards.com/sites/ai-in-design-report-2026)). Es el formato natural de una firma con origen en consultoría estratégica: el *insight* como pieza editorial.
  - **Heron AI** (Bearplus), Site of the Day el 12-oct-2026: un agente de IA que trabaja dentro de las herramientas de diseño. Entre sus elementos figura un «hero interaction video» ([Awwwards](https://www.awwwards.com/sites/heron-ai)). Una búsqueda lo confirma en el listado y otra no lo encontró. [Parcialmente verificado]
  - **Outsource Consultants, Inc.**, Site of the Day el 10-mar-2026: una consultora de normativa urbanística en Nueva York ([Awwwards](https://www.awwwards.com/sites/outsource-consultants-inc)). Prueba que una consultora sin producto también puede ganar el premio.

### 3.2 La distancia entre las webs de premio y las de negocio

Datos del escaneo de [webyansh](https://webyansh.com/post/top-web-design-trends) (15-oct-2026: 68 webs Site of the Day recientes frente a 69 webs B2B SaaS de Y Combinator con 25 o más empleados). [Estudio, de una agencia y no revisado por pares; las diferencias de menos de unos 15 puntos no son significativas]

| Rasgo | Webs premiadas | B2B SaaS | Lectura para Spiralia [Opinión] |
|---|---|---|---|
| Vídeo en el hero | 37 % | 30 % | Es una práctica corriente: adoptarla. |
| Efecto cristal (*glass*) | 35 % | 55 % | Más común en SaaS que en las webs premiadas. Usarlo con mesura (barra y controles). |
| Scroll suavizado (Lenis) | 66 % | 4 % | Rasgo de web de premio. Evitarlo: secuestra el scroll. |
| Cursor personalizado | 43 % | 1 % | Evitarlo. |
| *View transitions* | 3 % | 1 % | Irrelevante. |
| 3D | «se ha estancado» | — | Solo 3D sutil, si acaso. |

El artículo resume que «la mayoría de las tendencias más llamativas, del cursor personalizado a los heros WebGL, se quedan en las webs de premio y rara vez llegan a las de negocio». Para una boutique que quiere «excelencia, seriedad y clase», ahí está la frontera: **tomar de Awwwards el oficio (tipografía, ritmo, detalle), no los efectos.** [Opinión]

### 3.3 Tendencias, una a una

| Tendencia | Qué dicen las fuentes | Para Spiralia [Opinión] |
|---|---|---|
| **Serif editorial** | Vuelve el serif con carácter en titulares, combinado con sans en el cuerpo ([Line25](https://line25.com/articles/web-design-trends-2026/), [Really Good Designs](https://reallygooddesigns.com/web-design-trends-2026/)). Anthropic y Claude se describen como «editorial, serif, cálido» en las fichas DESIGN.md hechas por terceros ([shadcn.io](https://www.shadcn.io/design/anthropic)). [Vendedor/terceros] | **Ya lo tenéis** (Butler + Sofia Sans Condensed + Open Sans). Hacer el H1 más grande en el hero a pantalla completa. Arreglar el fallo de la «á» en Butler 400 o no usar ese peso. |
| **Narrativa con el scroll** | Ha pasado de lo editorial a las páginas de producto. Unos lo ven como narrativa guiada, otros como navegación con indicador de progreso ([Rebekah Read](https://rebekahreadcreative.com/2026-website-design-trends/)). [Vendedor] | Ya hay piezas así (espiral SPIRAL, curva del reto). No añadir más: **un único momento ligado al scroll en el hero** (el vídeo se oscurece y se escala ligeramente al bajar). |
| **Animación con el scroll en CSS** | `animation-timeline` funciona en Chrome/Edge 115+ y en Safari 26+; en Firefox sigue tras un ajuste experimental en la versión estable a mediados de 2026 ([Chrome](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [ICS](https://ics.media/en/entry/230718/), [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)). [Estudio] | Usarla como mejora progresiva (`@supports (animation-timeline: scroll())`). Sin ella, el hero queda estático y correcto. |
| **Grano** | Una textura de grano evita que los fondos planos parezcan estériles. Un SVG de ruido pesa unos 292 bytes. Animarlo cuesta CPU. La opacidad recomendada va del 3 al 12 % ([Jean Tinland](https://www.jeantinland.com/blog/120kb-less/), [CSSmatic](https://cssmatic.com/gen-noise-texture.html), [CSS-Tricks](https://css-tricks.com/?p=335760)). [Vendedor] | **Grano estático por CSS encima del vídeo** (4-6 %, `mix-blend-mode: overlay`), no dentro del vídeo: el ruido dispara el bitrate. Además disimula el bandeado de los degradados del vídeo comprimido. |
| **Cristal / Liquid Glass** | Apple lo lanzó en 2025 y lo han criticado por contraste: Infinum midió 1,5:1 en la beta ([Infinum](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/)). El desenfoque consume GPU, más aún si el fondo se mueve ([UX Collective](https://uxdesign.cc/apples-liquid-glass-isn-t-just-an-accessibility-blunder-it-s-an-environmental-one-too-08c593a87963)). Consenso: el cristal para capas pasajeras (barra, modales); el texto principal, sobre superficies sólidas; 2-3 elementos de cristal por pantalla como mucho ([Axess Lab](https://axesslab.com/?p=5111), [Merge](https://merge.rocks/resources/websites-playbook/ux-interface-design/glassmorphic-design-the-shocking-truth-about-when-it-kills-ux)). [Estudio/Vendedor] | Solo en: barra sólida (ya lo usa), botón de pausa y píldora «Ver la película». **Nunca en tarjetas con texto sobre el vídeo.** `prefers-reduced-transparency` → fondo opaco. Solo funciona en Chromium 118+: Firefox lo tiene tras un ajuste y Safari no lo soporta ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency)). |
| **3D sutil** | 3D selectivo; el auge «se ha estancado» ([webyansh](https://webyansh.com/post/top-web-design-trends)). [Estudio] | Como mucho, profundidad simulada dentro del vídeo de HyperFrames (perspectiva CSS). Nada de Three.js en la página. |
| **Barra flotante en píldora** | Es un patrón habitual en las librerías de componentes SaaS. No hay datos de que sea tendencia de 2025 ([shadcnblocks](https://www.shadcnblocks.com/block/navbar6)). [Vendedor] | Mantener una **barra a ancho completo, fina**, como Apple y las consultoras. La píldora flotante se asocia con startups SaaS. Alternativa en la sección 8.1. |
| **Pies grandes con la marca** | Pie con la marca a todo el ancho, cortada por el borde, y un CTA de alto contraste ([Framer «Futer»](https://www.framer.com/marketplace/components/footer-futer/), [UXPin](https://www.uxpin.com/studio/?p=36595)). [Vendedor] | Sí: «SPIRALIA» en Butler, enorme y recortada, en el pie (sección 8.3). |
| **Tipografía cinética** | Crece, pero se recomienda usarla con moderación ([Line25](https://line25.com/articles/web-design-trends-2026/)). [Vendedor] | Ya está la entrada de frases desde una máscara en la película. En la web, como mucho la entrada del H1 al cargar (≤ 600 ms). |
| **«La claridad gana al espectáculo»** | «Los mejores heros dicen una cosa con claridad y señalan una acción» ([Made Good Designs](https://madegooddesigns.com/hero-section-design/)). En los SaaS que más convierten: menos de 5 enlaces en la barra, un solo color para el CTA principal y ninguna acción que compita en la primera pantalla ([SaaS Hero](https://saashero.net/content/b2b-saas-landing-page-examples/)). [Vendedor] | Principio rector del nuevo hero. |

---

## 4. Las galerías que dio el cliente: qué son y qué tomar

Sin WebFetch no he podido navegar por ellas. Lo que sigue sale de reseñas y listados. [Hecho, resúmenes de búsqueda]

| Galería | Qué es | Qué tomar para Spiralia [Opinión] | Qué no tomar |
|---|---|---|---|
| **[supahero.io](https://www.producthunt.com/p/supahero/supahero)** | Biblioteca gratuita y curada de heros, con animaciones, imágenes y titulares llamativos, más un boletín mensual (de Solt Wagner, según AlternativeTo). | Elegir **3 heros de referencia** con vídeo a sangre y texto abajo a la izquierda para el *moodboard*, y comprobar que su contraste aguanta sobre el vídeo. [No verificado: no he visto los ejemplos concretos] | Heros con producto SaaS (capturas de app), que no es el caso. |
| **[scrolltide.co](https://www.scrolltide.co/)** | Librería comercial (pago único de 299 $) de plantillas, componentes, *shaders* y *prompts* de webs guiadas por el scroll (React, Vite, Next, Tailwind, Framer Motion, GSAP, Three.js, WebGL, Lenis). Según el momento, de 97 a 124 plantillas ([uiroot](https://uiroot.com/tools/242)). | Referencia para **un único momento de scroll** en el hero. La técnica «el scroll controla un vídeo fotograma a fotograma en un canvas» podría servir más adelante para el método SPIRAL. | Lenis, WebGL, *shaders* y la pila de React: la web es HTML estático con JS ligero y debe seguir así. |
| **[navbar.gallery](https://suupercharged.substack.com/p/welcome-to-navbar-gallery)** | Galería de barras de navegación de webs destacadas, con resúmenes mensuales por tipo: fija, desplegable, mega menú, lateral, móvil. | Mirar la categoría **móvil**: es lo que le falta a la web (no hay menú por debajo de 980 px). | Mega menús: con 4-5 anclas no hacen falta. |
| **[footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth)** | La «única galería de pies» (NOOON Studio, oct-2023), organizada por enfoque visual: Tipográfico, Letra pequeña, Ilustrado, Retícula, Plano, Animado, Tarjetas, Claro, Oscuro, Letra grande. | Categorías **«Large Type»** y **«Typographic»** sobre fondo oscuro. | Pies «Animados» o ilustrados. |
| **[cta.gallery](https://www.cta.gallery/categories/all-types)** | Colección curada de CTA de webs reales con filtros por categoría, sector y modo claro u oscuro. Incluye a Linear, Perplexity, Framer y Auth0. | Filtrar por **modo oscuro** y bloques de CTA final (Linear, Framer). Fijarse en la microcopia bajo el botón. | Ventanas emergentes y CTA de precios. |
| **[styles.refero.design](https://notes.nicolasdeville.com/ai/refero-styles/)** | Refero Styles (beta, gratis, en torno a mayo de 2026): más de 2.000 sistemas de diseño extraídos de webs reales como archivos DESIGN.md, con colores, tipografía, espaciado y componentes. Se puede buscar por marca, ambiente, color o tipografía, también por MCP ([natecue](https://www.natecue.com/en/resources/refero-styles-design-md-examples/)). | **La más útil para este proyecto.** Bajar los DESIGN.md de 3-4 referencias (Apple, Anthropic, Linear, una consultora) y comparar escala tipográfica, espaciado vertical y radios con `site.css`. Así se calibra el «estilo Apple» con cifras. | Copiar un sistema entero: la paleta Monocromo Spiralia ya está decidida. |
| **[glass.samasante.com](https://github.com/samasante/liquid-glass)** | Zona de pruebas y documentación de `@samasante/liquid-glass`: una librería **React** sin dependencias (MIT, v0.1.1) que refracta el DOM real con mapas de desplazamiento SVG y funciona en Chrome, Safari y Firefox. | Inspiración para el **botón de pausa y la píldora «Ver la película»** en cristal. | **No instalarla:** obliga a usar React, y el cristal refractivo sobre vídeo en movimiento es caro en GPU y empeora el contraste. Basta con `backdrop-filter` en CSS. |
| **[3dicons.co](https://smashingmagazine.com/2022/05/3dicons-open-source-library-case-study-download/)** | Iconos 3D de Vijay Verma, gratuitos y con licencia CC0. Empezó con 120 y ya pasa de 1.440, en 4 estilos de color, con originales de Blender y FBX. | Nada, salvo un uso muy puntual con material monocromo reproducido en la paleta. | Son iconos «adorables» y de colores: chocan con «seriedad y clase» y con la paleta monocroma. Mejor iconos de línea derivados de la geometría de la S (`tools/s_geom.py`). |
| **[awwwards.com](https://www.awwwards.com/websites/sites_of_the_day/)** | Ver la sección 3. | El oficio: escala tipográfica, ritmo y detalle. «AI in Design Report 2026» como formato de informe editorial. | Efectos de premio (sección 3.2). |

---

## 5. Estética «Apple» aplicada a B2B

### 5.1 Principios, según el análisis de su copy

Son análisis de terceros, no una guía de Apple. [Vendedor/blog]

- **Una idea por titular.** Vender varias a la vez deja al lector sin saber qué importa ([Enchanting Marketing](https://www.enchantingmarketing.com/write-like-apple/)).
- **Frases cortas.** Un análisis de las páginas del iPhone 5 midió entre 10,9 y 14 palabras de media por frase. Recomienda quedarse por debajo de 12 ([Neil Patel](https://neilpatel.com/blog/write-copy-like-apple/)).
- **Fragmentos y frases de una palabra** para marcar el ritmo.
- **El beneficio antes que la ficha técnica.** Los datos técnicos se reservan para cuando dan credibilidad ([Leadpages](https://leadpages.com/blog/landing-pages-apple-borrow-apples-best-copywriting-techniques-copy)).
- **Mucho aire y bloques alternos** de imagen y texto.

### 5.2 Cómo se traduce a esta web [Opinión]

| Principio | Hoy | Propuesta |
|---|---|---|
| Una idea por pantalla | Hero con H1, subtítulo de 30 palabras, 2 CTA, 3 accesos por perfil, película con 3 cifras, 50.000 y 12 logos. Siete cosas. | Hero con H1, subtítulo de ≤ 20 palabras, 1 CTA, 1 enlace y vídeo. Los accesos por perfil, el 50.000 y los logos pasan a una **franja justo debajo del pliegue**. |
| El resultado como protagonista | La película explica el problema con cifras de McKinsey. | El vídeo enseña **una organización trabajando con IA** (concepto A) o **personas en sesión** (metraje real). Las cifras van debajo, una por pantalla y a gran tamaño (ING del 66 % al 92 % como titular de su propia pantalla). |
| Frases cortas | Subtítulo actual: 30 palabras en 2 frases (8 y 22). | ≤ 12 palabras por frase en titulares y subtítulos. |
| Aire | Hero denso en móvil (1.547 px). | Hero de 100svh. Márgenes verticales de las secciones de 120-160 px en escritorio, que ya son de hasta 140 px. |
| Más Spiralia, menos Ana | Retrato de Ana en «Quiénes somos» y en el cierre; email y agenda de Ana. | Imagen de **grupo y de sesión**, «el equipo de Spiralia», buzón genérico. Ana puede seguir en «Quiénes somos» como CEO, una persona más en una retícula de equipo. |

---

## 6. Consultoras y firmas de IA: cómo usan el vídeo

- **McKinsey, BCG, Bain y PwC España** [Hecho, `investigacion/01`, A.1-A.6]:
  - Vídeo ambiental, en bucle y sin sonido en el hero.
  - BCG X con un bucle de 15 s.
  - Los vídeos con contenido van más abajo: el anuncio de 30 s de PwC, la serie «Demystifies» de Deloitte.
  - En el hero se presentan con una etiqueta de categoría («AI Transformation», «Artificial Intelligence»), no con una promesa.
- **McKinsey** renovó su identidad en 2019 con Wolff Olins: tipografía propia Bower, una nueva animación («Partnership Mark») y premio Red Dot ([McKinsey](https://www.mckinsey.com/about-us/overview/our-new-identity)). No he encontrado ningún rediseño web de 2025-2026. [Hecho/No verificado]
- **Sierra** (IA conversacional): Bakken & Baeck puso en su home **a una mujer usando Sierra en un aeropuerto**. Es decir, el resultado en un contexto humano, no la tecnología ([Bakken & Baeck](https://bakkenbaeck.com/case/sierra)). [Hecho, caso de agencia] **Es exactamente el «estilo Apple» aplicado a IA.**
- **Harvey** (IA legal):
  - Sanctuary Computer rehízo su web, «rica en movimiento y claridad» ([Sanctuary Computer](https://www.sanctuary.computer/harvey)).
  - Harvey contrata a diseñadores de movimiento para crear un «lenguaje de movimiento de marca» que haga que los flujos complejos de IA «parezcan claros y premium» ([oferta de empleo](https://jobs.a16z.com/jobs/harvey/37498a8d-689a-4a59-9973-86b2588c7a45--senior-motion-designer)). [Hecho]
  - Una auditoría de junio de 2026 le pone 88/100, elogia que el hero nombre comprador, caso de uso y diferencia, y critica que solo haya una vía de conversión ([Landing Doctor](https://landingdoctors.com/teardowns/harvey-ai)). [Opinión de terceros]
- **Palantir:** solo una fuente informal describe su web como minimalista en blanco y negro. No he podido verificar si hay vídeo en el hero. [No verificado] Sus vídeos de *bootcamp* con clientes están documentados en `investigacion/01`, D.1.
- **Varick Agents:** firma de IA aplicada (San Francisco o Nueva York según la fuente) que construye agentes a medida y los integra en Salesforce, NetSuite, ServiceNow o Workday ([Built In](https://builtin.com/company/varick-agents), [AI Engineer](https://www.ai.engineer/orgs/varick-agents)). No he podido ver su hero. [No verificado]

**Lección para Spiralia** [Opinión]: las grandes usan vídeo para crear **ambiente de marca**. Las mejores firmas de IA (Sierra, Harvey) enseñan **personas con el resultado puesto** o un lenguaje de movimiento muy cuidado. La propuesta de la sección 7 hace las dos cosas: ambiente en el fondo y personas o resultado como tema.

**Contexto sobre vídeo y confianza** [Vendedor, cifras no verificadas en el original]:
- Wyzowl 2026: el 91 % de las empresas usa vídeo ([ClickMinded](https://www.clickminded.com/video-marketing-statistics/)).
- Las productoras B2B dicen que en 2025 lo que más se encargó fueron historias de clientes y de personas, y que las personas reales generan más confianza que el material de archivo o el vídeo generado por IA ([90 Seconds](https://90seconds.com/blog/2026-b2b-video-marketing-trends/)).
- Esto apoya que **la versión definitiva sea metraje real**.

---

## 7. ESPECIFICACIÓN del nuevo hero de Spiralia AI

### 7.1 Estructura

**Escritorio (≥ 980 px), 100svh, mínimo 640 px:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [SPIRALIA ·AI]          Método  Casos  Para ti  Quiénes somos   EN [Hablemos]│  ← barra TRANSPARENTE (72 px)
│                                                                          │
│                                       (vídeo a sangre: la actividad ocupa  │
│                                        el 55 % derecho del encuadre)       │
│                                                                          │
│  SPIRALIA AI · FORMACIÓN Y DESPLIEGUE DE IA                                │  ← antetítulo #E0DFDA
│  La inteligencia se compra.                                                │  ← H1 Butler 300, hasta 6 rem
│  La ventaja se despliega.                                                  │     2.ª línea #A9B1B8
│  Subtítulo ≤ 20 palabras, ≤ 2 líneas, máx. 40ch.                           │
│  [ Hablemos de tu caso ]   Diagnóstico en 3 minutos →                       │  ← 1 botón + 1 enlace
│                                                                          │
│  ▶ Ver la película · 20 s                                     [❚❚]          │  ← píldora de cristal + pausa
└──────────────────────────────────────────────────────────────────────────┘
┌ Franja bajo el pliegue (fondo #051A2B sólido) ────────────────────────────┐
│ Más de 50.000 personas formadas │ ING · Deloitte · CCEP · GPTW · … (1 fila) │
│ Empieza por lo tuyo:  Diriges la compañía · Diriges Personas · Diriges Formación │
└──────────────────────────────────────────────────────────────────────────┘
```

**Móvil (< 980 px), 100svh, mínimo 560 px, vídeo vertical 9:16:**

```
┌────────────────────────┐
│ [S SPIRALIA]  EN [☰] [Hablemos] │ ← barra transparente con menú
│                        │
│ (actividad del vídeo   │
│  en el 55 % superior)  │
│                        │
│ ANTETÍTULO             │
│ La inteligencia        │ ← H1 con <br> en ES/EN, sin cortes raros
│ se compra.             │
│ La ventaja             │
│ se despliega.          │
│ Subtítulo ≤ 3 líneas   │
│ [ Hablemos de tu caso ]│ ← a todo el ancho
│ Diagnóstico en 3 min → │
│ ▶ Película · 20 s  [❚❚]│
└────────────────────────┘
```

Los logos y los accesos por perfil quedan inmediatamente debajo. [Opinión] Se gana una pantalla entera de aire en móvil: hoy el hero mide 1.547 px.

### 7.2 Capas, de atrás adelante

1. `section.hero` con `background: var(--night)`: es lo que se ve si no carga nada.
2. `<picture>` del póster (fotograma 0; WebP con JPEG de respaldo; `media` para vertical u horizontal). Es el **elemento de LCP**.
3. `<video>` con `opacity: 0` y fundido de 0,8 s al recibir el evento `playing`.
4. Velo y degradados (sección 7.3).
5. Grano estático (`::after`, SVG de ruido, opacidad de 0,04 a 0,06, `mix-blend-mode: overlay`).
6. Contenido (texto y CTA).
7. Controles: pausa y «Ver la película».

### 7.3 Velo: valores de partida (ajustar con la medición de la sección 2.1)

```css
.hero-scrim{position:absolute;inset:0;pointer-events:none;background:
  /* 1 · arriba: legibilidad de la barra transparente */
  linear-gradient(180deg, rgba(5,26,43,.72) 0, rgba(5,26,43,0) 180px),
  /* 2 · abajo: zona de texto */
  linear-gradient(0deg, rgba(5,26,43,.94) 0%, rgba(5,26,43,.62) 36%, rgba(5,26,43,.12) 68%, rgba(5,26,43,.20) 100%),
  /* 3 · esquina inferior izquierda: refuerzo detrás del H1 en escritorio */
  radial-gradient(110% 85% at 0% 100%, rgba(5,26,43,.80) 0%, rgba(5,26,43,0) 62%);}
@media (orientation:portrait){ /* en vertical el texto ocupa casi todo el ancho */
  .hero-scrim{background:
    linear-gradient(180deg, rgba(5,26,43,.72) 0, rgba(5,26,43,0) 140px),
    linear-gradient(0deg, rgba(5,26,43,.96) 0%, rgba(5,26,43,.78) 45%, rgba(5,26,43,.10) 75%);}}
```

**Prueba de aceptación** [Opinión]: con el velo aplicado, ningún fotograma supera **0,06 de luminancia relativa** bajo el H1 ni **0,057** bajo los textos pequeños grises (sección 2.1). Si no se cumple, se corrige el **vídeo** (oscureciendo su zona de texto), no subiendo el velo hasta dejarlo opaco.

### 7.4 Tipografía

- **H1:** Butler **300 (Light)**, `clamp(2.6rem, 5.8vw, 6rem)`, `line-height: 1.02`, `letter-spacing: -.015em`. Dos líneas; la segunda en `#A9B1B8`.
  - En móvil, salto de línea controlado («La inteligencia / se compra.») con `text-wrap: balance` o `<br>` por idioma.
  - **No usar Butler 400** en el hero hasta resolver el fallo de la «á» en Chromium.
  - Comprobar con «Más», «está» y «Cuánto».
- **Antetítulo:** Sofia Sans Condensed 600, `.84rem`, `letter-spacing: .2em`, mayúsculas, en **`#E0DFDA`**. Sobre vídeo, `#A9B1B8` exige un fondo ≤ 0,057.
- **Subtítulo:** Open Sans 400, `clamp(1.06rem, 1.3vw, 1.25rem)`, `line-height: 1.55`, `max-width: 40ch`, `#E0DFDA`.
- **Sin `text-shadow`** como arreglo: si hace falta sombra, el vídeo está demasiado claro. [Opinión]

### 7.5 Copy del hero

Huecos y longitudes. El texto final lo decide la línea de copy. [Opinión]

| Hueco | Longitud | Hoy | Ejemplo de forma, no copy final |
|---|---|---|---|
| Antetítulo | ≤ 6 palabras | «Spiralia AI · AI adoption, end-to-end.» | «Spiralia AI · Formación y despliegue de IA» (en ES; el lema inglés puede quedarse en la versión EN) |
| H1 | ≤ 8 palabras, 2 líneas | «La inteligencia se compra. La ventaja se despliega.» (aprobado el 14-oct) | Se mantiene, salvo que la línea de copy proponga otro |
| Subtítulo | ≤ 20 palabras, ≤ 2 frases | 30 palabras (8 + 22) | «Formamos a toda tu plantilla con su propio trabajo. Y desplegamos con tus equipos hasta que la IA rinde.» (19 palabras) |
| CTA principal | 2-5 palabras | «Hablemos de tu caso» | Se mantiene, o con el primer paso con nombre: «Empieza por Rumbo» |
| CTA secundario | enlace | «¿Dónde está tu empresa? Diagnóstico en 3 minutos» (se parte en dos líneas en móvil) | «Diagnóstico en 3 minutos →» |
| Botón de película | ≤ 4 palabras | — | «Ver la película · 20 s» |

### 7.6 Botones de llamada a la acción

- **Principal:** el `.btn-cta` actual (píldora `#E0DFDA` con texto `#08263D`), `min-height: 52px`. Es el único elemento relleno del hero.
- **Secundario:** **enlace de texto**, no píldora fantasma. Subrayado de 1 px, flecha y `#E0DFDA`. Así no compite con el principal ni se parte en móvil.
  - Va acorde con «un solo color para el CTA principal y ninguna acción que compita» ([SaaS Hero](https://saashero.net/content/b2b-saas-landing-page-examples/)). [Vendedor]
- **Microcopia bajo el botón** (opcional): una línea pequeña que quite dudas, del tipo «30 minutos · Te responde una persona del equipo».
  - Las guías hablan de frases que reducen el riesgo, el esfuerzo o la incertidumbre. Un caso documentado atribuye un +29 % a una garantía en el botón ([Conversion Rate Experts](https://conversion-rate-experts.com/button-microcopy-win-report/)). [Vendedor/caso único]
  - Solo si Spiralia puede cumplir lo que promete.

### 7.7 Controles del vídeo

- **Pausa:** botón circular de 40 px, abajo a la derecha (en móvil, junto a «Ver la película»), con cristal ligero:
  - Fondo `rgba(5,26,43,.55)`, `backdrop-filter: blur(10px)` y borde `rgba(224,223,218,.4)`.
  - `aria-label` que cambia entre «Pausar el vídeo de fondo» y «Reanudar el vídeo de fondo», y `aria-pressed`.
  - La elección se guarda en `localStorage`, envuelto en try/catch.
  - Se oculta si el vídeo no llega a reproducirse.
- **«Ver la película · 20 s»:** abre un `<dialog>` con la película actual (`film-es.mp4` o `film-en.mp4`) **con controles**, foco atrapado, cierre con Esc y el vídeo de fondo en pausa mientras está abierto.
  - Conserva la pieza explicativa, que también vale para LinkedIn, sin cargar el hero.

### 7.8 Barra transparente que pasa a sólida

- **Estado A, sobre el vídeo:**
  - `background: transparent`, sin borde ni desenfoque.
  - Logo blanco y enlaces en `#E0DFDA` al 90 %.
  - La legibilidad la da la capa 1 del velo (degradado superior de 180 px). [Opinión, coherente con [Slider Revolution](https://www.sliderrevolution.com/design/transparent-navbar-examples/): el fallo más común es el logo sobre un hero claro]
- **Estado B, sólida:**
  - La de hoy: `rgba(5,26,43,.86)`, desenfoque de 14 px y borde `var(--line-d)`.
  - Altura de 72 a 60 px, con una transición de 0,3 s.
- **Disparador:** un `IntersectionObserver` sobre un centinela de 1 px al final del hero, con `rootMargin` igual a la altura de la barra. Pasa a sólida cuando el vídeo deja de estar detrás. Sin escuchar el evento `scroll`.
- **Siempre sólida:** con el menú móvil abierto, con `prefers-reduced-transparency: reduce` (fondo opaco `#051A2B`, sin desenfoque) y cuando se navega a un ancla desde fuera del hero.
- **Ocultar al bajar y mostrar al subir:** **no** en escritorio. En móvil es opcional. Hay opiniones encontradas ([Thrive Themes](https://thrivethemes.com/docs/how-to-use-scroll-behavior-options-in-a-header/), [Pravin Kumar](https://www.pravinkumar.co/blog/design-sticky-navigation-bar-helps-not-annoys-2026)). [Opinión: el CTA «Hablemos» tiene que estar siempre a la vista]

### 7.9 Comportamiento (JS)

Se extiende el bloque M1 de `motion.js`.

```js
// Sin vídeo (solo póster): ?still=1, reducir movimiento, Save-Data, 2G
const rm = matchMedia('(prefers-reduced-motion: reduce)');
const c = navigator.connection || {};
if (still() || rm.matches || c.saveData || /2g/.test(c.effectiveType || '')) return;
// Archivo según orientación (se decide al cargar, como <source media>)
const portrait = matchMedia('(orientation: portrait)').matches;
v.src = portrait ? hero.dataset.srcP : hero.dataset.srcL;   // + AV1 solo si existe y canPlayType lo admite
addEventListener('load', () => (window.requestIdleCallback || setTimeout)(() => {
  if (paused()) return;                                     // preferencia guardada
  v.play().then(() => hero.classList.add('is-playing'))
          .catch(() => hero.classList.add('no-video'));     // bajo consumo de iOS: póster limpio, sin botón
}));
// Pausar fuera de pantalla o con la pestaña oculta; reanudar si no lo pausó el usuario
// rm.addEventListener('change', e => e.matches && v.pause());
```

### 7.10 Qué mostrar en el vídeo

**Reglas comunes** [Opinión]:
- Sin texto, cifras ni logotipos de clientes.
- Sin cerebros, robots, circuitos ni azul neón.
- Paleta Monocromo Spiralia (`#051A2B`, `#08263D`, `#174467`, `#E0DFDA` y blanco para los brillos).
- **Zona de texto oscura:** el tercio inferior izquierdo en 16:9 y la mitad inferior en 9:16.
- Movimiento lento: cámara que deriva con una escala de 1,00 a 1,04 en todo el bucle.
- Bucle perfecto.

**A · «La organización se enciende»** (HyperFrames, recomendado para el lanzamiento)

Mensaje: la IA no llega por una licencia; se despliega persona a persona hasta encender toda la organización. Enlaza con el H1, «La ventaja se despliega», y con la escala de Spiralia.

| Tiempo | Qué pasa (12 s, 24 fps = 288 fotogramas) |
|---|---|
| 0-2 s | Plano general en perspectiva cenital (plano CSS 3D con `rotateX` de unos 55°) de una retícula irregular de 1.200-1.800 puntos: puestos, personas, una planta de oficina vista desde arriba. Una minoría de puntos brilla débilmente en `#E0DFDA` al 30 %; el resto, en `#174467`. Entra la cámara. |
| 2-6 s | Desde 3 focos del tercio derecho (los formadores y FDE), trazos finos en curva S, sacados de `s-geom.js` para tener la «firma» de la marca sin el logo, avanzan hacia los vecinos. Cada punto alcanzado se enciende con un anillo que se expande. |
| 6-9 s | Los grupos encendidos se unen. Unos pocos puntos muestran una «órbita» mínima (2 puntos girando): agentes trabajando. Sube el brillo general. |
| 9-12 s | La luz respira hacia abajo y vuelve al estado inicial, los trazos se desvanecen y la cámara vuelve a su posición. El fotograma 288 coincide con el 0. |

- **Por qué** [Opinión]: habla de **Spiralia y de sus clientes, no de Ana**. Cuenta la idea central (adopción que se extiende y deja algo funcionando). Sigue siendo abstracto y elegante, sin el cliché de «IA azul». No repite el bucle descartado: no hay S, hay trazos con su geometría.
- **Riesgo:** puede leerse como «data viz» genérico. Se mitiga con poca densidad, mucho negro y grano.

**B · «Trabajo real»** (HyperFrames, alternativa)

- **Qué es:** 5 tarjetas translúcidas a distintas profundidades: una propuesta comercial, una tabla, un email, una diapositiva y un chat con un agente. Deriva con paralaje y, en cada una, algo se completa: la tabla se rellena, aparece un ✓, un párrafo se escribe solo. Desenfoque de 2 a 6 px para que **no se pueda leer** nada.
- **A favor:** visualiza «la IA hace trabajo de verdad».
- **En contra** [Opinión]: se parece a cualquier SaaS, y el texto desenfocado sigue compitiendo con el H1. Segunda opción.

**C · Metraje real de sesiones** (versión definitiva)

- **Plan de rodaje:** un día, 2 o 3 sesiones reales y un comité, 6-8 planos de 1,5 a 2,5 s:
  1. Sala grande desde atrás, con más de 100 personas y la pantalla con IA desenfocada (escala: «50.000»).
  2. Manos en el portátil y un agente generando un documento, pantalla desenfocada.
  3. Comité de dirección alrededor de una mesa, en plano medio o de espaldas.
  4. FDE y empleado mirando la misma pantalla, señalando.
  5. Pizarra o pósits con un proceso dibujado.
  6. Detalle de una libreta o tarjeta con «SPIRAL», muy sutil.
  7. Gente que se ríe o asiente al final de la sesión.
  8. Luz de mañana en la oficina o en Madrid.
- **Técnica:**
  - Grabación en 4K a 25 fps, en LOG, con estabilizador y movimientos lentos.
  - Etalonaje frío y desaturado hacia el azul noche y el greige.
  - Encuadre pensado ya en el rodaje para el recorte 9:16, con el sujeto en el centro.
  - Máster en ProRes 422.
- **Legal** [Opinión, pendiente de asesor]:
  - Consentimiento de derechos de imagen de quien sea reconocible.
  - Permiso del cliente si salen sus instalaciones o su marca.
  - Sin primeros planos de personas sin firma.
- **Cuándo** [Opinión]: sustituye a A cuando haya material. El HTML no cambia, solo los archivos.

### 7.11 Especificaciones técnicas y pesos objetivo

Objetivos propios a partir de las fuentes de la sección 2.3 y de los datos del repo. Medirlos. [Opinión]

| Archivo | Resolución | fps | Duración | Códec | Objetivo HyperFrames (A/B) | Objetivo metraje real (C) |
|---|---|---|---|---|---|---|
| `hero-16x9.mp4` | 1920×1080 | 24-25 | 12 s | H.264 High, CRF 26-28, `yuv420p`, `+faststart`, sin audio | **≤ 1,2 MB** | **≤ 3 MB** (si no se llega, bajar a 1600×900) |
| `hero-9x16.mp4` | 720×1280 | 24-25 | 12 s | ídem | **≤ 0,7 MB** | **≤ 1,8 MB** |
| `hero-16x9.av1.mp4` (opcional) | 1920×1080 | — | — | AV1 (SVT-AV1), `av01.0.08M.08` | No hacerlo | Solo si ahorra ≥ 25 % con la misma calidad |
| `hero-9x16.av1.mp4` (opcional) | 720×1280 | — | — | AV1, `av01.0.05M.08` | No hacerlo | ídem |
| `hero-16x9.webp` / `.jpg` | 1920×1080 | — | fotograma 0 | WebP q70 / JPEG q4 | **≤ 80 KB** / ≤ 140 KB | ídem |
| `hero-9x16.webp` / `.jpg` | 720×1280 | — | fotograma 0 | ídem | **≤ 50 KB** / ≤ 90 KB | ídem |
| Grano | 200×200 SVG o PNG | — | — | — | ≤ 2 KB | ídem |

Presupuesto de la primera pantalla en móvil [Opinión]: ≤ 1,2 MB entre HTML, CSS, fuentes en `woff2`, póster y vídeo vertical. **LCP p75 ≤ 2,5 s y CLS = 0.**

Comandos de partida (sobre el máster que renderiza HyperFrames, con el mismo patrón que `render_film.sh`):

```bash
# Bucle sin salto: N fotogramas (12 s × 24 fps = 288). El fotograma N sería igual al 0.
ffmpeg -y -i hero-16x9.master.mp4 -frames:v 288 -c:v libx264 -preset slow -crf 27 -tune animation \
  -pix_fmt yuv420p -profile:v high -g 48 -movflags +faststart -an -map_metadata -1 hero-16x9.mp4
# (para metraje real: -tune film y probar CRF 24-28)
# Póster = fotograma 0, con la misma conversión de color que render_film.sh
C="scale=in_color_matrix=bt709:in_range=tv:out_color_matrix=bt601:out_range=pc"
ffmpeg -y -i hero-16x9.master.mp4 -vf "select=eq(n\,0),$C" -frames:v 1 -q:v 4 hero-16x9.jpg
ffmpeg -y -i hero-16x9.master.mp4 -vf "select=eq(n\,0)" -frames:v 1 -c:v libwebp -quality 70 hero-16x9.webp
# AV1 opcional (solo metraje real; comparar a calidad igual)
ffmpeg -y -i hero-16x9.master.mp4 -frames:v 288 -c:v libsvtav1 -preset 6 -crf 34 -g 48 -pix_fmt yuv420p \
  -svtav1-params tune=0 -an -movflags +faststart hero-16x9.av1.mp4
```

Ajustes de AV1 basados en la [wiki de FFmpeg](https://trac.ffmpeg.org/wiki/Encode/AV1): CRF 0-63, presets 0-13, `tune=0` para calidad visual y `-movflags +faststart`. [Estudio] HyperFrames: HTML, CSS y GSAP renderizados con Chrome sin interfaz y FFmpeg, con salida determinista. El repo usa `hyperframes@0.8.81` ([GitHub](https://github.com/heygen-com/hyperframes), [yuv.ai](https://yuv.ai/blog/heygen-hyperframes-html-video)). [Estudio]

### 7.12 Esqueleto HTML

```html
<link rel="preload" as="image" href="{{base}}assets/video/hero-16x9.webp" type="image/webp" fetchpriority="high" media="(orientation: landscape)">
<link rel="preload" as="image" href="{{base}}assets/video/hero-9x16.webp" type="image/webp" fetchpriority="high" media="(orientation: portrait)">
...
<section class="hero hero--video dark" id="top" aria-labelledby="h1"
         data-src-l="{{base}}assets/video/hero-16x9.mp4" data-src-p="{{base}}assets/video/hero-9x16.mp4">
  <div class="hero-media" aria-hidden="true">
    <picture>
      <source media="(orientation: portrait)" srcset="{{base}}assets/video/hero-9x16.webp" type="image/webp">
      <source srcset="{{base}}assets/video/hero-16x9.webp" type="image/webp">
      <img class="hero-poster" src="{{base}}assets/video/hero-16x9.jpg" alt="" width="1920" height="1080" fetchpriority="high">
    </picture>
    <video class="hero-video" muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback></video>
    <div class="hero-scrim"></div>
  </div>
  <div class="wrap hero-in">
    <p class="kicker">…</p>
    <h1 id="h1" class="display"><span class="l1">…</span> <span class="l2">…</span></h1>
    <p class="hero-sub">…</p>
    <div class="hero-ctas"><a class="btn btn-cta" href="…">…</a><a class="link-arrow" href="#diagnostico">… →</a></div>
  </div>
  <div class="wrap hero-ctl">
    <button type="button" class="pill-glass" data-film-open>▶ {{hero.film_btn}}</button>
    <button type="button" class="hero-pause" aria-pressed="false" aria-label="{{attr:hero.pause_bg}}" hidden></button>
  </div>
</section>
<div class="proof-band dark">…50.000 + logos (1 fila) + accesos por perfil…</div>
<dialog class="film-dialog">…película actual con controles…</dialog>
```

```css
.hero--video{min-height:max(640px,100svh);display:grid;align-content:end;padding-bottom:clamp(28px,6vh,72px)}
.hero-media{position:absolute;inset:0;z-index:-1;overflow:hidden;background:var(--night)}
.hero-poster,.hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 50%}
.hero-video{opacity:0;transition:opacity .8s ease}
.is-playing .hero-video{opacity:1}
.hero-media::after{content:"";position:absolute;inset:0;background:url(../assets/img/grain.svg);opacity:.05;mix-blend-mode:overlay}
@supports (animation-timeline: scroll()){ /* único momento ligado al scroll */
  .hero-media{animation:hero-out linear both;animation-timeline:view();animation-range:exit 0% exit 100%}
  @keyframes hero-out{to{transform:scale(1.06);filter:brightness(.6)}}}
@media (prefers-reduced-motion:reduce){.hero-media{animation:none}}
```

### 7.13 Criterios de aceptación (QA)

1. LCP p75 ≤ 2,5 s en móvil de gama media con 4G simulado, y el póster como elemento de LCP. CLS = 0.
2. Contraste medido en todos los fotogramas (sección 7.3). El H1, el subtítulo y el CTA son legibles **también sin vídeo** (solo póster y solo fondo azul noche).
3. Con «reducir movimiento» en el sistema operativo: no se descarga el vídeo (comprobarlo en la pestaña Red).
4. Con Save-Data o en 2G simulado: no se descarga.
5. En iPhone con modo de bajo consumo: póster limpio, sin botón de reproducir del sistema y sin botón de pausa.
6. Teclado: la pausa y «Ver la película» se alcanzan con Tab y tienen foco visible. El diálogo atrapa el foco y se cierra con Esc.
7. Al girar el móvil no hay huecos: `object-fit: cover`; el archivo no cambia hasta recargar, y eso se acepta.
8. Pesos dentro de la tabla de la sección 7.11, y un solo archivo para ES y EN.
9. La «á» de Butler se ve bien en todos los textos del hero.

---

## 8. Barra, CTA y pie: recomendaciones

### 8.1 Barra de navegación

- **Hallazgo P0 (falta un menú en móvil y tableta)** [Hecho]: por debajo de 980 px los enlaces de navegación desaparecen y no hay botón de menú. En la página más larga del sitio, quien llega desde el móvil (el caso típico de un CEO que abre un enlace de LinkedIn) no puede saltar a «Casos» ni a «Quiénes somos».
  - **Solución:** un botón «Menú» con `aria-expanded` que abre una hoja a pantalla completa en `#051A2B` sólido, con las anclas en Butler grande, el CTA a todo el ancho y el cambio de idioma. Hay que revisar los ejemplos móviles de navbar.gallery.
- **Anclas** [Opinión]: «Método · Casos · Para ti · Quiénes somos», más EN y [Hablemos]. Hoy son «El reto · Cómo trabajamos · Para ti · Quiénes somos».
  - **Casos (`#pruebas`) es lo que más busca un CEO:** debe estar en la barra.
  - «El reto» aporta poco como destino.
  - Menos de 5 enlaces, como los SaaS que más convierten ([SaaS Hero](https://saashero.net/content/b2b-saas-landing-page-examples/)). [Vendedor]
- **Indicador de sección activa:** `aria-current` según el scroll (el CSS ya lo contempla) y `scroll-margin-top` igual a la altura de la barra (hoy es `scroll-padding-top: 72px`, bien).
- **Alternativa de diseño** [Opinión]: al pasar a sólida, la barra puede convertirse en una píldora flotante centrada (máx. 1200 px, `border-radius: 99px`, cristal). Es más «startup SaaS» que la barra a ancho completo, más sobria y consultora, que es la que recomiendo.

### 8.2 CTA

- **Un solo verbo en toda la página:** el principal siempre igual («Hablemos de tu caso» o el formato con nombre «Rumbo») y el secundario siempre el diagnóstico. Hoy se mezclan «Hablemos», «Hablemos de tu caso» y «Reserva 30 minutos». [Hecho/Opinión]
- **Cierre (`#hablemos`)** [Opinión, también responde a la queja de que la web gira demasiado en torno a Ana]:
  - Sustituir los dos retratos por **una imagen de sesión o de equipo**: un fotograma del rodaje o, mientras tanto, la S de líneas grande. Cambiar «Hablas con quien lo va a hacer» por algo del tipo «Hablas con el equipo que lo va a hacer».
  - **Cerrar con el mismo vídeo de fondo** que el hero, ya en caché, sin coste extra, con un velo más denso: la página abre y cierra con la misma imagen.
  - Encima, el CTA grande (`btn-lg`), una línea de microcopia, el email copiable y la línea legal.
- **Buzón y agenda de equipo** [Hecho en el repo]: `MAIL = 'ana.iza@spiralia.es'` en `build.py` y Bookings «de Ana».
  - Propuesta: `ia@spiralia.es` o `hola@spiralia.es` y una página de Bookings de equipo, que Microsoft Bookings permite con varias personas [no verificado para el plan de Spiralia].
  - En el texto legal, el ejercicio de derechos debería ir a un buzón de privacidad, no a un correo personal.
- **Ideas de cta.gallery** [Opinión]:
  - Bloques de CTA final en modo oscuro con una sola acción, una frase grande y microcopia.
  - Evitar la urgencia falsa: «Cada trimestre cuenta» es aceptable porque no inventa escasez.

### 8.3 Pie

- **Hoy:** el logo pequeño, «Otras áreas de Spiralia» (Events, Communication, Team Building, Bespoke, Media) y la línea legal con «Esta página no usa cookies», que es un **gran diferenciador** que conviene destacar. [Hecho]
- **Propuesta** (estilo «Large Type» o «Typographic» de footer.design) [Opinión]:
  1. Fila superior con 4 columnas en Sofia Sans Condensed:
     - **Spiralia AI:** Método, Casos, Para ti, Diagnóstico, Preguntas.
     - **Spiralia:** las otras áreas.
     - **Contacto:** el email genérico con botón de copiar, LinkedIn y la dirección de Madrid.
     - **Legal:** privacidad y «Sin cookies. Sin rastreadores.»
  2. Una línea de prueba: «Más de 50.000 personas formadas · ING · Deloitte · CCEP».
  3. Debajo, **«SPIRALIA» en Butler Light a todo el ancho** (unos 18-22vw), recortada por el borde inferior, en `#E0DFDA` al 8-12 % sobre `#051A2B`, como textura de marca ([Framer «Futer»](https://www.framer.com/marketplace/components/footer-futer/)). Con `aria-hidden`; el logo accesible sigue arriba.
  4. Sin boletín mientras no haya sistema que lo gestione. Si se añade, la casilla de comunicaciones comerciales va sin marcar (`investigacion/01`, Tarea 2.6).

---

## 9. Plan por prioridad

| Prioridad | Acción | Esfuerzo [estimación] |
|---|---|---|
| **P0** | Hero a pantalla completa con el concepto A (HyperFrames), velo, póster precargado, reglas de vídeo (sección 7.9) y QA (sección 7.13) | 2-3 días (composición, render, integración y medición) |
| **P0** | Barra transparente que pasa a sólida y **menú móvil** | 0,5-1 día |
| **P1** | Franja bajo el pliegue: 50.000, logos en una fila y accesos por perfil | 0,5 día |
| **P1** | Película actual en un modal («Ver la película · 20 s») | 0,5 día |
| **P1** | Cierre sin retratos, con el vídeo de vuelta; buzón y Bookings de equipo | 0,5 día, más la decisión de Jose |
| **P1** | Fuentes en `woff2` con subconjunto; arreglar Butler 400 («á») | 0,5 día |
| **P2** | Pie con la marca grande | 0,5 día |
| **P2** | Rodaje de un día y sustitución por metraje real (concepto C) | 1 día de rodaje y 2-3 de edición |
| **P2** | Comparar tokens con Refero Styles (Apple, Anthropic, Linear) y ajustar la escala tipográfica | 0,5 día |

---

## 10. Preguntas para Jose

1. **Metraje:** ¿hay vídeo de sesiones reales (Deloitte, ING, CCEP) con permiso de uso? ¿Hay presupuesto y fecha para un rodaje de un día?
2. **Concepto provisional:** ¿A («La organización se enciende») o B («Trabajo real»)? Recomiendo A.
3. **H1:** ¿se mantiene «La inteligencia se compra. La ventaja se despliega.» o se revisa con la línea de copy?
4. **Película de 20 s:** ¿se conserva en un modal y para LinkedIn o se retira de la web?
5. **Contacto:** ¿se puede crear `ia@spiralia.es` (u otro buzón genérico) y una página de Bookings de equipo?
6. **Barra:** ¿a ancho completo (recomendada) o píldora flotante?

---

## Fuentes

**Vídeo, rendimiento y accesibilidad**
- web.dev: [Largest Contentful Paint](https://web.dev/articles/lcp) · [Replace GIFs with video](https://web.dev/articles/replace-gifs-with-videos) · [Save-Data](https://web.dev/articles/optimizing-content-efficiency-save-data)
- [Chrome Learn Performance: video](https://chrome.dev/f/learn_performance_video/7/) · [DebugBear: optimize video LCP](https://debugbear.com/blog/optimize-video-lcp)
- [MDN: Autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) · [MDN: prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) · [Chrome: prefers-reduced-transparency](https://developer.chrome.com/blog/css-prefers-reduced-transparency)
- [W3C: Understanding SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG20/Understanding/pause-stop-hide) · [Accessible Web: autoplay with pause button](https://accessibleweb.com/question-answer/does-an-auto-play-video-with-a-pause-button-meet-accessibility-guidelines/) · [A11y Project: autoplay](https://www.a11yproject.com/posts/never-use-auto-play/)
- [specification.website: reduced motion](https://specification.website/spec/accessibility/reduced-motion/) · [Scott O'Hara: reduced motion video](https://www.scottohara.me/note/2019/07/12/reduced-motion-video.html) · [thoughtbot: accessible autoplay](https://thoughtbot.com/blog/can-auto-playing-videos-be-accessible)
- [WebKit bug 216887 (Low Power Mode)](https://bugs.webkit.org/show_bug.cgi?id=216887) · [Apple Developer Forums 709821](https://developer.apple.com/forums/thread/709821) · [WebKit bug 199101 (Save-Data)](https://bugs.webkit.org/show_bug.cgi?id=199101)
- [caniuse: AV1](https://caniuse.com/av1) · [caniuse: WebM](https://caniuse.com/webm) · [Bitmovin: AV1 playback support](https://bitmovin.com/blog/av1-playback-support/) · [FFmpeg wiki: AV1](https://trac.ffmpeg.org/wiki/Encode/AV1)
- [Scott Jehl: responsive video](https://scottjehl.com/posts/using-responsive-video/) · [HTMHell 2024: Getting oriented with HTML video](https://htmhell.dev/adventcalendar/2024/19/)
- [Amazon APL: backgrounds](https://developer.amazon.com/en-US/alexa/alexa-haus/visual-design/apl-components/apl-background) · [Acquia: text over images contrast](https://docs.acquia.com/web-governance/text-top-image-gradient-or-backdrop-filter-should-have-minimum-contrast) · [UMD: overlay hero](https://designsystem.umd.edu/components/overlay-hero)
- [Unbounce: video backgrounds and conversions](https://unbounce.com/landing-pages/do-video-backgrounds-help-or-hurt-conversions/) · [Elfsight: video background](https://elfsight.com/guides/video-background-website/) · [Jeff Bullas: video size](https://www.jeffbullas.com/thread/what-is-the-best-video-size-for-website-background) · [Adventist Connect: hero video](https://support.adventistconnect.org/help/hero-video-best-practices) · [Swarmify: autoplaying background video](https://swarmify.com/blog/how-to-make-an-autoplaying-background-video/)
- [HyperFrames (GitHub)](https://github.com/heygen-com/hyperframes) · [yuv.ai: HyperFrames](https://yuv.ai/blog/heygen-hyperframes-html-video)

**Tendencias y Awwwards**
- [webyansh: Top 19 Web Design Trends (137 sites scanned)](https://webyansh.com/post/top-web-design-trends)
- Awwwards: [Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/) · [Lando Norris](https://www.awwwards.com/sites/lando-norris) · [AI in Design Report 2026](https://www.awwwards.com/sites/ai-in-design-report-2026) · [Heron AI](https://www.awwwards.com/sites/heron-ai) · [Outsource Consultants](https://www.awwwards.com/sites/outsource-consultants-inc)
- [Line25: trends 2026](https://line25.com/articles/web-design-trends-2026/) · [Really Good Designs: trends 2026](https://reallygooddesigns.com/web-design-trends-2026/) · [Rebekah Read: trends 2026](https://rebekahreadcreative.com/2026-website-design-trends/) · [SaaSFrame: SaaS landing trends 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples) · [SaaS Hero: B2B SaaS landing examples](https://saashero.net/content/b2b-saas-landing-page-examples/) · [Made Good Designs: hero section design](https://madegooddesigns.com/hero-section-design/)
- Animación con el scroll: [Chrome for Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) · [ICS Media](https://ics.media/en/entry/230718/) · [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)
- Grano: [Jean Tinland](https://www.jeantinland.com/blog/120kb-less/) · [CSSmatic](https://cssmatic.com/gen-noise-texture.html) · [CSS-Tricks: feTurbulence](https://css-tricks.com/?p=335760)
- Cristal / Liquid Glass: [Infinum](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/) · [UX Collective](https://uxdesign.cc/apples-liquid-glass-isn-t-just-an-accessibility-blunder-it-s-an-environmental-one-too-08c593a87963) · [Frontend Masters](https://frontendmasters.com/blog/liquid-glass-on-the-web/) · [Axess Lab](https://axesslab.com/?p=5111) · [Merge](https://merge.rocks/resources/websites-playbook/ux-interface-design/glassmorphic-design-the-shocking-truth-about-when-it-kills-ux)
- Fichas DESIGN.md de terceros: [shadcn.io: Anthropic DESIGN.md](https://www.shadcn.io/design/anthropic)

**Galerías del cliente**
- [Supahero (Product Hunt)](https://www.producthunt.com/p/supahero/supahero) · [Scrolltide](https://www.scrolltide.co/) · [uiroot: Scrolltide](https://uiroot.com/tools/242) · [Navbar Gallery (Substack)](https://suupercharged.substack.com/p/welcome-to-navbar-gallery) · [Abduzeedo: footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth) · [CTA.gallery](https://www.cta.gallery/categories/all-types) · [Refero Styles (notas)](https://notes.nicolasdeville.com/ai/refero-styles/) · [Refero Styles (natecue)](https://www.natecue.com/en/resources/refero-styles-design-md-examples/) · [samasante/liquid-glass](https://github.com/samasante/liquid-glass) · [Smashing: 3dicons](https://smashingmagazine.com/2022/05/3dicons-open-source-library-case-study-download/)

**Estilo Apple**
- [Enchanting Marketing: write like Apple](https://www.enchantingmarketing.com/write-like-apple/) · [Neil Patel: copy like Apple](https://neilpatel.com/blog/write-copy-like-apple/) · [Leadpages: Apple copywriting](https://leadpages.com/blog/landing-pages-apple-borrow-apples-best-copywriting-techniques-copy)

**Consultoras y firmas de IA**
- [McKinsey: our new identity](https://www.mckinsey.com/about-us/overview/our-new-identity) · [BCG X](https://bcg.com/x) · [Bakken & Baeck: Sierra](https://bakkenbaeck.com/case/sierra) · [Sanctuary Computer: Harvey](https://www.sanctuary.computer/harvey) · [Harvey: Senior Motion Designer](https://jobs.a16z.com/jobs/harvey/37498a8d-689a-4a59-9973-86b2588c7a45--senior-motion-designer) · [Landing Doctor: Harvey](https://landingdoctors.com/teardowns/harvey-ai) · [Built In: Varick Agents](https://builtin.com/company/varick-agents) · [AI Engineer: Varick Agents](https://www.ai.engineer/orgs/varick-agents)
- [ClickMinded: video marketing statistics 2026 (Wyzowl)](https://www.clickminded.com/video-marketing-statistics/) · [90 Seconds: B2B video trends 2026](https://90seconds.com/blog/2026-b2b-video-marketing-trends/)

**Barra, CTA y pie**
- [Slider Revolution: transparent navbar](https://www.sliderrevolution.com/design/transparent-navbar-examples/) · [Thrive Themes: header scroll behavior](https://thrivethemes.com/docs/how-to-use-scroll-behavior-options-in-a-header/) · [Pravin Kumar: sticky navigation 2026](https://www.pravinkumar.co/blog/design-sticky-navigation-bar-helps-not-annoys-2026) · [shadcnblocks: floating pill navbar](https://www.shadcnblocks.com/block/navbar6)
- [Conversion Rate Experts: button microcopy](https://conversion-rate-experts.com/button-microcopy-win-report/)
- [Framer: Footer «Futer»](https://www.framer.com/marketplace/components/footer-futer/) · [UXPin: footer best practices](https://www.uxpin.com/studio/?p=36595)

**Repo (comprobado en local)**
- `src/index.template.html` (hero, barra, cierre, pie), `src/css/site.css` (barra; `.bar-nav{display:none}` por debajo de 980 px), `src/js/motion.js` (bloque M1, película), `build.py` (`MAIL = 'ana.iza@spiralia.es'`), `motion/render_film.sh`, `motion/_descartado/bucle-s/` (bucle descartado: 1920×1080, 24 s, 724 KB).
- Capturas: `investigacion/04_anexos/shots/d1440.png` y `investigacion/04_anexos/shots/m390.png`.
