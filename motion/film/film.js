/*
 * Película de apertura de Spiralia AI · 20 s, 1080×1350 (4:5), sin sonido. Termina en un cartel que se queda fijo.
 * Ritmo de 120 BPM: una negra = 0,5 s = 15 fotogramas; cada corte cae en un fotograma exacto.
 * Todo es función de t (sin azar ni temporizadores): pintar(t) coloca cada elemento. Textos en copy.js.
 *
 *  0,0–2,0  noche   «La IA ya está en todas las mesas.»
 *  2,0–4,0  gris    80 % · más productivos
 *  4,0–6,0  noche   la cifra cae a 6 % · lo ven en el beneficio
 *  6,0–8,0  marino  «El curso acaba el viernes.»
 *  8,0–9,5  gris    «¿Y el lunes?»
 *  9,5–12,0 noche   «Formamos a cada persona con su propio trabajo.»
 * 12,0–14,5 marino  «Construimos con tu equipo hasta que funciona.»
 * 14,5–20,0 noche   la S se dibuja, aparece Spiralia y suben las pruebas (cartel final, sin repetir el titular de la web)
 */
(function (global) {
  'use strict';
  const T = 20, NS = 'http://www.w3.org/2000/svg';
  const NOCHE = '#051A2B', MARINO = '#0D3150', GRIS = '#E0DFDA', TINTA = '#08263D', CLARO = '#E0DFDA', SUAVE = '#A9B1B8';
  const ESC = [
    { id: 's1', a: 0, b: 2, fondo: NOCHE, tinta: CLARO },
    { id: 's2', a: 2, b: 4, fondo: GRIS, tinta: TINTA },
    { id: 's3', a: 4, b: 6, fondo: NOCHE, tinta: CLARO },
    { id: 's4', a: 6, b: 8, fondo: MARINO, tinta: CLARO },
    { id: 's5', a: 8, b: 9.5, fondo: GRIS, tinta: TINTA },
    { id: 's6', a: 9.5, b: 12, fondo: NOCHE, tinta: CLARO },
    { id: 's7', a: 12, b: 14.5, fondo: MARINO, tinta: CLARO },
    { id: 's8', a: 14.5, b: T + 1, fondo: NOCHE, tinta: CLARO },
  ];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - x, 3);
  const io = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  let raiz, fondo, cromo, escenas = [], suben = [], cifras = [], hebras = [], reglas = [], aparecen = [], C;

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  // Línea que sube desde detrás de una máscara (entra en el instante t0)
  const linea = (padre, txt, cls, t0) => { const m = h('div', 'mascara ' + (cls || ''), null, padre), i = h('span', 'sube', txt, m); suben.push({ e: i, t0 }); return m; };
  const aparece = (e, t0, d = .5) => { aparecen.push({ e, t0, d }); return e; };

  function bloque(id, lineas, cls, t0, paso) {
    const s = escenas.find(x => x.id === id).e, b = h('div', 'bloque ' + cls, null, s);
    lineas.forEach((l, i) => linea(b, l, '', t0 + i * paso));
    return b;
  }

  function montar(r) {
    raiz = r; C = global.COPY[document.documentElement.lang] || global.COPY.es;
    fondo = h('div', 'fondo');
    ESC.forEach(x => escenas.push({ ...x, e: h('section', 'escena ' + x.id) }));
    cromo = h('p', 'cromo', C.cromo);

    bloque('s1', C.s1, 'grande centro', .15, .5);
    [['s2', C.s2, 2.15], ['s3', C.s3, 4.15]].forEach(([id, d, t0]) => {
      const s = escenas.find(x => x.id === id).e;
      const n = h('p', 'cifra', null, s); const v = h('span', '', null, n); h('span', 'suf', d.suf, n);
      cifras.push({ e: v, desde: d.desde || 0, a: d.n, t0, dur: .9 });
      aparece(h('p', 'etiqueta', d.t, s), t0 + .45);
      aparece(h('p', 'fuente', C.fuente, s), t0 + .7);
    });
    bloque('s4', C.s4, 'grande centro', 6.15, .5);
    bloque('s5', C.s5, 'enorme centro', 8.1, .3);
    bloque('s6', C.s6, 'grande centro', 9.6, .38);
    bloque('s7', C.s7, 'grande centro', 12.1, .45);

    // 14,5–16,5 · la S de Spiralia se dibuja deprisa, como una firma
    const s8 = escenas.find(x => x.id === 's8').e, G = global.SGEOM;
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', G.view.join(' ')); svg.setAttribute('class', 'ese'); s8.append(svg);
    G.paths.forEach((d, k) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); svg.append(p); hebras.push({ p, L: 0, k }); });
    aparece(h('img', 'marca', null, s8), 15.55).src = 'spiralia-texto-blanco.svg';
    aparece(h('p', 'lema', C.lema, s8), 15.85);

    // 16,6–20 · debajo de la marca suben las pruebas
    const tabla = h('div', 'tabla', null, s8);
    C.filas.forEach(([a, b], i) => {
      const r = h('div', 'regla', null, tabla); reglas.push({ e: r, t0: 16.6 + i * .3 });
      const f = aparece(h('p', 'fila', null, tabla), 16.75 + i * .3); h('span', '', a, f); h('b', '', b, f);
    });
    reglas.push({ e: h('div', 'regla', null, tabla), t0: 17.5 });
  }

  function pintar(t) {
    t = clamp(t, 0, T);
    const esc = ESC.reduce((a, x) => (t >= x.a ? x : a), ESC[0]);
    fondo.style.background = esc.fondo;
    raiz.style.color = esc.tinta;
    cromo.style.opacity = esc.id === 's8' ? 0 : .75;
    escenas.forEach(x => { x.e.style.display = t >= x.a && t < x.b ? 'block' : 'none'; });
    for (const s of suben) { const p = sale(clamp((t - s.t0) / .55)); s.e.style.transform = `translateY(${((1 - p) * 108).toFixed(2)}%)`; }
    for (const a of aparecen) { const p = sale(clamp((t - a.t0) / a.d)); a.e.style.opacity = p.toFixed(3); a.e.style.transform = `translateY(${((1 - p) * 14).toFixed(1)}px)`; }
    for (const c of cifras) { const p = sale(clamp((t - c.t0) / c.dur)); c.e.textContent = String(Math.round(c.desde + (c.a - c.desde) * p)); }
    for (const H of hebras) {
      if (!H.L) { H.L = H.p.getTotalLength(); H.p.style.strokeDasharray = H.L; }
      const p = io(clamp((t - 14.6 - H.k * .07) / .8));
      H.p.style.strokeDashoffset = (H.L * (1 - p)).toFixed(1);
    }
    for (const r of reglas) r.e.style.transform = `scaleX(${io(clamp((t - r.t0) / .5)).toFixed(3)})`;
  }

  global.FILM = { montar, pintar, duracion: T };
})(window);
