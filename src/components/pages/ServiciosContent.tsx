"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { defaultTransition } from "@/lib/motion/variants";

const NAVY    = "#0d1e3a";
const NAVY_ALT = "#091525";
const NAVY_MID = "#132d52";

function FadeIn({ children, delay=0, className="" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.15 });
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:24 }}
      animate={inView ? { opacity:1, y:0 } : { opacity:0, y:24 }}
      transition={{ ...defaultTransition, duration:0.65, delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── ServiceBlock — estructura original ────────────────────── */
function ServiceBlock({ num, label, tagline, body, capabilities, demo, bg, flip=false }: {
  num: string; label: string; tagline: string; body: React.ReactNode;
  capabilities: string[]; demo: React.ReactNode; bg: string; flip?: boolean;
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: bg }}>
      <Container>
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <FadeIn>
            <div className="flex items-center gap-3 mb-1">
              <div className="inline-flex h-10 w-10 items-center justify-center border border-gold-to/30 bg-gold-to/[0.05]">
                <span className="font-serif text-lg font-normal text-gold-to/60">{num}</span>
              </div>
              <SectionLabel>{label}</SectionLabel>
            </div>
            <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-4xl">
              {tagline}
            </h2>
            <div className="mt-5 space-y-3 text-sm text-text-secondary leading-relaxed sm:text-base">
              {body}
            </div>
            <div className="mt-6">
              <p className="font-data text-[9px] tracking-[0.16em] text-off-white/30 uppercase mb-2">Puede encargarse de</p>
              <p className="font-data text-[10px] text-off-white/50 leading-relaxed">{capabilities.join(" · ")}</p>
            </div>
          </FadeIn>
          <div>{demo}</div>
        </div>
      </Container>
    </section>
  );
}

