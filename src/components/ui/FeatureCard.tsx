import { type ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function FeatureCard({
  title,
  description,
  children,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group rounded-sm border border-white/[0.08] bg-white/[0.02] p-5 transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-gold-from/25 hover:bg-white/[0.04] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] sm:p-6 ${className}`}
    >
      <h3 className="font-serif text-base font-semibold text-off-white transition-colors group-hover:text-gold-to sm:text-lg">
        {title}
      </h3>
      {description && (
        <p className="text-text-secondary mt-2 text-sm leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
