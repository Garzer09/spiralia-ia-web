/*
 * Película de apertura de Spiralia AI · 22 s, sin sonido, 4:5 (1080×1350) y 16:9 (1920×1080, html.h).
 * Ritmo de 120 BPM: una negra = 0,5 s = 15 fotogramas. Termina en un cartel que se queda fijo.
 * Todo es función de t (sin azar ni temporizadores): pintar(t) coloca cada elemento. Textos en copy.js.
 *
 *  0,0–3,2  noche   «Hay empresas que ya» + responden / deciden / venden antes (los verbos se relevan)
 *  3,2–5,2  gris    «Con la misma IA que tú.»
 *  5,2–8,8  noche   80 % · más productivos. Rejilla de 100 personas: se encienden 80 con la cuenta
 *  8,8–12,4 gris    corte a 6 % · al menos un 5 % del beneficio. Rejilla de 100 empresas: se encienden 6
 * 12,4–14,6 marino  «La diferencia no es la IA. Es cómo se despliega.»
 * 14,6–16,7 noche   «Formamos a cada persona con su propio trabajo.»
 * 16,7–18,8 marino  «Y construimos con tu equipo hasta que funciona.»
 * 18,8–22,0 noche   la S se dibuja, aparecen Spiralia y el lema. Sin cifras ni pruebas: solo la marca
 * Cada cifra se queda 3,6 s en pantalla: la cuenta acaba a los 1,5 s y quedan 2 s para leer la etiqueta.
 */