/* ─── DEMO 01 ──────────────────────────────────────────────── */
function IaDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once:false, amount:0.3 });
  const [step, setStep] = useState(0);
  const CHAT = [
    { from:"user", text:"¿Cuánto cuesta una revisión completa?" },
    { from:"ai",   text:"Una revisión en turismo son 89€. Incluye aceite, filtros y chequeo de 40 puntos. ¿Cuándo te viene bien?" },
    { from:"user", text:"El jueves si puede ser." },
    { from:"ai",   text:"El jueves a las 11:00 está libre. ¿Lo reservo?" },
    { from:"user", text:"Perfecto, sí." },
    { from:"ai",   text:"Cita confirmada para el jueves a las 11:00. Te mando confirmación por WhatsApp ahora mismo." },
  ];
  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const ts = CHAT.map((_,i) => setTimeout(() => setStep(i+1), 700+i*1300));
    return () => ts.forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={wrap}>
      <DemoFrame label="Motor Ruiz · Asistente IA">
        <div className="space-y-3 min-h-[200px]">
          {CHAT.slice(0,step).map((msg,i) => (
            <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              className={`flex gap-2.5 items-start ${msg.from==="user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                msg.from==="ai" ? "bg-orange-500 text-white font-bold" : "bg-slate-200 text-slate-500"
              }`}>{msg.from==="ai" ? "IA" : "C"}</div>
              <div className={`max-w-[75%] rounded-sm px-3 py-2.5 text-[13px] leading-relaxed ${
                msg.from==="ai" ? "bg-orange-50 text-slate-800 border border-orange-200" : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}>{msg.text}</div>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-2 mt-2">
          <p className="font-data text-[9px] text-slate-400 italic">Entrenada con los documentos de Motor Ruiz</p>
        </div>
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 02 ──────────────────────────────────────────────── */
function VozDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once:false, amount:0.3 });
  const [step, setStep] = useState(0);
  const LINES = [
    { label:"info", text:"Clínica Dental Norte · +34 91 XXX XX XX · Llamada en curso" },
    { label:"C",  text:"Buenas, llamaba para pedir cita con el dentista." },
    { label:"IA", text:"Claro. ¿Para qué tipo de visita? ¿Revisión, limpieza u otra cosa?" },
    { label:"C",  text:"Revisión y limpieza." },
    { label:"IA", text:"Perfecto. ¿Le va bien el miércoles a las 10:30?" },
    { label:"C",  text:"Sí, genial." },
    { label:"IA", text:"Cita confirmada. Le mando confirmación por WhatsApp ahora mismo." },
  ];
  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const ts = LINES.map((_,i) => setTimeout(() => setStep(i+1), 300+i*1100));
    return () => ts.forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={wrap}>
      <DemoFrame label="Llamada entrante · Agente IA">
        <div className="space-y-2.5 min-h-[200px]">
          {LINES.slice(0,step).map((line,i) => (
            <motion.div key={i} initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
              className={line.label==="info" ? "pb-2 mb-1 border-b border-slate-200" : "flex gap-2.5 items-start"}>
              {line.label==="info" ? (
                <p className="font-data text-[9px] text-slate-400">{line.text}</p>
              ) : (
                <>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    line.label==="IA" ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-500"
                  }`}>{line.label}</div>
                  <p className={`text-[13px] leading-relaxed pt-1 ${line.label==="IA" ? "text-slate-800 font-medium" : "text-slate-600"}`}>{line.text}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
        {step >= LINES.length && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="border-t border-slate-200 pt-3 mt-1">
            <p className="font-data text-[9px] text-amber-700/80 uppercase tracking-widest mb-2">Resumen automático</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[["Servicio","Revisión + limpieza"],["Cita","Miércoles 10:30"],["CRM","Actualizado ✓"],["WhatsApp","Enviado ✓"]].map(([k,v]) => (
                <div key={k}><span className="font-data text-[9px] text-slate-400">{k} · </span><span className="font-data text-[9px] font-medium text-slate-700">{v}</span></div>
              ))}
            </div>
            <p className="font-data text-[10px] text-slate-500 italic mt-3">Tú no cogiste el teléfono.</p>
          </motion.div>
        )}
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 03 ──────────────────────────────────────────────── */
function AutomatizacionDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once:false, amount:0.3 });
  const [step, setStep] = useState(0);
  const EVENTS = [
    {time:"09:00", text:"Presupuesto recibido · Registrado en CRM"},
    {time:"09:01", text:"Cliente creado · Email de confirmación enviado"},
    {time:"09:02", text:"Documento PDF generado · Enviado al cliente"},
    {time:"+48h",  text:"Sin respuesta detectada · Alerta activada"},
    {time:"+48h",  text:"Seguimiento automático por WhatsApp"},
    {time:"+49h",  text:"Cliente responde · CRM actualizado"},
  ];
  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const ts = EVENTS.map((_,i) => setTimeout(() => setStep(i+1), 500+i*950));
    return () => ts.forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={wrap}>
      <DemoFrame label="Un día sin intervención humana">
        <div className="space-y-1.5">
          {EVENTS.map((evt,i) => {
            const done = step > i;
            const active = step === i;
            return (
              <motion.div key={i}
                animate={{ opacity: done ? 1 : active ? 0.7 : 0.25 }}
                initial={{ opacity: 0.25 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm border transition-all duration-500 ${
                  done  ? "border-emerald-200 bg-emerald-50" :
                  active ? "border-orange-200 bg-orange-50" :
                           "border-slate-100 bg-transparent"
                }`}
              >
                <div className={`h-2 w-2 rounded-full shrink-0 ${
                  done  ? "bg-emerald-500" :
                  active ? "bg-orange-400 animate-pulse" :
                           "bg-slate-300"
                }`} />
                <span className="font-data text-[10px] text-slate-400 w-10 shrink-0 tabular-nums">{evt.time}</span>
                <span className={`text-[12px] leading-relaxed flex-1 ${
                  done ? "text-slate-800 font-medium" : "text-slate-400"
                }`}>{evt.text}</span>
                {done && (
                  <motion.span initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}}
                    className="font-data text-[10px] text-emerald-600 shrink-0 font-medium">✓</motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
        {step >= EVENTS.length && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
            className="mt-3 border-t border-slate-200 pt-3 flex items-center justify-between">
            <span className="font-data text-[10px] text-slate-400">Completado</span>
            <span className="font-data text-[10px] text-emerald-600 font-medium">6 acciones · 0 intervenciones ✓</span>
          </motion.div>
        )}
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 04 ──────────────────────────────────────────────── */
function SistemasDemo() {
  const MODS = [
    {id:"crm",label:"CRM",on:true},{id:"presup",label:"Presupuestos",on:true},
    {id:"trabajos",label:"Trabajos",on:true},{id:"agenda",label:"Agenda",on:true},
    {id:"equipo",label:"Equipo",on:false},{id:"portal",label:"Portal cliente",on:false},
    {id:"ia",label:"IA integrada",on:false},{id:"automat",label:"Automatización",on:false},
  ];
  const [active, setActive] = useState<Set<string>>(new Set(MODS.filter(m=>m.on).map(m=>m.id)));
  return (
    <DemoFrame label="Construimos lo que necesitas">
      <p className="font-data text-[10px] text-slate-400 uppercase tracking-widest mb-3">Módulos activos · toca para cambiar</p>
      <div className="grid grid-cols-2 gap-2">
        {MODS.map(m => {
          const on = active.has(m.id);
          return (
            <button key={m.id}
              onClick={() => setActive(prev => { const n=new Set(prev); on?n.delete(m.id):n.add(m.id); return n; })}
              className={`flex items-center gap-2 rounded-sm border px-3 py-2.5 text-left transition-all duration-200 ${
                on ? "border-amber-300 bg-amber-50 text-slate-800" : "border-slate-200 bg-white text-slate-500"
              }`}>
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${on ? "bg-amber-500/70" : "bg-slate-300"}`} />
              <span className="font-data text-[11px]">{m.label}</span>
            </button>
          );
        })}
      </div>
      <p className="font-data text-[9px] text-slate-400 mt-4">{active.size} módulo{active.size!==1?"s":""} activo{active.size!==1?"s":""}</p>
    </DemoFrame>
  );
}

