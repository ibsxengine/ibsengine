const CUBES = [
  { left: "4%", top: "5%", size: 22, delay: 0, dur: 11 },
  { left: "93%", top: "6%", size: 20, delay: 1.8, dur: 10 },
  { left: "5%", top: "78%", size: 24, delay: 1.2, dur: 11 },
  { left: "92%", top: "77%", size: 22, delay: 3.2, dur: 10 },
] as const;

function IsoCube({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.15)}
      viewBox="0 0 24 28"
      fill="none"
      aria-hidden
      className="drop-shadow-[0_2px_8px_rgba(160,136,86,0.35)]"
    >
      <path d="M12 2 22 8v12l-10 6L2 20V8l10-6z" fill="#e2cfa0" />
      <path d="M2 8l10 6 10-6v12l-10 6V14L2 8z" fill="#9a7f52" />
      <path d="M12 14l10-6v12l-10 6V14z" fill="#c8aa70" opacity="0.88" />
    </svg>
  );
}

/** Flecha única curva + cubos solo en esquinas — zona central recortada en CSS */
export function HeroRiseMotif() {
  return (
    <div className="hero-rise-motif" aria-hidden>
      <svg
        className="hero-rise-motif__arrow"
        viewBox="0 0 400 480"
        fill="none"
        preserveAspectRatio="xMinYMax meet"
      >
        <defs>
          <linearGradient id="heroArrowFill" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a7348" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4bc82" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Una sola forma — curva fina → gruesa + punta triangular */}
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

      <div className="hero-rise-motif__cubes">
        {CUBES.map((cube, i) => (
          <div
            key={i}
            className="hero-rise-motif__cube"
            style={
              {
                left: cube.left,
                top: cube.top,
                "--cube-delay": `${cube.delay}s`,
                "--cube-dur": `${cube.dur}s`,
              } as React.CSSProperties
            }
          >
            <IsoCube size={cube.size} />
          </div>
        ))}
      </div>
    </div>
  );
}
