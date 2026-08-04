import type { Variants } from "framer-motion";
import type { SectionId } from "@/lib/section-themes";
import {
  arcFromLeft,
  arcFromRight,
  bounceIn,
  driftUp,
  fadeUpStrong,
  layerReveal,
  popRise,
  riseScale,
  skewSlideUp,
  slideDown,
  slideFromLeft,
  slideFromRight,
  wipeFromLeft,
  wipeFromRight,
  zoomOut,
} from "./variants";

/** Entrada de capa — distinta por sección */
export const SECTION_REVEAL: Partial<Record<SectionId, Variants>> = {
  "como-funciona": wipeFromLeft,
  captacion: riseScale,
  conversion: arcFromRight,
  auditoria: skewSlideUp,
  seguimiento: popRise,
  control: driftUp,
  "sistema-sectorial": fadeUpStrong,
  proceso: slideFromLeft,
  cta: wipeFromRight,
  contacto: bounceIn,
  hero: slideDown,
};

const BLOCK_TEXT: Record<string, Variants> = {
  captacion: slideFromLeft,
  conversion: arcFromRight,
  seguimiento: wipeFromRight,
  control: skewSlideUp,
  "sistema-sectorial": driftUp,
};

const BLOCK_DEMO: Record<string, Variants> = {
  captacion: bounceIn,
  conversion: riseScale,
  seguimiento: arcFromLeft,
  control: popRise,
  "sistema-sectorial": zoomOut,
};

export function getSectionRevealVariant(sectionId?: string): Variants {
  if (!sectionId) return layerReveal;
  return SECTION_REVEAL[sectionId as SectionId] ?? layerReveal;
}

export function getBlockAnimations(blockId: string) {
  return {
    textVariants: BLOCK_TEXT[blockId] ?? slideFromLeft,
    demoVariants: BLOCK_DEMO[blockId] ?? arcFromLeft,
  };
}

export function getAuditoriaAnimations() {
  return {
    textVariants: fadeUpStrong,
    demoVariants: wipeFromLeft,
  };
}

export function getShowcaseBlockVariant(index: number): Variants {
  return [riseScale, bounceIn, wipeFromRight][index] ?? riseScale;
}
