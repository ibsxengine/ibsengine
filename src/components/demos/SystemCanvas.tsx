"use client";

import { useInView, useReducedMotion, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SECTOR_SCENARIOS } from "@/lib/content/sector-scenarios";

type CanvasNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  hub?: boolean;
  dynamic?: boolean;
};

type CanvasProfile = "mobile" | "tablet" | "desktop";

const BASE_NODES: CanvasNode[] = [
  { id: "wa", label: "WhatsApp", x: 16, y: 26 },
  { id: "web", label: "Web", x: 16, y: 74 },
  { id: "proc", label: "Motor IBS", x: 50, y: 50, hub: true },
  { id: "cal", label: "Agenda", x: 76, y: 26 },
  { id: "crm", label: "CRM", x: 76, y: 74 },
  { id: "app", label: "App", x: 86, y: 50, dynamic: true },
];

const EDGES: [string, string][] = [
  ["wa", "proc"],
  ["web", "proc"],
  ["proc", "cal"],
  ["proc", "crm"],
  ["cal", "app"],
  ["crm", "app"],
];

const EDGE_MS = 1800;

const NODE_METRICS: Record<
  CanvasProfile,
  { boxW: number; boxH: number; fontHub: number; font: number; hubExtra: number }
> = {
  mobile: { boxW: 24, boxH: 9, fontHub: 4.2, font: 3.9, hubExtra: 3 },
  tablet: { boxW: 24, boxH: 9, fontHub: 4.5, font: 4.1, hubExtra: 3 },
  desktop: { boxW: 16.5, boxH: 6.2, fontHub: 2.95, font: 2.75, hubExtra: 2 },
};

const VIEWBOX: Record<CanvasProfile, string> = {
  mobile: "4 18 92 64",
  tablet: "2 16 96 68",
  desktop: "0 16 100 68",
};

function NodeBox({
  x,
  y,
  label,
  hub,
  lit,
  profile,
}: {
  x: number;
  y: number;
  label: string;
  hub?: boolean;
  lit: boolean;
  profile: CanvasProfile;
}) {
  const m = NODE_METRICS[profile];
  const wide = !hub && label.length > 8;
  const w = hub ? m.boxW + m.hubExtra : wide ? m.boxW + (profile === "desktop" ? 4 : 2) : m.boxW;
  const h = hub ? m.boxH + 1.2 : m.boxH;
  const fontSize = hub ? m.fontHub : wide && profile === "desktop" ? m.font - 0.15 : m.font;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={0.75}
        fill={hub ? "#0d1e3a" : lit ? "#FAF9F6" : "#E8E5DE"}
        stroke={hub ? "#a08856" : lit ? "rgba(160,136,86,0.55)" : "rgba(13,30,58,0.22)"}
        strokeWidth={hub ? 0.38 : 0.28}
      />
      <text
        x={0}
        y={profile === "desktop" ? 0.95 : 1.2}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={hub ? 700 : 600}
        fill={hub ? (lit ? "#c8aa70" : "#E8E5DE") : lit ? "#0F1F3D" : "#3D5068"}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function useCanvasProfile(): CanvasProfile {
  const [profile, setProfile] = useState<CanvasProfile>("tablet");

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 639px)");
    const desktopMq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mobileMq.matches) setProfile("mobile");
      else if (desktopMq.matches) setProfile("desktop");
      else setProfile("tablet");
    };

    update();
    mobileMq.addEventListener("change", update);
    desktopMq.addEventListener("change", update);
    return () => {
      mobileMq.removeEventListener("change", update);
      desktopMq.removeEventListener("change", update);
    };
  }, []);

  return profile;
}

export function SystemCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const profile = useCanvasProfile();
  const isMobile = profile === "mobile";
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [sectorIndex, setSectorIndex] = useState(0);

  const scenario = SECTOR_SCENARIOS[reduced ? 0 : sectorIndex];
  const nodes: CanvasNode[] = BASE_NODES.filter((n) => !(isMobile && n.dynamic)).map((n) =>
    n.dynamic ? { ...n, label: scenario.appName.replace("IBS ", "") } : n,
  );
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const visibleEdges = EDGES.filter(([f, t]) => nodeMap[f] && nodeMap[t]);
  const edgeCount = visibleEdges.length;

  useEffect(() => {
    if (!inView || reduced || edgeCount === 0) return;
    const id = setInterval(() => setEdgeIndex((i) => (i + 1) % edgeCount), EDGE_MS);
    return () => clearInterval(id);
  }, [inView, reduced, edgeCount]);

  useEffect(() => {
    setEdgeIndex(0);
  }, [profile, edgeCount]);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      setSectorIndex((i) => (i + 1) % SECTOR_SCENARIOS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const [fromId, toId] = visibleEdges[edgeIndex % edgeCount] ?? visibleEdges[0];
  const from = nodeMap[fromId];
  const to = nodeMap[toId];

  return (
    <div
      ref={ref}
      className="system-canvas relative aspect-[4/3] w-full min-h-[300px] sm:aspect-[16/12] sm:min-h-[320px] lg:aspect-[16/11] lg:min-h-[280px]"
    >
      <p className="absolute top-0 left-0 right-0 z-10 text-center font-serif text-base font-semibold tracking-wide text-[#6d4f2d] sm:text-lg">
        Ejemplo · {scenario.label}
      </p>

      <svg
        viewBox={VIEWBOX[profile]}
        className="h-full w-full pt-7 sm:pt-8"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="goldLineCanvas" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#a08856" />
            <stop offset="1" stopColor="#c8aa70" />
          </linearGradient>
        </defs>

        {visibleEdges.map(([f, t], i) => {
          const a = nodeMap[f];
          const b = nodeMap[t];
          const lit = i <= edgeIndex;
          return (
            <line
              key={`${f}-${t}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={lit ? "url(#goldLineCanvas)" : "rgba(13,30,58,0.16)"}
              strokeWidth={profile === "desktop" ? 0.38 : isMobile ? 0.55 : 0.5}
              strokeDasharray="2.4 1.4"
              opacity={lit ? 0.92 : 0.35}
            />
          );
        })}

        {!reduced && inView && from && to && (
          <motion.circle
            key={edgeIndex}
            r={profile === "desktop" ? 0.95 : isMobile ? 1.35 : 1.2}
            fill="#c8aa70"
            initial={{ cx: from.x, cy: from.y, opacity: 0.4 }}
            animate={{ cx: to.x, cy: to.y, opacity: 1 }}
            transition={{ duration: 1.35, ease: [0.4, 0, 0.2, 1] }}
          />
        )}

        {nodes.map((node, i) => (
          <NodeBox
            key={node.id}
            x={node.x}
            y={node.y}
            label={node.label}
            hub={node.hub}
            lit={i <= edgeIndex + 2}
            profile={profile}
          />
        ))}
      </svg>
    </div>
  );
}
