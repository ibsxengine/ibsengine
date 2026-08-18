import { PageHero } from "@/components/pages/PageHero";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "IBS Engine — ideas que se convierten en sistemas. Automatización y digitalización para pymes y autónomos.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nosotros"
        title={
          <>
            Ideas Become{" "}
            <span className="text-gold-accent">Systems</span>
          </>
        }
        description="No queríamos crear otra empresa que vendiera software. Queríamos construir cosas que realmente funcionaran dentro de un negocio."
      />
      <AboutPageContent />
    </>
  );
}
