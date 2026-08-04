import { Hero } from "@/components/home/Hero";
import { SignatureShowcase } from "@/components/home/SignatureShowcase";
import { CommercialBlockSection } from "@/components/home/CommercialBlock";
import { AuditoriaSection } from "@/components/home/AuditoriaSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CtaAuditoria } from "@/components/ui/CtaAuditoria";
import { COMMERCIAL_BLOCKS } from "@/lib/content/commercial-blocks";

export default function Home() {
  return (
    <>
      <Hero />
      <SignatureShowcase />

      {COMMERCIAL_BLOCKS.map((block) => (
        <div key={block.id}>
          <div className="content-auto">
            <CommercialBlockSection block={block} />
          </div>
          {block.id === "conversion" && <AuditoriaSection />}
        </div>
      ))}

      <div className="content-auto">
        <ProcessSection />
      </div>
      <div className="content-auto">
        <CtaAuditoria variant="banner" />
      </div>
      <div className="content-auto">
        <ContactSection />
      </div>
    </>
  );
}
