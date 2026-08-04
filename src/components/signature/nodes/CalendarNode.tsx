"use client";

import { motion } from "framer-motion";

type CalendarNodeProps = {
  active: boolean;
  reducedMotion?: boolean;
  compact?: boolean;
  time?: string;
  detail?: string;
  fast?: boolean;
};

export function CalendarNode({
  active,
  reducedMotion = false,
  compact = false,
  time = "Martes, 10:00",
  detail = "Cita confirmada automáticamente",
  fast = false,
}: CalendarNodeProps) {
  return (
    <motion.div
      className={`w-full max-w-[260px] demo-node-shell rounded-sm border border-gold-from/25 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={reducedMotion || active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: reducedMotion ? 0 : fast ? 0.35 : 0.45,
        delay: reducedMotion ? 0 : fast ? 0.5 : 1.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      role="img"
      aria-label="Cita agendada en calendario"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-gold-from/15">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF6A" strokeWidth="2" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-off-white">Cita confirmada</p>
          <p className="text-text-secondary text-[10px]">Agenda · automático</p>
        </div>
      </div>
      <div className="space-y-1.5 rounded-sm border border-gold-from/10 bg-gold-from/5 px-3 py-2.5">
        <p className={`font-serif font-semibold text-off-white ${compact ? "text-sm" : "text-base"}`}>
          {time}
        </p>
        <p className="text-text-secondary text-xs">{detail}</p>
        <p className="font-data text-[10px] text-gold-to">Recordatorio enviado ✓</p>
      </div>
    </motion.div>
  );
}
