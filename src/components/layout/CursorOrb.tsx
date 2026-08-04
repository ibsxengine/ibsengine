"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const HEADER_H = 72;
const SCROLLBAR_W = 28;
const HIT_EVERY = 3;

const ORB_MINIMAL_SELECTOR =
  "a, button, input, textarea, select, label, .shell-header, .custom-scrollbar, .demo-frame-light, .demo-shell-card, .demo-panel-light, [data-orb-minimal]";

function zoneFromPoint(clientX: number, clientY: number): "minimal" | "hero" | "content" {
  if (clientY <= HEADER_H + 8 || clientX >= window.innerWidth - SCROLLBAR_W) {
    return "minimal";
  }

  const target = document.elementFromPoint(clientX, clientY);
  if (target?.closest(ORB_MINIMAL_SELECTOR)) {
    return "minimal";
  }

  return window.scrollY < window.innerHeight * 0.72 ? "hero" : "content";
}

function zoneFast(clientX: number, clientY: number): "minimal" | null {
  if (clientY <= HEADER_H + 8 || clientX >= window.innerWidth - SCROLLBAR_W) {
    return "minimal";
  }
  return null;
}

/** Orbe cursor — oculto en demos, header y UI interactiva */
export function CursorOrb() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !isHome || !enabled) return;

    let raf = 0;
    let frame = 0;
    let lastZone: "minimal" | "hero" | "content" = "hero";
    let pendingX = 0;
    let pendingY = 0;
    let dirty = false;

    const applyCursorVars = (x: number, y: number) => {
      overlay.style.setProperty("--cursor-x", `${x}%`);
      overlay.style.setProperty("--cursor-y", `${y}%`);
    };

    const updateScroll = () => {
      const heroFactor = Math.max(0, 1 - window.scrollY / (window.innerHeight * 1.05));
      overlay.style.setProperty("--orb-hero-factor", String(heroFactor));
    };

    const resolveZone = (x: number, y: number) => {
      const fast = zoneFast(x, y);
      if (fast === "minimal") return "minimal";

      const inHero = window.scrollY < window.innerHeight * 0.72;
      if (inHero || frame % HIT_EVERY === 0) {
        return zoneFromPoint(x, y);
      }
      return lastZone;
    };

    const flush = () => {
      raf = 0;
      if (!dirty) return;
      dirty = false;
      frame += 1;

      const x = pendingX;
      const y = pendingY;
      applyCursorVars(
        (x / window.innerWidth) * 100,
        ((y - HEADER_H) / Math.max(window.innerHeight - HEADER_H, 1)) * 100,
      );

      const zone = resolveZone(x, y);
      if (zone !== lastZone) {
        lastZone = zone;
        overlay.setAttribute("data-zone", zone);
      }
      overlay.setAttribute("data-cursor", zone === "minimal" ? "off" : "on");
    };

    const onScroll = () => {
      updateScroll();
      dirty = true;
      frame = HIT_EVERY - 1;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      dirty = true;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onLeave = () => overlay.setAttribute("data-cursor", "off");

    updateScroll();
    overlay.setAttribute("data-zone", "hero");
    applyCursorVars(50, 35);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome, enabled]);

  if (!isHome || !enabled) return null;

  return (
    <div
      ref={overlayRef}
      className="site-cursor-orb-overlay"
      data-cursor="off"
      data-zone="hero"
      aria-hidden
    >
      <div className="site-bg-cursor-orb" />
    </div>
  );
}
