"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { layerReveal, layerRevealReduced, layerRevealTransition } from "@/lib/motion/variants";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

/** Re-anima al entrar/salir del viewport mientras haces scroll */
export function ScrollReveal({
  children,
  className = "",
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.12, margin: "-8% 0px -8% 0px" });
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial={false}
      animate={reduced ? "visible" : inView ? "visible" : "hidden"}
      variants={reduced ? layerRevealReduced : layerReveal}
      transition={layerRevealTransition}
      className={className}
    >
      {children}
    </Tag>
  );
}
