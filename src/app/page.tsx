import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ApproachSection } from "@/components/sections/approach";
import { CtaSection } from "@/components/sections/cta";
import { HeroSection } from "@/components/sections/hero";
import { OutcomesSection } from "@/components/sections/outcomes";
import { PropositionSection } from "@/components/sections/proposition";
import { ServicesSection } from "@/components/sections/services";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <PropositionSection />
        <ServicesSection />
        <OutcomesSection />
        <ApproachSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
