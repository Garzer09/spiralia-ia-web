/*
 * «lunes» · El curso acaba el viernes. Lo que cuenta empieza el lunes. (sección #lunes, «Después de la formación»)
 * 24 s, sin sonido. 16:9 (1920×1080) por defecto y 4:5 (1080×1350, html.v). Textos en copy.js.
 * Ritmo de 120 BPM: una negra = 0,5 s. Todo es función de t (sin azar ni temporizadores): pintar(t) coloca cada elemento.
 * Un solo ejemplo en toda la pieza: el informe mensual del área para el comité.
 *
 *  0,0–4,0   VIERNES   0,10 rótulo «Viernes 17:00» con reloj · 0,30 tarjeta de formación (papel): «Formación · Tu propia tarea»,
 *                      la tarea y el informe en miniatura · 0,75 se dibuja el visto · 0,95 «Hecho con IA en la sesión»
 *                      1,20 sube «El curso acaba / el viernes.»
 *  4,0–4,6   RUEDA     el día y la hora ruedan como un contador (Viernes→Lunes 4,0; 17:00→9:00 4,1) y las agujas giran;
 *                      la tarjeta y el titular se van (4,0–4,45)
 *  4,6–10,0  LUNES     4,40 bandeja · 4,60 entra el correo de Dirección «Informe mensual para el comité del jueves»
 *                      4,70 se abre el panel de IA de la empresa · 4,90–6,30 el encargo se escribe palabra a palabra, con cursor
 *                      6,35 enviar; la bandeja se apaga · 6,60 / 6,95 / 7,30 suben las tres líneas del borrador (hasta 7,85)
 *                      8,20 cae el sello «Lo mismo que practicó. En su mesa.»
 *                      8,30 (16:9) la bandeja deja sitio · 8,40 (4:5) la interfaz baja 120 px y deja sitio
 *                      8,60 sube «Lo que cuenta / empieza el lunes.»
 *                      9,85 se va el rótulo · 10,0 se va la interfaz · 10,2 se va el titular
 *  10,0–20,5 ESCALERA  10,15 se dibuja la base desde el centro (16:9) · 10,25 título pequeño «Y después, peldaño a peldaño»
 *                      peldaños 10,4 / 10,9 / 11,4 / 11,9 (suben desde la base, alturas crecientes; en 4:5, filas en diagonal)
 *                      13,0 cae el marcador blanco en el 1 y se enciende la huella; 13,35 «Tu equipo, el lunes»
 *                      14,2 salta en arco al 2 (giro de 90°), 14,8 el 2 se enciende y vuelve la etiqueta
 *                      15,0 llave «Formación a medida · Lo haces tú» (1-2) · 16,0 llave «Spiral · Lo construimos contigo» (3-4)
 *                      17,0 línea de «Alfabetización IA y Radar · Debajo de cada peldaño» por los cuatro; latido 17,9–20,4
 *  20,5–24,0 REMATE    el título se va (20,45) y suben «Lo haces tú el lunes.» (20,75) y «Y si quieres, subimos contigo.» (21,0, en blanco)
 *                      Desde 21,55 todo quieto: el último fotograma (remate, escalera, marcador en el 2, Formación a medida, Spiral y la base) es el póster.
 * Esquina: «Ejemplo ilustrativo» durante toda la pieza.
 */
