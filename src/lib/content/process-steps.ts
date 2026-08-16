export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Auditoría",
    description: "Encontramos dónde estás perdiendo tiempo.",
  },
  {
    number: "02",
    title: "Diseñamos",
    description: "Decidimos qué merece la pena automatizar.",
  },
  {
    number: "03",
    title: "Construimos",
    description: "Conectamos todo y ponemos el sistema a trabajar.",
  },
  {
    number: "04",
    title: "Evolucionamos",
    description: "Ajustamos y mejoramos el sistema contigo.",
  },
];
