// Los nueve iconos. Cada función modela su objeto con los materiales del estudio y devuelve
// { objeto, opciones }. El estudio lo apoya en el suelo, lo escala y lo encuadra.
import * as THREE from 'three';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { ceramica, vidrio, puntoDeLuz, luz, PALETA } from './estudio.js';

// Materiales de la familia (se crean una vez por página).
const M = {
  greige: ceramica('#E2E0DA', { rugosidad: 0.55, barniz: 0.25, rim: 0.3 }),
  blanco: ceramica('#F3F1EC', { rugosidad: 0.5, barniz: 0.3, rim: 0.25 }),
  navy: ceramica(PALETA.navy2, { rugosidad: 0.55, barniz: 0.22, rim: 0.6, terciopelo: 0 }),
  navy3: ceramica(PALETA.navy3, { rugosidad: 0.55, barniz: 0.22, rim: 0.5, terciopelo: 0 }),
  vitrina: vidrio({ rugosidad: 0.22, espesor: 0.12, filo: 0.5, ior: 1.18 }),
  // vidrio claro, poco esmerilado, para la hebra encendida de la S: deja ver la luz de dentro
  hebra: vidrio({ rugosidad: 0.2, espesor: 0.2, filo: 0.35, atenuacion: '#c9d0d6', distancia: 3 }),
  // la S: laca navy con más borde de luz que el resto, para que se lea también sobre noche
  laca: ceramica(PALETA.navy3, { rugosidad: 0.4, barniz: 0.55, rim: 1.0, rimPot: 2.6, terciopelo: 0 }),
  // vidrio muy esmerilado: lo que brilla por dentro (losa de formación, anillo, barras)
  lechoso: vidrio({ rugosidad: 0.48, espesor: 0.25, filo: 0.55 }),
  // el horizonte de día uno va sobre la tarjeta navy: un navy más claro y con canto de luz, para que no desaparezca
  peana: ceramica(PALETA.navy3, { rugosidad: 0.5, barniz: 0.4, rim: 1.1, rimPot: 2.4, terciopelo: 0 }),
};

const caja = (w, h, d, r, seg = 8) => new RoundedBoxGeometry(w, h, d, seg, r);

function malla(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}

// ── estrategia: tres escalones que ascienden hacia un punto de luz
function estrategia() {
  const g = new THREE.Group();
  const ancho = 1.1, fondo = 0.5, paso = 0.42, r = 0.07;
  const mats = [M.navy, M.navy3, M.greige];
  for (let i = 0; i < 3; i++) {
    const h = paso * (i + 1);
    g.add(malla(caja(ancho, h, fondo, r), mats[i], 0, h / 2, (1 - i) * fondo));
  }
  const luzP = puntoDeLuz(0.21, { intensidad: 1.6, halo: 4.6 });
  luzP.position.set(0, paso * 3 + 0.21 + 0.07, -fondo);
  g.add(luzP);
  return { objeto: g };
}

// ── formación: tres losas apiladas y algo desplazadas; la de arriba, de vidrio con luz dentro
function formacion() {
  const g = new THREE.Group();
  const lado = 1.5, alto = 0.24, hueco = 0.1;
  const mats = [M.navy, M.greige, M.lechoso];
  for (let i = 0; i < 3; i++) {
    const m = malla(caja(lado, alto, lado, 0.12), mats[i], (i - 1) * 0.08, alto / 2 + i * (alto + hueco), -(i - 1) * 0.08);
    m.rotation.y = (i - 1) * 0.13;
    g.add(m);
    if (i === 2) {
      const nucleo = malla(caja(lado * 0.72, 0.06, lado * 0.72, 0.03), luz({ centro: 2.0, borde: 1.3 }), 0, 0, 0);
      nucleo.userData.sinSombra = true;
      m.add(nucleo);
      const pl = new THREE.PointLight('#fff4e6', 1.2, 0, 2);
      pl.position.y = -0.1;
      m.add(pl);
    }
  }
  return { objeto: g };
}

