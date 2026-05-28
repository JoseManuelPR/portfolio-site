"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
  useSyncExternalStore,
} from "react";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // SSR default
  );
}

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal(opts: UseRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px", once = true } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur"
  | "slide-up-blur";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const variantStyles: Record<RevealVariant, { hidden: CSSProperties; visible: CSSProperties }> = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(32px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-32px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-32px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(32px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.92)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "slide-up-blur": {
    hidden: { opacity: 0, transform: "translateY(40px)", filter: "blur(10px)" },
    visible: { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
  },
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className = "",
  threshold = 0.12,
  once = true,
}: RevealProps) {
  const { ref, isVisible } = useReveal({ threshold, once });
  const prefersReduced = usePrefersReducedMotion();
  const { hidden, visible } = variantStyles[variant];

  const style: CSSProperties = prefersReduced
    ? {} // skip all animation when user prefers reduced motion
    : {
        ...(isVisible ? visible : hidden),
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "transform, opacity, filter",
      };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode[];
  variant?: RevealVariant;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  childClassName?: string;
  threshold?: number;
}

export function Stagger({
  children,
  variant = "fade-up",
  staggerDelay = 0.08,
  duration = 0.8,
  className = "",
  childClassName = "",
  threshold = 0.1,
}: StaggerProps) {
  const { ref, isVisible } = useReveal({ threshold });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => {
        const { hidden, visible } = variantStyles[variant];
        const style: CSSProperties = prefersReduced
          ? {}
          : {
              ...(isVisible ? visible : hidden),
              transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
              willChange: isVisible ? "auto" : "transform, opacity",
            };
        return (
          <div key={i} style={style} className={childClassName}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2.5,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const { ref, isVisible } = useReveal({ once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let raf: number;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
