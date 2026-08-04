const CUBES = [
  { left: "0%", top: "2%", size: 38, delay: 0, dur: 11, anchor: "tl" as const },
  { left: "10%", top: "10%", size: 32, delay: 2.1, dur: 10, anchor: "tl" as const },
  { left: "98%", top: "3%", size: 36, delay: 1.4, dur: 11, anchor: "tr" as const },
  { left: "88%", top: "12%", size: 30, delay: 3.4, dur: 10, anchor: "tr" as const },
  { left: "1%", top: "68%", size: 40, delay: 0.8, dur: 11, anchor: "bl" as const },
  { left: "11%", top: "82%", size: 34, delay: 2.8, dur: 10, anchor: "bl" as const },
  { left: "97%", top: "70%", size: 38, delay: 1.9, dur: 11, anchor: "br" as const },
  { left: "86%", top: "84%", size: 32, delay: 3.9, dur: 10, anchor: "br" as const },
] as const;

function cubeAnchorClass(anchor: (typeof CUBES)[number]["anchor"]) {
  switch (anchor) {
    case "tl":
      return "hero-rise-motif__cube--tl";
    case "tr":
      return "hero-rise-motif__cube--tr";
    case "bl":
      return "hero-rise-motif__cube--bl";
    case "br":
      return "hero-rise-motif__cube--br";
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
      className="block drop-shadow-[0_3px_12px_rgba(160,136,86,0.4)]"
    >
      <path d="M12 2 22 8v12l-10 6L2 20V8l10-6z" fill="#e2cfa0" />
      <path d="M2 8l10 6 10-6v12l-10 6V14L2 8z" fill="#9a7f52" />
      <path d="M12 14l10-6v12l-10 6V14z" fill="#c8aa70" opacity="0.88" />
    </svg>
  );
}

/** Flecha curva en margen izquierdo + cubos en esquinas (sin clip global) */
export function HeroRiseMotif() {
  return (
    <div className="hero-rise-motif" aria-hidden>
      <div className="hero-rise-motif__arrow-wrap">
        <svg
          className="hero-rise-motif__arrow"
          viewBox="0 0 400 480"
          fill="none"
          preserveAspectRatio="xMinYMax meet"
        >
          <defs>
            <linearGradient id="heroArrowFill" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a6340" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#b89858" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#e2cfa0" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="
              M 10 462
              C 68 388 112 296 142 204
              C 168 128 184 76 194 42
              L 248 10
              L 212 44
              C 172 88 152 160 120 240
              C 82 332 44 412 10 462
              Z
            "
            fill="url(#heroArrowFill)"
          />
        </svg>
      </div>

      <div className="hero-rise-motif__cubes">
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
