import { challenges, proposition } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export function PropositionSection() {
  return (
    <section className="border-b border-soft-grey bg-white">
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div data-animate="fade-up">
              <SectionLabel>{proposition.label}</SectionLabel>
            </div>
            <h2
              data-animate="fade-up"
              className="mt-5 max-w-lg text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-carbon"
            >
              {proposition.headline}
            </h2>
          </div>

          <p
            data-animate="fade-up"
            className="max-w-xl text-base leading-relaxed text-slate md:text-[1.0625rem] lg:pt-10"
          >
            {proposition.body}
          </p>
        </div>

        <div className="mt-20 md:mt-24">
          <div
            data-proposition="line"
            className="mb-16 h-px bg-soft-grey"
            aria-hidden
          />

          <p data-animate="fade-up" className="mb-10 max-w-sm text-sm text-slate">
            Common challenges we help organisations address:
          </p>

          <ul
            data-animate="stagger"
            className="grid gap-px border border-soft-grey bg-soft-grey md:grid-cols-2 lg:grid-cols-3"
          >
            {challenges.map((challenge) => (
              <li
                key={challenge}
                data-stagger-item
                className="flex h-full min-h-[5.5rem] items-center bg-white px-6 py-5 text-sm leading-relaxed text-carbon md:px-7"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
