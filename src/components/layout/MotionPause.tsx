"use client";

import { useEffect } from "react";

/** Pausa animaciones CSS cuando la pestaña está en segundo plano */
export function MotionPause() {
  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      root.toggleAttribute("data-motion-pause", document.hidden);
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return null;
}