// ── ingeniería: dos anillos entrelazados, uno cerámico y otro de vidrio.
// Sus normales forman 45° con la mirada (una hacia arriba y otra hacia abajo), así que los dos
// se leen abiertos y el enlace queda en horizontal en pantalla.
function ingenieria(est) {
  const g = new THREE.Group();
  const R = 0.6, t = 0.16;
  const cam = est.camera.position.clone().normalize();
  const derecha = new THREE.Vector3(1, 0, -1).normalize();
  const arriba = new THREE.Vector3().crossVectors(cam, derecha).normalize();
  const nA = cam.clone().multiplyScalar(Math.SQRT1_2).addScaledVector(arriba, Math.SQRT1_2).normalize();
  const nB = cam.clone().multiplyScalar(Math.SQRT1_2).addScaledVector(arriba, -Math.SQRT1_2).normalize();
  const eje = new THREE.Vector3().crossVectors(nA, nB).normalize();
  const z = new THREE.Vector3(0, 0, 1);
  const a = malla(new THREE.TorusGeometry(R, t, 64, 200), M.navy);
  a.quaternion.setFromUnitVectors(z, nA);
  a.position.copy(eje).multiplyScalar(-R * 0.5);
  const b = malla(new THREE.TorusGeometry(R, t, 64, 200), M.lechoso);
  // dentro del vidrio, un filamento tenue: el esmerilado lo convierte en un resplandor
  const fil = malla(new THREE.TorusGeometry(R, 0.04, 24, 200), luz({ centro: 1.4, borde: 0.9 }));
  fil.userData.sinSombra = true;
  b.add(fil);
  b.quaternion.setFromUnitVectors(z, nB);
  b.position.copy(eje).multiplyScalar(R * 0.5);
  g.add(a, b);
  // un leve giro en el plano de la imagen le quita rigidez
  g.rotateOnWorldAxis(cam, THREE.MathUtils.degToRad(-12));
  return { objeto: g, opciones: { flotar: 0.06 } };
}

// ── resultados: tres barras de vidrio esmerilado que crecen; la luz las llena por dentro y
// la última queda encendida entera. Sin línea de tendencia: no es un gráfico de stock, es la
// idea de la marca (la organización se enciende) aplicada al resultado.
function resultados() {
  const g = new THREE.Group();
  const w = 0.44, alturas = [0.62, 1.0, 1.45], llenado = [0.34, 0.6, 0.94];
  const d = new THREE.Vector3(1, 0, -1).normalize();
  alturas.forEach((h, i) => {
    const p = d.clone().multiplyScalar((i - 1) * 0.6);
    const barra = malla(caja(w, h, w, 0.09), M.lechoso, p.x, h / 2, p.z);
    g.add(barra);
    // columna de luz dentro de la barra, apoyada en el fondo; el esmerilado la difumina
    const hl = h * llenado[i];
    const col = malla(caja(w * 0.5, hl, w * 0.5, 0.06, 4), luz({ centro: 1.6, borde: 0.9 }), p.x, 0.04 + hl / 2, p.z);
    col.userData.sinSombra = true;
    g.add(col);
    if (i === 2) {
      const pl = new THREE.PointLight('#fff4e6', 1.1, 0, 2);
      pl.position.set(p.x, h * 0.7, p.z);
      g.add(pl);
    }
  });
  const base = malla(caja(2.0, 0.1, 0.8, 0.05), M.navy, 0, -0.05, 0);
  base.rotation.y = Math.PI / 4;
  g.add(base);
  return { objeto: g };
}

