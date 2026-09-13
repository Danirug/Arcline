"use client";

import { useEffect } from "react";

import { EASE, gsap, registerGsapPlugins } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/gsap";

export function HomeScrollStory() {
  useEffect(() => {
    registerGsapPlugins();

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      // ── Hero: load timeline ──────────────────────────────────────────
      const heroTl = gsap.timeline({
        defaults: { ease: EASE.out, duration: reduced ? 0.01 : 1 },
      });

      heroTl
        .from("[data-hero='visual']", {
          opacity: 0,
          y: 28,
          duration: reduced ? 0.01 : 1.1,
        })
        .from(
          "[data-hero='headline']",
          { opacity: 0, y: 48, duration: reduced ? 0.01 : 1.1 },
          "-=0.75"
        )
        .from("[data-hero='subheadline']", { opacity: 0, y: 28 }, "-=0.75")
        .from("[data-hero='actions']", { opacity: 0, y: 20 }, "-=0.7");

      if (!reduced) {
        // Hero: gentle scroll parallax
        gsap.to("[data-hero='content']", {
          y: -40,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-section='hero']",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to("[data-hero='visual']", {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-section='hero']",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ── Standard fade-up reveals ─────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: reduced ? 0 : 48,
          duration: reduced ? 0.01 : 0.95,
          ease: EASE.out,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Stagger children ─────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((container) => {
        const items = container.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (!items.length) return;

        gsap.from(items, {
          opacity: 0,
          y: reduced ? 0 : 36,
          duration: reduced ? 0.01 : 0.75,
          stagger: reduced ? 0 : 0.07,
          ease: EASE.out,
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Services: cinematic row reveals ──────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-service-row]").forEach((row) => {
        const number = row.querySelector("[data-service-number]");
        const body = row.querySelector("[data-service-body]");
        const details = row.querySelector("[data-service-details]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (number) {
          tl.from(number, {
            opacity: 0,
            x: reduced ? 0 : -20,
            duration: reduced ? 0.01 : 0.6,
            ease: EASE.out,
          });
        }

        if (body) {
          tl.from(
            body,
            {
              opacity: 0,
              y: reduced ? 0 : 32,
              duration: reduced ? 0.01 : 0.8,
              ease: EASE.out,
            },
            "-=0.35"
          );
        }

        if (details) {
          tl.from(
            details,
            {
              opacity: 0,
              y: reduced ? 0 : 24,
              duration: reduced ? 0.01 : 0.7,
              ease: EASE.out,
            },
            "-=0.5"
          );
        }
      });

      // ── CTA: scale reveal ────────────────────────────────────────────
      const ctaCard = document.querySelector<HTMLElement>("[data-cta='card']");
      if (ctaCard) {
        gsap.from(ctaCard, {
          opacity: 0,
          y: reduced ? 0 : 56,
          scale: reduced ? 1 : 0.97,
          duration: reduced ? 0.01 : 1.1,
          ease: EASE.expo,
          scrollTrigger: {
            trigger: ctaCard,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ── Proposition: line draw ─────────────────────────────────────────
      const propositionLine = document.querySelector<HTMLElement>(
        "[data-proposition='line']"
      );
      if (propositionLine && !reduced) {
        gsap.from(propositionLine, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: EASE.inOut,
          scrollTrigger: {
            trigger: propositionLine,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
