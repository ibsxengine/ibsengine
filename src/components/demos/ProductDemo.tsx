"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { DemoFrame } from "./DemoFrame";
import { useSectorCycle } from "./useDemoCycle";
import { useCoarsePointer } from "@/lib/motion/useCoarsePointer";

const PIPELINE = [
  { id: "in", label: "Entrada", sub: "WhatsApp / Web" },
  { id: "proc", label: "Proceso", sub: "IA + Reglas" },
  { id: "out", label: "Salida", sub: "Cita + CRM" },
];

/** ms por paso — paso 4 (cita verde) se queda más tiempo */
const STEP_DURATIONS = [800, 1000, 1000, 1000, 2200, 1400];

const msgSpring = { type: "spring" as const, stiffness: 320, damping: 28 };
const fadeEase = [0.25, 0.1, 0.25, 1] as const;

export function ProductDemo() {
  const { ref, scenario, sectorIndex, inView, reduced } = useSectorCycle(6000);
  const coarse = useCoarsePointer();
  const liteMotion = coarse || reduced;
  const msgTransition = liteMotion ? { duration: 0.22, ease: fadeEase } : msgSpring;
  const pipeTransition = liteMotion ? { duration: 0.25, ease: fadeEase } : { type: "spring" as const, stiffness: 300, damping: 26 };
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;

    let current = 0;
    setStep(0);

    const advance = () => {
      timerRef.current = setTimeout(() => {
        current = (current + 1) % STEP_DURATIONS.length;
        setStep(current);
        advance();
      }, STEP_DURATIONS[current]);
    };

    advance();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [sectorIndex, inView, reduced]);

  const pipelinePhase = Math.min(step, 2);

  return (
    <div ref={ref} className="relative w-full" data-orb-minimal>
      <div
        className="pointer-events-none absolute -inset-px rounded-md bg-gradient-to-b from-gold-from/15 via-transparent to-transparent opacity-50"
        aria-hidden
      />

      <DemoFrame label={`Demo · ${scenario.label}`} sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: fadeEase }}
            className="grid lg:grid-cols-[1fr_1.1fr]"
          >
            <div className="border-b border-[color:var(--shell-border)] p-4 sm:p-6 lg:border-r lg:border-b-0">
              <p className="text-[10px] tracking-[0.1em] text-text-secondary uppercase">Canal · WhatsApp</p>
              <div className="mt-4 flex min-h-[220px] flex-col gap-2.5 sm:min-h-[260px]">
                <AnimatePresence mode="popLayout">
                  {step >= 1 && (
                    <motion.div
                      key={`c0-${scenario.id}`}
                      initial={{ opacity: 0, x: -16, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={msgTransition}
                      className="max-w-[88%] self-start rounded-sm bg-white/10 px-3 py-2 text-xs text-off-white sm:text-sm"
                    >
                      {scenario.chat[0].text}
                    </motion.div>
                  )}
                  {step >= 2 && (
                    <motion.div
                      key={`c1-${scenario.id}`}
                      initial={{ opacity: 0, x: 16, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={msgTransition}
                      className="max-w-[88%] self-end rounded-sm border border-gold-from/25 bg-gold-from/10 px-3 py-2 text-xs text-off-white sm:text-sm"
                    >
                      {scenario.chat[1].text}
                    </motion.div>
                  )}
                  {step >= 3 && (
                    <motion.div
                      key={`c2-${scenario.id}`}
                      initial={{ opacity: 0, x: -16, y: 6 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={msgTransition}
                      className="max-w-[88%] self-start rounded-sm bg-white/10 px-3 py-2 text-xs text-off-white sm:text-sm"
                    >
                      {scenario.chat[2].text}
                    </motion.div>
                  )}
                  {step >= 4 && (
                    <motion.div
                      key={`c3-${scenario.id}`}
                      initial={{ opacity: 0, scale: 0.92, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={liteMotion ? msgTransition : { ...msgSpring, stiffness: 260 }}
                      className="mt-auto rounded-sm border border-emerald-500/30 bg-emerald-500/10 p-3"
                    >
                      <p className="font-mono text-[10px] text-emerald-300">✓ Cita confirmada</p>
                      <p className="mt-1 text-sm text-off-white">
                        {scenario.appointment} · {scenario.appointmentDetail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-[10px] tracking-[0.1em] text-text-secondary uppercase">IBS Motor · Automatización</p>
              <div className="mt-4 flex items-center justify-between gap-1">
                {PIPELINE.map((node, i) => (
                  <div key={node.id} className="flex flex-1 items-center">
                    <motion.div
                      animate={{
                        borderColor:
                          pipelinePhase === i
                            ? "rgba(158, 125, 82, 0.75)"
                            : pipelinePhase > i
                              ? "rgba(158, 125, 82, 0.4)"
                              : "rgba(21, 50, 91, 0.12)",
                        boxShadow:
                          pipelinePhase === i
                            ? "0 0 24px rgba(158, 125, 82, 0.2)"
                            : "0 0 0 rgba(0,0,0,0)",
                        scale: pipelinePhase === i ? 1.03 : 1,
                      }}
                      transition={pipeTransition}
                      className="flex-1 rounded-sm border bg-navy/60 px-2 py-2.5 text-center sm:px-3"
                    >
                      <p
                        className={`font-data text-[9px] sm:text-[10px] ${
                          pipelinePhase >= i ? "text-gold-to" : "text-off-white/40"
                        }`}
                      >
                        {node.label}
                      </p>
                      {pipelinePhase === i &&
                        (liteMotion ? (
                          <div className="mx-auto mt-1.5 h-0.5 w-6 gold-gradient-bg" />
                        ) : (
                          <motion.div
                            layoutId="pipeline-indicator"
                            className="mx-auto mt-1.5 h-0.5 w-6 gold-gradient-bg"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        ))}
                    </motion.div>
                    {i < PIPELINE.length - 1 && (
                      <motion.div
                        className="mx-0.5 h-0.5 flex-1 max-w-6 sm:max-w-10"
                        animate={{
                          backgroundColor:
                            pipelinePhase > i ? "rgb(158, 125, 82)" : "rgba(21, 50, 91, 0.12)",
                          scaleX: pipelinePhase > i ? 1 : 0.3,
                        }}
                        transition={pipeTransition}
                        style={{ originX: 0 }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-[2px] gold-gradient-bg transition-opacity duration-300 sm:h-3.5 sm:w-3.5 ${
                      pipelinePhase === 1 ? "opacity-100" : "opacity-20"
                    }`}
                    style={{ transform: "rotate(45deg)" }}
                  />
                ))}
              </div>

              <AnimatePresence>
                {step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={liteMotion ? { duration: 0.25, ease: fadeEase } : { type: "spring", stiffness: 280, damping: 26 }}
                    className="mt-6 grid gap-2 sm:grid-cols-2"
                  >
                    <div className="rounded-sm border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[9px] tracking-wide text-text-secondary uppercase">CRM</p>
                      <p className="mt-1 text-xs text-off-white">{scenario.crmLead}</p>
                      <p className="font-data mt-1 text-[10px] text-gold-to">{scenario.crmStatus}</p>
                    </div>
                    <div className="rounded-sm border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[9px] tracking-wide text-text-secondary uppercase">{scenario.appName}</p>
                      <p className="mt-1 text-xs text-off-white">{scenario.appOutput}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
