"use client";

import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { SystemCanvas } from "@/components/demos/SystemCanvas";
import { LiveSignatureFlow } from "@/components/signature/LiveSignatureFlow";
import { getShowcaseBlockVariant } from "@/lib/motion/section-animations";
import { defaultTransition, layerRevealReduced } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

function ShowcaseContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <Container className="relative">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(0)}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <SectionLabel>Arquitectura del sistema</SectionLabel>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl lg:text-[2.75rem]">
          Construye tu lógica de negocio
        </h2>
        <p className="text-text-secondary mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
          Cada canal conectado. Cada contacto procesado. Cada cita, lead y trabajo
          fluye hacia donde toca — sea cual sea tu negocio.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-10 max-w-4xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(1)}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.08 }}
      >
        <DemoFrame label="Arquitectura · Motor IBS">
          <SystemCanvas />
        </DemoFrame>
      </motion.div>

      <motion.div
        className="mx-auto mt-8 max-w-4xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(2)}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.14 }}
      >
        <DemoFrame label="Flujo en vivo · Firma IBS">
          <LiveSignatureFlow />
        </DemoFrame>
      </motion.div>
    </Container>
  );
}

export function SignatureShowcase() {
  return (
    <AmbientSection
      sectionId="como-funciona"
      id="como-funciona"
      className="overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20"
      aria-label="Cómo funciona IBS Engine"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" aria-hidden />
      <ShowcaseContent />
    </AmbientSection>
  );
}
