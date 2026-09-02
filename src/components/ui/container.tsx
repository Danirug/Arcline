import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  id?: string;
  /** Edge-aligned layout for hero/header — avoids large empty gutters on wide monitors */
  inset?: "default" | "edge";
};

export function Container({
  children,
  className,
  as: Component = "div",
  id,
  inset = "default",
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "w-full",
        inset === "edge"
          ? "px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14"
          : "mx-auto max-w-7xl px-6 md:px-8 lg:px-10 xl:max-w-[90rem] xl:px-12 2xl:max-w-[96rem]",
        className
      )}
    >
      {children}
    </Component>
  );
}
