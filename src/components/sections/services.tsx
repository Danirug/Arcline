import { services } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-soft-grey bg-warm-ivory scroll-mt-20">
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl md:mb-20">
          <Reveal>
            <SectionLabel>What we offer</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-carbon">
              Connect the tools, data and processes behind your business.
            </h2>
          </Reveal>
        </div>

        <div className="divide-y divide-soft-grey border-y border-soft-grey">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 60}>
              <article className="group grid gap-6 py-10 md:grid-cols-[4rem_1fr_1.2fr] md:gap-10 md:py-12 lg:py-14">
                <p className="font-mono text-xs tracking-wider text-slate">
                  {service.number}
                </p>

                <div className="space-y-3">
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-carbon md:text-[1.375rem]">
                    {service.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-slate md:text-[0.9375rem]">
                    {service.summary}
                  </p>
                </div>

                <ul className="space-y-2.5 md:pt-1">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm leading-relaxed text-slate before:mt-2 before:size-1 before:shrink-0 before:bg-arc-blue before:content-['']"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
