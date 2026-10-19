// Los ocho iconos. Cada función modela su objeto con los materiales del estudio y devuelve
// { objeto, opciones }. El estudio lo apoya en el suelo, lo escala y lo encuadra.
import * as THREE from 'three';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';
import { ceramica, vidrio, puntoDeLuz, luz, PALETA } from './estudio.js';

// Materiales de la familia (se crean una vez por página).
const M = {
  greige: ceramica('#E2E0DA', { rugosidad: 0.55, barniz: 0.25, rim: 0.3 }),
  blanco: ceramica('#F3F1EC', { rugosidad: 0.5, barniz: 0.3, rim: 0.25 }),
  navy: ceramica(PALETA.navy2, { rugosidad: 0.45, barniz: 0.32, rim: 0.7 }),
  navy3: ceramica(PALETA.navy3, { rugosidad: 0.48, barniz: 0.3, rim: 0.6 }),
  vidrio: vidrio(),
  vitrina: vidrio({ rugosidad: 0.22, espesor: 0.12 }),
  hueco: vidrio({ rugosidad: 0.26, espesor: 0.1 }),
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
  const luzP = puntoDeLuz(0.16, { intensidad: 1.6 });
  luzP.position.set(0, paso * 3 + 0.16 + 0.1, -fondo);
  g.add(luzP);
  return { objeto: g };
}

// ── formación: tres losas apiladas y algo desplazadas; la de arriba, de vidrio con luz dentro
function formacion() {
  const g = new THREE.Group();
  const lado = 1.5, alto = 0.24, hueco = 0.1;
  const mats = [M.navy, M.greige, M.vidrio];
  for (let i = 0; i < 3; i++) {
    const m = malla(caja(lado, alto, lado, 0.12), mats[i], (i - 1) * 0.08, alto / 2 + i * (alto + hueco), -(i - 1) * 0.08);
    m.rotation.y = (i - 1) * 0.13;
    g.add(m);
    if (i === 2) {
      const nucleo = malla(caja(lado * 0.72, 0.05, lado * 0.72, 0.025), luz({ centro: 2.2, borde: 1.4 }), 0, 0, 0);
      nucleo.userData.sinSombra = true;
      m.add(nucleo);
      const pl = new THREE.PointLight('#fff4e6', 1.2, 0, 2);
      pl.position.y = -0.1;
      m.add(pl);
    }
  }
  return { objeto: g };
}

// ── ingeniería: dos anillos entrelazados, uno cerámico y otro de vidrio con un filamento de luz.
// Sus normales forman 45° con la mirada (una hacia arriba y otra hacia abajo), así que los dos
// se leen abiertos y el enlace queda en horizontal en pantalla.
function ingenieria(est) {
  const g = new THREE.Group();
  const R = 0.6, t = 0.16;
  const cam = est.camera.position.clone().normalize();
  const derecha = new THREE.Vector3(1, 0, -1).normalize();
  const arriba = new THREE.Vector3().crossVectors(derecha, cam).normalize();
  const nA = cam.clone().multiplyScalar(Math.SQRT1_2).addScaledVector(arriba, Math.SQRT1_2).normalize();
  const nB = cam.clone().multiplyScalar(Math.SQRT1_2).addScaledVector(arriba, -Math.SQRT1_2).normalize();
  const eje = new THREE.Vector3().crossVectors(nA, nB).normalize();
  const z = new THREE.Vector3(0, 0, 1);
  const a = malla(new THREE.TorusGeometry(R, t, 64, 200), M.navy);
  a.quaternion.setFromUnitVectors(z, nA);
  a.position.copy(eje).multiplyScalar(-R * 0.5);
  const b = malla(new THREE.TorusGeometry(R, t, 64, 200), M.hueco);
  b.quaternion.setFromUnitVectors(z, nB);
  b.position.copy(eje).multiplyScalar(R * 0.5);
  const fil = malla(new THREE.TorusGeometry(R, 0.03, 16, 200), luz({ centro: 2.2, borde: 1.3 }));
  fil.userData.sinSombra = true;
  b.add(fil);
  g.add(a, b);
  // un leve giro en el plano de la imagen le quita rigidez
  g.rotateOnWorldAxis(cam, THREE.MathUtils.degToRad(-12));
  return { objeto: g, opciones: { flotar: 0.06 } };
}

