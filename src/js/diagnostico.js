// Diagnóstico: ocho preguntas de 0 a 3 puntos → cinco niveles en tramos de 5 puntos (0-4, 5-9, 10-14, 15-19, 20-24).
// Después, tres datos (personas, coste por hora y horas a la semana) para estimar el valor en juego y la parte que se escapa
// según el nivel (data.diag.roi). La lógica se exporta para tests/test_diagnostico.js. Criterio de Spiralia, orientativo.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api; else root.SPDiag = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const MAXQ = 3, NLEVELS = 5;
  const score = a => a.reduce((s, x) => s + x, 0);
  const level = a => Math.min(NLEVELS - 1, Math.floor(score(a) * NLEVELS / (a.length * MAXQ + 1)));
  // Los pasos de un nivel. Sin IA corporativa (la primera pregunta a 0), el nivel que tenga sin_ia la pone en primer lugar
  const pasos = (N, a) => (a[0] === 0 && N.sin_ia ? [N.sin_ia, ...N.s.slice(1)] : N.s);
  // Valor en juego al año = personas × horas a la semana × coste por hora × semanas de trabajo. Se captura la parte del
  // nivel (captura[n]); el resto se escapa, y cada semana de espera es una semana de lo que se escapa
  const roi = (personas, coste, horas, semanas, captura) => {
    const total = Math.max(0, personas) * Math.max(0, horas) * Math.max(0, coste) * semanas, hoy = total * captura;
    return { total, hoy, fuga: total - hoy, semana: semanas ? (total - hoy) / semanas : 0 };
  };
  // El freno principal: la pregunta con la respuesta más baja (en un empate, la primera); con todo al máximo, ninguno (-1)
  const freno = a => { const m = Math.min(...a); return m >= MAXQ ? -1 : a.indexOf(m); };
  return { score, level, pasos, roi, freno, MAXQ, NLEVELS };
});

