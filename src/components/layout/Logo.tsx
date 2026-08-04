import { SITE } from "@/lib/constants";
import Image from "next/image";

/** Logo único JPG — fondo blanco integrado con header/footer #fff */
const LOGO_SRC = "/ibs_logo.jpg";

type LogoSize = "header" | "footer";

type LogoProps = {
  size?: LogoSize;
  priority?: boolean;
  className?: string;
};

const SIZES: Record<LogoSize, string> = {
  /** Solo marca + flecha — recorte superior del JPG */
  header: "h-9 w-auto max-w-[120px] object-contain object-left sm:h-10 sm:max-w-[132px]",
  /** Proporcional a la columna de navegación */
  footer: "h-auto w-full max-w-[118px] object-contain object-left lg:object-right",
};

export function Logo({ size = "header", priority = false, className = "" }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={`${SITE.name} — ${SITE.tagline}`}
      width={640}
      height={320}
      className={`${SIZES[size]} ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