// ── personas: un grupo de esferas de distinto tamaño, apiñadas; una se enciende e ilumina
// a las demás. Las posiciones salen de una relajación sencilla: se tocan sin solaparse.
function apinar(radios, semilla) {
  const p = semilla.map(([x, z]) => new THREE.Vector2(x, z));
  for (let it = 0; it < 400; it++) {
    for (let i = 0; i < p.length; i++) p[i].multiplyScalar(0.985);
    for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) {
      const d = p[j].clone().sub(p[i]);
      const L = d.length(), min = radios[i] + radios[j] + 0.012;
      if (L < min) {
        const k = (min - L) / 2 / Math.max(L, 1e-6);
        p[i].addScaledVector(d, -k); p[j].addScaledVector(d, k);
      }
    }
  }
  return p;
}

function personas() {
  const g = new THREE.Group();
  const gente = [
    { r: 0.5, m: M.navy, s: [-0.4, -0.35] },
    { r: 0.4, m: M.greige, s: [0.45, -0.4] },
    { r: 0.32, luz: true, s: [0.05, 0.3] },
    { r: 0.29, m: M.navy3, s: [-0.6, 0.4] },
    { r: 0.24, m: M.blanco, s: [0.62, 0.25] },
    { r: 0.17, m: M.greige, s: [-0.2, 0.8] },
  ];
  const pos = apinar(gente.map((p) => p.r), gente.map((p) => p.s));
  gente.forEach((p, i) => {
    if (p.luz) {
      const lp = puntoDeLuz(p.r, { intensidad: 1.5, halo: 3.3, opacidadHalo: 0.55 });
      lp.position.set(pos[i].x, p.r, pos[i].y);
      g.add(lp);
    } else {
      g.add(malla(new THREE.SphereGeometry(p.r, 96, 48), p.m, pos[i].x, p.r, pos[i].y));
    }
  });
  return { objeto: g };
}

// ── tecnología: un cubo de vidrio con un núcleo de luz dentro, sobre una base
function tecnologia() {
  const g = new THREE.Group();
  const L = 1.3;
  const base = malla(caja(L + 0.22, 0.14, L + 0.22, 0.06), M.navy, 0, 0.07, 0);
  const cubo = malla(caja(L, L, L, 0.18), M.vitrina, 0, 0.14 + L / 2, 0);
  const nucleo = puntoDeLuz(0.24, { halo: 6, opacidadHalo: 0.5, intensidad: 2.0, orbe: false });
  nucleo.position.set(0, 0.14 + L / 2, 0);
  g.add(base, cubo, nucleo);
  return { objeto: g };
}

// ── rumbo: esfera armilar sobre peana, con una aguja que marca dirección y luz en el centro.
// Los anillos se orientan respecto a la cámara para que los dos se lean abiertos.
function rumbo(est) {
  const g = new THREE.Group();
  const R = 0.8, t = 0.065, cy = 1.22;
  const cam = est.camera.position.clone().normalize();
  const derecha = new THREE.Vector3(1, 0, -1).normalize();
  const arriba = new THREE.Vector3().crossVectors(cam, derecha).normalize();
  const gira = (a, b, ang) => a.clone().multiplyScalar(Math.cos(ang)).addScaledVector(b, Math.sin(ang)).normalize();
  const z = new THREE.Vector3(0, 0, 1);
  // el meridiano, vertical (normal horizontal) para que descanse sobre el vástago
  const camH = new THREE.Vector3(cam.x, 0, cam.z).normalize();
  const meridiano = malla(new THREE.TorusGeometry(R, t, 48, 220), M.navy, 0, cy, 0);
  meridiano.quaternion.setFromUnitVectors(z, gira(camH, derecha, THREE.MathUtils.degToRad(62)));
  const ecuador = malla(new THREE.TorusGeometry(R, t, 48, 220), M.greige, 0, cy, 0);
  ecuador.quaternion.setFromUnitVectors(z, gira(cam, arriba, THREE.MathUtils.degToRad(58)));
  ecuador.rotateOnWorldAxis(cam, THREE.MathUtils.degToRad(-14));
  // aguja: dos conos que salen del orbe central, blanco hacia el norte y navy hacia el sur
  const aguja = new THREE.Group();
  const rOrbe = 0.19, largo = 0.88;
  const cono = new THREE.ConeGeometry(0.08, largo, 64);
  const n = malla(cono, M.blanco, 0, rOrbe * 0.8 + largo / 2, 0);
  const s = malla(cono, M.navy3, 0, -(rOrbe * 0.8 + largo / 2), 0); s.rotation.x = Math.PI;
  aguja.add(n, s);
  aguja.position.y = cy;
  const dir = derecha.clone().multiplyScalar(0.72).addScaledVector(arriba, 0.66).addScaledVector(cam, -0.2).normalize();
  aguja.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  const centro = puntoDeLuz(rOrbe, { intensidad: 1.4, halo: 4.2, opacidadHalo: 0.6, nucleo: 0.5 });
  centro.position.y = cy;
  const pie = malla(caja(0.9, 0.14, 0.9, 0.07), M.navy, 0, 0.07, 0);
  const vastago = malla(new THREE.CylinderGeometry(0.04, 0.05, cy - R, 32), M.greige, 0, 0.14 + (cy - R - 0.14) / 2, 0);
  g.add(pie, vastago, meridiano, ecuador, aguja, centro);
  return { objeto: g };
}

