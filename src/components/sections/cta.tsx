import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { cta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section id="contact" className="bg-warm-ivory scroll-mt-20">
      <Container className="py-20 md:py-28 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden border border-soft-grey bg-white p-10 md:p-14 lg:p-16">
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-64 opacity-30"
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle, #315cff 0%, transparent 70%)",
              }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <div className="max-w-2xl">
                <SectionLabel>{cta.label}</SectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-carbon">
                  {cta.headline}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-slate">
                  {cta.body}
                </p>
              </div>

              <Link
                href={cta.button.href}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 bg-arc-blue px-7 text-sm font-medium text-white transition-colors hover:bg-arc-blue-hover lg:mb-1"
              >
                {cta.button.label}
                <ArrowUpRightIcon
                  className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                  weight="bold"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
