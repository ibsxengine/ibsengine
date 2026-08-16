"use client";

import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { Container } from "@/components/ui/Container";
import { defaultTransition, fadeUpStrong, layerRevealReduced } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { useState, useEffect, useRef } from "react";
import { useDocumentVisible } from "@/lib/motion/useDocumentVisible";

const ROWS = [
  { antes: "Responder WhatsApps del trabajo",       despues: "Respuesta automática en segundos" },
  { antes: "Hacer presupuestos en Excel",            despues: "Presupuesto en 4 clics, enviado solo" },
  { antes: "Perseguir al cliente que no contesta",   despues: "Seguimiento automático en el momento justo" },
  { antes: "Organizar citas desde el móvil",         despues: "Agenda conectada, confirmaciones solas" },
  { antes: "Buscar una factura de hace dos meses",   despues: "Todo en un panel, desde cualquier sitio" },
] as const;

function ComparisonFrame({ show }: { show: boolean }) {
  const [activeRow, setActiveRow] = useState(-1);
  const docVisible = useDocumentVisible();

  useEffect(() => {
    if (!show || !docVisible) { return; }
    let i = -1;
    const id = setInterval(() => {
      i = i < ROWS.length - 1 ? i + 1 : 0;
      setActiveRow(i);
    }, 1900);
    return () => clearInterval(id);
  }, [show, docVisible]);

  return (
    <div className="demo-frame-light relative overflow-hidden rounded-md border" data-orb-minimal>
      {/* Topbar */}
      <div className="flex items-center justify-between border-b border-[color:var(--shell-border)] bg-[var(--shell-panel-header)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-500/90" aria-hidden />
        </div>
        <span className="font-serif text-[11px] tracking-[0.12em] text-[color:var(--shell-ink-muted)] uppercase">
          Antes vs. con IBS Engine
        </span>
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" aria-hidden />
      </div>

      {/* Cabecera columnas */}
      <div className="grid grid-cols-2 border-b border-[color:var(--shell-border)] bg-[var(--shell-panel-header)]">
        <div className="border-r border-[color:var(--shell-border)] px-4 py-2 text-center">
          <span className="font-data text-[10px] tracking-widest text-red-500/70 uppercase">Tú, ahora</span>
        </div>
        <div className="px-4 py-2 text-center">
          <span className="font-data text-[10px] tracking-widest text-emerald-600/80 uppercase">Con IBS Engine</span>
        </div>
      </div>

      {/* Filas */}
      <div className="demo-panel-light bg-[var(--shell-panel-inner)]">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.antes}
            className={`grid grid-cols-2 transition-colors duration-400 ${
              i < ROWS.length - 1 ? "border-b border-[color:var(--shell-border)]" : ""
            } ${activeRow === i ? "bg-[var(--shell-surface)]" : ""}`}
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
          >
            <div className={`flex items-center gap-2.5 border-r border-[color:var(--shell-border)] px-4 py-3 transition-opacity duration-400 ${
              activeRow === i ? "opacity-50" : "opacity-100"
            }`}>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                activeRow === i ? "bg-red-400" : "bg-red-400/40"
              }`} aria-hidden />
              <span className={`text-[11px] leading-snug sm:text-xs text-[color:var(--shell-ink)] ${
                activeRow === i ? "line-through decoration-red-400/50" : ""
              }`}>
                {row.antes}
              </span>
            </div>
            <div className={`flex items-center gap-2.5 px-4 py-3 transition-opacity duration-400 ${
              activeRow === i ? "opacity-100" : "opacity-60"
            }`}>
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
                activeRow === i ? "bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.5)]" : "bg-emerald-500/30"
              }`} aria-hidden />
              <span className="text-[11px] leading-snug sm:text-xs text-[color:var(--shell-ink)]">
                {row.despues}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ElGolpeContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <Container className="relative">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : fadeUpStrong}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <h2 className="font-serif text-2xl font-semibold text-off-white sm:text-4xl lg:text-[2.75rem]">
          Tu competencia no trabaja más que tú.
        </h2>
        <p className="text-text-secondary mt-4 text-base sm:text-lg">
          Simplemente ha dejado de hacer el trabajo que tú sigues haciendo a mano.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-10 max-w-3xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : fadeUpStrong}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.15 }}
      >
        <ComparisonFrame show={show} />
      </motion.div>

      <motion.p
        className="mt-10 text-center text-lg font-semibold text-off-white sm:text-xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : fadeUpStrong}
        transition={{ ...defaultTransition, duration: 0.7, delay: reduced ? 0 : 0.65 }}
      >
        No necesitas trabajar más. Necesitas dejar de hacerlo todo tú.
      </motion.p>
    </Container>
  );
}

export function ElGolpeSection() {
  return (
    <AmbientSection
      sectionId="cta"
      id="el-golpe"
      className="overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-label="El problema real"
    >
      <ElGolpeContent />
    </AmbientSection>
  );
}