// ── día uno: un amanecer. Medio sol de vidrio con la luz dentro, de frente, que asoma tras una franja
// de horizonte larga y baja, y un abanico de cinco rayos finos. Sol y rayos van en el plano vertical que
// mira a la cámara: se lee como el pictograma de un sol que sale, no como una cúpula sobre una peana
// (la versión anterior, con tres haces cortos, recordaba a una luz de alarma). Los rayos son de cerámica
// clara: blancos sobre la tarjeta navy y con sombra propia sobre papel, donde el vidrio casi no se ve.
function diauno(est) {
  const R = 0.78, fondo = 0.24, bisel = 0.07;
  const cam = est.camera.position.clone().normalize();
  const camH = new THREE.Vector3(cam.x, 0, cam.z).normalize();
  const arriba = new THREE.Vector3(0, 1, 0);
  const lado = new THREE.Vector3().crossVectors(arriba, camH).normalize();
  const deCara = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), camH);
  const g = new THREE.Group();
  // el horizonte: una losa larga, baja y estrecha, de cara a la cámara
  const H = 0.16;
  const hor = malla(caja(2.9, H, 0.5, 0.07), M.peana, 0, H / 2, 0);
  hor.quaternion.copy(deCara);
  // medio disco con bisel; la base se hunde en el horizonte para que no se vea su canto
  const medio = (r, prof, b) => {
    const s = new THREE.Shape();
    s.moveTo(r, 0); s.absarc(0, 0, r, 0, Math.PI, false); s.lineTo(r, 0);
    const geo = new THREE.ExtrudeGeometry(s, { depth: prof, bevelEnabled: b > 0, bevelThickness: b, bevelSize: b, bevelSegments: 10, curveSegments: 128 });
    geo.translate(0, 0, -prof / 2);
    return geo;
  };
  const c = camH.clone().multiplyScalar(-0.04).setY(H - bisel - 0.03);
  const sol = malla(medio(R, fondo, bisel), M.lechoso, c.x, c.y, c.z);
  // el núcleo, más tenue que en los demás: en la tarjeta no puede ser lo más brillante, por encima del titular
  const nucleo = malla(medio(R * 0.8, fondo * 0.35, 0), luz({ centro: 1.6, borde: 0.85 }), c.x, c.y, c.z);
  sol.quaternion.copy(deCara); nucleo.quaternion.copy(deCara);
  nucleo.userData.sinSombra = true;
  const pl = new THREE.PointLight('#fff4e6', 1.0, 0, 2);
  pl.position.copy(c).addScaledVector(arriba, R * 0.5).addScaledVector(camH, fondo);
  g.add(hor, sol, nucleo, pl);
  // los rayos: varillas que salen del centro del sol, en abanico de ±64°
  const largo = 0.66, grosor = 0.06, hueco = 0.17;
  for (let i = 0; i < 5; i++) {
    const a = THREE.MathUtils.degToRad(-64 + 32 * i);
    const dir = arriba.clone().multiplyScalar(Math.cos(a)).addScaledVector(lado, Math.sin(a));
    const p = c.clone().addScaledVector(dir, R + bisel + hueco + largo / 2 + grosor);
    const rayo = malla(new THREE.CapsuleGeometry(grosor, largo, 12, 32), M.blanco, p.x, p.y, p.z);
    rayo.quaternion.setFromUnitVectors(arriba, dir);
    g.add(rayo);
  }
  // apaisado: con más peso del área en la medida, para que pese como los demás iconos
  return { objeto: g, opciones: { tam: 0.77, peso: 0.7 } };
}

