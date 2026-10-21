/*
 * Textos de «lunes» (ES y EN). Se cambian aquí; la animación no se toca.
 * Mismo ejemplo en toda la pieza: el informe mensual del área para el comité (el de la escalera de CCEP).
 * Los titulares (txt) van partidos en líneas para que suban desde su máscara; el resto se reparte solo.
 * sello y pulso (la línea de la base: Alfabetización IA y Radar) se parten en el JS por «. » y « · » (el texto es el mismo).
 */
window.COPY = {
  es: {
    viernes: { dia: 'Viernes', hora: '17:00', tarjeta: 'Formación · Tu propia tarea', tarea: 'Preparar el informe mensual del área', hecho: 'Hecho con IA en la sesión', txt: ['El curso acaba', 'el viernes.'] },
    lunes: {
      dia: 'Lunes', hora: '9:00', de: 'Dirección', asunto: 'Informe mensual para el comité del jueves',
      encargo: 'Resume cómo ha ido el mes en el área: indicadores, desviaciones y tres temas para el comité.',
      borrador: ['Ventas: en objetivo, con dos canales por debajo.', 'Desviación: roturas de stock en dos referencias.', 'Para el comité: surtido, plazos y la campaña de invierno.'],
      sello: 'Lo mismo que practicó. En su mesa.',
      txt: ['Lo que cuenta', 'empieza el lunes.'],
    },
    escalera: 'Y después, peldaño a peldaño',
    peldanos: [
      { n: '01', v: 'Pedir', q: 'IA asistencial', d: 'Le pides y te ayuda. Cada vez, desde cero.', e: '«Resume cómo ha ido el mes»' },
      { n: '02', v: 'Enseñar', q: 'Skill', d: 'Escribes una vez tu método y lo sigue siempre igual.', e: 'La skill «informe mensual»' },
      { n: '03', v: 'Automatizar', q: 'Automatización', d: 'Se pone en marcha sola cuando pasa algo.', e: 'Al cierre del mes, el borrador llega solo' },
      { n: '04', v: 'Delegar', q: 'Agente', d: 'Recibe un objetivo y unos límites, y pide tu revisión.', e: 'Prepara el comité: reúne, señala y propone' },
    ],
    marcador: 'Tu equipo, el lunes',
    tramos: [{ p: 'Formación a\u00a0medida', d: 'Lo haces tú' }, { p: 'Spiral', d: 'Lo construimos contigo' }],
    pulso: 'Alfabetización IA y Radar · Debajo de cada peldaño',
    remate: ['Lo haces tú el lunes.', 'Y si quieres, subimos contigo.'],
    ilus: 'Ejemplo ilustrativo',
  },
  en: {
    viernes: { dia: 'Friday', hora: '5:00 pm', tarjeta: 'Training · Your own task', tarea: 'Prepare the area’s monthly report', hecho: 'Done with AI in the session', txt: ['The course ends', 'on Friday.'] },
    lunes: {
      dia: 'Monday', hora: '9:00 am', de: 'Leadership', asunto: 'Monthly report for Thursday’s committee',
      encargo: 'Summarize how the month went in the area: KPIs, deviations and three topics for the committee.',
      borrador: ['Sales: on target, with two channels below.', 'Deviation: stockouts in two SKUs.', 'For the committee: assortment, lead times and the winter campaign.'],
      sello: 'What they practiced. At their desk.',
      txt: ['What counts', 'starts on Monday.'],
    },
    escalera: 'And then, step by step',
    peldanos: [
      { n: '01', v: 'Ask', q: 'Assistant AI', d: 'You ask and it helps. From scratch, every time.', e: '“Summarize how the month went”' },
      { n: '02', v: 'Teach', q: 'Skill', d: 'You write your method once and it follows it every time.', e: 'The “monthly report” skill' },
      { n: '03', v: 'Automate', q: 'Automation', d: 'It starts on its own when something happens.', e: 'At month-end, the draft arrives on its own' },
      { n: '04', v: 'Delegate', q: 'Agent', d: 'It gets a goal and limits, and asks for your review.', e: 'Prepares the committee: gathers, flags, proposes' },
    ],
    marcador: 'Your team, on Monday',
    tramos: [{ p: 'Tailored Training', d: 'You do it' }, { p: 'Spiral', d: 'We build it with you' }],
    pulso: 'AI Literacy and Radar · Under every step',
    remate: ['You do it on Monday.', 'And if you want, we climb with you.'],
    ilus: 'Illustrative example',
  },
};
