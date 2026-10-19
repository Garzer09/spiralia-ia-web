#!/bin/bash
# Vídeos de fondo (bucles de 12 s, sin sonido) en horizontal y vertical · capturas o render final.
#   bash motion/render_hero_bg.sh snap     capturas en $SCR/<pieza>-<formato>/snapshots/
#   bash motion/render_hero_bg.sh render   assets/video/<pieza>-<formato>.mp4 y .webm, y su póster (primer fotograma)
# Piezas (PIEZAS="hero firma" por defecto):
#   hero   motion/hero-org/  «La organización se enciende», fondo de la portada
#   firma  motion/firma-bg/  la S de Spiralia con pulsos de luz, fondo del cierre
# Formatos (FORMATS="h v"): h (1920×1080, escritorio) y v (1080×1920, móvil; se publica a 720×1280).
# Si no hay Chrome de HyperFrames en caché, usa el headless_shell de Playwright: HYPERFRAMES_BROWSER_PATH=/ruta/headless_shell
set -euo pipefail
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_SKIP_SKILLS=1
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"; OUT="$ROOT/assets/video"
SCR="${SCR:-${TMPDIR:-/tmp}/spiralia-hf}"; MODE="${1:-snap}"; HF="npx -y hyperframes@0.8.81"
SED_I=(-i); sed --version >/dev/null 2>&1 || SED_I=(-i '')   # GNU o BSD (macOS)
dir() { case "$1" in hero) echo hero-org ;; firma) echo firma-bg ;; *) echo "pieza desconocida: $1" >&2; exit 1 ;; esac; }
for P in ${PIEZAS:-hero firma}; do
  for F in ${FORMATS:-h v}; do
    D="$SCR/$P-$F"; rm -rf "$D"; mkdir -p "$D"; cp "$HERE/$(dir "$P")/"* "$D/"
    if [ "$F" = v ]; then
      sed "${SED_I[@]}" -e 's/data-width="1920" data-height="1080"/data-width="1080" data-height="1920"/' \
        -e 's/width=1920, height=1080/width=1080, height=1920/' "$D/index.html"
      SCALE="scale=720:1280:flags=lanczos"; MP4CRF=27; WEBMCRF=40
    else
      SCALE="scale=1920:1080:flags=lanczos"; MP4CRF=28; WEBMCRF=38
    fi
    (cd "$D" && $HF lint)
    if [ "$MODE" = snap ]; then
      (cd "$D" && $HF snapshot --no-browser-gpu --describe false --at 0,3,6,9,11.95)
    else
      M="$SCR/$P-$F.master.mp4"
      (cd "$D" && $HF render --fps 24 --quality high --workers 4 --no-browser-gpu --output "$M")
      mkdir -p "$OUT"
      ffmpeg -y -loglevel error -i "$M" -vf "$SCALE" -c:v libx264 -preset slow -crf $MP4CRF -tune film \
        -pix_fmt yuv420p -profile:v high -g 48 -movflags +faststart -an -map_metadata -1 "$OUT/$P-$F.mp4"
      ffmpeg -y -loglevel error -i "$M" -vf "$SCALE" -c:v libvpx-vp9 -b:v 0 -crf $WEBMCRF -row-mt 1 \
        -deadline good -cpu-used 2 -pix_fmt yuv420p -an -map_metadata -1 "$OUT/$P-$F.webm"
      ffmpeg -y -loglevel error -i "$M" -vf "$SCALE" -frames:v 1 -q:v 3 "$OUT/$P-$F.jpg"
      ls -la "$OUT/$P-$F".*
    fi
  done
done
