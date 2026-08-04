"use client";

import { scrollViewport, defaultTransition } from "@/lib/motion/variants";
import { useReducedMotion } from "framer-motion";

/** once: false — el contenido entra y sale al subir/bajar */
export function useScrollReveal() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion: prefersReducedMotion ?? false,
    viewport: scrollViewport,
    transition: prefersReducedMotion ? { duration: 0 } : defaultTransition,
  };
}
