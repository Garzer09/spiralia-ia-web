# A2 · Auditoría de UX, diseño visual y jerarquía · Spiralia AI

Fecha: 19-oct-2026. Ámbito: la landing `spiralia-ia-web` (ES y EN), en escritorio (1440×900 y 1280×720) y en móvil (390×844).

**Etiquetas:** [Hecho] lo he medido o visto en las capturas o el código. [Opinión] es criterio mío. [Fuente] se apoya en una fuente externa. [No verificado] no lo he podido comprobar.

---

## 0. Cómo se ha hecho y qué versión se audita

- **Dos versiones**, porque la web ha cambiado mientras la auditaba:
  - **V1, el prototipo del 14-oct.** Es el `dist/` generado a las 15:02 desde el commit `003dec3`. Está en las capturas `d1440-*`, `d1280-*`, `m390-*` y `en1440-*`.
  - **V2, la versión en curso.** El equipo regeneró `dist/` a las 16:10 desde el árbol de trabajo sin commitear. Trae el hero a pantalla completa con vídeo, la barra transparente, el menú móvil, Butler en woff2, el cierre con vídeo y un pie nuevo. Está en las capturas `n1440-*`, `n390-*` y `wip*`.
  - **Las recomendaciones apuntan a V2.** En cada hallazgo indico si V2 ya lo corrige.
- **Método:**
  - Capturas con Playwright y Chromium, con y sin `?still=1`. Antes de cada captura de página completa la recorrí con desplazamiento instantáneo: la web usa `scroll-behavior:smooth`, y con el desplazamiento normal las fotos *lazy* salían como «rotas» en la primera pasada.
  - Mediciones en el DOM: alturas de sección, posición de cada CTA, combinaciones tipográficas, radios, tamaños mínimos y contraste WCAG calculado con la fórmula de luminancia relativa.
  - Inspección de las fuentes con fontTools.
- **Capturas:** `scratchpad/shots/audit/ (material de trabajo, no incluido en el repo)`.
- **Limitaciones:**
  - **No he podido usar la búsqueda web.** El cupo de búsquedas de este turno, compartido con los demás agentes, ya estaba agotado cuando llegué a esa fase, y WebFetch no funciona en este entorno.
  - Por eso las referencias externas (Awwwards, galerías del cliente, buenas prácticas de vídeo) vienen del informe hermano **R2** (`investigacion/04_anexos/R2-hero-y-diseno.md`) y de `investigacion/01`. No las he vuelto a consultar y lo indico como «vía R2». **R2 ya especifica el hero, la barra, el CTA y el pie con detalle.** Aquí no lo repito: lo audito sobre V2 y añado lo que falta.
  - El Chromium de Playwright no reproduce H.264, así que la película MP4 de V1 solo la he visto como cartel. El fondo WebM de V2 sí carga.

---

## 1. Veredicto

1. **La base es de calidad.** [Opinión]
   - Sistema tipográfico con carácter: Butler, Sofia Sans Condensed y Open Sans.
   - Paleta sobria con contraste AA en todas las parejas medidas.
   - Rigor visible: cada cifra lleva su fuente.
   - Piezas propias que nadie del sector tiene: la espiral SPIRAL, la demo por perfil y el caso «hoy frente a con el agente».
   - El nivel de oficio está por encima de la media de las consultoras españolas (`investigacion/01`, E.2.10).
2. **El problema no es de estética, es de edición.**
   - **Página:** V1 medía **16.157 px** en escritorio (unas 18 pantallas) y **22.521 px** en móvil (unas 27). V2 ha **crecido**: 17.539 px y 23.194 px.
   - **Texto:** unas 2.400 palabras en `<main>`.
   - **Titulares:** 11 H2 con el mismo patrón (antetítulo, dos líneas en serif y la segunda en gris) y 3 frases-remate más.
   - **Consecuencia:** todo suena a titular, así que nada destaca. Un CEO no llega al final. [Hecho en las cifras; Opinión en la lectura]
3. **La prueba llegaba tarde y lo humano falta.**
   - En V1 los casos empezaban al **70 %** de la página (y = 11.285 px). V2 los sube al 21 %: **bien**.
   - V2 ha quitado los retratos de Ana y Jose, y ahora **no hay ni una sola imagen de personas** en toda la página. Se ha pasado de «personalista» a «sin caras». Para una boutique que vende criterio y acompañamiento falta el término medio: **el equipo y las sesiones, no la fundadora**.
4. **Bugs que restan seriedad** (detalle en la sección 3):
   - **Acentos:** la «á» de Butler 400 y la «ú», «Á» y «Ó» de todos los pesos no se pintaban. Se veía «M s de 50.000», «¿Cu nto cuesta?», «trabaj is» y «cada  rea» en un titular de casos. **V2 lo corrige.**
   - **Etiqueta montada sobre otra en la demo:** sigue en V2.
   - **Botón de pausa del hero visible sin vídeo:** es nuevo en V2.
   - **CTA de reserva:** «Reserva 30 minutos» abre el cliente de correo de Ana.
   - **Contadores animados:** los porcentajes que se animan enseñan cifras falsas durante el recorrido («71 %», «5 %»).
5. **Las prioridades visuales:**
   - Recortar a unos 10.500-11.000 px en escritorio (cerca de 12 pantallas) con **10 bloques**.
   - Reservar el titular en dos líneas para 4 momentos.
   - Introducir **fotografía documental de sesiones y de equipo**.
   - Unificar componentes (de 10 radios a 3, de 43 combinaciones tipográficas a 8 niveles).
   - Definir un único lenguaje de movimiento basado en la geometría de la S.

---

## 2. Mediciones

