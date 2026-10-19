// Estudio común de los iconos 3D: cámara, entorno de luz, materiales, sombras y salida.
// Todo lo que hace que los ocho iconos parezcan una familia vive aquí; iconos.js solo modela.
import * as THREE from 'three';

export const LADO = 768;

export const PALETA = {
  noche: '#051A2B', navy: '#08263D', navy2: '#0D3150', navy3: '#174467',
  greige: '#E0DFDA', papel: '#F5F4F0', gris: '#A9B1B8', blanco: '#FFFFFF',
};

// Vista 3/4 fija para todos: acimut 45°, elevación 30°, objetivo de 22° (poca deformación).
const ACIMUT = THREE.MathUtils.degToRad(45);
const ELEVACION = THREE.MathUtils.degToRad(30);
const DISTANCIA = 11;
const FOV = 22;

// Borde de luz (fresnel) común: en espacio de vista, hacia arriba a la derecha.
const RIM_DIR = new THREE.Vector3(0.62, 0.62, 0.18).normalize();

// ───────────────────────────── entorno de estudio
// Cúpula con degradado y cinco cajas de luz. Se pasa por PMREM y da a la vez la luz difusa
// y los reflejos rectangulares de softbox que leen como «producto».
function crearEntorno(renderer) {
  const env = new THREE.Scene();
  const cupula = new THREE.Mesh(
    new THREE.SphereGeometry(30, 64, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: {
        alto: { value: new THREE.Color(0.30, 0.31, 0.33) },
        medio: { value: new THREE.Color(0.10, 0.11, 0.12) },
        bajo: { value: new THREE.Color(0.018, 0.022, 0.028) },
      },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform vec3 alto, medio, bajo; varying vec3 vP;
        void main(){
          float y = vP.y;
          vec3 c = y > 0.0 ? mix(medio, alto, smoothstep(0.0, 0.85, y)) : mix(medio, bajo, smoothstep(0.0, 0.35, -y));
          gl_FragColor = vec4(c, 1.0);
        }`,
    }),
  );
  env.add(cupula);
  const caja = (w, h, pos, intensidad, color) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensidad), side: THREE.DoubleSide }),
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  caja(10, 7, [-5, 10, 11], 5.5, '#fff9f3');   // principal: arriba, delante a la izquierda
  caja(18, 2.4, [10, 4, -12], 7.0, '#eef3f8'); // tira de contorno detrás a la derecha
  caja(2.4, 14, [-13, 5, -6], 3.2, '#eef3f8'); // tira de contorno detrás a la izquierda
  caja(16, 16, [0, 18, 0], 1.4, '#ffffff');    // cenital suave
  caja(9, 3, [11, 1.5, 9], 0.8, '#fbf8f2');    // relleno bajo, delante a la derecha
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.03).texture;
  pmrem.dispose();
  return tex;
}

// ───────────────────────────── materiales

// Inyecta el borde de luz y, en el vidrio, la salida premultiplicada.
function parchear(material, { rim, rimPot, vidrio = false }) {
  const u = {
    uRim: { value: new THREE.Color(rim[0]).multiplyScalar(rim[1]) },
    uRimPot: { value: rimPot },
    uRimDir: { value: RIM_DIR },
  };
  material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, u);
    sh.fragmentShader = 'uniform vec3 uRim; uniform float uRimPot; uniform vec3 uRimDir;\n' + sh.fragmentShader;
    const borde = `
	float frR = pow( 1.0 - saturate( dot( normal, geometryViewDir ) ), uRimPot );
	outgoingLight += uRim * frR * saturate( dot( normal, uRimDir ) * 0.55 + 0.55 );
`;
    if (!vidrio) {
      sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', borde + '#include <opaque_fragment>');
      return;
    }
    // Vidrio: la luz transmitida ya llega premultiplicada (ver «fondoVidrio»). Se le suma la
    // reflejada y se da a la cobertura lo que haga falta para que el PNG la conserve.
    const i0 = sh.fragmentShader.indexOf('#include <opaque_fragment>');
    const i1 = sh.fragmentShader.indexOf('#include <dithering_fragment>') + '#include <dithering_fragment>'.length;
    sh.fragmentShader = sh.fragmentShader.slice(0, i0) + borde + `
	float cob = 1.0;
	#ifdef USE_TRANSMISSION
		cob = material.transmissionAlpha;
	#endif
	vec3 P = max( outgoingLight, 0.0 );
	float a = saturate( max( cob, max3( P ) ) );
	vec3 C = P / max( a, 1e-4 );
	#ifdef TONE_MAPPING
		C = toneMapping( C );
	#endif
	C = linearToOutputTexel( vec4( C, 1.0 ) ).rgb;
	gl_FragColor = vec4( C * a, a );
` + sh.fragmentShader.slice(i1);
  };
  material.customProgramCacheKey = () => (vidrio ? 'vidrio' : 'ceramica') + rim.join() + rimPot;
  return material;
}

// Cerámica mate con un punto de esmalte.
export function ceramica(color, { rugosidad = 0.5, barniz = 0.3, rim = 0.45, rimPot = 3.0 } = {}) {
  const m = new THREE.MeshPhysicalMaterial({
    color, roughness: rugosidad, metalness: 0,
    clearcoat: barniz, clearcoatRoughness: 0.35,
    sheen: 0.35, sheenRoughness: 0.7, sheenColor: new THREE.Color('#ffffff'),
  });
  return parchear(m, { rim: ['#e9eef2', rim], rimPot });
}

// Vidrio esmerilado: transmisión física con rugosidad y atenuación navy.
export function vidrio({ rugosidad = 0.3, espesor = 0.35, atenuacion = '#97a3ad', distancia = 2.0, rim = 0.55 } = {}) {
  const m = new THREE.MeshPhysicalMaterial({
    color: '#ffffff', roughness: rugosidad, metalness: 0,
    transmission: 1, thickness: espesor, ior: 1.42,
    attenuationColor: new THREE.Color(atenuacion), attenuationDistance: distancia,
    clearcoat: 1, clearcoatRoughness: 0.08, specularIntensity: 1,
  });
  return parchear(m, { rim: ['#f3f6f8', rim], rimPot: 2.4, vidrio: true });
}

// Luz: núcleo de perla, blanco en el centro y algo más cálido hacia el borde.
export function luz({ centro = 3.2, borde = 0.85, color = '#fff8ee' } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uCentro: { value: centro }, uBorde: { value: borde } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uCentro; uniform float uBorde; varying vec3 vN; varying vec3 vV;
      void main(){
        float d = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
        gl_FragColor = vec4(uColor * mix(uBorde, uCentro, pow(d, 0.7)), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

// Halo: textura radial gaussiana, una sola para todos.
let _halo = null;
function texturaHalo() {
  if (_halo) return _halo;
  const n = 256, c = document.createElement('canvas');
  c.width = c.height = n;
  const g = c.getContext('2d');
  const img = g.createImageData(n, n);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const dx = (x + 0.5) / n * 2 - 1, dy = (y + 0.5) / n * 2 - 1;
    const r = Math.sqrt(dx * dx + dy * dy);
    const a = Math.max(0, Math.exp(-r * r * 9) * 0.85 + Math.exp(-r * r * 2.6) * 0.15 - 0.012 * r) * (r < 1 ? 1 : 0);
    const i = (y * n + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
    img.data[i + 3] = Math.round(Math.min(1, a) * 255);
  }
  g.putImageData(img, 0, 0);
  _halo = new THREE.CanvasTexture(c);
  _halo.colorSpace = THREE.SRGBColorSpace;
  return _halo;
}

// Punto de luz completo: perla + halo + luz puntual que ilumina a los vecinos.
// Con «orbe», la luz va dentro de una esfera de vidrio esmerilado: brilla sobre noche y
// conserva el contorno sobre papel. Sin orbe (dentro de otro vidrio) queda la perla sola.
export function puntoDeLuz(radio, { halo = 5.5, opacidadHalo = 0.55, intensidad = 2.5, alcance = 0, orbe = true } = {}) {
  const g = new THREE.Group();
  const perla = new THREE.Mesh(new THREE.SphereGeometry(orbe ? radio * 0.55 : radio, 64, 32), luz());
  perla.userData.sinSombra = true;
  g.add(perla);
  if (orbe) {
    const cascara = new THREE.Mesh(new THREE.SphereGeometry(radio, 96, 48), vidrio({ rugosidad: 0.38, espesor: 0.25, rim: 0.7 }));
    cascara.userData.sinSombra = true;
    g.add(cascara);
  }
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texturaHalo(), color: '#fffaf2', transparent: true, opacity: opacidadHalo,
    depthWrite: false, depthTest: false, toneMapped: false,
  }));
  sp.scale.setScalar(radio * halo);
  sp.renderOrder = 10;
  sp.userData.fuera = true;
  g.add(sp);
  if (intensidad > 0) {
    const pl = new THREE.PointLight('#fff4e6', intensidad, alcance, 2);
    g.add(pl);
  }
  return g;
}

// ───────────────────────────── fondo que solo ve el vidrio
// En el pase de transmisión el lienzo es transparente; esta cúpula le da al vidrio un
// interior de luz difusa (premultiplicada, alfa parcial) y no se pinta en el pase final.
function fondoVidrio() {
  const m = new THREE.Mesh(
    new THREE.SphereGeometry(40, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, blending: THREE.NoBlending,
      uniforms: {
        alto: { value: new THREE.Color('#eceeef') }, bajo: { value: new THREE.Color('#a7b0b8') },
        aAlto: { value: 0.34 }, aBajo: { value: 0.22 },
      },
      vertexShader: 'varying vec3 vD; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vD = normalize(w.xyz - cameraPosition); gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: `uniform vec3 alto, bajo; uniform float aAlto, aBajo; varying vec3 vD;
        void main(){
          float t = smoothstep(-0.75, 0.05, vD.y);
          vec3 c = mix(bajo, alto, t); float a = mix(aBajo, aAlto, t);
          gl_FragColor = vec4(c * a, a);
        }`,
    }),
  );
  m.frustumCulled = false;
  m.renderOrder = -100;
  m.userData.fuera = true;
  m.userData.sinSombra = true;
  m.onBeforeRender = (renderer, scene, camera, geometry, material) => {
    material.colorWrite = renderer.getRenderTarget() !== null;
  };
  return m;
}

// ───────────────────────────── sombras de contacto
// Profundidad vista desde el suelo, difuminada en dos pasadas y pintada en navy noche.
// Se dibuja en la lista opaca (con mezcla) para que el vidrio también la vea.
const DESENFOQUE = {
  uniforms: { tDiffuse: { value: null }, paso: { value: new THREE.Vector2() } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 paso; varying vec2 vUv;
    void main(){
      vec4 s = vec4(0.0);
      s += texture2D(tDiffuse, vUv - 4.0 * paso) * 0.051;
      s += texture2D(tDiffuse, vUv - 3.0 * paso) * 0.0918;
      s += texture2D(tDiffuse, vUv - 2.0 * paso) * 0.12245;
      s += texture2D(tDiffuse, vUv - 1.0 * paso) * 0.1531;
      s += texture2D(tDiffuse, vUv) * 0.1633;
      s += texture2D(tDiffuse, vUv + 1.0 * paso) * 0.1531;
      s += texture2D(tDiffuse, vUv + 2.0 * paso) * 0.12245;
      s += texture2D(tDiffuse, vUv + 3.0 * paso) * 0.0918;
      s += texture2D(tDiffuse, vUv + 4.0 * paso) * 0.051;
      gl_FragColor = s;
    }`,
};

class SombraContacto {
  constructor(renderer, scene, { lado, centro, alto, desenfoque, opacidad, oscuridad = 1.0, res = 1024, y = 0.002 }) {
    this.renderer = renderer; this.scene = scene; this.desenfoque = desenfoque;
    const opts = { type: THREE.HalfFloatType };
    this.rt = new THREE.WebGLRenderTarget(res, res, opts);
    this.rt2 = new THREE.WebGLRenderTarget(res, res, opts);
    this.rt.texture.generateMipmaps = this.rt2.texture.generateMipmaps = false;
    this.grupo = new THREE.Group();
    this.grupo.position.set(centro.x, y, centro.z);
    scene.add(this.grupo);
    const geo = new THREE.PlaneGeometry(lado, lado).rotateX(Math.PI / 2);
    this.plano = new THREE.Mesh(geo, new THREE.ShaderMaterial({
      uniforms: { map: { value: this.rt.texture }, uColor: { value: new THREE.Color(PALETA.noche) }, uOpacidad: { value: opacidad } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform sampler2D map; uniform vec3 uColor; uniform float uOpacidad; varying vec2 vUv;
        void main(){
          float a = texture2D(map, vUv).a * uOpacidad;
          gl_FragColor = vec4(uColor, a);
          #include <colorspace_fragment>
        }`,
      transparent: false, depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
      blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    }));
    this.plano.scale.y = -1;
    this.plano.renderOrder = -50;
    this.plano.userData.fuera = true;
    this.plano.userData.sinSombra = true;
    this.grupo.add(this.plano);
    this.cam = new THREE.OrthographicCamera(-lado / 2, lado / 2, lado / 2, -lado / 2, 0, alto);
    this.cam.rotation.x = Math.PI / 2;
    this.grupo.add(this.cam);
    this.plano2 = new THREE.Mesh(geo);
    this.mat = (k) => {
      const m = new THREE.MeshDepthMaterial();
      m.onBeforeCompile = (sh) => {
        sh.fragmentShader = sh.fragmentShader.replace(
          'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
          `gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * ${(oscuridad * k).toFixed(3)} );`);
      };
      m.customProgramCacheKey = () => 'sombra' + oscuridad * k;
      m.side = THREE.DoubleSide;
      return m;
    };
    this.matOpaco = this.mat(1);
    this.matVidrio = this.mat(0.45);
    this.desH = new THREE.ShaderMaterial(DESENFOQUE); this.desH.uniforms = THREE.UniformsUtils.clone(DESENFOQUE.uniforms);
    this.desV = new THREE.ShaderMaterial(DESENFOQUE); this.desV.uniforms = THREE.UniformsUtils.clone(DESENFOQUE.uniforms);
    this.desH.depthTest = this.desV.depthTest = false;
    this.res = res;
  }
  difuminar(cantidad) {
    const r = this.renderer;
    this.plano2.material = this.desH;
    this.desH.uniforms.tDiffuse.value = this.rt.texture;
    this.desH.uniforms.paso.value.set(cantidad / this.res, 0);
    r.setRenderTarget(this.rt2); r.render(this.plano2, this.cam);
    this.plano2.material = this.desV;
    this.desV.uniforms.tDiffuse.value = this.rt2.texture;
    this.desV.uniforms.paso.value.set(0, cantidad / this.res);
    r.setRenderTarget(this.rt); r.render(this.plano2, this.cam);
  }
  render(raiz) {
    const r = this.renderer;
    // cambia materiales: los que no proyectan se ocultan; el vidrio proyecta menos
    const guardados = [];
    this.scene.traverse((o) => {
      if (o.isSprite || o.isLight) return;
      if (!o.isMesh) return;
      if (o.userData.sinSombra || !raiz.getObjectById(o.id)) { guardados.push([o, o.visible, null]); o.visible = false; return; }
      guardados.push([o, o.visible, o.material]);
      o.material = o.material.transmission > 0 ? this.matVidrio : this.matOpaco;
    });
    const sprites = [];
    this.scene.traverse((o) => { if (o.isSprite) { sprites.push([o, o.visible]); o.visible = false; } });
    const ca = r.getClearAlpha();
    r.setClearAlpha(0);
    r.setRenderTarget(this.rt);
    r.clear();
    r.render(this.scene, this.cam);
    for (const [o, v, m] of guardados) { o.visible = v; if (m) o.material = m; }
    for (const [o, v] of sprites) o.visible = v;
    this.difuminar(this.desenfoque);
    this.difuminar(this.desenfoque * 0.5);
    r.setRenderTarget(null);
    r.setClearAlpha(ca);
  }
}

// ───────────────────────────── estudio

export function crearEstudio(canvas, { ss = 1 } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(ss);
  renderer.setSize(LADO, LADO, false);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.environment = crearEntorno(renderer);
  scene.environmentIntensity = 1.0;

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
  const dir = new THREE.Vector3(Math.sin(ACIMUT) * Math.cos(ELEVACION), Math.sin(ELEVACION), Math.cos(ACIMUT) * Math.cos(ELEVACION));
  camera.position.copy(dir).multiplyScalar(DISTANCIA);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  // Luz principal (arriba, delante a la izquierda de la cámara) y contraluz (detrás a la derecha).
  const principal = new THREE.DirectionalLight('#fffaf4', 1.5);
  principal.position.set(-3.5, 9, 6.5);
  principal.castShadow = true;
  principal.shadow.mapSize.set(2048, 2048);
  principal.shadow.radius = 6;
  principal.shadow.bias = -0.0004;
  principal.shadow.normalBias = 0.02;
  scene.add(principal);
  const contra = new THREE.DirectionalLight('#eef3f8', 1.6);
  contra.position.set(2.5, 4, -8);
  scene.add(contra);

  scene.add(fondoVidrio());

  const pivote = new THREE.Group();
  scene.add(pivote);
  const sombras = [];

  // Proyección en pantalla (NDC) de todos los vértices visibles del icono.
  function cajaPantalla() {
    const v = new THREE.Vector3();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    pivote.updateWorldMatrix(true, true);
    camera.updateMatrixWorld();
    pivote.traverse((o) => {
      if (!o.isMesh || o.userData.fuera || !o.visible) return;
      const pos = o.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld).project(camera);
        x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
      }
    });
    return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
  }

  // Mismo tamaño visual para todos: la mayor dimensión en pantalla ocupa «tam» del encuadre.
  // Se escala el objeto (no se acerca la cámara) para que la perspectiva sea idéntica.
  function montar(icono, { tam = 0.68, peso = 0.5, flotar = 0 } = {}) {
    const caja = new THREE.Box3().setFromObject(icono);
    const c = caja.getCenter(new THREE.Vector3());
    icono.position.sub(new THREE.Vector3(c.x, caja.min.y, c.z));
    icono.position.y += flotar * (caja.max.y - caja.min.y);
    pivote.add(icono);
    for (let k = 0; k < 4; k++) {
      const b = cajaPantalla();
      // mezcla entre el lado mayor y el área: los objetos alargados no quedan diminutos
      const medida = Math.max(b.w, b.h) * (1 - peso) + Math.sqrt(b.w * b.h) * peso;
      pivote.scale.multiplyScalar((tam * 2) / medida);
    }
    // centrado: se desplaza la cámara en su plano, sin girarla
    const mitad = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * DISTANCIA;
    const derecha = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    const arriba = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    for (let k = 0; k < 3; k++) {
      const b = cajaPantalla();
      const dx = (b.x0 + b.x1) / 2, dy = (b.y0 + b.y1) / 2 - 0.035;
      camera.position.addScaledVector(derecha, dx * mitad).addScaledVector(arriba, dy * mitad);
      camera.updateMatrixWorld();
    }
    // sombras proyectadas entre piezas
    const mundo = new THREE.Box3().setFromObject(pivote);
    const centro = mundo.getCenter(new THREE.Vector3());
    const tamMundo = mundo.getSize(new THREE.Vector3());
    const r = Math.max(tamMundo.x, tamMundo.y, tamMundo.z);
    const sc = principal.shadow.camera;
    sc.left = sc.bottom = -r; sc.right = sc.top = r; sc.near = 0.1; sc.far = 40;
    principal.target.position.copy(centro);
    principal.position.copy(centro).add(new THREE.Vector3(-3.5, 9, 6.5).normalize().multiplyScalar(15));
    scene.add(principal.target);
    sc.updateProjectionMatrix();
    pivote.traverse((o) => {
      if (o.isMesh && !o.userData.fuera && !o.userData.sinSombra) { o.castShadow = true; o.receiveShadow = true; }
    });
    // dos sombras de contacto: una ceñida y otra amplia y suave
    const lado = Math.max(tamMundo.x, tamMundo.z) * 2.2 + 1;
    sombras.push(new SombraContacto(renderer, scene, { lado, centro, alto: tamMundo.y * 0.12 + 0.05, desenfoque: 1.2, opacidad: 0.62, y: 0.002 }));
    sombras.push(new SombraContacto(renderer, scene, { lado, centro, alto: tamMundo.y * 0.9 + 0.3, desenfoque: 7, opacidad: 0.42, y: 0.001 }));
  }

  function pintar() {
    for (const s of sombras) s.render(pivote);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }

  // Copia reducida del lienzo, en RGBA recto (sin premultiplicar), en pasos de mitad.
  function exportar(tam) {
    let src = canvas;
    while (src.width / 2 >= tam) {
      const c = document.createElement('canvas');
      c.width = c.height = Math.round(src.width / 2);
      const g = c.getContext('2d');
      g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
      g.drawImage(src, 0, 0, c.width, c.height);
      src = c;
    }
    const c = document.createElement('canvas');
    c.width = c.height = tam;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(src, 0, 0, tam, tam);
    const d = g.getImageData(0, 0, tam, tam).data;
    let s = '';
    for (let i = 0; i < d.length; i += 0x8000) s += String.fromCharCode.apply(null, d.subarray(i, i + 0x8000));
    return btoa(s);
  }

  return { THREE, renderer, scene, camera, montar, pintar, exportar };
}
