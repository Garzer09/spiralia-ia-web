# A3 · Auditoría técnica: rendimiento, accesibilidad, SEO/GEO y medición

Spiralia AI (`/home/user/spiralia-ia-web`) · 19-oct-2026

## 0. Alcance y método

- **Qué se ha medido.** Una instantánea de `dist/` tomada a las 16:22 UTC. Se ha copiado a `scratchpad/snap/` porque otro agente estaba cambiando el repo mientras se auditaba: `src/`, `tools/fonts.py`, los woff2 y `dist/` se regeneraban cada pocos minutos. Algunos hallazgos pueden haberse corregido después. Cada punto dice qué se comprobó y cómo.
- **Herramientas:**
  - Lighthouse 12.8.2, con el Chromium 141.0.7390.37 de `/opt/pw-browsers`, en móvil y en escritorio;
  - Playwright, con medidas reales de LCP, CLS, foco, desbordes y contraste sobre los fotogramas del vídeo;
  - fontTools 4.67, FreeType 2.14.3 (Pillow), ffprobe;
  - axe, vía Lighthouse.
- **Dos servidores:**
  - `python -m http.server` en el 8851, sin compresión ni caché;
  - `serve` en el 8863, con gzip, que se parece más a Vercel.
- **Límite de investigación.** WebFetch no funciona en este entorno y el cupo de WebSearch de la sesión, compartido con otros agentes, ya estaba agotado cuando se lanzó este análisis. Por eso:
  - las afirmaciones sobre terceros (precios, planes, políticas de Google o de los proveedores de analítica) llevan **[no verificado]**;
  - los enlaces de la sección 11 son referencias canónicas que no se han podido abrir en esta sesión;
  - todo lo demás está medido aquí, con ficheros de prueba reproducibles.
- **Pruebas:**
  - `scratchpad/fontfix/`: bug de la tipografía;
  - `scratchpad/lh/`: Lighthouse, scripts de Playwright y capturas.

---

## 1. Resumen ejecutivo

1. **La «á» de Butler está arreglada en el repo y validada, pero el fallo era más amplio de lo que se veía.** En Chromium 141, los OTF originales dejan en blanco «ú», «Á» y «Ó» en **los tres pesos**, y «á» en el 400. En el Light (300), el de todos los titulares, desaparecen «ú», «Á», «Ó», «Ś», «Š», «Ž», «Ă» y «Ů».
   - **Causa:** el operador obsoleto *seac* de CFF (acentos compuestos) combinado con anchuras explícitas en el *charstring*.
   - **No es** el saneador OTS, ni las subrutinas, ni el contenedor, ni el hinting.
   - **Validación:** los woff2 que genera hoy `tools/fonts.py` pintan todos los glifos, y hay una prueba de regresión lista.
2. **El rendimiento es bueno; el LCP en móvil, mejorable.**

   | Medida | Escritorio (con gzip) | Móvil simulado (gzip, Slow 4G + CPU ×4) |
   |---|---|---|
   | Performance | 100 | 91 |
   | LCP | 0,7 s | 3,4 s (simulación de Lighthouse) |
   | TBT | 0 | 0 |
   | CLS | 0 | 0 |

   - El elemento LCP es el subtítulo de la portada y el tiempo se va en *render delay*: CSS bloqueante, 4 fuentes (183 KB) y 16 imágenes compitiendo en la carga inicial.
   - En Playwright con CPU ×4 el LCP observado es de unos 1,2 s.
   - En producción (Apache en Nominalia) faltan compresión y caché en `.htaccess`. Sin ellas, Lighthouse móvil cae a **79** (LCP 5,1 s).
3. **Bugs visibles que dañan la marca.**
   - Los logos de ING, Deloitte y CCEP están **deformados** en las tarjetas de casos.
   - La animación de la portada al hacer scroll **nunca se ejecuta**, por un `overflow:hidden`.
   - Si se reactiva, se movería también con «reducir movimiento».
4. **Accesibilidad: 96/100.** La paleta pasa AA con margen (`--on-dark-2` sobre `--night`, 8,1:1). El texto sobre el vídeo de la portada se ha medido en 5 fotogramas: nunca baja de 7,6:1. Falta:
   - un control de pausa en el vídeo del cierre y en la cinta de logos (WCAG 2.2.2);
   - corregir `role="listitem"` en las `<img>`;
   - que el texto visible del enlace de idioma forme parte de su nombre accesible (WCAG 2.5.3);
   - que los botones SPIRAL no tengan nombres pegados («SFormarSkill»);
   - quitar el `aria-live` de la demo animada.
5. **SEO y GEO: la base técnica es correcta.**
   - **Ya está:** `title`, `hreflang` recíproco, `canonical`, Open Graph y JSON-LD con Organization, Service y FAQPage.
   - **Falta:**
     - una `description` de ES más corta (186 caracteres);
     - enriquecer el JSON-LD (oferta «Rumbo», audiencia, país);
     - `robots.txt` y el sitemap en el dominio raíz de producción;
     - `llms.txt`;
     - un bloque de «datos clave» citable.
   - **En el prototipo de Vercel, la imagen al compartir apunta a `spiralia.es/ia/`.** Si esa carpeta aún no existe, la vista previa sale sin imagen en LinkedIn y WhatsApp.
6. **Medición.** Hoy no se mide nada, pero el código para Plausible ya está a medias, sin cookies y compatible con la frase «Esta página no usa cookies». Recomiendo **Plausible**, que funciona igual en Vercel y en Nominalia, con un plan de unos 15 eventos:
   - CTA por origen;
   - perfil (ICP) elegido;
   - embudo del diagnóstico;
   - preguntas frecuentes que se abren;
   - película;
   - email.

   Microsoft Bookings no permite medir la cita confirmada en la web [no verificado], así que hay que cuadrar a mano los clics en «Reserva» con las citas de Bookings, o cambiar de herramienta de agenda.
7. **De paso, contra el «personalismo».** La web usa `MAIL = 'ana.iza@spiralia.es'` en 5 sitios (4 `mailto:` y el botón de copiar), y la reserva va a la agenda de Ana. Técnicamente basta con cambiar `MAIL` en `build.py` a una dirección de rol (`ia@` u `hola@spiralia.es`) y usar una página de Bookings de equipo.

---

