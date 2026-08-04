export type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  incluye: string[];
  img: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "Captación de clientes",
    subtitle: "Que te encuentren y te elijan",
    desc: "Web profesional, SEO local y presencia digital orientada a que te llamen cuando alguien busca lo que haces.",
    incluye: ["Web orientada a conversión", "SEO local por zona", "Google Business optimizado", "Gestión de reseñas"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: "02",
    title: "Conversión inmediata",
    subtitle: "De contacto a oportunidad",
    desc: "WhatsApp automatizado, IA para primer contacto, formularios inteligentes y citas sin fricción.",
    incluye: [
      "WhatsApp Business",
      "Atención inicial con IA",
      "Formularios inteligentes",
      "Agenda automática",
      "Recordatorios y confirmaciones",
    ],
    img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80",
  },
  {
    id: "03",
    title: "Seguimiento comercial",
    subtitle: "Ningún lead se pierde",
    desc: "Detectamos oportunidades estancadas, recordamos seguimientos y cerramos más sin depender de la memoria.",
    incluye: ["Alertas de leads fríos", "Recordatorios automáticos", "Pipeline visual", "Historial por cliente"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: "04",
    title: "Control y CRM",
    subtitle: "Tu negocio en un panel",
    desc: "Métricas, proyectos y equipo en un solo sitio. Sabes qué entra, qué sale y dónde está cada cosa.",
    incluye: ["Dashboard por sector", "Gestión de proyectos", "Métricas en tiempo real", "Roles y permisos"],
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  },
  {
    id: "05",
    title: "App sectorial",
    subtitle: "Software a tu medida",
    desc: "Módulos adaptados a tu oficio: presupuestos, calendario, tareas, facturación y equipo conectados.",
    incluye: ["Módulos por sector", "Presupuestos y trabajos", "Calendario y tareas", "Facturación integrada"],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  },
  {
    id: "06",
    title: "Auditoría digital",
    subtitle: "Diagnóstico sin compromiso",
    desc: "Analizamos fugas de clientes, procesos manuales y oportunidades antes de proponer nada.",
    incluye: ["Mapa de fugas", "Priorización clara", "Plan de acción", "Presupuesto cerrado"],
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
  },
];
