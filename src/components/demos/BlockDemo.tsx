/**
 * BlockDemo — dynamic imports para cada demo.
 * Los demos se cargan en diferido, solo cuando el componente monta,
 * no en el bundle inicial. Esto reduce el JS inicial de la página
 * y elimina el lag al cargar secciones que aún no están en pantalla.
 */
import dynamic from "next/dynamic";

const Skeleton = () => (
  <div className="demo-frame-light rounded-md border">
    <div className="h-8 bg-[var(--shell-panel-header)] border-b border-[color:var(--shell-border)]" />
    <div className="demo-panel-light bg-[var(--shell-panel-inner)] p-6">
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 rounded-sm bg-white/[0.04] animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

const ControlDemo = dynamic(
  () => import("./ControlDemo").then((m) => m.ControlDemo),
  { ssr: false, loading: Skeleton }
);
const ConversionDemo = dynamic(
  () => import("./ConversionDemo").then((m) => m.ConversionDemo),
  { ssr: false, loading: Skeleton }
);
const AutomatizacionDemo = dynamic(
  () => import("./AutomatizacionDemo").then((m) => m.AutomatizacionDemo),
  { ssr: false, loading: Skeleton }
);
const SistemaSectorialDemo = dynamic(
  () => import("./SistemaSectorialDemo").then((m) => m.SistemaSectorialDemo),
  { ssr: false, loading: Skeleton }
);

const DEMOS: Record<string, React.ComponentType> = {
  control: ControlDemo,
  conversion: ConversionDemo,
  seguimiento: AutomatizacionDemo,
  "sistema-sectorial": SistemaSectorialDemo,
};

type BlockDemoProps = { blockId: string };

export function BlockDemo({ blockId }: BlockDemoProps) {
  const Demo = DEMOS[blockId];
  if (!Demo) return null;
  return (
    <div data-orb-minimal>
      <Demo />
    </div>
  );
}
