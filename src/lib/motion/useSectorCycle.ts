"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SECTOR_SCENARIOS } from "@/lib/content/sector-scenarios";
import { useDocumentVisible } from "@/lib/motion/useDocumentVisible";

export function useSectorCycle(intervalMs = 5500) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "0px 0px -80px 0px" });
  const reduced = useReducedMotion();
  const docVisible = useDocumentVisible();
  const [sectorIndex, setSectorIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduced || !docVisible) return;
    const id = setInterval(() => {
      setSectorIndex((i) => (i + 1) % SECTOR_SCENARIOS.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [inView, reduced, docVisible, intervalMs]);

  const scenario = SECTOR_SCENARIOS[reduced ? 0 : sectorIndex];

  return { ref, scenario, sectorIndex, inView, reduced: reduced ?? false };
}