## 2. El bug de la «á» en Butler: causa, pruebas y arreglo

### 2.1 Qué se ve

Con los OTF originales en Chromium 141 (Linux), canvas y página dan el mismo resultado: los glifos afectados salen con 0 píxeles de tinta y el hueco conserva su anchura. Captura: `scratchpad/fontfix/test-all.png`.

| Peso | Glifos en blanco (de los probados) | Glifos acentuados que sí se pintan |
|---|---|---|
| Light 300 (titulares) | ú Á Ó Ś Š Ž Ă Ů | á é í ó ñ ü Ő |
| Regular 400 | **á** ú Á Ó Ś Š Ž Ă Ő | é í ó ñ ü Ů |
| Medium 500 | ú Á Ó Ś Š Ž Ă | á é í ó ñ ü Ő Ů |

El cliente solo vio la «á» del 400 («M s de 50.000», «¿Cu nto cuesta?»), pero en cualquier titular en Light con «último», «según», «tú», «Ámbito» u «Óptimo» habría pasado lo mismo. Captura: `scratchpad/fontfix/antes-despues.png`.

### 2.2 Hipótesis descartadas

Para cada hipótesis se construyó una variante de la fuente y se renderizó en Chromium. El script es `make_variants.py` y la tabla de tinta está en `render.out`.

| Hipótesis | Variante | Resultado | Conclusión |
|---|---|---|---|
| OTS (el saneador de Chrome) rechaza la fuente | — | `document.fonts` da `loaded` para las 21 caras y no hay errores OTS en la consola. Además, OTS rechaza la fuente entera, no glifos sueltos. | Descartada |
| El contenedor OTF | `v1-wrap`: el mismo OTF metido en woff2 | Fallan los mismos glifos | Descartada |
| Las subrutinas CFF (en el 400, el `endchar` del seac está en una subrutina local; en 300 y 500, en una global) | `v2-desubr`: sin subrutinas (`fontTools.subset`, `desubroutinize=True`) | Fallan los mismos glifos, en OTF y en woff2 | Descartada |
| El hinting CFF | `v3-seacflat`: solo se aplanan los 13-18 glifos con seac y el resto conserva hints y subrutinas | Se pinta todo | Descartada: el hinting se mantiene y funciona |
| Un fallo del propio fichero | Pillow con FreeType 2.14.3, sobre los OTF originales | **Se pinta todo**, en los tres pesos | El fichero es válido. El fallo está en el motor de Chromium |
| Solo afecta a la web | La misma fuente instalada en el sistema vía fontconfig y usada como `font-family: Butler` | Fallan los mismos glifos | Es el motor de contornos de Chromium, sea fuente web o de sistema |

### 2.3 La causa

`seac_scan.py` expande las subrutinas de cada glifo. Los glifos que fallan son siempre compuestos con el *seac implícito* de Type 2: `endchar` con argumentos `adx ady bchar achar`, que pinta la letra base y el acento desde StandardEncoding. Es un mecanismo obsoleto que Adobe heredó de Type 1. Por ejemplo, la «á» del 400 es `-103 36 -17 97 [callsubr → 194 endchar]`: anchura −103, desplazamiento (36, −17), base 97 = `a` y acento 194 = `acute`.

La diferencia entre los que se pintan y los que no es la **anchura explícita en el charstring**:

- Los compuestos que funcionan («á» en 300 y 500, «Ů» en 400) tienen la anchura por defecto (`defaultWidthX`), así que ni el compuesto ni su letra base llevan el operando de anchura.
- En los que fallan, el compuesto, la letra base, o ambos llevan anchura explícita.

Tres controles en el 400 lo confirman (`control-4-vs-5-operandos.png`, `control-base-sin-anchura.png`, `control-ambas.png`):

| Control | Anchura en «aacute» | Anchura en «a» | ¿Se pinta la «á»? |
|---|---|---|---|
| Original | sí (5 operandos) | sí | No |
| C1 | **no** (4 operandos) | sí | No |
| C2 | sí | **no** | No |
| C3 | **no** | **no** | **Sí** |
| C4: `defaultWidthX = 485` y sin operandos | no | no | **Sí**, con el avance correcto |

**Conclusión.** Chromium 141 solo pinta un seac implícito cuando ni el compuesto ni su base llevan anchura explícita. Cualquier otro caso queda en blanco. FreeType pinta todos.

- **Indicio del motor responsable [hipótesis, no verificada externamente].** El binario de Chromium 141 incluye `skrifa-v0_34` y `SkTypeface_Fontations`, el motor de fuentes en Rust de Google («Fontations»). No se han encontrado *flags* para desactivarlo.
- **Navegadores no probados.** Firefox (FreeType) y Safari (CoreText) no están disponibles en este entorno. Lo esperable es que pinten bien, pero Chrome y Edge (Chromium) son la mayoría del tráfico de directivos en Windows, así que el fallo sí importa.

### 2.4 El arreglo, validado

- **Lo que hay en el repo (`tools/fonts.py`, sin commit).** Redibuja **todos** los glifos de Butler como contornos planos con `T2CharStringPen` (sin seac ni subrutinas) y los guarda en woff2.
  - Validado con canvas: 0 glifos vacíos en 300, 400 y 500 (`render2.out`, familias `T-snap-*`).
  - Validado en la página servida, con `test_acentos.js` contra `http://localhost:8851/` y `:8863`: «ok · todos los acentos se pintan».
  - Pesos: Light 24,1 KB, Regular 23,9 KB, Medium 24,6 KB.
- **Alternativa dirigida, también validada:** `scratchpad/fontfix/fix_butler_seac.py`.
  - Detecta los glifos con seac expandiendo las subrutinas: 17 en Light, 18 en Regular y 13 en Medium.
  - Solo descompone esos glifos y conserva subrutinas e hinting en el resto.
  - Pesa unos 25-26 KB por fichero.
  - La captura de antes y después está en `antes-despues.png`.
  - No aporta nada visible en Chromium, pero toca menos el diseño original.
- **Tercera vía, también validada:** pasar a TrueType con `otf2ttf.py` (cu2qu, error máximo de 1 unidad). Los woff2 bajan a 21,4-21,8 KB y desaparece el CFF. Es el formato más compatible, pero las curvas se aproximan como cuadráticas.

**Recomendaciones:**

