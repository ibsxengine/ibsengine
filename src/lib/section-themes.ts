/** Paleta oficial del logo IBS */
export const BRAND = {
  navy: "#0d1e3a",
  gold: "#a08856",
  goldLight: "#c8aa70",
  goldMid: "#ae9462",
  bronze: "#7a5c38",
  navyDeep: "#07101e",
  navyMid: "#132d52",
  navySoft: "#1a3d66",
} as const;

export type SectionId =
  | "hero"
  | "como-funciona"
  | "captacion"
  | "conversion"
  | "auditoria"
  | "seguimiento"
  | "control"
  | "sistema-sectorial"
  | "proceso"
  | "cta"
  | "contacto"
  | "default";

export type SectionAmbient = {
  orbA: { color: string; x: string; y: string; size: string };
  orbB: { color: string; x: string; y: string; size: string };
  base: string;
};

/** Fondos sólidos por sección — transición elegante al scroll (estilo Ital) */
export const SECTION_SOLIDS: Record<SectionId, string> = {
  hero: "transparent",
  "como-funciona": BRAND.navy,
  captacion: BRAND.navyMid,
  conversion: BRAND.navy,
  auditoria: BRAND.navyDeep,
  seguimiento: BRAND.navySoft,
  control: BRAND.navyMid,
  "sistema-sectorial": BRAND.navy,
  proceso: BRAND.navyDeep,
  cta: BRAND.navyMid,
  contacto: BRAND.navy,
  default: BRAND.navy,
};

export const SECTION_AMBIENTS: Record<SectionId, SectionAmbient> = {
  hero: {
    base: BRAND.navyDeep,
    orbA: { color: "rgba(21, 50, 91, 0.42)", x: "10%", y: "-8%", size: "42vmax" },
    orbB: { color: "rgba(158, 125, 82, 0.16)", x: "85%", y: "68%", size: "38vmax" },
  },
  "como-funciona": {
    base: BRAND.navy,
    orbA: { color: "rgba(21, 50, 91, 0.35)", x: "78%", y: "6%", size: "40vmax" },
    orbB: { color: "rgba(13, 26, 48, 0.5)", x: "5%", y: "72%", size: "36vmax" },
  },
  captacion: {
    base: BRAND.navyMid,
    orbA: { color: "rgba(26, 61, 102, 0.38)", x: "88%", y: "12%", size: "38vmax" },
    orbB: { color: "rgba(21, 50, 91, 0.28)", x: "8%", y: "80%", size: "34vmax" },
  },
  conversion: {
    base: BRAND.navy,
    orbA: { color: "rgba(197, 163, 106, 0.14)", x: "14%", y: "10%", size: "40vmax" },
    orbB: { color: "rgba(21, 50, 91, 0.32)", x: "82%", y: "70%", size: "36vmax" },
  },
  auditoria: {
    base: BRAND.navyDeep,
    orbA: { color: "rgba(21, 50, 91, 0.36)", x: "48%", y: "4%", size: "38vmax" },
    orbB: { color: "rgba(109, 79, 45, 0.12)", x: "15%", y: "70%", size: "32vmax" },
  },
  seguimiento: {
    base: BRAND.navySoft,
    orbA: { color: "rgba(18, 40, 71, 0.36)", x: "10%", y: "20%", size: "38vmax" },
    orbB: { color: "rgba(21, 50, 91, 0.28)", x: "86%", y: "58%", size: "32vmax" },
  },
  control: {
    base: BRAND.navyMid,
    orbA: { color: "rgba(21, 50, 91, 0.38)", x: "72%", y: "8%", size: "40vmax" },
    orbB: { color: "rgba(13, 26, 48, 0.45)", x: "18%", y: "82%", size: "30vmax" },
  },
  "sistema-sectorial": {
    base: BRAND.navy,
    orbA: { color: "rgba(26, 61, 102, 0.32)", x: "84%", y: "30%", size: "36vmax" },
    orbB: { color: "rgba(158, 125, 82, 0.1)", x: "8%", y: "52%", size: "34vmax" },
  },
  proceso: {
    base: BRAND.navyDeep,
    orbA: { color: "rgba(18, 40, 71, 0.3)", x: "24%", y: "4%", size: "36vmax" },
    orbB: { color: "rgba(21, 50, 91, 0.32)", x: "74%", y: "72%", size: "32vmax" },
  },
  cta: {
    base: BRAND.navyMid,
    orbA: { color: "rgba(197, 163, 106, 0.12)", x: "42%", y: "14%", size: "38vmax" },
    orbB: { color: "rgba(21, 50, 91, 0.3)", x: "58%", y: "76%", size: "32vmax" },
  },
  contacto: {
    base: BRAND.navy,
    orbA: { color: "rgba(21, 50, 91, 0.34)", x: "16%", y: "36%", size: "36vmax" },
    orbB: { color: "rgba(18, 40, 71, 0.26)", x: "80%", y: "28%", size: "32vmax" },
  },
  default: {
    base: BRAND.navy,
    orbA: { color: "rgba(21, 50, 91, 0.3)", x: "12%", y: "-4%", size: "42vmax" },
    orbB: { color: "rgba(13, 26, 48, 0.4)", x: "84%", y: "82%", size: "36vmax" },
  },
};

export function resolveSectionId(id?: string): SectionId {
  if (!id) return "default";
  if (id in SECTION_AMBIENTS) return id as SectionId;
  return "default";
}
