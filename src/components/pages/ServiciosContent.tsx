"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultTransition } from "@/lib/motion/variants";
import { DemoFrame } from "@/components/demos/DemoFrame";

/* ─── Tokens ────────────────────────────────────────────────── */
const NAVY     = "#0d1e3a";
const NAVY_ALT = "#091525";
const NAVY_MID = "#132d52";

/* ─── FadeIn ─────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ ...defaultTransition, duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Service block wrapper ──────────────────────────────────── */
function ServiceBlock({
  num, label, tagline, body, capabilities, demo, bg, flip = false,
}: {
  num: string; label: string; tagline: string; body: React.ReactNode;
  capabilities: string[]; demo: React.ReactNode;
  bg: string; flip?: boolean;
}) {
  return (
    <section className="py-20 sm:py-24 lg:py-28" style={{ backgroundColor: bg }}>
      <Container>
        <div className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <FadeIn>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bodoni text-5xl font-normal text-gold-to/20 leading-none">{num}</span>
              <span className="font-data text-[10px] tracking-[0.2em] text-gold-to/60 uppercase">{label}</span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-off-white sm:text-3xl lg:text-4xl leading-tight">
              {tagline}
            </h2>
            <div className="mt-5 space-y-3 text-sm text-text-secondary leading-relaxed sm:text-base">
              {body}
            </div>
            <div className="mt-7 pt-5 border-t border-white/[0.06]">
              <p className="font-data text-[9px] tracking-[0.18em] text-off-white/25 uppercase mb-2">
                Puede encargarse de
              </p>
              <p className="text-xs text-off-white/40 leading-relaxed">
                {capabilities.join(" · ")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            {demo}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ─── DEMO 01: IA PRIVADA ────────────────────────────────────── */
function IaPrivadaDemo() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  const CHAT = [
    { from: "user", text: "¿Cuánto cuesta una revisión completa del coche?" },
    { from: "ai",   text: "Una revisión completa en turismo son 89€ e incluye cambio de aceite, filtros, frenos y chequeo de 40 puntos. ¿Te digo las plazas disponibles esta semana?" },
    { from: "user", text: "Sí, el jueves si puede ser." },
    { from: "ai",   text: "El jueves a las 11:00 hay hueco. ¿Lo reservo a tu nombre?" },
  ];

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = CHAT.map((_, i) => setTimeout(() => setStep(i + 1), 800 + i * 1200));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref}>
      <DemoFrame label="IA privada · Motor Ruiz">
        <div className="space-y-3 min-h-[200px]">
          {CHAT.slice(0, step).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[82%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-[color:var(--shell-border)] text-[color:var(--shell-ink-muted)]"
                  : "border border-[color:var(--shell-border)] bg-[color:var(--shell-panel-inner)] text-[color:var(--shell-ink)]"
              }`}>
                {msg.from === "ai" && (
                  <p className="font-data text-[8px] tracking-widest text-[color:var(--shell-ink-muted)] uppercase mb-1">Motor Ruiz · IA</p>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[color:var(--shell-border)]">
          <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] italic">
            Entrenada con los documentos del negocio
          </p>
        </div>
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 02: AGENTES DE VOZ ──────────────────────────────────── */
function AgentesVozDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [step, setStep] = useState(0);

  const LINES = [
    { label: "Llamada", text: "Clínica Dental Óptica Norte · +34 91 XXX XX XX", meta: true },
    { label: "Cliente", text: "Buenas, llamaba para pedir cita con el dentista." },
    { label: "IA",      text: "Claro, ¿para qué tipo de visita? ¿Revisión, limpieza u otra cosa?" },
    { label: "Cliente", text: "Revisión y limpieza." },
    { label: "IA",      text: "Perfecto. ¿Le va bien el miércoles a las 10:30?" },
    { label: "Cliente", text: "Sí, genial." },
    { label: "IA",      text: "Cita confirmada. Le mando la confirmación por WhatsApp ahora mismo." },
  ];

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = LINES.map((_, i) => setTimeout(() => setStep(i + 1), 400 + i * 1000));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref}>
      <DemoFrame label="Agente de voz · Clínica Dental">
        <div className="space-y-2.5 min-h-[200px]">
          {LINES.slice(0, step).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={line.meta ? "border-b border-[color:var(--shell-border)] pb-2 mb-1" : "flex gap-3 items-start"}
            >
              {line.meta ? (
                <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)]">{line.text}</p>
              ) : (
                <>
                  <span className={`font-data text-[9px] uppercase tracking-widest w-10 shrink-0 mt-0.5 font-medium ${
                    line.label === "IA" ? "text-[color:var(--shell-ink)]" : "text-[color:var(--shell-ink-muted)]"
                  }`}>{line.label}</span>
                  <p className="text-sm text-[color:var(--shell-ink)] leading-relaxed">{line.text}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {step >= LINES.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 border-t border-[color:var(--shell-border)] pt-3"
          >
            <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] uppercase tracking-widest mb-2">Resumen</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[["Servicio", "Revisión + limpieza"], ["Cita", "Miércoles 10:30"], ["CRM", "Actualizado ✓"], ["WhatsApp", "Confirmación enviada"]].map(([k, v]) => (
                <div key={k}>
                  <span className="font-data text-[9px] text-[color:var(--shell-ink-muted)]">{k} · </span>
                  <span className="font-data text-[9px] text-[color:var(--shell-ink)]">{v}</span>
                </div>
              ))}
            </div>
            <p className="font-data text-[10px] text-[color:var(--shell-ink-muted)] italic mt-3">Tú no cogiste el teléfono.</p>
          </motion.div>
        )}
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 03: AUTOMATIZACIÓN ──────────────────────────────────── */
function AutomatizacionDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [step, setStep] = useState(0);

  const EVENTS = [
    { time: "09:00", text: "Presupuesto recibido · Registrado en CRM",    auto: true },
    { time: "09:01", text: "Cliente creado · Email de confirmación enviado", auto: true },
    { time: "09:02", text: "Documento generado · PDF enviado al cliente",   auto: true },
    { time: "+48h",  text: "Sin respuesta detectada · Alerta activada",     auto: true },
    { time: "+48h",  text: "Seguimiento automático por WhatsApp",           auto: true },
    { time: "+49h",  text: "Cliente responde · CRM actualizado",            auto: true },
  ];

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const timers = EVENTS.map((_, i) => setTimeout(() => setStep(i + 1), 600 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <DemoFrame ref={ref} label="Un día de trabajo · sin intervención" className="shadow-[0_8px_48px_rgba(0,0,0,0.45)]">
      <div className="space-y-0">
        {EVENTS.map((evt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={step > i ? { opacity: 1 } : { opacity: 0.15 }}
            transition={{ duration: 0.4 }}
            className="flex gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
          >
            <span className="font-data text-[9px] text-off-white/25 w-10 shrink-0 tabular-nums mt-0.5">{evt.time}</span>
            <span className="font-data text-[10px] text-off-white/55 leading-relaxed flex-1">{evt.text}</span>
            {step > i && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400/60 text-[10px] shrink-0">✓</motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </DemoFrame>
  );
}

/* ─── DEMO 04: SISTEMAS A MEDIDA ──────────────────────────────── */
function SistemasDemo() {
  const MODULES = [
    { id: "crm",       label: "CRM",           on: true },
    { id: "presup",    label: "Presupuestos",   on: true },
    { id: "trabajos",  label: "Trabajos",       on: true },
    { id: "agenda",    label: "Agenda",         on: true },
    { id: "equipo",    label: "Equipo",         on: false },
    { id: "portal",    label: "Portal cliente", on: false },
    { id: "ia",        label: "IA",             on: false },
    { id: "automat",   label: "Automatización", on: false },
  ];
  const [active, setActive] = useState<Set<string>>(new Set(MODULES.filter(m => m.on).map(m => m.id)));

  return (
    <DemoFrame label="Construimos lo que necesitas" className="shadow-[0_8px_48px_rgba(0,0,0,0.45)]">
      <div>
        <p className="font-data text-[9px] text-off-white/25 uppercase tracking-widest mb-3">Módulos activos</p>
        <div className="grid grid-cols-2 gap-2">
          {MODULES.map((m) => {
            const on = active.has(m.id);
            return (
              <button
                key={m.id}
                onClick={() => setActive(prev => {
                  const next = new Set(prev);
                  on ? next.delete(m.id) : next.add(m.id);
                  return next;
                })}
                className={`flex items-center gap-2 border rounded-sm px-3 py-2 text-left transition-all duration-200 ${
                  on
                    ? "border-gold-to/30 bg-gold-to/[0.06] text-off-white/70"
                    : "border-white/[0.06] bg-white/[0.01] text-off-white/25"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${on ? "bg-gold-to/70" : "bg-white/15"}`} />
                <span className="font-data text-[10px]">{m.label}</span>
              </button>
            );
          })}
        </div>
        <p className="font-data text-[9px] text-[color:var(--shell-ink-muted)] mt-4 italic">
          {active.size} módulo{active.size !== 1 ? "s" : ""} activo{active.size !== 1 ? "s" : ""} · Toca para cambiar
        </p>
      </div>
    </DemoFrame>
  );
}

/* ─── DEMO 05: CRECIMIENTO ─────────────────────────────────────── */
function CrecimientoDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  const STEPS = [
    { label: "BUSCA",     sub: '"taller cerca de mí"',          icon: "🔍" },
    { label: "ENCUENTRA", sub: "Google · Web · Maps",           icon: "🌐" },
    { label: "CONTACTA",  sub: "WhatsApp · Llamada",            icon: "💬" },
    { label: "IBS ENGINE",sub: "Registra · Atiende · Agenda",   icon: "⚙" },
    { label: "CLIENTE",   sub: "Cita confirmada",               icon: "✓" },
    { label: "RESEÑA",    sub: "Ciclo cerrado",                 icon: "★" },
  ];

  return (
    <DemoFrame ref={ref} label="De visitante a cliente" className="shadow-[0_8px_48px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-0">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className={`flex items-center gap-3 px-3 py-2 w-full ${
                s.label === "IBS ENGINE" ? "border border-gold-to/30 bg-gold-to/[0.06]" : ""
              }`}
            >
              <span className="text-sm">{s.icon}</span>
              <div>
                <p className={`font-data text-[10px] font-medium tracking-widest uppercase ${
                  s.label === "IBS ENGINE" ? "text-gold-to" : "text-off-white/60"
                }`}>{s.label}</p>
                <p className="font-data text-[9px] text-off-white/30">{s.sub}</p>
              </div>
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className="ml-5 h-4 w-px bg-white/[0.06]" />
            )}
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

/* ─── DEMO 06: DATOS ──────────────────────────────────────────── */
function DatosDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [step, setStep] = useState(0);

  const METRICS = [
    { label: "+18%", sub: "solicitudes este mes" },
    { label: "-23%", sub: "tiempo de respuesta" },
    { label: "+11%", sub: "conversión" },
    { label: "€8.4k", sub: "oportunidades activas" },
  ];

  const INSIGHTS = [
    "Los leads de WhatsApp convierten un 31% más que los del formulario.",
    "12 clientes no han recibido seguimiento en los últimos 14 días.",
    "Los presupuestos enviados el viernes tienen menor cierre.",
  ];

  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1600);
    return () => [t1, t2].forEach(clearTimeout);
  }, [inView]);

  return (
    <DemoFrame ref={ref} label="Panel · Este mes" className="shadow-[0_8px_48px_rgba(0,0,0,0.45)]">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              animate={step >= 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/[0.06] px-3 py-2"
            >
              <p className="font-serif text-2xl font-semibold text-off-white">{m.label}</p>
              <p className="font-data text-[9px] text-off-white/35">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-data text-[9px] text-gold-to/60 uppercase tracking-widest mb-2">IBS detecta</p>
              <div className="space-y-2">
                {INSIGHTS.map((ins, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-2 items-start"
                  >
                    <span className="font-data text-[9px] text-gold-to/50 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-data text-[10px] text-off-white/50 leading-relaxed">{ins}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DemoFrame>
  );
}

/* ─── SERVICES ────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01", label: "Inteligencia Artificial", bg: NAVY,
    tagline: "Una IA que conoce tu negocio. No la de todo el mundo. La tuya.",
    body: <>
      <p>Construimos una IA conectada al conocimiento de tu empresa: tus procesos, tarifas, clientes y documentos.</p>
      <p>No es ChatGPT con tu logo. Es una IA que conoce cómo funciona tu empresa y puede atender, orientar, presupuestar y derivar. A cualquier hora. Sin que nadie tenga que estar delante.</p>
    </>,
    capabilities: ["Atención al cliente", "Respuesta a consultas", "Presupuestación automática", "Derivación inteligente"],
    demo: <IaPrivadaDemo />,
  },
  {
    num: "02", label: "Agentes de Voz", bg: NAVY_ALT, flip: true,
    tagline: "Tu teléfono también puede trabajar. Sin que tú lo cojas.",
    body: <>
      <p>Cada llamada que no contestas puede ser un cliente que acaba llamando a otro.</p>
      <p>Un agente de voz de IBS atiende la llamada, identifica al cliente, consulta tu agenda, reserva la cita y lo registra en el CRM. En tiempo real. Sin intervención humana.</p>
      <p>No es un contestador automático. Es una conversación real.</p>
    </>,
    capabilities: ["Atención de llamadas", "Gestión de agenda", "Registro en CRM", "Confirmación y recordatorio"],
    demo: <AgentesVozDemo />,
  },
  {
    num: "03", label: "Automatización", bg: NAVY,
    tagline: "Deja de ser el que conecta los puntos.",
    body: <>
      <p>En la mayoría de negocios hay una persona que hace de puente entre todo: recibe el mensaje, lo apunta, lo pasa, hace el seguimiento, recuerda lo que nadie recuerda.</p>
      <p>Ese trabajo no necesita a una persona. Necesita un sistema. Conectamos las herramientas que ya usas y hacemos que funcionen juntas sin que nadie tenga que intervenir.</p>
    </>,
    capabilities: ["Captación", "Respuesta inicial", "Seguimiento", "Recordatorios", "Documentos", "CRM"],
    demo: <AutomatizacionDemo />,
  },
  {
    num: "04", label: "Sistemas a Medida", bg: NAVY_ALT, flip: true,
    tagline: "Un sistema construido alrededor de cómo trabajas tú. No al revés.",
    body: <>
      <p>Las herramientas genéricas te piden que adaptes tu forma de trabajar a las suyas. Nosotros hacemos lo contrario.</p>
      <p>Puede ser una herramienta interna, un portal para clientes, un sistema de gestión o una aplicación diseñada alrededor de un proceso concreto.</p>
    </>,
    capabilities: ["CRM", "Presupuestos", "Trabajos", "Agenda", "Equipo", "Portal cliente", "IA", "Automatizaciones"],
    demo: <SistemasDemo />,
  },
  {
    num: "05", label: "Crecimiento y Presencia Digital", bg: NAVY,
    tagline: "Que te encuentren. Que confíen. Que llamen.",
    body: <>
      <p>De nada sirve tener un sistema impecable por dentro si nadie llega hasta ti.</p>
      <p>Construimos tu presencia digital pensando en el ciclo completo: desde que alguien busca lo que haces hasta que te llama, te escribe o pide cita.</p>
      <p>Y todo queda conectado al sistema. El cliente que llega desde Google puede entrar directamente en tu CRM, activar una automatización o hablar con tu IA.</p>
    </>,
    capabilities: ["Web orientada a conversión", "SEO local", "Google Business", "Gestión de reseñas", "Redes cuando tiene sentido"],
    demo: <CrecimientoDemo />,
  },
  {
    num: "06", label: "Datos y Control", bg: NAVY_ALT, flip: true,
    tagline: "Los datos sirven para decidir. No para llenar dashboards.",
    body: <>
      <p>La mayoría de empresas tienen datos. Pocos saben qué significan.</p>
      <p>Construimos un panel donde puedes ver en tiempo real qué entra, qué sale, dónde está el cuello de botella y qué oportunidades se están perdiendo. Y cuando el sistema detecta algo relevante, te avisa.</p>
      <p>No te entrega datos. Te ayuda a saber qué hacer con ellos.</p>
    </>,
    capabilities: ["Dashboard por sector", "Métricas de captación", "Alertas automáticas", "Análisis IA", "Informes cuando tienen sentido"],
    demo: <DatosDemo />,
  },
] as const;

export function ServiciosContent() {
  return (
    <>
      {SERVICES.map((s) => (
        <ServiceBlock key={s.num} {...s} />
      ))}

      {/* CIERRE */}
      <section className="py-24 sm:py-32" style={{ backgroundColor: NAVY_MID }}>
        <Container>
          <div className="max-w-xl">
            <p className="font-data text-[10px] tracking-[0.2em] text-gold-to/60 uppercase">Por dónde empezar</p>
            <h2 className="font-serif mt-4 text-3xl font-normal text-off-white sm:text-4xl leading-tight">
              No necesitas los seis.
            </h2>
            <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base">
              Cada empresa tiene un problema distinto.
              Primero entendemos cómo trabajas.
              Después decidimos qué merece la pena construir.
            </p>
            <div className="mt-8">
              <Button href="/contacto" variant="gold">Solicitar auditoría</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