/* ─── DEMO 05 ──────────────────────────────────────────────── */
function CrecimientoDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once:false, amount:0.3 });
  const [active, setActive] = useState(-1);

  const STEPS = [
    {label:"BUSCA",      sub:'"taller cerca de mí"',          emoji:"🔍", gold:false},
    {label:"ENCUENTRA",  sub:"Tu web · Google · Maps",         emoji:"🌐", gold:false},
    {label:"CONTACTA",   sub:"WhatsApp o llamada directa",     emoji:"💬", gold:false},
    {label:"IBS ENGINE", sub:"Registra · Atiende · Agenda",    emoji:"⚙️", gold:true},
    {label:"CLIENTE",    sub:"Cita confirmada automáticamente", emoji:"✅", gold:false},
    {label:"RESEÑA",     sub:"Ciclo cerrado · Boca a boca",    emoji:"⭐", gold:false},
  ];

  useEffect(() => {
    if (!inView) { setActive(-1); return; }
    let i = 0;
    const next = () => { setActive(i); i++; if (i <= STEPS.length) setTimeout(next, i === STEPS.length ? 2000 : 700); else setActive(-1); };
    const t = setTimeout(next, 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={wrap}>
      <DemoFrame label="De visitante a cliente">
        <div className="space-y-0">
          {STEPS.map((s,i) => (
            <div key={s.label} className="flex flex-col">
              <motion.div
                animate={{
                  opacity: active === -1 ? 1 : active >= i ? 1 : 0.3,
                  scale: active === i ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-300 ${
                  active === i ? "border border-orange-300 bg-orange-50 shadow-sm" :
                  active > i  ? (s.gold ? "border border-amber-200 bg-amber-50" : "border border-emerald-100 bg-emerald-50/40") :
                  s.gold ? "border border-amber-200/40 bg-amber-50/20" : ""
                }`}>
                <span className="text-xl shrink-0">{s.emoji}</span>
                <div className="flex-1">
                  <p className={`font-data text-[11px] font-medium tracking-wide ${
                    active === i ? "text-orange-700" : s.gold ? "text-amber-800" : "text-slate-700"
                  }`}>{s.label}</p>
                  <p className="font-data text-[9px] text-slate-400">{s.sub}</p>
                </div>
                {active > i && (
                  <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-emerald-500 text-[13px]">✓</motion.span>
                )}
              </motion.div>
              {i < STEPS.length-1 && (
                <motion.div
                  animate={{ backgroundColor: active > i ? "#34d399" : "#e2e8f0" }}
                  className="ml-7 h-3 w-px"
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>
          ))}
        </div>
      </DemoFrame>
    </div>
  );
}

/* ─── DEMO 06 ──────────────────────────────────────────────── */
function DatosDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once:false, amount:0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) { setStep(0); return; }
    const t1=setTimeout(()=>setStep(1),400), t2=setTimeout(()=>setStep(2),1400), t3=setTimeout(()=>setStep(3),2600);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={wrap}>
      <DemoFrame label="Motor Ruiz · Panel de hoy">
        <div className="border-b border-slate-200 pb-3 mb-3">
          <p className="font-data text-[10px] text-slate-400 uppercase tracking-widest">Buenos días, Juan.</p>
          <p className="text-[12px] text-slate-500 mt-0.5">Esto es lo que ha pasado mientras no estabas.</p>
        </div>
        {step >= 1 && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mb-4">
            <p className="font-data text-[9px] text-slate-400 uppercase tracking-widest mb-2">Ayer</p>
            <div className="space-y-1.5">
              {["📥  2 solicitudes nuevas — WhatsApp y web","📅  1 cita confirmada automáticamente","📄  €890 en presupuestos enviados"].map(t=>(
                <p key={t} className="text-[12px] text-slate-700">{t}</p>
              ))}
            </div>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} className="mb-4 border-t border-slate-200 pt-3">
            <p className="font-data text-[9px] text-amber-700/80 uppercase tracking-widest mb-2">IBS ha actuado</p>
            <div className="space-y-2">
              {["→  Luis García · 4 días sin respuesta · WhatsApp enviado 10:23","→  Pedro Martín · Cita cancelada · Recordatorio enviado"].map(t=>(
                <p key={t} className="text-[12px] text-slate-700 border-l-2 border-amber-400/50 pl-2">{t}</p>
              ))}
            </div>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} className="border-t border-slate-200 pt-3">
            <p className="font-data text-[9px] text-slate-400 uppercase tracking-widest mb-2">IBS detecta</p>
            <p className="text-[12px] text-slate-600 leading-relaxed">3 clientes sin seguimiento en 14 días. Los presupuestos del viernes cierran la mitad que los del martes.</p>
          </motion.div>
        )}
      </DemoFrame>
    </div>
  );
}

/* ─── HEADER ─────────────────────────────────────────────────── */
export function ServiciosHeader() {
  return (
    <section className="py-20 sm:py-28 lg:py-32" style={{ backgroundColor: NAVY_MID }}>
      <Container>
        <div className="max-w-2xl">
          <p className="font-data text-[10px] tracking-[0.2em] text-gold-to/70 uppercase">Lo que hacemos</p>
          <h1 className="font-serif mt-4 text-4xl font-normal text-off-white sm:text-5xl lg:text-[3.5rem] leading-tight">
            Tu negocio tiene un problema.{" "}
            <span className="text-gold-to">Nosotros construimos la solución.</span>
          </h1>
          <p className="mt-6 text-text-secondary text-sm leading-relaxed sm:text-base max-w-xl">
            No te vendemos tecnología. Te quitamos trabajo. Desde una IA que conoce tu empresa hasta un sistema construido alrededor de cómo trabajas. Primero entendemos el problema. Después construimos lo que tiene sentido.
          </p>
          <div className="mt-8">
            <Button href="/contacto" variant="gold">Quiero ver qué podemos hacer</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── CONTENT ────────────────────────────────────────────────── */
const SERVICES = [
  { num:"01", label:"Inteligencia Artificial", bg:NAVY,
    tagline:"Una IA que conoce tu negocio. No la de todo el mundo. La tuya.",
    body:<><p>Construimos una IA conectada al conocimiento de tu empresa: tus procesos, tarifas, clientes y documentos.</p><p>No es ChatGPT con tu logo. Es una IA que conoce cómo funciona tu empresa y puede atender, orientar, presupuestar y derivar. A cualquier hora.</p></>,
    capabilities:["Atención al cliente","Respuesta a consultas","Presupuestación","Derivación inteligente"], demo:<IaDemo /> },
  { num:"02", label:"Agentes de Voz", bg:NAVY_ALT, flip:true,
    tagline:"Tu teléfono también puede trabajar. Sin que tú lo cojas.",
    body:<><p>Cada llamada que no contestas puede ser un cliente que acaba llamando a otro.</p><p>Un agente de voz atiende la llamada, identifica al cliente, consulta tu agenda, reserva la cita y lo registra en el CRM. En tiempo real. No es un contestador. Es una conversación real.</p></>,
    capabilities:["Atención de llamadas","Gestión de agenda","Registro en CRM","Confirmación automática"], demo:<VozDemo /> },
  { num:"03", label:"Automatización", bg:NAVY,
    tagline:"Deja de ser el que conecta los puntos.",
    body:<><p>En la mayoría de negocios hay una persona que hace de puente: recibe el mensaje, lo apunta, lo pasa, hace el seguimiento.</p><p>Ese trabajo no necesita a una persona. Necesita un sistema.</p></>,
    capabilities:["Captación","Respuesta inicial","Seguimiento","Recordatorios","CRM"], demo:<AutomatizacionDemo /> },
  { num:"04", label:"Sistemas a Medida", bg:NAVY_ALT, flip:true,
    tagline:"Un sistema construido alrededor de cómo trabajas tú. No al revés.",
    body:<><p>Las herramientas genéricas te piden que adaptes tu forma de trabajar a las suyas. Nosotros hacemos lo contrario.</p><p>Puede ser una herramienta interna, un portal para clientes o una aplicación diseñada alrededor de un proceso concreto.</p></>,
    capabilities:["CRM","Presupuestos","Trabajos","Agenda","Equipo","Portal cliente","IA","Automatizaciones"], demo:<SistemasDemo /> },
  { num:"05", label:"Crecimiento y Presencia Digital", bg:NAVY,
    tagline:"Que te encuentren. Que confíen. Que llamen.",
    body:<><p>De nada sirve tener un sistema impecable por dentro si nadie llega hasta ti.</p><p>Construimos tu presencia digital pensando en el ciclo completo: desde que alguien busca lo que haces hasta que te llama o pide cita. Y todo queda conectado al sistema.</p></>,
    capabilities:["Web orientada a conversión","SEO local","Google Business","Gestión de reseñas"], demo:<CrecimientoDemo /> },
  { num:"06", label:"Datos y Control", bg:NAVY_ALT, flip:true,
    tagline:"Los datos sirven para decidir. No para llenar dashboards.",
    body:<><p>La mayoría de empresas tienen datos. Pocos saben qué significan.</p><p>Construimos un panel donde puedes ver en tiempo real qué entra, qué sale y dónde está el cuello de botella. No te entrega datos. Te ayuda a saber qué hacer con ellos.</p></>,
    capabilities:["Dashboard por sector","Métricas de captación","Alertas automáticas","Análisis IA"], demo:<DatosDemo /> },
] as const;

export function ServiciosContent() {
  return (
    <>
      {SERVICES.map(s => <ServiceBlock key={s.num} {...s as any} />)}
      <section className="py-24 sm:py-32 lg:py-40" style={{ backgroundColor:"#0d1e3a" }}>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <p className="font-data text-[10px] tracking-[0.2em] text-gold-to/60 uppercase">Por dónde empezar</p>
              <h2 className="font-serif mt-4 text-3xl font-semibold text-off-white sm:text-4xl lg:text-[3rem] leading-tight">
                No necesitas los seis.
              </h2>
              <p className="text-text-secondary mt-5 text-sm leading-relaxed sm:text-base max-w-sm">
                Cada empresa tiene un problema distinto. Primero entendemos cómo trabajas. Después decidimos qué merece la pena construir.
              </p>
              <div className="mt-8"><Button href="/contacto" variant="gold">Solicitar auditoría</Button></div>
            </div>
            <div>
              {[
                {n:"01", t:"Auditoría gratuita", d:"Nos sentamos contigo y entendemos cómo trabajas y dónde se pierde tiempo.", icon:"🔍"},
                {n:"02", t:"Identificamos el problema", d:"Qué está frenando el negocio. Qué cuesta dinero. Qué se puede automatizar.", icon:"🎯"},
                {n:"03", t:"Proponemos qué construir", d:"Solo lo que tiene sentido para ti. Sin paquetes prefabricados.", icon:"🛠"},
                {n:"04", t:"Lo construimos", d:"Rápido. Y no desaparecemos después.", icon:"✓"},
              ].map((item,i) => (
                <div key={item.n} className={`flex gap-5 items-start py-5 ${i>0 ? "border-t border-white/[0.06]" : ""}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold-to/30 bg-gold-to/[0.06]">
                    <span className="font-serif text-base font-normal text-gold-to/60">{item.n}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <p className="font-data text-[12px] font-medium text-off-white/80 uppercase tracking-wide">{item.t}</p>
                    </div>
                    <p className="font-data text-[11px] text-off-white/35 mt-1.5 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
