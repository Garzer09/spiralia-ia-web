/*
 * Vídeo de portada de Spiralia AI · 24 s en bucle, sin texto.
 * Todo es función de t (sin azar, relojes ni temporizadores): pintar(t) coloca cada elemento.
 * El fotograma de 24 s es igual al de 0 s, así que el bucle no salta.
 *
 *  0,0–3,0  la S completa; una luz recorre cada hebra desde el rizo
 *  3,0–7,0  la S se desenrolla en seis carriles de trabajo
 *  7,0–12,0 el trabajo avanza a trompicones y el uso se enfría: los puntos se frenan y se apagan
 * 12,0–17,0 se encienden agentes y skills que unen carriles; el flujo se ordena y acelera
 * 17,0–21,0 todo se vuelve a enrollar en la S
 * 21,0–24,0 la S brilla un momento (cada vuelta sube un nivel) y vuelve a su estado inicial
 */
(function (global) {
  'use strict';
  const T = 24, NS = 'http://www.w3.org/2000/svg';
  const C = { fondo: '#051A2B', hebra: '#E0DFDA', luz: '#FFFFFF', nodo: '#FFFFFF', union: 'rgba(224,223,218,.5)' };
  const G = global.SGEOM, N = G.pts.length, M = G.pts[0].length;

  // Composición según el formato: horizontal (zona libre para el titular a la izquierda) o vertical
  function layout(w, h) {
    if (w >= h) return { w, h, cx: 1455, cy: 540, sc: 1.6, lx0: 1160, lx1: 1880, ly0: 330, dy: 86, sw: 4.4 };
    return { w, h, cx: w * .5, cy: h * .62, sc: 1.75, lx0: 90, lx1: w - 90, ly0: h * .40, dy: 110, sw: 4.6 };
  }
  let L, svg, base = [], luz = [], puntos = [], nodos = [], uniones = [];
  const S0 = []; // puntos de la S ya colocados en el lienzo

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const fase = (t, a, b) => clamp((t - a) / (b - a));
  const io = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const sn = x => .5 - .5 * Math.cos(Math.PI * x); // seno: arranque y llegada suaves, sin tirón en el centro
  const suave = x => x * x * (3 - 2 * x);
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); (parent || svg).append(e); return e; };

  // Carriles: la hebra k pasa a ser un carril horizontal (punto i → x proporcional)
  const carril = (k, i) => [L.lx0 + (L.lx1 - L.lx0) * i / (M - 1), L.ly0 + k * L.dy];
  const enCarril = (k, f) => [L.lx0 + (L.lx1 - L.lx0) * f, L.ly0 + k * L.dy];

  // Agentes y skills: [carril, posición] y uniones entre carriles
  const NODOS = [[1, .28], [3, .28], [0, .52], [2, .52], [4, .52], [2, .78], [5, .78]];
  const UNIONES = [[0, 1], [2, 3], [3, 4], [5, 6]];
  const T_NODO = NODOS.map((_, i) => 12.3 + i * .38);

  function montar(raiz) {
    L = layout(+raiz.dataset.width, +raiz.dataset.height);
    raiz.style.background = C.fondo;
    svg = el('svg', { viewBox: `0 0 ${L.w} ${L.h}`, width: L.w, height: L.h }, raiz);
    svg.style.cssText = 'position:absolute;inset:0;display:block';
    for (let k = 0; k < N; k++) S0.push(G.pts[k].map(([x, y]) => [L.cx + (x - G.center[0]) * L.sc, L.cy + (y - G.center[1]) * L.sc]));
    preparar();
    const gu = el('g', { fill: 'none', stroke: C.union, 'stroke-width': 1.6, 'stroke-linecap': 'round' });
    UNIONES.forEach(() => uniones.push(el('line', {}, gu)));
    const gb = el('g', { fill: 'none', stroke: C.hebra, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    const gl = el('g', { fill: 'none', stroke: C.luz, 'stroke-linecap': 'round' });
    for (let k = 0; k < N; k++) { base.push(el('path', {}, gb)); luz.push(el('path', {}, gl)); }
    const gt = el('g', { stroke: C.luz, 'stroke-linecap': 'round', 'stroke-width': 3 }), gp = el('g', { fill: C.luz });
    for (let k = 0; k < N; k++) for (let j = 0; j < 5; j++) puntos.push({ k, j, cola: el('line', {}, gt), e: el('circle', { r: 4.6 }, gp) });
    const gn = el('g', {});
    NODOS.forEach(() => nodos.push({ halo: el('circle', { fill: 'none', stroke: C.nodo }, gn), aro: el('circle', { fill: C.fondo, stroke: C.nodo, 'stroke-width': 2 }, gn), dot: el('circle', { fill: C.nodo }, gn) }));
  }

  // Forma de cada hebra: de la S (m = 0) a su carril (m = 1).
  // Se interpola el ángulo de la tangente, no la posición: cada hebra se desenrolla como un muelle que se relaja,
  // anclada en su punto de contacto central (donde todas cruzan en horizontal), sin enredarse.
  const ANG = [], ANC = [];
  function preparar() {
    for (let k = 0; k < N; k++) {
      const P = S0[k], a = Math.round(G.touch[k] * (M - 1)), th = new Array(M - 1);
      for (let i = 0; i < M - 1; i++) th[i] = Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0]);
      // desenvuelve el ángulo de forma continua a partir del anclaje (≈ 0 en el centro)
      th[a] = Math.atan2(Math.sin(th[a]), Math.cos(th[a]));
      for (let i = a + 1; i < M - 1; i++) { while (th[i] - th[i - 1] > Math.PI) th[i] -= 2 * Math.PI; while (th[i] - th[i - 1] < -Math.PI) th[i] += 2 * Math.PI; }
      for (let i = a - 1; i >= 0; i--) { while (th[i] - th[i + 1] > Math.PI) th[i] -= 2 * Math.PI; while (th[i] - th[i + 1] < -Math.PI) th[i] += 2 * Math.PI; }
      ANG.push(th); ANC.push(a);
    }
  }
  function forma(k, m) {
    const th = ANG[k], a = ANC[k], P = S0[k], W = L.lx1 - L.lx0;
    const e = sn(clamp(m * 1.12 - k * .024)); // las hebras se sueltan casi a la vez, con un leve escalonado
    const seg = G.len[k] * L.sc / (M - 1), ds = seg + (W / (M - 1) - seg) * e;
    const ax = P[a][0] + (L.lx0 + W * a / (M - 1) - P[a][0]) * e, ay = P[a][1] + (L.ly0 + k * L.dy - P[a][1]) * e;
    const X = new Array(M), Y = new Array(M);
    X[a] = ax; Y[a] = ay;
    for (let i = a; i < M - 1; i++) { const g = th[i] * (1 - e); X[i + 1] = X[i] + ds * Math.cos(g); Y[i + 1] = Y[i] + ds * Math.sin(g); }
    for (let i = a - 1; i >= 0; i--) { const g = th[i] * (1 - e); X[i] = X[i + 1] - ds * Math.cos(g); Y[i] = Y[i + 1] - ds * Math.sin(g); }
    let d = '';
    for (let i = 0; i < M; i++) d += (i ? 'L' : 'M') + X[i].toFixed(1) + ' ' + Y[i].toFixed(1);
    return d;
  }

  function pintar(t) {
    t = ((t % T) + T) % T;
    // m: 0 = S, 1 = carriles
    const m = t < 2.6 ? 0 : t < 8 ? fase(t, 2.6, 8) : t < 17.2 ? 1 : t < 21.4 ? 1 - fase(t, 17.2, 21.4) : 0;
    // brillo de la S al final (vuelve a 0 en t = 24)
    const brillo = t > 21.4 ? Math.sin(Math.PI * fase(t, 21.4, 24)) : 0;
    const ancho = L.sw * (1 - .38 * io(m));
    for (let k = 0; k < N; k++) {
      const p = base[k];
      p.setAttribute('d', forma(k, m));
      p.setAttribute('stroke-width', (ancho * (1 + .22 * brillo)).toFixed(2));
      p.setAttribute('opacity', (.82 + .18 * brillo - .3 * (m === 1 ? 1 : 0) * enfriado(t)).toFixed(3));
      // la luz recorre la hebra en los primeros 3 s
      const q = luz[k], f = fase(t, .2 + k * .1, 2.2 + k * .1);
      if (t < 2.8 && f > 0 && f < 1) {
        const len = G.len[k] * L.sc, seg = 150;
        q.setAttribute('d', p.getAttribute('d')); q.setAttribute('stroke-width', (L.sw * 1.15).toFixed(2));
        q.setAttribute('stroke-dasharray', `${seg} ${len + seg}`);
        q.setAttribute('stroke-dashoffset', (seg - f * (len + seg)).toFixed(1));
        q.setAttribute('opacity', (Math.sin(Math.PI * f) * .95).toFixed(3));
      } else q.setAttribute('opacity', 0);
    }
    pintarPuntos(t);
    pintarNodos(t);
  }

  // 7–12 s: cuánto se ha enfriado el uso (0 → 1); 12–17 s vuelve a 0 con los agentes
  function enfriado(t) { return t < 8 ? 0 : t < 12 ? suave(fase(t, 8, 12)) : t < 13.5 ? 1 - suave(fase(t, 12, 13.5)) : 0; }

  function pintarPuntos(t) {
    const fr = enfriado(t);
    for (const P of puntos) {
      const { k, j, e, cola } = P;
      let op = 0, f = 0, v = 0, hecho = 1;
      if (t >= 7.6 && t < 12.4 && j < 3) {
        // a trompicones: cada punto con su ritmo, se frena y se apaga (dos de cada tres)
        const tau = t - 7.6, v0 = .07 + ((k * 7 + j * 3) % 5) * .012, ph = ((k * .37 + j * .29) % 1);
        f = (ph + v0 * (tau - .45 * tau * tau / 5.2) + (j === 1 ? .03 * Math.sin(tau * 2.1 + k) : 0)) % 1;
        const vive = j === 2 && k % 2 === 0 ? 1 - .35 * fr : 1 - fr * .92;
        op = fase(t, 7.6, 8.2) * vive * (1 - fase(t, 12, 12.4));
        v = v0 * (1 - .45 * tau / 5.2); hecho = .7;
      } else if (t >= 12.6 && t < 17.6) {
        // con agentes: flujo ordenado, más rápido y constante
        f = ((j / 5 + k * .05) + .2 * (t - 12.6)) % 1;
        op = fase(t, 12.6, 13.4) * (1 - fase(t, 17, 17.6));
        // el trabajo sale «hecho» (más brillante) al pasar por el primer agente de su carril
        const pri = NODOS.filter(([kk]) => kk === k).map(([, ff]) => ff), f0 = pri.length ? Math.min(...pri) : 2;
        v = .2; hecho = f > f0 ? 1 : .55;
      }
      op *= Math.min(1, f / .05, (1 - f) / .05); // sin aparecer de golpe en los extremos
      const [x, y] = enCarril(k, f), lc = Math.min(70, v * (L.lx1 - L.lx0) * .45);
      e.setAttribute('cx', x.toFixed(1)); e.setAttribute('cy', y.toFixed(1)); e.setAttribute('opacity', clamp(op * hecho).toFixed(3));
      e.setAttribute('r', (hecho === 1 ? 5.2 : 4.4).toFixed(1));
      cola.setAttribute('x1', Math.max(L.lx0, x - lc).toFixed(1)); cola.setAttribute('x2', x.toFixed(1)); cola.setAttribute('y1', y.toFixed(1)); cola.setAttribute('y2', y.toFixed(1));
      cola.setAttribute('opacity', clamp(op * hecho * .35).toFixed(3));
    }
  }

  function pintarNodos(t) {
    const fuera = 1 - fase(t, 17, 17.8);
    NODOS.forEach(([k, f], i) => {
      const n = nodos[i], [x, y] = enCarril(k, f), a = fase(t, T_NODO[i], T_NODO[i] + .45) * fuera, s = io(a);
      n.aro.setAttribute('cx', x); n.aro.setAttribute('cy', y); n.aro.setAttribute('r', (9 * s).toFixed(2)); n.aro.setAttribute('opacity', a.toFixed(3));
      n.dot.setAttribute('cx', x); n.dot.setAttribute('cy', y); n.dot.setAttribute('r', (3.4 * s).toFixed(2)); n.dot.setAttribute('opacity', a.toFixed(3));
      // pulso cuando pasa un punto por el agente
      let pulso = 0;
      if (t > 12.6 && t < 17.6) for (let j = 0; j < 5; j++) {
        const fp = ((j / 5 + k * .05) + .2 * (t - 12.6)) % 1, d = fp - f;
        if (d > 0 && d < .06) pulso = Math.max(pulso, 1 - d / .06);
      }
      n.halo.setAttribute('cx', x); n.halo.setAttribute('cy', y);
      n.halo.setAttribute('r', (9 + 14 * (1 - pulso)).toFixed(2)); n.halo.setAttribute('stroke-width', 1.4);
      n.halo.setAttribute('opacity', (pulso > 0 ? pulso * .7 * a : 0).toFixed(3));
    });
    UNIONES.forEach(([a, b], i) => {
      const [x1, y1] = enCarril(...NODOS[a]), [x2, y2] = enCarril(...NODOS[b]);
      const p = io(fase(t, Math.max(T_NODO[a], T_NODO[b]) + .2, Math.max(T_NODO[a], T_NODO[b]) + .9)) * fuera;
      const u = uniones[i];
      u.setAttribute('x1', x1); u.setAttribute('y1', y1 + 12); u.setAttribute('x2', x2);
      u.setAttribute('y2', (y1 + 12 + (y2 - y1 - 24) * p).toFixed(1)); u.setAttribute('opacity', (p > 0 ? fuera : 0).toFixed(3));
    });
  }

  global.HERO = { montar, pintar, duracion: T };
})(window);
