"use client";

import { NAV_MAIN, SITE, WHATSAPP } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { navEase } from "@/lib/motion/variants";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isContactPage = pathname === "/contacto";

  useEffect(() => {
    let raf = 0;
    let lastScrolled = scrolled;
    let lastProgress = -1;

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = max > 0 ? y / max : 0;
      const nextScrolled = y > 8;

      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (Math.abs(nextProgress - lastProgress) > 0.008) {
        lastProgress = nextProgress;
        const bar = progressRef.current;
        if (bar) {
          bar.style.transform = `scaleX(${nextProgress})`;
          bar.style.opacity = nextScrolled ? "0.9" : "0.35";
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function handleLogoClick(e: React.MouseEvent) {
    if (menuOpen) {
      setMenuOpen(false);
    }
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    e.preventDefault();
    router.push("/");
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: navEase }}
        className={`shell-header group/header fixed inset-x-0 top-0 z-[200] transition-shadow duration-500 ${
          scrolled ? "shell-header-scrolled" : ""
        }`}
        data-orb-minimal
      >
        <div
          ref={progressRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left gold-gradient-bg opacity-80 transition-opacity duration-300"
          style={{ transform: "scaleX(0)", opacity: 0.35 }}
          aria-hidden
        />

        <Container
          as="nav"
          aria-label="Navegación principal"
          className="flex h-[4.25rem] items-center gap-6 sm:h-[4.5rem] lg:gap-8"
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="logo-header-wrap relative z-[210] flex h-9 shrink-0 items-center sm:h-10 transition-transform duration-500 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <Logo size="header" priority />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex lg:h-10">
            <div
              className={`flex h-10 items-center ${isContactPage ? "gap-3 xl:gap-4" : "gap-5 xl:gap-7"}`}
            >
              {NAV_MAIN.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.55, ease: navEase }}
                >
                  <Link
                    href={link.href}
                    className={`nav-desktop-link group ${isContactPage ? "nav-desktop-link--compact" : ""} ${isActive(link.href) ? "is-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={`ml-auto flex h-9 shrink-0 items-center sm:h-10 lg:ml-0 ${isContactPage ? "gap-2" : "gap-3"}`}>
            {isContactPage && (
              <Link
                href="/contacto#trabaja"
                className="nav-desktop-link nav-desktop-link--compact nav-desktop-link--ghost hidden lg:inline-flex"
              >
                Trabaja con nosotros
              </Link>
            )}
            <Button
              href="/contacto"
              variant="gold"
              breathe
              className={`hidden sm:inline-flex ${isContactPage ? "h-8 px-4 text-[12px]" : "h-9 px-5 text-sm lg:h-10 lg:px-6"}`}
            >
              Solicitar auditoría
            </Button>
            <button
              type="button"
              className="relative z-[210] flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 hover:text-navy lg:hidden"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                {menuOpen ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </Container>
      </motion.header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell relative">
      <div className="footer-gold-rule" aria-hidden />
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-base text-navy">{SITE.tagline}</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_MAIN.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-gold text-[13px] text-neutral-600 transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-5 text-[12px] text-neutral-500">
          © {year} {SITE.name} · {SITE.email} ·{" "}
          <Link href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
            WhatsApp
          </Link>
        </p>
      </Container>
    </footer>
  );
}
