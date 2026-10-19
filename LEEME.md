# Spiralia AI · la sección de IA de spiralia.es

Es una página larga, en español con versión en inglés, para la alta dirección: negocio (CEO y dirección general), Personas y talento (RR. HH. y Formación) y Tecnología (CTO y CIO). Es un prototipo del 14-oct-2026, rediseñado el 19-oct-2026 tras una auditoría completa (`investigacion/04_auditoria_2026-10.md`). La investigación está en `investigacion/`.

## Cómo verla

- En local: `python3 build.py` y después `python3 -m http.server 8851 -d dist`. Se abre en http://localhost:8851 (español) y en http://localhost:8851/en/ (inglés).
- Con `?still=1` en la URL se ve todo en su estado final, sin animaciones. Es útil para revisar textos.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Textos (ES y EN en cada clave) | `src/content.toml` |
| Cifras permitidas y su fuente | `src/cifras.toml`. De aquí sale `FUENTES.md`. |
| Estructura de la página | `src/index.template.html` |
| Estilos (paleta «Monocromo Spiralia») | `src/css/site.css` |
| Piezas animadas | `src/js/motion.js`: curva, espiral SPIRAL, antes y después, caso, vídeos de fondo, barra, menú móvil, película en diálogo, logos y pestañas. Capa de movimiento: `src/js/scroll.js`. WebGL: `src/js/gl.js` |
| Diagnóstico | `src/js/diagnostico.js`. Sus preguntas y niveles están en `[data.diag]` de `content.toml`. |
| URL de Microsoft Bookings | `BOOKINGS` en `build.py`, o directamente en `dist/reserva/index.html` sin volver a generar |
| Geometría de la S (medida sobre el logo oficial) | `tools/s_geom.py`. Genera `s-lines.svg`, `favicon.svg` y `s-geom.js`. |
| Email de contacto de toda la página | `MAIL` en `build.py`. En el copy se escribe `{mail}`. |
| Fuentes web (woff2) | `tools/fonts.py` (ver «Fuentes»). |

## Comprobaciones del build

`python3 build.py` falla en estos casos:

- una clave usada en la plantilla no existe;
- quedan `{{…}}` sin resolver;
- aparece en el texto una cifra que no está en `cifras.toml`;
- las cifras de ES y EN no coinciden.

Con `--prod` falla además si:

- falta algún texto en inglés;
- quedan `[PLACEHOLDER]`;
- no está la URL de Bookings.

Test del diagnóstico: `node tests/test_diagnostico.js`.

Además:

- el bloque de testimonios (`<!--si:testimonios-->` en la plantilla) no se publica mientras queden `[PLACEHOLDER]`;
- la página lleva datos estructurados JSON-LD (organización, servicio y preguntas del comité), generados desde el copy.

## Capa de movimiento y WebGL («state of the art»)

Todo es mejora progresiva: sin JS, sin WebGL2, con «reducir movimiento» o con `?still=1`, la página se ve completa y estática.

- **`src/js/gl.js`:** motor WebGL2 propio, sin librerías (unos 11 KB con gzip). Tiene dos escenas:
  - `planta` (portada): la organización vista desde arriba, con ondas de luz que salen de tres focos y una luz que sigue al cursor;
  - `espiral` (método): unas 4.000 partículas que forman la S de Spiralia con el scroll y una luz que recorre los seis pasos.
  - API: `SPGL.create(canvas, {scene, density, still})` → `setProgress`, `setStep`, `setPointer`, `start`, `stop`, `destroy`.
  - Sin GPU (`failIfMajorPerformanceCaveat`) devuelve `null`: la portada usa entonces el vídeo y el método, el SVG.
  - Laboratorio: sirve la raíz del repo (`python3 -m http.server 8863`) y abre `http://localhost:8863/motion/gl-lab/`.
- **`src/js/scroll.js`:**
  - Scroll suave con Lenis (solo con ratón o trackpad).
  - Titulares que suben por líneas y frases que se encienden palabra a palabra (SplitText).
  - La curva del reto, que se dibuja con el scroll, y el método fijo mientras el scroll avanza sus pasos (ScrollTrigger).
  - Botones magnéticos, teselas que se inclinan, luz que sigue al cursor (`.spot`) y progreso de lectura.
- **Librerías** en `src/js/vendor/`, servidas desde la propia web (sin CDN ni cookies): GSAP 3.14.2 con ScrollTrigger y SplitText (licencia estándar de GSAP, gratuita también para uso comercial) y Lenis 1.3.27 (MIT).
- **Iconos 3D de marca:** `assets/img/3d/` (WebP de 512 y 192 px, más PNG). Se generan con three.js solo en tiempo de generación: `node tools/icons3d/render.mjs` (ver `tools/icons3d/README.md`).

