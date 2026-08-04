import { CaptacionDemo } from "./CaptacionDemo";
import { ConversionDemo } from "./ConversionDemo";
import { SeguimientoDemo } from "./SeguimientoDemo";
import { ControlDemo } from "./ControlDemo";
import { SistemaSectorialDemo } from "./SistemaSectorialDemo";

const DEMOS = {
  captacion: CaptacionDemo,
  conversion: ConversionDemo,
  seguimiento: SeguimientoDemo,
  control: ControlDemo,
  "sistema-sectorial": SistemaSectorialDemo,
} as const;

type BlockDemoProps = {
  blockId: string;
};

export function BlockDemo({ blockId }: BlockDemoProps) {
  const Demo = DEMOS[blockId as keyof typeof DEMOS];
  if (!Demo) return null;
  return (
    <div data-orb-minimal>
      <Demo />
    </div>
  );
}
