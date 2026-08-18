"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const PHASES = [
  { id: "sent",      label: "Presupuesto enviado",         time: "10:22",  status: "done",       icon: "✓" },
  { id: "waiting",   label: "Sin respuesta · 48h",         time: "10:22+", status: "warning",    icon: "⏱" },
  { id: "trigger",   label: "Sistema activa seguimiento",  time: "10:23",  status: "processing", icon: "⟳" },
  { id: "whatsapp",  label: "WhatsApp automático enviado", time: "10:23",  status: "done",       icon: "✓" },
  { id: "crm",       label: "CRM · Lead actualizado",      time: "10:23",  status: "done",       icon: "✓" },
] as const;

const STEP_MS = [900, 1100, 900, 1000, 1400];

const STATUS_STYLES: Record<string, string> = {
  done:       "text-emerald-400/90 border-emerald-400/20 bg-emerald-400/[0.06]",
  warning:    "text-amber-400/90   border-amber-400/20   bg-amber-400/[0.06]",
  processing: "text-gold-to/90     border-gold-to/20     bg-gold-to/[0.06]",
};

export function AutomatizacionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 7000);
  const visibleCount = Math.min(step, PHASES.length);

  return (
    <div ref={ref}>
      <DemoFrame label="Automatización · Flujo automático" sector={scenario}>
        {/* Header del log */}
        <div className="mb-3 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <span className="font-data text-[10px] tracking-widest text-off-white/30 uppercase">
            Sistema IBS · Log
          </span>
          <span className="flex items-center gap-1.5 font-data text-[10px] text-emerald-400/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            ACTIVO
          </span>
        </div>

        {/* Entradas del log */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {PHASES.slice(0, visibleCount).map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-3 rounded-sm border px-3 py-2.5 ${STATUS_STYLES[phase.status]}`}
              >
                {/* Icono / spinner */}
                {phase.status === "processing" ? (
                  <motion.span
                    className="font-data text-xs"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                ) : (
                  <span className="font-data text-xs">{phase.icon}</span>
                )}

                {/* Label */}
                <span className="flex-1 font-data text-xs tracking-wide">
                  {phase.label}
                </span>

                {/* Tiempo */}
                <span className="font-data text-[10px] opacity-50 tabular-nums">
                  {phase.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Filas pendientes (placeholder) */}
          {Array.from({ length: Math.max(0, PHASES.length - visibleCount) }).map((_, i) => (
            <div
              key={`pending-${i}`}
              className="flex items-center gap-3 rounded-sm border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
            >
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="h-2 flex-1 rounded-full bg-white/[0.06]" />
              <span className="h-2 w-8 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </DemoFrame>
    </div>
  );
}
