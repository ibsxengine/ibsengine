"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

/** Escenarios reales por sector */
const SCENARIOS = {
  "Taller mecánico": {
    ref: "Presupuesto #1042 · Cambio frenos · BMW",
    amount: "420 €",
    client: "Motor Ruiz",
  },
  "Clínica dental": {
    ref: "Presupuesto · Ortodoncia invisible",
    amount: "2.800 €",
    client: "García, Ana",
  },
  "Reformas": {
    ref: "Presupuesto · Reforma cocina",
    amount: "6.500 €",
    client: "López Hogar",
  },
} as const;

const STEPS = [
  "Presupuesto enviado · sin respuesta",
  "48h · Sistema activa seguimiento",
  "WhatsApp automático al cliente",
  "Cliente responde · Reunión cerrada",
] as const;

const STEP_MS = [1100, 1200, 1000, 1600];

export function AutomatizacionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 6500);
  const active = Math.min(step, STEPS.length - 1);
  const done   = Math.min(step + 1, STEPS.length);

  const sc = SCENARIOS[scenario.label as keyof typeof SCENARIOS] ?? {
    ref: "Presupuesto · Trabajo pendiente",
    amount: "—",
    client: "Cliente",
  };

  return (
    <div ref={ref}>
      <DemoFrame label="Automatización · Flujo automático" sector={scenario}>

        {/* Tarjeta del presupuesto — contexto real */}
        <div className="mb-4 rounded-sm border border-[color:var(--shell-border)] bg-[color:var(--shell-surface,var(--shell-panel-inner))] px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-data text-[10px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase">
                Referencia
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={sc.ref}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-data text-xs text-[color:var(--shell-ink)] mt-0.5"
                >
                  {sc.ref}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="text-right shrink-0">
              <p className="font-data text-[10px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase">
                Importe
              </p>
              <p className="font-data text-xs font-medium text-[color:var(--shell-ink)]">{sc.amount}</p>
            </div>
          </div>
        </div>

        {/* Pipeline de pasos */}
        <div className="space-y-0">
          {STEPS.map((label, i) => {
            const isDone    = i < done;
            const isActive  = i === active;
            const isPending = i >= done;

            return (
              <div key={label} className="flex gap-3">
                {/* Línea + nodo */}
                <div className="flex flex-col items-center">
                  <div className={`mt-[13px] h-2 w-2 rounded-full border transition-all duration-400 ${
                    isDone
                      ? "border-[color:var(--shell-ink-muted)] bg-[color:var(--shell-ink-muted)]"
                      : isActive
                      ? "animate-pulse border-gold-from/70 bg-gold-from/20"
                      : "border-[color:var(--shell-border)] bg-transparent"
                  }`} />
                  {i < STEPS.length - 1 && (
                    <div className="mt-1 mb-1 w-px bg-[color:var(--shell-border)]" style={{ minHeight: "16px" }} />
                  )}
                </div>

                {/* Label */}
                <motion.p
                  className={`mb-3 flex-1 font-data text-xs leading-snug pt-2.5 transition-opacity duration-400 ${
                    isPending
                      ? "opacity-30 text-[color:var(--shell-ink-muted)]"
                      : isDone
                      ? "opacity-70 text-[color:var(--shell-ink)]"
                      : "opacity-100 text-[color:var(--shell-ink)] font-medium"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isPending ? 0.3 : isDone ? 0.7 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {isDone && <span className="mr-1.5 opacity-50">✓</span>}
                  {label}
                </motion.p>
              </div>
            );
          })}
        </div>
      </DemoFrame>
    </div>
  );
}
