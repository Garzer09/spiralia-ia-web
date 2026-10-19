/*
 * Motor WebGL2 de Spiralia AI, sin librerías. «planta»: la organización en perspectiva; tres focos encienden a los
 * equipos y el puntero es una luz sobre el suelo. «espiral»: la S de partículas que se forma con el scroll y enciende
 * el método SPIRAL. create() devuelve null sin WebGL2 o sin GPU. Buffers fijos; el movimiento, en el vertex shader.
 */
(function (global) {
  'use strict';
  const TAU = Math.PI * 2;
  const lcg = s => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  // Semilla por celda con un hash: la primera salida de un lcg es lineal en la semilla y dibujaría bandas
  const hash = (a, b) => { let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) | 0; h = Math.imul(h ^ h >>> 13, 1274126177); return (h ^ h >>> 16) >>> 0; };
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const suave = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
  // Acerca v a meta igual a cualquier fps (k en 1/s)
  const sigue = (v, meta, k, dt) => v + (meta - v) * (1 - Math.exp(-k * dt));
  const rgb = h => 'vec3(' + [1, 3, 5].map(i => (parseInt(h.substr(i, 2), 16) / 255).toFixed(3)).join(',') + ')';

  // Matrices 4×4 en columnas; sy descentra la lente en vertical
  const persp = (fov, asp, n, f, sy = 0) => { const t = 1 / Math.tan(fov / 2), r = 1 / (n - f); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, -sy, (f + n) * r, -1, 0, 0, 2 * f * n * r, 0]; };
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const punto = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  function mira(ojo, obj) {
    const z = norm(sub(ojo, obj)), x = norm(cruz([0, 1, 0], z)), y = cruz(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -punto(x, ojo), -punto(y, ojo), -punto(z, ojo), 1];
  }
  const mul = (a, b) => b.map((_, i) => { const c = i & 12, r = i & 3; return a[r] * b[c] + a[4 + r] * b[c + 1] + a[8 + r] * b[c + 2] + a[12 + r] * b[c + 3]; });

  // Una sola espera al driver (el enlace); el registro de errores, solo si falla
  function programa(gl, vs, fs) {
    const p = gl.createProgram(), sh = [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]].map(([t, src]) => {
      const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(p, s); return s;
    });
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(sh.map(s => gl.getShaderInfoLog(s)).join(' ') + gl.getProgramInfoLog(p));
    sh.forEach(s => gl.deleteShader(s));
    const u = {};
    for (let i = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i--;) { const a = gl.getActiveUniform(p, i); u[a.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(p, a.name); }
    return { p, u };
  }

  const unos = (gl, u, o) => { for (const k in o) gl.uniform1f(u[k], o[k]); };
  // Buffer intercalado: k vec4 por vértice
  function malla(gl, datos, k) {
    const vao = gl.createVertexArray(), buf = gl.createBuffer();
    gl.bindVertexArray(vao); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(datos), gl.STATIC_DRAW);
    for (let i = 0; i < k; i++) { gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i, 4, gl.FLOAT, false, k * 16, i * 16); }
    gl.bindVertexArray(null);
    return { vao, buf, n: datos.length / (k * 4) };
  }

  // Sprite redondo con núcleo, halo y anillo opcional; vS.z lo achata para apoyarlo en el suelo
  const FS = `#version 300 es
precision mediump float;
in vec4 vC; in vec4 vS; out vec4 o;
void main() {
  vec2 q = gl_PointCoord * 2. - 1.; q.y /= vS.z;
  float d = length(q);
  if (d > 1.) discard;
  float a = 1. - smoothstep(vS.x * .45, vS.x, d);
  a += vS.y * exp(-d * d * 4.5) * (1. - d);
  a += vS.w * (1. - smoothstep(.02, .08, abs(d - .8)));
  a = min(a, 1.) * vC.a;
  o = vec4(vC.rgb * a, a);
}`;

  // Paleta «Monocromo Spiralia»: apagado, navy-3 aclarado con gris (puro no se lee sobre noche); encendido,
  // greige y, solo en lo más vivo, blanco
  const CAB = `#version 300 es
precision highp float;
out vec4 vC; out vec4 vS;
const vec3 GRIS = ${rgb('#A9B1B8')}, GREIGE = ${rgb('#E0DFDA')}, BLANCO = vec3(1.), BASE = mix(${rgb('#174467')}, GRIS, .32);
`;

  /* ---------------- Escena «planta» ---------------- */

  // Focos: x, z y fase. La cámara mira hacia +z (x crece a la izquierda): a la derecha en horizontal, arriba en vertical
  const FOCOS = [[-.85, 1.7, 0], [-1.7, 2.75, .33], [-.5, 3.35, .66]];

  const VS_PLANTA = CAB + `layout(location = 0) in vec4 a0;
layout(location = 1) in vec4 a1;
uniform mat4 uPV;
uniform vec3 uOjo;
uniform float uT, uSal, uIn, uPx, uMax, uVert;
uniform vec4 uLuz;      // luz del puntero: x, z, intensidad, radio
uniform vec4 uEst[16];  // estela: x, z, intensidad
const float TAU = 6.2831853, T = 11.;
const vec3 F[3] = vec3[3](${FOCOS.map(f => 'vec3(' + f.join(',') + ')').join(',')});
float onda(float u) { return u < .05 ? u / .05 : exp(-(u - .05) * 6.5); }
float gauss(vec2 a, vec2 b, float r) { vec2 d = a - b; return exp(-dot(d, d) / (r * r)); }
void main() {
  int k = int(a1.x + .5);
  float p = uT / T, l = 0., y = 0., sz = .018, al = 1., nuc = 1., halo = 0., lp = 0., suelo = 0.;
  vec2 xz = a0.xy;
  if (k == 0) {
    // Puesto: ondas de los focos (suben rápido, caen despacio), parpadeo y equipos que se encienden solos
    for (int i = 0; i < 3; i++) { float d = distance(xz, F[i].xy); l += exp(-d / 1.6) * onda(fract(p + F[i].z - d / 1.9)); }
    l += .05 * sin(uT * 1.3 + a0.w * TAU) + .14 * smoothstep(.86, 1., sin(uT * .21 + a1.y * TAU));
    // El puntero enciende y levanta a los vecinos; su estela se apaga despacio
    float g = gauss(xz, uLuz.xy, uLuz.w) * uLuz.z, e = 0.;
    for (int i = 0; i < 16; i++) e = max(e, uEst[i].z * gauss(xz, uEst[i].xy, .17));
    l += g * 1.15 + e * .75; lp = g + e * .6;
    y += .075 * g + .03 * e;
    sz *= a0.z;
  } else if (k == 1) {
    // Filamento: una cabeza con cola recorre la curva y descansa
    float u = fract(p * a0.w + a1.y) * 1.35, dh = u - a0.z;
    float c = dh >= 0. ? pow(max(0., 1. - dh / .22), 2.) : 0.;
    l = .5 + c; al = .05 + .85 * c; sz = .008 + .007 * c; y = .004;
  } else if (k == 2) {
    // Anillo que se abre: continuo en los focos; en el destino de un filamento, al llegar la luz
    float g, R;
    if (a1.w < .5) { g = fract(p * 2. + a1.y + a0.w / 3.); R = .05 + g * .62; al = (1. - g) * (1. - g) * .5; }
    else { float t = fract(p * a1.z + a1.y) * 1.35 - 1.; g = t / .3; R = .03 + g * .15; al = t > 0. && t < .3 ? (1. - g) * .32 : 0.; }
    al *= smoothstep(0., .18, g);
    xz += R * vec2(cos(a0.z), sin(a0.z)); l = .9; sz = .009;
  } else if (k == 3) {
    // Foco: núcleo redondo y aura en el suelo
    l = 1.2; sz = a0.z; al = a0.w * (.88 + .12 * sin(uT * 1.7 + a1.y * TAU));
    if (a0.z > .1) { nuc = .001; halo = 1.; suelo = 1.; }
  } else {
    // Charco de luz bajo el puntero
    xz = uLuz.xy; sz = uLuz.w * 3.; al = .16 * uLuz.z; l = .8; nuc = .001; halo = 1.; lp = 1.; suelo = 1.;
  }
  // Entrada (opcional): los puntos suben desde el primer foco hacia fuera
  float h = fract(sin(dot(a0.xy, vec2(12.9898, 78.233))) * 43758.5453);
  float r0 = clamp(distance(a0.xy, F[0].xy) / 4.5, 0., 1.) * .55 + h * .1, ent = smoothstep(r0, r0 + .35, uIn);
  al *= ent; y -= (1. - ent) * .15;
  // Salida con el scroll: suben, se separan y se apagan
  y += uSal * (.03 + .26 * h);
  xz += (xz - vec2(-.9, 2.4)) * uSal * (.03 + .08 * h);
  vec4 P = vec4(xz.x, y, xz.y, 1.), C = uPV * P;
  gl_Position = C;
  // Titular en penumbra, medido en la portada real: columna izquierda en horizontal; bajo el tercio superior en vertical
  vec2 s = C.xy / C.w * .5 + .5, zt = abs(s - vec2(.24, .37)) / vec2(.34, .32);
  float m = mix(.1, 1., uVert > .5 ? smoothstep(.6, .76, s.y) : smoothstep(.85, 1.25, pow(pow(zt.x, 4.) + pow(zt.y, 4.), .25)));
  m = mix(m, 1., .5 * min(lp, 1.));   // la luz del usuario se ve ahí a medias
  // Bruma: las filas lejanas se apagan antes de amontonarse en rayas
  float dist = distance(P.xyz, uOjo);
  m *= (1. - smoothstep(3.6, 8.5, dist)) * (1. - smoothstep(.74, 1.02, s.y));
  l = clamp(l, 0., 1.4) * (1. - .72 * uSal);
  vec3 col = mix(BASE, GREIGE, smoothstep(.05, .8, l));
  col = mix(col, BLANCO, smoothstep(.8, 1.25, l));
  float px = sz * uPx / C.w * (uVert > .5 ? 1.3 : 1.);
  if (k == 0) {
    al = .36 + .64 * min(l, 1.);
    float b = smoothstep(.4, 1.15, l);
    px *= 1. + 1.5 * b; nuc = 1. / (1. + 1.5 * b); halo = .5 * b;
  }
  // Muy cerca de la cámara, desenfoque
  float bk = 1. - smoothstep(1.4, 2.7, dist);
  px *= 1. + 1.2 * bk; nuc *= 1. - .55 * bk; al *= 1. - .45 * bk;
  al *= m * min(1., px / 1.8);
  gl_PointSize = clamp(px, 1., uMax);
  if (al < .003) gl_Position = vec4(2., 2., 2., 1.);
  vC = vec4(col, al);
  vS = vec4(max(nuc, .001), halo, suelo > .5 ? clamp(abs(normalize(P.xyz - uOjo).y) * 1.15, .25, 1.) : 1., 0.);
}`;

  function planta(gl, dens) {
    const R = lcg(5021966), Rd = lcg(77), v = [];
    const pon = (x, z, r, isla) => { if (dens >= 1 || Rd() < dens) v.push(x, z, r, R(), 0, isla, 0, 0); };
    // Celdas de .5 × .4 (solo las que ve alguna cámara): islas de puestos, salas y huecos
    for (let iz = 0; iz < 15; iz++) for (let ix = -9; ix < 9; ix++) {
      const xc = ix * .5 + .25, zc = iz * .4 - .6;
      if (!(zc > .1 && Math.abs(xc) < 1.7 + .5 * zc) && !(xc > -2.4 && xc < .5 && zc < 1.6)) continue;
      const hc = lcg(hash(ix + 20, iz + 7)), tipo = hc(), isla = hc();
      if (tipo < .1) continue;
      if (tipo < .17) {
        // Sala: sillas en óvalo
        const n = 10 + Math.floor(hc() * 6), rx = .11 + hc() * .05, rz = .07 + hc() * .03;
        for (let j = 0; j < n; j++) pon(xc + rx * Math.cos(TAU * j / n), zc + rz * Math.sin(TAU * j / n), .85, isla);
      } else {
        // Isla: de 4 a 7 columnas y de 3 a 5 filas; falta alguno
        const nc = 4 + Math.floor(hc() * 4), nf = 3 + Math.floor(hc() * 3), sp = .058;
        for (let f = 0; f < nf; f++) for (let c = 0; c < nc; c++) {
          if (R() < .1) continue;
          pon(xc + (c - (nc - 1) / 2) * sp + (R() - .5) * .01, zc + (f - (nf - 1) / 2) * sp + (R() - .5) * .01, .75 + R() * .55, isla);
        }
      }
    }
    const puestos = v.length / 8;
    // Filamentos en S desde cada foco hasta puestos a media distancia
    const rh = lcg(1906), ns = Math.round(100 * Math.max(.6, dens));
    FOCOS.forEach(([fx, fz]) => {
      const cand = [];
      for (let i = 0; i < puestos; i++) { const d = Math.hypot(v[i * 8] - fx, v[i * 8 + 1] - fz); if (d > .4 && d < 1.25) cand.push(i); }
      for (let j = 0; j < 6; j++) {
        const i = cand[Math.floor(rh() * cand.length)], px = v[i * 8], pz = v[i * 8 + 1];
        // Bézier con los controles a un lado y a otro de la recta: la curva de la S
        const dx = px - fx, dz = pz - fz, o = .26 + rh() * .14, m = 1 + j % 2, f = rh();
        const X = [fx, fx + dx * .33 - dz * o, fx + dx * .66 + dz * o, px], Z = [fz, fz + dz * .33 + dx * o, fz + dz * .66 - dx * o, pz];
        const bz = (P, u, w) => w * w * w * P[0] + 3 * w * w * u * P[1] + 3 * w * u * u * P[2] + u * u * u * P[3];
        for (let s = 0; s <= ns; s++) { const u = s / ns; v.push(bz(X, u, 1 - u), bz(Z, u, 1 - u), u, m, 1, f, 0, 0); }
        for (let s = 0; s < 32; s++) v.push(px, pz, TAU * s / 32, 0, 2, f, m, 1);
      }
    });
    // Por foco, tres anillos, aura y núcleo; al final, el charco de luz del puntero
    FOCOS.forEach(([fx, fz, ff]) => {
      for (let r = 0; r < 3; r++) for (let s = 0; s < 120; s++) v.push(fx, fz, TAU * s / 120, r, 2, ff, 0, 0);
      v.push(fx, fz, .8, .26, 3, ff, 0, 0, fx, fz, .034, 1, 3, ff, 0, 0);
    });
    v.push(0, 0, 0, 0, 4, 0, 0, 0);

    const pr = programa(gl, VS_PLANTA, FS), me = malla(gl, v, 2), u = pr.u, est = new Float32Array(64), S = { n: me.n };
    let ei = 0, ult = null, luz = null, li = 0, quieto = 9, sal = 0, asp = 1, vert = false;

    function camara(t, p) {
      // Encuadre por orientación, deriva lenta y, con la salida, la mirada hacia arriba. En vertical, gran angular
      // con la lente descentrada: la planta ocupa el tercio de arriba, sobre el titular
      const w = TAU * t / 26, d = [.16 * Math.sin(w), .05 * Math.sin(w * 2 + 1), .12 * Math.cos(w)];
      const c = vert
        ? { fov: 60, ojo: [-1.1, 2.2, -1.6], obj: [-1.1, 0, 2.6], sy: .55 }
        : { fov: 38, ojo: [0, 2.3, -1.1], obj: [0, 0, 2], sy: 0 };
      const ojo = [c.ojo[0] + d[0], c.ojo[1] + d[1] - .25 * p, c.ojo[2] + d[2]];
      const obj = [c.obj[0] + d[0] * .4, c.obj[1] + 1.1 * p * p + .5 * p, c.obj[2] + .3 * p];
      return { ojo, obj, fov: c.fov * Math.PI / 180, sy: c.sy };
    }
    // Rayo de la cámara por el píxel del puntero hasta el suelo (y = 0)
    function alSuelo(c, nx, ny) {
      const f = norm(sub(c.obj, c.ojo)), r = norm(cruz(f, [0, 1, 0])), up = cruz(r, f), th = Math.tan(c.fov / 2);
      const d = [0, 1, 2].map(i => f[i] + r[i] * nx * th * asp + up[i] * (ny - c.sy) * th);
      if (d[1] > -.02) return null;
      const k = -c.ojo[1] / d[1];
      return [c.ojo[0] + d[0] * k, c.ojo[2] + d[2] * k];
    }

    S.dibuja = st => {
      const { t, dt } = st;
      asp = st.w / st.h; vert = asp < .9;
      sal = st.still ? 0 : sigue(sal, st.prog, 9, dt);
      const c = camara(t, sal), V = mira(c.ojo, c.obj), P = persp(c.fov, asp, .1, 40, c.sy);
      // La luz sigue al puntero; sin él (táctil, o quieto un rato) deriva sola
      quieto = st.ptr ? 0 : quieto + dt;
      let meta = st.ptr && alSuelo(c, st.ptr[0], st.ptr[1]), lm = 1;
      if (!meta || quieto > 0) {
        if (quieto < 1.4 && luz) { meta = luz; lm = 1 - quieto / 1.4; }
        else { meta = [-1.1 + .8 * Math.sin(t * .11), 2.3 + .8 * Math.sin(t * .17 + 1.3)]; lm = .65; }
      }
      if (!luz || st.still) luz = meta.slice();
      const kk = st.ptr ? 11 : 1.6;
      luz = [sigue(luz[0], meta[0], kk, dt), sigue(luz[1], meta[1], kk, dt)];
      li = st.still ? lm : sigue(li, lm, 3, dt);
      // Estela: un punto nuevo cada poco recorrido; todos se apagan despacio
      const dec = Math.exp(-dt / .6);
      for (let i = 0; i < 16; i++) est[i * 4 + 2] *= dec;
      if (!st.still && (!ult || Math.hypot(luz[0] - ult[0], luz[1] - ult[1]) > .05)) {
        ult = luz.slice(); est.set([luz[0], luz[1], li * .9, 0], ei * 4); ei = (ei + 1) % 16;
      }
      gl.useProgram(pr.p);
      gl.uniformMatrix4fv(u.uPV, false, mul(P, V));
      gl.uniform3fv(u.uOjo, c.ojo);
      gl.uniform4f(u.uLuz, luz[0], luz[1], li * (1 - sal), vert ? .3 : .36);
      gl.uniform4fv(u.uEst, est);
      unos(gl, u, { uT: t, uSal: sal, uIn: st.intro, uPx: st.h * st.dpr / (2 * Math.tan(c.fov / 2)), uMax: st.maxPt, uVert: +vert });
      gl.bindVertexArray(me.vao); gl.drawArrays(gl.POINTS, 0, me.n);
    };
    S.libera = () => { gl.deleteBuffer(me.buf); gl.deleteVertexArray(me.vao); gl.deleteProgram(pr.p); };
    return S;
  }

  /* ---------------- Escena «espiral» ---------------- */

  const SP_HEBRA = 3, SP_AT = [.05, .23, .41, .59, .77, .955];

  const VS_ESPIRAL = CAB + `layout(location = 0) in vec4 a0;  // destino sobre la hebra (xyz) y fracción s
layout(location = 1) in vec4 a1;  // grosor y profundidad (xyz) y número de hebra
layout(location = 2) in vec4 a2;  // posición en la nube (xyz) y retardo
layout(location = 3) in vec4 a3;  // azar, tamaño, tipo (0 hebra, 1 polvo, 2 nodo)
uniform mat4 uPV, uM;
uniform float uT, uP, uFr, uFrG, uPx, uMax, uD;
mat2 giro(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
void main() {
  float r = a3.x, ty = a3.z, s = a0.w, TAU = 6.2831853;
  // Convergencia escalonada por punto, con curva suave
  float k = clamp((uP / .6 - a2.w * .42) / .58, 0., 1.);
  float e = k < .5 ? 4. * k * k * k : 1. - pow(2. - 2. * k, 3.) / 2.;
  float nit = smoothstep(.5, 1., uP);
  vec3 ob = a0.xyz + a1.xyz * mix(2.8, 1., nit);
  float dr = ty == 1. ? .03 : .006 * (1. - nit);
  ob += dr * vec3(sin(uT * .5 + r * TAU), cos(uT * .43 + r * 17.), sin(uT * .37 + r * 9.));
  vec3 nu = a2.xyz + .07 * vec3(sin(uT * .21 + r * TAU), sin(uT * .17 + r * 11.), cos(uT * .19 + r * 5.));
  nu.xz = giro(uT * .035) * nu.xz;
  vec3 pos = mix(nu, ob, e);
  pos.xy = giro((1. - e) * (1.4 + r)) * pos.xy;   // entran girando, como una espiral
  vec4 C = uPV * (uM * vec4(pos, 1.));
  gl_Position = C;
  // La hebra 3 queda encendida hasta el paso actual, en greige y más viva cerca del frente; el blanco, solo
  // para el frente y el paso actual. Pulsos lentos por las seis hebras
  float l = 0., fr = 0., on = step(.001, uFr);
  if (a1.w == ${SP_HEBRA}. && ty != 1.) {
    float q = (s - uFr) / .02;
    l = (1. - smoothstep(uFr - .004, uFr + .004, s)) * on * e * (.58 + .3 * exp((s - uFr) * 9.));
    fr = exp(-q * q) * uFrG * on * e;
  }
  float hd = fract(uT / 12. + a1.w * .37) * 1.25, dd = hd - s;
  float pul = dd > 0. && dd < .14 ? pow(1. - dd / .14, 2.) : 0.;
  pul *= .3 * smoothstep(.55, .95, uP) * (1. - l);
  float al, sz = .0072 * a3.y, nuc = 1., halo = 0., anillo = 0.;
  if (ty == 2.) {
    // Nodo: anillo fino; alcanzado, núcleo y halo; el actual brilla más
    float q = (s - uFr) / .014, lle = smoothstep(s - .006, s, uFr) * on, act = exp(-q * q) * on;
    sz = .056 * (1. + .15 * lle); anillo = .5 + .3 * lle + .2 * act; nuc = .26 * lle + .001; halo = .2 * lle + .45 * act;
    al = (.45 + .4 * lle + .15 * act) * smoothstep(.5, .8, uP); l = .55 * lle + .6 * act;
  } else {
    al = ty == 1. ? .1 : mix(.26, .38, e);
    l = max(l, fr + pul);
    al = mix(al, .95, min(l, 1.));
    sz *= 1. + .2 * l + .9 * fr;
    halo = .7 * fr + .2 * l;
  }
  vec3 col = mix(mix(GRIS, GREIGE, .5), GREIGE, smoothstep(0., .5, l));
  col = mix(col, BLANCO, smoothstep(.5, 1.05, l));
  // Profundidad de campo: fuera del plano de la S, el punto crece y se suaviza
  float dof = clamp(abs(C.w - uD) / 1.4, 0., 1.);
  float px = sz * uPx / C.w * (1. + 2.4 * dof);
  if (ty != 2.) { nuc *= 1. - .4 * dof; halo += .35 * dof; }
  al *= (1. - .55 * dof) * min(1., px / 1.6);
  // Junto al borde del lienzo todo se apaga: la nube nunca se corta en recto
  vec2 n = abs(C.xy / C.w);
  al *= 1. - smoothstep(.8, 1., pow(pow(n.x, 4.) + pow(n.y, 4.), .25));
  gl_PointSize = clamp(px, 1., uMax);
  vC = vec4(col, al);
  vS = vec4(max(nuc, .001), halo, 1., anillo);
}`;

  function espiral(gl, dens) {
    const G = global.SGEOM;
    if (!G) return null;
    const R = lcg(1906), N = Math.round(4000 * dens), K = 1 / 235, [cx, cy] = G.center;
    const gs = () => R() + R() + R() + R() - 2;   // casi normal, desviación ~0,58
    // Hebras como polilíneas en unidades de la S (media altura = 1), con su longitud acumulada
    const hebras = G.paths.map(d => {
      const n = d.match(/-?\d+(\.\d+)?/g).map(Number), p = [], acc = [0];
      for (let i = 0; i < n.length; i += 2) p.push([(n[i] - cx) * K, -(n[i + 1] - cy) * K]);
      for (let i = 1; i < p.length; i++) acc.push(acc[i - 1] + Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]));
      return { p, acc, L: acc[acc.length - 1] };
    });
    // Punto y normal a la fracción f de la hebra h; la profundidad da volumen al girar
    function en(h, f) {
      const { p, acc, L } = hebras[h], m = f * L;
      let a = 0, b = acc.length - 1;
      while (b - a > 1) { const c = (a + b) >> 1; if (acc[c] < m) a = c; else b = c; }
      const u = (m - acc[a]) / ((acc[b] - acc[a]) || 1), x = p[a][0] + (p[b][0] - p[a][0]) * u, y = p[a][1] + (p[b][1] - p[a][1]) * u;
      const tx = p[b][0] - p[a][0], ty = p[b][1] - p[a][1], tl = Math.hypot(tx, ty) || 1;
      return [x, y, (h - 2.5) * .03 + .07 * Math.sin(y * 1.7 + 1), -ty / tl, tx / tl];
    }
    const total = hebras.reduce((s, h) => s + h.L, 0), v = [];
    // Nube de partida: núcleo denso y halo suelto, como una nebulosa
    const nube = () => { const k = R() < .78 ? .62 : 1.1; return [gs() * k, gs() * k * 1.15, gs() * k]; };
    const nh = Math.round(N * .92);
    hebras.forEach((hb, h) => {
      const n = Math.round(nh * hb.L / total);
      for (let j = 0; j < n; j++) {
        const f = clamp((j + .5 + (R() - .5) * .6) / n), [x, y, z, nx, ny] = en(h, f), g = gs() * .0042;
        v.push(x, y, z, f, nx * g, ny * g, gs() * .014, h, ...nube(), .65 * R() + .35 * f, R(), .8 + R() * .5, 0, 0);
      }
    });
    // Polvo suelto alrededor de las hebras
    for (let j = nh; j < N; j++) {
      const h = Math.floor(R() * 6), f = R(), [x, y, z, nx, ny] = en(h, f), g = gs() * .05;
      v.push(x, y, z, f, nx * g, ny * g, gs() * .2, h, ...nube(), R(), R(), .7 + R() * .6, 1, 0);
    }
    // Los seis nodos del método sobre la hebra 3
    SP_AT.forEach(f => { const [x, y, z] = en(SP_HEBRA, f); v.push(x, y, z, f, 0, 0, 0, SP_HEBRA, x, y, z, 0, .5, 1, 2, 0); });

    const pr = programa(gl, VS_ESPIRAL, FS), me = malla(gl, v, 4), u = pr.u;
    let pr0 = 0, fr = 0, frg = .5, px = 0, py = 0;
    const S = { n: me.n };
    S.dibuja = st => {
      const { t, dt } = st, asp = st.w / st.h, fov = 30 * Math.PI / 180, th = Math.tan(fov / 2);
      const meta = st.step ? SP_AT[st.step - 1] : 0;
      if (st.still) { pr0 = 1; fr = meta; frg = .5; px = py = 0; }
      else {
        pr0 = sigue(pr0, st.prog, 7, dt);
        const f0 = fr; fr = sigue(fr, meta, 2.6, dt);
        frg = sigue(frg, .5 + Math.min(1, Math.abs(fr - f0) / Math.max(dt, .001) * 2.5), 6, dt);
        px = sigue(px, st.ptr ? st.ptr[0] : 0, 2.5, dt); py = sigue(py, st.ptr ? st.ptr[1] : 0, 2.5, dt);
      }
      // La S cabe entera con margen en cualquier proporción
      const D = Math.max(1.16 / th, .8 / (th * asp));
      const giro = .62 * (1 - suave(.2, 1, pr0)) + .1 * px + (st.still ? 0 : .025 * Math.sin(t * .35));
      const incl = -.08 * py + .12 * (1 - suave(.2, 1, pr0));
      const cy = Math.cos(giro), sy = Math.sin(giro), cx = Math.cos(incl), sx = Math.sin(incl);
      const M = mul([1, 0, 0, 0, 0, cx, sx, 0, 0, -sx, cx, 0, 0, 0, 0, 1], [cy, 0, -sy, 0, 0, 1, 0, 0, sy, 0, cy, 0, 0, 0, 0, 1]);
      gl.useProgram(pr.p);
      gl.uniformMatrix4fv(u.uPV, false, mul(persp(fov, asp, .1, 30), mira([0, 0, D], [0, 0, 0])));
      gl.uniformMatrix4fv(u.uM, false, M);
      unos(gl, u, { uT: t, uP: pr0, uFr: fr, uFrG: frg, uPx: st.h * st.dpr / (2 * th), uMax: st.maxPt, uD: D });
      gl.bindVertexArray(me.vao); gl.drawArrays(gl.POINTS, 0, me.n);
    };
    S.libera = () => { gl.deleteBuffer(me.buf); gl.deleteVertexArray(me.vao); gl.deleteProgram(pr.p); };
    return S;
  }

  /* ---------------- Instancia: tamaño, bucle y pausas ---------------- */

  // Barata, sin contexto de prueba: create() es quien confirma que hay GPU
  const supported = () => !!(global.WebGL2RenderingContext && global.HTMLCanvasElement);

  function create(canvas, o) {
    o = o || {};
    if (!canvas || !supported()) return null;
    // Sin GPU iría a tirones: se rechaza el WebGL por software salvo con software: true
    let gl = null;
    try {
      gl = canvas.getContext('webgl2', {
        alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false,
        powerPreference: 'low-power', failIfMajorPerformanceCaveat: !o.software,
      });
    } catch (e) {}
    if (!gl || gl.isContextLost()) return null;
    const fab = o.scene === 'espiral' ? espiral : planta, dens = clamp(+o.density || 1, .3, 1), still = !!o.still;
    let S;
    const monta = () => {
      S = fab(gl, dens);
      gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.clearColor(0, 0, 0, 0);
    };
    try { monta(); } catch (e) { console.warn('SPGL:', e.message); }
    if (!S) { const x = gl.getExtension('WEBGL_lose_context'); x && x.loseContext(); return null; }

    const maxPt = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1] || 64;
    const st = { t: still ? 7.4 : 0, dt: 0, w: 1, h: 1, dpr: 1, prog: 0, step: 0, ptr: null, still, maxPt, intro: o.intro && !still ? 0 : 1 };
    let raf = 0, last = 0, vivo = false, visible = true, perdido = false, fin = false, cpu = 0, mq = null;

    const pinta = dt => {
      if (perdido) return;
      const t0 = performance.now(), d0 = st.dt;
      st.dt = dt;
      gl.viewport(0, 0, canvas.width, canvas.height); gl.clear(gl.COLOR_BUFFER_BIT);
      S.dibuja(st);
      st.dt = d0;
      cpu = cpu * .95 + (performance.now() - t0) * .05;
    };
    const anima = () => vivo && visible && !document.hidden && !perdido && !still;
    // Un fotograma cada 10 ms como mucho: a 120 Hz o más el fondo va a 60-72 fps y gasta la mitad
    function tick(now) {
      raf = 0;
      if (!anima()) return;
      if (!last || now - last > 10) {
        const dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
        st.t += dt;
        if (st.intro < 1) st.intro = Math.min(1, st.intro + dt / 1.8);
        pinta(dt);
      }
      raf = requestAnimationFrame(tick);
    }
    const despierta = () => {
      if (anima()) { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };
    // Sin bucle (parado o still), cada cambio pinta un fotograma ya asentado; fuera de pantalla, nada
    const fotograma = () => { if (!raf && visible) pinta(1); };

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h || fin) return;
      st.w = w; st.h = h; st.dpr = Math.min(1.5, global.devicePixelRatio || 1);
      const W = Math.round(w * st.dpr), H = Math.round(h * st.dpr);
      if (canvas.width === W && canvas.height === H) return fotograma();
      // Redimensionar borra el lienzo: se repinta ya, aun con el bucle en marcha, para que no parpadee
      canvas.width = W; canvas.height = H;
      raf ? pinta(0) : fotograma();
    }
    // Cambio de DPR sin cambio de tamaño (la ventana pasa a otra pantalla)
    const dpr = () => {
      if (mq) mq.removeEventListener('change', dpr);
      mq = !fin && global.matchMedia ? matchMedia('(resolution: ' + (global.devicePixelRatio || 1) + 'dppx)') : null;
      if (mq && mq.addEventListener) mq.addEventListener('change', dpr); else mq = null;
      resize();
    };
    const ro = global.ResizeObserver && new ResizeObserver(() => resize());
    const io = global.IntersectionObserver && new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; despierta(); fotograma(); });
    // Si se pierde el contexto (GPU reiniciada), se rehace todo al recuperarlo
    const oyentes = [
      [document, 'visibilitychange', despierta],
      [canvas, 'webglcontextlost', e => { e.preventDefault(); perdido = true; despierta(); }],
      [canvas, 'webglcontextrestored', () => { perdido = false; try { monta(); resize(); despierta(); } catch (e) { console.warn('SPGL:', e.message); } }],
    ];
    if (!ro) oyentes.push([global, 'resize', resize]);
    oyentes.forEach(([o, n, f]) => o.addEventListener(n, f));
    if (ro) ro.observe(canvas);
    if (io) io.observe(canvas);
    dpr();

    return {
      setProgress(p) { st.prog = clamp(+p || 0); if (!still) fotograma(); },
      setStep(n) { st.step = clamp(Math.round(+n || 0), 0, 6); fotograma(); },
      setPointer(x, y) {
        st.ptr = x == null || y == null ? null : [clamp(x / st.w * 2 - 1, -1.2, 1.2), clamp(1 - y / st.h * 2, -1.2, 1.2)];
      },
      resize,
      start() { vivo = true; despierta(); },
      stop() { vivo = false; despierta(); },
      // Libera también el contexto (los navegadores limitan cuántos hay); para recrear, un <canvas> nuevo
      destroy() {
        if (fin) return;
        fin = true; vivo = false; despierta();
        if (ro) ro.disconnect();
        if (io) io.disconnect();
        if (mq) mq.removeEventListener('change', dpr);
        oyentes.forEach(([o, n, f]) => o.removeEventListener(n, f));
        if (!perdido) { S.libera(); const x = gl.getExtension('WEBGL_lose_context'); x && x.loseContext(); }
        perdido = true;
      },
      // Para el laboratorio: vértices y ms de CPU por fotograma (media móvil)
      info: () => ({ vertices: S.n, cpuMs: +cpu.toFixed(3), running: !!raf }),
    };
  }

  global.SPGL = { supported, create };
})(window);
