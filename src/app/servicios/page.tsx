import { PageHero } from "@/components/pages/PageHero";
import { ServiciosContent } from "@/components/pages/ServiciosContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | IBS Engine",
  description:
    "No vendemos tecnología. Construimos la solución que necesita tu negocio: IA privada, agentes de voz, automatización, sistemas a medida, crecimiento y datos.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Lo que hacemos"
        title={
          <>
            Tu negocio tiene un problema.{" "}
            <span className="text-gold-accent">Nosotros construimos la solución.</span>
          </>
        }
        description="No te vendemos tecnología. Te quitamos trabajo. Desde una IA que conoce tu empresa hasta un sistema construido alrededor de cómo trabajas. Primero entendemos el problema. Después construimos lo que tiene sentido."
        aside={
          <a
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-gold-to transition-colors hover:text-off-white"
          >
            Quiero ver qué podemos hacer →
          </a>
        }
      />
      <ServiciosContent />
    </>
  );
}
