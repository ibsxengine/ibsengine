import { PageHero } from "@/components/pages/PageHero";
import { ContactPageContent } from "@/components/pages/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con IBS Engine — auditoría gratis y formulario de contacto.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Hablemos"
        title={
          <>
            Tu negocio, <span className="text-gold-accent">nuestro sistema</span>
          </>
        }
        description="Escríbenos por WhatsApp para una respuesta rápida o déjanos tus datos. Te respondemos en menos de 24 horas."
      />
      <ContactPageContent />
    </>
  );
}
