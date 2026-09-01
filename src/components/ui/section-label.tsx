import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
};

export function SectionLabel({
  children,
  className,
  variant = "light",
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-medium uppercase tracking-[0.2em]",
        variant === "light" ? "text-arc-blue" : "text-arc-blue",
        className
      )}
    >
      {children}
    </p>
  );
}
