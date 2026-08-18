"use client";

import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { AUDITORIA_CTA } from "@/lib/content/commercial-blocks";
import { AuditoriaVisual } from "@/components/demos/AuditoriaVisual";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAuditoriaAnimations } from "@/lib/motion/section-animations";
import { defaultTransition, layerRevealReduced } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

function AuditoriaContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;
  const { textVariants, demoVariants } = getAuditoriaAnimations();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : textVariants}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <div className="flex items-center gap-3">
          <SectionLabel>{AUDITORIA_CTA.headline}</SectionLabel>
        </div>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-3xl lg:text-4xl">
          {AUDITORIA_CTA.tagline}
        </h2>
        <p className="text-text-secondary mt-4 text-sm leading-relaxed sm:text-base">
          {AUDITORIA_CTA.description}
        </p>
        <div className="mt-8">
          <Button href="/contacto" variant="gold">
            Quiero mi auditoría
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : demoVariants}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.1 }}
      >
        <AuditoriaVisual compact />
      </motion.div>
    </div>
  );
}

export function AuditoriaSection() {
  return (
    <SectionWrapper
      id="auditoria"
      ambientId="auditoria"
      ariaLabel={AUDITORIA_CTA.headline}
    >
      <AuditoriaContent />
    </SectionWrapper>
  );
}
