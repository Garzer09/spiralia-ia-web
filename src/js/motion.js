// Piezas de la página. Cada una tiene arm (preparada, oculta), play (se reproduce) y finish (estado final).
(() => {
  'use strict';
  const { $, $$, still, piece, data } = window.SP;
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
      $$('.sp-b', el).forEach(b => b.addEventListener('click', () => pick(el, +b.dataset.n)));
      $('.replay', el).addEventListener('click', () => play(el));
    }
    function set(el, n, openAll) {
      prog.style.strokeDashoffset = n ? len * (1 - SP_AT[n - 1]) : len;
      sts.forEach((g, i) => { g.classList.toggle('on', i < n); g.classList.toggle('cur', i === n - 1); });
      items.forEach((li, i) => { const o = openAll || i === n - 1; li.classList.toggle('open', o); li.classList.toggle('on', i < n); $('.sp-b', li).setAttribute('aria-expanded', String(o)); });
    }
    function pick(el, n) { T.clear(); el.classList.remove('anim'); el.classList.add('drawn', 'done'); set(el, n); }
    function arm(el) { build(el); el.classList.add('anim'); el.classList.remove('drawn', 'done'); set(el, 0); }
    function play(el) {
      arm(el); void el.offsetWidth;
      requestAnimationFrame(() => el.classList.add('drawn'));
      for (let n = 1; n <= 6; n++) T.at(2300 + (n - 1) * 1550, () => set(el, n));
      T.at(2300 + 5 * 1550 + 900, () => el.classList.add('done'));
    }
    function finish(el) { build(el); T.clear(); el.classList.remove('anim'); el.classList.add('drawn', 'done'); set(el, 6, true); }
    return { arm, play, finish };
  })());

  // M4 · Antes y después, por perfil (reloj propio: aplicar(t) enciende lo que tiene data-at ≤ t)
  piece('demo', (() => {
    const FIN = 10.6; let el, scene, pbtn, idx = 0, t = FIN, t0 = 0, raf = 0, run = false, els = [], L = {};
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
    }
    const aplicar = tt => { t = tt; for (const [e, a] of els) e.classList.toggle('on', a <= tt); };
    function btn() { pbtn.hidden = still(); pbtn.textContent = run ? '❚❚ ' + L.pause : '▶ ' + L.play; }
    function tick(ts) { const tt = (ts - t0) / 1000; if (tt >= FIN) { aplicar(FIN); run = false; btn(); return; } aplicar(tt); raf = requestAnimationFrame(tick); }
    function go(from) { cancelAnimationFrame(raf); t0 = performance.now() - from * 1000; run = true; btn(); raf = requestAnimationFrame(tick); }
    function start(i) {
      cancelAnimationFrame(raf); render(i);
      if (still()) { el.classList.remove('anim'); aplicar(FIN); run = false; btn(); return; }
      el.classList.add('anim'); aplicar(0); go(0);
    }
    function init(root) {
      if (el) return; el = root; scene = $('.demo-scene', el); pbtn = $('.demo-pause', el);
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

  // M1 · Película de apertura: se reproduce una vez cuando la portada está a la vista y se queda en su cartel final.
  // Con «reducir movimiento», Save-Data o conexión lenta solo se ve el cartel (es el mismo último fotograma).
  (() => {
    const f = $('[data-film]'); if (!f) return;
    const v = $('video', f), tg = $('.film-toggle', f), rp = $('.film-replay', f), bar = $('.film-bar i', f);
    const c = navigator.connection || {};
    if (still() || c.saveData || /2g/.test(c.effectiveType || '')) return;
    let started = false, user = false, visto = false;
    const set = () => { tg.classList.toggle('is-paused', v.paused); tg.setAttribute('aria-label', v.paused ? tg.dataset.play : tg.dataset.pause); };
    const seguir = () => { if (visto && started && !user && v.paused && !v.ended && !document.hidden) v.play().catch(() => {}); };
    v.addEventListener('playing', () => { f.classList.add('playing'); f.classList.remove('ended'); tg.hidden = false; rp.hidden = true; set(); });
    v.addEventListener('pause', set);
    v.addEventListener('timeupdate', () => { bar.style.transform = `scaleX(${(v.currentTime / v.duration || 0).toFixed(4)})`; });
    v.addEventListener('ended', () => { f.classList.add('ended'); tg.hidden = true; rp.hidden = false; });
    addEventListener('load', () => {
      new IntersectionObserver(([e]) => {
        visto = e.isIntersecting;
        if (visto && !started) { started = true; v.src = f.dataset.src; v.play().catch(() => {}); }
        else if (!visto && !v.paused) v.pause();
        else seguir();
      }, { threshold: .4 }).observe(f);
    });
    document.addEventListener('visibilitychange', seguir); // si la pestaña estaba oculta, el navegador no arranca el vídeo
    tg.addEventListener('click', () => { if (v.paused) { user = false; v.play().catch(() => {}); } else { user = true; v.pause(); } });
    rp.addEventListener('click', () => { user = false; v.currentTime = 0; v.play().catch(() => {}); });
  })();

  // Pestañas «Para ti» (patrón ARIA) y accesos por perfil desde la portada
  (() => {
    const box = $('[data-tabs]'); if (!box) return;
    const tabs = $$('[role=tab]', box), panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    function select(i, focus) {
      tabs.forEach((t, j) => { const on = i === j; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; panels[j].hidden = !on; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k === undefined) return; e.preventDefault(); select((k + tabs.length) % tabs.length, true);
      });
    });
    const byHash = h => panels.findIndex(p => '#' + p.id === h);
    $$('a[data-tab]').forEach(a => a.addEventListener('click', e => {
      const i = byHash(a.getAttribute('href')); if (i < 0) return;
      e.preventDefault(); select(i); $('#para-ti').scrollIntoView({ behavior: still() ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    }));
    const h = byHash(location.hash); select(h < 0 ? 0 : h);
    if (h >= 0) requestAnimationFrame(() => $('#para-ti').scrollIntoView());
  })();

  // Copiar el email
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); const t = b.textContent; b.textContent = b.dataset.done; setTimeout(() => (b.textContent = t), 1800); } catch (e) {}
  }));

})();
