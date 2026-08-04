export type CommercialBlock = {
  id: string;
  headline: string;
  tagline: string;
  positioning: string;
  bullets: string[];
  variant: "navy" | "navy-alt";
};

export const COMMERCIAL_BLOCKS: CommercialBlock[] = [
  {
    id: "captacion",
    headline: "Captación de Clientes",
    tagline: "Que te encuentren y te elijan",
    positioning:
      "No vendemos webs. Vendemos que te llamen cuando alguien busca lo que haces.",
    bullets: [
      "Web profesional orientada a conversión",
      "SEO local para tu zona",
      "Google Business optimizado",
      "Gestión de reseñas automáticas",
    ],
    variant: "navy",
  },
  {
    id: "conversion",
    headline: "Conversión Inmediata",
    tagline: "Que cada contacto se convierta en oportunidad",
    positioning:
      "Aquí se gana o se pierde dinero cada día. Si no respondes a tiempo, el cliente ya ha llamado a otro.",
    bullets: [
      "WhatsApp Business automatizado",
      "Atención inicial con IA: FAQ, captura de datos y primer contacto",
      "Formularios inteligentes",
      "Gestión automática de citas",
      "Recordatorios y confirmaciones",
    ],
    variant: "navy-alt",
  },
  {
    id: "seguimiento",
    headline: "Seguimiento y Recuperación",
    tagline: "Recuperar dinero que ya es tuyo",
    positioning:
      "No necesitas más leads. Necesitas cerrar los que ya tienes.",
    bullets: [
      "Recuperación de leads perdidos por WhatsApp y email",
      "Seguimiento de presupuestos sin respuesta",
      "Automatización de llamadas perdidas",
      "Reengagement automático de clientes",
      "Soporte ligero con IA para el seguimiento comercial",
    ],
    variant: "navy",
  },
  {
    id: "control",
    headline: "Control del Negocio",
    tagline: "Saber qué está pasando en tu empresa",
    positioning:
      "No vendemos software. Vendemos que sepas en todo momento dónde está cada cliente y cada trabajo.",
    bullets: [
      "CRM interno simplificado",
      "Dashboard de negocio",
      "Gestión de clientes",
      "Estados de proyectos y trabajos",
      "Documentación centralizada",
    ],
    variant: "navy-alt",
  },
  {
    id: "sistema-sectorial",
    headline: "Sistema Sectorial",
    tagline: "Tu empresa operando como una máquina",
    positioning:
      "App vertical a medida para tu sector. Cada negocio con su flujo — no plantillas genéricas.",
    bullets: [
      "App vertical a medida para cualquier sector",
      "Gestión de trabajos, obras y servicios",
      "Presupuestos",
      "Calendario operativo",
      "Asignación de tareas y equipos",
      "Conexión con tu software de facturación habitual",
    ],
    variant: "navy",
  },
];

export const AUDITORIA_CTA = {
  headline: "Auditoría de Automatización",
  tagline: "Te enseño cuánto dinero estás perdiendo",
  description:
    "Un análisis claro de dónde se escapan tus oportunidades — sin compromiso y sin tecnicismos.",
  bullets: [
    "Análisis de leads perdidos",
    "Fallos de seguimiento detectados",
    "Oportunidades de automatización",
    "Mapa de mejoras concreto",
  ],
} as const;
