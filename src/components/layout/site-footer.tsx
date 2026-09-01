import Link from "next/link";

import { footer, site } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-soft-grey bg-warm-ivory">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <div className="space-y-6">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-slate">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Footer navigation" className="flex flex-col gap-3 md:items-end">
              {footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate transition-colors hover:text-carbon"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-slate transition-colors hover:text-arc-blue"
              >
                {site.email}
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-soft-grey pt-8 text-xs text-slate md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-soft-grey">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
