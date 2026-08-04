"use client";

import { SERVICES } from "@/lib/content/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultTransition, riseScale, slideFromLeft, slideFromRight } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesPageContent() {
  return (
    <>
      {SERVICES.map((service, i) => {
        const reversed = i % 2 === 1;
        const bg = i % 2 === 0 ? "#15325B" : "#122847";
        return (
          <section
            key={service.id}
            className="section-solid py-16 sm:py-20"
            style={{ backgroundColor: bg }}
          >
            <Container>
              <div className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? "" : ""}`}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={reversed ? slideFromRight : slideFromLeft}
                  transition={{ ...defaultTransition, duration: 0.8 }}
                  className={`relative overflow-hidden ${reversed ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={service.img}
                    alt={service.title}
                    width={1200}
                    height={800}
                    className="h-[320px] w-full object-cover sm:h-[400px]"
                    unoptimized
                  />
                  <div className="absolute top-0 left-0 right-0 flex h-[3px]">
                    <div className="flex-1 bg-gold-from" />
                    <div className="flex-1 bg-white/15" />
                    <div className="flex-1 bg-gold-to" />
                  </div>
                  <div className="absolute bottom-4 left-4 border-l-2 border-gold-from bg-navy/90 px-3 py-2">
                    <p className="font-serif text-2xl text-white/20">{service.id}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={reversed ? slideFromLeft : riseScale}
                  transition={{ ...defaultTransition, duration: 0.8, delay: 0.08 }}
                  className={reversed ? "lg:order-1" : ""}
                >
                  <p className="eyebrow">{service.subtitle}</p>
                  <h2 className="font-serif mt-3 text-2xl font-semibold text-off-white sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="text-text-secondary mt-4 text-sm leading-relaxed sm:text-base">
                    {service.desc}
                  </p>
                  <p className="eyebrow mb-3 mt-8 text-[0.65rem]">Incluye</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-off-white/85">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-to" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href="/contacto" variant="gold" className="text-sm">
                      Quiero saber más
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="section-solid py-16 sm:py-20" style={{ backgroundColor: "#0d1a30" }}>
        <Container className="text-center">
          <h2 className="font-serif text-2xl text-off-white sm:text-3xl">¿Por dónde empezamos?</h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-sm">
            La auditoría inicial es gratis. Te decimos qué fuga clientes y qué implementar primero.
          </p>
          <div className="mt-8">
            <Button href="/contacto" variant="gold">
              Solicitar auditoría
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