## Portada: vídeo de respaldo (HyperFrames)

- **Qué es:** el respaldo de la escena WebGL cuando no hay GPU o falla. «La organización se enciende»: una planta vista desde arriba con unos 1.800 puntos (personas, puestos) agrupados en equipos; desde tres focos salen ondas de luz y filamentos con la curva de la S que van encendiendo a los vecinos. Bucle perfecto de 12 s a 24 fps, sin texto ni sonido, así que vale para ES y EN.
- **Formatos:** `assets/video/hero-h` (1920×1080, escritorio) y `hero-v` (720×1280, móvil), en WebM (VP9) y MP4 (H.264), con su póster (primer fotograma). El JS elige vertical u horizontal al cargar y WebM si el navegador lo admite.
- **Comportamiento:** el póster es lo primero que se ve (precargado); el vídeo entra con un fundido. Botón de pausa (la elección se recuerda). Con «reducir movimiento», Save-Data o 2G no se descarga. La película de 20 s (4:5) se abre a demanda en un diálogo con controles («Ver la película · 20 s»).
- **Cierre:** el mismo sistema con la S de Spiralia y pulsos de luz que recorren sus seis hebras (`assets/video/firma-*`). La página abre con la organización y cierra con la firma.
- **Archivos:** `motion/hero-org/` (portada, en canvas) y `motion/firma-bg/` (cierre, en SVG). Coreografía en función de t, sin azar.
- **Comandos:** `bash motion/render_hero_bg.sh snap` (capturas) y `bash motion/render_hero_bg.sh render` (vídeos y pósteres). `PIEZAS=hero` o `PIEZAS=firma` para una sola; `FORMATS=h` o `v` para un formato. Si HyperFrames no tiene su Chrome, sirve el `headless_shell` de Playwright: `HYPERFRAMES_BROWSER_PATH=/ruta/headless_shell`.
- **Sustituir por metraje real:** basta con dejar en `assets/video/` archivos con los mismos nombres (`hero-h.webm/.mp4/.jpg` y `hero-v.*`). El plan de rodaje está en la auditoría.
- **Imágenes para compartir:** `bash motion/render_og.sh` regenera `assets/og-es.jpg` y `assets/og-en.jpg` con el titular de la portada sobre su póster.

## Fuentes

Butler en OTF no pinta en Chromium algunos acentos (en el peso 400, «á», «ú» y «Á»: se veía «M s de 50.000» y «¿Cu nto cuesta?»). `tools/fonts.py` redibuja todos los glifos como contornos planos y genera `woff2` (de 44 a 24 KB por peso). También pasa Sofia Sans Condensed a `woff2` (de 343 a 110 KB). El build solo publica los `woff2`; los OTF/TTF originales se quedan en el repo como fuente.

## Película de 20 s (HyperFrames)

- **Qué es:** 20 s en formato 4:5 (1080×1350), sin sonido, en ES y EN. Desde el 19-oct se abre a demanda en un diálogo desde la portada («Ver la película · 20 s»).
- **Ritmo y estilo:** el de la portada de Santander. 120 BPM, frases que suben desde una máscara, la cifra que rueda al 80 % y cae al 6 %, «El curso acaba el viernes. ¿Y el lunes?», y la S de Spiralia dibujándose en un segundo.
- **Cartel final:** la S, la palabra SPIRALIA y las pruebas (50.000 · ING del 66 % al 92 % · Deloitte, 13.000). No repite el titular de la web.
- **Archivos:** `motion/film/`. Los textos están en `copy.js` y la coreografía, en función de t, en `film.js`.
- **Comandos:** `bash motion/render_film.sh snap` saca las capturas del guion (las de la versión actual están en `motion/guion-pelicula/`) y `bash motion/render_film.sh render` deja en `assets/video/` `film-es.mp4`, `film-en.mp4` y sus carteles. Tarda unos 25 s por idioma.
- **Formato:** el 4:5 es también el que mejor funciona en el feed de LinkedIn, así que podéis publicarla tal cual.
- **Requisitos:** Node, FFmpeg y `hyperframes@0.8.81` con su Chrome en caché.
- **Descartado:** el bucle anterior de la S, que se desenrollaba, está en `motion/_descartado/bucle-s/`. No se publica.

## Publicar

