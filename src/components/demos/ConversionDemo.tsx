"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemoSteps } from "./useDemoCycle";

/** 4 mensajes + tarjeta de cita confirmada */
const STEP_MS = [900, 950, 950, 950, 1400] as const;

function WaBubble({
  text,
  from,
}: {
  text: string;
  from: "client" | "bot";
}) {
  const isClient = from === "client";

  return (
    <div
      className={`demo-step-in relative max-w-[88%] px-2.5 py-1.5 text-[11px] leading-relaxed shadow-sm ${
        isClient
          ? "self-start rounded-lg rounded-tl-none bg-[#202C33] text-[#E9EDEF]"
          : "self-end rounded-lg rounded-tr-none bg-[#005C4B] text-[#E9EDEF]"
      }`}
    >
      {text}
    </div>
  );
}

export function ConversionDemo() {
  const { ref, step, scenario } = useSectorDemoSteps(STEP_MS, 0, {
    advanceSectorOnComplete: true,
  });
  const messages = scenario.chat;
  const visibleCount = Math.min(step + 1, messages.length);
  const showAppointment = step >= messages.length;

  return (
    <div ref={ref}>
      <DemoFrame label="Conversión · WhatsApp Business" sector={scenario}>
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mx-auto max-w-[300px] overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/30">
              <div className="flex items-center gap-2.5 bg-[#1F2C34] px-3 py-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#E9EDEF]">
                    Cliente · {scenario.label}
                  </p>
                  <p className="font-data text-[10px] text-emerald-400">Respondiendo automáticamente</p>
                </div>
              </div>

              <div
                className="flex min-h-[240px] flex-col gap-1.5 bg-[#0B141A] p-3"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.015) 0%, transparent 40%)",
                }}
              >
                {messages.slice(0, visibleCount).map((msg, i) => (
                  <WaBubble key={`${scenario.id}-${i}`} text={msg.text} from={msg.from} />
                ))}

                {showAppointment && (
                  <div className="demo-step-in mt-auto rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center">
                    <p className="font-data text-[10px] text-emerald-300">✓ Cita agendada</p>
                    <p className="mt-0.5 text-[11px] text-[#E9EDEF]">
                      {scenario.appointment} · {scenario.appointmentDetail}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 bg-[#1F2C34] px-2 py-2">
                <div className="flex-1 rounded-full bg-[#2A3942] px-3 py-1.5 text-[10px] text-[#8696A0]">
                  Escribe un mensaje…
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden>
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DemoFrame>
    </div>
  );
}