(function (global) {
  'use strict';
  const T = 22, NS = 'http://www.w3.org/2000/svg';
  const NOCHE = '#051A2B', MARINO = '#0D3150', GRIS = '#E0DFDA', TINTA = '#08263D', CLARO = '#E0DFDA';
  const ESC = [
    { id: 's1', a: 0, b: 3.2, fondo: NOCHE, tinta: CLARO },
    { id: 's2', a: 3.2, b: 5.2, fondo: GRIS, tinta: TINTA },
    { id: 's3', a: 5.2, b: 8.8, fondo: NOCHE, tinta: CLARO },
    { id: 's4', a: 8.8, b: 12.4, fondo: GRIS, tinta: TINTA },
    { id: 's5', a: 12.4, b: 14.6, fondo: MARINO, tinta: CLARO },
    { id: 's6', a: 14.6, b: 16.7, fondo: NOCHE, tinta: CLARO },
    { id: 's7', a: 16.7, b: 18.8, fondo: MARINO, tinta: CLARO },
    { id: 's8', a: 18.8, b: T + 1, fondo: NOCHE, tinta: CLARO },
  ];
  // Las seis empresas que sí lo ven en su beneficio, repartidas por la rejilla (posiciones fijas)
  const SEIS = [14, 31, 47, 62, 78, 93];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - x, 3);
  const io = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const pop = x => { const s = 1.7; x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
  let raiz, fondo, cromo, escenas = [], suben = [], relevos = [], cifras = [], hebras = [], aparecen = [], puntos = [], C;

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  const escena = id => escenas.find(x => x.id === id).e;
  // Línea que sube desde detrás de una máscara (entra en el instante t0)
  const linea = (padre, txt, cls, t0) => { const m = h('div', 'mascara ' + (cls || ''), null, padre), i = h('span', 'sube', txt, m); suben.push({ e: i, t0 }); return m; };
  const aparece = (e, t0, d = .5) => { aparecen.push({ e, t0, d }); return e; };

  // marca: clase de las últimas líneas ('mayor': más grandes; 'blanco': encendidas) y cuántas son
  function bloque(id, lineas, cls, t0, paso, marca, cuantas = 1) {
    const b = h('div', 'bloque ' + cls, null, escena(id));
    lineas.forEach((l, i) => linea(b, l, marca && i >= lineas.length - cuantas ? marca : '', t0 + i * paso));
    return b;
  }

  // Rejilla de 100 (20 × 5): personas (círculos) o empresas (cuadrados)
  function rejilla(s, d, t0) {
    const caja = aparece(h('div', 'reja ' + (d.corte ? 'cuadros' : 'circulos'), null, s), t0 - .2, .4);
    h('p', 'reja-t', d.reja, caja);
    const g = h('div', 'reja-g', null, caja);
    for (let k = 0; k < 100; k++) {
      const p = h('i', '', null, g);
      // Personas: se encienden por columnas, con la cuenta. Empresas: solo seis, una tras otra
      if (d.corte) { const j = SEIS.indexOf(k); puntos.push({ e: p, tipo: 'seis', t0: j < 0 ? null : t0 + .55 + j * .14 }); }
      else { const col = k % 20, fila = Math.floor(k / 20); puntos.push({ e: p, tipo: 'cuenta', orden: col * 5 + fila, ref: cifras[cifras.length - 1] }); }
    }
  }

  function montar(r) {
    raiz = r; C = global.COPY[document.documentElement.lang] || global.COPY.es;
    fondo = h('div', 'fondo');
    ESC.forEach(x => escenas.push({ ...x, e: h('section', 'escena ' + x.id) }));
    cromo = h('p', 'cromo', C.cromo);

    // 0–3,2 · el dolor: hay empresas que ya van más rápido (los verbos se relevan en la misma línea)
    const b1 = bloque('s1', C.s1.pre, 'grande centro', .15, .4);
    const slot = h('div', 'mascara relevo', null, b1);
    C.s1.verbos.forEach((v, i, a) => relevos.push({ e: h('span', 'sube', v, slot), t0: .95 + i * .72, t1: i < a.length - 1 ? .95 + (i + 1) * .72 : null }));
    bloque('s2', C.s2, 'grande centro', 3.3, .45, 'mayor');

    [['s3', C.s3, 5.35], ['s4', C.s4, 8.9]].forEach(([id, d, t0]) => {
      const s = escena(id);
      const n = h('p', 'cifra', null, s); const v = h('span', '', null, n); h('span', 'suf', d.suf, n);
      if (d.corte) v.textContent = String(d.n); else cifras.push({ e: v, a: d.n, t0, dur: 1.5 });
      aparece(h('p', 'etiqueta', d.t, s), t0 + .45, .6);
      rejilla(s, d, t0 + .3);
      aparece(h('p', 'fuente', C.fuente, s), t0 + .9);
    });
    bloque('s5', C.s5, 'grande centro', 12.5, .4, 'blanco', 2);
    bloque('s6', C.s6, 'grande centro', 14.7, .38);
    bloque('s7', C.s7, 'grande centro', 16.8, .38);

    // 18,8–22 · la S de Spiralia se dibuja deprisa, como una firma, y queda la marca
    const s8 = escena('s8'), G = global.SGEOM;
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', G.view.join(' ')); svg.setAttribute('class', 'ese'); s8.append(svg);
    G.paths.forEach((d, k) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); svg.append(p); hebras.push({ p, L: 0, k }); });
    aparece(h('img', 'marca', null, s8), 19.75, .7).src = 'spiralia-texto-blanco.svg';
    aparece(h('p', 'lema', C.lema, s8), 20.1, .7);
  }

  function pintar(t) {
    t = clamp(t, 0, T);
    const esc = ESC.reduce((a, x) => (t >= x.a ? x : a), ESC[0]);
    fondo.style.background = esc.fondo;
    raiz.style.color = esc.tinta;
    cromo.style.opacity = esc.id === 's8' ? 0 : .75;
    escenas.forEach(x => { x.e.style.display = t >= x.a && t < x.b ? 'block' : 'none'; });
    for (const s of suben) { const p = sale(clamp((t - s.t0) / .55)); s.e.style.transform = `translateY(${((1 - p) * 108).toFixed(2)}%)`; }
    for (const r of relevos) {
      const a = sale(clamp((t - r.t0) / .5)), b = r.t1 == null ? 0 : io(clamp((t - r.t1) / .42));
      r.e.style.transform = `translateY(${((1 - a) * 125 - b * 125).toFixed(2)}%)`;
    }
    for (const a of aparecen) { const p = sale(clamp((t - a.t0) / a.d)); a.e.style.opacity = p.toFixed(3); a.e.style.transform = `translateY(${((1 - p) * 14).toFixed(1)}px)`; }
    for (const c of cifras) { c.v = Math.round(c.a * sale(clamp((t - c.t0) / c.dur))); c.e.textContent = String(c.v); }
    for (const p of puntos) {
      if (p.tipo === 'cuenta') p.e.classList.toggle('on', p.orden < p.ref.v);
      else if (p.t0 != null) { const k = clamp((t - p.t0) / .4); p.e.classList.toggle('on', k > 0); p.e.style.transform = `scale(${k > 0 ? pop(k).toFixed(3) : 1})`; }
    }
    for (const H of hebras) {
      if (!H.L) { H.L = H.p.getTotalLength(); H.p.style.strokeDasharray = H.L; }
      const p = io(clamp((t - 18.9 - H.k * .07) / .8));
      H.p.style.strokeDashoffset = (H.L * (1 - p)).toFixed(1);
    }
  }

  global.FILM = { montar, pintar, duracion: T };
})(window);
