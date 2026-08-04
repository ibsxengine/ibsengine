"use client";

import { heroEase } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

const titleDesktop =
  "sm:text-5xl sm:leading-[1.08] lg:text-[4rem] xl:text-[5rem] 2xl:text-[5.5rem]";

export function HeroTitle() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1
        className={`hero-title-main font-bodoni mb-4 font-normal tracking-tight text-off-white md:mb-5 lg:mb-6 ${titleDesktop}`}
      >
        Ideas Become{" "}
        <span className="hero-title-accent hero-title-accent--static text-gold-accent">Systems</span>
      </h1>
    );
  }

  return (
    <h1 className={`hero-title-main font-bodoni mb-4 font-normal tracking-tight md:mb-5 lg:mb-6 ${titleDesktop}`}>
      <span className="block overflow-hidden pb-1">
        <motion.span
          className="block text-off-white"
          initial={{ y: "112%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.58, ease: heroEase, delay: 0.04 }}
        >
          Ideas Become
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-3">
        <motion.span
          className="hero-title-accent inline-block pb-0.5 text-gold-accent"
          initial={{ y: "112%", opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.62, ease: heroEase, delay: 0.2 }}
        >
          Systems
        </motion.span>
      </span>
    </h1>
  );
}
