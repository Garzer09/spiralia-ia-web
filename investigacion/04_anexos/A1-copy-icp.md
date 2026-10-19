# A1 · Auditoría de copy y mensaje frente al ICP (CEO, Personas/L&D, CTO)

Spiralia AI · sección de IA de spiralia.es · 19 de octubre de 2026

**Qué se ha revisado:**
- `src/content.toml` entero, en ES y EN, incluido `[data]`;
- `src/index.template.html`, tanto en el commit `003dec3` como en el *working tree* del 19-oct, que otra línea de trabajo está cambiando ahora mismo: hero a sangre, roles `negocio / personas / tecnologia`, claves nuevas `hero.micro`, `hero.film_btn`, `nav.casos` y `nav.close`;
- `src/cifras.toml`, `build.py`, `motion/film/copy.js`, `LEEME.md` y `FUENTES.md`;
- la investigación previa: `investigacion/01`, `02` y `03`, y los informes de hoy `R1-mensajes-competencia.md`, `R2-hero-y-diseno.md` y `R3-marketing-ventas-b2b.md`.

**Medición propia:** con Playwright sobre `http://localhost:8851/?still=1`, a 1440×900 y 390×844, en ES y EN.

**Límite de esta sesión.** La cuota de búsquedas web del turno estaba agotada al empezar esta línea; los informes R1-R3 la habían consumido. No he podido hacer búsquedas nuevas. Toda cifra externa de este informe sale de `investigacion/` o de R1-R3, con el enlace que allí se cita. Hay dos casos en que cito de memoria y lo marco **[no verificado en esta sesión]**: la referencia a NN/g y la descripción del estilo de Monge Malo.

**Leyenda:**
- **[Hecho]:** está en el repo o en una fuente citada.
- **[Opinión]:** es criterio propio.
- **[Confirmar]:** lo tiene que decidir o validar Jose antes de publicar.

---

## 0. Resumen ejecutivo

1. **El hero no pasa la prueba de los 5 segundos con un CEO no técnico.** El H1 («La inteligencia se compra. La ventaja se despliega.») es elegante, pero es una metáfora con un verbo de jerga, *desplegar*. El antetítulo está en inglés. El subtítulo tiene 30 palabras y mete «agentes de IA». El diferencial («venimos de la consultoría estratégica») no aparece hasta la novena sección. Un directivo entiende que esto «va de IA», pero no qué hace Spiralia, ni por qué ella y no otra.
2. **La página es demasiado larga y se repite.**
   - Ocupa **18 pantallas en escritorio y 26,7 en móvil**, con unas **2.440 palabras** visibles (unos 11-12 minutos de lectura).
   - «Lo que construimos» ocupa ella sola **5,3 pantallas en móvil**.
   - Hay contenidos duplicados: la visita bancaria sale dos veces (la demo de «Personalización» y la tarjeta «La visita, preparada»), el 50.000 cuatro veces, el FDE se define tres veces y la personalización por perfil se explica en tres secciones.
   - Se puede bajar a unas 1.400-1.600 palabras y 11-12 pantallas sin perder ninguna prueba.
3. **La web dice que habla el idioma de negocio, pero en buena parte habla el de los técnicos.**
   - Las palabras técnicas aparecen en estas claves:

     | Palabra | Claves de copy |
     |---|---|
     | «agente(s)» | 10 |
     | «FDE» | 8 |
     | «despliegue» o «desplegar» | 6 |
     | «skills» | 4 |

   - El método SPIRAL usa siglas cuyas palabras en inglés (*Skill, Pair, Identify, Rebuild, Assure, Launch*) no coinciden con los pasos en español.
   - Según BCG (junio de 2026), el 52 % de los profesionales entiende poco qué es un agente ([BCG, AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools), vía `investigacion/02`, §2.2).
4. **La urgencia está, pero suena a informe y no a llamada a la acción.**
   - La tensión «el 80 % trabaja mejor, solo el 6 % lo ve en su beneficio» y «el curso acaba el viernes» es muy buena.
   - Pero va con tres estudios y tres notas al pie seguidas, sin decirle al lector qué le pasa a él.
   - «Cada trimestre cuenta», la frase más Monge Malo de la página, está enterrada debajo del aviso legal del cierre.
5. **La visualización del éxito «estilo Apple» existe, pero está dispersa:** la demo por perfil, el caso de la propuesta y «Lo que te llevas». No hay un momento en que el lector vea su empresa funcionando. Rumbo no dice con qué sale el comité.
6. **El personalismo de Ana está, sobre todo, en los canales, no en el texto.**
   - El email `ana.iza@spiralia.es` aparece 8 veces en la página generada (en 6 sitios distintos) y otras 2 en `reserva/`.
   - La reserva va a la agenda de Ana.
   - Su foto sale dos veces, su biografía es la más larga y va primero.
   - El cierre, «Hablas con quien lo va a hacer», lleva dos retratos: sugiere que lo hará la CEO en persona y que la empresa son dos personas.
   - El inventario completo está en la §4. Se arregla con un buzón y una agenda de equipo, una retícula de 4-6 personas del mismo tamaño y «el equipo de Spiralia» como sujeto.
7. **El CTO/CIO no tiene sitio.**
   - Hoy aparece solo como quien pone pegas: «las herramientas que aprueba tu IT», «IT y Riesgos».
   - Ninguna pestaña, ninguna prueba y ninguna pregunta le hablan a él.
   - El *working tree* ya prevé el rol `tecnologia`; en la §6.6 va el copy completo de esa pestaña.
8. **Los CTA están dispersos.**
   - La acción principal tiene cinco textos distintos: «Hablemos», «Hablemos de tu caso», «Reserva Rumbo», «Reserva 30 minutos» y «Pide un ejemplo de programa».
   - La secundaria, «Diagnóstico en 3 minutos», sale con dos redacciones.
   - Propuesta: un solo verbo principal (**«Reserva 30 minutos»**), uno secundario (el diagnóstico) y uno específico por perfil.
9. **Hay que limpiar la consistencia ES/EN y el registro:**
   - se mezclan *tú* y *vosotros* (5 claves);
   - «alumnos» en ES frente a «people» en EN;
   - «you build» traduce «se construye» y cambia el sentido;
   - «Book Rumbo» no le dice nada a un lector inglés;
   - el antetítulo en inglés de la versión española;
   - «Diriges Personas», con mayúscula, al lado de «Diriges la compañía».
10. **La regla de cifras se cumple, con una excepción de espíritu.** «Casi tres de cada cuatro» (`reto.b2_p`) es una cifra escrita en letras para que el control del build no la vea. **Ninguna reescritura de este informe necesita cifras nuevas**: solo uso valores que ya están en `cifras.toml`. Las opcionales que sí las necesitarían están en la §8.

**Propuesta de H1** (detalle en la §6.1):
- **Recomendada:** «La IA ya está en tu empresa. Los resultados, todavía no.» / «AI is already in your company. The results aren't there yet.»
- **Alternativa** si el vídeo de fondo enseña personas trabajando: «El lunes, tu equipo trabajará de otra manera.»
- El H1 actual pasa a **firma de cierre** y a la imagen para compartir, donde su elegancia suma y para entonces el lector ya sabe qué es «desplegar».

---

## 1. Lo que el ICP necesita leer (marco de evaluación)

Resumen de `investigacion/02` (§6-8) y de R1 y R3, para no repetirlos.

