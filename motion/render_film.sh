#!/bin/bash
# Película de apertura (20 s, sin sonido) en ES y EN, en dos formatos · capturas del guion o render final.
#   bash motion/render_film.sh snap     capturas en $SCR/film-<lang>-<formato>/snapshots/
#   bash motion/render_film.sh render   assets/video/film-<lang>[-h].mp4 y .webm (VP9)
# Formatos (FORMATS="v h" por defecto):
#   v  1080×1350 (4:5), pantallas verticales: film-<lang>.mp4 / .webm
#   h  1920×1080 (16:9), escritorio: film-<lang>-h.mp4 / .webm (mismo guion; el encaje, en index.html, html.h)
# Si no hay Chrome de HyperFrames en caché, usa el headless_shell de Playwright: HYPERFRAMES_BROWSER_PATH=/ruta/headless_shell
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"; OUT="$ROOT/assets/video"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"; MODE="${1:-snap}"; HF="npx -y hyperframes@0.8.81"
SED_I=(-i); sed --version >/dev/null 2>&1 || SED_I=(-i '')   # GNU o BSD (macOS)
for L in ${LANGS:-es en}; do
  for F in ${FORMATS:-v h}; do
    N="film-$L"; [ "$F" = h ] && N="film-$L-h"
    D="$SCR/$N"; rm -rf "$D"; mkdir -p "$D"; cp "$HERE/film/"* "$D/"
    if [ "$F" = h ]; then
      sed "${SED_I[@]}" -e "s/<html lang=\"es\">/<html lang=\"$L\" class=\"h\">/" \
        -e 's/data-width="1080" data-height="1350"/data-width="1920" data-height="1080"/' \
        -e 's/width=1080, height=1350/width=1920, height=1080/' "$D/index.html"
    else
      sed "${SED_I[@]}" "s/<html lang=\"es\">/<html lang=\"$L\">/" "$D/index.html"
    fi
    (cd "$D" && $HF check)
    if [ "$MODE" = snap ]; then
      (cd "$D" && $HF snapshot --no-browser-gpu --describe false --no-end --at 0.9,2.6,3.6,4.6,5.6,7.2,8.8,10.6,11.8,13.4,14.9,15.3,16.2,17.4,18.6,19.95)
    else
      (cd "$D" && $HF render --fps 30 --workers 1 --no-browser-gpu --output "$SCR/$N.master.mp4")
      mkdir -p "$OUT"
      ffmpeg -y -loglevel error -i "$SCR/$N.master.mp4" -frames:v 600 -c:v libx264 -preset slow -crf 26 -tune animation \
        -pix_fmt yuv420p -profile:v high -movflags +faststart -an -map_metadata -1 "$OUT/$N.mp4"
      ffmpeg -y -loglevel error -i "$SCR/$N.master.mp4" -frames:v 600 -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 \
        -deadline good -cpu-used 2 -pix_fmt yuv420p -an -map_metadata -1 "$OUT/$N.webm"
      ls -la "$OUT/$N".*
    fi
  done
done
