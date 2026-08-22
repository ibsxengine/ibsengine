"use client";

import React, { type ReactNode, useRef, useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { defaultTransition } from "@/lib/motion/variants";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── constantes ─────────────────────────────────────────── */

const SEC = "py-16 sm:py-20 lg:py-24";
const NAVY     = "#0d1e3a";
const NAVY_ALT = "#091525";
const NAVY_MID = "#132d52";

/* ─── FadeIn ──────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.18 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...defaultTransition, duration: 0.72, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 01 ORIGEN ───────────────────────────────────────────── */

const FLOW_STEPS = ["IDEA", "CONEXIÓN", "AUTOMATIZACIÓN", "SISTEMA"] as const;

function IdeaFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-col items-center gap-0">
      {FLOW_STEPS.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...defaultTransition, duration: 0.55, delay: reduced ? 0 : 0.15 + i * 0.22 }}
            className={`
              relative border px-6 py-3 text-center
              ${i === FLOW_STEPS.length - 1
                ? "border-gold-to/50 bg-gold-to/10 shadow-[0_0_28px_rgba(200,170,112,0.2)]"
                : "border-white/[0.12] bg-white/[0.03]"}
            `}
          >
            <span className={`font-data text-xs tracking-[0.18em] uppercase ${
              i === FLOW_STEPS.length - 1 ? "text-gold-to" : "text-off-white/70"
            }`}>
              {step}
            </span>
            {i === FLOW_STEPS.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: reduced ? 0 : 1.2, duration: 0.5 }}
                className="ml-3 inline-flex items-center gap-1.5 font-data text-[10px] tracking-widest text-emerald-400/80 uppercase"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                WORKING
              </motion.span>
            )}
          </motion.div>

          {i < FLOW_STEPS.length - 1 && (
            <div className="relative flex h-10 w-[1px] items-center justify-center overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gold-to/60"
                initial={{ height: 0 }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 0.35, delay: reduced ? 0 : 0.38 + i * 0.22 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OrigenSection() {
  return (
    <section className={SEC} style={{ backgroundColor: NAVY }}>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <FadeIn>
            <SectionLabel>Cómo empezó</SectionLabel>
            <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
              Todo empezó con una idea bastante simple.
            </h2>
            <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base">
              Ayudar a pequeños negocios a dejar de perder tiempo haciendo cosas
              que una máquina ya podía hacer por ellos.
            </p>
            <p className="text-text-secondary mt-3 text-sm leading-relaxed sm:text-base">
              No queríamos vender otro programa que nadie termina usando. Así que empezamos
              a conectar herramientas, automatizar procesos y construir pequeñas soluciones
              para quitarles trabajo de encima.
            </p>
            <p className="mt-4 text-sm font-semibold text-off-white sm:text-base">Y funcionó.</p>
          </FadeIn>

          <FadeIn delay={0.12} className="flex justify-center">
            <IdeaFlow />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ─── 02 DESCUBRIMIENTO ───────────────────────────────────── */

const TOOLS   = ["WhatsApp", "Excel", "Agenda", "Email", "CRM"];
const OUTPUTS = ["CLIENTE", "CITA", "PRESUPUESTO", "SEGUIMIENTO"];

function DiscoverySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <section className={SEC} style={{ backgroundColor: NAVY_ALT }}>
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center mb-14">
          <SectionLabel>El descubrimiento</SectionLabel>
          <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
            Entonces entendimos que el problema no era de un negocio.
          </h2>
          <p className="text-text-secondary mt-4 text-base sm:text-lg font-medium">Era de miles.</p>
          <p className="text-text-secondary mt-3 text-sm leading-relaxed sm:text-base">
            Negocios que saben hacer perfectamente su trabajo, pero siguen perdiendo horas
            con WhatsApps, presupuestos, citas, documentos y tareas que no deberían
            depender de una persona.
          </p>
        </FadeIn>

        <div ref={ref} className="mx-auto max-w-3xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
            <div className="flex flex-col gap-2.5">
              {TOOLS.map((tool, i) => (
                <motion.div key={tool}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
                  className="flex items-center justify-between rounded-sm border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <span className="font-data text-xs text-off-white/60">{tool}</span>
                  <span className="h-1 w-1 rounded-full bg-red-400/50" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="border border-gold-to/40 bg-gold-to/[0.08] px-4 py-3 text-center shadow-[0_0_32px_rgba(200,170,112,0.2)]"
            >
              <span className="block font-data text-[10px] tracking-widest text-gold-to/70 uppercase">IBS</span>
              <span className="font-serif text-base text-gold-to">ENGINE</span>
            </motion.div>

            <div className="flex flex-col gap-2.5">
              {OUTPUTS.map((out, i) => (
                <motion.div key={out}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.7 + i * 0.09 }}
                  className="flex items-center gap-2 rounded-sm border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                  <span className="font-data text-xs text-off-white/70">{out}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <FadeIn delay={0.2} className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-off-white text-lg font-semibold sm:text-xl leading-snug">
            "El problema no es la tecnología.<br />Es saber qué coño hacer con ella."
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

/* ─── 03 FILOSOFÍA — casos IDEA → SISTEMA ─────────────── */

const CASES = [
  {
    sector: "Reformas",
    idea: "Los presupuestos se quedan sin respuesta.",
    sistema: "Seguimiento automático a las 24h. Presupuesto cerrado.",
    output: ["Presupuesto enviado", "48h → alerta", "WhatsApp auto", "Lead cerrado"],
  },
  {
    sector: "Clínica dental",
    idea: "No respondo los WhatsApps a tiempo.",
    sistema: "IA atiende al instante. Cita confirmada en 3 segundos.",
    output: ["Mensaje recibido", "IA responde", "Cita agendada", "CRM actualizado"],
  },
  {
    sector: "Taller mecánico",
    idea: "No sé cuántos clientes activos tengo.",
    sistema: "Panel en tiempo real. Cada cliente, cada estado, desde el móvil.",
    output: ["23 activos", "4 pendientes", "2 urgentes", "Dashboard live"],
  },
] as const;

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CASES.length), 3800);
    return () => clearInterval(id);
  }, [reduced]);

  const c = CASES[active];

  return (
    <section className={SEC} style={{ backgroundColor: NAVY_MID }}>
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <FadeIn>
            <SectionLabel>Ideas Become Systems</SectionLabel>
            <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
              Una idea solo es el principio.
            </h2>
            <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base">
              Una idea no cambia un negocio hasta que empieza a funcionar.
            </p>
            <p className="mt-4 text-off-white font-medium sm:text-lg">
              IBS Engine. Ideas que se convierten en sistemas.
            </p>
          </FadeIn>

          {/* Panel IDEA → SISTEMA */}
          <div ref={ref} className="space-y-2">
            {/* Cabecera con sector */}
            <motion.div
              key={`sector-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="font-data text-[10px] tracking-[0.16em] text-gold-to/60 uppercase">Sector</span>
              <span className="font-data text-[10px] tracking-[0.12em] text-gold-to uppercase">{c.sector}</span>
            </motion.div>

            {/* IDEA */}
            <motion.div
              key={`idea-${active}`}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="rounded-sm border border-white/10 bg-white/[0.03] px-5 py-4"
            >
              <p className="font-data text-[10px] tracking-[0.18em] text-off-white/30 uppercase mb-2">IDEA · Problema</p>
              <p className="text-off-white/80 text-sm leading-relaxed sm:text-base">"{c.idea}"</p>
            </motion.div>

            {/* Flecha */}
            <div className="flex items-center justify-center py-1">
              <div className="h-6 w-px bg-gradient-to-b from-white/10 to-gold-to/50" />
            </div>

            {/* SISTEMA */}
            <motion.div
              key={`sistema-${active}`}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="rounded-sm border border-gold-to/40 bg-gold-to/[0.06] px-5 py-4 shadow-[0_0_24px_rgba(200,170,112,0.08)]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-data text-[10px] tracking-[0.18em] text-gold-to/70 uppercase">SISTEMA · Online</p>
                <span className="flex items-center gap-1.5 font-data text-[9px] text-emerald-400/80 uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  ACTIVO
                </span>
              </div>
              <p className="text-off-white text-sm leading-relaxed sm:text-base">{c.sistema}</p>

              {/* Output tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.output.map((tag) => (
                  <span key={tag} className="font-data text-[10px] rounded-sm border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-0.5 text-emerald-400/80">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Indicadores de ciclo */}
            <div className="flex justify-center gap-2 pt-3">
              {CASES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-gold-to" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Caso ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── 04 CÓMO PENSAMOS ────────────────────────────────────── */

function HowWeThinkSection() {
  return (
    <section className={SEC} style={{ backgroundColor: NAVY }}>
      <Container>
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <SectionLabel>Nuestra forma de pensar</SectionLabel>
            <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
              No empezamos por la herramienta.
            </h2>
            <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base">
              Empezamos por el problema.
            </p>
            <p className="text-text-secondary mt-3 text-sm leading-relaxed sm:text-base">
              Miramos cómo trabaja realmente un negocio, qué le está haciendo perder tiempo
              y qué tiene sentido cambiar. Después decidimos qué tecnología utilizar.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-off-white/70 sm:text-base">
              {[
                "A veces será IA.",
                "A veces automatización.",
                "A veces una aplicación.",
                "A veces simplemente conectar dos cosas que ya funcionaban por separado.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="mt-[0.47em] h-[0.4em] w-[0.4em] shrink-0 rounded-full bg-gold-to/60" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-l-2 border-gold-to/40 pl-5">
              <p className="text-off-white font-medium sm:text-lg">La tecnología viene después.</p>
              <p className="text-text-secondary text-sm mt-1">El problema viene primero.</p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ─── 05 DIFERENCIACIÓN ───────────────────────────────────── */

function IdeaToSystem({ inView, reduced }: { inView: boolean; reduced: boolean | null }) {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = [
      setTimeout(() => setStep(1), reduced ? 0 : 200),
      setTimeout(() => setStep(2), reduced ? 0 : 900),
      setTimeout(() => setStep(3), reduced ? 0 : 1800),
      setTimeout(() => setStep(4), reduced ? 0 : 2600),
      setTimeout(() => setStep(5), reduced ? 0 : 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  const systemItems = ["WhatsApp", "CRM", "Agenda", "Seguimiento"];

  return (
    <div className="w-full max-w-xs border border-white/[0.1] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between">
        <span className="font-data text-[9px] tracking-[0.18em] text-off-white/35 uppercase">
          IBS Engine · From Idea to System
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* IDEA */}
        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="border border-white/[0.08] bg-white/[0.02] p-3"
        >
          <p className="font-data text-[9px] tracking-widest text-gold-to/60 uppercase mb-1.5">Idea</p>
          <p className="font-data text-[10px] text-off-white/55 leading-relaxed italic">
            "Quiero dejar de perder clientes por WhatsApp."
          </p>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          className="flex justify-center"
        >
          <span className="font-data text-[11px] text-gold-to/30">↓</span>
        </motion.div>

        {/* IBS ENGINE */}
        <motion.div
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="border border-gold-to/30 bg-gold-to/[0.04] p-3"
        >
          <p className="font-data text-[9px] tracking-widest text-gold-to/70 uppercase mb-2">IBS Engine</p>
          {["Problema identificado", "Solución diseñada", "Automatización conectada"].map((item, i) => (
            <motion.div
              key={item}
              animate={{ opacity: step >= 2 + (i * 0.3) ? 1 : 0.2 }}
              initial={{ opacity: 0.2 }}
              className="flex items-center gap-2 py-0.5"
            >
              <motion.span
                animate={{ color: step >= 2 ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.2)" }}
                className="font-data text-[10px]"
              >
                {step >= 2 ? "✓" : "○"}
              </motion.span>
              <span className="font-data text-[10px] text-off-white/50">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          className="flex justify-center"
        >
          <span className="font-data text-[11px] text-gold-to/30">↓</span>
        </motion.div>

        {/* SYSTEM */}
        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
          className="border border-white/[0.08] bg-white/[0.02] p-3"
        >
          <p className="font-data text-[9px] tracking-widest text-off-white/30 uppercase mb-2">System</p>
          <div className="space-y-1.5">
            {systemItems.map((item, i) => (
              <div key={item} className="flex items-center justify-between">
                <span className="font-data text-[10px] text-off-white/40">{item}</span>
                <motion.span
                  animate={{ opacity: step >= 4 ? 1 : 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* WORKING */}
        <motion.div
          animate={{ opacity: step >= 5 ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between border-t border-white/[0.06] pt-3"
        >
          <span className="font-data text-[9px] tracking-[0.16em] text-emerald-400/70 uppercase">
            Working
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-data text-[9px] text-emerald-400/50 tracking-widest uppercase">Live</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DifferentiationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const reduced = useReducedMotion();

  return (
    <section className={SEC} style={{ backgroundColor: NAVY_ALT }}>
      <Container>
        <div ref={ref} className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <FadeIn>
            <SectionLabel>Nuestra forma de hacerlo</SectionLabel>
            <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
              Nos importa que funcione.
            </h2>
            <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base">
              IBS Engine no nació para llenar una web de palabras como "IA",
              "automatización" o "digitalización".
            </p>
            <p className="text-off-white/90 mt-3 text-sm leading-relaxed sm:text-base font-medium">
              Nació ayudando.
            </p>
            <p className="text-text-secondary mt-3 text-sm leading-relaxed sm:text-base">
              Probamos soluciones. Las vimos funcionar. Y descubrimos que lo que podía
              quitarle horas de trabajo a un pequeño negocio podía hacer lo mismo en muchos otros.
            </p>
            <p className="mt-5 text-off-white font-semibold sm:text-lg">
              Si creemos que podemos ayudarte, lo construiremos. Si no, te lo diremos.
            </p>
          </FadeIn>

          <div className="flex justify-center">
            <IdeaToSystem inView={inView} reduced={reduced} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── 06 CIERRE ───────────────────────────────────────────── */

function BrandCloseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const reduced = useReducedMotion();

  const lines = [
    { text: "Porque una idea",         gold: false, delay: 0.1 },
    { text: "no cambia un negocio",     gold: true,  delay: 0.25 },
    { text: "hasta que empieza",        gold: false, delay: 0.4 },
    { text: "a funcionar.",             gold: false, delay: 0.52 },
  ] as const;

  return (
    <section className="py-16 sm:py-20 lg:py-28 text-center" style={{ backgroundColor: NAVY_MID }}>
      <Container>
        <div ref={ref} className="mx-auto max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-data text-[11px] tracking-[0.18em] text-gold-to/70 uppercase"
          >
            Ideas Become Systems
          </motion.p>

          <div className="mt-6">
            {lines.map(({ text, gold, delay }) => (
              <motion.span
                key={text}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...defaultTransition, duration: 0.6, delay: reduced ? 0 : delay }}
                className={`block font-serif font-normal leading-tight text-3xl sm:text-5xl lg:text-[3rem] ${
                  gold ? "text-gold-to" : "text-off-white"
                }`}
              >
                {text}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.7 }}
            className="text-text-secondary mt-6 text-sm sm:text-base"
          >
            IBS Engine. Ideas que se convierten en sistemas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.85 }}
            className="mt-10"
          >
            <Button href="/contacto" variant="gold">Quiero hablar con IBS</Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ─── EXPORT ──────────────────────────────────────────────── */

export function AboutPageContent() {
  return (
    <>
      <OrigenSection />
      <DiscoverySection />
      <PhilosophySection />
      <HowWeThinkSection />
      <DifferentiationSection />
      <BrandCloseSection />
    </>
  );
}
