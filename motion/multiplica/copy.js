/*
 * Textos de «multiplica» (sección «Lo que cuesta esperar», #esperar), en ES y EN. Se cambian aquí; la animación no se toca.
 * Va debajo del titular «La IA multiplica. Y la distancia, también.» Es un esquema: sin cifras ni escala vertical.
 * cortes: dónde se parte una línea, en número de palabras de la primera (solo presentación; el texto no cambia).
 *   arriba     el rótulo de la línea de arriba, en los dos formatos
 *   bien       la cabecera «Multiplica lo que haces bien.», solo en 4:5 (no cabe en una línea de 912 px)
 */
window.COPY = {
  es: {
    intro: ['La IA no suma.', 'Multiplica.'],
    eje: 'Semanas',
    semana: 'Semana {n}',
    arriba: 'Quien la despliega con método',
    abajo: 'Quien espera',
    hueco: 'La distancia',
    bien: 'Multiplica lo que haces bien.',
    mal: 'Y lo que haces mal.',
    riesgos: ['IA en la sombra', 'Errores sin revisar', 'Datos donde no deben', 'Cada uno a su manera'],
    remate: ['Cada semana que esperas,', 'la distancia crece.'],
    ilus: 'Esquema ilustrativo',
    cortes: { arriba: 3, bien: 3 },
  },
  en: {
    intro: ['AI doesn’t add.', 'It multiplies.'],
    eje: 'Weeks',
    semana: 'Week {n}',
    arriba: 'Those who deploy it with a method',
    abajo: 'Those who wait',
    hueco: 'The gap',
    bien: 'It multiplies what you do well.',
    mal: 'And what you do badly.',
    riesgos: ['Shadow AI', 'Unchecked errors', 'Data where it shouldn’t be', 'Everyone their own way'],
    remate: ['Every week you wait,', 'the gap grows.'],
    ilus: 'Illustrative diagram',
    cortes: { arriba: 4, bien: 3 },
  },
};
