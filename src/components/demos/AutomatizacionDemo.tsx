"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const PHASES = ["sent", "waiting", "triggered", "replied", "updated"] as const;
const STEP_MS = [900, 1200, 1100, 1300, 1500];

export function AutomatizacionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 6500);
  const phase = PHASES[Math.min(step, 4)];

  const steps = [
    { label: "Presupuesto enviado", status: "done", when: "Hoy, 10:22" },
    { label: "3 días sin respuesta", status: phase === "sent" || phase === "waiting" ? "waiting" : "done", when: "Hace 3 días" },
    { label: "Seguimiento automático", status: phase === "triggered" || phase === "replied" || phase === "updated" ? "done" : phase === "waiting" ? "pending" : "pending", when: phase === "triggered" || phase === "replied" || phase === "updated" ? "Automático" : "—" },
    { label: "WhatsApp enviado al cliente", status: phase === "replied" || phase === "updated" ? "done" : "pending", when: phase === "replied" || phase === "updated" ? "Hace 2 min" : "—" },
    { label: "CRM actualizado", status: phase === "updated" ? "done" : "pending", when: phase === "updated" ? "Ahora" : "—" },
  ];

  return (
    <div ref={ref}>
      <DemoFrame label="Automatización · Flujo automático" sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: s.status === "pending" ? 0.4 : 1 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center justify-between rounded-sm border px-3 py-2.5 transition-colors duration-500 ${
                  s.status === "done"
                    ? "border-emerald-500/25 bg-emerald-500/5"
                    : s.status === "waiting"
                    ? "border-amber-400/25 bg-amber-400/5"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      s.status === "done"
                        ? "bg-emerald-400"
                        : s.status === "waiting"
                        ? "bg-amber-400"
                        : "bg-white/20"
                    }`}
                    aria-hidden
                  />
                  <span className="font-data text-xs text-off-white/80">{s.label}</span>
                </div>
                <span className="font-data text-[10px] text-white/40">{s.when}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
