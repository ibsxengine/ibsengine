"use client";

import { motion } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const STAGES = [
  { label: "Sin respuesta · 48h",        note: "TRIGGER" },
  { label: "Sistema detecta inactividad", note: "IA · Procesando" },
  { label: "WhatsApp personalizado",      note: "Enviado · 10:23" },
  { label: "CRM · Lead actualizado",      note: "Cerrado" },
] as const;

const STEP_MS = [1000, 1100, 1000, 1400];

export function AutomatizacionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 6500);
  const active = Math.min(step, STAGES.length - 1);
  const done   = Math.min(step, STAGES.length);

  return (
    <div ref={ref}>
      <DemoFrame label="Automatización · Flujo automático" sector={scenario}>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between border-b border-[color:var(--shell-border)] pb-3">
          <span className="font-data text-[10px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase">
            Sistema IBS · Pipeline
          </span>
          <span className="flex items-center gap-1.5 font-data text-[10px] text-[color:var(--shell-ink-muted)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-from/80" />
            ACTIVO
          </span>
        </div>

        {/* Pipeline */}
        <div className="space-y-0">
          {STAGES.map((stage, i) => {
            const isDone    = i < done;
            const isActive  = i === active && step < STAGES.length;
            const isPending = i > active;

            return (
              <div key={stage.label} className="flex gap-3">
                {/* Línea vertical + indicador */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.12 }}
                    className={`mt-3 h-2.5 w-2.5 rounded-full border transition-all duration-500 ${
                      isDone
                        ? "border-[color:var(--shell-ink-muted)] bg-[color:var(--shell-ink-muted)]"
                        : isActive
                        ? "animate-pulse border-gold-from bg-gold-from/30"
                        : "border-[color:var(--shell-border)] bg-transparent"
                    }`}
                  />
                  {i < STAGES.length - 1 && (
                    <div className="mt-1 mb-1 w-px flex-1 bg-[color:var(--shell-border)]" style={{ minHeight: "18px" }} />
                  )}
                </div>

                {/* Contenido */}
                <motion.div
                  className={`mb-3 flex flex-1 items-start justify-between gap-2 transition-opacity duration-500 ${
                    isPending ? "opacity-35" : "opacity-100"
                  }`}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <span className={`font-data text-xs leading-snug ${
                    isDone
                      ? "text-[color:var(--shell-ink)]"
                      : isActive
                      ? "text-[color:var(--shell-ink)] font-medium"
                      : "text-[color:var(--shell-ink-muted)]"
                  }`}>
                    {isDone && <span className="mr-1.5 opacity-60">✓</span>}
                    {stage.label}
                  </span>
                  <span className="shrink-0 font-data text-[10px] text-[color:var(--shell-ink-muted)] tabular-nums">
                    {isDone || isActive ? stage.note : "—"}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </DemoFrame>
    </div>
  );
}
