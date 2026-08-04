import { PageHero } from "@/components/pages/PageHero";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Conoce IBS Engine — digitalización y automatización para pymes y autónomos.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nosotros"
        title={
          <>
            Ideas Become <span className="text-gold-accent">Systems</span>
          </>
        }
        description="Digitalizamos y automatizamos pymes y autónomos de cualquier sector. No vendemos webs sueltas: montamos sistemas que captan, convierten y organizan."
      />
      <AboutPageContent />
    </>
  );
}
