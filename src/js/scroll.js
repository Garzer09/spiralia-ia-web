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
  const ancho = matchMedia('(min-width: 1024px)');
  const c = navigator.connection || {};
  const ahorro = !!c.saveData || /2g/.test(c.effectiveType || '');
  const quieto = still();
  const fin = () => root.classList.remove('intro');

  // Luz que sigue al cursor en las superficies .spot y en la marca del pie (.luz)
  if (fino) document.addEventListener('pointermove', e => {
    const s = e.target.closest && e.target.closest('.spot, .luz'); if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px'); s.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
  }, { passive: true });

  // WebGL: la organización que se enciende (portada) y la S hecha de partículas (método)
  const GL = window.SPGL && window.SPGL.supported() && !ahorro ? window.SPGL : null;
  const hero = $('[data-hero]'), spiral = $('[data-piece=spiral]');
  let glHero = null, glSp = null;
  if (GL && hero) {
    const cv = $('.hero-gl', hero);
    glHero = GL.create(cv, { scene: 'planta', density: innerWidth < 760 ? .6 : 1, still: quieto });
    if (glHero) {
      hero.classList.add('has-gl'); glHero.start();
      if (fino) {
        hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); glHero.setPointer(e.clientX - r.left, e.clientY - r.top); }, { passive: true });
        hero.addEventListener('pointerleave', () => glHero.setPointer(null));
      }
      // La pausa de la portada detiene la animación; la elección se recuerda como con el vídeo
      const btn = $('.hero-pause', hero), KEY = 'sp-fondo-pausado';
      let pausa = false; try { pausa = localStorage.getItem(KEY) === '1'; } catch (e) {}
      const aplicar = () => {
        pausa ? glHero.stop() : glHero.start();
        if (!btn) return;
        btn.hidden = quieto; btn.setAttribute('aria-pressed', String(pausa)); btn.setAttribute('aria-label', pausa ? btn.dataset.play : btn.dataset.pause);
      };
      if (btn) btn.addEventListener('click', () => { pausa = !pausa; try { pausa ? localStorage.setItem(KEY, '1') : localStorage.removeItem(KEY); } catch (e) {} aplicar(); });
      document.addEventListener('sp:pausa', () => glHero.stop());
      document.addEventListener('sp:sigue', () => { if (!pausa) glHero.start(); });
      aplicar();
    }
  }
  if (GL && spiral) {
    glSp = GL.create($('.sp-gl', spiral), { scene: 'espiral', density: innerWidth < 760 ? .6 : 1, still: quieto });
    if (glSp) {
      spiral.classList.add('has-gl'); glSp.start();
      if (quieto) { glSp.setProgress(1); glSp.setStep(6); }
      if (fino) {
        spiral.addEventListener('pointermove', e => { const r = spiral.getBoundingClientRect(); glSp.setPointer(e.clientX - r.left, e.clientY - r.top); }, { passive: true });
        spiral.addEventListener('pointerleave', () => glSp.setPointer(null));
      }
    }
  }

  const gsap = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  if (quieto || !gsap || !ST) { fin(); return; }
  gsap.registerPlugin(ST); if (Split) gsap.registerPlugin(Split);
  root.classList.add('sota');

  // Scroll suave solo con ratón o trackpad; en táctil, el nativo
  let lenis = null;
  if (fino && window.Lenis) {
    lenis = new window.Lenis({ lerp: .1, wheelMultiplier: .9, anchors: { offset: -64 } });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    document.addEventListener('sp:pausa', () => lenis.stop()); document.addEventListener('sp:sigue', () => lenis.start());
  }
  window.SP.scrollTo = el => lenis ? lenis.scrollTo(el, { offset: -64 }) : el.scrollIntoView({ behavior: 'smooth' });

  // El gráfico del reto y la espiral los mueve el scroll: se retiran del motor de piezas antes de que arranque
  const chart = $('.chart[data-piece]'); if (chart) chart.removeAttribute('data-piece');
  // Los titulares de sección los anima esta capa, no la aparición genérica
  $$('.head.rv').forEach(h => h.classList.remove('rv'));

  const listo = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  listo.then(() => {
    const lineas = (el) => Split ? new Split(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' }).lines : [el];
    const palabras = (el) => Split ? new Split(el, { type: 'words', wordsClass: 'palabra' }).words : [el];

    // Portada: entrada de una sola vez y salida guiada por el scroll
    if (hero) {
      const h1 = $('h1', hero), l = [...$$('.l1, .l2', h1)].flatMap(lineas);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onStart: fin });
      tl.from($('.kicker', hero), { y: 14, autoAlpha: 0, duration: .9 }, .05)
        .from(l, { yPercent: 115, duration: 1.25, stagger: .09 }, .1)
        .from([$('.hero-sub', hero), $('.hero-ctas', hero), $('.hero-micro', hero)], { y: 18, autoAlpha: 0, duration: 1, stagger: .08 }, .45)
        .from($('.hero-ctl', hero), { autoAlpha: 0, duration: 1 }, .9);
      // Valores de partida explícitos: al crearse, el texto aún está oculto por la entrada y GSAP leería 0
      gsap.fromTo($('.hero-in', hero), { yPercent: 0, autoAlpha: 1 }, { yPercent: -18, autoAlpha: .15, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      if (glHero) ST.create({ trigger: hero, start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => glHero.setProgress(s.progress) });
    } else fin();

    // Titulares de sección: las líneas suben desde una máscara; antetítulo y entradilla, después
    $$('.head').forEach(h => {
      const d = $('.display', h); if (!d) return;
      const l = $$('.l1, .l2', d).length ? $$('.l1, .l2', d).flatMap(lineas) : lineas(d);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: h, start: 'top 82%', once: true } });
      tl.from($('.kicker', h), { y: 10, autoAlpha: 0, duration: .8 }, 0)
        .from(l, { yPercent: 115, duration: 1.15, stagger: .08 }, .05);
      const lead = $('.lead', h); if (lead) tl.from(lead, { y: 16, autoAlpha: 0, duration: 1 }, .35);
    });
    $$('.remate .display, .remate-in, .beat2 > .h3').forEach(d => {
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
    if (coste) gsap.from($$('li', coste), { x: -16, autoAlpha: 0, stagger: .14, duration: .9, ease: 'expo.out',
      scrollTrigger: { trigger: coste, start: 'top 80%', once: true } });

    // El método: en pantallas grandes la escena se queda fija y el scroll avanza los seis pasos;
    // las partículas forman la S y la luz recorre la hebra. En móvil, el scroll solo forma la S.
    if (spiral && window.SP.spiral) {
      const SP_ = window.SP.spiral;
      let actual = -1;
      const paso = n => { if (n === actual) return; actual = n; SP_.pick(Math.max(1, n)); if (glSp) glSp.setStep(n); };
      ancho.matches ? (() => {
        const largo = () => innerHeight * 3.2;
        const st = ST.create({ trigger: spiral, start: 'top 13%', end: () => '+=' + largo(), pin: true, pinSpacing: true, scrub: true,
          onUpdate: s => { if (glSp) glSp.setProgress(Math.min(1, s.progress * 2.2)); paso(Math.min(6, Math.max(0, Math.ceil((s.progress - .18) / .82 * 6)))); } });
        spiral.classList.add('pinned');
        SP_.onPick = n => { const y = st.start + (st.end - st.start) * (.18 + (n - .5) / 6 * .82); lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); };
      })() : glSp && ST.create({ trigger: spiral, start: 'top 85%', end: 'top 20%', scrub: true, onUpdate: s => glSp.setProgress(s.progress) });
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

    // Progreso de lectura en la barra
    const bar = $('#bar');
    if (bar) ST.create({ start: 0, end: 'max', onUpdate: s => bar.style.setProperty('--prog', s.progress.toFixed(4)) });

    addEventListener('load', () => ST.refresh());
    ST.refresh();
  });
})();
