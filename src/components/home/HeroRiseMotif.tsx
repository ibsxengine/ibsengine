"use client";

import React from "react";

const DESKTOP_CUBES = [
  // ── SUB-COLUMNA 1 (1-4%) ─────────────────────────────────────
  { left: "2%",   top: "8%",  size: 44, delay: 0,    dur: 12, anchor: "tl" as const }, // grande
  { left: "3%",   top: "70%", size: 20, delay: 3.2,  dur: 10, anchor: "bl" as const }, // pequeño

  // ── SUB-COLUMNA 2 (8-10%) — 3 cubos con tamaños distintos ────
  { left: "9%",   top: "3%",  size: 32, delay: 1.8,  dur: 11, anchor: "tl" as const }, // mediano-grande
  { left: "8%",   top: "45%", size: 18, delay: 4.5,  dur: 10, anchor: "tl" as const }, // pequeño (QUITADO el de 88%)
  { left: "9%",   top: "82%", size: 24, delay: 2.0,  dur: 11, anchor: "bl" as const }, // mediano

  // ── SUB-COLUMNA 3 (14-16%) — 2 cubos, más variados ───────────
  { left: "15%",  top: "20%", size: 28, delay: 3.0,  dur: 10, anchor: "tl" as const }, // mediano (QUITADO uno)
  { left: "14%",  top: "65%", size: 14, delay: 6.0,  dur: 11, anchor: "tl" as const }, // pequeño

  // ── CENTRO-ARRIBA (zona amarilla) ────────────────────────────
  { left: "44%",  top: "4%",  size: 28, delay: 1.5,  dur: 11, anchor: "tl" as const },

  // ── DERECHA (intacto) ─────────────────────────────────────────
  { left: "95%",  top: "16%", size: 40, delay: 0.8,  dur: 11, anchor: "tr" as const },
  { left: "92%",  top: "50%", size: 26, delay: 2.5,  dur: 12, anchor: "tr" as const },
  { left: "97%",  top: "80%", size: 16, delay: 4.2,  dur: 10, anchor: "br" as const },
] as const;

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
      <div className="hero-rise-motif__cubes hidden lg:block">
        {DESKTOP_CUBES.map((c, i) => <C key={i} {...c} />)}
      </div>
      <div className="hero-rise-motif__cubes md:hidden"
        style={{ maskImage: mobileMask, WebkitMaskImage: mobileMask }}>
        {MOBILE_CUBES.map((c, i) => <C key={i} {...c} />)}
      </div>
    </div>
  );
}
