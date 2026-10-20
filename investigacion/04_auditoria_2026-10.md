# Auditoría de la web de Spiralia AI

**Para:** Jose Garza, director de AI & Digital Transformation de Spiralia.
**Fecha:** 19 de octubre de 2026.
**Qué se ha auditado:** la landing de Spiralia AI (`/home/user/spiralia-ia-web`) en ES y EN, en escritorio y en móvil. Hay dos versiones:
- **V1:** el prototipo del 14 de octubre (commit `003dec3`).
- **V2:** la versión de hoy (commit `e01bd8f`). Ya trae el vídeo a pantalla completa, la barra transparente, el menú móvil, el CTA fijo en móvil, la tipografía corregida y el copy sin nombres propios.

Las recomendaciones apuntan a V2 y cada hallazgo dice si ya está resuelto.

**Actualización del 20-oct:** la versión con WebGL, cristal, iconos 3D y scroll suavizado ya está en el repositorio. Pasó una revisión adversarial final (visual, código y accesibilidad, copy y afirmaciones). Los hallazgos confirmados están corregidos y verificados, salvo los que dependían de Jose. El 20-oct Jose confirmó que todas las empresas han autorizado el uso de sus logos y cifras, confirmó las cifras y promesas pendientes y pidió que el aviso legal siga el criterio de spiralia.es. Por eso las alertas de autorización de las secciones 2.8 y 7.2 quedan cerradas. Ver «Pendiente antes de producción» en el LEEME.

**Día Uno (20-oct):** Rumbo, 3 horas con el comité, se sustituye por Día Uno, una jornada de trabajo real con los equipos que elija el cliente, y `#formatos` suma la franja «Velocidad. Escala. Capacidad.». Lo que este informe dice de Rumbo como primer paso (oferta de entrada, botón, /reserva/) vale ahora para Día Uno. La duración, los participantes y la promesa son los de Día Uno: ver las decisiones del 20-oct en el LEEME. La «Mesa Rumbo» trimestral de la sección 7 es otro formato y no cambia.

Mientras se cerraba este informe, el árbol de trabajo empezó a incorporar una versión con más efecto (WebGL en la portada, tarjetas de cristal, iconos 3D y scroll suavizado), todavía sin commit. Este informe no la evalúa. Los límites que debería respetar están en la sección 6.8.

**De dónde sale.** Es la síntesis de ocho informes de este mismo trabajo, sin repetir lo que ya está en `investigacion/01-03`:
- **Investigación de mercado:** R1 (mensajes de la competencia), R2 (hero y diseño), R3 (marketing y ventas B2B) y R4 (persuasión y copy).
- **Auditorías de la web:** A1 (copy frente al ICP), A2 (UX y diseño visual), A3 (técnica, accesibilidad y SEO) y A4 (conversión y persuasión).

Los ocho están en la misma carpeta que este fichero.

**Revisión de completitud (19-oct, tarde).** Se ha contrastado este informe con los seis puntos que pediste y con los ocho informes de origen. Cambios principales:
- alturas, palabras y tramos sin CTA, **medidos de nuevo** sobre `e01bd8f`, compilado aparte para no mezclarlo con los cambios en curso;
- una sección nueva de **riesgos legales y de marca** (2.8): Deloitte, logos, credenciales, RGPD y Reglamento de IA;
- el **mensaje por perfil** (4.1);
- **qué tomar de cada referencia que diste** (6.8), con límites para una versión con más efecto;
- los **titulares candidatos** (anexo A) y el **mapa de lo que pediste** (1.1).

Las búsquedas web de la sesión se agotaron antes de esta revisión. Lo legal que se añade aquí sale de `investigacion/02` y `03` o va marcado [No verificado] y pendiente del asesor.

**Cómo leer las etiquetas:**
- **[Hecho]:** medido en la web o comprobado en una fuente.
- **[Estudio]:** encuesta o análisis con muestra declarada.
- **[Vendedor]:** dato de quien vende el servicio; sirve como orientación, no como prueba.
- **[No verificado]:** no se ha podido comprobar en esta sesión. No usarlo en la web sin verificarlo antes.
- **[Opinión]:** criterio propio.

Ninguna página externa se ha podido abrir entera: en este entorno solo funcionaba la búsqueda web.

---

> **Estado a 19-oct-2026, tarde.** Esta auditoría evaluó la V2 (commit `e01bd8f`). Después se implementó en la rama `claude/fervent-turing-qrn9ho` buena parte de su plan:
> - **Conversión:**
>   - página `/reserva/` con la marca;
>   - botón de reserva en el resultado del diagnóstico;
>   - botones del diagnóstico legibles;
>   - CTA contextuales tras Casos, Método y Lo que construimos, y CTA fijo en móvil;
>   - medición sin cookies preparada (falta el dominio en `ANALYTICS`).
> - **Accesibilidad y técnica:**
>   - pausa en logos y en el vídeo del cierre, logos como lista y nombres accesibles corregidos;
>   - sin contadores falsos;
>   - JSON-LD con los formatos, compresión y caché en `.htaccess`, e imagen para compartir correcta en el prototipo;
>   - logos a su tamaño;
>   - respuesta sobre datos reformulada.
> - **Diseño, a petición del cliente («vendemos IA: state of the art»):** WebGL en la portada y en el método, narrativa guiada por el scroll, cristal, bento e iconos 3D, siempre con alternativa estática. La auditoría desaconsejaba Lenis y WebGL; se han implantado con límites (solo con ratón, sin GPU no hay WebGL, «reducir movimiento» lo apaga).
>
> **Siguen abiertas** las decisiones de la §7.2: autorizaciones de Deloitte y de los logos, buzón y Bookings de equipo, testimonios, metraje real, credenciales colectivas con nombre y protección del prototipo público.

## 1. Resumen ejecutivo

**En once líneas:**
1. **Nota global: 6,5 sobre 10** [Opinión]. Persuade bien y tiene rigor y oficio, pero convierte mal, no mide nada y es el doble de larga de lo que un CEO lee.
2. **Hallazgo 1 · Conversión rota:** todos los «Reserva» acaban en un email a Ana, hay unos 9.600 px sin botón en escritorio y el diagnóstico no lleva a reservar.
3. **Hallazgo 2 · Personalismo:** ya no está en el texto, sino en los canales (email y agenda de Ana) y en que no queda ninguna cara. Además, se perdió la autoridad colectiva: McKinsey, KPMG, EY-Parthenon y la UFV.
4. **Hallazgo 3 · Hero:** el vídeo a pantalla completa ya funciona (contraste de 7,6:1 o más, LCP de 0,7 s en escritorio), pero enseña puntos, no personas.
5. **Hallazgo 4 · Mensaje:** claro, pero largo (unas 18 pantallas en escritorio y 24 en móvil, con unas 2.200 palabras), con jerga técnica y sin reducir el miedo del directivo a equivocarse.
6. **Hallazgo 5 · Bugs:** la «á» de Butler está arreglada. Quedan los botones ilegibles del diagnóstico, logos deformados, pausas que faltan y producción sin compresión.
7. **Hallazgo 6 · Riesgo legal y de marca:** el prototipo es público (`noindex` no es privado) y ya enseña cifras de Deloitte, cuyo programa va en marca blanca, y 12 logos sin autorización documentada (sección 2.8).
8. **Qué cambiamos en conversión:** una página de reserva con la marca y agenda de equipo, un CTA por nivel y después de cada prueba, el diagnóstico tras los casos y medición sin cookies.
9. **Qué cambiamos en marca:** un coro, no un solista. Buzón `ia@`, equipo visible de 4-6 personas, credenciales colectivas y, después, metraje real de sesiones.
10. **Qué cambiamos en la página:** reordenar y fusionar bloques hasta unas 12 pantallas, con 4 grandes titulares, urgencia en clave del lector y reversión del riesgo.
11. **Qué necesitamos de ti:** buzón y Bookings de equipo, quién sale en el equipo, testimonios, permisos (Deloitte, cada logo, nombres de firmas y de la UFV), qué incluye Rumbo y un día de rodaje (sección 7.2).

**Detalle por área [Opinión]:** 6,5 sobre 10 en V2 (6 en V1). Con el plan de este informe, más de 8.

| Área | Nota en V2 | En una línea |
|---|---|---|
| Mensaje y copy | 7 | Claro y con rigor, pero largo, repetitivo y con jerga técnica en una web que dice «hablamos de negocio» |
| Marca (de Ana a Spiralia) | 6 | El texto ya habla de Spiralia. Los canales siguen siendo de Ana y no queda ni una cara |
| Hero y diseño | 7,5 | El vídeo a pantalla completa ya está y funciona. Faltan personas reales y menos titulares iguales |
| UX y móvil | 6,5 | 15.957 px en escritorio y 20.362 en móvil: unas 18 y 24 pantallas (medido en `e01bd8f`) |
| Conversión | 4 | Todos los «Reserva» acaban en un email, hay un tramo de unos 9.600 px sin un solo botón y el diagnóstico no lleva a reservar |
| Riesgo legal y de marca | 5 | Cifras de Deloitte (marca blanca) y 12 logos sin autorización documentada, ya visibles en un prototipo público |
| Técnica (rendimiento y accesibilidad) | 8 | Lighthouse: 100 en escritorio, 91 en móvil y 96 en accesibilidad. Quedan bugs visibles |
| SEO y GEO (buscadores con IA) | 6 | La base está bien. Falta contenido citable y preparar el dominio de producción |
| Medición | 1 | Hoy no se mide nada |

**Los seis hallazgos clave:**

1. **La web persuade bien, pero convierte mal.**
   - «Reserva 30 minutos», «Reserva Rumbo» y «Hablemos de tu caso» acaban en `mailto:ana.iza@spiralia.es`.
   - Entre la portada y «Para ti» hay **unos 9.600 px sin un solo botón** en escritorio (9.630 px medidos), justo donde están los casos y el método. En móvil lo tapa en parte el CTA fijo.
   - El diagnóstico empieza pasados tres cuartos de la página (al 77 % en `e01bd8f`), no lleva a reservar y sus botones secundarios no se leen.
   - Y no se mide nada: no se puede saber qué funciona.
2. **El personalismo ya no está en el texto, está en los canales y en la ausencia de caras.**
   - El email de Ana aparece 10 veces en el HTML, en 7 sitios, la reserva va a su agenda y el aviso legal remite a su correo.
   - Al quitar los nombres se perdió también la autoridad: hoy no se mencionan McKinsey, KPMG, EY-Parthenon ni la UFV, y no queda ninguna foto de personas.
   - La solución no es borrar a Ana. Es pasar **de un solista a un coro**: un equipo visible, credenciales colectivas y canales de equipo.
3. **El hero con vídeo está bien resuelto, pero el vídeo enseña puntos, no personas.**
   - El contraste medido sobre los fotogramas no baja de 7,6:1 y el LCP en escritorio es de 0,7 s.
   - La pieza abstracta sirve para el lanzamiento. La versión definitiva necesita **metraje real de sesiones**: es la palanca visual que más eleva la marca.
4. **El mensaje es bueno, pero hay que editarlo: la mitad sobra y la urgencia no llega al lector.**
   - **Longitud:** unas 2.100-2.400 palabras visibles y 11 titulares con la misma plantilla.
   - **Jerga:** «agente» aparece en 10 textos y «FDE» en 8.
   - **Diferencial:** «venimos de la consultoría estratégica» no aparece hasta el final.
   - **Lo que falta:** reducir el miedo a equivocarse. Garantía, referencia de un cliente y un primer paso sin riesgo.
5. **Bugs que restan seriedad en una marca que vende rigor.**
   - **Arreglado:** el de la «á» de Butler. Era más amplio de lo que se veía: también fallaban «ú», «Á» y «Ó» en todos los pesos.
   - **Siguen:**
     - botones del diagnóstico ilegibles;
     - logos de clientes deformados en Casos;
     - la animación de salida del hero no se ejecuta;
     - el vídeo del cierre y la cinta de logos no se pueden pausar;
     - una etiqueta montada sobre otra en la demo.
   - **En producción (Nominalia)** faltan compresión y caché. Sin ellas, la nota de Lighthouse en móvil baja de 91 a 79.
6. **Hay riesgos legales y de marca que conviene cerrar antes de enseñar la web a nadie más.**
   - El prototipo de Vercel lleva `noindex`, pero cualquiera con el enlace lo ve.
   - Enseña los 13.000 y 3.000 de Deloitte y su logo, aunque desde el 2-sep sus entregables van en marca blanca y son confidenciales (`investigacion/03` §6).
   - Hay 12 logos de clientes y solo consta por escrito la autorización de ING. Dos están retocados (TeamSystem en blanco no oficial, WiZink recortado) y el CSS recolorea los de los casos.
   - La propuesta de nombrar McKinsey, KPMG, EY-Parthenon y la UFV exige exactitud y permisos.
   - El texto del artículo 4 del Reglamento de IA mezcla la versión de 2025 y la de 2026.
   - Detalle y acciones en la sección 2.8.

**Qué cambiamos:**
- **Reserva:** una página `/reserva/` con la marca, con formulario breve, agenda de equipo y buzón `ia@spiralia.es`.
- **Botones:** un solo texto por nivel y un CTA después de cada momento de convicción.
- **Diagnóstico:** sube justo después de los casos y su resultado lleva a reservar.
- **Medición:** analítica sin cookies.
- **Página:** de unas 18 pantallas a 12-13, con 4 grandes titulares.
- **Marca:** equipo visible con credenciales colectivas, y fotos de sesión cuando haya rodaje.
- **Copy:** sin jerga en la primera mitad y con reversión del riesgo.
- **Técnica:** corregir los bugs y preparar el despliegue en `spiralia.es/ia/`.
- **Legal:** proteger el prototipo, confirmar permisos de Deloitte y de cada logo, y corregir el texto legal y el del artículo 4.

### 1.1 Lo que pediste y dónde está

| Lo que pediste | Dónde se responde | Estado |
|---|---|---|
| 1 · Menos Ana, más Spiralia | 2.2, 6.7 (coro, no solista; dos opciones de equipo), 5.3 (LinkedIn) | El copy ya está despersonalizado. Faltan los canales (buzón, Bookings) y decidir si el equipo sale con nombre |
| 2 · Hero con vídeo a pantalla completa y las referencias que diste | 2.3, 6.2 (especificación), 6.3 (barra), 6.4 (CTA), 6.5 (pie), 6.8 (qué tomar de cada galería) | El vídeo ya está. Falta metraje real |
| 3 · Referencias de Awwwards | 6.8 | Qué premia, qué webs mirar y qué no copiar |
| 4 · Copy para CEO, RR. HH. y CTO, fácil, con urgencia a lo Monge Malo y éxito visible estilo Apple, y cómo venden Varick, Palantir, BCG y otras | 3 (referentes), 4 (palancas), 4.1 (mensaje por perfil), 6.1 (arquitectura), 6.6 (estilo), anexo A (titulares) | Sobre Monge Malo no hay fuente de primera mano [No verificado] |
| 5 · Mejores prácticas y tendencias de marketing y ventas | 5 | Con datos de 2025-2026 y su tipo de fuente |
| 6 · Todas las palancas de persuasión, con clase, boutique e idioma de negocio | 4 (con la prueba de urgencia ética), 4.1, 2.1 (el diferencial, arriba) | — |
| HyperFrames | 6.2 | La pieza de fondo y la película ya están hechas con HyperFrames |

---

## 2. Hallazgos priorizados

**Prioridades:**
- **P0:** antes de enseñar la web a clientes.
- **P1:** en el primer mes.
- **P2:** después.

**Estado:**
- **Hecho:** resuelto en V2.
- **Pendiente:** se puede hacer ya en el código.
- **Decisión:** necesita una decisión o material de Jose.

### 2.1 Mensaje y copy

