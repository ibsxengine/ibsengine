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

      {/* "Systems" — slide up + glow bloom que dura y se asienta */}
      <motion.span
        className="block pb-3"
        initial={{ filter: "drop-shadow(0 0 0px rgba(200,170,112,0))" }}
        animate={{
          filter: [
            "drop-shadow(0 0 0px rgba(200,170,112,0))",       // t=0: nada
            "drop-shadow(0 0 32px rgba(200,170,112,0.92))",   // pico brillante
            "drop-shadow(0 0 30px rgba(200,170,112,0.88))",   // HOLD — se mantiene brillante
            "drop-shadow(0 0 14px rgba(200,170,112,0.38))",   // asienta suave
          ],
        }}
        transition={{
          filter: {
            duration: 3.2,
            ease: "easeOut",
            delay: 0.82,
            times: [0, 0.16, 0.48, 1],  // pico en 0.5s, se mantiene hasta 1.5s, luego fade
          },
        }}
      >
        <span className="block">
          <motion.span
            className="hero-title-accent inline-block text-gold-accent"
            initial={{ y: "112%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: heroEase, delay: 0.22 }}
          >
            Systems
          </motion.span>
        </span>
      </motion.span>
    </h1>
  );
}
