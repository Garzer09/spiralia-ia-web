# Piezas animadas de la página (HyperFrames)

Reglas comunes de `motion/modelo/`, `motion/multiplica/`, `motion/lunes/` y `motion/agentes/`. La película de apertura (`motion/film/`) es la referencia de estilo y de código.

## Estructura de cada pieza

```
motion/<pieza>/
  index.html   lienzo, estilos (16:9 por defecto y .v para 4:5) y arranque del timeline
  copy.js      window.COPY = { es: {...}, en: {...} }: todo el texto, nada en el JS
  <pieza>.js   window.PIEZA = { montar(raiz), pintar(t), duracion }: cabecera con la línea de tiempo
  tomas.txt    segundos de las capturas de revisión, separados por comas
```

- `index.html` empieza con `<html lang="es">`, `<meta name="viewport" content="width=1920, height=1080" />` y un `<div id="pieza" class="lienzo" data-composition-id="<pieza>" data-start="0" data-duration="D" data-width="1920" data-height="1080" data-fps="30">`. Carga `gsap.min.js`, `s-geom.js` (si dibuja la S), `copy.js` y `<pieza>.js` por ruta relativa: `render_piezas.sh` copia las fuentes, GSAP, la S y la marca desde `motion/film/`.
- El arranque es el de la película: un timeline de GSAP en pausa de duración D cuyo `onUpdate` llama a `pintar(tl.time())`, registrado en `window.__timelines["<pieza>"]`.
- `render_piezas.sh` cambia `lang` y, en vertical, pone `class="v"` en `<html>` y el tamaño a 1080×1350. Las reglas `.v …` del CSS recolocan todo para 4:5.

## Reglas

- **Determinista.** `pintar(t)` es una función pura de t: nada de `Math.random`, `Date`, `setTimeout` ni transiciones CSS. Si hace falta azar, un generador con semilla fija.
- **Paleta Monocromo Spiralia, sin otros tonos.** Noche `#051A2B`, navy `#08263D`, marino `#0D3150`, azul hondo `#174467`, greige `#E0DFDA`, papel `#F5F4F0`, gris suave `#A9B1B8` y blanco `#FFFFFF` solo para lo que se enciende. Para un riesgo, el blanco con poca opacidad y un borde discontinuo, no rojo.
- **Tipografía.** Butler Light (300) para titulares y cifras, Butler Regular (400) para nombres. Sofia Sans Condensed para rótulos: 600, mayúsculas, interletrado 0,2 em. Tamaño mínimo: 26 px en 16:9 y 30 px en 4:5.
- **Gramática de movimiento.** Líneas que suben desde una máscara (0,55 s, `1 − (1 − x)³`), apariciones de 0,5 s con 14 px de recorrido, trazos SVG que se dibujan, cortes a 120 BPM (múltiplos de 0,5 s). Un único foco de atención cada vez.
- **Tiempo de lectura.** Al menos 0,3 s por palabra más 1 s antes de que un texto cambie.
- **El último fotograma es el resumen.** Es el póster de la página (con «reducir movimiento» no se ve otra cosa), así que se aguanta al menos 2 s y se entiende solo.
- **Ilustrativo.** Si hay un esquema o datos inventados, lleva en una esquina el rótulo «Esquema ilustrativo» o «Ejemplo ilustrativo» (o su versión inglesa). Sin cifras inventadas.

## Revisión (antes de dar una pieza por buena)

`PIEZAS=<pieza> bash motion/render_piezas.sh snap` saca las capturas de ES y EN en 16:9 y 4:5. Se miran todas y se comprueba que no hay textos cortados, solapes, líneas viudas en los titulares ni elementos fuera del lienzo; que el inglés cabe, y que cada escena se entiende sin sonido. Como mínimo, dos vueltas.

`bash motion/render_piezas.sh render` deja en `assets/video/` `<pieza>-<lang>-<h|v>.mp4`, `.webm` y `.jpg`.
