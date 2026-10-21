# Spiralia AI · la sección de IA de spiralia.es

Es una página larga, en español con versión en inglés, para la alta dirección: negocio (CEO y dirección general), Personas y talento (RR. HH. y Formación) y Tecnología (CTO y CIO). Es un prototipo del 14-oct-2026, rediseñado el 19-oct-2026 tras una auditoría completa (`investigacion/04_auditoria_2026-10.md`) y otra vez el 21-oct-2026 con los cuatro productos (`investigacion/05_productos_y_relato.md`). La investigación está en `investigacion/`.

## Cómo verla

- En local: `python3 build.py` y después `python3 -m http.server 8851 -d dist`. Se abre en http://localhost:8851 (español) y en http://localhost:8851/en/ (inglés).
- Con `?still=1` en la URL se ve todo en su estado final, sin animaciones. Es útil para revisar textos.
- Con `?gl=1` se admite el WebGL por software (SwiftShader, llvmpipe) y no actúa el vigilante de rendimiento: sirve para probar las escenas en un navegador sin GPU. Con `?gl=0` no hay WebGL y se ven el vídeo y el SVG.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Textos (ES y EN en cada clave) | `src/content.toml` |
| Cifras permitidas y su fuente | `src/cifras.toml`. De aquí sale `FUENTES.md`. |
| Estructura de la página | `src/index.template.html` |
| Estilos (paleta «Monocromo Spiralia») | `src/css/site.css` |
| Productos, orden de la página y guion de cada pieza | `investigacion/05_productos_y_relato.md` |
| Piezas animadas | `src/js/motion.js`: lo que pagas frente a lo que se usa, voces del comité, escalera de la IA, nube de riesgos, fases de Día Uno, preparación de Hábito, espiral SPIRAL de puntos, ciclo de Pulso, antes y después por perfil, vídeos de las piezas y de fondo, barra, menú móvil, logos y pestañas (la película de apertura va en línea en la plantilla). Capa de movimiento: `src/js/scroll.js`. WebGL (solo la portada): `src/js/gl.js` |
| Vídeos de las piezas (HyperFrames) | `motion/modelo/`, `motion/multiplica/`, `motion/lunes/` y `motion/agentes/`. Reglas comunes en `motion/PIEZAS.md` |
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
- las cifras de ES y EN no coinciden;
- el HTML enlaza un recurso de `assets/` que no llega a `dist/`.

Las cifras escritas en letras («ocho», «una década», «tres de cada cuatro», «veinticinco») que no están en `cifras.toml` dan un aviso, no un error. Las fracciones y los multiplicativos («dos tercios», «la cuarta parte», «el triple», «veinte veces», «multiplica por tres», «three times», «thirtyfold», «a third larger», «costs halved») avisan siempre, aunque la cifra esté dada de alta.

El build no publica los retratos (`ana-iza.*`, `jose-garza.*`) ni los PNG de `assets/img/3d/`. Añade `?v=<huella del fichero>` a las URL de CSS, JS y vídeos, así que al volver a publicar nadie recibe una versión antigua de la caché; el HTML se sirve con `no-cache`.

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

- **`src/js/gl.js`:** motor WebGL2 propio, sin librerías (unos 11 KB con gzip). La página usa la escena `planta` (portada): la organización vista desde arriba, con ondas de luz que salen de tres focos y una luz que sigue al cursor. La escena `espiral` sigue en el motor, pero desde el 21-oct el método se pinta con la S de puntos (abajo).
- **La S de puntos (Spiral):** unos 1.500 puntos muestreados sobre las seis hebras de la S (`motion.js`, pieza `spiral`) en un `<canvas>`, con las seis letras y la hebra encendida en SVG encima. Los puntos llegan desde una nube mientras la sección entra en pantalla (`setProgress`, que mueve el scroll) y, fijada, el scroll avanza las fases. Sin GSAP, la S se forma con un reloj de 2,2 s al entrar.
  - API: `SPGL.create(canvas, {scene, density, still, software, vigia, lento})` → `setProgress`, `setStep`, `setPointer`, `start`, `stop`, `destroy`.
  - Sin GPU devuelve `null`: la portada usa entonces el vídeo y el método, el SVG. Rechaza también el WebGL por software (renderer SwiftShader, llvmpipe o similar), salvo con `software: true` (`?gl=1`).
  - Vigilante: si durante 1,5 s pintar cuesta de media más de 8 ms o el bucle no llega a 12 fps, la escena se destruye y vuelven el vídeo y el SVG (`lento`).
  - Laboratorio: sirve la raíz del repo (`python3 -m http.server 8863`) y abre `http://localhost:8863/motion/gl-lab/`.
