"use client";

import React from "react";

/**
 * Tres grupos según viewport:
 *
 * MOBILE (< 768px):
 *   3 mini-cubos solo arriba del título (máscara vertical).
 *
 * TABLET PORTRAIT + MOBILE LANDSCAPE (768-1023px):
 *   Solo cubos en márgenes RIGHT estrictos (96-98%) — el izquierdo
 *   no tiene margen libre en layout single-column.
 *
 * DESKTOP / TABLET LANDSCAPE (≥ 1024px):
 *   Set completo: sub-columna 1 izquierda (1-4%), centro, derecha.
 *   Sub-columnas 2 y 3 eliminadas — siempre están dentro del texto.
 */

/* ── DESKTOP cubes (lg+) ─────────────────────────────────────── */
const DESKTOP_CUBES = [
  // ZONA 1 (2-4%) — aparecer rápido, tamaños grandes
  { left: "3%",   top: "8%",  size: 38, delay: 0,    dur: 12, anchor: "tl" as const },
  { left: "2%",   top: "72%", size: 20, delay: 2.5,  dur: 10, anchor: "bl" as const },

  // ZONA 2 (8-10%) — medianos, delays moderados
  { left: "9%",   top: "25%", size: 28, delay: 1.5,  dur: 11, anchor: "tl" as const },
  { left: "8%",   top: "80%", size: 22, delay: 4.0,  dur: 10, anchor: "bl" as const },

  // ZONA 3 (14-16%) — delays BAJOS para que aparezcan antes
  { left: "15%",  top: "48%", size: 24, delay: 0.8,  dur: 11, anchor: "tl" as const },
  { left: "14%",  top: "90%", size: 14, delay: 3.2,  dur: 10, anchor: "bl" as const },

  // CENTRO-ARRIBA
  { left: "44%",  top: "4%",  size: 28, delay: 1.5,  dur: 11, anchor: "tl" as const },

  // DERECHA (sin tocar)
  { left: "95%",  top: "16%", size: 40, delay: 0.8,  dur: 11, anchor: "tr" as const },
  { left: "92%",  top: "50%", size: 26, delay: 2.5,  dur: 12, anchor: "tr" as const },
  { left: "97%",  top: "80%", size: 16, delay: 4.2,  dur: 10, anchor: "br" as const },
] as const;

/* ── TABLET PORTRAIT / MOBILE LANDSCAPE cubes (md, < lg) ──────── */
/* Texto centrado → ~14% margen oscuro en cada lado */
const TABLET_CUBES = [
  // LEFT — tamaños muy variados: gigante / mini / grande / pequeño
  { left: "2%",   top: "5%",  size: 48, delay: 0,    dur: 11, anchor: "tl" as const },
  { left: "6%",   top: "32%", size: 8,  delay: 2.5,  dur: 10, anchor: "tl" as const },
  { left: "10%",  top: "60%", size: 30, delay: 4.5,  dur: 11, anchor: "tl" as const },
  { left: "3%",   top: "82%", size: 14, delay: 1.8,  dur: 10, anchor: "bl" as const },

  // RIGHT — distinto patrón de tamaños: pequeño / enorme / mediano / micro
  { left: "97%",  top: "12%", size: 12, delay: 0.6,  dur: 11, anchor: "tr" as const },
  { left: "93%",  top: "42%", size: 52, delay: 3.0,  dur: 10, anchor: "tr" as const },
  { left: "89%",  top: "68%", size: 22, delay: 1.5,  dur: 11, anchor: "br" as const },
  { left: "95%",  top: "86%", size: 6,  delay: 4.8,  dur: 10, anchor: "br" as const },
] as const;

/* ── MOBILE cubes (< md) — solo zona superior ─────────────────── */
const MOBILE_CUBES = [
  { left: "6%",  top: "2%", size: 16, delay: 0,   dur: 11, anchor: "tl" as const },
  { left: "88%", top: "3%", size: 14, delay: 1.5, dur: 10, anchor: "tr" as const },
  { left: "45%", top: "1%", size: 12, delay: 3.0, dur: 11, anchor: "tl" as const },
] as const;

type Anchor = "tl" | "tr" | "bl" | "br";
const anchorCls: Record<Anchor, string> = {
  tl: "hero-rise-motif__cube--tl", tr: "hero-rise-motif__cube--tr",
  bl: "hero-rise-motif__cube--bl", br: "hero-rise-motif__cube--br",
};

function IsoCube({ size }: { size: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.15)} viewBox="0 0 24 28" fill="none" aria-hidden
      className="block drop-shadow-[0_3px_12px_rgba(160,136,86,0.35)]">
      <path d="M12 2 22 8v12l-10 6L2 20V8l10-6z" fill="#e2cfa0"/>
      <path d="M2 8l10 6 10-6v12l-10 6V14L2 8z" fill="#9a7f52"/>
      <path d="M12 14l10-6v12l-10 6V14z" fill="#c8aa70" opacity="0.88"/>
    </svg>
  );
}

function C({ left, top, size, delay, dur, anchor }: {
  left: string; top: string; size: number; delay: number; dur: number; anchor: Anchor;
}) {
  return (
    <div className={`hero-rise-motif__cube ${anchorCls[anchor]}`} style={{ left, top }}>
      <div className="hero-rise-motif__cube-inner"
        style={{ "--cube-delay": `${delay}s`, "--cube-dur": `${dur}s` } as React.CSSProperties}>
        <IsoCube size={size} />
      </div>
    </div>
  );
}

export function HeroRiseMotif() {
  const mobileMask = "linear-gradient(to bottom, black 0%, black 8%, transparent 12%, transparent 100%)";
  return (
    <div className="hero-rise-motif" aria-hidden style={{ zIndex: -1 }}>

      {/* Desktop / tablet landscape (lg+) */}
      <div className="hero-rise-motif__cubes hidden lg:block">
        {DESKTOP_CUBES.map((c, i) => <C key={i} {...c} />)}
      </div>

      {/* Tablet portrait / mobile landscape (md a lg) */}
      <div className="hero-rise-motif__cubes hidden md:block lg:hidden">
        {TABLET_CUBES.map((c, i) => <C key={i} {...c} />)}
      </div>

      {/* Mobile (< md) */}
      <div className="hero-rise-motif__cubes md:hidden"
        style={{ maskImage: mobileMask, WebkitMaskImage: mobileMask }}>
        {MOBILE_CUBES.map((c, i) => <C key={i} {...c} />)}
      </div>

    </div>
  );
}
