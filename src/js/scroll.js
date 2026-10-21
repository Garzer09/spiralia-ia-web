// Capa de movimiento: scroll suave (Lenis), titulares que entran por líneas y nombres letra a letra (SplitText),
// filetes que se dibujan, escenas guiadas por el scroll (ScrollTrigger: la escalera y el método) y WebGL (gl.js) en la portada.
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

  // Luz que sigue al cursor en la marca del pie (.luz)
  if (fino) document.addEventListener('pointermove', e => {
    const s = e.target.closest && e.target.closest('.luz'); if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px'); s.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
  }, { passive: true });

  // El ancla de la URL: en la carga se salta a ella sin animación (un panel de «Para ti» lleva a su sección),
  // salvo que la persona ya se haya movido. Al recargar o volver atrás manda dónde estaba leyendo, no el ancla
  const tipo = ((performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {}).type;
  const vuelta = /^(reload|back_forward)$/.test(tipo);
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

  // WebGL: la organización que se enciende (portada). Si el motor falla o va lento, la portada usa su vídeo
  const hero = $('[data-hero]'), spiral = $('.spiral');
  let GL = null; try { GL = glUrl !== '0' && window.SPGL && window.SPGL.supported() && !ahorro ? window.SPGL : null; } catch (e) {}
  let glHero = null, sueltaPausa = null;
  const crear = (cv, o) => {
    try { return GL.create(cv, Object.assign({ density: innerWidth < 760 ? .6 : 1, still: quieto, software: glUrl === '1', vigia: glUrl !== '1', lento: sinGL }, o)); } catch (e) { return null; }
  };
  function sinGL() {
    GL = null;
    if (glHero) { glHero.destroy(); glHero = null; hero.classList.remove('has-gl'); if (sueltaPausa) sueltaPausa(); hero.dispatchEvent(new Event('sp:singl')); }
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
      // fuera: parada mientras se ve la película (de apertura, html.apertura; sp:sigue la reanuda)
      let pausa = false, fuera = root.classList.contains('apertura'); try { pausa = localStorage.getItem(KEY) === '1'; } catch (e) {}
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

  // La S de puntos del método (motion.js) se forma con el scroll
  const spProg = p => window.SP.spiral && window.SP.spiral.setProgress(p);


  const gsap = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  // Se monta con las fuentes cargadas y después de que engine.js, motion.js y diagnostico.js pinten (DOMContentLoaded)
  // (un script diferido corre ya en 'interactive', antes de DOMContentLoaded; load queda de red de seguridad)
  const dom = new Promise(r => { if (document.readyState === 'complete') return r(); document.addEventListener('DOMContentLoaded', r, { once: true }); addEventListener('load', r, { once: true }); });
  const listo = Promise.all([document.fonts && document.fonts.ready, dom]);
  if (quieto || !gsap || !ST) {
    // Sin capa de scroll: la S queda formada y el ancla, en su sitio
    fin(); spProg(1);
    listo.then(() => {
      const a = !vuelta && destino(), salta = el => el.scrollIntoView({ behavior: 'instant' });
      if (a && !tocado) { salta(a); asienta(a, salta); }
    });
    return;
  }
  gsap.registerPlugin(ST); if (Split) gsap.registerPlugin(Split);
  root.classList.add('sota');
  // Con html{scroll-behavior:smooth}, ScrollTrigger mide mal si recalcula con la página desplazada: todas las
  // posiciones salen corridas en -scrollY. El scroll suave lo dan Lenis y SP.scrollTo
  root.style.scrollBehavior = 'auto';

  // Scroll suave solo con ratón o trackpad; en táctil, el nativo. Las anclas las lleva Lenis, que ya resta
  // el scroll-padding-top de html (la altura de la barra)
  let lenis = null;
  if (fino && window.Lenis && !reduce.matches) {
    lenis = new window.Lenis({ lerp: .1, wheelMultiplier: .9, anchors: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(t => lenis && lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    document.addEventListener('sp:pausa', () => lenis && lenis.stop()); document.addEventListener('sp:sigue', () => lenis && lenis.start());
    if (root.classList.contains('apertura')) lenis.stop();
    // El menú a pantalla completa (motion.js) detiene el scroll de detrás
    document.addEventListener('sp:menu', e => lenis && (e.detail ? lenis.stop() : lenis.start()));
    enEscucha(reduce, e => { if (e.matches && lenis) { lenis.destroy(); lenis = null; } });
  } else if (!reduce.matches) {
    // Sin Lenis, las anclas nativas (menú, enlaces de la página) siguen siendo suaves: solo mientras dura el salto
    const quieta = () => { root.style.scrollBehavior = 'auto'; removeEventListener('scrollend', quieta); };
    document.addEventListener('click', e => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2 || reduce.matches) return;
      root.style.scrollBehavior = 'smooth'; addEventListener('scrollend', quieta); setTimeout(quieta, 1500);
    });
  }
  const aY = y => { if (lenis) { lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); } else scrollTo({ top: y, behavior: 'instant' }); };

  // Al girar la tableta, cruzar los 1024 px, cambiar el alto de la ventana, imprimir o rehacer el método,
  // ScrollTrigger rehace las escenas y la página salta (o vuelve arriba). Se recuerda dónde se estaba (la sección
  // a la vista y cuánto se ha leído de ella), medido al dejar de desplazarse; en el cambio se congela y, tras el
  // recálculo, se vuelve allí sin animación. En táctil, el alto cambia solo con la barra del navegador: no cuenta
  let sitio = null, ultimo = null, imprime = false, anchoAntes = innerWidth, altoAntes = innerHeight, rm = 0, rq = 0, movido = 0;
  const pad = () => parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
  const piezas = () => [...$$('main > *'), $('.foot')].filter(Boolean);
  const mide = () => {
    const p = pad(), el = piezas().find(x => x.getBoundingClientRect().bottom > p); if (!el) return null;
    const r = el.getBoundingClientRect(); return { el, f: (p - r.top) / r.height };
  };
  // Al recargar (o volver sin bfcache), el navegador restaura el scroll antes de que exista el espacio del método
  // fijado (+3,2 pantallas) y, ya montado, el lector aparece a mitad del método. Se guarda al salir dónde estaba
  // (sección y fracción) y, montadas las escenas, se vuelve allí
  // Una clave por página: al volver de /en/ a /, la de /en/ no pisa la de /
  const SITIO = 'sp-sitio:' + location.pathname;
  let previo = null;
  try { previo = vuelta && JSON.parse(sessionStorage.getItem(SITIO)); } catch (e) {}
  if (!previo || previo.u !== location.pathname) previo = null;
  addEventListener('pagehide', () => {
    const m = !imprime && mide(); if (!m) return;
    try { sessionStorage.setItem(SITIO, JSON.stringify({ u: location.pathname, id: m.el.id, i: piezas().indexOf(m.el), f: +m.f.toFixed(4) })); } catch (e) {}
  });
  const vale = () => sitio && performance.now() - sitio.t < 1200;
  const guarda = antes => {
    if (vale()) { sitio.t = performance.now(); return; }
    const m = antes || mide(); sitio = m && Object.assign({ t: performance.now() }, m);
  };
  const vuelve = () => {
    if (imprime) return;
    if (vale()) {
      const r = sitio.el.getBoundingClientRect(), y = Math.round(scrollY + r.top + sitio.f * r.height - pad());
      if (Math.abs(y - scrollY) > 2) aY(y);
    }
    sitio = null; ultimo = mide();
  };
  addEventListener('resize', () => {
    const w = innerWidth !== anchoAntes, h = innerHeight !== altoAntes; anchoAntes = innerWidth; altoAntes = innerHeight;
    if (w || (h && fino)) guarda(ultimo);
  });
  ST.addEventListener('refresh', vuelve);
  // sp:imprime llega en beforeprint antes de que las piezas se abran (engine.js): se mide la página aún sin crecer
  document.addEventListener('sp:imprime', () => { guarda(); imprime = true; });
  addEventListener('afterprint', () => { imprime = false; if (sitio) { sitio.t = performance.now(); setTimeout(vuelve, 600); } });
  addEventListener('scroll', () => {
    movido = performance.now(); clearTimeout(rm);
    rm = setTimeout(() => {
      // Lenis 1.3 se queda en isScrolling 'native' (y <html> con lenis-scrolling) si el último evento de scroll
      // llega con velocidad 0, como tras un salto programático: parado el scroll, se le da por parado
      if (lenis && lenis.isScrolling === 'native' && !lenis.velocity) lenis.isScrolling = false;
      if (!imprime && !vale()) { sitio = null; ultimo = mide(); }
    }, 150);
  }, { passive: true });

  // Cuando cambia la altura de la página (pestañas, diagnóstico, preguntas, pasos del método sin fijar), ScrollTrigger
  // recalcula posiciones. Nunca a mitad de un desplazamiento: el refresh lo cortaría (o desajustaría a Lenis); espera a que pare.
  // Del scroll nativo ya avisa 'scroll' (movido); de Lenis solo cuenta su animación ('smooth')
  const recalcula = () => { clearTimeout(rq); rq = 0; ST.refresh(); };
  const espera = () => { rq = (lenis && lenis.isScrolling === 'smooth') || performance.now() - movido < 150 ? setTimeout(espera, 150) : (recalcula(), 0); };
  document.addEventListener('sp:alto', e => { clearTimeout(rq); rq = setTimeout(espera, Math.max(120, e.detail || 0)); });
  // Antes de un desplazamiento suave, el recálculo pendiente se hace ya y Lenis toma la posición y la altura reales
  window.SP.scrollTo = el => {
    if (rq) recalcula();
    if (lenis) { lenis.resize(); lenis.scrollTo(el); } else el.scrollIntoView({ behavior: reduce.matches ? 'instant' : 'smooth' });
  };
  const salta = el => {
    if (lenis) { lenis.resize(); lenis.scrollTo(el, { immediate: true, force: true }); } else el.scrollIntoView({ behavior: 'instant' });
  };

  // La espiral se retira del motor de piezas si arranca fijada (≥1024 px); si luego no se fija, la reproduce esta capa al entrar
  if (spiral && ancho.matches) spiral.removeAttribute('data-piece');
  // Los titulares de sección los anima esta capa, no la aparición genérica
  $$('.head.rv').forEach(h => h.classList.remove('rv'));

  listo.then(() => {
    // aria: 'none': el texto partido se sigue leyendo entero, sin aria-label en span o p
    const lineas = (el) => Split ? new Split(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none' }).lines : [el];
    const palabras = (el) => Split ? new Split(el, { type: 'words', wordsClass: 'palabra', aria: 'none' }).words : [el];
    // Con ancla, primero se salta (aprox.) para saber qué titulares quedan ya a la vista; los que están en
    // pantalla o por encima no se ocultan
    const ancla = previo ? null : destino();
    if (ancla && !tocado) salta(ancla);
    const visto = el => el.getBoundingClientRect().top < innerHeight;

    // Portada: entrada de una sola vez (solo si la página aún la espera: html.intro) y salida guiada por el scroll
    let salida = null;
    if (hero) {
      const entra = () => {
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
      };
      // Con la película de apertura, la portada entra cuando la película se funde
      root.classList.contains('apertura') ? document.addEventListener('sp:apertura-fin', entra, { once: true }) : entra();
      // Valores de partida explícitos: si hay entrada, al crearse el texto aún está oculto y GSAP leería 0
      salida = gsap.fromTo($('.hero-in', hero), { yPercent: 0, autoAlpha: 1 }, { yPercent: -18, autoAlpha: .15, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      if (glHero) ST.create({ trigger: hero, start: 'top top', end: 'bottom top', scrub: true, onUpdate: s => glHero && glHero.setProgress(s.progress) });
    } else fin();

    // El ritmo de noth.in: casi todo entra con power4.inOut, lento y sin rebotes
    const IO = 'power4.inOut', SALE = 'power3.out';
    // Letras sueltas, cada una en su máscara, dentro de su palabra: así no se parte una palabra entre dos líneas.
    // /\s/ incluye el espacio de no separación de los nombres de producto (build.py). Un titular conserva su texto en
    // aria-label; un <span> no admite nombre, así que su texto va entero en un .sr al lado y lo partido se oculta
    const letras = (el) => {
      if (!Split) return [el];
      const titular = /^H\d$/.test(el.tagName);
      if (!titular) { const sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = el.textContent; el.before(sr); }
      return new Split(el, { type: 'words,chars', wordDelimiter: { delimiter: /\s/, replaceWith: ' ' }, charsClass: 'split-char', mask: 'chars', aria: titular ? 'auto' : 'hidden' }).chars;
    };
    const dibuja = h => h.classList.add('dibuja');

    // Titulares de sección: el filete se dibuja de izquierda a derecha, las líneas suben desde una máscara y la entradilla, detrás
    $$('.head').forEach(h => {
      const d = $('.display', h);
      if (!d || visto(h)) return dibuja(h);
      const l = $$('.l1, .l2', d).length ? $$('.l1, .l2', d).flatMap(lineas) : lineas(d);
      const tl = gsap.timeline({ defaults: { ease: IO }, scrollTrigger: { trigger: h, start: 'top 85%', once: true, onEnter: () => dibuja(h) } });
      tl.from($('.kicker', h), { y: 10, autoAlpha: 0, duration: .8, ease: SALE }, .15)
        .from(l, { yPercent: 110, duration: 1.15, stagger: .07 }, .2);
      const lead = $('.lead', h); if (lead) tl.from(lead, { y: 18, autoAlpha: 0, duration: 1.1, ease: SALE }, .7);
    });
    // Cabeceras de producto: filete, el nombre letra a letra, el claim en dos tiempos, la entradilla y la ficha
    $$('.phead').forEach(h => {
      if (visto(h)) return dibuja(h);
      const tl = gsap.timeline({ defaults: { ease: IO }, scrollTrigger: { trigger: h, start: 'top 80%', once: true, onEnter: () => dibuja(h) } });
      tl.from($('.kicker', h), { y: 10, autoAlpha: 0, duration: .8, ease: SALE }, .15)
        .from(letras($('.pnombre', h)), { yPercent: 110, duration: 1.2, stagger: .025 }, .2)
        .from($$('.pclaim .l1, .pclaim .l2', h).flatMap(lineas), { yPercent: 110, duration: 1.1, stagger: .07 }, .55)
        .from($('.lead', h), { y: 18, autoAlpha: 0, duration: 1.1, ease: SALE }, .85)
        .from($('.pficha', h), { y: 24, autoAlpha: 0, duration: 1.1, ease: SALE }, .8);
    });
    $$('.remate-in, .gal-head .display, .gob-head .display').forEach(d => {
      if (visto(d)) return;
      const l = $$('.l1, .l2', d).flatMap(lineas);
      gsap.from(l, { yPercent: 110, duration: 1.2, stagger: .08, ease: IO, scrollTrigger: { trigger: d, start: 'top 85%', once: true } });
    });

    // Lo que hacemos: el filete del recorrido y el de la base se dibujan; la base sube desde abajo; cada producto entra
    // después, con su número, su nombre letra a letra y el resto
    const base = $('.base');
    if (base && !visto(base)) gsap.from(base, { clipPath: 'inset(100% 0% 0% 0% round 4px)', duration: 1.3, ease: IO, scrollTrigger: { trigger: base, start: 'top 88%', once: true } });
    $$('.ruta, .base ul').forEach(lista => {
      if (visto(lista)) return;
      gsap.set(lista, { '--sx': 0 });
      const tl = gsap.timeline({ defaults: { ease: IO }, scrollTrigger: { trigger: lista, start: 'top 84%', once: true } });
      tl.to(lista, { '--sx': 1, duration: 1.4 }, 0);
      $$(':scope > .prod', lista).forEach((it, i) => {
        const t = .3 + i * .16;
        tl.from($('.prod-n', it), { y: 8, autoAlpha: 0, duration: .7, ease: SALE }, t)
          .from(letras($('.prod-nom', it)), { yPercent: 110, duration: 1.1, stagger: .018 }, t + .05)
          .from($$('.prod-tag, .prod-p, .prod-dl, .prod-ver', it), { y: 14, autoAlpha: 0, duration: .9, stagger: .06, ease: SALE }, t + .35);
      });
    });

    // La escalera de la IA se construye: primero el suelo (la base); después cada peldaño sube y su texto aparece encima;
    // al final, las cotas de cada producto y la Jornada piloto. Con ≥1024 px y si cabe en la ventana, la escena se queda
    // fija y el scroll sube los peldaños; si no, se reproducen solos al entrar
    const esc = $('.esc');
    if (esc && !visto(esc)) {
      // La etiqueta y el suelo entran solos al aparecer la escena: fijada, nunca empieza en blanco
      gsap.timeline({ defaults: { ease: IO }, scrollTrigger: { trigger: esc, start: 'top 80%', once: true } })
        .from($('.esc-k', esc), { y: 10, autoAlpha: 0, duration: .7, ease: SALE }, 0)
        .from($('.esc-suelo', esc), { clipPath: 'inset(0% 100% 0% 0%)', duration: 1.3 }, .1);
      const construye = () => {
        const tl = gsap.timeline({ defaults: { ease: IO }, paused: true });
        $$('.esc-p li', esc).forEach((li, i) => {
          const t = i * .55;
          tl.from($('.esc-b', li), { scaleY: 0, transformOrigin: '50% 100%', duration: .8 }, t)
            .from($$('.esc-t > *', li), { yPercent: 60, autoAlpha: 0, duration: .7, stagger: .06, ease: SALE }, t + .35);
        });
        tl.from($$('.tramo', esc), { clipPath: 'inset(-12px 100% 0% 0%)', duration: .9, stagger: .25 }, 2.3)
          .from($('.esc-dia', esc), { y: 18, autoAlpha: 0, duration: .8, ease: SALE }, 2.9);
        return tl;
      };
      const solo = tl => ST.create({ trigger: esc, start: 'top 72%', once: true, onEnter: () => tl.play() });
      const mmE = gsap.matchMedia();
      mmE.add('(min-width: 1024px)', () => {
        const tl = construye();
        // refreshPriority 2: va antes en la página que el método fijado (1), y sus posiciones dependen de esta
        // Fijada bajo la barra (72 px): solo si cabe entera en la ventana
        if (esc.offsetHeight <= innerHeight - 96) ST.create({ trigger: esc, start: 'top top+=72', end: () => '+=' + Math.round(innerHeight * 1.3), pin: true, scrub: .8, animation: tl, invalidateOnRefresh: true, refreshPriority: 2 });
        else solo(tl);
      });
      mmE.add('(max-width: 1023px)', () => { solo(construye()); });
    }

    // Los vídeos entran recortándose desde abajo, con el póster algo más grande que se asienta
    $$('.vid-marco').forEach(m => {
      if (visto(m)) return;
      gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 88%', once: true } })
        .from(m, { clipPath: 'inset(100% 0% 0% 0% round 4px)', duration: 1.3, ease: 'power3.inOut' }, 0)
        .from($('.vid-poster', m), { scale: 1.16, duration: 1.9, ease: SALE }, 0);
    });

    // La marca del pie sube desde abajo al llegar al final
    const marca = $('.foot-mark');
    if (marca && !visto(marca)) gsap.from(marca, { yPercent: 70, duration: 1.6, ease: IO, scrollTrigger: { trigger: '.foot', start: 'top 75%', once: true } });

    // Frases que se encienden palabra a palabra al pasar
    $$('.remate-p, .lead-strong').forEach(p => {
      const w = palabras(p); p.classList.add('lead-scrub');
      gsap.fromTo(w, { opacity: .2 }, { opacity: 1, stagger: .06, ease: 'none',
        scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 55%', scrub: .5 } });
    });

    // La ventaja: las dos cifras se enfrentan con el scroll
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
    // El método. Con ≥1024 px y si la escena cabe bajo la barra, se queda fija y el scroll avanza los seis pasos;
    // las partículas forman la S y la luz recorre la hebra. Si no, el scroll solo forma la S y los pasos van solos.
    // gsap.matchMedia deshace y rehace la escena al cruzar los 1024 px (giro de tableta, ventana redimensionada)
    let repinta = null;
    if (spiral && window.SP.spiral) {
      const SP_ = window.SP.spiral, rep = $('.replay', spiral);
      let actual = -1, guiadaAntes = false, fijada = false, medida = '', mm = null;
      const paso = n => { if (n === actual) return; actual = n; SP_.pick(Math.max(1, n)); };
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
        // Si el motor de piezas no la lleva (se retiró al arrancar fijada), se reproduce al entrar. Si ya ha quedado
        // arriba (se entra por un ancla o se rehace la escena con la página más abajo), queda como al acabar: los
        // pasos no se abren uno tras otro por encima de lo que se está leyendo
        if (guiadaAntes || !spiral.hasAttribute('data-piece')) {
          if (spiral.getBoundingClientRect().top < innerHeight * .72) SP_.pick(actual > 0 ? actual : 6);
          else ST.create({ trigger: spiral, start: 'top 72%', once: true, onEnter: () => SP_.play() });
        }
      };
      const fija = () => {
        fijada = true; SP_.guiada = guiadaAntes = true; actual = -1;
        spiral.classList.add('pinned'); if (rep) rep.hidden = true;
        paso(0);
        const largo = () => innerHeight * 3.2;
        // La S se forma mientras la sección sube hasta quedar fijada; ya fijada, el scroll avanza las seis fases
        const forma = ST.create({ trigger: spiral, start: 'top 92%', end: 'top top+=72', scrub: .4, onUpdate: s => spProg(s.progress) });
        const st = ST.create({ trigger: spiral, start: 'top top+=72', end: () => '+=' + largo(), pin: true, pinSpacing: true, scrub: true, invalidateOnRefresh: true, refreshPriority: 1,
          onUpdate: s => { spProg(1); paso(Math.min(6, Math.max(0, Math.ceil((s.progress - .12) / .88 * 6)))); } });
        SP_.onPick = n => { const y = st.start + (st.end - st.start) * (.12 + (n - .5) / 6 * .88); lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: 'smooth' }); };
        repinta = () => { const n = actual; actual = -1; paso(n); };
        return () => { forma.kill(); spiral.classList.remove('pinned'); if (rep) rep.hidden = false; SP_.guiada = false; SP_.onPick = null; repinta = null; };
      };
      const monta = () => {
        const otra = !!mm;
        if (otra) { guarda(); mm.revert(); }
        medida = innerWidth + 'x' + innerHeight;
        mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => cabe() ? fija() : suelto());
        mm.add('(max-width: 1023px)', suelto);
        if (otra) ST.refresh();
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

    // Con ancla: tras recalcular (y otra vez en load, si nadie se ha movido), salto exacto a su sitio.
    // Sin ancla, tras recargar: a la sección y la fracción de antes, mientras la carga aún mueve la página
    const recoloca = () => {
      const el = previo && !tocado && ((previo.id && document.getElementById(previo.id)) || piezas()[previo.i]); if (!el) return;
      const r = el.getBoundingClientRect(), y = Math.round(scrollY + r.top + previo.f * r.height - pad());
      if (Math.abs(y - scrollY) > 2) aY(y);
    };
    if (ancla) previo = null;
    ST.refresh();
    if (ancla && !tocado) salta(ancla); else recoloca();
    const carga = () => {
      ST.refresh();
      if (ancla && !tocado) { salta(ancla); asienta(ancla, salta); }
      else if (previo) { [0, 120, 400, 900, 1600].forEach(ms => setTimeout(() => requestAnimationFrame(recoloca), ms)); setTimeout(() => { previo = null; }, 1800); }
    };
    document.readyState === 'complete' ? setTimeout(carga) : addEventListener('load', carga);
  });
})();
