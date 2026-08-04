import { SECTION_AMBIENTS } from "@/lib/section-themes";

const hero = SECTION_AMBIENTS.hero;

/** Fondo fijo — vars iniciales en SSR; scroll actualiza vía ActiveSectionProvider (sin re-render) */
export function SiteBackground() {
  return (
    <div
      className="site-bg-root"
      data-section="hero"
      aria-hidden
      style={
        {
          "--bg-base": hero.base,
          "--orb-a-color": hero.orbA.color,
          "--orb-a-x": hero.orbA.x,
          "--orb-a-y": hero.orbA.y,
          "--orb-a-size": hero.orbA.size,
          "--orb-b-color": hero.orbB.color,
          "--orb-b-x": hero.orbB.x,
          "--orb-b-y": hero.orbB.y,
          "--orb-b-size": hero.orbB.size,
        } as React.CSSProperties
      }
    >
      <div className="site-bg-base" />
      <div className="site-bg-hero-bloom" />
      <div className="site-bg-orb site-bg-orb-a">
        <div className="site-bg-orb-inner site-bg-orb-inner-a" />
      </div>
      <div className="site-bg-orb site-bg-orb-b">
        <div className="site-bg-orb-inner site-bg-orb-inner-b" />
      </div>
      <div className="site-bg-drift" />
    </div>
  );
}
