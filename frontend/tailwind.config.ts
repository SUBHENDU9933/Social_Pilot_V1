import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Sora", "sans-serif"],
        sora: ["Sora", "Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        // Legacy aliases kept for older marketing components
        navy: { DEFAULT: "#0F172A", 900: "#0F172A", 800: "#1E293B", 950: "#020617" },
        sky: { brand: "#2563EB" },

        // Brand
        brand: {
          DEFAULT: "#FF7A00",
          50: "#FFF4EB",
          100: "#FFE4CC",
          200: "#FFC799",
          500: "#FF7A00",
          600: "#E66E00",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "#2563EB",
        },
        success: { DEFAULT: "#10B981", soft: "#D1FAE5" },
        warning: { DEFAULT: "#F59E0B", soft: "#FEF3C7" },

        // Semantic (shadcn)
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // Backwards compat (don't break legacy marketing pages)
        bg: { light: "#F8FAFC", section: "#F1F5F9", dark: "#020617", card: "#0F172A" },
        ink: { light: "#0F172A", dark: "#F8FAFC", muted: "#64748B" },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
        lift: "0 8px 24px -8px rgba(15,23,42,0.10), 0 2px 4px rgba(15,23,42,0.04)",
        glow: "0 8px 32px -12px rgba(255,122,0,0.35)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { fadeUp: "fadeUp 0.4s ease-out both" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
