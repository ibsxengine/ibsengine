"use client";

import { createContext, useContext } from "react";

const SectionInViewContext = createContext(false);

export function SectionInViewProvider({
  inView,
  children,
}: {
  inView: boolean;
  children: React.ReactNode;
}) {
  return (
    <SectionInViewContext.Provider value={inView}>{children}</SectionInViewContext.Provider>
  );
}

/** Un solo IntersectionObserver por sección — los hijos animan con animate, no whileInView */
export function useSectionInView() {
  return useContext(SectionInViewContext);
}
