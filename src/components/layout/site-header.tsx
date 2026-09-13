"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";

import { navActions, navigation } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-5">
      <nav
        aria-label="Main navigation"
        className={cn(
          "pointer-events-auto relative mx-auto flex h-[3.75rem] w-full max-w-[90rem] items-center gap-4 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 lg:h-[4.25rem] lg:px-6",
          "border-carbon/[0.08] bg-[#f8f8f6]/85 backdrop-blur-xl",
          scrolled || menuOpen
            ? "bg-[#f8f8f6]/95 shadow-[0_1px_2px_rgba(17,19,21,0.04),0_16px_48px_-16px_rgba(17,19,21,0.14)]"
            : "shadow-[0_1px_2px_rgba(17,19,21,0.03),0_8px_32px_-16px_rgba(17,19,21,0.08)]"
        )}
      >
        <Logo />

        <div className="ml-6 hidden items-center gap-1 lg:flex xl:ml-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[0.9375rem] text-carbon/70 transition-colors hover:bg-carbon/[0.05] hover:text-carbon xl:px-3.5 xl:text-base"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href={navActions.signIn.href}
            className="rounded-lg px-4 py-2 text-[0.9375rem] text-carbon/70 transition-colors hover:bg-carbon/[0.05] hover:text-carbon xl:text-base"
          >
            {navActions.signIn.label}
          </Link>
          <Link
            href={navActions.cta.href}
            className="group ml-2 inline-flex h-11 items-center gap-2 rounded-xl bg-arc-blue px-5 text-[0.9375rem] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-8px_rgba(49,92,255,0.6)] transition-[background-color,transform,box-shadow] hover:bg-arc-blue-hover hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_10px_24px_-8px_rgba(49,92,255,0.7)] active:translate-y-px xl:text-base"
          >
            {navActions.cta.label}
            <ArrowUpRightIcon
              className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              weight="bold"
            />
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-10 items-center justify-center rounded-lg text-carbon transition-colors hover:bg-carbon/[0.05] lg:hidden"
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
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "mx-auto mt-2 w-full max-w-[90rem] origin-top rounded-2xl border border-carbon/[0.08] bg-[#f8f8f6]/95 p-3 shadow-[0_24px_64px_-24px_rgba(17,19,21,0.25)] backdrop-blur-xl transition-[opacity,transform] duration-300 lg:hidden",
          menuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-[0.98] opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 text-lg font-medium tracking-[-0.01em] text-carbon transition-colors hover:bg-carbon/[0.05]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-carbon/[0.08] pt-3">
          <Link
            href={navActions.signIn.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-carbon/10 bg-white text-[0.9375rem] font-medium text-carbon"
          >
            {navActions.signIn.label}
          </Link>
          <Link
            href={navActions.cta.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-arc-blue text-[0.9375rem] font-medium text-white"
          >
            {navActions.cta.label}
            <ArrowUpRightIcon className="size-3.5" weight="bold" />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 -z-10 bg-carbon/20 transition-opacity duration-300 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />
    </header>
  );
}
