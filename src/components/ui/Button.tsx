"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "gold";
type ButtonTone = "light" | "dark";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  external?: boolean;
  breathe?: boolean;
};

const goldStyle = "btn-gold btn-gold-cta gold-gradient-bg font-semibold";

const darkStyles: Record<Exclude<ButtonVariant, "gold">, string> = {
  primary:
    "btn-interactive bg-white text-navy font-medium hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98]",
  secondary:
    "btn-interactive btn-secondary-dark border border-white/30 bg-white/[0.06] text-white backdrop-blur-0 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.1] active:scale-[0.98]",
  ghost: "btn-interactive text-white/75 hover:text-white hover:bg-white/[0.08]",
};

const lightStyles: Record<Exclude<ButtonVariant, "gold">, string> = {
  primary:
    "btn-interactive bg-navy text-white font-medium hover:-translate-y-0.5 hover:bg-[#162847] hover:shadow-[0_8px_24px_rgba(15,31,61,0.25)] active:scale-[0.98]",
  secondary:
    "btn-interactive border border-neutral-300 bg-white text-navy hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.98]",
  ghost: "btn-interactive text-neutral-600 hover:text-navy hover:bg-neutral-100",
};

function breatheClass(variant: ButtonVariant, tone: ButtonTone, breathe?: boolean) {
  if (!breathe) return "";
  if (variant === "gold") return "btn-gold-breathe";
  if (variant === "secondary" && tone === "dark") return "btn-secondary-breathe";
  return "";
}

/** Ola suave — solo transform por letra (GPU) */
function GoldWaveText({ text }: { text: string }) {
  return (
    <span className="btn-gold-wave-text">
      {text.split("").map((char, i) => (
        <span
          key={`${i}-${char}`}
          className="btn-gold-wave-char"
          style={{ animationDelay: `${i * 0.11}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function Inner({
  children,
  variant,
  tone,
  className,
  breathe,
}: {
  children: ReactNode;
  variant: ButtonVariant;
  tone: ButtonTone;
  className?: string;
  breathe?: boolean;
}) {
  const styles =
    variant === "gold"
      ? goldStyle
      : tone === "light"
        ? lightStyles[variant]
        : darkStyles[variant];

  return (
    <span
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium tracking-[-0.01em] transition-all duration-300 ease-out ${styles} ${breatheClass(variant, tone, breathe)} ${className ?? ""}`}
    >
      <span className="relative z-[1]">
        {variant === "gold" && typeof children === "string" ? (
          <GoldWaveText text={children} />
        ) : (
          children
        )}
      </span>
      {variant === "gold" && (
        <span className="btn-gold-arrow relative z-[1] inline-block" aria-hidden>
          →
        </span>
      )}
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  tone = "dark",
  className = "",
  type = "button",
  onClick,
  external,
  breathe = false,
}: ButtonProps) {
  const wrapper =
    "group inline-flex focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-from";

  const shouldBreathe = breathe || variant === "gold";

  if (href) {
    if (external) {
      return (
        <a href={href} className={wrapper} target="_blank" rel="noopener noreferrer">
          <Inner variant={variant} tone={tone} className={className} breathe={shouldBreathe}>
            {children}
          </Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={wrapper} onClick={onClick}>
        <Inner variant={variant} tone={tone} className={className} breathe={shouldBreathe}>
          {children}
        </Inner>
      </Link>
    );
  }

  return (
    <button type={type} className={wrapper} onClick={onClick}>
      <Inner variant={variant} tone={tone} className={className} breathe={shouldBreathe}>
        {children}
      </Inner>
    </button>
  );
}