| Métrica | V1 | V2 | Objetivo [Opinión] |
|---|---|---|---|
| Altura en escritorio (1440) | 16.157 px | 17.539 px | ≤ 11.000 px |
| Altura en móvil (390) | 22.521 px | 23.194 px | ≤ 15.000 px |
| Palabras en `<main>` | ~2.400 | similar | ≤ 1.400 |
| H2 con el patrón de dos líneas | 11 | 11 | 4 (hero, problema, casos, cierre) |
| Frases-remate sueltas | 3 | 3 | 1 |
| Combinaciones de familia, peso y tamaño (escritorio) | 43 | — | 8 niveles de escala |
| Radios de borde distintos | 10 (6, 10, 14, 16, 18, 20, 22, 24 px, 50 %, 99 px) | 10 | 3 (8 px, 16 px, píldora) |
| Texto por debajo de 12 px | 21 elementos (etiquetas «Sistema/Agente/Persona» a 11,2 px; «Ejemplo ilustrativo» a 10,6 px) | igual | 0 |
| Etiquetas del gráfico del reto en móvil | 9 px de alto efectivo («las primeras semanas», «Lanzamiento») | igual | ≥ 12 px |
| CTA dentro del contenido (escritorio, y) | 528 → 6.033 → 11.093 → 14.110 → 15.527 | más repartidos (portada, resultados, tecnología, Rumbo, cierre) | uno cada ~2 pantallas |
| Mayor tramo sin CTA en el contenido | **5.505 px** en escritorio; **8.989 px** en móvil (de 7.017 a 16.053) | menor | ≤ 2.000 px |
| Destino de todos los CTA de reserva | `reserva/` → `[BOOKINGS_URL]` vacío → `mailto:ana.iza@` | igual | Bookings de equipo o formulario breve |
| `ana.iza@spiralia.es` en el HTML | 10 | 10 | 0 (buzón genérico) |
| Fotos de personas | 2 retratos, repetidos en «Quiénes» y en el cierre | **0** | Retícula de equipo y 3-4 fotos de sesión |

**Contraste** (WCAG, calculado) [Hecho]:

| Pareja | Ratio |
|---|---|
| `--ink` sobre `--paper` | 14,1:1 |
| `--ink-2` sobre `--paper` | 6,7:1 |
| `--ink-2` sobre `--paper-2` | 6,1:1 |
| `--on-dark` sobre `--night` | 13,2:1 |
| `--on-dark-2` sobre `--night` | 8,1:1 |
| `--on-dark-2` sobre `--navy-2` | 6,2:1 |
| Botón greige con texto navy | 11,6:1 |

