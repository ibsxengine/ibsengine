export const SITE = {
  name: "IBS Engine",
  tagline: "Ideas Become Systems",
  url: "https://ibsengine.com",
  email: "info@ibsengine.com",
  description:
    "Digitalizamos y automatizamos pymes y autónomos de cualquier sector: WhatsApp, agendas, CRM y software a medida.",
} as const;

export const WHATSAPP = {
  phone: "34644213020",
  message: "Hola, me gustaría saber más sobre IBS Engine.",
  get href() {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
  },
} as const;

/** Menú principal — solo estas rutas */
export const NAV_MAIN = [
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos pilotos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const FOOTER_LINKS = [...NAV_MAIN] as const;

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORMSPREE_ID";

export const FORMSPREE_CAREERS_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_CAREERS_ID ?? FORMSPREE_ENDPOINT;
