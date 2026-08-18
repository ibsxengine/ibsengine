"use client";

import { heroEase } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

const titleDesktop =
  "sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[4.75rem]";

export function HeroTitle() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1 className={`hero-title-main font-bodoni mb-2 font-normal tracking-tight text-off-white md:mb-3 lg:mb-4 ${titleDesktop}`}>
        Ideas Become{" "}
        <span className="hero-title-accent text-gold-accent">Systems</span>
      </h1>
    );
  }

  return (
    <h1 className={`hero-title-main font-bodoni mb-2 font-normal tracking-tight md:mb-3 lg:mb-4 ${titleDesktop}`}>
      {/* "Ideas Become" — slide up */}
      <span className="block overflow-hidden pb-1">
        <motion.span
          className="block text-off-white"
          initial={{ y: "112%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.62, ease: heroEase, delay: 0.04 }}
        >
          Ideas Become
        </motion.span>
      </span>

      {/* "Systems" — slide up + textShadow glow (no se corta) */}
      <span className="block overflow-hidden pb-4">
        <motion.span
          className="hero-title-accent inline-block text-gold-accent"
          initial={{
            y: "112%",
            opacity: 0,
            textShadow: "0 0 0px rgba(200,170,112,0)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            textShadow: [
              "0 0 0px rgba(200,170,112,0)",
              "0 0 36px rgba(200,170,112,0.95), 0 0 72px rgba(200,170,112,0.5)",
              "0 0 36px rgba(200,170,112,0.90), 0 0 72px rgba(200,170,112,0.45)",
              "0 0 10px rgba(200,170,112,0.28)",
            ],
          }}
          transition={{
            y:          { duration: 0.68, ease: heroEase, delay: 0.22 },
            opacity:    { duration: 0.65, ease: heroEase, delay: 0.22 },
            textShadow: {
              duration: 5.5,
              ease: "easeOut",
              delay: 0.75,
              times: [0, 0.10, 0.62, 1],
            },
          }}
        >
          Systems
        </motion.span>
      </span>
    </h1>
  );
}