1. **Mantener `tools/fonts.py`** (o el dirigido) y **hacer commit** de los woff2. `build.py` ya excluye `*.otf` y `*.ttf` de `dist/` (`ignore_patterns`), así que no se puede volver a servir el OTF roto por error.
2. **Corregir el comentario de `tools/fonts.py`.** Hoy dice que la causa son «subrutinas que el saneador de fuentes de Chrome rechaza», y no es así. Propuesta: «Chromium no pinta los acentos compuestos con el seac implícito de CFF (endchar con argumentos) cuando el glifo o su base llevan anchura explícita. Se descomponen como contornos».
3. **Añadir una prueba de regresión.** `scratchpad/fontfix/test_acentos.js` comprueba con Playwright que `áéíóúÁÉÍÓÚñÑüÜ¿¡«»€·–—…` tienen tinta en Butler 300/400/500, Sofia Sans Condensed y Open Sans. Se puede copiar a `tests/` y lanzar tras `build.py`.
4. **Añadir U+202F a las fuentes.** Es el espacio fino no separable que el copy usa en «66 %», y **ninguna** de las tres fuentes lo tiene, así que se pinta con la fuente del sistema. En `tools/fonts.py`, basta con mapearlo a un glifo de espacio existente con `cmap[0x202F] = 'space'` o con el espacio fino si existe.
5. **Sustituir los símbolos que caen a la fuente del sistema** (↻, ▶, ❚, → en Butler y Open Sans, ≤ en Sofia y Open Sans) por SVG en línea. Cada sistema operativo los dibuja de una forma.

---

## 3. Rendimiento

### 3.1 Cifras (instantánea de las 16:22 UTC)

| Escenario | Perf. | FCP | LCP | TBT | CLS | Peso | Peticiones |
|---|---|---|---|---|---|---|---|
| Móvil, sin compresión (`:8851`) | 79 | 2,0 s | 5,1 s | 50 ms | 0 | 928 KiB | 28 |
| Escritorio, sin compresión | 98 | 0,5 s | 1,1 s | 10 ms | 0 | 1.367 KiB | 28 |
| **Móvil, gzip (`:8863`), mediana de 3** | **91** | 1,4-1,7 s | **3,4-3,5 s** | 0 | 0 | 649 KiB | 28 |
| Móvil, gzip, EN | 93 | 1,4 s | 3,2 s | 0 | 0 | 648 KiB | 28 |
| **Escritorio, gzip** | **100** | 0,4 s | 0,7 s | 0 | 0 | 1.087 KiB | 28 |
| Playwright, CPU ×4 (LCP observado) | — | 1,18 s | 1,18 s | — | 0 | — | — |

Reparto en móvil con gzip (`gz-mobile-1.json`):

| Tipo | Peso | Ficheros |
|---|---|---|
| Fuentes | 183 KB | 4 |
| Imágenes | 182 KB | 16 |
| Vídeo | 210 KB | 1 (hero-v.webm, cargado después de `load`) |
| JS | 31 KB | 4 |
| CSS | 11 KB | 1 |
| HTML | 14 KB | 1 |

- **Elemento LCP:** `p.hero-sub`, texto en Open Sans. Las fases son TTFB 455 ms, sin retraso de carga y **render delay de unos 3.000 ms** (simulado).
- **Lo que ya está bien:**
  - el vídeo de fondo no se descarga hasta `load` + `requestIdleCallback` y solo si la portada está a la vista;
  - respeta `prefers-reduced-motion`, `Save-Data` y 2G;
  - elige vertical u horizontal y WebM VP9 o MP4;
  - los MP4 tienen *faststart* (`moov` antes de `mdat`) y no llevan pista de audio;
  - el póster tiene `preload` con `media`, ancho y alto, así que CLS = 0;
  - no hay terceros.

### 3.2 Problemas y arreglos (por impacto)

| # | Problema medido | Arreglo | Ahorro estimado |
|---|---|---|---|
| R1 | **Producción en Apache sin compresión ni caché de CSS, JS, SVG o imágenes.** El `.htaccess` generado solo pone `Expires` a woff2, mp4 y webm. Sin compresión: perf. móvil 79 y LCP 5,1 s. | Añadir `mod_deflate` y `mod_expires` (bloque abajo). Comprobar que Nominalia los tiene activos. | ~120 KB de texto. Perf. móvil de 79 a ~91 |
| R2 | **Vercel sirve los estáticos con revalidación** (`max-age=0, must-revalidate` por defecto [no verificado]). `vercel.json` solo fija `X-Robots-Tag` y `nosniff`. | Cabeceras `Cache-Control` en `/assets/(.*)`, `/css/(.*)` y `/js/(.*)`. Lo ideal: nombres con hash, o `?v=<hash>` desde `build.py`, e `immutable`. | Visitas repetidas casi instantáneas |
| R3 | **Fuentes en la ruta crítica.** Se precargan Butler Light (24 KB) y Sofia (60 KB), pero **la fuente del LCP (Open Sans latin, 76 KB) no**: se descubre a los ~380 ms, después de leer el CSS. | Precargar `OpenSans-latin.woff2` y no Sofia, que es de kickers y botones. Recortar el eje de peso de Open Sans al rango usado (400-600) con `fontTools.varLib.instancer`. | ~25-30 KB y unos cientos de ms de LCP en 4G |
| R4 | **Logos pesados para lo que muestran.** `logo-ccep.png` 59 KB (620×360), `logo-wizink.png` 29 KB, `logo-deloitte.png` 1614×656 con **un 60 % de margen vacío** (contenido 216-1398 × 219-440), `logo-ing.svg` 30 KB, `logo-lg.svg` 17 KB. Los de la franja se piden con prioridad alta o media. | Pasar a SVG optimizado o a WebP/AVIF a 2× del tamaño mostrado (unos 280×60). Recortar el de Deloitte. `loading="lazy"` y `decoding="async"` en los que quedan fuera de la primera pantalla. | ~120 KB (Lighthouse: 101-124 KiB por tamaño, 56-68 KiB por formato) |
| R5 | **SVG decorativos enormes.** `s-lines.svg` pesa 38,8 KB para un icono de 9-12 px en la píldora «AI». `favicon.svg`, otros 38,8 KB. Son polilíneas con un punto cada 0,3 px. | Simplificar las rutas (Douglas-Peucker o ajuste a curvas Bézier en `tools/s_geom.py`). Objetivo: menos de 2 KB cada uno. La píldora puede ir en SVG en línea. | ~70 KB (unos 28 KB con gzip) |
| R6 | **`s-geom.js` (59 KB; 21 KB con gzip)** se carga en todas las visitas, pero solo sirve a la pieza SPIRAL, a media página. | Misma simplificación que R5, y cargarlo bajo demanda cuando `#como` esté cerca (IntersectionObserver e inyección del `<script>`). | ~20 KB de la carga inicial |
| R7 | **El CSS (43 KB; 11 KB con gzip) bloquea el render.** Lighthouse estima 540-690 ms en móvil. | Minificar en `build.py`. Opcional: CSS crítico de barra y portada en línea (6-8 KB) y el resto con `media="print" onload`. | 3 KB por minificar; hasta unos 300 ms de LCP con el crítico en línea |
| R8 | **Pósters en JPEG** (hero-h 54 KB, hero-v 27 KB, firma-h 67 KB). | AVIF o WebP con `<source type>` en el `<picture>`. | ~40 % |
| R9 | **Vídeo de fondo en escritorio:** WebM VP9 de 636 KB y MP4 de 1,09 MB, 12 s a 24 fps. Correcto. | Opcional: una versión AV1 (unos −30 %) en `<source type='video/mp4; codecs="av01..."'>` antes de VP9 y H.264. Bajar a 20 fps si el movimiento es lento. | 150-300 KB solo en escritorio |
| R10 | JS sin minificar (Lighthouse: ~4 KB). | Minificar con `esbuild --minify` en `build.py`, si se acepta una dependencia. | Menor |

