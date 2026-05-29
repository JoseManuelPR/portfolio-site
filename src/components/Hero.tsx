"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, ArrowDown, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TorreIcon } from "./icons/TorreIcon";

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        className
      )}
      style={{
        animation: `float 8s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const chars = Math.min(Math.floor((performance.now() - start) / 35), text.length);
      setDisplayed(text.slice(0, chars));
      if (chars < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span className={cn(
        "inline-block w-0.5 h-[1em] bg-accent ml-0.5 align-text-bottom",
        displayed.length === text.length ? "animate-pulse" : ""
      )} />
    </span>
  );
}

function TerminalReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}

type CodeSegment = { text: string; className?: string };
type CodeLine = { className?: string; segments: CodeSegment[] };

const jsonLines: CodeLine[] = [
  { segments: [{ text: "{" }] },
  { className: "pl-4", segments: [
    { text: '"role"', className: "text-accent" },
    { text: ": " },
    { text: '"Full-Stack Engineer"', className: "text-emerald-400" },
    { text: "," },
  ]},
  { className: "pl-4", segments: [
    { text: '"company"', className: "text-accent" },
    { text: ": " },
    { text: '"Bunny Studio"', className: "text-emerald-400" },
    { text: "," },
  ]},
  { className: "pl-4", segments: [
    { text: '"location"', className: "text-accent" },
    { text: ": " },
    { text: '"Peru → World"', className: "text-emerald-400" },
    { text: "," },
  ]},
  { className: "pl-4", segments: [
    { text: '"stack"', className: "text-accent" },
    { text: ": [" },
  ]},
  { className: "pl-8 text-amber-400", segments: [
    { text: '"TypeScript", "React", "Vue",' },
  ]},
  { className: "pl-8 text-amber-400", segments: [
    { text: '"Node.js", "Python", "AWS"' },
  ]},
  { className: "pl-4", segments: [{ text: "]," }] },
  { className: "pl-4", segments: [
    { text: '"languages"', className: "text-accent" },
    { text: ": [" },
    { text: '"ES"', className: "text-pink-400" },
    { text: ", " },
    { text: '"EN"', className: "text-pink-400" },
    { text: ", " },
    { text: '"PT"', className: "text-pink-400" },
    { text: "]" },
  ]},
  { segments: [{ text: "}" }] },
];

function TypewriterBlock({ lines, delay = 0, speed = 14 }: {
  lines: CodeLine[]; delay?: number; speed?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const totalChars = lines.reduce(
    (sum, l) => sum + l.segments.reduce((s, seg) => s + seg.text.length, 0), 0
  );

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const chars = Math.min(Math.floor((performance.now() - start) / speed), totalChars);
      setCount(chars);
      if (chars < totalChars) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, totalChars, speed]);

  let charsLeft = started ? count : 0;

  return (
    <>
      {lines.map((line, li) => {
        const lineLen = line.segments.reduce((s, seg) => s + seg.text.length, 0);
        const show = Math.max(0, Math.min(charsLeft, lineLen));
        charsLeft -= show;
        const typing = show > 0 && show < lineLen;
        let rem = show;
        return (
          <div key={li} className={line.className} style={show === 0 ? { opacity: 0 } : undefined}>
            {show === 0 ? " " : (
              <>
                {line.segments.map((seg, si) => {
                  if (rem <= 0) return null;
                  const n = Math.min(rem, seg.text.length);
                  rem -= n;
                  return <span key={si} className={seg.className}>{seg.text.slice(0, n)}</span>;
                })}
                {typing && <span className="inline-block w-0.5 h-[1em] bg-accent ml-0.5 align-text-bottom" />}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden" id="hero">
      {/* Ambient orbs */}
      <FloatingOrb className="left-1/4 top-1/4 -z-10 h-[500px] w-[500px] bg-accent/[0.04] dark:bg-accent/[0.07]" />
      <FloatingOrb className="right-1/4 bottom-1/4 -z-10 h-[400px] w-[400px] bg-purple-500/[0.03] dark:bg-purple-500/[0.05]" delay={3} />
      <FloatingOrb className="right-1/3 top-1/3 -z-10 h-[300px] w-[300px] bg-pink-500/[0.02] dark:bg-pink-500/[0.04]" delay={5} />

      {/* Grid lines accent */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent" />
        <div className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
      </div>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-center">
          {/* Left — text content */}
          <div className="max-w-2xl">
            {/* Status badge */}
            <div className="reveal-load" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-4 py-2 text-xs font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-800/30 dark:bg-emerald-950/40 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" style={{ animationDuration: "2s" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("status")}
              </span>
            </div>

            {/* Greeting */}
            <p
              className="reveal-load mt-10 font-mono text-sm tracking-wider text-accent/80"
              style={{ animationDelay: "0.2s" }}
            >
              {t("greeting")}
            </p>

            {/* Name — LCP element: CSS-animated so it paints without waiting for JS */}
            <h1
              className="reveal-load mt-4 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="animated-gradient">{t("name")}</span>
            </h1>

            {/* Title */}
            <h2
              className="reveal-load mt-5 text-2xl font-semibold text-neutral-400 dark:text-neutral-500 sm:text-3xl lg:text-4xl"
              style={{ animationDelay: "0.45s" }}
            >
              {t("title")}
              <span className="text-accent">.</span>
            </h2>

            {/* Subtitle line */}
            <div
              className="reveal-load mt-4 flex items-center gap-3"
              style={{ animationDelay: "0.55s" }}
            >
              <div className="h-px flex-1 max-w-12 bg-accent/40" />
              <p className="font-mono text-sm font-medium text-accent/70">
                {t("subtitle")}
              </p>
            </div>

            {/* Pitch */}
            <p
              className="reveal-load mt-8 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
              style={{ animationDelay: "0.65s" }}
            >
              {t("pitch")}
            </p>

            {/* CTAs */}
            <div
              className="reveal-load mt-12 flex flex-wrap gap-3"
              style={{ animationDelay: "0.8s" }}
            >
              <a href="#contact" className="btn-primary">
                <Mail size={16} />
                {t("contact")}
              </a>
              <a
                href="https://github.com/JoseManuelPR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github size={16} />
                {t("github")}
              </a>
              <a
                href="https://www.linkedin.com/in/josemanuelpr23/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Linkedin size={16} />
                {t("linkedin")}
              </a>
              <a
                href="https://torre.ai/josemanuelpr23"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <TorreIcon size={16} />
                {t("torre")}
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileDown size={16} />
                {t("resume")}
              </a>
            </div>
          </div>

          {/* Right — terminal mockup */}
          <div
            className="hidden lg:block"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0) rotate(-1deg)" : "translateY(40px) rotate(-1deg)",
              transition: `all 1.2s ${ease} 0.6s`,
            }}
          >
            <div className="relative w-[380px]">
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl dark:bg-accent/20 animate-pulse-glow" />

              <div className="glass-card relative overflow-hidden rounded-2xl p-0">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-neutral-200/50 px-4 py-3 dark:border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-2 font-mono text-[10px] text-neutral-400">jose@dev ~</span>
                </div>

                {/* Terminal content */}
                <div className="p-5 font-mono text-[13px] leading-relaxed">
                  <div className="text-neutral-400 dark:text-neutral-500">
                    <span className="text-emerald-500">$</span>{" "}
                    <TypewriterText text="cat profile.json" delay={0.5} />
                  </div>
                  <div className="mt-3 space-y-1.5 text-neutral-500 dark:text-neutral-400">
                    <TypewriterBlock lines={jsonLines} delay={1.2} speed={14} />
                  </div>
                  <TerminalReveal delay={4.5}>
                    <div className="mt-4 flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
                      <span className="text-emerald-500">$</span>
                      <TypewriterText text="npm run build-amazing-things" delay={4.7} />
                    </div>
                  </TerminalReveal>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-300 transition-colors duration-300 hover:text-accent dark:text-neutral-700"
          aria-label="Scroll down"
          style={{
            opacity: mounted ? 1 : 0,
            transition: `opacity 1.2s ease 1.6s`,
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
          <ArrowDown size={16} className="animate-bounce" style={{ animationDuration: "2s" }} />
        </a>
      </div>
    </section>
  );
}
