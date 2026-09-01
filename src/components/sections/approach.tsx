import {
  ChartLineUpIcon,
  CodeIcon,
  MagnifyingGlassIcon,
  PencilLineIcon,
} from "@phosphor-icons/react/dist/ssr";

import { approach } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

const stepIcons = [
  MagnifyingGlassIcon,
  PencilLineIcon,
  CodeIcon,
  ChartLineUpIcon,
] as const;

export function ApproachSection() {
  return (
    <section
      id="approach"
      className="border-b border-white/10 bg-graphite text-off-white scroll-mt-20"
    >
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-xl md:mb-20">
          <Reveal>
            <SectionLabel>{approach.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {approach.headline}
            </h2>
          </Reveal>
        </div>

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {approach.steps.map((step, index) => {
            const Icon = stepIcons[index];

            return (
              <Reveal key={step.title} delay={index * 80}>
                <li className="grid gap-6 py-10 md:grid-cols-[3rem_12rem_1fr] md:items-start md:gap-10 md:py-12">
                  <Icon
                    className="size-5 text-arc-blue"
                    weight="regular"
                    aria-hidden
                  />
                  <h3 className="text-lg font-medium tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-off-white/70 md:text-[0.9375rem]">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
