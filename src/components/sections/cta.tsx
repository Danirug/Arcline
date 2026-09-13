import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { cta } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function CtaSection() {
  return (
    <section id="contact" className="bg-warm-ivory scroll-mt-28">
      <Container className="py-20 md:py-28 lg:py-32">
        <div
          data-cta="card"
          className="relative overflow-hidden rounded-2xl border border-soft-grey bg-white p-10 md:p-14 lg:p-16"
        >
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
              className="group inline-flex h-[3.25rem] shrink-0 items-center justify-center gap-2.5 rounded-xl bg-arc-blue px-7 text-base font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_12px_28px_-10px_rgba(49,92,255,0.65)] transition-[background-color,transform,box-shadow] hover:bg-arc-blue-hover active:translate-y-px lg:mb-1"
            >
              {cta.button.label}
              <ArrowUpRightIcon
                className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                weight="bold"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
