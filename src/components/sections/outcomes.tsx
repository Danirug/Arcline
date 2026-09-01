import { outcomes } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function OutcomesSection() {
  return (
    <section
      id="outcomes"
      className="relative overflow-hidden bg-graphite text-off-white scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 0%, #315cff33, transparent 60%)",
        }}
      />

      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl md:mb-20">
          <Reveal>
            <SectionLabel>{outcomes.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-off-white">
              {outcomes.headline}
            </h2>
          </Reveal>
        </div>

        <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, index) => (
            <Reveal key={item} delay={index * 40}>
              <li className="flex min-h-[4.5rem] items-center bg-graphite px-6 py-4 text-sm text-off-white/90 md:px-7">
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
