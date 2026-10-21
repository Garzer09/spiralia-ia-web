/*
 * Agentes · La misma propuesta comercial, hoy y con un agente (producto Spiral) · 20 s, sin sonido.
 * 16:9 (1920×1080) por defecto y 4:5 (1080×1350, html.v). Todo es función de t (sin azar ni temporizadores):
 * pintar(t) coloca cada elemento. Textos en copy.js. Referencia: pieza N11 del deck de Santander (ventanas que se
 * apilan con contador vivo, «antes» que se encoge y se apaga, marco que se dibuja y sello).
 * Una idea: HOY la persona hace los seis pasos y es el pegamento entre cuatro aplicaciones; CON UN AGENTE el agente
 * hace los pasos solo, deja registro de cada uno y se para en el único punto que importa para que una persona decida.
 *
 *  0,00–1,50  Cabecera «La propuesta comercial» (sube a 0,15). Rótulo «Hoy» y «Ejemplo ilustrativo» (0,60).
 *  1,50–5,70  Seis ventanas en cascada, una cada 0,75 s (1,50 · 2,25 · 3,00 · 3,75 · 4,50 · 5,25): cae la ventana,
 *             a +0,10 rueda el contador («1 paso · 1 aplicación · todo a mano» … «6 pasos · 4 aplicaciones»),
 *             a +0,22 asoma el avatar «Tú» por su borde y a +0,28 un hilo lo cose al de la ventana anterior.
 *             Teams y aprobaciones: a +0,50 el chip «Esperando respuesta…» con un reloj que gira.
 *  6,30       Una chispa recorre el hilo y sube «Tú eres el pegamento entre seis pasos.»
 *  7,00–7,70  La pila se encoge a 0,82 y se apaga hacia la izquierda. En 4:5 se recoge en un montón arriba a la
 *             derecha; el rótulo y el contador se apagan y reaparecen a su izquierda (7,60), sin cruzarse.
 *  7,50–8,05  Se dibuja el marco del panel; 7,55 rótulo «Con un agente»; 7,70–8,15 el papel se descubre de arriba
 *             abajo y crece su sombra.
 *  8,00–11,20 Pasos 1–4 del agente, 0,8 s cada uno: indicador que gira y barra de progreso → visto.
 *             Registro (columna en 16:9, subtítulo de cada paso en 4:5), escrito letra a letra: 8,05 · 8,80 · 9,60 · 10,40.
 *  11,20      Entra el paso 5. 11,50 todo se para: la fila se enciende, el resto se apaga un poco, chip «En pausa ·
 *             Te toca decidir» (late mientras espera) y registro 09:27. 11,75 el avatar «Tú» asoma por el borde del
 *             panel (el mismo que en cada ventana de Hoy: allí seis, aquí uno). 11,90 «Tu parte: una decisión».
 *  12,60      Cae el sello «Lo decide y lo firma una persona» (golpe a 12,82) y el paso 5 queda decidido.
 *  12,60–13,40 Paso 6. 13,40 registro 11:40 · Lista para firmar.
 *  14,50      Sale la cabecera; 14,75 «El agente prepara.» 15,15 «Una persona decide.» (en blanco).
 *  14,55      Salen el contador y el pegamento; en 16:9 la pila apagada sube a la línea del panel (14,55–15,35).
 *  15,50      Resumen de Hoy · 15,90 resumen de Con un agente.
 *  16,40–20,0 Quieto: el último fotograma (remate, pila apagada, panel completo con registro y sello) es el póster.
 */
