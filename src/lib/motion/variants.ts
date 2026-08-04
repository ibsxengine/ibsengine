/** Variantes GPU-friendly — sin blur (evita lag) */

export const fadeUp = {
  hidden: { opacity: 0, y: 72 },
  visible: { opacity: 1, y: 0 },
};

/** Hero — entrada más rápida y menos desplazamiento */
export const heroFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpStrong = {
  hidden: { opacity: 0, y: 96, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -88, y: 20 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 88, y: 20 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const clipReveal = {
  hidden: { opacity: 0, y: 36, clipPath: "inset(100% 0 0 0)" },
  visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
};

export const riseScale = {
  hidden: { opacity: 0, y: 104, scale: 0.86 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const driftUp = {
  hidden: { opacity: 0, y: 96, rotate: -2.4, scale: 0.94 },
  visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
};

/** Arco lateral — más carácter que un slide plano */
export const arcFromLeft = {
  hidden: { opacity: 0, x: -96, y: 48, rotate: -3 },
  visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
};

export const arcFromRight = {
  hidden: { opacity: 0, x: 96, y: 48, rotate: 3 },
  visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
};

/** Entrada con pop suave */
export const popRise = {
  hidden: { opacity: 0, y: 120, scale: 0.82 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Deslizamiento con ligero skew */
export const skewSlideUp = {
  hidden: { opacity: 0, y: 80, skewY: 4 },
  visible: { opacity: 1, y: 0, skewY: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const staggerBullets = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.22 },
  },
};

export const bulletReveal = {
  hidden: { opacity: 0, x: -20, y: 6 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.52, ease: [0.12, 1.05, 0.28, 1] as const },
  },
};

export const layerReveal = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

/** Entrada ligera — solo opacity + poco desplazamiento (scroll fluido) */
export const scrollRevealLite = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

/** Scroll bidireccional — GPU only, sin rotate/clip/spring */
export const fadeUpFluid = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const slideFromLeftFluid = {
  hidden: { opacity: 0, x: -36, y: 14 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const slideFromRightFluid = {
  hidden: { opacity: 0, x: 36, y: 14 },
  visible: { opacity: 1, x: 0, y: 0 },
};

export const riseScaleFluid = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const wipeFromLeftFluid = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const wipeFromRightFluid = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const driftUpFluid = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export const popRiseFluid = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const staggerContainerFluid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const staggerBulletsFluid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.14 },
  },
};

export const bulletRevealFluid = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scrollViewportFluid = {
  once: false,
  amount: 0.12,
  margin: "-3% 0px",
} as const;

export const scrollViewport = {
  once: false,
  amount: 0.14,
  margin: "-6% 0px",
} as const;

/** Móvil / táctil: umbral bajo — sin once para que salga al subir scroll */
export const scrollViewportMobile = {
  once: false,
  amount: 0.06,
  margin: "0px 0px -8% 0px",
} as const;

export const layerRevealTransition = {
  duration: 0.72,
  ease: [0.12, 1.05, 0.28, 1] as const,
};

export const scrollRevealTransitionLite = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const scrollRevealTransitionFluid = {
  duration: 0.52,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const defaultTransition = {
  duration: 0.76,
  ease: [0.12, 1.05, 0.28, 1] as const,
};

export const layerRevealReduced = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const zoomOut = {
  hidden: { opacity: 0, scale: 1.14 },
  visible: { opacity: 1, scale: 1 },
};

export const bounceIn = {
  hidden: { opacity: 0, y: 100, scale: 0.72 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 20, mass: 0.9 },
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -72 },
  visible: { opacity: 1, y: 0 },
};

export const wipeFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

export const wipeFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

export const heroEase = [0.16, 1, 0.3, 1] as const;

export const navEase = [0.16, 1, 0.3, 1] as const;