- **Prototipo:** publicado el 14-oct-2026 en https://spiralia-ia.vercel.app (proyecto `spiralia-ia`, cuenta garzer09). Para volver a publicar: `bash deploy.sh`, que genera `dist/`, lo copia a `_deploy/`, comprueba el noindex y despliega. Lleva `noindex` (meta y cabecera `X-Robots-Tag`). Ojo: no indexar no es lo mismo que privado.
- **Producción recomendada:** la carpeta estática `spiralia.es/ia/` en el hosting de Nominalia, junto al WordPress. Así hereda la autoridad del dominio y no hay que tocar DNS.
  1. `python3 build.py --prod`.
  2. Subir el contenido de `dist/` a `/ia/`. Incluye `.htaccess`.
  3. En WordPress, cambiar el enlace del menú «Training» a `/ia/` y poner una redirección 301 de `/training/` a `/ia/`.
- **Imágenes para compartir:** `assets/og-es.jpg` y `assets/og-en.jpg`, de 1200×630. Se generan con `bash motion/render_og.sh`.

## Pendiente antes de producción

- La página de **Microsoft Bookings** y su URL (más adelante, decisión de Jose). Mejor una página de equipo con varios anfitriones que la agenda de una persona. Mientras no exista, los botones abren un email.
- El **email de contacto** sigue siendo `ana.iza@spiralia.es` (decisión del 19-oct). Para pasar a un buzón de equipo basta con cambiar `MAIL` en `build.py`; también se usa en el aviso legal, donde lo ideal es el buzón de privacidad de la política de spiralia.es.
- La urgencia del cierre menciona **el presupuesto de 2027**: cambiarla o retirarla en el primer trimestre de 2027 (`[cta].urg` y `2027` en `cifras.toml`).
- **Metraje real** para la portada (opcional): ver el plan de rodaje en la auditoría.
- Los **testimonios**: hay tres huecos `[PLACEHOLDER]`.
- **Revisar el inglés.** Lo ha traducido Claude.
- Comprobar que la **política de privacidad** de spiralia.es cubre Microsoft Bookings.
- **Butler**: su licencia (v1.1, Fabian De Smet) permite usarla e incrustarla. Solo prohíbe venderla o lucrarse con la fuente en sí. Ya es la tipografía del logotipo. Los `woff2` regenerados son una conversión de formato de la misma fuente.

## Decisiones tomadas (14-oct-2026)

- **Paleta:** la A, «Monocromo Spiralia». La B y el selector se han eliminado.
- **Mensaje:**
  - H1: «La inteligencia se compra. La ventaja se despliega.»
  - Primer paso con nombre: **Rumbo**, 3 horas con el comité.
  - SPIRAL como método público.
  - Sin precio, sin calculadora de ROI y sin FUNDAE.
- **Pruebas:**
  - logos de todos los clientes menos KPMG y Santander;
  - 50.000 alumnos;
  - ING del 66 % al 92 % y 4,7 frente a 3,2;
  - Deloitte, 13.000 y 3.000;
  - CCEP, 218 casos identificados.
- **Equipo:** Ana (biografía combinada) y Jose (profesor del Grado en IA de la UFV). *Sustituido el 19-oct: ver abajo.*
- **El CTA no va sobre una persona:** «Hablemos de tu caso». En el cierre, el equipo: «Hablas con quien lo va a hacer», con Ana y Jose. La reserva sigue yendo a la agenda de Ana. *Sustituido el 19-oct: ver abajo.*

## Decisiones tomadas (19-oct-2026, rediseño tras la auditoría)

- **Más Spiralia, menos personas:** sin fotos ni biografías individuales y sin nombres de personas ni de firmas de origen. «Por qué Spiralia» presenta al equipo como colectivo (estrategia, formación e ingeniería). El cierre es «Hablas con el equipo que lo va a hacer».
- **Portada:** vídeo de fondo a pantalla completa generado con HyperFrames («La organización se enciende»), hasta que haya metraje real. H1: «Toda tu empresa, trabajando con IA.» El anterior («La inteligencia se compra. La ventaja se despliega.») era elegante, pero no se podía visualizar y «desplegar» es jerga para el ICP.
- **Perfiles, de forma sutil:** «Para ti» se organiza por inquietud, no por cargo: Resultados (dirección general y negocio) · Personas y talento (RR. HH. y Formación) · Tecnología (CTO y CIO, nueva).
- **Orden:** portada → franja de prueba → por qué ahora → casos → método → personalización → lo que construimos → para ti → formatos → por qué Spiralia → diagnóstico → preguntas → cierre.
- **Nivel «state of the art» (petición del 19-oct):** portada y método en WebGL, narrativa guiada por el scroll, cristal y bento, e iconos 3D. Todo sobre la paleta monocroma y con alternativa estática.
- **Reserva:** mientras no haya Bookings, `/reserva/` es una página con la marca que ofrece el email, con el origen y el idioma.
- **Copy:** «tú» en toda la página; urgencia real (licencias pagadas, uso que se enfría, la brecha del 6 %, el presupuesto de 2027) y sin escasez inventada; objeciones duras en las preguntas del comité.

