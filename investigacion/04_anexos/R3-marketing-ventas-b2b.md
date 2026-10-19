# R3 · Marketing digital y ventas B2B (2025-2026) para vender servicios de alto ticket a CEOs, CHROs y CTOs en España

Línea de research para la auditoría de la sección de IA de spiralia.es («Spiralia AI»). Fecha: 19 de octubre de 2026.

**Cómo se hizo.** Solo con búsqueda web (WebSearch). No he podido abrir los documentos originales (WebFetch no funciona en este entorno). Casi todas las cifras salen, por tanto, de notas de prensa, páginas de resumen o cobertura secundaria. No repito lo que ya está en `investigacion/01_benchmark_y_cta.md` (CTA, velocidad de respuesta, formularios, RGPD del formulario), en `02_icp_arquetipos.md` (ICP, artículo 4 del Reglamento de IA, FUNDAE) ni en `03_banco_mensajes.md`. Cuando lo cito, remito a esos documentos.

**Leyenda**

| Etiqueta | Qué significa |
|---|---|
| [Estudio] | Encuesta o análisis con muestra o método declarados (Gartner, Forrester, Edelman, papers). |
| [Vendedor] | Dato de quien vende la herramienta o el servicio que sale favorecido. Sirve como orientación, no como prueba. |
| [Secundaria] | Solo lo he visto en cobertura de terceros, no en el original. |
| [Normativa] | Texto legal o guía de una autoridad. |
| [no verificado] | No he podido confirmarlo. No usarlo en la web. |
| [Opinión] | Mi lectura aplicada a Spiralia. |

**Advertencia de alcance.** Casi toda la evidencia cuantitativa viene de compradores de software, o de muestras globales y estadounidenses. No hay estudios sólidos de cómo compra formación y despliegue de IA un comité de dirección español. Todo lo que aplico a Spiralia es extrapolación y va marcado como [Opinión].

---

## 0. Resumen ejecutivo: diez conclusiones

1. **El primer lector de la web ya no siempre es una persona: muchas veces es una IA que investiga para ella.** [Estudio] El 45 % de los compradores B2B usó IA generativa en una compra reciente (Gartner, marzo de 2026), y el 94 % dice usar IA en algún momento del proceso (Forrester, enero de 2026). [Vendedor] En software, el 51 % ya empieza la búsqueda en un chatbot más a menudo que en Google, y los chatbots son la primera fuente que influye en la lista corta (G2, 2025-2026). **Implicación:** la web tiene que ser fácil de leer, citar y resumir para ChatGPT, Gemini, Copilot y Perplexity. Hoy es una sola página, sin datos estructurados y con `noindex` (prototipo).
2. **El comprador investiga solo, pero no decide solo.** [Estudio] El 67 % prefiere comprar sin comercial, pero el 69 % quiere contrastar con una persona lo que le dice la IA (Gartner, 2026). En el grupo de compra hay 13 personas internas y 9 influyentes externos, y cuando el producto lleva IA el grupo se duplica (Forrester, 2026). El 68 % de los equipos de compra tiene conflictos internos dañinos, con el triple de retrasos y siete veces más arrepentimiento (Gartner, 2026). **Implicación:** la web tiene que armar a quien defiende la compra dentro (el *champion*) con material que pueda reenviar al CFO, a IT, a Legal y al comité de empresa.
3. **«Pruebas, no promesas» es el tono del mercado en 2026.** [Estudio] Forrester titula así su informe anual: los compradores tienen aversión al riesgo, validan con colegas y expertos y usan pilotos para reducir ese riesgo. Rumbo (3 horas, entregable claro) encaja como «prueba de bajo riesgo». Los tres testimonios vacíos (`[PLACEHOLDER]`) son hoy el agujero más caro de la página.
4. **La queja de que la web es «demasiado de Ana» tiene una respuesta clara: la web habla de Spiralia y LinkedIn reparte la voz entre varias personas.** [Vendedor] En LinkedIn, los perfiles personales consiguen entre 2 y 9 veces más alcance o interacción que las páginas de empresa, según quién lo mida. Las páginas de empresa, en cambio, se comparten mucho más. [Opinión] El modelo que propongo es un «coro, no un solista»: 3 voces visibles (Ana, Jose y un FDE o profesor) que siempre firman «de Spiralia». La prueba, el método y los datos viven en la web y en la página de empresa. Así se reduce además el riesgo que más teme un CEO al contratar una boutique: depender de una sola persona.
5. **La visibilidad en buscadores de IA se gana sobre todo fuera de la web propia.** [Estudio/Vendedor] El 84 % de las citas de ChatGPT, Claude y Gemini viene de medios ganados (Muck Rack, mayo de 2026). Las menciones de la marca en la web son el factor más correlacionado con aparecer en AI Overviews (Ahrefs, 75.000 marcas). LinkedIn está entre los dominios más citados para consultas profesionales (Semrush y Profound, 2026). [Opinión] Lo que más mueve la aguja para Spiralia no es un `llms.txt`: es un informe propio con datos de sus 50.000 alumnos, que la prensa económica y de RR. HH. cite.
6. **Google lo dice claro: no hay trucos para la IA.** [Secundaria] Su guía de mayo de 2026 dice que la base es el «contenido no commodity» basado en experiencia propia, y que `llms.txt`, trocear el contenido o un «schema para IA» no dan ventaja. Los datos estructurados sí ayudan a entender la página, siempre que coincidan con el texto visible. La regla de Spiralia de que cada cifra lleve fuente y fecha (`cifras.toml`) es justo lo que premia este entorno: es una ventaja que hay que explotar.
7. **Medir es la prioridad cero: hoy la web no mide nada.** Hay una forma de hacerlo sin romper la promesa del pie, «Esta página no usa cookies»: analítica sin cookies y alojada en la UE, que según la guía de la AEPD (enero de 2024) puede quedar exenta de consentimiento si cumple sus condiciones. [Opinión] Esa frase del pie transmite seriedad y clase, y por eso no conviene sacrificarla por el retargeting web. Es mejor hacer ABM en LinkedIn con listas de empresas, sin etiqueta en la web.
8. **ABM ligero sí, ABM con software no.** [Opinión apoyada en evidencia débil] Bastan una lista de 50 a 100 cuentas, el mapa de su comité de compra y acciones por rol (CEO, CHRO, L&D, CIO, CFO). Encima, anuncios de los mejores posts de las voces (Thought Leader Ads) a esas empresas. La identificación de empresas por IP está en zona gris en la UE: no la recomiendo sin el visto bueno del DPO.
9. **Las mesas redondas presenciales con directivos son el canal de mayor confianza para una boutique.** [Vendedor] Las mesas presenciales superan a las *masterclasses* en asistencia de directivos, y la clave es ofrecer «conversaciones que no encuentran en otro sitio» (Ortus Club, 2026). [Opinión] Una «Mesa Rumbo» trimestral de 10-12 directivos, con un cliente como ponente, alimenta a la vez la web (contenido), LinkedIn (voces), la prensa (datos) y las ventas (reuniones).
10. **La boutique gana a las Big Four con seniority, rapidez, especialización e independencia del proveedor, no atacándolas.** [Secundaria] Hay señales de que las boutiques ganan cuota (el 45 % de las grandes consultoras dice perder negocio frente a ellas), aunque su tasa de éxito en concursos directos contra las grandes sigue siendo baja. Deloitte es cliente, y Ana y Jose vienen de McKinsey, KPMG y EY-Parthenon. [Opinión] El posicionamiento correcto no es «anti Big Four». Es «el equipo senior y el ingeniero en la misma mesa, con la IA que ya tienes».

---

## 1. Cómo compra hoy un comprador B2B (2025-2026)

### 1.1 Lo que dicen los grandes estudios