- **`src/js/scroll.js`:**
  - Scroll suave con Lenis (solo con ratón o trackpad).
  - Titulares que suben por líneas y frases que se encienden palabra a palabra (SplitText).
  - La curva del reto, que se dibuja con el scroll, y el método fijo mientras el scroll avanza sus pasos (ScrollTrigger).
  - Botones magnéticos, teselas que se inclinan, luz que sigue al cursor (`.spot`) y progreso de lectura.
  - Con la capa activa, `html` va con `scroll-behavior: auto`: con `smooth`, ScrollTrigger calcula mal las posiciones si recalcula con la página desplazada. En táctil, las anclas siguen siendo suaves solo mientras dura el salto.
  - Al girar la tableta, cambiar el tamaño de la ventana o imprimir, ScrollTrigger rehace las escenas. Antes se guarda la sección que se está leyendo y después se vuelve a ella. Al imprimir se mide antes de que el método abra sus seis pasos (`sp:imprime`, que lanza `engine.js`), y al acabar el método vuelve al paso que tenía. Al recargar (o volver atrás sin bfcache), el navegador restaura el scroll antes de que exista el espacio del método fijado: la sección y la fracción se guardan al salir (`sessionStorage`) y se recuperan con las escenas montadas.
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

## Película de 22 s (HyperFrames)

- **Qué es:** 22 s sin sonido, en ES y EN, en dos formatos: 16:9 (1920×1080) para pantallas apaisadas y 4:5 (1080×1350) para el resto.
- **Apertura (decisión del 20-oct):** la película abre la web a pantalla completa y, al terminar, la web entra con un fundido; ya no hay botón «Ver la película». Se puede saltar con «Saltar», Esc, Intro, la rueda o deslizando. Sale en cada visita (decisión del 20-oct), salvo con un ancla en la URL, con `?still=1`, con «reducir movimiento», con Save-Data o en 2G. `?apertura=1` la fuerza y `?apertura=0` la quita (para revisar la web sin esperar). Si no arranca en 3,5 s o el navegador bloquea la reproducción, se salta sola. Mientras se ve, la web está oculta y quieta (sin scroll, sin WebGL ni vídeo de portada), y la entrada del titular espera al fundido. El código va en línea en la plantilla, justo al abrir `<body>`, para que no se vea la web antes; el estilo, en `.apertura-capa` (site.css). El fondo de la capa cambia con cada escena para que las bandas no se noten.
- **Ritmo y estilo:** el de la portada de Santander. 120 BPM y frases que suben desde una máscara. Guion del 21-oct: abre con el dolor del CEO («Hay empresas que ya responden / deciden / venden antes. Con la misma IA que tú.»), sigue con el 80 % y, con un corte, el 6 % (3,6 s cada uno, con una rejilla de 100 personas y otra de 100 empresas), «La diferencia no es la IA. Es cómo se despliega.», lo que hacemos y la S de Spiralia dibujándose. «El curso acaba el viernes» sale de la película: tiene su propia sección.
- **Cartel final:** solo la S, la palabra SPIRALIA y el lema «Formación y despliegue de IA». Sin cifras ni pruebas (decisión del 21-oct).
- **Archivos:** `motion/film/`. Los textos están en `copy.js` y la coreografía, en función de t, en `film.js`. Los tiempos de cada escena están también en la plantilla (`ESC`, para que el fondo de la capa siga a la película): si cambian en `film.js`, hay que cambiarlos allí.
- **Comandos:** `bash motion/render_film.sh snap` saca las capturas del guion (las de la versión actual están en `motion/guion-pelicula/`) y `bash motion/render_film.sh render` deja en `assets/video/` `film-es`, `film-en` (4:5) y `film-es-h`, `film-en-h` (16:9) en MP4 (H.264) y WebM (VP9); `FORMATS=h` o `FORMATS=v` limita el formato. El encaje horizontal está en `motion/film/index.html` (reglas `.h`). La web usa el WebM si el navegador lo admite y, si falla, el MP4.
- **Formato:** el 4:5 es también el que mejor funciona en el feed de LinkedIn, así que podéis publicarla tal cual.
- **Requisitos:** Node, FFmpeg y `hyperframes@0.8.81` con su Chrome en caché.
- **Descartado:** el bucle anterior de la S, que se desenrollaba, está en `motion/_descartado/bucle-s/`. No se publica.

## Piezas HyperFrames de la página (21-oct)

