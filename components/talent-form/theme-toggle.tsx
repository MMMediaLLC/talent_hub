"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 rounded-xl bg-card border border-border
                 hover:bg-accent hover:border-primary/30 active:scale-95
                 shadow-lg shadow-black/5 transition-all"
      aria-label={isDark ? "Вклучи светол режим" : "Вклучи темен режим"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}