| Perfil | Su tensión, en una frase | Qué necesita ver para pedir 30 minutos | Qué le espanta |
|---|---|---|---|
| **CEO / director general** | «He firmado las licencias. Si dentro de un año el consejo me pregunta qué ha cambiado, ¿qué le enseño?» (02 §6.2). El 56 % de los CEO no ve aún ni más ingresos ni menos costes ([PwC, enero de 2026](https://ideas.pwc.es/archivos/20260123/los-ceo-y-los-retornos-desiguales-de-momento-de-la-ia/)) | Qué hacéis, en una pantalla y sin jerga; resultados con nombre; un primer paso acotado; un «por qué vosotros» en tres líneas; caras de un equipo, no de una persona | La jerga, el «otro piloto bonito» y depender de un proveedor pequeño (02 §6.5) |
| **Dirección de Personas (y L&D)** | «Te piden productividad. Tu gente te pide rumbo.» El 74 % de los usuarios de IA en España teme quedarse atrás y solo el 22 % ve una estrategia clara de su dirección ([Microsoft, 23-jul-2026](https://news.microsoft.com/source/emea/2026/07/ia-capacidades-profesionales-espanoles-2026/?lang=es)) | Cómo se lleva el cambio, uso medido después del curso, transparencia con la plantilla y la RLT, el art. 4 contado con sobriedad, y material para defender la compra ante el comité | Que la IA se lea como recorte y el «curso hecho, nada cambia» |
| **CTO / CIO** | «Otra demo que luego me toca mantener a mí.» Cuando la compra incluye IA generativa, el grupo de compra se duplica ([Forrester 2026](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/), vía R3 §1.1). Solo el 24 % de los comités sabe quién responde de los agentes ([Gartner, 6-oct-2026](https://www.gartner.com/en/newsroom/press-releases/2026-10-6-gartner-says-chros-top-priorities-for-2027-focus-on-meeting-ceos-expectations-while-minimizing-organizational-risk), nivel S) | Dónde viven los datos, qué herramientas, quién mantiene lo construido, cómo se prueba antes de usarlo y cómo se gana autonomía | La caja negra, la dependencia y que el negocio construya «en la sombra» |

**El criterio de tono que pidió el cliente, traducido a reglas** [Opinión]:
- **«A lo Monge Malo».** Isra Bravo escribe en respuesta directa: frases cortas, de tú, como se habla, con una verdad incómoda por delante y una sola acción al final [no verificado en esta sesión]. En una boutique de clase eso se traduce en provocar con hechos y consecuencias, no con adjetivos. Sin exclamaciones, sin escasez inventada y sin miedo al empleo.
- **«Estilo Apple»**, según los análisis de su copy citados en R2 §5.1 ([Enchanting Marketing](https://www.enchantingmarketing.com/write-like-apple/), [Neil Patel](https://neilpatel.com/blog/write-copy-like-apple/)):
  - una idea por titular;
  - frases de 12 palabras o menos en titulares y subtítulos;
  - el beneficio primero;
  - el dato técnico solo cuando da credibilidad.
- **«Idioma de negocio».** El sujeto es la empresa del lector. Los verbos hablan de resultado: rendir, decidir, medir, crecer. La tecnología aparece después y siempre con una definición de una línea.

---

## 2. Diagnóstico global

### 2.1 La prueba de los 5 segundos (hero actual)

| Pregunta del directivo | ¿Lo responde el hero de hoy? | Por qué |
|---|---|---|
| ¿Qué hacéis? | A medias | El H1 es una tesis abstracta. La respuesta está en un subtítulo de 30 palabras (8 + 22), y la segunda frase mete «agentes de IA que hacen tareas enteras» |
| ¿Para quién? | Sí | Los accesos «Empieza por lo tuyo · Diriges la compañía / Personas / Formación» funcionan muy bien. Falta Tecnología |
| ¿Por qué vosotros? | No | El diferencial («venimos de la consultoría estratégica») está en `pq.i1`, en la sección 9 de 12 |
| ¿Por qué ahora? | Poco | La urgencia está en la película de la derecha, que en el nuevo hero pasa a un modal, y en «El reto», más abajo |
| ¿Quién más confía? | Sí | 50.000 y 12 logos. Es la parte más fuerte de la portada |
| ¿Qué hago ahora? | Dudoso | Dos botones con el mismo peso. El secundario tiene 8 palabras y se parte en dos líneas en móvil (R2 §7.5) |
| ¿Se lee en español? | No del todo | Antetítulo «Spiralia AI · AI adoption, end-to-end.» y lema de la película en inglés |

### 2.2 Longitud: qué ocupa cada bloque (medición propia)

| Bloque | Palabras | Pantallas en escritorio (1440×900) | Pantallas en móvil (390×844) | Veredicto |
|---|---|---|---|---|
| Portada | 77 | 1,0 | 1,8 | Reescribir y aligerar |
| El reto | 302 | 2,1 | 2,2 | Recortar a la mitad |
| Remate | 11 | 0,4 | 0,3 | Mantener uno |
| Cómo trabajamos · SPIRAL | 410 | 2,5 | 3,5 | Contarlo en tres actos; SPIRAL, en un desplegable |
| Formatos | 162 | 1,3 | 2,1 | Fusionar con el bloque «El primer paso» |
| Personalización | 237 | 1,4 | 2,3 | Fusionar con «Lo que construimos» en «Así se ve» |
| Lo que construimos | 434 | 2,6 | **5,3** | Fusionar, quitar duplicados, pasar el control a Tecnología |
| Para ti | 156 (una pestaña) | 1,2 | 1,6 | Mantener con 3 pestañas (Compañía, Personas y Formación, Tecnología) |
| Pruebas | 262 | 1,5 | 2,7 | Mantener; quitar los huecos de testimonios |
| Quiénes somos | 180 | 1,0 | 1,6 | Pasar de cinco puntos a tres, más el equipo |
| Diagnóstico | 31 | 0,9 | 0,7 | Mantener y afinar el marco «¿en qué lado estás?» |
| Preguntas | 42 (cerradas) | 0,8 | 0,9 | Añadir dos preguntas (CTO y CFO) |
| Cierre | 98 | 1,0 | 1,1 | Reescribir |
| **Total** | **≈2.440** | **18,0** | **26,7** | **Objetivo: 1.400-1.600 palabras y 11-12 pantallas en escritorio** [Opinión] |

**Por qué recortar** [Opinión]:
- Un directivo escanea; no lee.
- Según NN/g, en una página media se leen como mucho entre el 20 % y el 28 % de las palabras ([How Little Do Users Read?](https://www.nngroup.com/articles/how-little-do-users-read/)) [no verificado en esta sesión].
- Con 2.440 palabras, eso deja leídas entre 500 y 700. Hoy no hay forma de saber cuáles serán. La estructura tiene que garantizar que esas 500 sean los titulares, las cifras y los CTA.

**Lo que sobra o se repite:**
- **La visita bancaria, dos veces:** en la demo `[[data.demo]] id="banca"` y en `fde.c2_*`.
- **El 50.000, cuatro veces:** `hero.proof_*`, `pq.i3h`, el cartel de la película y la meta descripción. Basta con la franja de prueba y la meta.
- **La personalización por perfil, tres veces:** `como.s_p`, `pers.lead` y `pq.i4`. Además va en `pt.t3_1`.
- **El FDE, definido tres veces:** `como.fde`, `fde.def` y `fmt.d_que`.
- **«Nos quedamos hasta que funciona», tres veces:** `reto.remate_b`, `pq.i5h` y el remate de la espiral (`como.remate_*`).
- **El párrafo de BCG** (`reto.b3_p` y `src3`), que repite el mensaje del viernes y el lunes con un tercer estudio.
- **Las cuatro reglas de control** (`fde.ctl*`): son valiosas, pero para el CTO. Su sitio es la pestaña Tecnología y la FAQ.

### 2.3 Jerga: inventario y tratamiento

| Término | Dónde aparece hoy (claves ES) | ¿Lo entiende un CEO o un CHRO? | Tratamiento propuesto |
|---|---|---|---|
| **FDE / Forward Deployed Engineer** | `como.p_p`, `como.p_w`, `como.r_w`, `como.fde`, `fmt.d_que`, `fde.lead`, `fde.def_t`, `faq.a2`, `data.diag.n[Hábito]` | No | En el copy principal, **«un ingeniero de Spiralia»**. La sigla, una sola vez y definida, en el desplegable del método, en la pestaña Tecnología y en la FAQ. Las webs de referencia no titulan con «FDE» (`investigacion/01`, §D, «Patrones comunes») |
| **Agente(s)** | `meta.description`, `hero.sub`, `como.i_p`, `como.r_p`, `fmt.d_que`, `fde.duo_bt`, `fde.con`, `fde.c1_nt`, `fde.ctl3`, `pt.t2_3`, `data.diag.q[5]` | Poco (52 % entiende poco; BCG 2026) | Fuera del hero. En el copy general, **«herramientas de IA que hacen tareas enteras»**. «Agente» solo en «Así se ve», junto al ejemplo, con una línea de definición |
| **Skills** | `meta.description`, `como.r_p`, `fmt.d_que`, `fde.duo_bt`, `data.diag.q[5]` | No | Quitarlo del copy de negocio. En Tecnología y la FAQ: «el mejor método de la casa convertido en una herramienta que usa todo el equipo» (adaptado de 03, n.º 45) |
| **Despliegue / desplegar / se despliega** | `meta.title`, `meta.og_alt`, `hero.h1b`, `reto.b2_mid`, `fde.def`, `faq.a2` | Como sustantivo («despliegue de Copilot»), sí; como metáfora del H1, no | Mantenerlo en el `<title>` (lo buscan) y en la firma de cierre. Fuera del H1 |
| **SPIRAL** (siglas en inglés) | `como.kicker` y la plantilla (`<small lang="en">Skill…Launch</small>`) | No: las siglas no coinciden con «Formar, Emparejar, Decidir…» | Mantener SPIRAL como nombre del método, pero en un desplegable («Ver el método SPIRAL, paso a paso»). En el cuerpo, tres actos en español |
| **Rumbo** | `fmt.r_name`, `fmt.r_cta`, `pt.t1_1`, `pt.t1_cta`, `faq.a2` | Sí, si va con su descriptor | Siempre «Rumbo, 3 horas con tu comité». En EN, glosarlo la primera vez (§6.8) |
| **Champions** | `como.s_w`, `fmt.p_lleva`, `pt.t2_5` | El de RR. HH., sí; el CEO, regular | «personas de referencia en cada equipo» y, si hace falta, «(champions)» entre paréntesis una vez |
| **Inglés en la versión ES** | `hero.kicker` («AI adoption, end-to-end»), `como.fde`, `fde.def_t`, `pq.jose_r`, `cta.jose_cap`, el lema de `copy.js` | Rompe el «fácil de entender» | Español en ES. El lema inglés, solo en EN. El cargo de Jose se puede dejar en inglés si es su título oficial [Confirmar] |
| **KAM, HRIS, LMS, ERP, CRM** (en las demos) | `[[data.demo]]` y `fde.c*_w` | Son siglas del día a día de cada área; aceptables dentro de un ejemplo | Mantener (son realismo), pero no en titulares |

### 2.4 Urgencia y necesidad

- **Lo que funciona [Hecho]:**
  - la curva de uso que se enfría (NBER, con su fuente);
  - el contraste del 80 % frente al 6 % (McKinsey);
  - «El curso acaba el viernes. Lo que cuenta empieza el lunes.»;
  - la voz del CEO en la pestaña: «Si dentro de un año el consejo me pregunta…».
- **Lo que falla [Opinión]:**
  1. **La urgencia habla de «las empresas», no del lector.** Falta la consecuencia en segunda persona: el consejo, la competencia, el dinero de las licencias. La mejor frase de agitación de toda la página, «Si dentro de un año el consejo me pregunta qué ha cambiado», está escondida en la pestaña CEO. Tiene que subir a «Por qué ahora».
  2. **Formato de informe.** El reto tiene tres bloques con tres notas al pie (`src1`, `src2`, `src3`), que es como leer un *paper*. Basta con un estudio por idea y la fuente en letra pequeña.
  3. **El remate de urgencia está mal colocado.** «Cada trimestre cuenta.» (`cta.urg`) va debajo del aviso legal. Tiene que ser el H2 del cierre.
  4. **Falta la pregunta «¿en qué lado estás?».** El 6 % pide una pregunta así (R1 §3, mecanismo 1). El diagnóstico ya existe: basta con presentarlo así (§6.9).
- **Límites [Opinión, alineado con R1 §9 y R3 §12.3]:**
  - Nada del «95 % de los pilotos fracasa».
  - Nada de cuentas atrás ni plazas falsas.
  - Nada de multas exageradas del Reglamento de IA.
  - Nada de miedo al empleo, que espanta a RR. HH.

### 2.5 Visualización del éxito («estilo Apple»)

- **Lo que hay [Hecho]:** la demo por perfil (`[[data.demo]]`, antes y después, con «Tuyo: la conversación con Elena»), el caso animado de la propuesta comercial, el bloque «Lo que te llevas» de cada pestaña y la línea «Nuestro mejor resultado: equipos que ya no nos necesitan».
- **Lo que falla [Opinión]:**
  - La visualización está repartida en dos secciones con títulos de proceso («Personalización», «Lo que construimos»). Ninguna se titula con la escena de éxito.
  - Rumbo no dice con qué sale el comité: «Dónde entra la IA primero, qué se construye y cómo seguir solos» es abstracto.
  - El hero no pinta el «después».
- **Propuesta:**
  - Una sección **«Así se ve: un lunes cualquiera, con la IA trabajando»**, que fusiona demo y caso.
  - Un **«con qué sales»** concreto en Rumbo.
  - Un H1 que deje implícito el «todavía» (§6.1).

### 2.6 El diferencial: «hablamos el idioma del negocio»

- **[Hecho]** Es el H2 de «Quiénes somos» (`pq.h2a`), la sección 9 de 12, y lo demuestra un solo párrafo (`pq.i1`).
- **[Hecho]** El dúo «Negocio + Ingeniería, en la misma mesa» (`fde.duo_*`) es la demostración visual del diferencial, pero vive en la sección técnica, la del FDE.
- **[Opinión]** Se contradice con el registro. Las secciones 3 y 6, las más largas, hablan de agentes, skills, FDE y ciclos. Un lector que escanea concluye lo contrario de lo que se le dice.
- **Propuesta:**
  1. Subir el diferencial al hero, con una línea de prueba: «Venimos de la consultoría estratégica».
  2. Meter el dúo en el segundo acto de «Qué hacemos» («un consultor y un ingeniero de Spiralia»).
  3. Mantener el H2 de «Quiénes somos», con tres argumentos en lugar de cinco.
  4. Aplicar en toda la página la regla de escribir «resultado primero, tecnología después».
- **[Opinión, R1 §0.7]** Este diferencial no es exclusivo: PwC España lo dice casi igual. Gana quien lo demuestra con el pedigrí colectivo (McKinsey, KPMG, EY-Parthenon), la pareja de trabajo y casos contados con la cifra de negocio delante.

### 2.7 Prueba

- **Fuerte [Hecho]:**
  - ING: del 66 % al 92 %, y 4,7 frente a 3,2, con uso externo autorizado.
  - Deloitte: 13.000 personas en un mes y 3.000 managers.
  - CCEP: 218 casos.
  - 50.000 personas formadas y 12 logos.
  - La frase «Misma herramienta. Mismo grupo. La diferencia, la formación.» es de lo mejor de la página.
- **Débil o con riesgo:**
  - Los tres testimonios son `[PLACEHOLDER]`. Son el hueco más caro (R3 §0.3). **Si no hay citas reales y autorizadas, hay que quitar el bloque**, no dejar huecos.
  - Deloitte demuestra capacidad, no uso.
  - El uso público de sus cifras no consta autorizado: `investigacion/03`, §4.2, inconsistencia 5, dice «marca blanca desde el 2-sep» [Confirmar].
  - CCEP son casos identificados, no implantados. La web ya lo dice bien.
  - La galería de agentes es ilustrativa. Está etiquetada así, y debe seguir estándolo, porque un CEO que la confunda con casos reales y lo descubra pierde la confianza.
- **No hay prueba para el CTO.** No hay ninguna implantación con nombre. DVD Dental y Pefipresa son confidenciales (03 §4.1). Hace falta al menos una referencia anonimizada al estilo de Distyl, del tipo «empresa de distribución», con su sistema y un resultado [Confirmar].

### 2.8 Coherencia ES/EN y registro

| Problema | Dónde | Propuesta |
|---|---|---|
| Se mezclan *tú* y *vosotros* | `como.s_p` («ya tenéis»), `fmt.r_que` («vuestras», «vuestra»), `pt.t1_1` («sabéis»), `cta.lead` («dónde estáis»), `dg.mail_intro` («vuestra», que aquí es correcto porque se dirige a Spiralia). En `[data.diag]`, «¿Tenéis…?», «¿Habéis…?», «¿Cómo medís…?» | Regla: **tú al lector**, y «tu empresa / tu equipo / tu comité» para lo colectivo. Reescribir las preguntas del diagnóstico como «¿Tu empresa…?» |
| «alumnos» (ES) frente a «people» (EN) | `hero.proof_txt`, `pq.i3h`, `copy.js` (filas) | «personas formadas» / «people trained». Un comprador corporativo asocia «alumnos» a una escuela. Si los 50.000 incluyen alumnos de la UFV y de thePower, «personas formadas» sigue siendo cierto [Confirmar el desglose: 03 §4.1] |
| Cambio de sentido | `fde.h2b`: ES «se construye» / EN «you build» (sugiere que construye el cliente) | EN «we build» |
| Nombre sin glosa en EN | `fmt.r_name`, `fmt.r_cta` y `pt.t1_cta`: «Book Rumbo» | EN: «Rumbo, our 3-hour leadership session» la primera vez y «Request a Rumbo session» en el CTA |
| Antetítulo en inglés en ES | `hero.kicker` | «Spiralia AI · IA aplicada a negocio» |
| Mayúsculas | `hero.role2` y `pt.t2_tab`: «Diriges Personas» / «You lead People» | «Diriges Personas» se puede quedar si «Personas» es el nombre del área. Lo coherente con «la compañía» es «Diriges Personas y Formación». En EN: «You lead People & Learning» |
| Siglas SPIRAL en inglés dentro de la versión ES | Plantilla, sección `#como` | Ver §2.3 |
| Cifra en letras (espíritu de la regla) | `reto.b2_p`: «casi tres de cada cuatro» | Quitar la cifra: «Es que ha cambiado su forma de trabajar» |
| Lema en inglés en la película ES | `motion/film/copy.js`: `lema` | ES: «IA aplicada a negocio.» |

### 2.9 Cobertura del CTO/CIO

- **[Hecho]** No tiene pestaña ni prueba. Las únicas piezas que le hablan son:
  - `faq.q1/a1`: los datos no salen;
  - `faq.q3/a3`: con qué IA se trabaja;
  - `fde.ctl1-4`: control;
  - `como.a_*`: demostrar con casos reales.
- **[Hecho]** El *working tree* ya cambia los roles del hero a `negocio / personas / tecnologia`. Las pestañas de `#para-ti` siguen siendo `direccion / personas / formacion`, así que las anclas `#para-ti-negocio` y `#para-ti-tecnologia` del hero no tienen pestaña de destino [comprobar en la implementación].
- **[Opinión]** Basta con tres pestañas:
  1. **Diriges la compañía**;
  2. **Diriges Personas y Formación**, que fusiona CHRO y L&D (es el mismo centro de compra y lo financia RR. HH.; 02 §8.8);
  3. **Diriges Tecnología**, nueva.

  El copy completo de la tercera está en la §6.6. Además, dos preguntas nuevas en la FAQ (§6.10).
- **Por qué importa [Hecho, R3 §1.1]:**
  - Las iniciativas que lidera el CIO alcanzan consenso un 56 % más que las que lidera el CFO.
  - Tienen 2,2 veces más probabilidad de acabar en un buen acuerdo que las que lidera el CEO ([Gartner, *Tech Buying Behavior* 2026](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai)).
  - El CTO no siempre compra, pero puede vetar, y si se le convence acelera la decisión.

---

## 3. Auditoría sección a sección

Formato: qué dice → qué funciona → qué falla → veredicto. Las reescrituras están en la §6.

**00 · Barra (`[nav]`)**
- **Funciona:** pocas anclas, CTA a la derecha y cambio de idioma.
- **Falla:** «El reto» no le sirve como destino a un CEO. Falta «Resultados» (lo más buscado; R2 §8.1). «Hablemos» no coincide con el CTA del hero.
- **Veredicto:** «Por qué ahora · Resultados · Qué hacemos · Para ti · Quiénes somos» + [Reserva 30 minutos] o [Hablemos]. Coincide con lo que ya apunta el *working tree* (`nav.casos`).

**01 · Portada (`[hero]`)**
- **Funciona:** los accesos por perfil, la prueba (50.000 y logos) y el diagnóstico como segunda vía.
- **Falla:**
  - el H1 es una metáfora con jerga;
  - el subtítulo tiene 30 palabras y lleva «agentes»;
  - el antetítulo está en inglés;
  - no aparece el diferencial;
  - hay dos CTA con el mismo peso.
- **Veredicto:** reescribir (§6.1).

**02 · El reto (`[reto]`)**
- **Funciona:**
  - el H2 «Tener la IA no basta. El uso se enfría.» (claro y verificable);
  - el 80 % frente al 6 %;
  - «El curso acaba el viernes».
- **Falla:**
  - tres estudios seguidos, con tres notas;
  - `b2_mid`, «Entre una cifra y otra, el despliegue», es jerga;
  - falta la consecuencia para el lector;
  - el remate («No nos quedamos en la formación…») adelanta la solución antes de terminar el problema.
- **Veredicto:** recortar a un 50 %, renombrar el antetítulo como «Por qué ahora», subir la frase del consejo y dejar como único remate la del viernes y el lunes (§6.2).

**03 · Cómo trabajamos · SPIRAL (`[como]`)**
- **Funciona:**
  - «Del aula al trabajo real.»;
  - la lógica de «quién participa» y «lo que queda»;
  - «No todo necesita un agente.»;
  - «La confianza no se declara: se demuestra.»;
  - «Nuestro mejor resultado: equipos que ya no nos necesitan.»
- **Falla:**
  - Seis pasos, cada uno con tres textos: 18 bloques y 410 palabras.
  - Las siglas no coinciden en español.
  - El FDE aparece cuatro veces.
  - Para un CEO es demasiado proceso y demasiado pronto. Le basta saber que hay método, no recorrerlo.
- **Veredicto:** contarlo en **tres actos** (Formamos · Construimos · Te dejamos en marcha). La espiral y los seis pasos, en un desplegable para quien quiera el detalle: L&D y CTO (§6.3).

**04 · Formatos (`[fmt]`)**
- **Funciona:**
  - el formato con nombre, duración y entregable, que es el patrón que mejor vende (01 §E.2.3);
  - el H2 «Empieza en 3 horas. Sigue a tu ritmo.»
- **Falla:**
  - está en la posición 4, antes de que el lector sepa qué resultados da Spiralia;
  - una tabla de cuatro columnas para tres filas pesa mucho en móvil (2,1 pantallas);
  - el entregable de Rumbo es vago.
- **Veredicto:** fusionar con el bloque «El primer paso», después de las pruebas y las pestañas, justo antes del diagnóstico (§6.7).

**05 · Personalización (`[pers]`)**
- **Funciona:**
  - el H2 «Nadie adopta la IA con los ejemplos de otro.» es excelente;
  - «cada persona aprende con su lunes por la mañana»;
  - la demo y «Tuyo: la conversación con Elena» (la persona decide).
- **Falla:** el antetítulo «Personalización» describe un proceso, no un resultado. Repite lo que ya dicen `como.s_p` y `pq.i4`.
- **Veredicto:** fusionar con la sección 06 en **«Así se ve»** (§6.4).

**06 · Lo que construimos (`[fde]`)**
- **Funciona:**
  - el H2 «Si formar no basta, se construye.»;
  - el caso animado de la propuesta, con la línea «El agente prepara. Una persona decide.»;
  - el dúo negocio + ingeniería;
  - las reglas de control.
- **Falla:**
  - 434 palabras y 5,3 pantallas en móvil;
  - la caja de la definición del FDE, que es jerga como protagonista;
  - la tarjeta de banca duplica la demo;
  - las reglas de control son para el CTO y están en una sección de negocio.
- **Veredicto:**
  - el caso de la propuesta y dos tarjetas (Finanzas y Personas) van a «Así se ve»;
  - el dúo, al acto 2 y a «Quiénes somos»;
  - las reglas de control, a la pestaña Tecnología;
  - la definición del FDE, al desplegable y a la FAQ;
  - se quita la tarjeta c2 (banca).

**07 · Para ti (`[pt]`)**
- **Funciona:**
  - el H2 («Tu pregunta no es la del resto. Tu respuesta, tampoco.»);
  - la voz del lector entre comillas;
  - «Qué hacemos contigo», «Lo que te llevas» y «Ya lo hemos hecho»;
  - una prueba por perfil.

  Es la mejor sección de la página.
- **Falla:**
  - no hay pestaña de Tecnología;
  - Personas y Formación están separadas (cinco y cinco puntos) y se solapan;
  - en `t2_3` sale «agente»;
  - en `t1_1` sale «sabéis»;
  - cada pestaña lleva un CTA distinto («Reserva Rumbo», «Haz el diagnóstico», «Pide un ejemplo»), lo cual está bien, pero hay que alinearlo con el sistema de CTA.
- **Veredicto:** tres pestañas: Compañía, Personas y Formación, Tecnología (§6.6).

**08 · Pruebas (`[pr]`)**
- **Funciona:**
  - el H2 «No lo contamos. Ya lo estamos haciendo.»;
  - cada caso con cifra, fuente y fecha, que es el sello de rigor de la casa.
- **Falla:**
  - los `[PLACEHOLDER]`;
  - el antetítulo «Pruebas» suena a laboratorio.
- **Veredicto:**
  - antetítulo «Resultados»;
  - quitar los testimonios hasta tenerlos con permiso;
  - subirla a la posición 6.

**09 · Quiénes somos (`[pq]`)**
- **Funciona:**
  - el H2, que es el diferencial;
  - «Hemos estado al otro lado de la mesa.»;
  - «Sabemos explicar la IA sin humo.»
- **Falla:**
  - cinco puntos, tres de ellos repetidos (50.000, personalización, «construimos hasta que funciona»);
  - un equipo de dos personas con la biografía de Ana más larga.
- **Veredicto:** tres argumentos más la retícula del equipo (§4 y §6.5).

**10 · Diagnóstico (`[dg]`)**
- **Funciona:**
  - resultado sin pedir datos;
  - «Guárdalo para tu comité» (sirve para el *champion*);
  - la nota de honestidad («Orientativo…»).
- **Falla:**
  - no se presenta como la respuesta a «¿en qué lado estás?»;
  - las preguntas usan *vosotros* y jerga (pregunta 5);
  - «Envíanoslo» va al email de Ana.
- **Veredicto:** reenfocar el texto de entrada y despersonalizar el destinatario (§6.9).

**11 · Preguntas del comité (`[faq]`)**
- **Funciona:**
  - el título;
  - las seis preguntas, que son las del comité;
  - el artículo 4, contado con sobriedad.
- **Falla:**
  - no hay preguntas de CTO (integración y mantenimiento) ni de CFO (cómo se mide);
  - el fallo de la «á» en Butler deja en pantalla «¿Cu nto cuesta?» y «¿Con qué IA trabaj is?».
- **Veredicto:** añadir dos preguntas (§6.10).

**12 · Cierre (`[cta]`)**
- **Funciona:**
  - «Hablas con quien lo va a hacer» (la seniority es el activo de la boutique);
  - «¿Lo gestiona tu asistente?», un detalle de clase.
- **Falla:**
  - dos retratos con nombre (personalismo);
  - el email de Ana visible y en el aviso legal;
  - la urgencia, enterrada;
  - el H2 «Treinta minutos para saber por dónde empezar» repite el CTA.
- **Veredicto:** reescribir (§6.11).

---

## 4. Inventario exhaustivo de lo personalista de Ana Iza

Abarca el repo y la página generada. Las líneas de `src/index.template.html` son las del *working tree* del 19-oct, que otra línea está editando y pueden moverse; la búsqueda `grep -n "ana\|{{mail}}"` las localiza.

### 4.1 Visible en la página (ES y EN)

| # | Qué | Fichero · clave o línea | Cómo se ve | Propuesta |
|---|---|---|---|---|
| 1 | Foto de Ana en «Quiénes somos» | `src/index.template.html` ~l. 409 (`assets/img/ana-iza.jpg`) | Primer retrato del equipo | Retícula de 4-6 personas del mismo tamaño, ordenadas por función en el método, no por jerarquía. Ana es una más |
| 2 | Nombre, cargo y biografía de Ana | `src/content.toml` · `[pq] ana_n`, `ana_r`, `ana_b` (ES y EN) | La biografía más larga (unas 30 palabras frente a 22 de la de Jose) y la primera | Biografías de 12-15 palabras e iguales para todos: «Ana Iza · CEO y cofundadora · Ex-McKinsey. Doctora en Economía (UCM) y Executive MBA (IE).» |
| 3 | Foto de Ana en el cierre | Plantilla ~l. 458 · `[cta] ana_cap` | Retrato junto a «Hablas con quien lo va a hacer»: sugiere que la CEO hará el trabajo en persona | Quitar los retratos del cierre. Poner una imagen de sesión o de equipo (o el mismo vídeo del hero, R2 §8.2) y «Hablas con el equipo que lo va a hacer» |
| 4 | Email de Ana visible y copiable | Plantilla ~l. 466-467 · `{{mail}}` ← `build.py` l. 18 `MAIL = 'ana.iza@spiralia.es'` · texto `[cta] asist` | «¿Lo gestiona tu asistente? Escribe a ana.iza@spiralia.es» | Buzón de equipo: `ia@spiralia.es` o `hola@spiralia.es` [Confirmar]. Mantener el texto «¿Lo gestiona tu asistente?» |
| 5 | Email de Ana en el aviso legal | `[cta] legal` (ES y EN): «Puedes ejercer tus derechos escribiendo a ana.iza@spiralia.es» | Mezcla la privacidad con el correo personal de la CEO | Usar el buzón de privacidad que figure en la política de spiralia.es [Confirmar cuál es] |
| 6 | «Pide un ejemplo de programa» → email de Ana | Plantilla ~l. 349 (`mailto:{{mail}}?subject=…`) | Invisible hasta que se pulsa | Buzón de equipo |
| 7 | «Envíanoslo» (resultado del diagnóstico) → email de Ana | Plantilla ~l. 425 (`data-mail="{{mail}}"`) → `src/js/diagnostico.js` l. 48 | Invisible hasta que se pulsa | Buzón de equipo |
| 8 | Aviso `noscript` del diagnóstico | Plantilla ~l. 430 | Muestra el email de Ana | Buzón de equipo |
| 9 | Reserva → agenda de Ana | `build.py` l. 17 (`BOOKINGS = '[BOOKINGS_URL]'  # página de Microsoft Bookings de Ana`) | Todas las reservas (`reserva/?d=…`) caen en la agenda de Ana | Página de Bookings «Spiralia AI» con **varios anfitriones**: CEO y comité, Personas y Formación, Tecnología. Que Bookings lo permita en el plan de Spiralia está [no verificado] (R2 §8.2) |
| 10 | Página `reserva/` de respaldo | `build.py` l. 101-105 (`FALLBACK` y el texto «escribe a {mail}») | Si no hay Bookings, abre un email a Ana y muestra su dirección | Se arregla al cambiar `MAIL` |

**Recuento en `dist/index.html`:**
- **8 apariciones** de `ana.iza@spiralia.es` en 6 sitios: el `data-mail` del diagnóstico, el aviso `noscript` (enlace y texto), el *mailto* de L&D, el bloque «¿Lo gestiona tu asistente?» (enlace, texto visible y botón de copiar) y el aviso legal.
- **2 apariciones** de `ana-iza.jpg`.
- **3 apariciones** de «Ana Iza».
- Más **2** en `dist/reserva/index.html`.

### 4.2 Implícito en el copy (personalismo por asociación)

| # | Qué | Clave | Problema | Propuesta |
|---|---|---|---|---|
| 11 | «Hablas con quien lo va a hacer» + dos caras | `[cta] h2a` y la plantilla del cierre | Con dos retratos, parece que la empresa son dos personas: el miedo del CEO a depender de un proveedor pequeño (02 §6.5) | «Hablas con el equipo que lo va a hacer», sin retratos |
| 12 | «Sin intermediarios ni juniors: las mismas personas que diseñan y hacen tu programa» | `[cta] lead` | Buena promesa de seniority, pero junto a dos nombres reduce la escala percibida | Se mantiene la idea, pero con el sujeto «el equipo» y la retícula de «Quiénes somos» como respaldo |
| 13 | «Lleva más de una década al frente de Spiralia» | `[pq] ana_b` | Antigüedad personal; habla de Ana, no de lo que gana el cliente | Pasar la antigüedad a la marca: «Spiralia lleva más de una década…». Si se quiere usar, la cifra tiene que entrar en `cifras.toml` [Confirmar] |

### 4.3 Fuera de la página (repo y documentación)

| # | Fichero | Qué | Propuesta |
|---|---|---|---|
| 14 | `src/cifras.toml` l. 104 | `que = "Duración de la conversación con Ana (minutos)"` | «Duración de la conversación inicial con el equipo (minutos)» |
| 15 | `FUENTES.md` l. 23 | Generado desde el n.º 14 | Se regenera con `python3 build.py` |
| 16 | `LEEME.md` l. 84-85 | «Equipo: Ana (biografía combinada) y Jose» · «La reserva sigue yendo a la agenda de Ana» | Actualizar: equipo plural, buzón y agenda de equipo |
| 17 | `assets/img/ana-iza.jpg` | Retrato | Se queda en la retícula del equipo, al mismo tamaño que los demás |
| 18 | `investigacion/03` §5 | Biografías internas | Interno, no se publica; no hace falta tocarlo |
| 19 | `motion/film/copy.js`, `motion/og/` y `assets/og-*.jpg` | Revisados: **sin referencias a Ana** [Hecho] | — |

### 4.4 Cómo despersonalizar sin perder la cercanía de boutique [Opinión]

La queja no se resuelve borrando a Ana, sino pasando de un solista a un coro (R3 §3.2).

1. **El sujeto de la página es Spiralia o «el equipo».** «Formamos», «construimos», «el equipo de Spiralia AI». No hay ninguna primera persona del singular en la página, y así debe seguir.
2. **Pedigrí colectivo en lugar de biografía individual.** «Venimos de McKinsey, KPMG y EY-Parthenon. Enseñamos IA en la universidad.» Es lo que hacen Distyl (talento de Palantir, Google DeepMind y NASA) y BCG X (R1 §0.8).
3. **Una retícula del equipo con 4-6 personas y su papel en el método:**
   - estrategia y comité de dirección;
   - adopción y formación;
   - ingeniería y despliegue;
   - dirección de programas;
   - a ser posible, un FDE o un profesor de la UFV.

   Hay candidatos con biografía ya escrita en 03 §5: Ignacio Corroto (Strategy Consulting, ex-KPMG) y Pedro Valero (Head of AI Deployment, solo en KPMG-web) [Confirmar quién sale y con qué título].
4. **Canales de equipo:** buzón `ia@spiralia.es` y Bookings de equipo con varios anfitriones.
5. **La cercanía se mantiene con estos detalles:**
   - «¿Lo gestiona tu asistente?»;
   - «Hablas con el equipo que lo va a hacer»;
   - en la confirmación de la reserva, el nombre de quién asistirá. Esto ya es fuera de la web y es la cercanía que de verdad cuenta.
6. **En LinkedIn, varias voces que suman a la marca** (R3 §3.2): Ana para CEOs, Jose para Personas y L&D, y un ingeniero o un profesor para el CTO, todos firmando «… en Spiralia».

---

## 5. Nueva arquitectura narrativa

**Arco [Opinión]:** gancho → prueba → por qué ahora (problema + agitación) → qué hacemos (la solución en tres actos) → así se ve (visualización) → resultados (prueba) → para ti (por perfil) → quiénes somos (diferencial + equipo) → el primer paso (Rumbo) → diagnóstico (bajo compromiso) → preguntas del comité (objeciones) → cierre (urgencia + acción).

| # | Sección nueva (id) | Sale de (claves actuales) | Qué se fusiona, recorta o quita | Palabras objetivo | Pantallas objetivo (escritorio) |
|---|---|---|---|---|---|
| 01 | **Portada** (`#top`) | `hero.*` | H1 nuevo, subtítulo de 19 palabras, 1 CTA, 1 enlace y microcopia. La película pasa a un modal (`hero.film_btn`) | 45 | 1 |
| 01b | **Franja de prueba** | `hero.proof_*`, logos y `hero.roles` | Tres cifras + logos + «¿Qué diriges?» con 3 accesos | 35 | 0,5 |
| 02 | **Por qué ahora** (`#por-que`, antes `#reto`) | `reto.*` | Se quedan la curva, el 80/6 y la frase del consejo. Se quitan `b3_*` (BCG) y `b2_mid`. Un solo remate: viernes y lunes | 140 | 1,8 |
| 03 | **Qué hacemos** (`#como`) | `como.*` y `fde.duo_*` | Tres actos. SPIRAL y la espiral, en un desplegable. El dúo entra en el acto 2 | 160 (+ 300 plegadas) | 1,3 |
| 04 | **Así se ve** (`#asi-se-ve`) | `pers.*`, `fde.c1_*`, `fde.c3_*` y `fde.c4_*` | Demo por perfil + caso de la propuesta + 2 tarjetas. Se quita `fde.c2_*`. `fde.def*` va al desplegable y a la FAQ; `fde.ctl*`, a Tecnología | 260 | 2,5 |
| 05 | **Resultados** (`#pruebas`) | `pr.*` | Antetítulo «Resultados». Sin testimonios hasta tenerlos | 200 | 1,3 |
| 06 | **Para ti** (`#para-ti`) | `pt.*` + `fde.ctl*` | 3 pestañas: Compañía · Personas y Formación · Tecnología | 150 por pestaña | 1,2 |
| 07 | **Quiénes somos** (`#quienes`) | `pq.*` | 3 argumentos (antes 5) + retícula del equipo | 150 | 1,1 |
| 08 | **El primer paso** (`#empieza`, antes `#formatos`) | `fmt.*` | Rumbo destacado, con «con qué sales», y dos líneas para el resto de formatos | 100 | 0,9 |
| 09 | **Diagnóstico** (`#diagnostico`) | `dg.*` | Marco «¿en qué lado estás?» | 40 | 0,9 |
| 10 | **Preguntas del comité** (`#preguntas`) | `faq.*` | +2 preguntas (CTO y CFO) | 60 (cerradas) | 0,9 |
| 11 | **Cierre** (`#hablemos`) | `cta.*` | H2 de urgencia, sin retratos, buzón de equipo y firma de marca | 70 | 0,9 |
| — | **Total** | | | **≈1.410-1.560** | **≈11,5-12,5** |

**Por qué este orden** [Opinión]:
- **Resultados antes que «Para ti».** Un CEO necesita ver prueba antes de leer qué hacemos con él. La franja de la portada adelanta la prueba y la sección 05 la desarrolla.
- **«Quiénes somos» después de «Para ti».** El diferencial ya ha aparecido tres veces antes: en la línea de prueba del hero, en el acto 2 (consultor + ingeniero) y en el registro de toda la página. Aquí solo se remata con el equipo.
- **El primer paso al final, justo antes del diagnóstico.** Así la página termina con una escalera de compromiso de alto a bajo: Rumbo → 30 minutos → diagnóstico. Es el «compromiso y coherencia» de R3 §12.3.
- **Lo que cambia en la plantilla:**
  - fusionar `#personalizacion` y `#construimos` en `#asi-se-ve`;
  - mover `#formatos` como `#empieza`;
  - pasar las pestañas a `negocio / personas / tecnologia`, coherentes con los accesos del hero en el *working tree*.

---

## 6. Reescrituras concretas (ES + EN)

**Reglas que cumplen todas** [Opinión]:
- Titulares de 12 palabras o menos por frase.
- Tú al lector.
- Ninguna sigla sin definir.
- Sin exclamaciones.
- **Ninguna cifra que no esté ya en `cifras.toml`.** Valores usados: 50.000, 66, 92, 4,7, 3,2, 13.000, 3.000, 218, 80, 6, 5, 7.137, 55, 40, 3, 30 y 20.
- Las mismas cifras en ES y EN, como exige el build.

### 6.1 Portada (`[hero]` y `[nav]`)

**H1: tres opciones, por orden de recomendación.**

| Opción | ES (`h1a` / `h1b`) | EN (`h1a` / `h1b`) | Palanca | Cuándo |
|---|---|---|---|---|
| **A · recomendada** | «La IA ya está en tu empresa.» / «Los resultados, todavía no.» | «AI is already in your company.» / «The results aren't there yet.» | Brecha + urgencia + éxito implícito en el «todavía». Habla al CEO, que es quien firma | Por defecto |
| B | «El lunes, tu equipo» / «trabajará de otra manera.» | «On Monday, your team» / «will work differently.» | Visualización pura. Enlaza con «el curso acaba el viernes» | Si el vídeo de fondo enseña personas trabajando (R1 §10, opción B) |
| C | «IA que se nota» / «en la cuenta de resultados.» | «AI that shows» / «on your P&amp;L.» | Diferencial de negocio | Si se prefiere titular con el diferencial |

**El H1 actual** («La inteligencia se compra. La ventaja se despliega.») **pasa a firma**: última línea del cierre, `meta.og_alt` e imagen para compartir. Regenerar `assets/og-*.jpg` desde `motion/og/` si cambia el H1.

```toml
[hero]
kicker = {es = "Spiralia AI · IA aplicada a negocio", en = "Spiralia AI · AI applied to business"}
h1a = {es = "La IA ya está en tu empresa.", en = "AI is already in your company."}
h1b = {es = "Los resultados, todavía no.", en = "The results aren't there yet."}
sub = {es = "Formamos a tu gente con su propio trabajo y construimos con tus equipos hasta que la IA da resultados.", en = "We train your people on their own work and build with your teams until AI delivers results."}
cta1 = {es = "Reserva 30 minutos", en = "Book 30 minutes"}
micro = {es = "Con el equipo que lo haría. Sin compromiso.", en = "With the team that would do the work. No commitment."}
cta2 = {es = "O haz el diagnóstico en 3 minutos", en = "Or take the 3-minute assessment"}
film_btn = {es = "Ver la película · 20 s", en = "Watch the film · 20 s"}
roles = {es = "¿Qué diriges?", en = "What do you lead?"}
role1 = {es = "La compañía", en = "The company"}
role2 = {es = "Personas y Formación", en = "People &amp; Learning"}
role3 = {es = "Tecnología", en = "Technology"}
proof_pre = {es = "Más de", en = "More than"}
proof_num = {es = "50.000", en = "50,000"}
proof_txt = {es = "personas formadas en IA aplicada a negocio", en = "people trained in AI applied to business"}
proof_why = {es = "Venimos de la consultoría estratégica: hablamos de negocio, no de tecnología.", en = "We come from strategy consulting: we talk business, not technology."}   # clave nueva
logos = {es = "Hemos trabajado con equipos de", en = "We have worked with teams at"}
```

- **Subtítulo:** 19 palabras en ES y 17 en EN, por debajo del máximo de 20 de R2 §7.5.
- **`proof_why`** es la línea que sube el diferencial al primer pliegue. Va en la franja de prueba, junto al 50.000.
- **Franja de prueba, tres cifras** (todas en `cifras.toml`; Deloitte, a falta de [Confirmar] su autorización pública):
  - «Más de 50.000 personas formadas»;
  - «ING España · del 66 % al 92 % de uso semanal»;
  - «Deloitte España · 13.000 personas en un mes».

```toml
[nav]
reto = {es = "Por qué ahora", en = "Why now"}
casos = {es = "Resultados", en = "Results"}
como = {es = "Qué hacemos", en = "What we do"}
parati = {es = "Para ti", en = "For you"}
quienes = {es = "Quiénes somos", en = "Who we are"}
cta = {es = "Hablemos", en = "Let's talk"}
close = {es = "Cerrar", en = "Close"}

[meta]
title = {es = "Spiralia AI · Formación y despliegue de IA para empresas", en = "Spiralia AI · AI training and deployment for companies"}
description = {es = "Formamos a tu gente con su propio trabajo y construimos con tus equipos hasta que la IA da resultados. Más de 50.000 personas formadas.", en = "We train your people on their own work and build with your teams until AI delivers results. More than 50,000 people trained."}
og_alt = {es = "La inteligencia se compra. La ventaja se despliega. Spiralia AI.", en = "Intelligence is bought. Advantage is deployed. Spiralia AI."}
```

Sobre `meta`: se mantiene «despliegue» en el `<title>`, porque es la palabra que se busca, y se quitan «agentes y skills» del fragmento que se ve en el buscador.

### 6.2 Por qué ahora (`[reto]`)

| Clave | ES | EN |
|---|---|---|
| `kicker` | Por qué ahora | Why now |
| `h2a` / `h2b` | Tener la IA no basta. / El uso se enfría. *(se mantiene)* | Having AI is not enough. / Usage cools off. |
| `lead` | Llegan las licencias, el curso entusiasma y, a las pocas semanas, cada uno vuelve a lo de siempre. En un experimento con 7.137 personas, el uso semanal tocó techo en el 55 % y acabó por debajo del 40 %. | The licenses arrive, the course inspires and, a few weeks later, everyone goes back to the old way. In an experiment with 7,137 people, weekly use peaked at 55% and ended below 40%. |
| `b2a` / `b2b` | La IA ya está en todas las mesas. / En la cuenta de resultados, casi en ninguna. *(se mantiene)* | AI is already on every desk. / On the P&amp;L, almost nowhere. |
| `b2_mid` | Entre una cifra y otra, la forma de trabajar. | Between the two figures: the way work gets done. |
| `b2_p` | Lo que separa a ese 6 % no es la herramienta. Es que ha cambiado su forma de trabajar. | What sets that 6% apart is not the tool. It's that they have changed the way they work. |
| `agita` *(nueva; sustituye a `b3_*`)* | Dentro de un año, tu consejo te preguntará qué ha cambiado. Mejor tener la respuesta antes que la pregunta. | A year from now, your board will ask what has changed. Better to have the answer before the question. |
| `remate_a` / `remate_b` | El curso acaba el viernes. / Lo que cuenta empieza el lunes. | The course ends on Friday. / What counts starts on Monday. |

- **Se quitan:** `b3_a`, `b3_b`, `b3_p` y `src3`. El dato de BCG (66 % sin orientación) se puede reutilizar como prueba en la pestaña de Personas, si se quiere conservar.
- **Se mueven:** `remate_a/b` actuales («No nos quedamos en la formación…») pasan a ser el H2 de «Qué hacemos».
- **La frase del consejo** es la versión en segunda persona de `pt.t1_voz`. En la pestaña CEO se mantiene la voz entre comillas.

### 6.3 Qué hacemos (`[como]`)

| Clave | ES | EN |
|---|---|---|
| `kicker` | Qué hacemos | What we do |
| `h2a` / `h2b` | Formamos. Construimos. / Y nos quedamos hasta que funciona. | We train. We build. / And we stay until it works. |
| `lead` | Sin teoría de manual ni proyectos eternos: cada paso deja algo funcionando en tu empresa. | No textbook theory, no never-ending projects: every step leaves something working in your company. |
| `a1_t` *(nueva)* | Formamos a cada persona con su trabajo. | We train every person on their own work. |
| `a1_p` | Del comité de dirección a la primera línea, cada perfil aprende con sus tareas, sus archivos y la IA que ya tiene tu empresa. | From the leadership team to the front line, every profile learns with their own tasks, their own files and the AI your company already has. |
| `a2_t` | Construimos con tus equipos. | We build with your teams. |
| `a2_p` | Un consultor y un ingeniero de Spiralia se sientan con quien mejor conoce cada proceso. Juntos construyen herramientas de IA que hacen tareas enteras. Lo importante lo sigue decidiendo una persona. | A Spiralia consultant and engineer sit down with the people who know each process best. Together they build AI tools that handle entire tasks. A person still decides what matters. |
| `a3_t` | Te dejamos en marcha. | We leave you running on your own. |
| `a3_p` | Cada solución queda con un responsable, su manual y un equipo capaz de mantenerla. Nuestro mejor resultado: equipos que ya no nos necesitan. | Every solution is left with an owner, a manual and a team able to maintain it. Our best result: teams that no longer need us. |
| `more` *(botón del desplegable)* | Ver el método SPIRAL, paso a paso | See the SPIRAL method, step by step |
| `fde` *(dentro del desplegable)* | Al ingeniero que se sienta con tu equipo y construye allí mismo se le llama FDE (<span lang="en">Forward Deployed Engineer</span>). | The engineer who sits with your team and builds right there is called an FDE (Forward Deployed Engineer). |

- **Dentro del desplegable** se mantienen los seis pasos actuales (`s_*` … `l_*`), con dos cambios:
  - `s_p`: «la IA que ya tenéis» → «la IA que ya tiene tu empresa»;
  - las siglas en inglés de la plantilla (`<small lang="en">`), solo en la versión EN, o eliminadas.
- **[Confirmar]** que el segundo acto es fiel: que el despliegue lo hacen un consultor y un ingeniero juntos. Es lo que da a entender el dúo de `fde.duo_*`.

### 6.4 Así se ve (fusión de `[pers]` y `[fde]`)

| Clave | ES | EN |
|---|---|---|
| `kicker` | Así se ve | What it looks like |
| `h2a` / `h2b` | Un lunes cualquiera, / con la IA trabajando. | An ordinary Monday, / with AI at work. |
| `lead` | Antes de la primera sesión recogemos las tareas, los documentos y la jerga de cada perfil. Así cada persona aprende con su lunes por la mañana. Por eso se queda. *(se mantiene `pers.lead`)* | Before the first session we collect each profile's tasks, documents and jargon. So everyone learns with their own Monday morning. That's why it sticks. |
| `h3_fde` | Y cuando formar no basta, construimos. | And when training isn't enough, we build. |
| `agent_def` *(nueva)* | Agente: una herramienta de IA que hace una tarea de varios pasos y se detiene donde decide una persona. | Agent: an AI tool that carries out a multi-step task and stops where a person decides. |
| `firma` *(línea final)* | La IA prepara. Una persona decide. | AI prepares. A person decides. |

- **Se mantienen:**
  - la demo por perfil, con la etiqueta «Ejemplo ilustrativo»;
  - el caso `c1_*` (la propuesta comercial), con la etiqueta «Ejemplos ilustrativos»;
  - las tarjetas `c3_*` (Finanzas) y `c4_*` (Personas).
- **Se quitan:**
  - `c2_*` (banca), porque duplica la demo;
  - `def_t` y `def`, que van al desplegable y a la FAQ;
  - `duo_*`, que van a «Qué hacemos» y a «Quiénes somos»;
  - `ctl_*`, que van a la pestaña Tecnología.
- **En el caso de la propuesta,** `c1_nt` («El agente prepara. Una persona decide.») funciona después de `agent_def`. Hay que poner la definición antes del caso.

### 6.5 Resultados (`[pr]`)

| Clave | ES | EN |
|---|---|---|
| `kicker` | Resultados | Results |
| `h2a` / `h2b` | No lo contamos. / Ya lo estamos haciendo. *(se mantiene)* | We don't just say it. / We're already doing it. |
| `ing_h` | Misma herramienta. Mismo grupo. La diferencia, la formación. *(se mantiene)* | Same tool. Same group. The difference: the training. |
| `del_h` | 13.000 personas en un mes, cada área con sus casos. *(se mantiene)* | 13,000 people in one month, each area with its own cases. |
| `cc_h` | Los casos los encuentran los propios equipos. *(se mantiene)* | The use cases are found by the teams themselves. |
| `tst_*` | **Quitar el bloque** hasta tener citas con nombre, cargo y permiso. Cuando las haya, una o dos frases que hablen de resultado, no de satisfacción. | Same. |

### 6.6 Para ti (`[pt]`): tres pestañas

`h2a` / `h2b` se mantienen: «Tu pregunta no es la del resto. / Tu respuesta, tampoco.»

**Pestaña 1 · Diriges la compañía** (`#para-ti-negocio`). Cambios mínimos:

| Clave | ES | EN |
|---|---|---|
| `t1_tab` | Diriges la compañía | You run the company |
| `t1_h` | Has invertido en IA. Que se note en la cuenta. *(se mantiene)* | You've invested in AI. Make it show on the P&amp;L. |
| `t1_1` | Empezamos por tu comité: con Rumbo, en 3 horas, sabes dónde entra la IA primero. | We start with your leadership team: with Rumbo, in 3 hours, you know where AI comes in first. |
| `t1_2` | Elegimos los casos por su valor, en eficiencia y en crecimiento. La eficiencia tiene techo; el crecimiento, no. | We choose cases by their value, in efficiency and in growth. Efficiency has a ceiling; growth doesn't. |
| `t1_4` | Diseñamos contigo quién propone, quién decide y quién responde de cada uso de la IA. | We design with you who proposes, who decides and who answers for each use of AI. |
| `t1_cta` | Quiero una sesión Rumbo | Request a Rumbo session |

**Pestaña 2 · Diriges Personas y Formación** (`#para-ti-personas`). Fusiona `t2_*` y `t3_*`:

| Clave | ES | EN |
|---|---|---|
| `t2_tab` | Diriges Personas y Formación | You lead People &amp; Learning |
| `t2_h` | Te piden productividad. Tu gente te pide rumbo. *(se mantiene)* | They ask you for productivity. Your people ask you for direction. |
| `t2_voz` | «¿Cómo lo hago sin que la plantilla lo viva como una amenaza? ¿Y cómo demuestro que ha servido?» | “How do I do this without the workforce seeing it as a threat? And how do I prove it worked?” |
| `t2_1` | Formamos a todos, del comité a la primera línea, cada perfil con su propio trabajo. | We train everyone, from the leadership team to the front line, each profile on their own work. |
| `t2_2` | Damos al programa nombre, marca y una credencial que cada persona enseña en LinkedIn. *(se mantiene)* | We give the program a name, a brand and a credential everyone can show on LinkedIn. |
| `t2_3` | Te ayudamos a contarlo a la plantilla y a sus representantes, con transparencia. | We help you explain it to the workforce and its representatives, transparently. |
| `t2_4` | Medimos el uso real, no solo las horas y la satisfacción. Y lo dejamos documentado, como pide el Reglamento europeo de IA. | We measure real usage, not just hours and satisfaction. And we document it, as the EU AI Act requires. |
| `t2_5` | Personas de referencia en cada equipo y una comunidad, para que el hábito no dependa de nosotros. | Go-to people in every team and a community, so the habit doesn't depend on us. |
| `t2_l` | Una plantilla que usa la IA con criterio y sin miedo, y datos para defenderlo ante la dirección. | A workforce that uses AI with judgment and without fear, and data to defend it to leadership. |
| `t2_p` | En ING España, la satisfacción con el uso de la IA llegó a 4,7 sobre 5, frente a 3,2 del segundo país del grupo. En Deloitte formamos a 13.000 personas en un mes. | At ING Spain, satisfaction with AI use reached 4.7 out of 5, versus 3.2 in the group's second country. At Deloitte we trained 13,000 people in one month. |
| `t2_cta` | Pide un programa de ejemplo | Ask for a sample program |

**Pestaña 3 · Diriges Tecnología** (`#para-ti-tecnologia`). Nueva:

| Clave | ES | EN |
|---|---|---|
| `t3_tab` | Diriges Tecnología | You lead Technology |
| `t3_h` | Menos pilotos. Más soluciones en uso. | Fewer pilots. More solutions in use. |
| `t3_voz` | «Otra demo bonita que luego me toca mantener a mí. ¿Quién responde cuando falle?» | “Another nice demo that I'll end up maintaining. Who answers for it when it fails?” |
| `t3_1` | Construimos dentro de tus sistemas y con las herramientas que aprueba tu equipo: Microsoft 365 Copilot, ChatGPT, Claude o Gemini. | We build inside your systems, with the tools your team approves: Microsoft 365 Copilot, ChatGPT, Claude or Gemini. |
| `t3_2` | Tus datos no salen de tu entorno. Trabajamos bajo confidencialidad y con los permisos que tú fijas. | Your data stays in your environment. We work under confidentiality and with the permissions you set. |
| `t3_3` | Antes de usarla, cada solución se prueba con casos reales, también los raros, y deja constancia de qué acierta, qué falla y cuándo pasa el caso a una persona. | Before real use, every solution is tested on real cases, the odd ones too, with a record of what it gets right, what it gets wrong and when it hands the case to a person. |
| `t3_4` | La autonomía se gana con pruebas: primero sugiere; después actúa con aprobación. Cada herramienta tiene un dueño que responde de ella. | Autonomy is earned with evidence: first it suggests, then it acts with approval. Every tool has an owner who answers for it. |
| `t3_5` | Traspasamos cada solución con su manual, sus pruebas y formación para quien la mantiene. Tu equipo aprende a construir las siguientes. | We hand over every solution with its manual, its tests and training for whoever maintains it. Your team learns to build the next ones. |
| `t3_l` | Soluciones en uso, documentadas y con dueño, y un equipo propio capaz de construir las siguientes. | Solutions in use, documented and with an owner, and an in-house team able to build the next ones. |
| `t3_p` | Programa de Microsoft 365 Copilot para Deloitte España: 13.000 personas formadas en un mes, sobre su propio entorno. | Microsoft 365 Copilot program for Deloitte Spain: 13,000 people trained in one month, in their own environment. |
| `t3_cta` | Pide la ficha para IT | Ask for the IT brief |
| `t3_subject` | Ficha para IT: cómo trabaja Spiralia con nuestros sistemas | IT brief: how Spiralia works with our systems |

- **`t3_1` a `t3_5` reutilizan textos ya aprobados:** `fde.ctl1-4`, `como.a_p`, `como.a_l`, `como.l_p` y `faq.a1`.
- **`t3_p`:** [Confirmar] que «sobre su propio entorno» es cierto. Lo ideal es sustituirlo por una referencia de implantación anonimizada, por ejemplo «empresa de distribución · cierre financiero», cuando haya permiso (DVD Dental o Pefipresa, 03 §4.1).
- **La «ficha para IT»** sería un PDF de una página: datos, herramientas, autonomía, traspaso y artículo 4. Es la documentación que piden los compradores ocultos (R3 §6.1).
- **Opcional:** «Sin migraciones» (el mensaje de Varick, R1 §1), solo si es cierto siempre [Confirmar].

### 6.7 Quiénes somos (`[pq]`)

| Clave | ES | EN |
|---|---|---|
| `h2a` / `h2b` | Hablamos el idioma del negocio. / Y enseñamos IA en la universidad. *(se mantiene)* | We speak the language of business. / And we teach AI at university. |
| `i1h` | Hemos estado al otro lado de la mesa. | We've been on the other side of the table. |
| `i1` | Venimos de McKinsey, KPMG y EY-Parthenon. Empezamos por tu cuenta de resultados, no por la tecnología. | We come from McKinsey, KPMG and EY-Parthenon. We start with your P&amp;L, not with the technology. |
| `i2h` | Explicamos la IA sin humo. | We explain AI without the hype. |
| `i2` | Enseñamos en el Grado en Inteligencia Artificial de la UFV, con el rigor de quien tiene que aprobar a sus alumnos. *(se mantiene)* | We teach in the Artificial Intelligence degree at UFV, with the rigor of someone who has to grade their students. |
| `i3h` | Estrategia e ingeniería, en la misma mesa. | Strategy and engineering, at the same table. |
| `i3` | Un consultor que entiende tu negocio y un ingeniero que sabe construir, trabajando con tu equipo. | A consultant who understands your business and an engineer who knows how to build, working with your team. |
| `team_h` *(nueva)* | El equipo | The team |
| `team_p` *(nueva)* | Un equipo senior, sin intermediarios. Con quien hablas es con quien trabajas. | A senior team, no intermediaries. The people you talk to are the people you work with. |

- **Se quitan:** `i3h/i3` (el 50.000), `i4h/i4` (la personalización, ya contada) e `i5h/i5` (ya es el H2 de «Qué hacemos»).
- **Biografías del equipo,** todas de 12 a 15 palabras y con el mismo formato (nombre · papel · pedigrí):
  - **Ana Iza** · CEO y cofundadora · Ex-McKinsey. Doctora en Economía (UCM) y Executive MBA (IE).
  - **Jose Garza** · Director de AI & Digital Transformation · Ex-KPMG y EY-Parthenon. Profesor del Grado en IA de la UFV.
  - **[Confirmar] Ignacio Corroto** · Director de Consultoría Estratégica · Ex-KPMG.
  - **[Confirmar] Pedro Valero** · Head of AI Deployment · Ex-CTO y cofundador de GETHER y Tappy.
  - **[Confirmar]** un ingeniero o un director de programa.

### 6.8 El primer paso (antes `[fmt]`)

| Clave | ES | EN |
|---|---|---|
| `kicker` | El primer paso | The first step |
| `h2a` / `h2b` | Empieza con tu comité. / 3 horas para fijar el rumbo. | Start with your leadership team. / 3 hours to set the course. |
| `r_name` | Rumbo | Rumbo |
| `r_desc` *(nueva)* | La sesión de 3 horas con tu comité de dirección. | Our 3-hour session with your leadership team (*rumbo* is Spanish for “course”). |
| `r_que` | Una sesión práctica con las tareas reales de tu comité y la IA de tu empresa. | A hands-on session with your leadership team's real tasks and your company's AI. |
| `r_lleva` | Salís con los primeros casos priorizados por su valor, quién lidera cada uno y el siguiente paso, por escrito. | You leave with the first cases prioritized by value, who leads each one and the next step, in writing. |
| `r_cta` | Quiero una sesión Rumbo | Request a Rumbo session |
| `then` *(nueva)* | Después, a tu ritmo: | Then, at your pace: |
| `p_line` *(nueva)* | **Programa por perfil** · toda la organización, con los casos de cada puesto. | **Program by profile** · the whole organization, with each role's cases. |
| `d_line` *(nueva)* | **Despliegue en tu equipo** · un área, proceso a proceso, hasta que las herramientas funcionan con dueño. | **Deployment in your team** · one area, process by process, until the tools run with an owner. |

- **[Confirmar] `r_lleva`:** que Rumbo entregue de verdad eso, por escrito y en un plazo. Si se fija un plazo con cifra («en 48 horas»), hay que añadirla a `cifras.toml` (§8).
- **Persona gramatical:** «Salís» va en plural a propósito, porque se refiere al comité. Es la única excepción a la regla del *tú*.

### 6.9 Diagnóstico (`[dg]` y `[data.diag]`)

| Clave | ES | EN |
|---|---|---|
| `h2a` / `h2b` | ¿Dónde está tu empresa con la IA? / Tres minutos para saberlo. *(se mantiene)* | Where does your company stand with AI? / Three minutes to find out. |
| `lead` | Ocho preguntas para saber si tu empresa ya saca valor de la IA o solo paga licencias. El resultado sale aquí mismo y no te pedimos ningún dato. | Eight questions to find out whether your company is already getting value from AI or just paying for licenses. The result appears right here and we don't ask for any data. |
| `send` | Envíanoslo *(destino: buzón de equipo)* | Send it to us |
| `data.diag.q[1].q` | ¿Quién tiene acceso en tu empresa a una IA corporativa? | Who in your company has access to a corporate AI? |
| `data.diag.q[4].q` | ¿Tu empresa tiene casos de uso priorizados por su valor? | Does your company have use cases prioritized by value? |
| `data.diag.q[5].q` | ¿Tu empresa ya tiene herramientas de IA propias que hagan tareas enteras? | Does your company already have its own AI tools that handle entire tasks? |
| `data.diag.q[7].q` | ¿Cómo mide tu empresa la adopción? | How does your company measure adoption? |
| `data.diag.n[Hábito].s[0]` | Sienta a un ingeniero con el área donde más valor hay. | Put an engineer with the area where the value is greatest. |

### 6.10 Preguntas del comité (`[faq]`): dos nuevas

| Clave | ES | EN |
|---|---|---|
| `q7` | ¿Cómo encaja con nuestros sistemas y quién lo mantiene? | How does it fit with our systems, and who maintains it? |
| `a7` | Construimos sobre las herramientas que ya usa tu empresa y con los permisos que fija tu equipo de IT. Antes de irnos, traspasamos cada solución con su manual, sus pruebas y formación para quien la mantiene. | We build on the tools your company already uses and with the permissions your IT team sets. Before we leave, we hand over every solution with its manual, its tests and training for whoever maintains it. |
| `q8` | ¿Cómo sabremos si ha merecido la pena? | How will we know it was worth it? |
| `a8` | Antes de empezar medimos el punto de partida. Después, el uso real por equipo y el valor de cada caso frente a ese punto de partida. Lo verás en un informe pensado para tu comité. | Before we start, we measure the starting point. Then we track real usage by team and the value of each case against that baseline. You'll see it in a report built for your leadership team. |
| `a2` (cambio) | «el FDE hace el resto» → «el ingeniero de Spiralia hace el resto». | “the FDE does the rest” → “the Spiralia engineer does the rest”. |

### 6.11 Cierre (`[cta]`)

```toml
[cta]
kicker = {es = "Hablemos", en = "Let's talk"}
h2a = {es = "Cada trimestre cuenta.", en = "Every quarter counts."}
h2b = {es = "Empieza este.", en = "Start this one."}
lead = {es = "30 minutos con el equipo que lo va a hacer, sin intermediarios ni juniors. Cuéntanos dónde está tu empresa y sal con el primer paso.", en = "30 minutes with the team that will do the work, no intermediaries, no juniors. Tell us where your company stands and leave with the first step."}
btn = {es = "Reserva 30 minutos", en = "Book 30 minutes"}
asist = {es = "¿Lo gestiona tu asistente? Escribe a", en = "Does your assistant manage your diary? Write to"}   # {{mail}} = buzón de equipo
legal = {es = "Al reservar, Microsoft Bookings recoge tu nombre, tu email y lo que nos cuentes para gestionar la cita. Responsable: Spiralia. Puedes ejercer tus derechos escribiendo a [buzón de privacidad]. Más información en la <a href=\"https://spiralia.es/politica-de-privacidad/\">política de privacidad</a>.", en = "When you book, Microsoft Bookings collects your name, your email and whatever you tell us in order to manage the meeting. Controller: Spiralia. You can exercise your rights by writing to [privacy mailbox]. More information in the <a href=\"https://spiralia.es/politica-de-privacidad/\">privacy policy</a> (in Spanish)."}
firma = {es = "La inteligencia se compra. La ventaja se despliega.", en = "Intelligence is bought. Advantage is deployed."}   # clave nueva: firma de marca
# Se quitan: ana_cap, jose_cap, urg (pasa a ser el H2).
```

- **Alternativa del H2** si se quiere mantener la promesa de seniority como titular: «Hablas con el equipo que lo va a hacer. / Treinta minutos para saber por dónde empezar.»
- **En EN, la firma** «Intelligence is bought. Advantage is deployed.» suena forzada [Opinión]. Alternativa: «Anyone can buy intelligence. Advantage is built.»

### 6.12 Sistema de CTA: un verbo por nivel

| Nivel | Texto ES | Texto EN | Dónde | Destino |
|---|---|---|---|---|
| Principal (alto compromiso) | **Reserva 30 minutos** | **Book 30 minutes** | Hero, menú móvil y cierre | `reserva/?d=…`, Bookings de equipo |
| Barra (forma corta) | Hablemos | Let's talk | Barra en escritorio | El mismo |
| Formato con nombre | Quiero una sesión Rumbo | Request a Rumbo session | Pestaña Compañía y «El primer paso» | `reserva/?d=rumbo` |
| Secundario (bajo compromiso) | Haz el diagnóstico en 3 minutos | Take the 3-minute assessment | Hero (como enlace) y pestaña Personas | `#diagnostico` |
| Por perfil | Pide un programa de ejemplo · Pide la ficha para IT | Ask for a sample program · Ask for the IT brief | Pestañas Personas y Tecnología | `mailto:` al buzón de equipo, con asunto |

La microcopia bajo el CTA principal es siempre la misma: «Con el equipo que lo haría. Sin compromiso.»

### 6.13 Película (`motion/film/copy.js`)

- **`lema` en ES:** «IA aplicada a negocio.» (hoy «AI adoption, end-to-end.»).
- **`filas[0]`:** «Personas formadas» (hoy «Alumnos formados»), coherente con §2.8.
- **El resto se mantiene:** «El curso acaba el viernes. ¿Y el lunes?» y «Formamos a cada persona con su propio trabajo» son de lo más claro de la casa.
- **Si la película pasa a un modal** (R2), hay que revisar `hero.film_alt`, porque ya no está «a la derecha del titular». El «20» sigue en `cifras.toml`.
- **Si se adopta la opción A del H1,** su primera frase («La IA ya está en todas las mesas») se parece al H1 («La IA ya está en tu empresa»). Funciona como eco, pero conviene verlo en pantalla.

---

## 7. Palancas de persuasión: dónde cae cada una en la nueva arquitectura

R3 §12.3 ya desarrolla las palancas y sus límites. Aquí solo se ubican.

| Palanca | Dónde | Pieza |
|---|---|---|
| **Aversión a la pérdida / urgencia** | Hero, Por qué ahora, Cierre | «Los resultados, todavía no» · curva que se enfría · «tu consejo te preguntará» · «Cada trimestre cuenta. Empieza este.» |
| **Prueba social** | Franja, Resultados, pestañas | 50.000 · ING 66 → 92 · Deloitte 13.000 · CCEP 218 · logos |
| **Autoridad** | Franja (`proof_why`), Quiénes somos | Consultoría estratégica (McKinsey, KPMG, EY-Parthenon) · UFV |
| **Unidad («de los nuestros»)** | Quiénes somos, registro de toda la página | «Hemos estado al otro lado de la mesa» · idioma de negocio |
| **Reciprocidad** | Diagnóstico, ficha para IT, programa de ejemplo | Valor sin pedir datos |
| **Compromiso y coherencia** | Escalera final | Diagnóstico → 30 min → Rumbo → programa o despliegue |
| **Visualización del éxito** | Así se ve, «Lo que te llevas», Rumbo («con qué sales») | Antes y después por perfil · «La IA prepara. Una persona decide.» |
| **Reducción del riesgo** | Microcopia del CTA, pestaña Tecnología, FAQ | «Sin compromiso» · datos en tu entorno · autonomía gradual · traspaso |
| **Escasez** | No usar | Solo si es real, por ejemplo la capacidad de ingenieros por trimestre [Confirmar] |

---

## 8. Cifras: estado y lo que añadiría cada opción

- **Todas las reescrituras de la §6 usan solo cifras que ya están en `cifras.toml`,** con las mismas en ES y EN.
  - Hay que reflejar dos cambios en `cifras.toml`:
    - el 30 deja de ser «con Ana» (§4.3, n.º 14);
    - el «4,7 / 3,2» sigue en la pestaña Personas.
  - Si se quita `reto.b3_p`, el 36 deja de usarse, pero puede quedarse en `cifras.toml` sin problema.
  - El 66 también estaba en ese bloque, pero sigue en uso por ING.
- **Cifras opcionales que exigirían una entrada nueva** en `cifras.toml`, con su tipo y su fuente o compromiso:

| Cifra | Para qué | Tipo | Condición |
|---|---|---|---|
| 24 (h) o 48 (h) | «Te respondemos en menos de 24 h» o «acta de Rumbo en 48 h» | formato | Solo si Spiralia lo garantiza [Confirmar] |
| 10, 20 y 70 | «BCG: 10 % algoritmo, 20 % tecnología, 70 % personas y procesos. Trabajamos en ese 70 %» (R1 §2.2) | dato | Citar como reparto del **esfuerzo**, que es la redacción oficial, no del valor |
| 90 (días) | «En 90 días sabrás qué funciona y cuánto vale» (02 §6.9, n.º 7) | formato | Solo si el método lo permite comprometer |
| Años de Spiralia | «Más de una década» pasada a la marca | dato | Año de fundación verificable |

- **«Casi tres de cada cuatro»** (`reto.b2_p`): o se quita (propuesta de §6.2) o se escribe con su cifra y su fuente en `cifras.toml`. Escribirlo en letras burla el control del build.

---

## 9. Preguntas para Jose

1. **Los 50.000:** ¿«personas formadas» es correcto? ¿Incluye alumnos de la UFV y de thePower? Decide si se dice «alumnos» o «personas».
2. **Buzón y agenda:** ¿se puede crear `ia@spiralia.es` (u otro buzón genérico) y una página de Bookings «Spiralia AI» con varios anfitriones? ¿Qué buzón de privacidad figura en la política de spiralia.es?
3. **Equipo visible:** ¿quién sale en la retícula y con qué título (Ignacio Corroto, Pedro Valero, ingenieros, profesores)? ¿Hay fotos homogéneas de todos?
4. **Rumbo:** ¿con qué sale exactamente el comité, por escrito y en qué plazo? ¿Es de pago? ¿Lo puede pedir un CHRO o solo el CEO?
5. **Despliegue:** ¿va siempre en pareja, consultor más ingeniero? ¿Es cierto «sin migraciones» o «sobre tus sistemas» en todos los casos?
6. **Prueba para el CTO:** ¿hay alguna implantación que se pueda contar anonimizada, con sistema y resultado?
7. **Deloitte:** ¿hay autorización para usar públicamente las cifras de 13.000 y 3.000 y el logo? `investigacion/03` habla de marca blanca desde el 2-sep.
8. **Testimonios:** ¿hay alguna cita autorizada de ING, Deloitte o CCEP? Si no, ¿quitamos el bloque?
9. **H1:** ¿opción A (urgencia, recomendada), B (visualización, si el vídeo enseña personas) o C (diferencial)?

---

## 10. Fuentes

**Del repo y de esta sesión:**
- `investigacion/01_benchmark_y_cta.md` (14-oct-2026), sobre todo §D («Patrones comunes»), §E.2-E.4 y la recomendación de CTA.
- `investigacion/02_icp_arquetipos.md` (14-oct-2026): §1, §2.2 y §6-9.
- `investigacion/03_banco_mensajes.md` (14-oct-2026): §1 (banco de copies), §3.3, §4.1-4.2 y §5 (biografías).
- R1 `investigacion/04_anexos/R1-mensajes-competencia.md` (19-oct-2026): §0, §3-10.
- R2 `investigacion/04_anexos/R2-hero-y-diseno.md` (19-oct-2026): §5, §7.5 y §8.
- R3 `investigacion/04_anexos/R3-marketing-ventas-b2b.md` (19-oct-2026): §0, §1, §3.2, §6 y §12.3.
- Medición propia con Playwright (`scratchpad/a1/measure.mjs`) sobre `http://localhost:8851/?still=1` y `/en/?still=1`, 19-oct-2026.

**Externas** (citadas a través de los documentos anteriores; esta sesión no pudo abrirlas ni buscarlas):
- BCG, «AI at Work: Why Strategy Matters More Than Tools» (junio de 2026): https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools
- BCG, «ROI of AI» (regla 10-20-70): https://www.bcg.com/featured-insights/how-to/roi-of-ai
- McKinsey, «The state of AI» (agosto de 2026): https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
- Dillon et al., NBER w33795: https://www.nber.org/papers/w33795
- PwC, 29.ª Encuesta Mundial de CEO, Ideas PwC (23-ene-2026): https://ideas.pwc.es/archivos/20260123/los-ceo-y-los-retornos-desiguales-de-momento-de-la-ia/
- Microsoft, datos de España del Work Trend Index 2026 (23-jul-2026): https://news.microsoft.com/source/emea/2026/07/ia-capacidades-profesionales-espanoles-2026/?lang=es
- Gartner, prioridades de los CHRO para 2027 (6-oct-2026): https://www.gartner.com/en/newsroom/press-releases/2026-10-6-gartner-says-chros-top-priorities-for-2027-focus-on-meeting-ceos-expectations-while-minimizing-organizational-risk
- Gartner, *Tech Buying Behavior in the Age of AI*: https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai
- Forrester, *State of Business Buying 2026*: https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/
- Varick Agents (proceso «audit → deploy», «no migrations»): https://www.varickagents.com/ · ensayo del fundador: https://x.com/vasuman/article/2049659161005470071
- Palantir, AIP Bootcamps: https://blog.palantir.com/deploying-full-spectrum-ai-in-days-how-aip-bootcamps-work-21829ec8d560
- Análisis del copy de Apple: https://www.enchantingmarketing.com/write-like-apple/ · https://neilpatel.com/blog/write-copy-like-apple/
- NN/g, «How Little Do Users Read?»: https://www.nngroup.com/articles/how-little-do-users-read/ [no verificado en esta sesión]
- Monge Malo (Isra Bravo): https://mongemalo.es [no verificado en esta sesión; el estilo se describe como opinión]
