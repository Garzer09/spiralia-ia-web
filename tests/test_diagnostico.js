// node tests/test_diagnostico.js
const assert = require('assert');
const { level, score, MAXQ, NLEVELS } = require('../src/js/diagnostico.js');
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
console.log('ok · diagnóstico: 25 puntuaciones, 5 niveles, sin huecos');
