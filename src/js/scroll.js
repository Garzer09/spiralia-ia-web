// Capa de movimiento: scroll suave (Lenis), titulares que entran por líneas (SplitText), escenas guiadas
// por el scroll (ScrollTrigger) y WebGL (gl.js) en la portada y en el método.
// Mejora progresiva: sin estas librerías, sin WebGL, con «reducir movimiento» o con ?still=1, la página
// se queda como la dejan engine.js y motion.js, completa y estática.
(() => {
  'use strict';
  if (!window.SP) return;
  const { $, $$, still } = window.SP;
  const root = document.documentElement;
  const fino = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const ancho = matchMedia('(min-width: 1024px)'), reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const c = navigator.connection || {};
  const ahorro = !!c.saveData || /2g/.test(c.effectiveType || '');
  const quieto = still();
  // ?gl=1 admite el WebGL por software y quita el vigilante (para pruebas); ?gl=0 lo apaga
  const glUrl = (location.search.match(/[?&]gl=([01])\b/) || [])[1];
  const fin = () => root.classList.remove('intro');
  const enEscucha = (m, f) => m.addEventListener ? m.addEventListener('change', f) : m.addListener(f);

  // Luz que sigue al cursor en las superficies .spot y en la marca del pie (.luz)
  if (fino) document.addEventListener('pointermove', e => {
    const s = e.target.closest && e.target.closest('.spot, .luz'); if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px'); s.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
  }, { passive: true });

  // El ancla de la URL: en la carga se salta a ella sin animación (un panel de «Para ti» lleva a su sección),
  // salvo que la persona ya se haya movido
  let tocado = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(n => addEventListener(n, () => { tocado = true; }, { once: true, passive: true }));
  const destino = () => {
    let el = null; try { el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) {}
    return el && el.getAttribute('role') === 'tabpanel' ? el.closest('section') : el || null;
  };
  // Durante la carga, el navegador aún corrige el scroll unos píxeles tras el salto: se comprueba un rato y se repite
  const asienta = (el, salta) => [0, 120, 400, 900, 1600].forEach(ms => setTimeout(() => requestAnimationFrame(() => {
    if (tocado) return;
    const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0, top = el.getBoundingClientRect().top;
    if (Math.abs(top - pad) > 1 && scrollY < root.scrollHeight - innerHeight - 1) salta(el);
  }), ms));

  // WebGL: la organización que se enciende (portada) y la S hecha de partículas (método)
  // Si el motor falla o va lento, se sigue sin WebGL: la portada usa su vídeo y el método, el SVG
  const hero = $('[data-hero]'), spiral = $('.spiral');
  let GL = null; try { GL = glUrl !== '0' && window.SPGL && window.SPGL.supported() && !ahorro ? window.SPGL : null; } catch (e) {}
  let glHero = null, glSp = null, esperaSp = null, sueltaPausa = null;
  const crear = (cv, o) => {
    try { return GL.create(cv, Object.assign({ density: innerWidth < 760 ? .6 : 1, still: quieto, software: glUrl === '1', vigia: glUrl !== '1', lento: sinGL }, o)); } catch (e) { return null; }
  };
  function sinGL() {
    GL = null;
    if (esperaSp) { esperaSp.disconnect(); esperaSp = null; }
    if (glHero) { glHero.destroy(); glHero = null; hero.classList.remove('has-gl'); if (sueltaPausa) sueltaPausa(); hero.dispatchEvent(new Event('sp:singl')); }
    if (glSp) { glSp.destroy(); glSp = null; spiral.classList.remove('has-gl'); }
  }
  if (GL && hero) {
    const cv = $('.hero-gl', hero);
    glHero = crear(cv, { scene: 'planta' });
    if (glHero) {
      hero.classList.add('has-gl');
      if (fino) {
        hero.addEventListener('pointermove', e => { if (!glHero) return; const r = cv.getBoundingClientRect(); glHero.setPointer(e.clientX - r.left, e.clientY - r.top); }, { passive: true });
        hero.addEventListener('pointerleave', () => glHero && glHero.setPointer(null));
      }
      // La pausa de la portada detiene la animación; la elección se recuerda como con el vídeo.
      // La etiqueta es fija; el estado lo dice aria-pressed. Mientras se ve la película, también se para (fuera)
      const btn = $('.hero-pause', hero), KEY = 'sp-fondo-pausado';
      let pausa = false, fuera = false; try { pausa = localStorage.getItem(KEY) === '1'; } catch (e) {}
      const aplicar = () => {
        if (!glHero) return;
        pausa || fuera ? glHero.stop() : glHero.start();
        if (btn) { btn.hidden = quieto; btn.setAttribute('aria-pressed', String(pausa)); btn.setAttribute('aria-label', btn.dataset.pause); }
      };
      const clic = () => { pausa = !pausa; try { pausa ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch (e) {} aplicar(); };
      const para = () => { fuera = true; aplicar(); }, sigue = () => { fuera = false; aplicar(); };
      // «Reducir movimiento» activado con la página abierta: se para como si se pulsara la pausa (sin recordarlo)
      const rm = e => { if (e.matches) { pausa = true; aplicar(); } };
      if (btn) btn.addEventListener('click', clic);
      document.addEventListener('sp:pausa', para); document.addEventListener('sp:sigue', sigue); enEscucha(reduce, rm);
      // Sin WebGL, la pausa pasa a motion.js (vídeo)
      sueltaPausa = () => {
        if (btn) { btn.removeEventListener('click', clic); btn.hidden = true; }
        document.removeEventListener('sp:pausa', para); document.removeEventListener('sp:sigue', sigue);
        reduce.removeEventListener && reduce.removeEventListener('change', rm);
      };
      aplicar();
    }
  }

  // La S de partículas se crea a una pantalla de distancia, no en la carga. Lo que pide el método antes
  // (progreso y paso) se guarda y se aplica al crearla. motion.js avisa de cada paso (onSet), con o sin GSAP
  const spGL = { prog: quieto ? 1 : 0, paso: quieto ? 6 : 0 };
  const spProg = p => { spGL.prog = p; if (glSp) glSp.setProgress(p); };
  const spPaso = n => { spGL.paso = n; if (glSp) glSp.setStep(n); };
  if (spiral && window.SP.spiral) window.SP.spiral.onSet = spPaso;
  const montaSp = () => {
    if (!GL || glSp) return;
    const cvs = $('.sp-gl', spiral);
    glSp = crear(cvs, { scene: 'espiral' }); if (!glSp) return;
    spiral.classList.add('has-gl');
    glSp.setProgress(spGL.prog); glSp.setStep(spGL.paso);
    if (!reduce.matches) glSp.start();
    if (fino) {
      spiral.addEventListener('pointermove', e => { if (!glSp) return; const r = cvs.getBoundingClientRect(); glSp.setPointer(e.clientX - r.left, e.clientY - r.top); }, { passive: true });
      spiral.addEventListener('pointerleave', () => glSp && glSp.setPointer(null));
    }
  };
  if (GL && spiral) {
    if (window.IntersectionObserver) {
      esperaSp = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { esperaSp.disconnect(); esperaSp = null; montaSp(); } }, { rootMargin: '100% 0px' });
      esperaSp.observe(spiral);
    } else montaSp();
  }
  enEscucha(reduce, e => { if (e.matches && glSp) glSp.stop(); });

  const gsap = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  // Se monta con las fuentes cargadas y después de que engine.js, motion.js y diagnostico.js pinten (DOMContentLoaded)
  // (un script diferido corre ya en 'interactive', antes de DOMContentLoaded; load queda de red de seguridad)
  const dom = new Promise(r => { if (document.readyState === 'complete') return r(); document.addEventListener('DOMContentLoaded', r, { once: true }); addEventListener('load', r, { once: true }); });
  const listo = Promise.all([document.fonts && document.fonts.ready, dom]);
  if (quieto || !gsap || !ST) {
    // Sin capa de scroll: la S queda formada y el ancla, en su sitio
    fin(); spProg(1);
    listo.then(() => {
      const a = destino(), salta = el => el.scrollIntoView({ behavior: 'instant' });
      if (a && !tocado) { salta(a); asienta(a, salta); }
    });
    return;
  }
  gsap.registerPlugin(ST); if (Split) gsap.registerPlugin(Split);
  root.classList.add('sota');

  // Scroll suave solo con ratón o trackpad; en táctil, el nativo. Las anclas las lleva Lenis, que ya resta
  // el scroll-padding-top de html (la altura de la barra)
  let lenis = null;
  if (fino && window.Lenis && !reduce.matches) {
    lenis = new window.Lenis({ lerp: .1, wheelMultiplier: .9, anchors: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(t => lenis && lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    document.addEventListener('sp:pausa', () => lenis && lenis.stop()); document.addEventListener('sp:sigue', () => lenis && lenis.start());
    // El menú a pantalla completa (motion.js) detiene el scroll de detrás
    document.addEventListener('sp:menu', e => lenis && (e.detail ? lenis.stop() : lenis.start()));
    enEscucha(reduce, e => { if (e.matches && lenis) { lenis.destroy(); lenis = null; } });
  }
  // Cuando cambia la altura de la página (pestañas, diagnóstico, preguntas), ScrollTrigger recalcula posiciones.
  // Nunca a mitad de un desplazamiento: el refresh lo cortaría (o desajustaría a Lenis); espera a que pare
  let rq = 0, movido = 0;
  addEventListener('scroll', () => { movido = performance.now(); }, { passive: true });
  const recalcula = () => { clearTimeout(rq); rq = 0; ST.refresh(); };
  const espera = () => { rq = (lenis && lenis.isScrolling) || performance.now() - movido < 150 ? setTimeout(espera, 150) : (recalcula(), 0); };
  document.addEventListener('sp:alto', e => { clearTimeout(rq); rq = setTimeout(espera, Math.max(120, e.detail || 0)); });
  // Antes de un desplazamiento suave, el recálculo pendiente se hace ya y Lenis toma la posición y la altura reales
  window.SP.scrollTo = el => {
    if (rq) recalcula();
    if (lenis) { lenis.resize(); lenis.scrollTo(el); } else el.scrollIntoView({ behavior: reduce.matches ? 'instant' : 'smooth' });
  };
  const salta = el => {
    if (lenis) { lenis.resize(); lenis.scrollTo(el, { immediate: true, force: true }); } else el.scrollIntoView({ behavior: 'instant' });
  };

  // El gráfico del reto lo mueve el scroll: se retira del motor de piezas antes de que arranque.
  // La espiral también, si arranca fijada (≥1024 px); si luego no se fija, la reproduce esta capa al entrar
  const chart = $('.chart[data-piece]'); if (chart) chart.removeAttribute('data-piece');
  if (spiral && ancho.matches) spiral.removeAttribute('data-piece');
  // Los titulares de sección los anima esta capa, no la aparición genérica
  $$('.head.rv').forEach(h => h.classList.remove('rv'));

  listo.then(() => {
    // aria: 'none': el texto partido se sigue leyendo entero, sin aria-label en span o p
    const lineas = (el) => Split ? new Split(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none' }).lines : [el];
    const palabras = (el) => Split ? new Split(el, { type: 'words', wordsClass: 'palabra', aria: 'none' }).words : [el];
    // Con ancla, primero se salta (aprox.) para saber qué titulares quedan ya a la vista; los que están en
    // pantalla o por encima no se ocultan
    const ancla = destino();
    if (ancla && !tocado) salta(ancla);
    const visto = el => el.getBoundingClientRect().top < innerHeight;

    // Portada: entrada de una sola vez (solo si la página aún la espera: html.intro) y salida guiada por el scroll
    let salida = null;
    if (hero) {
      if (root.classList.contains('intro')) {
        const h1 = $('h1', hero), l = [...$$('.l1, .l2', h1)].flatMap(lineas);
        gsap.timeline({ defaults: { ease: 'expo.out' } })
          .from($('.kicker', hero), { y: 14, autoAlpha: 0, duration: .9 }, .05)
          .from(l, { yPercent: 115, duration: 1.25, stagger: .09 }, .1)
          .from([$('.hero-sub', hero), $('.hero-ctas', hero), $('.hero-micro', hero)], { y: 18, autoAlpha: 0, duration: 1, stagger: .08 }, .45)
          .from($('.hero-ctl', hero), { autoAlpha: 0, duration: 1 }, .9);
      }
      // GSAP ya ha fijado el estado inicial: se quita .intro en el mismo tick, sin un fotograma vacío
      fin();
      // Valores de partida explícitos: si hay entrada, al crearse el texto aún está oculto y GSAP leería 0
      salida = gsap.fromTo($('.hero-in', hero), { yPercent: 0, autoAlpha: 1 }, { yPercent: -18, autoAlpha: .15, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      if (glHero) ST.create({ trigger: hero, start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => glHero && glHero.setProgress(s.progress) });
    } else fin();

    // Titulares de sección: las líneas suben desde una máscara; antetítulo y entradilla, después
    $$('.head').forEach(h => {
      const d = $('.display', h); if (!d || visto(h)) return;
      const l = $$('.l1, .l2', d).length ? $$('.l1, .l2', d).flatMap(lineas) : lineas(d);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: h, start: 'top 82%', once: true } });
      tl.from($('.kicker', h), { y: 10, autoAlpha: 0, duration: .8 }, 0)
        .from(l, { yPercent: 115, duration: 1.15, stagger: .08 }, .05);
      const lead = $('.lead', h); if (lead) tl.from(lead, { y: 16, autoAlpha: 0, duration: 1 }, .35);
    });
    $$('.remate .display, .remate-in, .beat2 > .h3').forEach(d => {
      if (visto(d)) return;
      const l = $$('.l1, .l2', d).flatMap(lineas);
      gsap.from(l, { yPercent: 115, duration: 1.2, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: d, start: 'top 85%', once: true } });
    });

    // Frases que se encienden palabra a palabra al pasar
    $$('.remate-p, .lead-strong').forEach(p => {
      const w = palabras(p); p.classList.add('lead-scrub');
      gsap.fromTo(w, { opacity: .2 }, { opacity: 1, stagger: .06, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 55%', scrub: .5 } });
    });

    // El reto: la curva se dibuja con el scroll y las dos cifras se enfrentan
    if (chart) {
      const line = $('.ch-line', chart);
      gsap.set(line, { strokeDasharray: 1, strokeDashoffset: 1 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: chart, start: 'top 88%', end: 'center 45%', scrub: .6 } });
      tl.to(line, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
        .from($('.ch-pk', chart), { autoAlpha: 0, y: 8, duration: .15 }, .3)
        .from($('.ch-en', chart), { autoAlpha: 0, y: 8, duration: .15 }, .85);
    }
    const vs = $('.vs');
    if (vs) {
      const [a, m, b] = $$(':scope > div', vs);
      gsap.timeline({ scrollTrigger: { trigger: vs, start: 'top 85%', end: 'bottom 55%', scrub: .6 } })
        .from($('b', a), { yPercent: 40, autoAlpha: 0, duration: .4 }, 0)
        .from($('span', a), { autoAlpha: 0, duration: .3 }, .2)
        .from(m, { autoAlpha: 0, scaleX: .4, duration: .3 }, .35)
        .from($('b', b), { yPercent: 40, autoAlpha: 0, duration: .4 }, .55)
        .from($('span', b), { autoAlpha: 0, duration: .3 }, .75);
    }
    const coste = $('.coste');
    if (coste && !visto(coste)) gsap.from($$('li', coste), { x: -16, autoAlpha: 0, stagger: .14, duration: .9, ease: 'expo.out',
      scrollTrigger: { trigger: coste, start: 'top 80%', once: true } });

    // El método. Con ≥1024 px y si la escena cabe bajo la barra, se queda fija y el scroll avanza los seis pasos;
    // las partículas forman la S y la luz recorre la hebra. Si no, el scroll solo forma la S y los pasos van solos.
    // gsap.matchMedia deshace y rehace la escena al cruzar los 1024 px (giro de tableta, ventana redimensionada)
    let repinta = null;
    if (spiral && window.SP.spiral) {
      const SP_ = window.SP.spiral, rep = $('.replay', spiral);
      let actual = -1, guiadaAntes = false, fijada = false, medida = '', mm = null;
      const paso = n => { if (n === actual) return; actual = n; SP_.pick(Math.max(1, n)); spPaso(n); };
      // Altura con el paso más largo abierto
      const altura = () => {
        const lis = $$('.sp-steps li', spiral), antes = lis.map(li => li.classList.contains('open'));
        let h = 0;
        lis.forEach((li, i) => { lis.forEach((x, j) => x.classList.toggle('open', i === j)); h = Math.max(h, spiral.offsetHeight); });
        lis.forEach((x, j) => x.classList.toggle('open', antes[j]));
        return h;
      };
      const cabe = () => {
        const p = spiral.classList.contains('pinned'); spiral.classList.add('pinned');
        const ok = altura() <= innerHeight - 80;
        if (!p) spiral.classList.remove('pinned');
        return ok;
      };
      const suelto = () => {
        fijada = false; SP_.guiada = false; SP_.onPick = null;
        ST.create({ trigger: spiral, start: 'top 85%', end: 'top 20%', scrub: true, onUpdate: s => spProg(s.progress) });
        // Si el motor de piezas no la lleva (se retiró al arrancar fijada), se reproduce al entrar
        if (guiadaAntes || !spiral.hasAttribute('data-piece')) ST.create({ trigger: spiral, start: 'top 72%', once: true, onEnter: () => SP_.play() });
      };
      const fija = () => {
        fijada = true; SP_.guiada = guiadaAntes = true; actual = -1;
        spiral.classList.add('pinned'); if (rep) rep.hidden = true;
        paso(0);
        const largo = () => innerHeight * 3.2;
        const st = ST.create({ trigger: spiral, start: 'top top+=72', end: () => '+=' + largo(), pin: true, pinSpacing: true, scrub: true, invalidateOnRefresh: true, refreshPriority: 1,
          onUpdate: s => { spProg(Math.min(1, s.progress * 2.2)); paso(Math.min(6, Math.max(0, Math.ceil((s.progress - .18) / .82 * 6)))); } });
        SP_.onPick = n => { const y = st.start + (st.end - st.start) * (.18 + (n - .5) / 6 * .82); lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); };
        repinta = () => { const n = actual; actual = -1; paso(n); };
        return () => { spiral.classList.remove('pinned'); if (rep) rep.hidden = false; SP_.guiada = false; SP_.onPick = null; repinta = null; };
      };
      const monta = () => {
        if (mm) mm.revert();
        medida = innerWidth + 'x' + innerHeight;
        mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => cabe() ? fija() : suelto());
        mm.add('(max-width: 1023px)', suelto);
      };
      monta();
      // Si cambia el alto de la ventana sin cruzar los 1024 px, la escena puede dejar de caber (o volver a caber)
      ST.addEventListener('refresh', () => {
        const m = innerWidth + 'x' + innerHeight;
        if (m === medida || !ancho.matches) return;
        medida = m;
        if (cabe() !== fijada) setTimeout(monta);
      });
    }

    // Botones principales magnéticos y teselas que se inclinan hacia el cursor
    if (fino) {
      $$('.btn-cta.btn-lg, .bar .btn-cta, .fcard-main .btn-cta').forEach(b => {
        const x = gsap.quickTo(b, 'x', { duration: .5, ease: 'power3' }), y = gsap.quickTo(b, 'y', { duration: .5, ease: 'power3' });
        b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .22); y((e.clientY - r.top - r.height / 2) * .32); });
        b.addEventListener('pointerleave', () => { x(0); y(0); });
      });
      $$('.tile, .fcard').forEach(t => {
        gsap.set(t, { transformPerspective: 1200 });
        const rx = gsap.quickTo(t, 'rotationX', { duration: .6, ease: 'power3' }), ry = gsap.quickTo(t, 'rotationY', { duration: .6, ease: 'power3' });
        t.addEventListener('pointermove', e => { const r = t.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 5); rx(-((e.clientY - r.top) / r.height - .5) * 5); });
        t.addEventListener('pointerleave', () => { rx(0); ry(0); });
      });
    }

    // Las barras de ING crecen al entrar
    const bars = $('.ing-bars'); if (bars) ST.create({ trigger: bars, start: 'top 85%', once: true, onEnter: () => bars.classList.add('on') });

    // Progreso de lectura en la barra
    const bar = $('#bar');
    if (bar) ST.create({ start: 0, end: 'max', onUpdate: s => bar.style.setProperty('--prog', s.progress.toFixed(4)) });

    // Al imprimir, cada animación en su estado final (la salida de la portada, en el inicial) y el método entero
    addEventListener('beforeprint', () => {
      ST.getAll().forEach(t => t.animation && t.animation.progress(t.animation === salida ? 0 : 1));
      gsap.set('.palabra', { opacity: 1 });
      if (bars) bars.classList.add('on');
      if (spiral && window.SP.spiral) window.SP.spiral.finish();
      window.SP.alFinal();
    });
    addEventListener('afterprint', () => {
      ST.getAll().forEach(t => t.animation && t.vars.scrub && t.animation.progress(t.progress));
      if (repinta) repinta();
    });

    // Con ancla: tras recalcular (y otra vez en load, si nadie se ha movido), salto exacto a su sitio
    ST.refresh();
    if (ancla && !tocado) salta(ancla);
    const carga = () => { ST.refresh(); if (ancla && !tocado) { salta(ancla); asienta(ancla, salta); } };
    document.readyState === 'complete' ? setTimeout(carga) : addEventListener('load', carga);
  });
})();
