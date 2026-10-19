# Sección de IA de la web de Spiralia · Benchmark de referentes y evidencia sobre el CTA B2B

Informe de investigación · 14 de octubre de 2026 · Solo lectura: no se ha enviado ningún formulario, ni abierto chats, ni aceptado cookies, ni creado cuentas.

**Para qué sirve.** Dar a quien diseñe la sección de IA de la web de Spiralia (1) qué hacen las mejores webs de consultoras, escuelas de negocio, empresas de formación en IA y laboratorios cuando venden IA a empresas, y (2) qué dice la evidencia sobre el tipo de llamada a la acción (CTA: el botón o la petición principal de la página) que mejor convierte en B2B.

**Alcance.** 27 webs revisadas en cuatro grupos:
- **A. Consultoras (6):** McKinsey (QuantumBlack), BCG, Bain, Accenture, Deloitte, PwC.
- **B. Escuelas de negocio (9):** IE, IESE, ESADE, INSEAD, HBS Online, MIT Sloan, Wharton; LBS y Stanford GSB en versión breve.
- **C. Formación en IA nativa (6):** Section, Multiverse, Faculty, y como extra Mindstone (la más parecida a Spiralia), Founderz (competidor directo en España) y Uplimit (referencia de demo que se prueba sin hablar con ventas).
- **D. Despliegue de IA y laboratorios (6):** Palantir, Distyl, OpenAI, Anthropic, Microsoft (hub de adopción de Copilot) y Sierra como extra.

**Método.**
- Lectura del HTML bruto de cada página (con `curl`), de la definición pública de los formularios (HubSpot, Marketo, Pardot, Salesforce) para contar campos sin enviarlos, y, donde la web bloqueaba la lectura automática, navegador real (McKinsey, comprobaciones de OpenAI, Anthropic, INSEAD, Gartner y 6sense) o WebFetch (INSEAD y Wharton: resumen hecho por modelo, menos fiable en detalle).
- Para la Tarea 2, búsqueda documental de estudios, informes de vendedores, criterio de expertos y normativa, con URL y fecha por dato.
- Para comprobar la fecha de la Guía de cookies de la AEPD se descargó temporalmente su PDF público (1,3 MB) y se borró después.

**Leyenda.**
- **[Hecho]**: observado en la web o la fuente citada.
- **[Supuesto]**: deducción razonable no verificada.
- **[Opinión]**: valoración propia.
- En la Tarea 2, además: **[Estudio]** (datos con metodología), **[Vendedor]** (dato de quien vende la herramienta que sale favorecida), **[Experto]**, **[Normativa]**.
- «Sin datos»: no se ha podido comprobar.

**Limitaciones principales.**
- Formularios que se pintan con JavaScript: número de campos «sin datos» (Section, Mindstone, Founderz, IE, Palantir, segundo paso de OpenAI, ventas de Anthropic, Sierra, LBS, HBS Online y MIT para empresas).
- Animaciones y vídeos detectados en el código; no todos se han visto en pantalla.
- Las cifras de cada web son las que la empresa publica sobre sí misma; nadie las ha auditado.
- La evidencia cuantitativa sobre CTA viene sobre todo de software B2B estadounidense y de vendedores de herramientas; no hay estudios específicos de formación o consultoría vendidas a empresas españolas.

---

## Resumen ejecutivo

### Diez conclusiones para diseñar la página

1. **El mensaje «el valor está en el despliegue» ya no diferencia: hay que enseñarlo, no decirlo.** [Hecho] Section, Multiverse, Mindstone y Founderz abren su hero con la idea de que comprar la herramienta no basta y falta que la gente la use. BCG (10/20/70: el 70 % del valor está en personas y procesos), PwC (pilar People) y Accenture («AI Talent and Workforce») han convertido a las personas en un pilar de su oferta de IA (secciones A y C).
2. **Nadie enseña lo que construye. Una galería de agentes y skills desplegados sería la prueba diferencial del modelo FDE.** [Hecho] Ninguna de las 27 webs la tiene. Lo más cercano son los vídeos del bootcamp de Palantir y las demos por función de OpenAI (D). [Opinión] Formato: problema → qué se construyó → para qué equipo → qué cambió.
3. **El acompañamiento que mejor se vende es un formato con nombre, duración y entregable.** [Hecho] Bootcamp AIP de 5 días con la promesa «From 0 to use case in 5 days» (Palantir); residencia FDE de 4 días + 12 semanas con credencial (Anthropic); masterclass cerrada de 2 días para hasta 35 personas (LBS); sesión para comités de 2-4 horas (Mindstone) (B, C, D). [Opinión] El primer paso de Spiralia debería tener nombre propio y salir en el CTA.
4. **El modelo FDE se cuenta sin la sigla, como pareja «negocio + ingeniería» y como secuencia.** [Hecho] Palantir (Echo/Delta), Distyl (Strategist/Engineer) y Sierra usan dúos. OpenAI describe el encargo tipo de su Deployment Company (11-may-2026): diagnóstico → pocos flujos prioritarios elegidos con la dirección → FDE construyendo dentro de la organización (D.3). [Opinión] Definir FDE en una línea la primera vez y titular con lo que pasa, no con la sigla.
5. **Una cifra concreta y fechada convence más que el volumen. El rigor puede ser el sello de Spiralia.** [Hecho] Multiverse, Mindstone y Founderz publican cifras que no cuadran entre sus propias páginas. Distyl anonimiza («F100 Telecom Operator») sin perder dos cifras por caso (C, D.2). [Opinión] Cada cifra con fuente y fecha, la misma en todas las páginas, y casos anonimizados por sector si el cliente no puede salir con nombre.
6. **Rutas separadas por perfil: CEO o comité, dirección de Personas, L&D.** [Hecho] Lo hacen bien el hub de Microsoft (pestañas por rol), BCG (un bloque por tipo de directivo, incluido «quien responde de las personas»), LBS («Good for you / Good for your organisation») y Founderz (seis situaciones del comprador). Las escuelas venden sus programas de IA a individuos y dejan lo corporativo genérico o en otra marca (B).
7. **El vídeo es casi siempre decorativo; uno que explique es un hueco.** [Hecho] McKinsey, BCG, Bain, PwC España, Section, Multiverse y Sierra usan vídeo ambiental en bucle en el hero (A, C, D). Los vídeos útiles van abajo: demos por función de OpenAI, clientes en el bootcamp de Palantir, testimonios de cliente de INSEAD. [Opinión] 60-90 segundos de una sesión o un despliegue real.
8. **Diagnóstico sí, calculadora de ROI no.** [Hecho] Ninguna de las 27 webs tiene calculadora de ROI pública. Solo Mindstone ofrece un diagnóstico abierto (conversacional, en beta) y pide los datos antes del informe completo (C.4). [Estudio patrocinado/Vendedor] La idea de que el contenido interactivo «convierte el doble» procede de una encuesta pagada de 2014. [Estudio] Lo que sí está documentado es la desconfianza: el 65 % de los decisores no se fía del contenido de los proveedores (Forrester 2019). No hay ningún test publicado sobre pedir el email antes o después del resultado (Tarea 2.4).
9. **El comprador llega tarde y casi decidido, pero quiere hablar con alguien para juzgar el encaje.** [Estudio] Según Gartner (25-jun-2025, 632 compradores), el 61 % prefiere comprar sin comercial y el 69 % ve contradicciones entre la web y el comercial. Según 6sense (2025, unos 4.000 compradores), el primer contacto llega al 61 % del recorrido y el ganador estaba en la lista del primer día el 95 % de las veces (ambos verificados en sus webs). [Opinión] La web tiene que servir a dos velocidades: a quien ya quiere hablar y a quien está convenciendo a su comité.
10. **Lo que más pesa en el CTA es responder rápido y pedir poco y bien.** [Estudio] Según HBR (2011), contactar en la primera hora multiplica por casi 7 la probabilidad de llegar a una conversación útil. [Vendedor] Chili Piper y RevenueHero dicen que ofrecer calendario justo después del formulario lleva a reunión al 62-67 % de los leads cualificados, frente al 30-40 % con proceso manual. [Estudio] En un test de MarketingSherpa (2013), añadir el campo «cargo» restó un 11,9 %. [Hecho] Las consultoras piden de 6 a 15 campos y las escuelas de 13 a 16, alguna con fecha de nacimiento (A, B).

### Recomendación de CTA [Opinión apoyada en la evidencia de la Tarea 2]

- **CTA principal, de alto compromiso: conversación de 30 minutos con una persona de Spiralia con nombre y foto.**
  - Formulario de un solo paso con 4 campos obligatorios: nombre, email de trabajo, empresa y función (desplegable: Dirección general / Personas-RR. HH. / Formación-L&D / Otra). Un quinto campo opcional de texto libre: «¿Qué os gustaría conseguir?».
  - Al enviarlo, el calendario aparece en la misma pantalla (próximos 5-7 días hábiles, con recordatorio la víspera).
  - Si no se reserva, respuesta personal en el día hábil, con la primera hora como objetivo. Muchos directivos delegan la agenda.
  - Copy: mejor nombrar el primer paso («Reserva una conversación de 30 minutos») que un «Contáctanos» genérico. Si se empaqueta un formato de entrada (conclusión 3), el CTA puede llevar su nombre. La Tarea 2 propone «Hablemos de vuestro caso»; las dos son hipótesis de copy, no evidencia.
- **CTA secundario, de bajo compromiso: autodiagnóstico de 8-10 preguntas.** Resultado en pantalla sin pedir datos. El email, opcional y solo para recibir un PDF que se pueda reenviar al comité. Termina en el CTA principal.
- **Terciario: material útil sin formulario** (plan de despliegue o guía de sesión de ejemplo, anonimizados) y newsletter en el pie con una casilla sin marcar.
- **Lo que no recomiendo en el lanzamiento:**
  - Calculadora de ROI: la desconfianza hacia las cifras de proveedores está documentada y Spiralia no controla las variables.
  - Chat: no hay evidencia B2B independiente a su favor; desde el 2-ago-2026 hay que avisar de que es IA (art. 50 del Reglamento de IA), y un estudio de 2019 mide un rechazo fuerte al saberlo.
  - El email como único canal (mailto): mostrar la dirección como texto copiable.
- **Mínimos legales del formulario:**
  - Primera capa de información junto al botón (art. 13 RGPD y art. 11 LOPDGDD).
  - Base jurídica: la petición del propio usuario (art. 6.1.b RGPD).
  - Casilla aparte, sin marcar y no obligatoria para comunicaciones comerciales (art. 21 LSSI y sentencia Planet49).
  - Botón «Rechazar» de cookies al mismo nivel que «Aceptar» (Guía de cookies de la AEPD, versión de mayo de 2024).
  - Contrato de encargado de tratamiento con la herramienta de agenda y el CRM.
  - Datos alojados en la UE, o como mínimo Data Privacy Framework más cláusulas contractuales tipo, por la incertidumbre abierta en 2026.
- **Medir desde el primer día:** visitas → formularios → reuniones reservadas → reuniones celebradas → propuestas, y el tiempo hasta la primera respuesta.

### Decisiones que te tocan

1. **¿Publicamos precio o rango?**
   - Qué es: decidir si la página enseña precio.
   - El problema: toca dinero.
   - Opciones: las escuelas publican precio (venden plazas); las consultoras no (venden proyectos); Mindstone publica 399 $ por persona; también cabe no publicar nada.
2. **¿Qué herramienta de agenda usamos?**
   - Qué es: el sistema de reserva del CTA principal.
   - El problema: tiene coste de licencias y cada opción guarda los datos en un sitio distinto.
   - Opciones: HubSpot Meetings con alojamiento de datos en la UE, Microsoft Bookings (si Spiralia trabaja en Microsoft 365) o Calendly (con Data Privacy Framework y cláusulas contractuales tipo).
3. **¿Qué se puede enseñar de cada cliente?**
   - Qué es: hay que pedir permiso a ING, Deloitte, CCEP y GPTW para usar su logo, sus casos y los agentes construidos.
   - El problema: sin ese permiso no hay galería ni casos con nombre (conclusiones 2 y 5).
   - Opciones: con nombre o anonimizado por sector.
4. **¿La formación de Spiralia es bonificable por FUNDAE?**
   - Qué es: confirmar si las empresas pueden bonificar los programas.
   - El problema: es argumento clave para L&D en España (lo usan ESADE y Founderz), y este informe no tiene datos sobre Spiralia.
   - Opciones: si lo es, decirlo; si no, no mencionarlo.
5. **Validación legal de los textos del formulario y del aviso de cookies.**
   - Qué es: que el asesor legal o el delegado de protección de datos (DPO) de Spiralia revise esos textos.
   - El problema: este informe no sustituye esa revisión, y en particular hay que decidir si hace falta la casilla de «acepto la política de privacidad».

### Contexto competitivo que conviene tener presente [Hecho]
- **Founderz** (competidor directo en España) muestra el logo de Deloitte, que también es cliente de Spiralia. Además declara 700.000 profesionales formados, certificación con Microsoft, FUNDAE y propuesta en 48 h (C.5).
- **BBVA** aparece públicamente ligado a OpenAI como cliente y socio fundador de la OpenAI Deployment Company (D.3).
- **Sierra** muestra a Santander en su muro de logos (D.6).

---

## Índice
- Tarea 1 · Benchmark de referentes
  - A. Consultoras
  - B. Escuelas de negocio
  - C. Empresas de formación en IA nativas
  - D. Despliegue de IA (modelo FDE) y páginas enterprise de laboratorios
  - E. Síntesis del benchmark: patrones comunes y qué haría una web excepcional
- Tarea 2 · Qué convierte mejor en el CTA B2B
  - 2.1 Formulario, email, calendario o chat
  - 2.2 Longitud del formulario y formularios por pasos
  - 2.3 CTA de bajo y de alto compromiso
  - 2.4 Calculadoras de ROI y herramientas interactivas
  - 2.5 Benchmarks generales de conversión
  - 2.6 RGPD y normativa española
  - Síntesis y recomendación de CTA

---

# Tarea 1 · Benchmark de referentes

## A. Consultoras

**Método.** HTML bruto descargado con `curl` el 14-oct-2026 (cabeceras de navegador) y analizado bloque a bloque (McKinsey, que bloquea curl, se leyó en un navegador real); cuando el contenido cargaba por JavaScript se indica. Formularios inspeccionados en el HTML o en su definición pública; **ninguno se ha enviado**. Etiquetas: **[Hecho]** = observado en la web en la URL indicada; **[Supuesto]** = inferencia razonable no verificada; **[Opinión]** = valoración propia. Todas las cifras van con la URL donde aparecen. Mi acceso es por geolocalización España: Accenture redirige automáticamente a su versión con `country=ES`.

---

### A.1 McKinsey — QuantumBlack, AI by McKinsey

1. **URL analizada:** https://www.mckinsey.com/capabilities/quantumblack/how-we-help-clients (título: «AI Consulting | Artificial Intelligence (QuantumBlack)»). El antibots de McKinsey bloqueó curl y WebFetch; la página se leyó después en un navegador real (texto y DOM) el 14-oct-2026, sin aceptar cookies ni enviar nada [Hecho].
2. **Claim del hero** [Hecho]:
   - Titular: **«Artificial Intelligence»**, con el subtítulo «Learn how we're helping capture the opportunity of generative AI».
   - Texto de posicionamiento (paráfrasis): «hybrid intelligence», la combinación de datos y tecnología con la creatividad de las personas; relato de origen en la Fórmula 1; QuantumBlack como brazo de consultoría de IA de McKinsey.
   - **Vídeo en el hero:** sí, un elemento de vídeo en autoplay, en bucle y sin sonido en la zona del hero (la fuente no llegó a cargar con el banner de cookies sin responder) [Hecho]. Su contenido: sin datos.
3. **Estructura de arriba abajo** [Hecho]:
   1. Hero.
   2. Texto de posicionamiento.
   3. «Our approach»: Hybrid intelligence, QuantumBlack Labs y ecosistema de alianzas tecnológicas.
   4. «Our offerings»: 4 tarjetas (Artificial Intelligence, Data Transformation, Noble Intelligence, Digital Twins).
   5. «Examples of our impact»: 5 casos fechados (Toshiba Tec con NVIDIA, Merck, AAA-ICDR, avatares con NVIDIA, Deutsche Telekom).
   6. «Our leadership»: 2 socios globales con nombre y ciudad.
   7. «Our insights»: The state of AI in 2026 y artículos de McKinsey Quarterly.
   8. Blogs (Medium y New at McKinsey).
   9. «Connect with QuantumBlack»: Contact us, LinkedIn, Medium.
