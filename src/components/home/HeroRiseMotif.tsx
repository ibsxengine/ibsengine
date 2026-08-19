"use client";

import React from "react";

/**
 * Cubos decorativos — franjas laterales libres del hero.
 * Izquierda y derecha son deliberadamente asimétricas:
 * tamaños, alturas y timings distintos para que no parezcan espejados.
 * Pocos cubos: adorno, no protagonismo.
 */
const CUBES = [
  // ── Franja izquierda (3 cubos, irregular) ──
  { left: "7%",  top: "8%",  size: 40, delay: 0,    dur: 12, anchor: "tl" as const },
  { left: "9%",  top: "44%", size: 24, delay: 2.7,  dur: 9,  anchor: "tl" as const },
  { left: "6%",  top: "79%", size: 32, delay: 1.1,  dur: 11, anchor: "bl" as const },

  // ── Franja derecha (4 cubos, distintas proporciones) ──
  { left: "97%", top: "18%", size: 28, delay: 0.8,  dur: 10, anchor: "tr" as const },
  { left: "95%", top: "35%", size: 36, delay: 3.5,  dur: 13, anchor: "tr" as const },
  { left: "98%", top: "62%", size: 22, delay: 1.6,  dur: 9,  anchor: "tr" as const },
  { left: "94%", top: "88%", size: 30, delay: 4.2,  dur: 11, anchor: "br" as const },
] as const;

function cubeAnchorClass(anchor: (typeof CUBES)[number]["anchor"]) {
  switch (anchor) {
    case "tl": return "hero-rise-motif__cube--tl";
    case "tr": return "hero-rise-motif__cube--tr";
    case "bl": return "hero-rise-motif__cube--bl";
    case "br": return "hero-rise-motif__cube--br";
  }
}

function IsoCube({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 24 28"
      fill="none"
      aria-hidden
      className="block drop-shadow-[0_3px_12px_rgba(160,136,86,0.35)]"
    >
      <path d="M12 2 22 8v12l-10 6L2 20V8l10-6z" fill="#e2cfa0" />
      <path d="M2 8l10 6 10-6v12l-10 6V14L2 8z" fill="#9a7f52" />
      <path d="M12 14l10-6v12l-10 6V14z" fill="#c8aa70" opacity="0.88" />
    </svg>
  );
}

/** Solo en franjas laterales — máscara horizontal que oculta el centro */
export function HeroRiseMotif() {
  const mask =
    "linear-gradient(to right, black 0%, black 10%, transparent 16%, transparent 84%, black 90%, black 100%)";

  return (
    <div className="hero-rise-motif" aria-hidden style={{ zIndex: -1 }}>
      <div
        className="hero-rise-motif__cubes max-md:hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {CUBES.map((cube, i) => (
          <div
            key={i}
            className={`hero-rise-motif__cube ${cubeAnchorClass(cube.anchor)}`}
            style={{ left: cube.left, top: cube.top }}
          >
            <div
              className="hero-rise-motif__cube-inner"
              style={
                {
                  "--cube-delay": `${cube.delay}s`,
                  "--cube-dur": `${cube.dur}s`,
                } as React.CSSProperties
              }
            >
              <IsoCube size={cube.size} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
