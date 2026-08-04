"use client";

import { motion } from "framer-motion";

type CubeProps = {
  delay: number;
  active: boolean;
  reducedMotion?: boolean;
  size?: number;
};

function Cube({ delay, active, reducedMotion = false, size = 14 }: CubeProps) {
  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0, x: -8, y: 8 }}
      animate={
        reducedMotion || active
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 0, scale: 0, x: -8, y: 8 }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.35,
        delay: reducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        className="cube-face absolute inset-0 rounded-[2px] shadow-sm"
        style={{ transform: "rotateX(45deg) rotateZ(45deg)" }}
      />
      <div
        className="absolute inset-0 rounded-[2px] bg-gold-from/60"
        style={{ transform: "rotateX(45deg) rotateZ(45deg) translate(2px, 2px)" }}
      />
    </motion.div>
  );
}

type ProcessingNodeProps = {
  active: boolean;
  reducedMotion?: boolean;
  compact?: boolean;
  fast?: boolean;
};

export function ProcessingNode({
  active,
  reducedMotion = false,
  compact = false,
  fast = false,
}: ProcessingNodeProps) {
  const cubeSize = compact ? 10 : 14;
  const baseDelay = fast ? 0.25 : 0.6;

  return (
    <motion.div
      className={`relative flex flex-col items-center demo-node-shell rounded-sm border ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
      initial={{ opacity: reducedMotion ? 1 : 0.4 }}
      animate={{
        opacity: reducedMotion || active ? 1 : 0.4,
        boxShadow:
          reducedMotion || active
            ? "0 0 0 1px rgba(212, 175, 106, 0.15)"
            : "0 0 0 0px rgba(212, 175, 106, 0)",
      }}
      transition={{ duration: reducedMotion ? 0 : fast ? 0.28 : 0.4, delay: baseDelay }}
      role="img"
      aria-label="Procesamiento: piezas del sistema ensamblándose"
    >
      <p className="font-serif text-[10px] tracking-[0.12em] text-gold-from uppercase sm:text-[11px]">
        Procesando
      </p>
      <div className={`mt-3 flex flex-wrap items-center justify-center gap-2 ${compact ? "gap-1.5" : "gap-2.5"}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Cube
            key={i}
            delay={baseDelay + i * 0.1}
            active={active}
            reducedMotion={reducedMotion}
            size={cubeSize}
          />
        ))}
      </div>
      <motion.div
        className="mt-3 h-px w-12 gold-gradient-bg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: reducedMotion || active ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, delay: baseDelay + 0.5 }}
        aria-hidden
      />
    </motion.div>
  );
}
