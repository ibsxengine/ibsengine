import { PageHero } from "@/components/pages/PageHero";
import { ServicesPageContent } from "@/components/pages/ServicesPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Servicios de digitalización, automatización y software a medida para pymes.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Lo que hacemos"
        title={
          <>
            Nuestros <span className="text-gold-accent">servicios</span>
          </>
        }
        description="Soluciones integrales para captar clientes, convertir contactos y controlar tu negocio. Un sistema, no parches sueltos."
        aside={
          <a
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-gold-to transition-colors hover:text-off-white"
          >
            Auditoría gratis →
          </a>
        }
      />
      <ServicesPageContent />
    </>
  );
}
