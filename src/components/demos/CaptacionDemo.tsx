"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DemoFrame } from "./DemoFrame";
import { useSectorDemo } from "./useDemoCycle";

export function CaptacionDemo() {
  const { ref, step, scenario } = useSectorDemo(4, 2400, 5200);

  return (
    <div ref={ref}>
      <DemoFrame label="Captación · Demo" sector={scenario}>
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key={`search-${scenario.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-sm border border-white/10 bg-white/[0.04] p-3"
              >
                <p className="font-mono text-[10px] text-text-secondary">Google</p>
                <p className="mt-1 text-sm text-off-white">
                  {scenario.searchQuery}{" "}
                  <span className="text-gold-to">{scenario.searchHighlight}</span>
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2 }}
                  className="mt-2 h-0.5 gold-gradient-bg"
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key={`result-${scenario.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-sm border border-gold-from/25 bg-gold-from/5 p-3"
              >
                <p className="text-sm font-medium text-off-white">{scenario.googleResult}</p>
                <p className="text-text-secondary mt-1 text-xs">Web + SEO local + reseñas activas</p>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-gold-to text-sm"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-xs text-off-white/80">Nueva reseña publicada automáticamente</p>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="call"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-sm border border-emerald-500/20 bg-emerald-500/10 p-3"
              >
                <span className="inline-block animate-pulse text-lg">📞</span>
                <div>
                  <p className="text-sm font-medium text-off-white">Contacto entrante</p>
                  <p className="text-text-secondary text-xs">Cliente desde Google · ahora</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  );
}
