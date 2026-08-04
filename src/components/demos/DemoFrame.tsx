"use client";

import { type ReactNode } from "react";
import { type SectorScenario } from "@/lib/content/sector-scenarios";

type DemoFrameProps = {
  label: string;
  sector?: SectorScenario;
  children: ReactNode;
  className?: string;
};

/** Shell claro — contraste con fondos navy de sección */
export function DemoFrame({ label, sector, children, className = "" }: DemoFrameProps) {
  return (
    <div
      className={`demo-frame-light relative overflow-hidden rounded-md border ${className}`}
      data-orb-minimal
    >
      <div className="relative flex items-center justify-between border-b border-[color:var(--shell-border)] bg-[var(--shell-panel-header)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-amber-400/90" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-500/90" aria-hidden />
        </div>
        <span className="font-serif text-[11px] tracking-[0.12em] text-[color:var(--shell-ink-muted)] uppercase">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {sector && (
            <span className="hidden rounded-full border border-[color:var(--shell-border)] bg-[var(--shell-surface)] px-2 py-0.5 text-[10px] text-[color:var(--shell-ink-muted)] sm:inline">
              {sector.label}
            </span>
          )}
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" aria-hidden />
          <span className="font-data text-[9px] text-emerald-700">live</span>
        </div>
      </div>
      <div className="relative demo-panel-light bg-[var(--shell-panel-inner)] p-5 sm:p-6 lg:p-7">{children}</div>
    </div>
  );
}
