export type CommercialBlock = {
  id: string;
  headline: string;
  tagline: string;
  positioning: string;
  bullets?: string[];
  cta?: { label: string; href: string };
  variant: "navy" | "navy-alt";
};

export const COMMERCIAL_BLOCKS: CommercialBlock[] = [
  {
    id: "control",
    headline: "Gestión",
    tagline: "Deja de hacer de administrativo... eres el jefe.",
    positioning:
      "Todo lo que necesitas para gestionar tu negocio, en un solo sitio.",
    bullets: [
      "Clientes y trabajos",
      "Presupuestos y facturas",
      "Documentos y estados",
      "Todo conectado",
    ],
    cta: { label: "Ver cómo funciona", href: "/servicios#gestion" },
    variant: "navy",
  },
  {
    id: "conversion",
    headline: "Tu nueva compañera, nuestra IA",
    tagline: "Sin vacaciones. Sin pausas. Sin tareas repetitivas.",
    positioning:
      "Mientras tú haces lo importante, tu nueva compañera ya está atendiendo por ti.\n\nLlamadas, WhatsApp, consultas, datos y citas. Cuando tú no puedes estar, ella sí.",
    cta: { label: "Ver cómo funciona", href: "/servicios#ia" },
    variant: "navy-alt",
  },
  {
    id: "seguimiento",
    headline: "Automatización",
    tagline: "La tecnología ya puede hacer ese trabajo. La pregunta es por qué sigues haciéndolo tú.",
    positioning:
      "Deja que el sistema haga automáticamente lo que hoy haces una y otra vez.",
    bullets: [
      "Seguimientos automáticos",
      "Tareas repetitivas",
      "Conexión entre herramientas",
      "Procesos que se ejecutan solos",
    ],
    cta: { label: "Ver cómo funciona", href: "/servicios#automatizacion" },
    variant: "navy",
  },
  {
    id: "sistema-sectorial",
    headline: "Sistemas a medida",
    tagline: "Tu negocio no funciona como los demás. Tu sistema tampoco debería.",
    positioning:
      "Construimos la solución alrededor de cómo trabajas tú, no al revés.",
    bullets: [
      "Aplicaciones adaptadas a tu forma de trabajar",
      "Integraciones con tus herramientas",
      "IA adaptada a tu negocio",
      "Automatizaciones para tus procesos reales",
    ],
    cta: { label: "Ver sistemas a medida", href: "/servicios#sistemas" },
    variant: "navy-alt",
  },
];

export const AUDITORIA_CTA = {
  headline: "Te enseñamos dónde estás perdiendo tiempo.",
  tagline: "¿Cuántas horas estás perdiendo haciendo trabajo que nuestra IA podría hacer por ti?",
  description:
    "Enséñanos cómo trabajas durante un día normal. Te señalamos dónde estás perdiendo tiempo y qué trabajo podemos quitarte de encima. Sin tecnicismos. Sin humo. Sin venderte una herramienta que no necesitas.",
  bullets: [
    "Las tareas que más tiempo te roban",
    "El trabajo que sigues haciendo a mano sin necesidad",
    "Qué puede hacer la IA por ti",
    "Qué podemos automatizar, conectar o eliminar",
    "Qué deberías automatizar primero y cuánto trabajo puede quitarte",
  ],
} as const;
