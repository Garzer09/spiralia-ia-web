# R4 · Palancas de influencia y persuasión para Spiralia AI, y guía de estilo de copy

- **Fecha:** 19 de octubre de 2026.
- **Alcance:** la web de Spiralia AI (`src/content.toml`, ES y EN; plantilla `src/index.template.html`).
- **Para:** Jose Garza.
- **Qué es:** cómo aplicar las palancas de persuasión sin perder clase, sección a sección, con ejemplos de copy y reglas de estilo.

---

## 0. Cómo leer este informe

**Etiquetas**

- **[Hecho]**: verificado con una fuente enlazada. La fuente se ha consultado en esta sesión o viene de la investigación del repo o de R1 y R2, y se dice cuál.
- **[Clásico · no verificado aquí]**: referencia académica o profesional conocida que no he podido volver a comprobar en esta sesión. Sirve para diseñar, no para citarla en la web. Si se quiere citar, hay que verificarla antes.
- **[No verificado]**: atribución que no he podido contrastar.
- **[Opinión]**: criterio propio.

**Límite de esta sesión.** El cupo de búsquedas web, compartido con los demás agentes del flujo, se agotó después de 4 consultas: principio de unidad de Cialdini, Monge Malo, Isra Bravo e indecisión del comprador (*The JOLT Effect*). El resto se apoya en:

- la investigación del repo (`investigacion/01`, `02` y `03`);
- los informes R1 (mensajes de la competencia) y R2 (hero y diseño) de este mismo flujo;
- literatura clásica, marcada como tal.

Lo que más conviene verificar en una segunda ronda:

- material de primera mano de Luis Monge Malo (sus emails y cursos);
- cualquier referencia clásica que se quiera citar en la web.

**Qué no repite.** No vuelve sobre el benchmark de consultoras (01 y R1), los arquetipos de ICP (02), el banco de mensajes (03) ni los 15 titulares del hero (R1, §10). Los usa y los cita.

**Restricción del repo que respetan todos los ejemplos.** Toda cifra que aparezca en el copy tiene que estar en `src/cifras.toml`. Si no, el build falla. Los ejemplos usan solo cifras que ya están: 50.000, 66, 92, 4,7, 3,2, 13.000, 3.000, 218, 6, 80, 55, 40, 36, 3, 30, 2025 y 2026. Cuando una propuesta necesita una cifra nueva, se indica con **[requiere alta en cifras.toml]**.

---

## 1. Resumen ejecutivo

1. **La base es buena.** La web ya usa bien tres palancas:
   - **Prueba social concreta**: ING, del 66 % al 92 %, y «Misma herramienta. Mismo grupo. La diferencia, la formación.».
   - **Autoridad por rigor**: cada cifra lleva su fuente.
   - **Reciprocidad**: un diagnóstico que no pide datos.

   Es más de lo que hacen la mayoría de los competidores (01, conclusión 5).
2. **Faltan cuatro palancas:**
   - **El coste de no actuar** (aversión a la pérdida). Hoy el problema se cuenta como el de «otras empresas de un estudio», no como el del lector.
   - **La reversión del riesgo** en el primer paso.
   - **La unidad**: un «nosotros» compartido con el directivo («venimos de tu lado de la mesa»).
   - **Ver el éxito en el hero**: hoy el hero explica el problema, pero no enseña el resultado.
3. **El personalismo resta palanca.** Ana sostiene ahora la simpatía y la autoridad de toda la marca. Eso empequeñece a la boutique y alimenta la objeción del CEO «¿y si mañana no estáis?» (02, §6.6). Una autoridad colectiva (un equipo con método, origen y casos) escala mejor y responde a la queja del cliente.
4. **La fórmula de copy** [Opinión]:
   - **El problema, en clave de pérdida.**
   - **La solución, en clave de ganancia.**
   - **Pruebas en medio.**
   - **Un primer paso sin riesgo.**

   Monge Malo aporta la mecánica: tensión, «tú», concreción, objeciones con nombre y un solo CTA. Apple aporta la forma: una idea, frases cortas, el resultado a la vista y ritmo. Spiralia pone el filtro: hechos comprobables y tono de comité de dirección.
5. **Hay urgencia real y basta con ella:**
   - Las licencias se pagan aunque no se usen.
   - El uso se enfría en semanas (Dillon et al.).
   - La brecha de valor se agranda (el 6 % de McKinsey).
   - El artículo 4 del Reglamento de IA se aplica desde 2025.
   - El presupuesto de 2027 se cierra estas semanas.

   No hace falta inventar escasez.
6. **Lo que más resta clase hoy:**
   - **La errata de la «á»**: Butler en peso 400 no la pinta en Chromium y se ve «M s de 50.000». En una marca que vende rigor, una errata en el hero es una contraprueba.
   - **Un H1 abstracto y con jerga**: «La ventaja se despliega».
   - **Inglés en la versión española**: «AI adoption, end-to-end.».
   - **Tú y vosotros mezclados.**
   - **Un cierre centrado en personas concretas**: fotos de Ana y Jose, agenda de Ana y el email de Ana en el texto legal.

---

## 2. Diagnóstico: qué palancas usa hoy la web

| Palanca | Dónde está hoy | Valoración | Qué falta |
|---|---|---|---|
| Reciprocidad | Diagnóstico sin datos (`[dg].lead`), «Guárdalo para tu comité» | Fuerte | Un entregable de muestra que se pueda reenviar (acta de Rumbo anonimizada). Que el cierre regale algo concreto: el primer paso por escrito |
| Compromiso y coherencia | Selector de perfil en el hero, diagnóstico de 8 preguntas, Rumbo como primer paso | Media | Una escalera explícita de compromisos. El resultado del diagnóstico no lleva a una acción proporcional. Rumbo no dice qué decide el comité |
| Prueba social | ING, Deloitte, CCEP, 50.000 y logos | Fuerte en cifras, débil en voces | Testimonios (tres `[PLACEHOLDER]`), referencia de cliente bajo petición y un titular de franja más fuerte que «Hemos formado a equipos de» |
| Autoridad | Fuente en cada cifra, McKinsey, KPMG, EY-Parthenon y UFV | Fuerte, pero concentrada en dos biografías | Autoridad colectiva, el método con nombre antes en la página y autoridad prestada sobria |
| Simpatía | Voces internas («He firmado las licencias…»), fotos de Ana y Jose | Buena | Que el origen común (el lenguaje de comité) aparezca en el hero. Humildad deliberada: el efecto *pratfall*, ver 3.5 |
| Escasez | «Cada trimestre cuenta.» (`[cta].urg`) | Correcta y discreta | La ventana de oportunidad, el calendario presupuestario y la capacidad real si existe un límite |
| Unidad | Casi ausente; solo «Hemos estado al otro lado de la mesa.», en Quiénes somos | Débil | El «nosotros» compartido: consultoría, comités, España y construir *con* el equipo |
| Aversión a la pérdida y coste de no actuar | El reto: «El uso se enfría» | Media: habla del estudio, no del lector | Llevarlo al bolsillo del lector: licencias pagadas y trimestres perdidos |
| Reversión del riesgo | FAQ sobre datos; «sin compromiso» en la FAQ del precio | Débil | Garantías concretas del primer paso, propiedad de lo construido y autonomía final |
| Ver el éxito | Demostraciones de antes y después (`[pers]`, `[fde]`) | Fuerte, pero muy abajo | Llevarlo al hero (vídeo) y a cada perfil |

---

## 3. Los siete principios de Cialdini en B2B, sin perder clase

