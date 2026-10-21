/*
 * Textos de la película de apertura de Spiralia AI (ES y EN). Se cambian aquí; la animación no se toca.
 * Guion del 21-oct-2026: abre con el dolor del CEO (quedarse atrás frente a quien ya trabaja con IA), da tiempo
 * a leer las dos cifras y termina en la marca, sin cifras ni pruebas en el cartel final.
 * Cifras y fuentes (las mismas de la web, ver src/cifras.toml):
 *  80 % y 6 %: McKinsey, «The state of AI in 2026» (agosto de 2026). El 80 % son personas encuestadas; el 6 %,
 *  empresas que atribuyen a la IA al menos un 5 % de su EBIT. Son bases distintas: por eso hay corte, no cuenta
 *  atrás, y cada una lleva su propia rejilla (100 personas, 100 empresas).
 */
window.COPY = {
  es: {
    cromo: 'Spiralia AI',
    s1: { pre: ['Hay empresas', 'que ya'], verbos: ['responden antes.', 'deciden antes.', 'venden antes.'] },
    s2: ['Con la misma IA', 'que tú.'],
    s3: { n: 80, suf: ' %', t: 'de los encuestados dice que la IA le ha hecho más productivo', reja: 'De cada 100 encuestados' },
    s4: { n: 6, corte: true, suf: ' %', t: 'de las empresas saca de la IA al menos un 5 % de su beneficio', reja: 'De cada 100 empresas' },
    fuente: 'McKinsey, The state of AI in 2026. El 6 %: empresas que atribuyen a la IA al menos un 5 % de su EBIT.',
    s5: ['La diferencia', 'no es la IA.', 'Es cómo', 'se despliega.'],
    s6: ['Formamos', 'a cada persona', 'con su trabajo.'],
    s7: ['Y construimos', 'con tu equipo', 'hasta que funciona.'],
    lema: 'Formación y despliegue de IA',
  },
  en: {
    cromo: 'Spiralia AI',
    s1: { pre: ['Some companies', 'already'], verbos: ['respond faster.', 'decide faster.', 'sell faster.'] },
    s2: ['With the same AI', 'as you.'],
    s3: { n: 80, suf: '%', t: 'of respondents say AI has made them more productive', reja: 'Out of every 100 respondents' },
    s4: { n: 6, corte: true, suf: '%', t: 'of companies get at least 5% of their operating profit from AI', reja: 'Out of every 100 companies' },
    fuente: 'McKinsey, The state of AI in 2026. The 6%: companies attributing at least 5% of their EBIT to AI.',
    s5: ['The difference', 'isn’t the AI.', 'It’s how', 'it’s deployed.'],
    s6: ['We train', 'every person', 'on their work.'],
    s7: ['And we build', 'with your team', 'until it works.'],
    lema: 'AI training and deployment',
  },
};