| P | Hallazgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| P0 | **El diferencial («hablamos el idioma de negocio») no aparece en la primera pantalla.** Además, PwC España dice casi lo mismo: «We know how your business works so you can put AI to work for your business». | A1 §2.6. R1 §2.8 | Una línea en la franja bajo el hero: «Venimos de la consultoría estratégica: hablamos de negocio, no de tecnología.». Demostrarlo, no solo decirlo: la pareja consultor + ingeniero y los casos contados con la cifra de negocio delante | Pendiente |
| P0 | **Jerga técnica en una web que presume de hablar de negocio.** «Agente» en 10 textos, «FDE» en 8, «despliegue» en 6 y «skills» en 4. Las siglas de SPIRAL están en inglés y no casan con los pasos en español. Según BCG (jun-2026), el 52 % de los profesionales entiende poco qué es un agente. | A1 §2.3. [BCG, AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools) | En el copy principal, «un ingeniero de Spiralia» y «herramientas de IA que hacen tareas enteras». «FDE» y «agente», una sola vez y definidos, en el detalle del método, en la pestaña Tecnología y en la FAQ | Pendiente |
| P0 | **La página es larga y se repite.** La visita bancaria sale dos veces, el 50.000 tres o cuatro, el FDE se define tres veces y «nos quedamos hasta que funciona» se repite tres. | A1 §2.2. A2 §5.1 | Objetivo: 1.400-1.600 palabras y 12-13 pantallas en escritorio, con la arquitectura de la sección 6 | Pendiente |
| P1 | **La urgencia habla de «las empresas», no del lector.** La mejor frase de la página, «Si dentro de un año el consejo me pregunta qué ha cambiado…», está escondida en la pestaña CEO. | A1 §2.4. R4 §4.2 | Llevarla a «Por qué ahora», en segunda persona. Añadir el ejercicio «Haz la cuenta de este trimestre» (sección 6.1, bloque 3) | Pendiente |
| P1 | **Falta reducir el miedo a equivocarse.** En ventas complejas, entre el 40 % y el 60 % de las oportunidades acaban sin decisión, y lo que más frena es ese miedo, más que el apego a lo de siempre ([The JOLT Effect](https://penguinrandomhouse.com/books/isbn/9780593538104), vía [The SaaS Barometer](https://thesaasbarometer.substack.com/p/the-jolt-effect-with-matt-dixon-author)). [Estudio, fuente secundaria] | R4 §4.1. A4 §2 | Objeciones duras en la FAQ («¿Sois lo bastante grandes?», «¿Y si no funciona?»), propiedad de lo construido, «sin permanencia» y una garantía en Rumbo si se decide (sección 7) | Pendiente + Decisión |
| P1 | **Tú y vosotros mezclados** (5 textos y el diagnóstico). «Book Rumbo» no le dice nada a un lector inglés. El «se construye» del español se tradujo como «you build», que cambia el sentido. | A1 §2.8 | Tú al lector, siempre en singular. En EN: «Request a Rumbo session» y «we build». Revisión nativa del inglés | Pendiente |
| P1 | **El artículo 4 del Reglamento de IA se cuenta con la letra de 2025.** `faq.a9` dice que las empresas «deben adoptar medidas para que su plantilla tenga los conocimientos necesarios». Desde el 27-jul-2026 el texto pide «medidas para apoyar el desarrollo» de la alfabetización y dice que no exige garantizar un nivel concreto. R4 §8.2 propone una línea («la ley europea pide que tu plantilla sepa usar la IA que usa») que exagera igual | `investigacion/02` §5.2 y §5.5 | «La ley europea pide a las empresas que usan IA que tomen medidas para formar a su gente. Sin certificados, pero con un registro de lo que se ha hecho.» El Reglamento (UE) 2026/1744 no se ha comprobado en el Diario Oficial: verificarlo en EUR-Lex antes de publicar | Pendiente |
| P1 | **«Misma herramienta. Mismo grupo. La diferencia, la formación.»** afirma una causa: atribuye a la formación la diferencia de satisfacción entre ING España (4,7) y el segundo país (3,2). Es una comparación entre dos países, no un experimento | `content.toml` `pr.ing_h`. `investigacion/03` §9.3 | Confirmar que el segundo país usó la misma herramienta sin una formación comparable y guardar el soporte de la medición. Si no se puede, decir el hecho sin la causa: «Misma herramienta, mismo grupo. En España, con el programa, 4,7 sobre 5. En el segundo país, 3,2.» | Decisión |
| P1 | **«Sin intermediarios ni juniors»** (`cta.lead`) y «Hablas con el equipo que lo va a hacer» son promesas comprobables | `content.toml` | Mantenerlas solo si se cumplen siempre, también en programas grandes como el de Deloitte | Decisión |
| P2 | **«Casi tres de cada cuatro»** va escrito en letras y así esquiva el control de cifras del build. Lo mismo pasa con **«Más de una década»** (`pq.eq_note`), que además se apoya solo en una biografía de LinkedIn de Ana | A1 §2.8. `investigacion/03` §5 | Quitarlas o darlas de alta con su fuente en `cifras.toml`. Para la década, el año de fundación de Spiralia | Pendiente |

### 2.2 Personalismo: de Ana a Spiralia

| P | Hallazgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| P0 | **El email de toda la página es `ana.iza@spiralia.es`**: 10 veces en el HTML, en 7 sitios (*mailto* de L&D, diagnóstico y su `noscript`, cierre con enlace y botón de copiar, aviso legal y pie), y otras 3 en `reserva/`. | `build.py` l. 22. Medido en `dist/` | Buzón de equipo (`ia@` u `hola@spiralia.es`). Para el ejercicio de derechos, el buzón de privacidad de la política de spiralia.es. **Basta con cambiar `MAIL` en `build.py`.** El LEEME dice que el 19-oct se decidió mantenerlo de momento: hay que confirmarlo | Decisión |
| P0 | **La reserva va a la agenda de Ana** (`BOOKINGS = '[BOOKINGS_URL]'`, todavía vacío). | `build.py` l. 21 | Página de Microsoft Bookings «Spiralia AI» con varios anfitriones: CEO y comité, Personas y Formación, Tecnología. Que el plan de Spiralia lo permita está [no verificado] | Decisión |
| P0 | **Se pasó de «personalista» a «sin caras»**: V2 no tiene ninguna foto de personas. Y el CEO necesita «caras reales del equipo» (`investigacion/02` §6.10). Ojo: el 19-oct se decidió quitar nombres de personas y de firmas de origen (LEEME). Esta recomendación reabre esa decisión | A2 §1.3 y §8 | Dos opciones (sección 6.7): **A**, retícula de 4-6 personas del mismo tamaño, con nombre, papel y origen, en la que Ana es una más; **B**, sin nombres, con fotos de sesión y de grupo y la credencial colectiva. Se recomienda A. Con consentimiento escrito de cada persona | Decisión (quién sale y fotos) |
| P1 | **Al quitar los nombres se quitó también la autoridad**: el copy no menciona McKinsey, KPMG, EY-Parthenon ni la UFV. «Un grado universitario» suena a evasiva. | A4 §2. Comprobado en `content.toml` | Credencial colectiva en una línea: «Un equipo que viene de McKinsey, KPMG y EY-Parthenon y enseña IA en el Grado de la Universidad Francisco de Vitoria». Tiene que ser exacta: según `investigacion/03` §5, McKinsey es el origen de Ana (y una de sus biografías públicas no lo menciona), KPMG el de Jose e Ignacio, EY-Parthenon el de Jose, y la UFV también el de Jose. Sin logos de esas firmas y con los permisos de la sección 2.8 | Decisión + Pendiente |
| P1 | **Restos fuera de la página.** `LEEME.md` aún describe el equipo de dos personas, y la ficha de la cifra «30» en `cifras.toml` estaba pensada como «conversación con Ana». | A1 §4.3 | Actualizar: «conversación inicial con el equipo» | Pendiente |

### 2.3 Hero y diseño

| P | Hallazgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| — | **Vídeo a pantalla completa con velo, barra transparente, póster, pausa, «Ver la película · 20 s» y respeto por «reducir movimiento» y Save-Data.** | A2 §4.2. A3 §3.1 | Mantener | **Hecho** |
| P1 | **El vídeo enseña una retícula de puntos.** Es elegante, pero se puede leer como la típica «IA azul». Las mejores firmas de IA enseñan personas con el resultado puesto: en la web de Sierra, de Bakken & Baeck, aparece una mujer usándola en un aeropuerto ([Bakken & Baeck](https://bakkenbaeck.com/case/sierra)). | A2 §4.2. R2 §6 | Mantener la pieza de HyperFrames para el lanzamiento y programar un día de rodaje (sección 6.2) | Decisión |
| P1 | **11 titulares con la misma plantilla** (antetítulo + dos líneas en serif, la segunda en gris). Si todo es un gran titular, nada destaca. | A2 §5.1 | Titular en dos líneas solo en 4 momentos: hero, problema, casos y cierre. El resto, en una línea. Escala tipográfica de 8 niveles (A2 §7.1) | Pendiente |
| P1 | **Sistema visual disperso:** 10 radios de borde distintos, 6 estilos de tarjeta, 21 textos por debajo de 12 px y logos de tamaños ópticos muy distintos. | A2 §2 y §7.3 | 3 radios, 2 tarjetas, mínimo de 12 px y logos igualados por área óptica | Pendiente |
| P1 | **La prueba del hero se pierde.** La línea de ING bajo el CTA va a 13-14 px en gris. | A2 §4.2 | Píldora de prueba encima del H1 o línea de 15-16 px en `#E0DFDA`, enlazada a Casos | Pendiente |
| P2 | **La cinta de logos en movimiento resta clase** y no se puede leer. | A2 §6.3 | Una fila fija de 6-8 logos normalizados, solo de los autorizados y en sus versiones oficiales (2.8) | Pendiente |
| P2 | **Monotonía de fondos oscuros:** tres bloques oscuros seguidos, unos 3.700 px. | A2 §5.1 | Alternar claro y oscuro de forma deliberada (sección 6.1) | Pendiente |

### 2.4 UX y móvil

| P | Hallazgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| — | **Menú móvil, hero que cabe en una pantalla, CTA fijo en móvil y enlace secundario que ya no se parte en dos líneas.** | A2 §10 | Comprobar el foco atrapado y el cierre con Esc | **Hecho** |
| P0 | **20.362 px en móvil (unas 24 pantallas).** El método (SPIRAL) ocupa 2.912 px, «Lo que construimos» 2.363 y «Personalización» 1.982. A2 midió 23.194 px antes del commit `e01bd8f` | A2 §10. Medido de nuevo en `e01bd8f` | SPIRAL como carrusel con *snap*. Del caso, solo «Con la IA» y un conmutador «Hoy / Con la IA». Recorte general (sección 6) | Pendiente |
| P1 | **Las etiquetas del gráfico del reto se ven a 9 px en móvil.** | A2 §6.4 | Etiquetas en HTML superpuesto o escalar el `viewBox` | Pendiente (el commit `e01bd8f` dice haberlo mejorado: medirlo) |
| P2 | **A 360 px, la pestaña «Tecnología» se sale 7 px de su fila.** | A3 B3 | `overflow-x:auto` en la lista de pestañas | Pendiente |

### 2.5 Conversión y persuasión

| P | Hallazgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| P0 | **El CTA principal no lleva a ningún sitio útil.** `/reserva/` redirige a `mailto:`. Sin cliente de correo (lo habitual en Outlook web o Gmail), el directivo se queda en una página sin estilo. El aviso legal habla de Microsoft Bookings, que aún no existe. | A4 §1.1, F1 | Página `/reserva/` con la marca: qué pasa en los 30 minutos, formulario de 4 campos, calendario y buzón copiable. Nunca una redirección automática a `mailto:`. **La web es estática y no tiene servidor que reciba el formulario:** o se usan las preguntas personalizadas de Bookings como formulario, o un servicio de formularios alojado en la UE (encargado del tratamiento, con contrato), o un script en el hosting de Nominalia. Hay que decidirlo (A4 §3.2). Con calendario justo después del formulario reserva el 62-67 % de los leads cualificados, frente al 30-40 % con proceso manual ([Chili Piper](https://www.chilipiper.com/post/form-conversion-rate-benchmark-report), [RevenueHero](https://www.revenuehero.io/blog/lead-to-meeting-conversion-benchmarks-for-2025)) [Vendedor]. Contactar en la primera hora multiplica por casi 7 la probabilidad de cualificar ([HBR, 2011](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)) [Estudio] | Pendiente + Decisión |
| P0 | **Un desierto de unos 9.600 px sin CTA** en escritorio entre la portada y «Para ti», justo en Casos, Método y Lo que construimos (A4 midió 10.600 sobre una versión anterior; en `e01bd8f`, 9.630). En móvil, el CTA fijo lo cubre en parte, pero dentro del contenido no hay ningún botón en 12.838 px | A4 §1.2. Medido de nuevo | Un CTA contextual tras cada momento de convicción (sección 6.1) | Pendiente |
| P0 | **Cuatro textos para una sola acción** («Hablemos», «Hablemos de tu caso», «Reserva Rumbo», «Reserva 30 minutos»). Además, «Reserva Rumbo» promete algo que no se reserva. | A1 §0.8. A4 §1.1 | Un verbo por nivel (sección 6.4). Rumbo pasa a ser lo que se propone tras los 30 minutos y queda como interés preseleccionado en el formulario | Pendiente |
| P0 | **El diagnóstico está enterrado y no tiene salida.** Empieza al 77 % de la página en escritorio (A4 lo midió al 81 % en una versión anterior), el resultado no enlaza a reservar y «Envíanoslo» abre un email: es el paso de **más** compromiso, disfrazado de pequeño. | A4 §1.3 y §5 | Subirlo después de Casos. Su CTA principal: «Revisa este resultado con nosotros · 30 minutos», con las respuestas adjuntas | Pendiente |
| P1 | **Reversión del riesgo débil** (nota 1 de 3) y **reciprocidad pobre**: no hay nada útil que llevarse sin hablar con Spiralia. | A4 §2. R4 §2 | Tres materiales sin formulario: guía «Presupuesto de IA 2027» para el CEO, programa de ejemplo para RR. HH. y L&D, y ficha de seguridad para el CTO (sección 5.2) | Decisión (contenido) |
| P1 | **Ninguna voz de cliente.** Los tres testimonios son `[PLACEHOLDER]`; `build.py` ya los oculta mientras lo sean. | R1 §4. A4 §2 | 2-3 citas reales con nombre, cargo y empresa, mejor en vídeo de 20-40 s. Y una referencia bajo petición: «¿Quieres hablar con quien lo lideró? Te ponemos en contacto». Con el consentimiento escrito de la persona y el visto bueno de comunicación de su empresa. Ojo con Deloitte: su programa prohíbe nombres de empleados (`investigacion/03` §6), así que su cita, si la hay, tendría que ser anónima o no estar | Decisión |
| P1 | **El CTO no tiene sitio.** Solo aparece como quien pone pegas. Pero cuando la compra incluye IA generativa el grupo de compra se duplica ([Forrester 2026](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/)), y las iniciativas que lidera el CIO tienen 2,2 veces más probabilidad de acabar en un buen acuerdo que las que lidera el CEO ([Gartner](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai)) [Estudio] | A1 §2.9 | V2 ya tiene la pestaña Tecnología. Completarla con la ficha para IT y «Habla con un ingeniero · 30 minutos» | Parcial |

### 2.6 Técnica

**Rendimiento** (A3, Lighthouse 12.8):

| P | Hallazgo | Qué hacer | Estado |
|---|---|---|---|
| — | Escritorio 100 (LCP 0,7 s). Móvil con gzip 91 (LCP 3,4 s simulado). CLS 0. Sin terceros. Vídeo diferido, vertical u horizontal, WebM o MP4 | Mantener | **Hecho** |
| P0 (producción) | **El `.htaccess` de Nominalia no tiene compresión ni caché.** Sin ellas, móvil 79 y LCP 5,1 s | Bloque `mod_deflate` + `mod_expires` (A3 §3.2) | Pendiente |
| P1 | **El elemento de LCP hoy es el subtítulo de la portada, no el póster** (A3 §1.2), y su fuente (Open Sans, 76 KB) no se precarga, mientras que Sofia sí | Precargar Open Sans y recortar su eje de peso a 400-600. El criterio de aceptación de 6.2 se ajusta: LCP de 2,5 s o menos sea cual sea el elemento | Pendiente |
| P1 | **Logos pesados** (CCEP 59 KB; Deloitte con un 60 % de margen vacío). **SVG decorativos de 38,8 KB** para iconos de 12 px. `s-geom.js` (59 KB) se carga siempre | SVG optimizado o WebP; simplificar rutas; cargar `s-geom.js` bajo demanda | Pendiente |
| P2 | **`firma-h.mp4` (cierre) pesa 1,44 MB**, por encima del objetivo de 1,2 MB. Pósters en JPEG | CRF más alto o 1600×900; pósters en WebP o AVIF | Pendiente |
| P2 | **Cabeceras de seguridad mínimas**: `vercel.json` solo pone `X-Robots-Tag` y `nosniff` | `Content-Security-Policy`, `Referrer-Policy` y `Permissions-Policy` en `vercel.json` y `.htaccess`; comprobar HSTS en Nominalia (A3 §9) | Pendiente |

**Accesibilidad** (Lighthouse 96; el texto sobre el vídeo nunca baja de 7,6:1):

| P | Hallazgo (criterio WCAG) | Qué hacer | Estado |
|---|---|---|---|
| P1 | **Sin pausa en el vídeo del cierre ni en la cinta de logos** (2.2.2, nivel A) | El mismo control que en la portada | Pendiente |
| P1 | **Logos con `<img role="listitem">`** (4.1.2) | `<ul><li><img>` | Pendiente |
| P1 | **El enlace «EN» se anuncia como «Read in English»** (2.5.3) | `aria-label="EN · Read in English"` | Pendiente |
| P1 | **Los botones SPIRAL se anuncian pegados** («SFormarSkill») | Espacios o `aria-label` | Pendiente |
| P1 | **La demo animada tiene `aria-live`**, que puede leer escenas enteras a destiempo | Quitarlo y anunciar solo un resumen al terminar | Pendiente |
| P2 | **La película no tiene transcripción** (1.2.1). **Las opciones del diagnóstico avanzan solas** a los 220 ms | Transcripción en un `<details>`; `radiogroup` | Pendiente |

**SEO y GEO** (buscadores con IA):

| P | Hallazgo | Qué hacer | Estado |
|---|---|---|---|
| — | `title`, `hreflang` recíproco, `canonical`, Open Graph y JSON-LD (Organization, Service y FAQPage) | Mantener | **Hecho** |
| P0 (producción) | **Prototipo con `noindex`. El `robots.txt` que cuenta es el del WordPress de spiralia.es.** En Vercel, la imagen al compartir apunta a `spiralia.es/ia/`, que quizá aún no existe | Publicar en `spiralia.es/ia/`; 301 desde `/training/`; sitemap en el `robots.txt` raíz; Search Console y Bing Webmaster Tools; permitir **OAI-SearchBot** ([OpenAI](https://developers.openai.com/docs/gptbot)); `--site` en `build.py` para el prototipo | Pendiente + Decisión (rastreadores de IA) |
| P1 | **`description` de 186 caracteres.** Al JSON-LD le faltan la oferta (Rumbo), la audiencia y el país | Descripción de 155 caracteres o menos; JSON-LD enriquecido desde `content.toml`; `og:locale`; sitemap con `hreflang` | Pendiente |
| P1 | **Falta contenido que una IA pueda citar** | Una frase «Spiralia AI es…» al principio, un bloque «Datos clave» generado desde `cifras.toml` y «Actualizado: octubre de 2026» | Pendiente |
| P2 | **Una sola URL compite por todo** | Una página por caso (ING, Deloitte, CCEP), otra del método y otra del artículo 4 del Reglamento de IA. `llms.txt` opcional: es barato y no hay evidencia de que sirva ([estudio de SE Ranking, vía Nytro SEO](https://nytroseo.com/does-llms-txt-help-2026-evidence)) | Pendiente |

**Medición:**

| P | Hallazgo | Qué hacer | Estado |
|---|---|---|---|
| P0 | **`ANALYTICS = ''`: no se mide nada.** Los eventos ya están programados (`Reserva`, `Email`, `Diagnóstico`, `Perfil`, `Película`) y `/reserva/` pierde el origen (`?d=`) | **Plausible** (sin cookies; servidores en la UE [no verificado]), que mantiene «Esta página no usa cookies». La AEPD admite medir la audiencia sin consentimiento si se cumplen todas sus condiciones ([guía de enero de 2024, vía Finreg360](https://finreg360.com/alerta/la-aepd-publica-la-guia-uso-de-cookies-para-herramientas-de-medicion-de-audiencias/)). Plan de unos 15 eventos (A3 §8.3), medir también en `/reserva/` y un campo «¿Cómo nos has conocido?». Bookings no avisa a la web de que la cita se ha confirmado [No verificado]: cuadrar cada semana los clics en «Reserva» con las citas. La política de privacidad tiene que mencionar Plausible y el `localStorage` que recuerda la pausa del vídeo (exento por ser una función que pide la persona, A3 §8.1) | Pendiente + Decisión (cuenta) |
| — | **Nada de GA4, Clarity ni etiqueta Insight de LinkedIn sin gestor de consentimiento.** Clarity exige consentimiento en el EEE desde el 31-oct-2025 ([Microsoft](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management)) | — | — |

### 2.7 Bugs

| P | Bug | Causa y arreglo | Estado |
|---|---|---|---|
| P0 | **Acentos invisibles en Butler**: «M s de 50.000», «¿Cu nto cuesta?». Además de la «á» del 400, fallaban «ú», «Á» y «Ó» en los tres pesos | Chromium no pinta los acentos compuestos con el *seac* implícito de CFF cuando el glifo o su base llevan anchura explícita (A3 §2). `tools/fonts.py` redibuja los glifos como contornos en woff2. **Falta:** corregir el comentario de `fonts.py`, que atribuye el fallo al saneador de Chrome, y añadir la prueba de regresión `test_acentos.js` a `tests/` | **Hecho** (falta la prueba) |
| P0 | **Botones del diagnóstico ilegibles** («Atrás», «Guárdalo», «Repetir»): fondo gris del navegador con texto claro | `.btn` no fija `background`. Añadir `background:transparent` en `.btn-ghost` (`site.css` l. 72) | Pendiente |
| P0 | **Logos de ING, Deloitte y CCEP deformados** en Casos (ING de proporción 4,0 a 5,4) | `.pc-logo{align-self:flex-start;height:26px;width:auto;object-fit:contain}` y recortar el PNG de Deloitte | Pendiente (verificar en V2) |
| P1 | **La animación de salida del hero nunca se ejecuta** | `.hero{overflow:hidden}` crea un contenedor de scroll. Cambiar a `overflow:clip` y desactivar la animación con «reducir movimiento» | Pendiente |
| P1 | **La etiqueta «Ejemplo ilustrativo» se monta sobre el rótulo de la columna** en la demo (1440 px) | Sacarla del posicionamiento absoluto | Pendiente |
| P1 | **Espacio enorme antes de «%» en cifras grandes**, y ninguna fuente tiene U+202F (el espacio fino no separable) | Espacio fino no separable en tamaño display y mapear U+202F en `fonts.py` | Pendiente |
| P2 | **Tres botones «↻ Ver de nuevo» siempre visibles.** Los símbolos ↻ ▶ ❚ → caen a la fuente del sistema | Mostrarlos solo al pasar el ratón o con el foco; SVG en línea | Pendiente |
| — | **Pausa visible sin vídeo** (el `hidden` no se respetaba); **contadores que enseñaban «71 %»**; **testimonios `[PLACEHOLDER]` visibles**; **sin menú móvil** | — | **Hecho** |

### 2.8 Riesgos legales y de marca

No es asesoramiento jurídico. Todo lo que sigue hay que pasarlo por el asesor de Spiralia antes de producción. Las restricciones de clientes salen de `investigacion/03` §6 y §9. Lo normativo, de `investigacion/02` §3.4 y §5 y de `investigacion/01` §2.6.

| P | Riesgo | Evidencia | Qué hacer | Estado |
|---|---|---|---|---|
| P0 | **El prototipo público ya enseña lo que aún no está autorizado.** `noindex` evita que Google lo indexe, pero cualquiera con el enlace lo ve (lo dice el propio LEEME) | `spiralia-ia.vercel.app` | Hasta cerrar las dos filas siguientes, protegerlo con contraseña (protección de despliegues de Vercel) o publicar una versión sin las cifras de Deloitte y con solo los logos autorizados | Decisión |
| P0 | **Deloitte:** la web enseña 13.000 personas, 3.000 managers y su logo. Desde el 2-sep sus entregables van en marca blanca, los documentos son confidenciales y no se pueden dar nombres de empleados. No consta autorización para una web pública. Además, la regla de logos del manual de la propuesta a KPMG (§13.2) pide no asignar resultados a Deloitte | `investigacion/03` §4.2 (5) y §6 | Permiso escrito de Deloitte que cubra cifras, logo y la lectura «una Big Four eligió a Spiralia». Sin él, quitar cifras y logo, también de la FAQ («¿Sois lo bastante grandes?») y de la prueba mínima del cierre y del pie. Confirmar también qué cuenta como «formada» en los 13.000 (completó el programa o fue convocada) y si los 3.000 están dentro | Decisión |
| P0 | **Logos:** la franja enseña 12. Solo consta por escrito la autorización de ING («uso externo autorizado»). El logo de TeamSystem en blanco no es oficial, el de WiZink está recortado de Wikimedia y `.pc-logo` los recolorea con un filtro CSS. KPMG y Santander ya se excluyeron por sus reglas | `investigacion/03` §6. `site.css` l. 394 | Autorización escrita de cada cliente, versiones oficiales en negativo (sin recolorear ni recortar) y una nota en el pie: «Logos de clientes de Spiralia. Marcas registradas de sus titulares». Mantener el rótulo «Hemos formado a equipos de», que no sugiere respaldo ni que todos recibieran lo mismo. Las páginas por caso (5.2) necesitan el permiso de cada cliente | Decisión |
| P0 | **Cifras de clientes:** el 92 % de ING solo es fiable con su base (¿usuarios con licencia?, ¿todo el banco?). Hay decks públicos con «+92 %» y «4,6». Los 218 de CCEP son casos **identificados** | `investigacion/03` §9. `cifras.toml` | Guardar el soporte de la medición de ING y escribir siempre «del 66 % al 92 % de usuarios activos semanales», nunca «+92 %». CCEP, siempre «identificados». Confirmar que CCEP autoriza el uso público de su cifra | Decisión |
| P1 | **Credenciales colectivas (McKinsey, KPMG, EY-Parthenon, UFV).** Decir dónde ha trabajado el equipo es un uso descriptivo de esas marcas, pero tiene que ser exacto y no sugerir respaldo. «Venimos de McKinsey» con una sola persona puede leerse como exagerado (engaño, Ley 3/1991 de Competencia Desleal, art. 5) [No verificado en esta sesión: validar con el asesor]. KPMG es además relación comercial con reglas de marca propias, y EY sale a la vez como logo de cliente y como origen | `investigacion/03` §5 y §6 | Texto exacto, sin logos de esas firmas, consultado con KPMG por la relación existente. Permiso de la UFV para usar su nombre como credencial. Separar en el pie «clientes» de «de dónde venimos» para que EY no lea como las dos cosas | Decisión |
| P1 | **RGPD en la reserva y en los materiales.** El texto legal actual habla de Bookings, que no existe, y manda ejercer los derechos al correo de Ana | `cta.legal` | En `/reserva/` y en cualquier campo de email: primera capa (responsable, finalidad, base: la petición del usuario, art. 6.1.b RGPD; destinatarios; derechos; enlace), encargados con contrato del art. 28 (Microsoft Bookings, el servicio de formularios si lo hay, Plausible), casilla aparte y sin marcar para la carta trimestral (LSSI art. 21) y nunca condicionar la descarga a esa casilla (A4 §4.3). Derechos al buzón de privacidad. Comprobar que la política de spiralia.es cubre todo esto | Pendiente |
| P1 | **«Esta página no usa cookies» con analítica.** Con Plausible sigue siendo cierto que no hay cookies, pero el pie que se propone («Sin cookies. Sin rastreadores.») se puede discutir si hay un script de medición | Secciones 6.5 y 2.6 | «Sin cookies. Solo contamos visitas, de forma anónima.» Y nada de GA4, Clarity ni la etiqueta de LinkedIn sin gestor de consentimiento | Pendiente |
| P1 | **Personas en la web:** retratos del equipo, testimonios, rodaje y fotos de la Mesa Rumbo | 6.2, 6.7 | Consentimiento escrito de cada persona reconocible para nombre e imagen (derecho a la propia imagen y RGPD), permiso del cliente si salen sus oficinas o su marca, y nada de primeros planos sin firma (R2 §7.10) | Decisión |
| P1 | **Reglamento de IA, más allá del artículo 4:** (a) si algún día se usa vídeo o imagen generados con IA que parezcan reales (personas en una «sesión»), el artículo 50 obliga a decir que es contenido sintético, y presentarlo como una sesión real sería engañoso. Hoy no aplica: HyperFrames renderiza HTML, no genera personas. (b) La demo de Personas («Preparar una conversación de desempeño») toca la evaluación del desempeño, que el Reglamento trata como uso de alto riesgo en el empleo, y en España el comité de empresa tiene derecho a información sobre los algoritmos que afectan al trabajo (art. 64.4.d del Estatuto de los Trabajadores) | `investigacion/01` (Ómnibus y art. 50), `investigacion/02` §3.4. `content.toml` `[[data.demo]] id="personas"` | (a) Regla de marca: nunca metraje sintético de personas presentado como real. (b) Mantener explícito que la IA reúne y la persona valora («Tuya: la conversación con Marta») y añadir a la pestaña Personas una línea o una pregunta sobre transparencia con la plantilla y la RLT. El alcance exacto del alto riesgo para un asistente que prepara una conversación está [No verificado]: consultarlo | Pendiente + asesor |
| P1 | **Promesas que tienen que estar en el contrato:** «lo construido es tuyo», «sin permanencia», «tus datos no salen de tu entorno», la garantía de Rumbo si se decide | Secciones 4 y 6.1 | Redacción revisada con quien firma los contratos. «Tus datos no salen de tu entorno» solo si es cierto con todas las herramientas: con ChatGPT o Claude de empresa los datos sí pasan por el proveedor de la herramienta. Mejor: «Trabajamos dentro de tu entorno, con las herramientas y los permisos que aprueba tu IT» | Decisión |
| P2 | **Barómetro con datos de los 50.000 alumnos** | 5.2, 7.3 | Autorización de cada cliente para el uso agregado y anónimo, y la metodología publicada (R3 §8.2) | Decisión |
| P2 | **Anonimizar con exactitud:** si un caso se cuenta sin nombre («banco del IBEX»), la descripción tiene que ser verdad. ING no cotiza en el IBEX 35 | R1 §8 | «Un gran banco en España» o «una entidad financiera europea» | Pendiente |
| P2 | **ABM y LinkedIn:** subir listas de contactos a LinkedIn necesita base jurídica; identificar empresas por su IP, también | R3 §4 y §9.3 | Segmentar por lista de empresas (sin datos personales) y consultar con el DPO lo demás | Decisión |
| — | **Fuera de la web, pero afecta a la marca:** hay decks públicos con cifras antiguas o confidenciales. ING-fin enseña un precio, un número de concurso y la etiqueta «Confidencial»; DEL-pub dice 30.000 alumnos y trae biografías antiguas; KPMG-web, «+92 %» y «4,6». Un CEO que busque Spiralia encontrará cifras que no cuadran con la web | `investigacion/03` §9 | Retirar o actualizar esos enlaces antes de lanzar la web | Decisión |

---

## 3. Lo que hacen los referentes y qué les robamos

**La tesis común.** Todas las firmas de referencia venden lo mismo: **el problema no es la tecnología, son las personas y la forma de trabajar.**
- BCG: «10-20-70».
- McKinsey: la barrera es el liderazgo.
- Multiverse: «a people problem».
- Section: «You bought AI. That was the easy part.»

Es exactamente el terreno de Spiralia. La diferencia está en **demostrarlo** (R1 §0).

| Referente | Qué hacen (con fuente) | Qué robamos | Qué no |
|---|---|---|---|
| **Palantir** | Formato con nombre y plazo: «From 0 to use case in 5 days» ([Palantir](https://blog.palantir.com/deploying-full-spectrum-ai-in-days-how-aip-bootcamps-work-21829ec8d560)). Bloomberg llamó a sus *bootcamps* su «arma secreta de ventas» ([Bloomberg](https://www.bloomberg.com/news/articles/2024-04-23/inside-palantir-s-ai-sales-secret-weapon-software-boot-camp)). En AIPCon son los clientes quienes enseñan sus casos ([MarketScreener](https://www.marketscreener.com/news/palantir-technologies-hosts-aipcon-10-featuring-customer-led-demos-of-foundry-aip-ontology-and-ap-ce7f5ddcd18ff427)). Idea de fondo: el modelo es una mercancía; la ventaja está en cómo opera cada empresa | **Rumbo vendido como producto**: nombre, 3 horas y con qué sale el comité. **El cliente cuenta su caso.** «Todos tienen la misma IA. Gana quien la pone a trabajar.» | El tono de dominio («SOFTWARE THAT DOMINATES»). La jerga («ontology») |
| **BCG** | **10-20-70**: 10 % del esfuerzo en algoritmos, 20 % en tecnología y datos, 70 % en personas y procesos. Ojo: es un reparto del **esfuerzo**, no del valor ([BCG](https://www.bcg.com/featured-insights/how-to/roi-of-ai)). Solo el 5 % de las empresas son *future-built* y el 60 % va rezagado ([BCG, oct-2025](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf)). El 72 % de los CEO dice ser el principal decisor sobre IA; en las empresas de los CEO *Trailblazers*, el 60 % del presupuesto de IA va a recualificar ([BCG AI Radar 2026](https://www.bcg.com/press/15january2026-as-ai-investments-surge-ceos-take-lead)) | **Autoridad prestada en una línea**: «BCG lo resume así: 10 % algoritmo, 20 % tecnología, 70 % personas y procesos. Nosotros trabajamos en ese 70 %». Hay que dar de alta 10 y 70 en `cifras.toml` y ampliar la ficha del 20, que ya existe como duración de la película: si no, el build la dejaría pasar sin fuente. **El 60 % de los *Trailblazers*** para el CHRO [requiere alta en `cifras.toml`]. **Un responsable con nombre por línea de servicio** (BCG X) | El hero que es solo una etiqueta («AI Transformation»). El CTA escondido |
| **McKinsey** | «Superagency»: la plantilla está lista; la barrera es el liderazgo ([McKinsey](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work)). Alrededor del 6 % son *high performers* | **«Tu gente ya usa la IA. Falta decirle para qué.»** Es urgencia que no culpa a la plantilla e interpela al comité. El 6 % ya está en la web | — |
| **Accenture / Faculty** | Accenture compró Faculty en 2026 ([Accenture](https://newsroom.accenture.com/news/2026/accenture-to-acquire-faculty-to-scale-ai-capabilities)). Faculty vende formatos por cargo: comité y consejo en media jornada, alta dirección en un día | **Menú de formatos por cargo** y la tesis «formar + desplegar», que las grandes compran porque no la tienen | Muros de alianzas y premios de analistas |
| **Varick Agents** (casi con seguridad, la «Varick» que mencionaste: confírmalo) | El ensayo del fundador «If AI is so great, why isn't it working?» ([X, 30-abr-2026](https://x.com/vasuman/article/2049659161005470071)). Un **diagnóstico de muestra** con entregable visible ([demo](https://audit.varickagents.com/demo)). «No migrations are required» ([web](https://www.varickagents.com/)) | **Un acta de Rumbo anonimizada como muestra.** Un ensayo de diagnóstico **firmado por el equipo**: «Por qué tu IA no está trabajando (y no es culpa de la IA)». **«Sin migraciones» para el CTO**, si es cierto siempre | Estética de *startup* de San Francisco. Cifras de demo presentadas como casos. El fundador como prueba |
| **Section** | «You bought AI. That was the easy part.» ([Section](https://www.sectionai.com/)). Contraste entre lo que cree la dirección y lo que vive la plantilla (57 % frente a 18 %) ([Enterprise DNA](https://enterprisedna.co/resources/news/section-ai-proficiency-report-agent-readiness-gap-july-2026)) | **El coste hundido** (ya en V2: «Ya pagas la IA. Ahora, que trabaje.»). **Un informe propio y periódico** | — |
| **Multiverse** | «Every team has AI. Few master it.» Su CEO, al cerrar ronda en mayo de 2026: «a people problem» ([Multiverse](https://www.multiverse.io/blog/multiverse-raises-70-million-europes-ai-adoption-platform)) | **Titular en dos tiempos (todos / pocos)**: «La IA ya está en todas las mesas. En la cuenta de resultados, casi en ninguna.» | Cifras de volumen que no cuadran |
| **Distyl** | Casos anónimos por sector, siempre con dos cifras («F100 Telecom»). **Pedigrí colectivo**: talento de Palantir, Google DeepMind y NASA ([Distyl](https://www.distyl.ai/)) | **Anonimización elegante y exacta** («una aseguradora del top 5», si es verdad) y **pedigrí colectivo** (McKinsey, KPMG, EY-Parthenon, UFV) en lugar de biografías | El CTA en `mailto:` |
| **Mindstone** | Dos puertas en el hero: «TRAIN YOUR TEAM» y «START WITH YOUR EXEC TEAM». Caso titulado con el resultado: «40 Home Depot Executives Unblocked AI ROI in 2 Hours» (`investigacion/01` C.4) | **Casos titulados con el resultado** y una puerta específica para el comité | Erratas. Casos tras formulario |
| **Sierra y Harvey** | Sierra: personas usando el producto en un contexto real ([Bakken & Baeck](https://bakkenbaeck.com/case/sierra)) y la marca al final («… Built on Sierra.»). Harvey: un lenguaje de movimiento que hace que lo complejo parezca claro y premium ([Sanctuary Computer](https://www.sanctuary.computer/harvey)) | **El estilo Apple aplicado a IA**: el resultado en un contexto humano. **Un único motivo animado de marca**: la S | — |
| **Anthropic** | Campaña «Keep thinking»: optimismo cálido, lejos de la estética fría de la IA ([Creative Review](https://www.creativereview.co.uk/anthropic-claude-keep-thinking-campaign/)) | **Urgencia sin catástrofe**: «nunca ha habido mejor momento para quien sabe usarla» | — |
| **España** | **Founderz** compite en volumen («700.000» profesionales, Microsoft, FUNDAE). **PwC España** reclama el mismo diferencial. **Big Four**: plataforma y escala. Deloitte y KPMG son clientes o tienen relación con Spiralia. thePower no es un rival frontal: Jose es director académico de su programa Power IA, así que conviene tratarlo como canal (R1 §2.8) | **No competir en «cuántos», sino en «cuánto se usa después»** (ING, del 66 % al 92 %). Frente a las grandes: equipo senior, rapidez, especialización e independencia del proveedor | Atacar a las Big Four |

**Las dos lecciones que lo atraviesan todo:**
1. **Las firmas de clase hablan como institución, no como persona.** Usan un banco de socios con nombre o un pedigrí colectivo. Las excepciones (Palantir, Varick) giran en torno a fundadores mediáticos y no son el modelo para una boutique. Eso respalda tu queja n.º 1 (R1 §0.8).
2. **La urgencia se construye con una brecha, no con el miedo.** «Un club pequeño gana y la mayoría se queda atrás» deja al lector la pregunta «¿en qué lado estoy?». El diagnóstico de Spiralia tiene que responderla.

**Cifras que no hay que usar.**
- «El 95 % de los pilotos de IA fracasa» (MIT NANDA): la muestra es pequeña y la definición de fracaso muy estrecha ([crítica](https://arnon.dk/mits-95-ai-failure-rate-is-wrong/)).
- «Multas de 35 millones por no formar», que es falso: esa cifra es para prácticas prohibidas (`investigacion/02` §5.4).
- Las versiones antiguas de las cifras propias que circulan en decks públicos: «+92 %» (el 92 % es un nivel, no un crecimiento), «4,6» de satisfacción y «más de 30.000» alumnos (`investigacion/03` §9).
- Cifras de proveedores de software (G2) presentadas como datos de compradores de formación o consultoría (R3 §16).

---

## 4. Mapa de palancas de persuasión

**Regla de clase [Opinión].** Cada palanca tiene una versión con clase, la que sirve al directivo ante su consejo, y una barata, la que le presiona a él. La línea roja es la verdad comprobable.

**Fórmula de la página (R4 §1):**
1. el problema, en clave de pérdida;
2. la prueba;
3. la solución, en clave de ganancia;
4. un primer paso sin riesgo.

**Monge Malo y Apple, cada uno en su papel:**
- **De la respuesta directa** sale la mecánica: tensión, «tú», concreción, objeciones con nombre y un solo CTA.
- **De Apple** sale la forma: una idea por titular, frases cortas, el resultado a la vista y ritmo.

Sobre Monge Malo:
- No se ha podido verificar ninguna fuente de primera mano sobre su estilo; lo descrito es el género de la respuesta directa. [No verificado]
- Luis Monge Malo e Isra Bravo son copywriters distintos; en A1 aparecen confundidos.

| Palanca | Versión con clase | Dónde va (bloque de la sección 6) | Pieza concreta | Prohibido |
|---|---|---|---|---|
| **Ver el éxito** (Apple) | Un momento, un objeto real del trabajo, un cargo, un verbo de resultado y quién decide | 1 Hero, 7 Así se ve, 8 Para ti | H1 «Toda tu empresa, trabajando con IA.»; «Lunes por la mañana. La propuesta ya está en borrador. Ella decide el precio.»; «Lo que te llevas» | Titulares que no se pueden filmar («La ventaja se despliega») |
| **Prueba social** | Pares con nombre y cifra; una comparación honesta | 2 Franja, 4 Casos | «Misma herramienta. Mismo grupo.» con 4,7 frente a 3,2 (la causa, solo si se confirma: sección 2.1) · ING del 66 % al 92 % · Deloitte, 13.000 en un mes (si lo autoriza) · CCEP, 218 casos identificados · testimonios reales | «+50.000 clientes felices», estrellas, «+92 %», logos sin permiso (sección 2.8) |
| **Autoridad** | Colectiva, por rigor y por haber estado del lado del cliente | 2 Franja, 10 Por qué Spiralia, fuentes al pie | McKinsey · KPMG · EY-Parthenon · UFV en una línea, exacta y con permiso (2.8); cada cifra con fuente; BCG 10-20-70 como autoridad prestada | «Líderes del sector», biografías de CV |
| **Unidad** («de los nuestros») | Venimos de tu lado de la mesa; se construye contigo | 2 Franja, 6 Qué hacemos, 10 Por qué Spiralia | «Hemos estado al otro lado de la mesa.» · «Un consultor que entiende tu negocio y un ingeniero que lo construye, en tu mesa.» · «Los casos los encuentran los propios equipos.» (efecto IKEA) | «La familia Spiralia», «únete a la revolución» |
| **Aversión a la pérdida / coste de no actuar** | La cuenta la hace el lector | 3 Por qué ahora, 12 Cierre | «Ya pagas la IA. Ahora, que trabaje.» · «Mientras tanto, la licencia se paga igual.» · «Haz la cuenta de este trimestre» | Culpar («estás tirando el dinero»), catastrofismo, miedo al empleo |
| **Urgencia real** | Solo si pasa la prueba de las 5 preguntas (abajo) | 3, 12 | La curva que se enfría en semanas (NBER) · el 6 % que se aleja · presupuesto de 2027 · artículo 4 del Reglamento de IA, en tono sobrio | Cuentas atrás, «últimas plazas», fechas que se renuevan |
| **Reciprocidad** | Criterio útil antes de pedir nada | 5 Diagnóstico, 8 Para ti, 9 El primer paso | Diagnóstico sin datos · guía 2027 · programa de ejemplo · ficha para IT · acta de Rumbo de muestra · «Te llevas el primer paso por escrito, trabajes o no con nosotros» [confirmar] | Un ebook a cambio de seis campos |
| **Compromiso y coherencia** | Una escalera visible de tiempo | 5, 9, 12 | 3 minutos (diagnóstico) → 30 minutos (conversación) → 3 horas (Rumbo) → programa | Saltar directamente a «compra» |
| **Reversión del riesgo** | Garantías concretas y verificables, contadas como compromiso, no como reclamo | Microtexto del CTA, 8 Tecnología, 9 Rumbo, 11 FAQ | «Trabajamos dentro de tu entorno, con las herramientas y permisos que aprueba tu IT» · «Lo que construimos vive en tus sistemas y es tuyo» [confirmar] · «Sin permanencia» · garantía de claridad en Rumbo [decisión]. Todo, igual que en el contrato (sección 2.8) | «ROI garantizado», «en 90 días» si no se puede cumplir, «tus datos no salen de tu entorno» si la herramienta es de un tercero, sellos de «garantía» |
| **Simpatía** | Similitud y humildad deliberada (efecto *pratfall*) | 7, 10, 11 | «No todo necesita un agente.» · «Si en Rumbo no vemos valor, te lo diremos.» · caras del equipo | Colegueo, humor fácil, elogios al lector |
| **Escasez / selectividad** | Solo si es real | 9 El primer paso | «Rumbo es para comités que ya tienen la IA en casa y quieren que se note.» · capacidad de ingenieros [confirmar] | «Solo 3 plazas» |
| **Pico y final** | El cierre como pico, no como formulario | 12 Cierre | Vídeo, una promesa, «Qué pasa después» en 3 pasos y un botón | Cerrar con texto legal |

**Prueba de urgencia ética (R4 §8.1).** Si alguna respuesta es «no», esa urgencia no va en la web.
1. ¿Es verdad y se puede verificar con una fuente?
2. ¿Afecta a este lector en concreto?
3. ¿Existiría aunque Spiralia no existiera?
4. ¿Propone un paso proporcional (3 horas, 30 minutos)?
5. ¿La firmaría un socio de consultoría estratégica delante del cliente?

**Del bruto a Spiralia (R4 §5.4).** Las frases de la primera columna son caricaturas para ilustrar el filtro, no citas de nadie.

| Respuesta directa en bruto | Forma Apple | Versión Spiralia |
|---|---|---|
| «Estás tirando el dinero en licencias.» | «Licencias pagadas. Trabajo igual.» | «Ya pagas la IA. Ahora, que trabaje.» |
| «Los cursos de IA no sirven para nada.» | «El curso acaba el viernes. ¿Y el lunes?» | «El curso acaba el viernes. Lo que cuenta empieza el lunes.» |
| «Los técnicos no te entienden.» | «La IA, en tu idioma.» | «Hablamos de cuenta de resultados, no de algoritmos.» |
| «Reserva ya, que quedan pocas fechas.» | «Empieza en 3 horas.» | «Empieza por Rumbo: 3 horas con tu comité.» |
| «Resultados garantizados.» | «Funciona. O seguimos.» | «Nos quedamos hasta que funciona.» |

### 4.1 El mensaje para cada perfil

Lo que cada lector tiene que entender en cinco segundos al llegar a su pestaña de «Para ti». Sale de `investigacion/02` §6-8, A1 §1 y §6.6 y R1 §5. Las cifras ya están en `cifras.toml`. [Opinión, salvo las fuentes citadas]

| | CEO o dirección general | Personas y Formación (CHRO, L&D) | Tecnología (CTO, CIO) |
|---|---|---|---|
| **Su frase** | «He firmado las licencias. Si dentro de un año el consejo me pregunta qué ha cambiado, ¿qué le enseño?» | «Te piden productividad. Tu gente te pide rumbo.» | «Otra demo que luego me toca mantener a mí.» |
| **Su miedo** | Pagar sin retorno y depender de un proveedor pequeño | Que la IA se lea como recorte y que la formación no cambie nada | La caja negra, la dependencia y la IA «en la sombra» |
| **Titular de su pestaña** | «Has invertido en IA. Que se note en la cuenta.» | «Te piden productividad. Tu gente te pide rumbo.» | «Menos pilotos. Más soluciones en uso.» |
| **Ver el éxito** | Su comité sale de Rumbo con los primeros casos priorizados y quién lidera cada uno | «Del comité a la primera línea»: el uso medido semanas después del curso, no las horas de aula | Una solución que funciona dentro de su entorno, con permisos, registro y autonomía que se gana con pruebas |
| **Prueba** | ING: del 66 % al 92 % de usuarios activos semanales | ING: 4,7 sobre 5 de satisfacción frente a 3,2 | Por ahora ninguna con nombre: hace falta un caso anonimizado (sección 7.2, n.º 13) |
| **Urgencia, en su idioma** | La licencia se paga igual · el presupuesto de 2027 · el 6 % se aleja | El uso se enfría en semanas (NBER) · el artículo 4, en tono sobrio | Cuando el negocio construye sin IT, el riesgo llega antes que el valor |
| **Lo que le quita el miedo** | Rumbo, 3 horas y por escrito · «Hablas con el equipo que lo va a hacer» | Programa de ejemplo descargable · transparencia con la plantilla y la RLT | Ficha de seguridad y gobierno · «Lo construido es tuyo» · «Habla con un ingeniero» |
| **CTA** | «Quiero Rumbo para mi comité» | «Descarga un programa de ejemplo» | «Habla con un ingeniero · 30 minutos» |

**Señales de boutique, sin decir «boutique»** (R4 §7). Cualificar sin decir «exclusivo» («Rumbo es para comités que ya tienen la IA en casa»). Discreción («Contamos sus resultados sin su nombre»). Oficio visible (recogemos las tareas y la jerga de cada perfil antes de la primera sesión). Contención (sin precio, sin comparativas, mucho aire). Respeto por la agenda (cada CTA dice cuánto tiempo pide). Y el mérito, al cliente: «Los casos los encuentran los propios equipos».

---

## 5. Mejores prácticas y tendencias de marketing y ventas B2B (2026)

### 5.1 Cómo compra hoy un comité de dirección

| Tendencia | Dato | Qué implica para Spiralia [Opinión] |
|---|---|---|
| **Compra sin comercial… pero con validación humana** | El 67 % prefiere comprar sin comercial y el 45 % usó IA en una compra reciente ([Gartner, mar-2026](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience)). El 69 % contrasta con un comercial lo que le dice la IA ([Gartner, may-2026](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights)) [Estudio] | La web tiene que dejar avanzar solo (diagnóstico, materiales) y la llamada de 30 minutos tiene que aportar criterio, no una presentación de la empresa |
| **Grupos de compra grandes y divididos** | 13 personas internas y 9 influyentes externos; con IA generativa, el doble. «Pruebas, no promesas» ([Forrester 2026](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/)). El 68 % de los equipos de compra vive conflictos internos dañinos ([Gartner](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai)) [Estudio] | **Armar a quien defiende la compra dentro** con material que pueda reenviar a CFO, IT, Legal y comité de empresa. Un resultado del diagnóstico que se pueda compartir |
| **La lista corta se decide antes del primer contacto** | El primer contacto llega al 61 % del recorrido y el ganador estaba en la lista del primer día en el 95 % de los casos ([6sense 2025](https://6sense.com/report/buyer-experience/)) [Estudio/Vendedor] | Hay que estar en la cabeza del comprador antes de que busque: LinkedIn, prensa, eventos |
| **Compradores ocultos** | Más del 40 % de las operaciones se atasca por desalineación interna. El 71 % de los compradores ocultos apenas habla con ventas, y el 95 % es más receptivo si hay buen liderazgo de pensamiento ([Edelman y LinkedIn, 2025](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report)) [Estudio] | Un ensayo o informe que el CEO pueda reenviar. Fichas por rol |
| **El CEO, presionado por resultados** | En torno al 78-80 % de los CEO cree que su puesto peligra si la IA no da resultados antes de que acabe 2026 ([Dataiku y Harris Poll](https://www.dataiku.com/company/news/global-ai-confessions-report-ceo-edition-2026)) [Vendedor] | Confirma la tensión «¿qué le enseño al consejo?». Usarlo en conversación, no en la web, porque es dato de un vendedor |
| **La regla 95:5** | Solo en torno al 5 % de las cuentas está comprando en un trimestre dado ([Ehrenberg-Bass / LinkedIn B2B Institute](https://marketingscience.info/news-and-insights/the-955-rule-why-b2b-growth-starts-long-before-the-purchase)) [Experto] | Hace falta una vía para el 95 % que no compra hoy: newsletter, guía, Mesa Rumbo |

### 5.2 En la web

1. **Página `/reserva/` con calendario y respuesta en el día.** Formulario de 4 campos (nombre, email de trabajo, empresa y «lo que más te importa») y Bookings justo después. «Te respondemos en un día laborable» [confirmar]. Para asistentes, buzón copiable. Ver la sección 2.5.
2. **Contenido abierto que sirva al comité, sin pedir datos.** La investigación original es lo único que justifica pedir un email, y el email es opcional ([NN/g](https://www.nngroup.com/articles/content-behind-forms/)). Tres piezas de lanzamiento (A4 §4):
   - «Presupuesto de IA 2027: las 10 preguntas que tu comité debe hacerse antes de aprobarlo», para el CEO;
   - un programa de ejemplo anonimizado, para RR. HH. y L&D;
   - una ficha de seguridad y gobierno de una página, para el CTO y Compras.
   - Más adelante, el buque insignia: un **barómetro anual con datos agregados de los 50.000 alumnos**. Requisito: que cada cliente autorice el uso agregado y anónimo de sus datos y que la metodología se publique (R3 §8.2).
3. **El diagnóstico como herramienta del comité.** Que dé:
   - ocho dimensiones en barras y el porqué del nivel;
   - «dónde está el 6 %»;
   - pasos según lo que más preocupe al lector;
   - un enlace para compartir con las respuestas en el fragmento de la URL (sin datos al servidor);
   - un PDF opcional que se genera y descarga en el propio navegador, sin pedir email. Enviarlo por email exigiría un servidor y la primera capa de RGPD (2.8);
   - y como CTA, la reserva con el resultado adjunto.
4. **GEO (visibilidad en buscadores con IA).** Google dice que no hay trucos: la base es el contenido «no commodity» basado en experiencia propia, y los datos estructurados tienen que coincidir con el texto visible ([Google](https://developers.google.com/search/docs/appearance/ai-features); [cobertura de la guía de mayo de 2026](https://www.searchenginejournal.com/googles-official-advice-on-optimizing-for-ai-overviews-ai-mode/547341/)).
   - Añadir estadísticas, citas y fuentes puede aumentar hasta un 40 % la visibilidad de un texto en respuestas generativas ([GEO, KDD 2024](https://arxiv.org/abs/2311.09735v3)) [Estudio].
   - La regla de Spiralia de poner fuente y fecha a cada cifra es justo lo que premia este entorno. Hay que explotarla con frases autosuficientes y citables, por ejemplo: «En ING España, los usuarios activos semanales de IA pasaron del 66 % al 92 % con el programa de Spiralia (medición interna del grupo ING, 2026)».
5. **Medición sin cookies desde el primer día.** Es mejor conservar «Esta página no usa cookies», que transmite seriedad, que activar el retargeting web.
6. **Vídeo.** De fondo en el hero; un vídeo de Rumbo de 60-90 s con imágenes reales; testimonios de 30-45 s; todo con subtítulos y alojado sin cookies. Un YouTube estándar pone cookies y rompe la frase del pie.
7. **Lo que no hay que hacer:** chat con IA, calculadora de ROI pública, identificar empresas por su IP sin el visto bueno del DPO, páginas por variante de búsqueda (Google lo trata como abuso), ebooks genéricos y ventanas emergentes.

### 5.3 En el funnel alrededor de la web

1. **LinkedIn: un coro de tres voces, no un solista.**
   - Los perfiles personales tienen más alcance e interacción que las páginas de empresa, pero las páginas de empresa se comparten mucho más ([Metricool 2026](https://metricool.com/linkedin-trends/)) [Vendedor].
   - **Las voces:** Ana, para CEOs (estrategia y cuenta de resultados); Jose, para CHRO y L&D (adopción, formación y Reglamento de IA); un ingeniero o profesor, para el CTO.
   - **La marca:** todas firman «… en Spiralia» y mencionan la marca. Las menciones de marca son la señal más correlacionada con aparecer en las respuestas de IA de Google ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)) [Vendedor].
   - **Cadencia de partida:** 2 posts a la semana por voz y un artículo largo al mes.
   - **Promoción:** los mejores posts, como Thought Leader Ads segmentados por lista de empresas. Medir por cuentas que avanzan, no por clics: en los datos de ZenABM, más CTR no predice más *pipeline* ([ZenABM](https://zenabm.com/blog/tla-benchmarks/)).
   - **Argumento comercial:** un equipo visible responde, sin decirlo, a la objeción «¿y si mañana no estáis?».
2. **ABM ligero.**
   - 50-100 cuentas, priorizando sectores donde ya hay prueba (banca, servicios profesionales, gran consumo) y empresas con licencias ya firmadas.
   - El mapa del comité de compra de cada cuenta en el CRM, con un mensaje por rol: el CEO, la Mesa Rumbo; el CHRO, el caso ING; el CIO, la ficha para IT; el CFO, cómo se mide.
   - Sin identificación por IP, y sin subir listas de contactos a LinkedIn sin base jurídica validada por el DPO (R3 §9.3).
3. **Ganar medios.** El 84 % de las citas de ChatGPT, Claude y Gemini viene de medios ganados ([Muck Rack, vía AI Magazine](https://aimagazine.com/globenewswire/3290268)) [Vendedor]. El barómetro propio con nota de prensa a la prensa económica y de RR. HH. mueve más la aguja que cualquier ajuste técnico.
4. **Mesa Rumbo trimestral.** 10-12 directivos del mismo perfil, desayuno de 90 minutos con regla de Chatham House y un cliente como ponente. Las mesas presenciales superan a las *masterclasses* en asistencia de directivos ([Ortus Club](https://www.ortusclub.com/?p=71417)) [Vendedor]. En la web, un bloque «Próxima Mesa Rumbo · Solicita invitación».
5. **Velocidad y secuencia comercial.**
   - Respuesta personal en menos de una hora hábil como objetivo interno. En la web se promete menos de lo que se cumple: «Te respondemos en un día laborable» (6.4).
   - Confirmación con agenda, quién asiste y el caso más parecido como lectura previa, y recordatorio la víspera.
   - Resumen escrito de Rumbo en 48 horas: es el documento que reenvía quien defiende la compra dentro.
   - Vídeo personal de 60 s de quien hará la sesión.
   - Referencia de un cliente bajo petición.
6. **Email.** Medir clics y respuestas, no aperturas: Apple Mail Privacy Protection infla las aperturas ([BounceZero](https://bouncezero.io/email-open-rate-guide-2026)) [Vendedor]. Texto plano, una petición por email y firma «equipo de Spiralia AI».
7. **Cómo compite una boutique con las Big Four.** Con seniority («hablas con quien lo va a hacer»), rapidez y alcance cerrado (Rumbo en 3 horas), independencia del proveedor («con la IA que ya tiene tu empresa») y especialización. Nunca atacando: Deloitte es cliente.

**KPIs mínimos (R3 §15, A4 §8):**
- **Principales:** reuniones de Rumbo con cuentas objetivo por trimestre y *pipeline* cualificado en euros.
- **Web:** tasa de reserva por origen, embudo del diagnóstico, perfil elegido y hasta dónde se lee.
- **Ventas:** tiempo hasta la primera respuesta y reservas → celebradas → propuestas → firmas.
- **Presencia en IA:** un panel mensual de 25 preguntas del ICP en ChatGPT, AI Mode, Copilot y Perplexity, más el informe de IA de Bing.
- Con volumen de boutique, mirar tendencias trimestrales, no pruebas A/B. Para el mensaje, la **prueba de los cinco segundos con 5 directivos** del ICP.

---

## 6. Blueprint del rediseño

**Objetivo:** pasar de 15.957 px a unos 11.500 px en escritorio (de unas 18 a 12-13 pantallas) y de 20.362 a unos 15.000 px en móvil. De unas 2.200 palabras a unas 1.400-1.600. (Alturas y palabras medidas en `e01bd8f` con `?still=1`. La versión en curso, con las tarjetas nuevas de Casos, ya mide 16.804 y 21.239 px: va en sentido contrario.) Un CTA cada 2 pantallas, como mucho. Y titular en dos líneas solo en 4 momentos: hero, problema, casos y cierre.

### 6.1 Arquitectura de la página, en orden

| # | Bloque (ancla) | Objetivo | Palanca | Contenido | CTA | Alto (escritorio) / fondo |
|---|---|---|---|---|---|---|
| 0 | **Barra** | Orientar y tener siempre a mano el paso siguiente | Poca fricción | Logo · Casos · Método · Para ti · Por qué Spiralia · EN · [Hablemos]. Transparente sobre el vídeo y sólida al bajar (72 → 60 px). Menú a pantalla completa en móvil. Indicador de sección activa | «Hablemos» (misma reserva) | 72 px |
| 1 | **Hero** (`#top`) | Que el CEO vea el resultado en 5 segundos y sepa qué hacer | Ver el éxito + prueba pegada | Vídeo de fondo; antetítulo; H1 de 2 líneas; subtítulo de 20 palabras o menos; píldora de prueba ING; botón y enlace; «Ver la película · 20 s»; pausa (sección 6.2) | **«Reserva 30 minutos»** + enlace «Diagnóstico en 3 minutos →» | 100svh / vídeo |
| 2 | **Franja de prueba** | Credibilidad inmediata y el diferencial | Prueba social + autoridad + unidad | «Más de 50.000 personas formadas» · 6-8 logos fijos, normalizados y autorizados (2.8) · **«Venimos de la consultoría estratégica: hablamos de negocio, no de tecnología.»** · «¿Qué diriges? La compañía · Personas y Formación · Tecnología» (anclas a las pestañas) | Accesos por perfil | 220 / noche |
| 3 | **Por qué ahora** (`#reto`) | Que el lector reconozca el problema como suyo y vea lo que le cuesta | Pérdida / coste de no actuar + autoridad prestada | H2 «Ya pagas la IA. / Ahora, que trabaje.» · la curva que se enfría (55 % → menos del 40 %, NBER) · «Mientras tanto, la licencia se paga igual.» · el 80 % frente al 6 % en **una frase** · «Dentro de un año, tu consejo te preguntará qué ha cambiado.» · «Haz la cuenta de este trimestre» en 3 líneas · fuentes en un desplegable | «¿Cuánto te está costando a ti? Haz el diagnóstico · 3 minutos» | 1.000 / papel |
| 4 | **Casos** (`#pruebas`) | Convencer con pares | Prueba social con nombre y cifra | **ING a todo el ancho**: «Misma herramienta. Mismo grupo.» (la causa, solo si se confirma: 2.1), del 66 % al 92 % en una barra (sin contador), 4,7 frente a 3,2, y foto de sesión si hay permiso. **Deloitte y CCEP** en dos tarjetas con la cifra arriba, si ambos lo autorizan (2.8); si Deloitte no, un caso anonimizado. Testimonios solo reales. Línea de discreción: «Algunos clientes prefieren no aparecer. Contamos sus resultados sin su nombre.» | «¿Quieres este resultado en tu empresa? **Reserva 30 minutos**» + «¿Prefieres hablar antes con un cliente? Te lo presentamos» [con permiso] | 1.100 / noche |
| 5 | **Diagnóstico** (`#diagnostico`) | Dar valor sin pedir nada y responder «¿en qué lado estás?» | Reciprocidad + compromiso + comparación social | «¿Dónde está tu empresa con la IA? / Tres minutos para saberlo.» Primera pregunta ya visible, sin pantalla de «Empezar». Resultado por dimensiones, el porqué y «dónde está el 6 %». Preguntas con «tu empresa», no con «vosotros» | En el resultado: «**Revisa este resultado con nosotros · 30 minutos**» (con las respuestas adjuntas) · «Compártelo con tu comité» · «Recíbelo en PDF» | 700 / navy |
| 6 | **Qué hacemos + método** (`#como`) | Que se entienda en tres actos y que no parezca un proyecto eterno | Autoridad por método + unidad + compromiso | H2 «Formamos. Construimos. / Y nos quedamos hasta que funciona.» Tres actos: **Formamos a cada persona con su trabajo** · **Construimos con tus equipos** (un consultor y un ingeniero de Spiralia) · **Te dejamos en marcha** («Nuestro mejor resultado: equipos que ya no nos necesitan»). SPIRAL como secuencia fija (la S a la izquierda, un paso por pantalla) y carrusel en móvil. Detalle y la sigla FDE, plegados | «El primer paso son 3 horas con tu comité. Cómo empezar →» (ancla al bloque 9) | 1.100 / papel |
| 7 | **Así se ve** (`#asi-se-ve`) | Que cada perfil se vea trabajando con la IA | Ver el éxito + oficio | H2 «Un lunes cualquiera, con la IA trabajando.» Demo por perfil, el caso de la propuesta comercial y 2 tarjetas (Finanzas y Personas). Definición de «agente» en una línea antes del caso. Remate: «La IA prepara. Una persona decide.» Etiqueta «Ejemplo ilustrativo» en el flujo. Se quita la tarjeta de banca, que duplica la demo | «¿Qué proceso de tu empresa podría trabajar así? **Lo vemos en 30 minutos**» | 1.400 / noche |
| 8 | **Para ti** (`#para-ti`) | Que cada perfil se reconozca y vea su miedo resuelto | Identificación + reversión del riesgo por perfil | Tres pestañas, con chips desplazables en móvil: **La compañía** («Has invertido en IA. Que se note en la cuenta.»), **Personas y Formación** («Te piden productividad. Tu gente te pide rumbo.»), **Tecnología** («Menos pilotos. Más soluciones en uso.»: tu entorno, tus permisos, registro, autonomía gradual, traspaso). Cada una con la voz del lector, «Lo que te llevas» y una prueba | Uno por pestaña: «Quiero Rumbo para mi comité» · «Descarga un programa de ejemplo» · «Descarga la ficha para IT» / «Habla con un ingeniero · 30 minutos» | 1.000 / claro |
| 9 | **El primer paso** (`#formatos`) | Que el primer paso sea fácil de aprobar | Compromiso pequeño + recomendación clara (JOLT) + selectividad | **Rumbo como producto**: nombre, «3 horas · tu comité de dirección», «Tu comité entra con preguntas. Sale con un plan.», qué te llevas en 3 viñetas («los primeros casos priorizados por su valor, quién lidera cada uno y el siguiente paso, por escrito» [confirmar]), «No es una charla inspiradora: es una sesión para decidir.». Debajo, «Después, a tu ritmo»: Programa por perfil · Despliegue en tu equipo. Bloque **«Tres formas de empezar»**: 3 min · 30 min · 3 h | «Quiero Rumbo para mi comité» → `/reserva/?d=rumbo` | 800 / papel |
| 10 | **Por qué Spiralia** (`#quienes`) | Autoridad colectiva y responder a «¿quién está detrás?» | Unidad + autoridad + simpatía | H2 «Hablamos el idioma del negocio. / Y enseñamos IA en la universidad.» Tres argumentos: «Hemos estado al otro lado de la mesa» (McKinsey, KPMG, EY-Parthenon) · «Explicamos la IA sin humo» (Grado en IA de la UFV) · «Estrategia e ingeniería, en la misma mesa». **Retícula del equipo**: 4-6 personas, mismo tamaño y tratamiento, nombre · papel · origen; Ana es una más (u opción B de 6.7). «Más de una década trabajando con empresas» (dato de la marca: confirmar el año de fundación y darlo de alta en `cifras.toml`) | — (el siguiente bloque ya convierte) | 1.000 / claro |
| 11 | **Preguntas del comité** (`#preguntas`) | Desactivar el miedo a equivocarse | Reversión del riesgo + candor | 6 preguntas visibles y «Ver todas», con la de seguridad primero. Nuevas: «¿Sois lo bastante grandes para nosotros?» (Deloitte, 13.000 en un mes, si lo autoriza; si no, los 50.000) · «¿Y si no funciona?» · «¿Nos quedamos con lo construido?» · «Vamos a renovar las licencias. ¿Esperamos?». La del precio, sin «sin compromiso»: «Lo vemos en 30 minutos y te llevas una propuesta de primer paso.» | «30 minutos» enlazado a `/reserva/?d=precio` | 800 / claro |
| 12 | **Cierre** (`#hablemos`) | El pico final y la acción | Urgencia real + reciprocidad + unidad + reversión del riesgo | Vídeo de la firma con velo, H2 de 2 líneas, urgencia antes del botón, «Qué pasa después» en 3 pasos, prueba mínima (sección 6.4) | **«Reserva 30 minutos»** + buzón de equipo copiable | 900 / vídeo |
| 13 | **Pie** | Confianza y discreción | Autoridad tranquila + privacidad | 4 columnas (Spiralia AI · Spiralia · Contacto · Legal), «Sin cookies. Solo contamos visitas, de forma anónima.» destacado, nota de marcas registradas, la marca grande recortada (sección 6.5) | Alta en «Notas para el comité» (casilla sin marcar) [cuando exista] | 500 / noche |

**Ritmo de fondos:** vídeo → noche → papel → noche → navy → papel → noche → claro → papel → claro → claro → vídeo → noche. Nunca tres bloques oscuros seguidos.

**Alternativa más corta (A2):** integrar «Para ti» en «El primer paso» como selector de perfil, para quedarse en 11 bloques. Se recomienda mantener las pestañas porque A1 las considera la mejor sección de la página. Hay que medirlo con `seccion_vista`.

### 6.2 Especificación del hero con vídeo a pantalla completa

Basada en R2 §7. Se marca lo que V2 ya cumple.

**Estructura:**
- 100svh, mínimo 640 px en escritorio y 560 px en móvil.
- Texto abajo a la izquierda en escritorio y en la mitad inferior en móvil.
- Logos y accesos por perfil, en la franja de debajo. **[Hecho]**

**Capas, de atrás adelante:**
1. Fondo azul noche.
2. `<picture>` del póster (fotograma 0, vertical u horizontal), que es el elemento de LCP.
3. `<video>` con fundido de 0,8 s al reproducirse.
4. Velo con degradado superior para la barra, degradado inferior para el texto y refuerzo radial abajo a la izquierda.
5. Grano estático del 4-6 %.
6. Texto y botones.
7. Controles. **[Hecho]**

**Copy de lanzamiento:**

| Pieza | ES | EN |
|---|---|---|
| Antetítulo | «Spiralia · IA para empresas» (se mantiene) | «Spiralia · AI for business» |
| H1 | «Toda tu empresa, / trabajando con IA.» (se mantiene: pasa la prueba de la cámara y casa con el vídeo) | «Your whole company, / working with AI.» |
| Subtítulo (18 palabras) | «Formamos a cada persona con su propio trabajo. Y construimos con tus equipos hasta que la IA da resultados.» | «We train every person on their own work. And we build with your teams until AI delivers results.» |
| Píldora de prueba (encima del H1 o bajo el botón, a 15-16 px y en claro) | «ING España · usuarios activos semanales, del 66 % al 92 % →» (enlace a Casos; con la base de la medición confirmada: 2.8) | «ING Spain · weekly active users, from 66% to 92% →» |
| CTA principal | «Reserva 30 minutos» | «Book 30 minutes» |
| Microcopia del CTA | «Con el equipo que lo haría. Sales con un primer paso propuesto.» | «With the team that would do it. You leave with a proposed first step.» |
| Enlace secundario | «Diagnóstico en 3 minutos →» | «3-minute assessment →» |
| Película | «Ver la película · 20 s» (en un `<dialog>` con controles, transcripción y CTA al terminar) | «Watch the film · 20 s» |

**Variante para validar con 5 directivos:** el H1 de urgencia «La IA ya está en tu empresa. / Los resultados, todavía no.», que es el que recomiendan A1 y R1. Más titulares candidatos en el anexo A.

**Tipografía:**
- H1 en Butler 300, `clamp(2.6rem, 5.8vw, 6rem)`, interlineado 1,02. La segunda línea en `#A9B1B8`. Cada línea lógica, en una sola línea en pantallas de 1280 px o más, con `text-wrap: balance`.
- Antetítulo en `#E0DFDA`.
- Subtítulo de 40ch como máximo.
- Sin `text-shadow` para «arreglar» la legibilidad: si hace falta, es que el vídeo está demasiado claro.

**Contraste:**
- Con el velo aplicado, ningún fotograma supera 0,06 de luminancia relativa bajo el H1 (objetivo de 7:1 o más por el trazo fino de Butler Light).
- Bajo los textos pequeños en gris, el límite es 0,057.
- Si no se cumple, se oscurece el vídeo, no el velo.
- V2 mide al menos 7,6:1. **[Hecho]**

**Comportamiento:**
- Sin `autoplay` en el HTML. El JS asigna `src` y llama a `play()` solo si no hay `?still=1`, «reducir movimiento», Save-Data ni 2G.
- Archivo según orientación. WebM VP9 con respaldo en H.264.
- Si `play()` se rechaza (modo de bajo consumo de iOS), póster limpio y sin botón de pausa.
- Pausa fuera de pantalla y con la pestaña oculta.
- Pausa accesible (WCAG 2.2.2) cuya elección se recuerda en `localStorage`.
- Todo lo anterior **[Hecho]**. **Pendiente:** que la animación de salida (escala 1,04-1,06 y oscurecido) funcione con `overflow:clip` y se desactive con «reducir movimiento».

**Pesos objetivo:**

| Archivo | Pieza de HyperFrames | Metraje real |
|---|---|---|
| Horizontal 1920×1080 | 1,2 MB o menos | 3 MB o menos |
| Vertical 720×1280 | 0,7 MB o menos | 1,8 MB o menos |
| Póster | WebP de 80 KB o menos | ídem |

- Bucle de 12 s a 24-25 fps.
- Presupuesto de la primera pantalla en móvil: 1,2 MB o menos. LCP p75 de 2,5 s o menos y CLS 0.
- Hoy `hero-h.mp4` pesa 1,09 MB y `hero-h.webm`, 636 KB: **[Hecho]**. Pendiente: `firma-h.mp4`, que pesa 1,44 MB.

**Qué enseña el vídeo:**
- **Reglas:** sin texto, cifras ni logos; sin cerebros, robots ni azul neón; paleta Monocromo Spiralia; zona de texto oscura; movimiento lento; bucle perfecto.
- **Lanzamiento:** la pieza actual de HyperFrames, «la organización se enciende» (puntos que se iluminan y se conectan con trazos en S). **[Hecho]**
- **Versión definitiva: metraje real.** Un día de rodaje con 2-3 sesiones y un comité, y 6-8 planos de 1,5-2,5 s:
  1. una sala grande desde atrás;
  2. manos en el portátil con la pantalla desenfocada;
  3. el comité alrededor de una mesa;
  4. un ingeniero y un empleado ante la misma pantalla;
  5. pósits con un proceso;
  6. una libreta con «SPIRAL»;
  7. gente que asiente al final;
  8. luz de mañana en Madrid.
- **Técnica del rodaje:** 4K a 25 fps en LOG, etalonaje frío hacia azul noche y greige, y encuadre pensado ya para el recorte 9:16.
- **Permisos:** derechos de imagen de quien sea reconocible y permiso del cliente.
- **Nunca metraje sintético que parezca real:** si en algún momento se usara vídeo de personas generado con IA, el artículo 50 del Reglamento de IA obliga a avisar, y presentarlo como una sesión de Spiralia sería engañoso (2.8).
- El HTML no cambia: solo los archivos.

**Criterios de aceptación:**
1. LCP p75 de 2,5 s o menos en móvil, sea el póster o el subtítulo (hoy es el subtítulo: A3 §1.2). El vídeo nunca es el elemento de LCP.
2. Con «reducir movimiento», Save-Data o 2G no se descarga ni un byte de vídeo.
3. Teclado y foco correctos en la pausa y en la película.
4. Contraste medido en todos los fotogramas.
5. Los acentos se ven en todos los textos del hero.
6. Un solo archivo de vídeo para ES y EN.

### 6.3 Barra de navegación

- **Hecho en V2:** transparente sobre el vídeo y sólida (`rgba(5,26,43,.86)` con desenfoque) cuando el vídeo deja de estar detrás. Lo dispara un `IntersectionObserver`, sin escuchar el scroll. Menú móvil a pantalla completa.
- **Anclas:** cuatro (Casos · Método · Para ti · Por qué Spiralia) + EN + [Hablemos]. Menos de 5 enlaces, como los SaaS que más convierten ([SaaS Hero](https://saashero.net/content/b2b-saas-landing-page-examples/)) [Vendedor].
- **Añadir:**
  - indicador de sección activa (`aria-current` y subrayado de 1 px);
  - altura de 72 → 60 px en estado sólido;
  - «Hablemos» siempre visible, sin ocultar la barra al bajar;
  - en móvil, el CTA fijo inferior (ya existe) que desaparece en el diagnóstico y en el cierre;
  - siempre sólida con el menú abierto o con `prefers-reduced-transparency`.
- **Formato:** barra a ancho completo, más sobria y de consultora. La píldora flotante es más de *startup* SaaS.
- **Referencia:** la categoría móvil de [navbar.gallery](https://suupercharged.substack.com/p/welcome-to-navbar-gallery).

### 6.4 CTA: sistema y cierre

**Un verbo por nivel en toda la página:**

| Nivel | Texto ES / EN | Destino | Dónde |
|---|---|---|---|
| Principal (alto compromiso) | **«Reserva 30 minutos»** / «Book 30 minutes». En la barra: «Hablemos» / «Let's talk» | `/reserva/?d=<origen>`: página con la marca, formulario de 4 campos y Bookings de equipo | Barra, hero, tras Casos, tras Así se ve, cierre, CTA fijo en móvil |
| Con nombre | «Quiero Rumbo para mi comité» / «Request a Rumbo session» | `/reserva/?d=rumbo`, con el interés preseleccionado | Pestaña La compañía, El primer paso |
| Secundario (bajo compromiso) | «Diagnóstico en 3 minutos» / «3-minute assessment» | `#diagnostico` | Hero (enlace), tras Por qué ahora, «Tres formas de empezar» |
| Por perfil | «Descarga un programa de ejemplo» · «Descarga la ficha para IT» | PDF abierto, sin formulario | Pestañas Personas y Tecnología |
| Relación | «Recibe la guía del presupuesto 2027» · «Notas para el comité» (trimestral) | Lectura en abierto; PDF y alta, opcionales | Tras Por qué ahora, resultado del diagnóstico, pie |

**Cierre (`#hablemos`)** (R2 §8.2, A2 §9.1, A4 §6). Inspiración: bloques de CTA final en modo oscuro con una sola acción en [cta.gallery](https://www.cta.gallery/categories/all-types).

- **Fondo:** el vídeo de la firma, ya en caché, con un velo más denso. La página abre y cierra con imagen en movimiento.
- **H2 en 2 líneas:** «Hablas con el equipo que lo va a hacer. / Treinta minutos para saber por dónde empezar.» Alternativa con urgencia: «Cada trimestre cuenta. / Empieza este.»
- **Urgencia antes del botón**, como entradilla: «Si la IA va a estar en el presupuesto de 2027, que llegue con un plan.» Retirarla en el primer trimestre de 2027.
- **Botón:** «Reserva 30 minutos».
- **Microcopia:** «Te atiende una persona del equipo, no un comercial. Te respondemos en un día laborable.» [confirmar el plazo]
- **«Qué pasa después»**, en 3 pasos:
  1. Reservas 30 minutos con el equipo.
  2. Te proponemos el primer paso [en 48 h, solo si se cumple; el 48 hay que darlo de alta en `cifras.toml`].
  3. Rumbo con tu comité, 3 horas.
- **Para asistentes:** «¿Lo gestiona tu asistente? Escríbenos a ia@spiralia.es» [Copiar].
- **Prueba mínima:** «Más de 50.000 personas · ING · Deloitte · CCEP» (cada nombre, solo si su permiso lo cubre: 2.8).
- **Texto legal** con el buzón de privacidad. Corregirlo mientras Bookings no exista.
- **Pausa** del vídeo de fondo.

**Página `/reserva/`** (A4 §3.2):
- Titular «30 minutos con el equipo que lo va a hacer.» y debajo «Sales con un primer paso propuesto para tu empresa.».
- Qué pasa en los 30 minutos, en tres líneas.
- Formulario de 4 campos, con el origen oculto y el interés preseleccionado. Como la web es estática, el envío va a las preguntas personalizadas de Bookings, a un servicio de formularios alojado en la UE o a un script del hosting (2.5).
- Bookings después de enviar.
- Buzón copiable.
- Primera capa de RGPD.
- Casilla aparte y sin marcar para la carta trimestral.
- Tres logos y la cifra de ING.
- Quién te atenderá: es información práctica, no marca personal.

### 6.5 Pie

Estilo «Large Type» o «Typographic» de [footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth). V2 ya tiene logo, tres columnas y «Spiralia» grande.

1. **Cuatro columnas:**
   - **Spiralia AI:** Casos, Método, Para ti, Diagnóstico, Preguntas.
   - **Spiralia:** las otras áreas (Events, Communication, Team Building, Bespoke, Media), en letra pequeña o en un solo enlace a spiralia.es. [Opinión] Para un CEO que compra IA, «Team Building» y «Events» al lado de la IA restan seriedad; `investigacion/03` §9.6 ya avisa de que la página de Training mezcla registros. Decidir cuánto se enseña.
   - **Contacto:** buzón de equipo con botón de copiar, LinkedIn de la empresa, Madrid.
   - **Legal:** privacidad, aviso legal con la razón social (LSSI-CE, art. 10 [confirmar con el asesor]), «Logos de clientes de Spiralia. Marcas registradas de sus titulares» y **«Sin cookies. Solo contamos visitas, de forma anónima.»** en su propia línea (2.8).
2. **Una línea de prueba:** «Más de 50.000 personas formadas · ING · Deloitte · CCEP», con los mismos permisos que la franja.
3. **«Actualizado: octubre de 2026»**, que ayuda a GEO.
4. **La marca grande**, con la forma del logotipo («SPIRALIA», en mayúsculas espaciadas) o con la S de líneas, recortada por el borde inferior. Al 8-12 % sobre noche, con `aria-hidden`; mejor como SVG decorativo.
5. **Sin boletín** mientras no haya sistema que lo gestione. Cuando lo haya, casilla sin marcar y doble confirmación.

### 6.6 Guía de estilo de copy

Son 15 reglas; la versión completa, con ejemplos, está en R4 §11. Lo esencial:

- **Una idea por bloque.** Titulares en dos tiempos, con punto final y 12 palabras o menos; subtítulos de 20 o menos; párrafos de tres líneas como máximo en móvil.
- **Tú al lector, en singular:** «tu empresa», «tu comité». Nunca «vosotros» ni «usted». La excepción es «salís», cuando se habla del comité.
- **Primero el resultado, después el método y al final quién lo hace.**
- **La prueba de la cámara.** Si un titular no se puede filmar, reescríbelo con un momento, un objeto y un cargo.
- **Una cifra por pantalla, con fuente y fecha**, dada de alta en `cifras.toml`. Precisa y nunca redondeada hacia arriba. También las que van en letras («tres de cada cuatro», «una década»): el build no las ve, pero el lector sí.
- **Pérdida en el problema, ganancia en la solución.**
- **Palabras de negocio:** cuenta de resultados, margen, comité, plantilla, proceso, decisión. Un término técnico solo si es imprescindible, y definido la primera vez.
- **Hechos en lugar de adjetivos.** Sin exclamaciones, sin superlativos, sin «revolucionario», «disruptivo», «soluciones integrales» ni «potenciar».
- **Spiralia habla en plural.** Ningún nombre propio de Spiralia en titulares ni en CTA.
- **Cada CTA dice qué pasa y cuánto tiempo cuesta.** Nunca «Contáctanos», «Saber más», «sin compromiso» ni «gratis» como muletilla.
- **Urgencia, solo si pasa la prueba de las 5 preguntas.** Una línea por pantalla, como mucho.
- **Cada objeción, con nombre y respuesta en dos frases**, con una prueba.
- **ES y EN comparten la idea, no la letra.** Revisión nativa del inglés.
- **Comprobación automática en `build.py`:** avisar de «!», de la lista de palabras vacías, de las formas de «vosotros», de los titulares de más de 12 palabras y de «Ana» fuera del equipo.

### 6.7 De Ana a Spiralia: cómo despersonalizar sin perder la cercanía

El principio es **un coro, no un solista**. No se borra a Ana. Spiralia pasa a ser el sujeto y el equipo, la cara.

1. **Canales de equipo** (técnicamente, minutos):
   - `MAIL` → `ia@spiralia.es` (u `hola@`) en `build.py`. Cubre el cierre, el diagnóstico, el `noscript`, el *mailto* de L&D y `reserva/`.
   - Aviso legal → buzón de privacidad.
   - `BOOKINGS` → página «Spiralia AI» con varios anfitriones: Ana para CEO y comité, Jose para Personas y Formación, un ingeniero para Tecnología.
2. **Autoridad colectiva** en lugar de biografía: «Venimos de McKinsey, KPMG y EY-Parthenon. Enseñamos IA en la Universidad Francisco de Vitoria.» Una línea, exacta y con permiso de uso de los nombres (2.8). Es lo que hacen Distyl y BCG X.
3. **El equipo, en una de dos formas.** El 19-oct decidiste quitar los nombres; esto reabre esa decisión, así que van las dos opciones:
   - **A (recomendada): retícula de 4-6 personas**, con el mismo tamaño, fondo, luz y duotono navy/greige. Cada una con nombre · papel en el método (estrategia, formación, ingeniería, programas) · origen, en 12-15 palabras iguales para todos. Ana, una más. Responde a «¿quién está detrás?» y a «¿y si mañana no estáis?» (`investigacion/02` §6.6 y §6.10).
   - **B: sin nombres.** Fotos de sesión y de grupo, los tres papeles del equipo (estrategia, formación, ingeniería) y la credencial colectiva. Es lo más alejado del personalismo, pero el CEO no ve con quién hablaría.
   - En las dos, consentimiento escrito de cada persona para su nombre e imagen (2.8).
4. **La trayectoria, a la marca:** «Spiralia: más de una década trabajando con empresas». Si se pone una cifra, va a `cifras.toml`.
5. **Imagen de sesión y de grupo** en Casos, Por qué Spiralia y el cierre (rodaje). Mientras no la haya, fotogramas del vídeo o la S, nunca fotos de stock.
6. **La cercanía se mantiene** con «Hablas con el equipo que lo va a hacer», «¿Lo gestiona tu asistente?» y el nombre de quien asistirá en la confirmación de la reserva.
7. **LinkedIn:** tres voces que firman «… en Spiralia» y una página de empresa que concentra los casos, los clips y la newsletter.
8. **Fuera de la página:** actualizar `LEEME.md` y la ficha del 30 en `cifras.toml`, y añadir a `build.py` un aviso si «Ana» aparece fuera del equipo.
9. **Argumento para el comité de Spiralia:** un CEO que contrata a una boutique teme depender de una sola persona. Un equipo visible responde a esa objeción sin decirla.

### 6.8 Las referencias que diste: qué tomar y con qué límites

Ninguna se ha podido navegar (solo había búsqueda). Lo que sigue sale de reseñas y listados (R2 §3-4).

| Referencia | Qué es | Qué tomar | Qué no |
|---|---|---|---|
| [supahero](https://www.producthunt.com/p/supahero/supahero) | Biblioteca curada de heros | 3 heros con vídeo a sangre y texto abajo a la izquierda para el *moodboard*, comprobando su contraste | Heros con capturas de producto SaaS |
| [scrolltide](https://www.scrolltide.co/) | Plantillas y *prompts* de webs 3D y ligadas al scroll (React, GSAP, Three.js, Lenis). Tú hablabas de más de 600 *prompts*; los listados de 2026 hablan de 97 a 124 plantillas: quizá ha crecido | La técnica de **un único momento ligado al scroll** (el hero que se oscurece al bajar; más adelante, SPIRAL) | Su pila de React y WebGL entera: la web es HTML estático y debe seguir ligera |
| [navbar.gallery](https://suupercharged.substack.com/p/welcome-to-navbar-gallery) | Galería de barras por tipo | La categoría móvil (ya resuelta en V2) | Mega menús: con 4 anclas no hacen falta |
| [footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth) | Galería de pies por enfoque | «Large Type» y «Typographic» sobre oscuro (6.5) | Pies animados o ilustrados |
| [cta.gallery](https://www.cta.gallery/categories/all-types) | CTA de webs reales, filtrables por modo oscuro | El bloque final oscuro con una sola acción y microcopia bajo el botón (6.4) | Ventanas emergentes y CTA de precios |
| [Refero Styles](https://notes.nicolasdeville.com/ai/refero-styles/) | Más de 2.000 sistemas de diseño extraídos de webs reales | La más útil: comparar escala tipográfica, espaciado y radios con Apple, Anthropic y Linear para calibrar el «estilo Apple» con cifras | Copiar un sistema entero: la paleta ya está decidida |
| [3dicons](https://smashingmagazine.com/2022/05/3dicons-open-source-library-case-study-download/) | Iconos 3D CC0, de colores | Si se quieren iconos 3D, hacerlos a medida, monocromos en la paleta Monocromo Spiralia, y pocos (las tres pestañas de «Para ti», por ejemplo) | La librería tal cual: sus colores y su tono «adorable» chocan con la seriedad |
| [glass.samasante](https://github.com/samasante/liquid-glass) | Librería React de cristal refractivo | El cristal en la barra, la pausa, la píldora de la película y, como mucho, tarjetas sobre fondo oscuro fijo, con el contraste medido | Instalarla (exige React) y el cristal sobre el vídeo en movimiento, que es caro en GPU y empeora el contraste ([Infinum](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/)) |
| [Awwwards](https://www.awwwards.com/websites/sites_of_the_day/) | Premios de diseño web | Ver abajo | — |

**Awwwards: qué mirar.**
- **Qué premia:** según fuentes secundarias, diseño (40 %), usabilidad (30 %), creatividad (20 %) y contenido (10 %) [No verificado en Awwwards].
- **«[AI in Design Report 2026](https://www.awwwards.com/sites/ai-in-design-report-2026)»** (Site of the Day, 26-ago-2026): un informe convertido en pieza editorial. Es el formato natural para el barómetro de los 50.000 alumnos.
- **«[Outsource Consultants](https://www.awwwards.com/sites/outsource-consultants-inc)»** (Site of the Day, 10-mar-2026): una consultora sin producto que gana el premio. Demuestra que se puede sin efectos de producto.
- **El dato que marca la frontera:** en un escaneo de 68 webs premiadas frente a 69 webs B2B, el scroll suavizado (Lenis) aparece en el 66 % de las premiadas y en el 4 % de las B2B, y el cursor personalizado, en el 43 % frente al 1 %. El vídeo en el hero, en cambio, ya es corriente en las dos (37 % y 30 %) ([webyansh](https://webyansh.com/post/top-web-design-trends)) [Estudio de agencia]. De Awwwards se toma el oficio (tipografía, ritmo, detalle), no los efectos.

**Si se quiere una versión con más efecto** (scroll suavizado, WebGL, cristal, iconos 3D) [Opinión]. Es legítimo como pieza de marca, siempre que no cueste ni claridad ni rendimiento:
1. **Un solo momento de efecto por pantalla**, y nunca detrás del titular ni del CTA.
2. **Todo se apaga con «reducir movimiento»** y con Save-Data: el scroll suavizado, el WebGL y las animaciones. Y la página tiene que verse terminada sin ellos.
3. **El scroll suavizado no secuestra el gesto:** desactivado en táctil, respeta las anclas de la barra, el foco de teclado y el `scroll-padding-top`.
4. **WebGL con respaldo:** si no hay contexto WebGL o el dispositivo va justo, se queda el póster o el SVG. Sin Three.js entero si basta un *shader* pequeño.
5. **Presupuesto:** la primera pantalla en móvil sigue en 1,2 MB o menos y LCP p75 de 2,5 s o menos. El JS de efectos se carga después del LCP.
6. **Contraste medido** en todo texto sobre cristal o sobre WebGL: 4,5:1 como mínimo y 7:1 en el H1.
7. **Nada de cursor personalizado.**
8. **Se compara con la versión sobria** con la prueba de los cinco segundos (5.3) antes de elegir.

---

## 7. Roadmap

### 7.1 Se puede hacer ya en el código, sin esperar a nadie

| Orden | Qué | Dónde | Esfuerzo |
|---|---|---|---|
| 1 | **Bugs P0/P1:** `.btn-ghost{background:transparent}`; logos de casos con `object-fit:contain`; `overflow:clip` en el hero y `animation:none` con «reducir movimiento»; etiqueta de la demo; espacio fino ante «%» y U+202F en `fonts.py`; comentario de `fonts.py` y prueba de regresión `test_acentos.js` en `tests/` | `site.css`, `tools/fonts.py`, `tests/` | 2-3 h |
| 2 | **Accesibilidad:** pausa en el vídeo del cierre y en la cinta de logos (o fila fija); `ul/li` en los logos; `aria-label` de EN; botones SPIRAL; quitar `aria-live` de la demo | plantilla, `motion.js` | 2 h |
| 3 | **Página `/reserva/` con la marca** y formulario (con respaldo de email copiable), en lugar de la redirección a `mailto:`. Texto legal corregido | `build.py` (`RESERVA`), plantilla nueva | 1-2 días |
| 4 | **Sistema de CTA unificado** y CTA contextuales tras Por qué ahora, Casos, Qué hacemos y Así se ve. Rumbo como interés preseleccionado | `content.toml`, plantilla | 0,5 día |
| 5 | **Nueva arquitectura** (sección 6.1): diagnóstico tras Casos; fusión de Personalización y Construimos en «Así se ve»; SPIRAL como secuencia fija con carrusel en móvil; Rumbo como producto; FAQ con 6 visibles y 4 objeciones nuevas; cierre con «Qué pasa después» | plantilla, `site.css`, `content.toml` | 2-3 días |
| 6 | **Copy:** fuera la jerga de la primera mitad; tú en singular; diferencial en la franja; urgencia en segunda persona («Haz la cuenta de este trimestre»); EN («Request a Rumbo session», «we build»); quitar «casi tres de cada cuatro» | `content.toml` | 1 día |
| 7 | **Diagnóstico mejorado:** resultado por dimensiones, el porqué, «dónde está el 6 %», CTA de reserva con las respuestas, enlace para compartir | `diagnostico.js`, `[dg]` | 2-3 días |
| 8 | **Sistema visual:** escala de 8 niveles, 3 radios, 2 tarjetas, mínimo de 12 px, logos normalizados en una fila fija | `site.css` | 1 día |
| 9 | **Técnica y SEO:** precargar Open Sans; logos y SVG optimizados; `s-geom.js` bajo demanda; `description` de 155 caracteres o menos; JSON-LD enriquecido; `og:locale`; sitemap con `hreflang`; bloque «Datos clave»; `llms.txt`; `--site` para el prototipo; cabeceras de caché en `vercel.json`; bloque de `.htaccess` listo para Nominalia | `build.py`, `assets/`, `deploy.sh` | 1-2 días |
| 10 | **Medición preparada:** el plan de eventos completo (`cta_reserva` por origen, también en `/reserva/`; embudo del diagnóstico por paso; `faq_abierta`; `seccion_vista`; película) a la espera de activar `ANALYTICS` | `engine.js`, `diagnostico.js` | 2-3 h |
| 11 | **Comprobación de estilo en `build.py`** (las reglas de la sección 6.6) | `build.py` | 2 h |
| 12 | **Textos legales y de marca:** `faq.a9` con la letra de 2026 del artículo 4; `cta.legal` sin Bookings mientras no exista y con el buzón de privacidad; pie con «Sin cookies. Solo contamos visitas, de forma anónima.» y la nota de marcas; quitar el filtro que recolorea los logos y usar sus versiones oficiales en negativo | `content.toml`, `site.css`, `assets/img/` | 1-2 h |
| 13 | **Límites de la versión con más efecto** (6.8): todo apagado con «reducir movimiento» y Save-Data, sin scroll suavizado en táctil, respaldo sin WebGL y presupuesto de peso medido | `motion.js`, `site.css` | 0,5-1 día |

### 7.2 Necesita decisiones o materiales tuyos

| # | Decisión o material | Por qué importa | Qué propongo |
|---|---|---|---|
| 0 | **Proteger el prototipo público** mientras no estén los permisos de Deloitte y de los logos | Hoy cualquiera con el enlace ve cifras y logos sin autorización documentada | Contraseña en Vercel, o una versión sin Deloitte y solo con los logos autorizados |
| 1 | **Buzón de equipo** (`ia@` u `hola@spiralia.es`) y **buzón de privacidad** de la política de spiralia.es | Es la queja n.º 1, la conversión y el texto legal | `ia@spiralia.es`; cambiar `MAIL` lleva minutos |
| 2 | **URL de Microsoft Bookings** de equipo, con varios anfitriones (o seguir con formulario y respuesta en un día), y **dónde se envía el formulario** (preguntas de Bookings, servicio de formularios en la UE o script en Nominalia) | Sin ella, el CTA principal es un callejón sin salida. La web es estática | Bookings de equipo con sus preguntas personalizadas. Si se retrasa, formulario |
| 3 | **Plazo de respuesta que se puede prometer** («en un día laborable», «en 24 h») y si el resumen de Rumbo llega en 48 h | Microcopia y «Qué pasa después» | Un día laborable |
| 4 | **Equipo visible:** opción A (con nombres) o B (sin nombres) de 6.7; quién sale (¿Ignacio Corroto, Pedro Valero, ingenieros, profesores?), con qué título, **retratos homogéneos** y el consentimiento de cada uno | De Ana a Spiralia sin quedarse sin caras. Reabre la decisión del 19-oct | Opción A: 4-6 personas y una sesión de fotos de medio día |
| 5 | **Nombrar McKinsey, KPMG, EY-Parthenon y la UFV** como origen colectivo: quién estuvo en cada una y cuánto tiempo, permiso de la UFV y consulta a KPMG por la relación comercial | Es la mejora de autoridad más barata, pero tiene que ser exacta | Una línea en la franja y en Por qué Spiralia |
| 6 | **Testimonios** de ING y CCEP (con nombre, cargo, consentimiento y visto bueno de su empresa; mejor en vídeo) y **referencia bajo petición**. De Deloitte, solo anónimo o nada | Es el nivel 1 de prueba social, hoy vacío | Guion de 4 preguntas (R4 §3.3) |
| 7 | **Permiso de Deloitte** para usar públicamente 13.000, 3.000 y el logo (marca blanca y confidencial desde el 2-sep), y **de cada uno de los otros logos** de la franja, en sus versiones oficiales. Y confirmar que CCEP autoriza su cifra | Riesgo legal y reputacional (2.8) | Confirmar antes de enseñar la web a más gente |
| 7 bis | **Base del 92 % de ING** (¿usuarios con licencia?, ¿todo el banco?) y si el segundo país tuvo la misma herramienta sin formación comparable | Sostiene el mejor titular de la página y su lectura causal | Guardar el soporte de la medición |
| 8 | **Metraje real:** ¿hay vídeo o fotos de sesiones con permiso? ¿Fecha y presupuesto para un día de rodaje? | La palanca visual que más eleva la marca | Un día de rodaje (sección 6.2) |
| 9 | **Rumbo:** ¿de pago o gratuito? ¿Con qué sale el comité, por escrito y en qué plazo? ¿Lo puede pedir un CHRO? ¿Garantía («si tu comité no sale con un plan claro, la segunda sesión corre de nuestra cuenta»)? | Reversión del riesgo y la promesa del producto de entrada | Garantía de claridad, si se puede sostener |
| 10 | **Precio:** ¿ancla («Rumbo, desde X €») o se mantiene fuera? | Precualifica y quita la caja negra | Mantener fuera en el lanzamiento y probar el ancla en conversación |
| 11 | **Selectividad real:** ¿requisito de comité completo, capacidad de ingenieros o tamaño mínimo? | Clase boutique sin escasez falsa | Solo si es verdad |
| 12 | **Despliegue:** ¿siempre en pareja consultor + ingeniero? ¿«Sin migraciones» y «lo construido es tuyo» se cumplen siempre? | Promesas de la pestaña Tecnología y de la FAQ | Confirmar la redacción |
| 13 | **Prueba para el CTO:** ¿alguna implantación que se pueda contar anonimizada (sistema y resultado)? | Hoy no hay prueba técnica | Formato Distyl: «empresa de distribución · cierre financiero» |
| 14 | **Materiales:** ¿quién valida la guía «Presupuesto de IA 2027»? ¿Qué programa real se anonimiza como ejemplo? ¿Ficha de seguridad? | Reciprocidad y material para quien defiende la compra | Guía 2027 primero, porque caduca en el primer trimestre |
| 15 | **Analítica:** cuenta de Plausible (u otra sin cookies) y visto bueno del DPO | Sin medición no se puede mejorar | Plausible |
| 16 | **Producción:** publicar en `spiralia.es/ia/`, 301 desde `/training/`, `.htaccess` con compresión, `robots.txt` raíz y si se permiten los rastreadores de IA (OAI-SearchBot, GPTBot, ClaudeBot, Google-Extended) | Visibilidad en Google y en las IA | Permitir los de búsqueda. Lo de entrenamiento es decisión de negocio |
| 17 | **«Varick»:** ¿te referías a Varick Agents? | Precisión del benchmark | — |
| 18 | **Los 50.000:** ¿incluyen alumnos de la UFV y de thePower? ¿Es correcto «personas formadas»? | Exactitud de la cifra principal | «Personas formadas» |
| 19 | **FUNDAE:** ¿es bonificable alguna parte? Si sí, el 31-dic es urgencia real para L&D. El 14-oct se decidió no mencionarlo: solo se reabre si es bonificable | Urgencia real para un ICP | Verificar |
| 20 | **Revisión del inglés** por un nativo, y del texto legal por el asesor (sección 2.8 entera) | Calidad y cumplimiento | Antes de producción |
| 21 | **Decks públicos con datos antiguos o confidenciales** (ING-fin con precio y «Confidencial», DEL-pub con 30.000, KPMG-web con «+92 %») | Un CEO que busque Spiralia verá cifras que no cuadran | Retirarlos o actualizarlos antes del lanzamiento |
| 22 | **Las otras áreas de Spiralia en el pie** (Events, Team Building…): ¿se enseñan o basta con un enlace a spiralia.es? | Coherencia de marca ante un CEO que compra IA | Un enlace discreto |
| 23 | **«Más de una década»:** año de fundación de Spiralia | Hoy solo lo respalda una biografía de LinkedIn | Darlo de alta en `cifras.toml` |

### 7.3 Después del lanzamiento (P2)

- **Arquitectura:** páginas por caso, del método y del artículo 4, para búsquedas largas y URLs citables.
- **Producto:** el diagnóstico del comité a varias voces; el barómetro anual con datos de los 50.000 alumnos y su plan de prensa.
- **Funnel:** la Mesa Rumbo trimestral; el coro de tres voces en LinkedIn y los Thought Leader Ads sobre lista de empresas.
- **Marca:** sustituir el vídeo abstracto por metraje real.
- **Medición:** panel mensual de presencia en IA y revisión trimestral del embudo.

---

## Anexo A. Titulares candidatos para el hero

Para la prueba de los cinco segundos con 5 directivos (5.3). Seleccionados de R1 §10 y A1 §6.1. Ninguno necesita cifras nuevas. Los quince originales, con su palanca y su perfil, están en R1 §10. [Opinión]

| # | ES | EN | Palanca | Para quién | Nota |
|---|---|---|---|---|---|
| 1 | **Toda tu empresa, trabajando con IA.** | Your whole company, working with AI. | Ver el éxito | Todos | El de V2. Pasa la prueba de la cámara y casa con el vídeo |
| 2 | **La IA ya está en tu empresa. Los resultados, todavía no.** | AI is already in your company. The results aren't there yet. | Brecha y urgencia | CEO | El que recomiendan A1 y R1. El «todavía» promete sin decirlo |
| 3 | **El lunes, tu equipo trabajará de otra manera.** | On Monday, your team will work differently. | Ver el éxito | CHRO y CEO | Ideal si el vídeo pasa a metraje real de personas trabajando |
| 4 | **Todos tienen la misma IA. Gana quien la pone a trabajar.** | Everyone has the same AI. The winners put it to work. | Competencia | CEO | La idea de Palantir («el modelo es una mercancía»), en idioma de negocio |
| 5 | **IA que se nota en la cuenta de resultados.** | AI you can see in your P&L. | Negocio | CEO | Habla como la consultoría estratégica |
| 6 | **La IA, en el idioma de tu negocio.** | AI, in the language of your business. | Diferencial | CEO y CHRO | Exige demostrarlo justo debajo; PwC España dice algo parecido |
| 7 | **Del comité a la primera línea. Todos, usando la IA de verdad.** | From the boardroom to the front line. Everyone, really using AI. | Escala | CHRO | Recoge el caso ING sin cifra |
| 8 | **Menos pilotos. Más resultados.** | Fewer pilots. More results. | Contraste | CEO y CTO | Muy corto; necesita un subtítulo que concrete |

«Ya pagas la IA. Ahora, que trabaje.» es también candidato, pero ya es el H2 de «Por qué ahora»: no conviene repetirlo en el hero.

---

## Fuentes

**Informes de esta auditoría** (en `investigacion/04_anexos/`): `R1-mensajes-competencia.md`, `R2-hero-y-diseno.md`, `R3-marketing-ventas-b2b.md`, `R4-persuasion-copy.md`, `A1-copy-icp.md`, `A2-ux-visual.md`, `A3-tecnica-a11y-seo.md`, `A4-cro-persuasion.md`. Cada uno trae su bibliografía completa.

**Pruebas reproducibles:**
- tipografía: `scratchpad/fontfix/`;
- Lighthouse y Playwright: `scratchpad/lh/`;
- capturas: `scratchpad/shots/audit/` y `scratchpad/research/a4/`.

**Investigación previa del repo:** `investigacion/01_benchmark_y_cta.md`, `02_icp_arquetipos.md` y `03_banco_mensajes.md`.

**Referentes**
- Palantir: [AIP Bootcamps](https://blog.palantir.com/deploying-full-spectrum-ai-in-days-how-aip-bootcamps-work-21829ec8d560) · [Bloomberg](https://www.bloomberg.com/news/articles/2024-04-23/inside-palantir-s-ai-sales-secret-weapon-software-boot-camp) · [AIPCon 10](https://www.marketscreener.com/news/palantir-technologies-hosts-aipcon-10-featuring-customer-led-demos-of-foundry-aip-ontology-and-ap-ce7f5ddcd18ff427) · [a16z, «The Palantirization of everything»](https://www.a16z.com/the-palantirization-of-everything)
- BCG: [ROI of AI (10-20-70)](https://www.bcg.com/featured-insights/how-to/roi-of-ai) · [The Widening AI Value Gap](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf) · [AI Radar 2026](https://www.bcg.com/press/15january2026-as-ai-investments-surge-ceos-take-lead) · [AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- McKinsey: [Superagency in the workplace](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work) · [The state of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- Accenture y Faculty: [Accenture Newsroom](https://newsroom.accenture.com/news/2026/accenture-to-acquire-faculty-to-scale-ai-capabilities)
- Varick Agents: [web](https://www.varickagents.com/) · [diagnóstico de muestra](https://audit.varickagents.com/demo) · [ensayo del fundador](https://x.com/vasuman/article/2049659161005470071) · [Built In](https://builtin.com/company/varick-agents)
- Nativas de adopción: [Section](https://www.sectionai.com/) · [Multiverse](https://www.multiverse.io/blog/multiverse-raises-70-million-europes-ai-adoption-platform) · [Distyl](https://www.distyl.ai/) · [Sierra (Bakken & Baeck)](https://bakkenbaeck.com/case/sierra) · [Harvey (Sanctuary Computer)](https://www.sanctuary.computer/harvey) · [Anthropic «Keep thinking» (Creative Review)](https://www.creativereview.co.uk/anthropic-claude-keep-thinking-campaign/)
- Cifras frágiles: [crítica del «95 %» de MIT NANDA](https://arnon.dk/mits-95-ai-failure-rate-is-wrong/)

**Compra B2B y marketing**
- Gartner: [67 % sin comercial (mar-2026)](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) · [69 % valida la IA con un comercial (may-2026)](https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights) · [Tech Buying Behavior](https://www.gartner.com/en/articles/tech-buying-behavior-in-the-age-of-ai)
- [Forrester, State of Business Buying 2026](https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/) · [6sense, Buyer Experience 2025](https://6sense.com/report/buyer-experience/) · [Edelman y LinkedIn, 2025](https://www.edelman.com/expertise/business-marketing/2025-b2b-thought-leadership-report) · [Dataiku, CEO Edition 2026](https://www.dataiku.com/company/news/global-ai-confessions-report-ceo-edition-2026)
- [Regla 95:5](https://marketingscience.info/news-and-insights/the-955-rule-why-b2b-growth-starts-long-before-the-purchase) · [Metricool, LinkedIn 2026](https://metricool.com/linkedin-trends/) · [ZenABM, Thought Leader Ads](https://zenabm.com/blog/tla-benchmarks/) · [Ortus Club](https://www.ortusclub.com/?p=71417) · [BounceZero, Apple MPP](https://bouncezero.io/email-open-rate-guide-2026)
- Conversión: [HBR, «The Short Life of Online Sales Leads»](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) · [Chili Piper](https://www.chilipiper.com/post/form-conversion-rate-benchmark-report) · [RevenueHero](https://www.revenuehero.io/blog/lead-to-meeting-conversion-benchmarks-for-2025) · [NN/g, contenido tras formularios](https://www.nngroup.com/articles/content-behind-forms/) · [The JOLT Effect](https://penguinrandomhouse.com/books/isbn/9780593538104)

**GEO, SEO y medición**
- [Google, AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · [Search Engine Journal, guía de mayo de 2026](https://www.searchenginejournal.com/googles-official-advice-on-optimizing-for-ai-overviews-ai-mode/547341/) · [OpenAI, rastreadores](https://developers.openai.com/docs/gptbot) · [GEO, KDD 2024](https://arxiv.org/abs/2311.09735v3)
- [Muck Rack, vía AI Magazine](https://aimagazine.com/globenewswire/3290268) · [Ahrefs, 75.000 marcas](https://ahrefs.com/blog/ai-overview-brand-correlation/) · [llms.txt: evidencia](https://nytroseo.com/does-llms-txt-help-2026-evidence)
- [AEPD, medición de audiencia (vía Finreg360)](https://finreg360.com/alerta/la-aepd-publica-la-guia-uso-de-cookies-para-herramientas-de-medicion-de-audiencias/) · [Microsoft Clarity y el consentimiento](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-management) · [Plausible, eventos](https://plausible.io/docs/custom-event-goals)

**Diseño, vídeo y accesibilidad**
- [web.dev, LCP](https://web.dev/articles/lcp) · [DebugBear, LCP con vídeo](https://debugbear.com/blog/optimize-video-lcp) · [W3C, WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · [MDN, autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) · [Chrome, animaciones ligadas al scroll](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [webyansh, escaneo de 137 webs](https://webyansh.com/post/top-web-design-trends) · [Awwwards, Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/) · [AI in Design Report 2026](https://www.awwwards.com/sites/ai-in-design-report-2026) · [SaaS Hero](https://saashero.net/content/b2b-saas-landing-page-examples/)
- Galerías que diste: [supahero](https://www.producthunt.com/p/supahero/supahero) · [scrolltide](https://www.scrolltide.co/) · [navbar.gallery](https://suupercharged.substack.com/p/welcome-to-navbar-gallery) · [footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth) · [cta.gallery](https://www.cta.gallery/categories/all-types) · [Refero Styles](https://notes.nicolasdeville.com/ai/refero-styles/) · [liquid-glass](https://github.com/samasante/liquid-glass) · [3dicons](https://smashingmagazine.com/2022/05/3dicons-open-source-library-case-study-download/)
- Copy de Apple: [Enchanting Marketing](https://www.enchantingmarketing.com/write-like-apple/) · [Neil Patel](https://neilpatel.com/blog/write-copy-like-apple/)
- Cristal y contraste: [Infinum](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/) · [Axess Lab](https://axesslab.com/?p=5111)

**Qué tomar de cada galería:** sección 6.8.

**Legal y marca (sección 2.8):** `investigacion/02_icp_arquetipos.md` §3.4 (comité de empresa y algoritmos) y §5 (artículo 4 del Reglamento de IA y su reforma de 2026) · `investigacion/03_banco_mensajes.md` §4.2, §5, §6 (logos y sus restricciones) y §9 (decks públicos) · `investigacion/01_benchmark_y_cta.md` §2.6 (textos de RGPD del formulario) y el apartado del Ómnibus digital (art. 50) · [Reglamento (UE) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj).
