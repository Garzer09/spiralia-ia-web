#!/bin/bash
# Película de apertura (4:5, 1080×1350, 20 s) en ES y EN · capturas del guion o render final.
#   bash motion/render_film.sh snap     capturas en $SCR/film-<lang>/snapshots/
#   bash motion/render_film.sh render   assets/video/film-es.mp4, film-en.mp4 y sus pósteres (último fotograma)
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"; OUT="$ROOT/assets/video"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"; MODE="${1:-snap}"; HF="npx -y hyperframes@0.8.81"
for L in ${LANGS:-es en}; do
  D="$SCR/film-$L"; rm -rf "$D"; mkdir -p "$D"; cp "$HERE/film/"* "$D/"
  sed -i '' "s/<html lang=\"es\">/<html lang=\"$L\">/" "$D/index.html"
  (cd "$D" && $HF check)
  if [ "$MODE" = snap ]; then
    (cd "$D" && $HF snapshot --no-browser-gpu --describe false --no-end --at 0.9,2.6,3.6,4.6,5.6,7.2,8.8,10.6,11.8,13.4,14.9,15.3,16.2,17.4,18.6,19.95)
  else
    (cd "$D" && $HF render --fps 30 --workers 1 --no-browser-gpu --output "$SCR/film-$L.master.mp4")
    mkdir -p "$OUT"
    ffmpeg -y -loglevel error -i "$SCR/film-$L.master.mp4" -frames:v 600 -c:v libx264 -preset slow -crf 26 -tune animation \
      -pix_fmt yuv420p -profile:v high -movflags +faststart -an -map_metadata -1 "$OUT/film-$L.mp4"
    C="scale=in_color_matrix=bt709:in_range=tv:out_color_matrix=bt601:out_range=pc"
    ffmpeg -y -loglevel error -sseof -0.1 -i "$SCR/film-$L.master.mp4" -vf "$C" -frames:v 1 -q:v 4 "$OUT/film-$L.jpg"
    ls -la "$OUT/film-$L.mp4" "$OUT/film-$L.jpg"
  fi
done
