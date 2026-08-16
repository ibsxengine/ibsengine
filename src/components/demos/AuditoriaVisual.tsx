"use client";

import { AUDITORIA_CTA } from "@/lib/content/commercial-blocks";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AuditoriaVisualProps = {
  compact?: boolean;
};

export function AuditoriaVisual({ compact = false }: AuditoriaVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [step, setStep] = useState(0);
  const [leaks, setLeaks] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setStep(0);
    setLeaks(0);
    const stepId = setInterval(() => setStep((s) => (s + 1) % 6), compact ? 1300 : 1500);
    return () => clearInterval(stepId);
  }, [inView, compact]);

  useEffect(() => {
    if (!inView || step < 1) return;
    const target = [0, 3, 7, 12, 12][step] ?? 12;
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(current + 1, target);
      setLeaks(current);
      if (current >= target) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [step, inView]);

  const bars = [
    { label: "Leads sin respuesta", pct: step >= 1 ? 68 : 0 },
    { label: "Presupuestos olvidados", pct: step >= 2 ? 45 : 0 },
    { label: "Seguimiento manual", pct: step >= 3 ? 82 : 0 },
  ];

  return (
    <div ref={ref}>
      <DemoFrame label="Auditoría · Mapa de fugas">
        <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 sm:gap-6" : "sm:grid-cols-2 sm:gap-8"}`}>
          <div>
            <p className="eyebrow text-[0.65rem]">Mapa de fugas</p>
            <div className="mt-3 space-y-2.5">
              {bars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-off-white/70">{bar.label}</span>
                    <span className="font-data text-gold-to">{bar.pct > 0 ? `${bar.pct}%` : "—"}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full gold-gradient-bg transition-[width] duration-500 ease-out"
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-4 rounded-sm border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 transition-opacity duration-300 ${
                step >= 1 ? "opacity-100" : "opacity-40"
              }`}
            >
              <p className="font-data text-[9px] text-amber-300">Oportunidades detectadas</p>
              <p className="font-serif mt-1 text-2xl font-semibold text-off-white">
                {leaks}
                <span className="text-text-secondary ml-1 text-sm font-normal">/ mes</span>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow text-[0.65rem]">Tu informe incluye</p>
            <ul className="mt-3 space-y-2">
              {AUDITORIA_CTA.bullets.map((bullet, i) => (
                <li
                  key={bullet}
                  className={`flex items-center gap-2.5 rounded-sm border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-off-white/90 transition-all duration-300 ${
                    step >= i + 1 ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-35"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] text-navy transition-colors duration-300 ${
                      step >= i + 1 ? "bg-[rgba(212,175,106,0.9)]" : "bg-white/15"
                    }`}
                  >
                    {step >= i + 1 ? "✓" : i + 1}
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <p
              className={`text-text-secondary mt-4 text-center text-[10px] transition-all duration-400 ${
                step >= 4 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              Sin compromiso · Sin tecnicismos · Resultados en 48h
            </p>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