(function (global) {
  'use strict';
  const T = 24, NS = 'http://www.w3.org/2000/svg';
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const sale = x => 1 - Math.pow(1 - clamp(x), 3);
  const io = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const pop = x => { const s = 1.7; x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
  const mezcla = (a, b, p) => a + (b - a) * p;
  const PELDANO = [10.4, 10.9, 11.4, 11.9];

  let raiz, C, V, G;
  const suben = [], aparecen = [], trazos = [], ruedas = [], barras = [], palabras = [], peldanos = [], nodos = [];
  let halo, agujaH, agujaM, tarjeta, bandeja, lista, nuevo, tinte, punto, panel, orbeAro, cursor, enviar, sello;
  let marcador, etiqueta, latido, destello;

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  const s = (tag, at, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); padre.append(e); return e; };
  // Línea que sube desde detrás de su máscara en t0 (y sale hacia arriba en t1)
  const linea = (padre, txt, cls, t0, t1 = null) => { const m = h('div', 'mascara ' + (cls || ''), null, padre), i = h('span', 'sube', txt, m); suben.push({ e: i, t0, t1 }); return i; };
  // Aparición de 0,5 s con 14 px de recorrido (y salida en t1). base: transformación fija del elemento
  const aparece = (e, t0, d = .5, t1 = null, d1 = .4, base = '') => { aparecen.push({ e, t0, d, t1, d1, base }); return e; };
  const trazo = (p, t0, d, ease = io) => { trazos.push({ p, t0, d, ease, L: 0 }); return p; };
  const lienzoSVG = cls => { const v = s('svg', { class: cls, viewBox: `0 0 ${G.ancho} ${G.alto}`, width: G.ancho, height: G.alto }, raiz); return v; };

  // Geometría de la escalera. 16:9: cuatro columnas de base común (x 160–1760). 4:5: cuatro filas que suben en diagonal
  function geometria() {
    if (V) {
      const W = 642, D = 90, H = 158, g = 58, y3 = 280;
      const esc = [0, 1, 2, 3].map(i => ({ x: 84 + i * D, y: y3 + (3 - i) * (H + g), w: W, h: H }));
      return { ancho: 1080, alto: 1350, esc, g, m: 34, arco: 70, marca: i => ({ x: esc[i].x + 28, y: esc[i].y - 34 }),
        halo: [{ x: 540, y: 860 }, { x: 560, y: 700 }] };
    }
    const base = 800, alt = [400, 460, 520, 580];
    const esc = alt.map((a, i) => ({ x: 160 + i * 400, y: base - a, w: 400, h: a }));
    return { ancho: 1920, alto: 1080, base, esc, m: 40, arco: 120, marca: i => ({ x: esc[i].x + esc[i].w - 20 - 40, y: esc[i].y - 40 }),
      halo: [{ x: 1320, y: 540 }, { x: 960, y: 640 }] };
  }

  function montar(r) {
    raiz = r; C = global.COPY[document.documentElement.lang] || global.COPY.es;
    V = document.documentElement.classList.contains('v'); G = geometria();
    h('div', 'fondo'); halo = h('div', 'halo');

    // ── Rótulo de día y hora: cada palabra en su ranura, que rueda como un contador ──
    const dia = h('div', 'dia');
    const reloj = s('svg', { class: 'reloj', viewBox: '0 0 54 54' }, dia);
    s('circle', { cx: 27, cy: 27, r: 25 }, reloj);
    agujaH = s('line', { x1: 27, y1: 27, x2: 27, y2: 14 }, reloj);
    agujaM = s('line', { x1: 27, y1: 27, x2: 27, y2: 7 }, reloj);
    s('circle', { class: 'eje', cx: 27, cy: 27, r: 2.6 }, reloj);
    aparece(reloj, .1, .5, 9.85, .4);
    [[C.viernes.dia, C.lunes.dia, ''], [C.viernes.hora, C.lunes.hora, 'r-hora']].forEach(([a, b, cls], k) => {
      const caja = h('div', 'rueda ' + cls, null, dia);
      ruedas.push({ caja, a: h('span', '', a, caja), b: h('span', '', b, caja), tIn: .1 + k * .12, tR: 4.0 + k * .1, tOut: 9.85 + k * .06 });
    });

    // ── Titulares, en el mismo hueco ──
    const t1 = h('div', 'titular'); C.viernes.txt.forEach((l, i) => linea(t1, l, '', 1.2 + i * .18, 4.0 + i * .05));
    const t2 = h('div', 'titular'); C.lunes.txt.forEach((l, i) => linea(t2, l, '', 8.6 + i * .18, 10.2 + i * .05));

    // ── Viernes: tarjeta de la sesión de formación ──
    tarjeta = h('div', 'tarjeta papel');
    h('p', 'rot', C.viernes.tarjeta, tarjeta);
    const cuerpo = h('div', 't-cuerpo', null, tarjeta);
    h('p', 'tarea', C.viernes.tarea, cuerpo);
    const doc = h('div', 'doc', null, cuerpo);
    h('b', '', null, doc); h('i', '', null, doc); h('i', '', null, doc); h('i', '', null, doc);
    const bs = h('div', 'barras', null, doc);
    [.5, .78, .62, 1].forEach((alto, i) => { const b = h('s', '', null, bs); b.style.height = (alto * 100) + '%'; barras.push({ e: b, t0: .55 + i * .08 }); });
    const pie = h('div', 't-pie', null, tarjeta);
    const visto = s('svg', { class: 'visto', viewBox: '0 0 52 52' }, pie);
    trazo(s('circle', { cx: 26, cy: 26, r: 24, transform: 'rotate(-90 26 26)' }, visto), .75, .45, sale);
    trazo(s('path', { d: 'M15 27 L23 34.5 L38 18.5' }, visto), 1.0, .3, sale);
    aparece(h('span', 'hecho', C.viernes.hecho, pie), .95, .5);

    // ── Lunes: la bandeja recibe el correo de la misma tarea ──
    bandeja = h('div', 'bandeja papel');
    const bc = h('div', 'b-cab', null, bandeja); h('i', '', null, bc); h('i', '', null, bc); h('i', '', null, bc); h('b', '', null, bc);
    const marco = h('div', '', null, bandeja); marco.style.cssText = 'position:relative;overflow:hidden;height:calc(100% - 54px)';
    lista = h('div', 'b-lista', null, marco);
    nuevo = h('div', 'correo nuevo', null, lista);
    tinte = h('i', 'tinte', null, nuevo);
    punto = h('i', 'punto', null, nuevo);
    const tx = h('div', 'txt', null, nuevo); h('p', 'de', C.lunes.de, tx); h('p', 'asunto', C.lunes.asunto, tx);
    h('span', 'rot hora', C.lunes.hora, nuevo);
    [[.34, .62], [.28, .5]].forEach(([a, b]) => {
      const v = h('div', 'correo viejo', null, lista); h('i', '', null, v);
      const c = h('div', '', null, v); c.style.cssText = 'flex:1;display:grid;gap:10px';
      const x1 = h('b', '', null, c), x2 = h('b', '', null, c); x1.style.width = (a * 100) + '%'; x2.style.width = (b * 100) + '%';
    });

    // ── Lunes: panel de IA de su empresa ──
    panel = h('div', 'panel papel');
    const pc = h('div', 'p-cab', null, panel);
    const orbe = s('svg', { class: 'orbe', viewBox: '0 0 44 44' }, pc);
    s('circle', { class: 'o1', cx: 22, cy: 22, r: 9 }, orbe);
    orbeAro = s('circle', { class: 'o2', cx: 22, cy: 22, r: 19, 'stroke-dasharray': '34 86' }, orbe);
    h('b', '', null, pc); h('b', '', null, pc);
    const enc = h('div', 'encargo', null, panel);
    const ws = C.lunes.encargo.split(' ');
    ws.forEach((w, k) => { palabras.push({ e: h('span', 'w', w, enc), t: 4.9 + 1.4 * k / ws.length }); if (k < ws.length - 1) palabras.push({ e: h('span', 'w', ' ', enc), t: 4.9 + 1.4 * (k + 1) / ws.length }); });
    cursor = h('i', 'cursor', null, enc);
    enviar = h('span', 'enviar', null, enc);
    const fl = s('svg', { viewBox: '0 0 54 54' }, enviar); s('path', { d: 'M27 37 V18 M19 25.5 L27 17.5 L35 25.5' }, fl);
    const bor = h('div', 'borrador', null, panel);
    C.lunes.borrador.forEach((l, i) => {
      const e = linea(bor, null, '', 6.6 + i * .35), k = l.indexOf(':');
      if (k > 0) { h('b', '', l.slice(0, k + 1), e); e.append(l.slice(k + 1)); } else e.textContent = l;
    });
    sello = h('div', 'sello', null, panel);
    C.lunes.sello.split(/(?<=\.)\s+/).forEach(l => h('div', '', l, sello));

    // ── La escalera ──
    const capa = lienzoSVG('base');
    if (!V) {
      const y = G.base;
      trazo(s('path', { class: 'suelo', d: `M960 ${y} L120 ${y}` }, capa), 10.15, .7);
      trazo(s('path', { class: 'suelo', d: `M960 ${y} L1800 ${y}` }, capa), 10.15, .7);
    }
    // Sombras debajo de todos los peldaños; en 16:9 se recortan en la base (los peldaños pisan el suelo)
    const capaS = h('div'); capaS.style.cssText = `position:absolute;left:0;top:0;width:${G.ancho}px;height:${V ? G.alto : G.base}px;overflow:hidden`;
    const sombras = G.esc.map(g => { const e = h('div', 'peldano', null, capaS); e.style.cssText = `left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px`; return e; });
    C.peldanos.forEach((d, i) => {
      const sombra = sombras[i];
      const p = h('div', 'peldano'); p.style.cssText = sombra.style.cssText + ';box-shadow:none';
      const caras = [h('div', 'cara', null, p), h('div', 'cara luz', null, p)];
      caras.forEach(c => {
        h('span', 'rot n', d.n, c); h('p', 'verbo', d.v, c); h('span', 'rot q', d.q, c); h('p', 'frase', d.d, c);
        const ej = h('p', 'ej', null, c); h('i', 'hoja', null, ej); h('span', '', d.e, ej);
      });
      caras[1].style.opacity = 0;
      peldanos.push({ p, sombra, luz: caras[1], t0: PELDANO[i] });
    });
    destello = h('div', 'destello'); destello.style.transformOrigin = V ? '0 50%' : '100% 50%';   // crece desde donde se posa el marcador
    marcador = h('div', 'marcador');
    etiqueta = h('p', 'rot m-etq', C.marcador);

    // Llaves de la Formación a medida (1-2) y Spiral (3-4) y la línea de la base (Alfabetización IA y Radar) por los cuatro
    const tramo = (d, cls) => { const e = h('div', 'tramo ' + (cls || '')); h('span', 'p', d.p, e); h('i', 'sep', null, e); h('span', 'd', d.d, e); return e; };
    const [pp, pd] = C.pulso.split(' · ');
    const lp = tramo({ p: pp, d: pd }, 'pul');
    if (!V) {
      const y = G.base + 26;
      C.tramos.forEach((d, k) => {
        const x1 = 176 + k * 800, x2 = 944 + k * 800, cx = (x1 + x2) / 2, t0 = 15.0 + k;
        trazo(s('path', { class: 'llave', d: `M${cx} ${y + 12} L${cx - 12} ${y} L${x1} ${y} L${x1} ${y - 14}` }, capa), t0, .6);
        trazo(s('path', { class: 'llave', d: `M${cx} ${y + 12} L${cx + 12} ${y} L${x2} ${y} L${x2} ${y - 14}` }, capa), t0, .6);
        const e = tramo(d); e.style.left = cx + 'px'; e.style.top = (y + 30) + 'px';
        aparece(e, t0 + .25, .5, null, .4, 'translateX(-50%)');
      });
      const yp = 930;
      trazo(s('path', { class: 'pulso', d: `M160 ${yp} L1760 ${yp}` }, capa), 17.0, .9);
      G.esc.forEach((g, k) => {
        const cx = g.x + g.w / 2;
        const n = s('circle', { class: 'nodo', cx, cy: yp, r: 6 }, capa);
        const luz = s('circle', { cx, cy: yp, r: 4, fill: '#FFFFFF' }, capa);
        nodos.push({ n, luz, x: cx, t0: 17.0 + .9 * (cx - 160) / 1600 });
      });
      lp.style.left = '960px'; lp.style.top = (yp + 22) + 'px';
      aparece(lp, 17.3, .5, null, .4, 'translateX(-50%)');
      G.pulso = { x0: 160, x1: 1760, y: yp };
    } else {
      const { esc, g } = G, H = esc[0].h;
      // Formación a medida: a la derecha de las filas 1 y 2, con el rótulo a la altura de la 1
      const r0 = esc[0].x + esc[0].w, r1 = esc[1].x + esc[1].w, gm0 = esc[0].y - g / 2, ym0 = esc[0].y + H / 2;
      trazo(s('path', { class: 'llave', d: `M${r1 + 8} ${esc[1].y + 10} L${r1 + 22} ${esc[1].y + 10} L${r1 + 22} ${gm0} L${r0 + 22} ${gm0} L${r0 + 22} ${esc[0].y + H - 10} L${r0 + 8} ${esc[0].y + H - 10}` }, capa), 15.0, .6);
      trazo(s('path', { class: 'llave', d: `M${r0 + 22} ${ym0} L${r0 + 34} ${ym0}` }, capa), 15.3, .2);
      const e0 = tramo(C.tramos[0]); e0.style.left = (r0 + 48) + 'px'; e0.style.top = ym0 + 'px';
      aparece(e0, 15.25, .5, null, .4, 'translateY(-50%)');
      // Spiral: a la izquierda de las filas 3 y 4, con el rótulo a la altura de la 4
      const l2 = esc[2].x, l3 = esc[3].x, gm2 = esc[2].y - g / 2, ym3 = esc[3].y + H / 2;
      trazo(s('path', { class: 'llave', d: `M${l3 - 8} ${esc[3].y + 10} L${l3 - 22} ${esc[3].y + 10} L${l3 - 22} ${gm2} L${l2 - 22} ${gm2} L${l2 - 22} ${esc[2].y + H - 10} L${l2 - 8} ${esc[2].y + H - 10}` }, capa), 16.0, .6);
      trazo(s('path', { class: 'llave', d: `M${l3 - 22} ${ym3} L${l3 - 34} ${ym3}` }, capa), 16.3, .2);
      const e1 = tramo(C.tramos[1], 'dcha'); e1.style.right = (G.ancho - (l3 - 48)) + 'px'; e1.style.top = ym3 + 'px';
      aparece(e1, 16.25, .5, null, .4, 'translateY(-50%)');
      // La base: una línea fina bajo las cuatro filas
      const yp = esc[0].y + H + 92;
      trazo(s('path', { class: 'pulso', d: `M84 ${yp} L996 ${yp}` }, capa), 17.0, .9);
      lp.style.left = '84px'; lp.style.top = (yp - 58) + 'px';
      aparece(lp, 17.3, .5);
      G.pulso = { x0: 84, x1: 996, y: yp };
    }
    latido = h('div', 'latido');

    // Cabecera: título pequeño y, al final, el remate
    const cab = h('div', 'cabecera');
    const et = h('div', 'esc-t', null, cab); linea(et, C.escalera, '', 10.25, 20.45);
    const rm = h('div', 'remate', null, cab);
    C.remate.forEach((l, i) => linea(rm, l, i ? 'blanco' : '', 20.75 + i * .25));   // entra cuando el título ya ha salido

    aparece(h('p', 'rot ilus', C.ilus), .4, .6);
  }

  function pintar(t) {
    t = clamp(t, 0, T);
    const ph = io((t - 9.9) / 1.4);
    halo.style.transform = `translate(${mezcla(G.halo[0].x, G.halo[1].x, ph).toFixed(1)}px, ${mezcla(G.halo[0].y, G.halo[1].y, ph).toFixed(1)}px)`;

    for (const l of suben) {
      const a = sale((t - l.t0) / .55), b = l.t1 == null ? 0 : io((t - l.t1) / .45);
      l.e.style.transform = `translateY(${((1 - a) * 108 - b * 108).toFixed(2)}%)`;
    }
    for (const a of aparecen) {
      const p = sale((t - a.t0) / a.d), q = a.t1 == null ? 0 : io((t - a.t1) / a.d1);
      a.e.style.opacity = (p * (1 - q)).toFixed(3);
      a.e.style.transform = `${a.base} translateY(${((1 - p) * 14 - q * 14).toFixed(1)}px)`;
    }
    for (const z of trazos) {
      if (!z.L) { z.L = z.p.getTotalLength() || 1; z.p.style.strokeDasharray = `${z.L} ${z.L}`; }
      const k = z.ease((t - z.t0) / z.d);
      z.p.style.strokeDashoffset = (z.L * (1 - k)).toFixed(1);
      z.p.style.visibility = k > 0 ? 'visible' : 'hidden';
    }

    // Día y hora: entran, ruedan a las 4,0 y se van a las 10,0. La ranura se ajusta al ancho de la palabra
    for (const r of ruedas) {
      const pin = sale((t - r.tIn) / .55), pr = io((t - r.tR) / .5), po = io((t - r.tOut) / .45);
      r.a.style.transform = `translateY(${((1 - pin) * 108 - pr * 108).toFixed(2)}%)`;
      r.b.style.transform = `translateY(${((1 - pr) * 108 - po * 108).toFixed(2)}%)`;
      r.caja.style.width = mezcla(r.a.offsetWidth, r.b.offsetWidth, pr).toFixed(1) + 'px';
    }
    const ag = io((t - 4.0) / .6);
    agujaH.setAttribute('transform', `rotate(${(150 + 480 * ag).toFixed(1)} 27 27)`);
    agujaM.setAttribute('transform', `rotate(${(720 * ag).toFixed(1)} 27 27)`);

    // Viernes: la tarjeta entra, se completa y se va con el día
    {
      const pin = sale((t - .3) / .6), po = io((t - 4.0) / .45);
      tarjeta.style.opacity = (pin * (1 - po)).toFixed(3);
      tarjeta.style.transform = `translateY(${((1 - pin) * 24 - po * 34).toFixed(1)}px) scale(${(1 - po * .04).toFixed(4)})`;
      for (const b of barras) b.e.style.transform = `scaleY(${sale((t - b.t0) / .45).toFixed(3)})`;
    }

    // Lunes: bandeja, correo, panel, encargo, borrador y sello
    {
      const pin = sale((t - 4.4) / .45), pd = io((t - 6.4) / .5), po = io((t - (V ? 10.0 : 8.3)) / .4);
      const baja = V ? -120 * (1 - io((t - 8.4) / .55)) : 0;   // 4:5: la interfaz baja y deja sitio al titular
      bandeja.style.opacity = (pin * (1 - .62 * pd) * (1 - po)).toFixed(3);
      bandeja.style.transform = (V ? `translateY(${((1 - pin) * 16 + po * 24 + baja).toFixed(1)}px)` : `translate(${(-po * 40).toFixed(1)}px, ${((1 - pin) * 16).toFixed(1)}px)`) + ` scale(${(1 - .03 * pd).toFixed(4)})`;
      const pc = sale((t - 4.6) / .5);
      lista.style.transform = `translateY(${(-120 * (1 - pc)).toFixed(1)}px)`;
      nuevo.style.opacity = sale((t - 4.6) / .35).toFixed(3);
      tinte.style.opacity = mezcla(.16, .06, io((t - 5.2) / .8)).toFixed(3);
      punto.style.transform = `scale(${t < 4.8 ? 0 : pop((t - 4.8) / .35).toFixed(3)})`;

      const pp = sale((t - 4.7) / .5), pq = io((t - 10.0) / .4);
      const j = clamp((t - 8.36) / .24), salto = j > 0 && j < 1 ? Math.sin(j * Math.PI * 3) * (1 - j) * 5 : 0;
      panel.style.opacity = (clamp((t - 4.7) / .12) * (1 - pq)).toFixed(3);
      panel.style.clipPath = pp < 1 ? `inset(0 0 ${((1 - pp) * 100).toFixed(2)}% 0 round 18px)` : 'none';
      panel.style.transform = `translateY(${((1 - pp) * -10 + pq * 24 + salto + baja).toFixed(1)}px)`;
      orbeAro.setAttribute('transform', `rotate(${(80 * t + 420 * clamp(t - 6.35, 0, 1.6)).toFixed(1)} 22 22)`);
      for (const w of palabras) w.e.classList.toggle('on', t >= w.t);
      const escribe = t >= 4.9 && t < 6.3, parpadeo = Math.floor(t / .25) % 2 === 0;
      cursor.style.opacity = t >= 4.75 && t < 6.6 && (escribe || parpadeo) ? 1 : 0;
      const pe = clamp((t - 6.35) / .3);
      enviar.style.transform = `scale(${(1 + .16 * Math.sin(Math.PI * pe)).toFixed(3)})`;
      enviar.style.background = t >= 6.35 ? '#08263D' : '#174467';
      const k = clamp((t - 8.2) / .3);
      sello.style.opacity = clamp(k * 4).toFixed(3);
      sello.style.transform = `rotate(-5deg) scale(${(1.5 - .5 * pop(k)).toFixed(4)})`;
    }

    // Escalera: los peldaños suben desde la base; su sombra llega al final
    for (const p of peldanos) {
      const k = sale((t - p.t0) / .85);
      p.p.style.clipPath = k < 1 ? `inset(${((1 - k) * 100).toFixed(2)}% 0 0 0)` : 'none';
      p.p.style.visibility = k > 0 ? 'visible' : 'hidden';
      p.sombra.style.opacity = sale((t - p.t0 - .45) / .6).toFixed(3);
    }
    peldanos[1].luz.style.opacity = sale((t - 14.78) / .35).toFixed(3);

    // Marcador: cae en el 1 (13,0) y salta en arco al 2 (14,2), girando un cuarto de vuelta
    {
      const P0 = G.marca(0), P1 = G.marca(1);
      let x = P0.x, y = P0.y, rot = 0, sx = 1, sy = 1;
      if (t < 14.2) { y = P0.y - 260 * (1 - sale((t - 13.0) / .45)); }
      else { const p = io((t - 14.2) / .62); x = mezcla(P0.x, P1.x, p); y = mezcla(P0.y, P1.y, p) - G.arco * Math.sin(Math.PI * p); rot = 90 * p; }
      for (const tl of [13.45, 14.82]) { const q = clamp((t - tl) / .2); if (q > 0 && q < 1) { const a = Math.sin(Math.PI * q) * .14; sx = 1 + a; sy = 1 - a; } }
      marcador.style.opacity = clamp((t - 13.0) / .08).toFixed(3);
      // Al posarse, la huella del peldaño se enciende un instante
      const i = t < 14.6 ? 0 : 1, g = G.esc[i], f = clamp((t - (i ? 14.8 : 13.43)) / .7);
      destello.style.left = g.x + 'px'; destello.style.top = (g.y - 1) + 'px'; destello.style.width = g.w + 'px';
      destello.style.opacity = (f > 0 ? Math.pow(1 - f, 2) * (i ? .5 : .9) : 0).toFixed(3);
      destello.style.transform = `scaleX(${(.25 + .75 * sale(f * 1.6)).toFixed(3)})`;
      // El aplastamiento se ancla abajo (el giro va sobre el centro)
      marcador.style.transform = `translate(${x.toFixed(1)}px, ${(y + G.m * (1 - sy) / 2).toFixed(1)}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)}) rotate(${rot.toFixed(1)}deg)`;
      const enDos = t >= 14.6, P = enDos ? P1 : P0;
      const pl = enDos ? sale((t - 14.95) / .45) : sale((t - 13.35) / .45) * (1 - io((t - 14.2) / .16));
      etiqueta.style.opacity = pl.toFixed(3);
      const m = G.m;
      if (V) { etiqueta.style.left = (P.x + m + 16) + 'px'; etiqueta.style.top = (P.y + m / 2 - 15) + 'px'; etiqueta.style.transform = `translateX(${((1 - pl) * 14).toFixed(1)}px)`; }
      else { etiqueta.style.right = (G.ancho - (P.x - 18)) + 'px'; etiqueta.style.top = (P.y + m / 2 - 13) + 'px'; etiqueta.style.transform = `translateX(${(-(1 - pl) * 14).toFixed(1)}px)`; }
    }

    // La base: los nodos se encienden al paso de la línea y del latido (dos pasadas, 17,9–20,4)
    const L = G.pulso, u = (t - 17.9) / 1.25, pasada = u >= 0 && u < 2 ? u % 1 : -1;
    const lx = pasada < 0 ? L.x0 : mezcla(L.x0, L.x1, io(pasada)), lo = pasada < 0 ? 0 : Math.sin(Math.PI * pasada);
    latido.style.opacity = lo.toFixed(3);
    latido.style.transform = `translate(${lx.toFixed(1)}px, ${L.y}px)`;
    for (const n of nodos) {
      const k = clamp((t - n.t0) / .3);
      n.n.setAttribute('r', (k > 0 ? 6 * pop(k) : 0).toFixed(2));
      n.luz.setAttribute('opacity', (Math.max(0, 1 - Math.abs(lx - n.x) / 90) * lo).toFixed(3));
    }
  }

  global.PIEZA = { montar, pintar, duracion: T };
})(window);
