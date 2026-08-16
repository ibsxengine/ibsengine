import { Hero } from "@/components/home/Hero";
import { ElProblemaSection } from "@/components/home/ElProblemaSection";
import { SignatureShowcase } from "@/components/home/SignatureShowcase";
import { CommercialBlockSection } from "@/components/home/CommercialBlock";
import { ElGolpeSection } from "@/components/home/ElGolpeSection";
import { AuditoriaSection } from "@/components/home/AuditoriaSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ContactSection } from "@/components/home/ContactSection";
import { COMMERCIAL_BLOCKS } from "@/lib/content/commercial-blocks";

export default function Home() {
  return (
    <>
      <Hero />
      <ElProblemaSection />
      <SignatureShowcase />

      {COMMERCIAL_BLOCKS.map((block) => (
        <div key={block.id}>
          <div className="content-auto">
            <CommercialBlockSection block={block} />
          </div>
          {block.id === "conversion" && <AuditoriaSection />}
        </div>
      ))}

      <ElGolpeSection />

      <div className="content-auto">
        <ProcessSection />
      </div>
      <div className="content-auto">
        <ContactSection />
      </div>
    </>
  );
}
