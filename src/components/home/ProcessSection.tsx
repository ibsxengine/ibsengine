"use client";

import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { PROCESS_STEPS } from "@/lib/content/process-steps";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  defaultTransition,
  fadeUp,
  layerRevealReduced,
  staggerContainer,
} from "@/lib/motion/variants";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

const STEP_MS = 2000;

const STEP_BADGES = ["Diagnóstico", "Implementación", "Activación", "Acompañamiento"] as const;

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setActive(PROCESS_STEPS.length - 1);
      return;
    }
    setActive(0);
    const id = setInterval(() => {
      setActive((a) => (a + 1) % PROCESS_STEPS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="mt-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {PROCESS_STEPS.map((step, index) => (
          <ProcessCard key={step.number} step={step} index={index} active={active} />
        ))}
      </div>

      <div className="hidden lg:flex lg:items-stretch lg:justify-center">
        {PROCESS_STEPS.map((step, index) => (
          <Fragment key={step.number}>
            <div className="w-full max-w-[240px]">
              <ProcessCard step={step} index={index} active={active} />
            </div>
            {index < PROCESS_STEPS.length - 1 && (
              <div
                className="flex w-8 shrink-0 items-center justify-center self-center text-lg text-gold-to/35"
                aria-hidden
              >
                →
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ProcessCard({
  step,
  index,
  active,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  active: number;
}) {
  const isActive = index === active;
  const isDone = index < active;

  return (
    <div
      className={`relative h-full overflow-hidden rounded-md border p-5 transition-all duration-500 ease-out sm:p-6 ${
        isActive
          ? "-translate-y-0.5 border-gold-to/50 bg-gold-from/[0.06]"
          : isDone
            ? "border-gold-from/20"
            : "border-white/[0.08] bg-white/[0.03]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
            isActive || isDone
              ? "border-gold-from/40 bg-gold-from/15"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <span className="font-serif text-sm font-semibold text-gold-to">{step.number}</span>
        </div>
        {isDone && !isActive && (
          <span className="font-serif text-[9px] tracking-[0.08em] text-gold-to/70 uppercase">✓</span>
        )}
        {isActive && (
          <span className="font-serif text-[9px] tracking-[0.08em] text-gold-to uppercase">
            {STEP_BADGES[index]}
          </span>
        )}
      </div>

      <h3 className="font-serif text-lg font-semibold leading-snug text-off-white">{step.title}</h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          isActive ? "text-off-white/85" : "text-text-secondary"
        }`}
      >
        {step.description}
      </p>

      {isActive && (
        <div
          key={`progress-${step.number}`}
          className="absolute bottom-0 left-0 h-[2px] gold-gradient-bg animate-progress-fill"
          style={{ animationDuration: `${STEP_MS / 1000 - 0.15}s` }}
        />
      )}
    </div>
  );
}

function ProcessHeader() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <motion.div
      className="max-w-2xl"
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={staggerContainer}
      transition={defaultTransition}
    >
      <motion.div variants={reduced ? layerRevealReduced : fadeUp}>
        <SectionLabel>Cómo trabajamos</SectionLabel>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
          De la auditoría al sistema funcionando
        </h2>
        <p className="text-text-secondary mt-4 text-sm sm:text-base">
          Sin sorpresas. Sin tecnicismos. Solo pasos claros hasta que tu negocio opera solo.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ProcessSection() {
  return (
    <AmbientSection
      sectionId="proceso"
      className="overflow-hidden section-divider section-alt py-16 sm:py-20 lg:py-24"
      aria-label="Cómo trabajamos"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" aria-hidden />

      <Container className="relative">
        <ProcessHeader />
        <ProcessTimeline />
      </Container>
    </AmbientSection>
  );
}