(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const box = document.querySelector('[data-dg]'); if (!box || !window.SP) return;
  const { $, $$, data, still } = window.SP, D = data.diag, L = {};
  Object.keys(box.dataset).forEach(k => { if (k.startsWith('l')) L[k.slice(1).toLowerCase()] = box.dataset[k]; });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ans = new Array(D.q.length).fill(null), R = D.roi, datos = R ? R.def.slice() : null;
  let cur = 0;
  const lang = document.documentElement.lang === 'en' ? 'en-GB' : 'es-ES';
  // Cifras redondeadas a millares: es una estimación, no una cuenta al euro
  const eur = v => new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v >= 10000 ? Math.round(v / 1000) * 1000 : Math.round(v / 10) * 10);
  const hNum = v => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }).format(v);
  // Cada pantalla cambia la altura de la página: ScrollTrigger lo recalcula
  const pinta = html => { box.innerHTML = html; window.SP.alto(); };
  // La barra nace con el avance anterior y avanza hasta el nuevo: al repintar la caja, si no, saltaría sin transición
  let avance = 0;
  const barra = p => { const b = $('.dg-bar i', box); if (!b) return; void b.offsetWidth; b.style.setProperty('--p', p); avance = p; };
  // Si la caja ha quedado bajo la barra o fuera de la pantalla, se lleva a la vista
  const aVista = () => {
    const r = box.getBoundingClientRect(), barra = ($('#bar') || {}).offsetHeight || 64;
    if (r.top >= barra && r.top < innerHeight) return;
    if (window.SP.scrollTo) window.SP.scrollTo(box); else box.scrollIntoView({ block: 'start', behavior: still() ? 'instant' : 'smooth' });
  };

  function intro() {
    pinta(`<ol class="dg-scale dg-preview">${D.n.map(x => `<li>${esc(x.name)}</li>`).join('')}</ol>
      <button type="button" class="btn btn-cta btn-lg dg-start">${esc(L.start)}</button>`);
    $('.dg-start', box).addEventListener('click', () => { window.SP.ev('Diagnóstico', { paso: 'inicio' }); ask(0, true); });
  }
  function ask(i, focus) {
    cur = i; const q = D.q[i];
    pinta(`<div class="dg-top"><span>${esc(L.qof.replace('{n}', i + 1).replace('{t}', D.q.length))}</span></div>
      <div class="dg-bar"><i style="--p:${avance}"></i></div>
      <p class="dg-q" tabindex="-1">${esc(q.q)}</p>
      <div class="dg-opts" role="group" aria-label="${esc(q.q)}">${q.o.map((o, j) => `<button type="button" aria-pressed="${ans[i] === j}">${esc(o)}</button>`).join('')}</div>
      <div class="dg-nav"><button type="button" class="btn btn-ghost btn-sm dg-prev"${i ? '' : ' hidden'}>${esc(L.prev)}</button>
      <button type="button" class="btn btn-ghost btn-sm dg-next"${ans[i] === null ? ' disabled' : ''}>${esc(i === D.q.length - 1 ? L.see : L.next)}</button></div>`);
    barra(+(i / D.q.length).toFixed(3));
    $$('.dg-opts button', box).forEach((b, j) => b.addEventListener('click', () => {
      ans[i] = j; $$('.dg-opts button', box).forEach((x, k) => x.setAttribute('aria-pressed', String(k === j)));
      setTimeout(() => (i < D.q.length - 1 ? ask(i + 1, true) : fin()), 220);
    }));
    $('.dg-prev', box).addEventListener('click', () => ask(i - 1, true));
    $('.dg-next', box).addEventListener('click', () => (i < D.q.length - 1 ? ask(i + 1, true) : fin()));
    if (focus) { $('.dg-q', box).focus({ preventScroll: true }); aVista(); }
  }
  const fin = () => (R ? cuentas() : result());
  // Los tres datos del cálculo: con valores de partida prudentes, que cada uno cambia por los suyos
  function cuentas() {
    pinta(`<div class="dg-top"><span>${esc(R.paso)}</span></div>
      <div class="dg-bar"><i style="--p:${avance}"></i></div>
      <p class="dg-q" tabindex="-1">${esc(R.h)}</p><p class="dg-sub">${esc(R.p)}</p>
      <div class="dg-roi-in">
        <label><span>${esc(R.personas)}</span><input type="number" inputmode="numeric" min="1" step="1" value="${datos[0] || ''}" data-k="0"></label>
        <label><span>${esc(R.coste)}</span><input type="number" inputmode="decimal" min="1" step="1" value="${datos[1] || ''}" data-k="1"></label>
        <label class="dg-horas"><span>${esc(R.horas)}</span><span class="dg-rango"><input type="range" min="0.5" max="6" step="0.5" value="${datos[2]}" data-k="2"><output>${hNum(datos[2])} h</output></span><small>${esc(R.horas_n)}</small></label>
      </div>
      <div class="dg-nav"><button type="button" class="btn btn-ghost btn-sm dg-prev">${esc(L.prev)}</button>
      <button type="button" class="btn btn-cta btn-sm dg-next">${esc(R.calc)}</button></div>`);
    barra(1);
    $$('input', box).forEach(inp => inp.addEventListener('input', () => {
      const v = parseFloat(inp.value); datos[+inp.dataset.k] = v >= 0 ? v : 0;
      if (inp.type === 'range') $('output', box).textContent = hNum(datos[2]) + ' h';
    }));
    $('.dg-prev', box).addEventListener('click', () => ask(D.q.length - 1, true));
    $('.dg-next', box).addEventListener('click', () => { window.SP.ev('Diagnóstico', { paso: 'roi' }); result(); });
    $('.dg-q', box).focus({ preventScroll: true }); aVista();
  }
  function result() {
    const a = ans.map(x => x || 0), n = window.SPDiag.level(a), N = D.n[n], k = window.SPDiag.freno(a), F = k >= 0 ? D.q[k] : null;
    // En Acceso el primer paso es Rumbo: la reserva lleva su texto, sin perder que se llega desde el diagnóstico
    const reserva = n === 0 ? box.dataset.book.replace(/\bd=diagnostico\b/, 'd=diagnostico-rumbo') : box.dataset.book;
    window.SP.ev('Diagnóstico', Object.assign({ paso: 'resultado', nivel: N.name }, F ? { freno: F.id } : {}));
    // El valor en juego solo con los datos de quien responde: sin personas o sin coste por hora no se estima
    const V = R && datos[0] > 0 && datos[1] > 0 ? window.SPDiag.roi(datos[0], datos[1], datos[2], R.semanas, R.captura[n]) : null;
    const cifras = V ? [[R.total, V.total], [R.hoy, V.hoy], [R.fuga, V.fuga], [R.semana, V.semana]] : [];
    const supuestos = R ? `${R.personas}: ${datos[0]} · ${R.coste}: ${datos[1]} · ${R.horas}: ${hNum(datos[2])}` : '';
    const body = [L.intro, '', `${N.name}: ${N.h}`, ...(F ? ['', `${L.freno}: ${F.f}`] : []), '', ...D.q.map((q, i) => `${i + 1}. ${q.q} ${q.o[a[i]]}`),
      ...(V ? ['', ...cifras.map(([t, v]) => `${t}: ${eur(v)}`), supuestos] : [])].join('\n');
    const mail = `mailto:${box.dataset.mail}?subject=${encodeURIComponent(L.subject)}&body=${encodeURIComponent(body)}`;
    pinta(`<div class="dg-res"><h3>${esc(L.res)}</h3><p class="dg-level" tabindex="-1">${esc(N.name)}</p><p class="dg-h">${esc(N.h)}</p>
      <ol class="dg-scale">${D.n.map((x, i) => `<li class="${i < n ? 'past' : i === n ? 'cur' : ''}"${i === n ? ' aria-current="step"' : ''}>${esc(x.name)}</li>`).join('')}</ol>
      ${F ? `<div class="dg-freno"><h3>${esc(L.freno)}</h3><p>${esc(F.f)} <a class="link-arrow" href="#${esc(F.p)}">${esc(L.ver)} <span aria-hidden="true">→</span></a></p></div>` : ''}
      ${V ? `<div class="dg-roi">${cifras.map(([t, v], j) => `<div class="${['', '', 'fuga', 'semana'][j]}"><span>${esc(t)}</span><b>${esc(eur(v))}</b></div>`).join('')}</div>
      <p class="dg-note dg-supuestos">${esc(R.nota)}</p>` : ''}
      <h3>${esc(L.steps)}</h3><ul class="dg-steps">${window.SPDiag.pasos(N, a).map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="dg-acts"><a class="btn btn-cta" href="${esc(reserva)}">${esc(L.book)}</a><a class="btn btn-ghost" href="${mail}">${esc(L.send)}</a>
      <button type="button" class="btn btn-ghost dg-print">${esc(L.print)}</button><button type="button" class="btn btn-ghost dg-again">${esc(L.again)}</button></div>
      ${V ? '' : `<p class="dg-note">${esc(L.note)}</p>`}</div>`);
    $('.dg-print', box).addEventListener('click', () => {
      const r = document.documentElement; r.classList.add('print-dg');
      addEventListener('afterprint', () => r.classList.remove('print-dg'), { once: true }); print();
    });
    $('.dg-again', box).addEventListener('click', () => { ans.fill(null); ask(0, true); });
    $('.dg-level', box).focus({ preventScroll: true });
    aVista();
  }
  document.addEventListener('DOMContentLoaded', intro);
})();
