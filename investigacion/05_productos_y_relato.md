# 05 · Productos y relato de la página (21-oct-2026)

Responde a los 13 cambios que pidió Jose el 21-oct. Es la fuente de verdad de los productos, el orden de la página, los titulares y el guion de cada pieza animada. El copy final, en ES y EN, está en `src/content.toml`.

## 1. Los productos

Cuatro productos que siempre funcionan igual: tienen nombre, para quién son, cuánto duran, fases fijas y lo que se lleva el cliente. Se ordenan sobre la **escalera de la IA**, la de CCEP:

| Peldaño | Qué es | Quién lo sube |
|---|---|---|
| 1 · Asistencia | Le pides y te ayuda: redactar, resumir, analizar. | Cada persona, después de **Hábito** |
| 2 · Skills | Le enseñas una vez cómo lo haces y lo repite igual. | Cada persona, después de **Hábito** |
| 3 · Automatizaciones | Pasa sin que lo pidas: un correo entra y la respuesta queda preparada. | Con **Spiral** |
| 4 · Agentes | Hace la tarea entera, con permisos, dueño y registro. Tú decides lo importante. | Con **Spiral** |

**Pulso** acompaña en los cuatro peldaños. **Día Uno** enseña la escalera entera en una jornada y decide por dónde empezar.

### Día Uno · el piloto
- **Para quién:** el comité de dirección y los managers. Es el piloto: casi todos los clientes empiezan aquí.
- **Duración:** una jornada en la empresa del cliente, con preparación previa.
- **Fases:** Antes (escuchamos: tareas, documentos y prioridades) · Mañana (hacen: tres rondas con su propio trabajo, velocidad, escala y capacidad) · Tarde (deciden: escriben sus casos y los priorizan por valor) · Después (plan: resumen por escrito con los casos priorizados, el punto de partida y el siguiente paso).
- **Te llevas:** cada persona, una tarea suya hecha con IA. El comité, sus casos priorizados y un plan por escrito. Es del cliente, siga o no con Spiralia.

### Hábito · formación a medida (producto A)
- **Para quién:** toda la organización, por perfiles, del comité a la primera línea.
- **Duración:** por oleadas, al ritmo de la empresa.
- **Fases:** las de la personalización (diapositiva 14 del deck de Santander): escuchamos, recogemos sus tareas, preparamos el material calcado de su trabajo, practican y se lo llevan. Después, champions y comunidad.
- **Te llevas:** cada persona usando la IA el lunes en su trabajo, sus primeras skills, champions en cada equipo y el uso real medido.
- **Peldaños:** 1 y 2.

### Spiral · despliegue con tu equipo (producto B)
- **Para quién:** un área y sus procesos.
- **Duración:** ciclos cortos, proceso a proceso.
- **Fases (método SPIRAL):** Skill · Pair · Identify · Rebuild · Assure · Launch. La S es Hábito: si el área ya lo ha hecho, se empieza en la P.
- **Te llevas:** automatizaciones y agentes en uso, cada uno con dueño, pruebas y manual, y un equipo capaz de mantenerlos.
- **Peldaños:** 3 y 4.

### Pulso · acompañamiento
- **Para quién:** champions, managers y comité, después de Hábito o de Spiral.
- **Duración:** mensual.
- **Ciclo:** Medir (uso real por equipo) · Resolver (consultas en directo y casos nuevos) · Subir (una skill o una automatización nueva cada mes) · Revisar (con el comité, cada trimestre).
- **Te llevas:** un uso que no se enfría, un cuadro de mando y una cartera de casos que crece.

## 2. Orden de la página

1. **Portada.** «Que el ritmo de tu sector lo marque tu empresa.» Sin ING. El subtítulo dice qué vendemos.
2. **Franja de prueba.** 50.000 y logos (sin EY).
3. **Lo que hacemos** (`#productos`). Los cuatro productos sobre la escalera, en una pantalla. Es la respuesta al «Apple lo habría presentado antes».
4. **Por qué ahora** (`#reto`). «Las licencias llegaron. El plan, todavía no.» Lo que nadie dice en el comité y la curva del uso frente a lo que se paga.
5. **La ventaja** (`#ventaja`). «La IA ya está en todas las empresas. Pero en pocas cuentas de resultados.» Vídeo: el mismo modelo, tres empresas, tres resultados.
6. **Lo que cuesta esperar** (`#esperar`). «La IA multiplica. Y la distancia, también.» Vídeo del multiplicador y nube de riesgos que se ordena en un plan de cuatro productos.
7. **Diagnóstico** (`#diagnostico`), con estimación del valor que se escapa (ROI orientativo).
8. **El viernes y el lunes** (`#lunes`). Vídeo y escalera de la IA.
9. **Día Uno, Hábito, Spiral y Pulso** en detalle (`#dia-uno`, `#habito`, `#spiral`, `#pulso`). En Hábito, primero cómo personalizamos y después los ejemplos. En Spiral, la espiral de puntos con las letras y el vídeo de los agentes.
10. **Casos**, **Para ti**, **Por qué Spiralia**, **Preguntas** y **Cierre**.

## 3. Piezas HyperFrames

Las mismas reglas que la película: todo es función de `t`, sin azar, Butler Light y Sofia Sans Condensed, paleta Monocromo y cortes a 120 BPM. Cada pieza en ES y EN, en 16:9 (escritorio) y 4:5 (móvil). Proceso de estudio del artículo «Motion Engineering» de @0xwhrrari: dirección (este documento), referencias (decks de Santander y CCEP), línea de tiempo (cabecera de cada `*.js`), render y bucle de revisión con capturas antes de dar una pieza por buena.

| Pieza | Carpeta | Mensaje |
|---|---|---|
| Película de apertura | `motion/film/` | Empieza por el dolor del CEO («Hay empresas que ya responden antes, deciden antes, venden antes. Con la misma IA que tú.»). 80 % y 6 % con 3,6 s cada una. Cartel final solo con la S y SPIRALIA. |
| Mismo modelo | `motion/modelo/` | Un mismo modelo llega a tres empresas: licencias, un piloto, despliegue. Solo la tercera lo nota en la cuenta de resultados. |
| Multiplicador | `motion/multiplica/` | Semana a semana, quien despliega se aleja de quien espera. Multiplica lo que haces bien y lo que haces mal. |
| El viernes y el lunes | `motion/lunes/` | La tarea del curso vuelve el lunes, en su bandeja. Después, la escalera. |
| Agentes | `motion/agentes/` | La misma propuesta comercial: con un asistente la haces tú; con un agente la prepara él y tú decides. |
