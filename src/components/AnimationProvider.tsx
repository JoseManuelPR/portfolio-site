"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
} from "react";

// ─── Intersection Observer hook ──────────────────────────────────────────────

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal(opts: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = opts;
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

// ─── Reveal wrapper components ──────────────────────────────────────────────

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur";

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
    hidden: { opacity: 0, transform: "translateY(40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(-40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(40px)" },
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
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const { ref, isVisible } = useReveal({ threshold, once });
  const { hidden, visible } = variantStyles[variant];

  const style: CSSProperties = {
    ...(isVisible ? visible : hidden),
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: "transform, opacity, filter",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}

// ─── Stagger children ────────────────────────────────────────────────────────

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
  staggerDelay = 0.1,
  duration = 0.6,
  className = "",
  childClassName = "",
  threshold = 0.1,
}: StaggerProps) {
  const { ref, isVisible } = useReveal({ threshold });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => {
        const { hidden, visible } = variantStyles[variant];
        const style: CSSProperties = {
          ...(isVisible ? visible : hidden),
          transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
          willChange: "transform, opacity",
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

// ─── Counter animation ───────────────────────────────────────────────────────

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const { ref, isVisible } = useReveal({ once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
