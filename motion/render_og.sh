#!/bin/bash
# Imágenes para compartir (1200×630) en ES y EN: assets/og-es.jpg y assets/og-en.jpg.
#   bash motion/render_og.sh
# Fondo: el primer fotograma del vídeo de la portada (assets/video/hero-h.jpg). Textos en motion/og/index.html.
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"; HF="npx -y hyperframes@0.8.81"
SED_I=(-i); sed --version >/dev/null 2>&1 || SED_I=(-i '')
for L in es en; do
  D="$SCR/og-$L"; rm -rf "$D"; mkdir -p "$D"
  cp "$HERE/og/index.html" "$HERE/film/gsap.min.js" "$ROOT/assets/fonts/Butler-Light.woff2" "$ROOT/assets/fonts/SofiaSansCondensed.woff2" \
     "$ROOT/assets/img/spiralia-blanco.svg" "$ROOT/assets/video/hero-h.jpg" "$D/"
  sed "${SED_I[@]}" "s/<html lang=\"es\">/<html lang=\"$L\">/" "$D/index.html"
  (cd "$D" && $HF snapshot --no-browser-gpu --describe false --at 0.5 >/dev/null)
  ffmpeg -y -loglevel error -i "$(ls "$D"/snapshots/frame-00-*.png)" -q:v 3 "$ROOT/assets/og-$L.jpg"
  ls -la "$ROOT/assets/og-$L.jpg"
done
