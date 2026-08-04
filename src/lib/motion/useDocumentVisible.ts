"use client";

import { useEffect, useState } from "react";

/** Pausa timers/animaciones cuando la pestaña no está visible */
export function useDocumentVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return visible;
}
