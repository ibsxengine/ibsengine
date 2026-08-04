"use client";

import { NAV_MAIN } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { navEase } from "@/lib/motion/variants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const isContactPage = pathname === "/contacto";
  const links = isContactPage
    ? [...NAV_MAIN, { label: "Trabaja con nosotros", href: "/contacto#trabaja" }]
    : NAV_MAIN;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: navEase }}
          className="fixed inset-0 z-[190] flex flex-col justify-center bg-navy px-8 pt-[4.5rem] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onClick={onClose}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45, ease: navEase }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-bodoni block border-b border-white/[0.08] py-4 text-2xl font-semibold text-off-white transition-colors hover:text-gold-to sm:text-3xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button href="/contacto" variant="gold" onClick={onClose}>
                Solicitar auditoría
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