Bloque para el `.htaccess` (producción en Nominalia):

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/avif "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

Bloque para `vercel.json` (prototipo):

```json
{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }] },
{ "source": "/(css|js)/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }] }
```

Si `build.py` añade huellas a los nombres de fichero, se puede usar `max-age=31536000, immutable`.

---

## 4. Bugs funcionales que se ven

| # | Bug | Cómo se ha comprobado | Arreglo |
|---|---|---|---|
| B1 | **Logos de clientes deformados en «Casos».** ING sale a 140×26 (su proporción real es 4,0 y se muestra a 5,4); Deloitte, a 140×22 (2,46 → 6,36), y CCEP, a 140×30 (1,72 → 4,67). Es `object-fit: fill` en un hijo de un *flex* en columna que se estira hasta `max-width:140px`. En una web boutique, un logo de cliente deformado resta credibilidad. | Lighthouse `image-aspect-ratio` y Playwright (`getBoundingClientRect` y `naturalWidth`). Captura: `scratchpad/lh/shot-casos.png` | `.pc-logo{align-self:flex-start;width:auto;height:26px;max-width:140px;object-fit:contain;object-position:left center}`, y recortar el PNG de Deloitte (o pasarlo a SVG) |
| B2 | **La animación de la portada al hacer scroll (`hero-out`: zoom de 1,06 y oscurecido) no se ejecuta nunca.** `.hero{overflow:hidden}` crea un contenedor de scroll, así que `animation-timeline: view()` se ancla a un elemento que no se mueve y el progreso se queda en 0. | `getAnimations()` da progreso 0 a 600 px de scroll. Con `overflow:clip`, el progreso pasa a 0,72 y la escala a 1,043 (`rm2.js` y `rm3.js`) | `overflow:clip` en `.hero` (y en `.hero-media`). Ver también A6: hay que desactivarla con «reducir movimiento» |
| B3 | **A 360 px, la pestaña «Tecnología» se sale 7 px de la lista.** Queda recortada por el `overflow-x:hidden` del body. | `overflow.js` | `.tablist{overflow-x:auto;scrollbar-width:none}` o reducir `gap` y `padding` por debajo de 380 px |
| B4 | **En el prototipo, la imagen al compartir apunta a `https://spiralia.es/ia/assets/og-es.jpg`.** `deploy.sh` genera sin `--prod` y `SITE` es fijo. Si `/ia/` aún no existe en spiralia.es, la vista previa en LinkedIn, WhatsApp o Teams sale sin imagen y el `canonical` apunta a una URL inexistente. [Riesgo no verificado: no se ha podido consultar spiralia.es] | Lectura de `build.py` y del HTML generado | Que `build.py` acepte `--site=https://spiralia-ia.vercel.app/` y que `deploy.sh` lo pase |
| B5 | **La página `reserva/` no mide nada y deja el origen `?d=` sin registrar.** Hoy redirige a `mailto:` con `location.replace`. En un escritorio sin cliente de correo, la persona se queda en una página casi vacía. | Lectura de `RESERVA` en `build.py` | Medir en `reserva/` antes de redirigir (sección 8) y mostrar en esa página el email con un botón de copiar |

---

## 5. Accesibilidad (WCAG 2.2 AA)

### 5.1 Lo que está bien (comprobado)

- **Contrastes de la paleta**, calculados con la fórmula WCAG:

  | Combinación | Contraste |
  |---|---|
  | `--on-dark-2` #A9B1B8 sobre `--night` #051A2B | **8,13:1** |
  | `--on-dark-2` sobre `--navy` | 7,14:1 |
  | `--on-dark-2` sobre `--navy-2` | 6,15:1 |
  | `--on-dark-2` sobre `--navy-3` | 4,70:1 (pasa AA en texto normal) |
  | `--ink-2` sobre `--paper` | 6,68:1 |
  | `--ink-2` sobre `--paper-2` | 6,10:1 |
  | Botón principal | 11,6:1 |
  | `.tag` (opacidad 0,85) sobre `--night` | 6,17:1 |
  | Logos (opacidad 0,66) sobre `--night` | 8,14:1 |

