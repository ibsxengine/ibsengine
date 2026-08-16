"use client";

import { useSectionInView } from "@/components/layout/SectionInViewContext";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlockDemo } from "@/components/demos/BlockDemo";
import { type CommercialBlock } from "@/lib/content/commercial-blocks";
import { getBlockAnimations } from "@/lib/motion/section-animations";
import {
  bulletReveal,
  defaultTransition,
  layerRevealReduced,
  staggerBullets,
  staggerContainer,
} from "@/lib/motion/variants";
import { resolveSectionId, type SectionId } from "@/lib/section-themes";
import { motion, useReducedMotion } from "framer-motion";

const BLOCK_INDEX: Record<string, string> = {
  captacion: "01",
  conversion: "02",
  seguimiento: "04",
  control: "05",
  "sistema-sectorial": "06",
};

function CommercialBlockContent({ block }: { block: CommercialBlock }) {
  const index = BLOCK_INDEX[block.id] ?? "00";
  const reversed = parseInt(index, 10) % 2 === 0;
  const inView = useSectionInView();
  const reduced = useReducedMotion();
  const show = reduced || inView;
  const { textVariants, demoVariants } = getBlockAnimations(block.id);
  const textMotion = reduced ? layerRevealReduced : textVariants;
  const demoMotion = reduced ? layerRevealReduced : demoVariants;

  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={staggerContainer}
        transition={{ ...defaultTransition, duration: 0.82 }}
      >
        <motion.div variants={textMotion}>
          <div className="flex items-center gap-3">
            <SectionLabel>{block.headline}</SectionLabel>
          </div>

          <h2 className="font-serif mt-4 text-2xl font-semibold text-off-white sm:text-3xl lg:text-4xl">
            {block.tagline}
          </h2>

          {block.positioning.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-text-secondary text-sm leading-relaxed sm:text-base ${i === 0 ? "mt-4" : "mt-3"}`}
            >
              {para}
            </p>
          ))}
        </motion.div>

        <motion.ul className="mt-8 space-y-1" variants={staggerBullets}>
          {(block.bullets ?? []).map((bullet) => (
            <motion.li
              key={bullet}
              variants={bulletReveal}
              className="group/bullet flex cursor-default items-start gap-3 rounded-md border-b border-white/[0.05] px-2 py-3 text-sm text-off-white/90 transition-[transform,color,background-color,border-color] duration-300 last:border-0 hover:translate-x-2 hover:border-gold-to/25 hover:bg-white/[0.03] hover:text-off-white sm:text-base"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-to transition-all duration-300 group-hover/bullet:scale-150 group-hover/bullet:bg-gold-from group-hover/bullet:shadow-[0_0_8px_rgb(197_163_106/0.55)]"
                aria-hidden
              />
              <span className="transition-transform duration-300 group-hover/bullet:translate-x-0.5">
                {bullet}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="relative isolate"
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        variants={demoMotion}
        transition={{ ...defaultTransition, duration: 0.88, delay: reduced ? 0 : 0.1 }}
      >
        <BlockDemo blockId={block.id} />
      </motion.div>
    </div>
  );
}

type CommercialBlockSectionProps = {
  block: CommercialBlock;
};

export function CommercialBlockSection({ block }: CommercialBlockSectionProps) {
  return (
    <SectionWrapper
      id={block.id}
      ambientId={resolveSectionId(block.id) as SectionId}
      ariaLabel={block.headline}
    >
      <CommercialBlockContent block={block} />
    </SectionWrapper>
  );
}
