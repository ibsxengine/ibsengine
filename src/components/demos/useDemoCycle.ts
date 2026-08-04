"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { SECTOR_SCENARIOS } from "@/lib/content/sector-scenarios";
import { useDocumentVisible } from "@/lib/motion/useDocumentVisible";

const DEMO_IN_VIEW = { amount: 0.38, margin: "0px 0px -80px 0px" as const };

export type SectorDemoOptions = {
  /** Al terminar el último paso, salta al siguiente sector en lugar de reiniciar */
  advanceSectorOnComplete?: boolean;
};

export function useSectorCycle(intervalMs = 6000) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, DEMO_IN_VIEW);
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

export function useDemoCycle(stepCount: number, intervalMs = 2800) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, DEMO_IN_VIEW);
  const reduced = useReducedMotion();
  const docVisible = useDocumentVisible();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(stepCount - 1);
      return;
    }
    if (!inView || !docVisible) return;

    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s + 1) % stepCount);
    }, intervalMs);

    return () => clearInterval(id);
  }, [inView, reduced, docVisible, stepCount, intervalMs]);

  return { ref, step, inView, reduced: reduced ?? false };
}

/** Pasos con duración variable + rotación de sector */
export function useSectorDemoSteps(
  stepDurations: readonly number[],
  sectorMs = 6000,
  options?: SectorDemoOptions,
) {
  const advanceSectorOnComplete = options?.advanceSectorOnComplete ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, DEMO_IN_VIEW);
  const reduced = useReducedMotion();
  const docVisible = useDocumentVisible();
  const [step, setStep] = useState(0);
  const [sectorIndex, setSectorIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef(0);
  const durationsRef = useRef(stepDurations);

  durationsRef.current = stepDurations;
  const stepCount = stepDurations.length;
  const durationsKey = stepDurations.join(",");

  const scheduleSteps = useCallback(() => {
    if (!inView || reduced || !docVisible) return;

    stepRef.current = 0;
    setStep(0);

    const advance = () => {
      const current = stepRef.current;
      timerRef.current = setTimeout(() => {
        if (current >= stepCount - 1) {
          if (advanceSectorOnComplete) {
            setSectorIndex((i) => (i + 1) % SECTOR_SCENARIOS.length);
          }
          stepRef.current = 0;
          setStep(0);
        } else {
          stepRef.current = current + 1;
          setStep(stepRef.current);
        }
        advance();
      }, durationsRef.current[current] ?? 1000);
    };

    advance();
  }, [inView, reduced, docVisible, stepCount, durationsKey, advanceSectorOnComplete]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (reduced) {
      setStep(stepCount - 1);
      return;
    }
    if (!inView || !docVisible) return;

    scheduleSteps();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView, reduced, docVisible, scheduleSteps, stepCount]);

  useEffect(() => {
    if (!inView || reduced || !docVisible || sectorMs <= 0 || advanceSectorOnComplete) return;
    const id = setInterval(() => {
      setSectorIndex((i) => (i + 1) % SECTOR_SCENARIOS.length);
    }, sectorMs);
    return () => clearInterval(id);
  }, [inView, reduced, docVisible, sectorMs, advanceSectorOnComplete]);

  const scenario = SECTOR_SCENARIOS[reduced ? 0 : sectorIndex];

  return { ref, step, scenario, sectorIndex, inView, reduced: reduced ?? false, stepCount };
}

/** @deprecated Usar useSectorDemoSteps para timings variables */
export function useSectorDemo(stepCount: number, stepMs = 2000, sectorMs = 5500) {
  const durations = Array.from({ length: stepCount }, () => stepMs);
  return useSectorDemoSteps(durations, sectorMs);
}
