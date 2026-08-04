"use client";

import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { AUDITORIA_CTA } from "@/lib/content/commercial-blocks";
import { AuditoriaVisual } from "@/components/demos/AuditoriaVisual";
import { getAuditoriaAnimations } from "@/lib/motion/section-animations";
import {
  bounceIn,
  defaultTransition,
  fadeUpStrong,
  layerRevealReduced,
  scrollViewport,
} from "@/lib/motion/variants";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "./Button";
import { Container } from "./Container";
import { SectionLabel } from "./SectionLabel";

type CtaAuditoriaProps = {
  variant?: "inline" | "banner";
};

function CtaBannerContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;
  const { demoVariants } = getAuditoriaAnimations();

  return (
    <Container className="relative">
      <motion.div
        className="mx-auto max-w-4xl text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : fadeUpStrong}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <SectionLabel>{AUDITORIA_CTA.headline}</SectionLabel>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
          {AUDITORIA_CTA.tagline}
        </h2>
        <p className="text-text-secondary mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          {AUDITORIA_CTA.description}
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-10 max-w-4xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : demoVariants}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.1 }}
      >
        <AuditoriaVisual />
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : bounceIn}
        transition={{ ...defaultTransition, delay: reduced ? 0 : 0.16 }}
      >
        <Button href="#contacto" variant="gold">
          Solicitar auditoría
        </Button>
      </motion.div>
    </Container>
  );
}

function CtaInlineContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, scrollViewport);
  const reduced = useReducedMotion();
  const show = reduced || inView;
  const { demoVariants } = getAuditoriaAnimations();

  return (
    <div ref={ref} className="py-10 sm:py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
          <motion.div
            className="max-w-xl space-y-3"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={reduced ? layerRevealReduced : fadeUpStrong}
            transition={defaultTransition}
          >
            <SectionLabel>{AUDITORIA_CTA.headline}</SectionLabel>
            <h2 className="font-serif text-xl font-semibold text-off-white sm:text-2xl">
              {AUDITORIA_CTA.tagline}
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              {AUDITORIA_CTA.description}
            </p>
            <Button href="#contacto" variant="gold" className="mt-4">
              Solicitar auditoría
            </Button>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            variants={reduced ? layerRevealReduced : demoVariants}
            transition={{ ...defaultTransition, delay: reduced ? 0 : 0.1 }}
          >
            <AuditoriaVisual compact />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

export function CtaAuditoria({ variant = "inline" }: CtaAuditoriaProps) {
  if (variant === "banner") {
    return (
      <AmbientSection sectionId="cta" className="section-divider py-16 sm:py-24">
        <CtaBannerContent />
      </AmbientSection>
    );
  }

  return <CtaInlineContent />;
}
