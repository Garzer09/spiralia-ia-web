/*
 * Textos de la película de apertura de Spiralia AI (ES y EN). Se cambian aquí; la animación no se toca.
 * Cifras y fuentes (las mismas de la web, ver src/cifras.toml):
 *  80 % y 6 %: McKinsey, «The state of AI in 2026» (agosto de 2026). El 6 % son las empresas que atribuyen
 *  a la IA al menos un 5 % de su EBIT. 50.000: alumnos formados por Spiralia. ING España: usuarios activos
 *  semanales del 66 % al 92 % (medición interna del grupo ING, uso externo autorizado). Deloitte España:
 *  13.000 personas formadas en un mes (septiembre-octubre de 2026).
 */
window.COPY = {
  es: {
    cromo: 'Spiralia AI',
    s1: ['La IA ya está', 'en todas las mesas.'],
    s2: { n: 80, suf: ' %', t: 'de los encuestados dice que la IA le ha hecho más productivo' },
    s3: { n: 6, desde: 80, suf: ' %', t: 'de las empresas lo ve de verdad en su beneficio' },
    fuente: 'McKinsey, The state of AI in 2026. El 6 %: empresas que atribuyen a la IA al menos un 5 % de su EBIT.',
    s4: ['El curso acaba', 'el viernes.'],
    s5: ['¿Y el lunes?'],
    s6: ['Formamos', 'a cada persona', 'con su propio', 'trabajo.'],
    s7: ['Construimos', 'con tu equipo', 'hasta que funciona.'],
    lema: 'AI adoption, end-to-end.',
    filas: [['Alumnos formados', '50.000'], ['ING · uso semanal', '66 % → 92 %'], ['Deloitte · en un mes', '13.000']],
  },
  en: {
    cromo: 'Spiralia AI',
    s1: ['AI is already', 'on every desk.'],
    s2: { n: 80, suf: '%', t: 'of respondents say AI has made them more productive' },
    s3: { n: 6, desde: 80, suf: '%', t: 'of companies truly see it in their profit' },
    fuente: 'McKinsey, The state of AI in 2026. The 6%: companies attributing at least 5% of their EBIT to AI.',
    s4: ['The course ends', 'on Friday.'],
    s5: ['And on Monday?'],
    s6: ['We train', 'every person', 'on their', 'own work.'],
    s7: ['We build', 'with your team', 'until it works.'],
    lema: 'AI adoption, end-to-end.',
    filas: [['People trained', '50,000'], ['ING · weekly use', '66% → 92%'], ['Deloitte · in one month', '13,000']],
  },
};
