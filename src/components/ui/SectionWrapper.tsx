"use client";

import { useActiveSection } from "@/components/layout/ActiveSectionProvider";
import {
  SectionInViewProvider,
} from "@/components/layout/SectionInViewContext";
import { getSectionRevealVariant } from "@/lib/motion/section-animations";
import {
  layerRevealReduced,
  layerRevealTransition,
  scrollViewport,
  scrollViewportMobile,
} from "@/lib/motion/variants";
import { useCoarsePointer } from "@/lib/motion/useCoarsePointer";
import {
  resolveSectionId,
  SECTION_SOLIDS,
  type SectionId,
} from "@/lib/section-themes";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "./Container";

type SectionWrapperProps = {
  id?: string;
  ambientId?: SectionId;
  variant?: "navy" | "navy-alt";
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  solid?: boolean;
};

export function SectionWrapper({
  id,
  ambientId,
  children,
  className = "",
  ariaLabel,
  solid = true,
}: SectionWrapperProps) {
  const sectionKey = resolveSectionId(ambientId ?? id);
  const { registerSection } = useActiveSection();
  const sectionRef = useRef<HTMLElement>(null);
  const [accentVisible, setAccentVisible] = useState(false);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const inView = useInView(sectionRef, coarse ? scrollViewportMobile : scrollViewport);

  useEffect(() => {
    if (inView) setAccentVisible(true);
  }, [inView]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return registerSection(sectionKey, el);
  }, [registerSection, sectionKey]);

  const bg = solid ? SECTION_SOLIDS[sectionKey] : "transparent";
  const show = reduced || inView;

  return (
    <SectionInViewProvider inView={show}>
      <motion.section
        ref={sectionRef}
        id={id}
        aria-label={ariaLabel}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getSectionRevealVariant(sectionKey)}
        transition={layerRevealTransition}
        style={{ backgroundColor: bg !== "transparent" ? bg : undefined }}
        className={`section-layer section-solid content-auto relative py-16 sm:py-20 lg:py-24 ${className}`}
      >
        <div className="section-gold-rule" aria-hidden />
        <div className={`section-layer-accent ${accentVisible ? "is-visible" : ""}`} aria-hidden />
        <Container className="relative">{children}</Container>
      </motion.section>
    </SectionInViewProvider>
  );
}
