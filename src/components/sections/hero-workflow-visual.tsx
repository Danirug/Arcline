"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  BrowserIcon,
  CheckIcon,
  CircleNotchIcon,
  LightningIcon,
  PlugsConnectedIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

import { heroScenario } from "@/lib/content";
import { EASE, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const SYSTEM_ICONS = [BrowserIcon, PlugsConnectedIcon, SparkleIcon] as const;

function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 inline-flex h-7 items-center gap-1.5 rounded-full border border-arc-blue/15 bg-[#e6ecff] px-3 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-arc-blue",
        className
      )}
    >
      <LightningIcon className="size-3" weight="fill" />
      {children}
    </div>
  );
}

const MONO_LABEL =
  "font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-carbon";

/**
 * Animated "requirement → solution build → connected systems → result" story.
 * On large screens the four stages sit on a stepped connector line that draws
 * in blue as the request travels across; on smaller screens they stack along a
 * vertical rail. The requirement cycles through three examples, one per loop,
 * and everything respects prefers-reduced-motion.
 */
export function HeroWorkflowVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const { ask, build, systems, result } = heroScenario;
  const first = ask.examples[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const askCard = q("[data-wf='ask-card']");
      const send = q("[data-wf='send']");
      const line1 = q("[data-wf='line-1']");
      const bend = q("[data-wf='bend']");
      const line2 = q("[data-wf='line-2']");
      const rail = q("[data-wf='rail']");
      const steps = q("[data-wf='step']");
      const spinners = q("[data-wf='spinner']");
      const checks = q("[data-wf='check']");
      const systemRows = q("[data-wf='system']");
      const resultCard = q("[data-wf='result']");
      const traits = q("[data-wf='trait']");

      if (prefersReducedMotion()) {
        gsap.set([askCard, steps, resultCard, systemRows, traits], {
          opacity: 1,
          y: 0,
          x: 0,
        });
        gsap.set(spinners, { opacity: 0 });
        gsap.set(checks, { opacity: 1 });
        gsap.set([line1, line2, rail], { scaleX: 1, scaleY: 1 });
        gsap.set(bend, { strokeDashoffset: 0 });
        return;
      }

      let exampleIndex = 0;
      const showExample = (index: number) => {
        const example = ask.examples[index];
        if (promptRef.current) promptRef.current.textContent = example.prompt;
        if (categoryRef.current)
          categoryRef.current.textContent = example.category;
      };

      const STEP_GAP = 0.5;
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2.8,
        defaults: { ease: EASE.out },
        onRepeat: () => {
          exampleIndex = (exampleIndex + 1) % ask.examples.length;
          showExample(exampleIndex);
        },
      });

      tl.fromTo(
        askCard,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          send,
          { scale: 1 },
          {
            scale: 0.8,
            duration: 0.14,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut",
          },
          "+=0.5"
        )
        .fromTo(line1, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "none" })
        .fromTo(
          rail,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.6, ease: "none" },
          "<"
        )
        .fromTo(
          bend,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.3, ease: "none" }
        )
        .addLabel("flow", "-=0.05")
        .fromTo(
          line2,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "none" },
          "flow"
        );

      steps.forEach((step, index) => {
        const at = index * STEP_GAP;
        tl.fromTo(
          step,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.45 },
          `flow+=${0.15 + at}`
        )
          .to(spinners[index], { opacity: 0, duration: 0.2 }, `flow+=${0.62 + at}`)
          .to(checks[index], { opacity: 1, duration: 0.2 }, `flow+=${0.62 + at}`);
      });

      systemRows.forEach((row, index) => {
        tl.to(row, { opacity: 1, duration: 0.5 }, `flow+=${0.7 + index * 0.65}`);
      });

      const resultAt = 0.35 + steps.length * STEP_GAP;
      tl.fromTo(
        resultCard,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85, ease: EASE.expo },
        `flow+=${resultAt}`
      ).fromTo(
        traits,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.12 },
        `flow+=${resultAt + 0.35}`
      );
    }, root);

    return () => ctx.revert();
  }, [ask.examples]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex flex-col gap-9 lg:grid lg:gap-x-8 xl:gap-x-10",
        "lg:grid-cols-[var(--col1)_minmax(0,1fr)_minmax(0,1fr)_var(--col4)]",
        "[--col1:15.5rem] [--col4:18rem] [--gap:2rem] xl:[--col1:17rem] xl:[--col4:20rem] xl:[--gap:2.5rem]",
        "[--y1:calc(0.875rem-1px)] [--drop:4.5rem] [--bend-w:3rem] [--bend-x:calc(var(--col1)+var(--gap)/2)]"
      )}
      aria-label="How ArcLine turns a business requirement into a custom digital solution"
    >
      {/* ── Mobile / tablet: vertical rail ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-8 left-[0.8125rem] top-3 w-[2px] rounded-full bg-[#e3e2da] lg:hidden"
        aria-hidden
      >
        <span
          data-wf="rail"
          className="absolute inset-0 origin-top scale-y-0 rounded-full bg-arc-blue"
        />
      </div>

      {/* ── Desktop: stepped connector ─────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[calc(var(--y1)+var(--drop)+2px)] lg:block"
        aria-hidden
      >
        <div className="absolute left-0 top-[var(--y1)] h-[2px] w-[var(--bend-x)] bg-[#e3e2da]">
          <span
            data-wf="line-1"
            className="absolute inset-0 origin-left scale-x-0 bg-arc-blue"
          />
        </div>
        <svg
          className="absolute top-[var(--y1)] h-[calc(var(--drop)+2px)] w-[var(--bend-w)]"
          style={{ left: "var(--bend-x)" }}
          viewBox="0 0 48 74"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 1H12C24 1 24 1 24 13V61C24 73 24 73 36 73H48"
            stroke="#e3e2da"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-wf="bend"
            d="M0 1H12C24 1 24 1 24 13V61C24 73 24 73 36 73H48"
            stroke="#315cff"
            strokeWidth="2"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute right-0 top-[calc(var(--y1)+var(--drop))] h-[2px] left-[calc(var(--bend-x)+var(--bend-w))] bg-[#e3e2da]">
          <span
            data-wf="line-2"
            className="absolute inset-0 origin-left scale-x-0 bg-arc-blue"
          />
        </div>
      </div>

      {/* ── 1. Business requirement ────────────────────────────────────── */}
      <div className="relative">
        <Tag>{ask.tag}</Tag>
        <div
          data-wf="ask-card"
          className="ml-9 mt-4 max-w-[19rem] rounded-xl border border-carbon/10 bg-white p-4 opacity-0 shadow-[0_12px_27px_rgba(17,19,21,0.06),0_49px_49px_rgba(17,19,21,0.035),0_111px_67px_rgba(17,19,21,0.02)] sm:ml-10 lg:ml-0 lg:max-w-none"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-carbon/40">
            {ask.label}
          </span>
          <p
            ref={promptRef}
            className="mt-2 min-h-[4.2em] text-[0.9375rem] leading-[1.4] text-carbon"
          >
            {first.prompt}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span
              ref={categoryRef}
              className="truncate rounded-md bg-carbon/[0.05] px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-carbon/70"
            >
              {first.category}
            </span>
            <span
              data-wf="send"
              className="flex size-7 shrink-0 items-center justify-center rounded-md bg-arc-blue text-white"
            >
              <ArrowUpIcon className="size-3.5" weight="bold" />
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Solution build ──────────────────────────────────────────── */}
      <div className="relative lg:pt-[var(--drop)]">
        <Tag>{build.tag}</Tag>
        <ul className="ml-9 mt-4 flex flex-col gap-2 sm:ml-10 lg:ml-0 lg:pl-3">
          {build.steps.map((step) => (
            <li
              key={step}
              data-wf="step"
              className={cn(
                "inline-flex w-fit max-w-full items-center gap-2 rounded-md border border-carbon/10 bg-white/80 px-2.5 py-1.5 opacity-0 backdrop-blur-sm",
                MONO_LABEL
              )}
            >
              <span className="relative size-3.5 shrink-0">
                <CircleNotchIcon
                  data-wf="spinner"
                  className="absolute inset-0 size-3.5 text-carbon/35 motion-safe:animate-spin"
                  weight="bold"
                />
                <CheckIcon
                  data-wf="check"
                  className="absolute inset-0 size-3.5 text-arc-blue opacity-0"
                  weight="bold"
                />
              </span>
              <span className="truncate">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── 3. Connected systems ───────────────────────────────────────── */}
      <div className="relative lg:pt-[var(--drop)]">
        <Tag>{systems.tag}</Tag>
        <ul className="ml-9 mt-5 flex flex-col gap-4 sm:ml-10 lg:ml-0 lg:pl-3">
          {systems.items.map((item, index) => {
            const Icon = SYSTEM_ICONS[index % SYSTEM_ICONS.length];
            return (
              <li
                key={item.name}
                data-wf="system"
                className={cn("flex items-start gap-2.5 opacity-30", MONO_LABEL)}
              >
                <Icon className="mt-px size-3.5 shrink-0 text-arc-blue" weight="fill" />
                <span className="leading-[1.55]">
                  <span className="block">{item.name}</span>
                  <span className="block text-carbon/55">{item.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── 4. Result ──────────────────────────────────────────────────── */}
      <div className="relative lg:pt-[var(--drop)]">
        <Tag>{result.tag}</Tag>
        <div
          data-wf="result"
          className="ml-9 mt-4 max-w-[22rem] overflow-hidden rounded-2xl bg-graphite p-5 text-off-white opacity-0 shadow-[0_28px_56px_-20px_rgba(17,19,21,0.5)] sm:ml-10 lg:ml-0 lg:max-w-none"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-off-white/50">
              {result.label}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.08] px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-off-white/80">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {result.status}
            </span>
          </div>

          <p className="mt-3 text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.015em]">
            {result.body}
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-off-white/60">
            {result.traits.map((trait, index) => (
              <li key={trait} data-wf="trait" className="flex items-center gap-2.5 opacity-0">
                {index > 0 && (
                  <span className="size-1 rounded-full bg-arc-blue" aria-hidden />
                )}
                {trait}
              </li>
            ))}
          </ul>

          <Link
            href={result.cta.href}
            className="group mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/[0.08] px-3 text-[0.8125rem] font-medium text-off-white transition-colors hover:bg-white/[0.14]"
          >
            {result.cta.label}
            <ArrowRightIcon
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              weight="bold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
