# Iconos 3D de Spiralia

Ocho iconos de marca en 3D: estrategia, formacion, ingenieria, resultados, personas, tecnologia, rumbo y espiral. Son una familia: cerámica mate navy y greige, vidrio esmerilado, una luz cálida en cada pieza (la organización que se enciende), la misma vista 3/4 y la misma escala. Se pintan sin conexión con three.js en Chromium. three.js solo se usa al generar; la web publica imágenes.

## Salida

En `assets/img/3d/`:

- `<nombre>.webp`: 512 × 512, con alfa (yuva420p) y 40 KB como máximo.
- `<nombre>.png`: 256 × 256, de respaldo.

El fondo es transparente. Están pensados para ir sobre noche (`#051A2B`) y sobre papel (`#F5F4F0`).

## Regenerar

```
node tools/icons3d/render.mjs
```

Tarda unos 40 s en total. Necesita Node, FFmpeg con libwebp y Playwright con Chromium. Usa el Playwright del proyecto si lo hay y, si no, el global de `/opt/node22`.

Opciones:

- Un solo icono: `node tools/icons3d/render.mjs rumbo`.
- `--hoja ruta.png`: hoja de contacto con los ocho sobre noche y sobre papel, montada con los WebP publicados. `--solo-hoja` la monta sin volver a pintar.
- `--maestros dir`: guarda también el PNG de 768 px de cada icono.
- `--ss 2`: supermuestreo. Es el valor por defecto: el lienzo se pinta a 1536 px y se reduce.

Para mirar un icono a mano, sirve la raíz del repo (por ejemplo `python3 -m http.server`) y abre `/tools/icons3d/?icon=tecnologia&fondo=oscuro`. También vale `&fondo=claro`.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Cámara, luces, entorno de estudio, sombras, encuadre y salida | `estudio.js` |
| Materiales (`ceramica`, `vidrio`, `luz`, `puntoDeLuz`) | `estudio.js` |
| Forma de cada icono | `iconos.js`, una función por icono |
| Formatos, peso máximo y hoja de contacto | `render.mjs` |
| Geometría de la S | `src/js/s-geom.js`. La lee `espiral`. |

## Notas técnicas

- **Vidrio:** transmisión física de three.js (`MeshPhysicalMaterial.transmission`). Como el lienzo es transparente, una cúpula que solo se pinta en el pase de transmisión le da al vidrio una luz interior difusa con alfa parcial. Además, el sombreador del vidrio escribe su color premultiplicado y oscurece los bordes en navy. Así se lee sobre los dos fondos y el PNG conserva los brillos.
- **Sombras:** de contacto, con la profundidad vista desde el suelo y difuminada, en dos capas (ceñida y amplia), teñidas de noche.
- **Peso:** el alfa del WebP va sin pérdida y es lo que más pesa en las piezas con muchos contornos. Si un icono pasa de 40 KB, `render.mjs` recorre una escalera de pares (calidad, escalones de alfa) que prima el color: baja a 84 y, antes de bajar más, reduce el alfa a 96 o 64 escalones (hoy solo le pasa a `espiral`, que queda en q 84 con 96). Antes de codificar extiende el color de los bordes bajo los píxeles transparentes, para que el submuestreo de croma no deje un filo oscuro.
- **Vendor:** `vendor/` lleva three.js r180 (`three.module.min.js`, `three.core.min.js` y `RoundedBoxGeometry.js`) con su licencia MIT. No se publica.
