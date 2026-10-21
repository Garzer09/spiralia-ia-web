/*
 * «multiplica» · La IA multiplica, y la distancia también (sección «Lo que cuesta esperar», #esperar).
 * 16 s, sin sonido, 16:9 (1920×1080) y 4:5 (1080×1350, html.v). Fondo noche #051A2B. Textos en copy.js.
 * Ritmo de 120 BPM: una negra = 0,5 s = 15 fotogramas. Todo es función de t (sin azar ni temporizadores).
 *
 *  0,15–0,70  «La IA no suma.» sube desde la máscara (todo el bloque se acerca un 2,5 % hasta los 2,5 s)
 *  0,65–1,20  «Multiplica.» sube en blanco y se enciende (brillo); la primera línea baja un punto
 *  2,50–3,05  el titular se retira hacia arriba y se queda de cabecera, más pequeño
 *  2,70–3,27  se dibujan los ejes (sin escala vertical) y las 52 marcas de semana, cuando el titular ya ha dejado
 *             libre el eje vertical; 2,85 el punto de partida late; 2,9 el contador «Semana 1»; 3,0 «Semanas»
 *  3,00–8,50  las dos líneas salen del mismo punto. Contador «Semana 1» → «Semana 52», entero, con la cabeza.
 *             Arriba, «Quien la despliega con método», compuesta (exponencial suave); abajo, «Quien espera», casi plana.
 *             Punto luminoso en cada cabeza, rótulo que la sigue, trama que rellena el hueco, marcas del eje que se encienden
 *  7,00–7,60  la llave crece entre las dos cabezas y las sigue; 7,3 «La distancia»
 *  8,45–8,50  las líneas se paran en la semana 52: la cifra se enciende un instante y una onda sale de la cabeza de arriba
 *  9,00       la cabecera cambia: «Multiplica lo que haces bien.»; la línea de arriba se enciende y un destello la recorre
 * 10,60       «Y lo que haces mal.»: la línea de arriba baja el brillo y la de abajo recupera el suyo; 11,0–11,75 cuatro
 *             etiquetas de riesgo bajo la línea de abajo, una cada 0,25 s, con rebote y un hilo discontinuo que las ata a ella
 * 12,50       remate: «Cada semana que esperas,» (12,85) / «la distancia crece.» en blanco (13,15); la llave y
 *             «La distancia» se encienden; el contador baja un punto para ceder el foco
 * 13,70–16,0  quieto: el último fotograma es el póster (remate, gráfico, «Semana 52», llave y riesgos)
 * Siempre, en una esquina: «Esquema ilustrativo».
 */
