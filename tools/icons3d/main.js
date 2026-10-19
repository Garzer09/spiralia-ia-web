// Arranque del banco de render: lee ?icon y ?ss, monta el icono y avisa a render.mjs.
import { crearEstudio } from './estudio.js';
import { ICONOS } from './iconos.js';

window.addEventListener('error', (e) => { window.__error = String(e.message || e); });
window.addEventListener('unhandledrejection', (e) => { window.__error = String(e.reason); });

const q = new URLSearchParams(location.search);
const nombre = q.get('icon') || 'tecnologia';
const ss = Math.max(1, Math.min(3, Number(q.get('ss')) || 1));
if (q.get('fondo')) document.body.className = q.get('fondo');

const fabrica = ICONOS[nombre];
if (!fabrica) throw new Error('Icono desconocido: ' + nombre);

const est = crearEstudio(document.getElementById('lienzo'), { ss });
const { objeto, opciones } = fabrica(est);
est.montar(objeto, opciones);
est.pintar();
est.pintar();
window.__exportar = est.exportar;
window.__listo = true;
