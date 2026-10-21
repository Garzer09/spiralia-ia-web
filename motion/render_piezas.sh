#!/bin/bash
# Piezas animadas de la página (HyperFrames), en ES y EN, en dos formatos · capturas o render final.
#   bash motion/render_piezas.sh snap     capturas en $SCR/<pieza>-<lang>-<formato>/snapshots/
#   bash motion/render_piezas.sh render   assets/video/<pieza>-<lang>-<formato>.mp4, .webm y .jpg (póster: el último fotograma)
# Piezas (PIEZAS="modelo multiplica lunes agentes" por defecto), cada una en motion/<pieza>/:
#   modelo      el mismo modelo, tres empresas, tres resultados (#ventaja)
#   multiplica  la IA multiplica, y la distancia también (#esperar)
#   lunes       el curso acaba el viernes y la escalera de la IA (#lunes)
#   agentes     la misma propuesta, con un agente (#spiral)
# Formatos (FORMATS="h v"): h 1920×1080 (escritorio) y v 1080×1350 (4:5, móvil; el script pone class="v" en <html>).
# Las tomas de las capturas están en motion/<pieza>/tomas.txt (segundos separados por comas).
# Lo común (fuentes, GSAP, la geometría de la S y la marca) se copia de motion/film/; no se duplica en cada pieza.
# Si no hay Chrome de HyperFrames en caché, usa el headless_shell de Playwright: HYPERFRAMES_BROWSER_PATH=/ruta/headless_shell
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"; OUT="$ROOT/assets/video"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"; MODE="${1:-snap}"; HF="npx -y hyperframes@0.8.81"
SED_I=(-i); sed --version >/dev/null 2>&1 || SED_I=(-i '')   # GNU o BSD (macOS)
COMUN="Butler-Light.otf Butler-Regular.otf SofiaSansCondensed-VF.ttf gsap.min.js s-geom.js spiralia-texto-blanco.svg"
for P in ${PIEZAS:-modelo multiplica lunes agentes}; do
  for L in ${LANGS:-es en}; do
    for F in ${FORMATS:-h v}; do
      N="$P-$L-$F"; D="$SCR/$N"; rm -rf "$D"; mkdir -p "$D"
      for f in $COMUN; do cp "$HERE/film/$f" "$D/"; done
      cp "$HERE/$P/"* "$D/"
      if [ "$F" = v ]; then
        sed "${SED_I[@]}" -e "s/<html lang=\"es\">/<html lang=\"$L\" class=\"v\">/" \
          -e 's/data-width="1920" data-height="1080"/data-width="1080" data-height="1350"/' \
          -e 's/width=1920, height=1080/width=1080, height=1350/' "$D/index.html"
      else
        sed "${SED_I[@]}" "s/<html lang=\"es\">/<html lang=\"$L\">/" "$D/index.html"
      fi
      (cd "$D" && $HF lint)
      if [ "$MODE" = snap ]; then
        (cd "$D" && $HF snapshot --no-browser-gpu --describe false --at "$(tr -d ' \n' < "$HERE/$P/tomas.txt")")
      else
        M="$SCR/$N.master.mp4"
        (cd "$D" && $HF render --fps 30 --quality high --workers 2 --no-browser-gpu --output "$M")
        mkdir -p "$OUT"
        ffmpeg -y -loglevel error -i "$M" -c:v libx264 -preset slow -crf 26 -tune animation \
          -pix_fmt yuv420p -profile:v high -movflags +faststart -an -map_metadata -1 "$OUT/$N.mp4"
        ffmpeg -y -loglevel error -i "$M" -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 \
          -deadline good -cpu-used 2 -pix_fmt yuv420p -an -map_metadata -1 "$OUT/$N.webm"
        # Póster: el último fotograma, que es el resumen de la pieza (lo que se ve sin movimiento)
        ffmpeg -y -loglevel error -sseof -0.1 -i "$M" -frames:v 1 -q:v 3 "$OUT/$N.jpg"
        ls -la "$OUT/$N".*
      fi
    done
  done
done