**Sobre el contraste:**
- Todo pasa AA. El problema de legibilidad no es el color sino **el tamaño**: textos de 9-11 px y Butler Light fina sobre vídeo.
- `--navy-3` (#174467) sobre `--night` da 1,7:1. Hoy solo se usa en trazos, y no debe usarse nunca en texto.

---

## 3. Bugs y defectos visuales

| # | Defecto | Dónde | Estado en V2 | Causa y arreglo |
|---|---|---|---|---|
| B1 | **Acentos invisibles en Butler.** «M s de 50.000», «¿Cu nto tiempo…?», «¿Con qué IA trabaj is?», «¿Cu nto cuesta?» y «13.000 personas en un mes, cada  rea» (titular de la tarjeta de Deloitte). | «Quiénes somos», preguntas frecuentes, casos | **Corregido** (`tools/fonts.py`; woff2 de Butler a las 16:03, unos 24 KB por peso) | Ver la nota B1. |
| B2 | La etiqueta «EJEMPLO ILUSTRATIVO» se monta sobre el rótulo «CON LA IA DE TU EMPRESA, DESPUÉS DE LA FORMACIÓN» (1440 px). | Demo de personalización | **Sigue** (captura `n1440-overlap.png`) | `.demo-stage .tag-ilus` va en `position:absolute; top:16px; right:16px` y la cabecera de la columna derecha llega hasta ahí. Sacar la etiqueta del flujo absoluto: ponerla en la fila de «HOY» alineada a la derecha, o dar `padding-right` a la cabecera. |
| B3 | **El botón de pausa del hero se ve aunque no haya vídeo** (`?still=1`, «reducir movimiento», Save-Data). Es un control que no hace nada. | Hero V2 | **Nuevo en V2** | Tiene el atributo `hidden`, pero el CSS de `.glass` le da `display:flex` y lo anula (comprobado: `hidden=true`, `display=flex`). Arreglo: `[hidden]{display:none !important}` en la base de `site.css`. |
| B4 | **Los porcentajes animados enseñan valores falsos.** Al bajar, «80 %» y «6 %» se ven como «71 %» y «5 %» (captura `mot1440-scrolled.png`). En una web cuyo diferencial es el rigor, una captura de pantalla a medio contar es un riesgo. | El reto (`data-to="80"` y `data-to="6"`) | **Sigue** | No animar porcentajes ni cifras de casos. Animar solo la entrada (opacidad o máscara) con el valor final ya escrito. Si se quiere conservar un contador, que sea solo el 50.000 y dure ≤ 600 ms. |
| B5 | **«Reserva 30 minutos» abre un email.** `reserva/` redirige a `[BOOKINGS_URL]`, que está vacío, y cae en `mailto:ana.iza@spiralia.es`. Sin cliente de correo configurado, el CTA principal no lleva a ningún sitio. El texto legal del cierre, además, describe Microsoft Bookings, que todavía no existe. | Los 7 enlaces a `reserva/` | **Sigue** | Antes de producción: Bookings de equipo (o un formulario de 3 campos con respuesta el mismo día). Mientras tanto, rotular el botón por lo que hace: «Escríbenos». Ver `LEEME.md`, «Pendiente». |
| B6 | Huecos `[PLACEHOLDER]` de testimonios visibles en producción. | Casos (V1) | **Corregido** (se quitaron) | Volver a ponerlos solo con citas reales y firmadas. |
| B7 | No había menú en móvil ni en tableta (`.bar-nav{display:none}` por debajo de 980 px). | Barra (V1) | **Corregido** (botón de menú) | Comprobar el foco atrapado y el cierre con Esc. |
| B8 | El espacio antes de «%» queda **enorme** a tamaño display («80  %», «del 66  % al 92  %»). | Reto, casos, cartel del hero en V1 | **Sigue** | En tamaño display usar espacio fino no separable (U+202F) entre la cifra y el «%». En cuerpo de texto, el espacio normal no separable está bien. |
| B9 | Los botones «↻ Ver de nuevo» se ven en el estado estático y después de cada animación (espiral, demo, caso): 3 controles de repetición que no aportan a un CEO. | SPIRAL, personalización, «Lo que construimos» | **Sigue** | Que aparezcan solo al pasar el ratón o al enfocar la pieza, o quitarlos. |
| B10 | En la columna «Duración» de Formatos se mezclan fuentes: «3 horas» en Butler y «Se diseña contigo» o «Ciclos cortos, proceso a proceso» en Sofia condensada. | Formatos | **Sigue** | Una sola fuente por columna. |
| B11 | Logos con tamaños ópticos muy desiguales: Deloitte 54×22 px, LG 130×24, EY 25×28 y GPTW 46×46 (texto en 4 líneas). | Franja de prueba y casos | **Sigue** | Igualar por área óptica, no por altura (unos 1.800-2.200 px² cada uno) y usar la versión horizontal de GPTW. |

**Nota B1 · causa raíz** [Hecho]:
- Los OTF de Butler construyen algunas letras acentuadas con el operador antiguo *seac*, que compone una letra con un acento.
  - Light tenía 17 glifos así, Regular 18 y Medium 13; entre ellos, en los tres pesos, **Á, Ó, á y ú**.
  - Chromium no pintaba varios. En mi prueba fallaban «ú» y «Á» en los tres pesos, y además «á» en 400.
- **Arreglo:** volver a dibujar cada glifo como contorno plano (`T2CharStringPen`) y guardarlo en woff2. Lo comprobé en el scratchpad (`fontfix/`): todos los acentos se pintan.
- Los woff2 que ha generado el equipo ya no tienen glifos compuestos (comprobado). **Prueba de regresión:** renderizar «á é í ó ú Á É Í Ó Ú ñ Ñ ü» en los pesos 300, 400 y 500.

---

## 4. Primera impresión y hero

### 4.1 V1: la tarjeta 4:5

[Hecho, `d1440-01-fold.png` y `m390-01-fold.png`]

- **Composición en dos columnas:** titular a la izquierda y, a la derecha, una tarjeta con la S y tres cifras. Es correcta, pero **se lee como una landing de SaaS**, no como una casa boutique.
- **Siete cosas compiten** en la primera pantalla: H1, subtítulo de 30 palabras, 2 CTA, 3 accesos por perfil, la tarjeta con cifras, el 50.000 y 12 logos.
- **Móvil:** el hero mide 1.547 px, el CTA secundario se parte en dos líneas y la película queda por debajo del pliegue.
- **Veredicto** [Opinión]: transmite seriedad, pero no aspiración. Falta el «momento» que pedía el cliente.

### 4.2 V2: vídeo a pantalla completa

[Hecho, `n1440-s00.png` y `n390-hero.png`]

**Qué funciona:**
- El vídeo va a sangre, con una zona izquierda oscura y legible.
- La barra es transparente sobre el vídeo.
- **Un solo botón relleno y un enlace de texto** («Diagnóstico en 3 minutos →»).
- Una microprueba bajo el CTA (ING del 66 % al 92 %).
- «Ver la película · 20 s» en cristal y la pausa.
- La franja de prueba pasa debajo del pliegue.
- En móvil el hero cabe en 844 px y tiene menú.
- **Es el salto de calidad que pedía el cliente.** Encaja con el patrón de las consultoras (vídeo ambiental en el hero) y con la especificación de R2.

**Qué ajustaría** [Opinión]:

1. **El tema del vídeo.**
   - **Qué hay:** una retícula de puntos con órbitas. Es elegante, pero abstracta: un comprador no técnico puede leerla como el típico «IA azul de puntos», justo el cliché que R2 pide evitar.
   - **Por qué:** el estilo Apple aplicado a IA enseña a **personas con el resultado puesto**, como el caso de Sierra de Bakken & Baeck (vía R2).
   - **Recomendación:** mantener la pieza de HyperFrames para el lanzamiento y programar ya **un día de rodaje** con la lista de planos de R2 §7.10 C. Ninguna otra palanca visual eleva tanto la marca.
2. **El peso del vídeo.**
   - `hero-h.mp4` pesa **1,38 MB**, por encima del objetivo de 1,2 MB de R2 §7.11. `hero-h.webm`, en cambio, pesa 636 KB.
   - El JS ya elige WebM si el navegador lo admite (bien). Aun así, bajaría el MP4 con CRF 28 o a 1600×900: Safari en iOS anterior a 17.4 no reproduce VP9 (vía R2, caniuse).
3. **Los botones del hero.** Mismo arreglo que B3: hoy la pausa se ve sin vídeo.
4. **Antetítulo y microprueba.**
   - «SPIRALIA · IA PARA EMPRESAS» es correcto.
   - La línea de ING bajo el CTA está a 13-14 px en Sofia gris. Se pierde y, aun así, es la mejor prueba de la página.
   - Propuesta: subirla a 15-16 px y poner las dos cifras en `#E0DFDA`, o convertirla en una «píldora de prueba» encima del H1 al estilo de los anuncios de producto: «ING España · del 66 % al 92 % de uso semanal →» con enlace a #casos.
5. **El H1.**
   - En el árbol de trabajo hubo un estado intermedio en el que «La inteligencia se compra. La ventaja se despliega.» se partía en 4 líneas a 1440 px (captura `wip1440-fold.png`).
   - Con el H1 actual («Toda tu empresa, / trabajando con IA.») el corte es limpio.
   - **Regla para cualquier H1 futuro:** cada línea lógica cabe en una línea en ≥ 1280 px, con `max-width` en `ch` y `text-wrap: balance`. En móvil, como mucho 2 líneas por frase.
6. **Un único momento ligado al scroll:** al salir del hero, el vídeo se oscurece y escala a 1,04-1,06 (CSS `animation-timeline`, mejora progresiva). Es el gesto «Awwwards» que se puede permitir una casa seria, sin secuestrar el scroll (R2 §3.3).

---

## 5. Arquitectura, longitud y ritmo

### 5.1 Lo que hay en V2, sección a sección (escritorio)

| # | Bloque | Altura | Fondo | Problema [Opinión salvo «Hecho»] |
|---|---|---|---|---|
| 1 | Hero | 900 | oscuro | Bien (sección 4). |
| 2 | Franja de prueba | 263 | oscuro | Bien. El marquesina de 12 logos es más de startup; mejor 6-8 logos fijos y normalizados. |
| 3 | El reto | **2.176** | claro | Tres apartados, un gráfico, el 80 % frente al 6 %, BCG y tres fuentes. Para un CEO sobran dos apartados. El mensaje clave, «ENTRE UNA CIFRA Y OTRA, EL DESPLIEGUE», es el elemento **más pequeño** del bloque (Sofia de 13 px en mayúsculas). |
| 4 | Remate | 360 | oscuro | Una frase en una banda de 360 px; con el bloque 5 son dos franjas oscuras seguidas. |
| 5 | Casos | 1.096 | navy | Buena posición. Tarjetas densas y logos pequeños (B11). |
| 6 | Método SPIRAL | **2.268** | oscuro | Seis pasos desplegados con «quién participa» y «lo que queda». Riguroso, pero es una ficha técnica. Con el bloque 5 son 3 franjas oscuras seguidas (unos 3.700 px). |
| 7 | Personalización | 1.253 | papel | La demo por perfil es la mejor pieza de la web. |
| 8 | Lo que construimos | **2.361** | oscuro | FDE + «Negocio + Ingeniería» + caso animado + 3 tarjetas + 4 garantías. Cinco componentes distintos para una idea. |
| 9 | Para ti (pestañas) | 1.122 | claro | Repite el método y el formato con otro corte, y duplica los accesos por perfil del bloque 2. |
| 10 | Formatos | 1.159 | papel | Debería ir antes: es la oferta. |
| 11 | Por qué Spiralia | 1.241 | claro | Cinco argumentos en Butler de 18-20 px y un recuadro de equipo **sin caras**. |
| 12 | Diagnóstico | 793 | navy | Estado vacío: una tarjeta grande con 5 etiquetas y un botón. |
| 13 | Preguntas | 972 | claro | Diez preguntas (antes seis). |
| 14 | Cierre | 995 | oscuro, con vídeo | Mucho mejor que en V1 (sección 9). |
| 15 | Pie | 580 | oscuro | Mejor que en V1 (sección 9). |

**Redundancias** [Hecho]:
- **«ING del 66 % al 92 %»** aparece 4-5 veces: microprueba del hero, «Para ti», casos y el cartel de la película.
- **«50.000»** aparece 3 veces: franja, «Por qué Spiralia» y la película.
- Los **accesos por perfil** salen dos veces: franja de prueba y pestañas.
- Hay **tres «cómo trabajamos»**: SPIRAL, «Qué hacemos contigo» en cada pestaña y Formatos.
- Hay **tres remates**: «No nos quedamos en la formación…», «Nuestro mejor resultado: equipos que ya no nos necesitan» y la línea de urgencia del cierre.

**Monotonía** [Opinión]:
- Todos los H2 usan la misma plantilla: antetítulo en Sofia espaciada, dos líneas en Butler Light 59 px y la segunda línea en gris.
- Si todo es un gran titular, el ojo deja de jerarquizar. Apple alterna titulares enormes con bloques de cuerpo pequeños y mucho blanco, y nunca repite el mismo «golpe» 11 veces.

### 5.2 Arquitectura propuesta: 10 bloques, unos 10.700 px en escritorio

[Opinión. Coordinar con la línea de copy (tarea 3) y con `investigacion/01` E.4]

| # | Bloque | Contenido | Altura objetivo | Fondo |
|---|---|---|---|---|
| 1 | **Hero** | Lo de V2 | 100svh (900) | vídeo |
| 2 | **Franja de prueba** | «Más de 50.000 personas formadas» + 6-8 logos fijos + 3 accesos por perfil | 200 | noche |
| 3 | **El problema, en una pantalla** | Una frase grande («El curso acaba el viernes. El trabajo no cambia el lunes.»), la curva que se dibuja con el scroll y una línea de fuente. El 80 % frente al 6 % pasa a una sola frase o desaparece. | 900 | papel |
| 4 | **Casos** | ING a todo el ancho como caso principal (titular con la cifra, una frase, foto de sesión si hay permiso y cita cuando exista). Deloitte y CCEP en dos tarjetas. | 1.200 | noche |
| 5 | **Qué hacemos: formar y construir** | Dos capítulos en pestañas o en columnas que se alternan. «Formamos» con la demo por perfil (bloque 7 actual) y «Construimos» con el caso animado de la propuesta comercial (bloque 8 actual). Las 3 tarjetas de agentes pasan a un carrusel horizontal. «Negocio + Ingeniería» se queda en una sola línea. | 1.700 | papel y noche |
| 6 | **Método SPIRAL** | *Scrollytelling* fijo: la S a la izquierda y un paso activo a la derecha, con los detalles plegados. En móvil, un carrusel con *snap* de 6 tarjetas. | 1.100 | noche |
| 7 | **Empieza por Rumbo (formatos)** | Rumbo destacado como producto (nombre, 3 horas, qué sale, botón) y los otros dos formatos debajo, en pequeño. Un selector «Diriges… la compañía / Personas / Tecnología» cambia la frase de beneficio y la prueba (lo que hoy hace «Para ti»). | 900 | papel |
| 8 | **Por qué Spiralia + equipo** | 3 argumentos en vez de 5, y una **retícula de 6-9 personas del equipo** con rol (estrategia, formación, ingeniería), sin jerarquía visual de la CEO. | 1.000 | claro |
| 9 | **Diagnóstico** | La primera pregunta ya visible, sin pantalla de «Empezar», y una vista previa del resultado. | 700 | navy |
| 10 | **Preguntas (6) y cierre** | Seis preguntas más «Ver todas» → cierre con vídeo → pie | 800 + 900 + 580 | claro y noche |

**Total:** unos 10.700 px, frente a 17.539. En móvil, con la misma poda, unos 14.000-15.000 px [estimación]. Con esta arquitectura solo quedan **4 titulares de capítulo**: hero, problema, casos y cierre. El resto lleva H2 de una línea (sección 7.1).

**Ritmo de fondos** [Opinión]: alternar claro y oscuro de forma deliberada, sin dos bloques oscuros seguidos salvo con una costura clara. Propuesta: vídeo → noche → **papel** → noche (casos) → papel → noche (método) → papel → claro → navy → claro → noche (cierre).

---

## 6. Auditoría por sección: qué cambiar

### 6.1 Barra de navegación

- **V2** [Hecho]:
  - Anclas: Casos · Método · Para ti · Por qué Spiralia · EN · [Hablemos].
  - Es transparente sobre el vídeo y pasa a sólida al bajar; hay menú en móvil.
  - **Cumple la especificación de R2 §7.8 y §8.1.**
- **Añadir** [Opinión]:
  - **Indicador de sección activa:** una subraya de 1 px en `#E0DFDA`.
  - **Indicador de progreso de marca:** la pequeña S del logo se dibuja con el scroll (`stroke-dashoffset` ligado a `animation-timeline: scroll()`, mejora progresiva). Es un gesto propio con la geometría de `s-geom.js`. Si resulta excesivo, se descarta.
  - **Barra sólida, más delgada (72 → 60 px).** En móvil, la barra no se esconde al bajar: «Hablemos» siempre visible.
  - **Referencia:** la categoría móvil de navbar.gallery (vía R2).

### 6.2 Hero

Ver la sección 4.

### 6.3 Franja de prueba

- **Marquesina:** una cinta de logos que se desplaza sola. Para 12 logos es un recurso habitual, pero **le resta clase**: los logos que entran y salen no se pueden leer, y en la captura estática ING aparece cortado. Mejor una fila fija con los 6-8 más fuertes (ING, Deloitte, CCEP, Naturgy, LG, Schneider, EY, GPTW), normalizados (B11) y en `#E0DFDA` al 70 %.
- **El «50.000»:** en Butler Light grande, con «personas formadas en IA aplicada a negocio» al lado y no debajo, para ganar altura.

### 6.4 El problema (hoy «El reto»)

- **Una pantalla, una idea:**
  - La curva que se enfría es la mejor visualización del reto. Que se dibuje con el scroll, con 55 % y «menos del 40 %» como etiquetas legibles.
  - En móvil, las etiquetas del SVG bajan hoy a 9 px de alto efectivo: hay que hacerlas HTML superpuesto o escalar el `viewBox`.
- **El gran par 80 % / 6 %:** si se mantiene, el mensaje («Entre una cifra y otra, el despliegue») tiene que ser **el titular**, no una etiqueta de 13 px.
- **Fuentes:** en una línea plegable («Fuentes ▾») en vez de tres párrafos de 12,5 px. Así se mantiene el rigor sin ruido.

### 6.5 Casos

- **ING como caso principal a todo el ancho.**
  - **Cifra:** una barra horizontal que pasa del 66 % al 92 %, sin contador (B4).
  - **Satisfacción:** el 4,7 frente al 3,2 como segunda cifra.
  - **Imagen:** una foto de la sesión con permiso. Si no la hay, un fotograma del metraje real cuando exista.
- **Deloitte y CCEP:** en dos tarjetas con la cifra arriba y el titular debajo. Hoy la cifra ocupa el centro, el logo es diminuto y la fuente queda en la base: hay cuatro niveles de jerarquía por tarjeta.
- **Testimonios:** volver solo con citas reales. El formato correcto es la foto, el nombre, el cargo y el logo de la empresa.

### 6.6 Qué hacemos: formar y construir

**Formar (demo por perfil):**
- Mantener la pieza. Corregir B2 y B9.
- Subir las etiquetas de herramienta («Outlook», «CRM») a ≥ 12 px.

**Construir:**
- Dejar solo el caso animado de la propuesta comercial y las 3 tarjetas en un carrusel.
- Quitar los dos círculos de «Negocio + Ingeniería»: dos círculos grandes con texto de 13 px y un «+» ocupan unos 300 px para una idea que cabe en una línea («Un consultor que entiende tu negocio y un ingeniero que lo construye, en tu mesa»). V2 ya la ha subido al H2: bien.
- Las 4 garantías («Con control desde el primer día») pasan a preguntas frecuentes, a la pregunta de seguridad.

### 6.7 Método SPIRAL

- **El dibujo de la S con los seis pasos es la pieza más de marca de la web**, de nivel Awwwards en concepto. [Opinión]
- **Patrón:** dejar la figura fija (`position: sticky`) y avanzar un paso por cada «pantalla» de scroll, con solo su nombre y una frase. «Quién participa» y «Lo que queda» van en un desplegable o en un tooltip.
- **Resultado:** de 2.268 px que se leen como una tabla a unos 1.100 px que se ven como una película. Es la técnica de scrolltide.co (vía R2) sin su pila de React.
- **En móvil:** 6 tarjetas en un carrusel horizontal con *snap* y la S pequeña arriba marcando el paso.

### 6.8 Formatos y «Para ti»

- **Rumbo es el producto de entrada.** Merece un tratamiento de producto:
  - Una tarjeta grande con el nombre en Butler, «3 horas · comité de dirección», lo que te llevas en 3 viñetas, el CTA y «Desde [precio]» si algún día se publica.
  - Los otros dos formatos quedan debajo como «Después de Rumbo».
- **«Para ti» se integra aquí** como selector de perfil que cambia la frase de beneficio y la prueba. Ya no hace falta una sección de 1.122 px con pestañas.
- **Corregir B10** (fuentes mezcladas en la columna de duración).

### 6.9 Por qué Spiralia y equipo

- **El titular es el diferencial del cliente** («Hablamos el idioma del negocio. Y enseñamos IA en la universidad.»): está bien escogido.
- **Cinco argumentos en cinco columnas** de 18 px no se escanean. Mejor tres, con un icono de línea derivado de la S (no 3dicons, sección 7.4) y un titular de 4-6 palabras cada uno.
- **El recuadro «Quién trabaja contigo» sin caras es un error de V2** [Opinión]: quitar a Ana no debe dejar la web sin personas.
  - **Propuesta:** una retícula de 6-9 retratos homogéneos (mismo fondo, misma luz y el mismo tratamiento monocromo en navy, por ejemplo un duotono `#051A2B`/`#E0DFDA`), con nombre, rol y origen (ex-McKinsey, ex-EY-Parthenon, profesor de la UFV, FDE).
  - **Ana es una más de la retícula.** Así se cuenta «equipo de consultoría estratégica + ingeniería + academia» sin personalismo.
- **Fotos de V1** [Hecho]: tenían tratamientos distintos (Ana con fondo oscuro, Jose con fondo gris claro). Si vuelven, que vuelvan homogéneas.

### 6.10 Diagnóstico

- **Estado vacío:** hoy es una tarjeta navy de 820 px de ancho con 5 etiquetas de progreso y un botón «Empezar», y el resto de la sección queda vacío.
- **Propuesta:**
  - Mostrar ya la **primera pregunta con sus respuestas** (un clic menos) y, a la derecha, una **vista previa del informe** desenfocado («Tu nivel: Hábito · 3 siguientes pasos»), que motiva a terminar.
  - Al acabar, el CTA «Llévalo a Rumbo» con el resultado precargado en la reserva (`?d=diagnostico&nivel=…`).

### 6.11 Preguntas

- **Diez preguntas son demasiadas** para el comité. Seis visibles y «Ver todas», con la de seguridad primero (es el miedo número uno del CTO y de Riesgos).
- **Diseño:** pregunta en Butler 400 de 20-22 px, el signo «+» que gira a «×» y la respuesta en 16-17 px con un máximo de 60ch. Bien resuelto ya.

### 6.12 Cierre (CTA final)

Ver la sección 9.

### 6.13 Pie

Ver la sección 9.

---

## 7. Sistema visual

### 7.1 Tipografía: de 43 combinaciones a una escala de 8 niveles

[Hecho, medido: Butler 300 en 9 tamaños entre 26 y 136 px, Butler 400 en 10 tamaños entre 17 y 32 px, Sofia condensada en 4 pesos entre 11 y 26 px, Open Sans entre 12 y 20 px]

| Nivel | Uso | Fuente | Tamaño (`clamp`) | Interlineado |
|---|---|---|---|---|
| Display XL | Solo el H1 | Butler 300 | 2,6rem → 6rem | 1,02 |
| Display L | 3 titulares de capítulo (problema, casos, cierre) | Butler 300 | 2,2rem → 4rem | 1,04 |
| Título | H2 de sección (una línea) | Butler 400 | 1,6rem → 2,4rem | 1,1 |
| Subtítulo | H3, títulos de tarjeta, preguntas | Butler 400 | 1,2rem → 1,5rem | 1,2 |
| Cuerpo L | Entradillas | Open Sans 400 | 1,06rem → 1,22rem | 1,6 |
| Cuerpo | Texto | Open Sans 400 | 1rem → 1,0625rem | 1,6 |
| Pequeño | Fuentes, notas | Open Sans 400 | 0,875rem | 1,5 |
| Etiqueta | Antetítulos, rótulos | Sofia 600 en mayúsculas, espaciado 0,16em | 0,78rem (mín. 12 px) | 1,3 |

- **Las cifras grandes** (66 % → 92 %, 13.000, 218) van en Display L con espacio fino antes del «%» (B8).
- **La segunda línea en gris** solo en los 4 titulares de capítulo. En el resto, una línea.
- **Calibrar con Refero Styles** (vía R2): bajar los DESIGN.md de Apple, Anthropic y una consultora y comparar escala y espaciado vertical con `site.css`.

### 7.2 Color

- **«Monocromo Spiralia» funciona y da clase.** [Opinión] El riesgo no es la paleta sino **la falta de luz y de textura**: 14 franjas de azul noche y papel con valores muy parecidos (`#051A2B`, `#08263D`, `#0D3150`) forman costuras oscuras sin contraste entre secciones.
- **No añadir un color de acento.** El «acento» debe ser:
  1. **La luz:** el blanco y el greige brillante del vídeo y de los trazos de la S.
  2. **La fotografía**, con un etalonaje frío y desaturado que la integre en la paleta.
  3. **Grano sutil** (4-6 %) sobre los fondos oscuros (R2 §3.3).
- **Usar `--navy-2` y `--navy` como costura** entre dos bloques oscuros, nunca tres bloques oscuros seguidos.

### 7.3 Componentes

- **Radios:** de 10 valores a 3.
  - `--r-s: 8px` para chips y etiquetas de herramienta.
  - `--r-m: 16px` para tarjetas, demo, diagnóstico y casos.
  - Píldora (`999px`) para botones y etiquetas.
- **Tarjetas:** hoy hay al menos 6 estilos (`pcase`, `card`, `fde-box`, `demo-stage`, `case`, `dg`). Dos variantes bastan:
  - Tarjeta sobre oscuro: borde `--line-d`, sin sombra y con un degradado muy leve.
  - Tarjeta sobre claro: borde `--line-l` y sombra de 1 nivel.
- **Botones:** relleno (CTA principal), enlace con flecha (secundario) y cristal (solo sobre vídeo). La píldora fantasma de V1 desaparece: bien en V2.
- **Etiquetas «Ejemplo ilustrativo»:** necesarias por honestidad, pero con un solo estilo y siempre en el mismo sitio (arriba a la izquierda de la pieza, en el flujo).

### 7.4 Iconografía, cristal y 3D

[Opinión, coincide con R2 §4]

- **3dicons.co:** no. Sus iconos 3D de colores rompen la seriedad y la paleta.
- **Iconos:** de línea de 1,5 px derivados de la geometría de la S (`tools/s_geom.py`). Seis bastan: formar, emparejar, decidir, construir, demostrar y lanzar. Sirven para SPIRAL y para «Por qué Spiralia».
- **Cristal** (glass.samasante.com como inspiración, sin la librería React): solo en la barra sólida, la píldora de la película y la pausa. Nunca en tarjetas de texto.

---

## 8. Personas e imagen: «menos Ana, más Spiralia»

| Palanca | V1 | V2 | Propuesta [Opinión] |
|---|---|---|---|
| Retratos | Ana y Jose dos veces | Ninguno | Retícula de 6-9 personas con rol |
| Fotos de sesión | 0 | 0 | 3-4 fotos documentales: sala con muchas personas, comité, FDE con experto y pósits con un proceso |
| Email visible | `ana.iza@` 10 veces | 10 veces | `ia@spiralia.es` o `hola@spiralia.es`; derechos RGPD a un buzón de privacidad |
| Reserva | Agenda de Ana (sin URL) | igual | Bookings de equipo |
| Voz | «Hablas con quien lo va a hacer» + 2 caras | «Hablas con el equipo que lo va a hacer» | Bien; se refuerza con la retícula |
| Marca en el pie | Logo pequeño | Logo + «Spiralia» grande | Bien (sección 9) |

**Sobre la imagen documental:**
- Es la palanca visual más potente que falta. Para el comprador de RR. HH. y de Formación, ver una sala llena de su gente aprendiendo **es** la visualización del éxito, el estilo Apple.
- Se necesitan permisos de imagen y del cliente (R2 §7.10 C).
- **Mientras no haya fotos:** fotogramas del propio vídeo de fondo o la S de líneas, nunca fotos de stock.

---

## 9. Barra, CTA final y pie: estado de V2 y qué añadir

### 9.1 CTA final

**V2** [Hecho, `n1440-s14.png`]:
- Vídeo de fondo con la S de líneas (`firma-h`), un H2 de 4 líneas, un botón, una frase de urgencia en Butler, el email de Ana con «Copiar» y el texto legal.
- **Mucho mejor que V1:** abre y cierra con imagen en movimiento.

**Ajustes** [Opinión]:
1. **H2 más corto.** Cuatro líneas a 1440 px es demasiado. Basta con dos frases en dos líneas, por ejemplo «Hablas con el equipo que lo va a hacer. / Treinta minutos.».
2. **Una segunda columna «Qué pasa después»**, en tres pasos numerados:
   1. Reservas 30 minutos con el equipo.
   2. Te proponemos el primer paso, en 48 h [solo si Spiralia lo cumple].
   3. Rumbo con tu comité, 3 horas.
   - **Por qué:** un CTA de cta.gallery bien hecho resuelve la incertidumbre de «y después qué» (vía R2). La serie numerada reduce el riesgo percibido sin rebajar el tono.
3. **Microcopia bajo el botón:** «Sin compromiso · Te atiende una persona del equipo, no un comercial».
4. **La urgencia («Si la IA va a estar en el presupuesto de 2027, que llegue con un plan.»)** es buena y no inventa escasez. Debe ir **antes** del botón, como entradilla, no después: después compite con él.
5. **Contacto genérico** en lugar de `ana.iza@` (B5 y sección 8).
6. **Una fila de prueba mínima** al pie del bloque: «Más de 50.000 personas · ING · Deloitte · CCEP».

### 9.2 Pie

**V2** [Hecho, `n1440-s14.png` y `n1440-s15.png`]:
- Logo, una línea de posicionamiento y tres columnas (Spiralia AI, otras áreas y contacto).
- Debajo, «Spiralia» enorme en Butler al 10 % sobre noche: el patrón «Large Type» de footer.design (vía R2).

**Ajustes** [Opinión]:
1. **El wordmark grande** está en minúsculas («Spiralia») y el logotipo es «SPIRALIA» en mayúsculas espaciadas. Usar la forma del logotipo, o la S de líneas a gran tamaño, por coherencia de marca. Además, recortarlo con el borde inferior le da más presencia.
2. **Destacar «Sin cookies. Sin rastreadores.»**, un diferencial real de confianza, en su propia línea con el mismo peso que los enlaces.
3. **Aviso legal:** añadir enlace al aviso legal de spiralia.es con la razón social. [No verificado en esta sesión: la LSSI-CE, art. 10, pide identificar al prestador; confirmar con el asesor]
4. **Contacto:** buzón genérico, LinkedIn de la empresa y ciudad (Madrid).

---

## 10. Móvil

- **V2 resuelve lo grave:** hay menú, el hero cabe en una pantalla y el CTA secundario ya no se parte.
- **Pendientes** [Hecho, `n390-t*.png`]:
  1. **Longitud: 23.194 px**, unas 27 pantallas. La poda de la sección 5.2 es más urgente en móvil que en escritorio.
  2. **Etiquetas del gráfico a 9 px** (B4 y sección 6.4).
  3. **SPIRAL en móvil:** 2.976 px de pasos desplegados. Pasar a un carrusel (sección 6.7).
  4. **«Lo que construimos»:** 4.542 px, el bloque más largo de la web en móvil. Las tres columnas del caso se apilan en 3 tarjetas largas. En móvil enseñar solo «Con el agente», con un conmutador «Hoy / Con el agente».
  5. **Barra de CTA fija al pie** en móvil [Opinión]: aparece después del hero y desaparece en el cierre. Solo con «Hablemos de tu caso». Así se elimina el tramo de 9.000 px sin CTA.
  6. **Pestañas** («Resultados / Personas y talento / Tecnología»): en 390 px se parten en dos filas. Usar *chips* con desplazamiento horizontal.

---

## 11. Movimiento: un lenguaje en vez de cinco piezas

**Lo que hay** [Hecho]:
- El vídeo del hero y la película en un modal.
- La curva del reto.
- Los contadores.
- La S de SPIRAL que se dibuja.
- La demo por perfil, con su propio reloj.
- El caso con sus carriles.
- El vídeo del cierre.
- La marquesina de logos.
- La entrada `.rv` de cada bloque.

Cada pieza tiene su ritmo y sus controles.

**Lenguaje propuesto** [Opinión]:
1. **Firma:** el trazo de la S (geometría de `s-geom.js`) es el único motivo animado de marca. Lo usan el hero (trazos en el vídeo), SPIRAL, el indicador de progreso (opcional) y el cierre.
2. **Entradas:** opacidad y 12 px de desplazamiento, 400 ms con `--ease`, sin escalonar más de 3 elementos. Nada de entradas letra a letra fuera del hero.
3. **Un único momento ligado al scroll en el hero** (sección 4.2.6) y **una secuencia fija en SPIRAL**. Nada más ligado al scroll.
4. **Datos:** sin contadores en porcentajes ni en casos (B4). Las barras y las curvas sí se dibujan.
5. **Accesibilidad:**
   - Con «reducir movimiento», todo en su estado final y sin descargar vídeo. V2 ya lo hace, salvo la pausa visible (B3).
   - Pausa para todo bucle de más de 5 s (WCAG 2.2.2; vía R2).
6. **Evitar** (R2 §3.2, escaneo de webyansh):
   - Lenis o scroll suavizado: lo usa el 66 % de las webs premiadas y el 4 % de las B2B.
   - Cursor personalizado: 43 % frente a 1 %.
   - WebGL pesado.
   - Es el «efecto premio» que no encaja con «seriedad y clase».

---

## 12. Comparativa con el nivel Awwwards

Pesos del jurado según R2: diseño 40 %, usabilidad 30 %, creatividad 20 %, contenido 10 % [fuente secundaria, no verificada en Awwwards]. Las notas son de 0 a 10 y son mi estimación [Opinión]:

| Criterio | V1 | V2 | Con este plan | Qué separa de un 8+ |
|---|---|---|---|---|
| Diseño | 6,5 | 7,3 | 8,3 | Fotografía, escala tipográfica con contraste de tamaños y menos patrones repetidos |
| Usabilidad | 6,0 | 6,6 | 8,0 | Longitud, CTA cada 2 pantallas, bugs B2-B5 y móvil |
| Creatividad | 6,5 | 7,0 | 8,0 | SPIRAL como secuencia fija y la S como lenguaje de movimiento |
| Contenido | 7,0 | 7,2 | 8,0 | Casos con cara, menos redundancia y testimonios reales |
| **Media ponderada** | **6,4** | **7,0** | **8,1** | |

**Referencias para el *moodboard*** (vía R2):
- **«AI in Design Report 2026»** (Site of the Day, 26-ago-2026): el formato «informe convertido en experiencia editorial», natural para una firma de consultoría.
- **Outsource Consultants** (SOTD, 10-mar-2026): una consultora sin producto también gana.
- **Sierra** (Bakken & Baeck): personas usando la IA, no la tecnología.
- **Harvey** (Sanctuary Computer): un lenguaje de movimiento que hace que lo complejo parezca claro y premium.

La lección es **tomar de Awwwards el oficio, no los efectos**.

---

## 13. Plan priorizado

| Prioridad | Acción | Esfuerzo [estimación] |
|---|---|---|
| **P0** | B3 (`[hidden]` con `display:none !important`), B2 (etiqueta montada), B4 (sin contadores en %) | 1-2 h |
| **P0** | Destino real del CTA: Bookings de equipo o formulario breve. Buzón genérico en lugar de `ana.iza@` (`MAIL` en `build.py`) | 0,5 día + decisión de Jose |
| **P0** | Poda de arquitectura a 10 bloques (sección 5.2): fusionar «Para ti» con Formatos, Personalización con Construimos, el reto en una pantalla y un solo remate | 1-2 días (con la línea de copy) |
| **P1** | SPIRAL como secuencia fija y carrusel en móvil | 1 día |
| **P1** | Retícula de equipo (6-9 personas) con retratos homogéneos | 0,5 día + sesión de fotos o fotos existentes |
| **P1** | Escala tipográfica de 8 niveles, 3 radios, 2 tipos de tarjeta, mínimo de 12 px | 1 día |
| **P1** | CTA final con «Qué pasa después», microcopia, urgencia antes del botón y CTA fijo en móvil | 0,5 día |
| **P1** | Normalizar logos y pasar a una fila fija | 2 h |
| **P2** | Rodaje de un día: hero real, fotos de sesión y casos | 1 día de rodaje + 2-3 de edición |
| **P2** | Momento de scroll en el hero e indicador S de progreso | 0,5 día |
| **P2** | Pie: wordmark coherente con el logotipo, «Sin cookies» destacado y aviso legal | 2 h |
| **P2** | MP4 del hero por debajo de 1,2 MB; Sofia woff2 en subconjunto latino (hoy 110 KB) | 2 h |

---

## 14. Preguntas para Jose

1. **Fotos y vídeo:** ¿hay fotografías de sesiones en ING, Deloitte o CCEP con permiso de uso? ¿Hay fecha y presupuesto para un día de rodaje?
2. **Equipo:** ¿quién sale en la retícula (consultores, FDE, formadores)? ¿Hay retratos homogéneos o hay que hacerlos?
3. **Contacto:** ¿se puede crear `ia@spiralia.es` y un Bookings de equipo? ¿Qué plazo de respuesta podéis prometer («en 24 h», «en 48 h»)?
4. **Longitud:** ¿aceptas pasar de unas 18 pantallas a unas 12 aunque se pierdan apartados como «Negocio + Ingeniería», las 4 garantías o 4 de las 10 preguntas?
5. **Rumbo:** ¿se puede tratar como producto, con nombre, duración, entregable y precio orientativo, o el precio sigue fuera?

---

## Fuentes

**Del repositorio** [Hecho]:
- `dist/` (V1, 15:02; V2, 16:10)
- `src/index.template.html` · `src/css/site.css` · `src/js/motion.js` · `src/content.toml` · `build.py` · `dist/reserva/index.html`
- `assets/fonts/*.otf` y `*.woff2`
- `LEEME.md` · `FUENTES.md`
- `investigacion/01_benchmark_y_cta.md` (E.2-E.4)

**Informe hermano, misma auditoría:**
- R2: `investigacion/04_anexos/R2-hero-y-diseno.md`

**Externas, recogidas por R2 con WebSearch el 19-oct-2026 y no vueltas a consultar aquí:**
- Vídeo, rendimiento y accesibilidad: [web.dev · LCP](https://web.dev/articles/lcp) · [DebugBear · video LCP](https://debugbear.com/blog/optimize-video-lcp) · [W3C · SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG20/Understanding/pause-stop-hide) · [MDN · prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) · [caniuse · WebM](https://caniuse.com/webm) · [Chrome · scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- Tendencias y Awwwards: [webyansh · escaneo de 137 webs](https://webyansh.com/post/top-web-design-trends) · [Awwwards · Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/) · [AI in Design Report 2026](https://www.awwwards.com/sites/ai-in-design-report-2026) · [Outsource Consultants](https://www.awwwards.com/sites/outsource-consultants-inc) · [Heron AI](https://www.awwwards.com/sites/heron-ai) · [SaaS Hero · B2B landing examples](https://saashero.net/content/b2b-saas-landing-page-examples/)
- Cristal: [Infinum · Liquid Glass](https://infinum.com/blog/apples-ios-26-liquid-glass-sleek-shiny-and-questionably-accessible/) · [Axess Lab](https://axesslab.com/?p=5111)
- Galerías del cliente: [Supahero](https://www.producthunt.com/p/supahero/supahero) · [Scrolltide](https://www.scrolltide.co/) · [Navbar Gallery](https://suupercharged.substack.com/p/welcome-to-navbar-gallery) · [footer.design (Abduzeedo)](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth) · [CTA.gallery](https://www.cta.gallery/categories/all-types) · [Refero Styles](https://notes.nicolasdeville.com/ai/refero-styles/) · [samasante/liquid-glass](https://github.com/samasante/liquid-glass) · [3dicons (Smashing)](https://smashingmagazine.com/2022/05/3dicons-open-source-library-case-study-download/)
- Firmas de IA y estilo Apple: [Bakken & Baeck · Sierra](https://bakkenbaeck.com/case/sierra) · [Sanctuary Computer · Harvey](https://www.sanctuary.computer/harvey) · [Landing Doctor · Harvey](https://landingdoctors.com/teardowns/harvey-ai) · [Enchanting Marketing · write like Apple](https://www.enchantingmarketing.com/write-like-apple/) · [Neil Patel · copy like Apple](https://neilpatel.com/blog/write-copy-like-apple/)

**Capturas de esta auditoría:** `scratchpad/shots/audit/ (material de trabajo, no incluido en el repo)`
- V1: `d1440-s00…s14`, `m390-t00…t04`, `d1280-*`, `en1440-*`, `mot1440-*`
- V2: `n1440-s00…s15`, `n1440-m0…m3`, `n390-t00…t04`, `n390-hero.png`, `n1440-overlap.png`
- Estado intermedio: `wip1440-*`, `wip390-*`, `wip-hero-frames.png`
- Prueba de fuentes: `font-test.png`, `font-test-fixed.png`
