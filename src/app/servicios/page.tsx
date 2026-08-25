import { PageHero } from "@/components/pages/PageHero";
import { ServiciosContent } from "@/components/pages/ServiciosContent";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | IBS Engine",
  description: "No vendemos tecnología. Construimos la solución que necesita tu negocio.",
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
          <div className="mt-6">
            <Button href="/contacto" variant="gold">
              Quiero ver qué podemos hacer
            </Button>
          </div>
        }
      />
      <ServiciosContent />
    </>
  );
}
