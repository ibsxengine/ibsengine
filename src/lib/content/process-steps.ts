export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Auditoría",
    description:
      "Analizamos cómo entran tus clientes, dónde se pierden oportunidades y qué se puede automatizar ya.",
  },
  {
    number: "02",
    title: "Implementación",
    description:
      "Montamos las piezas acordadas: web, WhatsApp, citas, CRM o sistema sectorial. Sin sorpresas.",
  },
  {
    number: "03",
    title: "Sistema funcionando",
    description:
      "Tu negocio empieza a responder solo, agendar citas y dar seguimiento mientras tú trabajas.",
  },
  {
    number: "04",
    title: "Soporte continuo",
    description:
      "Ajustamos, mejoramos y añadimos lo que necesites. El sistema crece con tu empresa.",
  },
];
