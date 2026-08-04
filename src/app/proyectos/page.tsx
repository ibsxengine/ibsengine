import { PageHero } from "@/components/pages/PageHero";
import { ProjectsPageContent } from "@/components/pages/ProjectsPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos pilotos",
  description: "Proyectos piloto en los que estamos trabajando con IBS Engine.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro trabajo"
        title={
          <>
            Proyectos <span className="text-gold-accent">piloto</span>
          </>
        }
        description="Casos reales en los que estamos validando el sistema con negocios de distintos sectores. Transparencia total sobre en qué estamos trabajando ahora."
      />
      <ProjectsPageContent />
    </>
  );
}
