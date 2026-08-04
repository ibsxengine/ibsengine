"use client";

import { motion } from "framer-motion";

type WhatsAppNodeProps = {
  active: boolean;
  reducedMotion?: boolean;
  compact?: boolean;
  message?: string;
  fast?: boolean;
};

export function WhatsAppNode({
  active,
  reducedMotion = false,
  compact = false,
  message = "Hola, ¿tenéis disponibilidad esta semana?",
  fast = false,
}: WhatsAppNodeProps) {
  return (
    <motion.div
      className={`w-full max-w-[260px] demo-node-shell rounded-sm border ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
      initial={{ opacity: 0, y: 16 }}
      animate={reducedMotion || active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: reducedMotion ? 0 : fast ? 0.32 : 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      role="img"
      aria-label="Mensaje de WhatsApp entrante"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-off-white">Cliente nuevo</p>
          <p className="text-text-secondary text-[10px]">WhatsApp · ahora</p>
        </div>
      </div>
      <div className="rounded-sm border border-[color:var(--shell-border)] bg-[var(--shell-panel-inner)] px-3 py-2">
        <p className={`leading-relaxed text-off-white/90 ${compact ? "text-xs" : "text-sm"}`}>
          {message}
        </p>
      </div>
    </motion.div>
  );
}
