"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page animated tech grid background.
 * Renders a dot-grid with faint lines and a glowing light
 * that travels along the grid edges between nodes.
 * Purely decorative — sits behind all content via position:fixed + z-index:-1.
 */
export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let animId: number;
    let width: number;
    let height: number;
    const gap = 48; // px between grid nodes

    // ── Traveling lights state ────────────────────────────────────────
    interface Light {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      progress: number;
      trail: { x: number; y: number; alpha: number }[];
    }

    const lights: Light[] = [];
    const NUM_LIGHTS = 3;

    function snapToGrid(val: number) {
      return Math.round(val / gap) * gap;
    }

    function randomNode(): { x: number; y: number } {
      const cols = Math.floor(width / gap);
      const rows = Math.floor(height / gap);
      return {
        x: Math.floor(Math.random() * cols) * gap,
        y: Math.floor(Math.random() * rows) * gap,
      };
    }

    function pickAdjacentTarget(light: Light) {
      const directions = [
        { dx: gap, dy: 0 },
        { dx: -gap, dy: 0 },
        { dx: 0, dy: gap },
        { dx: 0, dy: -gap },
      ];
      // Occasionally allow diagonal
      if (Math.random() > 0.85) {
        directions.push(
          { dx: gap, dy: gap },
          { dx: -gap, dy: -gap },
          { dx: gap, dy: -gap },
          { dx: -gap, dy: gap }
        );
      }
      const d = directions[Math.floor(Math.random() * directions.length)];
      let nx = light.x + d.dx;
      let ny = light.y + d.dy;
      // Clamp
      nx = Math.max(0, Math.min(snapToGrid(width), nx));
      ny = Math.max(0, Math.min(snapToGrid(height), ny));
      light.targetX = nx;
      light.targetY = ny;
      light.progress = 0;
    }

    function initLights() {
      lights.length = 0;
      for (let i = 0; i < NUM_LIGHTS; i++) {
        const start = randomNode();
        const l: Light = {
          x: start.x,
          y: start.y,
          targetX: start.x,
          targetY: start.y,
          speed: 0.012 + Math.random() * 0.015,
          progress: 0,
          trail: [],
        };
        pickAdjacentTarget(l);
        lights.push(l);
      }
    }

    // ── Resize ───────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLights();
    }

    // ── Draw ─────────────────────────────────────────────────────────
    const isDark = () =>
      document.documentElement.classList.contains("dark");

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const lineColor = dark ? "rgba(63,63,70,0.25)" : "rgba(212,212,216,0.5)";
      const dotColor = dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.12)";
      const glowColor = dark
        ? "rgba(99,102,241,0.7)"
        : "rgba(99,102,241,0.5)";

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;

      // Grid lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = c * gap;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r < rows; r++) {
        const y = r * gap;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Dots at intersections
      ctx.fillStyle = dotColor;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          ctx.beginPath();
          ctx.arc(c * gap, r * gap, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Animate lights ──────────────────────────────────────────────
      for (const light of lights) {
        light.progress += light.speed;
        if (light.progress >= 1) {
          light.x = light.targetX;
          light.y = light.targetY;
          pickAdjacentTarget(light);
        }

        // Interpolate position
        const cx = light.x + (light.targetX - light.x) * light.progress;
        const cy = light.y + (light.targetY - light.y) * light.progress;

        // Add to trail
        light.trail.push({ x: cx, y: cy, alpha: 1 });
        if (light.trail.length > 28) light.trail.shift();

        // Draw trail
        for (let i = 0; i < light.trail.length; i++) {
          const t = light.trail[i];
          t.alpha -= 0.035;
          if (t.alpha <= 0) continue;
          const radius = 2 + (i / light.trail.length) * 3;
          ctx.beginPath();
          ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = glowColor.replace(
            /[\d.]+\)$/,
            `${t.alpha * 0.6})`
          );
          ctx.fill();
        }

        // Draw glow head
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = dark
          ? "rgba(165,180,252,0.9)"
          : "rgba(99,102,241,0.8)";
        ctx.beginPath();
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Light up the node when close
        const distToTarget = Math.hypot(
          cx - light.targetX,
          cy - light.targetY
        );
        if (distToTarget < gap * 0.3) {
          ctx.fillStyle = dark
            ? "rgba(99,102,241,0.3)"
            : "rgba(99,102,241,0.2)";
          ctx.beginPath();
          ctx.arc(light.targetX, light.targetY, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Clean expired trail points
      for (const light of lights) {
        light.trail = light.trail.filter((t) => t.alpha > 0);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    // Observe body height changes (scroll content changes)
    const ro = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight;
      if (Math.abs(newH - height) > 50) resize();
    });
    ro.observe(document.body);

    window.addEventListener("resize", resize);

    // Re-check dark mode
    const mo = new MutationObserver(() => {});
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
