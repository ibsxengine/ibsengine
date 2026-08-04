"use client";

import { PILOT_PROJECTS, PROJECT_CATEGORIES, type PilotProject } from "@/lib/content/pilot-projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { defaultTransition } from "@/lib/motion/variants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function ProjectsPageContent() {
  const [filtro, setFiltro] = useState<(typeof PROJECT_CATEGORIES)[number]>("Todos");
  const [selected, setSelected] = useState<PilotProject | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const filtered =
    filtro === "Todos" ? PILOT_PROJECTS : PILOT_PROJECTS.filter((p) => p.cat === filtro);

  function openProject(p: PilotProject) {
    setSelected(p);
    setImgIdx(0);
  }

  return (
    <>
      <section
        className="sticky top-[4.25rem] z-20 border-b border-white/[0.06] sm:top-[4.5rem]"
        style={{ backgroundColor: "rgb(21 50 91 / 0.96)" }}
      >
        <Container className="flex flex-wrap items-center gap-2 py-4">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltro(cat)}
              className={`rounded-sm px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-300 ${
                filtro === cat
                  ? "bg-gold-from/20 text-gold-to"
                  : "text-text-secondary hover:bg-white/[0.04] hover:text-off-white"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-text-secondary">
            {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
          </span>
        </Container>
      </section>

      <section className="section-solid py-12 sm:py-16" style={{ backgroundColor: "#15325B" }}>
        <Container>
          <motion.div layout className="grid gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ ...defaultTransition, delay: i * 0.05 }}
                  onClick={() => openProject(p)}
                  className={`group relative cursor-pointer overflow-hidden ${
                    p.size === "large" ? "sm:col-span-2 sm:min-h-[280px]" : "min-h-[240px]"
                  }`}
                >
                  <Image
                    src={p.imgs[0]}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a30]/95 via-[#0d1a30]/25 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 flex h-[3px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex-1 bg-gold-from" />
                    <div className="flex-1 bg-white/20" />
                    <div className="flex-1 bg-gold-to" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                    <p className="eyebrow text-[0.65rem]">
                      {p.cat} · {p.year}
                    </p>
                    <h2 className="font-serif mt-2 text-xl text-off-white sm:text-2xl">{p.title}</h2>
                    <p className="text-text-secondary mt-1 text-xs">{p.sector}</p>
                    <div className="mt-3 h-px w-0 bg-gold-from transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1a30]/92 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm bg-[#15325B]"
            >
              <div className="relative h-64 shrink-0 overflow-hidden sm:h-72">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={selected.imgs[imgIdx]}
                      alt={selected.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-0 left-0 right-0 flex h-[3px]">
                  <div className="flex-1 bg-gold-from" />
                  <div className="flex-1 bg-white/20" />
                  <div className="flex-1 bg-gold-to" />
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-off-white text-navy transition-colors hover:bg-gold-from hover:text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
                {selected.imgs.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setImgIdx((i) => (i - 1 + selected.imgs.length) % selected.imgs.length)
                      }
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-navy/60 px-3 py-2 text-off-white backdrop-blur-sm hover:bg-gold-from"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setImgIdx((i) => (i + 1) % selected.imgs.length)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-navy/60 px-3 py-2 text-off-white backdrop-blur-sm hover:bg-gold-from"
                    >
                      →
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                      {selected.imgs.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImgIdx(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === imgIdx ? "w-5 bg-gold-from" : "w-1.5 bg-white/40"
                          }`}
                          aria-label={`Imagen ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="overflow-y-auto p-6 sm:p-8">
                <p className="eyebrow text-[0.65rem]">
                  {selected.cat} · {selected.year} · {selected.sector}
                </p>
                <h2 className="font-serif mt-3 text-2xl text-off-white sm:text-3xl">{selected.title}</h2>
                <div className="mt-6 flex gap-8 border-y border-white/[0.08] py-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-secondary">Alcance</p>
                    <p className="font-serif mt-1 text-xl text-off-white">{selected.metric}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-secondary">Fase</p>
                    <p className="font-serif mt-1 text-xl text-off-white">{selected.phase}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-secondary">Estado</p>
                    <p className="font-serif mt-1 text-xl text-emerald-400">{selected.status}</p>
                  </div>
                </div>
                <p className="text-text-secondary mt-6 text-sm leading-relaxed">{selected.desc}</p>
                <div className="mt-8">
                  <Button href="/contacto" variant="gold">
                    Quiero un piloto similar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section-solid py-16 sm:py-20" style={{ backgroundColor: "#122847" }}>
        <Container className="text-center">
          <h2 className="font-serif text-2xl text-off-white sm:text-3xl">¿Quieres ser el próximo piloto?</h2>
          <p className="text-text-secondary mx-auto mt-3 max-w-md text-sm">
            Buscamos negocios de distintos sectores para validar el sistema contigo.
          </p>
          <div className="mt-8">
            <Button href="/contacto" variant="gold">
              Hablar con nosotros
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
