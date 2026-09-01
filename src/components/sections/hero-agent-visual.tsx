"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const COLORS = {
  arcBlue: "#315cff",
  arcBlueSoft: "rgba(49, 92, 255, 0.35)",
  softGrey: "#dadddc",
  white: "#ffffff",
} as const;

type Node = {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  kind: "hub" | "agent";
  phase: number;
};

type Edge = { from: number; to: number };

type Packet = {
  edgeIndex: number;
  progress: number;
  speed: number;
};

const GRAPH: { nodes: Omit<Node, "x" | "y">[]; edges: Edge[] } = {
  nodes: [
    { id: 0, baseX: 0.72, baseY: 0.42, radius: 8, kind: "hub", phase: 0 },
    { id: 1, baseX: 0.88, baseY: 0.22, radius: 4.5, kind: "agent", phase: 0.4 },
    { id: 2, baseX: 0.94, baseY: 0.52, radius: 4.5, kind: "agent", phase: 1.2 },
    { id: 3, baseX: 0.8, baseY: 0.72, radius: 4.5, kind: "agent", phase: 2.1 },
    { id: 4, baseX: 0.58, baseY: 0.78, radius: 4, kind: "agent", phase: 3.0 },
    { id: 5, baseX: 0.52, baseY: 0.52, radius: 4, kind: "agent", phase: 4.2 },
    { id: 6, baseX: 0.64, baseY: 0.18, radius: 4, kind: "agent", phase: 1.8 },
    { id: 7, baseX: 0.42, baseY: 0.34, radius: 3.5, kind: "agent", phase: 2.6 },
    { id: 8, baseX: 0.36, baseY: 0.62, radius: 3.5, kind: "agent", phase: 3.4 },
    { id: 9, baseX: 0.78, baseY: 0.88, radius: 3.5, kind: "agent", phase: 5.1 },
    { id: 10, baseX: 0.9, baseY: 0.38, radius: 3, kind: "agent", phase: 0.9 },
    { id: 11, baseX: 0.48, baseY: 0.14, radius: 3, kind: "agent", phase: 4.8 },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 0, to: 6 },
    { from: 5, to: 7 },
    { from: 5, to: 8 },
    { from: 4, to: 8 },
    { from: 6, to: 11 },
    { from: 1, to: 10 },
    { from: 2, to: 10 },
    { from: 3, to: 9 },
    { from: 7, to: 11 },
  ],
};

const AGENT_LABELS = [
  { label: "Workflow Agent", x: "58%", y: "18%", delay: "0s" },
  { label: "Data Sync", x: "78%", y: "12%", delay: "0.4s" },
  { label: "Automation", x: "82%", y: "58%", delay: "0.8s" },
  { label: "Integration", x: "44%", y: "72%", delay: "1.2s" },
] as const;

function createPackets(): Packet[] {
  const packets: Packet[] = [];
  GRAPH.edges.forEach((_, index) => {
    packets.push({
      edgeIndex: index,
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
    });
    packets.push({
      edgeIndex: index,
      progress: Math.random(),
      speed: 0.0018 + Math.random() * 0.0025,
    });
  });
  return packets;
}

type HeroAgentBackgroundProps = {
  className?: string;
};

export function HeroAgentBackground({ className }: HeroAgentBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const packets = createPackets();
    const nodes: Node[] = GRAPH.nodes.map((node) => ({ ...node, x: 0, y: 0 }));
    const pulses: { radius: number; opacity: number }[] = [];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastPulse = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const draw = () => {
      time += reducedMotionRef.current ? 0.002 : 0.016;

      const parallaxX = (mouseRef.current.x - 0.5) * 20;
      const parallaxY = (mouseRef.current.y - 0.5) * 16;

      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        const drift = reducedMotionRef.current
          ? 0
          : Math.sin(time * 0.9 + node.phase) * 5;
        const driftY = reducedMotionRef.current
          ? 0
          : Math.cos(time * 0.7 + node.phase) * 4;

        const parallaxScale = node.kind === "hub" ? 0.25 : 1;
        node.x =
          node.baseX * width + parallaxX * parallaxScale + drift;
        node.y =
          node.baseY * height + parallaxY * parallaxScale + driftY;
      });

      GRAPH.edges.forEach((edge) => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, "rgba(218, 221, 220, 0.7)");
        gradient.addColorStop(0.5, "rgba(49, 92, 255, 0.2)");
        gradient.addColorStop(1, "rgba(218, 221, 220, 0.7)");

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      packets.forEach((packet) => {
        if (!reducedMotionRef.current) {
          packet.progress += packet.speed;
          if (packet.progress > 1) packet.progress = 0;
        }

        const edge = GRAPH.edges[packet.edgeIndex];
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.arcBlue;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(49, 92, 255, 0.12)";
        ctx.fill();
      });

      // Hub pulse rings
      if (!reducedMotionRef.current && time - lastPulse > 2.8) {
        const hub = nodes[0];
        if (hub) {
          pulses.push({ radius: 12, opacity: 0.35 });
          lastPulse = time;
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const hub = nodes[0];
        if (!hub) continue;

        pulse.radius += 0.9;
        pulse.opacity -= 0.006;

        if (pulse.opacity <= 0) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(hub.x, hub.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(49, 92, 255, ${pulse.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      nodes.forEach((node) => {
        const pulse = reducedMotionRef.current
          ? 0.5
          : 0.5 + Math.sin(time * 2 + node.phase) * 0.5;
        const isHub = node.kind === "hub";

        if (isHub) {
          const glow = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            56
          );
          glow.addColorStop(0, `rgba(49, 92, 255, ${0.2 * pulse})`);
          glow.addColorStop(1, "rgba(49, 92, 255, 0)");
          ctx.fillStyle = glow;
          ctx.fillRect(node.x - 56, node.y - 56, 112, 112);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isHub ? COLORS.arcBlueSoft : "rgba(218, 221, 220, 0.45)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHub ? COLORS.arcBlue : COLORS.white;
        ctx.fill();
        if (!isHub) {
          ctx.strokeStyle = COLORS.softGrey;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        if (isHub) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.white;
          ctx.fill();

          if (!reducedMotionRef.current) {
            ctx.save();
            ctx.translate(node.x, node.y);
            ctx.rotate(time * 0.35);
            ctx.beginPath();
            ctx.arc(0, 0, 28, 0, Math.PI * 1.4);
            ctx.strokeStyle = "rgba(49, 92, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("mousemove", onMouseMove);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {AGENT_LABELS.map((item) => (
        <div
          key={item.label}
          className="absolute hidden items-center gap-2 border border-soft-grey/80 bg-white/75 px-2.5 py-1.5 backdrop-blur-sm sm:flex"
          style={{ left: item.x, top: item.y }}
        >
          <span
            className="size-1.5 shrink-0 rounded-full bg-arc-blue motion-safe:animate-pulse"
            style={{ animationDelay: item.delay }}
          />
          <span className="font-mono text-[0.625rem] tracking-wide text-slate uppercase">
            {item.label}
          </span>
        </div>
      ))}

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-warm-ivory from-0% via-warm-ivory/95 via-35% to-warm-ivory/20 to-100%" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-ivory/80 via-transparent to-warm-ivory/40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 42%, rgba(49,92,255,0.07), transparent 70%)",
        }}
      />
    </div>
  );
}
