#!/bin/bash
# Vídeo de portada · capturas del guion o render final, en horizontal (1920×1080) y vertical (720×1280).
#   bash motion/render.sh snap      capturas en $SCR/<formato>/snapshots/
#   bash motion/render.sh render    assets/video/hero-h.mp4, hero-v.mp4 y sus pósteres
# Requisitos: Node con npx, FFmpeg y hyperframes@0.8.81 con su Chrome en caché (funciona sin conexión).
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"; OUT="$ROOT/assets/video"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"   # fuera del proyecto: el CLI escribe snapshots/ y temporales
MODE="${1:-snap}"; HF="npx -y hyperframes@0.8.81"
FORMATOS="${FORMATOS:-hero-h:1920:1080 hero-v:720:1280}"

for f in $FORMATOS; do
  IFS=: read -r name w h <<< "$f"
  rm -rf "${SCR:?}/$name"; mkdir -p "$SCR/$name"
  cp "$HERE/hero/"{hero.js,gsap.min.js,s-geom.js} "$SCR/$name/"
  sed "s/1920/$w/g; s/1080/$h/g" "$HERE/hero/index.html" > "$SCR/$name/index.html"
  (cd "$SCR/$name" && $HF check)
  if [ "$MODE" = snap ]; then
    (cd "$SCR/$name" && $HF snapshot --no-browser-gpu --describe false --no-end \
      --at 0,1.2,3.4,4.4,5.4,6.4,7.4,9.5,11.8,13.4,15.2,17.6,19.4,20.8,22.6,23.95)
  else
    (cd "$SCR/$name" && $HF render --fps 30 --workers 1 --no-browser-gpu --output "$SCR/$name.master.mp4")
    mkdir -p "$OUT"
    # Bucle sin salto: 720 fotogramas (0-719); el 720 sería igual al 0
    ffmpeg -y -loglevel error -i "$SCR/$name.master.mp4" -frames:v 720 -c:v libx264 -preset slow -crf 28 -tune animation \
      -pix_fmt yuv420p -profile:v high -movflags +faststart -an -map_metadata -1 "$OUT/$name.mp4"
    C="scale=in_color_matrix=bt709:in_range=tv:out_color_matrix=bt601:out_range=pc"
    ffmpeg -y -loglevel error -i "$SCR/$name.master.mp4" -vf "select=eq(n\,0),$C" -fps_mode passthrough -frames:v 1 -q:v 4 "$OUT/$name-poster.jpg"
    ls -la "$OUT/$name.mp4" "$OUT/$name-poster.jpg"
  fi
done
