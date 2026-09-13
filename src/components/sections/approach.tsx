"use client";

import { useState } from "react";
import {
  ChartLineUpIcon,
  CodeIcon,
  MagnifyingGlassIcon,
  PencilLineIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { approach } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const stepIcons = [
  MagnifyingGlassIcon,
  PencilLineIcon,
  CodeIcon,
  ChartLineUpIcon,
] as const;

const layoutSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.8,
};

type MorphPillCardProps = {
  index: number;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
};

function MorphPillCard({
  index,
  title,
  description,
  isOpen,
  onToggle,
  reducedMotion,
}: MorphPillCardProps) {
  const Icon = stepIcons[index];

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      transition={reducedMotion ? { duration: 0.01 } : layoutSpring}
      className={cn(
        "group relative cursor-pointer overflow-hidden border bg-white/[0.04] text-left outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-arc-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite",
        isOpen
          ? "col-span-1 border-arc-blue/35 bg-white/[0.07] sm:col-span-2"
          : "border-white/10 hover:border-white/20 hover:bg-white/[0.06]",
        isOpen ? "rounded-2xl p-8 md:p-10" : "rounded-full px-5 py-4 md:px-6 md:py-5"
      )}
    >
      {isOpen && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-arc-blue/10 via-transparent to-transparent"
          aria-hidden
        />
      )}

      <motion.div layout className="relative flex items-center gap-4">
        <motion.div
          layout
          className={cn(
            "flex shrink-0 items-center justify-center border border-white/10 bg-arc-blue/10",
            isOpen ? "size-12" : "size-10"
          )}
        >
          <Icon
            className={cn("text-arc-blue", isOpen ? "size-5" : "size-4")}
            weight="regular"
            aria-hidden
          />
        </motion.div>

        <div className="min-w-0 flex-1">
          <motion.div layout className="flex items-center gap-3">
            <span className="font-mono text-[0.625rem] tracking-wider text-slate">
              0{index + 1}
            </span>
            <motion.h3
              layout
              className={cn(
                "font-medium tracking-[-0.02em] text-off-white",
                isOpen ? "text-xl md:text-2xl" : "text-sm md:text-base"
              )}
            >
              {title}
            </motion.h3>
          </motion.div>
        </div>

        <motion.span
          layout
          className={cn(
            "shrink-0 font-mono text-lg leading-none text-slate transition-colors",
            isOpen ? "text-arc-blue" : "text-off-white/30 group-hover:text-off-white/60"
          )}
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reducedMotion ? false : { opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 20,
            }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0, marginTop: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0.01 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative overflow-hidden"
          >
            <p className="max-w-2xl text-sm leading-relaxed text-off-white/65 md:text-base md:leading-relaxed">
              {description}
            </p>

            <motion.div
              className="mt-8 h-px w-full bg-gradient-to-r from-arc-blue/60 via-arc-blue/20 to-transparent"
              initial={reducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left center" }}
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function ApproachSection() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="approach"
      className="relative overflow-hidden border-b border-white/10 bg-graphite text-off-white scroll-mt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(49,92,255,0.12), transparent 60%)",
        }}
      />

      <Container className="relative py-20 md:py-28 lg:py-32">
        <motion.div
          className="mb-12 max-w-2xl md:mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <SectionLabel>{approach.label}</SectionLabel>
          <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            {approach.headline}
          </h2>
        </motion.div>

        {/* Pill selector — morphing active indicator */}
        <div className="mb-8 flex flex-wrap gap-2 md:mb-10">
          {approach.steps.map((step, index) => {
            const Icon = stepIcons[index];
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={step.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative flex items-center gap-2.5 overflow-hidden rounded-full border px-4 py-2.5 text-left transition-colors md:px-5 md:py-3",
                  isActive
                    ? "border-arc-blue/40 text-off-white"
                    : "border-white/10 text-off-white/55 hover:border-white/20 hover:text-off-white/80"
                )}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="approach-pill-indicator"
                    className="absolute inset-0 rounded-full bg-arc-blue/15"
                    transition={
                      reducedMotion ? { duration: 0.01 } : layoutSpring
                    }
                    aria-hidden
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 size-4",
                    isActive ? "text-arc-blue" : "text-slate"
                  )}
                  weight="regular"
                  aria-hidden
                />
                <span className="relative z-10 text-sm font-medium tracking-[-0.01em]">
                  {step.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Morphing pill cards */}
        <motion.div
          layout
          className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4"
        >
          {approach.steps.map((step, index) => (
            <MorphPillCard
              key={step.title}
              index={index}
              title={step.title}
              description={step.description}
              isOpen={activeIndex === index}
              onToggle={() => handleSelect(index)}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
