import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(99,102,241,0.3)",
        "glow-lg": "0 0 40px -8px rgba(99,102,241,0.25)",
        soft: "0 2px 24px -4px rgba(0,0,0,0.08)",
        "soft-lg": "0 8px 40px -8px rgba(0,0,0,0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "gradient-x": "gradientX 6s ease infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
