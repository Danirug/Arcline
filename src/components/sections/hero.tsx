import Link from "next/link";
import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { hero } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { HeroWorkflowVisual } from "@/components/sections/hero-workflow-visual";

export function HeroSection() {
  return (
    <section
      data-section="hero"
      className="relative overflow-hidden border-b border-carbon/[0.08] bg-warm-ivory"
    >
      {/* Soft ambient light behind the visual */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 78% 18%, rgba(49,92,255,0.10), transparent 70%), radial-gradient(40% 40% at 12% 30%, rgba(49,92,255,0.05), transparent 70%)",
        }}
      />

      <Container inset="edge" className="relative z-10 pt-24 sm:pt-28 lg:pt-32">
        <div data-hero="visual" className="max-w-[90rem]">
          <HeroWorkflowVisual />
        </div>

        <div
          data-hero="content"
          className="mt-14 max-w-[46rem] pb-16 sm:mt-16 md:pb-20 lg:mt-20 lg:pb-24"
        >
          <h1
            data-hero="headline"
            className="text-balance text-[clamp(2.75rem,7.4vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.035em] text-carbon"
          >
            {hero.headline}
          </h1>

          <p
            data-hero="subheadline"
            className="mt-7 max-w-[34rem] text-[1.0625rem] leading-[1.4] text-carbon/75 sm:text-lg md:mt-9 md:text-[1.25rem] md:leading-[1.35]"
          >
            {hero.subheadline}
          </p>

          <div
            data-hero="actions"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11"
          >
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-xl bg-arc-blue px-6 text-base font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_12px_28px_-10px_rgba(49,92,255,0.65)] transition-[background-color,transform,box-shadow] hover:bg-arc-blue-hover hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_16px_32px_-10px_rgba(49,92,255,0.7)] active:translate-y-px"
            >
              {hero.primaryCta.label}
              <ArrowUpRightIcon
                className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                weight="bold"
              />
            </Link>

            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-xl px-5 text-base font-medium text-carbon transition-colors hover:bg-carbon/[0.05]"
            >
              {hero.secondaryCta.label}
              <ArrowRightIcon
                className="size-4 transition-transform group-hover:translate-x-0.5"
                weight="regular"
              />
            </Link>
          </div>
        </div>
      </Container>

    </section>
  );
}
