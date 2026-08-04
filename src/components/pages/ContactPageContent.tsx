"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { WorkWithUsForm } from "@/components/pages/WorkWithUsForm";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { defaultTransition, slideFromLeft, slideFromRight } from "@/lib/motion/variants";
import { motion } from "framer-motion";

export function ContactPageContent() {
  return (
    <>
      <section className="section-divider pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideFromLeft}
              transition={defaultTransition}
            >
              <SectionLabel>Formulario</SectionLabel>
              <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-3xl">
                Solicitud de contacto
              </h2>
              <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                Cuéntanos tu sector y qué necesitas. La auditoría inicial es sin compromiso.
              </p>
              <div className="mt-6">
                <WhatsAppButton />
              </div>
              <div className="relative mt-8">
                <div className="contact-form-panel">
                  <div className="contact-form-panel-header">
                    <p className="contact-form-panel-title">Solicitud de contacto</p>
                    <span className="contact-form-panel-badge">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                      Disponible
                    </span>
                  </div>
                  <div className="contact-form-panel-body">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideFromRight}
              transition={{ ...defaultTransition, delay: 0.08 }}
            >
              <ul className="text-text-secondary space-y-3 text-sm">
                {["Auditoría sin compromiso", "Presupuesto claro antes de empezar", "Respuesta en menos de 24h"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1 w-1 rounded-full bg-gold-to" aria-hidden />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      <section id="trabaja" className="section-divider section-alt py-16 sm:py-20 scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>Únete al equipo</SectionLabel>
              <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-3xl">
                Trabaja con nosotros
              </h2>
              <p className="text-text-secondary mt-4 text-sm leading-relaxed">
                Buscamos personas con ganas de construir sistemas que impacten en pymes reales.
                Déjanos tu CV y cuéntanos en qué te mueves.
              </p>
            </div>
            <WorkWithUsForm />
          </div>
        </Container>
      </section>
    </>
  );
}
