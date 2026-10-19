# A4 · Auditoría de conversión (CRO) y palancas de persuasión · Spiralia AI

**Fecha:** 19 de octubre de 2026.

**Qué se ha revisado:** la página publicada en local (http://localhost:8851/?still=1, ES y EN) y su código: `src/content.toml`, `src/index.template.html`, `build.py`, `src/js/diagnostico.js`, `src/js/engine.js` y `src/css/site.css`. Es el estado tras el rediseño del 19-oct: sin nombres de personas en el copy, portada con vídeo y H1 «Toda tu empresa, trabajando con IA.».

**Método:**
- Lectura del copy y de la plantilla.
- Recorrido con Playwright (Chromium, 1440×900 y 390×844) para medir dónde cae cada CTA y probar el diagnóstico de principio a fin.
- Contraste con la investigación previa del repositorio (`investigacion/01`, `02` y `03`), que no se repite aquí: solo se cita.

**Capturas de apoyo** en `investigacion/04_anexos/a4/`:
- `desk-fold.png`, `mob-fold.png`, `sec-pruebas.png`, `sec-para-ti.png`, `sec-formatos.png`, `sec-hablemos.png`;
- `dg-q2.png` y `sec-dg-result.png`, que muestran el bug de contraste.

> **Limitación importante.** En esta sesión no se ha podido hacer ninguna búsqueda web nueva: el presupuesto de búsquedas del turno, compartido con otros agentes, estaba agotado, y WebFetch no funciona en este entorno. Por eso:
> - la evidencia externa sobre compradores B2B, CTA y RGPD sale de `investigacion/01_benchmark_y_cta.md` y `investigacion/02_icp_arquetipos.md`, verificada allí el 14-oct-2026, y se cita con su enlace original;
> - las referencias clásicas de psicología y economía conductual (Cialdini, Kahneman y Tversky, etc.) se citan de memoria y van marcadas **[no verificado en esta sesión]**, igual que sus DOI.
>
> Si se quiere, una segunda pasada con búsqueda puede comprobarlas y añadir referencias de 2025-2026 (p. ej., el informe de Edelman y LinkedIn sobre liderazgo de pensamiento o la edición 2026 de Forrester).

**Leyenda:**
- **[Hecho]:** observado en la página o en el código.
- **[Estudio] / [Vendedor] / [Normativa]:** como en `investigacion/01`.
- **[Opinión]:** criterio propio aplicado a Spiralia.
- **[no verificado en esta sesión]:** referencia citada sin poder comprobarla ahora.

---

## 0. Resumen ejecutivo

1. **La página persuade bien y convierte mal.** El relato es sólido: pérdida (licencias pagadas sin uso), prueba (ING, Deloitte, CCEP), método, control y cierre. Pero la arquitectura de conversión tiene tres agujeros:
   - todos los «Reserva» acaban en un **mailto a una persona**;
   - entre la portada y la pestaña «Para ti» hay **10.600 px en escritorio (unas 15 pantallas en móvil) sin un solo CTA dentro del contenido**;
   - el **diagnóstico**, la única herramienta para quien aún no quiere hablar, está al **81 % de la página en escritorio y al 85 % en móvil**, y su resultado **no lleva a reservar**.
2. **Promesa rota en el CTA principal [Hecho].**
   - Lo que pasa: «Reserva 30 minutos», «Reserva Rumbo» y «Hablemos de tu caso» llevan a `/reserva/`, que hace `location.replace` a `mailto:ana.iza@spiralia.es`.
   - Consecuencia: sin cliente de correo configurado (habitual en Outlook web o Gmail), el directivo se queda en una página sin estilo que dice «Si no se abre solo, escribe a…».
   - Además, el aviso legal del cierre habla de Microsoft Bookings, que aún no existe.
   - El email personal también contradice la queja n.º 1 del cliente («demasiado personalista de Ana»).
3. **Bug que bloquea el diagnóstico [Hecho].**
   - Los botones `.btn-ghost` del diagnóstico («Atrás», «Guárdalo para tu comité», «Repetir») se pintan con el fondo por defecto del navegador, `rgb(239,239,239)`, y texto `rgb(224,223,218)`: no se leen.
   - Corrección: `background:transparent` en `.btn-ghost`.
4. **No se mide nada [Hecho].**
   - `ANALYTICS = ''` en `build.py`: los eventos ya programados (`Reserva`, `Email`, `Diagnóstico`, `Perfil`, `Película`) no se envían a ningún sitio.
   - `/reserva/` descarta el parámetro `?d=` de origen.
5. **Palancas de persuasión: fuertes en aversión a la pérdida, prueba con cifras y rigor (autoridad por fuentes); flojas o ausentes en:**
   - autoridad de origen: las firmas de consultoría y la universidad se omitieron al quitar los nombres;
   - reversión del riesgo: «¿Y si no funciona?» no compromete nada;
   - selectividad;
   - urgencia cuantificada para el lector;
   - testimonios: tres huecos `[PLACEHOLDER]`;
   - reciprocidad: no hay nada útil que llevarse sin hablar con ventas.
6. **Arquitectura propuesta:**
   - **primario:** «Reserva 30 minutos con el equipo», con formulario corto y calendario en una página `/reserva/` con la marca;
   - **secundario:** el diagnóstico, subido tras los casos, con resultado por dimensiones, enlace para compartir con el comité y PDF opcional;
   - **terciario:** un material para directivos y una carta trimestral.
   - Rumbo deja de ser un segundo botón de reserva y pasa a ser **la propuesta que sale de la conversación**.
7. **Material recomendado para el lanzamiento:** «**Presupuesto de IA 2027: las 10 preguntas que tu comité debe hacerse antes de aprobarlo**». Va dirigido al CEO y aprovecha la urgencia real de calendario que la web ya usa. Dos piezas de apoyo:
   - el **programa de ejemplo** anonimizado, para RR. HH. y L&D;
   - la **ficha de seguridad y gobierno**, para el CTO y Compras.
8. **Las diez acciones con más impacto** están en la sección 7. Las seis P0 son:
   - agenda real o formulario;
   - buzón de equipo;
   - arreglo del contraste;
   - CTA en el resultado del diagnóstico;
   - medición;
   - CTA contextuales tras Casos, Método y Lo que construimos.

   Son baratas (horas, no semanas) y sin ellas cualquier mejora de copy se pierde en el embudo.

---

## 1. Arquitectura de conversión actual

### 1.1 Inventario de CTA [Hecho]

Posiciones medidas con `?still=1`. La página mide 17.197 px en escritorio (unas 19 pantallas) y 20.362 px en móvil (24 pantallas), con 2.148 palabras en `<main>`.

| # | Texto | Sección | Y escritorio / móvil | Destino real | Qué promete | Qué ocurre | Evento |
|---|---|---|---|---|---|---|---|
| 1 | **Hablemos** (`nav.cta`) | Barra fija | siempre visible | `reserva/?d=barra` | conversación | mailto a ana.iza@ | `Reserva{origen:barra}` (sin analítica activa) |
| 2 | **Hablemos de tu caso** (`hero.cta1`) | Menú desplegable móvil | — | `reserva/?d=menu` | ídem | ídem | ídem |
| 3 | **Hablemos de tu caso** | Portada | 696 / 584 | `reserva/?d=portada` | ídem | ídem | ídem |
| 4 | **Diagnóstico en 3 minutos →** | Portada (enlace) | 711 / 661 | `#diagnostico` (salta unos 13.700 px) | autodiagnóstico | baja hasta la sección 10 | — |
| 5 | Ver la película · 20 s | Portada | pie de portada | diálogo con vídeo | ver | vídeo | `Película` |
| 6 | Los resultados · Las personas · La tecnología | Franja de prueba | 1.110 aprox. | ancla a la pestaña de «Para ti» | ruta por inquietud | salta unos 10.000 px | `Perfil` |
| 7 | **Reserva Rumbo** (`pt.t1_cta`) | Para ti › Resultados (pestaña por defecto) | 11.337 / 13.499 | `reserva/?d=resultados` | reservar una sesión de 3 h | mailto genérico | `Reserva` |
| 8 | **Pide un ejemplo de programa** (`pt.t2_cta`) | Para ti › Personas (pestaña oculta) | oculto hasta hacer clic | `mailto:` con asunto | un documento | abre el correo del usuario | `Email{origen:para-ti-personas}` |
| 9 | **Hablemos de tu entorno** (`pt.t3_cta`) | Para ti › Tecnología (pestaña oculta) | oculto | `reserva/?d=tecnologia` | conversación técnica | mailto genérico | `Reserva` |
| 10 | **Reserva Rumbo** (`fmt.r_cta`) | Formatos | 12.141 / 14.000 | `reserva/?d=rumbo` | sesión de 3 h | mailto genérico | `Reserva` |
| 11 | **Empezar** | Diagnóstico | 14.406 / 17.344 | JS en la página | resultado | ocho preguntas y nivel | `Diagnóstico{paso:inicio}` |
| 12 | **Envíanoslo** | Resultado del diagnóstico | — | `mailto:` con el cuerpo prerrellenado | «envíanoslo» | el usuario envía un email desde su cuenta | — |
| 13 | Guárdalo para tu comité | Resultado del diagnóstico | — | `print()` | PDF | diálogo de impresión (botón ilegible) | — |
| 14 | **Reserva 30 minutos** (`cta.btn`) | Cierre | 16.193 / 19.041 | `reserva/?d=cierre` | agenda | mailto genérico | `Reserva` |
| 15 | ana.iza@spiralia.es + **Copiar** | Cierre («¿Lo gestiona tu asistente?») | 16.374 | mailto y portapapeles | — | — | `Email` |
| 16 | ana.iza@spiralia.es | Pie | 16.724 | mailto | — | — | `Email` |

**Lectura:**
- Hay **cuatro textos distintos** para un mismo destino («Hablemos», «Hablemos de tu caso», «Reserva Rumbo» y «Reserva 30 minutos»), y los cuatro acaban en el mismo email genérico, cuyo asunto no dice desde dónde se pidió.
- Quien pulsa «Reserva Rumbo» cree que reserva una sesión de 3 horas con su comité y no sabe si tiene coste. Llega a un email en blanco. Es una **incoherencia de expectativas**: Gartner (25-jun-2025) mide que el 69 % de los compradores encuentra contradicciones entre la web y el comercial ([fuente](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience), vía `investigacion/01`).

### 1.2 Mapa de densidad: dónde se puede convertir

Recorrido de escritorio (en píxeles):

```
   0 ─ Portada ··········· [CTA1 Hablemos de tu caso] [CTA2 Diagnóstico →]
 900 ─ Franja de prueba ·· (logos, 50.000, accesos por inquietud)
1163 ─ Por qué ahora ····· (pérdida: licencias, curva del 55 al 40 %, 80 % frente a 6 %, coste de esperar)
3004 ─ Remate ············ «El curso acaba el viernes…»
3450 ─ CASOS ············· ← momento de más convicción · SIN CTA
4546 ─ Método SPIRAL ····· SIN CTA
6792 ─ Personalización ··· SIN CTA
8089 ─ Lo que construimos  SIN CTA
10407 ─ Para ti ·········· [Reserva Rumbo] (una sola pestaña visible)
11529 ─ Formatos ········· [Reserva Rumbo]
12688 ─ Por qué Spiralia · SIN CTA
13857 ─ DIAGNÓSTICO ······ [Empezar]  ← la herramienta de bajo compromiso, al 81 %
14650 ─ Preguntas ········ SIN CTA (la del precio remite a «30 minutos» sin enlace)
15621 ─ Cierre ··········· [Reserva 30 minutos] + email personal
16617 ─ Pie
```

**El «desierto» de 10.600 px** entre la portada y «Para ti» incluye justo los tres bloques que más empujan a actuar: los **casos** (prueba), el **método** (cómo se hace) y **lo que construimos** (visualizar el éxito). Solo queda la barra fija («Hablemos»), cuyo texto es genérico.

**[Opinión]** El patrón de las webs de servicios con ticket alto que mejor convierten es un CTA contextual tras cada «pico de convicción», con el texto adaptado a lo que se acaba de ver, no el mismo botón repetido. `investigacion/01` (C, Section) documenta un CTA repetido hasta diez veces en la home de Section.

### 1.3 Microconversiones [Hecho]

| Microconversión | Estado | Problema |
|---|---|---|
| **Diagnóstico** (8 preguntas → 5 niveles) | Funciona, accesible y sin datos personales. | (a) Está al fondo de la página. (b) El resultado es un solo nivel, sin dimensiones ni comparación. (c) **No hay botón de reservar** en el resultado: la nota «Lo afinamos contigo en 30 minutos» no enlaza. (d) «Envíanoslo» es un mailto que obliga a enviar un email con nombre y cuenta propios: es el paso de **más** compromiso, disfrazado de pequeño. (e) «Guárdalo» imprime. (f) Los botones secundarios son ilegibles (bug de contraste). (g) No guarda el resultado ni da un enlace para compartirlo con el comité. |
| **Ejemplo de programa** (RR. HH. y L&D) | Mailto desde una pestaña oculta. | Solo lo ve quien abre «Personas y talento». Promete un documento y abre un correo. No hay ejemplo descargable, aunque el benchmark recomendaba uno sin formulario (Section, `investigacion/01` C.1). |
| **Película de 20 s** | Diálogo bajo demanda. | Bien como implicación. Al terminar no hay CTA dentro del diálogo. |
| **Pestañas por inquietud** | Bien resuelto: autoselección del perfil. | Las rutas de la franja de prueba saltan 10.000 px; quien llega a la pestaña ya ha pasado por todo lo demás. |
| **Copiar email** | Bien pensado para asistentes. | El email es personal. |
| **Captación de quien no está listo** | **No existe.** | Ni carta trimestral, ni material, ni invitación a seguir en LinkedIn (solo un enlace en el pie). |

### 1.4 Fricción, por gravedad

| # | Fricción | Gravedad | Evidencia |
|---|---|---|---|
| F1 | **«Reserva» → mailto.** Callejón sin salida si no hay cliente de correo. Sale de la marca a una página sin estilo. Sin calendario. Sin respuesta comprometida. | Crítica | [Experto] NN/g (2000) y Silver y Hupe (2020) sobre mailto ([NN/g](https://www.nngroup.com/articles/mailing-list-usability/), [Silver](https://adamsilver.io/blog/the-trouble-with-mailto-email-links-and-what-to-do-instead/)). [Vendedor] Con calendario tras el formulario, entre el 62 y el 67 % de los leads cualificados reserva, frente al 30-40 % con proceso manual ([Chili Piper 2025](https://www.chilipiper.com/post/form-conversion-rate-benchmark-report), [RevenueHero 2026](https://www.revenuehero.io/blog/lead-to-meeting-conversion-benchmarks-for-2025)). [Estudio] Contactar en la primera hora multiplica por casi 7 la probabilidad de cualificar ([HBR 2011](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)). |
| F2 | **Email personal** (ana.iza@) en el cierre, el pie, la reserva, el diagnóstico y el aviso legal. | Alta (marca y conversión) | Queja n.º 1 del cliente. El cierre dice «Hablas con el equipo» y debajo aparece el email de una persona. Se arregla cambiando `MAIL` en `build.py`. |
| F3 | **Desierto de CTA** tras Casos, Método y Lo que construimos. | Alta | Ver 1.2. |
| F4 | **El diagnóstico, enterrado y sin salida a la reserva.** | Alta | Ver 1.3. [Estudio] El comprador entra en contacto tarde (al 61 % del recorrido) y entre el 61 y el 67 % prefiere avanzar sin comercial: el bajo compromiso tiene que estar arriba ([6sense 2025](https://6sense.com/report/buyer-experience/); [Gartner 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience); Gartner 2026, vía [Distribution Strategy](https://distributionstrategy.com/2026/03/most-b2b-buyers-prefer-rep-free-purchasing-as-ai-reshapes-sales/)). |
| F5 | **Botones del diagnóstico ilegibles** (`.btn-ghost` sin `background`). | Alta (bug) | Medido: fondo `rgb(239,239,239)`, texto `rgb(224,223,218)`. Capturas `dg-q2.png` y `sec-dg-result.png`. |
| F6 | **Cuatro textos para un destino**; «Reserva Rumbo» promete algo que no se reserva. | Media | Ver 1.1. |
| F7 | **Sin medición** y sin origen en la reserva. | Alta (impide mejorar) | `ANALYTICS=''`; la plantilla de `/reserva/` no lee `?d=`. |
| F8 | **No se dice qué pasa después:** quién responde, en cuánto tiempo, qué se lleva uno de los 30 minutos. | Media | [Opinión] El directivo delega la agenda y necesita saber qué compromete. `investigacion/01` recomienda respuesta personal en el día hábil. |
| F9 | **El precio es una caja negra.** «¿Cuánto cuesta?» → «Depende… 30 minutos». | Media | [Opinión] Sin un ancla, el CEO no sabe si esto es de 10.000 o de 500.000 €, y el área de compras no puede preclasificar. Decisión de Jose (ver la sección 9). |
| F10 | **Página muy larga en móvil** (24 pantallas y 2.148 palabras), con la barra como única acción persistente. | Media | [Estudio] Las páginas con lectura sencilla convierten más (Unbounce 2024: 11,1 % frente a 5,3 % en nivel profesional; [fuente](https://unbounce.com/conversion-benchmark-report/)). El copy ya es sencillo; el problema es la longitud. |
| F11 | **La pestaña de RR. HH. está oculta por defecto** y su CTA es un mailto. | Media | RR. HH. y L&D son dos de los tres compradores. Ver 1.5. |

### 1.5 Recorrido por ICP

Las necesidades de cada perfil vienen de `investigacion/02` (6.10, 7.10 y 8.10).

| ICP | Qué necesita ver para pedir reunión | Qué encuentra hoy | Dónde se atasca | CTA que usaría | Qué falta |
|---|---|---|---|---|---|
| **CEO / director general** | Una propuesta que quepa en una pantalla; resultados reconocibles; el primer paso con alcance, duración y criterio de decisión; caras reales; seguridad; «conversación con un socio». | Portada clara, la cifra de ING junto al botón, la curva de pérdida y los casos. Rumbo con duración. | Tras los casos no hay a dónde ir. «Reserva Rumbo» → email. No sabe si Rumbo cuesta ni qué pasa si no sale bien. | «Hablemos de tu caso» (portada) o el botón de la barra. | CTA tras los casos; reversión del riesgo en Rumbo; un **relato para el consejo** (material); orden de magnitud del precio; autoridad de origen explícita. |
| **CHRO / director de Personas** | Gestión del cambio, adopción a 30, 60 y 90 días, transparencia con la plantilla y la RLT, art. 4 sobrio, testimonios de otros CHRO, «diagnóstico de adopción». | Pestaña «Personas y talento» muy buena (voz, checks, la satisfacción de ING). FAQ del Reglamento sobria. | La pestaña está oculta. El CTA es un mailto. No hay testimonios. El diagnóstico está lejos. | «Pide un ejemplo de programa» (si encuentra la pestaña). | **Programa de ejemplo descargable**, testimonio de un CHRO, curva de adopción del caso de ING, **carta para defender el programa ante el CEO** (como el «Convince Your Supervisor» de Wharton, `investigacion/01` B). |
| **L&D / Formación** | Método de personalización, formatos y duración por perfil, ejemplos de materiales en PDF, medición del después, FUNDAE en llano, documentación para Compras. | Personalización (demo), Formatos (tabla). | No hay muestras ni ficha de proveedor. Sin FUNDAE (decisión tomada). | El mismo mailto. | **Pack de evaluación del proveedor**: programa de ejemplo, ejemplo de informe de adopción y ficha para Compras. |
| **CTO / CIO** | Seguridad, inquilino, datos que no salen, permisos, registro, traspaso, sin dependencia. | Pestaña «Tecnología» y bloque «Con control desde el primer día». FAQ de datos y propiedad. | CTA genérico y oculto. Nada técnico que reenviar a seguridad. | «Hablemos de tu entorno». | **Ficha de seguridad y gobierno** (una página) y la opción de una conversación técnica con un ingeniero. |

---

## 2. Palancas de persuasión: qué hay y qué falta

Escala: **0** ausente · **1** débil · **2** presente · **3** fuerte.

| Palanca | Nota | Dónde está hoy [Hecho] | Qué falta o está flojo | Propuesta concreta |
|---|---|---|---|---|
| **Prueba social** | 2 | 12 logos en movimiento; «Más de 50.000»; tres casos con dos cifras y su fuente; la cifra de ING junto al botón de la portada. | Cero voz de cliente (los testimonios se ocultan, y bien, mientras sean `[PLACEHOLDER]`). Ninguna prueba de «alguien como yo» por cargo. Los logos no van por sector. | (1) Conseguir **2-3 citas reales** con nombre, cargo y empresa: idealmente un CHRO o L&D de ING España, un responsable del programa de Deloitte y un director de área de CCEP. (2) Ofrecer una **llamada de referencia**: el material de Deloitte ya recogía que «Spiralia puede poner a Deloitte en contacto directo con quien lideró el proyecto» (`investigacion/03` §7.1). En la web: «¿Quieres hablar con quien lo lideró en ING? Te ponemos en contacto». Solo con permiso. (3) [Estudio] El 74 % de los compradores consultó reseñas o referencias de clientes y el material del proveedor es lo que menos consultan (TrustRadius 2026, [fuente](https://hginsights.com/blog/trust-more-verify-everything-what-the-2026-b2b-buying-disconnect-report-says-about-where-buying-is-actually-heading/)). |
| **Autoridad** | 2 | Fuentes con fecha y página en cada cifra (rigor poco frecuente; el benchmark lo señalaba como posible sello). «Venimos de la consultoría estratégica», «damos clase en un grado universitario de IA». | **Al quitar los nombres de personas también se quitaron las instituciones**: ni McKinsey, ni KPMG, ni EY-Parthenon, ni UFV. «Un grado universitario» suena a evasiva. El colectivo puede llevar esas credenciales sin volver al personalismo. | Cambiar `pq.h2b` y `pq.i1`/`pq.i2` por una credencial colectiva: «Un equipo que viene de McKinsey, KPMG y EY-Parthenon, y que enseña IA en el Grado de la Universidad Francisco de Vitoria». Comprobar antes el permiso de uso de esos nombres. Una línea, sin fotos ni biografías. Es la mejora de autoridad más barata. |
| **Escasez / selectividad** | 0 | Prohibida a propósito en la guía de estilo («sin escasez inventada»), y bien. | Tampoco hay **selectividad real**, que es lo que hace aspiracional a una boutique. | Solo restricciones verdaderas. (a) Requisito: «Rumbo es para comités de dirección completos. Si no puede venir el primer nivel, no lo hacemos». (b) Capacidad, si es verdad: «Los ingenieros se sientan con tu equipo, así que trabajamos con pocas empresas a la vez». (c) Criterio público: «Trabajamos con empresas de más de N personas que ya tienen una IA corporativa». Además de aspiracional, filtra leads. [Hecho] LBS vende una masterclass cerrada «para hasta 35 personas» (`investigacion/01` B). |
| **Urgencia** | 1 | `reto.coste_h` («Lo que cuesta esperar un trimestre») con tres frases sin cifra; `cta.urg` (presupuesto de 2027); FAQ 1 («¿Por qué ahora…?»). | El bloque de coste es abstracto y visualmente menor (h5 y una lista): el lector no ve **su** cifra. La urgencia de 2027 está en letra pequeña bajo el botón. Disparadores reales sin usar: la **renovación de licencias** y, si aplica, la caducidad de FUNDAE el 31-dic. | Ver la sección 6. Urgencia por consecuencia, no por cuenta atrás: (1) una minicalculadora del «coste de la licencia parada» con las cifras del propio lector; (2) el presupuesto de 2027 como titular del cierre, no como nota; (3) la renovación de licencias en la FAQ. |
| **Coste de no actuar / aversión a la pérdida** | 3 | «Ya pagas la IA. Ahora, que trabaje.», «Mientras tanto, la licencia se paga igual.», la curva del 55 % a menos del 40 %, el 80 % frente al 6 %. | Fuerte en lo general, débil en lo personal: la pérdida es «de las empresas», no «tuya este trimestre». | Convertirla en la cifra del lector (calculadora) y en una escena: «Dentro de un año, tu consejo te preguntará qué ha cambiado» (ya existe la voz en `pt.t1_voz`: subirla a «Por qué ahora»). |
| **Reversión del riesgo** | 1 | FAQ 4: «Empezamos por algo pequeño y medible…». «Cada formato termina con algo que se queda en casa». FAQ 6: lo construido es tuyo. | No hay compromiso explícito. No se sabe si Rumbo cuesta, ni qué pasa si el comité no sale con un plan. | Una **garantía sobre Rumbo**, si Jose la acepta: «Si tu comité no sale de Rumbo con una lista priorizada de casos y un primer paso decidido, no lo pagas». O, si Rumbo es gratuito, decirlo como regalo. Y en programas y despliegues: «Sin permanencia: cada ciclo termina con algo funcionando y puedes parar ahí». [no verificado en esta sesión] Hart, «The Power of Unconditional Service Guarantees», HBR (1988): las garantías de servicio aumentan la confianza y obligan al proveedor a cumplir. |
| **Reciprocidad** | 1 | El diagnóstico (gratis y sin datos). | Lo que se regala es poco: un nivel y dos frases. Nada que el directivo pueda **llevarse** y reenviar. | El material para directivos (sección 4), un resultado del diagnóstico con valor real (sección 5) y el programa de ejemplo sin formulario. |
| **Compromiso y coherencia** | 2 | Rumbo como «el primer paso» con nombre y duración; el diagnóstico como pequeño sí. | La escalera no se ve. Y Rumbo (3 h del comité entero) **no es un compromiso pequeño para un CEO**: lo pequeño es la conversación de 30 minutos y los 3 minutos del diagnóstico. | Hacer visible la **escalera de tiempo**: «3 minutos → 30 minutos → 3 horas». Bloque «Tres formas de empezar» en Formatos y en el cierre, cada una con lo que te llevas. [no verificado en esta sesión] Freedman y Fraser (1966): el pie en la puerta. |
| **Unidad** (el «nosotros»; Cialdini, 2016 y 2021) | 2 | «Hablamos el idioma del negocio», «Hemos estado al otro lado de la mesa», «Sin intermediarios ni juniors». | Se puede afinar la identidad compartida con el CEO: venimos de su mundo (comités, cuentas de resultados, consejos), no del técnico. | Frase de unidad para «Por qué Spiralia»: «Hemos preparado comités como el tuyo. Por eso empezamos por tu cuenta de resultados, no por la tecnología». Y en la portada, como subtítulo opcional: «Consultores de estrategia que construyen con IA». |
| **Simpatía** | 1 | Tono cercano («tú»), voces en primera persona, «No todo necesita un agente» (admitir límites). | **Ninguna cara.** La decisión del 19-oct (sin fotos) responde a la queja del cliente, pero `investigacion/02` §6.10 dice que el CEO necesita «caras reales del equipo». | **Caras colectivas, no biografías**: una foto o un vídeo del equipo trabajando en una sesión real (portada, por qué Spiralia o cierre) y, en la página de reserva, el nombre y la cara de quien atenderá (es información práctica, no marca personal). Así se resuelve la tensión entre «menos Ana» y «caras reales». |
| **Anclaje y efecto señuelo** | 1 | Tres formatos, el primero destacado. | Sin ancla de precio ni de tiempo. | Decisión de Jose: «Rumbo, desde X €» o un rango orientativo de programa. Si no hay precio, al menos anclar en tiempo y entregable (ya está) y en escala («de 50 a 13.000 personas»). [no verificado en esta sesión] Huber, Payne y Puto (1982): efecto señuelo. |
| **Progreso dotado y efecto IKEA** | 1 | Barra de progreso en el diagnóstico. | El resultado no se puede guardar ni hacer propio. | Resultado con el nombre de la empresa (opcional, local), enlace para compartir y comparación con el comité. [no verificado en esta sesión] Nunes y Drèze (2006): progreso dotado; Norton, Mochon y Ariely (2012): efecto IKEA. |
| **Ilusión de trabajo / transparencia operativa** | 2 | La demo de personalización y el caso con su registro enseñan el trabajo. | El diagnóstico da el nivel sin explicar el porqué. | Mostrar el razonamiento: «Tu nivel es Uso porque: acceso amplio (3/3), formación general (1/3), sin casos priorizados (0/3)…». [no verificado en esta sesión] Buell y Norton (2011): enseñar el trabajo hecho aumenta el valor percibido. |
| **Pico y final** | 2 | El cierre es visualmente fuerte (la firma de la S). | El final del diagnóstico, que es un pico emocional («este es tu punto de partida»), acaba en botones ilegibles y sin siguiente paso. | Que el resultado acabe en una acción principal clara (sección 5). |
| **Reactancia y conocimiento de la persuasión** | — | El tono sobrio y sin exclamaciones lo evita. | Riesgo al añadir urgencia: con un comité de dirección, una cuenta atrás o una escasez falsa provocan rechazo inmediato. | Toda palanca nueva debe ser **verificable** (cifra con fuente, plazo real, requisito real). [no verificado en esta sesión] Friestad y Wright (1994): el modelo del conocimiento de la persuasión. |

**Lectura de conjunto [Opinión].** La página ya tiene la columna vertebral de la persuasión: problema en clave de pérdida, solución en clave de ganancia y prueba con fuente. Faltan las **palancas que reducen el miedo a equivocarse**: garantía, referencia de un par, autoridad nombrada y un primer paso sin coste visible. [no verificado en esta sesión] Dixon y McKenna, *The JOLT Effect* (2022): en ventas complejas, gran parte de las operaciones se pierde por **indecisión** del comprador y no por preferir a la competencia. Lo que la desbloquea es reducir el riesgo percibido y recomendar con claridad, no añadir presión. Para un CEO que «no sabe lo suficiente para saber si le venden humo» (`investigacion/02` §6.2), esa es la palanca que más pesa.

---

## 3. Arquitectura de CTA propuesta

### 3.1 Tres niveles y un solo nombre por nivel

| Nivel | Para quién | Texto (ES / EN) | Destino | Dónde |
|---|---|---|---|---|
| **Primario: alto compromiso** | Quien ya quiere hablar | **«Reserva 30 minutos»** / «Book 30 minutes». Variante en la barra: «Hablemos» / «Let's talk». | `/reserva/?d=<origen>`: página con la marca y formulario de 4 campos + calendario de Bookings (o el formulario solo si Bookings se retrasa). | Barra, portada, tras Casos, tras Lo que construimos, Para ti, Formatos, resultado del diagnóstico y cierre. |
| **Secundario: bajo compromiso** | Quien forma opinión o tiene que convencer al comité | **«Haz el diagnóstico · 3 minutos»** / «Take the 3-minute assessment» | `#diagnostico`, **subido** tras Casos o tras Por qué ahora (ver 5.1). | Portada, tras Por qué ahora, en el bloque «Tres formas de empezar» y en la FAQ. |
| **Terciario: relación** | El 95 % que no está comprando hoy ([no verificado en esta sesión] «regla 95-5», Dawes, LinkedIn B2B Institute, 2021) | **«Recibe la guía del presupuesto 2027»** · **«Carta trimestral para comités»** / «Get the 2027 AI budget guide» · «Quarterly letter for leadership teams» | `/guia-2027/`: se lee en abierto y el PDF llega por email de forma opcional. Alta en la carta con una casilla aparte. | Tras Por qué ahora (como salida suave), en el pie y en el resultado del diagnóstico. |

**Rumbo** deja de ser un botón de reserva aparte. Pasa a ser **lo que proponemos tras los 30 minutos** y una opción preseleccionada en el formulario («Me interesa: Rumbo para mi comité»). Así:
- desaparece la promesa rota de «Reserva Rumbo»;
- se conserva el nombre propio que recomendaba el benchmark («Schedule an AIP Bootcamp» de Palantir, `investigacion/01` D.1);
- Rumbo sigue en el texto del botón cuando el origen es la tabla de Formatos: «Quiero Rumbo para mi comité» → `/reserva/?d=rumbo`, con el campo de interés ya marcado.

### 3.2 La página `/reserva/` (sustituye a la redirección a mailto)

Contenido, en una sola pantalla:
1. **Titular:** «30 minutos con el equipo que lo va a hacer.» Subtítulo: «Sales con un primer paso propuesto para tu empresa».
2. **Qué pasa en los 30 minutos** (tres líneas): «Nos cuentas dónde estáis · Te enseñamos casos parecidos · Te proponemos el primer paso, con alcance y plazo».
3. **Formulario de 4 campos** (el que recomienda `investigacion/01`): nombre, email de trabajo, empresa y «Lo que más te importa» (Resultados / Personas y talento / Formación / Tecnología). Un campo opcional: «¿Qué te gustaría conseguir?». El origen `d` va oculto. El interés viene preseleccionado según `d` (rumbo, tecnologia, personas, diagnostico).
4. **Calendario** tras enviar (Bookings incrustado o enlazado, ventana de 5-7 días hábiles). Si no se reserva: «**Te respondemos en un día laborable**» (compromiso de respuesta; HBR 2011).
5. **Para asistentes:** buzón de equipo copiable (p. ej. `ia@spiralia.es`).
6. **Primera capa de RGPD** junto al botón (responsable, finalidad, base: tu petición, art. 6.1.b; destinatarios: Microsoft como encargado; derechos y enlace) y una **casilla aparte, sin marcar**, para la carta trimestral (LSSI art. 21; Planet49). Textos ya redactados en `investigacion/01` §2.6.
7. **Prueba mínima** junto al formulario: tres logos y la cifra de ING.

**Implementación sin backend [Opinión]:**
- el formulario puede enviarse a un servicio de formularios con alojamiento en la UE, o directamente a Bookings (que pide nombre y email);
- mientras no haya agenda, la página `/reserva/` muestra el formulario y el email copiable, **nunca** una redirección automática a mailto;
- hay que corregir `cta.legal` mientras Bookings no exista.

### 3.3 CTA contextuales: uno por pico de convicción

El copy es una propuesta. Las cifras ya están en `cifras.toml`.

| Tras la sección | Bloque (ES) | EN |
|---|---|---|
| **Por qué ahora** (tras «Lo que cuesta esperar») | «¿Cuánto te está costando a ti? → **Haz el diagnóstico · 3 minutos**» + enlace secundario «o recibe la guía del presupuesto 2027» | «What is it costing you? → Take the 3-minute assessment» |
| **Casos** | «¿Quieres este resultado en tu empresa? **Reserva 30 minutos**» + «¿Prefieres hablar antes con quien lo lideró en ING? Te ponemos en contacto» (solo con permiso) | «Want this result in your company? Book 30 minutes» |
| **Método** (tras «equipos que ya no nos necesitan») | «El primer paso son 3 horas con tu comité. **Cómo empezar →**» (ancla a Formatos) | «The first step is 3 hours with your leadership team. How to start →» |
| **Lo que construimos** | «¿Qué proceso de tu empresa podría trabajar así? **Lo vemos en 30 minutos**» | «Which of your processes could work like this? Let's look at it in 30 minutes» |
| **Para ti › Personas** | «**Descarga un programa de ejemplo**» (PDF anonimizado, sin formulario) + «Reserva 30 minutos» | «Download a sample program» |
| **Para ti › Tecnología** | «**Descarga la ficha de seguridad y gobierno**» + «Habla con un ingeniero · 30 minutos» | «Download the security and governance sheet» |
| **Formatos** | Bloque «**Tres formas de empezar**»: 3 minutos (diagnóstico) · 30 minutos (conversación) · 3 horas (Rumbo). Cada una con su botón. | «Three ways to start: 3 minutes · 30 minutes · 3 hours» |
| **Preguntas** (respuesta del precio) | Que «30 minutos» enlace a `/reserva/?d=precio` | — |
| **Cierre** | Titular de urgencia de calendario (ver la sección 6) + «Reserva 30 minutos» + email de equipo | — |
| **Diálogo de la película** | Al acabar: «Reserva 30 minutos» / «Haz el diagnóstico» | — |

**Móvil [Opinión]:** una barra inferior fija con «Reserva 30 minutos» que aparezca al pasar la portada y se oculte en el diagnóstico y en el cierre. Es más fácil de alcanzar con el pulgar que el botón de la barra superior.

---

## 4. Material para directivos (lead magnet)

### 4.1 Opciones evaluadas

| Opción | ICP | Palancas | Coste | Riesgo | Valoración |
|---|---|---|---|---|---|
| **A. «Presupuesto de IA 2027: 10 preguntas que tu comité debe hacerse antes de aprobarlo»** (PDF de 6-8 páginas y versión web) | CEO y comité | Reciprocidad, autoridad (lenguaje de consultoría estratégica), urgencia real (cierre presupuestario del cuarto trimestre), unidad («hablamos tu idioma») | Bajo: sale del banco de mensajes y de las preguntas del comité | Caduca en el primer trimestre de 2027 (reeditar como «2028») | **Recomendada para el lanzamiento** |
| **B. «Programa de ejemplo para 1.000 personas»** (anonimizado: perfiles, sesiones, calendario, medición a 30, 60 y 90 días) | CHRO y L&D | Reciprocidad, prueba de calidad, reducción del riesgo («así trabajan») | Bajo-medio: se adapta de un programa real (ING o Deloitte, sin marca) | Revelar demasiado del método. Permisos | **Recomendada** (sustituye al mailto de `pt.t2_cta`) |
| **C. «Ficha de seguridad y gobierno»** (una página: inquilino, datos, permisos, registro, traspaso) | CTO, CIO y Compras | Autoridad, reducción del riesgo | Bajo | — | **Recomendada** (sin formulario) |
| **D. «Barómetro Spiralia: cómo usan la IA los equipos en España»** (datos agregados de las formaciones: 50.000 personas) | Todos y prensa | Autoridad máxima (datos propios), prueba social, relaciones públicas | Alto: hay que recoger y anonimizar datos y tener permisos | Requiere metodología y datos que hoy no hay | **Buque insignia para 2027** |
| **E. «Carta para tu comité»** (plantilla editable para que RR. HH. defienda el programa ante el CEO; análoga al «Convince Your Supervisor» de Wharton, `investigacion/01` B) | CHRO y L&D | Compromiso, reciprocidad; facilita la venta interna | Bajo | — | **Complemento de B** |

### 4.2 Recomendación: A como pieza central, más B, C y E

**Índice propuesto de A** (cada pregunta con un párrafo y, cuando la hay, una cifra con fuente de `cifras.toml`):
1. ¿Cuántas de nuestras licencias se usan cada semana? (Dillon et al.: el uso semanal tocó techo en el 55 % y acabó por debajo del 40 %)
2. ¿Qué tres procesos cambiarían la cuenta de resultados si la IA los asumiera?
3. ¿Quién responde de cada uso de la IA?
4. ¿Hemos formado por perfil o con un curso para todos? (BCG 2026: solo el 36 % cree que su formación ha sido suficiente)
5. ¿Qué vamos a medir: horas de formación o uso y valor?
6. ¿Qué parte del presupuesto va a herramientas y qué parte a que se usen? (BCG 10/20/70, `investigacion/01` A.2)
7. ¿Qué le enseñaremos al consejo dentro de un año?
8. ¿Cómo se lo contamos a la plantilla y a sus representantes?
9. ¿Qué pide el Reglamento europeo (en tono sobrio, `investigacion/02` §5.5)?
10. ¿Cuál es el primer paso que podemos dar este trimestre?

El último apartado es: «Cómo lo hacemos con tu comité: Rumbo, 3 horas».

**Distribución, en modo híbrido [Opinión apoyada en NN/g]:**
- se lee **en abierto** en la web; NN/g aconseja abrir el contenido de descubrimiento ([Loranger 2015](https://www.nngroup.com/articles/content-behind-forms/));
- botón «**Recíbelo en PDF para tu comité**» con un solo campo (email de trabajo);
- el PDF lleva el CTA de los 30 minutos en la última página y en el pie de cada página.

### 4.3 RGPD del material

- **Base jurídica del envío del PDF:** la petición del usuario (art. 6.1.b RGPD). No hace falta consentimiento para enviar lo que ha pedido.
- **Carta trimestral o comunicaciones comerciales:** casilla **aparte, sin marcar y no obligatoria** (LSSI art. 21; RGPD art. 7 y considerando 32; Planet49, C-673/17). Ver los textos en `investigacion/01` §2.6.
- **No condicionar la descarga al consentimiento comercial** (RGPD art. 7.4).
  - [no verificado en esta sesión] La AEPD ha criticado en varias resoluciones los muros de «descarga a cambio de suscripción».
  - Es otra razón para que la versión web sea abierta.
- **Primera capa** bajo el campo: responsable, finalidad («enviarte la guía y, si marcas la casilla, la carta trimestral»), base, destinatarios (proveedor de email como encargado, con contrato del art. 28), derechos y enlace a la política (LOPDGDD art. 11).
- **Conservación:** fijar un plazo (p. ej. 12 meses sin interacción) y decirlo en la segunda capa.

---

## 5. El diagnóstico como herramienta de captación

### 5.1 Mover y abrir

1. **Subirlo** a justo después de Casos (entre Casos y Método) o después de Por qué ahora. Que la portada lo enseñe como segunda acción y que el ancla no salte 13.700 px.
   - [Opinión] Con una página de 19-24 pantallas, buena parte de las visitas no llega al 81 % de profundidad. No hay dato propio hasta activar la medición: es la primera hipótesis que hay que medir.
2. **Arreglar el contraste** (`.btn-ghost{background:transparent}`) y comprobar «Atrás» y «Siguiente» en el paso de pregunta.

### 5.2 Un resultado que valga la pena [Opinión]

| Hoy | Propuesta |
|---|---|
| Un nivel (Acceso → Autonomía) y dos pasos | **Ocho dimensiones** (las ocho preguntas ya lo son: acceso, uso, formación, casos, agentes, gobierno, medición y comité) en un **radar o en barras**, con la más fuerte y la más débil señaladas. El banco de mensajes recoge modelos de 6-8 dimensiones ya usados con clientes (`investigacion/03` §4.2, inconsistencia 9). |
| Sin porqué | «**Por qué te sale Uso**»: tres líneas que enlazan las respuestas con el nivel (transparencia operativa). |
| Sin referencia externa | «**Dónde está el 6 %**»: marcar los niveles Rediseño y Autonomía como el terreno de las empresas que ven la IA en su beneficio (McKinsey 2026, ya en `cifras.toml`). Es una norma social con fuente, sin inventar percentiles. |
| Igual para todos | **Pasos según la inquietud**: una pregunta 0 opcional, «¿Qué te importa más?» (Resultados / Personas / Tecnología), que cambia los dos pasos y el caso que se enseña (ING para Personas, Deloitte para Tecnología, CCEP para Resultados). No es un dato personal. |
| «Envíanoslo» (mailto) | **CTA principal:** «**Revisa este resultado con nosotros · 30 minutos**» → `/reserva/?d=diagnostico&r=<respuestas codificadas>`, que adjunta el resultado al formulario. |
| «Guárdalo» (imprimir) | **CTA secundario:** «**Recíbelo en PDF para tu comité**» (un campo de email; RGPD como en 4.3). Mejor un PDF generado que el diálogo de impresión. |
| Sin forma de compartir | **CTA terciario:** «**Compártelo con tu comité**», un enlace con las respuestas en el fragmento de la URL (`#dg=21302110`). No viaja ningún dato personal al servidor y quien lo abre ve el mismo resultado. Con la Web Share API en móvil. |
| — | **«El diagnóstico del comité»** (P2): cada miembro hace el suyo con el mismo enlace de grupo y la página compara dónde no coinciden. Es la mejor antesala posible de Rumbo («venid a alinearlo en 3 horas»). [Estudio] En la compra intervienen 13 personas de media (Forrester 2024, [fuente](https://www.forrester.com/press-newsroom/forrester-the-state-of-business-buying-2024/)). |

### 5.3 Reglas de RGPD del diagnóstico

- **Sin datos hasta que el usuario decide.** Las respuestas se quedan en el navegador. El resultado se ve sin dejar nada, como hoy, y así se mantiene la promesa «Sin datos personales» de `dg.lead`.
- **Si pide el PDF o reserva**, las respuestas viajan con su email. Se informa en la primera capa:
  > «Usaremos tus respuestas para preparar la conversación o el informe».

  Es un uso para la finalidad pedida. Si se fueran a usar para segmentar comunicaciones comerciales, sería elaboración de perfiles: hay que informar y ofrecer oposición (LOPDGDD art. 11.2) y basarse en el consentimiento de la casilla.
- **Enlace para compartir:** las respuestas en el fragmento (`#`) no se envían al servidor. Sin cookies.
- **Analítica:** Plausible no usa cookies, lo que mantiene «Esta página no usa cookies» (`ft.nocookies`). Elegir alojamiento en la UE y revisar su contrato de encargado.

### 5.4 Eventos que hay que añadir (con `ANALYTICS` activado)

- `Diagnóstico{paso:pN}` en cada pregunta, para ver el abandono por pregunta.
- `Diagnóstico{paso:resultado, nivel, inquietud}`.
- `Diagnóstico{accion: reservar|pdf|compartir|repetir}`.
- `Guía{accion: leer|pdf}`, `Carta{alta}`.
- `Reserva{origen}` (ya existe), más el envío del formulario y la reserva confirmada (Bookings → email de confirmación). Así se ve el embudo completo.

---

## 6. Urgencia «a lo Monge Malo», con clase

**Principio [Opinión]:** urgencia **por consecuencia y por calendario**, nunca por cuenta atrás.
- La respuesta directa que el cliente asocia a Monge Malo funciona por **concreción** (una cifra, una escena, un plazo), **consecuencia** (qué pierdes tú) y **una sola acción**.
- Para un comité de dirección se traduce en hechos verificables, frases cortas y cero adjetivos.
- No he podido revisar en esta sesión textos del propio Monge Malo: lo anterior describe el género de respuesta directa, no a él.

**Disparadores reales que la web puede usar** (`investigacion/02` §6.7 y §8.7):

| Disparador | Real hoy | Uso propuesto |
|---|---|---|
| Cierre del presupuesto de 2027 | Sí: cuarto trimestre de 2026 (ya en `cifras.toml`, retirar en el primer trimestre de 2027) | Titular del cierre, no nota al pie |
| Renovación de licencias de Copilot u otra IA | Sí, recurrente | FAQ nueva: «¿Renovamos las licencias?» |
| Uso que se enfría en semanas | Sí (Dillon et al.) | Ya se usa: subir la escena «el lunes» |
| El 6 % que se aleja | Sí (McKinsey 2026) | Ya se usa |
| Crédito de FUNDAE que caduca el 31-dic | **Solo si** Spiralia es bonificable (decisión: hoy no se menciona) | Pestaña Personas, con fecha |
| Art. 4 del Reglamento de IA | Sí, en tono sobrio | FAQ 9, ya está bien |

**Propuestas de copy** (ES; en EN, adaptación análoga). Solo usan cifras que ya están en `cifras.toml`. Si se añade alguna nueva, el build lo exige.

- `reto.coste_h` → **«Haz la cuenta de este trimestre.»**
  - `coste1` → «Tus licencias, por su precio, por tres meses.»
  - `coste2` → «Ahora réstale lo que se usa cada semana. En el mayor experimento publicado, menos del 40 %.»
  - `coste3` → «Lo que queda es dinero parado. Y tu competencia paga lo mismo por usarlo.»
  - Opcional: una **minicalculadora** con dos campos (número de licencias y precio al mes) que muestre «Cada trimestre, unos X € en licencias que no se usan cada semana», con el supuesto a la vista y su fuente.
  - No es una calculadora de ROI (descartada con razón en `investigacion/01` §2.4): calcula el coste del statu quo con las cifras del propio lector. Probarla y medirla.
- **Escena para visualizar el éxito**, estilo Apple, junto a los casos: «Dentro de un año, tu consejo te preguntará qué ha cambiado. Que la respuesta sea un proceso que va más rápido, no una encuesta de satisfacción.»
- `cta.h2a` y `cta.h2b` (cierre):
  - **«El presupuesto de 2027 se cierra estas semanas.»**
  - **«Que la IA llegue con un plan, no con una partida.»**
  - `cta.lead` → «30 minutos con el equipo que lo va a hacer. Sales con un primer paso propuesto.»
  - `cta.urg` pasa a ser la línea de reversión del riesgo, p. ej.: «Si después de Rumbo tu comité no tiene un plan, no lo pagas.» (solo si se decide la garantía)
- Respuesta de la FAQ 1, con más filo: «Porque cada semana sin uso es una semana de licencia pagada. Y porque quien ya rediseña su trabajo no va un paso por delante: va una curva por delante.»
- **FAQ nueva:** «**Vamos a renovar las licencias. ¿Esperamos?**» → «Renueva con un plan. En 30 minutos vemos qué uso real tenéis y qué haría falta para que la renovación se note en la cuenta.»

---

## 7. Lista priorizada de cambios

**Cómo se estima el impacto [Opinión].** No hay datos propios: la medición está apagada. El impacto se estima de forma cualitativa según:
- el paso del embudo que mueve: visita → acción → reserva → reunión celebrada → propuesta;
- la fuerza de la evidencia que lo respalda.

No se dan porcentajes de mejora porque serían inventados.

| # | Prioridad | Cambio | Fricción o palanca | Paso del embudo | Impacto | Esfuerzo | Dónde |
|---|---|---|---|---|---|---|---|
| 1 | **P0** | Sustituir la redirección `/reserva/` → mailto por una **página de reserva con la marca**: formulario de 4 campos, calendario de Bookings (o respuesta en un día laborable) y buzón copiable. Corregir `cta.legal`. | F1, F8 | Acción → reserva | **Alto** (evidencia sólida en velocidad; calendario según vendedores) | Medio (1-2 días sin Bookings; menos con él) | `build.py` (`RESERVA`, `BOOKINGS`), nueva plantilla |
| 2 | **P0** | **Buzón de equipo** en lugar de ana.iza@ (cierre, pie, diagnóstico, reserva y aviso legal). | F2, queja n.º 1 | Confianza y marca | **Alto** para el cliente; medio en conversión | Minutos (`MAIL` en `build.py`) más crear el buzón | `build.py` |
| 3 | **P0** | **Arreglar el contraste** de `.btn-ghost` (`background:transparent`). | F5 | Diagnóstico | **Alto** (hoy «Atrás», «Guárdalo» y «Repetir» no se leen) | Minutos | `src/css/site.css` l. 72-73 |
| 4 | **P0** | **CTA de reserva en el resultado del diagnóstico** (con las respuestas adjuntas) en lugar del mailto «Envíanoslo». | F4 | Diagnóstico → reserva | **Alto** | Horas | `diagnostico.js`, `[dg]` |
| 5 | **P0** | **Activar la medición** (Plausible en la UE, sin cookies), pasar `?d=` a la reserva y añadir los eventos del 5.4. | F7 | Todo | **Alto** (condición para todo lo demás) | Horas | `build.py` (`ANALYTICS`), `engine.js`, `diagnostico.js` |
| 6 | **P0** | **CTA contextuales** tras Casos, Método y Lo que construimos, y **unificar textos** («Reserva 30 minutos» y «Hablemos» en la barra). Rumbo como interés preseleccionado. | F3, F6 | Visita → acción | **Alto** | Horas | plantilla y `content.toml` |
| 7 | P1 | **Subir el diagnóstico** tras Casos y **enriquecer el resultado**: dimensiones, porqué, «dónde está el 6 %», pasos por inquietud, compartir y PDF. | F4, reciprocidad, progreso dotado | Visita → acción secundaria | **Alto** | 2-4 días | plantilla, `diagnostico.js`, `[data.diag]` |
| 8 | P1 | **Autoridad nombrada** del colectivo: McKinsey, KPMG, EY-Parthenon y UFV, en una línea y con permiso. | Autoridad | Confianza | **Medio-alto** | Minutos más el permiso | `[pq]` |
| 9 | P1 | **Reversión del riesgo en Rumbo** (garantía o «gratuito») y **«sin permanencia»** en programas y despliegues. Reescribir la FAQ 4. | Riesgo | Reserva → propuesta | **Medio-alto** (ataca la indecisión) | Decisión de Jose más minutos | `[fmt]`, `[faq]`, `[cta]` |
| 10 | P1 | **2-3 testimonios reales** y **oferta de llamada de referencia** (con permiso). | Prueba social | Confianza → reserva | **Medio-alto** | Semanas (permisos) | `[pr].tst_*` |
| 11 | P1 | **Materiales**: guía 2027 (CEO), programa de ejemplo (RR. HH. y L&D), ficha de seguridad (CTO) y carta trimestral con su casilla RGPD. Sustituyen al mailto de `pt.t2_cta`. | Reciprocidad, captación | Visitante no listo → relación | **Medio** a corto plazo; **alto** en el ciclo de 10 meses ([6sense 2025](https://6sense.com/report/buyer-experience/)) | 1-2 semanas de contenido | páginas nuevas |
| 12 | P1 | **Urgencia cuantificada**: bloque «Haz la cuenta de este trimestre» (con calculadora opcional) y **presupuesto de 2027 como titular del cierre**. | Urgencia, pérdida | Visita → acción | **Medio** | Horas (copy) o 1 día (calculadora) | `[reto]`, `[cta]` |
| 13 | P1 | **Bloque «Tres formas de empezar»** (3 minutos, 30 minutos, 3 horas) en Formatos y en el cierre. | Compromiso y coherencia | Visita → acción | **Medio** | Horas | plantilla y `[fmt]` |
| 14 | P1 | **Respuesta en un día laborable** y «qué pasa en los 30 minutos», visibles junto al botón. | F8 | Acción → reserva | **Medio** | Minutos | `[cta]` y `/reserva/` |
| 15 | P2 | **Caras colectivas**: foto o vídeo real del equipo en una sesión. En `/reserva/`, quién te atiende. | Simpatía | Confianza | **Medio** | Rodaje | portada, Por qué Spiralia, reserva |
| 16 | P2 | **Selectividad real** (requisito de Rumbo o capacidad), solo si es verdad. | Selectividad | Calidad del lead | **Medio** (y filtra) | Minutos más decisión | `[fmt]`, `[pq]` |
| 17 | P2 | **Ancla de precio** («Rumbo desde X €» o rango orientativo de programa). | F9, anclaje | Reunión → propuesta (precualifica) | **Medio** (incierto: arma de doble filo) | Decisión de Jose | `[faq].a10`, `[fmt]` |
| 18 | P2 | **Barra inferior fija en móvil** y recorte de longitud (objetivo: menos de 18 pantallas). | F10 | Visita → acción | **Medio** | 1-2 días | CSS y plantilla |
| 19 | P2 | **Diagnóstico del comité** a varias voces. | Unidad, compromiso | Diagnóstico → Rumbo | **Medio-alto**, a largo plazo | 1 semana | `diagnostico.js` |
| 20 | P2 | **Barómetro propio** con datos agregados de las formaciones. | Autoridad máxima | Marca y relaciones públicas | **Alto** a largo plazo | Proyecto | — |
| 21 | P2 | **FUNDAE con fecha** (31-dic) en la pestaña Personas, **solo si** es bonificable. | Urgencia real para L&D | Acción de L&D | **Medio** para ese ICP | Verificación | `[pt]` |
| 22 | P2 | **CTA al terminar la película.** | — | Implicación → acción | Bajo-medio | Horas | `motion.js` |

---

## 8. Medición: el embudo mínimo

**Embudo**, revisado cada trimestre (`investigacion/01` §2.5: con volumen de boutique, tendencias trimestrales y no tests A/B con significación):
1. visitas únicas;
2. acción principal: clic en Reserva, por origen;
3. formulario enviado;
4. reunión reservada;
5. reunión celebrada;
6. propuesta;
7. firma.

**Embudo secundario:**
1. inicio del diagnóstico;
2. resultado;
3. acción en el resultado: reservar, PDF o compartir.

**Embudo de relación:**
1. lectura de la guía;
2. PDF;
3. alta en la carta.

**Operativo:** tiempo hasta la primera respuesta (objetivo: el mismo día laborable).

**Primeros tests** (cuando haya volumen, si no, decisión editorial):
- (a) diagnóstico arriba o abajo;
- (b) cierre con urgencia de presupuesto o con garantía;
- (c) PDF del diagnóstico con email o sin email.

---

## 9. Decisiones que tiene que tomar Jose

1. **Agenda:** ¿Bookings con página de equipo (varios anfitriones) o, mientras tanto, un formulario con respuesta en un día laborable? ¿Qué buzón de equipo usamos (`ia@`, `hola@`)?
2. **Rumbo:** ¿es gratuito o de pago? Si es de pago, ¿aceptas una garantía («si tu comité no sale con un plan, no lo pagas»)?
3. **Autoridad nombrada:** ¿se pueden citar McKinsey, KPMG, EY-Parthenon y la UFV como origen del equipo, en colectivo?
4. **Testimonios y referencias:** ¿a quién pedimos 2-3 citas (ING, Deloitte, CCEP)? ¿Se puede ofrecer una llamada de referencia?
5. **Precio:** ¿publicamos un ancla («desde X €») para Rumbo o un rango orientativo de programa?
6. **Selectividad:** ¿hay una restricción real que podamos decir (requisito de comité completo, capacidad de ingenieros, tamaño mínimo de empresa)?
7. **Materiales:** ¿qué programa real se puede anonimizar como ejemplo? ¿Quién valida la guía 2027?
8. **Caras:** ¿una foto o un vídeo del equipo (colectivo) en una sesión real?
9. **FUNDAE:** ¿es bonificable alguna parte? Si sí, la fecha del 31-dic es urgencia real para L&D.
10. **Validación legal:** que el asesor o el DPO revise los textos de la reserva, del material y del diagnóstico (primera capa, casilla y conservación).

---

## 10. Fuentes

**Del repositorio** (investigación previa; cada dato se verificó allí el 14-oct-2026 con su enlace):
- `investigacion/01_benchmark_y_cta.md`: benchmark de 27 webs y evidencia sobre CTA, formularios, calendario, mailto y RGPD.
- `investigacion/02_icp_arquetipos.md`: arquetipos de CEO, CHRO y L&D, disparadores de compra, FUNDAE y art. 4.
- `investigacion/03_banco_mensajes.md`: credenciales, inconsistencias, referencias de cliente y modelos de madurez.

**Externas** (citadas a través del repositorio):
- Oldroyd, McElheran y Elkington, «The Short Life of Online Sales Leads», HBR, marzo de 2011: https://hbr.org/2011/03/the-short-life-of-online-sales-leads
- Chili Piper, «2025 Benchmark Report on Demo Form Conversion Rates», 18-feb-2025: https://www.chilipiper.com/post/form-conversion-rate-benchmark-report
- RevenueHero, «Lead-to-Meeting Conversion Benchmarks for 2025», 18-feb-2026: https://www.revenuehero.io/blog/lead-to-meeting-conversion-benchmarks-for-2025
- Gartner, nota del 25-jun-2025 (61 % sin comercial; 69 % ve contradicciones): https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience
- Gartner, nota del 9-mar-2026 (67 % sin comercial; 45 % usó IA), vía Distribution Strategy: https://distributionstrategy.com/2026/03/most-b2b-buyers-prefer-rep-free-purchasing-as-ai-reshapes-sales/
- 6sense, «2025 B2B Buyer Experience Report»: https://6sense.com/report/buyer-experience/
- Forrester, «The State of Business Buying, 2024»: https://www.forrester.com/press-newsroom/forrester-the-state-of-business-buying-2024/
- TrustRadius y HG Insights, «B2B Buying Disconnect» 2026: https://hginsights.com/blog/trust-more-verify-everything-what-the-2026-b2b-buying-disconnect-report-says-about-where-buying-is-actually-heading/
- Forrester, «Global Marketing Content Credibility Study» (65 % no se fía del contenido de proveedores), citado en: https://tei.forrester.com/go/forrester/teiofteidynamic
- Unbounce, «Conversion Benchmark Report 2024»: https://unbounce.com/conversion-benchmark-report/
- NN/g, «Mailing List Usability» (2000): https://www.nngroup.com/articles/mailing-list-usability/
- Silver y Hupe, «The trouble with mailto email links» (2020): https://adamsilver.io/blog/the-trouble-with-mailto-email-links-and-what-to-do-instead/
- NN/g, «When to Hide Content Behind Forms» (2015): https://www.nngroup.com/articles/content-behind-forms/
- MarketingSherpa, test del campo «cargo» (−11,9 %), 2013: https://sherpablog.marketingsherpa.com/b2b-marketing/lead-gen/lead-gen-summit-live-test/
- RGPD: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679 · LOPDGDD: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673 · LSSI-CE: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758 · Planet49 (C-673/17): https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:62017CJ0673 · AEPD, guía del deber de informar: https://www.aepd.es/guias/guia-modelo-clausula-informativa.pdf
- Dillon, Jaffe, Immorlica y Stanton, NBER w33795: https://www.nber.org/papers/w33795
- BCG, «AI at Work: Why Strategy Matters More Than Tools» (2026): https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools
- Comisión Europea, «AI Literacy – Questions & Answers» (27-jul-2026): https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers

**Psicología y economía conductual [no verificado en esta sesión: citas y DOI de memoria; comprobar antes de usarlos fuera de este informe]:**
- Cialdini, R. *Pre-Suasion* (2016) e *Influence, New and Expanded* (2021), que añade la «unidad» como séptimo principio.
- Kahneman, D. y Tversky, A. (1979). «Prospect Theory». *Econometrica*, 47(2). https://doi.org/10.2307/1914185
- Samuelson, W. y Zeckhauser, R. (1988). «Status quo bias in decision making». *Journal of Risk and Uncertainty*, 1. https://doi.org/10.1007/BF00055564
- Freedman, J. y Fraser, S. (1966). «Compliance without pressure: the foot-in-the-door technique». *JPSP*, 4(2). https://doi.org/10.1037/h0023552
- Huber, J., Payne, J. y Puto, C. (1982). «Adding asymmetrically dominated alternatives». *Journal of Consumer Research*, 9(1). https://doi.org/10.1086/208899
- Friestad, M. y Wright, P. (1994). «The Persuasion Knowledge Model». *Journal of Consumer Research*, 21(1). https://doi.org/10.1086/209380
- Nunes, J. y Drèze, X. (2006). «The Endowed Progress Effect». *Journal of Consumer Research*, 32(4). https://doi.org/10.1086/500480
- Buell, R. y Norton, M. (2011). «The Labor Illusion». *Management Science*, 57(9). https://doi.org/10.1287/mnsc.1110.1376
- Norton, M., Mochon, D. y Ariely, D. (2012). «The IKEA effect». *Journal of Consumer Psychology*, 22(3). https://doi.org/10.1016/j.jcps.2011.08.002
- Hart, C. (1988). «The Power of Unconditional Service Guarantees». *Harvard Business Review*, julio-agosto de 1988.
- Dixon, M. y McKenna, T. (2022). *The JOLT Effect*. Portfolio.
- Dawes, J. (2021). «Advertising Effectiveness and the 95-5 Rule». LinkedIn B2B Institute.