| Fuente | Dato | Tipo |
|---|---|---|
| Gartner, 9-mar-2026 (646 compradores B2B, ago-sep 2025) | El **67 %** prefiere una experiencia sin comercial (era el 61 % en la encuesta anterior). El **45 %** usó IA en una compra reciente. | [Estudio] [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) |
| Gartner, 20-may-2026 (misma encuesta) | El **69 %** contrasta con un comercial lo que le dice la IA. De media consultan **7 fuentes** de información por compra. | [Estudio] [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights) |
| Gartner, 25-jun-2025 (632 compradores) | El **73 %** evita activamente a los proveedores que le envían mensajes irrelevantes. Para juzgar si una solución encaja en su empresa, sí busca al comercial. | [Estudio] [Gartner](https://gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience) |
| Forrester, *State of Business Buying 2026* (casi 18.000 compradores) | **13** personas internas y **9** influyentes externos por decisión. Si la compra incluye IA generativa, **el grupo se duplica**. Compras está en la decisión en el **53 %** de los casos, desde el principio. Los pilotos son clave para reducir el riesgo. | [Estudio] [Forrester](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/) · [Business Wire](https://www.businesswire.com/news/home/20260121478240/en/Forresters-2026-Buyer-Insights-GenAI-Is-Upending-B2B-Buying-As-Leaders-Face-Mounting-Pressure-To-Justify-Every-Dollar-Spent) |
| Forrester, blog del 21-ene-2026 | El **94 %** usa IA en el proceso de compra, pero la IA de búsqueda da respuestas incompletas que generan desconfianza. El comprador valida con colegas, expertos y analistas. Lema: «*Risk-averse buyers demand proof, not promises*». | [Estudio] [Forrester](https://forrester.com/blogs/state-of-business-buying-2026) · [Predicciones 2026](https://www.forrester.com/blogs/predictions-2026-trust-will-be-the-ultimate-currency-for-b2b-buyers/) |
| 6sense, *Buyer Experience Report 2025* (unos 4.000 compradores) | El primer contacto con el proveedor llega al **61 %** del recorrido (69 % en 2024). Ciclo medio de **10,1 meses**. El ganador ya estaba en la lista del primer día en el **95 %** de los casos (verificado en el documento 01). El informe 2026 se presenta el 4-nov-2026: aún no es público. | [Estudio · Vendedor] [Frost & Sullivan](https://www.frost.com/wp-content/uploads/2026/07/6sense-Writeup.pdf) · [preestreno 2026](https://events.b2bmarketing.net/abmconference/session/3766131/the-buyer-has-changed-has-your-abm) |
| Gartner, *Tech Buying Behavior* 2026 | El **68 %** de los equipos de compra vive conflictos internos dañinos, con **3 veces** más retrasos y **7 veces** más arrepentimiento. Las compras reactivas generan 1,5 veces más conflicto. Las iniciativas que lidera el CIO alcanzan consenso un 56 % más que las del CFO y tienen 2,2 veces más probabilidad de acabar en un buen acuerdo que las del CEO. | [Estudio] [Gartner](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai) |
| Gartner, *Customer Confidence* (2019) | Dar al comprador información que le ayude a completar sus «trabajos de compra» (*buyer enablement*) multiplica por **3** la probabilidad de una compra de calidad y sin arrepentimiento. | [Estudio, antiguo] [Gartner](https://www.gartner.com/en/sales/insights/customer-confidence) |
| Edelman y LinkedIn, 2025 (casi 2.000 directivos) | Más del **40 %** de las operaciones se atasca por desalineación interna. Los «compradores ocultos» (finanzas, legal, compras, operaciones) tienen poca o ninguna relación con ventas (**71 %**), y el **95 %** es más receptivo a un proveedor con buen *thought leadership*. El **79 %** apoyaría propuestas de quien publica contenido de calidad de forma constante. | [Estudio, vía resumen] [Edelman](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report) · [Demand Gen Report](https://www.demandgenreport.com/industry-news/news-brief/marketers-need-to-gear-content-to-hidden-b2b-buyers-edelman-linkedin/49901/) |

**IA y software (G2), con cautela porque son compradores de software, no de servicios:**
- 2025 (1.100 decisores): los chatbots de IA son la primera fuente que influye en la lista corta (17,1 %), por delante de las webs de reseñas (15,1 %), las webs de los proveedores (12,8 %), los colegas (8,9 %) y los comerciales (8,8 %). [Vendedor] [G2](https://research.g2.com/cmos-2025-buyer-behavior-report-research-g2)
- Abril de 2026 (1.076 compradores): el **51 %** empieza a buscar en un chatbot más a menudo que en Google (antes, 29 %), y el **69 %** acabó eligiendo un proveedor distinto del que esperaba por lo que le dijo la IA. [Vendedor] [G2](https://company.g2.com/news/g2-research-the-answer-economy) · [Demand Gen Report](https://demandgenreport.com/industry-news/news-brief/half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-g2/52737)
- Julio de 2026: el 49 % dice que un CFO vetó una compra ya aprobada en los últimos 12 meses. [Vendedor, Secundaria] [Gartner/G2 vía resumen](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai)

**Contexto de urgencia del ICP CEO** (útil para el copy «a lo Monge Malo», con prudencia):
- Dataiku y Harris Poll, 2026 (unos 900 CEOs): en torno al **80 %** (78 % en el titular) cree que su puesto está en riesgo si la IA no da resultados antes de que acabe 2026. El 62 % dice que su consejo le presiona para enseñar resultados medibles. [Vendedor] [Dataiku](https://www.dataiku.com/company/news/global-ai-confessions-report-ceo-edition-2026)
- España: en la encuesta Perspectivas España 2026 de KPMG y CEOE (1.238 empresarios), cuatro de cada cinco ponen la eficiencia operativa como principal beneficio de la IA. Según Adigital, solo el 10 % tiene un retorno definido y solo el 11 % ha escalado la IA a toda la organización. [Secundaria] [KPMG](https://kpmg.com/es/es/sala-prensa/notas-prensa/2026/05/andalucia-apuesta-tecnologia-ganar-competitividad.html) · [Ecosistema Startup (Adigital)](https://ecosistemastartup.com/?p=94840)
- Gartner prevé que en 2028 los agentes de IA intermediarán más de 15 billones de dólares de compras B2B. [Secundaria] [Digital Commerce 360](https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/) La cifra del «90 % de las compras» que circula está [no verificada].

**Servicios profesionales (Hinge Research Institute, estudios antiguos y sin fecha clara):** cuando buscan una firma nueva, los compradores preguntan a conocidos en torno al 71 % de las veces. La búsqueda online es la segunda vía, y más alta en consultoría de gestión (27 %). La experiencia especializada pesa más que las relaciones y que el precio. [Estudio de vendedor, antiguo] [Hinge](https://hingemarketing.com/?p=3827)

### 1.2 Qué significa para Spiralia [Opinión]

La web tiene que servir a **cuatro lectores** a la vez:

| Lector | Qué necesita | Qué hay hoy | Qué falta |
|---|---|---|---|
| **La IA que investiga** por encargo del directivo | Texto claro, definiciones en una frase, cifras con fuente, páginas con URL propia y datos estructurados | Texto en HTML estático (bien), cifras con fuente (muy bien) | Una URL por tema, JSON-LD, `robots.txt` revisado en el dominio raíz y menciones fuera de la web |
| **El directivo que valida** (CEO, CHRO) | Pruebas, una persona senior con la que contrastar y un primer paso de bajo riesgo | Rumbo, casos ING, Deloitte y CCEP, «Hablas con quien lo va a hacer» | Testimonios reales, páginas de caso y un equipo plural |
| **El *champion*** que tiene que convencer al comité | Material reenviable: resumen de una página, respuestas para el CFO, IT y Legal | «Guárdalo para tu comité» en el diagnóstico (buena idea) | Un kit para el comité y una versión del resultado del diagnóstico que se pueda compartir |
| **Los compradores ocultos** (CFO, IT, Legal, comité de empresa, compras) | Riesgos cubiertos: datos, seguridad, Reglamento de IA, coste y relación con la plantilla | FAQ «Preguntas del comité» (buena base) | Una ficha por rol y respuestas más concretas para compras |

---

## 2. Visibilidad en buscadores de IA (GEO/AEO)

### 2.1 Lo que se sabe

- **Google AI Mode está en España desde el 7 de octubre de 2025**, en español y gratis. [Secundaria] [Última Hora](https://www.ultimahora.es/noticias/tecnologia-videojuegos/2025/10/08/2486443/modo-busqueda-google-llega-espana.html) · [Xataka](https://www.xataka.com/robotica-e-ia/google-lanza-espana-su-modo-ia-ello-nueva-forma-realizar-busquedas-web-asi-puedes-activarlo/amp)
- **Los clics orgánicos caen cuando aparece una respuesta de IA.** Según Ahrefs (300.000 palabras clave, abril de 2025), el primer resultado pierde un 34,5 % de CTR; en su actualización de diciembre de 2025 estima un 58 % (cifra modelada). Seer Interactive mide un −61 % en consultas informativas con AI Overview desde mediados de 2024 (3.119 consultas de 42 organizaciones). Google discute estas lecturas. [Estudio · Vendedor] [PPC Land (Ahrefs)](https://ppc.land/googles-ai-summaries-now-swallow-58-of-clicks-that-once-went-to-websites/) · [Seer](https://www.seerinteractive.com/news/search-engine-land-shares-aio-impact-on-ctr-cites-latest-seer-interactive-findings)
- **La guía de Google** («AI features and your website»): no hay requisitos especiales para la IA. Las páginas tienen que poder rastrearse y tener texto, y los datos estructurados deben coincidir con el texto visible. El tráfico que llega desde las funciones de IA se cuenta en Search Console dentro de «Web». [Normativa de plataforma] [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)
- **La guía de mayo de 2026 sobre AI Overviews y AI Mode** pide «contenido único, no commodity», basado en experiencia propia. Según la cobertura que he encontrado, dice que `llms.txt`, trocear el contenido, reescribirlo para la IA o un «schema para IA» no dan ventaja, y que crear páginas para cada variante de una consulta puede tratarse como abuso de contenido a escala. [Secundaria] [PPC Land](https://ppc.land/googles-new-ai-search-guide-challenges-everything-seos-thought-they-knew/) · [Search Engine Journal](https://www.searchenginejournal.com/googles-official-advice-on-optimizing-for-ai-overviews-ai-mode/547341/)
- **`llms.txt`:** lo usa en torno al 10 % de los dominios y no se ha encontrado correlación con recibir más citas (estudio de SE Ranking sobre 300.000 dominios). Google no lo usa y ningún gran proveedor de IA se ha comprometido a usarlo. [Secundaria] [Nytro SEO](https://nytroseo.com/does-llms-txt-help-2026-evidence) · [OrganiKPI](https://organikpi.com/blog/distribution/llms-txt-adoption-impact/)
- **ChatGPT:** para aparecer en sus respuestas con búsqueda hay que permitir **OAI-SearchBot** en `robots.txt`. Es independiente de **GPTBot**, el rastreador para entrenar modelos, que se puede bloquear sin perder visibilidad. Los cambios tardan unas 24 horas en aplicarse. [Normativa de plataforma] [OpenAI](https://developers.openai.com/docs/gptbot)
- **Bing Webmaster Tools tiene desde febrero de 2026 un informe de rendimiento en IA** que cuenta las citas en Copilot y en los resúmenes de Bing. No da clics. [Secundaria] [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039) · [Search Influence](https://www.searchinfluence.com/blog/bing-ai-performance-report-copilot-citations/)
- **De dónde sacan las IA lo que citan:**
  - Muck Rack (mayo de 2026, más de 25 millones de enlaces): el **84 %** de las citas de ChatGPT, Claude y Gemini viene de medios ganados (prensa, publicaciones académicas, webs públicas, enciclopedias). Lo pagado no llega al 0,3 % y el periodismo supone el 27 %. [Vendedor] [AI Magazine](https://aimagazine.com/globenewswire/3290268)
  - Ahrefs (75.000 marcas): el factor más correlacionado con aparecer en AI Overviews son las **menciones de la marca en la web** (correlación de 0,664), por delante de los enlaces con el nombre de la marca (0,527) y de las búsquedas de la marca (0,392). Son correlaciones moderadas. [Vendedor] [Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)
  - Semrush (89.000 URL de LinkedIn citadas, ene-feb 2026): LinkedIn aparece en el **11 %** de las respuestas (14,3 % en ChatGPT Search, 13,5 % en AI Mode, 5,3 % en Perplexity). Se citan sobre todo artículos de 500 a 2.000 palabras con estructura clara, y el 95 % de lo citado es contenido original. El reparto entre perfiles personales y páginas de empresa por plataforma está [no verificado]. [Vendedor] [Semrush](https://www.semrush.com/blog/linkedin-ai-visibility-study/) · [PPC Land](https://ppc.land/linkedin-ranks-2-in-ai-citations-what-89k-urls-reveal-about-b2b-visibility/)
  - Profound: LinkedIn es el dominio más citado en consultas profesionales en seis motores. [Vendedor] [Profound](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search)
- **Lo único con método académico:** el artículo GEO (Aggarwal et al., KDD 2024) mide que añadir estadísticas, citas textuales y fuentes puede aumentar hasta un 40 % la visibilidad de un texto en respuestas generativas. El efecto varía por temática. [Estudio] [arXiv](https://arxiv.org/abs/2311.09735v3)
- **El tráfico que llega desde la IA convierte mejor que el orgánico**, pero cuánto mejor depende del estudio: de 1,3 a 23 veces. Similarweb da 11,4 % frente a 5,3 %. El «23 veces» es de una sola empresa (Ahrefs). [Secundaria] [DEV (recopilación)](https://dev.to/mr_manushukla/ai-search-converts-23x-44x-or-215x-what-the-2026-studies-mean-for-your-geo-budget-5h0k) · [CMSWire](https://www.cmswire.com/digital-experience/does-ai-search-really-beat-organic-not-yet-shopify-says/)
- **Las preguntas frecuentes ya no dan resultados enriquecidos en Google:** se limitaron en 2023 y, según la cobertura, el soporte se retira en junio de 2026. `FAQPage` sigue siendo un tipo válido de schema.org que ayuda a entender la página. [Normativa de plataforma · Secundaria] [Google 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes) · [Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)

### 2.2 Qué hacer en esta web [Opinión]

1. **Pasar de una página a un pequeño árbol de páginas con URL propia** (en producción, bajo `spiralia.es/ia/`). Mantener la landing larga y añadir:
   - `/ia/metodo-spiral/`, `/ia/rumbo/`, `/ia/fde/` (qué es un Forward Deployed Engineer, explicado para un CEO);
   - `/ia/casos/ing/`, `/ia/casos/deloitte/`, `/ia/casos/ccep/`;
   - `/ia/reglamento-ia-articulo-4/` (qué exige tras la reforma Ómnibus, con fuente);
   - `/ia/para-direccion/`, `/ia/para-personas/`, `/ia/para-formacion/`;
   - `/ia/informe-2027/`, cuando exista (ver 8.2).

   Cada página abre con un párrafo que responde en dos o tres frases, del tipo «Spiralia es… / Rumbo es… / Un FDE es…». Son las frases que una IA puede citar. Nada de páginas por variante de consulta: eso es lo que Google llama abuso.
2. **Datos estructurados JSON-LD que coincidan con el texto visible:**
   - `Organization` (Spiralia, con `@id` común a todo spiralia.es, logo y `sameAs` a LinkedIn y otros perfiles oficiales);
   - `WebSite`;
   - `Service` para cada formato (Rumbo, Programa por perfil, Despliegue en tu equipo);
   - `Person` para cada miembro visible del equipo, con `worksFor` Spiralia;
   - `FAQPage` para «Preguntas del comité» (no da resultado enriquecido, pero ordena el contenido);
   - `Article` con `datePublished` para cada caso;
   - `BreadcrumbList` en las subpáginas.

   Hoy no hay ninguno.
3. **`robots.txt` y sitemap en el dominio raíz.** En producción, la web vive en `spiralia.es/ia/`, así que el `robots.txt` que cuenta es el del WordPress de spiralia.es. Hay que comprobar que no bloquea Googlebot, Bingbot ni OAI-SearchBot, que declara el sitemap de `/ia/` (o enviarlo en Search Console y en Bing Webmaster Tools) y decidir qué hacer con GPTBot (entrenamiento). Esa decisión es de negocio, no de SEO. Quitar el `noindex` del prototipo al publicar.
4. **Hacer citables las cifras propias.** `cifras.toml` ya obliga a poner fuente y fecha. Añadir en cada página de caso una frase autosuficiente, por ejemplo: «En ING España, los usuarios activos semanales de IA pasaron del 66 % al 92 % tras el programa de Spiralia (medición interna del grupo ING, 2026)». Es justo lo que el artículo GEO y la guía de Google premian: datos propios con su fuente.
5. **Consistencia de la entidad «Spiralia».** Usar la misma descripción de una línea en la web, la página de empresa de LinkedIn, el perfil de Google, los directorios y las notas de prensa. Que los posts de las voces digan siempre «Spiralia» (ver sección 3): las menciones de la marca son la señal más correlacionada con aparecer.
6. **`llms.txt`: opcional y en último lugar.** Cuesta poco y no hay evidencia de que sirva. Si se hace, iría en la raíz de spiralia.es, que gestiona el WordPress.
7. **Medir la presencia en IA** (sección 9): un panel mensual de 25 preguntas que haría el ICP, revisadas a mano o con una herramienta (Semrush, Ahrefs Brand Radar, Profound…), más el informe de IA de Bing y el tráfico que llega desde `chatgpt.com`, `perplexity.ai` y `copilot.microsoft.com`. Ejemplos de preguntas:
   - «mejor empresa de formación en IA para directivos en España»;
   - «cómo conseguir que la plantilla use Copilot»;
   - «qué exige el artículo 4 del Reglamento de IA»;
   - «forward deployed engineer en España».

---

## 3. LinkedIn y *thought leadership*: marca de empresa frente a marca personal

### 3.1 Evidencia

- **Alcance e interacción.** Los datos varían mucho según quién mida, pero la dirección es la misma:
  - Metricool, 2026: los perfiles personales tienen un 2,60 % de interacción frente al 1,60 % de las páginas de empresa, con impresiones por post parecidas. Las páginas de empresa se comparten mucho más: 1,16 veces por post frente a 0,08. [Vendedor] [Metricool](https://metricool.com/linkedin-trends/)
  - Ordinal (más de 219.000 posts): 9.849 impresiones por post en perfiles personales frente a 1.289 en páginas de empresa. [Vendedor] [Ordinal](https://www.tryordinal.com/blog/linkedin-content-strategy)
  - DSMN8 (500.000 posts de empleados): unas 9 veces más interacción en los posts personales. [Vendedor] [DSMN8](https://dsmn8.com/blog/the-social-media-managers-guide-to-the-linkedin-algorithm-in-2026/)
  - El alcance orgánico de una página de empresa ronda el 1,6 % de sus seguidores. [Secundaria] [Agility PR](https://www.agilitypr.com/pr-news/branding-reputation/the-company-page-is-dead-long-live-the-expert/)
- **Thought Leader Ads** (anuncios que promocionan el post de una persona). LinkedIn dice que tienen 1,7 veces más CTR y 1,6 veces más interacción que el anuncio de imagen. ZenABM (161.256 anuncios de 211 empresas) da una mediana de CTR del 2,68 % frente al 0,42 %, con un coste por clic de 2,29 $ frente a 13,23 $. Ojo: en sus propios datos, más CTR **no** predice más *pipeline* (correlación negativa de −0,17). [Vendedor] [ZenABM](https://zenabm.com/blog/tla-benchmarks/)
- **El *thought leadership* abre la puerta.** En el estudio de Edelman y LinkedIn de 2024 (3.500 decisores):
  - el 90 % sería más receptivo a quien publica contenido de calidad de forma constante;
  - el 75 % investigó un proveedor que no tenía en mente después de leer una pieza suya;
  - el 70 % llegó a cuestionar a su proveedor actual por una pieza de otro;
  - el 73 % lo ve como una base más fiable que el material comercial para juzgar a una empresa [Secundaria, no verificado en el original].

  [Estudio] [Edelman 2024 (PDF)](https://www.edelman.com/sites/g/files/aatuss191/files/2024-02/_2024%20Edelman-LinkedIn%20B2B%20Thought%20Leadership%20Impact%20Report%20Final.pdf) · [Chief Marketer](https://chiefmarketer.com/report-how-b2b-thought-leadership-influences-out-of-market-buyers) · [Third Door Media](https://thirddoormedia.com/news/who-are-you/)

  En 2025, el 86 % de los compradores ocultos prefería contenido que cuestione sus supuestos [Secundaria]. [Content Grip](https://www.contentgrip.com/edelman-linkedin-thought-leadership-report/)
- **Los expertos visibles se pagan mejor.** En el estudio *Visible Expert* de Hinge (unos 1.028 compradores, hacia 2014), los compradores declaran que pagarían entre 2 y 13 veces la tarifa base por un experto reconocido. La razón principal es su capacidad de resolver problemas (31 %), no su fama. El 62 % de los expertos visibles ayuda mucho a la marca de su firma. [Vendedor, antiguo] [Hinge](https://hingemarketing.com/library/article/visible-value-how-firms-benefit-from-visible-experts) · [BD+C](https://www.bdcnetwork.com/home/blog/55151844/why-aec-firms-should-be-cultivating-visible-experts)
- **Regla 95:5** (John Dawes, Ehrenberg-Bass, con el B2B Institute de LinkedIn). Una empresa cambia de proveedor de media cada cinco años, así que solo en torno al 5 % de las cuentas está comprando en un trimestre dado. La marca tiene que estar en la cabeza del 95 % restante antes de que entre en el mercado. Es un modelo, no una ley. [Experto] [Marketing Science](https://marketingscience.info/news-and-insights/the-955-rule-why-b2b-growth-starts-long-before-the-purchase)
- **Vídeo en LinkedIn.** Los posts de vídeo de CEOs han crecido un 68 % en dos años y las visualizaciones de vídeo un 36 % interanual (datos de LinkedIn). BrandLink, el vídeo de creadores y medios patrocinado, da un 130 % más de vídeos vistos hasta el final. [Vendedor] [LinkedIn](https://news.linkedin.com/2025/helping-brands-expand-their-reach-in-new-ways-with-video-from-to) · [eMarketer](https://www.emarketer.com/content/linkedin-bets-on-creator-trust-capture-b2b-video-dollars)
- **Newsletters de página de empresa:** cada número avisa a los suscriptores. [Secundaria] [Social Media Today](https://www.socialmediatoday.com/news/linkedin-adds-newsletters-for-company-pages-updated-campaign-manager-navig/620830/)

### 3.2 Cuándo conviene cada una [Opinión]

| Objetivo | Marca personal (voces) | Marca de empresa (Spiralia) |
|---|---|---|
| Alcance y conversación con CEOs y CHROs | **Sí**: los perfiles personales llegan y conversan más | Complementa |
| Confianza y relación 1:1 | **Sí**: la gente compra a personas | — |
| Prueba (casos, cifras, método) | Difunde | **Sí**: tiene que vivir en la web y en la página de empresa, con fuente |
| Permanencia (sobrevive a cambios de equipo) | No | **Sí** |
| Escala sin depender de una persona | No | **Sí** |
| Citas en IA | Artículos largos de las voces (ChatGPT, AI Mode) | Página de empresa (Perplexity, según una fuente [no verificado]) y la web |
| Se comparte dentro del comité | Poco | **Sí**: los posts de empresa se comparten más |
| Contratación y credenciales de alumnos | — | **Sí** |

**La respuesta a «la web es demasiado de Ana»:**
- **En la web manda la marca.** El sujeto de las frases es Spiralia («formamos», «construimos»). El equipo pasa de 2 personas a 4-8 (dirección, FDE, profesores de la UFV, directores de programa), cada una con su línea y su enlace a LinkedIn. El CTA lleva al «equipo de Spiralia AI», no a una persona (ver 6.2).
- **En LinkedIn mandan las voces, y todas suman a la marca.** Un coro de 3 voces:
  - **Ana**, para CEOs: estrategia y cuenta de resultados;
  - **Jose**, para CHRO y L&D: adopción, formación y Reglamento de IA;
  - **un FDE o profesor**, para CTO/CIO: cómo se construye y se gobierna un agente.

  Cada perfil dice «… en Spiralia» en su titular, enlaza a la página de empresa y menciona Spiralia en el texto. Así las menciones de la marca crecen, que es la señal que correlaciona con aparecer en IA (Ahrefs).
- **La página de empresa es el centro:** casos, credenciales de los alumnos, newsletter mensual y clips del vídeo del hero en 4:5 (ya está pensado para el feed).
- **Argumento comercial:** un CEO que contrata a una boutique teme depender de una sola persona. Un equipo visible y plural responde a esa objeción sin decirla en voz alta.

**Cadencia de partida [Opinión]:** 2 posts por semana y voz, más 1 artículo largo al mes por voz (de 800 a 1.500 palabras, con estructura clara y datos con fuente: es el formato que más citan las IA). La página de empresa publica 3 veces por semana y lanza la newsletter mensual. Los 2-3 mejores posts del mes se promocionan como Thought Leader Ads a la lista de cuentas (sección 4).

---

## 4. ABM (marketing basado en cuentas) para una boutique

### 4.1 Evidencia
- Los datos de retorno del ABM son autodeclarados y patrocinados (Momentum ITSMA, 2024: el 81 % dice que da más retorno que otras acciones; estudio patrocinado por Demandbase). Forrester (2024) vio que solo la mitad de los programas mide el impacto. [Secundaria · Vendedor] [recopilación](https://christopholivierconsulting.com/account-based-marketing-statistics/)
- LinkedIn permite segmentar por lista de empresas, con un mínimo de unos 300 miembros por audiencia según las guías de proveedores (hay que comprobarlo en Campaign Manager). Con emails de trabajo, la coincidencia es del 70-85 %. [Vendedor] [ZenABM](https://zenabm.com/blog/linkedin-ads-minimum-audience-size) · [GrowthSpree](https://www.growthspreeofficial.com/blogs/linkedin-matched-audiences-b2b-2026)
- Identificar empresas por su IP (Dealfront, Leadfeeder…): el proveedor se apoya en el interés legítimo, pero hay voces críticas y autoridades alemanas activas. No he encontrado ninguna resolución clara. [Vendedor · Secundaria] [Leadfeeder](https://help.leadfeeder.com/en/articles/7207530-privacy-gdpr-summary) · [ConsentStack](https://www.consentstack.io/vendors/dealfront)

### 4.2 ABM ligero para Spiralia [Opinión]
1. **Lista de 50 a 100 cuentas:** grandes empresas españolas y filiales de multinacionales, priorizando los sectores donde ya hay prueba (banca, servicios profesionales, gran consumo) y las empresas que ya tienen licencias de Copilot, ChatGPT o Gemini (señal de compra: «he firmado las licencias»).
2. **Mapa del comité de compra de cada cuenta en el CRM:** CEO, CHRO, L&D, CIO/CTO, CFO y, cuando aplique, comité de empresa. Forrester dice que con IA el grupo se duplica, así que hay que contar con IT y Riesgos desde el principio.
3. **Acciones por rol:**

   | Rol | Qué recibe |
   |---|---|
   | CEO | Invitación a la Mesa Rumbo y el post de Ana sobre «el 6 % que captura valor» |
   | CHRO | El caso ING (satisfacción de 4,7 frente a 3,2) y la guía del artículo 4 |
   | L&D | Un ejemplo de programa |
   | CIO | La ficha «cómo construimos dentro de tu entorno» |
   | CFO | La ficha «cómo medimos el antes y el después» |

4. **Niveles:** 1:1 para las 10 primeras (un *briefing* sectorial personalizado en PDF, enviado por una persona), 1:pocos por sector (una página por sector en la web y una mesa redonda sectorial) y 1:muchos con Thought Leader Ads a la lista de empresas.
5. **Sin identificación de empresas por IP** mientras el DPO no lo valide. Además, rompería la frase «Esta página no usa cookies» si el *script* las usa.

---

## 5. Contenido interactivo: el diagnóstico

### 5.1 Evidencia
- Las cifras de conversión de los diagnósticos y *quizzes* vienen de proveedores: por ejemplo, un 6,2 % para herramientas interactivas frente a un 3,8 % para un PDF con formulario, atribuido a Demand Gen Report 2025 [no verificado]. No hay estudios independientes para consultoría. [Vendedor] [Brixon](https://brixongroup.com/en/b2b-lead-magnets-compared-gated-pdf-vs-interactive-tool-which-strategy-will-deliver-better-results-in) · [Digital Applied](https://www.digitalapplied.com/blog/lead-magnet-conversion-benchmarks-2026-b2b-data-guide/)
- En el documento 01 ya está documentado que ninguna de las 27 webs analizadas tiene calculadora de ROI, y que la idea de que «lo interactivo convierte el doble» procede de una encuesta de 2014.
- Gartner (*buyer enablement*): lo que ayuda a «crear consenso» y a «validar» multiplica la probabilidad de una buena compra. [Estudio] [Gartner](https://www.gartner.com/en/sales/insights/customer-confidence)

### 5.2 Qué hacer [Opinión]
El diagnóstico actual (8 preguntas, resultado en pantalla, sin pedir datos) va en la buena dirección. Lo mejoraría así:
1. **El resultado, convertido en material para el comité:** un PDF o una página imprimible con la marca Spiralia, el punto de partida, tres siguientes pasos y «qué preguntaría vuestro CFO, IT y Legal», que se genere en el propio navegador, sin pedir datos.
2. **Un enlace para compartir el resultado** que lleve las respuestas codificadas en la URL, sin datos personales. Así el *champion* puede mandarlo al comité y cada uno ve lo mismo.
3. **«Envíanoslo» a un buzón de equipo** (ia@ o hola@), no a ana.iza@.
4. **Medir el embudo del diagnóstico:** cuántos lo empiezan, cuántos lo acaban, qué nivel sale y cuántos hacen clic en Rumbo después.
5. **Más adelante**, con datos agregados y anónimos de los diagnósticos, se puede mostrar «cómo estás frente a empresas de tu tamaño» y, con email opcional, un *benchmark* sectorial. No antes de tener muestra suficiente.

---

## 6. Prueba social, casos y flujo de reserva

### 6.1 Casos y prueba social
- Forrester 2026: «pruebas, no promesas»; los compradores validan con colegas y expertos. [Estudio] [Forrester](https://forrester.com/blogs/state-of-business-buying-2026)
- El 57 % de los profesionales de marketing B2B elige los casos de éxito como su formato principal (dato de quien produce el contenido, no de quien compra). En 2024, el 51 % de los compradores decía que el contenido era demasiado genérico (38 % en 2023). [Estudio] [Demand Gen Report 2025](https://www.demandgenreport.com/blog/the-2025-demand-generation-benchmark-survey-scaling-personalization-optimizing-operations-tying-strategy-to-revenue-in-2025/49804/) · [Demand Gen Report 2024](https://www.demandgenreport.com/resources/navigating-the-attention-economy-via-snack-able-shareable-content/)

**En la web [Opinión]:**
1. **Sustituir los tres `[PLACEHOLDER]`** por testimonios con nombre, cargo y empresa: idealmente, el sponsor de ING (CHRO o director del programa), la responsable de L&D de Deloitte y el sponsor de CCEP. Si no pueden salir con nombre, mejor quitarlos que dejar huecos.
2. **Una página por caso** con estructura fija: contexto → reto → qué hicimos (SPIRAL) → resultado con fecha y fuente → cita del sponsor → qué viene después. Y una frase-resumen citable (ver 2.2).
3. **«Referencias bajo petición»**: ofrecer, en la conversación posterior a Rumbo, una llamada con un cliente. Es la validación entre colegas que piden Forrester y Hinge.
4. **Fichas para los compradores ocultos** dentro de «Preguntas del comité» o como PDF:
   - CFO: cómo se mide el antes y el después, y qué cuesta en tiempo;
   - IT y Seguridad: dónde viven los datos y con qué herramientas se trabaja;
   - Legal: artículo 4 del Reglamento de IA y documentación;
   - comité de empresa: transparencia y criterios de uso;
   - Compras: formatos con alcance cerrado.

### 6.2 Reserva y velocidad de respuesta (complementa el documento 01)
La evidencia (responder en la primera hora, calendario justo después del formulario, recordatorio la víspera) ya está en `01_benchmark_y_cta.md`. Novedades para 2026 y para esta web:
- **Lo que se dice en esa conversación importa más que nunca:** el 69 % de los compradores busca al comercial para contrastar lo que le dijo la IA (Gartner, 2026). La llamada de 30 minutos tiene que aportar criterio (*sense-making*), no una presentación de la empresa. [Estudio]
- **Despersonalizar los canales sin perder la cercanía [Opinión]:**
  - Microsoft Bookings con una página «Spiralia AI» de **varios anfitriones**: Ana para CEO y comité, Jose para Personas y Formación, quien toque para CTO;
  - el buzón **ia@spiralia.es** en lugar de ana.iza@ en todos los sitios (cierre, diagnóstico, `noscript`, `reserva/`, aviso legal);
  - mantener el texto «¿Lo gestiona tu asistente?», que es excelente para directivos;
  - mantener «Hablas con quien lo va a hacer», pero con caras del equipo.
- **Compromiso de respuesta interno:** respuesta personal en menos de una hora hábil. Correo de confirmación con agenda, quién asistirá y una lectura previa (el caso más parecido a su sector). Recordatorio la víspera. Después de Rumbo, resumen escrito en 48 horas, que es el documento que el *champion* reenvía.

---

## 7. Vídeo

### 7.1 Evidencia
- Según la cobertura del informe de Wyzowl 2026, el 91 % de las empresas usa vídeo y en torno al 82 % dice tener buen retorno (otras fuentes dan el 92 %). [Secundaria] [ClickMinded](https://www.clickminded.com/video-marketing-statistics/)
- Vídeo personal en la prospección: «hasta 3-5 veces más respuestas» (Vidyard). [Vendedor, no verificado] [Vidyard](https://www.vidyard.com/?p=297713)
- LinkedIn: el vídeo crece y los posts de vídeo de CEOs, también (ver 3.1).
- En el documento 01 ya está anotado que el vídeo del hero suele ser decorativo y que un vídeo que explique es un hueco en el mercado.

### 7.2 Qué hacer [Opinión]
1. **Hero:** la película de fondo para la marca (lo trabaja otra línea). En la web, siempre con subtítulos o texto encima, porque se reproduce sin sonido.
2. **Un vídeo explicativo de Rumbo, de 60 a 90 segundos,** con imágenes reales de una sesión con permiso, debajo del bloque de formatos. Responde a «¿qué pasa en esas 3 horas?».
3. **Testimonios en vídeo de 30 a 45 segundos** (sponsor de ING o Deloitte, si dan permiso).
4. **Clips en 4:5 y 1:1 para LinkedIn**, cortados de la película y de las mesas redondas.
5. **Vídeo personal 1:1 en ventas:** tras una petición de Rumbo, un vídeo de 60 segundos de quien hará la sesión.
6. **Privacidad:** alojar los vídeos en la propia web o en un servicio sin cookies. Un vídeo de YouTube estándar pone cookies y rompe la frase del pie.

---

## 8. Imanes de contacto (*lead magnets*) para directivos y newsletter

### 8.1 Evidencia
- Los directivos valoran el contenido que cuestiona sus supuestos y revela retos que no ven (Edelman y LinkedIn, 2025). [Secundaria]
- El debate entre contenido con formulario y sin formulario se apoya casi solo en opiniones de agencias. El consenso práctico es abrir casi todo y pedir datos solo a cambio de investigación original. [Vendedor] [Blend B2B](https://www.blendb2b.com/blog/gated-vs-ungated-content)
- En email, las aperturas ya no son fiables: Apple Mail Privacy Protection precarga los píxeles y supone entre el 49 % y el 58 % de las aperturas registradas, según la fuente. En listas de grandes empresas, los filtros de seguridad hacen clic en los enlaces y pueden inflar el CTR entre un 10 % y un 20 %. [Vendedor] [BounceZero](https://bouncezero.io/email-open-rate-guide-2026) · [Prospeo](https://prospeo.io/s/b2b-email-click-through-rates)

### 8.2 Propuesta, por orden de valor [Opinión]
1. **Informe anual insignia, por ejemplo «La IA en el trabajo en España 2027»,** construido con datos propios y agregados de los programas: uso antes y después, satisfacción y casos identificados por área. Spiralia tiene una muestra que nadie más tiene (50.000 alumnos). Resumen abierto en la web, PDF completo con email opcional y nota de prensa a la prensa económica y de RR. HH. Es contenido no commodity (Google), medio ganado (Muck Rack) y menciones de marca (Ahrefs) a la vez. **Requisito:** que ING, Deloitte, CCEP y el resto autoricen el uso agregado y anónimo, y que la metodología se publique.
2. **Un *briefing* para el comité de 8-10 páginas, abierto:** qué exige el artículo 4 tras la reforma Ómnibus, cinco preguntas que te hará el consejo, una plantilla de gobierno de agentes (quién propone, quién decide, quién responde) y cómo medir el antes y el después.
3. **Un ejemplo de programa para L&D** (ya existe el CTA «Pide un ejemplo de programa»): anonimizado y descargable.
4. **Newsletter mensual «Notas para el comité»:** como newsletter de la página de empresa en LinkedIn y por email, con alta en el pie de la web, casilla sin marcar y doble confirmación. Una idea, un dato con fuente y un caso por número.
5. **Evitar el ebook genérico**: es lo que el 51 % de los compradores ya percibe como «demasiado genérico».

---

## 9. Medición y analítica respetuosa con el RGPD

### 9.1 Marco
- **AEPD, guía de cookies para herramientas de medición de audiencia (enero de 2024).** La medición puede quedar exenta de consentimiento si cumple todas estas condiciones:
  - su única finalidad es medir la audiencia del propio sitio;
  - se hace en nombre exclusivo del editor;
  - produce solo estadísticas anónimas;
  - no se cruza con otros datos, no se cede a terceros y no permite seguir a la persona por otras webs;
  - se informa en la política de privacidad;
  - las cookies duran como máximo 13 meses y los datos se conservan como máximo 25.

  Si falla una sola condición, hace falta consentimiento. [Normativa] [Finreg360](https://finreg360.com/alerta/la-aepd-publica-la-guia-uso-de-cookies-para-herramientas-de-medicion-de-audiencias/) · [ECIJA (PDF)](https://files.griddo.ecija.com/ecija-aedp-cookies-audiencias.pdf)
- **La reforma de cookies del «Ómnibus Digital» sigue atascada** a mediados de octubre de 2026: el Consejo no tiene mandato de negociación (la votación prevista el 11 de octubre no se celebró) y el Parlamento no tiene posición. Siguen vigentes las reglas actuales. [Secundaria] [Acompli](https://acompli.ie/news/digital-omnibus-gdpr-cookies-status-september-2026/) · [PPC Land](https://ppc.land/eu-council-draft-cuts-cookie-consent-re-ask-wait-to-four-months/)
- **Microsoft Clarity exige consentimiento** para las visitas del EEE, Reino Unido y Suiza desde el 31 de octubre de 2025. Sin consentimiento no pone cookies y limita las grabaciones y los embudos. [Normativa de plataforma] [Microsoft Learn](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management)
- **La etiqueta Insight de LinkedIn necesita consentimiento previo en la UE** (es la lectura de varias guías; LinkedIn cambió su flujo de consentimiento en el EEE tras la resolución de la autoridad irlandesa de octubre de 2024). [Secundaria] [FlexyConsent](https://flexyconsent.com/blog/linkedin-insight-tag-consent-integration-guide/) · [Microsoft, informe DMA de LinkedIn](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/presentations/Microsoft_DMA_Compliance_Report_LinkedIn_Section_2_Annex.pdf)
- La CNIL francesa pasó de una lista de herramientas aprobadas a la autoevaluación. Matomo publica la suya y tiene un modo que desactiva lo incompatible con la exención. Es una declaración del proveedor, no una certificación. [Vendedor] [Matomo](https://matomo.org/faq/how-do-i-configure-matomo-without-tracking-consent-for-french-visitors-cnil-exemption/) · [PPC Land](https://ppc.land/french-data-regulator-updates-cookie-exemption-rules-for-websites/)

### 9.2 Qué instalar y qué medir en esta web [Opinión, validar con el DPO]
- **Herramienta:** analítica sin cookies, alojada en la UE (Plausible, Matomo configurado sin cookies o similar), con IP anonimizada y sin cruces. Así se mantiene «Esta página no usa cookies» o, como mucho, se ajusta a «solo medimos visitas de forma anónima». **No** instalar Clarity, GA4 ni la etiqueta de LinkedIn sin un gestor de consentimiento con «Rechazar» al mismo nivel que «Aceptar».
- **Eventos que hay que medir:**
  - clics en el CTA según dónde están (hero, «Para ti», formatos, cierre, navegación);
  - clic en «Reserva Rumbo»;
  - llegada a la página de gracias de Bookings (configurar la redirección o usar UTM);
  - copiar el email, en la ruta del asistente;
  - diagnóstico: inicio, fin, nivel resultante y clic posterior en Rumbo;
  - descargas (kit del comité, *briefing*, ejemplo de programa);
  - pestaña de perfil elegida (CEO, Personas, Formación): dice qué ICP llega;
  - profundidad de lectura por sección;
  - vídeo: inicio, 50 % y final;
  - cambio de idioma;
  - alta en la newsletter.
- **Atribución declarada:** campo opcional «¿Cómo nos has conocido?» en Bookings o en el formulario, con opciones como LinkedIn (¿de quién?), recomendación, ChatGPT u otra IA, Google, evento o prensa. Recoge lo que la analítica no ve: mensajes privados, reenvíos y respuestas de IA.
- **UTM en todo lo que se publica:** posts de cada voz (`utm_source=linkedin&utm_medium=social&utm_campaign=voz-ana`), newsletter y firmas de email.
- **Search Console y Bing Webmaster Tools** (incluido su informe de IA) desde el primer día de producción.
- **CRM:** registrar cada oportunidad desde la reserva hasta la firma, con su origen.

### 9.3 Retargeting [Opinión]
Con tráfico de boutique, una audiencia de visitantes de la web difícilmente llega al mínimo de unos 300 miembros, y además exige etiqueta y consentimiento. **Mejor no hacer retargeting web al principio:** segmentar en LinkedIn por **lista de empresas** (ABM, sin etiqueta en la web) y por **personas que han interactuado** con los posts y vídeos de la página de empresa, que LinkedIn gestiona dentro de su plataforma. Si más adelante se activa la etiqueta Insight, hacerlo con gestor de consentimiento, excluir a los clientes actuales y limitar la frecuencia. Subir listas de contactos exige base jurídica: consultarlo con el DPO.

---

## 10. Email y *nurturing*

- **Legal (ya en el documento 01):** comunicaciones comerciales solo con consentimiento o relación previa (art. 21 de la LSSI) y casilla sin marcar.
- **Medir clics y respuestas, no aperturas** (Apple MPP). En listas de grandes empresas, descontar los clics de los filtros de seguridad.
- **Secuencias [Opinión]:**
  - **Tras pedir Rumbo:** confirmación con agenda y lectura previa → recordatorio → tras la sesión, resumen escrito en 48 horas → a los 7 días, el caso más parecido → a los 21 días, invitación a la Mesa Rumbo.
  - **Tras descargar el *briefing* o el informe** (si hay consentimiento): 3 emails en 3 semanas (un dato, un caso, una invitación) y después la newsletter mensual.
- **Tono:** escrito por una persona con nombre, firmado «equipo de Spiralia AI», texto plano y una sola petición por email.

---

## 11. Eventos y mesas redondas con directivos

### 11.1 Evidencia
- Ortus Club (análisis de 2.839 eventos para directivos): las mesas redondas presenciales superan a las *masterclasses* en casi 10 puntos de asistencia. Desayuno, comida y cena funcionan igual (en torno al 68-69 %), y la asistencia virtual ha caído desde 2020. Su informe de 2026 insiste en ofrecer «conversaciones que los directivos no encuentran en otro sitio». [Vendedor] [Ortus Club](https://www.ortusclub.com/?p=71417) · [OpenPR](https://www.openpr.com/news/4588581/new-research-finds-executive-attendance-is-becoming-more)
- Los eventos de mayor retorno son los menos escalables. [Experto/Vendedor] [Directive](https://directiveconsulting.com/blog/blog-b2b-event-marketing/)

### 11.2 Propuesta: «Mesa Rumbo» [Opinión]
- **Formato:** trimestral, de 10 a 12 directivos del mismo perfil (CEOs o CHROs), en Madrid o Barcelona, desayuno de 90 minutos con regla de Chatham House. Un cliente como ponente (el sponsor de ING, por ejemplo) y un dato inédito del informe.
- **Invitación:** se nombra a la persona invitada y se anuncian plazas reales, nunca una escasez inventada. Un coanfitrión que aporte autoridad sin competir: la UFV, una escuela o un partner tecnológico.
- **Después:** un resumen sin atribuciones en la web y en LinkedIn (con permiso), un clip corto y un seguimiento 1:1 en 7 días con una propuesta de Rumbo.
- **Para L&D, a escala:** un webinar o LinkedIn Live trimestral, por ejemplo «Cómo medir el uso real, no las horas».
- **En la web:** un bloque o página de «Próxima Mesa Rumbo» con fecha, tema y «Solicita invitación».

---

## 12. Cómo compite una boutique con las Big Four

### 12.1 Evidencia (débil y con intereses)
- Según Management Today, el 45 % de las grandes consultoras dice perder negocio frente a boutiques, y las boutiques con IA atraen capital privado. Pero las boutiques tienen tasas de éxito «anémicas» cuando compiten directamente con las grandes (encuesta de UpSlide de 2025). [Secundaria] [Management Today](https://www.managementtoday.co.uk/challenger-management-consultancies-poised-exceptional-growth-big-four-arent-worried-–-yet/management-consultancy/article/1947899)
- Las boutiques se atribuyen como ventajas la implicación senior y los mejores resultados (CMap, encuesta propia). [Vendedor] [CMap](https://www.cmap.io/blog/how-boutique-consultancies-are-actually-beating-the-big-firms)
- Presión sobre las grandes firmas: PwC redujo su plantilla global en 5.600 personas en el último año y bajan las incorporaciones de recién graduados. [Secundaria] [Resultsense](https://www.resultsense.com/news/2026-05-28-ai-consulting-big-four-reckoning/)
- Hinge: el comprador elige por experiencia especializada y reputación más que por precio. [Vendedor, antiguo]

### 12.2 Palancas para Spiralia [Opinión]
1. **Seniority garantizada:** «Hablas con quien lo va a hacer» es el mejor activo frente a la pirámide de las grandes firmas. Hay que demostrarlo con caras: equipo visible, FDE con nombre.
2. **Rapidez y alcance cerrado:** Rumbo en 3 horas, propuesta en pocos días (fijar un plazo real) y formatos con nombre, duración y entregable.
3. **Independencia del proveedor:** «con la IA que ya tiene tu empresa: Copilot, ChatGPT, Claude o Gemini». Las grandes firmas suelen tener alianzas con fabricantes concretos [no verificado caso a caso].
4. **Especialización:** solo adopción y despliegue de IA, con datos propios de 50.000 alumnos.
5. **Rigor académico:** profesores del Grado en IA de la UFV.
6. **Prueba que vale doble:** Deloitte, una Big Four, eligió a Spiralia para formar a 13.000 personas. Usarlo con mucho tacto y solo con su permiso explícito para esa lectura.
7. **No atacar:** Deloitte es cliente y el equipo viene de McKinsey, KPMG y EY-Parthenon. El mensaje es «el equipo senior y el ingeniero en la misma mesa, hablando tu idioma de negocio», no «las grandes no saben».

### 12.3 Palancas de persuasión aplicadas al funnel, con límites éticos [Opinión]

| Palanca | Cómo se aplica | Límite |
|---|---|---|
| Urgencia (estilo Monge Malo) | El artículo 4 se aplica desde febrero de 2025. Solo el 6 % captura valor (McKinsey). Presión del consejo (Dataiku). «Cada trimestre cuenta» | Solo con datos con fuente. Nada de cuentas atrás falsas |
| Escasez | Plazas de la Mesa Rumbo y capacidad de FDE por trimestre | Solo si es real |
| Prueba social | ING, Deloitte, CCEP, 50.000 alumnos, testimonios con nombre | Con permiso y con fecha |
| Autoridad | UFV, trayectoria en consultoría estratégica, informe propio | Repartida en el equipo, no en una persona |
| Reciprocidad | Diagnóstico sin datos, *briefing* abierto, kit para el comité | No pedir email para lo básico |
| Compromiso y coherencia | Pasos pequeños: diagnóstico → kit → Rumbo → programa | Cada paso tiene que tener valor por sí mismo |
| Unidad | «Hablamos el idioma del negocio» y «hemos estado al otro lado de la mesa» | — |
| Aversión a la pérdida | «La inteligencia se compra. La ventaja se despliega.» y el «¿y el lunes?» | Sin alarmismo sobre empleo |
| Visualizar el éxito (estilo Apple) | «Lo que te llevas» y el antes y después de cada perfil | Mostrar resultados medidos, no promesas |

---

## 13. Lista priorizada: prácticas aplicables A LA WEB

Impacto y esfuerzo estimados [Opinión]. P0 = antes de publicar en producción; P1 = primer trimestre; P2 = después.

| # | Práctica | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|
| W1 | **Analítica sin cookies (UE) + eventos clave + campo «¿Cómo nos has conocido?»** (sección 9.2). Hoy no se mide nada. | Alto | Bajo | **P0** |
| W2 | **Despersonalizar canales:** buzón ia@spiralia.es en cierre, diagnóstico, `noscript` y `reserva/`; Bookings de equipo con varios anfitriones; equipo visible de 4 a 8 personas. Responde a la queja n.º 1 y al riesgo de depender de una persona. | Alto | Bajo | **P0** |
| W3 | **Testimonios reales** en lugar de los tres `[PLACEHOLDER]` (o quitar el bloque si no hay permiso). | Alto | Medio (permisos) | **P0** |
| W4 | **JSON-LD** (Organization, WebSite, Service, Person, FAQPage y Article para casos) + revisar el `robots.txt` raíz de spiralia.es (OAI-SearchBot, Bingbot) + sitemap en Search Console y Bing + quitar `noindex`. | Medio-alto | Bajo | **P0** |
| W5 | **Kit para el comité:** resultado del diagnóstico imprimible y con enlace para compartir, más fichas para CFO, IT, Legal, comité de empresa y Compras en «Preguntas del comité». | Alto | Medio | **P0-P1** |
| W6 | **Páginas de caso** (ING, Deloitte, CCEP) con estructura fija y una frase citable con fuente y fecha. | Alto | Medio | **P1** |
| W7 | **Árbol de URLs con respuesta al inicio** (método, Rumbo, FDE, Reglamento de IA, una por perfil) para buscadores e IA. | Alto | Medio-alto | **P1** |
| W8 | **Vídeo explicativo de Rumbo (60-90 s)** y testimonios en vídeo, con subtítulos y alojados sin cookies. | Medio-alto | Medio | **P1** |
| W9 | **Newsletter «Notas para el comité»:** alta en el pie, casilla sin marcar y doble confirmación. | Medio | Bajo | **P1** |
| W10 | **Bloque o página de «Próxima Mesa Rumbo»** con solicitud de invitación. | Medio | Bajo | **P1** |
| W11 | **Informe anual con datos propios:** resumen web abierto y PDF con email opcional. | Muy alto | Alto | **P1-P2** |
| W12 | **Páginas por sector** con su prueba (banca, servicios profesionales, gran consumo) para ABM 1:pocos. | Medio | Medio | **P2** |
| W13 | **Pruebas rápidas de mensaje** con 5-8 personas del ICP (test de 5 segundos, entrevistas) en lugar de A/B: con poco tráfico, un A/B no llega a ser significativo. | Medio | Bajo | **P2** |
| W14 | **`llms.txt`** en la raíz (opcional: barato y sin efecto demostrado). | Bajo | Bajo | **P2** |
| W15 | **Gestor de consentimiento + etiqueta Insight de LinkedIn** solo si se lanza retargeting web, a costa de perder «Esta página no usa cookies». | Medio | Medio | **P2 / no por ahora** |
| — | **No hacer:** chat con IA, calculadora de ROI pública, identificación de empresas por IP sin DPO, páginas por variante de consulta, ebooks genéricos. | — | — | — |

## 14. Lista priorizada: EL FUNNEL alrededor de la web (LinkedIn, email, eventos, ventas)

| # | Práctica | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|
| F1 | **Coro de 3 voces en LinkedIn** (Ana para CEOs, Jose para CHRO y L&D, un FDE o profesor para CTO/CIO): 2 posts por semana y voz, 1 artículo largo al mes, siempre mencionando Spiralia y con UTM. | Alto | Medio (constancia) | **P0** |
| F2 | **Compromiso de respuesta (< 1 hora hábil) y secuencia de reserva:** confirmación con agenda y lectura previa, recordatorio la víspera y resumen escrito 48 horas después de Rumbo. | Alto | Bajo | **P0** |
| F3 | **Lista ABM de 50-100 cuentas y mapa de su comité de compra en el CRM**, con acciones por rol. | Alto | Medio | **P0-P1** |
| F4 | **Página de empresa como centro:** casos, clips 4:5 de la película, credenciales de alumnos y newsletter mensual de la página. | Medio-alto | Bajo | **P1** |
| F5 | **Mesa Rumbo trimestral** (10-12 directivos, cliente ponente) y seguimiento 1:1 en 7 días. | Alto | Medio | **P1** |
| F6 | **Thought Leader Ads** sobre los 2-3 mejores posts del mes, segmentados por lista de empresas. Medir por cuentas que avanzan, no por CTR. | Medio | Medio (presupuesto) | **P1** |
| F7 | **Informe anual y plan de prensa** (prensa económica y de RR. HH., pódcast y foros sectoriales) para ganar medios y menciones. | Muy alto | Alto | **P1-P2** |
| F8 | **Credenciales de alumnos en LinkedIn con la marca Spiralia** (ya está en el copy): «promociones» y comunidad. | Medio | Bajo | **P1** |
| F9 | **Panel mensual de 25 preguntas en IA** (ChatGPT, AI Mode, Copilot, Perplexity) e informe de IA de Bing. | Medio | Bajo | **P1** |
| F10 | **Vídeo personal 1:1 en el seguimiento comercial.** | Medio | Bajo | **P2** |
| F11 | **Webinar o LinkedIn Live trimestral para L&D.** | Medio | Medio | **P2** |
| F12 | **Coanfitriones y partners** (UFV, escuelas, fabricantes) para eventos e informe. | Medio | Medio | **P2** |
| F13 | **Referencias de clientes bajo petición** (llamada entre colegas) como paso formal tras Rumbo. | Alto | Bajo | **P1** |

---

## 15. Qué medir (KPIs)

**Métricas principales [Opinión]:**
- **Reuniones de Rumbo celebradas con cuentas objetivo por trimestre.**
- **Pipeline cualificado (€) originado o influido** por la web, LinkedIn y los eventos.

| Nivel | KPI | Fuente | Nota |
|---|---|---|---|
| Web | Visitas y visitantes únicos; % que llega a «Pruebas» y al cierre | Analítica sin cookies | Por idioma y por fuente (UTM) |
| Web | CTR del CTA por ubicación; pestaña de perfil elegida | Eventos | Dice qué ICP llega y qué bloque convierte |
| Web | **Tasa de reserva** (reservas / visitantes) | Bookings + analítica | Orientación: en servicios de alto ticket se citan conversiones del 0,5-1 % [Vendedor, sin fuente primaria]. Comparar contra uno mismo |
| Web | Diagnóstico: inicio → fin → clic en Rumbo; descargas del kit del comité | Eventos | Señal de *champion* |
| Ventas | **Tiempo hasta la primera respuesta** (mediana); % respondido en menos de 1 hora | CRM o buzón | Objetivo: menos de 1 hora hábil |
| Ventas | Reservas → celebradas (no-show) → propuesta → firma; ciclo en días; ticket medio | CRM | El no-show en enterprise ronda el 8 % según RevenueHero (documento 01) [Vendedor] |
| Ventas | Cobertura del comité: n.º de roles del comité en contacto por oportunidad | CRM | Con IA el grupo se duplica (Forrester) |
| Atribución | Respuestas a «¿Cómo nos has conocido?» (LinkedIn y de quién, IA, recomendación, evento, prensa) | Formulario | Lo que la analítica no ve |
| Presencia en IA | % de las 25 preguntas en las que Spiralia aparece o es citada, por motor | Panel mensual | Tendencia, no valor absoluto |
| Presencia en IA | Citas en Copilot (Bing); visitas desde chatgpt.com, perplexity.ai y copilot | Bing Webmaster Tools + analítica | — |
| Marca | Búsquedas de «Spiralia» y «Spiralia IA» | Search Console | Indicador de salud de la marca |
| Marca | Menciones en medios y en webs de terceros | Alertas o herramienta | Correlaciona con aparecer en IA |
| LinkedIn | Impresiones e interacción por voz; % de audiencia Director+ y de sectores objetivo; conversaciones privadas iniciadas | LinkedIn Analytics | No optimizar por *likes* |
| LinkedIn | Seguidores de la página de empresa del ICP; suscriptores de la newsletter | LinkedIn | — |
| ABM | Cuentas objetivo con interacción (2 o más personas del comité); cuentas con reunión; cuentas con propuesta | CRM + LinkedIn | Medir por cuentas, no por leads |
| Email | Clics y respuestas por envío; bajas | Herramienta de email | **No** usar las aperturas (Apple MPP) |
| Eventos | Invitados → confirmados → asistentes → reuniones en 30 días → oportunidades | CRM | Asistencia de referencia en torno al 68 % de confirmados [Vendedor, Ortus] |

**Cadencia:** panel mensual de una página (web, ventas, LinkedIn, presencia en IA) y revisión trimestral del *pipeline* por cuenta y del coro de voces.

---

## 16. Pendiente de verificar antes de usar cifras en la web

- Los porcentajes de G2 son de compradores de **software**: no deben presentarse como datos de compradores de formación o consultoría.
- Edelman 2024, «73 %»: solo lo he visto en cobertura secundaria.
- El reparto entre perfiles personales y páginas de empresa en las citas de LinkedIn por motor (Semrush): [no verificado].
- El contenido literal de la guía de Google de mayo de 2026 sobre `llms.txt` y «schema para IA»: solo por cobertura secundaria.
- Los mínimos de audiencia de LinkedIn (unos 300): comprobarlos en Campaign Manager.
- Los multiplicadores de conversión del tráfico de IA (de 1,3 a 23 veces): varían según el estudio. No usarlos en la web.
- La aplicación de la exención de la AEPD a la herramienta concreta que se elija: validar con el DPO.
- El informe 6sense 2026 se publica el 4-nov-2026: revisar entonces si cambian las cifras del 61 % y el 95 %.

## 17. Fuentes principales

**Comportamiento del comprador**
- Gartner, [67 % prefiere comprar sin comercial (9-mar-2026)](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) · [69 % valida la IA con un comercial (20-may-2026)](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights) · [61 % y 73 % (25-jun-2025)](https://gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience) · [Tech Buying Behavior 2026](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai) · [Customer Confidence](https://www.gartner.com/en/sales/insights/customer-confidence)
- Forrester, [State of Business Buying 2026 (nota de prensa)](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/) · [blog](https://forrester.com/blogs/state-of-business-buying-2026) · [Predicciones 2026](https://www.forrester.com/blogs/predictions-2026-trust-will-be-the-ultimate-currency-for-b2b-buyers/)
- 6sense 2025 vía [Frost & Sullivan](https://www.frost.com/wp-content/uploads/2026/07/6sense-Writeup.pdf)
- G2, [Buyer Behavior 2025](https://research.g2.com/cmos-2025-buyer-behavior-report-research-g2) · [Answer Economy 2026](https://company.g2.com/news/g2-research-the-answer-economy) · [Demand Gen Report](https://demandgenreport.com/industry-news/news-brief/half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-g2/52737)
- Edelman y LinkedIn, [2025](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report) · [2024 (PDF)](https://www.edelman.com/sites/g/files/aatuss191/files/2024-02/_2024%20Edelman-LinkedIn%20B2B%20Thought%20Leadership%20Impact%20Report%20Final.pdf)
- Hinge, [How Buyers Buy](https://hingemarketing.com/?p=3827) · [Visible Experts](https://hingemarketing.com/library/article/visible-value-how-firms-benefit-from-visible-experts)
- Dataiku y Harris Poll, [CEO Edition 2026](https://www.dataiku.com/company/news/global-ai-confessions-report-ceo-edition-2026)

**Buscadores de IA**
- Google, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · cobertura de la guía de mayo de 2026: [PPC Land](https://ppc.land/googles-new-ai-search-guide-challenges-everything-seos-thought-they-knew/) · [Search Engine Journal](https://www.searchenginejournal.com/googles-official-advice-on-optimizing-for-ai-overviews-ai-mode/547341/)
- OpenAI, [rastreadores (OAI-SearchBot y GPTBot)](https://developers.openai.com/docs/gptbot)
- Muck Rack, [Generative Pulse](https://aimagazine.com/globenewswire/3290268) · Ahrefs, [75.000 marcas](https://ahrefs.com/blog/ai-overview-brand-correlation/) · Semrush, [LinkedIn en las respuestas de IA](https://www.semrush.com/blog/linkedin-ai-visibility-study/) · Profound, [LinkedIn en consultas profesionales](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search)
- Aggarwal et al., [GEO (KDD 2024)](https://arxiv.org/abs/2311.09735v3)
- Ahrefs y Seer sobre el CTR: [PPC Land](https://ppc.land/googles-ai-summaries-now-swallow-58-of-clicks-that-once-went-to-websites/) · [Seer](https://www.seerinteractive.com/news/search-engine-land-shares-aio-impact-on-ctr-cites-latest-seer-interactive-findings)
- `llms.txt`: [Nytro SEO](https://nytroseo.com/does-llms-txt-help-2026-evidence) · Bing AI Performance: [Search Engine Land](https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039) · AI Mode en España: [Última Hora](https://www.ultimahora.es/noticias/tecnologia-videojuegos/2025/10/08/2486443/modo-busqueda-google-llega-espana.html)

**LinkedIn y vídeo**
- [Metricool 2026](https://metricool.com/linkedin-trends/) · [Ordinal](https://www.tryordinal.com/blog/linkedin-content-strategy) · [ZenABM, Thought Leader Ads](https://zenabm.com/blog/tla-benchmarks/) · [LinkedIn, BrandLink](https://news.linkedin.com/2025/helping-brands-expand-their-reach-in-new-ways-with-video-from-to) · [Regla 95:5](https://marketingscience.info/news-and-insights/the-955-rule-why-b2b-growth-starts-long-before-the-purchase)

**Privacidad y medición**
- AEPD, guía de medición de audiencia, vía [Finreg360](https://finreg360.com/alerta/la-aepd-publica-la-guia-uso-de-cookies-para-herramientas-de-medicion-de-audiencias/) y [ECIJA](https://files.griddo.ecija.com/ecija-aedp-cookies-audiencias.pdf)
- [Estado del Ómnibus Digital](https://acompli.ie/news/digital-omnibus-gdpr-cookies-status-september-2026/) · [Microsoft Clarity y el consentimiento](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management) · [Etiqueta Insight de LinkedIn](https://flexyconsent.com/blog/linkedin-insight-tag-consent-integration-guide/) · [Matomo y la exención de la CNIL](https://matomo.org/faq/how-do-i-configure-matomo-without-tracking-consent-for-french-visitors-cnil-exemption/)

**Eventos, boutique y email**
- [Ortus Club](https://www.ortusclub.com/?p=71417) · [Management Today](https://www.managementtoday.co.uk/challenger-management-consultancies-poised-exceptional-growth-big-four-arent-worried-–-yet/management-consultancy/article/1947899) · [CMap](https://www.cmap.io/blog/how-boutique-consultancies-are-actually-beating-the-big-firms) · [BounceZero (Apple MPP)](https://bouncezero.io/email-open-rate-guide-2026)
