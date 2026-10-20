// Genera los iconos 3D sin conexión: Chromium (Playwright) pinta cada icono con three.js
// y FFmpeg lo guarda como WebP con alfa (512 px) y PNG de respaldo (256 px). La variante de
// 192 px del srcset sale del WebP de 512 con Pillow.
//
//   node tools/icons3d/render.mjs                    todos los iconos
//   node tools/icons3d/render.mjs tecnologia rumbo   solo esos
//   opciones: --ss 2            supermuestreo (lienzo de 768 × ss)
//             --hoja ruta.png   hoja de contacto de todos sobre noche y papel
//             --celda 220       tamaño de cada icono en la hoja
//             --maestros dir    guarda también el PNG de 768 px de cada icono
//             --solo-hoja       no vuelve a pintar; monta la hoja con lo que ya hay
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Playwright: el del proyecto si existe; si no, la instalación global de este entorno.
const { chromium } = await import('playwright').catch(() => import('/opt/node22/lib/node_modules/playwright/index.mjs'));

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../..');
const SALIDA = path.join(RAIZ, 'assets/img/3d');
const TODOS = ['estrategia', 'formacion', 'ingenieria', 'resultados', 'personas', 'tecnologia', 'rumbo', 'diauno', 'espiral'];
const PESO_MAX = 40 * 1024;

// ── argumentos
const args = process.argv.slice(2);
const opt = { ss: 2, hoja: null, celda: 220, maestros: null, soloHoja: false };
const nombres = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--ss') opt.ss = Number(args[++i]);
  else if (a === '--hoja') opt.hoja = path.resolve(args[++i]);
  else if (a === '--celda') opt.celda = Number(args[++i]);
  else if (a === '--maestros') opt.maestros = path.resolve(args[++i]);
  else if (a === '--solo-hoja') opt.soloHoja = true;
  else if (TODOS.includes(a)) nombres.push(a);
  else { console.error('Argumento desconocido: ' + a); process.exit(2); }
}
const lista = nombres.length ? nombres : TODOS;

// ── servidor estático de solo lectura sobre la raíz del repo (el banco lee src/js/s-geom.js)
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.css': 'text/css' };
const servidor = http.createServer((req, res) => {
  const ruta = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let f = path.join(RAIZ, ruta);
  if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
const BASE = `http://127.0.0.1:${servidor.address().port}`;

// ── utilidades de imagen
function ffmpeg(argumentos, entrada) {
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...argumentos], { input: entrada, maxBuffer: 1 << 28 });
  if (r.status !== 0) throw new Error('ffmpeg: ' + r.stderr.toString());
}
const crudo = (tam) => ['-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${tam}x${tam}`, '-i', 'pipe:0', '-frames:v', '1'];

// Extiende el color de los bordes bajo los píxeles transparentes: el submuestreo de croma
// del WebP mezcla vecinos y, sin esto, los contornos salen con un filo oscuro.
function sangrar(rgba, tam, pasadas = 8) {
  const d = Buffer.from(rgba);
  const lleno = new Uint8Array(tam * tam);
  for (let i = 0; i < tam * tam; i++) lleno[i] = d[i * 4 + 3] > 0 ? 1 : 0;
  for (let p = 0; p < pasadas; p++) {
    const nuevos = [];
    for (let y = 0; y < tam; y++) for (let x = 0; x < tam; x++) {
      const i = y * tam + x;
      if (lleno[i]) continue;
      let r = 0, g = 0, b = 0, n = 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= tam || yy >= tam) continue;
        const j = yy * tam + xx;
        if (!lleno[j]) continue;
        r += d[j * 4]; g += d[j * 4 + 1]; b += d[j * 4 + 2]; n++;
      }
      if (n) nuevos.push([i, r / n, g / n, b / n]);
    }
    for (const [i, r, g, b] of nuevos) { d[i * 4] = r; d[i * 4 + 1] = g; d[i * 4 + 2] = b; lleno[i] = 1; }
  }
  return d;
}

// Reduce el alfa a «niveles» escalones (0 y 255 quedan exactos). El alfa del WebP va sin
// pérdida y, en piezas con mucho vidrio, es lo que más pesa.
function cuantizarAlfa(rgba, niveles) {
  if (niveles >= 256) return rgba;
  const d = Buffer.from(rgba), paso = 255 / (niveles - 1);
  for (let i = 3; i < d.length; i += 4) d[i] = Math.round(Math.round(d[i] / paso) * paso);
  return d;
}

// WebP con alfa: prueba pares (calidad, escalones de alfa) hasta entrar en el peso objetivo.
// El orden prima el color: antes de bajar de 84 se cuantiza el alfa, que a 96 o 64 escalones
// no se distingue y en las piezas con muchos contornos es lo que más pesa.
const ESCALERA = [[88, 256], [84, 256], [88, 96], [84, 96], [84, 64], [80, 64], [80, 48], [76, 48], [72, 48]];
function guardarWebp(rgba, tam, destino) {
  const base = sangrar(rgba, tam);
  for (const [q, niveles] of ESCALERA) {
    ffmpeg([...crudo(tam), '-c:v', 'libwebp', '-pix_fmt', 'yuva420p', '-quality', String(q), '-compression_level', '6', '-preset', 'picture', destino], cuantizarAlfa(base, niveles));
    if (fs.statSync(destino).size <= PESO_MAX) return `q ${q}` + (niveles < 256 ? `, alfa ${niveles}` : '');
  }
  return 'q 72, alfa 48 (sobre el objetivo)';
}

