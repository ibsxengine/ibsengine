"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const STEP_MS = [1100, 1100, 1200, 1300, 1500] as const;

export function ControlDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 0, {
    advanceSectorOnComplete: true,
  });
  const projects = scenario.dashboardProjects;

  const metrics = [
    { label: scenario.dashboardMetrics.label, value: scenario.dashboardMetrics.value, pct: 72 },
    { label: "Leads pendientes", value: "3", pct: 35 },
    { label: "Citas esta semana", value: "12", pct: 58 },
  ];

  return (
    <div ref={ref}>
      <DemoFrame label="Control · Dashboard" sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((m, i) => {
                const active = step >= i;
                return (
                  <div
                    key={m.label}
                    className={`rounded-sm border p-3 transition-all duration-500 ${
                      active
                        ? "border-gold-from/30 bg-[#0d1a30]/90"
                        : "border-[#15325b]/25 bg-[#0d1a30]/55"
                    }`}
                  >
                    <p className="text-[10px] text-[#9aa3b2]">{m.label}</p>
                    <p className="font-data mt-1 text-xl font-light text-[#f5f5f3]">{m.value}</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#15325b]/60">
                      <div
                        className="h-full gold-gradient-bg transition-[width] duration-700 ease-out"
                        style={{ width: active ? `${m.pct}%` : "0%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-serif text-[10px] tracking-[0.1em] text-[#9aa3b2] uppercase">
                Proyectos activos
              </p>
              {projects.map((p, i) => {
                const active = step >= 1;
                return (
                  <div
                    key={`${scenario.id}-${p.name}`}
                    className={`flex items-center justify-between rounded-sm border px-3 py-2 transition-all duration-400 ${
                      active
                        ? "demo-step-in border-[#15325b]/50 bg-[#0d1a30]"
                        : "border-[#15325b]/20 bg-[#0d1a30]/45 opacity-50"
                    }`}
                    style={active ? { animationDelay: `${i * 0.06}s` } : undefined}
                  >
                    <span className="text-xs text-[#f5f5f3]">{p.name}</span>
                    <span className={`font-data text-[10px] ${p.color}`}>{p.status}</span>
                  </div>
                );
              })}
            </div>

            {step >= 2 && (
              <div className="demo-step-in mt-4 rounded-sm border border-gold-from/20 bg-[#0d1a30]/80 px-3 py-2.5">
                <p className="text-center text-[10px] text-[#f5f5f3]/85">
                  Cualquier negocio — clientes, trabajos y documentos en un solo sitio
                </p>
              </div>
            )}

            {step >= 3 && (
              <div className="demo-step-in mt-3 grid grid-cols-3 gap-2">
                {[
                  { label: "Clientes", pct: 88 },
                  { label: "Documentos", pct: 76 },
                  { label: "Alertas", pct: 64 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-sm border border-gold-from/30 bg-[#0d1a30]/90 p-2.5"
                  >
                    <p className="text-[10px] text-[#9aa3b2]">{item.label}</p>
                    <p className="font-data mt-1 text-base font-light text-[#f5f5f3]">✓</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#15325b]/60">
                      <div
                        className="h-full gold-gradient-bg transition-[width] duration-700 ease-out"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step >= 4 && (
              <p className="demo-step-in mt-3 text-center text-[10px] text-[#9aa3b2]">
                Actualizado en tiempo real · {scenario.label}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
