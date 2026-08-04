"use client";

import { useScrollReveal } from "@/lib/motion/useScrollReveal";
import type { SectorScenario } from "@/lib/content/sector-scenarios";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FlowConnector } from "./FlowConnector";
import { CalendarNode } from "./nodes/CalendarNode";
import { ProcessingNode } from "./nodes/ProcessingNode";
import { WhatsAppNode } from "./nodes/WhatsAppNode";

type SignatureFlowProps = {
  compact?: boolean;
  fast?: boolean;
  scenario?: SectorScenario;
};

const TIMING = {
  normal: { p1: 120, p2: 550, p3: 1200 },
  fast: { p1: 80, p2: 420, p3: 950 },
};

export function SignatureFlow({ compact = false, fast = false, scenario }: SignatureFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.35 });
  const { prefersReducedMotion } = useScrollReveal();
  const [phase, setPhase] = useState(0);

  const timing = fast ? TIMING.fast : TIMING.normal;

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setPhase(3);
      return;
    }

    setPhase(0);
    const timers = [
      setTimeout(() => setPhase(1), timing.p1),
      setTimeout(() => setPhase(2), timing.p2),
      setTimeout(() => setPhase(3), timing.p3),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView, prefersReducedMotion, scenario?.id, timing.p1, timing.p2, timing.p3]);

  const active = phase >= 1;
  const connector1 = phase >= 2;
  const connector2 = phase >= 3;

  const waMessage = scenario?.whatsappIn ?? "Hola, ¿tenéis disponibilidad esta semana?";
  const appointment = scenario?.appointment ?? "Martes, 10:00";
  const appointmentDetail = scenario?.appointmentDetail ?? "Cita confirmada automáticamente";

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-col items-center gap-0 md:hidden">
        <WhatsAppNode active={active} reducedMotion={prefersReducedMotion} compact={compact} message={waMessage} fast={fast} />
        <FlowConnector active={connector1} direction="vertical" reducedMotion={prefersReducedMotion} fast={fast} />
        <ProcessingNode active={connector1} reducedMotion={prefersReducedMotion} compact={compact} fast={fast} />
        <FlowConnector active={connector2} direction="vertical" reducedMotion={prefersReducedMotion} fast={fast} />
        <CalendarNode active={connector2} reducedMotion={prefersReducedMotion} compact={compact} time={appointment} detail={appointmentDetail} fast={fast} />
      </div>

      <div className="hidden md:flex md:items-center md:justify-center md:gap-2 lg:gap-4">
        <WhatsAppNode active={active} reducedMotion={prefersReducedMotion} compact={compact} message={waMessage} fast={fast} />
        <FlowConnector active={connector1} direction="horizontal" reducedMotion={prefersReducedMotion} fast={fast} />
        <ProcessingNode active={connector1} reducedMotion={prefersReducedMotion} compact={compact} fast={fast} />
        <FlowConnector active={connector2} direction="horizontal" reducedMotion={prefersReducedMotion} fast={fast} />
        <CalendarNode active={connector2} reducedMotion={prefersReducedMotion} compact={compact} time={appointment} detail={appointmentDetail} fast={fast} />
      </div>

      {!scenario && (
        <motion.p
          className="text-text-secondary mt-6 text-center text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 2, duration: 0.4 }}
        >
          Un mensaje entra → se procesa → sale convertido en cita agendada
        </motion.p>
      )}
    </div>
  );
}
