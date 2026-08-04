"use client";

import { AnimatePresence, motion } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

const MODULES = [
  { key: "jobs", label: "Trabajos", icon: "◆" },
  { key: "presupuesto", label: "Presupuestos", icon: "€" },
  { key: "calendar", label: "Calendario", icon: "▦" },
  { key: "tareas", label: "Tareas", icon: "→" },
  { key: "equipo", label: "Equipo", icon: "◎" },
  { key: "facturacion", label: "Facturación", icon: "↗" },
] as const;

/** Duraciones por paso — el ciclo completo ~10s antes de repetir */
const SISTEMA_STEP_MS = [1000, 1000, 1000, 1000, 1100, 1300, 1600] as const;

export function SistemaSectorialDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(SISTEMA_STEP_MS, 11000);

  return (
    <div ref={ref}>
      <DemoFrame label="App sectorial · Demo" sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex items-center justify-between border-b border-[color:var(--shell-border)] pb-3">
              <div>
                <p className="font-serif text-[11px] tracking-wide text-gold-from">Sistema a medida</p>
                <p className="font-serif text-base font-semibold text-off-white">{scenario.appName}</p>
              </div>
              <span className="animate-live-dot rounded-full border border-emerald-600/30 bg-emerald-600/10 px-2 py-0.5 font-data text-[9px] text-emerald-700">
                operativo
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {MODULES.map((mod, i) => {
                const active = step >= i;
                return (
                  <span
                    key={mod.key}
                    className={`rounded-full border px-2 py-0.5 text-[8px] tracking-wide uppercase transition-transform duration-300 ${
                      active ? "demo-chip-active scale-100" : "demo-chip-idle scale-[0.98]"
                    }`}
                  >
                    {mod.icon} {mod.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="font-serif text-[10px] tracking-[0.1em] text-text-secondary uppercase">
                  Trabajos activos
                </p>
                {scenario.jobs.map((job, i) => {
                  const active = step >= i;
                  return (
                    <div
                      key={`${scenario.id}-${job.name}`}
                      className={`rounded-sm border px-2.5 py-2 transition-all duration-300 ${
                        active ? "demo-card-active" : "demo-card-idle"
                      }`}
                    >
                      <p className="text-xs text-off-white">{job.name}</p>
                      <p className="font-data text-[10px] text-gold-from">{job.status}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                {step >= 1 && (
                  <div className="demo-step-in rounded-sm border border-gold-from/25 bg-gold-from/8 p-2.5">
                    <p className="font-serif text-[10px] tracking-wide text-gold-from uppercase">Presupuestos</p>
                    <p className="mt-1 text-[10px] text-off-white">{scenario.appPresupuesto}</p>
                  </div>
                )}

                {step >= 2 && (
                  <div className="demo-step-in demo-card-idle rounded-sm border p-2.5">
                    <p className="font-serif text-[10px] tracking-wide text-text-secondary uppercase">Calendario</p>
                    <div className="mt-1 space-y-0.5">
                      {scenario.calendarEvents.map((ev) => (
                        <p key={ev} className="text-[10px] text-off-white">
                          {ev}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {step >= 3 && (
                  <div className="demo-step-in demo-card-idle rounded-sm border p-2.5">
                    <p className="font-serif text-[10px] tracking-wide text-text-secondary uppercase">Tareas</p>
                    <p className="mt-1 text-[10px] text-off-white">{scenario.appTareas}</p>
                  </div>
                )}

                {step >= 4 && (
                  <div className="demo-step-in demo-card-idle rounded-sm border p-2.5">
                    <p className="font-serif text-[10px] tracking-wide text-text-secondary uppercase">Equipo</p>
                    <p className="mt-1 text-[10px] text-off-white">{scenario.appEquipo}</p>
                  </div>
                )}

                {step >= 5 && (
                  <div className="demo-step-in flex items-center gap-2 rounded-sm border border-emerald-600/25 bg-emerald-600/8 p-2.5">
                    <span className="font-data text-[10px] text-emerald-700">↗</span>
                    <div>
                      <p className="font-serif text-[10px] tracking-wide text-emerald-700 uppercase">Facturación</p>
                      <p className="text-[10px] text-off-white">{scenario.appFacturacion}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {step >= 6 && (
              <div className="demo-step-in mt-3 rounded-sm border border-gold-from/22 bg-gold-from/8 px-3 py-2.5 text-center">
                <p className="text-[10px] text-off-white">
                  Trabajos · presupuestos · calendario · tareas · equipo · facturación — todo conectado
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