4. **Credibilidad** [Hecho]:
   - Casos con nombre, sin cifra en la tarjeta salvo uno: Deutsche Telekom, con un motor de formación para recualificar a **8.000 agentes** de campo y de call center (https://www.mckinsey.com/capabilities/quantumblack/how-we-help-clients).
   - Historia de escala: de start-up de 45 personas en 2015 a «powerhouse» global de IA e ingeniería (post del 17-dic-2025 enlazado en la misma página).
   - Alianzas: mencionadas como «ecosistema» y en los casos (NVIDIA). Rankings, premios, logos de clientes y testimonios: no aparecen.
   - Autoridad: su propia encuesta anual «The state of AI in 2026» (25-ago-2026) en el bloque de insights.
5. **Herramientas interactivas:** ninguna [Hecho].
6. **Vídeo:** solo el vídeo ambiental del hero [Hecho].
7. **CTA** [Hecho]:
   - No hay CTA en el hero. «Contact us» aparece solo en el bloque final «Connect with QuantumBlack» y en el menú («Contact Us»).
   - Formulario (https://www.mckinsey.com/capabilities/quantumblack/contact-us): tipo de consulta* (General / Press / Speaking), nombre*, email*, organización, asunto* y mensaje*, más **reCAPTCHA**. Es decir, **6 campos** (5 obligatorios) y validación de seguridad. Botón «Submit».
8. **[Opinión]** La página más «de marca» de la muestra: un concepto propio (hybrid intelligence), casos con logos de primer nivel y cero fricción comercial visible, porque McKinsey no necesita captar leads por la web. Es relevante que uno de los cinco casos sea de recualificación de personas (Deutsche Telekom): la capacitación ya es parte del relato de transformación de las grandes. Nada replicable para una boutique salvo la idea de bautizar el método con un nombre propio.

---

### A.2 BCG — AI Transformation (y BCG X como complemento)

1. **URL analizada (principal):** https://www.bcg.com/capabilities/artificial-intelligence. Complemento: https://www.bcg.com/x/ (BCG X, su unidad de construcción tecnológica y diseño).
2. **Claim del hero** [Hecho]:
   - Titular: **«AI Transformation»**.
   - Subtítulo (paráfrasis): la IA ya no es una apuesta de futuro sino una realidad que transforma todos los sectores; BCG une claridad estratégica e IA aplicada en toda la empresa para convertirla en ventaja competitiva sostenida.
   - **Vídeo en el hero:** sí, un vídeo ambiental en bucle sin sonido (`ambient-video`, fichero `AI_VI_2_Hero_Graphic_Widescreen_2.mp4`). Hay también una animación Lottie (animación vectorial ligera) en el bloque de BCG Answer.
   - BCG X: titular **«We’re Building Tomorrow»**, con un vídeo ambiental de 15 segundos (`bcg_x_launch_film-15s_loop.mp4`).
3. **Estructura de arriba abajo** [Hecho]:
   1. Hero con vídeo y dos párrafos de contexto (de los pilotos dispersos al valor medible).
   2. Caja de suscripción al newsletter «Tech + Us».
   3. «Our AI Consulting Services»: tarjetas de Agentic AI y Responsible AI.
   4. «Our Approach to AI Transformation»: 4 cifras, el principio 10/20/70 y tres pestañas («Deploy / Reshape / Invent»), cada una con pasos y miniresultados.
   5. «How We Help Build Enterprise Capabilities…»: tres acordeones por tipo de directivo: *Value Assurance* (para quien responde de la cuenta de resultados), *Enablement* (para quien responde de personas y procesos) y *Foundations* (para quien responde de tecnología y gobierno).
   6. Casos de cliente con cifra grande.
   7. Biblioteca de productos de BCG X.
   8. «What is Physical AI?».
   9. Noticias en prensa (Business Insider, WSJ, Bloomberg).
   10. Alianzas.
   11. Insights, con el promo de BCG Answer.
   12. «Explore More» y pie de página.
4. **Credibilidad** [Hecho, todo en https://www.bcg.com/capabilities/artificial-intelligence salvo indicación]:
   - Cifras (bloque «Our Approach»):
     - «72%»: CEOs que dicen ser el principal decisor sobre IA en su organización.
     - «$30b+»: valor obtenido para clientes con IA aplicada.
     - «6,000+»: profesionales de IA en BCG.
     - «100»: entre las primeras 100 organizaciones del mundo certificadas en ISO/IEC 42001 (norma de gestión de IA).
   - Principio de diseño: solo el 10% del valor viene del algoritmo, el 20% de datos y tecnología y el 70% de procesos y personas.
   - Cifras dentro de las pestañas:
     - Deploy: «10% to 15%» de productividad, y un cliente que pasó del «18% to 90%» de alfabetización en IA.
     - Reshape: «30% to 50%» de mejora en eficiencia y eficacia; una biofarmacéutica que redujo informes de 17 a 5 semanas, con «€40M+» de impacto.
     - Invent: sprint de validación de «8-to-12-week».
   - Casos con nombre y cifra:
     - PHOENIX group: «29» países con servicio mejorado.
     - Reckitt: «60%» de eficiencia.
     - Rio Tinto: «2x» de productividad.
     - Una bebida sin nombre: «€150m» de margen bruto.
   - Alianzas citadas en texto: Amazon, Google, IBM, Microsoft, Salesforce, SAP, y además OpenAI, Anthropic, Articul8, LangChain y Palantir.
   - Rankings de analistas (Gartner, Forrester, IDC) y premios: no aparecen en esta página. Testimonios: no.
   - BCG X (https://www.bcg.com/x/), cifras del hero: «3000+» expertos, «80» ciudades, «82+» patentes y «30+» alianzas tecnológicas y de negocio. También muestra citas de 4 expertos con su empresa anterior (Zest AI, Meta…) y el equipo de liderazgo con foto.
5. **Herramientas interactivas** [Hecho]:
   - **BCG Answer** (https://www.bcg.com/bcg-answer), enlazado con el botón «Ask us a question».
   - Es un buscador con IA generativa que responde solo con contenido publicado por BCG.
   - Ofrece 4 preguntas sugeridas; una de ellas es «How can the CHRO succeed in 2026?».
   - Para hacer una pregunta propia hay que iniciar sesión, con un máximo de 300 caracteres.
   - Devuelve una respuesta sintetizada con fuentes y páginas relacionadas, y un límite de uso.
   - No hay calculadoras de ROI ni diagnósticos de madurez.
6. **Vídeo** [Hecho]: en bcg.com/AI, solo el vídeo ambiental del hero (decorativo). En BCG X hay además «Products That Made Us», una serie de vídeos con reproductor (p. ej. un experto explicando un producto de clima), con botón «Play Video».
7. **CTA** [Hecho]:
   - En la página:
     - Newsletter arriba, con 1 campo (email) y botón «Subscribe».
     - «Learn More» en cada tarjeta.
     - «Explore More of our AI Transformation Client Work».
     - «Explore Our Products».
     - **«Contact the team»**, una sola vez, en el tercio inferior tras las alianzas.
     - «Ask us a question».
     - En el pie, «How can we assist you?» con «Contact Us».
   - Formulario de contacto (modal, https://www.bcg.com/ContactUs…): **7 campos**: nombre*, email*, cargo, empresa, región (desplegable), tipo de consulta (desplegable) y mensaje*. Lleva captcha Cloudflare Turnstile y botón «Submit».
   - BCG X, en cambio, pone «Contact Us» en el hero y otro «Contact us» en cada una de sus 5 líneas de servicio; 4 de ellas llevan un responsable con nombre.
8. **[Opinión]** Es la página mejor construida para un CEO: cifras propias muy arriba, una tesis memorable (10/20/70: el valor está en las personas y los procesos) y un bloque que segmenta explícitamente por directivo, incluido uno «para quien responde de las personas». Punto débil: el contacto está escondido y es genérico, y el hero es una etiqueta de categoría, no una promesa.

---

### A.3 Bain — AI, Insights, and Solutions

1. **URL analizada:** https://www.bain.com/vector-digital/ai-insights-and-solutions/. Complemento, la subpágina de servicio: https://www.bain.com/vector-digital/ai-insights-and-solutions/artificial-intelligence/. No hay versión en español: Bain ofrece de, el, fr, it, ja, ko y pt-br [Hecho, selector de idioma en https://www.bain.com/].
2. **Claim del hero** [Hecho]:
   - Titular: **«AI, Insights, and Solutions»**.
   - Subtítulo (paráfrasis): ganar ventaja competitiva con IA, innovación digital centrada en las personas y soluciones basadas en datos.
   - **Vídeo en el hero:** sí, autoplay sin sonido (`ais.mp4`).
   - La subpágina: titular **«Artificial Intelligence Consulting»**, con la idea de «convertir la promesa de la IA en resultados».
3. **Estructura de arriba abajo** [Hecho]:
   1. Hero con vídeo.
   2. «Our Experience & Impact», con 3 cifras.
   3. Texto de enfoque con cuatro grupos de capacidades: diseño e investigación, ingeniería, producto, y ciencia de datos/ML.
   4. «How We Can Help»: 4 tarjetas (AI Consulting, Data & Analytics, Experimentation at Scale, Demand Forecasting).
   5. Alianzas.
   6. Casos de cliente con logo.
   7. Insights.
   8. Podcast «Winning with AI».
   9. Socios con foto.
   10. Newsletter.
   11. Mapa de servicios.
   12. Micro-formulario «Ready to talk?».
   - La subpágina añade, tras el hero: índice interno; casos de uso por sector (banca, telco, retail, salud, industria); pestañas de casos con vídeo; alianzas; insights; podcast; expertos; y unas **FAQ** (preguntas frecuentes) «The Artificial Intelligence Questions Leaders Are Facing Today», con 5 preguntas. Una de ellas trata de cómo lograr que la plantilla adopte la IA de verdad, no solo que tenga acceso.
4. **Credibilidad** [Hecho]:
   - Cifras (https://www.bain.com/vector-digital/ai-insights-and-solutions/, bloque «Our Experience & Impact»):
     - «200+»: expertos académicos y de software en analítica avanzada.
     - «1,500+»: ingenieros de analítica y software asociados.
     - «2,500+»: proyectos completados.
     - En el texto: los líderes en IA tienen «2.5 times» más probabilidades de haber definido una visión y una hoja de ruta de IA.
   - Casos con nombre y logo (misma URL): Hera Group, Banca Investis, Target y NatWest («from 60+ days to just one day», de la idea al valor).
   - Subpágina:
     - Coca-Cola: primera empresa de su alianza con OpenAI.
     - Carrefour.
     - «InsuranceCo», anónima: «25%» de ingresos potenciales y «10x» de rendimiento en marketing.
     - En las FAQ cita su encuesta: «59%» de empresas adoptando IA generativa, «about 80%» de casos que cumplen expectativas y solo «23%» que lo vinculan a ingresos o costes.
   - Alianzas destacadas con logo: OpenAI, Microsoft y AI Aspire (Andrew Ng). El podcast lo presentan Andrew Ng y una socia de Bain, con CEOs invitados de IBM, Booking y Adecco.
   - Rankings de analistas y premios: no aparecen. Testimonios: no, salvo un vídeo-conversación con un directivo de Prudential en Insights.
5. **Herramientas interactivas:** ninguna (sin calculadoras ni diagnósticos) [Hecho]. Lo más parecido es el acordeón de FAQ.
6. **Vídeo** [Hecho]:
   - Vídeo ambiental en el hero.
   - En la subpágina, reproductor Brightcove dentro de las pestañas de casos (Coca-Cola).
   - Un vídeo-entrevista en Insights.
   - El podcast como formato estrella de liderazgo de pensamiento.
7. **CTA** [Hecho]:
   - No hay CTA en el hero.
   - «Read More» en servicios, «Learn More» en alianzas, «Explore the Stories», «See More», «Check out the podcast», «Choose Your Insights» (newsletter).
   - Al final, el micro-formulario **«Ready to talk?»**, con **2 campos** (sector en desplegable + email) y botón «CONTACT US».
   - Un widget flotante «Contact Bain» con 5 motivos (Business inquiry, Career, Press, Partnership, Speaker).
   - El formulario completo de contacto (Marketo, https://www.bain.com/about/contact-us/contact-form-page/) tiene **15 campos**:
     - Motivo.
     - Nombre, apellidos, email, teléfono y país.
     - Cargo, empresa, sector, servicio de interés, si es participada de fondo de capital riesgo, nº de empleados, web y cómo conoció a Bain.
     - Mensaje.
     - Más la casilla de privacidad. Algunos campos son condicionales.
8. **[Opinión]** Buen equilibrio entre escala (cifras), prueba (logos de clientes reconocibles, cada uno con una cifra) y conversación con CEOs (el podcast con Andrew Ng es un imán de autoridad). Las FAQ responden en lenguaje de comité de dirección y una toca de lleno a RR. HH. El micro-formulario de 2 campos es inteligente para captar, aunque luego remite a un formulario de 15.

---

### A.4 Accenture — AI and data

1. **URL analizada:** https://www.accenture.com/us-en/services/data-ai, que desde España redirige a https://www.accenture.com/en/services/ai-data?country=ES [Hecho]. Versión España: https://www.accenture.com/es-es/services/ai-data, con el mismo esqueleto traducido y noticias locales.
2. **Claim del hero** [Hecho]:
   - Titular: **«AI and data»**; en España, **«IA y datos»**.
   - Subtítulo (paráfrasis): en 30 años ninguna tecnología había prometido cambiarlo todo como la IA generativa; hoy es el primer motor de reinvención y la preparación de los datos es clave para el éxito.
   - **Vídeo en el hero:** no; es una imagen ilustrada. Hay animaciones Lottie en las tarjetas de premios.
3. **Estructura de arriba abajo** [Hecho]:
   1. Hero.
   2. Barra de anclas (What to do / What’s trending / Partners / Leaders / Careers).
   3. «AI and data now», con 4 cifras.
   4. «Reinvent with AI and data»: 8 tarjetas desplegables (Industrial AI, Data Services, Generative AI, AI Strategy and Value, Responsible AI, AI Refinery, Technology Sovereignty, AI Talent and Workforce).
   5. «What’s trending»: informes y un acceso a casos.
   6. «Partners in change»: muro de logos.
   7. «Awards and recognition».
   8. «In the news»: carrusel con Play/Pause.
   9. «Our leaders»: 2 personas.
   10. «Data careers».
4. **Credibilidad** [Hecho, en https://www.accenture.com/en/services/ai-data?country=ES]:
   - Cifras: todas de estudios de mercado, ninguna de la propia firma.
     - «97%»: directivos que creen que la IA generativa transformará su empresa.
     - «67%»: organizaciones que priorizan su inversión en datos e IA.
     - «75%»: valor de los «datos de buena calidad».
     - «10-15%»: más crecimiento de ingresos en empresas guiadas por datos.
   - Cifras en las tarjetas: «47%», «97%/31%», «9%» y «46%/22%».
   - Logos de alianzas: Anthropic, AWS, Databricks, Google, IBM, Microsoft, NVIDIA, OpenAI, Oracle, Salesforce, SAP, ServiceNow, Snowflake y Teradata.
   - Analistas y premios: Gartner (Emerging Tech: Talentscape for AI Services), Everest Group PEAK Matrix 2024 (Leader y Star Performer), socio del año de Databricks (6.º año) y de Snowflake (2.º año).
   - Noticias: menciona OTAN, Noli (L’Oréal), Mistral AI y la compra de Keepler (empresa española de datos e IA). La versión es-es destaca «Keepler es ahora parte de Accenture».
   - Casos de cliente con resultado en la propia página: no; solo una tarjeta que enlaza a casos.
   - Testimonios: no. Tamaño del equipo: no aparece.
5. **Herramientas interactivas:** ninguna en la página [Hecho]. En noticias anuncia un modelo de madurez de adopción de IA con Carnegie Mellon (SEI), pero no es una herramienta usable en la web.
6. **Vídeo** [Hecho]: ninguno en el cuerpo. Solo animaciones Lottie decorativas en las tarjetas de premios. [Supuesto] El Play/Pause del bloque de noticias controla un carrusel automático, no un vídeo.
7. **CTA** [Hecho]:
   - En el cuerpo de la página no hay ningún «Contact».
   - Solo «Learn more» en tarjetas, «View all work» y «Search open roles».
   - «Contact Us» aparece únicamente en el menú y en el pie.
   - El formulario de contacto (https://www.accenture.com/es-es/about/contact-us) tiene **10 campos**:
     - Tipo de consulta.
     - Nombre, apellidos, email y teléfono.
     - Empresa, web, puesto y país.
     - «¿Cómo puede ayudarte Accenture?».
     - Más la casilla de privacidad y captcha.
8. **[Opinión]** Es un catálogo de capacidades con un muro de logos de alianzas y de premios: impresiona por amplitud, pero ninguna cifra es de resultado propio y no hay ni un cliente con resultado en la página. Para un CEO o un director de RR. HH. que busca «quién me ayuda con mi gente» es frío y genérico. Es destacable que tengan una línea «AI Talent and Workforce» y un menú hacia LearnVantage (su negocio de formación).

---

### A.5 Deloitte — AI & Data (EE. UU.) y Inteligencia artificial & Data / Instituto de IA (España)

1. **URLs analizadas:**
   - EE. UU. (principal): https://www.deloitte.com/us/en/services/consulting/services/artificial-intelligence-and-data.html.
   - España: https://www.deloitte.com/es/es/services/consulting/services/artificial-intelligence-and-data.html y el Instituto de IA de Deloitte España: https://www.deloitte.com/es/es/services/consulting/collections/instituto-ia-deloitte-espana.html.
   - La página «Applied Artificial Intelligence» de EE. UU. (https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence.html) devuelve solo menú y pie, sin cuerpo en el HTML [Hecho]. Por eso no la uso.
2. **Claim del hero** [Hecho]:
   - EE. UU.: titular **«AI & Data»**, con el antetítulo «Harness the power of data with AI». En el HTML conviven dos versiones del hero; la otra es «Artificial Intelligence & Data».
   - Subtítulo EE. UU. (paráfrasis): descubrir información oculta y crear valor combinando analítica, automatización e IA.
   - España: titular **«Inteligencia artificial & Data»**, con un subtítulo sobre la combinación de personas, tecnología, conocimiento e innovación en capacidades analíticas.
   - **Vídeo en el hero:** no, es una imagen de banner, en los dos países.
3. **Estructura de arriba abajo** [Hecho, EE. UU.]:
   1. Hero con dos botones.
   2. Formulario «Get in touch».
   3. Bloque de marca «Experience the power of “with”», con vídeo.
   4. «Explore AI & Data services»: 3 tarjetas (AI & Insights, Data Engineering & Analytics, DataOps).
   5. Serie de vídeos «Deloitte Demystifies».
   6. «Our thinking»: 8 piezas.
   7. «Our Events» (LinkedIn Live, grabaciones).
   8. «AI’s promises and challenges».
   9. «Featured client stories».
   10. «Awards and recognition».
   11. «Our leadership»: 1 persona con email y teléfono.
   12. Pie.
   - España: hero, texto «Age of With™» (su programa de colaboración entre personas y máquinas), 2 servicios (Strategy Analytics, Automation Analytics), contenido relacionado (incluido el Instituto de IA), «Conoce a nuestros expertos» (2 socios con email) y pie.
   - El Instituto de IA España: presentación, contenidos (un dossier con 60 casos de uso de IA generativa) y 3 socios con email.
4. **Credibilidad** [Hecho]:
   - EE. UU., casos con nombre (https://www.deloitte.com/us/en/services/consulting/services/artificial-intelligence-and-data.html): Vanguard (modernización tecnológica, con vídeo), Rakuten Securities con NVIDIA (avatar de IA), Compass Group Australia y Western Kentucky University, además de otros casos anónimos. Ninguno lleva cifra de resultado en la tarjeta.
   - EE. UU., premios y analistas: IDC MarketScape Worldwide AI Services 2025, IDC Spotlight, Databricks North American Partner of the Year 2025 e IDC MarketScape Data Modernization 2024.
   - EE. UU.: compra de Wavicle (datos e ingeniería de IA) en noticias.
   - España (página AI & Data): ninguna cifra propia; en «Contenido relacionado», «Casi el 70%» de encuestados cree que la IA generativa transformará su empresa en menos de tres años (estudio propio).
   - España (página «Ingeniería, IA y datos», https://www.deloitte.com/es/es/services/consulting/services/engineering-ai-data.html): un muro de 12 reconocimientos de analistas (Gartner Magic Quadrant, IDC MarketScape, Everest, ISG) y casos como Iberdrola y Adevinta.
   - Tamaño del equipo en España, fuera de la página: unos 30 socios y más de 500 profesionales en su AI & Data Transformation Hub, según https://www.investinspain.org/en/news/2024/deloitte. En la propia web: no aparece.
   - Testimonios: no.
5. **Herramientas interactivas:** ninguna [Hecho].
6. **Vídeo** [Hecho, EE. UU.]:
   - Vídeo de presentación de la práctica (fichero de 2020).
   - Serie educativa «Deloitte Demystifies», con explicaciones cortas de temas de IA para directivos.
   - Vídeo del caso Vanguard, que exige aceptar cookies publicitarias para verse.
   - Eventos grabados en LinkedIn Live.
   - España: sin vídeo.
7. **CTA** [Hecho]:
   - EE. UU.:
     - En el hero, **«Contact us»** y **«Submit RFP»** (Submit RFP = enviar una solicitud de propuesta formal).
     - «Get in touch», con formulario en la propia página de **7 campos visibles**: nombre*, apellidos*, email*, empresa*, cargo, ubicación* y «How can we help?». Además, consentimiento de marketing (sí/no) y aceptación de términos. [Supuesto] Los demás campos del HTML son técnicos u ocultos (Eloqua).
     - Después: «Learn more», «Watch on demand», «Get the full story» y «See all our stories».
   - España:
     - En el hero, **«Contáctanos»** y **«Enviar RFP»**.
     - El formulario de contacto (https://www.deloitte.com/es/es/contact/contact-us.html) tiene **13 campos**: asunto, nombre, apellidos, email, compañía, cargo, teléfono, país, provincia, ciudad, dirección, código postal y mensaje. La mayoría son obligatorios.
8. **[Opinión]** Deloitte pone el contacto y la solicitud de propuesta formal arriba (bien para un comprador decidido) y humaniza con socios con nombre y email. Pero la propuesta es difusa («the power of “with”»), los casos no tienen cifras y la versión española es pobre: sin resultados, sin vídeo y con un formulario de 13 campos que pide hasta la dirección postal. La serie «Demystifies» es una buena idea para audiencias no técnicas.

---

### A.6 PwC — Artificial Intelligence (EE. UU.) e Inteligencia artificial (España)

1. **URLs analizadas:** EE. UU. (principal): https://www.pwc.com/us/en/services/ai.html. España: https://www.pwc.es/es/consultoria/inteligencia-artificial.html.
2. **Claim del hero** [Hecho]:
   - EE. UU.: titular **«Artificial Intelligence»**, con el antetítulo **«Deliver measurable value with AI — now»**.
   - Subtítulo EE. UU. (paráfrasis): las organizaciones que más valor sacan de la IA no invierten más, deciden distinto dónde enfocar, cómo trabajar y cómo medir.
   - **Vídeo en el hero (EE. UU.):** no, es una foto de banco de imágenes (Getty).
   - España: titular **«We know how your business works so you can put AI to work for your business»**, en inglés en la web española, con el H2 «Inteligencia artificial».
   - **Vídeo en el hero (España):** sí, autoplay, sin sonido y en bucle (`ai-desktop.mp4`, de la campaña global «so you can»).
3. **Estructura de arriba abajo** [Hecho]:
   - EE. UU.:
     1. Hero.
     2. Texto de valor y vídeo de marca de 30 segundos.
     3. «Meet PwC One» (presenta «Eclipse», su plataforma de trabajo con IA).
     4. «Capabilities»: 5 líneas y 4 pestañas (Strategy / People / Technology / Execution), con 15 capacidades y un caso por pestaña.
     5. «Case studies».
     6. «Strategic alliances».
     7. Contenido «Technology» cargado por JS.
     8. «Recognition and awards».
     9. Insights y webcasts archivados.
     10. «Contact us»: 10 responsables con nombre.
   - España:
     1. Hero con vídeo.
     2. Introducción con cita del socio responsable de IA de PwC España.
     3. «Lo que los agentes de IA significan para el futuro del trabajo»: 5 ideas.
     4. Texto de visión.
     5. «El futuro del trabajo ya está aquí: la inteligencia aumentada»: 1 cifra.
     6. «Pensar como una empresa de IA»: pestañas Trabajo / Fuerza laboral / Trabajadores.
     7. 5 fases («Comienza con la estrategia» … «Incorpora IA responsable»).
     8. «PwC AI Agents Factory».
     9. «Alianza PwC y Microsoft».
     10. «Contacta con nosotros»: 1 socio.
4. **Credibilidad** [Hecho]:
   - EE. UU., casos con nombre y cifra (https://www.pwc.com/us/en/services/ai.html, pestañas de capacidades):
     - Trimble: «$1.4B+» de ingresos recurrentes.
     - Chipotle: «75%» menos de tiempo para cubrir vacantes con IA agéntica. Es un caso de RR. HH.
     - Lucid: previsiones financieras con IA.
     - Fórmula 1: operaciones de carrera.
   - EE. UU., analistas y premios: Leader en The Forrester Wave™: AI Consulting Services, Q2 2026; CIO 100 Award 2026 (por Agent OS); Leader en IDC MarketScape Worldwide AI Services 2025.
   - EE. UU., alianzas: el bloque «Strategic alliances» carga por JavaScript; en el HTML está vacío, así que sin datos.
   - EE. UU.: 10 responsables con nombre y cargo (Chief AI Officer, Chief AI Engineering Officer…).
   - España (https://www.pwc.es/es/consultoria/inteligencia-artificial.html):
     - Una cifra: «50%» de aumentos de productividad y rapidez de salida al mercado con agentes de IA especializados (dato de mercado, no de clientes de PwC).
     - Cita del socio responsable de IA.
     - Alianza con Microsoft.
     - Sin casos con nombre, sin logos, sin rankings.
5. **Herramientas interactivas:** ninguna [Hecho]. La «AI Agents Factory» (España) es un servicio descrito en texto (una cadena de producción gobernada de agentes, «de la idea al agente en semanas»), no una herramienta.
6. **Vídeo** [Hecho]:
   - EE. UU.: «PwC AI Brand video» (0:30, con transcripción y subtítulos) en el segundo bloque; webcasts archivados en la pestaña Events.
   - España: vídeo ambiental en el hero.
7. **CTA** [Hecho]:
   - EE. UU.:
     - No hay CTA en el hero.
     - «Explore» (pilares), enlaces a casos, «Discover Eclipse», «Learn more» en premios.
     - Al final, «Contact us» con un botón **«Email»** por cada uno de los 10 responsables. Abre un formulario de **9 campos**: nombre*, email*, teléfono, organización, cargo, firma de PwC que debe responder, tipo de consulta, asunto* y detalle. Lleva captcha.
     - Además, en el HTML hay un formulario de contacto con **8 campos**: nombre, apellidos, empresa, cargo, función, email, ubicación y detalle de la consulta. Lleva consentimiento de marketing sí/no y botón «Submit».
   - España: un único socio con botón «Email» al final.
8. **[Opinión]** La versión de EE. UU. es la más «comprable»: cuatro pilares claros, un caso con nombre y cifra en cada pilar (uno de RR. HH.), Forrester e IDC como aval y personas con nombre a quien escribir. La española es casi un ensayo sobre el futuro del trabajo: buen tono para RR. HH., pero sin pruebas, con el titular en inglés y con un solo contacto.

---

### Patrones comunes en consultoras

- **[Hecho] El hero es una etiqueta de categoría, no una promesa:** «Artificial Intelligence» (McKinsey), «AI Transformation» (BCG), «AI and data» (Accenture), «AI & Data» (Deloitte), «Artificial Intelligence» (PwC EE. UU.), «AI, Insights, and Solutions» (Bain). La marca hace el trabajo de la propuesta de valor. La excepción es PwC España (y su campaña global), con una frase de beneficio.
- **[Hecho] El vídeo es ambiental, no explicativo:** McKinsey, BCG, BCG X, Bain y PwC España usan un vídeo de fondo en bucle y sin sonido en el hero. Los vídeos con contenido van más abajo y son secundarios: el anuncio de 30 segundos de PwC, la serie «Demystifies» de Deloitte y los casos de Bain.
- **[Hecho] La prueba gira en torno a cifras de escala y casos con una sola métrica grande:**
  - Escala: 6.000+ profesionales de IA (BCG), 2.500+ proyectos (Bain), 3.000+ expertos (BCG X).
  - Casos: «60%» Reckitt (BCG), «60+ days to one day» NatWest (Bain), «75%» Chipotle (PwC).
  - Accenture y Deloitte España son la excepción: solo cifras de encuestas o ninguna.
- **[Hecho] Hay alianzas con fabricantes de IA en todas las que se pudieron analizar:** OpenAI aparece en BCG, Bain y Accenture; Anthropic en BCG y Accenture; Microsoft en BCG, Bain, Accenture y PwC España; NVIDIA en Accenture y en un caso de Deloitte. Los rankings de analistas (Forrester Wave, IDC MarketScape, Gartner, Everest) son el sello de Accenture, Deloitte y PwC, no de BCG ni de Bain.
- **[Hecho] Ordenan la oferta en un marco de 3-4 pilares, y uno siempre es «personas»:**
  - BCG: Deploy/Reshape/Invent, más el bloque «Enablement… for leaders accountable for their people», con un cliente que pasó del 18% al 90% de alfabetización en IA.
  - PwC: Strategy/People/Technology/Execution.
  - Accenture: «AI Talent and Workforce».
  - Bain: una pregunta frecuente sobre adopción real por la plantilla.
  - McKinsey: el caso de recualificación de Deutsche Telekom.
  - La formación y la adopción ya forman parte del discurso de las grandes.
- **[Hecho] El liderazgo de pensamiento ocupa la mitad inferior:** informes, encuestas propias, podcast (Bain con Andrew Ng), eventos en LinkedIn Live (Deloitte), noticias de prensa (BCG) y newsletters (BCG «Tech + Us», Bain «Choose Your Insights»).
- **[Hecho] El CTA es de baja fricción en la página y de alta fricción después:** el contacto suele estar al final o solo en el menú (Accenture), y los formularios tienen entre 6 y 15 campos (McKinsey 6 + reCAPTCHA, BCG 7, PwC 8-9, Accenture 10, Deloitte España 13, Bain 15). Las mejores prácticas son el micro-formulario de 2 campos de Bain, los botones «Contact us + Submit RFP» en el hero de Deloitte y las personas con nombre y email (PwC, Deloitte, BCG X).
- **[Hecho] Casi no hay herramientas interactivas:** ni calculadoras de ROI ni diagnósticos de madurez en ninguna. La única es BCG Answer, un buscador con IA generativa que exige iniciar sesión. **[Opinión]** Es un hueco claro que una boutique puede ocupar.
- **[Hecho] Las versiones españolas son más pobres que las globales:**
  - Deloitte España: sin cifras ni vídeo, con un formulario de 13 campos.
  - PwC España: titular en inglés y un solo contacto.
  - Accenture España: traducción con noticias locales (Keepler).
  - Bain y BCG: sin versión en español en estas páginas (BCG solo ofrece en/ja en el pie).
  - McKinsey: versión española no revisada (sin datos).

### Qué NO funcionaría para una boutique como Spiralia

- **[Opinión] Competir por escala.** Cifras tipo «6,000+ practitioners» o «2,500+ projects» son su terreno. Spiralia debería medir profundidad y resultado: porcentaje de adopción real, personas formadas que usan la IA a los 90 días, tiempo hasta el primer caso desplegado. Siempre con fuente; sin dato, mejor no poner cifra.
- **[Opinión] Un hero que sea una etiqueta («IA para empresas»).** A BCG o PwC les funciona porque la marca ya da confianza; a una boutique no. Spiralia necesita nombrar al comprador (CEO, RR. HH./L&D) y el resultado concreto («que tu equipo use la IA de verdad, y la despleguemos contigo»).
- **[Opinión] Catálogos extensos y muros de logos de alianzas o rankings.** Ocho capacidades (Accenture), quince (PwC) o una biblioteca de productos (BCG X) diluyen el mensaje. Mostrar logos de OpenAI, Anthropic o Microsoft sin una alianza formal restaría credibilidad. Mejor 2-3 ofertas encadenadas (formación → despliegue con equipos FDE) y logos o testimonios de clientes reales con permiso.
- **[Opinión] Formularios largos y un contacto genérico al final.** Con 10-15 campos (Accenture, Bain, Deloitte España) un director de RR. HH. curioso abandona. Lo replicable es lo contrario: un micro-formulario o una reserva directa, y una persona con nombre y cara (como PwC, Deloitte y BCG X).
- **[Opinión] Vídeo ambiental sin mensaje y liderazgo de pensamiento a gran volumen.** El vídeo de fondo decorativo no explica qué hace Spiralia, y mantener podcast, informes y eventos mensuales no es sostenible para una boutique. Mejor un vídeo corto explicativo (o una demo de un despliegue) y una sola pieza de referencia de la casa.


---

## B. Escuelas de negocio

**Método y alcance.** Revisión hecha el 14-oct-2026, solo lectura. Para IE, IESE, ESADE, HBS Online, MIT Sloan, LBS y Stanford descargué el HTML bruto con curl. En IE leí además los datos de página de Gatsby (`assets-thesaurus.ie.edu/.../page-data.json`), que es donde está el contenido que se carga por JS. INSEAD (desafío de Cloudflare, 403) y Wharton (403 de Varnish) bloquean curl, así que esas páginas las leí con WebFetch, que devuelve un resumen hecho por modelo: su detalle es menos fiable que el de las páginas bajadas en bruto. Los campos de formulario los conté de tres formas: en el HTML, en el iframe de Pardot o leyendo la definición pública del formulario (JSON de HubSpot, endpoint `getForm` de Marketo), sin enviar nada. No acepté cookies, no rellené ni envié formularios y no descargué folletos. Los ficheros brutos están en `research/txt/bs_*`.

Convención: **[Hecho]** = observado en la web citada; **[Supuesto]** = deducción mía; **[Opinión]** = valoración. Los precios y las cifras son los publicados en la URL indicada en la fecha de consulta.

### Resumen comparativo

| Escuela | Página de IA analizada | Formato y precio publicado | CTA principal | ¿Reserva de llamada? | ¿Oferta corporativa específica de IA? |
|---|---|---|---|---|---|
| IE | AI for Functions + AI-Powered Leadership | Presencial, Madrid, 4 días; 4.300 € (track de liderazgo) | Download Brochure / Apply | Sí: HubSpot Meetings + WhatsApp con asesora identificada | No en ie.edu; lo corporativo se deriva a Headspring (IE + FT) |
| IESE | IA en la empresa (ES) / AI for Executives (EN) | Presencial, 5 días; 6.400 € (ES) / 8.000 € (EN) | Inscríbete / Descargar folleto | No (teléfono y email de la directora de programa) | No (página custom genérica) |
| ESADE | Rethinking Business with AI / Programa Dual IA | Presencial, Madrid, 8 días, 8.000 €; online, 16 semanas, 5.220 € | Descarga el folleto / Solicita entrevista | Sí, indirecta: formulario y después enlace de Calendly | No (casos corporativos sin IA) |
| INSEAD | Leading AI and Digital Transformation / Transforming Your Business with AI | Presencial, 5 días, 11.600 € (Fontainebleau); online, 2.100 € | Apply Now / Download Brochure / Enrol a group | No | No específica; «cualquier programa abierto se puede personalizar» |
| HBS Online | AI Essentials for Business | On-demand, 16-24 h, 1.949 $ | Start Anytime / Request Info | No | Parcial: «learning tracks» de 3 cursos (uno es Digital Transformation & AI) y cohortes privadas; no hay programa de IA a medida |
| MIT Sloan | AI: Implications for Business Strategy | Online a tu ritmo (GetSmarter), 6 semanas, 3.850 $ | Add to Cart / Request Info | No | No específica; la IA aparece en las preguntas para cualificar el custom |
| Wharton | Generative AI and Business Transformation | Presencial, 4 días, 13.500 $ | Apply Now / Download Brochure | No | No (la IA solo sale en la navegación) |
| LBS | Hub de IA + Analytics and AI + **AI Masterclass for your organisation** | 5 días, 9.500 £; masterclass cerrada de 2 días, sin precio | Register your interest | No | **Sí**: masterclass de IA generativa solo para empresas, hasta 35 personas |
| Stanford GSB | Harnessing AI for Breakthrough Innovation… | Presencial, 6 días, 18.500 $ con alojamiento | Apply / Download Brochure | No | No |

---

### IE Business School (IE Lifelong Learning / Executive Education)

**1. URLs analizadas**
- https://www.ie.edu/lifelong-learning/programs/ai-for-functions/ (programa paraguas)
- https://www.ie.edu/lifelong-learning/programs/ai-powered-leadership/ (track de liderazgo, el que tiene la ficha más completa)
- https://www.ie.edu/lifelong-learning/custom-programs/ (corporativo)
- https://www.headspringexecutive.com/ , https://www.headspringexecutive.com/contact-us/ , https://www.headspringexecutive.com/ai-powered-learning-solutions/ (Headspring, la joint venture de IE y el Financial Times a la que remite la página corporativa)

**2. Hero**
- [Hecho] AI for Functions: titular «AI for Functions» con el subtítulo «Turn AI potential into tangible business impact». El fondo es una imagen fija (un microchip) y no hay vídeo.
- [Hecho] AI-Powered Leadership: titular «AI-Powered Leadership» con el subtítulo «The human edge in the age of AI». Mensaje (parafraseado): casi todos los programas de IA hablan de herramientas y se olvidan de quien lidera. El hero es una imagen fija.
- [Hecho] Hay vídeo más abajo, no en el hero: un YouTube embebido en AI-Powered Leadership (ID `O_X8qXC9Eao`) bajo el titular «AI can make decisions. But can it lead?», y un «Faculty Spotlight» de la directora académica.

**3. Estructura**
- [Hecho] AI for Functions: hero → datos clave (16-nov-2026, 4 días, inglés, Madrid, presencial; **sin precio**) → introducción con formulario «Want to know more?» → «Our AI for Functions programs» (tarjetas de los cinco tracks, Finance, Law, Marketing, Human Capital y Leadership, que se cargan por JS) → actividades comunes (sesión de arranque, entrenamiento con IA y realidad virtual de VirtualSpeech, comidas compartidas para hacer red) → «Key learning outcomes» (5) → barra flotante con «Download brochure» → pie corporativo.
- [Hecho] AI-Powered Leadership: hero con «Download Brochure» y «Apply» → datos clave (16-nov-2026, 4 días, inglés, Madrid, presencial, **4.300 €**) → pestañas Program overview / Participants profile / Program Content / Faculty / Admissions & Financial Aid. Dentro de la vista general: texto, formulario, fecha y horario, vídeo, tarjeta de la asesora de programa, «Why this program?» (5) y los demás tracks. Contenido: 4 módulos en acordeón. Admisiones: pago a plazos y email de financiación. Barra flotante: «Call us», «Book a call», «Chat with us», «Apply», «Download brochure».
- [Hecho] La página de custom de ie.edu es un texto corto (co-creación, «lienzo en blanco», equipo dedicado) que remite a Headspring.

**4. Credibilidad**
- [Hecho] Profesorado con nombre: Bernardo Crespo, Kriti Jain y Arseniy Goldberg (AI for Functions). Kriti Jain aparece como directora académica de AI-Powered Leadership, con la etiqueta «Global Best 40 under 40 Profs».
- [Hecho] En estas dos páginas no hay rankings, logos de clientes ni testimonios de alumnos. La única cifra es la del pie común: el 25 % de los antiguos alumnos de IE University funda empresa (https://www.ie.edu/lifelong-learning/programs/ai-for-functions/).
- [Hecho] Headspring sí trabaja la credibilidad corporativa: un bloque de logos «Trusted by Global Leaders», casos de cliente y la afirmación de haber trabajado con «280+ organisations in 28 countries» (https://www.headspringexecutive.com/contact-us/).

**5. Herramientas interactivas**
- [Hecho] Tarjeta «Not sure what to study?» con el botón «Take a quiz». En los datos de la página el enlace está vacío. [Supuesto] Puede que no se muestre o que no funcione.
- [Hecho] Chat por WhatsApp con la asesora y reserva de llamada (ver CTA).
- [Hecho] Headspring presenta «Aimee & AVA», coaches de voz con IA entrenados con el contenido del cliente, como producto de aprendizaje.

**6. Vídeo**
- [Hecho] Un vídeo promocional del programa (YouTube) y un vídeo de presentación de la directora académica, ambos en AI-Powered Leadership.
- [Hecho] Headspring usa vídeo MP4 en bucle en el hero y en los banners (`hero__video-loop`).

**7. CTA**
- [Hecho] Botones: «Download Brochure», «Apply»/«APPLY» (lleva a `my.ie.edu/en/applyxl`), formulario «WANT TO KNOW MORE?», «Unlock program details», «Book a Call», «Click to whatsapp» y «Call us: +34…».
- [Hecho] **Reserva de llamada con HubSpot Meetings** (`meetings.hubspot.com/marina-tomasesquiva`) con una asesora de programa que aparece con nombre, foto y móvil.
- [Hecho] Precio visible en el track (4.300 €), no en la página paraguas.
- Campos del formulario de IE: sin datos (se pinta por JS).
- [Hecho] Formulario corporativo de Headspring (HubSpot): 12 campos. Nombre, apellidos, email corporativo, teléfono, país, cargo, nivel (de consejo a asistente), función (incluye «HR/ People» y «L&D»), empresa, «¿Quieres crear un programa para tu organización?» (sí/no/no lo sé), mensaje y **subida de documentos o RFP**. Botón «Submit».

**8. Valoración**
[Opinión] Es el embudo más agresivo y mejor resuelto para el alumno individual: asesora con cara, reserva de llamada en un clic y WhatsApp. Organizar la oferta por función (Finanzas, Legal, Marketing, Personas, Liderazgo) encaja con cómo piensa un responsable de RR. HH. Para el comprador corporativo, en cambio, el recorrido se rompe: ie.edu no tiene ninguna oferta corporativa de IA y lo manda a otra marca (Headspring), cuyo formulario sí está bien pensado para L&D.

---

### IESE Business School

**1. URLs analizadas**
- https://www.iese.edu/focused/es/ia-empresa/ (programa en español: «IA en la empresa: impacto en el negocio, la organización y las personas»)
- https://www.iese.edu/focused/artificial-intelligence/ (Artificial Intelligence for Executives, en inglés; la etiqueta `<title>` dice «Artificial Intelligence for Business»)
- https://www.iese.edu/executive-education/custom-programs/
- Formularios: https://prdt.iese.edu/l/501101/2024-11-26/5qqywv (folleto en español), https://prdt.iese.edu/l/501101/2023-06-16/5p785g (folleto en inglés), https://formscloud.iese.edu/en/custom-contact-us/ (custom)

**2. Hero**
- [Hecho] En español, el titular es el nombre del programa, «IA en la empresa: impacto en el negocio, la organización y las personas», con las fechas por campus (Madrid, 23-27 nov 2026; Barcelona, 26-30 abr 2027) y los botones «Inscríbete Madrid» e «Inscríbete Barcelona». Le sigue un H2 con el claim «Cambia tu organización con la Inteligencia Artificial». Mensaje (parafraseado): la IA como «nueva electricidad»; visión de conjunto de su impacto en el modelo de negocio, las capacidades y la ética, con simulaciones y casos reales.
- [Hecho] En inglés: «Artificial Intelligence for Executives», con ediciones en Múnich, Madrid y Nueva York, y el H2 «Transform Your Business Through AI».
- [Hecho] No hay vídeo ni animación en las páginas del programa.

**3. Estructura** (casi igual en los dos idiomas)
- [Hecho] Hero con fechas y botón de inscripción por campus → ficha (lugar, 5 días, presencial, **6.400 €** en español / **8.000 €** en inglés) → iframe de Pardot «Descarga de folleto» → «¿Por qué elegir…?» (5 beneficios numerados) → detalles: próximas ediciones (incluida una sesión de arranque online de 75 minutos) y contacto con la directora del programa por nombre, teléfono y email → acordeones con Contenido (5 bloques), A quién va dirigido, Claustro, Metodología, Admisión y tarifas, Política de cancelación, Certificado, y Cómo llegar y hoteles → programas relacionados → (solo en inglés) un testimonio → insignias de rankings → «¿Preguntas? CONTÁCTANOS».

**4. Credibilidad**
- [Hecho] Claustro con nombre, cátedra y titulaciones. En español: Javier Zamora (director académico), Carlos Riquelme (presentado también como «Principal Researcher Microsoft»), Ricard Gil, Oscar González-Peralta, Victor Martínez de Albéniz y Sandra Sieber. En inglés: Sampsa Samila (director académico), Evgeny Káganer y otros tres.
- [Hecho] Rankings en forma de insignia, en las páginas de programa y en la de custom: «3rd in the world Open Executive Education 2026», «4th in the world Custom Executive Education 2026» y «1st in the world Executive Education 2015-2020». En la página de custom los textos alternativos de las imágenes los atribuyen al FT (https://www.iese.edu/executive-education/custom-programs/).
- [Hecho] Un solo testimonio en la versión inglesa: Coral Díaz Martín, KPMG Múnich.
- [Hecho] Filtro de admisión que también funciona como señal de calidad: unos 10 años de experiencia y un cargo directivo en los últimos 5.
- [Hecho] Tarifas en español: general 6.400 €, alumni 5.760 €, miembros 5.440 €. Mencionan «acuerdos corporativos y cuotas para inscripciones múltiples», pero sin cifras (https://www.iese.edu/focused/es/ia-empresa/).
- [Hecho] Página de custom: dice estar entre los mejores programas a medida del mundo según el FT. Testimonios de Henkel (Mona Zons, Corporate Manager Learning) y VWT&B (Martin Hofmann, Head of HR), y casos en PDF con logos de Boehringer, Henkel, Leschaco, Swire y Traton.

**5. Herramientas interactivas**
- [Hecho] Nada en las páginas del programa. En el menú global hay un «PROGRAM FINDER», que no analicé.

**6. Vídeo**
- [Hecho] Ninguno en las páginas de IA. La página de custom incluye un YouTube sobre su modelo de aprendizaje («Limitless Learning»).

**7. CTA**
- [Hecho] «Inscríbete Madrid/Barcelona» (en inglés, «Apply…»), «Descargar folleto» y «CONTÁCTANOS» / «GET IN TOUCH WITH US».
- [Hecho] Formulario de folleto (Pardot): **13 campos + casilla de condiciones**. Tratamiento, nombre, dos apellidos, email, país, provincia, **fecha de nacimiento**, prefijo, teléfono, nivel jerárquico, años de experiencia y comentarios. Botón «ENVIAR».
- [Hecho] Precio visible. No hay reserva de llamada: el contacto es el teléfono y el email de la directora de programa.
- [Hecho] Página de custom: titular «Custom Programs» con el subtítulo «Learning Tailored to Your Organization». Tres formatos (presencial, online, blended), un proceso en cinco pasos (Define, Dream, Design, Deliver, Debrief), responsables con nombre por sede y el botón «CONTACT US», que lleva a un formulario de **12 campos**: nombre, dos apellidos, email, prefijo, teléfono, empresa, cargo, sector, país, descripción de necesidades y aviso legal.

**8. Valoración**
[Opinión] Es la página más «dossier»: transparente (precio, horario, admisión, cancelación) y apoyada en la autoridad académica. Le sirve al participante y a su jefe para aprobar la plaza. Para L&D, la IA solo se vende como plaza individual; la página de custom es genérica (habla de digitalización, no de IA) y no enseña ni impacto medido ni seguimiento. El proceso en cinco pasos es un patrón reutilizable.

---

### ESADE Executive Education

**1. URLs analizadas**
- https://www.esade.edu/executive-education/es/programa/rethinking-business-ai (presencial, Madrid)
- https://www.esade.edu/executive-education/es/programa/rethinking-business-ai/solicita-entrevista
- https://www.esade.edu/executive-education/es/programa/liderazgo-estrategico-ia (Programa Dual online)
- https://www.esade.edu/executive-education/es/programas-para-organizaciones (destino de la redirección de `/corporate-learning-solutions`)
- https://www.esade.edu/executive-education/es/corporate-learning-solutions/nuestros-clientes y …/como-trabajamos

**2. Hero**
- [Hecho] Rethinking: titular «Rethinking Business with AI». Subtítulo (parafraseado): llevar la IA a la estrategia del negocio y convertirla en proyectos con impacto real. Hero con cuatro botones. No detecté vídeo ni animación.
- [Hecho] Dual: titular «Programa Dual en Liderazgo Estratégico en la Era de la IA», con el aviso de que las fechas de la próxima edición «se informarán en breve».

**3. Estructura (Rethinking)**
- [Hecho] Hero + 4 CTA → menú de anclas → «Próximas ediciones y precios» (28 abr–9 jun 2027, Madrid, presencial, **8.000 €**, español) → «¿Es este programa para ti?» (4 perfiles escritos en primera persona, del tipo «Lidero una organización y necesito…») → «¿Qué te llevarás?» (5) → cita del director, Marc Cortés → información académica: objetivos; 8 unidades, entre ellas un laboratorio de IA, un hackathon de un día, IA agéntica y el reglamento europeo de IA (AI Act); metodología con un asistente docente de IA; 8 días y 64 horas; microcredencial de la Universitat Ramon Llull → profesorado (10 fichas que mezclan académicos y profesionales en activo) → «¿Con quién compartirás aula?» (de 35 a 45 años, mínimo 8 años de experiencia, sectores) → admisión y financiación (bonificación a empresas que inscriben a varias personas, 15 % para alumni, préstamos de Imagin, Sabadell, BBVA, CaixaBank y Deutsche Bank, **bonificación de FUNDAE**, premios a la excelencia del 10 al 30 %) → formulario «Descarga el folleto».
- [Hecho] Dual: 16 semanas, de 8 a 12 horas por semana, dos webinars semanales (director y mentor), FAQ y **5.220 €**. El formulario es un iframe de Emeritus (`contentful-pages.emeritus.org`). [Supuesto] El formato online lo opera Emeritus.

**4. Credibilidad**
- [Hecho] Profesorado con nombre y bio, mezclando academia y empresa. Marc Torrens aparece con más de 20 patentes y una cartera adquirida por Apple; también hay CEO y fundadores de startups.
- [Hecho] Ranking: «la segunda mejor escuela de negocios del mundo en Open Programs, según el Financial Times». Está en las FAQ del Programa Dual (https://www.esade.edu/executive-education/es/programa/liderazgo-estrategico-ia), no en Rethinking.
- [Hecho] Microcredencial universitaria con créditos ECTS.
- [Hecho] En la página de organizaciones hay casos de Santander, KUKA y Bayer. La de clientes usa un formato **reto → solución → impacto**, con citas de responsables de formación o RR. HH. de Deutsche Bank, ECCBC y CaixaBank, y la cifra «más de 30 años» de programas a medida «en más de 25 países» (https://www.esade.edu/executive-education/es/corporate-learning-solutions/nuestros-clientes).

**5. Herramientas interactivas**
- [Hecho] Ninguna en la página, aparte del buscador «Encuentra tu programa» de la cabecera. El «AI Teaching Assistant» se presenta como un rasgo del programa, no como una herramienta de la web.

**6. Vídeo**
- [Hecho] No detecté vídeo en ninguna de las páginas de ESADE analizadas.

**7. CTA**
- [Hecho] Botones: «Descarga el folleto», «Inscríbete online» (portal de Salesforce), «Próximos eventos» y «Solicita entrevista».
- [Hecho] «Solicita entrevista» lleva a un formulario. Tras enviarlo, la persona recibe un **enlace de Calendly** para elegir hora con admisiones (https://www.esade.edu/executive-education/es/programa/rethinking-business-ai/solicita-entrevista).
- [Hecho] El formulario (FormAssembly) es el mismo para folleto y entrevista: **unos 16 campos visibles + 2 casillas de consentimiento**. Nombre, dos apellidos, **año de nacimiento**, email, país, provincia o ciudad, prefijo y móvil, programa, años de experiencia, campus, empresa, cargo, LinkedIn, disponibilidad para la entrevista y comentarios. Botón «ENVIAR». Algunos campos son condicionales, así que el recuento es aproximado.
- [Hecho] Precio visible.
- [Hecho] Página de organizaciones: titular «Programas para Organizaciones» con el subtítulo «Desarrollando líderes, transformando organizaciones». CTA «Contacta con nosotros», «Suscríbete a la newsletter» y «Hablemos». Tres soluciones (a medida, portafolio, alianzas) y un proceso en cuatro pasos (Analizamos, Diseñamos, Implementamos, Evolucionamos). Usa el **mismo formulario**, con un selector «Formación para ejecutivos / Formación para empresa», y sigue pidiendo el año de nacimiento.

**8. Valoración**
[Opinión] Es la que mejor habla el idioma del comprador corporativo español: FUNDAE, bonificación por varias personas, casos de banca española contados como reto-solución-impacto por responsables de formación. Pero la IA no forma parte de la propuesta corporativa, y obligar a la empresa a usar el formulario del alumno (con año de nacimiento) delata que el embudo está pensado para la persona, no para la organización.

---

### INSEAD

**1. URLs analizadas** (leídas con WebFetch porque Cloudflare bloquea curl)
- https://www.insead.edu/executive-education/digital-transformation-ai/leading-ai-and-digital-transformation (+ `/dates-fees`)
- https://www.insead.edu/executive-education/open-online-programmes/transform-business-ai
- https://www.insead.edu/executive-education/customised-programmes
- https://www.insead.edu/form/contact-edp-csp (formulario corporativo)
- https://www.insead.edu/impact-focus/ai (IN:AI, su iniciativa de IA)

**2. Hero**
- [Hecho] Presencial: titular «Leading AI and Digital Transformation». Subtítulo (parafraseado): escalar la IA y liderar la transformación digital en tu organización. No hay vídeo en el hero; hay un YouTube justo debajo del bloque de sesiones.
- [Hecho] Online: titular «Transforming Your Business with AI». Subtítulo (parafraseado): marcos prácticos para alinear la estrategia de IA con los objetivos del negocio y liderar iniciativas.

**3. Estructura (presencial)**
- [Hecho] Hero («Apply Now», «Download Brochure») → menú lateral de anclas → caja de sesiones con «Contact Programme Advisor» → vídeo con Nathan Furr y José Pedro Almeida → visión general y conceptos clave → perfil de participantes → beneficios (4) → competencias → certificado → directores del programa → carrusel «IN Focus» con testimonios y vídeos → 4 vídeos «Digital Insights» → «The Innovators Method» (su metodología propia) → fechas y precios → financiación → planificador de certificado → relacionados → FAQ → contacto.
- [Hecho] Sesiones: 1-5 feb 2027 en Singapur, **16.950 S$**; 12-16 abr 2027 en Fontainebleau, **11.600 €** (https://www.insead.edu/executive-education/digital-transformation-ai/leading-ai-and-digital-transformation/dates-fees).
- [Hecho] Online: 1 mar–31 may 2027, 5 semanas de contenido, **2.100 €**, «Premium Journey» por 690 € más, **20 % de descuento para grupos de 5 o más** y hasta 30 % para alumni (https://www.insead.edu/executive-education/open-online-programmes/transform-business-ai).

**4. Credibilidad**
- [Hecho] Directores con nombre: Nathan Furr y Jason P. Davis (presencial); Theodoros Evgeniou, Phanish Puranam y Ville Satopaa (online).
- [Hecho] Testimonios con cargo y empresa: Signify, SAP, DNV, ING Bank, Roche (presencial); Pico Global (online).
- [Hecho] Cifras: «25 nacionalidades» por sesión, de 5 a 12 años de experiencia, y una investigación sobre «400 businesses and 16,000 executives» detrás de su metodología (página presencial).
- [Hecho] Página de custom: «Over 40 Years of Designing Customised Programmes for All Organisational Levels» e insignias «40 plus», «165 plus», «200 plus» y «3500 plus». Qué mide cada insignia: sin datos (solo aparece en el nombre de las imágenes). Hay **9 vídeos de clientes** (Holcim, ABN AMRO, Hitachi, NTT Data, TCS, Emirates NBD…) y casos de Tech Mahindra, Schneider, Cargill, TCS y Jardines.
- [Hecho] Según la lectura con WebFetch, ninguna de las páginas analizadas cita rankings.

**5. Herramientas interactivas**
- [Hecho] «Certificate Planner» para planificar el Certificate in Global Management.
- [Hecho] La página IN:AI enseña herramientas propias de aprendizaje con IA (LearnAI con casos en realidad extendida, LiveCases, Lexarius) como prueba de innovación pedagógica. No son herramientas de diagnóstico para el comprador.

**6. Vídeo**
- [Hecho] Un profesor presentando el programa (YouTube) y vídeos cortos de opinión en el presencial; 3 vídeos en el online; 9 testimonios de cliente en vídeo en la página de custom.

**7. CTA**
- [Hecho] Presencial: «Apply Now», «Download Brochure», «Contact Programme Advisor» (email).
- [Hecho] Online: «Enrol yourself», **«Enrol a group»**, «Group enquiry» y «Download Brochure». La compra en grupo está al mismo nivel que la individual.
- [Hecho] Precio visible.
- [Hecho] Página de custom: «Contact us» lleva a un formulario de **unos 10 campos + consentimiento**. Nombre, apellido, empresa, email, teléfono, cargo, país, **país de la sede** y **número de participantes a formar** (1-5 / 6-20 / 21-50 / >50), más una descripción de necesidades. Contactos regionales con nombre.
- [Hecho] No hay reserva de llamada.

**8. Valoración**
[Opinión] Es la escuela más completa para el comprador corporativo dentro de la propia ficha del programa: «Enrol a group» junto a «Enrol yourself», descuento de grupo explícito, y un formulario que cualifica por volumen y sede. Los testimonios de cliente en vídeo son su mejor activo. La IA se sigue vendiendo como contenido, no como implantación, y nada habla de qué pasa en la empresa después del programa.

---

### HBS Online (Harvard Business School Online)

**1. URLs analizadas**
- https://online.hbs.edu/courses/ai-essentials-for-business/
- https://online.hbs.edu/organizations/
- https://online.hbs.edu/organizations/request-more-information/ (formulario corporativo; se carga por JS)
- https://www.exed.hbs.edu/solutions-for-organizations (HBS Executive Education, vista solo por encima)

**2. Hero**
- [Hecho] Titular «AI Essentials for Business». Subtítulo (parafraseado): entender cómo la IA transforma el negocio y encontrar dónde aplicarla, a tu ritmo y con 90 días de acceso.
- [Hecho] **Vídeo en el hero** (reproductor Kaltura, 1:44, botón «Play Video»).
- [Hecho] Página de organizaciones: titular «Solutions for Organizations». Subtítulo (parafraseado): formar a la plantilla y transformar la organización, sea una multinacional, una pyme o una universidad.

**3. Estructura (curso)**
- [Hecho] Hero (on-demand, 16-24 h, **1.949 $**) → «Key Concepts» (6) → «Who Will Benefit» (3 perfiles) → un testimonio breve más 3 cifras de resultado → «What You'll Earn» (certificado de finalización y certificado de especialización por 3 cursos) → temario de 4 módulos, con horas, expertos invitados de empresa (Ant Group, Moderna, Mozilla, Amazon AI…) y **ejercicios aplicados a la organización del alumno** (identificar casos de uso, medir la madurez con un «AI-first scorecard») → descarga del temario en PDF → profesorado → experiencia de la plataforma (micro-vídeos) → historia de un alumno → FAQ (5) → e-book gratis → teaser para empresas → cursos relacionados.

**4. Credibilidad**
- [Hecho] Profesorado: Karim R. Lakhani y Marco Iansiti, con su cátedra.
- [Hecho] Cifras en la página del curso: «82%» se siente más seguro liderando iniciativas, «11x» de retorno con una subida salarial media de 20.466 $ (los datos de la página precisan que la reporta el 24 % de los alumnos) y «91%» adquirió habilidades aplicables de inmediato (https://online.hbs.edu/courses/ai-essentials-for-business/).
- [Hecho] Cifras en la página de organizaciones: «90%» de finalización, «91%» con habilidades aplicables y «80%» que lo considera mejor que otros programas online (https://online.hbs.edu/organizations/).
- [Hecho] Testimonios: TTK Healthcare y Google. Sin rankings y sin logos de clientes corporativos.

**5. Herramientas interactivas**
- [Hecho] **Comparador de cursos** (casillas «Compare») y buscador por palabra clave, materia y formato en la página de organizaciones. Dentro del curso, el «AI-first scorecard» se usa como ejercicio, no como herramienta pública de la web.

**6. Vídeo**
- [Hecho] Tráiler del curso en el hero y micro-vídeos de 8 a 11 segundos que enseñan la plataforma. En HBS Executive Education, un vídeo de 2:00 en su página para organizaciones.

**7. CTA**
- [Hecho] Curso: «Start Anytime» (inscribirse), «Request Info» (ventana emergente de OptinMonster), «Download full syllabus (pdf)» y «Access Your Free E-Book». Para empresas: «Learn more», con descuentos para grupos de 5 o más.
- [Hecho] Organizaciones: «Request Info», que lleva a `/organizations/request-more-information` (campos: sin datos, se pinta por JS), y «Download Your Free Brochure».
- [Hecho] Explican cohortes públicas frente a cohortes privadas de equipo, descuentos por volumen y «learning tracks» de 3 cursos, uno de ellos de Digital Transformation & AI.
- [Hecho] HBS Executive Education usa el titular «Premium Learning Experiences» y los botones «Download Our Program Guide for Organizations» y «Submit a Custom Program Inquiry».
- [Hecho] Precio visible en cada curso. No hay reserva de llamada.

**8. Valoración**
[Opinión] Es la ficha más «producto», casi SaaS: precio, horas, resultados en porcentaje, temario con ejercicios sobre tu propia empresa y comparador. Muy fácil de evaluar para L&D. Sus métricas, sin embargo, son de la persona (sueldo, confianza), no de la organización, y la IA se enseña como cultura general de negocio, no como despliegue.

---

### MIT Sloan Executive Education

**1. URLs analizadas**
- https://executive.mit.edu/course/artificial-intelligence/a056g00000URaa3AAD.html (AI: Implications for Business Strategy; la URL antigua `/openenrollment/program/…` da 404)
- https://executive.mit.edu/solutions-for-organizations.html
- https://executive.mit.edu/solutions-for-organizations/custom-programs.html
- https://executive.mit.edu/solutions-for-organizations/custom-programs/custom-program-inquiry.html

**2. Hero**
- [Hecho] Titular «Artificial Intelligence: Implications for Business Strategy», con las etiquetas «AI-FOCUSED» y «EARN 2.0 EEUs». No hay subtítulo de beneficio. Lo que lo describe (parafraseado) es la vista general: programa conjunto de Sloan y CSAIL (el laboratorio de informática e IA del MIT) centrado en las implicaciones directivas, no en las técnicas.
- [Hecho] No hay vídeo en el hero. Hay un botón «Watch video» (YouTube) en el bloque de beneficios.

**3. Estructura**
- [Hecho] Hero planteado como ficha de comercio electrónico (próxima fecha 18 nov 2026–2 feb 2027; online a tu ritmo; 6 semanas; 6-8 h por semana; **3.850 $**; **selector de cantidad de 1 a 10 plazas**; «Add to Cart», «Save Course», «Go to GetSmarter Site») → «Request Course Information» → calendario de 9 cohortes → vista general → beneficios (a tu ritmo, certificado, interactivo, asesor de seguimiento) con vídeo → resultados → por qué MIT Sloan → calendario de ejemplo (6 módulos) con «Download Full Course Schedule» → dedicación → a quién va dirigido → profesorado (12 nombres, entre ellos David Autor, Andrew Lo, Thomas Malone, Sandy Pentland y Daniela Rus) → ideas del profesorado → cómo inscribirse (a través de GetSmarter) con la carta modelo **«Get the Green Light»** para pedir aprobación a la empresa → reseñas (widget de TurnTo; contenido sin datos, se carga por JS).

**4. Credibilidad**
- [Hecho] Marca compartida con MIT CSAIL, 12 profesores con nombre y cargo, un certificado que suma para el Executive Certificate y un widget de reseñas. No hay rankings.
- [Hecho] Páginas para organizaciones: testimonios de Takeda (Andrew Plump, CMSO), Leviton (Daryoush Larizadeh, presidente y COO), L'Oréal Americas (Maeve Coburn, SVP Learning), Generali (Philippe Donnet, CEO del grupo) y Bain (Cate Hight, socia). Hablan de «90+» cursos abiertos (https://executive.mit.edu/solutions-for-organizations.html).

**5. Herramientas interactivas**
- [Hecho] Buscador y calendario de cursos, guardar curso y selector de plazas.
- [Hecho] **Tabla comparativa «Custom Program» frente a «Group Enrollment»**: privado o público, propósito, personalización, flexibilidad, implicación, duración, coste, soporte, resultado y para quién es cada uno.
- [Hecho] Una lista de preguntas de sí o no para que la empresa vea si le encaja un programa a medida. Una de ellas trata de integrar la IA en la estrategia y las operaciones.

**6. Vídeo**
- [Hecho] Un vídeo del curso (YouTube) y un vídeo en la página de custom.

**7. CTA**
- [Hecho] Curso: «Add to Cart», «Request Info» (3 campos, email, nombre y apellido, más consentimiento; botón «Submit») y «Go to GetSmarter Site». Precio visible.
- [Hecho] Organizaciones: «Explore Custom Programs», «Explore Group Enrollments» (cuentas corporativas a partir de 20 participantes y descuentos para equipos pequeños) y «Download the Brochure».
- [Hecho] Custom: «Request a Consultation» (tres veces) y «Contact Us for a Consultation». El formulario es de Formstack y se carga por JS: campos sin datos.
- [Hecho] No hay reserva de llamada.

**8. Valoración**
[Opinión] La tabla «custom frente a grupo» es la mejor ayuda a la decisión que vi para RR. HH., y el selector de plazas y la carta para conseguir aprobación interna encajan con cómo se compra de verdad. Pero el curso de IA lo da un tercero (GetSmarter), es asíncrono y genérico, y el formulario corporativo no es visible sin JS.

---

### Wharton Executive Education

**1. URLs analizadas** (leídas con WebFetch por el 403; los formularios, con el endpoint público de Marketo)
- https://executiveeducation.wharton.upenn.edu/for-individuals/all-programs/generative-ai-and-business-transformation/
- https://executiveeducation.wharton.upenn.edu/for-organizations/
- https://executive.wharton.upenn.edu/custom-inquiry-form.html (Marketo, formulario 1027)
- https://executive.wharton.upenn.edu/download.html?acro=gnai (folleto, Marketo, formulario 1030)

**2. Hero**
- [Hecho] Titular «Generative AI and Business Transformation», sin subtítulo, seguido de una vista general sobre la IA generativa como tecnología de propósito general. No hay vídeo.
- [Hecho] Página para organizaciones: titular «Tailored Learning, Lasting Impact». Subtítulo (parafraseado): programas a medida alrededor de las prioridades de la organización, con resultados medibles.

**3. Estructura**
- [Hecho] Programa: hero y vista general con CTA → fechas, lugar y precio (16-19 nov 2026, Filadelfia, **13.500 $**, 4 días) → anclas → experiencia del programa (puntos fuertes, resultados, temas, **«Convince Your Supervisor»** con carta de justificación editable, «Attend as a Team») → a quién va dirigido + inscripción de grupo (**4 o más**) → profesorado → testimonios → fechas y precio otra vez → hotel → relacionados → contacto → buscador.
- [Hecho] Organizaciones: formatos (en directo online, en campus, blended) → descuento de grupo (4 o más) → folleto → experiencia de aprendizaje → áreas de conocimiento → «Partnering for Success» con el caso **«Wharton BBVA Partnership»** y 11 logos (Google, Citi, Nissan, GSK, Estée Lauder, Bradesco Seguros, Evonik, NFL…) → contacto.

**4. Credibilidad**
- [Hecho] Profesorado: Kartik Hosanagar y Stefano Puntoni (codirectores académicos) y Prasanna Tambe, todos vinculados a Wharton Human-AI Research.
- [Hecho] Testimonios: Visa (Global Head of Technology Learning), Wayspring y Service Corporation International.
- [Hecho] Ni rankings ni vídeos según la lectura con WebFetch. La IA no aparece en el cuerpo de la página para organizaciones, solo en la navegación.

**5. Herramientas interactivas**
- [Hecho] Buscador «Find a new program» por palabra clave, materia y fecha de inicio, y carta de justificación descargable.

**6. Vídeo**
- [Hecho] Ninguno en las dos páginas analizadas.

**7. CTA**
- [Hecho] «Download Brochure», «Apply Now» y «Learn More » (grupos). Precio visible.
- [Hecho] Formulario de folleto: **unos 13 campos visibles**. Tratamiento, nombre, apellido, email, teléfono, función, cargo, empresa, años de experiencia, país, estado (si es EE. UU.), cuándo quiere empezar, cómo nos conoció, más el permiso de comunicaciones.
- [Hecho] Organizaciones: «Learn About Our Approach »», «Download Brochure »» y «Request Consult». Esta última lleva a un formulario de **unos 15 campos** que cualifica mucho: retos clave, **número estimado de asistentes** (de menos de 10 a más de 100), plazo, **formato preferido**, **tipo de consulta** (custom o grupo) y «cómo nos conoció», que ya incluye la opción «AI Search».
- [Hecho] No hay reserva de llamada.

**8. Valoración**
[Opinión] Es el mejor formulario corporativo del grupo: deja el lead listo para una primera reunión con volumen, plazo, formato y tipo. Al mismo tiempo, la carta para «convencer al supervisor» confirma que su venta de IA va de abajo arriba: de la persona que se apunta al jefe que paga. Para España, el caso BBVA es la prueba de cercanía más útil.

---

### London Business School (breve)

**1. URLs**
- https://www.london.edu/executive-education/ai (página central de IA)
- https://www.london.edu/executive-education/digital-transformation-and-innovation/analytics-and-ai-from-data-insights-to-strategic-impact
- https://www.london.edu/executive-education/ai/ai-masterclass-for-your-organisation

**2-3. Hero y estructura**
- [Hecho] Página central: titular «Artificial Intelligence». Subtítulo (parafraseado): donde la tecnología se cruza con el juicio humano; aplicar la IA con responsabilidad y criterio estratégico. Sigue con por qué LBS (4 tarjetas) → oferta → testimonios → certificado → próximos cursos → ranking → FAQ → contacto.
- [Hecho] Programa: titular «Analytics and AI: From Data Insights to Strategic Impact». 5 días en Londres, **9.500 £**. Pestañas **«Good for you» / «Good for your organisation»**.
- [Hecho] **Masterclass corporativa**: titular «AI Masterclass for your organisation». Dos días seguidos, **solo para organizaciones, hasta 35 participantes**; los particulares pueden apuntarse a una lista de espera. Sin precio.

**4. Credibilidad**
- [Hecho] «#1 in Open and #2 in Custom Executive Education by the Financial Times» (https://www.london.edu/executive-education/ai).
- [Hecho] Testimonios de De Beers, RepuestoLibre, Fordington Advisors e illumine. 25 % de descuento para alumni.
- [Hecho] Incoherencia: el programa pide 10 años de experiencia o más en una sección y 5 en las FAQ.

**5-6. Herramientas y vídeo**
- [Hecho] Solo buscador de cursos. No detecté vídeo en el HTML.

**7. CTA**
- [Hecho] Botones: «Download brochure», «Apply now», «Reserve a place» y, en la masterclass, «Register your interest» (formulario de Qualtrics; campos sin datos).
- [Hecho] Contacto **separado para particulares y para «organisations and groups»**, este último con el enlace «Contact client solutions».
- [Hecho] No hay reserva de llamada.

**8. Valoración**
[Opinión] Su masterclass cerrada de IA generativa para una sola empresa, de dos días y hasta 35 personas, es lo más parecido a la oferta de Spiralia, y separa bien a la persona de la organización. La página, eso sí, es muy fina: sin precio, sin agenda detallada y sin resultados.

---

### Stanford GSB Executive Education (breve)

**1. URLs**
- https://www.gsb.stanford.edu/exec-ed/programs/harnessing-ai-breakthrough-innovation-strategic-impact
- https://www.gsb.stanford.edu/exec-ed/organizations/custom-programs

**2-3. Hero y estructura**
- [Hecho] Titular «Harnessing AI for Breakthrough Innovation and Strategic Impact». Subtítulo (parafraseado): decidir con más criterio entendiendo el panorama de la IA y sus usos reales.
- [Hecho] Botones «Apply» y «Download Brochure», con un panel para elegir sesión: 3 sesiones en 2027, **18.500 $** cada una, con alojamiento y comidas incluidos.
- [Hecho] Orden: beneficios → a quién va dirigido → sesiones y requisitos → contacto con nombre → vídeo → profesorado → relacionados, entre ellos «The AI-Powered Organization».

**4. Credibilidad**
- [Hecho] Profesorado de la GSB, del Stanford HAI (su instituto de IA centrada en las personas) y de las facultades de Ingeniería, Derecho y Medicina. Codirectores: Paul Oyer y Mykel Kochenderfer.
- [Hecho] No hay rankings ni testimonios en la ficha.

**5-6. Herramientas y vídeo**
- [Hecho] No hay herramientas.
- [Hecho] Vídeo en YouTube de los codirectores presentando el programa. En la página de custom, un vídeo de 2:39 con la profesora Sarah Soule y antiguos participantes.

**7. CTA**
- [Hecho] Custom: «Submit a Custom Program Inquiry». El proceso arranca con ese formulario. Precio visible en el programa abierto. No hay reserva de llamada.

**8. Valoración**
[Opinión] Vende autoridad pura (Stanford y HAI) a un precio de gama alta. Para un comprador corporativo español es poco accionable.

---

### Patrones comunes en escuelas de negocio

- **[Hecho] La ficha del programa abierto se escribe para el individuo.** El hero lleva el nombre del programa, no un beneficio (las excepciones parciales son IE, IESE en español y ESADE), y justo debajo van la fecha, la duración, el formato y el precio. Casi todas publican precio, entre 1.949 $ en HBS Online y 18.500 $ en Stanford. No lo publican la página paraguas de IE ni la masterclass corporativa de LBS.
- **[Hecho] La credibilidad descansa en la autoridad académica**: profesores con cátedra, insignias de ranking del FT (IESE, LBS, ESADE) y testimonios de alumnos con cargo y empresa. Casi nadie enseña resultados de negocio medidos en la empresa cliente. Lo más cercano son los casos reto-solución-impacto de ESADE y las cifras de alumno de HBS Online, que son de la persona, no de la organización.
- **[Hecho] El CTA es doble: «Descargar folleto» como captación + «Apply/Inscríbete».** Los formularios de folleto son largos: 13 campos en IESE (con fecha de nacimiento), unos 16 en ESADE (con año de nacimiento) y unos 13 en Wharton. Hablar con una persona es raro: solo IE ofrece reserva directa (HubSpot Meetings y WhatsApp con asesora identificada), y ESADE manda un Calendly después del formulario.
- **[Hecho] Lo corporativo vive aparte y es genérico.** Va en otra sección, o en otra marca (IE → Headspring), y repite siempre lo mismo: co-creación, un proceso de 4 o 5 pasos, logos y casos. Solo LBS tiene una oferta corporativa específica de IA (la masterclass cerrada). En el resto la IA aparece de pasada: MIT en sus preguntas para cualificar, INSEAD en artículos, ESADE en una línea sobre innovación.
- **[Hecho] El camino intermedio para la empresa es la inscripción de grupo con descuento**: INSEAD («Enrol a group», 20 % a partir de 5 en online), HBS Online (5 o más), Wharton (4 o más), MIT (cuentas corporativas a partir de 20 y selector de plazas), y «consúltanos» o «bonificaciones» en IESE y ESADE.
- **[Hecho] La venta va de abajo arriba**, con kits para que el alumno convenza a su jefe: la carta «Get the Green Light» de MIT y la «justification letter» de Wharton. ESADE recuerda que la empresa puede bonificar la formación con FUNDAE.
- **[Hecho] Las herramientas interactivas son pobres y sirven para navegar**: buscadores, comparadores (HBS Online, la tabla custom frente a grupo de MIT), el planificador de certificado de INSEAD y el quiz de IE. Ninguna escuela ofrece en la web un autodiagnóstico de madurez en IA ni una calculadora de impacto para la empresa. El «AI-first scorecard» de HBS vive dentro del curso.
- **[Hecho] El vídeo es funcional, no protagonista**: el director presentando el programa (IE, INSEAD, Stanford), testimonios de cliente en las páginas de custom (9 en INSEAD, también en IESE, MIT y Stanford) y el tráiler de la plataforma en HBS Online. Solo Headspring usa vídeo en bucle en el hero. Los formularios corporativos buenos cualifican por número de participantes, plazo, formato, sede o adjunto de RFP (INSEAD, Wharton, Headspring).

### Qué puede tomar prestado Spiralia y qué no

- **[Opinión] Tomar la ficha de datos clave en el primer pantallazo y la comparación de modalidades.** Un bloque tipo «formato · duración · nº de personas · presencial/remoto · idioma», y una tabla al estilo de MIT que compare las opciones de Spiralia: formación de equipo, programa in-company y despliegue con equipo FDE. Si se publica precio o un rango es una decisión que tienes que tomar tú, porque toca dinero. Las escuelas lo publican porque venden plazas; Spiralia vende proyectos.
- **[Opinión] Tomar la separación de audiencias.** El «Good for you / Good for your organisation» y el contacto doble de LBS (particulares frente a organizaciones), con formularios distintos para RR. HH. o L&D y para el CEO. Es lo contrario de ESADE, que usa un único formulario con año de nacimiento para todos.
- **[Opinión] Tomar los casos reto → solución → impacto contados por el responsable de formación o RR. HH. del cliente (como ESADE), la persona de contacto con nombre, foto y reserva de llamada (como IE) y un formulario corto que cualifique** (nº de personas, plazo, área, adjuntar RFP; como Wharton, INSEAD o Headspring).
- **[Opinión] No intentar competir en autoridad académica** (rankings, cátedras, «líder mundial»): ahí Spiralia pierde siempre. Hay que sustituirla por pruebas de despliegue: adopción y uso medidos en clientes, casos de uso puestos en producción, los FDE con nombre y una demo de lo que se construye. Ninguna escuela enseña qué pasa en la empresa después del programa, y ese hueco encaja con el discurso de «el valor está en el despliegue».
- **[Opinión] No copiar el embudo del folleto con 13-16 campos ni mandar lo corporativo a otra página o marca.** Sí ocupar el hueco que todas dejan: un autodiagnóstico breve de madurez en IA para la empresa (área, uso actual, herramientas como Copilot o ChatGPT Enterprise, objetivo) que devuelva un punto de partida y lleve a la llamada. Ninguna escuela lo tiene.


---

## C. Empresas de formación en IA nativas

**Alcance y método.** Revisión hecha el 14-oct-2026 leyendo el HTML de cada página con curl, sin navegador y sin ejecutar JavaScript. No he rellenado ni enviado ningún formulario. Cuando un formulario se carga por JS, el número de campos solo aparece si su definición era legible públicamente (JSON de HubSpot v3 o HTML de Salesforce Marketing Cloud); si no lo era, pongo «sin datos». Marcas: **[Hecho]** = lo he visto en la web o en su código; **[Supuesto]** = lo deduzco de lo que vi; **[Opinión]** = valoración propia. Las cifras son las que publica cada empresa sobre sí misma, no están verificadas por terceros.

**Muestra.** Las tres pedidas (Section, Multiverse, Faculty) y tres más:
- **Mindstone** (Londres): es la que más se parece a Spiralia en modelo. Sesiones prácticas en directo para comités de dirección más una academia para equipos, y vende a CEOs.
- **Founderz** (Barcelona): competidor directo en España, con el mismo ICP (RR. HH./L&D), bonificación FUNDAE y alianza con Microsoft.
- **Uplimit** (EE. UU.): no es una boutique, pero es la mejor referencia de «pruébalo tú mismo» (demo de voz en directo) dirigida a compradores de L&D.

Descartadas: Coursera, DataCamp y General Assembly. Son catálogos de cursos masivos, y su web aporta poco a una boutique de despliegue [Opinión].

---

### C.1 Section (sectionai.com)

**1. URLs analizadas**
- https://www.sectionai.com/ (home)
- https://www.sectionai.com/book-a-demo
- https://www.sectionai.com/section-hq · https://www.sectionai.com/section-coach
- https://www.sectionai.com/services · https://www.sectionai.com/solutions/ai-transformation
- https://www.sectionai.com/ai/2027-ai-planning · https://www.sectionai.com/ai/the-ai-proficiency-report · https://www.sectionai.com/resources
- No existen páginas /teams ni /enterprise: ambas devuelven 404 [Hecho]. El contenido enterprise está repartido entre Section HQ, Services y Book a demo.

**2. Hero**
- Titular literal: **«You bought AI. That was the easy part.»** [Hecho]
- Subtítulo (parafraseado): hay presión por sacar valor de negocio a la IA, y conseguirlo es justo lo que hace Section [Hecho].
- En el HTML hay dos versiones del hero con el mismo titular. La segunda tiene un subtítulo más largo: las herramientas ya están en todas las mesas, el trabajo casi no ha cambiado, y Section se ocupa de la adopción y de demostrar el retorno. Esa versión añade un segundo botón [Hecho]. No sé cuál se muestra; puede ser un test A/B o una versión que se ha quedado oculta [Supuesto].
- Vídeo y animación:
  - El fondo del hero es un vídeo de texturas en mp4/webm (autoplay, bucle, sin sonido) [Hecho]. Es decorativo [Supuesto].
  - En la página usan animaciones Lottie (flechas animadas en el bloque de Section HQ) [Hecho].

**3. Estructura de la home (versión principal, de arriba abajo)** [Hecho]
1. Barra de evento (AI:ROI Conference / AI Leadership Summit).
2. Menú desplegable grande con Plataforma (HQ, Coach), seis servicios, casos, eventos, «Consumers», recursos y el aviso del informe 2026 AI Proficiency Report.
3. Hero con el botón «Book a meeting».
4. Franja de logos «Trusted by enterprise leaders».
5. Esquema de capas, de infraestructura a «transformación», con la idea de que el retorno aparece en la capa donde cambia el trabajo.
6. «We build your AI transformation layer, fast»: cinco bloques, cada uno con enlace:
   - alinear al comité;
   - activar a directivos y mandos;
   - coaching para cada empleado;
   - medir el retorno;
   - rediseñar el trabajo con un consultor integrado en el equipo.
7. «Why Section»: la consultoría no escala y el software no hace estrategia; Section hace las dos cosas.
8. Caso Horizon Media con antes y después, y dos citas más.
9. Cierre «Will your company scale AI — or stall again?» con «Book a meeting».

La segunda versión del HTML añade:
- pestañas de producto de HQ y de Coach;
- un bloque de apoyo estratégico (planificación, coaching de liderazgo, automatización de flujos);
- tres testimonios;
- promoción de la conferencia.

**4. Credibilidad**
- Logos [Hecho, nombres de fichero de las imágenes]: J&J, Mercer, Okta, Oura, Pernod Ricard, Publicis, Tapestry y Unilever (https://www.sectionai.com/).
- Cifras:
  - «90%» del gasto en IA ha ido a herramientas e infraestructura. Aparece en la home sin fuente citada (https://www.sectionai.com/) [Hecho].
  - «85% of employees certified as AI proficient» en el caso Horizon Media (home) [Hecho].
  - «23,000» empleados de Havas con Section Coach, en una cita (home y https://www.sectionai.com/section-coach) [Hecho].
  - Objetivo «80% daily active usage across the org» en el nivel de servicio más alto (https://www.sectionai.com/services) [Hecho].
- Testimonios con nombre y cargo [Hecho]:
  - Chief Product and Data Officer de Horizon Media;
  - CDTO de Havas;
  - Global Chief DTC Officer de AB InBev;
  - CIO de Agital;
  - Director of Martech and AI de Autodesk;
  - VP of Operations de Sidearm Sports;
  - Head of Marketing de Adobe Private Capital;
  - President de Sidearm Sports (dice que su equipo adoptó Claude Code más rápido tras la formación).
- Hay un error visible en https://www.sectionai.com/ai/2027-ai-planning: la cita de Autodesk lleva el logo de Horizon Media [Hecho].
- Autoridad:
  - Carta del CEO, Greg Shove, en el informe [Hecho].
  - Estudio propio a 5.026 profesionales de EE. UU. con niveles de proficiencia (Novice → Expert). Dato del informe: solo el 5,5 % llega a «proficient» (https://www.sectionai.com/ai/the-ai-proficiency-report) [Hecho].
  - Sellos de seguridad SOC 2 Type II, GDPR/CCPA e ISO 27001 en HQ (https://www.sectionai.com/section-hq) [Hecho].
  - No anuncian alianzas con OpenAI, Anthropic ni Microsoft. Solo aparece el logo de ChatGPT entre las integraciones de HQ [Hecho].
- Higiene: el FAQ de la página de transformación tiene textos «Lorem ipsum» en el HTML (https://www.sectionai.com/solutions/ai-transformation) [Hecho]. Si se ven en pantalla: sin datos.

**5. Herramientas interactivas**
- La página del informe tiene un CTA «Take our assessment here» (enlace de seguimiento de HubSpot). El destino real: sin datos [Hecho].
- Según el centro de ayuda de Section (visto en el resultado del buscador; la página directa da 403), su evaluación se llama ahora «AI Fitness Check»: 12 preguntas dentro de Section Coach, que se hacen al registrarse y sirven para fijar tu nivel (https://help.sectionai.com/hc/en-us/articles/53300250255643-AI-Fitness-Assessment). Es decir, va detrás del registro [Hecho con fuente secundaria].
- En la home no hay calculadora de ROI pública [Hecho].
- En la página de planificación 2027 hay un panel de ejemplo con cifras ilustrativas («Hours saved 23,400», «$12.7M»). No es una herramienta: es una maqueta (https://www.sectionai.com/ai/2027-ai-planning) [Hecho].
- Material de ejemplo sin formulario: el botón «See a sample transformation plan» enlaza directamente a un PDF en su servidor (https://www.sectionai.com/solutions/ai-transformation) [Hecho].
- El informe se descarga con formulario de HubSpot [Hecho].

**6. Vídeo**
- Vídeo decorativo de fondo en el hero de la home [Hecho].
- Vídeos de Vimeo con demo de producto en HQ («THAT'S YOU») y en Coach («See Coach in action») (https://www.sectionai.com/section-hq, https://www.sectionai.com/section-coach) [Hecho]. Contenido exacto: sin datos.

**7. CTA**
- Botones [Hecho]:
  - «Book a meeting» (hero y cierre) y «Book a demo» (menú). Son 10 enlaces a /book-a-demo solo en la home.
  - Variantes por página: «How it works», «Book a 2027 planning session», «Bring us the messy version», «Talk to advisory», «Request a benchmark».
- Formulario de HubSpot en /book-a-demo. Número de campos: sin datos (no se puede leer sin JS).
- Filtro de leads, documentado en comentarios de su propio código (https://www.sectionai.com/book-a-demo) [Hecho]:
  - Empresas de menos de 500 empleados: tras enviar el formulario ven un aviso que las manda a los cursos individuales.
  - Empresas de 500 o más: se abre el calendario de RevenueHero para reservar reunión directamente.
- En todas las páginas se carga el script de seguimiento de HubSpot (hs-scripts). Si hay chat visible: sin datos.

**8. Valoración** [Opinión] Lo que Spiralia puede copiar es la oferta de entrada tipo «diagnóstico y plan». Section la presenta con entregables concretos (auditoría de madurez, mapa de barreras, hoja de ruta a 12 meses, plan de 90 días) y deja un plan de ejemplo descargable sin formulario. Lo que hay que evitar es el descuido: dos heroes, Lorem ipsum en el HTML y logos cambiados. A un comprador de consultoría estratégica eso le resta credibilidad.

---

### C.2 Multiverse (multiverse.io)

**1. URLs analizadas**
- https://www.multiverse.io/ (/en-GB redirige a la raíz)
- https://www.multiverse.io/solutions/ai
- https://www.multiverse.io/impact-hub-2026
- https://www.multiverse.io/employers/how-it-works
- https://www.multiverse.io/book-a-demo · https://www.multiverse.io/employer-contact-form
- La URL /en-GB/ai da 404 [Hecho]. Su oferta de IA está en la home, que se titula «The AI Adoption Layer», y en /solutions/ai.

**2. Hero**
- Titular literal: **«Every team has AI. Few master it.»** [Hecho]
- Subtítulo (parafraseado): Multiverse se presenta como la «capa de adopción de IA», lo que falta entre las herramientas que ya has comprado y las personas que deben usarlas [Hecho].
- Vídeo: el hero tiene un vídeo de fondo en mp4 con botón «Pause background video» [Hecho].
- No hay botón dentro del hero; el único CTA visible arriba es «Contact Sales» en el menú [Hecho].
- La página /solutions/ai tiene su propio titular: «Unleash productivity with AI upskilling» [Hecho].

**3. Estructura de la home** [Hecho]
1. Selector Empresas/Personas y aviso del Impact Report 2026.
2. Menú con submenús. Incluye la cifra «40,000+ learners and £2bn+ in ROI» y un evento propio, Workforce 2030.
3. Hero con vídeo.
4. **Recorrido de producto interactivo** en seis pestañas (Skills scan, Programme matcher, Coaching, Atlas, Progress, Impact), con datos de una empresa ficticia de 12.000 empleados.
5. «You bought AI. The productivity never showed up.», con vídeo.
6. «What we do».
7. Carrusel de tres mensajes con vídeo.
8. Carrusel de resultados con tres cifras y logos.
9. Novedades (Impact Hub, informe de habilidades, conferencia).
10. Casos de clientes con nombre.
11. Bloque de creencias.
12. Cierre «AI adoption starts with a skills scan» con «Book a demo».

**4. Credibilidad**
- Logos [Hecho]: WGSN, Citi, KPMG, Capita, Just Eat, Microsoft y CBRE (https://www.multiverse.io/).
- Cifras en la home [Hecho] (https://www.multiverse.io/):
  - «91% of top-100 customers relaunch within a year»;
  - «£181,970 projected financial return per learner»;
  - «3 in 5 learners gain a promotion or pay rise».
- Cifras en el Impact Hub [Hecho] (https://www.multiverse.io/impact-hub-2026):
  - «40,000+» alumnos, «1,600+» empresas, «£2bn+» de ROI confirmado;
  - «£340m» de ingresos proyectados, «£557m» de costes ahorrados proyectados, 57 % con promoción, 77 % más productivos.
  - Una nota a pie admite que los datos los declaran los propios alumnos y que algunos proyectos aún están en fase de oportunidad.
- Incoherencia: /solutions/ai dice «1,500+ companies» y «94%» de retención, mientras el Impact Hub dice 1.600+ (https://www.multiverse.io/solutions/ai) [Hecho].
- Casos con nombre y resultado [Hecho]:
  - NHS Harrogate: caídas de pacientes reducidas un 88 % (Quality and Cancer Performance Manager).
  - QS: trabajo «10x faster» (Product Manager).
  - CBRE: Procurement Manager.
  - Todos en la home.
- Autoridad: el producto muestra conexión con Copilot y Claude (asistente «Atlas») [Hecho]. No anuncian alianzas formales con OpenAI ni Anthropic [Hecho]. Premios: sin datos.

**5. Herramientas interactivas**
- El recorrido de producto del hero se puede clicar, pero es una demo con datos de ejemplo. No pide nada y no devuelve un resultado personal [Hecho].
- El «skills scan» de diez minutos es un servicio que se entrega tras la demo comercial. El CTA lleva a /book-a-demo, cuya página se titula «Diagnose your workforce» [Hecho]. No hay diagnóstico público ni calculadora [Hecho].

**6. Vídeo**
- Vídeo de fondo en el hero.
- Vídeos ambientales en cinco bloques (adoption gap, what we do, unlock productivity, deliver outcomes, cierre). Todos son mp4 en su propio CDN [Hecho].
- Usan el reproductor de Wistia para el resto de vídeos [Hecho].
- Función: atmósfera de marca, no explicación [Supuesto].

**7. CTA**
- Botones: «Contact Sales» en el menú y «Book a demo» al cierre. Hay tres enlaces a /employer-contact-form, uno de ellos «Contact Us» en el pie [Hecho].
- Formulario de Salesforce Marketing Cloud dentro de un iframe, con **7 campos visibles, todos obligatorios** [Hecho] (leído del HTML del formulario):
  - email corporativo, nombre, apellidos, empresa;
  - tamaño de empresa (desplegable);
  - teléfono, con validación de formato británico;
  - puesto (desplegable).
  - El botón del formulario base dice «Submit This Form».
- Calendario de reserva directa: sin datos.
- Cargan el script de Qualified [Hecho], una herramienta de chat comercial y reserva de reuniones. Que el chat se vea: sin datos [Supuesto].

**8. Valoración** [Opinión]
- A copiar: el recorrido interactivo que enseña el método en pantallas (diagnóstico → programa → acompañamiento → impacto). Para Spiralia sería formación → despliegue FDE → medición, con datos de ejemplo marcados como ilustrativos.
- A evitar: cifras de «ROI proyectado por alumno» que declaran los propios alumnos, y cifras que no cuadran entre páginas. Un director de RR. HH. que las compare deja de fiarse.
- Paralelo útil: venden que su formación se paga con el apprenticeship levy británico. En España el equivalente sería FUNDAE (bonificaciones a la formación).

---

### C.3 Faculty (faculty.ai)

**1. URLs analizadas**
- https://faculty.ai/en-gb (home)
- https://faculty.ai/en-gb/ai-training-upskilling
- https://faculty.ai/en-gb/ai-services · https://faculty.ai/en-gb/contact-us
- https://faculty.ai/en-gb/ten-lessons-from-ten-years-of-applied-ai

**Contexto:** Faculty no es una empresa de formación nativa. Es una consultora de IA aplicada (servicios, software «Frontier» y un programa de talento, «Fellowship»), y la formación es una línea más dentro de sus servicios. Sus datos estructurados indican fundación en 2014 y **Accenture como empresa matriz** (https://faculty.ai/en-gb) [Hecho].

**2. Hero**
- Home: **«Frontier AI for the frontlines of the world.»**, sin subtítulo visible y sin botón en el hero [Hecho].
- Página de formación: **«AI training & upskilling»**, con una introducción sobre que crear capacidad en IA ya es obligatorio para competir, con programas para líderes, perfiles técnicos y quienes toman decisiones [Hecho].
- Animación: hay elementos `<canvas>` y parámetros de un patrón animado en el hero [Hecho]. Probablemente es un fondo animado generativo [Supuesto].
- La página de formación no tiene vídeo [Hecho].

**3. Estructura**
- Home [Hecho]:
  1. Menú (AI Services, Faculty Frontier™, Fellowship, Industries, Impact, Insights, Careers) y botón «Get started».
  2. Hero.
  3. «Perspectives from the frontline of AI», un carrusel de seis vídeos de clientes.
  4. Cita de Sam Altman.
  5. Artículos destacados y recientes.
  6. «Celebrating a decade of real world impact», con tres casos (NHS, NESO, Dstl).
  7. Contacto.
  8. Pie con 13 sectores.
- Página de formación [Hecho]:
  1. Hero.
  2. Desplegable con cuatro formatos por nivel de cargo: C-suite (media jornada), consejos de administración (media jornada), alta dirección (un día) y líderes técnicos (tres días).
  3. Talleres a medida por función (legal, cumplimiento, seguridad) con el botón «Speak to us today», que abre una ventana con formulario.
  4. Cuatro resultados: estrategia, tecnología, enfoque y gobierno.
  5. Formulario al pie.

**4. Credibilidad**
- Cita de **Sam Altman (CEO de OpenAI)** elogiando su trabajo en seguridad de IA y red teaming (https://faculty.ai/en-gb) [Hecho]. Es la prueba de autoridad más fuerte de toda la muestra.
- Tres casos públicos del sector público y la energía (home) [Hecho].
- Libro propio «Ten Lessons from Ten Years of Applied AI» [Hecho].
- En la página de formación no hay logos, cifras ni testimonios [Hecho].
- Cifras de alumnos o empresas formadas: sin datos (no las publican en las páginas revisadas).

**5. Herramientas interactivas:** ninguna [Hecho].

**6. Vídeo:** carrusel de seis vídeos de clientes alojados en Mux, en la home, con botón de reproducir [Hecho]. Quién habla en cada uno: sin datos.

**7. CTA**
- «Get started» (menú), «Get in touch» (home) y «Speak to us today» (formación) [Hecho].
- Formularios de HubSpot, leídos de su definición pública [Hecho]:
  - Formación: **6 campos, 5 obligatorios** (nombre, apellidos, email, puesto opcional, empresa, sector). Botón «Submit».
  - Contacto general: **9 campos**, entre ellos asunto, mensaje y «cómo nos conociste».
  - Libro: 6 campos con botón «Download eBook». Contenido detrás de formulario.
- Calendario o chat: no detectado [Hecho].

**8. Valoración** [Opinión]
- A copiar: el menú de formatos por nivel de cargo, con duración clara, y la autoridad de terceros mediante una cita de un referente del sector (solo si Spiralia tiene una real de Microsoft, Anthropic u OpenAI).
- A evitar: una página de formación sin una sola prueba. Delante de un CEO la formación queda como un servicio menor.

---

### C.4 Mindstone (mindstone.com) — extra

**1. URLs analizadas**
- https://mindstone.com/ (home)
- https://mindstone.com/enterprise-ai-academy · https://mindstone.com/pace · https://mindstone.com/ai-competency
- https://mindstone.com/ai-diagnostic-for-business-leaders · https://mindstone.com/ai-diagnostic-for-teams (/ai-company-assessment redirige aquí)

**2. Hero**
- Titular literal: **«Train your team on the AI tools they already have access to»** [Hecho].
- Subtítulo (parafraseado): sacar más rendimiento a las suscripciones de IA que la empresa ya paga, con sus herramientas actuales y sin añadir otras [Hecho].
- Hay una captura del panel del producto. No hay vídeo ni Lottie en el HTML de la home [Hecho].
- En todas las páginas hay un botón flotante, **«Talk to our AI»**, con la foto de un avatar [Hecho]. Su código carga un componente de conversación con avatar en vivo [Hecho].

**3. Estructura de la home** [Hecho]
1. Menú: Enterprise (PACE, Enterprise AI Academy, Agentic AI Academy, Rebel), Resources, Small Teams, Community, About.
2. Hero con dos botones.
3. «Trusted by 70K+ People across the world» y una franja de logos. Las imágenes no tienen texto alternativo, así que no se pueden identificar: sin datos.
4. Programas.
5. Plataforma y extensión de navegador («Try it for free»).
6. Carrusel de testimonios.
7. Cinco casos.
8. Comunidad.
9. «See Mindstone in Action», con formulario de demo.
10. Pie.

Las páginas de producto muestran **el precio** [Hecho]:
- «$399 /Employee» en Enterprise AI Academy (https://mindstone.com/enterprise-ai-academy);
- «$399 / person» en AI Competency (https://mindstone.com/ai-competency).

**4. Credibilidad**
- Testimonios de CEOs con nombre y cargo [Hecho]:
  - Chair, President & CEO de The Home Depot;
  - President & CEO de Hyatt;
  - Chief of Staff del CEO de Hyatt;
  - además, EY, Cambridge University, Nurole y Lufthansa Innovation Hub.
  - Aparecen en la home y en https://mindstone.com/pace.
- Casos con resultado en el titular (home) [Hecho]:
  - «40 Home Depot Executives Unblocked AI ROI in 2 Hours»;
  - Lufthansa Innovation Hub, adopción +52 % en cuatro semanas;
  - Ten Lifestyle Group, transformación cultural en cuatro semanas.
  - **Los cinco casos van detrás de un formulario de HubSpot.**
- Otras cifras [Hecho]:
  - «2x» en la creencia en el valor inmediato de la IA y «4x» en la oportunidad percibida a dos años, tras el programa para directivos (https://mindstone.com/pace);
  - «6,000+» profesionales en AI Competency (https://mindstone.com/ai-competency);
  - comunidad con «10K+» y «20K+» miembros en la misma home, una cifra que se contradice; «70+» eventos en «18» ciudades; «300+» charlas (https://mindstone.com/).
- Premio: «Time World's Top EdTech Company», 2024 y 2025 (https://mindstone.com/ai-competency) [Hecho].
- Erratas en testimonios y textos («Cummungs», «Assesment», «Entreprise») [Hecho].

**5. Herramientas interactivas: la más avanzada de la muestra**
- **Diagnóstico de IA para directivos (BETA)** (https://mindstone.com/ai-diagnostic-for-business-leaders) [Hecho]:
  - Hablas por voz con «Amy», un agente con avatar, o escribes si prefieres no usar micrófono.
  - La conversación explora hasta dónde ha llegado tu organización con la IA y la distancia entre la ambición y la práctica diaria.
  - Después, un formulario de HubSpot pide tus datos y Mindstone te envía la evaluación detallada. **Los datos se piden después de la conversación, pero antes de recibir el resultado completo.**
- **Diagnóstico para equipos (BETA)** (https://mindstone.com/ai-diagnostic-for-teams) [Hecho]:
  - «Sophie», con avatar incrustado de liveavatar.com, entrevista a cada empleado sobre su uso real de la IA y sus bloqueos.
  - La página ofrece un enlace para compartirla con el equipo.
- Ninguno de los dos aparece en el menú de la home. Los encontré en el código del sitio [Hecho].
- Si el resultado se ve en pantalla: sin datos (no las he probado).

**6. Vídeo:** el vídeo está en el avatar conversacional (diagnósticos y botón flotante), no en piezas grabadas [Hecho].

**7. CTA**
- Botones [Hecho]:
  - «TRAIN YOUR TEAM» y «START WITH YOUR EXEC TEAM» en el hero;
  - «SCHEDULE A CALL» en programas y precios;
  - «Try it for free» para la extensión;
  - «BECOME A MEMBER» para la comunidad;
  - «Talk to our AI», flotante.
- El bloque «Schedule a Call» dice que basta con dejar el email [Hecho]. Campos reales de los formularios de HubSpot (demo y llamada): sin datos (no se pueden leer).
- Calendario directo: no detectado.

**8. Valoración** [Opinión]
- A copiar: el formato para comités de dirección. Sin diapositivas, se resuelven en directo problemas reales de la empresa con varias herramientas, en dos o cuatro horas. Es casi el mismo discurso que el de Spiralia con sus clientes, y Mindstone lo vende con citas de CEOs con nombre.
- A copiar también: el diagnóstico conversacional como puerta de entrada.
- A evitar: casos detrás de formulario, erratas y cifras que se contradicen.

---

### C.5 Founderz (founderz.com) — extra

**1. URLs analizadas:** https://founderz.com/es/empresas/ (página B2B) y https://founderz.com/es/ (home).

**2. Hero**
- Titular literal, en formato SEO: **«Cursos de IA y formación en inteligencia artificial para empresas.»** Debajo, el claim **«La IA ya está en tu empresa. Haz que tu equipo sepa usarla.»** [Hecho]
- Subtítulo (parafraseado): programas certificados por Microsoft, adaptados a cada área y aplicables desde el primer día. Tres ventajas: online, bonificable con FUNDAE y para equipos de cualquier tamaño [Hecho].
- El **formulario está en el propio hero**, a la derecha [Hecho].
- El hero no tiene vídeo [Hecho].

**3. Estructura** [Hecho]
1. Hero con formulario.
2. Doce logos y tres cifras.
3. **«¿En qué situación está tu empresa…?»**, seis situaciones según quién visita:
   - gestionas formación o RR. HH.;
   - un manager quiere formar a su equipo;
   - ya tienes Copilot, ChatGPT o Claude;
   - el equipo parte de cero (AI Act, artículo 4);
   - el equipo es de un área funcional;
   - una persona lidera la adopción.
4. Programas: Copilot, Alfabetización, Liderazgo de IA Responsable, másteres por área y formación a medida en su plataforma Frontierz.
5. Bloque FUNDAE.
6. «Lo que las empresas nos preguntan antes de decidir».
7. Acompañamiento: propuesta en 48 h, panel en tiempo real y un responsable de cuenta asignado.
8. Pestañas con vídeo de la plataforma (incluido un tutor de IA disponible 24/7).
9. Certificación con Microsoft.
10. Testimonios en vídeo.
11. «¿Hablamos de tu equipo?».
12. Preguntas frecuentes por categorías.

**4. Credibilidad**
- Logos [Hecho]: Accenture, Air Europa, BBVA, Bayer, **Deloitte**, EY, HP, Inditex, NTT DATA, Repsol, Revolut y Siemens. Deloitte también es cliente de Spiralia.
- Cifras [Hecho] (https://founderz.com/es/empresas/):
  - «700.000» profesionales;
  - «1.700» empresas;
  - «4,8/5» de satisfacción, con enlace a Trustpilot.
- Testimonios en vídeo [Hecho]: Head of eCommerce de Nestlé Spain, CEO de Timing y un profesional de Grupo Ubesol.
- Autoridad: la certificación conjunta con Microsoft está en toda la página [Hecho]. Los fundadores no aparecen en la página B2B [Hecho].
- Incoherencias en la misma página [Hecho]:
  - la duración se da como «entre 10 y 100 horas» en un sitio y «desde 40 hasta 200 horas» en otro;
  - FUNDAE «total o parcialmente» frente a «100% bonificable».

**5. Herramientas interactivas:** no hay ninguna [Hecho]. El bloque de seis situaciones hace de autodiagnóstico estático que te lleva al programa adecuado [Opinión].

**6. Vídeo** [Hecho]
- Tres mp4 de la plataforma dentro de pestañas.
- Tres testimonios en Vimeo que se abren en ventana emergente.
- Función: enseñar el producto y dar voz al cliente.

**7. CTA**
- Botones [Hecho]: «Solicitar información», «Pedir una propuesta», «Solicitar una demo» y «Hablemos». Hay 9 enlaces al formulario en la página.
- La propuesta se promete «en 48 horas» [Hecho].
- Formulario de HubSpot. Campos: sin datos (no se pueden leer).
- Usan Cookiebot. Calendario o chat: no detectado [Hecho].

**8. Valoración** [Opinión]
- Es el competidor que verá el comprador español. Conviene copiar tres cosas:
  - el acceso por situación del comprador;
  - el bloque FUNDAE;
  - el compromiso «propuesta en 48 h».
- Spiralia tiene que diferenciarse justo en lo que Founderz no ofrece: formación en directo con despliegue real (FDE, equipos que construyen agentes y skills con el cliente) frente a un curso online a tu ritmo.

---

### C.6 Uplimit (uplimit.com) — extra

**1. URLs analizadas:** https://uplimit.com/ y https://uplimit.com/contact.

**2. Hero**
- Titular literal: **«Make every employee feel like your only learner»** [Hecho].
- Subtítulo (parafraseado): defines objetivos por la mañana, lanzas el programa por la tarde y el viernes sabes si funciona [Hecho].
- Debajo hay una maqueta del producto: se sube un PDF y se pide «crear una formación».
- Vídeo: botón «Watch introduction» y vídeo de cliente de Procore [Hecho].

**3. Estructura** [Hecho]
1. Hero.
2. Logos.
3. Presentación del «AI Skills Instructor».
4. **«See it in action»**: tres demos con «Try now» (eficacia de equipos, un método para dar feedback e «Intro to Claude Cowork»).
5. Tres pasos, con una maqueta de informe de dominio por objetivo.
6. Vídeo y testimonios.
7. Tabla «la forma antigua frente a Uplimit» (diseño de contenido, personalización, práctica, feedback, medición, tiempo de lanzamiento).
8. Casos de uso.
9. Dónde se usa.
10. Cierre con «Get a Demo».

**4. Credibilidad** [Hecho]
- Logos: Databricks, Clay, Gusto, Procore, GE HealthCare y Kraft Heinz.
- Testimonios de VP of Training & Certification, Director of Learning Technology & AI y Director of Capability Development: cargos de L&D.
- Cifras: solo en maquetas. Ninguna cifra de negocio.

**5. Herramientas interactivas**
- «Try now» lanza una sesión con el instructor de IA. El código usa LiveKit, una tecnología de voz y vídeo en tiempo real [Hecho].
- Si pide email antes: sin datos.

**6. Vídeo:** vídeo de presentación y un caso de cliente en mp4 [Hecho].

**7. CTA**
- Botones: «Try now» y «Get a Demo» en el menú y el hero; el cierre solo tiene «Get a Demo» [Hecho].
- Formulario de demo [Hecho]:
  - **4 campos obligatorios** (email de trabajo, nombre, apellidos, empresa), un desplegable opcional («How did you hear about us?») y un texto de consentimiento;
  - botón **«Book my demo»**;
  - promete una sesión de 30 minutos adaptada a tu equipo.
- Calendario o chat: no detectado.

**8. Valoración** [Opinión]
- A copiar: dejar probar el producto sin hablar con ventas, y la tabla «antes / con nosotros» escrita en el idioma de L&D (dominio de la habilidad frente a tasa de finalización).
- Spiralia podría hacer lo mismo con un agente o skill de ejemplo que haya construido.

---

### Patrones comunes en empresas de formación IA nativas

- **La misma historia en el hero: ya compraste la IA, ahora falta que la gente la use.** Lo dicen casi con las mismas palabras:
  - Section: «You bought AI…»;
  - Multiverse: «Every team has AI…» y «You bought AI. The productivity never showed up.»;
  - Mindstone: la formación en las herramientas que ya tienes;
  - Founderz: «La IA ya está en tu empresa…» [Hecho].
  - Es el mensaje de Spiralia («el valor está en el despliegue»), pero ya está muy usado [Opinión].
- **Personas más plataforma, con la medición como promesa principal.** Todos combinan servicio humano con un panel de seguimiento: Section HQ, el bloque Impact de Multiverse, la plataforma y Sandbox de Mindstone, el panel de Founderz, el informe de dominio de Uplimit [Hecho]. El «demuestra el retorno» se dirige al CFO o a la dirección.
- **Entrada por diagnóstico, pero casi nunca de autoservicio.**
  - Section vende un sprint de diagnóstico y un «benchmark».
  - Multiverse vende el «skills scan» tras la demo.
  - Section y Founderz no tienen evaluación pública.
  - Solo Mindstone tiene un diagnóstico público, conversacional, y pide los datos después de la conversación [Hecho].
- **Credibilidad por volumen y nombres.** Franjas de logos de grandes marcas, cifras totales grandes (40.000+, 700.000, 70K+) que declara la propia empresa y testimonios con cargo de dirección [Hecho]. Las cifras a menudo no coinciden entre páginas: Multiverse 1.500+ frente a 1.600+, Mindstone 10K+ frente a 20K+, Founderz en horas y en FUNDAE [Hecho].
- **Segmentación por público.** Hay una oferta específica para comités de dirección y consejos (PACE de Mindstone, talleres de C-suite y consejos de Faculty, coaching de liderazgo y Head of AI Bootcamp de Section) y otra por área o situación (Founderz) [Hecho].
- **Un CTA comercial dominante y repetido.** «Book a meeting», «Book a demo» o «Contact sales», hasta 10 veces en la home de Section [Hecho]. Formularios de 4 a 9 campos [Hecho]. Solo Section filtra por tamaño de empresa y abre calendario directo (RevenueHero) a los cualificados [Hecho].
- **Vídeo de dos tipos.** Ambiental o decorativo en el hero (Section, Multiverse) y testimonios o demo de producto más abajo (Faculty, Founderz, Uplimit, Section HQ/Coach) [Hecho]. No he visto vídeos de un fundador explicando el método [Hecho, en las páginas revisadas].
- **Contenido propio como gancho, detrás de formulario.** AI Proficiency Report (Section), Impact e informes de habilidades (Multiverse), el libro de Faculty y los casos de Mindstone [Hecho].

### Ideas que Spiralia podría adaptar [Opinión]

- **Apropiarse del mensaje «la formación sola no basta» con una prueba que nadie más tiene: lo construido.** Una galería de agentes y skills desplegados por los FDE en clientes reales (ING, Deloitte, CCEP, GPTW), con el problema, lo que se construyó y para quién. Así el FDE deja de ser una sigla y se vuelve evidencia. Hay que confirmar antes qué se puede enseñar de cada cliente.
- **Un diagnóstico público corto que enseñe el resultado antes de pedir el email.** Nivel de madurez y siguientes pasos en pantalla; el email solo para recibir el informe en PDF o hablar con alguien. Spiralia superaría a Section y Multiverse, que no lo ofrecen, y a Mindstone, que pide los datos antes del resultado completo. Para empezar bastaría un cuestionario sencillo; el avatar de voz puede venir después.
- **Entrada por perfil, sin mezclar públicos.** Al estilo del bloque de situaciones de Founderz, pero con caminos separados para CEO o comité de dirección (formato tipo PACE: sesión práctica sobre problemas reales), dirección de RR. HH. o Personas, y L&D (seguimiento, FUNDAE, logística).
- **Un entregable de ejemplo descargable sin formulario**, como el plan de ejemplo de Section. Por ejemplo, un plan de despliegue o una guía de sesión anonimizada, para que el comprador vea la calidad antes de llamar.
- **Un recorrido interactivo del método** en pestañas, al estilo de Multiverse: formación → despliegue con FDE → medición de uso e impacto. Con datos de ejemplo marcados como ilustrativos y sin cifras de ROI proyectado sin método.
- **Rigor visible como diferencial.** Cifras coherentes en todas las páginas (por ejemplo «más de 50.000 profesionales formados», siempre con el mismo número), sin erratas y con un solo CTA claro. Formulario corto (4 o 5 campos, como Uplimit) y calendario directo para empresas medianas y grandes. Si la formación de Spiralia es bonificable por FUNDAE, decirlo; si no, sin datos y no mencionarlo.


---

## D. Despliegue de IA (modelo FDE) y páginas enterprise de laboratorios

**Alcance y método.** Revisión del 14-oct-2026 de las webs de Palantir, Distyl, OpenAI, Anthropic (Claude), Microsoft (hub de adopción de Copilot) y, como extra, Sierra. Solo lectura: HTML bruto descargado con curl (contenido, vídeos, formularios), APIs públicas de ofertas de empleo para medir el peso del rol FDE, y capturas de Wayback Machine para OpenAI (su web devuelve 403 a lectores automáticos). No se ha enviado ningún formulario, ni abierto chats, ni descargado ficheros. Glosario mínimo: **FDE** (*Forward Deployed Engineer*) = ingeniero que trabaja dentro del equipo del cliente construyendo la solución sobre sus datos y procesos; **CTA** (*call to action*) = botón o llamada a la acción principal.

Leyenda: **[Hecho]** observado en la web o en la fuente citada · **[Supuesto]** inferencia razonable no verificada · **[Opinión]** valoración propia.

**Vista rápida**

| Empresa | Titular del hero | CTA principal | Cómo llaman al acompañamiento | Formato «empaquetado» |
|---|---|---|---|---|
| Palantir | «Get AI Into Operations» | «Schedule an AIP Bootcamp» | Forward Deployed Engineers; roles Echo / Delta / Dev | Bootcamp de 5 días |
| Distyl | «Architecting the AI-Native Enterprise» | «Contact us» (mailto) | Equipos *forward-deployed* de ingenieros e investigadores | Sin datos (no lo empaquetan en la web) |
| OpenAI | «Frontier AI for the most ambitious enterprises» | «Contact sales» | OpenAI Deployment Company (FDE), AI advisors, Academy | Diagnóstico → pocos flujos prioritarios → construcción dentro |
| Anthropic | «The frontier, on every desk» | «Get Enterprise plan» | En la página enterprise, solo «onboarding» y «deployment support»; FDE aparece en Frontier Academy | Residencia FDE: 4 días + 12 semanas + credencial |
| Microsoft | «Accelerate your Microsoft Copilot adoption» | Sin CTA comercial (autoservicio) | Champions, AI council, comunidad | Prompt-a-thon y Agent Hackathon (kits) |
| Sierra (extra) | «Better outcomes. Built on Sierra.» | «Learn more» | Agent Engineering + Strategist, Agent Development | Sin datos |

---

### D.1 Palantir — AIP, AIP Bootcamp y rol Forward Deployed

**1. URLs analizadas**
- Home: https://www.palantir.com/
- AIP: https://www.palantir.com/platforms/aip/
- AIP Bootcamp: https://www.palantir.com/platforms/aip/bootcamp/
- Contacto: https://www.palantir.com/contact/get-started/
- Careers: https://www.palantir.com/careers/
- Oferta tipo FDE: https://jobs.lever.co/palantir/5168e8fd-fec1-4fea-b7a1-81bdaea65850 (y API pública https://api.lever.co/v0/postings/palantir?mode=json)

**2. Claim del hero**
- Home: «Get AI Into Operations» con botón a AIP Now; justo debajo, el lema de marca «Foundational Software of Tomorrow. Delivered Today.™». [Hecho]
- AIP: «Activate full spectrum AI in days, and drive enterprise operations.» [Hecho]
- Bootcamp: titular «Palantir AIP Bootcamp» y subtítulo-promesa «From 0 to use case in 5 days.» [Hecho]
- Vídeo en el hero: no. La home usa una imagen PNG (AIP Now), AIP una imagen («AIP Grid») y el bootcamp una foto de Alex Karp en el bootcamp de Chicago. [Hecho, datos del componente hero en el JSON de Next.js]

**3. Estructura (home, de arriba abajo)** [Hecho]
1. Hero «Get AI Into Operations» + «Explore AIP Now».
2. Lema + lista de plataformas (AIP, Foundry, Gotham, Apollo), cada una con su frase y «Explore…».
3. «Category-Defining Technology»: rankings de analistas.
4. Bloque «AIP Bootcamps» con vídeo y botón «Schedule an AIP Bootcamp».
5. «Day 1 Value» / «Days, not years.»
6. «What Makes Palantir Platforms Powerful» en cuatro bloques A-D (decisión con IA, interoperabilidad, seguridad, oferta).
7. Cifra de cobertura sectorial.
8. «Request a Demo» con botón «Get Started».

Página Bootcamp: hero → qué consigue el cliente en cinco días (tres objetivos numerados: entender cómo aplicar IA a operaciones críticas, desarrollar los primeros casos en el software, formar a usuarios para el despliegue) → «Why AIP Bootcamps Work» (6 vídeos) → carrusel de fotos de bootcamps (Chicago, Japón) → formulario «Schedule an AIP Bootcamp» → enlace a AIP. [Hecho]

**4. Credibilidad**
- Rankings de analistas en home y AIP: Dresner Advisory 2024 (n.º 1 en IA/ciencia de datos/ML y en ModelOps), IDC (n.º 1 en cuota y facturación de software de IA, con cita de una VP de IDC) y Forrester Wave AI/ML Platforms 2024 (líder). Fuente: https://www.palantir.com/ y https://www.palantir.com/platforms/aip/ [Hecho]
- Cifra: «Now in over 50 sectors and industries worldwide.» (home, https://www.palantir.com/) [Hecho]
- Seguridad: menciona certificaciones o atestaciones FedRAMP e IL5 (estándares de la administración y defensa de EE. UU.) y enlaza un Trust Center (palantir.safebase.us). [Hecho]
- Casos: no hay franja de logos ni casos con resultado en la home; los «Impact Studies» con nombre (Airbus, Swiss Re, NHS, Cleveland Clinic, Tampa General Hospital, World Food Programme…) viven en el menú. [Hecho]
- Testimonios: solo de analistas (IDC, Forrester), no de clientes. [Hecho]

**5. Herramientas interactivas**
- «AIP Now» (https://aip.palantir.com/): galería de flujos, aplicaciones y productos «listos para desplegar», según su meta-descripción; el contenido se carga por JS, así que su detalle queda sin datos. [Hecho / sin datos]
- Calculadoras, diagnósticos o demos interactivas: no encontradas. [Hecho]

**6. Vídeo**
- Bootcamp: 6 vídeos en Vimeo bajo «Why AIP Bootcamps Work», cada uno con un mensaje («Solving Real Business Problems Immediately», «Moving from Chat to Automation», «Making AI Your Own», «Lowering the Floor, Raising the Ceiling», etc.). Sirven como prueba social: muestran clientes trabajando con las manos en el teclado. [Hecho]
- AIP: vídeos de producto (MP4 de AIP Logic y AIP Automate) y tutoriales en Vimeo y YouTube. [Hecho]
- Careers: vídeo MP4 de tipografía en movimiento en el hero. [Hecho]

**7. CTA**
- «Schedule an AIP Bootcamp» es el CTA característico: aparece en la home, en el hero de AIP, en el hero del bootcamp y como formulario al final del bootcamp. [Hecho]
- Otros: «Explore AIP Now» (hero home), «Get Started» bajo el título «Request a Demo» (que lleva a /contact/get-started/), «Start Building Now» (desarrolladores). [Hecho]
- Formularios Marketo (IDs 2040 bootcamp, 1222 contacto, 1937 AIP) cargados por JS: número de campos sin datos. Sin calendario ni chat. [Hecho / sin datos]

**8. Cómo explican el modelo de despliegue**
- En la web comercial, el bootcamp **es** el modelo de despliegue convertido en producto: duración fija (5 días), promesa de pasar de cero a caso de uso, y formación de usuarios incluida. [Hecho]
- La explicación explícita del FDE está en Careers y en las ofertas, no en las páginas de producto. Careers presenta tres roles que se solapan: **Echos** (facilitadores: identifican el problema real, lo descomponen en flujos de trabajo y alinean a todos, «del CIO a la enfermera»), **Deltas** (construyen y se aseguran de que funcione en la práctica) y **Devs** (convierten lo encontrado en producto). https://www.palantir.com/careers/ [Hecho]
- La oferta de FDE presenta el rol como la ética operativa de la empresa: se «incrustan» en la realidad del cliente hasta hacer suyo el problema, en equipos pequeños que lo llevan de principio a fin, desde la primera conversación hasta la puesta en producción, con interlocución desde el usuario hasta el comité de dirección. https://jobs.lever.co/palantir/5168e8fd-fec1-4fea-b7a1-81bdaea65850 [Hecho, parafraseado]
- Peso del rol: 79 de 312 ofertas abiertas llevan «Forward Deployed» en el título (55 de ellas son Forward Deployed Software Engineer) y otras 34 son Deployment Strategist; hay vacantes de ambos roles en Madrid. Fuente: https://api.lever.co/v0/postings/palantir?mode=json, consultada el 14-oct-2026. [Hecho]

**9. Valoración** [Opinión] Palantir no «explica» el FDE a quien compra: lo vende como un formato con nombre, duración y resultado (el bootcamp). Es el patrón más copiable para Spiralia; la explicación del rol queda para captar talento.

---

### D.2 Distyl AI

**1. URLs analizadas**
- Home: https://www.distyl.ai/
- Casos: https://www.distyl.ai/case-studies y un caso: https://www.distyl.ai/case-studies/f100-telecom-operator
- About: https://www.distyl.ai/about
- Careers: https://www.distyl.ai/careers (y API pública https://api.ashbyhq.com/posting-api/job-board/Distyl)

**2. Claim del hero**
- «Architecting the AI-Native Enterprise». [Hecho]
- Subtítulo (parafraseado): acompañan a grandes empresas a diseñar y poner en marcha su transformación con IA, desplegando equipos de ingenieros e investigadores que se hacen responsables del resultado, más productos propios adaptados al negocio. [Hecho]
- Vídeo: no hay `<video>` ni incrustaciones. El hero contiene un `<canvas>` entre el titular y el subtítulo [Hecho], probablemente una animación generativa [Supuesto].

**3. Estructura (home)** [Hecho]
1. Hero + «Contact us».
2. Frase-manifiesto: toda empresa de la economía real acabará siendo una empresa de IA.
3. «AI outcomes, proven in production»: tres pruebas (usuarios alcanzados, Fortune 500, resultados en semanas).
4. «Recent Media» (Foro Económico Mundial de Davos, The Information).
5. «Thinking from the frontier» (blog).
6. Newsletter «Signals from the frontier».
7. Footer con emails y sello SOC.

**4. Credibilidad**
- Cifras en la home: «150M+ end users reached by our AI systems»; promesa de resultados medibles en semanas e impacto en la cuenta de resultados en meses. https://www.distyl.ai/ [Hecho]
- Casos **anonimizados por tamaño y sector**, siempre con dos cifras (https://www.distyl.ai/case-studies) [Hecho]:
  - F100 Telecom Operator: $200M+ de ahorro de opex proyectado y 75%+ de interacciones resueltas por IA; en la ficha, además, 100M+ conversaciones al año y 140M de clientes, desplegado «en semanas».
  - F20 Healthcare Payor (tres casos): $200M+ de ahorro estimado y 200k+ casos al mes; $16M de ahorro anual y 600k+ contratos consultables; ~$50M de ahorro anual y ciclo de actualización de políticas de menos de 3 meses (antes 12).
  - Auto Finance Lender: 1 semana del arranque a la detección de fraude con agentes y 93% de reducción de coste en la originación de préstamos.
  - F50 Hardware Manufacturer: 80% de reducción objetivo en el análisis de causa raíz y 1.500+ incidencias de cadena de suministro analizadas al día.
  - F50 CPG Brand: 47% de mejora en resolución de pedidos incompletos y 100+ usuarios no técnicos capacitados.
- Plantilla de cada caso: reto → solución → capacidades → impacto. [Hecho]
- About: «EBITDA impact in 6 months», «Board Directors of 20+ F500s», logos de inversores (Coatue, Lightspeed, Khosla, DST…), de partners (OpenAI, Microsoft, Anthropic, Google) y de la procedencia del talento (Palantir, CIA, Google DeepMind, NASA…). https://www.distyl.ai/about [Hecho]
- Prensa: muestra en su home un titular de The Information sobre una ronda a $1.8B de valoración (dato de un tercero, no verificado aquí). [Hecho]
- Seguridad: sello AICPA SOC en el footer. [Hecho]
- Testimonios de clientes: ninguno. [Hecho]

**5. Herramientas interactivas**: ninguna (ni calculadora, ni diagnóstico, ni demo). [Hecho]

**6. Vídeo**: no se usa. [Hecho]

**7. CTA**
- «Contact us» abre un `mailto:` (inquire@distyl.ai); no hay formulario de contacto. [Hecho]
- Único formulario: newsletter con 1 campo (email) y botón «Subscribe». Sin calendario ni chat. [Hecho]

**8. Cómo explican el modelo de despliegue**
- Lo llevan al titular de la home: el *forward deployment* es la propuesta de valor, no un anexo. [Hecho]
- En About: expertos que se sientan codo con codo con la gente del cliente y rediseñan sus sistemas críticos; se definen como «empresa de tecnología aplicada» que se responsabiliza del resultado; lo resumen en una frase: «Not a handoff» (no entregan y se van). Ciclo en cuatro fases: Discovery → Context Management → Deployment → Continuous Improvement. [Hecho, parafraseado]
- En Careers: «The next evolution of forward deployment». Sostienen que el FDE clásico dependía de traducir a mano el conocimiento del cliente a software, y que con IA esa traducción se automatiza. [Hecho, parafraseado]
- Roles abiertos: AI Engineer y AI Strategist como pareja, más investigadores aplicados (25 ofertas; fuente: API Ashby citada, 14-oct-2026). [Hecho]

**9. Valoración** [Opinión] Es la web más sobria y la que mejor demuestra con números. La anonimización «F100 Telecom» resuelve la confidencialidad sin perder fuerza; Spiralia puede usarla («banco del IBEX», «aseguradora top-5»). Su punto débil para un público de RR. HH.: no hay personas, ni proceso visible, ni primer paso concreto.

---

### D.3 OpenAI — Business, ChatGPT Enterprise, OpenAI Deployment Company y Academy

**1. URLs analizadas.** El acceso directo devuelve 403 (Cloudflare), así que se usaron capturas de Wayback Machine (fecha entre paréntesis):
- https://openai.com/business/ (12-oct-2026)
- https://openai.com/business/why-openai/enterprises/ (8-oct-2026)
- https://chatgpt.com/business/enterprise (21-sep-2026)
- https://openai.com/business/the-openai-deployment-company/ (13-may-2026, última captura válida)
- https://openai.com/index/openai-launches-the-deployment-company/ (captura 30-sep-2026; anuncio fechado el 11-may-2026)
- https://openai.com/contact-sales/ (12-oct-2026)
- https://openai.com/academy/ (12-oct-2026)
- openai.com/enterprise redirige (códigos 307/308 en el índice de Wayback); el destino actual queda sin datos.

**2. Claim del hero** [Hecho]
- Business: «Frontier intelligence everywhere you work».
- Enterprises: «Frontier AI for the most ambitious enterprises». Subtítulo: OpenAI aporta la inteligencia **y la experiencia de despliegue** para resolver problemas antes inabordables.
- ChatGPT Enterprise: «Frontier AI built for enterprise». Subtítulo: ChatGPT con sus modelos y agentes (ChatGPT Work, Codex) para que cada equipo convierta objetivos en trabajo terminado.
- Deployment Company: «Forward deployed engineers bringing AI to enterprises».
- Vídeo en el hero: no. Business abre con un carrusel de historias de cliente con foto; Enterprise con un collage de capturas estáticas. [Hecho]

**3. Estructura**
- Enterprises, de arriba abajo [Hecho]:
  1. Hero + «Contact sales».
  2. «Built for business. Backed by frontier AI.» en tres pilares: «Frontier intelligence», «Guidance from rollout to scale» (trabajar con OpenAI para planificar el despliegue y la adopción), «Built to deliver ROI».
  3. «AI for every team» (plugins).
  4. «Who we're working with»: cifra de clientes, cita y cinco métricas.
  5. «Read their stories» (5 casos).
  6. «Deployment: Make AI part of everyday work» con enlace «More about deployment».
  7. «Insights for enterprise leaders».
  8. «Trusted across industries» (sectores).
  9. «Start building with OpenAI» + «Contact sales».
- ChatGPT Enterprise [Hecho]: hero → logos + cifra de usuarios → «Work with the best of our models and AI agents» → «Trusted by leaders and their teams» (cita + 5 métricas) → «Enterprise-grade security built in» → «How every team gets more done…» (por función, con vídeo) → «Partner with us on your AI strategy» → CTA final.

**4. Credibilidad**
- Cifras de escala (cambian de unidad según la página) [Hecho]:
  - «Over 5 million business users across industries» (https://chatgpt.com/business/enterprise)
  - «More than 2 million business customers» (https://openai.com/business/why-openai/enterprises/)
  - «more than one million businesses» han adoptado sus productos (https://openai.com/index/openai-launches-the-deployment-company/)
- Logos (ChatGPT Enterprise): Target, Amgen, PwC, Block, Gates Foundation, Lowe's, JetBlue, NOV, Mercado Libre, Estée Lauder, T-Mobile, BCG, Pennsylvania, Bain, **BBVA**, SoftBank, Syneos Health, Genmab, Virgin Atlantic, Greystar. [Hecho]
- Métricas por cliente en ChatGPT Enterprise. Se atribuyen por el orden logo → cifra de las tarjetas en el HTML [Supuesto en la atribución; cifras = Hecho]: Moderna, 100% de usuarios activos, con cita de Brice Challamel (Head of AI Products & Platforms); Estée Lauder, 10x más rapidez en *insights* de producto de I+D; San Antonio Spurs, 6x de aumento de fluidez en IA; **BBVA, 83% de usuarios activos semanales**; Upwork, 98% de empleados que lo prefieren frente a otras herramientas. https://chatgpt.com/business/enterprise
- Enterprises: cita de John Brownstein (Chief Innovation Officer, Boston Children's) y cinco métricas que, por orden, corresponden a los cinco casos [Supuesto en la atribución]: 40+ enfermedades raras diagnosticadas (Boston Children's), 120.000 empleados usando ChatGPT Enterprise (BBVA), 1.500+ horas de ingeniería ahorradas al mes (Cisco), 20.000 empleados construyendo agentes (BNY) y 50% menos de tiempo medio de recuperación (Rakuten). https://openai.com/business/why-openai/enterprises/
- Casos de la Deployment Company: BBVA escalando a 120.000 empleados en 25 países; John Deere ayudando a agricultores a reducir hasta un 70% el uso de químicos. https://openai.com/business/the-openai-deployment-company/ [Hecho]
- Seguridad: explican que no entrenan con datos del cliente y describen los controles de administración y cumplimiento, pero en estas páginas no nombran ninguna certificación (SOC 2, ISO). [Hecho]

**5. Herramientas interactivas**: pestañas de plataforma (ChatGPT Work / Codex / API) y acordeones por función. Sin calculadoras ni diagnósticos. [Hecho]

**6. Vídeo**
- Vídeos cortos de Vimeo, uno por función (finanzas, datos, ventas, marketing, operaciones, ingeniería, diseño, seguridad), que enseñan el producto haciendo trabajo real de esa área. En el CMS figuran como «sizzle video». [Hecho]
- No hay vídeo de marca ni de testimonio en estas páginas. [Hecho]

**7. CTA**
- «Contact sales» arriba y abajo en todas las páginas enterprise; en Business, además, «Get started» (su destino queda sin datos). [Hecho]
- Formulario de ventas en 2 pasos («1/2»): el paso 1 pide solo «Work email» y un botón «Continue»; el paso 2 se carga después y queda sin datos. Lleva verificación anti-bot (Cloudflare Turnstile). Sin calendario ni chat. https://openai.com/contact-sales/ [Hecho]

**8. Cómo explican el modelo de despliegue** (el más desarrollado de los laboratorios)
- **Tres niveles de acompañamiento** en ChatGPT Enterprise, bajo «Partner with us on your AI strategy» [Hecho, parafraseado]:
  1. «Deployment guidance»: playbook de buenas prácticas, analítica del espacio de trabajo, cursos por rol y sesiones con expertos; los clientes elegibles reciben apoyo práctico en implantación, formación y gestión del cambio.
  2. «AI advisors»: ingenieros y expertos de dominio para clientes que despliegan en toda la organización.
  3. «Ongoing support»: soporte 24/7 con SLA.
- **OpenAI Deployment Company** (anuncio del 11-may-2026) [Hecho]:
  - Definen FDE como su forma de llevar la IA a producción en casos complejos: sistemas a medida construidos dentro de la complejidad real del cliente (permisos, cumplimiento, sistemas heredados), cerca de los expertos de dominio, entregando valor pronto e iterando.
  - Lo cierran con un ciclo «build, prove, generalize»: lo que funciona en un cliente acaba convirtiéndose en producto.
  - El anuncio describe el encargo tipo: diagnóstico de dónde crea más valor la IA → pocos flujos prioritarios elegidos con la dirección → los FDE diseñan, construyen, prueban y despliegan dentro de la organización, conectando los modelos a los datos, herramientas y procesos.
  - Músculo: compra de Tomoro, con unos 150 FDE y especialistas de despliegue; 19 firmas socias (TPG lidera, con BBVA entre las fundadoras, y Bain & Company, Capgemini y McKinsey como inversores); más de $4.000M de inversión inicial. https://openai.com/index/openai-launches-the-deployment-company/
- **OpenAI Academy** [Hecho]:
  - Tres cursos con certificado de finalización: «AI foundations», «Applied AI foundations» (de prompts sueltos a flujos repetibles), «Agents & workflows».
  - Además: guías, sesiones en directo y comunidad o programas de *champions* (empleados referentes que impulsan la adopción). https://openai.com/academy/

**9. Valoración** [Opinión] OpenAI es quien mejor separa la escalera de acompañamiento (guía → asesores → FDE → soporte) y la secuencia del encargo (diagnóstico → pocos flujos → construcción dentro). Es la estructura más cercana a la que necesita contar Spiralia. Ojo: BBVA, referencia española, ya está asociado públicamente a OpenAI como cliente y socio fundador.

---

### D.4 Anthropic — Claude Enterprise, contacto con ventas y Claude Frontier Academy

**1. URLs analizadas**
- https://claude.com/solutions/enterprise (tanto anthropic.com/enterprise como claude.com/enterprise redirigen aquí) [Hecho]
- https://claude.com/contact-sales
- https://claude.com/programs/frontier-academy y anuncio https://www.anthropic.com/news/claude-frontier-academy (2-oct-2026)
- https://claude.com/partners
- API pública de empleo: https://boards-api.greenhouse.io/v1/boards/anthropic/jobs

**2. Claim del hero** [Hecho]
- Titular visible: «The frontier, on every desk». El H1 técnico es solo el antetítulo «Claude enterprise solutions».
- Subtítulo: poner Claude a trabajar en toda la organización para pensar mejor, hacer más y construir de forma segura.
- Vídeo en el hero: no. Solo texto con animación de aparición escalonada (clase AnimatedReveal).

**3. Estructura** [Hecho]
1. Hero + dos CTA.
2. «Trusted by the world's leading organizations»: carrusel de 6 historias con fondo de vídeo y etiquetas de sector, tamaño, producto y región, más franja de logos.
3. «Built for enterprise» (4 pilares + lista de controles de seguridad).
4. «Bring Claude to your enterprise two ways» (Enterprise para empleados o Platform para construir producto).
5. Productos por pestañas (Code, Cowork, Chat, Security).
6. «Tailor Claude to your business» (conectores).
7. «Real work, across every function» (pestañas por área, **incluida Human Resources**).
8. Precio del plan Enterprise.
9. «Build on the Claude Platform».
10. Historias (Canva, GitLab).
11. Modernización de código.
12. «Build on your own» frente a «Get extra support».
13. FAQ en 3 pestañas.
14. «Enterprise resources».
15. CTA final «Ready to bring Claude to your organization?».

**4. Credibilidad**
- Carrusel (empresa → cifra; atribución por la etiqueta «n of 6» que precede a cada historia) [Hecho]:
  - Notion: 97% menos tiempo de prototipado y 30+ tareas de agentes en paralelo.
  - Novo Nordisk: documentación de estudios clínicos de 10 semanas a 10 minutos («1000x»).
  - Slack: 97 minutos a la semana ahorrados por usuario medio.
  - Allianz: 90% de crecimiento semanal en el despliegue.
  - Lyft: 87% menos tiempo de atención al cliente.
  - Moody's: preparación de informes de crédito de 40 horas a 2 minutos («1200%»).
  - Las citas no muestran nombre ni cargo de quien habla en el HTML.
  - Fuente: https://claude.com/solutions/enterprise
- Spotify: 90% menos tiempo en migraciones de código complejas (misma URL). [Hecho]
- Logos: Uber, Bridgewater, GitHub, Citi, AIG, Spotify, Rakuten, Visa, Banner Health, Stripe, Thomson Reuters. [Hecho]
- Seguridad, con lista explícita: SOC 2, ISO 27001, GDPR, CCPA, oferta preparada para HIPAA, SSO, SCIM, logs de auditoría, Compliance API y control de retención de datos. Enlaza al Trust Center. [Hecho]
- Precio público: $20 por usuario al mes (facturación anual) más el consumo a tarifa de API, con un mínimo de 20 usuarios. https://claude.com/solutions/enterprise [Hecho]

**5. Herramientas interactivas** [Hecho]
- Pestañas por función con un ejemplo de *prompt* y la respuesta de Claude (demo estática). La de RR. HH. lista tareas como resumir feedback de candidatos, plantillas de evaluación del desempeño y diseño de programas de L&D.
- Barra de *prompt* en el footer («How can I help you today?») que lleva a usar Claude.
- «Chat with buying agent / buying specialist»: un agente de IA que responde dudas, da presupuesto y escala a ventas (no se ha abierto).
- Recursos descargables **sin formulario** (enlaces directos a PDF): guía de administración, «Deploying Claude across your organization», «The Enterprise AI transformation guide», «Zero trust AI agents», «The 2026 state of AI agents report». No se han descargado.

**6. Vídeo**: 5 vídeos WebM de fondo en el carrusel de historias, un vídeo de producto en la pestaña de Claude Code y 8 ilustraciones animadas con Lottie (formato de animación ligera). Ningún vídeo de testimonio hablado. [Hecho]

**7. CTA** [Hecho]
- Arriba y abajo: «Get Enterprise plan», que es compra autoservicio con tarjeta, y «Build on Claude Platform». En la zona de precios: «Chat with buying specialist». En la de API: «Contact sales».
- La página de contacto hace triaje explícito: autoservicio («Get Enterprise»), agente de compra («Chat now») o soporte. Ventas solo atiende operaciones complejas, como despliegues de más de 500 usuarios o contratos sanitarios (BAA). https://claude.com/contact-sales
- Formulario de ventas: no aparece en el HTML (carga por JS); campos sin datos. Sin calendario.

**8. Cómo explican el modelo de despliegue**
- En la página enterprise no aparecen «Forward Deployed» ni «Applied AI» [Hecho]. El acompañamiento se reduce a «Anthropic-supported onboarding», «Deployment support» y «Prompting support» dentro de «Get extra support», más el directorio de partners de servicios (https://claude.com/partners) [Hecho].
- Donde sí lo cuentan es en **Claude Frontier Academy** (2-oct-2026), y lo hacen como programa de formación de la gente del cliente:
  - Inversión de $100M para formar a 10.000 «Frontier Deployed Engineers» antes de que acabe 2027. https://claude.com/programs/frontier-academy [Hecho]
  - Analogía médica: como un residente, se aprende de quien ya ejerce, sobre casos reales, y hay evaluación antes de trabajar solo. [Hecho, parafraseado]
  - Itinerario: intensivo de 4 días (3 presenciales construyendo para una empresa simulada, desde la petición hasta la revisión de seguridad y el traspaso, y un cuarto día de examen) → insignia «Claude Resident Engineer» → 12 semanas liderando un despliegue real en la propia organización, con mentoría → examen final → credencial «Claude Frontier Deployed Engineer». [Hecho]
  - Acceso solo por nominación. Primeras cohortes: Accenture, Bain, Capgemini, Commonwealth Bank of Australia, Deloitte, McKinsey, Morgan Stanley y Novo Nordisk, con citas de responsables con nombre y cargo en el anuncio. https://www.anthropic.com/news/claude-frontier-academy [Hecho]
- Equipo propio: de 647 ofertas abiertas, 5 tienen «Forward Deployed» en el título y 47 «Applied AI» (sobre todo Applied AI Architect, incluidas plazas en Múnich, París, Milán y Londres). Fuente: API Greenhouse citada, 14-oct-2026. [Hecho]

**9. Valoración** [Opinión] La página enterprise está pensada para comprar sin hablar con nadie. El relato FDE de Anthropic es otro: formar FDE dentro del cliente y de las consultoras. Para Spiralia es el precedente más útil ante RR. HH. y L&D, porque une formación certificada con un despliegue real en la empresa del alumno.

---

### D.5 Microsoft — Copilot adoption hub

**1. URLs analizadas**
- https://adoption.microsoft.com/en-us/copilot/
- https://adoption.microsoft.com/en-us/scenario-library/ y la sección de RR. HH. https://adoption.microsoft.com/en-us/scenario-library/human-resources/
- https://adoption.microsoft.com/en-us/copilot/prompt-a-thon/

**2. Claim del hero**
- «Accelerate your Microsoft Copilot adoption», con el logo de Copilot y un menú de anclas (Get started, Prompt Gallery, Leaders on Copilot, Why Copilot, What's new, Communities, Go further). [Hecho]
- Vídeo en el hero: no. [Hecho]

**3. Estructura** [Hecho]
1. «Get started with Cowork».
2. «Get started» con **pestañas por perfil**: AI Users, AI Champions, AI Leaders, IT Admin. Cada perfil tiene su ruta por fases:
   - Líderes: estrategia → preparación → lanzamiento → seguimiento del impacto.
   - IT: Plan → Implement → Adopt → Manage → Improve.
   - Champions: estrategia → lanzamiento → generar entusiasmo → compartir éxitos → conectar con la comunidad.
3. Fichas de detalle con vídeo por aplicación (Word, Excel, PowerPoint, Outlook, Teams) y por agente (Researcher, Analyst).
4. «Prompt Gallery».
5. «Leaders on Copilot» (vídeo de Jared Spataro).
6. «Why Copilot» (3 pilares).
7. «What's new» (el día de la consulta mostraba «Unable to load feed.»).
8. Eventos.
9. Comunidades.
10. «Go further» (AI Skills Navigator, recursos avanzados, Learning hub).

**4. Credibilidad**
- En el hub no hay cifras, ni logos de clientes, ni testimonios de clientes [Hecho]. Lo sostienen la voz de un directivo de Microsoft (vídeo) y un enlace a historias de cliente en otra web [Hecho].
- Seguridad: un pilar genérico («Secure and private»), sin certificaciones nombradas [Hecho].
- Calidad: la página de escenarios de RR. HH. abre con un texto que habla de tareas de Finanzas, un error de copiar y pegar [Hecho]. https://adoption.microsoft.com/en-us/scenario-library/human-resources/

**5. Herramientas interactivas y kits** (todos con enlace directo, sin formulario) [Hecho]
- Champion Playbook (.pptx), IT Admin Checklist (.pptx), plantilla de email de lanzamiento (.oft), mensaje de arranque del líder, guía de priorización («Choose where to focus first with Copilot») y guía para crear un AI council (comité de IA con líderes de negocio).
- Kits de eventos:
  - Prompt-a-thon (evento práctico para usuarios; serie de vídeos y kit completo).
  - Agent Hackathon (agenda, presentación, recursos, instrucciones, plantilla y guía de prompts).
- Scenario Library por función y por sector. En RR. HH. agrupa escenarios por subárea (gestión del talento, L&D, compensación, selección, *employee engagement*) e indicadores que puede mover (eNPS, tiempo de *onboarding*, retención, coste por contratación), con un .pptx descargable de escenarios.
- Prompt Gallery con *prompts* listos que abren Copilot ya rellenado (piden sesión de Microsoft 365) [Supuesto sobre el inicio de sesión].
- El Copilot Dashboard solo es accesible para administradores.

**6. Vídeo**: 9 vídeos incrustados con el reproductor de Microsoft, en su mayoría demos de cada aplicación («Watch how Copilot in Word…») y mensajes del directivo; la página del Prompt-a-thon explica el formato con una serie de vídeos. [Hecho]

**7. CTA**
- No hay contacto con ventas. Los botones son de autoservicio: «Learn more», «Download…», «Become a Champion», «Join the community», «Skill up». [Hecho]
- Sin formularios (salvo el buscador), sin calendario, sin chat. FastTrack, el programa de ayuda al despliegue de Microsoft, solo aparece en el menú. [Hecho]

**8. Cómo explican el modelo de despliegue**: no hay FDE. El modelo es adopción guiada por el propio cliente [Hecho]:
- Patrocinio visible del comité de dirección y un AI council.
- Red de *champions* internos.
- Primer grupo piloto con casos de alto valor y bajo riesgo.
- Eventos prácticos (Prompt-a-thon, hackathon).
- Medición con el dashboard y revisión mensual.

**9. Valoración** [Opinión] Es el mejor referente de **contenido por perfil** (líder, champion, IT, usuario) y de kits que un director de RR. HH. o L&D reconoce como propios: emails de lanzamiento, playbooks, eventos. Spiralia puede ofrecer su versión en español y con marca propia como gancho, y dejar claro que lo que Microsoft no da (gente que construye dentro) es lo que Spiralia vende.

---

### D.6 Extra — Sierra (sierra.ai)

**Por qué entra**: es la plataforma de agentes de atención al cliente que combina producto con equipos de despliegue propios, cobra por resultado y muestra a **Santander** en su muro de logos. [Hecho] https://sierra.ai/

1. **URLs**: https://sierra.ai/, https://sierra.ai/careers, https://sierra.ai/blog/agent-development-life-cycle (3-jun-2024). /learn-more devolvió 403. [Hecho]
2. **Hero**: «Better outcomes. Built on Sierra.» con **vídeo de fondo de Wistia** en la cabecera. No hay subtítulo, solo el botón «Learn more»; el mensaje de apoyo llega en el bloque siguiente («Standout customer experiences. Stronger growth.»). [Hecho]
3. **Estructura** [Hecho]:
   1. Hero.
   2. «Leading brands succeed with Sierra»: 30 logos, entre ellos Santander, Rocket Mortgage, SoftBank, Nubank y SiriusXM.
   3. Cuatro propuestas de valor; una es «Pay for a job well done», es decir, precio ligado al resultado.
   4. «The results speak for themselves»: 4 citas con nombre y cargo (CEO de CLEAR, VP de Producto de Rocket Mortgage, CPO de SiriusXM, COO de Minted).
   5. «Meet Sierra» (producto).
   6. «Trust and reliability».
   7. CTA final.
4. **Credibilidad**: muro de logos, citas de directivos con cargo y un bloque largo de sellos: SOC 2, ISO 27001, ISO 42001 (gestión de IA), HIPAA, GDPR, EU AI Act, CSA STAR, FedRAMP y PCI DSS. En la home no hay cifras de resultado. [Hecho]
5. **Interactivo**: no hay calculadoras ni demo abierta. Su producto Ghostwriter se explica en lenguaje llano: subes procedimientos, transcripciones, fotos de una pizarra o audios, o describes el objetivo, y construye el agente. [Hecho]
6. **Vídeo**: de fondo en el hero (Wistia). [Hecho]
7. **CTA**: «Learn more» arriba y abajo; el formulario queda sin datos (403). [Hecho / sin datos]
8. **Modelo de despliegue**: la home no lo cuenta. Careers revela la pareja de roles: departamento «Agent Engineering» y puestos «Strategist, Agent Development» (incluido uno para *Flagship Deployment*), además de un Forward Deployed Infrastructure Engineer en Tokio. El post sobre su ciclo de vida de agentes explica que la calidad la evalúan expertos de negocio (responsables de atención al cliente) anotando conversaciones a diario, y que esas anotaciones se convierten en pruebas automáticas. [Hecho, parafraseado]
9. **Valoración** [Opinión] Dos ideas copiables: el precio por resultado como mensaje de confianza y la explicación del producto en verbos cotidianos («subes tus procedimientos»). Lo de Santander es un dato comercial que conviene tener presente.

---

### Patrones comunes

- **Pareja de roles, no un ingeniero solo.** Todos los modelos de despliegue combinan quien construye con quien entiende el negocio: Echo y Delta en Palantir; AI Engineer y AI Strategist en Distyl; «engineers and domain experts» en los AI advisors de OpenAI; Agent Engineering y Strategist en Sierra. [Hecho; fuentes en D.1, D.2, D.3 y D.6]
- **La promesa es de tiempo y de producción, no de tecnología.** «From 0 to use case in 5 days» y «Days, not years» (Palantir); producción «in weeks or months» y «EBITDA impact in 6 months» (Distyl); la idea de pasar de experimentar a desplegar de forma fiable (OpenAI). [Hecho]
- **El acompañamiento se vende como formato con nombre, duración y entregable**: bootcamp de 5 días (Palantir), residencia de 4 días + 12 semanas con credencial (Anthropic), Prompt-a-thon y Agent Hackathon (Microsoft), encargo diagnóstico → flujos prioritarios → construcción (OpenAI). [Hecho]
- **Formación y despliegue van juntos.** El bootcamp de Palantir incluye formar a usuarios; OpenAI Academy da certificados; Anthropic forma FDE dentro del cliente; Microsoft monta redes de *champions*. Ninguno separa «curso» de «implantación». [Hecho]
- **Prueba con cifra por caso, en formato antes → después**: «de 40 horas a 2 minutos» (Moody's, Claude); «de 10 semanas a 10 minutos» (Novo Nordisk, Claude); «ciclo de 12 a menos de 3 meses» (Distyl). Si el cliente no puede salir con nombre, se anonimiza por tamaño y sector (Distyl, «F20 Healthcare Payor»). [Hecho]
- **Seguridad como bloque propio** con sellos (SOC 2, ISO 27001/42001, HIPAA, FedRAMP) y el mensaje «no entrenamos con tus datos». Aparece en Claude, Sierra, Palantir y Distyl. OpenAI lo dice sin nombrar sellos. [Hecho]
- **CTA único y de baja fricción, repetido arriba y abajo.** OpenAI pide solo el email en el primer paso; Distyl usa un mailto; Anthropic añade un agente de compra y autoservicio. En ninguna página analizada hay reserva directa de calendario (no aparecen Calendly ni Chili Piper en el HTML). [Hecho]
- **El vídeo enseña trabajo real, no la marca**: demos cortas por función (OpenAI, Microsoft), clientes en el bootcamp (Palantir), fondos de ambiente en historias (Claude) y en el hero (Sierra). Nadie usa un vídeo corporativo largo. [Hecho]

### Cómo contar el modelo FDE a un CEO o director de RR. HH.: lo que aprendemos de estas webs

- **[Opinión] No titular con «FDE»; titular con lo que pasa.** Ningún laboratorio pone la sigla en su hero comercial (solo la página específica de OpenAI). Para Spiralia, algo como «ingenieros que se sientan con tu equipo y no se van hasta que funciona» y, la primera vez que salga, una línea que defina FDE. La analogía de la residencia médica de Anthropic se entiende sin saber nada técnico.
- **[Opinión] Empaquetar el primer paso como formato con nombre, duración y entregable**, igual que el bootcamp de Palantir o la residencia de Anthropic. Por ejemplo: «X días: tu equipo sale con un agente funcionando en un proceso suyo». Es un CTA mejor que «Contáctanos» y encaja con el lenguaje de L&D (programa, cohorte, horas).
- **[Opinión] Enseñar la secuencia en 3-4 pasos y quién de su gente participa en cada uno** (diagnóstico → procesos prioritarios → construcción dentro → traspaso y escala), como en el encargo de OpenAI. A RR. HH. le importa cuánto tiempo pide a sus equipos y qué capacidad queda dentro; Microsoft y Anthropic lo resuelven con *champions* y credenciales.
- **[Opinión] Presentar el dúo «consultor de negocio + ingeniero»**, que es el patrón de Palantir, Distyl y Sierra y que encaja con el origen de consultoría estratégica de Spiralia: tranquiliza al CEO (alguien entiende su cuenta de resultados) y al de RR. HH. (alguien cuida a las personas y el cambio).
- **[Opinión] Probarlo con 3-4 casos en formato antes → después**, anonimizados si hace falta («entidad financiera del IBEX»), siempre con una cifra y un plazo. Mejor pocos y concretos que un muro de logos que Spiralia todavía no puede igualar.
- **[Opinión] Hacer explícito que formación y despliegue son lo mismo.** «Formación que termina en producción» diferencia a Spiralia de academias y cursos (OpenAI Academy y Microsoft regalan contenido) y de consultoras que entregan y se van («Not a handoff», Distyl).

### Limitaciones

- **OpenAI**: análisis basado en capturas de Wayback Machine (entre el 13-may-2026 y el 12-oct-2026), porque la web en vivo bloquea a lectores automáticos (403). La página de la Deployment Company tiene como última captura válida el 13-may-2026 y puede haber cambiado desde entonces.
- **Formularios cargados por JS** (Palantir/Marketo, segundo paso de OpenAI, ventas de Anthropic, Sierra): número de campos sin datos.
- **Animaciones**: detectadas por el código (canvas, Lottie, clases de animación), no vistas en pantalla; no se usó navegador.
- **Atribución de cifras a empresas** en OpenAI y Claude: se deduce del orden de las tarjetas en el HTML, y donde no es inequívoca se marca [Supuesto].
- **Recuentos de ofertas de empleo**: fotografía del 14-oct-2026 con APIs públicas (Lever, Greenhouse, Ashby); varían a diario.
- **HTML bruto** guardado en `research/txt/` (ficheros `raw_palantir_*`, `raw_distyl_*`, `raw_openai_*`, `raw_chatgpt_enterprise_wb.html`, `raw_claude_*`, `raw_anthropic_*`, `raw_ms_*`, `raw_sierra_*`) y textos extraídos con el mismo nombre sin el prefijo `raw_`.


---

## E. Síntesis del benchmark: patrones comunes y qué haría una web excepcional

Base: 27 webs revisadas el 14-oct-2026 (secciones A-D). Cada afirmación remite a la ficha correspondiente, donde están las URL. Leyenda: **[Hecho]** observado, **[Supuesto]** deducción, **[Opinión]** valoración propia.

### E.1 Cuadro comparativo por tipo de actor

| Dimensión | Consultoras (A) | Escuelas de negocio (B) | Formación IA nativa (C) | Despliegue / laboratorios (D) |
|---|---|---|---|---|
| **Hero** | Etiqueta de categoría: «Artificial Intelligence», «AI Transformation», «AI and data» | Nombre del programa + ficha (fecha, duración, precio) | La misma tesis en todas: «ya compraste la IA, falta que la gente la use» | Promesa de tiempo y producción: «From 0 to use case in 5 days» (Palantir) |
| **Vídeo** | Ambiental en bucle, sin mensaje (McKinsey, BCG, Bain, PwC España) | Profesor presentando el programa; testimonios de cliente en las páginas de custom (INSEAD, 9 vídeos) | Ambiental en el hero (Section, Multiverse) y demo de producto más abajo | Demos cortas por función (OpenAI, Microsoft); clientes trabajando en el bootcamp (Palantir) |
| **Prueba** | Cifras de escala (BCG 6.000+ profesionales de IA), casos con una cifra, alianzas, analistas (Forrester, IDC) | Autoridad académica, insignias del FT, testimonios de alumnos | Logos + volumen autodeclarado (40.000+, 700.000, 70K+), a menudo incoherente entre páginas; citas de CEOs | Antes → después con plazo («de 40 horas a 2 minutos»); casos anonimizados por sector y tamaño (Distyl); sellos de seguridad |
| **Interactivo** | Casi nada: BCG Answer (exige iniciar sesión) | Buscadores y comparadores (HBS Online, tabla custom vs grupo de MIT) | Recorrido de producto (Multiverse), demo de voz (Uplimit), diagnóstico conversacional con avatar (Mindstone, beta) | Demos estáticas por función (Claude); kits descargables sin formulario (Microsoft) |
| **CTA** | Contacto al final o solo en el menú; formularios de 6 a 15 campos | «Descargar folleto» + «Apply»; formularios de 13 a 16 campos, alguno con fecha de nacimiento | «Book a demo / meeting» repetido (10 enlaces en la home de Section); formularios de 4 a 9 campos | 1 campo en el primer paso (OpenAI), mailto (Distyl), autoservicio + agente de compra (Anthropic), «Schedule an AIP Bootcamp» (Palantir) |
| **Reserva de calendario** | No | IE (HubSpot Meetings + WhatsApp con asesora con nombre); ESADE (Calendly tras el formulario) | Section (RevenueHero solo para empresas de 500+ empleados) | No detectada |

[Hecho en todas las celdas; fuentes en las fichas de A-D.]

### E.2 Diez patrones transversales

1. **[Hecho] El mensaje de Spiralia ya está en boca de todos.** Section, Multiverse, Mindstone y Founderz abren con la idea de que el valor no está en comprar la herramienta sino en que la gente la use (C, patrones). Las grandes consultoras han convertido a las personas en un pilar explícito: el 10/20/70 de BCG (70 % del valor en personas y procesos), el pilar People de PwC con el caso Chipotle, «AI Talent and Workforce» de Accenture (A, patrones). **[Opinión]** Decir «el valor está en el despliegue» ya no diferencia; enseñarlo, sí.
2. **[Hecho] Casi nadie enseña lo que construye.** Las consultoras enseñan casos con una cifra; las escuelas, profesores; las nativas, plataformas. Ninguna web de la muestra tiene una galería de agentes o automatizaciones construidas con el cliente. Lo más cercano son los vídeos del bootcamp de Palantir y las demos por función de OpenAI (D).
3. **[Hecho] El acompañamiento que mejor se vende es un formato con nombre, duración y entregable**: bootcamp de 5 días (Palantir), residencia de 4 días + 12 semanas con credencial (Anthropic Frontier Academy), masterclass cerrada de 2 días para hasta 35 personas (LBS), sesión para comités de 2-4 horas (Mindstone PACE), talleres de media jornada para C-suite y consejos (Faculty), Prompt-a-thon (Microsoft) (B, C, D).
4. **[Hecho] Formación y despliegue ya se cuentan juntos en los laboratorios**: OpenAI escalona guía → asesores → FDE → soporte, y describe el encargo tipo como diagnóstico → pocos flujos prioritarios → construcción dentro (D.3). Anthropic forma FDE dentro del cliente con un despliegue real de 12 semanas (D.4). Nadie titula con la sigla «FDE» salvo la página específica de OpenAI.
5. **[Hecho] La pareja «negocio + ingeniería» es el patrón del modelo FDE**: Echo/Delta en Palantir, AI Strategist/AI Engineer en Distyl, «engineers and domain experts» en OpenAI, Strategist/Agent Engineering en Sierra (D, patrones).
6. **[Hecho] Las herramientas interactivas son la gran ausencia.** Ninguna de las 27 webs tiene una calculadora de ROI pública. Solo Mindstone ofrece un diagnóstico público (conversacional, en beta y fuera del menú) y pide los datos antes de entregar el informe completo (C.4). Section y Multiverse venden el diagnóstico después de la reunión comercial (C.1, C.2).
7. **[Hecho] La prueba más creíble es concreta y fechada; la menos, el volumen autodeclarado.** Multiverse da 1.500+ empresas en una página y 1.600+ en otra; Mindstone, 10K+ y 20K+ miembros en la misma home; Founderz, dos horquillas de horas distintas (C, patrones). Distyl resuelve la confidencialidad anonimizando («F100 Telecom Operator») sin perder cifras (D.2).
8. **[Hecho] El comprador corporativo está mal servido por las escuelas.** Sus páginas de IA venden plazas individuales y la oferta corporativa es genérica o vive en otra marca (IE → Headspring). Solo LBS tiene una oferta corporativa específica de IA (B, patrones). MIT y Wharton dan al alumno una carta para pedir permiso al jefe: venta de abajo arriba.
9. **[Hecho] La segmentación por perfil existe, pero pocas la hacen bien**: pestañas por rol en el hub de Microsoft (líder, champion, IT, usuario), bloque por tipo de directivo en BCG (incluido «quien responde de las personas»), seis situaciones del comprador en Founderz, «Good for you / Good for your organisation» en LBS (A.2, B, C.5, D.5).
10. **[Hecho] Las versiones españolas son peores que las globales** (Deloitte España: formulario de 13 campos con dirección postal; PwC España: titular en inglés) (A, patrones). El competidor local más visible, Founderz, sí habla al comprador español: FUNDAE, certificación con Microsoft, propuesta en 48 h, acceso por situación (C.5).

### E.3 Qué haría una web excepcional que se distinga de todas ellas [Opinión]

Cada rasgo responde a un hueco observado en el benchmark.

1. **Un hero que nombra al comprador y promete algo comprobable, no una categoría.** Ni «IA para empresas» (etiqueta de consultora) ni «ya compraste la IA» (tesis gastada). La promesa debería hablar de lo que sale de la sesión o del programa: personas usando la IA en su trabajo real y algo construido funcionando en un proceso del cliente. Copy final pendiente.
2. **Enseñar lo construido: una galería de agentes y skills.** Fichas breves con problema → qué se construyó → para qué equipo → qué cambió, con capturas o un vídeo corto de pantalla. Es la prueba que nadie de la muestra tiene (patrón 2) y la que hace tangible el modelo FDE. Requiere confirmar con cada cliente qué se puede enseñar.
3. **Vídeo que explica, no que decora.** Una pieza de 60-90 segundos de una sesión o un despliegue real (un FDE construyendo con un equipo), en lugar del vídeo ambiental en bucle de consultoras y nativas. Duración propuesta: estimación propia, no hay dato de la muestra.
4. **El primer paso empaquetado como formato con nombre, duración y entregable** (patrón 3). Por ejemplo, una sesión para comité de dirección y un programa de equipo que termina con algo desplegado. Encaja con el lenguaje de L&D (programa, cohorte, horas) y es mejor CTA que «Contáctanos».
5. **El método en 3-4 pasos, con quién participa y qué se entrega en cada uno**: diagnóstico → formación aplicada → despliegue con FDE → medición y traspaso. Inspirado en el encargo tipo de OpenAI (D.3) y en los procesos de 4-5 pasos de IESE y ESADE (B). A RR. HH. le importa cuánto tiempo pide a sus equipos y qué capacidad queda dentro.
6. **Rutas separadas por perfil**: CEO o comité de dirección, dirección de Personas, L&D. Cada una con su problema, su formato y su prueba. Nunca mezclar en la misma pantalla lo que interesa a quien decide y lo que necesita quien compra.
7. **Un diagnóstico público que enseña el resultado antes de pedir el email** (patrón 6). Corto, en pantalla, con nivel de partida y dos o tres siguientes pasos; el email solo para recibir el informe o hablar con alguien. Ver la evidencia sobre calculadoras y gating en la Tarea 2.
8. **Rigor visible como diferencial**: cada cifra con su fuente y su fecha, la misma cifra en todas las páginas (por ejemplo, «más de 50.000 profesionales formados», dato de Spiralia que conviene documentar), casos anonimizados al estilo Distyl si el cliente no puede salir con nombre. Es coherente con una boutique que viene de la consultoría estratégica y contrasta con las incoherencias de Multiverse, Mindstone y Founderz.
9. **Personas con cara y nombre**: el consultor y el FDE que acompañarían al cliente, y la persona que atiende el contacto (como la asesora de IE o los socios con email de PwC y Deloitte). El dúo «negocio + ingeniería» (patrón 5) tranquiliza al CEO y a RR. HH. a la vez.
10. **Material útil sin formulario, en español**: un plan de despliegue o una guía de sesión de ejemplo anonimizada (como el plan de ejemplo de Section), kits de lanzamiento para RR. HH. al estilo de Microsoft (email del líder, guía de champions). Ningún competidor español lo ofrece en la muestra.
11. **Responder en la propia página a las preguntas del comité**: seguridad y datos, qué tiempo pide a los equipos, FUNDAE (solo si la formación de Spiralia es bonificable: sin datos), obligación de alfabetización en IA del art. 4 del Reglamento europeo de IA. Sobre este último: aplica desde el 2-feb-2025 (Reglamento (UE) 2024/1689, https://eur-lex.europa.eu/eli/reg/2024/1689/oj) y el Ómnibus Digital sobre IA lo recalibró en 2026: sigue obligando a adoptar medidas para apoyar la alfabetización, sin exigir garantizar un nivel individual (fuente secundaria: https://ki-campus.org/en/blog/eu-ai-act-ai-omnibus-recalibrates-article-4-ai-literacy-remains-mandatory, 28-jul-2026; verificar en el texto consolidado de EUR-Lex antes de publicarlo). Founderz ya usa el art. 4 como gancho (C.5).

### E.4 Esqueleto de página propuesto [Opinión]

Orden de bloques derivado de lo anterior, para discutir antes de diseñar:

1. **Hero**: promesa + para quién + CTA principal + CTA secundario (ver Tarea 2). Vídeo explicativo corto o una pieza animada del método, no un fondo decorativo.
2. **Franja de prueba**: logos de clientes con permiso (ING, Deloitte, CCEP, GPTW) y una cifra documentada.
3. **El problema en lenguaje de comité**: por qué la formación sola no cambia cómo se trabaja.
4. **Rutas por perfil**: CEO/comité · Personas · L&D.
5. **Método en 3-4 pasos**, con participantes y entregables.
6. **Galería de lo construido** (agentes y skills, antes → después).
7. **Formatos**: tabla comparativa al estilo MIT (sesión de comité, programa de equipo, despliegue con FDE): para quién, duración, qué sale.
8. **Casos**: 3-4, reto → solución → impacto, contados por el responsable del cliente.
9. **Diagnóstico** con resultado en pantalla.
10. **Equipo**: consultor + FDE con cara.
11. **Preguntas del comité** (seguridad, tiempos, FUNDAE si aplica, art. 4).
12. **Recursos sin formulario**.
13. **Cierre**: CTA principal + persona de contacto.


---

# Tarea 2 · Qué convierte mejor en el CTA B2B

Investigación documental hecha el 14-oct-2026 con búsqueda web y lectura de fuentes; no se ha descargado ningún informe que exigiera dejar datos. Cuando un informe estaba cerrado (gated) o la web bloqueaba la lectura automática (Gartner, CXL, MarketingProfs y Business Wire devolvieron 403), se indica y se cita la fuente secundaria que lo recoge.

**Leyenda.** **[Estudio]**: datos con metodología declarada (muestra, periodo o diseño). **[Vendedor]**: dato publicado por quien vende la herramienta o el servicio que sale favorecido, con sesgo de interés aunque traiga metodología. **[Experto]**: criterio de una persona u organización reconocida, sin datos propios o con muestra pequeña. **[Normativa]**: texto legal o guía de autoridad. **[Opinión]**: lectura propia aplicada a Spiralia. «Sin datos» significa que no he encontrado evidencia verificable.

**Advertencia de alcance.** Casi toda la evidencia cuantitativa viene de software B2B (SaaS) estadounidense y de bases de clientes de proveedores de herramientas de agenda o formularios. No he encontrado estudios específicos de servicios de formación o consultoría vendidos a empresas españolas. Todo lo que se aplica a Spiralia es extrapolación y va marcado como [Opinión].

## 2.1 Formulario, email, reserva directa en calendario o chat

### Velocidad de respuesta (la evidencia más antigua y más citada)

- **[Estudio] Oldroyd, McElheran y Elkington, «The Short Life of Online Sales Leads», *Harvard Business Review*, marzo de 2011.** El artículo combina una auditoría y un análisis de leads. (1) Auditoría con un lead de prueba enviado a 2.241 empresas de EE. UU.: el 37 % respondió en menos de una hora, el 16 % entre 1 y 24 horas, el 24 % tardó más de 24 horas y el 23 % nunca respondió; el tiempo medio, entre las que respondieron en 30 días, fue de 42 horas. (2) Análisis de 1,25 millones de leads de 42 empresas (29 B2C y 13 B2B): quienes intentaron contactar en la primera hora tuvieron casi 7 veces más probabilidad de «cualificar» el lead (conversación significativa con quien decide) que quienes esperaron una hora más, y más de 60 veces más que quienes esperaron 24 horas o más. Es correlacional, de 2011 y mezcla B2C. El texto completo de HBR es de pago; las cifras se han contrastado en la reseña de SmartCompany del 1-jul-2011. URL: https://hbr.org/2011/03/the-short-life-of-online-sales-leads · https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/ · ficha académica: https://scholarsarchive.byu.edu/facpub/9711
- **[Vendedor + académico] Lead Response Management Study (InsideSales.com y James Oldroyd, presentado en 2007).** Llamar a un lead web en 5 minutos frente a 30 multiplica por 100 la probabilidad de contactar y por 21 la de cualificar. La muestra que circula (3 años, unos 15.000 leads, más de 100.000 intentos de llamada, 6 empresas) procede de la presentación del propio InsideSales; la página del vendedor (16-may-2012) no da muestra. Estas cifras se atribuyen a menudo, por error, al artículo de HBR. URL: https://resources.insidesales.com/?p=4167
- **[Vendedor] Drift, estudio de respuesta a leads (433 empresas B2B, c. 2017).** El 7 % respondió en 5 minutos y el 55 % no respondió en 5 días hábiles. Cifra circulante sin fuente primaria localizada: no he encontrado el informe original de Drift; la recogen terceros con años distintos (2017, 2018, 2021). URL secundaria: https://ainora.lt/blog/lead-response-time-statistics-every-study-2026
- **[Vendedor] Chili Piper, «B2B Buyer Best Practices Report», 25-may-2023.** «Cliente misterioso» a las 100 mayores empresas SaaS: tiempo medio de respuesta a una petición de demo, 2 días; el 35 % nunca respondió; solo el 11 % ofrecía calendario directo, y el 97 % de las que nunca respondieron no lo tenía. Muestra pequeña y vendedor interesado en el calendario. URL: https://chilipiper.com/post/b2b-buying-journey-report
- **[Vendedor] Workato, «B2B Lead Response Times: What We Learned from 114 Companies», 19-mar-2026.** Más del 99 % no respondió en 5 minutos; respuesta media por email, 11 h 54 min; casi 1 de cada 5 no respondió por email. Con herramienta de enrutado, 3 h 32 min de media; sin ella, casi 13 horas. URL: https://workato.com/the-connector/lead-response-time-study

### Formulario seguido de calendario frente a formulario con respuesta manual

- **[Vendedor] Chili Piper, «2025 Benchmark Report on Demo Form Conversion Rates», 18-feb-2025.** Casi 4 millones de envíos de formulario de clientes de Chili Piper en 2024. El 14,1 % de los envíos no cualifica (spam, emails personales, fuera de criterio). De los cualificados, el 66,7 % acaba en reunión reservada cuando se ofrece calendario al enviar el formulario, frente a una «media del sector» del 30 % para la que el informe no da fuente. Con opción de llamada en directo, 69,2 %. Las tasas más bajas por sector incluyen el software de RR. HH. URL: https://www.chilipiper.com/post/form-conversion-rate-benchmark-report
- **[Vendedor] RevenueHero, «Lead-to-Meeting Conversion Benchmarks for 2025», 18-feb-2026.** Más de un millón de envíos B2B SaaS. Mediana de cualificado → reunión reservada: 62 %; procesos manuales: 35-40 %; decil superior: 78 % o más. Sin metodología descrita. URL: https://www.revenuehero.io/blog/lead-to-meeting-conversion-benchmarks-for-2025
- **[Vendedor] Default, «The State of Booking Inbound Demos».** 51.219 peticiones de demo de 100 empresas de software B2B: el 75,6 % (38.751) terminó en reunión reservada. La página devolvía 404 al consultarla el 14-oct-2026; la cifra consta en el resumen del buscador y en una recopilación de terceros. URL: https://default.com/lp/source-analysis · https://ainora.lt/blog/b2b-meeting-booking-rate-every-study-2026

### Reuniones que no se celebran (no-show)

- **[Vendedor] RevenueHero, 18-ago-2025.** 18 semanas de datos de clientes que reservan 50 o más reuniones al mes. No-show medio: 15,9 %; mediana: 13,5 %; decil superior: 5,5 %. Por segmento: pymes 16,1 %, mid-market 17,3 %, enterprise 7,8 %. No da número de empresas. URL: https://revenuehero.io/blog/ways-to-reduce-no-show-rates-in-sales-calls
- **[Vendedor] RevenueHero, informe semanal, 13-dic-2024.** 6.428 reuniones de 15 sectores en una semana: 6,5 % de no-show global; educación y e-learning, el más alto, 18,1 % (77 de 425). URL: https://revenuehero.io/reports/no-show-benchmark-december-02-2024
- **[Vendedor] Calendly.** Según encuesta a sus propios usuarios de ventas, los recordatorios automáticos reducen el no-show un 28 %. Sin muestra ni fecha. URL: https://calendly.com/blog/reduce-no-show-rates-sales
- La horquilla «20-40 % de no-show en demos B2B» que repiten muchos blogs es una cifra circulante sin fuente primaria localizada (la propia RevenueHero la da sin fuente: https://www.revenuehero.io/blog/what-is-a-no-show-rate).

### Enlace de email (mailto)

- **[Experto] Jakob Nielsen, NN/g, «Mailing List Usability», 19-ago-2000.** Los enlaces mailto rompen la expectativa de que un clic abre una página: sacan al usuario a otra aplicación, lo que según Nielsen sorprende y molesta, y el programa de correo puede poner un remitente que el usuario no quería. URL: https://www.nngroup.com/articles/mailing-list-usability/
- **[Experto] Adam Silver y Amy Hupe, «The trouble with mailto email links and what to do instead», julio de 2020.** Problemas: la dirección es difícil de copiar, siempre se abre la aplicación de correo por defecto y quien no la tiene configurada llega a un callejón sin salida. Proponen mostrar la dirección como texto con opción de copiar. URL: https://adamsilver.io/blog/the-trouble-with-mailto-email-links-and-what-to-do-instead/
- Comparativa de conversión mailto frente a formulario: **sin datos**.

### Chat en directo, chatbot y chat con IA

- **[Estudio] Sun, Chen y Fan, *Production and Operations Management*, 2021.** Datos de panel de Taobao (B2C): el chat en directo aumenta la conversión, y el efecto es mayor cuando la ficha de producto informa poco y cuando el valor percibido es alto. URL: https://academicnewsletter.sufe.edu.cn/info/404670 (DOI 10.1111/poms.13320)
- **[Estudio] Luo, Tong, Fang y Qu, *Marketing Science*, 38(6), noviembre de 2019.** Experimento de campo con más de 6.200 clientes de servicios financieros, llamadas comerciales salientes: un bot no revelado vende como un empleado competente y cuatro veces más que uno novato, pero revelar que es una máquina antes de la conversación reduce la compra más de un 79,7 %; revelarlo más tarde atenúa el efecto. Contexto distinto (llamadas en China), pero relevante porque la ley obliga a revelarlo (ver 2.6). URL: https://ideas.repec.org/a/inm/ormksc/v38y2019i6p937-947.html
- **[Experto] Raluca Budiu, NN/g, «The User Experience of Chatbots», 25-nov-2018.** Prueba de usabilidad con 8 participantes. Los bots funcionan en flujos lineales simples y fallan en cuanto el usuario se sale del guion. Recomienda decir que es un bot, admitir cuando no entiende y ofrecer una salida a una persona. URL: https://www.nngroup.com/articles/chatbots/
- **[Vendedor] Drift y Heinz Marketing, encuesta a 538 profesionales B2B, julio de 2020.** El 58,7 % dejaría de usar el chat de una marca si la información es inexacta y el 50,9 % si responde tarde. Canales usados en los seis meses anteriores: email 66,7 %, teléfono o vídeo 50,6 %, chat en directo 45,2 %, chatbots 24,9 %. Fuente secundaria: YouGov, 14-oct-2020. URL: https://yougov.com/articles/32507-b2b-clients-expect-quick-detailed-and-expert-answe
- **[Estudio] Gartner, predicción del 25-ago-2025.** En 2030, el 75 % de los compradores B2B preferirá experiencias de venta que prioricen la interacción humana sobre la IA. Es una predicción, no una encuesta, y Gartner no detalla la base. URL: https://www.gartner.com/en/newsroom/press-releases/2025-08-25-gartner-says-by-2030-that-75-percent-of-b2b-buyers-will-prefer-sales-experiences-that-prioritize-human-interaction-over-ai (403 a la lectura automática; contenido vía resumen del buscador)
- **[Estudio] Gartner, nota del 20-may-2026.** Encuesta a 645 compradores B2B (ago-sep 2025): el 69 % prefiere contrastar con un comercial lo que le dice la IA. URL: https://www.businesswire.com/news/home/20260520585188/en/Gartner-Survey-Finds-69-of-B2B-Buyers-Turn-to-Sales-Reps-to-Validate-AI-Generated-Insights
- Benchmarks independientes de conversión de chat en webs B2B de servicios: **sin datos**. Las cifras disponibles («quien chatea convierte 2,8 veces más») son de vendedores y confunden correlación con causa.

**[Opinión] Lectura para Spiralia.** Lo más sólido de este bloque no es el canal sino la rapidez: la ventaja de responder en la primera hora tiene base académica, aunque antigua. La reserva inmediata tras el formulario duplica, según los vendedores de agendas, la proporción de leads que llegan a reunión; es un dato sesgado, pero apunta en la misma dirección que la evidencia de velocidad. El mailto solo como CTA principal es la peor opción. El chat no tiene evidencia B2B independiente que justifique su coste de atención para un equipo pequeño, y un chat con IA obliga a decir que es IA, lo que según Luo et al. reduce su eficacia comercial.

## 2.2 Longitud del formulario y formularios por pasos

### Número y tipo de campos

- **[Vendedor, datos de clientes] Dan Zarrella, HubSpot, análisis de más de 40.000 landing pages de clientes.** La conversión baja ligeramente al añadir campos, menos de lo esperado; los campos de texto de una línea apenas penalizan; varios campos de texto largo (textarea) y varios desplegables sí penalizan; pedir edad, teléfono o dirección (sobre todo calle) se asocia a menos conversión. Correlacional. La página solo muestra «Updated 06/06/25»; la fecha original (blog antiguo de HubSpot, hacia 2010-2011) no es verificable y las cifras están en gráficos sin datos legibles. URL: https://blog.hubspot.com/blog/tabid/6307/bid/6746/which-types-of-form-fields-lower-landing-page-conversions.aspx · https://blog.hubspot.com/blog/tabid/6307/bid/6748/3-form-fields-that-kill-landing-page-conversion-rates.aspx
- **[Estudio] MarketingSherpa, test en directo en el Lead Gen Summit, 28-oct-2013.** Añadir un solo campo, «cargo», a un formulario de 4 campos para descargar una guía redujo los leads un 11,9 % (confianza del 99 %). No da muestra. URL: https://sherpablog.marketingsherpa.com/b2b-marketing/lead-gen/lead-gen-summit-live-test/
- **[Experto, caso] Michael Aagaard, CTAConf 2015.** Pasar de 9 a 6 campos redujo los leads un 14,23 % (4 semanas, 512 conversiones, 95 % de confianza): quitó campos que el usuario sí quería rellenar. Mejorar las etiquetas del formulario de 9 campos subió los leads un 19,21 % (671 conversiones, 96 %). URL: https://unbounce.com/cta-conf/Michael_Aagaard_CTAConf2015.pdf
- **[Caso] KinderCare, reseñado por Justin Rondeau en Econsultancy, 28-mar-2013.** Añadir un campo de «comentarios o preguntas» no cambió la conversión y ventas reportó leads de más calidad. Sin cifras. URL: https://econsultancy.com/how-to-optimize-your-lead-generation-forms-three-case-studies/
- **[Caso anecdótico] Expedia y los «12 millones de dólares».** Quitar un campo opcional «Empresa» del pago de reservas habría aportado 12 millones de beneficio anual: los usuarios ponían ahí su banco y luego la dirección del banco, y fallaba la verificación de la tarjeta. Es B2C, el problema era una etiqueta ambigua y no el número de campos, y no hay datos auditados. Fuente: UX Movement, 3-nov-2010, que remite a ZDNet (no consultable). URL: https://uxmovement.com/forms/the-12-million-optional-form-field/
- **[Estudio] Baymard Institute, Edward Scott, 26-jun-2024.** El checkout medio de comercio electrónico tiene 11,3 campos (11,8 en 2021; 12,7 en 2019) y la mayoría de webs necesitan solo 8. Lo que pesa es el esfuerzo percibido, más que el número de pasos. Es comercio electrónico, no captación B2B. URL: https://baymard.com/blog/checkout-flow-average-form-fields
- **[Experto] Kathryn Whitenton, NN/g, «Website Forms Usability: Top 10 Recommendations», 1-may-2016.** Formularios cortos: quitar lo que se puede deducir, pedir más tarde u omitir; como mucho uno o dos campos opcionales, bien marcados; una sola columna. URL: https://www.nngroup.com/articles/web-form-design/
- **[Experto] Hoa Loranger, NN/g, «When to Hide Content Behind Forms», 20-sep-2015.** Pedir solo lo que se va a usar; un único dato (el email) es poco arriesgado al principio; perfilado progresivo (pedir más datos en contactos sucesivos) mejor que un formulario largo. URL: https://www.nngroup.com/articles/content-behind-forms/
- **Cifras de Unbounce sobre número de campos** (p. ej. «3 campos convierten al 10,1 % y 9 campos al 3,6 %», «1,4 millones de formularios»): cifra circulante sin fuente primaria localizada. Aparecen atribuidas a un informe Unbounce 2026 solo en blogs de terceros; las páginas públicas del informe 2024 de Unbounce no traen datos por número de campos. URL donde circula: https://www.digitalapplied.com/blog/landing-page-statistics-2026-conversion-data-points

### Formularios por pasos (multi-step)

- **[Vendedor] Formstack, Form Conversion Report 2015.** Formularios de varias páginas, alrededor del 14 % de conversión, frente al 5 % de los de una página; los formularios de contacto, alrededor del 1 % de media; encuestas y pedidos, 22 campos de media. Datos de 650.000 organizaciones de 11 sectores. Mezcla tipos de formulario: los largos son por naturaleza de varias páginas, así que la comparación no aísla el efecto de los pasos. Formstack vende formularios. URL: https://www.demandgenreport.com/features/news-briefs/study-online-forms-with-incentives-increase-conversion-rates · https://www.businesswire.com/news/home/20150310006004/en/Conversion-Rates-Increase-189-Percent-Social-Media · https://www.marketingprofs.com/charts/2015/27318/conversion-benchmarks-for-seven-types-of-online-forms (403; cifra del 1 % vía resumen del buscador)
- **[Vendedor] Venture Harbour.** Su formulario de contacto pasó del 0,96 % al 8,1 % (+743 %) en unos cinco años tras adoptar formularios por pasos, con más de +300 % en la primera semana. Venture Harbour lanzó Leadformly, una herramienta de formularios por pasos, así que el caso es también publicidad propia. URL: https://ventureharbour.com/cro-case-studies/ · https://ventureharbour.com/leadformly/
- **[Vendedor] HubSpot.** Un experimento sin metodología publicada: +59,2 % al convertir un formulario de un paso en uno de varios; el propio artículo admite que no hay regla general. URL: https://blog.hubspot.com/marketing/multi-step-forms
- Estudio independiente y controlado que compare un paso frente a varios en formularios B2B cortos (4-6 campos): **sin datos**.

**[Opinión] Lectura para Spiralia.** La evidencia buena dice que importa más qué se pide y cómo se etiqueta que cuántos campos hay: un campo sensible o ambiguo cuesta más que uno neutro, y quitar campos útiles también puede costar. La única prueba controlada con un campo concreto relevante para Spiralia (el cargo) muestra un coste del 12 % aproximadamente, en un formulario de descarga y no de contacto. Con 4-5 campos no hace falta formulario por pasos; la evidencia a favor de los pasos viene de vendedores y de formularios largos.

## 2.3 CTA de bajo compromiso frente a CTA de alto compromiso

### Cuánto quiere hablar con ventas el comprador B2B

- **[Estudio] Gartner (CEB), 750 compradores B2B de compras complejas, publicado en 2018.** Los compradores dedican el 17 % del tiempo de compra a reunirse con proveedores posibles; con tres en liza, algo más del 5 % por proveedor. El 27 % se va en investigar por su cuenta en internet y el 18 % fuera de internet. La página de Gartner bloquea la lectura automática; cifras vía iStart, 17-ago-2018. URL: https://istart.com.au/news-items/right-info-right-channel-happy-b2b-customer/
- **[Estudio] Gartner, nota de prensa del 17-may-2021.** El 43 % de los clientes B2B preferiría no hablar con ningún comercial, y el arrepentimiento tras la compra es un 23 % mayor entre quienes prefieren comprar sin comercial que entre quienes sí interactúan. La muestra no queda clara en la nota (cita una encuesta de casi 1.000 clientes B2B de nov-dic 2020). URL: https://www.gartner.com/en/newsroom/press-releases/gartner-says-b2b-sales-organizations-need-to-give-customers-a-se (403; contenido vía resumen del buscador)
- **El «75 % prefiere comprar sin comercial» que se atribuye a una encuesta de Gartner de 2023:** cifra circulante sin fuente primaria localizada para 2023. Las atribuciones se contradicen: unas fuentes la sitúan en la B2B Buyer Survey de 2021 (725 compradores) o 2022 (771), otras en 2019 y solo para compras sencillas, otras en 2024. La nota de prensa de Gartner del 7-mar-2023 trata de la alineación de ventas y marketing (encuesta a más de 200 directores comerciales). URL: https://www.getapp.com/resources/what-is-a-prospect-in-sales · https://www.gartner.com/en/newsroom/press-releases/2023-03-07-gartner-survey-finds-aligning-commercial-functions-as-sales-leaders-top-priority-for-2023
- **[Estudio] Gartner, nota del 25-jun-2025.** Encuesta a 632 compradores B2B (ago-sep 2024): el 61 % prefiere una experiencia de compra global sin comercial; el 73 % evita activamente a los proveedores que le envían mensajes irrelevantes; el 69 % encuentra contradicciones entre lo que dice la web y lo que dice el comercial. Para juzgar si una solución encaja en su empresa, el comprador sí busca al comercial. URL: https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience (403 a la lectura automática; 61 %, 632 compradores, 73 % y 69 % verificados en navegador el 14-oct-2026)
- **[Estudio] Gartner, nota del 9-mar-2026.** Encuesta a 646 compradores B2B (ago-sep 2025): el 67 % prefiere comprar sin comercial y el 45 % usó IA en una compra reciente. Fuente secundaria: Distribution Strategy, 18-mar-2026. URL: https://distributionstrategy.com/2026/03/most-b2b-buyers-prefer-rep-free-purchasing-as-ai-reshapes-sales/
- **[Estudio · Vendedor] 6sense, «2025 B2B Buyer Experience Report».** Casi 4.000 compradores de Norteamérica, EMEA y APAC con compras de al menos 25.000 dólares; el 41 % de las compras analizadas eran de servicios. El primer contacto con un vendedor llega al 61 % del recorrido (69 % en 2024); lo inicia el comprador el 79 % de las veces; el ganador ya estaba en la lista del primer día en el 95 % de los casos y el favorito previo al contacto gana alrededor del 80 %; ciclo medio de 10,1 meses (11,3 en 2024). 6sense vende datos de intención de compra. URL: https://6sense.com/report/buyer-experience/ (redirige a https://6sense.com/science-of-b2b/buyer-experience-report-2025/; 61 %, 69 %, 95 %, 80 % y 10,1 meses verificados en navegador el 14-oct-2026)
- **[Estudio] Forrester, «The State of Business Buying, 2024», nota del 4-dic-2024.** El 86 % de las compras B2B se atasca en algún momento; el 81 % de los compradores está insatisfecho con el proveedor elegido; intervienen 13 personas de media y el 89 % de las compras implica a dos o más departamentos. La nota no da muestra. URL: https://www.forrester.com/press-newsroom/forrester-the-state-of-business-buying-2024/
- **[Estudio · Vendedor] TrustRadius, «B2B Buying Disconnect» 2022.** La proporción de compradores que quiere resolver por su cuenta toda o parte de la compra pasó del 87 % (2021) a casi el 100 %; el 76 % empieza investigando solo y el 24 % contactando antes con ventas. Blog del 4-ago-2022, sin muestra. URL: https://solutions.trustradius.com/vendor-blog/optimizing-for-the-self-serve-b2b-buyer-is-table-stakes/
- **[Estudio · Vendedor] TrustRadius (HG Insights), edición 2026, 15-jul-2026.** 1.862 compradores y 444 proveedores de tecnología: el material comercial del proveedor es el recurso menos consultado; el 74 % consultó reseñas de clientes; el 47 % confía menos que hace un año en los recursos en línea. URL: https://hginsights.com/blog/trust-more-verify-everything-what-the-2026-b2b-buying-disconnect-report-says-about-where-buying-is-actually-heading/
- **[Estudio] Demand Gen Report, Content Preferences Survey 2016.** El 47 % de los compradores vio de 3 a 5 piezas de contenido antes de hablar con un comercial. Cifra vista en el resumen del buscador; el informe completo es gated. URL: https://www.demandgenreport.com/?p=3679

### Conversión de ofertas de bajo y alto compromiso

- Comparativa con metodología entre «hablar con ventas», diagnóstico, descarga, newsletter o webinar: **sin datos**. Las horquillas que publican agencias (demo 1,5-4 %, contenido 8-15 %, cuestionarios 30-45 %) no declaran muestra ni método y se contradicen entre sí.
- **[Experto] NN/g (Loranger, 2015)**: cerrar con formulario solo lo muy valioso y único, cuando la intención de compra es alta (presupuestos, consultas, formación en vídeo); el contenido de descubrimiento, abierto. URL: https://www.nngroup.com/articles/content-behind-forms/

**[Opinión] Lectura para Spiralia.** Aquí la evidencia es sólida en la dirección, aunque venga de software: el comprador llega tarde al primer contacto, con la lista hecha y el favorito decidido, y la mayoría prefiere avanzar sin comercial hasta que tiene que valorar el encaje. Para Spiralia, con ticket medio-alto y comité de 10 o más personas, la web tiene que servir a la vez a quien ya quiere hablar (CTA de alto compromiso, visible) y a quien está formando opinión o convenciendo a su comité (CTA de bajo compromiso que no exija una reunión). El dato de Gartner sobre arrepentimiento sugiere además que el comercial aporta valor en la fase de encaje, que es justo la conversación de diagnóstico que Spiralia vende.

## 2.4 Calculadoras de ROI y herramientas interactivas

- **[Estudio patrocinado] Demand Metric para ion interactive, 2014.** 185 profesionales de marketing B2B y B2C. Quienes usaban contenido interactivo dijeron que convertía «moderadamente o muy bien» en el 70 % de los casos, frente al 36 % del contenido pasivo. Es la valoración que hace el propio marketer, no una tasa de conversión medida, y lo pagó un vendedor de contenido interactivo. Fuente: Scott Brinker (cofundador de ion interactive), martech.org, 19-jun-2014. URL: https://martech.org/interactive-content-successor-landing-page/
- **[Estudio] Forrester Consulting, «Global Marketing Content Credibility Study», 3T 2019.** El 65 % de los decisores no se fía del contenido que recibe de los proveedores. Citado por Forrester en su página de metodología TEI (julio de 2022). URL: https://tei.forrester.com/go/forrester/teiofteidynamic
- **«El 65 % de los compradores ve demasiado optimistas las calculadoras de ROI de los proveedores»:** cifra circulante sin fuente primaria localizada; parece una relectura del dato anterior, que habla de contenido en general. URL donde circula: https://flowstatesales.co.uk/?p=5585
- **[Estudio] Forrester, Buyers' Journey Survey 2025** (vía Digital Commerce 360, 28-oct-2025). Forrester prevé que los compradores den más peso a datos de ROI, referencias de clientes y métricas verificadas que a la reputación de marca. Sin muestra en la fuente. URL: https://www.digitalcommerce360.com/2025/10/28/forrester-b2b-buyers-demand-proof-not-promises/amp/
- **[Estudio] Gartner, nota del 29-jul-2019 (más de 1.000 clientes B2B).** Los clientes que reciben demasiada información contradictoria, aunque sea de calidad, tienen un 153 % más de probabilidad de conformarse con una opción más pequeña de lo previsto; Gartner propone que el vendedor ayude a «dar sentido» a la información. URL: https://www.gartner.com/en/newsroom/press-releases/2019-07-29-gartner-reveals-new-b2b-sales-approach-to-win-in-toda (403; contenido vía resumen del buscador)
- **[Vendedor] Outgrow.** Afirma que sus formularios interactivos convierten de media al 47,3 % frente al 2,8 % de los estáticos, sin muestra ni método; sus casos (p. ej. un 41 % de leads sobre visitas con una calculadora) son éxitos seleccionados. URL: https://outgrow.co/blog/outgrow-vs-123formbuilder/
- **«Solo el 31 % se registraría para usar una calculadora de ROI» (atribuida a Demand Gen Report 2016):** cifra circulante sin fuente primaria localizada.
- **Pedir el email antes o después del resultado:** test A/B publicado con metodología, **sin datos**. Lo que hay son recomendaciones de vendedores de calculadoras: pedir el email tras las preguntas y antes del resultado, o enseñar un rango y pedir el email para el informe detallado (p. ej. https://www.lowcode.agency/blog/b2b-website-roi-calculator-page-how-to-build-one). NN/g (2015) aconseja demostrar valor antes de pedir datos.
- **Dato de contexto del benchmark de esta misma investigación**: ninguna de las 27 webs revisadas tiene calculadora de ROI pública; solo Mindstone ofrece un diagnóstico abierto, en beta, y pide los datos antes del informe completo (sección E del benchmark, fichas C).

**[Opinión] Lectura para Spiralia.** La idea de que las herramientas interactivas «convierten el doble» descansa en estudios pagados por quien las vende. Lo que sí está documentado es la desconfianza hacia las cifras de los proveedores y el valor de ayudar al comprador a ordenar información. Para un servicio de formación y despliegue, una calculadora de ROI con un número grande es arriesgada: el comprador no puede verificar las hipótesis y Spiralia no controla las variables. Un autodiagnóstico de madurez o de dónde está el valor, con resultado inmediato y supuestos a la vista, encaja mejor con lo que dicen Gartner y Forrester. La decisión de pedir el email antes del resultado no tiene evidencia; es una apuesta a testear.

## 2.5 Benchmarks generales de conversión

- **[Vendedor, con metodología] Unbounce, «Conversion Benchmark Report 2024».** Más de 41.000 landing pages, 464 millones de visitantes y 57 millones de conversiones; periodo jul-2023 a jul-2024 según resúmenes de terceros. Mediana de conversión de todos los sectores: 6,6 % (rango por sector de 3,8 % a 12,3 %). Servicios comerciales y profesionales: 6,1 %. Educación: 8,4 % (cursos online 18,3 %, educación superior 6,3 %; formación corporativa no desglosada). SaaS: 3,8 %. Las páginas con nivel de lectura de 5.º a 7.º curso del sistema estadounidense (lectores de 10 a 13 años) convierten al 11,1 %, un 56 % más que las de 8.º-9.º; las de nivel profesional, al 5,3 %. Es la conversión de landing pages de clientes de Unbounce (sobre todo tráfico de pago), no la de una web corporativa entera. No he podido verificar ninguna edición 2025 ni 2026: las cifras «Unbounce 2026» que circulan (4,02 %, 3,2 %) no aparecen en la web de Unbounce. URL: https://unbounce.com/conversion-benchmark-report/ · https://unbounce.com/conversion-benchmark-report/professional-services-conversion-rate/ · https://unbounce.com/conversion-benchmark-report/education-conversion-rate/
- **[Vendedor] First Page Sage, actualizado el 18-sep-2025.** Agencia SEO, datos de sus clientes entre ene-2022 y ago-2025, sin tamaño de muestra; conversión sobre visitantes únicos de toda la web. No tiene filas de consultoría, servicios profesionales ni formación corporativa. Las más próximas: educación superior 2,8 %, selección y staffing 2,9 %, servicios financieros 1,9 %, servicios de TI 1,5 %, legal 7,4 %. URL: https://firstpagesage.com/reports/b2b-conversion-rates-by-industry/
- **[Vendedor] Ruler Analytics, «Conversion Rate Benchmarks 2026», 26-may-2026.** Más de 110 millones de sesiones y 5 millones de conversiones de 13 sectores; cuenta como conversión un lead cualificado o una venta, incluidas las que se cierran fuera de la web. Media: 5,13 %. Servicios profesionales: 6,1 % (orgánico 8,1 %, pago 6,7 %, referidos 5,3 %, directo 3,1 %, email 3,1 %). Servicios B2B, año 2025: directo 2,7 %, email 2,2 %, orgánico 2,3 %, pago 3,4 %, referidos 1,6 %. Ruler vende atribución y los datos son de sus clientes. URL: https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/
- **[Vendedor] Formstack 2015:** los formularios de contacto convierten alrededor del 1 % de media (ver 2.2).

**[Opinión] Lectura para Spiralia.** Estas cifras no son comparables entre sí: cambian el denominador (sesiones, visitantes, visitas a una landing), la definición de conversión y el tipo de tráfico. Para una web corporativa de servicios B2B con tráfico mayoritariamente orgánico y directo, lo razonable es esperar conversiones de un dígito bajo sobre visitantes. Con un ticket alto y pocos leads al mes, la métrica que importa no es la conversión de la web sino el embudo completo: visita → formulario → reunión reservada → reunión celebrada → propuesta. La lectura sencilla de Unbounce sí es aplicable ya: texto claro y corto convierte más.

## 2.6 RGPD y normativa española aplicable a formularios, agenda y chat

### Base legal del formulario

- **[Normativa] RGPD, art. 5.1.c (minimización).** Los datos deben ser adecuados, pertinentes y limitados a lo necesario para la finalidad. Cada campo debe tener un uso. URL: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679
- **[Normativa] RGPD, art. 6.1.** Para responder a quien pide información o una propuesta, la base es la aplicación de medidas precontractuales a petición del interesado (6.1.b); para enviar newsletter o comunicaciones comerciales, el consentimiento (6.1.a), que en email exige además la LSSI. El interés legítimo (6.1.f) requiere ponderación documentada. Misma URL.
- **[Normativa] RGPD, art. 7 y considerando 32.** El consentimiento debe poder demostrarse, presentarse de forma claramente distinguible de otros asuntos, retirarse con la misma facilidad con que se dio y no condicionarse a la prestación de un servicio que no lo necesita (7.4). Según el considerando 32, el silencio, las casillas ya marcadas o la inacción no constituyen consentimiento. Misma URL.
- **[Normativa] TJUE, sentencia Planet49 (C-673/17), 1-oct-2019.** Una casilla premarcada que el usuario debe desmarcar para negarse no es consentimiento válido (caso de cookies). URL: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:62017CJ0673

### Información al usuario

- **[Normativa] RGPD, art. 13.** Al recoger los datos hay que informar de: identidad y contacto del responsable (y del delegado de protección de datos, si lo hay), finalidades y base jurídica, intereses legítimos si se usan, destinatarios, transferencias internacionales, plazo de conservación, derechos, derecho a reclamar ante la AEPD y si el dato es obligatorio. URL: https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679
- **[Normativa] LOPDGDD, art. 11 (información por capas).** Basta con una información básica junto al formulario (responsable, finalidad, posibilidad de ejercer derechos y, si se hacen perfiles, aviso y derecho de oposición) y un enlace directo a la información completa. URL: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- **[Normativa] AEPD, «Guía para el cumplimiento del deber de informar».** Recomienda presentar la primera capa como tabla con los epígrafes Responsable, Finalidad, Legitimación, Destinatarios y Derechos (más Procedencia si los datos no vienen del interesado). El PDF vigente aparece marcado «EN REVISIÓN». URL: https://www.aepd.es/guias/guia-modelo-clausula-informativa.pdf
- **[Normativa] AEPD, PS/00458/2023, resolución de 2024 (acuerdo de inicio del 15-ene-2024).** Multa de 3.000 € a una pyme por infringir el art. 13: sus formularios de contacto y de newsletter enlazaban a una política de privacidad de plantilla sin rellenar, con el responsable como «XXXXX». Leída en el original. URL: https://www.aepd.es/documento/ps-00458-2023.pdf

### Datos de contacto profesionales (LOPDGDD art. 19)

- **[Normativa] LOPDGDD, art. 19.** Se presume amparado en el interés legítimo el tratamiento de los datos de contacto (y cargo) de quien trabaja en una persona jurídica si se limita a lo necesario para localizarle profesionalmente y su única finalidad es mantener relaciones con la persona jurídica en la que presta servicios. Lo mismo para autónomos y profesionales liberales tratados en esa condición. URL: https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- **[Experto] Alcance discutido.** Según el análisis de Fieldfisher sobre resoluciones recientes de la AEPD, el art. 19 no ampara el envío de comunicaciones comerciales ni el marketing; para email comercial manda la LSSI. Página bloqueada (403); contenido vía resumen del buscador. URL: https://www.fieldfisher.com/es-es/locations/spain/insights/bases-datos-empresariales

### Comunicaciones comerciales por email (LSSI-CE)

- **[Normativa] LSSI-CE, art. 21.1.** Prohíbe enviar comunicaciones publicitarias por email o medio equivalente que no se hayan solicitado o autorizado expresamente. El artículo no distingue entre destinatarios particulares y profesionales. URL: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- **[Normativa] LSSI-CE, art. 21.2.** Excepción: relación contractual previa, datos obtenidos lícitamente y comunicaciones sobre productos o servicios propios similares a los contratados, ofreciendo un medio sencillo y gratuito de oposición al recoger los datos y en cada envío. Un lead que solo ha pedido información no es todavía cliente. Misma URL.
- **[Normativa] LSSI-CE, arts. 38, 39 y 43.** Enviar comunicaciones sin cumplir el art. 21 es leve (hasta 30.000 €) o grave si es masivo o insistente (de 30.001 € a 150.000 €); usar cookies sin informar ni recabar consentimiento (art. 22.2) es leve. Sanciona la AEPD. Misma URL.
- **Consecuencia práctica [Normativa + Opinión]:** la casilla de newsletter o de comunicaciones comerciales debe ir separada, sin marcar y no ser obligatoria para enviar el formulario de contacto.

### Cookies y analítica

- **[Normativa] LSSI-CE, art. 22.2.** Solo se pueden instalar cookies no exentas con consentimiento informado. URL: https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- **[Normativa] AEPD, «Guía sobre el uso de las cookies», versión actualizada en mayo de 2024 (la actualización de julio de 2023 fijó el 11-ene-2024 como fecha límite de adaptación).** En la primera capa, un botón de rechazar similar al de aceptar («si se utiliza un botón para aceptar, deberá utilizarse un botón para rechazar»); rechazar en la misma capa y al mismo nivel que aceptar; prohibido empujar a aceptar o usar colores o contrastes engañosos; en ningún caso valen las opciones premarcadas (págs. 20-23). URL: https://www.aepd.es/guias/guia-cookies.pdf · plazo: https://www.cuatrecasas.com/es/spain/propiedad-intelectual/art/entra-vigor-nuevo-criterio-aepd-uso-de-cookies
- **[Normativa] Precedente sancionador: Vueling, 2019.** 30.000 € (18.000 € tras reconocer y pagar) por un aviso de cookies que no permitía rechazar y remitía a la configuración del navegador. Una guía de cumplimiento (Legiscope) lo fecha erróneamente en 2024; conviene verificar siempre en la AEPD. URL: https://www.twobirds.com/en/insights/2019/spain/la-aepd-ha-impuesto-a-vueling-una-multa-de-30000-euros
- Sanción de la AEPD específica por casilla premarcada en un formulario web de contacto: **sin datos** (no localizada). El criterio aplicable es el del considerando 32 y Planet49.

### Transferencias internacionales (Calendly, HubSpot, Chili Piper y similares)

- **[Normativa] Decisión de adecuación UE-EE. UU. (Data Privacy Framework), Decisión de Ejecución (UE) 2023/1795, 10-jul-2023.** Permite transferir datos a empresas estadounidenses certificadas. URL: https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj
- **[Normativa] Tribunal General, Latombe c. Comisión (T-553/23), 3-sep-2025.** Desestima el recurso y mantiene el DPF. URL: https://iapp.org/news/a/european-general-court-dismisses-latombe-challenge-upholds-eu-us-data-privacy-framework
- **[Normativa] Recurso de casación C-703/25 P, presentado el 31-oct-2025.** Pendiente ante el TJUE; sin vista señalada según las fuentes de julio y septiembre de 2026. URL: https://eur-lex.europa.eu/eli/C/2025/6610/oj/eng
- **[Experto] Novedades de 2026.** El 29-jun-2026 el Tribunal Supremo de EE. UU. resolvió en *Trump v. Slaughter* que el presidente puede cesar libremente a los comisionados de la FTC, cuya independencia invoca la decisión de adecuación. noyb pidió a la Comisión el 30-jun-2026 una «retirada ordenada» del DPF y anunció litigio; el CEPD (EDPB) escribió a la Comisión el 31-jul-2026 pidiéndole que evalúe el impacto. A 17-sep-2026 el DPF sigue vigente y los despachos recomiendan tener cláusulas contractuales tipo (CCT) firmadas como respaldo. Antes, en enero de 2025, el cese de tres de los cinco miembros del PCLOB (órgano de supervisión de inteligencia) dejó al organismo sin quórum. URL: https://www.faegredrinker.com/en/insights/publications/2026/9/trump-v-slaughter-implications-of-the-us-supreme-court-ruling-for-eu-us-data-transfers-and-the-data-privacy-framework · https://btlj.org/2026/02/third-times-the-charm-the-fate-of-the-eu-u-s-data-privacy-framework/
- **[Vendedor] Situación declarada por las herramientas.** Calendly declara en su contrato de encargado estar autocertificada en el DPF (https://calendly.com/dpa); que además incluye CCT de 2021 como respaldo lo recoge una fuente secundaria (https://www.donneespersonnelles.fr/calendly-rgpd). HubSpot ofrece alojamiento de datos en la UE desde julio de 2021: https://www.hubspot.com/eu-data-centre . Chili Piper, RevenueHero y Microsoft Bookings: **sin datos verificados** en esta búsqueda. Con cualquier herramienta hace falta contrato de encargado de tratamiento (art. 28 RGPD) e informar de la transferencia en la segunda capa.

### Chat con IA

- **[Normativa] Reglamento de IA (UE) 2024/1689, art. 50.** Quien despliegue un sistema que interactúa con personas debe informarles de que hablan con una IA. Aplica desde el 2-ago-2026. URL: https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- **[Experto] Ómnibus digital del Reglamento de IA.** Aplaza las obligaciones de alto riesgo (a 2-dic-2027 y 2-ago-2028), pero no las de transparencia del art. 50; solo da hasta el 2-dic-2026 para el marcado del contenido generado por sistemas ya en el mercado. Gibson Dunn, 27-may-2026; otras fuentes lo identifican como Reglamento (UE) 2026/1744, en vigor desde el 27-jul-2026 (no verificado en el Diario Oficial). URL: https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/ · https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/

**[Opinión] Lectura para Spiralia.** El formulario de contacto de Spiralia no necesita consentimiento para responder: la base es la petición del propio usuario. Lo que sí necesita es la primera capa de información visible junto al botón, una casilla aparte y sin marcar para comunicaciones comerciales, un aviso de cookies con «Rechazar» al mismo nivel que «Aceptar» y contratos de encargado con la herramienta de agenda y el CRM. La sanción más probable para una web como esta no es millonaria, pero existe y es barata de evitar (PS/00458/2023). Para la agenda, mejor una herramienta con datos alojados en la UE o, como mínimo, DPF más CCT, por la incertidumbre abierta en 2026. Esta lectura no sustituye la revisión del responsable legal o el DPO de Spiralia.

## Síntesis: qué dice la evidencia

- **Sólida.** Responder rápido aumenta mucho la probabilidad de llegar a una conversación útil (HBR 2011, con más de 2.000 empresas auditadas y 1,25 millones de leads). Es la evidencia mejor fundada de toda la tarea, aunque sea antigua y correlacional.
- **Sólida en la dirección, de origen mayoritariamente comercial.** El comprador B2B decide gran parte de la compra antes de hablar con nadie: primer contacto al 61 % del recorrido, ganador ya en la lista del primer día en el 95 % de los casos (6sense 2025), y entre el 61 % y el 67 % prefiere comprar sin comercial (Gartner 2025 y 2026). Pero vuelve al comercial para juzgar el encaje y validar lo que le dice la IA (Gartner 2025 y mayo de 2026).
- **Débil (solo vendedores).** Ofrecer calendario justo después del formulario duplica la proporción de leads cualificados que reservan reunión: del 30-40 % al 62-67 % (Chili Piper, RevenueHero). El sesgo de muestra es fuerte, pero coincide con la evidencia de velocidad.
- **Débil (solo vendedores).** El no-show ronda el 13-16 % en clientes maduros de herramientas de agenda, con menos en enterprise (7,8 %) y más en educación (18,1 %, una sola semana). La horquilla del 20-40 % que circula no tiene fuente.
- **Moderada.** Lo que penaliza un formulario es qué se pide y cómo se etiqueta: campos sensibles (teléfono, edad, dirección), textos largos y desplegables. Un campo de cargo restó un 11,9 % en un test controlado (MarketingSherpa 2013); quitar campos útiles también puede restar (Aagaard 2015).
- **Débil.** Los formularios por pasos convierten más según Formstack, Venture Harbour y HubSpot, que venden formularios; no hay prueba independiente para formularios cortos.
- **Experto, sin datos de conversión.** El enlace mailto como único canal molesta al usuario (NN/g 2000; Silver y Hupe 2020). Los chatbots fallan fuera del guion (NN/g 2018) y revelar que son IA, ahora obligatorio, reduce su eficacia comercial (Luo et al. 2019). Para el chat en webs B2B de servicios no hay evidencia independiente.
- **Débil y sesgada.** Que el contenido interactivo y las calculadoras de ROI «conviertan el doble» viene de una encuesta patrocinada de 2014. Lo documentado es la desconfianza: el 65 % de los decisores no se fía del contenido de los proveedores (Forrester 2019). Pedir el email antes o después del resultado no tiene test publicado.
- **Normativa (firme).** Información por capas junto al formulario, consentimiento separado y sin premarcar para comunicaciones comerciales, rechazo de cookies al mismo nivel que la aceptación y aviso de IA en cualquier chat automatizado. El DPF sigue vigente, pero en 2026 tiene dos frentes abiertos (casación C-703/25 P y *Trump v. Slaughter*).

## Recomendación de CTA para Spiralia

**[Opinión apoyada en la evidencia citada.]**

**CTA principal: «Hablemos de vuestro caso», con formulario corto y reserva inmediata.** Un único CTA de alto compromiso, repetido en la cabecera, al final de cada página de servicio y en el cierre. Al enviar el formulario, en la misma pantalla aparece el calendario para reservar 30 minutos con una persona de Spiralia con nombre y foto. Motivo: la ventaja de la rapidez es la evidencia más sólida (HBR 2011) y el calendario inmediato es la forma más barata de responder en minutos con un equipo pequeño (Chili Piper y RevenueHero, con su sesgo). Si el usuario no reserva, compromiso visible de respuesta personal en el día hábil, idealmente en la primera hora, porque muchos directivos delegan la agenda en su asistente o necesitan consultar huecos con otras personas del comité.

**Campos del formulario.**
- Nombre y apellidos.
- Email de trabajo.
- Empresa.
- Tu función, como desplegable corto: Dirección general / RR. HH. / Formación y desarrollo (L&D) / Otra. Es el campo con un coste documentado (−11,9 % en MarketingSherpa 2013), pero a Spiralia le sirve para enrutar la conversación y preparar la llamada, y un desplegable de cuatro opciones es menos costoso que un texto libre.
- Opcional: «¿Qué os gustaría conseguir?», texto libre. KinderCare no perdió conversión con un campo así y ganó calidad; los textos largos obligatorios sí penalizan (Zarrella).
- Sin teléfono, sin tamaño de empresa, sin presupuesto y sin «¿cómo nos conociste?»: el tamaño se obtiene del dominio del email, el presupuesto es conversación de la reunión y el teléfono es de los campos que más penalizan (Zarrella). Un solo paso: con 4-5 campos no compensa dividir el formulario.

**Reserva de calendario: sí, después del formulario, nunca en lugar de él.** El formulario da el contexto para preparar la reunión y filtra el spam; el calendario va en el paso siguiente. Ventana de reserva corta (próximos 5-7 días hábiles: RevenueHero, 18-ago-2025, afirma que reservar con mucha antelación aumenta el no-show, aunque sin cifras), invitación con agenda de tres líneas y recordatorio automático la víspera. Herramienta: HubSpot Meetings con alojamiento en la UE si el CRM es HubSpot, o Microsoft Bookings si Spiralia trabaja en Microsoft 365 (residencia de datos por verificar); Calendly es válida con DPF y CCT. Esta elección debe confirmarla Jose, porque implica coste de licencias.

**CTA secundario: un autodiagnóstico sin reunión, con un PDF que se pueda reenviar al comité.** Para el comprador que todavía forma opinión o tiene que convencer a otros (6sense, Gartner, Forrester: 13 personas de media). Formato recomendado: 8-10 preguntas sobre adopción de IA en la organización, resultado inmediato en pantalla sin pedir datos y, opcionalmente, «recibe el informe detallado para compartir con tu equipo» con un solo campo (email de trabajo). Que la única puerta de datos sea opcional y esté después del valor es la opción coherente con NN/g y con la desconfianza documentada; pedir el email antes del resultado sería una prueba A/B, no una decisión basada en evidencia. El resultado termina con el CTA principal.

**Calculadora de ROI: no en el lanzamiento.** Si se hace más adelante, que dé rangos conservadores, enseñe cada supuesto y su fuente, y use datos de casos de Spiralia. Un número de ahorro grande sin hipótesis verificables choca con la desconfianza del 65 % hacia el contenido de proveedores (Forrester 2019).

**Newsletter: terciario, en el pie de página y al final de los artículos**, con un solo campo y su casilla de consentimiento sin marcar.

**Email: visible como texto copiable en la página de contacto y en el pie**, con mailto como comodidad y nunca como único canal (NN/g; Silver y Hupe).

**Chat: no en el lanzamiento.** Sin evidencia B2B independiente a favor, con obligación de avisar de que es IA desde el 2-ago-2026 y con un efecto documentado de rechazo al saberlo (Luo et al. 2019), el chat añade riesgo de mala primera impresión ante un CEO y carga de atención para un equipo pequeño. Excepción a valorar más adelante: un asistente de IA presentado como demostración de lo que Spiralia construye, claramente etiquetado, con salida a una persona y medido como experimento, no como canal de captación.

**Textos legales mínimos del formulario.**
1. Bajo el botón, primera capa de información básica: responsable (Spiralia, con su razón social), finalidad («responder a tu solicitud y, si lo pides, organizar una reunión»), base jurídica (tu petición: medidas precontractuales), destinatarios (proveedores de CRM y agenda como encargados, con mención a transferencias fuera de la UE si las hay), derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, y enlace directo a la política de privacidad completa (segunda capa con plazo de conservación, transferencias y derecho a reclamar ante la AEPD).
2. Casilla independiente, sin marcar y no obligatoria: «Quiero recibir novedades y contenidos de Spiralia por email. Puedo darme de baja en cualquier momento».
3. Con la base de medidas precontractuales no hace falta una casilla de «acepto la política de privacidad»; si Spiralia prefiere mantenerla por costumbre, que no sustituya a la información de la primera capa. Este punto conviene validarlo con su asesor legal.
4. Aviso de cookies con «Aceptar», «Rechazar» y «Configurar» en la primera capa, con el mismo formato para aceptar y rechazar; el calendario incrustado y la analítica no se cargan hasta que haya consentimiento, si instalan cookies no exentas.
5. Si en algún momento hay chat con IA: aviso visible de que es un asistente de IA desde el primer mensaje y opción de hablar con una persona.

**Qué medir desde el primer día para sustituir estos supuestos por datos propios:** visitantes → formularios enviados, formularios → reuniones reservadas, reservadas → celebradas, celebradas → propuestas, tiempo hasta la primera respuesta y conversión del autodiagnóstico. Con el volumen de una boutique, conviene revisar el embudo cada trimestre en lugar de esperar significación estadística en tests A/B.
