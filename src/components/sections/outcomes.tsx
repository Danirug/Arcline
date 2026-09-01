import { outcomes } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function OutcomesSection() {
  return (
    <section
      id="outcomes"
      data-section="outcomes"
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
        <div data-outcomes="header" className="mb-16 max-w-2xl md:mb-20">
          <div data-animate="fade-up">
            <SectionLabel>{outcomes.label}</SectionLabel>
          </div>
          <h2
            data-animate="fade-up"
            className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-off-white"
          >
            {outcomes.headline}
          </h2>
        </div>

        <ul
          data-outcomes="grid"
          data-animate="stagger"
          className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {outcomes.items.map((item) => (
            <li
              key={item}
              data-stagger-item
              className="flex min-h-[4.5rem] items-center bg-graphite px-6 py-4 text-sm text-off-white/90 md:px-7"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
