"use client";

import { motion } from "framer-motion";

type FlowConnectorProps = {
  active: boolean;
  direction?: "vertical" | "horizontal";
  reducedMotion?: boolean;
  fast?: boolean;
};

export function FlowConnector({
  active,
  direction = "vertical",
  reducedMotion = false,
  fast = false,
}: FlowConnectorProps) {
  const isVertical = direction === "vertical";

  return (
    <div
      className={`relative flex items-center justify-center ${
        isVertical ? "h-10 w-px sm:h-12" : "h-px w-full min-w-[40px] flex-1"
      }`}
      aria-hidden
    >
      {isVertical ? (
        <svg
          width="2"
          height="48"
          viewBox="0 0 2 48"
          fill="none"
          className="h-full w-full"
        >
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="48"
            stroke="url(#goldLineV)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: reducedMotion || active ? 1 : 0 }}
            animate={{ pathLength: reducedMotion || active ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : fast ? 0.32 : 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <defs>
            <linearGradient id="goldLineV" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#B8884B" />
              <stop offset="1" stopColor="#D4AF6A" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width="100%"
          height="2"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="url(#goldLineH)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: reducedMotion || active ? 1 : 0 }}
            animate={{ pathLength: reducedMotion || active ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : fast ? 0.32 : 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <defs>
            <linearGradient id="goldLineH" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#B8884B" />
              <stop offset="1" stopColor="#D4AF6A" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}
