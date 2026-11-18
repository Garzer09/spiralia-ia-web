// Piezas de la página. Cada una tiene arm (preparada, oculta), play (se reproduce) y finish (estado final).
(() => {
  'use strict';
  const { $, $$, still, piece, data, ev } = window.SP;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const later = () => { let ts = []; return { at: (ms, fn) => ts.push(setTimeout(fn, ms)), clear: () => { ts.forEach(clearTimeout); ts = []; } }; };
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - x, 3);
  const lcg = s => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  // WebM (VP9) donde se decodifica bien; Safari y los navegadores de iOS van con MP4 (H.264, por hardware):
  // su VP9 es por software y a veces reproduce sin pintar, en negro
  const safari = /^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i.test(navigator.userAgent) || /iP(hone|ad|od)/.test(navigator.userAgent);
  const WEBM = !safari && !!document.createElement('video').canPlayType('video/webm; codecs="vp9"');

  // Piezas que anima el CSS: .anim las deja preparadas y .play lanza las transiciones (con retrasos por --i)
  const css = {
    arm: el => { el.classList.add('anim'); el.classList.remove('play'); },
    play: el => { el.classList.remove('play'); void el.offsetWidth; requestAnimationFrame(() => el.classList.add('play')); },
    finish: el => el.classList.remove('anim', 'play'),
  };
  // Lo que nadie dice en el comité · las fases de Rumbo · la preparación de la formación · la autonomía en Spiral
  // (la escalera de Lo que hacemos la anima scroll.js con el scroll)
  ['voces', 'fases', 'prep', 'aut'].forEach(n => piece(n, css));

  // M2 · Lo que pagas frente a lo que se usa: la línea de lo pagado se queda arriba, la del uso sube y se enfría,
  // y el hueco entre las dos (pagado y sin usar) se rellena al final. Reloj propio de 3,3 s, sin depender del scroll
  piece('pago', (() => {
    let raf = 0;
    const partes = el => el._p || (el._p = ['pago', 'line', 'hueco', 'cab', 'pk', 'en', 'lpago', 'lhueco'].reduce((o, k) => (o[k] = $('.ch-' + k, el), o), {}));
    function pinta(el, t) {
      const P = partes(el), L = P.line.getTotalLength(), u = sale(clamp((t - .5) / 2));
      P.pago.style.strokeDashoffset = (1 - sale(clamp(t / .7))).toFixed(4);
      P.lpago.style.opacity = clamp((t - .4) / .4);
      P.line.style.strokeDashoffset = (1 - u).toFixed(4);
      const pt = P.line.getPointAtLength(L * u);
      P.cab.setAttribute('cx', pt.x.toFixed(1)); P.cab.setAttribute('cy', pt.y.toFixed(1));
      P.cab.style.opacity = u > .01 && u < .99 ? 1 : 0;
      P.pk.style.opacity = clamp((u - .16) / .08); P.en.style.opacity = clamp((u - .94) / .06);
      P.hueco.style.opacity = clamp((t - 2.3) / .7); P.lhueco.style.opacity = clamp((t - 2.7) / .5);
    }
    return {
      arm: el => { cancelAnimationFrame(raf); pinta(el, 0); },
      play: el => {
        cancelAnimationFrame(raf); const t0 = performance.now();
        const f = now => { const t = (now - t0) / 1000; pinta(el, t); if (t < 3.3) raf = requestAnimationFrame(f); };
        raf = requestAnimationFrame(f);
      },
      finish: el => { cancelAnimationFrame(raf); pinta(el, 9); },
    };
  })());

  // M3 · La nube de lo que se acumula mientras esperas, que se ordena en un plan de cinco productos.
  // Cada riesgo está en su columna (el plan); desordenado, se desplaza con transform a un sitio al azar del campo
  // (semilla fija) y flota. En pantallas estrechas no se desordena: las columnas se apilan y aparecen en orden
  piece('nube', (() => {
    let el, campo, chips, btn, orden = true, pulsado = false, L = {};
    const T = later(), estrecho = () => matchMedia('(max-width: 760px)').matches;
    // Desorden legible: cada riesgo cae en una celda al azar de una rejilla de 5 × 4 que cubre el campo, con algo de holgura
    function dispersa() {
      const R = lcg(20261021), w = campo.clientWidth, h = campo.clientHeight, b = campo.getBoundingClientRect();
      const celdas = chips.map((c, i) => i).sort(() => R() - .5), cw = w / 5, ch = h / 4;
      chips.forEach(c => { c.style.transition = 'none'; c.style.transform = 'none'; });
      chips.forEach((c, k) => {
        const r = c.getBoundingClientRect(), col = celdas[k] % 5, fila = Math.floor(celdas[k] / 5) % 4;
        const x = Math.min(w - r.width, col * cw + R() * Math.max(0, cw - r.width)), y = fila * ch + (ch - r.height) / 2 + (R() - .5) * ch * .35;
        c._d = `translate(${(x - r.left + b.left).toFixed(0)}px,${(y - r.top + b.top).toFixed(0)}px) rotate(${((R() - .5) * 7).toFixed(1)}deg)`;
        c.style.setProperty('--fd', (5 + R() * 4).toFixed(2) + 's'); c.style.setProperty('--fo', (-R() * 6).toFixed(2) + 's');
      });
      void campo.offsetWidth; chips.forEach(c => { c.style.transition = ''; });
    }
    function pon(o, sin) {
      orden = o || estrecho(); el.classList.toggle('ordenada', orden);
      chips.forEach((c, i) => {
        c.style.transitionDelay = sin ? '0s' : ((i % 4) * .06 + Math.floor(i / 4) * .1).toFixed(2) + 's';
        c.style.transform = orden ? 'none' : c._d;
      });
      btn.textContent = orden ? L.desordenar : L.ordenar; btn.hidden = still() || estrecho();
    }
    function init(r) {
      if (el) return; el = r; campo = $('.nube-campo', el); chips = $$('.chip', el); btn = $('.nube-btn', el);
      Object.keys(el.dataset).forEach(k => { if (k.startsWith('l')) L[k.slice(1).toLowerCase()] = el.dataset[k]; });
      btn.addEventListener('click', () => { pulsado = true; T.clear(); if (orden) dispersa(); pon(!orden); });
      let rt = 0;
      addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (!orden) { dispersa(); pon(false, true); } else pon(true, true); }, 200); }, { passive: true });
    }
    return {
      arm: r => { init(r); dispersa(); pon(false, true); el.classList.add('anim'); },
      play: r => { init(r); el.classList.add('play'); if (!pulsado) T.at(estrecho() ? 0 : 2800, () => pon(true)); },
      finish: r => { init(r); T.clear(); el.classList.remove('anim'); pon(true, true); },
    };
  })());

  // M6 · Radar: un barrido que da la vuelta cada 6 s sobre 30 puntos (lo que sale cada semana, semilla fija). Cada punto
  // se enciende cuando pasa el barrido y se apaga; cuatro se quedan marcados (lo que importa a tu empresa). Quieto, el
  // barrido no gira y se ven los cuatro marcados
  piece('radar', (() => {
    const NS = 'http://www.w3.org/2000/svg', VUELTA = 6;
    const puntos = el => {
      const g = $('.radar-puntos', el); if (g.childElementCount) return;
      const R = lcg(20261022);
      for (let i = 0; i < 30; i++) {
        const a = R() * 360, r = 34 + Math.sqrt(R()) * 136, rad = (a - 90) * Math.PI / 180, c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', (200 + r * Math.cos(rad)).toFixed(1)); c.setAttribute('cy', (200 + r * Math.sin(rad)).toFixed(1));
        c.setAttribute('r', i < 4 ? 5.5 : 3);
        if (i < 4) c.classList.add('si');
        // El destello llega justo cuando pasa el barrido: el ángulo del punto, en segundos de la vuelta
        c.style.animationDelay = (a / 360 * VUELTA - VUELTA).toFixed(2) + 's';
        g.appendChild(c);
      }
    };
    return {
      arm: el => { puntos(el); el.classList.remove('gira', 'fin'); },
      play: el => { puntos(el); el.classList.add('gira'); },
      finish: el => { puntos(el); el.classList.remove('gira'); el.classList.add('fin'); },
    };
  })());

  // M4 · SPIRAL sobre la S de Spiralia hecha de puntos. Los puntos llegan desde una nube a su hebra (setProgress,
  // que mueve el scroll o el reloj de play), se encienden las seis letras y una luz recorre la hebra central hasta
  // la fase abierta. Los puntos se pintan en un <canvas> encima del SVG; las letras y la hebra encendida son SVG
  const SP_STRAND = 3, SP_AT = [.05, .23, .41, .59, .77, .955];
  piece('spiral', (() => {
    const T = later(); let built = false, len = 0, prog, sts = [], items = [], abierto = -1, raiz0 = null;
    let cv, ctx, puntos = [], p = 0, paso = 0, dpr = 1, sc = 1, vivo = false, raf = 0, reloj = 0;
    const [VX, VY, VW, VH] = window.SGEOM ? window.SGEOM.view : [234, 146, 292, 470];
    function medir() {
      if (!cv) return; const r = cv.getBoundingClientRect(); if (!r.width) return;
      dpr = Math.min(2, devicePixelRatio || 1); sc = r.width / VW;
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); pinta();
    }
    function pinta(t) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
      const luz = paso ? SP_AT[paso - 1] : -1, tt = (t || 0) / 1000;
      for (const d of puntos) {
        const q = sale(clamp((p * 1.6 - d.dl) / .6)), x = d.sx + (d.x - d.sx) * q, y = d.sy + (d.y - d.sy) * q;
        const on = d.k === SP_STRAND && d.f <= luz && q > .98;
        const a = on ? 1 : (.26 + .5 * q) * (vivo ? .85 + .15 * Math.sin(tt * 1.4 + d.ph) : 1);
        ctx.fillStyle = on ? `rgba(255,255,255,${a})` : `rgba(224,223,218,${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc((x - VX) * sc, (y - VY) * sc, (on ? 1.9 : 1.25) * Math.max(1, sc * .9), 0, 6.2832); ctx.fill();
      }
    }
    // Brillo lento mientras la espiral se ve (no con «reducir movimiento» ni quieta)
    const bucle = t => { pinta(t); if (vivo) raf = requestAnimationFrame(bucle); };
    function build(el) {
      if (built) return; built = true; raiz0 = el;
      const svg = $('.sp-svg', el), G = window.SGEOM, NS = 'http://www.w3.org/2000/svg';
      prog = document.createElementNS(NS, 'path'); prog.setAttribute('class', 'prog'); prog.setAttribute('d', G.paths[SP_STRAND]); svg.append(prog);
      len = prog.getTotalLength(); prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len;
      // Puntos: cada hebra muestreada cada 6 unidades; salen de una nube alrededor de la S (semilla fija)
      const R = lcg(5021966), cx = VX + VW / 2, cy = VY + VH / 2;
      G.paths.forEach((d, k) => {
        const pa = document.createElementNS(NS, 'path'); pa.setAttribute('d', d); svg.append(pa);
        const L = pa.getTotalLength(), n = Math.floor(L / 6);
        for (let i = 0; i <= n; i++) {
          const q = pa.getPointAtLength(L * i / n), ang = R() * 6.2832, rad = 150 + R() * 210;
          puntos.push({ x: q.x, y: q.y, sx: cx + Math.cos(ang) * rad * .8, sy: cy + Math.sin(ang) * rad, k, f: i / n, dl: k * .05 + (i / n) * .35, ph: R() * 6.28 });
        }
        pa.remove();
      });
      'SPIRAL'.split('').forEach((Lt, i) => {
        const pt = prog.getPointAtLength(len * SP_AT[i]), g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'st'); g.innerHTML = `<circle cx="${pt.x}" cy="${pt.y}" r="13"/><text x="${pt.x}" y="${pt.y}">${Lt}</text>`;
        g.addEventListener('click', () => pick(el, i + 1)); svg.append(g); sts.push(g);
      });
      cv = $('.sp-dots', el); ctx = cv && cv.getContext('2d');
      if (window.ResizeObserver && cv) new ResizeObserver(medir).observe(cv); else addEventListener('resize', medir);
      medir();
      if (!still() && !matchMedia('(prefers-reduced-motion: reduce)').matches) new IntersectionObserver(([e]) => {
        vivo = e.isIntersecting; cancelAnimationFrame(raf); if (vivo) raf = requestAnimationFrame(bucle); else pinta();
      }).observe(el);
      items = $$('.sp-steps li', el);
      $$('.sp-b', el).forEach(b => b.addEventListener('click', () => { if (window.SP.spiral.onPick) window.SP.spiral.onPick(+b.dataset.n); else pick(el, +b.dataset.n); }));
      $('.replay', el).addEventListener('click', () => play(el));
    }
    const setP = v => { p = clamp(v); raiz0 && raiz0.classList.toggle('drawn', p > .82); if (!vivo) pinta(); };
    function set(el, n, openAll) {
      paso = n; prog.style.strokeDashoffset = n ? len * (1 - SP_AT[n - 1]) : len;
      sts.forEach((g, i) => { g.classList.toggle('on', i < n); g.classList.toggle('cur', i === n - 1); });
      items.forEach((li, i) => { const o = openAll || i === n - 1; li.classList.toggle('open', o); li.classList.toggle('on', i < n); $('.sp-b', li).setAttribute('aria-expanded', String(o)); });
      // Sin fijar, abrir otro paso cambia la altura de la página: ScrollTrigger recalcula (scroll.js, con el scroll parado)
      const k = openAll ? 7 : n; if (k !== abierto && !SPs.guiada && !still()) window.SP.alto(); abierto = k;
      if (!vivo) pinta();
      if (SPs.onSet) SPs.onSet(n);
    }
    // Guiada por el scroll, la formación de la S la lleva el scroll; si no, pulsar una fase la deja formada
    function pick(el, n) { T.clear(); cancelAnimationFrame(reloj); el.classList.remove('anim'); el.classList.add('done'); if (!SPs.guiada) setP(1); set(el, n); }
    // La capa de scroll (scroll.js) mueve los pasos con el scroll (guiada) y la formación de la S (setProgress)
    const raiz = () => $('.spiral');
    const SPs = window.SP.spiral = {
      pick: n => { const el = raiz(); build(el); pick(el, n); },
      play: () => play(raiz()), finish: () => finish(raiz()),
      setProgress: v => { const el = raiz(); if (!el) return; build(el); setP(v); },
      onPick: null, onSet: null, guiada: false,
    };
    function arm(el) { build(el); el.classList.add('anim'); el.classList.remove('drawn', 'done'); setP(0); set(el, 0); }
    function play(el) {
      arm(el); cancelAnimationFrame(reloj); const t0 = performance.now();
      const f = now => { const k = clamp((now - t0) / 2200); setP(k); if (k < 1) reloj = requestAnimationFrame(f); };
      reloj = requestAnimationFrame(f);
      for (let n = 1; n <= 6; n++) T.at(2300 + (n - 1) * 1550, () => set(el, n));
      T.at(2300 + 5 * 1550 + 900, () => el.classList.add('done'));
    }
    function finish(el) { build(el); T.clear(); cancelAnimationFrame(reloj); el.classList.remove('anim'); el.classList.add('drawn', 'done'); setP(1); set(el, 6, true); }
    // Al imprimir se abren los seis pasos; después vuelve lo que había (sin reproducir, a medias o con un paso abierto)
    // y la página recupera su altura. Fijada, lo repone scroll.js
    let previo = null;
    document.addEventListener('sp:imprime', () => {
      const el = raiz(); if (!el) return;
      const c = el.classList, abiertos = items.filter(li => li.classList.contains('open')).length;
      previo = !built || (c.contains('anim') && !c.contains('drawn')) ? 'arm' : abiertos === 6 ? null
        : !c.contains('done') ? 'play' : items.filter(li => li.classList.contains('on')).length;
    });
    addEventListener('afterprint', () => {
      const el = raiz(), pr = previo; previo = null;
      if (!el || pr === null || SPs.guiada) return;
      pr === 'arm' ? arm(el) : pr === 'play' ? play(el) : pick(el, pr);
    });
    return { arm, play: el => { if (!SPs.guiada) play(el); }, finish };
  })());

  // M5 · Antes y después, por perfil (los ejemplos de la Formación a medida) (reloj propio: aplicar(t) enciende lo que tiene data-at ≤ t)
  // Cada columna arranca al estar en pantalla: en móvil el «después» va debajo y no debe animarse fuera de vista.
  // Apiladas (móvil), lo que está a la vista no espera al reloj: al bajar (o al llegar de golpe, con un ancla o al
  // recargar) no queda ninguna tarjeta vacía. Tras un clic (un perfil, «Ver de nuevo», reanudar), lo que ya se veía
  // sigue al reloj y solo se adelanta lo que entra al desplazarse
  piece('demo', (() => {
    const FIN = 10.6, CORTE = 3.5; let el, scene, pbtn, idx = 0, t = FIN, t0 = 0, raf = 0, run = false, els = [], L = {}, cols = [], vistas = [], io = null, pos = [], apilada = false, hasta = 0, pulsada = false;
    const D = data.demo || [];
    const cuenta = ([p, a]) => `${p} ${p === 1 ? L.paso : L.pasos} · ${a} ${a === 1 ? L.app : L.apps}`;
    function html(x) {
      const st = x.antes.map((s, i) => `<li data-at="${(.4 + .42 * i).toFixed(2)}">${esc(s.t)}<i>${esc(s.app)}</i></li>`).join('');
      const w = x.encargo.split(' '), enc = w.map((p, j) => `<span class="w" data-at="${(4.1 + 1.5 * j / w.length).toFixed(2)}">${esc(p)}</span>`).join(' ');
      const src = x.fuentes.map((f, i) => `<li data-at="${(5.8 + .3 * i).toFixed(2)}">${esc(f)}</li>`).join('');
      const bor = x.borrador.map((l, i) => `<span data-at="${(6.8 + .55 * i).toFixed(2)}">${esc(l)}</span>`).join('');
      return `<div><span class="dm-lbl">${esc(L.antes)}</span><ol class="dm-steps">${st}</ol><p class="dm-count" data-at="3.1">${esc(cuenta(x.cuenta[0]))}</p></div>
        <div><span class="dm-lbl" data-at="3.5">${esc(L.despues)}</span><div class="dm-card" data-at="3.5"><p class="dm-enc">${enc}</p><ul class="dm-src">${src}</ul>
        <div class="dm-bor">${bor}</div><span class="dm-seal" data-at="9.2">${esc(L.firma)}</span></div>
        <p class="dm-count dm-after" data-at="9.6">${esc(cuenta(x.cuenta[1]))}</p><p class="dm-tuyo" data-at="10">${esc(x.tuyo)}</p></div>`;
    }
    function render(i) {
      idx = i; scene.innerHTML = html(D[i]); els = $$('[data-at]', scene).map(e => [e, +e.dataset.at]);
      $$('.demo-profiles button', el).forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
      cols = $$(':scope > div', scene); vistas = cols.map(() => false);
      if (io) { io.disconnect(); cols.forEach(c => io.observe(c)); }
      window.SP.alto();
    }
    const aplicar = tt => { t = tt; for (const [e, a] of els) e.classList.toggle('on', a <= tt); };
    // Altura de cada elemento dentro de la escena y, con las columnas apiladas, hasta dónde se ve (en segundos del reloj)
    const medir = () => {
      apilada = cols.length > 1 && cols[1].offsetTop > cols[0].offsetTop + 10;
      const y0 = scene.getBoundingClientRect().top; pos = els.map(([e, a]) => [e.getBoundingClientRect().top - y0, a]);
    };
    const alcance = () => { const lim = innerHeight * .88 - scene.getBoundingClientRect().top; let m = 0; for (const [y, a] of pos) if (y < lim && a > m) m = a; return m; };
    // Apiladas, el reloj arranca en lo primero que queda a la vista: lo que ya está por encima de la pantalla no se espera
    const desde = () => {
      if (!apilada) return 0;
      const arriba = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) - scene.getBoundingClientRect().top;
      let m = FIN; for (const [y, a] of pos) if (y >= arriba && a < m) m = a;
      return m < FIN ? Math.max(0, m - .4) : 0;
    };
    function btn() { pbtn.hidden = still() || (!run && t >= FIN); pbtn.textContent = run ? '❚❚ ' + L.pause : '▶ ' + L.play; }
    // El reloj espera en 0 a que se vea la demo y justo antes de CORTE a que se vea el «después»
    function tick(ts) {
      let tt = (ts - t0) / 1000;
      const tope = t < CORTE && !vistas[1] ? (t <= 0 && !vistas[0] ? 0 : CORTE - .01) : FIN;
      if (tt > tope && t <= tope) { tt = tope; t0 = ts - tope * 1000; }
      // Adelanta el reloj hasta lo que se ve, salvo lo que ya se veía al pulsar (hasta)
      const m = apilada ? alcance() : 0; if (m > hasta) { hasta = m; if (m > tt) { tt = m; t0 = ts - m * 1000; } }
      if (tt >= FIN) { aplicar(FIN); run = false; btn(); return; }
      aplicar(tt); raf = requestAnimationFrame(tick);
    }
    function go(from, sola) { cancelAnimationFrame(raf); medir(); hasta = apilada && !sola ? alcance() : 0; t0 = performance.now() - from * 1000; run = true; btn(); raf = requestAnimationFrame(tick); }
    // sola: la primera vez, al entrar en pantalla (no la pide un clic)
    function start(i, sola) {
      cancelAnimationFrame(raf); render(i);
      if (still()) { el.classList.remove('anim'); aplicar(FIN); run = false; btn(); return; }
      el.classList.add('anim'); medir(); const f = desde(); aplicar(f); go(f, sola);
    }
    function init(root) {
      if (el) return; el = root; scene = $('.demo-scene', el); pbtn = $('.demo-pause', el);
      io = new IntersectionObserver(es => es.forEach(e => { const k = cols.indexOf(e.target); if (k >= 0) vistas[k] = e.isIntersecting; }), { rootMargin: '0px 0px -12% 0px' });
      addEventListener('resize', () => { if (run) medir(); }, { passive: true });
      Object.keys(el.dataset).forEach(k => { if (k.startsWith('l')) L[k.slice(1).toLowerCase()] = el.dataset[k]; });
      $('.demo-profiles', el).innerHTML = D.map(x => `<button type="button" aria-pressed="false"><b>${esc(x.perfil)}</b><span>${esc(x.tarea)}</span></button>`).join('');
      // Un clic manda: si llega antes de que la pieza entre en pantalla (perfil elegido con la demo a medio asomar),
      // la primera reproducción no vuelve al primer perfil
      const clic = f => () => { pulsada = true; f(); };
      $$('.demo-profiles button', el).forEach((b, i) => b.addEventListener('click', clic(() => start(i))));
      pbtn.addEventListener('click', clic(() => { if (run) { cancelAnimationFrame(raf); run = false; btn(); } else if (t < FIN) go(t); else start(idx); }));
      $('.demo-replay', el).addEventListener('click', clic(() => start(idx)));
    }
    return {
      arm: r => { init(r); el.classList.add('anim'); render(0); aplicar(0); pbtn.hidden = true; },
      play: r => { init(r); if (!pulsada) start(0, true); },
      finish: r => { init(r); cancelAnimationFrame(raf); run = false; el.classList.remove('anim'); render(idx); aplicar(FIN); btn(); },
    };
  })());

  // Vídeos de fondo en bucle (portada y cierre). El póster es el fotograma 0 y el vídeo entra con un fundido.
  // Con «reducir movimiento», Save-Data o conexión lenta no se descarga: queda el póster, que es un diseño terminado.
  // El archivo se elige al cargar según la orientación (vertical en móvil) y el formato que admita el navegador.
  const PAUSA = 'sp-fondo-pausado', reduced = matchMedia('(prefers-reduced-motion: reduce)'), SPfondo = {};
  const pausadoAntes = () => { try { return localStorage.getItem(PAUSA) === '1'; } catch (e) { return false; } };
  const recordar = v => { try { v ? localStorage.setItem(PAUSA, '1') : localStorage.removeItem(PAUSA); } catch (e) {} };
  function fondo(sec, btn) {
    const v = $('.hero-video, .cierre-video', sec), c = navigator.connection || {};
    if (!v || still() || c.saveData || /2g/.test(c.effectiveType || '') || sec.classList.contains('has-gl')) return; // con WebGL, el vídeo sobra
    const base = matchMedia('(max-aspect-ratio: 1/1)').matches ? sec.dataset.srcV : sec.dataset.srcH;
    // data-v: la huella que pone build.py, para que la caché no sirva un vídeo antiguo
    const url = base + (WEBM ? '.webm' : '.mp4') + (sec.dataset.v ? '?v=' + sec.dataset.v : '');
    let visto = false, cargado = false, user = pausadoAntes();
    // Etiqueta fija («Pausar la animación de fondo»); el estado lo dice aria-pressed
    const set = () => { if (!btn) return; btn.setAttribute('aria-pressed', String(user)); btn.setAttribute('aria-label', btn.dataset.pause); };
    const seguir = () => { if (visto && !user && !document.hidden) v.play().catch(() => sec.classList.add('no-video')); else v.pause(); };
    v.addEventListener('playing', () => { sec.classList.add('is-playing'); if (btn) btn.hidden = false; });
    new IntersectionObserver(([e]) => {
      visto = e.isIntersecting;
      if (visto && !cargado && !user) { cargado = true; v.src = url; }
      seguir();
    }, { threshold: .15 }).observe(sec);
    document.addEventListener('visibilitychange', seguir);
    reduced.addEventListener && reduced.addEventListener('change', e => { if (e.matches) { user = true; set(); seguir(); } });
    if (btn) {
      if (user) { btn.hidden = false; set(); }
      btn.addEventListener('click', () => {
        user = !user; recordar(user); set();
        if (!user && !cargado) { cargado = true; v.src = url; }
        seguir();
      });
    }
    return { pausar: () => v.pause(), seguir };
  }
  const hero = $('[data-hero]'), cierre = $('[data-firma]');
  let fondos = false;
  // Mientras se ve la película de apertura, el vídeo de la portada espera: no compite por la red
  const tras = f => document.documentElement.classList.contains('apertura') ? document.addEventListener('sp:apertura-fin', f, { once: true }) : f();
  addEventListener('load', () => (window.requestIdleCallback || setTimeout)(() => {
    fondos = true;
    if (hero) tras(() => { if (!SPfondo.hero) SPfondo.hero = fondo(hero, $('.hero-pause', hero)); });
    if (cierre) SPfondo.cierre = fondo(cierre, $('.cierre-pausa', cierre));
  }));
  // Si la portada pierde el WebGL (va lento), vuelve el vídeo
  if (hero) hero.addEventListener('sp:singl', () => { if (fondos && !SPfondo.hero) SPfondo.hero = fondo(hero, $('.hero-pause', hero)); });

  // La barra es transparente mientras la portada está detrás; sólida en cuanto deja de estarlo
  (() => {
    const bar = $('#bar'); if (!bar || !hero) return;
    // Sólida en cuanto el texto de la portada llega a la barra (así nunca se solapan); los controles del vídeo se van al dejarla
    const txt = $('.hero-in', hero), s = document.createElement('div');
    s.style.cssText = 'position:absolute;left:0;bottom:0;height:1px;width:1px'; hero.append(s);
    new IntersectionObserver(([e]) => bar.classList.toggle('over', e.boundingClientRect.top > 68 && !bar.classList.contains('open')),
      { threshold: [0, 1], rootMargin: '-68px 0px 0px 0px' }).observe(txt);
    new IntersectionObserver(([e]) => hero.classList.toggle('lejos', !e.isIntersecting), { rootMargin: '-68px 0px 0px 0px' }).observe(s);
  })();

  // CTA fijo en móvil: aparece al dejar la portada y se retira al llegar al cierre (que ya tiene el suyo).
  // El pie va justo después del cierre: si el cierre ha quedado arriba, el pie está en pantalla y tampoco se ve
  (() => {
    const f = $('.cta-fija'), pie = $('.foot'); if (!f || !hero || !cierre) return;
    let enHero = true, enCierre = false, enPie = false, enPaso = false;
    const set = () => f.classList.toggle('on', !enHero && !enCierre && !enPie && !enPaso);
    new IntersectionObserver(([e]) => { enHero = e.isIntersecting; set(); }).observe(hero);
    new IntersectionObserver(([e]) => { enCierre = e.isIntersecting; set(); }, { threshold: .1 }).observe(cierre);
    if (pie) new IntersectionObserver(([e]) => { enPie = e.isIntersecting; set(); }).observe(pie);
    // Donde la sección ya tiene su propia llamada (Rumbo), la fija se retira
    const propias = $$('[data-cta-propia]'), vistas = new Set();
    if (propias.length) { const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vistas.add(e.target) : vistas.delete(e.target)); enPaso = vistas.size > 0; set(); }, { threshold: .25 }); propias.forEach(x => io.observe(x)); }
  })();

  // Menú en móvil y tableta: hoja a pantalla completa, Esc para cerrar y el foco vuelve al botón.
  // Mientras está abierto, el resto de la página es inerte y el scroll suave se detiene (sp:menu)
  (() => {
    const bar = $('#bar'), btn = $('.menu-btn', bar), nav = $('#menu'); if (!btn) return;
    const fuera = [...$$('body > *:not(#bar):not(script)'), ...[...btn.parentElement.children].filter(x => x !== nav && x !== btn)];
    let estabaSobre = false;
    const abrir = on => {
      if (on === bar.classList.contains('open')) return;
      if (on) estabaSobre = bar.classList.contains('over');
      bar.classList.toggle('open', on); bar.classList.toggle('over', !on && estabaSobre);
      btn.setAttribute('aria-expanded', String(on)); btn.setAttribute('aria-label', on ? btn.dataset.close : btn.dataset.open);
      document.documentElement.style.overflow = on ? 'hidden' : '';
      document.documentElement.classList.toggle('menu-abierto', on);
      fuera.forEach(x => x.toggleAttribute('inert', on));
      document.dispatchEvent(new CustomEvent('sp:menu', { detail: on }));
      if (on) $('a', nav).focus();
    };
    btn.addEventListener('click', () => abrir(btn.getAttribute('aria-expanded') !== 'true'));
    $$('a', nav).forEach(a => a.addEventListener('click', () => abrir(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && bar.classList.contains('open')) { abrir(false); btn.focus(); } });
    matchMedia('(min-width: 981px)').addEventListener('change', e => e.matches && abrir(false));
  })();

  // Logos en movimiento lento: se duplica la fila para que el bucle no tenga salto (los duplicados no se leen)
  (() => {
    const l = $('.logos'); if (!l || still()) return;
    [...l.children].forEach(i => { const c = i.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $('img', c).alt = ''; l.append(c); });
    l.classList.add('run');
    // Se mueve más de 5 s junto a otro contenido: necesita un botón de pausa (WCAG 2.2.2).
    // Como la pausa del fondo: etiqueta fija («Pausar los logos») y el estado en aria-pressed
    const b = $('.marquee-pausa'); if (!b) return;
    b.hidden = false;
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(l.classList.toggle('parada'))));
  })();

  // Pestañas «Para ti» (patrón ARIA) y accesos por perfil desde la portada
  (() => {
    const box = $('[data-tabs]'); if (!box) return;
    const tabs = $$('[role=tab]', box), panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const lista = tabs[0].parentElement;
    // Si la lista se desplaza en horizontal (móvil), la pestaña activa queda a la vista sin mover la página
    const aLaVista = t => {
      if (lista.scrollWidth <= lista.clientWidth) return;
      const a = t.getBoundingClientRect().left - lista.getBoundingClientRect().left + lista.scrollLeft, b = a + t.offsetWidth;
      if (a < lista.scrollLeft) lista.scrollLeft = a - 12;
      else if (b > lista.scrollLeft + lista.clientWidth) lista.scrollLeft = b - lista.clientWidth + 12;
    };
    function select(i, focus) {
      tabs.forEach((t, j) => { const on = i === j; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[j].hidden = !on; });
      if (focus !== undefined) ev('Perfil', { pestaña: panels[i].id.replace('para-ti-', '') });
      if (focus) tabs[i].focus({ preventScroll: true });
      aLaVista(tabs[i]); window.SP.alto();
      if (window.SP.sinViudas) window.SP.sinViudas(panels[i]);
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i, false));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return; e.preventDefault(); select((k + tabs.length) % tabs.length, true);
      });
    });
    const byHash = h => panels.findIndex(p => '#' + p.id === h);
    // stopPropagation: el gestor de anclas de Lenis (en window) iría al panel y no a la sección
    $$('a[data-tab]').forEach(a => a.addEventListener('click', e => {
      const i = byHash(a.getAttribute('href')); if (i < 0) return;
      e.preventDefault(); e.stopPropagation(); select(i, false);
      window.SP.scrollTo ? window.SP.scrollTo($('#para-ti')) : $('#para-ti').scrollIntoView({ behavior: still() ? 'instant' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    }));
    const h = byHash(location.hash); select(h < 0 ? 0 : h);
    if (h >= 0) requestAnimationFrame(() => $('#para-ti').scrollIntoView({ behavior: 'instant' }));
  })();

  // Las respuestas que se abren cambian la altura de la página
  $$('.faq details').forEach(d => d.addEventListener('toggle', () => window.SP.alto(500)));

  // Copiar el email (el texto original se guarda una vez; un segundo clic reinicia la espera)
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy); window.SP.ev('Email', { origen: 'copiar' });
      if (!b.dataset.txt) b.dataset.txt = b.textContent;
      b.textContent = b.dataset.done; clearTimeout(b._t); b._t = setTimeout(() => (b.textContent = b.dataset.txt), 1800);
    } catch (e) {}
  }));

  // Vídeos de las piezas (HyperFrames): se reproducen una vez al verse casi enteros y se quedan en su último fotograma,
  // que es el resumen (también es el póster). Pausa y «Ver de nuevo». Con «reducir movimiento», ?still=1, Save-Data o 2G
  // no se descargan solos: queda el póster y un botón para verlo. Vertical (4:5) hasta 700 px de ancho; WebM si se puede
  (() => {
    const figs = $$('[data-vid]'); if (!figs.length) return;
    const c = navigator.connection || {}, ahorro = !!c.saveData || /2g/.test(c.effectiveType || '');
    const estrecho = matchMedia('(max-width: 700px)');
    figs.forEach(fig => {
      const v = $('video', fig), pb = $('.vid-pausa', fig), ob = $('.vid-otra', fig), barra = $('.vid-prog', fig);
      let cargado = '', visto = false, parado = false, acabado = false, raf = 0, webm = WEBM, vigia = 0;
      const url = () => (estrecho.matches ? fig.dataset.srcV : fig.dataset.srcH) + (webm ? '.webm' : '.mp4') + (fig.dataset.v ? '?v=' + fig.dataset.v : '');
      const carga = () => { const u = url(); if (cargado !== u) { cargado = u; v.src = u; } };
      const boton = txt => { ob.textContent = txt; ob.hidden = false; };
      const avanza = () => { if (v.duration) barra.style.transform = `scaleX(${(v.currentTime / v.duration).toFixed(4)})`; if (!v.paused) raf = requestAnimationFrame(avanza); };
      // El vídeo tapa el póster solo cuando ha pintado su primer fotograma: «playing» puede llegar antes, y en negro
      const pinta = () => { clearTimeout(vigia); fig.classList.add('pinta'); };
      const esperaFotograma = () => {
        if (fig.classList.contains('pinta')) return;
        if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(pinta);
        else { const t = () => { if (v.currentTime > 0) { v.removeEventListener('timeupdate', t); pinta(); } }; v.addEventListener('timeupdate', t); }
      };
      // Si no llega ningún fotograma (falta el archivo, red, el navegador no decodifica el WebM), se prueba el MP4;
      // si tampoco, se queda el póster, que se entiende solo, con el botón para verlo
      const falla = () => {
        clearTimeout(vigia); fig.classList.remove('en-marcha', 'pinta'); pb.hidden = true;
        if (webm) { webm = false; cargado = ''; reproduce(); } else { v.removeAttribute('src'); v.load(); cargado = ''; boton('▶ ' + ob.dataset.ver); }
      };
      const reproduce = () => {
        carga(); acabado = false; fig.classList.remove('acabado');
        clearTimeout(vigia); if (!fig.classList.contains('pinta')) vigia = setTimeout(() => { if (!fig.classList.contains('pinta') && !v.paused) falla(); }, 4000);
        v.play().catch(() => { clearTimeout(vigia); boton('▶ ' + ob.dataset.ver); });
      };
      v.addEventListener('playing', () => { fig.classList.add('en-marcha'); esperaFotograma(); pb.hidden = false; ob.hidden = true; pb.setAttribute('aria-pressed', 'false'); cancelAnimationFrame(raf); raf = requestAnimationFrame(avanza); });
      v.addEventListener('pause', () => cancelAnimationFrame(raf));
      v.addEventListener('ended', () => { acabado = true; fig.classList.add('acabado'); pb.hidden = true; boton('↻ ' + ob.dataset.otra); barra.style.transform = 'scaleX(1)'; });
      v.addEventListener('error', () => { if (cargado) falla(); });
      pb.addEventListener('click', () => { parado = !parado; pb.setAttribute('aria-pressed', String(parado)); parado ? v.pause() : v.play().catch(() => {}); });
      ob.addEventListener('click', () => { parado = false; if (cargado) v.currentTime = 0; reproduce(); });
      if (still() || ahorro) { boton('▶ ' + ob.dataset.ver); return; }
      new IntersectionObserver(([e]) => {
        visto = e.isIntersecting;
        if (visto && !parado && !acabado) reproduce(); else if (!visto && !v.paused) v.pause();
      }, { threshold: .45 }).observe(fig);
      document.addEventListener('visibilitychange', () => { if (document.hidden) v.pause(); else if (visto && !parado && !acabado && cargado) v.play().catch(() => {}); });
      matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => { if (e.matches) { parado = true; v.pause(); pb.setAttribute('aria-pressed', 'true'); } });
    });
  })();

})();
