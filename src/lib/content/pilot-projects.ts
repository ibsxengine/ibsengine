export type PilotProject = {
  id: number;
  title: string;
  cat: string;
  year: string;
  sector: string;
  status: string;
  desc: string;
  size: "large" | "medium";
  imgs: string[];
  metric: string;
  phase: string;
};

export const PILOT_PROJECTS: PilotProject[] = [
  {
    id: 1,
    title: "Taller Mecánico Rivas",
    cat: "Captación + WhatsApp",
    year: "2025",
    sector: "Automoción",
    status: "En piloto activo",
    desc: "Sistema de citas por WhatsApp, recordatorios automáticos y panel de trabajos en curso para un taller de 8 mecánicos.",
    size: "large",
    metric: "8 mecánicos",
    phase: "Fase 2 · Automatización",
    imgs: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80",
      "https://images.unsplash.com/photo-1625047509248-ec889cbff167?w=1400&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfec7a936?w=1400&q=80",
    ],
  },
  {
    id: 2,
    title: "Clínica Dental Norte",
    cat: "Conversión + Agenda",
    year: "2025",
    sector: "Salud",
    status: "En piloto activo",
    desc: "Primera respuesta con IA, confirmación de citas y seguimiento de pacientes que no completaron la reserva.",
    size: "medium",
    metric: "3 consultas",
    phase: "Fase 1 · Captación",
    imgs: [
      "https://images.unsplash.com/photo-1629909618184-090eaa58f803?w=1400&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80",
    ],
  },
  {
    id: 3,
    title: "Reformas Costa",
    cat: "CRM + Presupuestos",
    year: "2024",
    sector: "Construcción",
    status: "Validación",
    desc: "Pipeline de presupuestos, seguimiento de obras y métricas de conversión desde WhatsApp y web.",
    size: "medium",
    metric: "12 obras/año",
    phase: "Fase 3 · CRM",
    imgs: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80",
    ],
  },
  {
    id: 4,
    title: "Hostelería Grupo Sol",
    cat: "App sectorial",
    year: "2024",
    sector: "Hostelería",
    status: "En desarrollo",
    desc: "Reservas, turnos de equipo y control de incidencias en tres locales con un solo panel.",
    size: "large",
    metric: "3 locales",
    phase: "Fase 0 · Diseño",
    imgs: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
    ],
  },
];

export const PROJECT_CATEGORIES = [
  "Todos",
  "Captación + WhatsApp",
  "Conversión + Agenda",
  "CRM + Presupuestos",
  "App sectorial",
] as const;
