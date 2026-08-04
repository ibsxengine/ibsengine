"use client";

import { ABOUT_STATS, WHY_CHOOSE_US } from "@/lib/content/about";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultTransition, slideFromLeft, slideFromRight } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutPageContent() {
  return (
    <>
      <section className="section-solid py-12 sm:py-16" style={{ backgroundColor: "#15325B" }}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideFromLeft}
              transition={{ ...defaultTransition, duration: 0.85 }}
            >
              <p className="text-text-secondary text-sm leading-relaxed sm:text-base">
                IBS Engine nace para resolver un problema real: la mayoría de pymes pierden clientes
                no por falta de trabajo, sino por procesos rotos — WhatsApp sin responder, citas que
                se caen, leads que nadie sigue.
              </p>
              <p className="text-text-secondary mt-4 text-sm leading-relaxed sm:text-base">
                Nuestro enfoque es montar un sistema unificado adaptado a tu sector. Tú sigues
                trabajando; el motor captura, convierte y organiza.
              </p>
              <div className="mt-8 flex gap-1">
                <div className="h-[3px] w-12 bg-gold-from" />
                <div className="h-[3px] w-12 bg-white/10" />
                <div className="h-[3px] w-12 bg-gold-to" />
              </div>
              <div className="mt-8">
                <Button href="/contacto" variant="gold">
                  Solicitar auditoría gratis
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideFromRight}
              transition={{ ...defaultTransition, duration: 0.85, delay: 0.1 }}
              className="relative overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                alt="Equipo IBS Engine"
                width={1000}
                height={700}
                className="h-[420px] w-full object-cover sm:h-[480px]"
                unoptimized
              />
              <div className="absolute top-0 left-0 right-0 flex h-[3px]">
                <div className="flex-1 bg-gold-from" />
                <div className="flex-1 bg-white/20" />
                <div className="flex-1 bg-gold-to" />
              </div>
              <div className="absolute top-6 right-6 border-l-2 border-gold-from bg-navy/90 px-4 py-3 backdrop-blur-sm">
                <p className="eyebrow text-[0.65rem]">Ideas Become</p>
                <p className="font-serif text-xl text-off-white">Systems</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="section-solid py-14 sm:py-16" style={{ backgroundColor: "#122847" }}>
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {ABOUT_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...defaultTransition, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-3xl text-gold-to sm:text-4xl">{s.num}</p>
                <p className="text-text-secondary mt-2 text-[11px] uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-solid py-16 sm:py-20" style={{ backgroundColor: "#0d1a30" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={defaultTransition}
            className="mb-12 text-center"
          >
            <p className="eyebrow">Lo que nos define</p>
            <h2 className="font-serif mt-3 text-2xl text-off-white sm:text-3xl">
              Por qué <span className="text-gold-accent">elegirnos</span>
            </h2>
          </motion.div>
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...defaultTransition, delay: i * 0.07 }}
                className="group bg-[#15325B] p-8 transition-colors duration-500 hover:bg-[#122847]"
              >
                <h3 className="font-serif text-lg text-off-white">{item.title}</h3>
                <p className="text-text-secondary mt-2 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
