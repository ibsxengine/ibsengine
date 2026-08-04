"use client";

import { defaultTransition } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
  dark?: boolean;
};

export function PageHero({ eyebrow, title, description, aside, dark = true }: PageHeroProps) {
  return (
    <section className={`section-divider pt-28 pb-14 sm:pt-32 sm:pb-16 ${dark ? "" : "section-alt"}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...defaultTransition, duration: 0.85 }}
          className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="font-serif mt-4 text-3xl font-semibold leading-tight text-off-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
          {(description || aside) && (
            <div className="lg:pb-1">
              {description && (
                <p className="text-text-secondary text-sm leading-relaxed sm:text-base">{description}</p>
              )}
              {aside}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...defaultTransition, duration: 0.9, delay: 0.25 }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-gold-from via-gold-to/60 to-transparent"
          aria-hidden
        />
      </Container>
    </section>
  );
}
