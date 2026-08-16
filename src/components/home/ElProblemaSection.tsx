"use client";

import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getShowcaseBlockVariant } from "@/lib/motion/section-animations";
import { defaultTransition, layerRevealReduced } from "@/lib/motion/variants";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { useEffect, useState } from "react";
import { useDocumentVisible } from "@/lib/motion/useDocumentVisible";

const PENDING = [
  { label: "Presupuesto · Motor Ruiz", status: "Sin revisar", time: "hace 3 días" },
  { label: "WhatsApp · García Fontanería", status: "Sin contestar", time: "hace 2 días" },
  { label: "Cita mañana · Clínica López", status: "Sin confirmar", time: "mañana 9:00" },
  { label: "Presupuesto · Reformas Fernández", status: "Olvidado", time: "hace 5 días" },
  { label: "Factura #1042 · Martínez", status: "Sin enviar", time: "hace 1 semana" },
  { label: "Seguimiento · Pérez Eléctrico", status: "Sin respuesta", time: "hace 4 días" },
];

const ALERTS = [
  "Nueva consulta sin respuesta",
  "Presupuesto expirado",
  "Recordatorio perdido",
];

function PendingPanel({ show }: { show: boolean }) {
  const [alertIdx, setAlertIdx] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const docVisible = useDocumentVisible();

  useEffect(() => {
    if (!show || !docVisible) return;

    // Primera alerta aparece al instante
    setAlertIdx(0);
    setShowAlert(true);
    const firstHide = setTimeout(() => setShowAlert(false), 2000);

    // Ciclo posterior cada 3.5s
    let i = 0;
    const cycle = setInterval(() => {
      i = (i + 1) % ALERTS.length;
      setAlertIdx(i);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }, 3500);

    return () => {
      clearTimeout(firstHide);
      clearInterval(cycle);
    };
  }, [show, docVisible]);

  return (
    <div className="demo-frame-light relative overflow-hidden rounded-md border" data-orb-minimal>
      {/* Topbar idéntico a DemoFrame */}
      <div className="relative flex items-center justify-between border-b border-[color:var(--shell-border)] bg-[var(--shell-panel-header)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-500/30" aria-hidden />
        </div>
        <span className="font-serif text-[11px] tracking-[0.12em] text-[color:var(--shell-ink-muted)] uppercase">
          Mis tareas pendientes
        </span>
        <div className="flex items-center gap-1.5">
          {/* Icono de alerta + contador */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-500/70" aria-hidden>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="font-data text-[10px] text-red-500/70">
            {PENDING.length} sin gestionar
          </span>
        </div>
      </div>

      {/* Panel interior — mismo bg que DemoFrame */}
      <div className="demo-panel-light bg-[var(--shell-panel-inner)] px-5 py-4 sm:px-6">
        {/* Alerta flotante */}
        <div className="relative mb-3 h-7">
          <AnimatePresence>
            {showAlert && (
              <motion.div
                key={alertIdx}
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center gap-2 rounded-sm border border-red-400/25 bg-red-400/10 px-3"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" aria-hidden />
                <span className="font-data text-[10px] text-red-400">
                  {ALERTS[alertIdx]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lista tareas */}
        <div className="divide-y divide-[color:var(--shell-border)]">
          {PENDING.map((task, i) => (
            <motion.div
              key={task.label}
              className="flex items-center justify-between py-2.5 gap-3"
              initial={{ opacity: 0, x: -6 }}
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80 shadow-[0_0_5px_rgba(248,113,113,0.5)]" aria-hidden />
                <span className="font-data text-xs text-[color:var(--shell-ink)] truncate">
                  {task.label}
                </span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="font-data text-[10px] text-[color:var(--shell-ink-muted)] hidden sm:block">
                  {task.time}
                </span>
                <span className="font-data text-[10px] rounded-sm border border-red-400/20 bg-red-400/10 px-1.5 py-0.5 text-red-500/80">
                  {task.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ElProblemaContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <Container className="relative">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(0)}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <SectionLabel>Ingeniería sin milongas</SectionLabel>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl lg:text-[2.75rem]">
          Sigues haciendo el trabajo que nadie debería seguir haciendo a mano.
        </h2>
      </motion.div>

      <motion.div
        className="mx-auto mt-10 max-w-2xl"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(1)}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.1 }}
      >
        <PendingPanel show={show} />
      </motion.div>

      <motion.div
        className="mx-auto mt-8 max-w-xl text-center"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getShowcaseBlockVariant(0)}
        transition={{ ...defaultTransition, duration: 0.7, delay: reduced ? 0 : 0.65 }}
      >
        <p className="text-off-white font-semibold text-base sm:text-lg">
          Y luego dices que no tienes tiempo.
        </p>
        <p className="text-text-secondary mt-2 text-sm sm:text-base">
          No necesitas trabajar más. Necesitas dejar de hacer tú todo esto.
        </p>
      </motion.div>
    </Container>
  );
}

export function ElProblemaSection() {
  return (
    <AmbientSection
      sectionId="captacion"
      id="el-problema"
      className="overflow-hidden pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
      aria-label="El problema"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.05]" aria-hidden />
      <ElProblemaContent />
    </AmbientSection>
  );
}