(function (global) {
  'use strict';
  const T = 20, NS = 'http://www.w3.org/2000/svg';
  const TV = [1.5, 2.25, 3, 3.75, 4.5, 5.25];
  const PEGA = 6.3, ENC = 7, ENC_D = .7, MARCO = 7.5, LLENO = 7.7, CON = 7.55;
  const PASO = [8, 8.8, 9.6, 10.4, 11.2, 12.6], HECHO = [8.8, 9.6, 10.4, 11.2, 12.6, 13.4];
  const PAUSA = 11.5, AVATAR = 11.75, TUPARTE = 11.9, SELLO = 12.6, GOLPE = SELLO + .22;
  const REG = [8.05, 8.8, 9.6, 10.4, 11.55, 13.4];
  // 4:5: cada paso lleva como subtítulo su línea del registro [línea, instante]; en el paso 1 la segunda releva a la primera
  const SUB = [[[0, 8.05], [1, 8.8]], [[2, 9.6]], [[3, 10.4]], [], [[4, 11.55]], [[5, 13.4]]];
  const SALE_CAB = 14.5, REMATE = [14.75, 15.15], RES = [15.5, 15.9];

  // Geometría de cada formato (las tipografías y los colores, en el CSS)
  const GEO = {
    h: {
      W: 1920, ven: { w: 540, h: 138, dx: 26, dy: 100, fila: 79, esq: [106, 120] },
      hoy: [640, 176], off: { t: 0, cont: 46, pila: 116, pega: 782 },
      fin: { x: 120, y: 214, s: .82 },
      titulo: [120, 62], remate: [120, 56], ilus: [1800, 88],
      conT: [750, 214], panel: [750, 258, 1050, 640], fila0: 34, filaH: 82,
      sello: [827, 448], res: { hoy: [120, 930], con: [750, 930] },
      luz: [[975, 600], [1275, 578], [960, 560]],
    },
    v: {
      W: 1080, ven: { w: 700, h: 150, dx: 28, dy: 110, fila: 86, esq: [116, 130] },
      hoy: [120, 190], off: { t: 0, cont: 46, pila: 122, pega: 852 },
      fin: { t: [64, 232, 1], cont: [64, 278, .74], pila: [680, 236, .4], dy: 40 },
      titulo: [64, 58], remate: [64, 54], ilus: [1016, 1268],
      conT: [64, 398], panel: [64, 442, 952, 700], fila0: 24, filaH: 88,
      sello: [730, 626], res: { hoy: [64, 278], con: [64, 1168] },
      luz: [[540, 650], [540, 800], [540, 720]],
    },
  };

  // Glifos de las aplicaciones, dibujados (24×24, trazo)
  const GLIFO = {
    Outlook: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.8 7.2l8.2 6 8.2-6"/>',
    SharePoint: '<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>',
    Teams: '<path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6.5L6 20v-4H7a3 3 0 0 1-3-3z"/><circle class="p" cx="9" cy="10" r="1.2"/><circle class="p" cx="12" cy="10" r="1.2"/><circle class="p" cx="15" cy="10" r="1.2"/>',
    PowerPoint: '<rect x="3" y="4" width="18" height="13" rx="1.6"/><path d="M8.5 21h7M12 17v4M8 13.5v-2.5M12 13.5V8M16 13.5V10"/>',
  };

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const sale = x => 1 - Math.pow(1 - clamp(x), 3);
  const io = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const expo = x => { x = clamp(x); return x === 1 ? 1 : 1 - Math.pow(2, -9 * x); };
  const pop = x => { const s = 1.7; x = clamp(x); return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
  const f = (x, d = 3) => x.toFixed(d);

  let raiz, C, V, G, luz, titulo, remate = [], ilus, hoyT, cont, pila, pega, resHoy = [], resCon = [];
  let hilo, segs = [], chispa, vens = [], conT, panel, marco, rectM, papel, sombra, filas = [], divi, regT, regs = [], pieR, tuparte, sello, selloO, tuP;
  let cuentas = [], apps = [];

  const h = (tag, cls, txt, padre) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; (padre || raiz).append(e); return e; };
  const s = (tag, at, padre) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); if (padre) padre.append(e); return e; };
  // Butler no trae dibujada la «ú» (su glifo está vacío): se compone con «u» y el acento suelto «´» encima
  const butler = txt => String(txt).replace(/ú/g, '<span class="ua">u<i>´</i></span>');
  // Línea que sube desde detrás de una máscara
  const linea = (padre, txt, cls) => { const m = h('div', 'mascara ' + (cls || ''), null, padre), e = h('span', 'sube', null, m); e.innerHTML = butler(txt); return e; };
  const sube = (e, t, t0, t1) => {
    const p = sale((t - t0) / .55), q = t1 == null ? 0 : io((t - t1) / .45);
    e.style.transform = `translateY(${f((1 - p) * 108 - q * 108, 2)}%)`;
  };
  // Escritura letra a letra con cursor; el texto se parte en hora («09:02 · ») y frase
  function maquina(padre) {
    const hora = h('span', 'hora', '', padre), txt = h('span', 'txt', '', padre), caret = h('i', 'caret', null, padre);
    return { hora, txt, caret, k: null, n: -1 };
  }
  function escribe(m, linea, t, t0) {
    if (linea == null || t < t0) { if (m.n !== 0 || m.k !== linea) { m.hora.textContent = ''; m.txt.textContent = ''; m.n = 0; m.k = linea; } m.caret.style.opacity = 0; return; }
    const i = linea.indexOf(' · '), a = i < 0 ? '' : linea.slice(0, i + 3), b = i < 0 ? linea : linea.slice(i + 3);
    const total = a.length + b.length, dur = Math.min(.55, total * .015), n = Math.round(total * clamp((t - t0) / dur));
    if (n !== m.n || m.k !== linea) { m.hora.textContent = a.slice(0, n); m.txt.textContent = b.slice(0, Math.max(0, n - a.length)); m.n = n; m.k = linea; }
    const tras = t - t0 - dur;
    m.caret.style.opacity = tras < 0 ? 1 : tras < .9 && (tras % .4) < .22 ? 1 : 0;
  }

  // Lo que sale de la pila de Hoy: dónde está cada pieza en la primera parte (e = 0) y una vez encogida (e = 1)
  function sitio(nombre, e) {
    const A = [G.hoy[0], G.hoy[1] + G.off[nombre]];
    const B = V ? (G.fin[nombre] || [A[0], A[1], 1]) : [G.fin.x, G.fin.y + G.off[nombre] * G.fin.s, G.fin.s];
    return [lerp(A[0], B[0], e), lerp(A[1], B[1], e), lerp(1, B[2], e)];
  }
  const coloca = (e, x, y, k = 1) => { e.style.transform = `translate(${f(x, 1)}px, ${f(y, 1)}px) scale(${f(k, 4)})`; };

  function textoCuenta(n) {
    if (!n) return '';
    const c = C.contador, a = apps[n - 1];
    return butler(c.plantilla).replace('{p}', `<b>${n}</b>`).replace('{pasos}', c.pasos[n === 1 ? 0 : 1]).replace('{a}', `<b>${a}</b>`).replace('{apps}', c.apps[a === 1 ? 0 : 1]);
  }

  function montar(r) {
    raiz = r; C = global.COPY[document.documentElement.lang] || global.COPY.es;
    V = document.documentElement.classList.contains('v'); G = V ? GEO.v : GEO.h;
    const vis = new Set(); C.ventanas.forEach(w => { vis.add(w.app); apps.push(vis.size); });

    luz = h('div', 'luz'); h('div', 'reja'); h('div', 'vin');

    // ── Hoy ──
    hoyT = h('p', 'rotulo hoyT', C.hoy);
    cont = h('div', 'cont');
    const cm = h('div', 'mascara', null, cont);
    cuentas = [h('span', 'sube', '', cm), h('span', 'sube', '', cm)];
    cuentas.forEach(x => { x.dataset.n = -1; });
    pila = h('div', 'pila');
    hilo = s('svg', { class: 'hilo' }, pila);
    const W = G.ven, pts = [];
    C.ventanas.forEach((d, i) => {
      const rot = (i % 2 ? 1 : -1) * .7;
      // Centro del avatar (en el borde izquierdo, a la altura de la tarea), girado con su ventana
      const cx = i * W.dx + W.w / 2, cy = i * W.dy + W.h / 2, px = i * W.dx - cx, py = i * W.dy + W.fila - cy, a = rot * Math.PI / 180;
      pts.push([cx + px * Math.cos(a) - py * Math.sin(a), cy + px * Math.sin(a) + py * Math.cos(a)]);
      const e = h('div', 'ven', null, pila);
      const b = h('div', 'ven-b', null, e);
      const g = s('svg', { class: 'glifo', viewBox: '0 0 24 24' }, b); g.innerHTML = GLIFO[d.app] || GLIFO.Outlook;
      const app = h('span', 'app', d.app, b);
      let chip = null, aguja = null;
      if (d.espera) {
        chip = h('span', 'chip-e', null, b);
        const rl = s('svg', { class: 'reloj', viewBox: '0 0 24 24' }, chip);
        s('circle', { cx: 12, cy: 12, r: 9 }, rl); aguja = s('path', { d: 'M12 12V6.5' }, rl); s('path', { d: 'M12 12h3.6' }, rl);
        h('span', '', C.espera, chip);
      }
      const tx = h('p', 'ven-t', d.t, e);
      const e1 = h('i', 'esq', null, e), e2 = h('i', 'esq', null, e);
      e1.style.top = W.esq[0] + 'px'; e1.style.width = '58%'; e2.style.top = W.esq[1] + 'px'; e2.style.width = '36%';
      const velo = h('i', 'velo', null, e);
      const tu = h('span', 'tu', C.tu, e); tu.style.top = (W.fila - (V ? 29 : 27)) + 'px';
      vens.push({ e, t0: TV[i], rot, velo, tu, chip, aguja, txt: [app, tx, e1, e2] });
    });
    // El hilo que cose los avatares: una curva que sale hacia la izquierda entre cada dos ventanas
    let todo = `M${f(pts[0][0], 1)} ${f(pts[0][1], 1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], k = W.dy * .42;
      const c = `C${f(x0 - 64, 1)} ${f(y0 + k, 1)} ${f(x1 - 64, 1)} ${f(y1 - k, 1)} ${f(x1, 1)} ${f(y1, 1)}`;
      segs.push(s('path', { d: `M${f(x0, 1)} ${f(y0, 1)} ${c}`, pathLength: 1 }, hilo));
      todo += ' ' + c;
    }
    chispa = s('path', { d: todo, pathLength: 1, class: 'chispa' }, hilo);
    // El hilo va detrás de las ventanas
    pila.prepend(hilo);
    pega = h('div', 'pega'); pega._s = linea(pega, C.pegamento);

    // ── Con un agente ──
    conT = h('p', 'rotulo conT', C.con);
    panel = h('div', 'panel');
    const [px, py, pw, ph] = G.panel;
    panel.style.width = pw + 'px'; panel.style.height = ph + 'px';
    marco = s('svg', { class: 'marco', width: pw, height: ph, viewBox: `0 0 ${pw} ${ph}` }, panel);
    rectM = s('rect', { x: 1, y: 1, width: pw - 2, height: ph - 2, rx: 20, pathLength: 1 }, marco);
    sombra = h('div', 'sombra', null, panel); papel = h('div', 'papel', null, panel);
    if (!V) {
      divi = h('i', 'divi', null, panel);
      const rg = h('div', 'reg', null, panel);
      regT = h('p', 'rotulo reg-t', C.registro_t, rg);
      C.registro.forEach(() => { const l = h('p', 'reg-l', null, rg); regs.push({ l, m: maquina(l) }); });
    }
    C.pasos.forEach((d, k) => {
      const e = h('div', 'paso' + (d.persona ? ' persona' : ''), null, panel);
      e.style.top = (G.fila0 + k * G.filaH) + 'px';
      const banda = d.persona ? h('i', 'banda', null, e) : null;
      const ind = s('svg', { class: 'ind', viewBox: '0 0 40 40' }, e);
      const anillo = s('circle', { class: 'anillo', cx: 20, cy: 20, r: 15 }, ind);
      const giro = s('circle', { class: 'giro', cx: 20, cy: 20, r: 15, pathLength: 100 }, ind);
      const lleno = s('circle', { class: 'lleno', cx: 20, cy: 20, r: 16 }, ind);
      const visto = s('path', { class: 'visto', d: 'M13.2 20.6l4.6 4.6 8.8-9.6', pathLength: 1 }, ind);
      let pausa = null;
      if (d.persona) { pausa = s('g', { class: 'pausa' }, ind); s('rect', { x: 15, y: 13.5, width: 3.4, height: 13, rx: 1.2 }, pausa); s('rect', { x: 21.6, y: 13.5, width: 3.4, height: 13, rx: 1.2 }, pausa); }
      const c = h('div', 'paso-c', null, e), l1 = h('p', 'l1', null, c), l2 = h('p', 'l2', null, c);
      let sub = null;
      if (!V) { h('span', 'quien', d.who, l1); h('span', 'paso-t', d.t, l2); }
      else { h('span', 'paso-t', d.t, l1); h('span', 'quien', d.who, l2); sub = maquina(h('span', 'sub', null, l2)); }
      let chip = null, chipO = null;
      if (d.persona) { chip = h('span', 'chip-p', C.pausa, l1); chipO = h('i', 'chip-o', null, chip); }
      const prog = d.persona ? null : h('i', 'prog', null, e);
      if (k < C.pasos.length - 1) h('i', 'sep', null, e);
      filas.push({ e, persona: !!d.persona, banda, anillo, giro, lleno, visto, pausa, chip, chipO, prog, sub });
    });
    pieR = h('i', 'pie-r', null, panel);
    const [tp1, tp2] = (() => { const i = C.tu_parte.indexOf(':'); return i < 0 ? ['', C.tu_parte] : [C.tu_parte.slice(0, i + 1), C.tu_parte.slice(i + 1)]; })();
    const tpm = h('div', 'mascara tuparte', null, panel); tuparte = h('span', 'sube', null, tpm);
    h('i', '', null, tuparte).innerHTML = butler(tp1); tuparte.insertAdjacentHTML('beforeend', butler(tp2));
    sello = h('div', 'sello', null, panel); C.sello.forEach(l => h('span', '', l, sello).style.display = 'block');
    selloO = h('i', 'sello-o', null, sello);
    sello.style.left = G.sello[0] + 'px'; sello.style.top = G.sello[1] + 'px';
    tuP = h('span', 'tu', C.tu, panel);
    tuP.style.top = (G.fila0 + 4 * G.filaH + G.filaH / 2 - (V ? 29 : 27)) + 'px';

    // ── Cabecera, remate, resúmenes y rótulo ──
    const cab = h('div', 'titulo'); titulo = linea(cab, C.titulo); coloca(cab, ...G.titulo);
    const rem = h('div', 'remate'); C.remate.forEach((l, i) => remate.push(linea(rem, l, i ? 'blanco' : ''))); coloca(rem, ...G.remate);
    const rh = h('div', 'res hoy'); C.resumen.hoy.forEach(l => resHoy.push(linea(rh, l))); coloca(rh, ...G.res.hoy);
    const rc = h('div', 'res con'); (V ? [C.resumen.con.join(' ')] : C.resumen.con).forEach(l => resCon.push(linea(rc, l))); coloca(rc, ...G.res.con);
    ilus = h('p', 'rotulo ilus', C.ilus);
    ilus.style.left = 'auto'; ilus.style.right = (G.W - G.ilus[0]) + 'px'; ilus.style.top = G.ilus[1] + 'px'; ilus.style.transformOrigin = '100% 0';
  }

  const aparece = (e, t, t0, tope = 1, d = .5, extra = '') => {
    const p = sale((t - t0) / d); e.style.opacity = f(p * tope); e.style.transform = `${extra} translateY(${f((1 - p) * 14, 1)}px)`; return p;
  };

  function pintar(t) {
    t = clamp(t, 0, T);
    const e = io((t - ENC) / ENC_D);

    // Luz: sigue al foco (pila → panel → remate)
    const L = G.luz, q1 = io((t - ENC) / 1.2), q2 = io((t - SALE_CAB) / 1.6);
    const lx = lerp(lerp(L[0][0], L[1][0], q1), L[2][0], q2), ly = lerp(lerp(L[0][1], L[1][1], q1), L[2][1], q2);
    luz.style.transform = `translate(${f(lx, 1)}px, ${f(ly, 1)}px)`;

    // Cabecera y rótulo de la esquina
    sube(titulo, t, .15, SALE_CAB);
    remate.forEach((l, i) => sube(l, t, REMATE[i]));
    aparece(ilus, t, .6, .62);

    // ── Hoy ──
    // En 16:9 todo el grupo se encoge y se va a la izquierda. En 4:5 el rótulo y el contador se apagan mientras la pila
    // se recoge en un montón (arriba a la derecha) y reaparecen ya en su sitio, a su izquierda: así nada se cruza
    const eT = V ? (t < ENC + .3 ? 0 : 1) : e, rv = V ? 1 - clamp((t - ENC) / .2) + sale((t - 7.6) / .45) * (t >= ENC + .3) : 1;
    const pt = sitio('t', eT), ah = sale((t - .6) / .5), ry = V && t >= ENC + .3 ? (1 - sale((t - 7.6) / .45)) * 14 : 0;
    hoyT.style.opacity = f(ah * clamp(rv) * lerp(1, V ? .8 : .62, eT));
    coloca(hoyT, pt[0], pt[1] + (1 - ah) * 14 + ry, pt[2]);

    // Contador vivo: la cuenta nueva sube y la anterior sale por arriba
    let n = 0; TV.forEach(x => { if (t >= x + .1) n++; });
    const pc = sitio('cont', eT), tc = n ? TV[n - 1] + .1 : 0, rc = sale((t - tc) / .38);
    // Con el remate, el contador cede el sitio al resumen (dice lo mismo, en palabras)
    const salida = io((t - 14.55) / .45);
    [[cuentas[0], n, (1 - rc) * 100 - salida * 110], [cuentas[1], n - 1, -rc * 110]].forEach(([el, k, y]) => {
      if (+el.dataset.n !== k) { el.innerHTML = textoCuenta(Math.max(0, k)); el.dataset.n = k; }
      el.style.transform = `translateY(${f(y, 2)}%)`;
    });
    cont.style.opacity = f(clamp(rv) * lerp(1, V ? .85 : .45, eT));
    coloca(cont, pc[0], pc[1] + ry, pc[2]);

    // Pila de ventanas
    const pp = sitio('pila', e), dy = V ? lerp(G.ven.dy, G.fin.dy, e) : G.ven.dy, borra = V ? clamp(e * 2.4) : 0;
    // 16:9: cuando el contador cede su sitio, la pila apagada sube hasta la línea del panel (sin hueco bajo «Hoy»)
    const asienta = V ? 0 : (G.fin.y + G.off.pila * G.fin.s - G.panel[1]) * io((t - 14.55) / .8);
    coloca(pila, pp[0], pp[1] - asienta, pp[2]);
    pila.style.opacity = f(lerp(1, V ? .5 : .36, e));
    vens.forEach((w, i) => {
      const a = (t - w.t0) / .45, p = expo(a);
      w.e.style.opacity = f(clamp(a * 3));
      w.e.style.transform = `translate(${f(i * G.ven.dx, 1)}px, ${f(i * dy + lerp(-28, 0, p), 1)}px) rotate(${w.rot}deg) scale(${f(lerp(1.08, 1, p), 4)})`;
      let encima = 0; for (let j = i + 1; j < TV.length; j++) encima += sale((t - TV[j] - .1) / .4);
      w.velo.style.opacity = f(encima * .04);
      const b = (t - w.t0 - .22) / .38;
      w.tu.style.opacity = f(clamp(b * 4) * (1 - borra));
      w.tu.style.transform = `translate(-50%, 0) scale(${f(b <= 0 ? .01 : pop(b))})`;
      w.txt.forEach(x => { x.style.opacity = f(1 - borra); });
      if (w.chip) {
        const c = sale((t - w.t0 - .5) / .4);
        w.chip.style.opacity = f(c * (1 - borra));
        w.chip.style.transform = `scale(${f(lerp(.86, 1, c))})`;
        w.aguja.setAttribute('transform', `rotate(${f(Math.max(0, Math.min(t, ENC) - w.t0 - .5) * 300, 1)} 12 12)`);
      }
    });
    // Hilo: cada tramo se cose al llegar su avatar; a los 6,3 s una chispa lo recorre entero
    segs.forEach((p, i) => { p.style.strokeDashoffset = f(1 - io((t - TV[i + 1] - .28) / .5), 4); });
    hilo.style.opacity = f(lerp(.55, 1, sale((t - PEGA) / .4)) * (1 - (V ? clamp(e * 3) : 0)));
    const ch = (t - PEGA) / .9;
    chispa.style.opacity = ch > 0 && ch < 1 ? f(Math.sin(ch * Math.PI)) : 0;
    chispa.style.strokeDashoffset = f(.07 - io(ch) * 1.14, 4);

    // Pegamento
    const pg = sitio('pega', e);
    sube(pega._s, t, PEGA, V ? null : 14.55);
    pega.style.opacity = f(V ? 1 - clamp((t - ENC) / .2) : lerp(1, .6, e));
    coloca(pega, pg[0], pg[1], pg[2]);

    // ── Con un agente ──
    aparece(conT, t, CON);
    coloca(conT, G.conT[0], G.conT[1] + (1 - sale((t - CON) / .5)) * 14);
    const nud = t > GOLPE ? Math.sin(clamp((t - GOLPE) / .2) * Math.PI) * 3 : 0;
    coloca(panel, G.panel[0], G.panel[1] + nud);
    rectM.style.strokeDashoffset = f(1 - io((t - MARCO) / .55), 4);
    marco.style.opacity = f(1 - sale((t - 8.05) / .5));
    // El papel se descubre de arriba abajo dentro del marco (opaco, sin velo gris); la sombra crece aparte
    const pl = io((t - LLENO) / .45);
    papel.style.clipPath = pl >= 1 ? 'none' : `inset(0 0 ${f((1 - pl) * 100, 2)}% 0 round 20px)`;
    papel.style.visibility = pl <= 0 ? 'hidden' : 'visible';
    sombra.style.opacity = f(sale((t - LLENO - .1) / .5));
    if (divi) divi.style.transform = `scaleY(${f(io((t - 7.95) / .6))})`;
    pieR.style.transform = `scaleX(${f(io((t - 8) / .6))})`;
    if (regT) aparece(regT, t, 8);
    const espera = clamp((t - PAUSA) / .3) * (1 - clamp((t - SELLO - .2) / .4));
    regs.forEach((r, k) => { escribe(r.m, C.registro[k], t, REG[k]); r.l.style.opacity = f(k === 4 ? 1 : 1 - .45 * espera); });

    filas.forEach((r, k) => {
      const a = sale((t - Math.max(PASO[k] - .12, 7.95)) / .38);
      const foco = r.persona ? 1 : 1 - .45 * clamp((t - PAUSA) / .3) * (1 - clamp((t - SELLO - .2) / .4));
      r.e.style.opacity = f(a * foco);
      r.e.style.transform = `translateY(${f((1 - a) * 12, 1)}px)`;
      const fin = r.persona ? PAUSA : HECHO[k], corre = t >= PASO[k] - .05 && t < fin;
      const g = corre ? clamp((t - PASO[k] + .05) / .15) : clamp(1 - (t - fin) / .15);
      r.giro.style.opacity = f(t < PASO[k] - .05 ? 0 : g);
      r.giro.setAttribute('transform', `rotate(${f(((t - PASO[k]) * 560) % 360 - 90, 1)} 20 20)`);
      const hecho = (t - HECHO[k]) / .32;
      r.lleno.setAttribute('transform', `translate(20 20) scale(${f(hecho <= 0 ? 0 : pop(hecho))}) translate(-20 -20)`);
      r.visto.style.strokeDashoffset = f(1 - sale((t - HECHO[k] - .08) / .28), 4);
      if (r.prog) {
        r.prog.style.transform = `scaleX(${f(clamp((t - PASO[k]) / (HECHO[k] - PASO[k])), 4)})`;
        r.prog.style.opacity = f(t < PASO[k] ? 0 : 1 - sale((t - HECHO[k]) / .4));
      }
      if (r.sub) {
        let lin = null, t0 = 0; SUB[k].forEach(([j, tj]) => { if (t >= tj) { lin = C.registro[j]; t0 = tj; } });
        escribe(r.sub, lin, t, t0);
      }
      if (r.persona) {
        // La fila se enciende: la banda aparece y se asienta (sin barrido, que deja un cuadrado al empezar)
        const bd = sale((t - PAUSA) / .24);
        r.banda.style.opacity = f(bd);
        r.banda.style.transform = `scale(${f(lerp(.97, 1, bd), 4)}, ${f(lerp(.8, 1, bd), 4)})`;
        r.e.classList.toggle('lit', t >= PAUSA + .08);
        const pz = clamp((t - PAUSA - .1) / .2) * (1 - clamp((t - HECHO[k]) / .12));
        r.pausa.style.opacity = f(pz);
        const c = sale((t - PAUSA - .15) / .4);
        r.chip.style.opacity = f(c);
        r.chip.style.transform = `scale(${f(lerp(.8, 1, c))})`;
        // Mientras espera, el chip late
        const lat = t > PAUSA + .4 && t < SELLO ? ((t - PAUSA - .4) % .9) / .9 : -1;
        r.chipO.style.opacity = lat < 0 ? 0 : f((1 - lat) * .7);
        r.chipO.style.transform = `scale(${f(1 + (lat < 0 ? 0 : sale(lat)) * .22)})`;
      }
    });
    const av = (t - AVATAR) / .4;
    tuP.style.opacity = f(clamp(av * 4));
    tuP.style.transform = `translate(-50%, 0) scale(${f(av <= 0 ? .01 : pop(av))})`;
    sube(tuparte, t, TUPARTE);

    // Sello: cae acelerando hacia el papel, golpea, rebota apenas y deja una onda
    const ks = (t - SELLO) / .22;
    if (ks <= 0) sello.style.opacity = 0;
    else {
      const p = clamp(ks), reb = t > GOLPE ? 1 - .04 * Math.sin(clamp((t - GOLPE) / .2) * Math.PI) : 1;
      sello.style.opacity = f(clamp(ks * 2.5));
      sello.style.transform = `translate(-50%, -50%) rotate(${f(lerp(-12, -5, sale(p)), 2)}deg) scale(${f(lerp(1.6, 1, p * p) * reb, 4)})`;
      sello.style.boxShadow = `0 ${f(lerp(30, 3, p), 1)}px ${f(lerp(40, 6, p), 1)}px rgba(8, 38, 61, ${f(lerp(.05, .18, p))})`;
      const o = clamp((t - GOLPE) / .6);
      selloO.style.opacity = t < GOLPE ? 0 : f((1 - o) * .6);
      selloO.style.transform = `scale(${f(1 + sale(o) * .3, 4)})`;
    }

    // Resúmenes
    resHoy.forEach((l, i) => sube(l, t, RES[0] + i * .12));
    resCon.forEach((l, i) => sube(l, t, RES[1] + i * .12));
  }

  global.PIEZA = { montar, pintar, duracion: T };
})(window);