- **Texto sobre el vídeo de la portada**, medido sobre el fondo real: se oculta el texto, se fotografía en t = 0,5, 3, 6, 9 y 11,5 s y se toma el percentil 95 de luminancia del fondo en la caja de cada texto (`herocontrast.js`). El mínimo es **7,64:1** (la segunda línea del H1 en escritorio) y el subtítulo nunca baja de 12,97:1. El velo funciona.
- **Foco:** contorno de 2 px (blanco en las secciones oscuras) y orden de tabulación lógico. El enlace para saltar al contenido es el primero (`kb.js`).
- **Pestañas «Para ti»:** patrón ARIA completo (roles, `aria-selected`, `tabindex` itinerante, flechas e Inicio/Fin, paneles con `hidden`). Sin JS se ven todos los paneles.
- **«Reducir movimiento»:** desactiva el vídeo, la cinta de logos, las cifras animadas y el desplazamiento suave.
- **Resto:** existe `prefers-reduced-transparency`; el diálogo de la película es un `<dialog>` nativo con controles y `aria-label`; los idiomas están marcados con `lang`; hay un solo H1 y una jerarquía de encabezados coherente; no hay imágenes sin `alt`.

### 5.2 Lo que falla

| # | Criterio | Problema | Arreglo |
|---|---|---|---|
| A1 | 2.2.2 Pausar, detener, ocultar | **El vídeo del cierre (`firma`) no tiene botón de pausa.** Se mueve en bucle más de 5 s junto a otro contenido. | El mismo patrón que la portada: `fondo(cierre, $('.cierre-pause'))` |
| A2 | 2.2.2 | **La cinta de logos se mueve siempre y solo se para con el ratón encima.** En teclado y en táctil no hay forma de pararla. | Pararla también con `:focus-within`, añadir un botón de pausa, o detenerla tras 2 vueltas |
| A3 | 4.1.2 Nombre, función, valor (axe `aria-allowed-role`) | `<img role="listitem">` no es un rol válido para `<img>`. Afecta a 12 logos. | `<ul class="logos"><li><img …></li></ul>` |
| A4 | 2.5.3 Etiqueta en el nombre | El enlace de idioma muestra «EN» pero su `aria-label` es «Read in English», así que una persona que usa el control por voz y dice «EN» no lo activa. | `aria-label="EN · Read in English"`, o quitar el `aria-label` y añadir texto oculto visualmente |
| A5 | 4.1.2 / 1.3.1 | Los botones SPIRAL se anuncian como «SFormarSkill», «PEmparejarPair»…, porque `<b>`, `<span>` y `<small>` son en línea y no llevan espacio. | Separar con espacios en el HTML o con `aria-label="S · Formar (Skill)"` |
| A6 | 2.3.3 Animación por interacción (AAA) y buena práctica | Si se corrige B2, el zoom de la portada al hacer scroll **también funcionaría con «reducir movimiento»**: la regla `animation-duration:.01ms` no afecta a las animaciones ligadas al scroll. Comprobado en `rm3.js`: progreso 0,72 con `reducedMotion: 'reduce'`. | `@media (prefers-reduced-motion:reduce){.hero-media{animation:none}}` |
| A7 | 4.1.3 Mensajes de estado | `.demo-stage` lleva `aria-live="polite"` y la demo reescribe y anima su contenido. El lector de pantalla puede leer escenas completas a destiempo. | Quitar `aria-live` y anunciar solo un resumen («Antes: 9 pasos y 4 apps; después: 2 pasos») en un nodo `sr-only` al terminar |
| A8 | 1.2.1 Solo vídeo (pregrabado) | La película de 20 s solo tiene `aria-label` como alternativa. | Una transcripción breve, en un `<details>` dentro del diálogo, con las frases que aparecen en pantalla |
| A9 | Aviso de axe (`color-contrast`) | `.foot-mark` («Spiralia» enorme, contraste 1,23:1). Está oculto con `aria-hidden` y es la marca, así que está exento («text that is part of a logo»). | Opcional, para dejar limpio el informe: pasarlo a un SVG decorativo |
| A10 | Patrón ARIA | El botón de pausa de la portada cambia a la vez `aria-pressed` y `aria-label`. | Elegir uno: o etiqueta fija con `aria-pressed`, o solo cambiar la etiqueta |
| A11 | Semántica | Las opciones del diagnóstico son botones con `aria-pressed` y avanzan solas a los 220 ms. | `role="radiogroup"` y `role="radio"`, o mantener los botones pero sin avance automático cuando el foco viene del teclado |

**Objetivo:** con A1-A5 resueltos, Lighthouse debería llegar a 100 en accesibilidad. A9 es un aviso que se puede dejar como está.

---

## 6. SEO

### 6.1 Estado (instantánea)

| Elemento | ES | EN | Valoración |
|---|---|---|---|
| `<title>` | «Spiralia AI · Formación y despliegue de IA para empresas» (56) | «Spiralia AI · AI training and deployment for companies» (54) | Bien |
| `meta description` | **186 caracteres** | 172 | Larga. Google suele cortar hacia los 155-160 [no verificado]. Recortar a ≤155 y adelantar la prueba |
| `canonical` | `https://spiralia.es/ia/` | `…/ia/en/` | Bien en producción. En el prototipo, ver B4 |
| `hreflang` | es, en y x-default, recíprocos | — | Bien |
| `robots` | `noindex,nofollow` (prototipo) | — | Correcto. Lighthouse SEO da 66 solo por esto. `build.py --prod` lo cambia |
| OG y Twitter | título, descripción, imagen 1200×630, `alt` y `summary_large_image` | — | Bien. Falta `og:locale` y `og:locale:alternate` |
| JSON-LD | Organization, Service y FAQPage (10 preguntas) | igual en EN | Bien hecho. Se puede enriquecer (6.2) |
| H1 | «Toda tu empresa, trabajando con IA.» | — | Sin palabra clave de categoría. Está bien para la marca; la categoría la llevan el `title` y la `description` |
| `sitemap.xml` | 2 URL | — | Sin `xhtml:link` para hreflang ni `lastmod` |
| `robots.txt` | **No existe** | — | En producción irá en la raíz de spiralia.es (WordPress), no en `/ia/` |

### 6.2 Recomendaciones

1. **Despliegue en `spiralia.es/ia/`**, como ya prevé el LEEME:
   - redirección 301 de `/training/` a `/ia/`;
   - enlace desde el menú de WordPress;
   - añadir `Sitemap: https://spiralia.es/ia/sitemap.xml` al `robots.txt` raíz y comprobar que no bloquea `/ia/`;
   - dar de alta la propiedad en Search Console y enviar el sitemap.
