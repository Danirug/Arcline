import Link from "next/link";
import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { hero } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { HeroAgentBackground } from "@/components/sections/hero-agent-visual";

export function HeroSection() {
  return (
    <section
      data-section="hero"
      className="relative min-h-[92vh] overflow-hidden border-b border-soft-grey bg-warm-ivory"
    >
      <div data-hero="background" className="absolute inset-0">
        <HeroAgentBackground />
      </div>
      <div
        data-hero="grid"
        className="editorial-grid pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <Container
        inset="edge"
        className="relative z-10 flex min-h-[92vh] flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32"
      >
        <div data-hero="content" className="max-w-3xl">
          <div data-hero="eyebrow">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </div>

          <h1
            data-hero="headline"
            className="mt-6 text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-carbon"
          >
            {hero.headline}
          </h1>

          <p
            data-hero="subheadline"
            className="mt-8 max-w-xl text-base leading-relaxed text-slate md:mt-10 md:text-[1.0625rem]"
          >
            {hero.subheadline}
          </p>

          <div
            data-hero="actions"
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-10"
          >
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex h-12 items-center justify-center gap-2.5 bg-arc-blue px-6 text-sm font-medium text-white transition-colors hover:bg-arc-blue-hover"
            >
              {hero.primaryCta.label}
              <ArrowUpRightIcon
                className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                weight="bold"
              />
            </Link>

            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex h-12 items-center gap-2 px-1 text-sm font-medium text-carbon transition-colors hover:text-arc-blue"
            >
              {hero.secondaryCta.label}
              <ArrowRightIcon
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                weight="regular"
              />
            </Link>
          </div>
        </div>

        <div
          data-hero="footer"
          className="mt-auto flex items-center gap-6 pt-20 md:pt-28"
        >
          <div className="h-px flex-1 bg-soft-grey/80" />
          <p className="shrink-0 text-xs tracking-[0.12em] text-slate uppercase">
            Intelligent systems for better business operations
          </p>
        </div>
      </Container>
    </section>
  );
}