(function (global) {
  'use strict';
  const T = 16, NS = 'http://www.w3.org/2000/svg';
  const K = 3.2, N = 240;                     // curvatura de la compuesta y muestras del trazo completo
  const GREIGE = '#E0DFDA', GRIS = '#A9B1B8', BLANCO = '#FFFFFF', HONDO = '#174467';
  const T_RIESGO = [11, 11.25, 11.5, 11.75];

  // Geometría de cada formato (px del lienzo). La tipografía está en el CSS (index.html)
  const LH = {
    W: 1920, H: 1080,
    intro: { top: 364, dy: -274, escala: 84 / 160 },
    ejeX: { x0: 160, x1: 1760, y: 960 }, ejeY: { x: 160, y0: 960, y1: 330 },
    x0: 160, xf: 1290, y0: 830, alto: 400, bajo: 50, sep: 30, llave: 14, luz: 300,
  };
  const LV = {
    W: 1080, H: 1350,
    intro: { top: 530, dy: -440, escala: 76 / 132 },
    ejeX: { x0: 84, x1: 996, y: 1210 }, ejeY: { x: 84, y0: 1210, y1: 470 },
    x0: 84, xf: 620, y0: 976, alto: 390, bajo: 44, sep: 28, llave: 12, luz: 240,
  };

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - x, 3);
  const io = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const pop = x => { const s = 2.2; x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mezcla = (a, b, k) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };
  const f1 = x => x.toFixed(1);

  let raiz, svg, C, L, V;
  const suben = [], marcas = [], riesgos = [];
  let intro, introA, introB, remateB, cuenta, cuentaN, rotA, rotB, rotH, eje;
  let ejeX, ejeY, flecha, lineaA, brilloA, barrido, lineaB, relleno, trama, llave, llaveBrillo;
  let origen, onda0, haloA, haloB, puntoA, puntoB, ondaA, luz, Lbarrido = 0;

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  const s = (tag, at, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); (padre || svg).append(e); return e; };
  // Línea que sube desde detrás de una máscara en t0 y sale hacia arriba en t1
  const linea = (padre, txt, cls, t0, t1) => { const m = h('div', 'mascara ' + (cls || ''), null, padre), e = h('span', 'sube', txt, m); suben.push({ m, e, t0, t1 }); return e; };
  // Parte un texto después de n palabras (solo presentación)
  const partir = (txt, n) => { const w = txt.split(' '); return n && n < w.length ? [w.slice(0, n).join(' '), w.slice(n).join(' ')] : [txt]; };

  // Curvas: u ∈ [0, 1] es la fracción del año (semana 1 → 52)
  const X = u => L.x0 + u * (L.xf - L.x0);
  const YA = u => L.y0 - L.alto * (Math.exp(K * u) - 1) / (Math.exp(K) - 1);   // compuesta
  const YB = u => L.y0 - L.bajo * u;                                             // casi plana
  // Avance de las cabezas: casi lineal (una semana, el mismo tiempo), con entrada y salida suaves
  const prog = t => { const x = clamp((t - 3) / 5.5); return .7 * x + .3 * io(x); };
  const trazo = (p, Y) => { const n = Math.ceil(p * N), pts = []; for (let i = 0; i <= n; i++) { const u = Math.min(i / N, p); pts.push(f1(X(u)) + ',' + f1(Y(u))); } return pts; };
  // Llave vertical que abre hacia la izquierda, con el pico a la derecha
  function llaveD(x, y1, y2, w) {
    const ym = (y1 + y2) / 2, r = Math.max(0, Math.min(w, (y2 - y1) / 4));
    return `M${f1(x)},${f1(y1)} Q${f1(x + w)},${f1(y1)} ${f1(x + w)},${f1(y1 + r)} L${f1(x + w)},${f1(ym - r)} ` +
      `Q${f1(x + w)},${f1(ym)} ${f1(x + 2 * w)},${f1(ym)} Q${f1(x + w)},${f1(ym)} ${f1(x + w)},${f1(ym + r)} ` +
      `L${f1(x + w)},${f1(y2 - r)} Q${f1(x + w)},${f1(y2)} ${f1(x)},${f1(y2)}`;
  }

  function montar(r) {
    raiz = r;
    C = global.COPY[document.documentElement.lang] || global.COPY.es;
    V = document.documentElement.classList.contains('v');
    L = V ? LV : LH;
    h('div', 'fondo');

    // ── Gráfico (SVG a tamaño de lienzo, 1 unidad = 1 px)
    svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'graf'); svg.setAttribute('viewBox', `0 0 ${L.W} ${L.H}`); raiz.append(svg);
    const defs = s('defs', {});
    const grad = (id, at, stops, tag = 'linearGradient') => { const g = s(tag, { id, ...at }, defs); stops.forEach(([o, c, a]) => s('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, g)); };
    grad('halo', {}, [[0, BLANCO, .9], [.3, BLANCO, .28], [1, BLANCO, 0]], 'radialGradient');
    grad('luz', {}, [[0, GREIGE, .5], [.45, GREIGE, .14], [1, GREIGE, 0]], 'radialGradient');
    grad('hueco', { gradientUnits: 'userSpaceOnUse', x1: L.x0, y1: 0, x2: L.xf, y2: 0 }, [[0, HONDO, .04], [.6, HONDO, .4], [1, HONDO, .78]]);
    grad('gm', { gradientUnits: 'userSpaceOnUse', x1: L.x0, y1: 0, x2: L.xf, y2: 0 }, [[0, BLANCO, .05], [.55, BLANCO, .45], [1, BLANCO, 1]]);
    const pt = s('pattern', { id: 'trama', width: 10, height: 10, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    s('line', { x1: 0, y1: 0, x2: 0, y2: 10, stroke: GREIGE, 'stroke-width': 1.2 }, pt);
    const mk = s('mask', { id: 'mh', maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: L.W, height: L.H }, defs);
    s('rect', { x: 0, y: 0, width: L.W, height: L.H, fill: 'url(#gm)' }, mk);
    const fb = (id, d) => { const f = s('filter', { id, filterUnits: 'userSpaceOnUse', x: 0, y: 0, width: L.W, height: L.H }, defs); s('feGaussianBlur', { stdDeviation: d }, f); };
    fb('brillo', 7); fb('brillo2', 4);

    luz = s('circle', { r: L.luz, fill: 'url(#luz)', opacity: 0 });
    relleno = s('path', { fill: 'url(#hueco)' });
    trama = s('path', { fill: 'url(#trama)', mask: 'url(#mh)', opacity: .2 });
    // Ejes: sin escala vertical; en el eje X, una marca por semana (las de cada trimestre, más largas)
    const ax = { stroke: GRIS, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: .55 };
    ejeY = s('line', { x1: L.ejeY.x, y1: L.ejeY.y0, x2: L.ejeY.x, y2: L.ejeY.y0, ...ax });
    ejeX = s('line', { x1: L.ejeX.x0, y1: L.ejeX.y, x2: L.ejeX.x0, y2: L.ejeX.y, ...ax });
    const ex = L.ejeX.x1, ey = L.ejeX.y;
    flecha = s('path', { d: `M${ex - 11},${ey - 8} L${ex},${ey} L${ex - 11},${ey + 8}`, fill: 'none', ...ax, 'stroke-linejoin': 'round' });
    for (let i = 0; i < 52; i++) {
      const x = X(i / 51), largo = (i + 1) % 13 === 0 ? 16 : 8;
      marcas.push({ x, e: s('line', { x1: f1(x), y1: ey + 6, x2: f1(x), y2: ey + 6 + largo, stroke: GREIGE, 'stroke-width': 1.5, opacity: 0 }) });
    }
    lineaB = s('path', { fill: 'none', stroke: GRIS, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    brilloA = s('path', { fill: 'none', stroke: BLANCO, 'stroke-width': 8, 'stroke-linecap': 'round', filter: 'url(#brillo)', opacity: 0 });
    lineaA = s('path', { fill: 'none', stroke: GREIGE, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    // Destello que recorre la línea de arriba cuando se enciende (trazo completo, fijo)
    barrido = s('path', { d: 'M' + trazo(1, YA).join('L'), fill: 'none', stroke: BLANCO, 'stroke-width': 7, 'stroke-linecap': 'round', filter: 'url(#brillo2)', opacity: 0 });
    riesgos.length = 0;
    C.riesgos.forEach(() => riesgos.push({ hilo: s('line', { stroke: BLANCO, 'stroke-width': 1.5, 'stroke-dasharray': '3 5', opacity: 0 }) }));
    llaveBrillo = s('path', { fill: 'none', stroke: BLANCO, 'stroke-width': 5, 'stroke-linecap': 'round', filter: 'url(#brillo2)', opacity: 0 });
    llave = s('path', { fill: 'none', stroke: GREIGE, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0 });
    onda0 = s('circle', { cx: L.x0, cy: L.y0, r: 6, fill: 'none', stroke: GREIGE, 'stroke-width': 1.5, opacity: 0 });
    origen = s('circle', { cx: L.x0, cy: L.y0, r: 0, fill: GREIGE });
    haloB = s('circle', { r: 22, fill: 'url(#halo)', opacity: 0 });
    haloA = s('circle', { r: 30, fill: 'url(#halo)', opacity: 0 });
    ondaA = s('circle', { r: 8, fill: 'none', stroke: BLANCO, 'stroke-width': 1.5, opacity: 0 });
    puntoB = s('circle', { r: 6, fill: GRIS, opacity: 0 });
    puntoA = s('circle', { r: 7.5, fill: BLANCO, opacity: 0 });

    // ── Rótulos, contador y notas
    eje = h('p', 'eje', C.eje);
    h('p', 'ilus', C.ilus);
    const [pre, post] = C.semana.split('{n}');
    cuenta = h('p', 'cuenta');
    h('span', 'r', pre.trim(), cuenta); cuentaN = h('span', 'n', '1', cuenta);
    if (post && post.trim()) h('span', 'r', post.trim(), cuenta);
    rotA = h('p', 'rot arriba'); partir(C.arriba, C.cortes && C.cortes.arriba).forEach(x => h('span', '', x, rotA));
    rotB = h('p', 'rot abajo'); h('span', '', C.abajo, rotB);
    rotH = h('p', 'rot hueco'); h('span', '', C.hueco, rotH);

    // Etiquetas de riesgo (en 4:5, dos filas de dos)
    const caja = h('div', 'riesgos');
    C.riesgos.forEach((txt, i) => {
      if (i === 2) h('i', 'salto', null, caja);
      const e = h('p', 'riesgo', null, caja);
      const m = document.createElementNS(NS, 'svg'); m.setAttribute('aria-hidden', 'true'); e.append(m);
      const rc = document.createElementNS(NS, 'rect'); ['x', 'y'].forEach(k => rc.setAttribute(k, 0)); rc.setAttribute('width', '100%'); rc.setAttribute('height', '100%'); rc.setAttribute('rx', 8); m.append(rc);
      h('span', '', txt, e);
      Object.assign(riesgos[i], { e, caja, t0: T_RIESGO[i] });
    });

    // ── Cabecera: intro (grande, se retira arriba), «bien / mal» y remate
    intro = h('div', 'cab intro');
    intro.style.top = L.intro.top + 'px';
    introA = linea(intro, C.intro[0], '', .15, 9);
    introB = linea(intro, C.intro[1], 'blanco', .65, 9.06);
    const bien = h('div', 'cab');
    const lb = V ? partir(C.bien, C.cortes && C.cortes.bien) : [C.bien];
    lb.forEach((x, i) => linea(bien, x, '', 9.35 + i * .12, 12.5 + i * .05));
    linea(bien, C.mal, '', 10.6, 12.5 + lb.length * .05);
    const rem = h('div', 'cab');
    linea(rem, C.remate[0], '', 12.85, null);
    remateB = linea(rem, C.remate[1], 'blanco', 13.15, null);
  }

  function pintar(t) {
    t = clamp(t, 0, T);

    // Cabecera: cada línea sube desde su máscara y sale hacia arriba; quieta, la máscara deja ver el brillo
    for (const l of suben) {
      const a = sale(clamp((t - l.t0) / .55)), b = l.t1 == null ? 0 : io(clamp((t - l.t1) / .45));
      l.e.style.transform = `translateY(${((1 - a) * 110 - b * 110).toFixed(2)}%)`;
      l.m.style.overflow = t >= l.t0 + .56 && (l.t1 == null || t < l.t1) ? 'visible' : 'hidden';
    }
    // Intro: un acercamiento lento (2,5 %) mientras se lee; a los 2,5 s se retira hacia arriba y se encoge a cabecera
    const q = io(clamp((t - 2.5) / .55)), s0 = 1 + .025 * clamp(t / 2.5);
    intro.style.transform = `translate(0px, ${f1(L.intro.dy * q)}px) scale(${(s0 + (L.intro.escala - s0) * q).toFixed(4)})`;
    introA.style.opacity = (1 - .3 * sale(clamp((t - 1.1) / .6))).toFixed(3);
    introB.style.textShadow = `0 0 30px rgba(255,255,255,${(.5 * sale(clamp((t - .9) / .9)) * (1 - .5 * q)).toFixed(3)})`;
    remateB.style.textShadow = `0 0 26px rgba(255,255,255,${(.3 * sale(clamp((t - 13.4) / .8))).toFixed(3)})`;

    // Ejes, marcas de semana y rótulos fijos
    // Empiezan cuando el titular ya ha dejado libre el eje vertical (x = margen izquierdo)
    const ay = sale(clamp((t - 2.7) / .45)), axp = sale(clamp((t - 2.72) / .55));
    ejeY.setAttribute('y2', f1(L.ejeY.y0 - (L.ejeY.y0 - L.ejeY.y1) * ay));
    const xEje = L.ejeX.x0 + (L.ejeX.x1 - L.ejeX.x0) * axp;
    ejeX.setAttribute('x2', f1(xEje));
    ejeY.style.visibility = ay > 0 ? 'visible' : 'hidden';    // sin trazo, el remate redondo dejaría un punto
    ejeX.style.visibility = axp > 0 ? 'visible' : 'hidden';
    flecha.style.opacity = clamp((axp - .92) / .08).toFixed(3);
    const ap = (e, t0, d = .5) => { const k = sale(clamp((t - t0) / d)); e.style.opacity = k.toFixed(3); return k; };
    const ke = ap(eje, 3.0); eje.style.transform = `translateY(${f1((1 - ke) * 14)}px)`;
    const kc = sale(clamp((t - 2.9) / .5)); cuenta.style.transform = `translateY(${f1((1 - kc) * 14)}px)`;
    cuenta.style.opacity = (kc * (1 - .22 * sale(clamp((t - 12.5) / .6)))).toFixed(3);   // cede el foco al remate

    const p = prog(t), n = Math.max(1, Math.round(1 + 51 * p)), vivo = t >= 3;
    cuentaN.textContent = String(n);
    // Al llegar a la semana 52, la cifra se enciende un instante
    const f52 = sale(clamp((t - 8.45) / .2)) * (1 - sale(clamp((t - 8.7) / .9)));
    cuentaN.style.color = mezcla(GREIGE, BLANCO, f52);
    cuentaN.style.textShadow = `0 0 24px rgba(255,255,255,${(.45 * f52).toFixed(3)})`;
    marcas.forEach((m, i) => { m.e.style.opacity = axp <= 0 || xEje + 1 < m.x ? 0 : (vivo && i < n ? .7 : .2); });

    // Punto de partida: late a los 2,85 y deja una onda
    const k0 = clamp((t - 2.85) / .4);
    origen.setAttribute('r', f1(6 * (k0 > 0 ? pop(k0) : 0)));
    const ko = clamp((t - 2.95) / .8);
    onda0.setAttribute('r', f1(6 + 30 * sale(ko))); onda0.style.opacity = (ko > 0 && ko < 1 ? .6 * (1 - ko) : 0).toFixed(3);

    // Focos: arriba se enciende (9,0), abajo toma el relevo (10,6), la distancia al final (13,15)
    const enc = sale(clamp((t - 9) / .5)), suelta = sale(clamp((t - 10.6) / .5));
    const fA = enc * (1 - .7 * suelta), bajaB = enc * (1 - suelta), fD = sale(clamp((t - 13.15) / .6));

    // Líneas, relleno del hueco, cabezas y rótulos que las siguen
    const ptsA = trazo(p, YA), ptsB = trazo(p, YB);
    const A = { x: X(p), y: YA(p) }, B = { x: X(p), y: YB(p) };
    const dA = vivo ? 'M' + ptsA.join('L') : '', dB = vivo ? 'M' + ptsB.join('L') : '';
    lineaA.setAttribute('d', dA); brilloA.setAttribute('d', dA); lineaB.setAttribute('d', dB);
    const dH = vivo ? 'M' + ptsA.join('L') + 'L' + ptsB.slice().reverse().join('L') + 'Z' : '';
    relleno.setAttribute('d', dH); trama.setAttribute('d', dH);
    relleno.style.opacity = (.85 + .15 * fD).toFixed(3);
    trama.style.opacity = (.18 + .08 * fD).toFixed(3);
    lineaA.setAttribute('stroke', mezcla(GREIGE, BLANCO, enc));
    lineaA.setAttribute('stroke-width', (3.5 + .7 * enc).toFixed(2));
    brilloA.style.opacity = (.85 * fA + .1 * fD).toFixed(3);
    lineaB.style.opacity = (.85 * (1 - .35 * bajaB)).toFixed(3);

    // Destello que recorre la línea encendida (9,0–9,9)
    if (!Lbarrido) { Lbarrido = barrido.getTotalLength(); }
    const kb = clamp((t - 9.0) / .9), seg = 160;
    barrido.style.strokeDasharray = `${seg} ${f1(Lbarrido + seg)}`;
    barrido.style.strokeDashoffset = f1(seg - io(kb) * (Lbarrido + seg));
    barrido.style.opacity = (kb > 0 && kb < 1 ? .9 * Math.sin(Math.PI * kb) : 0).toFixed(3);

    const kv = vivo ? 1 : 0;
    [[puntoA, A], [haloA, A], [puntoB, B], [haloB, B], [ondaA, A], [luz, A]].forEach(([e, P]) => { e.setAttribute('cx', f1(P.x)); e.setAttribute('cy', f1(P.y)); });
    puntoA.style.opacity = kv; puntoB.style.opacity = (kv * (1 - .4 * bajaB)).toFixed(3);
    haloA.style.opacity = (kv * (.75 + .25 * fA)).toFixed(3);
    haloA.setAttribute('r', f1(30 + 14 * fA));
    haloB.style.opacity = (kv * .45 * (1 - .5 * bajaB)).toFixed(3);
    luz.style.opacity = (kv * (.12 + .14 * fA + .06 * fD)).toFixed(3);
    const kw = clamp((t - 8.5) / .9);
    ondaA.setAttribute('r', f1(8 + 46 * sale(kw))); ondaA.style.opacity = (kw > 0 && kw < 1 ? .55 * (1 - kw) : 0).toFixed(3);

    const kr = sale(clamp((t - 3.2) / .5));
    rotA.style.opacity = kr.toFixed(3);
    rotA.style.transform = `translate(${f1(A.x + L.sep)}px, ${f1(A.y - 14)}px) translateY(-100%)`;
    rotA.style.color = mezcla(GREIGE, BLANCO, fA);
    rotB.style.opacity = (kr * (1 - .3 * bajaB)).toFixed(3);
    rotB.style.transform = `translate(${f1(B.x + L.sep)}px, ${f1(B.y + 12)}px)`;

    // La llave crece desde el centro entre las dos cabezas (7,0) y las sigue; se enciende con el remate
    const g = sale(clamp((t - 7) / .6));
    const y1 = A.y + 18, y2 = B.y - 18, ym = (y1 + y2) / 2, hm = Math.max(0, (y2 - y1) / 2) * g;
    const dL = g > 0 ? llaveD(A.x + L.sep, ym - hm, ym + hm, L.llave) : '';
    llave.setAttribute('d', dL); llaveBrillo.setAttribute('d', dL);
    llave.style.opacity = clamp(g * 3).toFixed(3);
    llave.setAttribute('stroke', mezcla(GREIGE, BLANCO, fD));
    llaveBrillo.style.opacity = (.7 * fD).toFixed(3);
    const kh = sale(clamp((t - 7.3) / .5));
    rotH.style.opacity = kh.toFixed(3);
    rotH.style.transform = `translate(${f1(A.x + L.sep + 2 * L.llave + 16 + (1 - kh) * 14)}px, ${f1(ym)}px) translateY(-50%)`;
    rotH.style.color = mezcla(GREIGE, BLANCO, fD);
    rotH.style.textShadow = `0 0 22px rgba(255,255,255,${(.35 * fD).toFixed(3)})`;

    // Riesgos: cada etiqueta cae con un pequeño rebote; en la primera fila, un hilo discontinuo la ata a la línea de abajo
    for (const R of riesgos) {
      const k = clamp((t - R.t0) / .5), ko2 = sale(clamp((t - R.t0) / .22));
      R.e.style.opacity = ko2.toFixed(3);
      R.e.style.transform = `translateY(${f1((1 - sale(k)) * 16)}px) scale(${(.72 + .28 * pop(k)).toFixed(4)})`;
      const cx = R.caja.offsetLeft + R.e.offsetLeft + R.e.offsetWidth / 2, top = R.caja.offsetTop + R.e.offsetTop;
      const fila1 = R.e.offsetTop < 8, u = clamp((cx - L.x0) / (L.xf - L.x0));
      const ya = YB(u) + 8, yb = top - 4, kh2 = sale(clamp((t - R.t0 + .12) / .3));
      R.hilo.setAttribute('x1', f1(cx)); R.hilo.setAttribute('x2', f1(cx));
      R.hilo.setAttribute('y1', f1(ya)); R.hilo.setAttribute('y2', f1(ya + (yb - ya) * kh2));
      R.hilo.style.opacity = fila1 && cx < X(p) && kh2 > 0 ? .45 : 0;
    }
  }

  global.PIEZA = { montar, pintar, duracion: T };
})(window);
