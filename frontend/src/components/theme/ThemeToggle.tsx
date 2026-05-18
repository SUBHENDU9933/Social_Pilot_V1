"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label="Toggle theme"
      className="relative h-9 w-[68px] rounded-full border border-border bg-card flex items-center px-1 transition-colors hover:bg-secondary"
    >
      <Sun className="absolute left-2 w-4 h-4 text-muted-foreground" />
      <Moon className="absolute right-2 w-4 h-4 text-muted-foreground" />
      <span
        className={`relative z-10 h-7 w-7 rounded-full bg-brand shadow-glow transition-all duration-300 ${
          isDark ? "translate-x-[33px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
