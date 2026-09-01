"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/gsap";

type MotionProviderProps = {
  children: React.ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    registerGsapPlugins();

    if (prefersReducedMotion()) {
      ScrollTrigger.config({ limitCallbacks: true });
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      gsap.ticker.lagSmoothing(500);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
