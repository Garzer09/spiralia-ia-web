# Spiralia AI · la sección de IA de spiralia.es

Es una página larga, en español con versión en inglés, para tres perfiles: CEO, dirección de Personas y responsable de Formación. Es un prototipo del 14-oct-2026. El plan aprobado está en `~/.claude/plans/tidy-conjuring-pixel.md` y la investigación en `investigacion/`.

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
| Piezas animadas | `src/js/motion.js`: curva, espiral SPIRAL, antes y después, caso, vídeo, pestañas |
| Diagnóstico | `src/js/diagnostico.js`. Sus preguntas y niveles están en `[data.diag]` de `content.toml`. |
| URL de Microsoft Bookings | `BOOKINGS` en `build.py`, o directamente en `dist/reserva/index.html` sin volver a generar |
| Geometría de la S (medida sobre el logo oficial) | `tools/s_geom.py`. Genera `s-lines.svg`, `favicon.svg` y `s-geom.js`. |

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

## Película de apertura (HyperFrames)

- **Qué es:** 20 s en formato 4:5 (1080×1350), sin sonido, en ES y EN. Va enmarcada a la derecha del titular y, en el móvil, debajo.
- **Ritmo y estilo:** el de la portada de Santander. 120 BPM, frases que suben desde una máscara, la cifra que rueda al 80 % y cae al 6 %, «El curso acaba el viernes. ¿Y el lunes?», y la S de Spiralia dibujándose en un segundo.
- **Cartel final:** la S, la palabra SPIRALIA y las pruebas (50.000 · ING del 66 % al 92 % · Deloitte, 13.000). No repite el titular de la web.
- **Cómo se ve en la página:** se reproduce una vez cuando la portada está a la vista y se queda en el cartel, con botón de pausa y «Ver de nuevo». Con «reducir movimiento» o en conexiones lentas solo se ve el cartel.
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
- **Imágenes para compartir:** `assets/og-es.jpg` y `assets/og-en.jpg`, de 1200×630. Se generan desde `motion/og/`.

## Pendiente antes de producción

- La página de **Microsoft Bookings** y su URL (más adelante, decisión de Jose). Mientras no exista, los botones abren un email.
- Los **testimonios**: hay tres huecos `[PLACEHOLDER]`.
- **Revisar el inglés.** Lo ha traducido Claude.
- Comprobar que la **política de privacidad** de spiralia.es cubre Microsoft Bookings.
- **Butler**: su licencia (v1.1, Fabian De Smet) permite usarla e incrustarla. Solo prohíbe venderla o lucrarse con la fuente en sí. Ya es la tipografía del logotipo.
- **Fuentes en `woff2`:** hoy se sirven en OTF/TTF. Para pasarlas a `woff2` y reducir su peso hace falta instalar `fonttools`.

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
- **Equipo:** Ana (biografía combinada) y Jose (profesor del Grado en IA de la UFV).
- **El CTA no va sobre una persona:** «Hablemos de tu caso». En el cierre, el equipo: «Hablas con quien lo va a hacer», con Ana y Jose. La reserva sigue yendo a la agenda de Ana.
