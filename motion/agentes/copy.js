/*
 * Textos de la pieza «agentes» (ES y EN): la misma propuesta comercial, hoy y con un agente (producto Spiral).
 * Se cambian aquí; la animación no se toca. Los textos son los del encargo del 21-oct-2026; solo se parten en líneas
 * (sello, remate y resúmenes) para que quepan. El contador se arma con la plantilla: {p} y {a} son las cifras.
 * El registro se escribe tal cual; en 4:5 cada línea va como subtítulo de su paso (la hora y su texto).
 */
window.COPY = {
  es: {
    titulo: 'La propuesta comercial',
    hoy: 'Hoy',
    ventanas: [
      { app: 'Outlook', t: 'Llega la petición del cliente' },
      { app: 'SharePoint', t: 'Buscar credenciales del sector' },
      { app: 'Teams', t: 'Pedir CV a tres equipos', espera: true },
      { app: 'PowerPoint', t: 'Copiar la última propuesta' },
      { app: 'PowerPoint', t: 'Adaptar formato y marca' },
      { app: 'Outlook', t: 'Perseguir las aprobaciones', espera: true },
    ],
    contador: { plantilla: '{p} {pasos} · {a} {apps} · todo a mano', pasos: ['paso', 'pasos'], apps: ['aplicación', 'aplicaciones'] },
    espera: 'Esperando respuesta…',
    tu: 'Tú',
    pegamento: 'Tú eres el pegamento entre seis pasos.',
    con: 'Con un agente',
    pasos: [
      { who: 'Agente', t: 'Lee la petición y extrae los requisitos' },
      { who: 'Agente', t: 'Reúne credenciales y CV, cada uno con su fuente' },
      { who: 'Agente', t: 'Prepara el borrador en la plantilla de la casa' },
      { who: 'Agente', t: 'Revisa formato, marca y cumplimiento' },
      { who: 'Persona', t: 'Decide enfoque, equipo y precio', persona: true },
      { who: 'Agente', t: 'Deja la propuesta lista para firmar' },
    ],
    registro_t: 'Registro',
    registro: ['09:02 · Petición registrada', '09:04 · Requisitos extraídos', '09:11 · Credenciales, con su fuente', '09:26 · Borrador en la plantilla', '09:27 · En pausa: decisión del director', '11:40 · Lista para firmar'],
    pausa: 'En pausa · Te toca decidir',
    sello: ['Lo decide y lo firma', 'una persona'],
    tu_parte: 'Tu parte: una decisión',
    remate: ['El agente prepara.', 'Una persona decide.'],
    resumen: { hoy: ['Seis pasos, cuatro aplicaciones,', 'todo a mano.'], con: ['Una decisión tuya.', 'El resto, preparado y registrado.'] },
    ilus: 'Ejemplo ilustrativo',
  },
  en: {
    titulo: 'The sales proposal',
    hoy: 'Today',
    ventanas: [
      { app: 'Outlook', t: 'The client’s request arrives' },
      { app: 'SharePoint', t: 'Search for sector credentials' },
      { app: 'Teams', t: 'Ask three teams for CVs', espera: true },
      { app: 'PowerPoint', t: 'Copy the last proposal' },
      { app: 'PowerPoint', t: 'Adapt format and branding' },
      { app: 'Outlook', t: 'Chase the approvals', espera: true },
    ],
    contador: { plantilla: '{p} {pasos} · {a} {apps} · all by hand', pasos: ['step', 'steps'], apps: ['app', 'apps'] },
    espera: 'Waiting for a reply…',
    tu: 'You',
    pegamento: 'You are the glue between six steps.',
    con: 'With an agent',
    pasos: [
      { who: 'Agent', t: 'Reads the request and extracts the requirements' },
      { who: 'Agent', t: 'Gathers credentials and CVs, each with its source' },
      { who: 'Agent', t: 'Prepares the draft in the house template' },
      { who: 'Agent', t: 'Checks format, branding and compliance' },
      { who: 'Person', t: 'Decides approach, team and price', persona: true },
      { who: 'Agent', t: 'Leaves the proposal ready to sign' },
    ],
    registro_t: 'Log',
    registro: ['09:02 · Request logged', '09:04 · Requirements extracted', '09:11 · Credentials, with their source', '09:26 · Draft in the template', '09:27 · Paused: director’s decision', '11:40 · Ready to sign'],
    pausa: 'Paused · Your call',
    sello: ['A person decides', 'and signs it off'],
    tu_parte: 'Your part: one decision',
    remate: ['The agent prepares.', 'A person decides.'],
    resumen: { hoy: ['Six steps, four apps,', 'all by hand.'], con: ['One decision from you.', 'The rest, prepared and logged.'] },
    ilus: 'Illustrative example',
  },
};
