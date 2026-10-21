/*
 * Pieza «modelo» · El mismo modelo, distinto resultado (sección «La ventaja») · 16 s, sin sonido.
 * 16:9 (1920×1080) por defecto y 4:5 (1080×1350) con html.v. Ritmo de 120 BPM: una negra = 0,5 s = 15 fotogramas.
 * Todo es función de t (sin azar ni temporizadores): pintar(t) coloca cada elemento. Textos en copy.js.
 * La maqueta (tarjetas, tipografía, posiciones del núcleo) está en el CSS; aquí solo los trazos y la organización.
 *
 *  0,0–1,0   el núcleo: cuatro anillos se dibujan desde arriba y el brillo empieza a respirar (ciclo de 2 s)
 *  0,5       «El mismo modelo» bajo el núcleo
 *  0,7–2,0   suben «La misma IA.» «El mismo precio.» «El mismo día.» (a su lado en 16:9; debajo en 4:5)
 *            con cada línea sale un eco (un anillo que se abre y se apaga) desde el núcleo
 *  3,0–3,6   las tres líneas se retiran hacia arriba, una tras otra
 *  3,0–3,9   el núcleo sube y se encoge hasta la franja de arriba
 *  3,6–4,2   tres trazos bajan del núcleo (16:9: corchete y tallo; 4:5: espina a la izquierda) con una chispa en la punta
 *  ~4,2      al llegar cada trazo, el marco de la tarjeta se dibuja desde ese punto y aparecen EMPRESA A/B/C y sus 30 puntos
 *            apagados (5 equipos de 6, como islas)
 *  4,5–10,5  cada empresa recibe el mismo modelo: una chispa sale del núcleo, recorre su trazo y, al llegar, la empresa actúa
 *    A  4,5 «Compró licencias» · 5,0 se encienden los 30 a la vez · 5,5–8,5 se apagan uno a uno (quedan 3 a media luz)
 *       7,0 «El uso se enfría»
 *    B  6,0 «Hizo un piloto» · 6,5 se enciende un equipo, se enlaza y queda dentro de un cerco discontinuo
 *       8,0 «Un equipo, un caso»
 *    C  7,5 «La desplegó» · 8,0–9,6 los equipos se encienden uno tras otro y se unen con arcos (como el mapa SOL)
 *       10,0 y 11,0 la organización entera late · 10,0 «Cada equipo, en su trabajo»
 * 10,5–12,5  bajo cada tarjeta, «En la cuenta de resultados» y una barra que crece: A casi nada, B poco, C casi entera
 * 12,5–12,9  el núcleo, su rótulo y los trazos se desvanecen
 * 12,65–13,9 en su sitio sube el remate «Mismo modelo.» «Distinto resultado.» (la segunda en blanco) y, a las 13,3,
 *            «La ventaja está en el despliegue.»
 * 13,9–16,0  quieto: el último fotograma es el póster (remate arriba, tres tarjetas con sus puntos y sus barras)
 *  siempre   «Esquema ilustrativo» en la esquina inferior izquierda, fijo desde el fotograma 0
 */
