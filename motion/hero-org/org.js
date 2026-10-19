/*
 * Fondo de la portada de Spiralia AI · «La organización se enciende» · bucle de 12 s, sin texto ni sonido.
 * Una planta vista desde arriba en perspectiva: unos 1.800 puntos (personas, puestos) agrupados en equipos.
 * Desde tres focos (los equipos de Spiralia) salen ondas de luz que encienden a los vecinos, y filamentos
 * con la curva de la S de Spiralia llevan la luz de un punto a otro. La luz nunca se apaga del todo:
 * el despliegue sigue en marcha.
 *
 * Todo es función periódica de t (periodo T): el último fotograma enlaza con el primero sin corte.
 * Sin azar en tiempo de ejecución: los puntos salen de un generador con semilla fija.
 * El mismo fichero sirve para 16:9 y 9:16: la composición lee su tamaño. Se pinta en un <canvas>.
 */
(function (global) {
  'use strict';
  const T = 12, TAU = Math.PI * 2;
  const BASE = [62, 104, 138], LUZ = [240, 239, 234];
  let W, H, vertical, ctx, puntos = [], focos = [], hilos = [], orbitas = [];

  const lcg = seed => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const suave = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
  const frac = x => x - Math.floor(x);
  const mezcla = (a, b, u) => a.map((v, i) => Math.round(v + (b[i] - v) * u));

  // Plano del suelo: x a lo ancho, z en profundidad. Proyección sencilla con punto de fuga arriba.
  let P;
  function proyecta(x, z, t) {
    const w = TAU * t / T, yaw = .05 * Math.sin(w), esc = 1 + .025 * Math.sin(w + .6);
    const cx = x - P.ox, cz = z - P.oz;
    const xr = cx * Math.cos(yaw) - cz * Math.sin(yaw) + P.ox, zr = cx * Math.sin(yaw) + cz * Math.cos(yaw) + P.oz;
    const k = 1 / (1 + P.fuga * zr);
    return { x: P.x0 + xr * P.sx * k * esc, y: P.y0 - zr * P.sy * k * esc, k };
  }

  // Máscara: la zona del titular queda oscura (abajo a la izquierda en 16:9, mitad de abajo en 9:16)
  const mascara = (sx, sy) => vertical
    ? .14 + .86 * suave(.7, .34, sy / H)
    : .14 + .86 * Math.max(suave(.16, .58, sx / W), .6 * suave(.6, .22, sy / H));

  function montar(r) {
    W = +r.dataset.width; H = +r.dataset.height; vertical = H > W;
    r.style.width = W + 'px'; r.style.height = H + 'px';
    const c = document.createElement('canvas'); c.width = W; c.height = H; c.className = 'lienzo-org'; r.append(c);
    ctx = c.getContext('2d');
    P = vertical
      ? { x0: W * .5, y0: H * 1.02, sx: W * .58, sy: H * 1.25, fuga: 1.05, ox: 0, oz: .9 }
      : { x0: W * .6, y0: H * 1.08, sx: W * .44, sy: H * 1.55, fuga: 1.15, ox: .2, oz: .9 };

    // Equipos: islas de puestos separadas por pasillos
    const rnd = lcg(5021966), paso = .05;
    for (let z = 0; z < 2.4; z += paso) {
      for (let x = -1.9; x < 1.9; x += paso) {
        const ix = Math.floor((x + 1.9) / .38), iz = Math.floor(z / .3);
        const px = frac((x + 1.9) / .38), pz = frac(z / .3);
        if (px > .78 || pz > .76) continue;              // pasillos
        if (rnd() < .12) continue;                       // puestos vacíos
        const hueco = lcg(ix * 97 + iz * 31 + 7)();
        if (hueco < .1) continue;                        // alguna isla sin gente
        puntos.push({ x: x + (rnd() - .5) * .012, z: z + (rnd() - .5) * .012, r: .7 + rnd() * .6, f: rnd() });
      }
    }

    focos = vertical
      ? [{ x: .1, z: 1.05, n: 1, f: 0 }, { x: -.55, z: 1.75, n: 1, f: .33 }, { x: .6, z: 1.6, n: 1, f: .66 }]
      : [{ x: .55, z: .75, n: 1, f: 0 }, { x: 1.05, z: 1.55, n: 1, f: .33 }, { x: .05, z: 1.7, n: 1, f: .66 }];

    // Distancia de cada punto a cada foco
    for (const p of puntos) p.d = focos.map(F => Math.hypot(p.x - F.x, p.z - F.z));

    // Filamentos en S desde cada foco hasta puntos a media distancia
    const rh = lcg(1906);
    focos.forEach((F, fi) => {
      const cand = puntos.filter(p => p.d[fi] > .3 && p.d[fi] < .95);
      for (let j = 0; j < 6; j++) {
        const p = cand[Math.floor(rh() * cand.length)];
        const dx = p.x - F.x, dz = p.z - F.z, L = Math.hypot(dx, dz), nx = -dz / L, nz = dx / L, o = L * (.28 + rh() * .14);
        hilos.push({
          a: [F.x, F.z], b: [F.x + dx * .33 + nx * o, F.z + dz * .33 + nz * o],
          c: [F.x + dx * .66 - nx * o, F.z + dz * .66 - nz * o], d: [p.x, p.z],
          m: 1 + (j % 2), f: rh(), fi,
        });
      }
    });

    // Agentes trabajando: un punto con dos satélites
    const ro = lcg(2026);
    for (let j = 0; j < (vertical ? 4 : 6); j++) orbitas.push({ p: puntos[Math.floor(ro() * puntos.length)], f: ro() });
  }

  const bez = (h, u) => {
    const v = 1 - u, a = v * v * v, b = 3 * v * v * u, c = 3 * v * u * u, d = u * u * u;
    return [a * h.a[0] + b * h.b[0] + c * h.c[0] + d * h.d[0], a * h.a[1] + b * h.b[1] + c * h.c[1] + d * h.d[1]];
  };
  // Onda: subida rápida y caída lenta, periódica en u
  const onda = u => (u < .05 ? u / .05 : Math.exp(-(u - .05) * 6.5));

  function pintar(t) {
    const p = frac(t / T), w = TAU * p;
    ctx.clearRect(0, 0, W, H);

    // Puntos
    for (const q of puntos) {
      let luz = 0;
      focos.forEach((F, i) => { luz += Math.exp(-q.d[i] / 1.5) * onda(frac(p * F.n + F.f - q.d[i] / 1.9)); });
      luz = clamp(luz * 1.05 + .05 * Math.sin(w * 2 + q.f * TAU));
      const s = proyecta(q.x, q.z, t);
      if (s.y < -10 || s.y > H + 10 || s.x < -10 || s.x > W + 10) continue;
      const m = mascara(s.x, s.y), alfa = (.3 + .7 * luz) * m * clamp(s.k * 1.8);
      if (alfa < .01) continue;
      const rad = q.r * s.k * (vertical ? 2.8 : 3) * (1 + .35 * luz);
      ctx.fillStyle = `rgba(${mezcla(BASE, LUZ, luz).join(',')},${alfa.toFixed(3)})`;
      ctx.beginPath(); ctx.arc(s.x, s.y, rad, 0, TAU); ctx.fill();
      if (luz > .45) {
        ctx.fillStyle = `rgba(236,235,230,${((luz - .45) * .14 * m).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, rad * 2.6, 0, TAU); ctx.fill();
      }
    }

    // Filamentos: el trazo tenue y un pulso de luz que lo recorre
    ctx.lineCap = 'round';
    for (const h of hilos) {
      const pts = [];
      for (let i = 0; i <= 48; i++) { const [x, z] = bez(h, i / 48); pts.push(proyecta(x, z, t)); }
      const m = mascara(pts[24].x, pts[24].y);
      ctx.strokeStyle = `rgba(224,223,218,${(.05 * m).toFixed(3)})`; ctx.lineWidth = .8;
      ctx.beginPath(); pts.forEach((s, i) => (i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y))); ctx.stroke();
      const u = frac(p * h.m + h.f) * 1.35;           // la cabeza recorre el hilo y descansa un momento al final
      const cab = Math.min(48, Math.floor(u * 48)), cola = 12;
      for (let i = Math.max(1, cab - cola); i <= cab && u <= 1; i++) {
        const a = (1 - (cab - i) / cola) * .6 * m;
        ctx.strokeStyle = `rgba(240,239,235,${a.toFixed(3)})`; ctx.lineWidth = .8 + .9 * (1 - (cab - i) / cola);
        ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
      }
      // Al llegar, el punto de destino se enciende con un anillo que se abre
      const tras = u - 1;
      if (tras > 0 && tras < .3) {
        const e = pts[48], g = tras / .3;
        ctx.strokeStyle = `rgba(236,235,230,${((1 - g) * .6 * m).toFixed(3)})`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(e.x, e.y, 3 + g * 26 * e.k, 0, TAU); ctx.stroke();
      }
    }

    // Focos: un núcleo pequeño y anillos que se abren en el plano, uno detrás de otro
    focos.forEach(F => {
      const c0 = proyecta(F.x, F.z, t), m = mascara(c0.x, c0.y);
      for (let k = 0; k < 3; k++) {
        const g = frac(p * 2 + F.f + k / 3), R = .04 + g * .5;
        ctx.strokeStyle = `rgba(236,235,230,${((1 - g) * (1 - g) * .5 * m).toFixed(3)})`; ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) { const a = TAU * i / 64, s = proyecta(F.x + R * Math.cos(a), F.z + R * Math.sin(a), t); i ? ctx.lineTo(s.x, s.y) : ctx.moveTo(s.x, s.y); }
        ctx.stroke();
      }
      const g = ctx.createRadialGradient(c0.x, c0.y, 0, c0.x, c0.y, 46 * c0.k);
      g.addColorStop(0, `rgba(240,239,235,${(.35 * m).toFixed(3)})`); g.addColorStop(1, 'rgba(240,239,235,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c0.x, c0.y, 46 * c0.k, 0, TAU); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${(.95 * m).toFixed(3)})`; ctx.beginPath(); ctx.arc(c0.x, c0.y, 4.5 * c0.k, 0, TAU); ctx.fill();
    });

    // Agentes
    for (const o of orbitas) {
      const s = proyecta(o.p.x, o.p.z, t), m = mascara(s.x, s.y);
      for (let k = 0; k < 2; k++) {
        const a = TAU * (p * 3 + o.f + k / 2), R = 9 * s.k * 2;
        ctx.fillStyle = `rgba(236,235,230,${(.7 * m).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x + R * Math.cos(a), s.y + R * .45 * Math.sin(a), 1.6 * s.k * 2, 0, TAU); ctx.fill();
      }
    }
  }

  global.ORG = { montar, pintar, duracion: T };
})(window);
