"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";

import { navigation } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-b border-soft-grey/80 bg-warm-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container as="nav" aria-label="Main navigation">
        <div className="flex h-[4.5rem] items-center justify-between md:h-20">
          <Logo />

          <div className="hidden items-center gap-10 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate transition-colors hover:text-carbon"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="group inline-flex h-10 items-center gap-2 bg-arc-blue px-5 text-sm font-medium text-white transition-colors hover:bg-arc-blue-hover"
            >
              Start a project
              <ArrowUpRightIcon
                className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                weight="bold"
              />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-carbon md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <XIcon className="size-5" weight="regular" />
            ) : (
              <ListIcon className="size-5" weight="regular" />
            )}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[4.5rem] z-40 bg-warm-ivory transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <Container className="flex h-full flex-col gap-1 pt-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-soft-grey py-5 text-2xl font-medium tracking-[-0.02em] text-carbon"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 bg-arc-blue px-6 text-sm font-medium text-white"
          >
            Start a project
            <ArrowUpRightIcon className="size-3.5" weight="bold" />
          </Link>
        </Container>
      </div>
    </header>
  );
}
