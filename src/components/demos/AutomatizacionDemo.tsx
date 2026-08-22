"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

type ScenarioKey = "Taller mecánico" | "Clínica dental" | "Reformas" | "Instalaciones" | string;

const SCENARIO_DATA: Record<string, {
  label: string; amount: string; client: string; msg: string;
}> = {
  "Taller mecánico": {
    label: "Presupuesto · Frenos BMW",
    amount: "420 €",
    client: "Juan",
    msg: "Hola, Juan. ¿Has podido revisar el presupuesto de los frenos? Si tienes alguna duda estamos aquí.",
  },
  "Clínica dental": {
    label: "Presupuesto · Ortodoncia",
    amount: "2.800 €",
    client: "Marta",
    msg: "Hola, Marta. ¿Has podido revisar el presupuesto? Si tienes cualquier pregunta, estamos aquí para ayudarte.",
  },
  "Reformas": {
    label: "Presupuesto · Reforma cocina",
    amount: "6.500 €",
    client: "Luis",
    msg: "Hola, Luis. ¿Has podido revisar el presupuesto de la reforma? Cuéntanos si tienes alguna duda.",
  },
  "Instalaciones": {
    label: "Presupuesto · Instalación splits",
    amount: "1.200 €",
    client: "Ana",
    msg: "Hola, Ana. ¿Has podido revisar el presupuesto de la instalación? Estamos disponibles para cualquier consulta.",
  },
};

const STEP_MS = [800, 1000, 900, 1100, 1600, 1200];

export function AutomatizacionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 8000);

  const data = SCENARIO_DATA[scenario.label] ?? SCENARIO_DATA["Taller mecánico"];

  const showWarning   = step >= 1;
  const showDetect    = step >= 2;
  const showActivate  = step >= 3;
  const showWhatsApp  = step >= 4;
  const showCRM       = step >= 5;

  return (
    <div ref={ref}>
      <DemoFrame label="El sistema toma el relevo" sector={scenario}>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">

          {/* ── IZQUIERDA: Presupuesto ─────────────────────────── */}
          <div className="space-y-2">
            <p className="font-data text-[9px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase">
              Origen
            </p>
            <div className="rounded-sm border border-[color:var(--shell-border)] bg-[color:var(--shell-surface,var(--shell-panel-inner))] p-3">
              <p className="font-data text-[10px] tracking-wide text-[color:var(--shell-ink-muted)] uppercase leading-relaxed">
                {data.label}
              </p>
              <p className="font-serif text-lg text-[color:var(--shell-ink)] mt-1">{data.amount}</p>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--shell-ink-muted)] opacity-50" />
                  <span className="font-data text-[10px] text-[color:var(--shell-ink-muted)]">Enviado</span>
                </div>
                <AnimatePresence>
                  {showWarning && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70" />
                      <span className="font-data text-[10px] text-amber-600/80">Sin respuesta · 48h</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── CENTRO: IBS Engine toma el relevo ─────────────── */}
          <div className="flex flex-col items-center gap-1 pt-5 w-28">
            <AnimatePresence>
              {showDetect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center"
                >
                  <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] uppercase tracking-widest">
                    48h sin respuesta
                  </p>
                  <div className="my-1.5 h-4 w-px bg-[color:var(--shell-border)] mx-auto" />
                  <div className="rounded-sm border border-gold-to/40 bg-gold-to/[0.08] px-2 py-1.5">
                    <p className="font-data text-[9px] tracking-widest text-gold-to/80 uppercase">IBS Engine</p>
                    <p className="font-data text-[8px] text-[color:var(--shell-ink-muted)] mt-0.5">detecta</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showActivate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-1 w-full"
                >
                  <div className="h-4 w-px bg-gold-to/40" />
                  <div className="rounded-sm border border-gold-to/30 bg-gold-to/[0.05] px-2 py-1.5 w-full text-center">
                    <p className="font-data text-[8px] tracking-widest text-gold-to/70 uppercase leading-tight">
                      Activa<br/>seguimiento
                    </p>
                  </div>
                  <div className="h-4 w-px bg-gold-to/30" />
                  <div className="flex gap-1">
                    <div className="h-px w-8 bg-gold-to/30 mt-1.5" />
                    <div className="h-px w-8 bg-gold-to/30 mt-1.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── DERECHA: WhatsApp real ─────────────────────────── */}
          <div className="space-y-2">
            <p className="font-data text-[9px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase">
              WhatsApp automático
            </p>
            <AnimatePresence>
              {showWhatsApp && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-sm border border-[color:var(--shell-border)] bg-[color:var(--shell-surface,var(--shell-panel-inner))] p-3"
                >
                  <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] uppercase tracking-widest mb-2">
                    IBS Engine
                  </p>
                  <p className="text-[11px] text-[color:var(--shell-ink)] leading-relaxed">
                    {data.msg}
                  </p>
                  <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] mt-2">
                    10:23 · enviado automáticamente
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── ABAJO: CRM + "Tú no hiciste nada." ─────────────── */}
        <AnimatePresence>
          {showCRM && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 border-t border-[color:var(--shell-border)] pt-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-data text-[10px] text-[color:var(--shell-ink-muted)]">
                  <span className="text-emerald-600">✓</span> CRM actualizado
                </span>
                <span className="flex items-center gap-1 font-data text-[10px] text-[color:var(--shell-ink-muted)]">
                  <span className="text-emerald-600">✓</span> Seguimiento completado
                </span>
              </div>
              <p className="font-data text-[10px] text-[color:var(--shell-ink)] font-medium italic">
                Tú no hiciste nada.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
