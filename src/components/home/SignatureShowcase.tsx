"use client";

import dynamic from "next/dynamic";
import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { getShowcaseBlockVariant } from "@/lib/motion/section-animations";
import { defaultTransition, layerRevealReduced } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

/** Cargadas en diferido — son las demos más pesadas de la página */
const SystemCanvas = dynamic(
  () => import("@/components/demos/SystemCanvas").then((m) => m.SystemCanvas),
  {
    ssr: false,
    loading: () => <div className="h-48 animate-pulse rounded-sm bg-white/[0.04]" />,
  }
);
const LiveSignatureFlow = dynamic(
  () => import("@/components/signature/LiveSignatureFlow").then((m) => m.LiveSignatureFlow),
  {
    ssr: false,
    loading: () => <div className="h-48 animate-pulse rounded-sm bg-white/[0.04]" />,
  }
);

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
          Tu negocio sigue funcionando... pero tú dejas de cargar con todo.
        </h2>
        <p className="text-text-secondary mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base">
          Cada canal conectado. Cada contacto procesado. Cada tarea enviada donde toca.
          IBS Engine conecta IA, gestión y automatización para que el trabajo fluya sin depender de ti.
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
      aria-label="Arquitectura del sistema IBS Engine"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" aria-hidden />
      <ShowcaseContent />
    </AmbientSection>
  );
}
