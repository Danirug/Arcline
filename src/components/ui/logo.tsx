import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-baseline gap-0.5 text-[1.0625rem] font-medium tracking-[-0.02em] transition-opacity hover:opacity-80",
        variant === "light" ? "text-carbon" : "text-off-white",
        className
      )}
      aria-label={`${site.name} home`}
    >
      <span>{site.name}</span>
      <span className="text-arc-blue" aria-hidden>
        /
      </span>
    </Link>
  );
}
