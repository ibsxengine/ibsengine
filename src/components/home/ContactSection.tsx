"use client";

import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { defaultTransition, layerRevealReduced, slideFromLeft, slideFromRight } from "@/lib/motion/variants";
import { motion, useReducedMotion } from "framer-motion";

function ContactContent() {
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : slideFromLeft}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <SectionLabel>Contacto</SectionLabel>
        <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
          Hablemos de tu negocio
        </h2>
        <p className="text-text-secondary mt-4 max-w-md text-sm leading-relaxed sm:text-base">
          Escríbenos por WhatsApp para una respuesta rápida, o déjanos tus datos y
          te contactamos nosotros.
        </p>
        <div className="mt-8">
          <WhatsAppButton />
        </div>

        <ul className="text-text-secondary mt-10 space-y-3 text-sm">
          {["Auditoría sin compromiso", "Presupuesto claro antes de empezar", "Soporte continuo"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="h-1 w-1 rounded-full bg-gold-to" aria-hidden />
                {item}
              </li>
            ),
          )}
        </ul>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : slideFromRight}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.1 }}
      >
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
      </motion.div>
    </div>
  );
}

export function ContactSection() {
  return (
    <SectionWrapper id="contacto" ambientId="contacto" ariaLabel="Contacto">
      <ContactContent />
    </SectionWrapper>
  );
}
