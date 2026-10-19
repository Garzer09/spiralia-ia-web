// Piezas de la página. Cada una tiene arm (preparada, oculta), play (se reproduce) y finish (estado final).
(() => {
  'use strict';
  const { $, $$, still, piece, data, ev } = window.SP;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const later = () => { let ts = []; return { at: (ms, fn) => ts.push(setTimeout(fn, ms)), clear: () => { ts.forEach(clearTimeout); ts = []; } }; };

  // M2 · La curva que se enfría
  piece('chart', {
    arm: el => el.classList.add('anim'),
    play: el => { el.classList.remove('play'); void el.offsetWidth; requestAnimationFrame(() => el.classList.add('play')); },
    finish: el => el.classList.remove('anim', 'play'),
  });

  // M3 · SPIRAL sobre la S de Spiralia: las hebras se dibujan y los seis pasos se encienden por fases
  const SP_STRAND = 3, SP_AT = [.05, .23, .41, .59, .77, .955];
  piece('spiral', (() => {
    const T = later(); let built = false, len = 0, prog, sts = [], items = [];
    function build(el) {
      if (built) return; built = true;
      const svg = $('.sp-svg', el), G = window.SGEOM, NS = 'http://www.w3.org/2000/svg';
      const base = document.createElementNS(NS, 'g'); base.setAttribute('class', 'base');
      G.paths.forEach((d, i) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); base.append(p); p.style.setProperty('--len', p.getTotalLength()); p.style.setProperty('--i', i); });
      svg.append(base);
      prog = document.createElementNS(NS, 'path'); prog.setAttribute('class', 'prog'); prog.setAttribute('d', G.paths[SP_STRAND]); svg.append(prog);
      len = prog.getTotalLength(); prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len;
      'SPIRAL'.split('').forEach((L, i) => {
        const pt = prog.getPointAtLength(len * SP_AT[i]), g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'st'); g.innerHTML = `<circle cx="${pt.x}" cy="${pt.y}" r="13"/><text x="${pt.x}" y="${pt.y}">${L}</text>`;
        g.addEventListener('click', () => pick(el, i + 1)); svg.append(g); sts.push(g);
      });
      items = $$('.sp-steps li', el);
      $$('.sp-b', el).forEach(b => b.addEventListener('click', () => { if (window.SP.spiral.onPick) window.SP.spiral.onPick(+b.dataset.n); else pick(el, +b.dataset.n); }));
      $('.replay', el).addEventListener('click', () => play(el));
    }
    function set(el, n, openAll) {
      prog.style.strokeDashoffset = n ? len * (1 - SP_AT[n - 1]) : len;
      sts.forEach((g, i) => { g.classList.toggle('on', i < n); g.classList.toggle('cur', i === n - 1); });
      items.forEach((li, i) => { const o = openAll || i === n - 1; li.classList.toggle('open', o); li.classList.toggle('on', i < n); $('.sp-b', li).setAttribute('aria-expanded', String(o)); });
      if (SPs.onSet) SPs.onSet(n);
    }
    function pick(el, n) { T.clear(); el.classList.remove('anim'); el.classList.add('drawn', 'done'); set(el, n); }
    // La capa de scroll (scroll.js) mueve los pasos con el scroll (guiada) y lleva cada paso a la S de WebGL (onSet)
    const raiz = () => $('.spiral');
    const SPs = window.SP.spiral = {
      pick: n => { const el = raiz(); build(el); pick(el, n); },
      play: () => play(raiz()), finish: () => finish(raiz()),
      onPick: null, onSet: null, guiada: false,
    };
    function arm(el) { build(el); el.classList.add('anim'); el.classList.remove('drawn', 'done'); set(el, 0); }
    function play(el) {
      arm(el); void el.offsetWidth;
      requestAnimationFrame(() => el.classList.add('drawn'));
      for (let n = 1; n <= 6; n++) T.at(2300 + (n - 1) * 1550, () => set(el, n));
      T.at(2300 + 5 * 1550 + 900, () => el.classList.add('done'));
    }
    function finish(el) { build(el); T.clear(); el.classList.remove('anim'); el.classList.add('drawn', 'done'); set(el, 6, true); }
    return { arm, play: el => { if (!SPs.guiada) play(el); }, finish };
  })());

  // M4 · Antes y después, por perfil (reloj propio: aplicar(t) enciende lo que tiene data-at ≤ t)
  // Cada columna arranca al estar en pantalla: en móvil el «después» va debajo y no debe animarse fuera de vista
  piece('demo', (() => {
    const FIN = 10.6, CORTE = 3.5; let el, scene, pbtn, idx = 0, t = FIN, t0 = 0, raf = 0, run = false, els = [], L = {}, cols = [], vistas = [], io = null;
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
    function btn() { pbtn.hidden = still() || (!run && t >= FIN); pbtn.textContent = run ? '❚❚ ' + L.pause : '▶ ' + L.play; }
    // El reloj espera en 0 a que se vea la demo y justo antes de CORTE a que se vea el «después»
    function tick(ts) {
      let tt = (ts - t0) / 1000;
      const tope = t < CORTE && !vistas[1] ? (t <= 0 && !vistas[0] ? 0 : CORTE - .01) : FIN;
      if (tt > tope && t <= tope) { tt = tope; t0 = ts - tope * 1000; }
      if (tt >= FIN) { aplicar(FIN); run = false; btn(); return; }
      aplicar(tt); raf = requestAnimationFrame(tick);
    }
    function go(from) { cancelAnimationFrame(raf); t0 = performance.now() - from * 1000; run = true; btn(); raf = requestAnimationFrame(tick); }
    function start(i) {
      cancelAnimationFrame(raf); render(i);
      if (still()) { el.classList.remove('anim'); aplicar(FIN); run = false; btn(); return; }
      el.classList.add('anim'); aplicar(0); go(0);
    }
    function init(root) {
      if (el) return; el = root; scene = $('.demo-scene', el); pbtn = $('.demo-pause', el);
      io = new IntersectionObserver(es => es.forEach(e => { const k = cols.indexOf(e.target); if (k >= 0) vistas[k] = e.isIntersecting; }), { rootMargin: '0px 0px -12% 0px' });
      Object.keys(el.dataset).forEach(k => { if (k.startsWith('l')) L[k.slice(1).toLowerCase()] = el.dataset[k]; });
      $('.demo-profiles', el).innerHTML = D.map(x => `<button type="button" aria-pressed="false"><b>${esc(x.perfil)}</b><span>${esc(x.tarea)}</span></button>`).join('');
      $$('.demo-profiles button', el).forEach((b, i) => b.addEventListener('click', () => start(i)));
      pbtn.addEventListener('click', () => { if (run) { cancelAnimationFrame(raf); run = false; btn(); } else if (t < FIN) go(t); else start(idx); });
      $('.demo-replay', el).addEventListener('click', () => start(idx));
    }
    return {
      arm: r => { init(r); el.classList.add('anim'); render(0); aplicar(0); pbtn.hidden = true; },
      play: r => { init(r); start(0); },
      finish: r => { init(r); cancelAnimationFrame(raf); run = false; el.classList.remove('anim'); render(idx); aplicar(FIN); btn(); },
    };
  })());

  // M5 · El caso de la propuesta comercial: el proceso de hoy (con esperas y un retrabajo) frente al rediseñado
  piece('case', (() => {
    const T = later(); let el, old, neu, os, ns, logs;
    function init(r) {
      if (el) return; el = r; [old, neu] = $$('.lane', el); os = $$('li', old); ns = $$('li', neu); logs = $$('.log li', el);
      $('.replay', el).addEventListener('click', () => play(el));
    }
    const go = (items, k) => { items.forEach((li, i) => li.classList.toggle('at', i === k)); items[k].classList.add('seen'); };
    function finish(r) {
      init(r); T.clear(); el.classList.remove('anim');
      [old, neu].forEach(l => { l.classList.add('done'); l.classList.remove('back'); });
      [...os, ...ns].forEach(li => { li.classList.add('seen'); li.classList.remove('at'); });
      logs.forEach(li => li.classList.add('on'));
    }
    function arm(r) {
      init(r); T.clear(); el.classList.add('anim');
      [old, neu].forEach(l => l.classList.remove('done', 'back'));
      [...os, ...ns].forEach(li => li.classList.remove('seen', 'at'));
      logs.forEach(li => li.classList.remove('on'));
    }
    function play(r) {
      arm(r); let t = 400;
      [0, 1, 2, 3, 4, 3, 4, 5].forEach((k, j) => { T.at(t, () => { go(os, k); old.classList.toggle('back', j === 5); }); t += 620 + (j === 2 || j === 7 ? 700 : 0); });
      T.at(t, () => { old.classList.add('done'); old.classList.remove('back'); os.forEach(li => li.classList.remove('at')); }); t += 450;
      ns.forEach((li, k) => { T.at(t, () => { go(ns, k); logs[k] && logs[k].classList.add('on'); }); t += 560; });
      T.at(t, () => { neu.classList.add('done'); ns.forEach(li => li.classList.remove('at')); });
    }
    return { arm, play, finish };
  })());

  // Vídeos de fondo en bucle (portada y cierre). El póster es el fotograma 0 y el vídeo entra con un fundido.
  // Con «reducir movimiento», Save-Data o conexión lenta no se descarga: queda el póster, que es un diseño terminado.
  // El archivo se elige al cargar según la orientación (vertical en móvil) y el formato que admita el navegador.
  const PAUSA = 'sp-fondo-pausado', reduced = matchMedia('(prefers-reduced-motion: reduce)'), SPfondo = {};
  const pausadoAntes = () => { try { return localStorage.getItem(PAUSA) === '1'; } catch (e) { return false; } };
  const recordar = v => { try { v ? localStorage.setItem(PAUSA, '1') : localStorage.removeItem(PAUSA); } catch (e) {} };
  function fondo(sec, btn) {
    const v = $('video', sec), c = navigator.connection || {};
    if (!v || still() || c.saveData || /2g/.test(c.effectiveType || '') || sec.classList.contains('has-gl')) return; // con WebGL, el vídeo sobra
    const base = matchMedia('(max-aspect-ratio: 1/1)').matches ? sec.dataset.srcV : sec.dataset.srcH;
    // data-v: la huella que pone build.py, para que la caché no sirva un vídeo antiguo
    const url = base + (v.canPlayType('video/webm; codecs="vp9"') ? '.webm' : '.mp4') + (sec.dataset.v ? '?v=' + sec.dataset.v : '');
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
  addEventListener('load', () => (window.requestIdleCallback || setTimeout)(() => {
    fondos = true;
    if (hero) SPfondo.hero = fondo(hero, $('.hero-pause', hero));
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
    let enHero = true, enCierre = false, enPie = false;
    const set = () => f.classList.toggle('on', !enHero && !enCierre && !enPie);
    new IntersectionObserver(([e]) => { enHero = e.isIntersecting; set(); }).observe(hero);
    new IntersectionObserver(([e]) => { enCierre = e.isIntersecting; set(); }, { threshold: .1 }).observe(cierre);
    if (pie) new IntersectionObserver(([e]) => { enPie = e.isIntersecting; set(); }).observe(pie);
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

  // La película de 20 s, a demanda: el fondo se detiene mientras se ve
  (() => {
    const d = $('.film-dialog'), op = $('[data-film-open]'); if (!d || !op) return;
    if (typeof d.showModal !== 'function') { op.hidden = true; return; }
    const v = $('video', d);
    // WebM (VP9) si el navegador lo admite; si falla, el MP4
    let webm = !!v.dataset.webm && !!v.canPlayType('video/webm; codecs="vp9"');
    v.addEventListener('error', () => { if (webm) { webm = false; v.src = v.dataset.src; v.play().catch(() => {}); } });
    op.addEventListener('click', () => {
      if (!v.src) { v.poster = v.dataset.poster; v.src = webm ? v.dataset.webm : v.dataset.src; }
      d.showModal(); SPfondo.hero && SPfondo.hero.pausar(); document.dispatchEvent(new Event('sp:pausa'));
      ev('Película');
      v.play().catch(() => {});
    });
    d.addEventListener('close', () => { v.pause(); SPfondo.hero && SPfondo.hero.seguir(); document.dispatchEvent(new Event('sp:sigue')); op.focus(); });
    d.addEventListener('click', e => { if (e.target === d) d.close(); });
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

})();