(function (global) {
  'use strict';
  const T = 16, NS = 'http://www.w3.org/2000/svg';
  const TM = {
    rotulo: .5, intro: [.7, 1.1, 1.5], retira: [3.0, 3.1, 3.2],
    sube: 3.0, subeD: .9, trazos: 3.6,
    accion: [4.5, 6.0, 7.5],   // sube lo que hizo y sale la chispa del núcleo
    llega: [5.0, 6.5, 8.0],    // la chispa llega: la empresa actúa
    res: [7.0, 8.0, 10.0],
    latidos: [10.0, 11.0],
    pie: 10.5, barras: [[10.6, .9], [10.85, 1.1], [11.1, 1.4]],
    fuera: 12.5, remate: [12.65, 13.0], sub: 13.3,
  };
  const LLENO = [.06, .24, .9];          // barras: comparan, no miden (sin cifras)
  // Organización de cada tarjeta: 5 islas [x, y, giro] de 6 puntos en anillo. orden: cómo se enciende C; arcos [a, b, lado]
  const ORG = {
    h: { W: 432, H: 250, R: 27, r: 8, piloto: 1, orden: [1, 0, 2, 3, 4],
      islas: [[66, 74, 0], [216, 60, 20], [366, 84, 10], [138, 192, 30], [300, 188, 5]],
      arcos: [[1, 0, 1], [1, 2, -1], [0, 3, -1], [2, 4, 1], [3, 4, -1], [1, 3, 1], [1, 4, -1]] },
    v: { W: 360, H: 180, R: 25, r: 7.5, piloto: 2, orden: [0, 1, 2, 3, 4],
      islas: [[38, 48, 0], [109, 134, 20], [180, 48, 10], [251, 134, 30], [322, 48, 5]],
      arcos: [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [0, 2, -1], [2, 4, -1], [1, 3, 1]] },
  };
  const RESIDUO = { 3: .3, 16: .3, 26: .3 };   // A: los tres puntos que quedan a media luz

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - x, 3);
  const sale2 = x => 1 - (1 - x) * (1 - x);   // trazos: frena menos al final, para que la punta no se quede parada
  const io = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const pop = x => { const s = 1.7; x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
  const lerp = (a, b, p) => a + (b - a) * p;
  const rnd = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  const golpe = (t, t0, d) => { const x = (t - t0) / d; return x <= 0 || x >= 1 ? 0 : Math.pow(Math.sin(Math.PI * x), 2); };
  const f = (n, d = 2) => n.toFixed(d);

  let raiz, C, V, O, N, nucleo, anillos = [], ticks, orbitas = [], ecos = [], halo, disco, nucleoT, trazosG, trazos = [], tarjetas = [];
  let suben = [], aparecen = [];

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  const s = (tag, at, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); padre.append(e); return e; };
  // Línea que sube desde una máscara en t0 (y, si hay t1, se va hacia arriba)
  const linea = (padre, txt, cls, t0, t1) => { const m = h('div', 'mascara ' + (cls || ''), null, padre); suben.push({ e: h('span', 'sube', txt, m), t0, t1 }); return m; };
  const aparece = (e, t0, d = .5) => { aparecen.push({ e, t0, d }); return e; };

  // Marco de una tarjeta en dos mitades que salen del punto donde llega el trazo y se encuentran enfrente
  function marcos(w, hh, r, espina, y0) {
    if (!espina) return [
      `M${w / 2} 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V${hh - r}A${r} ${r} 0 0 1 ${w - r} ${hh}H${w / 2}`,
      `M${w / 2} 0H${r}A${r} ${r} 0 0 0 0 ${r}V${hh - r}A${r} ${r} 0 0 0 ${r} ${hh}H${w / 2}`];
    return [
      `M0 ${y0}V${r}A${r} ${r} 0 0 1 ${r} 0H${w - r}A${r} ${r} 0 0 1 ${w} ${r}V${y0}`,
      `M0 ${y0}V${hh - r}A${r} ${r} 0 0 0 ${r} ${hh}H${w - r}A${r} ${r} 0 0 0 ${w} ${hh - r}V${y0}`];
  }

  // La organización de una tarjeta: puntos (base apagada, luz y halo), enlaces de cada equipo, arcos, ondas y cerco
  function organizacion(svg, idx) {
    const o = { islas: [], puntos: [], arcos: [], ondas: [] };
    const gA = s('g', {}, svg), gE = s('g', {}, svg), gO = s('g', {}, svg), gH = s('g', {}, svg), gP = s('g', {}, svg);
    O.islas.forEach(([cx, cy, giro], j) => {
      const pts = [];
      for (let k = 0; k < 6; k++) {
        const a = (giro + k * 60 - 90) * Math.PI / 180, x = cx + O.R * Math.cos(a), y = cy + O.R * Math.sin(a);
        pts.push([x, y]);
        const n = j * 6 + k;
        o.puntos.push({ j, k, n, x, y,
          halo: s('circle', { cx: f(x), cy: f(y), r: O.r * 2.6, fill: 'url(#m-halo)', opacity: 0 }, gH),
          base: s('circle', { class: 'p-base', cx: f(x), cy: f(y), r: O.r, opacity: 0 }, gP),
          luz: s('circle', { class: 'p-luz', cx: f(x), cy: f(y), r: O.r, opacity: 0 }, gP) });
      }
      const d = pts.map((p, k) => (k ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1])).join('') + 'Z';
      o.islas.push({ cx, cy, pts, enlace: s('path', { class: 'enlace', d, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, gE) });
      o.ondas.push([0, 1].map(() => s('circle', { class: 'onda', cx, cy, r: O.R, opacity: 0 }, gO)));
    });
    if (idx === 1) { const p = O.islas[O.piloto]; o.cerco = s('circle', { class: 'cerco', cx: p[0], cy: p[1], r: O.R + O.r + 14, opacity: 0 }, gO); }
    if (idx === 2) {
      // C: cada equipo se enciende a su hora; el arco que llega a un equipo nuevo se dibuja mientras se enciende
      const on = []; O.orden.forEach((j, q) => { on[j] = TM.llega[2] + q * .4; });
      o.on = on; const llegados = new Set();
      O.arcos.forEach(([a, b, lado]) => {
        const tarde = on[a] > on[b] ? a : b, pronto = tarde === a ? b : a;
        const fin = llegados.has(tarde) ? on[tarde] + .55 : on[tarde]; llegados.add(tarde);
        const A = o.islas[pronto], B = o.islas[tarde];
        const cerca = (I, X) => I.pts.reduce((m, p) => ((p[0] - I.cx) * (X.cx - I.cx) + (p[1] - I.cy) * (X.cy - I.cy) > (m[0] - I.cx) * (X.cx - I.cx) + (m[1] - I.cy) * (X.cy - I.cy) ? p : m));
        const p0 = cerca(A, B), p1 = cerca(B, A), dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy);
        const qx = (p0[0] + p1[0]) / 2 - dy / L * L * .22 * lado, qy = (p0[1] + p1[1]) / 2 + dx / L * L * .22 * lado;
        o.arcos.push({ fin, e: s('path', { class: 'arco', d: `M${f(p0[0])} ${f(p0[1])}Q${f(qx)} ${f(qy)} ${f(p1[0])} ${f(p1[1])}`, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, opacity: .6 }, gA) });
      });
    }
    return o;
  }

  function montar(r) {
    raiz = r; C = global.COPY[document.documentElement.lang] || global.COPY.es;
    V = document.documentElement.classList.contains('v'); O = V ? ORG.v : ORG.h;
    const cs = getComputedStyle(raiz), num = k => parseFloat(cs.getPropertyValue(k));
    N = { x0: num('--nx0'), y0: num('--ny0'), x1: num('--nx1'), y1: num('--ny1'), s1: num('--ns1') };
    const W = raiz.offsetWidth, H = raiz.offsetHeight;
    h('div', 'fondo');

    // Degradados compartidos (halo de los puntos encendidos y disco del núcleo)
    const defs = s('defs', {}, s('svg', { width: 0, height: 0, style: 'position:absolute' }, raiz));
    const rg = (id, paradas) => { const g = s('radialGradient', { id }, defs); paradas.forEach(([o, c, a]) => s('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, g)); };
    rg('m-halo', [[0, '#FFFFFF', .55], [.35, '#FFFFFF', .16], [1, '#FFFFFF', 0]]);
    rg('m-disco', [[0, '#FFFFFF', 1], [.28, '#FFFFFF', .95], [.55, '#E0DFDA', .35], [1, '#E0DFDA', 0]]);

    // Trazos (debajo de las tarjetas)
    const capa = s('svg', { class: 'capa', viewBox: `0 0 ${W} ${H}` }, raiz);
    trazosG = s('g', {}, capa);

    // El núcleo
    nucleo = h('div', 'nucleo');
    halo = h('div', 'halo', null, nucleo);
    const sv = s('svg', { viewBox: '0 0 440 440' }, nucleo);
    [62, 98, 136, 176].forEach((rr, k) => anillos.push(s('circle', { class: 'anillo', cx: 220, cy: 220, r: rr, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, transform: 'rotate(-90 220 220)', opacity: [.62, .44, .3, .2][k] }, sv)));
    ticks = s('circle', { class: 'anillo', cx: 220, cy: 220, r: 118, 'stroke-dasharray': '1.2 8.7', opacity: 0 }, sv);
    [[136, -90, 34], [176, 30, -22]].forEach(([rr, a0, w]) => orbitas.push({ rr, a0, w, e: s('circle', { cx: 220, cy: 220 - rr, r: 4.5, fill: '#FFFFFF', opacity: 0 }, sv) }));
    TM.intro.forEach(t0 => ecos.push({ t0, e: s('circle', { class: 'anillo', cx: 220, cy: 220, r: 176, opacity: 0 }, sv) }));
    disco = s('circle', { cx: 220, cy: 220, r: 46, fill: 'url(#m-disco)', opacity: 0 }, sv);
    nucleoT = h('p', 'nucleo-t rotulo', C.nucleo);

    // 0–3 s · las tres líneas
    const intro = h('div', 'intro');
    C.intro.forEach((l, i) => linea(intro, l, '', TM.intro[i], TM.retira[i]));

    // Las tres tarjetas
    C.empresas.forEach((d, i) => {
      const tj = h('div', 'tarjeta t' + i), w = tj.offsetWidth, hh = tj.offsetHeight;
      const t = { e: tj, x: tj.offsetLeft, y: tj.offsetTop, w, h: hh };
      t.sombra = h('div', 't-sombra', null, tj);
      t.fondo = h('div', 't-fondo', null, tj);
      t.brillo = h('div', 't-brillo', null, tj);
      const m = s('svg', { class: 'marco', width: w, height: hh }, tj);
      t.y0 = 52; t.marco = marcos(w, hh, 16, V, t.y0).map(d2 => s('path', { d: d2, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, m));
      t.n = h('p', 't-n rotulo', d.n, tj);
      linea(tj, d.hizo, 't-hizo', TM.accion[i]);
      t.org = organizacion(s('svg', { class: 'org', viewBox: `0 0 ${O.W} ${O.H}` }, tj), i);
      linea(tj, d.res, 't-res', TM.res[i]);
      const pie = h('div', 't-pie', null, tj);
      t.linea = h('div', 't-linea', null, pie);
      aparece(h('p', 't-pyg', C.pyg, pie), TM.pie + .05);
      t.barra = aparece(h('div', 'barra', null, pie), TM.pie + .05); t.lleno = h('i', '', null, t.barra);
      tarjetas.push(t);
    });

    // Trazos del núcleo a cada tarjeta. 16:9: corchete desde los lados del núcleo y tallo central. 4:5: espina a la izquierda
    const R1 = 176 * N.s1, ex = R1 + 12;
    const bajoRotulo = N.y1 + R1 + 18 + (V ? 30 : 26) + 14;
    let Lmax = 0;
    tarjetas.forEach((t, i) => {
      let d;
      if (V) {
        const sx = t.x - 40, yi = t.y + t.y0, k = 30;
        d = `M${N.x1 - ex} ${N.y1}H${sx + k}Q${sx} ${N.y1} ${sx} ${N.y1 + k}V${yi - k}Q${sx} ${yi} ${sx + k} ${yi}H${t.x}`;
      } else {
        const xc = t.x + t.w / 2, k = 44;
        if (Math.abs(xc - N.x1) < 10) d = `M${N.x1} ${bajoRotulo}V${t.y}`;
        else { const sg = xc < N.x1 ? -1 : 1; d = `M${N.x1 + sg * ex} ${N.y1}H${xc - sg * k}Q${xc} ${N.y1} ${xc} ${N.y1 + k}V${t.y}`; }
      }
      const base = s('path', { class: 'trazo', d, opacity: .4 }, trazosG);
      const L = base.getTotalLength(); Lmax = Math.max(Lmax, L);
      base.setAttribute('stroke-dasharray', `${f(L)} ${f(L + 10)}`); base.setAttribute('stroke-dashoffset', f(L));
      const luz = s('path', { class: 'luz', d, opacity: 0 }, trazosG);
      const ch = s('g', { opacity: 0 }, trazosG);
      s('circle', { r: 16, fill: 'url(#m-halo)' }, ch); s('circle', { class: 'chispa', r: 4.5 }, ch);
      trazos.push({ base, luz, ch, L, i });
    });
    // Cuándo se dibuja cada trazo: en 4:5 comparten la espina, así que avanzan juntos (misma cabeza); en 16:9 llegan a la vez
    trazos.forEach(z => {
      if (V) { z.t0 = TM.trazos; z.d = .85; z.Lref = Lmax; }
      else if (z.L < 200) { z.t0 = 3.95; z.d = .25; z.Lref = z.L; }
      else { z.t0 = TM.trazos; z.d = .6; z.Lref = z.L; }
      z.te = z.t0 + z.d * (1 - Math.sqrt(1 - z.L / z.Lref));
      tarjetas[z.i].ta = z.te;
    });

    // 12,5–16 s · el remate y el rótulo de esquema ilustrativo
    const rem = h('div', 'remate');
    C.remate.forEach((l, i) => linea(rem, l, i ? 'blanco' : '', TM.remate[i]));
    aparece(h('p', 'sub', C.sub), TM.sub, .6);
    h('p', 'ilus rotulo', C.ilus);   // fijo desde el primer fotograma
  }

  function pintar(t) {
    t = clamp(t, 0, T);
    for (const l of suben) {
      const p = sale(clamp((t - l.t0) / .55)), q = l.t1 == null ? 0 : io(clamp((t - l.t1) / .45));
      l.e.style.transform = `translateY(${f((1 - p) * 118 - q * 120)}%)`;
    }
    for (const a of aparecen) { const p = sale(clamp((t - a.t0) / a.d)); a.e.style.opacity = f(p, 3); a.e.style.transform = `translateY(${f((1 - p) * 14, 1)}px)`; }

    // El núcleo: sube y se encoge; respira cada 2 s; destella cuando sale una chispa; se desvanece a las 12,5
    const pm = io(clamp((t - TM.sube) / TM.subeD));
    const cx = lerp(N.x0, N.x1, pm), cy = lerp(N.y0, N.y1, pm), sc = lerp(1, N.s1, pm);
    const fuera = sale(clamp((t - TM.fuera) / .4)), vivo = 1 - fuera;
    const resp = .5 - .5 * Math.cos(Math.PI * t), entra = sale(clamp(t / 1.1));
    const destello = TM.accion.reduce((a, x) => a + golpe(t, x - .1, .6), 0);
    nucleo.style.transform = `translate(${f(cx - 220)}px, ${f(cy - 220)}px) scale(${f(sc * (1 - .08 * fuera), 4)})`;
    nucleo.style.opacity = f(vivo, 3);
    halo.style.opacity = f(entra * (.7 + .3 * resp + .5 * destello), 3);
    halo.style.transform = `scale(${f(.9 + .1 * resp + .06 * destello, 4)})`;
    anillos.forEach((a, k) => { a.setAttribute('stroke-dashoffset', f(1 - io(clamp((t - .05 - k * .14) / .9)), 4)); a.style.strokeWidth = f(1.6 / sc, 3); });
    ticks.setAttribute('opacity', f(.5 * sale(clamp((t - .6) / .6)), 3));
    ticks.setAttribute('transform', `rotate(${f(t * 9)} 220 220)`); ticks.style.strokeWidth = f(1.6 / sc, 3);
    for (const o of orbitas) {
      const a = (o.a0 + o.w * t) * Math.PI / 180;
      o.e.setAttribute('cx', f(220 + o.rr * Math.cos(a))); o.e.setAttribute('cy', f(220 + o.rr * Math.sin(a)));
      o.e.setAttribute('opacity', f(.85 * sale(clamp((t - .9) / .5)), 3)); o.e.setAttribute('r', f(4.5 / Math.sqrt(sc), 2));
    }
    for (const c of ecos) {   // cada línea de la intro manda un eco desde el núcleo
      const p = (t - c.t0) / 1.1; c.e.setAttribute('opacity', p > 0 && p < 1 ? f(.32 * (1 - p), 3) : 0);
      c.e.setAttribute('r', f(176 + 70 * sale(clamp(p)), 2));
    }
    disco.setAttribute('opacity', f(entra * (.82 + .18 * resp), 3));
    disco.setAttribute('r', f(44 + 5 * resp + 8 * destello, 2));
    const pn = sale(clamp((t - TM.rotulo) / .6));
    nucleoT.style.opacity = f(pn * vivo, 3);
    nucleoT.style.transform = `translate(${f(cx)}px, ${f(cy + 176 * sc + (pm < 1 ? lerp(26, 18, pm) : 18) + (1 - pn) * 14)}px) translateX(-50%)`;

    // Trazos: se dibujan con una chispa en la punta; luego llevan el modelo a cada empresa (luz que recorre el trazo)
    trazosG.setAttribute('opacity', f(vivo, 3));
    for (const z of trazos) {
      const pos = Math.min(z.L, z.Lref * sale2(clamp((t - z.t0) / z.d)));
      z.base.setAttribute('stroke-dashoffset', f(z.L - pos));
      const a = TM.accion[z.i], l = TM.llega[z.i];
      let hp = null, ho = 0;
      if (t < Math.min(z.te + .35, a - .02)) { hp = pos; ho = pos > 0 ? 1 - clamp((t - z.te) / .3) : 0; }
      else if (t >= a - .02) {
        const q = io(clamp((t - a) / (l - a))); hp = z.L * q; ho = t < l ? 1 : 1 - clamp((t - l) / .3);
        const seg = 140; z.luz.setAttribute('stroke-dasharray', `${seg} ${f(z.L + seg)}`);
        z.luz.setAttribute('stroke-dashoffset', f(seg - hp)); z.luz.setAttribute('opacity', f(.9 * ho, 3));
      }
      if (hp != null && ho > 0) { const p = z.base.getPointAtLength(hp); z.ch.setAttribute('transform', `translate(${f(p.x)} ${f(p.y)})`); }
      z.ch.setAttribute('opacity', f(ho, 3));
    }

    // Tarjetas
    tarjetas.forEach((tj, i) => {
      const ta = tj.ta, pm2 = io(clamp((t - ta) / .55));
      const brillo = .26 + .5 * golpe(t, TM.llega[i] - .05, .8) + (i === 2 ? .2 * sale(clamp((t - TM.latidos[0]) / 1.2)) : 0);
      tj.marco.forEach(p => { p.setAttribute('stroke-dashoffset', f(1 - pm2, 4)); p.setAttribute('opacity', f(brillo, 3)); });
      // El fondo se descubre detrás del marco (de arriba abajo en 16:9; de izquierda a derecha en 4:5) y luego cae la sombra
      const pf = io(clamp((t - ta - .06) / .55)), resto = f((1 - pf) * 100, 2);
      tj.fondo.style.clipPath = pf >= 1 ? 'none' : V ? `inset(0 ${resto}% 0 0 round 16px 0 0 16px)` : `inset(0 0 ${resto}% 0 round 16px 16px 0 0)`;
      tj.fondo.style.opacity = pf > 0 ? '1' : '0';
      tj.sombra.style.opacity = f(sale(clamp((t - ta - .3) / .6)), 3);
      tj.brillo.style.opacity = i === 2 ? f(sale(clamp((t - 9.6) / 1.4)), 3) : '0';
      const pn2 = sale(clamp((t - ta - .2) / .5));
      tj.n.style.opacity = f(pn2, 3); tj.n.style.transform = `translateY(${f((1 - pn2) * 14, 1)}px)`;
      tj.linea.style.transform = `scaleX(${f(io(clamp((t - TM.pie) / .6)), 4)})`;
      const [b0, bd] = TM.barras[i];
      tj.lleno.style.transform = `scaleX(${f(LLENO[i] * sale(clamp((t - b0) / bd)), 4)})`;
      pintarOrg(tj, i, t);
    });
  }

  // Cada empresa hace algo distinto con el mismo modelo
  function pintarOrg(tj, i, t) {
    const o = tj.org, ta = tj.ta, L = TM.llega[i];
    const ondas = [];   // [isla, inicio, tamaño]
    let latido = 0;
    if (i === 0) O.islas.forEach((_, j) => ondas.push([j, L, 1]));
    if (i === 1) ondas.push([O.piloto, L, 1]);
    if (i === 2) {
      O.islas.forEach((_, j) => { ondas.push([j, o.on[j], .8]); TM.latidos.forEach(x => ondas.push([j, x + j * .03, 1.05])); });
      latido = TM.latidos.reduce((a, x) => a + golpe(t, x - .05, .5), 0);
    }
    for (const p of o.puntos) {
      const vis = sale(clamp((t - ta - .38 - p.j * .05) / .45));
      let b = 0, esc = 1;
      if (i === 0) {
        const on = sale(clamp((t - L) / .25)), enfria = L + .5 + 1.2 * rnd(p.j + 3) + 1.0 * rnd(p.n + 11);
        const fr = io(clamp((t - enfria) / .8)) * (1 - (RESIDUO[p.n] || 0));
        b = on * (1 - fr);
        if (t >= L) esc = pop(clamp((t - L) / .45)) * (1 - .18 * fr);   // al enfriarse, además, encoge un poco
      } else if (i === 1) {
        if (p.j === O.piloto) { const t0 = L + p.k * .06; b = sale(clamp((t - t0) / .3)); if (t >= t0) esc = pop(clamp((t - t0) / .45)); }
      } else {
        const t0 = o.on[p.j] + p.k * .04; b = sale(clamp((t - t0) / .3)); if (t >= t0) esc = pop(clamp((t - t0) / .45));
        esc *= 1 + .32 * latido;
      }
      p.base.setAttribute('opacity', f(.2 * vis, 3));
      p.luz.setAttribute('opacity', f(b, 3)); p.luz.setAttribute('r', f(O.r * esc, 2));
      p.halo.setAttribute('opacity', f(Math.min(1, b * (.8 + .5 * latido)), 3)); p.halo.setAttribute('r', f(O.r * 2.6 * esc, 2));
    }
    // Enlaces dentro de cada equipo (B: el piloto; C: todos, al encenderse)
    o.islas.forEach((I, j) => {
      let t0 = null;
      if (i === 1 && j === O.piloto) t0 = L + .15;
      if (i === 2) t0 = o.on[j] + .12;
      const p = t0 == null ? 0 : io(clamp((t - t0) / .45));
      I.enlace.setAttribute('stroke-dashoffset', f(1 - p, 4)); I.enlace.setAttribute('opacity', f(.5 + .3 * latido, 3));
    });
    for (const a of o.arcos) {
      a.e.setAttribute('stroke-dashoffset', f(1 - io(clamp((t - (a.fin - .42)) / .42)), 4));
      a.e.setAttribute('opacity', f(.55 + .35 * latido, 3));
    }
    if (o.cerco) {
      const p = sale(clamp((t - (L + .45)) / .55));
      o.cerco.setAttribute('opacity', f(.62 * p, 3)); o.cerco.setAttribute('r', f((O.R + O.r + 14) * (1.22 - .22 * p), 2));
    }
    // Ondas: dos por isla, alternando, para que una no corte a la anterior
    const uso = O.islas.map(() => 0);
    ondas.sort((a, b) => a[1] - b[1]).forEach(([j, t0, k]) => {
      const e = o.ondas[j][uso[j]++ % 2], p = (t - t0) / .85;
      if (p < 0 || p > 1) return;
      e.setAttribute('r', f(O.R + 6 + O.R * 1.3 * k * sale(p), 2)); e.setAttribute('opacity', f(.5 * (1 - p), 3)); e.dataset.v = '1';
    });
    o.ondas.forEach(par => par.forEach(e => { if (!e.dataset.v) e.setAttribute('opacity', 0); delete e.dataset.v; }));
  }

  global.PIEZA = { montar, pintar, duracion: T };
})(window);
