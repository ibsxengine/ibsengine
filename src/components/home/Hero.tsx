"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroTitle } from "@/components/home/HeroTitle";
import { HeroRiseMotif } from "@/components/home/HeroRiseMotif";
import { AmbientSection } from "@/components/layout/ActiveSectionProvider";
import { ProductDemo } from "@/components/demos/ProductDemo";
import {
  defaultTransition,
  heroEase,
  heroFadeUp,
  staggerContainer,
} from "@/lib/motion/variants";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <AmbientSection
      sectionId="hero"
      id="inicio"
      solid={false}
      className="relative overflow-hidden py-6 sm:py-8 md:flex md:min-h-[calc(100svh-4rem)] md:flex-col md:justify-center md:py-10"
    >
      {/* Motif al nivel del hero — máscara usa el ancho del viewport */}
      <HeroRiseMotif />

      <Container className="relative z-[1]">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-12">

          {/* Columna texto */}
          <div className="relative isolate overflow-visible max-md:min-h-[calc(100dvh-4.25rem)] md:min-h-0">

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hero-mobile-large relative z-[2] flex min-h-[calc(100dvh-4.25rem)] flex-col justify-center text-center max-md:pb-2 md:min-h-0 md:justify-center md:pb-0 lg:pl-16 lg:text-left xl:pl-20"
            >
              <HeroTitle />

              <motion.p
                variants={heroFadeUp}
                transition={{ delay: 0.28, duration: 0.45, ease: heroEase }}
                className="hero-lead text-gold-to mx-auto mt-5 max-w-lg text-sm font-medium leading-relaxed sm:mt-6 sm:text-base md:mt-7 lg:mx-0"
              >
                El problema no es que te falte tiempo. Es que todavía no conocías IBS Engine.
              </motion.p>

              <motion.p
                variants={heroFadeUp}
                transition={{ delay: 0.33, duration: 0.45, ease: heroEase }}
                className="hero-lead text-text-secondary mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base md:mt-4 lg:mx-0"
              >
                ¿De verdad vas a ahorrarte unos duros a costa de seguir gastando tu tiempo?
              </motion.p>

              <motion.div
                variants={heroFadeUp}
                transition={{ delay: 0.38, duration: 0.45, ease: heroEase }}
                className="hero-cta-row mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-7 sm:flex-row md:mt-8 lg:justify-start"
              >
                <Button
                  href="/contacto"
                  variant="gold"
                  breathe
                  className="w-full max-w-[280px] !px-4 !py-2 !text-xs sm:w-auto sm:max-w-none sm:!px-5 sm:!py-2.5 sm:!text-sm"
                >
                  Quiero recuperar mi tiempo
                </Button>
                <Button
                  href="#como-funciona"
                  variant="secondary"
                  breathe
                  className="w-full max-w-[280px] !px-4 !py-2 !text-xs sm:w-auto sm:max-w-none sm:!px-5 sm:!py-2.5 sm:!text-sm"
                >
                  Enséñame cómo funciona
                </Button>
              </motion.div>

              <motion.p
                variants={heroFadeUp}
                transition={{ delay: 0.48, duration: 0.45, ease: heroEase }}
                className="hero-sector text-text-secondary mx-auto mt-5 max-w-lg text-sm leading-relaxed sm:mt-6 sm:text-base md:mt-7 lg:mx-0"
              >
                El tiempo es la moneda más cara que tienes. Y tú sigues gastándolo en un trabajo que ya puede hacer una máquina.
              </motion.p>
            </motion.div>
          </div>

          {/* Demo — solo visible desde md */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 72, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.32, ease: heroEase }}
              className="relative z-[2] mx-auto w-full max-w-md lg:max-w-none"
              data-orb-minimal
            >
              <ProductDemo />
            </motion.div>
          </div>
        </div>

        {/* Demo en móvil — debajo del texto */}
        <motion.div
          className="relative z-[2] pb-2 md:hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...defaultTransition, duration: 0.75 }}
          data-orb-minimal
        >
          <ProductDemo />
        </motion.div>
      </Container>
    </AmbientSection>
  );
}
