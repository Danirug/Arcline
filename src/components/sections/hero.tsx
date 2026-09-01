import Link from "next/link";
import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { hero } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-soft-grey bg-warm-ivory">
      <div className="editorial-grid hero-gradient absolute inset-0 pointer-events-none" aria-hidden />

      <Container className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-12">
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel>{hero.eyebrow}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-[clamp(2.375rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-carbon">
                {hero.headline}
              </h1>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="space-y-8 lg:pb-2">
              <p className="max-w-md text-base leading-relaxed text-slate md:text-[1.0625rem]">
                {hero.subheadline}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mt-20 flex items-center gap-6 md:mt-28">
            <div className="h-px flex-1 bg-soft-grey" />
            <p className="shrink-0 text-xs tracking-[0.12em] text-slate uppercase">
              Intelligent systems for better business operations
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
