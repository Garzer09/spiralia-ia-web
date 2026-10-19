"""Geometría de la S de Spiralia, medida sobre el PNG oficial (Logos-formatos-14, 760×760).

La S son seis hebras paralelas. Cada hebra rodea el lóbulo de arriba (centro C1)
en sentido antihorario y, al llegar abajo del lóbulo, toca el de abajo (centro C2)
y lo rodea en sentido horario. Los radios de arriba y de abajo de cada hebra suman
la distancia entre centros, así que todas se tocan en la columna central.
La hebra interior de arriba es la exterior de abajo: la figura es simétrica
respecto al centro. La hebra interior de cada lóbulo termina en un rizo.

Salidas:
  assets/img/s-lines.svg   símbolo en líneas (web)
  src/js/s-geom.js         trayectorias SVG y puntos muestreados (web y vídeo)
"""
import json, math, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
MX, MY = 380.0, 381.0                 # centro de simetría
R0, D, N = 41.0, 19.4, 6              # radio interior, separación y número de hebras
DIST = 2 * R0 + (N - 1) * D           # distancia entre centros (= suma de radios)
C1 = (MX, MY - DIST / 2)
START = math.radians(30.5)            # extremo de arriba a la derecha (ángulo de pantalla)
CURL_START = math.radians(80)         # el rizo empieza aquí y gira 560° hasta unirse al radio R0
CURL_TURN = math.radians(560)
# Radio del rizo medido en el PNG cada 20° de recorrido (borde interior del trazo + 1,5 px)
CURL_R = [9, 9.5, 11, 13.5, 15.5, 19, 22, 23, 24.5, 24.5, 23.5, 23, 21, 19.5, 19, 19, 18.5,
          19.5, 20.5, 22, 24.5, 27.5, 31, 34, 36, 38.5, 39, 40, 39.5]
VIEW = (234, 146, 292, 470)           # x, y, ancho, alto
STROKE = 3.0

def pt(c, r, a):
    return (c[0] + r * math.cos(a), c[1] + r * math.sin(a))

def curl_r(tau):
    """Radio del rizo tras recorrer tau grados (Catmull-Rom sobre las medidas, + 1,5 px al eje del trazo)."""
    v = [x + 1.5 for x in CURL_R[:-1]] + [R0]
    i = min(int(tau // 20), len(v) - 2); t = tau / 20 - i
    p0, p1, p2, p3 = v[max(i - 1, 0)], v[i], v[i + 1], v[min(i + 2, len(v) - 1)]
    return .5 * (2 * p1 + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (3 * p1 - p0 - 3 * p2 + p3) * t ** 3)

def top_half(k, step=math.radians(1.5)):
    """De su inicio al punto de contacto, en el lóbulo de arriba."""
    r, pts = R0 + k * D, []
    if k == 0:   # rizo: del centro hacia fuera, girando en sentido antihorario
        a, end = CURL_START, CURL_START - CURL_TURN
        while a > end:
            pts.append(pt(C1, curl_r(math.degrees(CURL_START - a)), a)); a -= step
        a = end
    else:
        a = START
    touch = math.pi / 2 - 2 * math.pi * (1 if k else 2)
    while a > touch:
        pts.append(pt(C1, r, a)); a -= step
    pts.append(pt(C1, r, touch))
    return pts

def strand(k):
    top = top_half(k)
    bottom = [(2 * MX - x, 2 * MY - y) for x, y in reversed(top_half(N - 1 - k))]
    return top + bottom[1:], len(top) - 1   # puntos e índice del punto de contacto

def resample(pts, m):
    acc = [0.0]
    for p, q in zip(pts, pts[1:]):
        acc.append(acc[-1] + math.hypot(q[0] - p[0], q[1] - p[1]))
    out, j = [], 0
    for i in range(m):
        s = acc[-1] * i / (m - 1)
        while j < len(acc) - 2 and acc[j + 1] < s: j += 1
        t = (s - acc[j]) / ((acc[j + 1] - acc[j]) or 1)
        p, q = pts[j], pts[j + 1]
        out.append((p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t))
    return out, acc[-1]

def d_attr(pts):
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)

built = [strand(k) for k in range(N)]
strands = [s for s, _ in built]
paths = [d_attr(s) for s in strands]
samples = [resample(s, 240) for s in strands]

def arc_at(pts, idx):
    return sum(math.hypot(q[0] - p[0], q[1] - p[1]) for p, q in zip(pts[:idx], pts[1:idx + 1]))
touch = [round(arc_at(s, i) / L, 4) for (s, i), (_, L) in zip(built, samples)]
vb = ' '.join(str(v) for v in VIEW)

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" fill="none" stroke="#E0DFDA" '
       f'stroke-width="{STROKE}" stroke-linecap="round" stroke-linejoin="round">'
       + ''.join(f'<path d="{d}"/>' for d in paths) + '</svg>\n')
(ROOT / 'assets/img/s-lines.svg').write_text(svg)

x, y, w, h = VIEW
side = h + 70
fav = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x + w / 2 - side / 2:.0f} {y - 35} {side} {side}">'
       f'<rect x="{x + w / 2 - side / 2:.0f}" y="{y - 35}" width="{side}" height="{side}" rx="{side * .22:.0f}" fill="#08263D"/>'
       f'<g fill="none" stroke="#E0DFDA" stroke-width="9" stroke-linecap="round">'
       + ''.join(f'<path d="{d}"/>' for d in paths) + '</g></svg>\n')
(ROOT / 'assets/img/favicon.svg').write_text(fav)

js = ('// Generado por tools/s_geom.py · no editar a mano\n'
      'window.SGEOM=' + json.dumps({
          'view': VIEW, 'stroke': STROKE, 'center': [MX, MY], 'paths': paths,
          'len': [round(L, 1) for _, L in samples], 'touch': touch,
          'pts': [[[round(x, 1), round(y, 1)] for x, y in s] for s, _ in samples],
      }, separators=(',', ':')) + ';\n')
(ROOT / 'src/js/s-geom.js').write_text(js)
(ROOT / 'motion/film/s-geom.js').write_text(js)
print('hebras:', N, '· longitudes:', [round(L) for _, L in samples])