// ── espiral: la S de Spiralia como seis tubos paralelos (geometría de s-geom.js). Cinco son de
// laca navy; la hebra 3, la de los pasos de SPIRAL, es de vidrio con la luz dentro, así que la
// S encendida se lee incluso a 28 px.
function tuboAfilado(curva, desde, hasta, radio, segs = 160, lados = 16) {
  const sub = new THREE.Curve();
  sub.getPoint = (u, v = new THREE.Vector3()) => v.copy(curva.getPointAt(desde + (hasta - desde) * u));
  const geo = new THREE.TubeGeometry(sub, segs, radio, lados, false);
  const pos = geo.attributes.position, c = new THREE.Vector3(), p = new THREE.Vector3();
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const k = Math.pow(Math.sin(Math.PI * u), 0.6);
    sub.getPoint(u, c);
    for (let j = 0; j <= lados; j++) {
      const n = i * (lados + 1) + j;
      p.fromBufferAttribute(pos, n).sub(c).multiplyScalar(k).add(c);
      pos.setXYZ(n, p.x, p.y, p.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

function espiral() {
  const G = window.SGEOM;
  const g = new THREE.Group();
  const alto = 2.4 / 455;
  const [cx, cy] = G.center;
  const r = 19.4 * 0.4 * alto;
  const curvas = G.pts.map((pts) => new THREE.CatmullRomCurve3(
    pts.map(([x, y]) => new THREE.Vector3((x - cx) * alto, -(y - cy) * alto, 0)), false, 'centripetal'));
  // cinco hebras de porcelana greige (la firma sobre oscuro) y la 3, la del método, de vidrio
  // esmerilado con la luz dentro
  curvas.forEach((curva, i) => {
    const mat = i === 2 ? M.hebra : M.laca;
    g.add(malla(new THREE.TubeGeometry(curva, 900, r, 20, false), mat));
    for (const u of [0, 1]) {
      const p = curva.getPointAt(u);
      g.add(malla(new THREE.SphereGeometry(r, 24, 16), mat, p.x, p.y, p.z));
    }
  });
  const fil = malla(tuboAfilado(curvas[2], 0.03, 0.97, r * 0.5, 400), luz({ centro: 1.6, borde: 1.2 }));
  fil.userData.sinSombra = true;
  g.add(fil);
  // el pulso: un tramo más intenso hacia el centro de la hebra, con su halo
  const pulso = malla(tuboAfilado(curvas[2], 0.42, 0.78, r * 0.62), luz({ centro: 3.0, borde: 1.4 }));
  pulso.userData.sinSombra = true;
  g.add(pulso);
  for (const [u, k] of [[0.54, 0.45], [0.6, 0.7], [0.66, 0.45]]) {
    const lp = puntoDeLuz(r * 2, { intensidad: 0.3, halo: 7, opacidadHalo: k * 0.5, orbe: false });
    lp.children[0].visible = false;
    lp.position.copy(curvas[2].getPointAt(u));
    g.add(lp);
  }
  g.rotation.y = THREE.MathUtils.degToRad(26);
  return { objeto: g, opciones: { flotar: 0.1 } };
}

export const ICONOS = { estrategia, formacion, ingenieria, resultados, personas, tecnologia, rumbo, diauno, espiral };
