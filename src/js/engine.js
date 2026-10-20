// Motor de la página: piezas que se reproducen una vez al entrar en pantalla.
// Sin JS (o con «reducir movimiento», ?still=1 o al imprimir) todo se ve en su estado final.
// Patrón heredado de los decks de Santander y KPMG, adaptado a scroll.
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, lang = root.lang;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let printing = false;
  const still = () => reduced.matches || /[?&]still=1/.test(location.search) || printing;

  // Cifras en el formato de cada idioma: 50.000 y 4,7 (es) · 50,000 y 4.7 (en)
  const SEP = lang === 'en' ? [',', '.'] : ['.', ','];
  const fmt = (v, dec = 0, group = false) => {
    let [a, b] = Math.abs(v).toFixed(dec).split('.');
    if (group) a = a.replace(/\B(?=(\d{3})+(?!\d))/g, SEP[0]);
    return (v < 0 ? '−' : '') + (b ? a + SEP[1] + b : a);
  };
  // Rueda cada [data-to] conservando el texto que rodea a la cifra («80 %», «del 66 %»)
  const NUM = /\d+(?:[.,]\d+)*/;
  // mode: 'zero' (preparada), 'run' (rueda desde 0) o 'end' (valor final)
  function count(el, mode) {
    if (!el.dataset.tpl) el.dataset.tpl = el.textContent.replace(NUM, '{n}');
    const to = +el.dataset.to, dec = +(el.dataset.dec || 0), g = !!el.dataset.group, dur = +(el.dataset.dur || 1600);
    const put = v => { el.textContent = el.dataset.tpl.replace('{n}', fmt(v, dec, g)); };
    cancelAnimationFrame(el._raf);
    if (mode === 'end' || still()) return put(to);
    put(0);
    if (mode === 'zero') return;
    const t0 = performance.now();
    const tick = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); put(to * e); if (p < 1) el._raf = requestAnimationFrame(tick); };
    el._raf = requestAnimationFrame(tick);
  }

  // Registro de piezas: SP.piece('nombre', {arm, play, finish})
  const kinds = {}, all = [];
  const piece = (name, h) => { kinds[name] = h; };
  piece('count', {
    arm: el => $$('[data-to]', el).forEach(n => count(n, 'zero')),
    play: el => $$('[data-to]', el).forEach(n => count(n, 'run')),
    finish: el => $$('[data-to]', el).forEach(n => count(n, 'end')),
  });

  function setup() {
    $$('[data-piece]').forEach(el => {
      const h = kinds[el.dataset.piece]; if (!h) return;
      const p = { el, h, played: false };
      all.push(p);
      if (still()) h.finish(el); else h.arm(el);
    });
    // Cifras sueltas fuera de una pieza (la de la portada)
    $$('[data-to]').forEach(n => { if (!n.closest('[data-piece]')) { const p = { el: n.parentElement, h: kinds.count, played: false }; all.push(p); still() ? p.h.finish(p.el) : p.h.arm(p.el); } });
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const p = all.find(x => x.el === e.target);
      if (p && !p.played) { p.played = true; still() ? p.h.finish(p.el) : p.h.play(p.el); }
      io.unobserve(e.target);
    }), { threshold: .28, rootMargin: '0px 0px -8% 0px' });
    all.forEach(p => io.observe(p.el));

    // Aparición suave de titulares y tarjetas
    const rvs = $$('.rv');
    if (!still()) {
      rvs.forEach(el => { const r = el.getBoundingClientRect(); if (r.top > innerHeight * .92) el.classList.add('pre'); });
      const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); ro.unobserve(e.target); } }), { threshold: .12 });
      rvs.forEach(el => el.classList.contains('pre') && ro.observe(el));
    }
  }

  // Al imprimir, todo en su estado final. Las transiciones y animaciones CSS que acaban de empezar (apariciones,
  // barras, pestañas) se llevan a su final: la impresión toma el estilo de ese instante. Las infinitas no se tocan.
  // Antes se avisa (sp:imprime, una vez por impresión) para que se anote lo que hay en pantalla (sitio de lectura,
  // paso abierto del método)
  const alFinal = () => { void root.offsetWidth; (document.getAnimations ? document.getAnimations() : []).forEach(a => { try { a.finish(); } catch (e) {} }); };
  addEventListener('beforeprint', () => {
    if (!printing) document.dispatchEvent(new Event('sp:imprime'));
    printing = true; all.forEach(p => p.h.finish(p.el)); $$('.rv.pre').forEach(el => el.classList.remove('pre')); alFinal();
  });
  addEventListener('afterprint', () => { printing = false; });

  // El enlace de idioma conserva el ancla
  $$('[data-keep-hash]').forEach(a => a.addEventListener('click', () => { if (location.hash) a.href = a.getAttribute('href').split('#')[0] + location.hash; }));

  // Medición sin cookies: si la página carga Plausible (ANALYTICS en build.py), cada evento le llega; si no, no hace nada.
  const ev = (name, props) => { try { window.plausible && window.plausible(name, props ? { props } : undefined); } catch (e) {} };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="reserva/"], a[href^="mailto:"], a[hreflang]'); if (!a) return;
    const h = a.getAttribute('href');
    if (h.includes('reserva/')) ev('Reserva', { origen: (h.match(/[?&]d=([\w-]+)/) || [, 'otro'])[1] });
    else if (h.startsWith('mailto:')) ev('Email', { origen: a.closest('[id]') ? a.closest('[id]').id : 'otro' });
    else ev('Idioma', { a: a.getAttribute('hreflang') });
  });

  // La altura de la página ha cambiado (pestañas, diagnóstico, preguntas, pasos del método): scroll.js recalcula ScrollTrigger tras ms
  const alto = ms => document.dispatchEvent(new CustomEvent('sp:alto', { detail: ms || 0 }));

  window.SP = { $, $$, still, fmt, piece, ev, alto, alFinal, data: JSON.parse(($('#page-data') || {}).textContent || '{}') };
  document.addEventListener('DOMContentLoaded', setup);
})();