- **Qué son:** cuatro vídeos mudos que explican lo que el texto solo diría: `modelo` (el mismo modelo, tres empresas, tres resultados; sección «La ventaja»), `multiplica` (la IA multiplica y la distancia también; «Lo que cuesta esperar»), `lunes` (el curso acaba el viernes y la escalera de la IA; «Después de la formación») y `agentes` (la misma propuesta, con un agente; Spiral).
- **Formatos:** ES y EN, en 16:9 (escritorio) y 4:5 (hasta 700 px de ancho), en WebM y MP4, con su póster: `assets/video/<pieza>-<lang>-<h|v>.*`. El póster es el último fotograma, que resume la pieza.
- **En la página:** se reproducen una vez al verse casi enteros y se quedan en el último fotograma; pausa y «Ver de nuevo». Con «reducir movimiento», `?still=1`, Save-Data o 2G no se descargan solos: queda el póster y un botón «Ver el vídeo». El texto de cada vídeo está en su `figcaption` (para lectores de pantalla y buscadores).
- **Comandos:** `bash motion/render_piezas.sh snap` (capturas de revisión) y `bash motion/render_piezas.sh render`. `PIEZAS=modelo` para una sola; `LANGS` y `FORMATS` como en la película.
- **Reglas comunes y proceso de revisión:** `motion/PIEZAS.md`.

## Publicar

- **Prototipo:** publicado el 14-oct-2026 en https://spiralia-ia.vercel.app (proyecto `spiralia-ia`, cuenta garzer09). Para volver a publicar: `bash deploy.sh`, que genera `dist/`, lo copia a `_deploy/`, comprueba el noindex y despliega. Lleva `noindex` (meta y cabecera `X-Robots-Tag`). Ojo: no indexar no es lo mismo que privado.
- **Producción recomendada:** la carpeta estática `spiralia.es/ia/` en el hosting de Nominalia, junto al WordPress. Así hereda la autoridad del dominio y no hay que tocar DNS.
  1. `python3 build.py --prod`.
  2. Subir el contenido de `dist/` a `/ia/`. Incluye `.htaccess`.
  3. En WordPress, cambiar el enlace del menú «Training» a `/ia/` y poner una redirección 301 de `/training/` a `/ia/`.
- **Imágenes para compartir:** `assets/og-es.jpg` y `assets/og-en.jpg`, de 1200×630, con el titular de la portada. Se generan con `bash motion/render_og.sh`.

## Pendiente antes de producción

- La página de **Microsoft Bookings** y su URL (más adelante, decisión de Jose). Mejor una página de equipo con varios anfitriones que la agenda de una persona. Mientras no exista, los botones abren un email.
- El **email de contacto** sigue siendo `ana.iza@spiralia.es` (decisión del 19-oct). Para pasar a un buzón de equipo basta con cambiar `MAIL` en `build.py`.
- La urgencia del cierre menciona **el presupuesto de 2027**: cambiarla o retirarla en el primer trimestre de 2027 (`[cta].urg` y `2027` en `cifras.toml`).
- **Metraje real** para la portada (opcional): ver el plan de rodaje en la auditoría.
- Los **testimonios**: hay tres huecos `[PLACEHOLDER]`.
- **Revisar el inglés.** Lo ha traducido Claude.
- Comprobar que la **política de privacidad** de spiralia.es cubre Microsoft Bookings.
- **Aviso de privacidad** (`[cta].legal`, también en `/reserva/`): sigue el criterio de spiralia.es (decisión del 20-oct). Remite a su política de privacidad, que reúne los datos del responsable y cómo ejercer los derechos. La razón social y el NIF no se repiten en esta página.
- **Confirmado por Jose (20-oct):** todas las empresas cuyos logos y cifras aparecen han autorizado su uso; la base del 92 % de ING (empleados con licencia que la usan cada semana); las 50.000 personas formadas; que lo que se construye es del cliente (pregunta a6), y las promesas «hasta que funciona».
- **Butler**: su licencia (v1.1, Fabian De Smet) permite usarla e incrustarla. Solo prohíbe venderla o lucrarse con la fuente en sí. Ya es la tipografía del logotipo. Los `woff2` regenerados son una conversión de formato de la misma fuente.

## Decisiones tomadas (14-oct-2026)

- **Paleta:** la A, «Monocromo Spiralia». La B y el selector se han eliminado.
- **Mensaje:**
  - H1: «La inteligencia se compra. La ventaja se despliega.»
  - Primer paso con nombre: **Rumbo**, 3 horas con el comité. *Sustituido el 20-oct por Día Uno: ver abajo.*
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

## Decisiones tomadas (21-oct-2026, productos y relato)

Respuesta a los 13 cambios de Jose del 21-oct. El detalle está en `investigacion/05_productos_y_relato.md`.