2. **JSON-LD más rico.** Va en la función `jsonld()` de `build.py`; todo sale de `content.toml` y no se inventa nada:
   - `Organization`:
     - `logo` como PNG cuadrado de al menos 112 px (además del SVG [no verificado]);
     - `description`;
     - `knowsAbout` (`["adopción de IA", "Microsoft 365 Copilot", "formación en IA para empresas"]`);
     - `areaServed: {"@type":"Country","name":"España"}`;
     - `contactPoint` con una dirección de rol;
     - `sameAs` con LinkedIn y la web principal.
   - `Service`:
     - `audience: {"@type":"BusinessAudience","audienceType":"Dirección general, Personas y Tecnología"}`;
     - `hasOfferCatalog` con «Rumbo» (3 horas con el comité) y los otros formatos de `fmt.*`, como `Offer` sin precio;
     - `areaServed` como `Country`.
   - Valorar `ItemList` con los tres casos, cuyas cifras ya están en `cifras.toml`.
   - **FAQPage:** desde 2023, Google solo muestra resultados enriquecidos de FAQ a webs gubernamentales y sanitarias [no verificado en esta sesión]. Spiralia no tendrá el desplegable en Google, pero el marcado sigue sirviendo a buscadores con IA para extraer las respuestas. Se mantiene.
3. **Sitemap con alternativas:** `<xhtml:link rel="alternate" hreflang="…">` en cada `<url>` y `lastmod` con la fecha del build.
4. **`og:locale`:** `es_ES` y `en_GB` con sus alternativas.
5. **Arquitectura.** Una sola URL compite por todo. A medio plazo [opinión]:
   - una página por caso (`/ia/casos/ing/`, `/ia/casos/deloitte/`, `/ia/casos/ccep/`) con el contexto, la medición y la fuente;
   - una página del método (`/ia/metodo-spiral/`);
   - alguna pieza de opinión firmada por **Spiralia** (no por una persona, en línea con la queja del cliente).

   Así se captan búsquedas largas («formación copilot empresa», «adopción IA banca») y hay URLs citables.

---

## 7. GEO: que los buscadores con IA citen bien a Spiralia

- **`llms.txt`.** Hoy no existe. La convención (llmstxt.org) lo pone en la raíz del dominio; lo adoptan algunos agentes, pero no hay compromiso público de Google ni de OpenAI de leerlo [no verificado]. Cuesta poco: generarlo desde `build.py` con los textos de `content.toml` y `cifras.toml`, en `dist/llms.txt` y, en producción, en `spiralia.es/llms.txt` o enlazado desde ahí. Esqueleto:

  ```markdown
  # Spiralia AI
  > Spiralia forma a cada persona de la empresa con su propio trabajo y construye con sus equipos hasta que la IA da resultados. Más de 50.000 personas formadas.

  ## Datos clave
  - Clientes: ING España, Deloitte España, Coca-Cola Europacific Partners Iberia…
  - ING España: usuarios activos semanales del 66 % al 92 %; satisfacción 4,7/5 frente a 3,2 (medición interna del grupo ING, uso externo autorizado)
  - Deloitte España: 13.000 personas en un mes; 3.000 managers y directores
  - CCEP Iberia: 218 casos de uso identificados por los equipos
  - Método: SPIRAL (Skill, Pair, Identify, Rebuild, Assure, Launch). Primer paso: Rumbo, 3 horas con el comité de dirección
  - Equipo: consultoría estratégica (McKinsey, KPMG, EY-Parthenon) e ingeniería (Forward Deployed Engineers); profesores del Grado en IA de la UFV

  ## Páginas
  - [Spiralia AI (ES)](https://spiralia.es/ia/)
  - [Spiralia AI (EN)](https://spiralia.es/ia/en/)
  - [Preguntas frecuentes](https://spiralia.es/ia/#preguntas)
  ```

- **Contenido citable dentro de la página:**
  - **Definición en la primera pantalla de texto:** una frase de tipo «Spiralia AI es…», que los modelos extraen literalmente.
  - **Bloque «Datos clave»** con cifra, fecha y fuente, generado desde `cifras.toml`, que ya incluye las fuentes.
  - **Fechas visibles:** «Actualizado: octubre de 2026» en el pie.
  - **Nombre de entidad coherente:** «Spiralia» como organización y «Spiralia AI» como área, siempre igual. Hoy coincide en `title`, `og:site_name` y JSON-LD.
  - **Preguntas frecuentes:** el texto ya está en el HTML (`<details>`), así que se rastrea bien. El diagnóstico se pinta con JS y no se indexa; es aceptable.
- **Rastreadores de IA:** es una decisión de negocio. En el `robots.txt` raíz, decidir si se permiten GPTBot, ClaudeBot, PerplexityBot y Google-Extended (este último gobierna el entrenamiento de Gemini, no la aparición en AI Overviews [no verificado]). Para que citen a Spiralia hay que dejarlos pasar.

---

## 8. Medición (sin cookies, compatible con el RGPD)

### 8.1 Estado

- **Hoy no hay analítica publicada.** El otro agente ya ha preparado la integración:
  - `build.py` tiene `ANALYTICS = ''` y `ANALYTICS_SRC = 'https://plausible.io/js/script.js'`, más el *stub* `window.plausible`;
  - `engine.js` define `SP.ev()` y escucha los clics en `reserva/`, `mailto:` e idioma.

  Eventos ya instrumentados:

  | Evento | Propiedades |
  |---|---|
  | `Reserva` | `origen` = d |
  | `Email` | `origen` = id de la sección o «copiar» |
  | `Idioma` | — |
  | `Diagnóstico` | `paso` = inicio o resultado, más el nivel |
  | `Película` | — |
  | `Perfil` | `pestaña` |

- **Restricción de copy:** el pie dice «Esta página no usa cookies». Eso **descarta GA4**, que en España necesita cookies y banner de consentimiento, y cualquier píxel publicitario (LinkedIn Insight Tag, Meta).
- **Matiz legal [opinión, a revisar con quien lleve la parte jurídica].** La página usa `localStorage` (`sp-fondo-pausado`) para recordar la pausa del vídeo. El art. 22.2 de la LSSI cubre cualquier almacenamiento en el dispositivo, no solo las cookies, pero este caso está exento porque es una función que la persona pide expresamente. Se puede mantener la frase. Conviene que la política de privacidad lo mencione, junto con el proveedor de analítica.

