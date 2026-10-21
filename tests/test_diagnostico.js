// node tests/test_diagnostico.js
const assert = require('assert');
const { level, score, pasos, MAXQ, NLEVELS } = require('../src/js/diagnostico.js');
const Q = 8;

assert.strictEqual(level(Array(Q).fill(0)), 0, 'todo al mínimo → Acceso');
assert.strictEqual(level(Array(Q).fill(MAXQ)), NLEVELS - 1, 'todo al máximo → Autonomía');

// Todas las combinaciones de puntuación total: niveles crecientes, sin huecos y con tramos de 5 puntos
const seen = new Set();
let prev = 0;
for (let s = 0; s <= Q * MAXQ; s++) {
  const a = Array(Q).fill(0); let r = s;
  for (let i = 0; i < Q && r > 0; i++) { a[i] = Math.min(MAXQ, r); r -= a[i]; }
  assert.strictEqual(score(a), s);
  const n = level(a);
  assert.ok(n >= prev && n - prev <= 1, `salto de nivel en ${s} puntos`);
  assert.strictEqual(n, Math.floor(s / 5), `${s} puntos → nivel ${Math.floor(s / 5)}`);
  seen.add(n); prev = n;
}
assert.deepStrictEqual([...seen].sort(), [0, 1, 2, 3, 4], 'se alcanzan los cinco niveles');
// Sin IA corporativa (primera pregunta a 0), la línea sin_ia sustituye a la primera del nivel; con IA, o sin sin_ia, no
const N = { s: ['Día Uno', 'Formación'], sin_ia: 'Elige tu IA y Día Uno' };
assert.deepStrictEqual(pasos(N, Array(Q).fill(0)), ['Elige tu IA y Día Uno', 'Formación'], 'sin IA corporativa → primero, elegirla');
assert.deepStrictEqual(pasos(N, [1, 0, 0, 0, 0, 0, 0, 0]), N.s, 'con un grupo piloto → la línea de siempre');
assert.deepStrictEqual(pasos({ s: N.s }, Array(Q).fill(0)), N.s, 'un nivel sin sin_ia no cambia');
console.log('ok · diagnóstico: 25 puntuaciones, 5 niveles, sin huecos; pasos sin IA corporativa');
// Valor en juego: personas × horas × coste × semanas; lo capturado según el nivel y lo que se escapa por semana
const { roi } = require('../src/js/diagnostico.js');
const r = roi(500, 40, 2, 46, .25);
assert.strictEqual(r.total, 1840000, '500 personas × 2 h × 40 € × 46 semanas');
assert.strictEqual(r.hoy, 460000, 'en Uso se captura la cuarta parte');
assert.strictEqual(r.fuga, 1380000, 'y se escapa el resto');
assert.strictEqual(r.semana, 30000, 'lo que se escapa, por semana');
assert.deepStrictEqual(roi(-5, 40, 2, 46, .1), { total: 0, hoy: 0, fuga: 0, semana: 0 }, 'sin personas no hay valor en juego');
console.log('ok · estimación del valor en juego');