- **Productos:** cuatro, siempre iguales, con nombre, para quién, duración, fases y lo que te llevas: **Día Uno** (el piloto, con el comité y los managers), **Hábito** (formación a medida, producto A), **Spiral** (despliegue con tu equipo, producto B, con el método SPIRAL) y **Pulso** (acompañamiento mensual). Se ordenan sobre la escalera de la IA de CCEP: pedir, enseñar, automatizar y delegar. En inglés: Day One, Habit, Spiral y Pulse.
- **Portada:** «Que el ritmo de tu sector lo marque tu empresa.» Sin la mención a ING. Fuera el logo de EY.
- **Orden:** portada → franja de prueba → lo que hacemos (los cuatro productos, pronto) → por qué ahora → la ventaja → lo que cuesta esperar → diagnóstico → después de la formación → Día Uno, Hábito, Spiral y Pulso → casos → para ti → por qué Spiralia → preguntas → cierre.
- **Por qué ahora:** «Las licencias llegaron. El plan, todavía no.», con lo que nadie dice en el comité y el gráfico de lo que se paga frente a lo que se usa, que ya no va ligado al scroll: se dibuja solo, con su propio reloj.
- **La ventaja:** «La IA ya está en todas las empresas. Pero en pocas cuentas de resultados.» y el vídeo del mismo modelo.
- **Lo que cuesta esperar:** el vídeo del multiplicador y una nube de 20 riesgos que se ordena en cuatro columnas, una por producto.
- **Diagnóstico:** sube en la página y termina con una estimación del valor en juego (personas × horas × coste × 46 semanas) y de lo que se escapa según el nivel. Cambia la decisión del 14-oct («sin calculadora de ROI»): los supuestos son del usuario, editables, y el reparto por nivel va marcado como criterio de Spiralia.
- **Hábito:** primero cómo preparamos la formación (los seis pasos de la diapositiva 14 de Santander) y después los ejemplos por perfil.
- **Spiral:** cada fase con su nombre en inglés (Skill, Pair, Identify, Rebuild, Assure, Launch) y lo que es en español; la S se forma con puntos y letras. Los agentes, con un vídeo nuevo que deja clara la diferencia: hoy la persona hace seis pasos en cuatro aplicaciones; con un agente, decide una vez.
- **Película:** abre con el dolor, las cifras duran 3,6 s y el cartel final es solo la marca.
- **Diseño:** textura de grano en las secciones oscuras y trama de puntos en las claras, nombres de producto en grande, más piezas visuales y menos bloques de texto. El post de @0xwhrrari («Motion Engineering») es un artículo sobre cómo montar un estudio de motion con IA: dirección, referencias, línea de tiempo, render y bucle de revisión. Las piezas nuevas se han hecho así (`motion/PIEZAS.md`).
- **Icono de Pulso:** el giróscopo que fue de Rumbo (`assets/img/3d/rumbo*`), que vuelve a publicarse.

## Decisiones tomadas (20-oct-2026)

- **Día Uno sustituye a Rumbo como primer paso** (en inglés, *Day One*):
  - **Formato:** una jornada de trabajo real en la empresa del cliente, con la IA que ya tiene. Los equipos que elija hacen su propio trabajo en tres rondas (velocidad, escala y capacidad) y por la tarde escriben y priorizan sus casos. El comité abre el día, usando la IA con una tarea suya, y lo cierra: ve a su gente y elige con ella los primeros casos. Después, un resumen por escrito con los casos priorizados y una propuesta de siguiente paso.
  - **Promesa:** cada persona sale con una tarea suya hecha con IA, y el comité, con los casos de sus equipos priorizados y por escrito. Lo que sale del día es del cliente, siga o no con Spiralia.
- **Formatos (`#formatos`):** «Primero, un día de trabajo real. Después, decides tú.» Entre la cabecera y las tarjetas va la franja «Velocidad. Escala. Capacidad.», con un ejemplo por ronda y su remate (Jose eligió la versión con ejemplos). Día Uno ocupa todo el ancho; debajo, «Después, a tu ritmo», el programa por perfil y la construcción con tu equipo.
- **En el resto de la página** también se habla de Día Uno: «Para ti» (Resultados, y Personas y talento), las preguntas 4 y 7, la llamada del método, `/reserva/` y el diagnóstico (nivel Acceso). El botón de la tarjeta enlaza a `/reserva/?d=dia-uno`; la llamada del método (`d=metodo`) y Resultados (`d=resultados`) llevan al mismo texto. `/reserva/` sigue aceptando `d=rumbo` para los enlaces ya enviados. En el diagnóstico, el nivel Acceso recomienda Día Uno y su botón de reserva lleva a ese mismo texto (`d=diagnostico-dia-uno`). Si a la primera pregunta se responde «Nadie, o cada uno usa la suya», la primera línea cambia por la de `sin_ia` (elegir antes la IA corporativa; copy pendiente de que lo vea Jose). `build.py` une «Día Uno» y «Day One» con un espacio de no separación para que el nombre no se parta entre líneas (salvo en los asuntos de correo). Icono: `assets/img/3d/diauno.webp` y `diauno-192.webp`, un amanecer (medio sol sobre el horizonte, cinco rayos); el de Rumbo sigue en `tools/icons3d`, pero `build.py` ya no lo publica (`ICONOS_RETIRADOS`).