### 8.2 Herramienta

| Opción | Cookies | Dónde funciona | Eventos con propiedades | Notas |
|---|---|---|---|---|
| **Plausible Cloud** (recomendada) | No | Vercel **y** Nominalia (es un script) | Sí. Embudos en los planes altos [no verificado] | Servidores en la UE [no verificado]. Ya está a medias en el código. De pago, desde unos 9 €/mes [no verificado] |
| Umami (alojado por Spiralia, o Umami Cloud) | No | Ambos | Sí | Código abierto. Alojarlo exige servidor y base de datos. Umami Cloud tiene plan gratuito [no verificado] |
| Vercel Web Analytics | No (hash diario [no verificado]) | **Solo** en lo desplegado en Vercel | Eventos propios en el plan Pro [no verificado] | No sirve para producción en Nominalia |
| Matomo en modo sin cookies | No (si se configura) | Ambos | Sí | Más pesado de mantener |
| GA4 | Sí | — | — | Descartado: contradice «no usa cookies» y exige consentimiento |

**Recomendación:** Plausible, con el dominio `spiralia.es`, y la propiedad `seccion=ia` o el filtro por ruta `/ia/`. Si el WordPress ya usa otra herramienta, decidir si se unifica.

### 8.3 Plan de eventos

Convención: nombres sin tildes y en `snake_case`, porque los objetivos de Plausible se dan de alta a mano y un nombre con tilde se escribe mal con facilidad [opinión].

| Evento | Propiedades | Para qué sirve | Estado |
|---|---|---|---|
| `cta_reserva` | `origen` (portada, barra, menu, fija, rumbo, resultados, tecnologia, cierre) | La conversión principal y qué bloque convierte | Ya existe como `Reserva`. **Además, dispararlo en `reserva/index.html`** antes de redirigir, con *callback* o un `setTimeout` de unos 300 ms, porque un evento justo antes de navegar se puede perder |
| `email_clic` / `email_copiar` | `origen` | Conversión secundaria (asistentes y quien no quiere agenda) | Ya existe |
| `perfil` | `pestana`, `via` (pestaña o portada) | **Qué ICP visita**: CEO, Personas o Tecnología | Existe, pero **no distingue** la elección en la portada de la pestaña, y con flechas se dispara una vez por pestaña recorrida. Añadir `via` y registrarlo solo con clic o Intro |
| `diag_inicio`, `diag_paso`, `diag_resultado`, `diag_enviar`, `diag_imprimir` | `n` (1-8), `nivel` | Embudo del diagnóstico: dónde lo dejan y qué nivel declaran | Hoy solo inicio y resultado. Añadir el paso, que permite ver el abandono |
| `faq_abierta` | `q` (q1-q10) | Qué objeciones pesan, para reordenar las preguntas o llevarlas al copy | Falta: escuchar `toggle` en `<details>` |
| `pelicula_abre` / `pelicula_fin` | `seg` visto | Si la película engancha | Falta `fin` (evento `ended` y tiempo al cerrar) |
| `seccion_vista` | `id` (reto, pruebas, como, para-ti, formatos, quienes, diagnostico, preguntas, hablemos) | Hasta dónde llegan en una página de 16.000-21.000 px (17 pantallas en escritorio, 26 en móvil) | Falta: un IntersectionObserver que dispare una vez por sección |
| `idioma` | `a` | Peso del tráfico internacional | Ya existe |
| `salida` | `destino` (linkedin, areas-spiralia) | Fugas hacia otras áreas | Falta. Plausible tiene una variante del script para enlaces salientes [no verificado] |

Más:

- **UTMs** en todo lo que se reparta: posts y mensajes de LinkedIn, firmas de email, propuestas en PDF.
- **Web Vitals reales:** el script de Plausible no los recoge. Opción ligera: la librería `web-vitals` enviando `lcp` y `inp` como eventos en una muestra del 10 % de las visitas.

### 8.4 KPIs y embudo

Visitas únicas → % que llega a «Casos» → % que elige perfil → `cta_reserva` (por origen) → citas confirmadas en Bookings → reuniones celebradas → propuestas.

- **El hueco:** Microsoft Bookings no avisa a la web de que la cita se ha confirmado [no verificado]. Opciones:
  1. cuadrar cada semana los clics `cta_reserva` con las citas de Bookings;
  2. cambiar a una agenda que redirija a una URL de gracias tras reservar (por ejemplo, Cal.com o la agenda de HubSpot [no verificado]) y medir allí la conversión real.
- **Referencia de conversión:** la que ya está en `investigacion/01_benchmark_y_cta.md`, l. 1884 (First Page Sage, dato de proveedor y de web completa): educación superior 2,8 %, servicios de TI 1,5 %. Para una landing de alto ticket conviene fijar el objetivo con la primera muestra de 4-6 semanas y no con referencias externas [opinión].
- **Herramientas que identifican la empresa por la IP** (Leadinfo, Albacross y similares): suelen funcionar sin cookies, pero tratan direcciones IP, que son datos personales. Necesitan base legal y aviso, así que es una decisión que pasa por la parte jurídica [opinión].

---

## 9. Seguridad y cabeceras (P2)

`vercel.json` solo pone `X-Robots-Tag` y `nosniff`. Propuesta:

- **`Content-Security-Policy`:**
  - `default-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'sha256-…' https://plausible.io; connect-src 'self' https://plausible.io; frame-ancestors 'none'; base-uri 'self'`;
  - el `sha256` corresponde al `<script>` en línea que añade la clase `js`;
  - los bloques JSON (`application/ld+json` y `#page-data`) no se ejecutan y la CSP no los bloquea;
  - el `style-src 'unsafe-inline'` hace falta por los `style="--p:…"` del diagnóstico.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- HSTS: Vercel lo gestiona en sus dominios [no verificado]. En Nominalia, comprobar que existe `Strict-Transport-Security`.

---

## 10. Plan de acción

