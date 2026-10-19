#!/bin/bash
# Publica el prototipo en Vercel (proyecto spiralia-ia, cuenta garzer09) con noindex.
# Genera dist/ en modo prototipo y lo copia a _deploy/, que conserva el vínculo con el proyecto (.vercel/).
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"; O="$D/_deploy"
python3 -I "$D/build.py"
mkdir -p "$O"
rsync -a --delete --exclude .vercel "$D/dist/" "$O/"
grep -q 'noindex' "$O/index.html" && grep -q 'noindex' "$O/vercel.json" || { echo "ERROR: falta noindex"; exit 1; }
cd "$O"
[ -f .vercel/project.json ] || vercel link --yes --project spiralia-ia
vercel deploy --prod --yes