function guardarPng(rgba, tam, destino) {
  ffmpeg([...crudo(tam), '-pix_fmt', 'rgba', '-compression_level', '9', destino], rgba);
}

// Variante de 192 px para el srcset: el WebP de 512 reducido con Pillow (Lanczos, calidad 86,
// método 6), igual que las publicadas. Sin Python o sin Pillow avisa y sigue.
const PY192 = "import sys\nfrom PIL import Image\nImage.open(sys.argv[1]).convert('RGBA').resize((192, 192), Image.LANCZOS).save(sys.argv[2], quality=86, method=6)";
function guardar192(origen, destino) {
  const r = spawnSync('python3', ['-c', PY192, origen, destino]);
  if (r.status === 0) return true;
  console.log(`  sin variante de 192 px (python3 con Pillow): ${(r.stderr || r.error || '').toString().trim().split('\n').pop()}`);
  return false;
}

// ── render
const navegador = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
// Si algo falla, el navegador y el servidor se cierran igual: el proceso no se queda colgado.
try {
  const resumen = [];
  if (!opt.soloHoja) {
    fs.mkdirSync(SALIDA, { recursive: true });
    if (opt.maestros) fs.mkdirSync(opt.maestros, { recursive: true });
    for (const n of lista) {
      const t0 = Date.now();
      const pagina = await navegador.newPage({ viewport: { width: 768, height: 768 } });
      pagina.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log(`  [${n}] ${m.text()}`); });
      pagina.on('pageerror', (e) => console.log(`  [${n}] ${e.message}`));
      await pagina.goto(`${BASE}/tools/icons3d/index.html?icon=${n}&ss=${opt.ss}`);
      await pagina.waitForFunction(() => window.__listo || window.__error, null, { timeout: 300000, polling: 250 });
      const error = await pagina.evaluate(() => window.__error);
      if (error) throw new Error(`${n}: ${error}`);
      const leer = async (tam) => Buffer.from(await pagina.evaluate((t) => window.__exportar(t), tam), 'base64');
      if (opt.maestros) guardarPng(await leer(768), 768, path.join(opt.maestros, `${n}.png`));
      const q = guardarWebp(await leer(512), 512, path.join(SALIDA, `${n}.webp`));
      guardarPng(await leer(256), 256, path.join(SALIDA, `${n}.png`));
      const con192 = guardar192(path.join(SALIDA, `${n}.webp`), path.join(SALIDA, `${n}-192.webp`));
      await pagina.close();
      const kb = (f) => (fs.statSync(path.join(SALIDA, f)).size / 1024).toFixed(1);
      resumen.push(`${n.padEnd(11)} webp ${kb(n + '.webp').padStart(5)} KB (${q})` + (con192 ? ` · 192 ${kb(n + '-192.webp').padStart(4)} KB` : '') + ` · png ${kb(n + '.png').padStart(5)} KB · ${((Date.now() - t0) / 1000).toFixed(1)} s`);
      console.log(resumen.at(-1));
    }
  }

  // ── hoja de contacto: todos sobre noche y sobre papel, leídos del WebP publicado
  if (opt.hoja) {
    const c = opt.celda;
    const fila = (fondo, tinta) => `<div class="banda" style="background:${fondo};color:${tinta}">${TODOS.map((n) =>
      `<figure><img src="/assets/img/3d/${n}.webp?${Date.now()}" width="${c}" height="${c}"><figcaption>${n}</figcaption></figure>`).join('')}</div>`;
    const html = `<!doctype html><meta charset="utf-8"><style>
      body{margin:0;font:500 13px/1.2 system-ui,sans-serif;letter-spacing:.04em}
      .banda{display:flex;gap:8px;padding:28px 28px 20px}
      figure{margin:0;text-align:center}
      figcaption{opacity:.6;margin-top:4px;text-transform:uppercase;font-size:11px}
    </style>${fila('#051A2B', '#E0DFDA')}${fila('#F5F4F0', '#08263D')}`;
    const pagina = await navegador.newPage({ viewport: { width: TODOS.length * (c + 8) + 48, height: 400 } });
    await pagina.route(`${BASE}/__hoja`, (r) => r.fulfill({ contentType: 'text/html', body: html }));
    await pagina.goto(`${BASE}/__hoja`);
    await pagina.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 30000 });
    fs.mkdirSync(path.dirname(opt.hoja), { recursive: true });
    await pagina.screenshot({ path: opt.hoja, fullPage: true });
    console.log('hoja de contacto: ' + opt.hoja);
  }
} finally {
  await navegador.close();
  servidor.close();
}