// ── resultados: barras de vidrio que crecen y acaban en una esfera de luz
function resultados() {
  const g = new THREE.Group();
  const w = 0.42, alturas = [0.6, 1.0, 1.45];
  const d = new THREE.Vector3(1, 0, -1).normalize();
  const cimas = [];
  alturas.forEach((h, i) => {
    const p = d.clone().multiplyScalar((i - 1) * 0.6);
    g.add(malla(caja(w, h, w, 0.08), M.vidrio, p.x, h / 2, p.z));
    cimas.push(new THREE.Vector3(p.x, h, p.z));
  });
  const base = malla(caja(2.0, 0.1, 0.8, 0.05), M.navy, 0, -0.05, 0);
  base.rotation.y = Math.PI / 4;
  g.add(base);
  const fin = cimas[2].clone().add(new THREE.Vector3(0, 0.3, 0));
  const curva = new THREE.CatmullRomCurve3([
    cimas[0].clone().add(new THREE.Vector3(0, 0.12, 0)),
    cimas[1].clone().add(new THREE.Vector3(0, 0.2, 0)),
    fin,
  ]);
  const tubo = malla(new THREE.TubeGeometry(curva, 120, 0.018, 12, false), luz({ centro: 1.8, borde: 1.1 }));
  tubo.userData.sinSombra = true;
  g.add(tubo);
  const lp = puntoDeLuz(0.15, { intensidad: 1.4 });
  lp.position.copy(fin);
  g.add(lp);
  return { objeto: g };
}

// ── personas: un grupo de esferas de distinto tamaño; una se enciende e ilumina a las demás
function personas() {
  const g = new THREE.Group();
  const gente = [
    { r: 0.46, x: -0.35, z: -0.32, m: M.navy },
    { r: 0.36, x: 0.5, z: -0.46, m: M.greige },
    { r: 0.26, x: -0.64, z: 0.44, m: M.navy3 },
    { r: 0.22, x: 0.7, z: 0.22, m: M.blanco },
    { r: 0.16, x: -0.18, z: 0.82, m: M.greige },
  ];
  for (const p of gente) g.add(malla(new THREE.SphereGeometry(p.r, 96, 48), p.m, p.x, p.r, p.z));
  const lp = puntoDeLuz(0.3, { intensidad: 2.4, halo: 5 });
  lp.position.set(0.12, 0.3, 0.3);
  g.add(lp);
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

// ── rumbo: esfera armilar sobre peana, con una aguja que marca dirección y luz en el centro
function rumbo() {
  const g = new THREE.Group();
  const R = 0.8, t = 0.065, cy = 1.22;
  const esfera = new THREE.Group();
  const meridiano = malla(new THREE.TorusGeometry(R, t, 48, 220), M.navy);
  const ecuador = malla(new THREE.TorusGeometry(R, t, 48, 220), M.greige);
  ecuador.rotation.set(Math.PI / 2 - 0.38, 0, 0.18);
  esfera.add(meridiano, ecuador);
  esfera.rotation.y = 0.55;
  esfera.position.y = cy;
  // aguja: dos conos largos unidos por la base, blanco hacia el norte y navy hacia el sur
  const aguja = new THREE.Group();
  const cono = new THREE.ConeGeometry(0.085, 1.0, 64);
  const n = malla(cono, M.blanco, 0, 0.5, 0);
  const s = malla(cono, M.navy3, 0, -0.5, 0); s.rotation.x = Math.PI;
  aguja.add(n, s);
  aguja.position.y = cy;
  aguja.rotation.set(-0.25, 0, -0.75);
  const centro = puntoDeLuz(0.17, { intensidad: 1.4, halo: 5.5 });
  centro.position.y = cy;
  const pie = malla(caja(0.9, 0.14, 0.9, 0.07), M.navy, 0, 0.07, 0);
  const vastago = malla(new THREE.CylinderGeometry(0.04, 0.05, cy - R, 32), M.greige, 0, 0.14 + (cy - R - 0.14) / 2, 0);
  g.add(pie, vastago, esfera, aguja, centro);
  return { objeto: g };
}

// ── espiral: la S de Spiralia como seis tubos de vidrio paralelos (geometría de s-geom.js)
// con un pulso de luz que recorre la hebra 3, la de los pasos de SPIRAL.
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
  const r = 19.4 * 0.36 * alto;
  const curvas = G.pts.map((pts) => new THREE.CatmullRomCurve3(
    pts.map(([x, y]) => new THREE.Vector3((x - cx) * alto, -(y - cy) * alto, 0)), false, 'centripetal'));
  curvas.forEach((curva) => {
    g.add(malla(new THREE.TubeGeometry(curva, 900, r, 20, false), M.hueco));
    for (const u of [0, 1]) {
      const p = curva.getPointAt(u);
      g.add(malla(new THREE.SphereGeometry(r, 24, 16), M.hueco, p.x, p.y, p.z));
    }
  });
  const pulso = malla(tuboAfilado(curvas[2], 0.5, 0.68, r * 0.55), luz({ centro: 2.6, borde: 1.4 }));
  pulso.userData.sinSombra = true;
  g.add(pulso);
  const lp = puntoDeLuz(r * 1.2, { intensidad: 0.6, halo: 9, opacidadHalo: 0.45, orbe: false });
  lp.children[0].visible = false;
  lp.position.copy(curvas[2].getPointAt(0.62));
  g.add(lp);
  g.rotation.y = THREE.MathUtils.degToRad(26);
  return { objeto: g, opciones: { flotar: 0.1 } };
}

export const ICONOS = { estrategia, formacion, ingenieria, resultados, personas, tecnologia, rumbo, espiral };