| Prioridad | Acción | Dónde | Esfuerzo |
|---|---|---|---|
| **P0** | Commit de los woff2 de Butler ya corregidos, comentario corregido en `tools/fonts.py` y prueba de regresión `test_acentos.js` en `tests/` | `tools/fonts.py`, `assets/fonts/`, `tests/` | 30 min |
| **P0** | Logos de casos sin deformar (B1) y PNG de Deloitte recortado | `site.css`, `assets/img/` | 30 min |
| **P0** | Activar Plausible (`ANALYTICS`), completar los eventos de la tabla 8.3 y medir también en `reserva/` | `build.py`, `engine.js`, `motion.js`, `diagnostico.js` | 2-3 h |
| **P0** | Email de rol en `MAIL` y página de Bookings de equipo (alinea la parte técnica con «hablar de Spiralia, no de Ana») | `build.py` | 15 min, más la decisión de Jose |
| **P0** (al pasar a producción) | Compresión y caché en `.htaccess` (R1); 301 de `/training/`; `robots.txt` y sitemap en la raíz; Search Console | `build.py`, Nominalia, WordPress | 1 h |
| **P1** | Pausa en el vídeo del cierre y en la cinta de logos (A1, A2); `ul`/`li` en los logos (A3); nombre accesible del enlace de idioma (A4); botones SPIRAL (A5); quitar `aria-live` de la demo (A7) | plantilla, `motion.js`, `site.css` | 2 h |
| **P1** | `overflow:clip` en la portada (B2) y `animation:none` con «reducir movimiento» (A6) | `site.css` | 10 min |
| **P1** | Precargar Open Sans y no Sofia; recortar el eje de Open Sans a 400-600; U+202F en las fuentes | plantilla, `tools/fonts.py` | 1 h |
| **P1** | Simplificar `s-lines.svg`, `favicon.svg` y `s-geom.js` (R5, R6); logos en SVG o WebP (R4); pósters AVIF/WebP (R8) | `tools/s_geom.py`, `assets/` | 3-4 h |
| **P1** | `--site` para el prototipo, para que la imagen al compartir funcione en Vercel (B4) | `build.py`, `deploy.sh` | 20 min |
| **P1** | Cabeceras de caché en `vercel.json` (R2) y nombres con huella | `build.py` | 1 h |
| **P1** | `description` de ES de 155 caracteres como máximo; JSON-LD enriquecido; `og:locale`; sitemap con hreflang | `content.toml`, `build.py` | 1-2 h |
| **P1** | `llms.txt` generado y bloque «Datos clave» con fuentes | `build.py`, plantilla | 1-2 h |
| **P2** | CSP y otras cabeceras de seguridad | `vercel.json`, `.htaccess` | 1 h |
| **P2** | Lista de pestañas a 360 px (B3); SVG para ↻ ▶ ❚ →; transcripción de la película (A8) | CSS, plantilla | 1 h |
| **P2** | Minificar CSS y JS; CSS crítico en línea (R7, R10); vídeo AV1 (R9) | `build.py`, `motion/` | 2-3 h |
| **P2** | Páginas por caso y página del método (SEO de búsquedas largas y URLs citables) | arquitectura | Proyecto aparte |

---

## 11. Fuentes

**Evidencia generada en esta auditoría (reproducible).**

- **Bug de la tipografía:**
  - `scratchpad/fontfix/ (material de trabajo, no incluido en el repo)`: `cff_inspect.py`, `seac_scan.py`, `make_variants.py`, `otf2ttf.py`, `fix_butler_seac.py`, `render.js`, `test_acentos.js`;
  - capturas: `test-all.png`, `antes-despues.png`, `control-*.png`, `system-font-chromium.png`;
  - variantes de la fuente: `v1-*` a `v8-*` y `propuesto/`.
- **Rendimiento y accesibilidad:**
  - `scratchpad/lh/ (material de trabajo, no incluido en el repo)`: informes de Lighthouse `lh-es-*.report.html`, `gz-*.json`, `gz-en-mobile.report.html` y `gz-desktop.report.html`;
  - scripts: `perf.js`, `herocontrast.js`, `rm2.js`, `rm3.js`, `kb.js`, `overflow.js`;
  - captura: `shot-casos.png`.
- **Instantánea auditada:** `scratchpad/snap/ (material de trabajo, no incluido en el repo)`.

**Referencias externas.** No se han podido abrir en esta sesión: no hay WebFetch y el cupo de WebSearch estaba agotado. Las afirmaciones que dependen de ellas llevan [no verificado].

- Adobe, *The Type 2 Charstring Format* (TN #5177), apéndice sobre el seac implícito en `endchar`: <https://adobe-type-tools.github.io/font-tech-notes/pdfs/5177.Type2.pdf>
- Fontations (Skrifa / read-fonts), el motor de fuentes en Rust de Google: <https://github.com/googlefonts/fontations>
- Documentación de fontTools (subset, `T2CharStringPen`, cu2qu): <https://fonttools.readthedocs.io/>
- WCAG 2.2, Pause, Stop, Hide: <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- WCAG 2.2, Label in Name: <https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html>
- WCAG 2.2, Contrast (Minimum): <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- WCAG 2.2, Target Size (Minimum): <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- ARIA APG, patrón de pestañas: <https://www.w3.org/WAI/ARIA/apg/patterns/tabs/>
- Chrome, animaciones ligadas al scroll: <https://developer.chrome.com/docs/css-ui/scroll-driven-animations>
- MDN, `overflow: clip`: <https://developer.mozilla.org/en-US/docs/Web/CSS/overflow>
- web.dev, optimizar el LCP: <https://web.dev/articles/optimize-lcp>
- Google Search Central, cambios en los resultados enriquecidos de FAQ y HowTo (ago-2023): <https://developers.google.com/search/blog/2023/08/howto-faq-changes>
- Google Search Central, datos estructurados de Organization: <https://developers.google.com/search/docs/appearance/structured-data/organization>
- Google Search Central, versiones localizadas (hreflang): <https://developers.google.com/search/docs/specialty/international/localized-versions>
- La convención llms.txt: <https://llmstxt.org/>
- Plausible, eventos personalizados: <https://plausible.io/docs/custom-event-goals>
- Plausible, política de datos: <https://plausible.io/data-policy>
- Vercel Web Analytics: <https://vercel.com/docs/analytics>
- Umami: <https://umami.is/docs>
- AEPD, Guía sobre el uso de las cookies: <https://www.aepd.es/guias/guia-cookies.pdf>
- Referencia de conversión B2B ya recogida en el repo: `investigacion/01_benchmark_y_cta.md`, l. 1884 (First Page Sage, 18-sep-2025).
