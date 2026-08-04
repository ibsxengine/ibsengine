"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const PHASES = ["idle", "detect", "reminder", "won"] as const;
const STEP_MS = [1100, 1200, 1300, 1800];

export function SeguimientoDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 5500);
  const phase = PHASES[Math.min(step, 3)];

  return (
    <div ref={ref}>
      <DemoFrame label="Seguimiento · Recuperación" sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div
              className={`rounded-sm border p-3 transition-colors duration-500 ${
                phase === "won"
                  ? "border-emerald-500/25 bg-emerald-500/5"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-off-white">{scenario.seguimientoTitle}</p>
                <span
                  className={`font-data text-[10px] ${
                    phase === "won" ? "text-emerald-300" : "text-amber-400"
                  }`}
                >
                  {phase === "won" ? "Recuperado" : "Sin respuesta"}
                </span>
              </div>
              <p className="text-text-secondary mt-1 text-xs">
                Enviado hace 5 días · {scenario.seguimientoAmount}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {phase === "detect" && (
                <motion.div
                  key="detect"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-sm border border-amber-500/20 bg-amber-500/5 px-3 py-2.5"
                >
                  <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-amber-400/30 border-t-amber-400" />
                  <p className="text-xs text-off-white/90">Detectando oportunidad perdida…</p>
                </motion.div>
              )}

              {phase === "reminder" && (
                <motion.div
                  key="reminder"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  className="rounded-sm border border-gold-from/25 bg-gold-from/5 p-3"
                >
                  <p className="font-serif text-[10px] tracking-wide text-gold-to">WhatsApp automático enviado</p>
                  <p className="mt-2 text-xs text-off-white/90">
                    &quot;Hola, ¿pudiste revisar el presupuesto? Quedo a tu disposición.&quot;
                  </p>
                </motion.div>
              )}

              {phase === "won" && (
                <motion.div
                  key="won"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-sm border border-emerald-500/25 bg-emerald-500/10 p-3"
                >
                  <p className="text-sm font-medium text-emerald-300">Cliente responde</p>
                  <p className="text-text-secondary mt-1 text-xs">
                    &quot;Sí, quiero cerrar. ¿Cuándo empezamos?&quot;
                  </p>
                  <p className="font-data mt-2 text-[10px] text-gold-to">
                    Lead recuperado · {scenario.seguimientoAmount}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
