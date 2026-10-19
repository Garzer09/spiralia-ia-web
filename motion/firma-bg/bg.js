/*
 * Fondo de la portada de Spiralia AI · bucle de 12 s, sin texto ni sonido.
 * La S de Spiralia, enorme y en perspectiva, con pulsos de luz que recorren sus seis hebras:
 * el trabajo que fluye por los procesos. Detrás, un eco de la S, luz ambiental y polvo en suspensión.
 *
 * Todo es función periódica de t (periodo T): el último fotograma enlaza con el primero sin corte.
 * Sin azar en tiempo de ejecución: las partículas salen de un generador con semilla fija.
 * El mismo fichero sirve para 16:9 (escritorio) y 9:16 (móvil): la composición lee su tamaño.
 */
(function (global) {
  'use strict';
  const T = 12, NS = 'http://www.w3.org/2000/svg', TAU = Math.PI * 2;
  const CLARO = '#E0DFDA';
  let W, H, vertical, raiz, camara, eco, primer, cometas = [], motas = [], auras = [], G;

  const h = (tag, cls, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; (padre || raiz).append(e); return e; };
  const s = (tag, attrs, padre) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); padre.append(e); return e; };
  const fase = t => (t % T) / T;
  // Generador con semilla fija (las motas salen siempre en el mismo sitio)
  const lcg = seed => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  function hebras(svg, opts) {
    const g = s('g', {}, svg);
    G.paths.forEach(d => s('path', { d, fill: 'none', stroke: opts.stroke, 'stroke-width': opts.width, 'stroke-linecap': 'round' }, g));
    return g;
  }

  function montar(r) {
    raiz = r; G = global.SGEOM;
    W = +r.dataset.width; H = +r.dataset.height; vertical = H > W;
    r.style.width = W + 'px'; r.style.height = H + 'px';
    h('div', 'noche');

    // Luz ambiental: tres manchas muy difusas que orbitan despacio
    [
      { c: 'rgba(23,68,103,.5)', r: .5, x: .72, y: .42, ax: .06, ay: .05, k: 1, f: 0 },
      { c: 'rgba(52,104,134,.22)', r: .36, x: .84, y: .74, ax: .05, ay: .06, k: 1, f: 2.1 },
      { c: 'rgba(13,49,80,.55)', r: .6, x: .25, y: .95, ax: .07, ay: .03, k: 1, f: 4.2 },
    ].forEach(a => { const e = h('div', 'aura'); e.style.background = `radial-gradient(closest-side, ${a.c}, transparent)`; auras.push({ e, ...a }); });

    // La S: un eco grande y lento detrás, y la S principal en perspectiva
    const [vx, vy, vw, vh] = G.view;
    const alto = vertical ? H * .78 : H * 1.32, k = alto / vh;
    const cx = vertical ? W * .5 : W * .7, cy = vertical ? H * .34 : H * .52;

    const ecoW = h('div', 'capa');
    const ecoSvg = s('svg', { viewBox: G.view.join(' '), width: vw * k * 1.9, height: vh * k * 1.9 }, ecoW);
    hebras(ecoSvg, { stroke: 'rgba(224,223,218,.045)', width: .7 });
    Object.assign(ecoW.style, { left: (cx - vw * k * .95 + (vertical ? 0 : W * .06)) + 'px', top: (cy - vh * k * .95) + 'px' });
    eco = ecoW;

    // Primer término desenfocado: unas hebras enormes que cruzan una esquina y dan profundidad
    const cerca = h('div', 'capa cerca'), kc = k * (vertical ? 2.6 : 2.9);
    hebras(s('svg', { viewBox: G.view.join(' '), width: vw * kc, height: vh * kc }, cerca), { stroke: 'rgba(224,223,218,.09)', width: 1.6 });
    Object.assign(cerca.style, { left: (vertical ? -vw * kc * .62 : -vw * kc * .55) + 'px', top: (vertical ? H * .42 : H * .18) + 'px' });
    primer = cerca;

    camara = h('div', 'capa camara');
    Object.assign(camara.style, { left: (cx - vw * k / 2) + 'px', top: (cy - vh * k / 2) + 'px', width: vw * k + 'px', height: vh * k + 'px' });
    const svg = s('svg', { viewBox: G.view.join(' '), width: vw * k, height: vh * k }, camara);
    const defs = s('defs', {}, svg);
    // Las hebras se apagan hacia la izquierda, donde va el titular
    const lg = s('linearGradient', { id: 'hebra', gradientUnits: 'userSpaceOnUse', x1: vx, y1: 0, x2: vx + vw, y2: 0 }, defs);
    s('stop', { offset: 0, 'stop-color': CLARO, 'stop-opacity': vertical ? .2 : .1 }, lg);
    s('stop', { offset: 1, 'stop-color': CLARO, 'stop-opacity': .26 }, lg);
    const f = s('filter', { id: 'halo', x: '-20%', y: '-20%', width: '140%', height: '140%' }, defs);
    s('feGaussianBlur', { stdDeviation: 2.6 }, f);
    hebras(svg, { stroke: 'url(#hebra)', width: .9 });

    // Pulsos de luz: cola larga y tenue, cuerpo y cabeza brillante; uno o dos por hebra
    const capaHalo = s('g', { filter: 'url(#halo)' }, svg), capaNucleo = s('g', {}, svg);
    G.paths.forEach((d, i) => {
      const L = G.len[i];
      const fases = i % 2 ? [i * .137, i * .137 + .5] : [i * .137 + .25];
      fases.forEach(f0 => {
        const partes = [
          [capaHalo, 150, 3.6, .3],
          [capaNucleo, 230, .95, .1],
          [capaNucleo, 130, 1.1, .2],
          [capaNucleo, 60, 1.3, .42],
          [capaNucleo, 18, 1.6, .85],
        ].map(([g, len, w, op]) => {
          const p = s('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': w, 'stroke-linecap': 'round', opacity: op }, g);
          p.style.strokeDasharray = `${len} ${L + 300}`;
          return { p, len };
        });
        cometas.push({ partes, L, f0 });
      });
    });

    // Polvo en suspensión
    const rnd = lcg(20261019), n = vertical ? 46 : 70;
    for (let i = 0; i < n; i++) {
      const e = h('i', 'mota'), r0 = .6 + rnd() * 1.9;
      Object.assign(e.style, { width: r0 * 2 + 'px', height: r0 * 2 + 'px' });
      motas.push({ e, x: rnd() * W, y: rnd() * H, ax: 6 + rnd() * 18, ay: 10 + rnd() * 26, m: 1 + Math.floor(rnd() * 3), f: rnd() * TAU, a: .12 + rnd() * .4 });
    }

    h('div', 'vineta');
    h('div', vertical ? 'sombra-abajo' : 'sombra-izq');
  }

  function pintar(t) {
    const p = fase(t), w = TAU * p;
    for (const a of auras) {
      const x = (a.x + a.ax * Math.cos(w * a.k + a.f)) * W, y = (a.y + a.ay * Math.sin(w * a.k + a.f)) * H, R = a.r * Math.max(W, H);
      a.e.style.transform = `translate(${(x - R).toFixed(1)}px, ${(y - R).toFixed(1)}px)`;
      a.e.style.width = a.e.style.height = (2 * R).toFixed(0) + 'px';
    }
    primer.style.transform = `translate(${(30 * Math.cos(w + .8)).toFixed(1)}px, ${(22 * Math.sin(w + .8)).toFixed(1)}px) rotate(${(-3 * Math.sin(w)).toFixed(3)}deg)`;
    eco.style.transform = `rotate(${(4 * Math.sin(w)).toFixed(3)}deg) scale(${(1 + .02 * Math.cos(w)).toFixed(4)})`;
    const ry = (vertical ? -6 : -13) + 3 * Math.sin(w), rx = 6 + 2 * Math.cos(w), rz = 2 * Math.sin(w + 1), sc = 1 + .025 * Math.sin(w + .6);
    camara.style.transform = `perspective(2400px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
    for (const c of cometas) {
      // Cabeza del pulso de 0 a L + 150: entra por un extremo y sale por el otro antes de volver a empezar
      const cabeza = ((p + c.f0) % 1) * (c.L + 240);
      for (const q of c.partes) q.p.style.strokeDashoffset = (q.len - cabeza).toFixed(1);
    }
    for (const m of motas) {
      const x = m.x + m.ax * Math.cos(w + m.f), y = m.y + m.ay * Math.sin(w + m.f * 1.3);
      m.e.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      m.e.style.opacity = (m.a * (.55 + .45 * Math.sin(w * m.m + m.f))).toFixed(3);
    }
  }

  global.FONDO = { montar, pintar, duracion: T };
})(window);
