// Diagnóstico: ocho preguntas de 0 a 3 puntos → cinco niveles en tramos de 5 puntos (0-4, 5-9, 10-14, 15-19, 20-24).
// La lógica de puntuación se exporta para tests/test_diagnostico.js. Criterio de Spiralia, orientativo.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api; else root.SPDiag = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const MAXQ = 3, NLEVELS = 5;
  const score = a => a.reduce((s, x) => s + x, 0);
  const level = a => Math.min(NLEVELS - 1, Math.floor(score(a) * NLEVELS / (a.length * MAXQ + 1)));
  return { score, level, MAXQ, NLEVELS };
});

(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const box = document.querySelector('[data-dg]'); if (!box || !window.SP) return;
  const { $, $$, data } = window.SP, D = data.diag, L = {};
  Object.keys(box.dataset).forEach(k => { if (k.startsWith('l')) L[k.slice(1).toLowerCase()] = box.dataset[k]; });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ans = new Array(D.q.length).fill(null);
  let cur = 0;

  function intro() {
    box.innerHTML = `<ol class="dg-scale dg-preview">${D.n.map(x => `<li>${esc(x.name)}</li>`).join('')}</ol>
      <button type="button" class="btn btn-cta btn-lg dg-start">${esc(L.start)}</button>`;
    $('.dg-start', box).addEventListener('click', () => ask(0, true));
  }
  function ask(i, focus) {
    cur = i; const q = D.q[i];
    box.innerHTML = `<div class="dg-top"><span>${esc(L.qof.replace('{n}', i + 1).replace('{t}', D.q.length))}</span></div>
      <div class="dg-bar"><i style="--p:${(i / D.q.length * 100).toFixed(1)}%"></i></div>
      <p class="dg-q" tabindex="-1">${esc(q.q)}</p>
      <div class="dg-opts" role="group" aria-label="${esc(q.q)}">${q.o.map((o, j) => `<button type="button" aria-pressed="${ans[i] === j}">${esc(o)}</button>`).join('')}</div>
      <div class="dg-nav"><button type="button" class="btn btn-ghost btn-sm dg-prev"${i ? '' : ' hidden'}>${esc(L.prev)}</button>
      <button type="button" class="btn btn-ghost btn-sm dg-next"${ans[i] === null ? ' disabled' : ''}>${esc(i === D.q.length - 1 ? L.see : L.next)}</button></div>`;
    $$('.dg-opts button', box).forEach((b, j) => b.addEventListener('click', () => {
      ans[i] = j; $$('.dg-opts button', box).forEach((x, k) => x.setAttribute('aria-pressed', String(k === j)));
      setTimeout(() => (i < D.q.length - 1 ? ask(i + 1, true) : result()), 220);
    }));
    $('.dg-prev', box).addEventListener('click', () => ask(i - 1, true));
    $('.dg-next', box).addEventListener('click', () => (i < D.q.length - 1 ? ask(i + 1, true) : result()));
    if (focus) $('.dg-q', box).focus({ preventScroll: true });
  }
  function result() {
    const a = ans.map(x => x || 0), n = window.SPDiag.level(a), N = D.n[n];
    const body = [L.intro, '', `${N.name}: ${N.h}`, '', ...D.q.map((q, i) => `${i + 1}. ${q.q} ${q.o[a[i]]}`)].join('\n');
    const mail = `mailto:${box.dataset.mail}?subject=${encodeURIComponent(L.subject)}&body=${encodeURIComponent(body)}`;
    box.innerHTML = `<div class="dg-res"><h3>${esc(L.res)}</h3><p class="dg-level" tabindex="-1">${esc(N.name)}</p><p class="dg-h">${esc(N.h)}</p>
      <ol class="dg-scale">${D.n.map((x, i) => `<li class="${i < n ? 'past' : i === n ? 'cur' : ''}"${i === n ? ' aria-current="step"' : ''}>${esc(x.name)}</li>`).join('')}</ol>
      <h3>${esc(L.steps)}</h3><ul class="dg-steps">${N.s.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="dg-acts"><a class="btn btn-cta" href="${mail}">${esc(L.send)}</a>
      <button type="button" class="btn btn-ghost dg-print">${esc(L.print)}</button><button type="button" class="btn btn-ghost dg-again">${esc(L.again)}</button></div>
      <p class="dg-note">${esc(L.note)}</p></div>`;
    $('.dg-print', box).addEventListener('click', () => {
      const r = document.documentElement; r.classList.add('print-dg');
      addEventListener('afterprint', () => r.classList.remove('print-dg'), { once: true }); print();
    });
    $('.dg-again', box).addEventListener('click', () => { ans.fill(null); ask(0, true); });
    $('.dg-level', box).focus({ preventScroll: true });
  }
  document.addEventListener('DOMContentLoaded', intro);
})();
