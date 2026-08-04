"use client";

import { SignatureFlow } from "./SignatureFlow";
import { useSectorCycle } from "@/lib/motion/useSectorCycle";

/** Flujo de firma que rota entre sectores como el hero */
export function LiveSignatureFlow() {
  const { ref, scenario } = useSectorCycle(5500);

  return (
    <div ref={ref}>
      <p className="mb-6 text-center font-serif text-sm tracking-[0.1em] text-gold-from uppercase">
        Caso real · De mensaje a cita · {scenario.label}
      </p>
      <SignatureFlow key={scenario.id} scenario={scenario} fast />
    </div>
  );
}
