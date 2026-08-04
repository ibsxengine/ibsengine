export type SectorScenario = {
  id: string;
  label: string;
  searchQuery: string;
  searchHighlight: string;
  googleResult: string;
  whatsappIn: string;
  chat: { from: "client" | "bot"; text: string }[];
  appointment: string;
  appointmentDetail: string;
  crmLead: string;
  crmStatus: string;
  appName: string;
  appOutput: string;
  seguimientoTitle: string;
  seguimientoAmount: string;
  jobs: { name: string; status: string }[];
  calendarEvents: string[];
  dashboardProjects: { name: string; status: string; color: string }[];
  dashboardMetrics: { label: string; value: string };
  appPresupuesto: string;
  appTareas: string;
  appEquipo: string;
  appFacturacion: string;
};

export const SECTOR_SCENARIOS: SectorScenario[] = [
  {
    id: "taller",
    label: "Taller mecánico",
    searchQuery: "taller coches",
    searchHighlight: "cerca de mí",
    googleResult: "Tu taller · Posición 1 en Google",
    whatsappIn: "Hola, ¿tenéis hueco para revisión mañana?",
    chat: [
      { from: "client", text: "Hola, ¿tenéis hueco para revisión mañana?" },
      { from: "bot", text: "¡Hola! Sí, ¿prefieres mañana a las 9:00 o a las 11:30?" },
      { from: "client", text: "A las 9:00 me va bien" },
      { from: "bot", text: "Perfecto. Cita confirmada: mañana 9:00 ✓" },
    ],
    appointment: "Mañana, 9:00",
    appointmentDetail: "Revisión general · Seat León",
    crmLead: "Lead · Motor Ruiz · Revisión",
    crmStatus: "Estado: Cita agendada",
    appName: "IBS Taller",
    appOutput: "Trabajo registrado · Mecánico avisado",
    seguimientoTitle: "Presupuesto · Cambio de frenos",
    seguimientoAmount: "420 €",
    jobs: [
      { name: "ITV · Seat León", status: "En taller" },
      { name: "Frenos · BMW", status: "Presupuesto" },
      { name: "Revisión · Ford", status: "Cita mañana" },
    ],
    calendarEvents: ["9:00 · Revisión Seat León", "11:30 · Diagnosis BMW"],
    dashboardProjects: [
      { name: "Revisión · Motor Ruiz", status: "En curso", color: "text-emerald-400" },
      { name: "Frenos · López", status: "Presupuesto", color: "text-amber-400" },
      { name: "ITV · Vega", status: "Entrega hoy", color: "text-sky-400" },
    ],
    dashboardMetrics: { label: "Vehículos en taller", value: "6" },
    appPresupuesto: "Presupuesto · Frenos BMW · 420 €",
    appTareas: "Asignado · Mecánico Carlos",
    appEquipo: "2 mecánicos · 1 recepción",
    appFacturacion: "Sincronizado · FacturaPro",
  },
  {
    id: "dental",
    label: "Clínica dental",
    searchQuery: "dentista",
    searchHighlight: "urgencias",
    googleResult: "Tu clínica · Reseñas 4,9 ★",
    whatsappIn: "Hola, me duele una muela, ¿podéis verme?",
    chat: [
      { from: "client", text: "Hola, me duele una muela, ¿podéis verme?" },
      { from: "bot", text: "Hola, te ayudamos. ¿Te va bien hoy a las 17:30?" },
      { from: "client", text: "Sí, perfecto" },
      { from: "bot", text: "Cita confirmada: hoy 17:30. Te enviamos recordatorio ✓" },
    ],
    appointment: "Hoy, 17:30",
    appointmentDetail: "Urgencia dental · Dolor muela",
    crmLead: "Lead · Pérez · Urgencia",
    crmStatus: "Estado: Paciente agendado",
    appName: "IBS Clínica",
    appOutput: "Ficha creada · Doctor notificado",
    seguimientoTitle: "Presupuesto · Ortodoncia",
    seguimientoAmount: "2.400 €",
    jobs: [
      { name: "Urgencia · Pérez", status: "Hoy 17:30" },
      { name: "Limpieza · Niño", status: "Confirmada" },
      { name: "Ortodoncia · Ruiz", status: "Presupuesto" },
    ],
    calendarEvents: ["17:30 · Urgencia Pérez", "10:00 · Limpieza Niño"],
    dashboardProjects: [
      { name: "Urgencia · Pérez", status: "Hoy 17:30", color: "text-emerald-400" },
      { name: "Ortodoncia · Ruiz", status: "Presupuesto", color: "text-amber-400" },
      { name: "Limpieza · Niño", status: "Confirmada", color: "text-sky-400" },
    ],
    dashboardMetrics: { label: "Citas hoy", value: "8" },
    appPresupuesto: "Presupuesto · Ortodoncia · 2.400 €",
    appTareas: "Asignado · Dr. Martínez",
    appEquipo: "3 doctores · 2 higienistas",
    appFacturacion: "Sincronizado · ClinicSoft",
  },
  {
    id: "reformas",
    label: "Reformas",
    searchQuery: "reformas integrales",
    searchHighlight: "presupuesto",
    googleResult: "Tu empresa · Posición 1 en Google",
    whatsappIn: "Hola, necesito presupuesto para reformar el baño",
    chat: [
      { from: "client", text: "Hola, necesito presupuesto para reformar el baño" },
      { from: "bot", text: "¡Hola! Te ayudo. ¿Prefieres visita martes o jueves?" },
      { from: "client", text: "Martes por la mañana" },
      { from: "bot", text: "Cita confirmada: Martes 10:00 ✓" },
    ],
    appointment: "Martes, 10:00",
    appointmentDetail: "Visita presupuesto · Baño",
    crmLead: "Lead · García · Reforma baño",
    crmStatus: "Estado: Cita agendada",
    appName: "IBS Reformas",
    appOutput: "Obra creada · Equipo notificado",
    seguimientoTitle: "Presupuesto · Reforma cocina",
    seguimientoAmount: "890 €",
    jobs: [
      { name: "Baño · Martínez", status: "En obra" },
      { name: "Cocina · Vega", status: "Presupuesto" },
      { name: "Integral · Díaz", status: "Asignada" },
    ],
    calendarEvents: ["10:00 · Visita presupuesto", "16:00 · Equipo Obra Martínez"],
    dashboardProjects: [
      { name: "Baño · García", status: "En curso", color: "text-emerald-400" },
      { name: "Cocina · López", status: "Presupuesto", color: "text-amber-400" },
      { name: "Integral · Ruiz", status: "Cita mañana", color: "text-sky-400" },
    ],
    dashboardMetrics: { label: "Obras activas", value: "7" },
    appPresupuesto: "Presupuesto · Cocina Vega · 890 €",
    appTareas: "Equipo Obra · 3 operarios",
    appEquipo: "Capataz + albañiles asignados",
    appFacturacion: "Sincronizado · Holded",
  },
  {
    id: "instalador",
    label: "Instalaciones",
    searchQuery: "aire acondicionado",
    searchHighlight: "instalación",
    googleResult: "Tu empresa · Llamadas +34% este mes",
    whatsappIn: "Hola, ¿instaláis splits en un piso de 80m²?",
    chat: [
      { from: "client", text: "Hola, ¿instaláis splits en un piso de 80m²?" },
      { from: "bot", text: "Sí, ¿te va bien una visita técnica el jueves?" },
      { from: "client", text: "Jueves por la tarde" },
      { from: "bot", text: "Agendado: jueves 16:00. Te confirmamos por WhatsApp ✓" },
    ],
    appointment: "Jueves, 16:00",
    appointmentDetail: "Visita técnica · 2 splits",
    crmLead: "Lead · Sánchez · Climatización",
    crmStatus: "Estado: Visita agendada",
    appName: "IBS Instalaciones",
    appOutput: "Parte de trabajo · Técnico asignado",
    seguimientoTitle: "Presupuesto · Aerotermia",
    seguimientoAmount: "6.200 €",
    jobs: [
      { name: "Splits · Sánchez", status: "Visita jueves" },
      { name: "Caldera · Mora", status: "Instalación" },
      { name: "Aerotermia · Gil", status: "Presupuesto" },
    ],
    calendarEvents: ["16:00 · Visita técnica Sánchez", "9:00 · Instalación caldera"],
    dashboardProjects: [
      { name: "Splits · Sánchez", status: "Visita jueves", color: "text-emerald-400" },
      { name: "Caldera · Mora", status: "En instalación", color: "text-amber-400" },
      { name: "Aerotermia · Gil", status: "Presupuesto", color: "text-sky-400" },
    ],
    dashboardMetrics: { label: "Instalaciones activas", value: "5" },
    appPresupuesto: "Presupuesto · Aerotermia · 6.200 €",
    appTareas: "Técnico asignado · Parte abierto",
    appEquipo: "2 técnicos · 1 comercial",
    appFacturacion: "Sincronizado · Sage",
  },
];