**Contexto [Hecho].** Cialdini formuló seis principios en *Influence* y añadió el séptimo, la unidad, en *Pre-Suasion* (2016). En la unidad distingue entre que el otro «sea como nosotros» y que «sea de los nuestros». Varias guías B2B la consideran la palanca más importante con clientes de empresa. También advierten que no es una excusa para no vender: consiste en educar, evaluar con honestidad el encaje y escuchar ([Copyblogger](https://copyblogger.com/?p=77794); [Rocket Agency](https://rocketagency.com.au/?p=6392)). En los resultados no apareció ningún estudio B2B riguroso sobre la unidad: casi todo es contenido de blog o de proveedores ([Prospeo](https://prospeo.io/s/persuasion-in-sales), [Vendedor]).

**Regla general [Opinión].** En un comprador de comité de dirección, cada principio tiene una versión con clase y otra barata. La que tiene clase **sirve al directivo ante su consejo**. La barata **le presiona a él**. La línea roja es la verdad comprobable.

### 3.1 Reciprocidad

- **Con un directivo:** lo que funciona no es un regalo, es **criterio útil** que le ahorra trabajo ante su consejo o su comité.
- **Versión con clase:**
  - el diagnóstico sin email (ya existe);
  - el resultado para imprimir o reenviar «para tu comité» (ya existe);
  - un acta de Rumbo de muestra, anonimizada;
  - una hoja «Las cinco preguntas que tu consejo te hará sobre la IA» [Opinión];
  - en la conversación de 30 minutos, el primer paso por escrito aunque no se contrate nada.
- **Versión barata (prohibida):** un ebook a cambio de seis campos, «regalos» con cuenta atrás o una sesión «gratuita» que es una demo comercial.
- **Copy para el cierre:**
  - ES: «Treinta minutos. Te llevas el primer paso por escrito, trabajes o no con nosotros.»
  - EN: «Thirty minutes. You leave with the first step in writing, whether or not you work with us.»
  - Solo si Spiralia se compromete a entregarlo. Es una decisión de Jose.

### 3.2 Compromiso y coherencia

- **Mecanismo:** un sí pequeño facilita uno mayor. Es la técnica del «pie en la puerta» (Freedman y Fraser, 1966) [Clásico · no verificado aquí].
- **La coherencia con lo ya decidido.** El CEO ya compró licencias, así que es coherente invertir en que rindan. Ojo: es pariente del coste hundido. Hay que usarlo como continuación de una buena decisión, nunca como reproche («lo estás tirando»).
- **Escalera de Spiralia [Opinión].** Cada peldaño anuncia el siguiente y lo que cuesta en tiempo:
  1. Elegir perfil: 1 clic.
  2. Diagnóstico: 3 minutos.
  3. Resultado «para tu comité».
  4. Conversación: 30 minutos.
  5. Rumbo: 3 horas con el comité.
  6. Programa o despliegue.
- **El compromiso público de los participantes.** La credencial que cada persona enseña en LinkedIn (`[pt].t2_2`) es una palanca de coherencia para que el hábito dure. A RR. HH. se le puede explicar así: «Lo que cada persona enseña en público, lo mantiene.» [Opinión: es un mecanismo plausible, no un dato].
- **Copy para el resultado del diagnóstico:**
  - ES: «Tu punto de partida: Uso. El siguiente paso razonable: Rumbo, 3 horas con tu comité.»
  - EN: «Your starting point: Use. The sensible next step: Rumbo, 3 hours with your leadership team.»

### 3.3 Prueba social

- **Con un directivo:** lo que le mueve es la prueba de **pares parecidos**: sector, tamaño, un nombre y una cifra. El volumen impresiona menos (R1, §4; 01, conclusión 5).
- **Lo mejor que ya tiene la web:** «Misma herramienta. Mismo grupo. La diferencia, la formación.». Es un experimento natural: mismo grupo y misma IA, distinto resultado. Es la forma más persuasiva de prueba social que existe en la página [Opinión]. Conviene subirla: que aparezca en la franja que hay debajo del hero.
- **Franja de logos.** Cambiar «Hemos formado a equipos de» por una frase que combine prueba social y unidad:
  - ES: «Equipos que ya trabajan así»
  - EN: «Teams already working this way»
- **Testimonios.** Para rellenar los tres huecos, un guion de cuatro preguntas inspirado en el método clásico de testimonios de Sean D'Souza [Clásico · no verificado aquí]:
  1. ¿Qué te preocupaba antes de empezar?
  2. ¿Qué cambió en el trabajo?
  3. ¿Hay una cifra o un momento que lo resuma?
  4. ¿Qué le dirías a un colega que duda?

  La respuesta a la pregunta 1 desactiva una objeción con la voz de un par. Mejor en vídeo, de 20 a 40 segundos (R1, §7).
- **Referencia de cliente bajo petición.** Es una señal boutique muy fuerte (solo con permiso del cliente):
  - ES: «¿Quieres hablar con un cliente antes de decidir? Te lo presentamos.»
  - EN: «Want to speak to a client before you decide? We'll introduce you.»
- **Versión barata (prohibida):** «+50.000 clientes felices», estrellas, contadores en directo y logos sin permiso. El LEEME restringe KPMG y Santander.

### 3.4 Autoridad

- **Con un directivo:** la autoridad no son los títulos. Es **haber estado en su lado de la mesa**, más rigor y más selectividad.
- **Versión con clase:**
  - Autoridad colectiva: «Un equipo que viene de McKinsey, KPMG y EY-Parthenon y enseña IA en la universidad.» Ya no es la biografía de una persona.
  - El método con nombre (SPIRAL, Rumbo).
  - Las fuentes al pie, como ya se hace.
  - Autoridad prestada sobria (BCG, McKinsey): una línea y su fuente.
- **El diferencial «hablamos el idioma del negocio» solo es autoridad si el copy lo habla.** El propio texto es la prueba: «cuenta de resultados», «margen», «comité», «plantilla», «proceso». Una sola palabra técnica sin explicar en la primera pantalla desmiente el diferencial.
- **Versión barata (prohibida):** «líderes del sector», «expertos de referencia», sellos o premios irrelevantes.

### 3.5 Simpatía

- **Con un directivo:** la simpatía nace de la similitud (mismo origen, mismo problema) y de la cooperación («contigo, no para ti»).
- **Versión con clase:**
  - Las voces internas (ya existen).
  - El **efecto *pratfall***: alguien competente que admite un límite resulta más atractivo (Aronson, Willerman y Floyd, 1966) [Clásico · no verificado aquí]. La web ya tiene una frase perfecta: «No todo necesita un agente.».
  - Un segundo ejemplo posible:
    - ES: «Si en Rumbo no vemos valor, te lo diremos.»
    - EN: «If we don't see value in Rumbo, we'll tell you.»
- **Versión barata (prohibida):** colegueo forzado, humor fácil, emojis y elogios al lector («como líder visionario…»).

### 3.6 Escasez

- **Con un directivo:** escasea la **ventaja**, no el producto. Es una ventana de oportunidad.
- **Escasez real y ética:**
  - El calendario: el presupuesto de 2027.
  - La curva de uso, que cae en semanas tras el lanzamiento de las licencias.
  - La capacidad de los FDE, solo si Spiralia limita de verdad los despliegues simultáneos.
- **Copy, solo si es cierto:**
  - ES: «Trabajamos con pocos equipos a la vez. Por eso podemos sentarnos en tu mesa.»
  - EN: «We work with a few teams at a time. That's why we can sit at your table.»
- **Versión barata (prohibida):** «Solo 3 plazas», contadores, «oferta válida hasta» y fechas que se renuevan solas.

### 3.7 Unidad

- **Con un directivo español:** la misma tribu es gente de negocio que ha estado en comités y en consultoría, en España.
- **Versión con clase:**
  - Subir «Hemos estado al otro lado de la mesa.» a una zona visible (hoy está enterrada en Quiénes somos).
  - Usar «Hablamos de cuenta de resultados, no de *prompts*» (03, 1.E).
  - La co-construcción: el equipo del cliente construye *con* Spiralia. Es el **efecto IKEA**: valoramos más lo que ayudamos a construir (Norton, Mochon y Ariely, 2012) [Clásico · no verificado aquí]. Ya está en «Los casos los encuentran los propios equipos.» y funciona también como argumento de adopción para RR. HH.
  - Los champions como un «nosotros» interno del cliente.
- **Copy:**
  - ES: «Venimos de la consultoría estratégica. Hablamos tu idioma: cuenta de resultados, no tecnología.»
  - EN: «We come from strategy consulting. We speak your language: the P&L, not technology.»
- **Versión barata (prohibida):** «la familia Spiralia», «únete a la revolución».

---

## 4. Economía conductual para vender a directivos

### 4.1 Aversión a la pérdida y miedo a equivocarse

- **Las pérdidas pesan más que las ganancias equivalentes** (teoría de las perspectivas: Kahneman y Tversky, 1979). Estimaciones posteriores las sitúan en torno al doble [Clásico · no verificado aquí].
- **El matiz decisivo en B2B [Hecho, fuentes secundarias].** Dixon y McKenna (*The JOLT Effect*, 2022) analizaron unos 2,5 millones de conversaciones de venta. Concluyen que lo que más frena la decisión no es el apego al statu quo, sino el **miedo del comprador a equivocarse**. Entre el 40 % y el 60 % de las oportunidades acaban en «no decisión» ([Penguin Random House](https://penguinrandomhouse.com/books/isbn/9780593538104); [The SaaS Barometer](https://thesaasbarometer.substack.com/p/the-jolt-effect-with-matt-dixon-author); [CustomerThink](https://customerthink.com/no-decisions-why-they-happen-and-what-you-can-do-about-them/); [Notion Capital](https://www.notioncapital.com/resources/overcoming-inertia-in-the-buying-decision-is-the-single-biggest-challenge-facing-every-saas-company-today)). Una fuente afirma que en el 56 % de las «no decisiones» el comprador sí quería cambiar, pero esa cifra aparece en un blog de herramientas de venta y no en el libro [No verificado].
- **Implicación para la web [Opinión].** Agitar el miedo a quedarse atrás sin reducir el miedo a equivocarse **paraliza** al CEO. La web tiene que hacer las dos cosas, en este orden:
  1. que el statu quo se vea como una pérdida;
  2. que el primer paso se vea casi sin riesgo.
- **Método JOLT** [Clásico · no verificado aquí en detalle]: medir la indecisión, ofrecer una recomendación, limitar la exploración y quitar el riesgo de encima. Traducido a la web:
  - **Recomendar, no dar un menú:** «Te recomendamos empezar por Rumbo.» Las tres opciones de Formatos se mantienen, pero con Rumbo marcado claramente como el primer paso (ya lo está).
  - **Limitar la exploración:** un CTA dominante por pantalla.
  - **Quitar el riesgo:** ver 4.7.

### 4.2 El coste de no actuar

- **Principio:** el statu quo tiene que verse como una **elección activa con precio**, no como un «no hacer nada» neutral.
- **Restricción:** Spiralia decidió no publicar precio ni calculadora de ROI (LEEME), y 01 (§2.4) documenta la desconfianza hacia las cifras de los proveedores.
- **Solución [Opinión]: que el lector haga su propia cuenta.** Spiralia no pone ninguna cifra; la pone él:
  - ES: «Multiplica tus licencias por su precio mensual. Es lo que pagas cada mes, se usen o no.»
  - EN: «Multiply your licenses by their monthly price. That's what you pay every month, whether they're used or not.»
- **Variantes para remates:**
  - «Esperar también tiene coste.» / «Waiting has a cost too.» (03, 1.E)
  - «Cada trimestre cuenta.» / «Every quarter counts.» (ya existe)

### 4.3 Anclaje

- **Mecanismo:** la primera cifra que se ve condiciona cómo se juzgan las siguientes (Tversky y Kahneman, 1974) [Clásico · no verificado aquí].
- **Anclas disponibles.** Sin precio, las anclas son de esfuerzo, de escala y de comparación:
  - **Esfuerzo bajo:** «3 horas», «30 minutos».
  - **Capacidad alta:** «13.000 personas en un mes». Desactiva la objeción de que una boutique no puede con una gran empresa.
  - **Comparación:** «4,7 frente a 3,2».
- **Efecto de contraste [Opinión]:** poner la gran capacidad antes del paso pequeño.
  - ES: «Formamos a 13.000 personas en un mes. Contigo empezamos con 3 horas.»
  - EN: «We trained 13,000 people in one month. With you, we start with 3 hours.»
- **Las cifras precisas parecen más medidas y más creíbles que las redondas** [Clásico · no verificado aquí]. 218 y 7.137 funcionan por eso. No redondear nunca hacia arriba.

### 4.4 Efecto marco

- **Mecanismo:** el mismo dato, contado de otra forma, cambia la decisión (Tversky y Kahneman, 1981) [Clásico · no verificado aquí].
- **Marco doble para Spiralia [Opinión]:**
  - **Pérdida en el problema:** «La licencia se paga igual».
  - **Ganancia en la solución y en la prueba:** «del 66 % al 92 %».

  Monge Malo usa el marco de pérdida; Apple, el de ganancia. Spiralia necesita los dos, cada uno en su sitio.
- **Marcos que funcionan con cifras ya aprobadas:**
  - «Del 66 % al 92 %» (nivel y avance) se entiende mejor que «+26 puntos».
  - «8 de cada 10 dicen ser más productivos; 6 de cada 100 lo ven en su beneficio» haría más tangible el 80 % frente al 6 % [requiere alta en cifras.toml de 8, 10 y 100, o dejarlo como está].
- **Marco de comparación social:** «¿En qué lado estás?» (R1, §3). Que el resultado del diagnóstico lo responda sin decirlo: «Estáis entre los que más valor sacan» ya lo hace en el nivel Autonomía.

### 4.5 Sesgo de statu quo

- **Mecanismo:** se tiende a mantener lo que hay aunque una alternativa sea mejor (Samuelson y Zeckhauser, 1988) [Clásico · no verificado aquí].
- **Cómo suena en este ICP** (02, §6.6 y §8.6):
  - «Ya hemos hecho formación.»
  - «Esperamos a que madure.»
  - «Nuestro partner de Microsoft ya lo cubre.»
- **Contrapesos [Opinión]:**
  1. **Darle la vuelta:** quedarse como estás no es neutral, es seguir pagando sin retorno.
  2. **Partir de lo que ya hay.** Así cambiar no supone tirar nada: es la respuesta de la FAQ 4, «Al contrario: partimos de ahí.». Conviene subirla de nivel.
  3. **Que el siguiente paso parezca el obvio:** Rumbo como continuación natural del diagnóstico.

### 4.6 Miedo a quedarse atrás frente a la competencia

- **Datos reales** en R1, §3. Ejemplo: según IBM, el 64 % de los CEO invierte antes de entender el valor por miedo a quedarse atrás ([IBM, mayo de 2025](https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles), vía R1).
- **Uso con clase [Opinión]:**
  - una línea, nunca el titular;
  - sin nombrar a competidores del cliente;
  - preferir el 6 % de McKinsey, que ya está en `cifras.toml`.
- **Copy:**
  - ES: «El 6 % que ya lo ve en su beneficio no tiene otra IA. Tiene otra forma de trabajar.»
  - EN: «The 6% already seeing it in their profit don't have different AI. They work differently.»

### 4.7 Riesgo percibido y reversión del riesgo

Cada miedo del ICP (02, §6.5 y §7.5) tiene su respuesta. La mayoría ya está en la web, pero dispersa.

| Miedo del directivo | Reversión del riesgo | Dónde ponerla |
|---|---|---|
| Quedar mal ante el consejo con una inversión sin retorno | Medir desde el punto de partida (`[pt].t1_3`) y un resultado que se pueda presentar | Para ti · CEO, Formatos |
| Un incidente de datos | «Dentro de tu entorno, con las herramientas que aprueba tu IT» (`[faq].a1`) | Microtexto bajo el CTA del hero, bloque CTO |
| Un conflicto laboral («la IA quita puestos») | «Decide la persona», gobierno escrito y comunicación a los representantes (`[pt].t2_3`, `t2_4`) | Para ti · RR. HH. |
| Depender de un proveedor pequeño | Deloitte, 13.000 en un mes; «equipos que ya no nos necesitan»; lo construido vive en tus sistemas y es tuyo | Pruebas, Construimos, FAQ |
| Otro piloto que no escala | Rumbo acotado, con el caso y sus límites por escrito (`[como].i_l`) | Formatos |
| Que la formación no se note | Medir el uso real, no las horas (`[pt].t3_3`) | Para ti · Formación |

**Garantía explícita del primer paso. Decisión de Jose [Opinión].** Una «garantía de claridad» es elegante y propia de una boutique:

- ES: «Si al terminar Rumbo tu comité no tiene claro su primer caso, la segunda sesión corre de nuestra cuenta.»
- EN: «If your leadership team leaves Rumbo without a clear first case, the second session is on us.»

Solo si Spiralia la puede sostener. Si no se puede, basta con la versión sin garantía: «Al terminar, tu comité sabe dónde entra la IA primero.».

### 4.8 Otros mecanismos útiles

- **La fluidez de procesamiento.** Lo que se lee con facilidad parece más verdadero (Reber y Schwarz, 1999) [Clásico · no verificado aquí]. Que el copy sea «fácil de entender» no es solo una cuestión de estilo: **es credibilidad**. Por la misma razón, un glifo que falta («M s de 50.000») resta verdad a la cifra.
- **La regla del pico y el final** [Clásico · no verificado aquí]. Una experiencia se recuerda por su momento más intenso y por el final. El cierre de la página tiene que ser un pico: el equipo, la promesa y un paso claro. No basta con un formulario con texto legal.
- **Los niveles de conciencia de Eugene Schwartz** (*Breakthrough Advertising*, 1966) [Clásico · no verificado aquí]:
  - El CEO típico es **consciente del problema** («no lo veo en la cuenta») o **de la solución genérica** («formación»). No conoce el producto (FDE, SPIRAL).
  - Por eso la página tiene que empezar por el problema y el resultado, nunca por el método.
  - El H1 actual empieza por una tesis abstracta.

### 4.9 Tendencias de compra B2B en 2025 y 2026 que condicionan la persuasión

[Hecho, citado en 01 y R1]

- **Gartner (junio de 2025):** el 61 % de los compradores B2B prefiere comprar sin comercial y el 69 % ve contradicciones entre la web y el comercial.
- **6sense (2025):**
  - el primer contacto con el proveedor llega al 61 % del recorrido;
  - el ganador estaba en la lista del primer día el 95 % de las veces.
- **[Edelman y LinkedIn, 2025](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report):**
  - más del 40 % de las operaciones se atascan por desalineación interna;
  - el 71 % de los «compradores ocultos» apenas habla con ventas;
  - el 95 % es más receptivo si hay buen liderazgo de pensamiento.
- **Forrester (2019, citado en 01):** el 65 % de los decisores no se fía del contenido de los proveedores.

**Implicaciones [Opinión]**

- **La web convence a gente que nunca hablará con Spiralia:** el resto del comité.
  - Hay que **armar al campeón interno**, normalmente la dirección de Personas o el CEO, con material reenviable: el resultado del diagnóstico, un acta de Rumbo de muestra y la película en 4:5 para LinkedIn.
  - Hay que **decir lo mismo en la web que en la reunión**: coherencia.
- **Rigor frente a desconfianza.** Ante la desconfianza, el rigor visible (fuentes y fechas) es la palanca más rentable de Spiralia. Ya la tiene.

---

## 5. Monge Malo e Isra Bravo: la urgencia de la respuesta directa en español

### 5.1 Qué se ha podido verificar

- **Isra Bravo [Hecho]:**
  - Es autor de *Escribo porque me gusta ganar dinero* (Alienta, 2022) y de *El libro de copywriting* (Alienta, 2023) ([Quelibroleo](https://quelibroleo.com/escribo-porque-me-gusta-ganar-dinero); [Goodreads](https://www.goodreads.com/book/show/123166114)).
  - Trabaja con **historias** en lugar de presupuestos secos. Empezó ayudando a un amigo con una empresa de mudanzas cuyos presupuestos hablaban solo de kilómetros, bultos y precio ([Hola](https://www.hola.com/estar-bien/20220401207157/entrevista-isra-bravo-dislexico-millon-de-euros/)).
  - Envía **emails diarios** todo el año, de unas **300 palabras** ([Merca2](https://www.merca2.es/2023/07/05/isra-bravo-el-copywriter-mas-cotizado-y-terror-de-las-redes-sociales-1369551/); [Doofinder](https://www.doofinder.com/es/podcast/copywriting-ventas-online)).
  - Un análisis de sus cursos destaca la técnica de **crear expectativas y romperlas** con historias personales ([VideoHighlight](https://videohighlight.com/v/JPPzc4QpdDU)).
- **Luis Monge Malo:**
  - **Lo único verificado [Hecho sobre la guía, no sobre él]:** una guía de un tercero, construida a partir del análisis de sus emails. Destaca cierres con llamada a la acción, un «pequeño toque de urgencia» para cortar la procrastinación y bonos por tiempo limitado. Son afirmaciones del vendedor de la guía ([Gumroad](https://tonirat.gumroad.com/l/nopix)).
  - **Rasgos que se le suelen atribuir [No verificado: contrastar con sus emails]:**
    - email diario que empieza con una anécdota personal, da un giro y vende sin disculparse;
    - primera persona y «tú»;
    - párrafos de una línea;
    - tono irreverente;
    - polarización («esto no es para ti si…»);
    - posdata;
    - un solo enlace;
    - plazos reales en los lanzamientos.

### 5.2 La mecánica que sí se lleva a Spiralia

| Mecanismo de respuesta directa | Cómo lo hace la respuesta directa | Versión Spiralia, con clase |
|---|---|---|
| Nombrar el dolor con las palabras del cliente | Cita la frase que el lector se dice a sí mismo | «He firmado las licencias. Si dentro de un año el consejo me pregunta qué ha cambiado, ¿qué le enseño?» (ya existe) |
| Agitar con una consecuencia concreta | Lleva el problema al bolsillo o a la reputación | «Mientras tanto, la licencia se paga igual.» / «Meanwhile, the license costs the same.» |
| «Tú» y frases cortas | Una idea por línea | Sí, pero sin coloquialismos ni muletillas |
| Historia (Isra Bravo) | Anécdota, giro y moraleja | Una microescena ilustrativa: «Lunes, 9:00. La directora comercial abre el correo: la propuesta ya está en borrador, con sus fuentes. Ella decide el precio.» Va marcada como ilustrativa, como ya se hace |
| Responder la objeción antes de que la piense | Lista de «sí, pero…» | Una FAQ con objeciones duras (9.13) |
| Polarizar y cualificar | «Esto no es para ti si…» | «Rumbo no es una charla inspiradora. Es una sesión para decidir.» / «Rumbo isn't an inspirational talk. It's a session to decide.» |
| Un solo CTA y posdata | Un enlace; la posdata reitera | Un CTA dominante por pantalla. La «posdata» es la línea de urgencia bajo el botón: «Cada trimestre cuenta.» |
| Plazo real | Cierre del lanzamiento | El calendario del cliente: el presupuesto de 2027 (8.2) |
| Crear expectativas y romperlas (Isra Bravo) | Giro inesperado | «Nuestro mejor resultado: equipos que ya no nos necesitan.» (ya existe). Rompe la expectativa de que un proveedor busca dependencia |

### 5.3 Lo que no se lleva

- Las exclamaciones y las mayúsculas.
- La ironía a costa del lector.
- La escasez de lanzamiento.
- Los ataques a competidores.
- La exhibición de dinero o de resultados propios.
- El tono de infoproducto («el método que nadie te cuenta»).

### 5.4 Filtro en tres pasos: respuesta directa → Apple → Spiralia

Ejemplos de cómo destilar la urgencia sin perder clase [Opinión]. Las frases de la primera columna son caricaturas para ilustrar el filtro, no citas de Monge Malo.

| Respuesta directa en bruto | Forma Apple | Spiralia final (ES / EN) |
|---|---|---|
| «Estás tirando el dinero en licencias que nadie usa.» | «Licencias pagadas. Trabajo igual.» | «Ya pagas la IA. Ahora, que trabaje.» / «You already pay for AI. Now put it to work.» (R1, n.º 2) |
| «Tu competencia te está comiendo la tostada con la IA.» | «Misma IA. Otros resultados.» | «Todos tienen acceso a la misma IA. La diferencia está en cómo trabaja cada empresa.» / «Everyone has access to the same AI. The difference is how each company works.» |
| «Los cursos de IA no sirven para nada.» | «El curso acaba el viernes. ¿Y el lunes?» | «El curso acaba el viernes. Lo que cuenta empieza el lunes.» (ya existe) / «The course ends on Friday. What counts starts on Monday.» |
| «Si sigues esperando, te quedas fuera.» | «Cada trimestre cuenta.» | «Cada trimestre que la IA no trabaja se paga igual.» / «Every quarter AI isn't working, you still pay for it.» |
| «Los técnicos no te entienden; nosotros sí.» | «La IA, en tu idioma.» | «Hablamos de cuenta de resultados, no de algoritmos.» / «We talk P&L, not algorithms.» |
| «Reserva ya, que quedan pocas fechas.» | «Empieza en 3 horas.» | «Empieza por Rumbo: 3 horas con tu comité.» / «Start with Rumbo: 3 hours with your leadership team.» |
| «¿Vas a dejar que tu gente se quede atrás?» | «Tu gente está lista. Falta el rumbo.» | «Tu gente ya usa la IA. Falta decirle para qué.» / «Your people already use AI. Now tell them what for.» (02, §6.9) |
| «Resultados garantizados o te devolvemos el dinero.» | «Funciona. O seguimos.» | «Nos quedamos hasta que funciona.» / «We stay until it works.» (ya existe) |

---

## 6. El copy de Apple aplicado a un B2B serio

**Principios documentados [Hecho, vía R2]**

- Una idea por titular ([Enchanting Marketing](https://www.enchantingmarketing.com/write-like-apple/)).
- Frases cortas: un análisis de las páginas del iPhone 5 midió entre 10,9 y 14 palabras de media por frase y recomienda quedarse por debajo de 12 ([Neil Patel](https://neilpatel.com/blog/write-copy-like-apple/)).
- Fragmentos para marcar el ritmo.
- El beneficio antes que la ficha técnica ([Leadpages](https://leadpages.com/blog/landing-pages-apple-borrow-apples-best-copywriting-techniques-copy)).
- Mucho aire.

**Patrones de titular en dos tiempos [Opinión, con ejemplos de la propia web]**

| Patrón | Ejemplo en la web | Cuándo usarlo |
|---|---|---|
| Paralelo y giro | «Misma herramienta. Mismo grupo. La diferencia, la formación.» | Pruebas |
| Contraste | «La IA ya está en todas las mesas. En la cuenta de resultados, casi en ninguna.» | Problema |
| Pregunta y silencio | «El curso acaba el viernes. ¿Y el lunes?» | Película o remate |
| Antes y después | «Tu comité entra con preguntas. Sale con un plan.» | Rumbo |
| Escala | «Del comité a la primera línea.» | RR. HH. o Formación |
| Promesa y prueba | «Imagina a toda tu empresa usando la IA cada semana. En ING España, ya lo hace el 92 %.» | Hero con vídeo |

**Para que el lector vea el éxito, cinco ingredientes [Opinión]**

1. **Un momento concreto:** «el lunes», «a las 9:00».
2. **Un objeto real del trabajo:** la propuesta, el informe, la visita.
3. **Un sujeto con cargo:** «la directora comercial».
4. **Un verbo de resultado en presente:** «ya está en borrador».
5. **La persona que decide:** «Ella decide el precio».

El quinto calma a RR. HH. y al CTO.

**La prueba de la cámara [Opinión].** Si un titular no se puede filmar, no deja ver nada. «La ventaja se despliega» no se puede filmar. «Tu equipo termina la propuesta antes de comer» sí. Esta regla une el copy con el hero en vídeo: **el H1 tiene que describir lo que el vídeo enseña o lo que promete.**

**La trampa de Apple en B2B.** La abstracción elegante y el juego de palabras vacío. El H1 actual («La inteligencia se compra. La ventaja se despliega.») tiene forma de Apple, pero no deja ver nada, y «desplegar» es un verbo de consultor (R1, §9.4). Referencia clásica de lo contrario: «1.000 canciones en tu bolsillo» (iPod, 2001) [Clásico · no verificado aquí]. Es un resultado que se puede imaginar, no una categoría.

---

## 7. Señales de marca boutique y de lujo, sin arrogancia

### 7.1 Señales

Kapferer y Bastien (*The Luxury Strategy*, 2009) proponen «antileyes» del marketing. Entre ellas: no compararse, no perseguir toda la demanda, que comprar exija criterio y que la comunicación no esté para vender [Clásico · no verificado aquí]. Traducidas a una boutique B2B:

| Señal | Qué comunica | Cómo en esta web | Riesgo si se exagera |
|---|---|---|---|
| Cualificación (selectividad sin decir «exclusivo») | No trabajamos con cualquiera ni de cualquier forma | «Rumbo es para comités que ya tienen la IA en casa y quieren que se note.» / «Rumbo is for leadership teams who already have AI in-house and want it to show.» | Sonar altivo si se dice «exclusivo» o «solo para» |
| Senioridad | Te atiende quien sabe | «Hablas con quien lo va a hacer. Sin intermediarios ni juniors.» (ya existe) | Ninguno, si es cierto |
| Rigor | Medimos y citamos | Fuente y fecha en cada cifra (ya existe); es su sello | Notas al pie que tapan el mensaje: que sean discretas |
| Discreción | Sabemos guardar un secreto | «Algunos clientes prefieren no aparecer. Contamos sus resultados sin su nombre.» / «Some clients prefer not to be named. We share their results without their names.» Casos anonimizados por sector, al estilo Distyl (R1) | Que parezca que no hay clientes: siempre junto a casos con nombre |
| Oficio | Hecho a mano para ti | «Antes de la primera sesión recogemos las tareas, los documentos y la jerga de cada perfil.» (ya existe). Enseñar el detalle: una ficha de perfil o una guía de sesión | Exceso de proceso |
| Método con nombre | Hay un sistema detrás | SPIRAL y Rumbo (ya existen) | Siglas sin explicar |
| Contención | Seguridad tranquila | Sin precio, sin comparativas, mucho aire, un color de acento y animaciones solo con sentido | Frialdad: compensarla con las voces internas |
| Respeto por la agenda | Tu tiempo vale | «30 minutos», «3 horas» en cada CTA | Ninguno |
| Trayectoria (de la empresa, no de la persona) | No somos nuevos | Pasar «Lleva más de una década al frente de Spiralia» (biografía de Ana) a la marca: «Más de una década formando a empresas.» / «More than a decade training companies.» [confirmar la redacción con Jose] | Ninguno |
| Acceso a pares | Confianza demostrable | Referencia de cliente bajo petición (3.3) | Requiere permiso |

### 7.2 Excelencia sin arrogancia: seis reglas [Opinión]

1. **Un hecho en lugar de un adjetivo.** No: «excelencia contrastada». Sí: «del 66 % al 92 %».
2. **El mérito, al cliente.** «Los casos los encuentran los propios equipos.» (ya existe)
3. **Admitir límites.** «No todo necesita un agente.» (ya existe)
4. **Hablar del lector más que de uno mismo.** Hoy muchas frases empiezan con «Formamos…», «Construimos…», «Diseñamos…». Hay que dar la vuelta a algunas para que el sujeto sea el cliente o el resultado: «Tu equipo usa la IA en su trabajo. Y la sigue usando.».
5. **Seguridad tranquila.** Punto final, sin superlativos ni exclamaciones.
6. **Servir antes de vender.** Diagnóstico, acta de muestra y primer paso por escrito.

---

## 8. Urgencia ética para el comité de dirección

### 8.1 Prueba de urgencia ética: cinco preguntas [Opinión]

1. ¿Es verdad y se puede verificar con una fuente?
2. ¿Afecta a este lector en concreto?
3. ¿Existiría aunque Spiralia no existiera, o la estamos fabricando?
4. ¿Propone un paso proporcional (3 horas, 30 minutos), no un salto?
5. ¿La firmaría un socio de consultoría estratégica delante del cliente?

Si alguna respuesta es «no», esa urgencia no va en la web.

### 8.2 Seis fuentes de urgencia real

| # | Fuente | Fundamento | Copy ES / EN |
|---|---|---|---|
| 1 | Dinero que ya se gasta | Las licencias se pagan se usen o no (sin cifra; la cuenta la hace el lector) | «Multiplica tus licencias por su precio mensual. Es lo que pagas cada mes, se usen o no.» / «Multiply your licenses by their monthly price. That's what you pay every month, used or not.» |
| 2 | La ventana tras el lanzamiento | El uso semanal tocó techo en el 55 % y acabó por debajo del 40 % (Dillon et al., [NBER w33795](https://www.nber.org/papers/w33795), ya en la web) | «Lo que no se convierte en hábito en las primeras semanas se enfría.» / «What doesn't become a habit in the first weeks cools off.» |
| 3 | La brecha que se agranda | El 6 % de McKinsey, ya en `cifras.toml`; mecanismo de la ventaja compuesta (R1, §3) | «Quien ya rediseña su trabajo no va un paso por delante. Va una curva por delante.» / «Those already redesigning their work aren't one step ahead. They're a whole curve ahead.» (03, 1.A) |
| 4 | La regulación, en tono sobrio | El artículo 4 se aplica desde el 2 de febrero de 2025 ([Reglamento (UE) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)). El Ómnibus de 2026 lo recalibra: sigue obligando a tomar medidas, pero sin certificar a cada persona (02, §5) | «Desde 2025, la ley europea pide que tu plantilla sepa usar la IA que usa. Sin certificados. Con pruebas de lo hecho.» / «Since 2025, EU law requires your people to know how to use the AI they use. No certificates. Evidence of what's been done.» |
| 5 | El calendario | Hoy es 19 de octubre de 2026: los comités cierran el presupuesto de 2027 | «Si la IA va a estar en el presupuesto de 2027, que llegue con un plan.» / «If AI is going into your 2027 budget, make sure it comes with a plan.» **[requiere alta de 2027 en cifras.toml; retirar en el primer trimestre de 2027]** |
| 6 | La capacidad real | Solo si Spiralia limita los despliegues simultáneos de sus FDE | «Cada FDE trabaja con un solo equipo a la vez.» / «Each FDE works with one team at a time.» [confirmar] |

**Lo que no se usa:**

- «El 95 % de los pilotos fracasa» (R1, §3).
- «Multas de hasta 35 millones por no formar». Es falso: esa cifra es para prácticas prohibidas (02, §5.5).
- Nombrar a competidores del cliente.
- «O te adaptas o desapareces».

### 8.3 El coste de no hacer nada en un trimestre, como ejercicio del lector

Sin calculadora ni cifras de Spiralia. Tres líneas que el CEO completa mentalmente. Encaja al final de El reto o en el resultado del diagnóstico [Opinión].

> **Lo que cuesta esperar un trimestre** / *What waiting one quarter costs*
> 1. Tus licencias × su precio × tres meses. / *Your licenses × their price × three months.*
> 2. Las horas que tu gente no recupera. / *The hours your people don't get back.*
> 3. La distancia con quien ya rediseña su trabajo. / *The gap with those already redesigning their work.*

Ojo con el build: «tres meses» va en palabras. Si se pone «3 meses», la cifra 3 ya existe en `cifras.toml` (como horas y minutos), así que pasaría la comprobación aunque se refiera a otra cosa. Mejor en palabras.

---

## 9. Mapa de palancas por sección

**La secuencia persuasiva de la página [Opinión].** Es AIDA en el conjunto y PAS (problema, agitación, solución) en el tramo central:

1. **Hero:** atención y ver el éxito.
2. **Franja de prueba:** credibilidad inmediata.
3. **El reto:** el problema y la pérdida.
4. **Método:** claridad y autoridad.
5. **Formatos:** un compromiso pequeño.
6. **Personalización y Construimos:** ver el éxito y unidad.
7. **Para ti:** que cada perfil se reconozca, con sus objeciones.
8. **Pruebas:** prueba social.
9. **Quiénes somos:** autoridad colectiva y unidad.
10. **Diagnóstico:** reciprocidad y compromiso.
11. **Preguntas:** reversión del riesgo.
12. **Cierre:** urgencia ética, reciprocidad y el pico final.
13. **Pie:** discreción y confianza.

Cada bloque siguiente indica:

- **Objetivo** de la sección.
- **Palanca principal y secundarias.**
- **Copy** en ES y EN (propuestas; las cifras, de `cifras.toml`).
- **Evitar.**

### 9.1 Barra de navegación

- **Objetivo:** orientar y dar siempre a mano el paso siguiente.
- **Palancas:** autoridad discreta y poca fricción.
- **Propuesta:**
  - Añadir «Casos» / «Cases» al menú. La palabra ya funciona como prueba social antes de leer nada.
  - Cambiar «Quiénes somos» por «Spiralia» o «Equipo» / «Team».
  - CTA persistente: «Empieza por Rumbo» / «Start with Rumbo», o mantener «Hablemos» / «Let's talk».
- **Evitar:** dos botones en la barra o un menú de más de cinco entradas.

### 9.2 Hero (vídeo a pantalla completa)

- **Objetivo:** que el CEO **vea el resultado** en 5 segundos y sepa qué hacer.
- **Palanca principal:** ver el éxito (Apple), con la prueba pegada.
- **Palancas secundarias:**
  - ganancia (la pérdida se reserva para El reto);
  - autoridad de la marca colectiva;
  - un riesgo bajo en el microtexto del CTA.
- **Copy recomendado.** Es una variante de R1, §10, que encaja con un vídeo de personas trabajando:

| Pieza | ES | EN |
|---|---|---|
| Antetítulo | «Spiralia · Inteligencia artificial para empresas» | «Spiralia · AI for companies» |
| H1 (opción A, ver el éxito y prueba) | «Imagina a toda tu empresa usando la IA cada semana.» | «Picture your whole company using AI every week.» |
| Línea de prueba bajo el H1 | «En ING España, ya lo hace el 92 %.» | «At ING Spain, 92% already do.» |
| Subtítulo (19 palabras) | «Spiralia forma a cada persona con su propio trabajo y construye con tus equipos hasta que la IA rinde.» | «Spiralia trains every person on their own work and builds with your teams until AI delivers.» |
| CTA principal | «Empieza por Rumbo» | «Start with Rumbo» |
| Microtexto del CTA (reversión del riesgo) | «3 horas con tu comité para decidir dónde entra la IA primero.» | «3 hours with your leadership team to decide where AI comes in first.» |
| Enlace secundario | «¿Dónde está tu empresa? Diagnóstico en 3 minutos» (ya existe) | «Where does your company stand? 3-minute assessment» |

- **H1 alternativos:**
  - **Opción B, pérdida:** «Ya pagas la IA. Ahora, que trabaje.» Mejor como H2 de El reto.
  - **Opción C, diferencial:** «La IA, en el idioma de tu negocio.» Mejor como H2 de Quiénes somos.
- **Comprobaciones antes de publicar:**
  - Que el permiso de uso de ING cubra el hero.
  - Que «92 %» se entienda como usuarios activos semanales: el subtítulo o el `title` lo dicen.
- **Evitar:**
  - Más de una idea.
  - Jerga («desplegar», «agentes», «FDE»).
  - Inglés en la versión española: el antetítulo actual dice «AI adoption, end-to-end.».
  - Tres accesos por perfil compitiendo con el CTA. Pasan a la franja de debajo (R2, §5.2).

### 9.3 Franja de prueba (justo bajo el pliegue)

- **Objetivo:** credibilidad inmediata.
- **Palanca principal:** prueba social.
- **Palancas secundarias:** unidad y autoridad.
- **Copy:**
  - ES: «Equipos que ya trabajan así» y, debajo, los logos.
  - EN: «Teams already working this way».
  - Tres cifras en una fila: «50.000 personas formadas · ING: del 66 % al 92 % de uso semanal · Deloitte: 13.000 en un mes» / «50,000 people trained · ING: weekly use from 66% to 92% · Deloitte: 13,000 in one month».
  - Accesos por perfil: «Empieza por lo tuyo: Diriges la compañía · Diriges Personas · Diriges Formación» (ya existen).
- **Evitar:**
  - Repetir las mismas cifras en el cartel del vídeo y en la franja (R2 ya lo señala).
  - Logos restringidos (KPMG, Santander).

### 9.4 El reto

- **Objetivo:** que el lector reconozca su problema como propio y vea lo que le cuesta.
- **Palanca principal:** aversión a la pérdida y coste de no actuar.
- **Palancas secundarias:** autoridad prestada (Dillon, McKinsey, BCG) y prueba social negativa (el 6 % frente al resto).
- **Copy:**

| Pieza | ES | EN |
|---|---|---|
| H2 | «Ya pagas la IA. Ahora, que trabaje.» | «You already pay for AI. Now put it to work.» |
| Agitación tras el dato de Dillon | «Mientras tanto, la licencia se paga igual.» | «Meanwhile, the license costs the same.» |
| Puente hacia el 6 % | «El 6 % que ya lo ve en su beneficio no tiene otra IA. Tiene otra forma de trabajar.» | «The 6% already seeing it in their profit don't have different AI. They work differently.» |
| Ejercicio del coste trimestral | El de 8.3 | El de 8.3 |
| Remate | «No nos quedamos en la formación. Nos quedamos hasta que funciona.» (ya existe) | «We don't stop at training. We stay until it works.» |

- **Evitar:**
  - Tres estudios seguidos sin aire: una cifra por pantalla.
  - Culpar al lector («estás tirando el dinero»).
  - Cifras sin fuente.

### 9.5 Cómo trabajamos (SPIRAL)

- **Objetivo:** que el método se entienda y quitar la sensación de proyecto eterno.
- **Palanca principal:** autoridad por método.
- **Palancas secundarias:**
  - **Compromiso:** cada paso deja algo.
  - **Reversión del riesgo:** límites por escrito y traspaso.
- **Copy:**
  - Entradilla:
    - ES: «Seis pasos. Cada uno deja algo funcionando.»
    - EN: «Six steps. Each one leaves something working.»
  - Remate (ya existe):
    - ES: «Nuestro mejor resultado: equipos que ya no nos necesitan.»
    - EN: «Our best result: teams that no longer need us.»
  - Primera aparición de FDE, sin sigla en el titular:
    - ES: «Un ingeniero de Spiralia se sienta con tu equipo y construye allí mismo.»
    - EN: «A Spiralia engineer sits with your team and builds right there.»
- **Evitar:** abrir la sección con la sigla del método o con «FDE».

### 9.6 Formatos

- **Objetivo:** que el primer paso sea fácil de aprobar.
- **Palanca principal:** compromiso pequeño (pie en la puerta).
- **Palancas secundarias:**
  - **Anclaje de esfuerzo:** 3 horas.
  - **Recomendación JOLT:** Rumbo como primer paso marcado.
  - **Cualificación:** señal boutique.
- **Copy:**

| Pieza | ES | EN |
|---|---|---|
| H2 (ya existe) | «Empieza en 3 horas. Sigue a tu ritmo.» | «Start in 3 hours. Continue at your own pace.» |
| Rumbo en una línea (antes y después) | «Tu comité entra con preguntas. Sale con un plan.» | «Your leadership team walks in with questions. And out with a plan.» |
| Cualificación | «Rumbo no es una charla inspiradora. Es una sesión para decidir.» | «Rumbo isn't an inspirational talk. It's a session to decide.» |
| Contraste de escala | «Formamos a 13.000 personas en un mes. Contigo empezamos con 3 horas.» | «We trained 13,000 people in one month. With you, we start with 3 hours.» |
| Garantía (decisión de Jose) | La de 4.7 | La de 4.7 |

- **Evitar:**
  - Tres formatos con el mismo peso visual.
  - «Desde X €».
  - «Sin compromiso» como muletilla.

### 9.7 Personalización

- **Objetivo:** que cada perfil se vea a sí mismo usando la IA.
- **Palanca principal:** ver el éxito (antes y después).
- **Palancas secundarias:** simpatía por similitud y oficio (señal boutique).
- **Copy:**
  - Ya existe y es muy bueno: «Así cada persona aprende con su lunes por la mañana. Por eso se queda.».
  - Añadir una microescena ilustrativa:
    - ES: «Lunes, 9:00. La directora comercial abre el correo: la propuesta ya está en borrador, con sus fuentes. Ella decide el precio.»
    - EN: «Monday, 9 a.m. The sales director opens her inbox: the proposal is already drafted, with its sources. She decides the price.»
  - Cuidado con el build: «9:00» introduce un 9 que no está en `cifras.toml`. Si falla, usar «Lunes por la mañana» / «Monday morning».
- **Evitar:** ejemplos de otro sector o demos sin la etiqueta «Ejemplo ilustrativo».

### 9.8 Lo que construimos (FDE)

- **Objetivo:** que el CEO vea el valor grande y que el CTO no se asuste.
- **Palanca principal:** unidad (negocio e ingeniería en tu mesa).
- **Palancas secundarias:**
  - **Autoridad:** la pareja negocio e ingeniería, el patrón Palantir y Distyl (R1, §8.6).
  - **Ver el éxito:** la galería de demostraciones.
  - **Reversión del riesgo:** «Decide la persona».
- **Copy:**

| Pieza | ES | EN |
|---|---|---|
| H2 | «Un consultor que entiende tu negocio. Un ingeniero que lo construye. En tu mesa.» | «A consultant who understands your business. An engineer who builds it. At your table.» |
| Línea de control | «El agente prepara. Una persona decide.» (ya existe) | «The agent prepares. A person decides.» |
| Propiedad | «Lo que construimos vive en tus sistemas. Y es tuyo.» | «What we build lives in your systems. And it's yours.» [confirmar la propiedad intelectual] |

- **Evitar:** «agentic», «LLM», «RAG» y «orquestación» sin traducir.

### 9.9 Para ti (CEO, Personas, Formación y un bloque nuevo para el CTO)

- **Objetivo:** que cada perfil se reconozca y vea su miedo resuelto.
- **Palanca principal:** que el lector se identifique con su perfil (compromiso) y la simpatía de la voz interna.
- **Palancas secundarias:** un marco de pérdida y ganancia a medida de cada perfil y la reversión de su riesgo concreto.

| Perfil | Palanca | ES | EN |
|---|---|---|---|
| CEO | Pérdida ante el consejo y resultado presentable | «Dentro de un año, tu consejo preguntará qué ha cambiado. Que la respuesta quepa en una cifra.» | «A year from now, your board will ask what changed. Make the answer fit in one number.» |
| Personas | Miedo de la plantilla convertido en confianza | «Tu gente no teme a la IA. Teme quedarse atrás.» y, debajo, «Formamos a todos, del comité a la primera línea, sin que nadie lo viva como una amenaza.» | «Your people don't fear AI. They fear being left behind.» / «We train everyone, from the leadership team to the front line, without anyone feeling threatened.» |
| Formación | Autoridad ante la dirección | «La encuesta salió bien. ¿Y el uso?» (ya existe) y, debajo, «Mide lo que tu dirección quiere ver: uso real, no horas.» | «The survey came out well. And usage?» / «Measure what leadership wants to see: real usage, not hours.» |
| CTO (nuevo) | Reversión del riesgo y autoridad técnica sin jerga | «Dentro de tu entorno. Con las herramientas que aprueba tu IT. Con registro de lo que hace cada agente.» | «Inside your environment. With the tools your IT approves. With a log of what every agent does.» |

- **Nota sobre la frase de Personas.** Apoya en datos de España (el 74 % teme quedarse atrás, 02, §6.3). En la web va sin cifra; si se quiere con cifra, [requiere alta en cifras.toml].
- **Evitar:** el mismo CTA en las tres pestañas. Mantener uno distinto por perfil, como ahora.

### 9.10 Pruebas

- **Objetivo:** convencer con pares.
- **Palanca principal:** prueba social con nombre y cifra.
- **Palancas secundarias:**
  - **Marco de comparación:** 4,7 frente a 3,2.
  - **Autoridad por rigor:** fuente al pie.
  - **Discreción:** casos sin nombre.
- **Copy:**
  - H2 (ya existe):
    - ES: «No lo contamos. Ya lo estamos haciendo.»
    - EN: «We don't just talk about it. We're already doing it.»
  - Testimonios con el guion de 3.3 y, si es posible, en vídeo.
  - Referencia de cliente bajo petición (3.3).
  - Línea de discreción (7.1).
- **Evitar:**
  - Testimonios genéricos («Excelente formación»).
  - Iniciales en lugar de nombre y cargo.

### 9.11 Quiénes somos (Spiralia, no Ana)

- **Objetivo:** autoridad colectiva y respuesta a «¿quién está detrás?».
- **Palanca principal:** unidad (origen común).
- **Palancas secundarias:** autoridad colectiva, trayectoria de la marca y simpatía (caras del equipo).
- **Copy:**

| Pieza | ES | EN |
|---|---|---|
| H2 | «La IA, en el idioma de tu negocio.» | «AI, in the language of your business.» |
| Entradilla | «Somos un equipo de consultores de estrategia, ingenieros y profesores universitarios. Venimos de McKinsey, KPMG y EY-Parthenon. Hemos estado al otro lado de la mesa.» | «We're a team of strategy consultants, engineers and university lecturers. We come from McKinsey, KPMG and EY-Parthenon. We've been on the other side of the table.» |
| Trayectoria | «Más de una década formando a empresas.» [confirmar] | «More than a decade training companies.» |

- **Formato del equipo:** una retícula de equipo de 3 a 6 personas con su papel en el método (estrategia, formación, FDE). Ana es una más, como CEO, con una línea. Nada de biografía larga.
- **Evitar:**
  - Una sola cara grande.
  - Biografías de CV con doctorados y MBA delante del mensaje: van en una línea.

### 9.12 Diagnóstico

- **Objetivo:** dar valor antes de pedir nada y preparar el siguiente paso.
- **Palanca principal:** reciprocidad.
- **Palancas secundarias:**
  - **Compromiso:** 8 respuestas son 8 pequeños síes.
  - **Comparación social:** el nivel.
  - **Material para el campeón interno:** «para tu comité».
- **Copy:**
  - Entradilla:
    - ES: «Tres minutos. Sin datos. Un resultado que puedes llevar a tu comité.»
    - EN: «Three minutes. No data required. A result you can take to your leadership team.»
  - Resultado: el nivel, una frase sobre qué tienen las empresas que están un nivel por encima y el siguiente paso proporcional (3.2).
  - Ejemplo:
    - ES: «Las empresas en Hábito ya han elegido sus primeros casos. Tu siguiente paso: Rumbo.»
    - EN: «Companies at Habit have already chosen their first cases. Your next step: Rumbo.»
- **Evitar:**
  - Pedir el email antes del resultado.
  - Un resultado que suene a examen suspendido. Hay que formularlo como punto de partida, como ya se hace.

### 9.13 Preguntas del comité

- **Objetivo:** desactivar el miedo a equivocarse (JOLT).
- **Palanca principal:** reversión del riesgo.
- **Palancas secundarias:** autoridad (respuestas cortas y exactas) y simpatía (candor).
- **Objeciones duras que faltan [Opinión].** Cada respuesta, en dos frases como máximo y con una prueba:

| Pregunta | Respuesta (ES) | EN |
|---|---|---|
| «¿Sois lo bastante grandes para nosotros?» | «En Deloitte España formamos a 13.000 personas en un mes. Somos una boutique por cómo trabajamos, no por lo que abarcamos.» | «Are you big enough for us?» / «At Deloitte Spain we trained 13,000 people in one month. We're a boutique in how we work, not in what we can take on.» |
| «¿Y si no funciona?» | «Empezamos por algo pequeño y medible: Rumbo, 3 horas. Cada caso se prueba con casos reales antes de usarse.» | «What if it doesn't work?» / «We start small and measurable: Rumbo, 3 hours. Every case is tested on real cases before it's used.» |
| «¿Nos quedamos con lo construido?» | «Sí. Vive en tus sistemas y te dejamos el manual, las pruebas y la formación para mantenerlo.» [confirmar] | «Do we keep what's built?» / «Yes. It lives in your systems, and we leave you the manual, the tests and the training to maintain it.» |
| «Ya tenemos un partner de Microsoft.» | «Perfecto: trabajamos con la IA que ya tiene tu empresa. Ellos ponen la herramienta; nosotros, que se use en cada puesto.» | «We already have a Microsoft partner.» / «Great: we work with the AI you already have. They bring the tool; we make it work in every role.» |
| «¿Por qué ahora y no dentro de seis meses?» | «Porque el uso se enfría en semanas y las licencias se pagan igual. Y porque quien ya rediseña su trabajo va una curva por delante.» | «Why now and not in six months?» / «Because usage cools off within weeks and the licenses cost the same. And those already redesigning their work are a whole curve ahead.» |

- **Ajustes a lo que ya existe:**
  - Quitar «sin compromiso» de la respuesta al precio y sustituirlo por algo concreto: «Lo vemos en 30 minutos y te llevas una propuesta de primer paso.» / «We'll go through it in 30 minutes and you'll leave with a proposed first step.».
  - La respuesta del partner ya sigue la regla 3 de la guía de estilo: «la IA que ya tiene tu empresa», no «la IA que ya tenéis».

### 9.14 Cierre

- **Objetivo:** el pico final y la acción.
- **Palanca principal:** reciprocidad (te llevas algo) y urgencia ética.
- **Palancas secundarias:**
  - **Unidad:** «hablas con quien lo va a hacer», con el equipo y no con dos personas.
  - **Reversión del riesgo.**
- **Copy:**

| Pieza | ES | EN |
|---|---|---|
| H2 (se mantiene la idea) | «Hablas con quien lo va a hacer.» | «You talk to the people who will do it.» |
| Subtítulo | «Treinta minutos. Te llevas el primer paso por escrito, trabajes o no con nosotros.» | «Thirty minutes. You leave with the first step in writing, whether or not you work with us.» |
| Urgencia bajo el botón | «Si la IA va a estar en el presupuesto de 2027, que llegue con un plan.» [alta de 2027] o «Cada trimestre cuenta.» (ya existe) | «If AI is going into your 2027 budget, make sure it comes with a plan.» / «Every quarter counts.» |
| Pie de foto | Foto de grupo o retícula del equipo: «El equipo de Spiralia» | «The Spiralia team» |

- **Cambios fuera del copy:**
  - Texto legal: cambiar `ana.iza@spiralia.es` por un buzón genérico (por ejemplo, privacidad@ o hola@) [confirmar cuál existe].
  - Reserva: un calendario de equipo en Microsoft Bookings, no la agenda personal de Ana.
- **Evitar:**
  - Dos fotos con nombre como única imagen.
  - Formularios largos.
  - «Contáctanos».

### 9.15 Pie

- **Objetivo:** confianza y discreción.
- **Palancas:** autoridad tranquila y señal de privacidad. «Esta página no usa cookies.» ya es una señal de respeto excelente.
- **Copy opcional:**
  - ES: «Spiralia · Madrid · Formación y despliegue de IA para empresas desde hace más de una década» [confirmar].
  - EN: «Spiralia · Madrid · AI training and deployment for companies for more than a decade».
- **Evitar:** suscripción al boletín con la casilla premarcada o redes sociales sin actividad.

### 9.16 Después del clic (confirmación y recordatorio)

- **Objetivo:** que la reunión se celebre. 01 documenta el problema de las reuniones que no se celebran.
- **Palancas:** compromiso (confirmar la cita) y reciprocidad (preparar algo).
- **Copy de confirmación:**
  - ES: «Hecho. Antes de vernos, piensa en una tarea que se repite cada semana en tu equipo. Empezaremos por ahí.»
  - EN: «Done. Before we meet, think of a task your team repeats every week. We'll start there.»

---

## 10. Prohibiciones: lo que restaría clase

1. **Escasez inventada:** contadores, «últimas plazas», «oferta válida hasta» y fechas que se renuevan.
2. **Exclamaciones, mayúsculas sostenidas y emojis**, en ES y en EN.
3. **Palabras vacías de consultora o de *startup*:** revolucionario, disruptivo, líderes, de vanguardia, soluciones integrales, potenciar, sinergias, 360, *game changer*, mágico.
4. **Superlativos sin prueba:** «los mejores», «únicos», «número 1».
5. **Cifras de miedo frágiles:** «el 95 % de los pilotos fracasa», «multas de 35 millones por no formar» (R1, §3; 02, §5.5).
6. **Atacar a terceros por su nombre** (Big Four, «los técnicos», partners de Microsoft) o ridiculizarlos.
7. **Jerga en la primera pantalla:** desplegar, agéntico, LLM, RAG, *prompt engineering*. La sigla FDE solo después de explicarla en una línea.
8. **Inglés innecesario en la versión española**, como el antetítulo «AI adoption, end-to-end.». Se admiten los nombres propios (Microsoft 365 Copilot) y, en Formación, «champions» si se explica.
9. **Una persona como marca:** foto, agenda y email de una sola persona en el cierre y en el texto legal.
10. **Testimonios genéricos o anónimos** («Juan P., CEO»). Mejor ninguno que uno falso o vago.
11. **Imágenes de archivo de IA:** robots, cerebros azules, hologramas, manos que se tocan.
12. **Logos sin permiso o restringidos** (KPMG, Santander).
13. **Pedir datos antes de dar valor:** contenido tras formulario, email antes del resultado.
14. **Ventanas emergentes**, chat que asalta, avisos al intentar salir y vídeo con sonido automático.
15. **Promesas que no se pueden garantizar:** «ROI garantizado», «en 90 días» si el método no lo asegura.
16. **Culpar o humillar al lector:** «estás tirando el dinero», «tu empresa va tarde».
17. **Catastrofismo:** «o te adaptas o desapareces», «la IA te sustituirá».
18. **Tú, vosotros y usted mezclados** en la misma página.
19. **Erratas y glifos rotos.** Hoy, la «á» de Butler («M s de 50.000», «¿Cu nto cuesta?»). Es la prohibición número uno en una marca que vende rigor.
20. **Titulares de más de 12 palabras** y párrafos de más de tres líneas en el móvil.
21. **Dos CTA del mismo peso visual** en la misma pantalla.
22. **«Sin compromiso» y «gratis» como muletillas.** Es mejor decir qué se lleva el cliente.
23. **Humor y juegos de palabras que no aguantan una lectura en voz alta** ante un comité.

---

## 11. Guía de estilo de copy para esta web: 15 reglas

1. **Una idea por bloque y un titular en dos tiempos.** Planteamiento y giro, cada uno terminado en punto.
   - Sí: «Misma herramienta. Mismo grupo. La diferencia, la formación.».
   - No: titulares con «y» que suman dos ideas.
2. **Corto por defecto.**
   - Titulares de 12 palabras o menos.
   - Subtítulos de 20 o menos.
   - Frases del cuerpo de 20 o menos.
   - Párrafos de tres líneas como máximo en el móvil.
3. **«Tú» al lector, siempre en singular:** «tu empresa», «tu comité», «tu equipo». Nunca «usted» y nunca «vosotros», salvo dentro de una cita. Hoy se cuelan «tenéis», «sabéis», «estáis», «usáis», «construís», «gobernáis» y «vuestra», sobre todo en los niveles del diagnóstico y en Formatos.
4. **Primero el resultado, después el método y al final quién lo hace.** Antes de explicar SPIRAL, que se vea qué cambia en el trabajo.
5. **La prueba de la cámara.** Si un titular no se puede filmar, reescríbelo con un momento, un objeto y un sujeto con cargo.
6. **Una cifra por pantalla, con fuente y fecha, y dada de alta en `cifras.toml`.** Precisa, nunca redondeada hacia arriba. El formato numérico, el de cada idioma (66 % y 66%; 13.000 y 13,000).
7. **Pérdida en el problema, ganancia en la solución.** El reto y el cierre pueden hablar de lo que se pierde. El hero, las pruebas y los perfiles, de lo que se gana.
8. **Palabras de negocio, no de técnico:** cuenta de resultados, margen, comité, plantilla, proceso, decisión. Un término técnico solo si es imprescindible, y definido en una línea la primera vez.
9. **Hechos en lugar de adjetivos.** Cada adjetivo de autoelogio se sustituye por un dato o se borra.
10. **Spiralia habla en plural y las personas aparecen como equipo.** Ningún nombre propio de Spiralia en titulares ni en CTA.
11. **Cada CTA dice qué pasa y cuánto cuesta en tiempo:** «Reserva 30 minutos», «Empieza por Rumbo · 3 horas». Nunca «Contáctanos», «Saber más» ni «Enviar».
12. **La urgencia, solo si pasa la prueba de 8.1.** Nunca escasez inventada. Como máximo, una línea de urgencia por pantalla.
13. **Cada objeción, con nombre y respuesta en dos frases con una prueba.** Sin evasivas («depende») sin concretar a continuación.
14. **Punto final, sin exclamaciones, ritmo de tres y una figura retórica por pantalla como máximo.** Si hay contraste en el titular, el cuerpo va llano.
15. **Lo que ES y EN comparten es la idea, no la letra.** Misma idea y misma cifra, en el idioma natural de cada uno: *P&L*, *leadership team*, «cuenta de resultados», «comité de dirección». Revisión nativa del inglés antes de producción (ya está en el LEEME).

**Comprobación automática [Opinión].** Las reglas 2, 3, 8, 14 y parte de la 10 se pueden comprobar en `build.py`, como ya se hace con las cifras:

- avisar de «!» y de las palabras de la lista de prohibiciones 3 y 4;
- avisar de las formas de «vosotros» en ES (tenéis, vuestro, sabéis…);
- avisar de las frases de más de 12 palabras en claves `h1*`, `h2*` y `*_h`;
- avisar de «Ana» fuera de `[pq]`.

---

## 12. Recomendaciones priorizadas

| Prioridad | Qué | Por qué | Dónde |
|---|---|---|---|
| P0 | Arreglar el glifo «á» de Butler 400 (fuente de reserva para el carácter, subconjunto regenerado o peso alternativo) | Una errata visible anula la autoridad por rigor y la fluidez de lectura | `src/css/site.css`, fuentes |
| P0 | Pasar de Ana a Spiralia: sujeto colectivo, retícula de equipo, buzón genérico, Bookings de equipo, trayectoria de la marca | Responde a la queja del cliente; la autoridad colectiva escala y desactiva «¿y si mañana no estáis?» | `[pq]`, `[cta]`, `build.py` (BOOKINGS) |
| P0 | Hero: H1 que deje ver el éxito y se pueda filmar, prueba de ING pegada, subtítulo de 20 palabras o menos, CTA con nombre y tiempo, sin inglés en ES | Hoy es abstracto y con jerga; con vídeo a pantalla completa el titular y la imagen tienen que reforzarse | `[hero]` |
| P0 | Hacer visible el coste de no actuar en El reto y el cierre (ejercicio del lector, «la licencia se paga igual»), sin escasez falsa | Es la palanca más fuerte que falta; urgencia «a lo Monge Malo» con clase | `[reto]`, `[cta]` |
| P1 | Reversión del riesgo explícita: microtexto del CTA, objeciones duras en la FAQ, propiedad de lo construido, garantía de claridad (si Jose la acepta) | En B2B frena más el miedo a equivocarse que el statu quo (JOLT) | `[hero]`, `[fmt]`, `[faq]` |
| P1 | Testimonios reales con el guion de cuatro preguntas y referencia de cliente bajo petición | Es el nivel 1 de prueba social y hoy está vacío (`[PLACEHOLDER]`) | `[pr]` |
| P1 | Bloque CTO y franja de prueba con «Equipos que ya trabajan así» y el experimento natural de ING | Amplía el comité de compra y adelanta la mejor prueba | `[pt]`, franja bajo el hero |
| P1 | Urgencia de calendario «presupuesto de 2027», con fecha de retirada | Urgencia real y oportuna en octubre | `[cta]`, `cifras.toml` |
| P1 | Diagnóstico: resultado con comparación de nivel, siguiente paso proporcional y versión para el comité | Reciprocidad y compromiso; arma al campeón interno (compradores ocultos) | `[dg]`, `[[data.diag.n]]` |
| P2 | Unificar «tú» (fuera «vosotros»), subir «Hemos estado al otro lado de la mesa», añadir «Casos» a la barra de navegación | Coherencia de voz y unidad | Todo `content.toml`, `[nav]` |
| P2 | Señales boutique: cualificación de Rumbo, discreción, oficio visible y trayectoria de marca | Clase sin arrogancia | `[fmt]`, `[pr]`, `[pq]`, `[ft]` |
| P2 | Comprobación de estilo en `build.py` | Que las 15 reglas no se pierdan con las ediciones | `build.py` |

---

## 13. Cómo comprobar que funciona

[Opinión, apoyada en 01, §2.5]

- **Prueba de los cinco segundos con 5 directivos del ICP** (CEO y RR. HH.): «¿Qué hace Spiralia? ¿Para quién? ¿Qué harías ahora?». Si no responden las tres, el hero no está terminado.
- **Lectura en voz alta ante alguien de fuera:** ningún titular debe provocar una mueca. Es la prueba de clase.
- **Medición desde el primer día:**
  - embudo: visitas → clics en el CTA → diagnósticos completados → reservas → reuniones celebradas → propuestas (01);
  - profundidad de scroll hasta Pruebas;
  - pestaña de perfil elegida.
- **Si hay tráfico suficiente, una prueba A/B del H1:** opción A (ver el éxito y prueba) frente a opción B (pérdida). Si no lo hay, validación cualitativa con 5 clientes.

---

## Fuentes

**Consultadas en esta sesión (búsqueda web)**

- Principio de unidad de Cialdini: [Copyblogger](https://copyblogger.com/?p=77794) · [Rocket Agency](https://rocketagency.com.au/?p=6392) · [Prospeo, «Persuasion in Sales» (2026), proveedor](https://prospeo.io/s/persuasion-in-sales)
- Isra Bravo: [Merca2](https://www.merca2.es/2023/07/05/isra-bravo-el-copywriter-mas-cotizado-y-terror-de-las-redes-sociales-1369551/) · [Hola, entrevista](https://www.hola.com/estar-bien/20220401207157/entrevista-isra-bravo-dislexico-millon-de-euros/) · [Quelibroleo](https://quelibroleo.com/escribo-porque-me-gusta-ganar-dinero) · [Goodreads](https://www.goodreads.com/book/show/123166114) · [VideoHighlight, plantillas del curso](https://videohighlight.com/v/JPPzc4QpdDU) · [Doofinder, pódcast](https://www.doofinder.com/es/podcast/copywriting-ventas-online)
- Monge Malo (guía de un tercero, no fuente primaria): [Gumroad](https://tonirat.gumroad.com/l/nopix)
- *The JOLT Effect* y la indecisión del comprador: [Penguin Random House](https://penguinrandomhouse.com/books/isbn/9780593538104) · [The SaaS Barometer](https://thesaasbarometer.substack.com/p/the-jolt-effect-with-matt-dixon-author) · [CustomerThink](https://customerthink.com/no-decisions-why-they-happen-and-what-you-can-do-about-them/) · [Notion Capital](https://www.notioncapital.com/resources/overcoming-inertia-in-the-buying-decision-is-the-single-biggest-challenge-facing-every-saas-company-today) · [Douglas Cole](https://douglascole.substack.com/p/managing-customer-indecision)

**Tomadas de R1 y R2 (mismo flujo, verificadas allí)**

- Copy de Apple: [Enchanting Marketing](https://www.enchantingmarketing.com/write-like-apple/) · [Neil Patel](https://neilpatel.com/blog/write-copy-like-apple/) · [Leadpages](https://leadpages.com/blog/landing-pages-apple-borrow-apples-best-copywriting-techniques-copy)
- Compradores ocultos y liderazgo de pensamiento: [Edelman y LinkedIn 2025](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report)
- Miedo competitivo de los CEO: [IBM, mayo de 2025](https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles) · [Gartner, mayo de 2025](https://www.gartner.com/en/newsroom/press-releases/2025-05-06-gartner-survey-reveals-that-ceos-believe-their-executive-teams-lack-ai-savviness)
- Crítica al «95 % de los pilotos fracasa»: [arnon.dk](https://arnon.dk/mits-95-ai-failure-rate-is-wrong/)

**Del repo**

- `investigacion/01_benchmark_y_cta.md`: Gartner 2025, 6sense 2025, Forrester 2019, evidencia sobre el CTA y las reuniones que no se celebran.
- `investigacion/02_icp_arquetipos.md`:
  - miedos y objeciones por ICP;
  - artículo 4 del Reglamento de IA: [EUR-Lex, Reglamento (UE) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) y el Ómnibus de 2026.
- `investigacion/03_banco_mensajes.md`: copies reutilizados («Esperar también tiene coste.», «una curva por delante»…).
- `src/cifras.toml` y `FUENTES.md`: [NBER w33795](https://www.nber.org/papers/w33795), McKinsey «The state of AI in 2026», BCG «AI at Work» 2026 y los programas de ING, Deloitte y CCEP.

**Referencias clásicas [no verificadas en esta sesión; no citarlas en la web sin comprobarlas]**

- Cialdini, *Influence* (1984; edición ampliada de 2021) y *Pre-Suasion* (2016).
- Kahneman y Tversky, «Prospect Theory», *Econometrica* (1979).
- Tversky y Kahneman, «Judgment under Uncertainty», *Science* (1974), y «The Framing of Decisions», *Science* (1981).
- Samuelson y Zeckhauser, «Status Quo Bias in Decision Making», *Journal of Risk and Uncertainty* (1988).
- Freedman y Fraser, sobre el pie en la puerta (1966).
- Aronson, Willerman y Floyd, sobre el efecto *pratfall* (1966).
- Norton, Mochon y Ariely, sobre el efecto IKEA (2012).
- Reber y Schwarz, sobre fluidez y verdad percibida (1999).
- Schwartz, *Breakthrough Advertising* (1966).
- Kapferer y Bastien, *The Luxury Strategy* (2009).
- Dixon y McKenna, *The JOLT Effect* (2022).
