"use client";

import {
  SectionInViewProvider,
} from "@/components/layout/SectionInViewContext";
import { getSectionRevealVariant } from "@/lib/motion/section-animations";
import {
  layerRevealReduced,
  layerRevealTransition,
  scrollViewport,
  scrollViewportMobile,
} from "@/lib/motion/variants";
import { useCoarsePointer } from "@/lib/motion/useCoarsePointer";
import {
  resolveSectionId,
  SECTION_AMBIENTS,
  SECTION_SOLIDS,
  type SectionId,
} from "@/lib/section-themes";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ActiveSectionContextValue = {
  registerSection: (id: SectionId, el: HTMLElement) => () => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue | null>(null);

function applyAmbientToDom(id: SectionId) {
  const root = document.querySelector<HTMLElement>(".site-bg-root");
  if (!root) return;

  const resolved = resolveSectionId(id);
  if (root.dataset.section === resolved) return;

  const theme = SECTION_AMBIENTS[resolved] ?? SECTION_AMBIENTS.default;
  root.dataset.section = resolved;
  root.style.setProperty("--bg-base", theme.base);
  root.style.setProperty("--orb-a-color", theme.orbA.color);
  root.style.setProperty("--orb-a-x", theme.orbA.x);
  root.style.setProperty("--orb-a-y", theme.orbA.y);
  root.style.setProperty("--orb-a-size", theme.orbA.size);
  root.style.setProperty("--orb-b-color", theme.orbB.color);
  root.style.setProperty("--orb-b-x", theme.orbB.x);
  root.style.setProperty("--orb-b-y", theme.orbB.y);
  root.style.setProperty("--orb-b-size", theme.orbB.size);
}

export function useActiveSection() {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) throw new Error("useActiveSection must be used within ActiveSectionProvider");
  return ctx;
}

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const ratiosRef = useRef(new Map<string, number>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastSectionRef = useRef<SectionId>("hero");

  useEffect(() => {
    const ratios = ratiosRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-ambient-section");
          if (!id) continue;
          ratios.set(id, entry.intersectionRatio);
        }

        let bestId = "hero";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0.08) {
          const next = resolveSectionId(bestId);
          if (next !== lastSectionRef.current) {
            lastSectionRef.current = next;
            applyAmbientToDom(next);
          }
        }
      },
      {
        threshold: [0, 0.15, 0.4],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const registerSection = useCallback((id: SectionId, el: HTMLElement) => {
    el.setAttribute("data-ambient-section", id);
    observerRef.current?.observe(el);
    return () => {
      observerRef.current?.unobserve(el);
      ratiosRef.current.delete(id);
    };
  }, []);

  const contextValue = useMemo(() => ({ registerSection }), [registerSection]);

  return (
    <ActiveSectionContext.Provider value={contextValue}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

type AmbientSectionProps = {
  sectionId: SectionId;
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  solid?: boolean;
};

export function AmbientSection({
  sectionId,
  id,
  className = "",
  children,
  "aria-label": ariaLabel,
  solid = true,
}: AmbientSectionProps) {
  const { registerSection } = useActiveSection();
  const ref = useRef<HTMLElement>(null);
  const [accentVisible, setAccentVisible] = useState(false);
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const inView = useInView(ref, coarse ? scrollViewportMobile : scrollViewport);
  const bg = solid ? SECTION_SOLIDS[sectionId] : "transparent";

  useEffect(() => {
    if (inView) setAccentVisible(true);
  }, [inView]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerSection(sectionId, el);
  }, [registerSection, sectionId]);

  const show = reduced || inView;

  return (
    <SectionInViewProvider inView={show}>
      <motion.section
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={reduced ? layerRevealReduced : getSectionRevealVariant(sectionId)}
        transition={layerRevealTransition}
        style={{ backgroundColor: bg !== "transparent" ? bg : undefined }}
        className={`section-layer section-solid content-auto relative ${className}`}
      >
        {solid && <div className="section-gold-rule" aria-hidden />}
        <div className={`section-layer-accent ${accentVisible ? "is-visible" : ""}`} aria-hidden />
        {children}
      </motion.section>
    </SectionInViewProvider>
  );
}
