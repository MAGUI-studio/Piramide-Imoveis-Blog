"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

interface UseThemeTransition {
  theme: string | undefined;
  resolvedTheme: string | undefined;
  toggleTheme: () => void;
}

export function useThemeTransition(): UseThemeTransition {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(async (): Promise<void> => {
    if (typeof window === "undefined") {
      return;
    }

    const currentTheme = resolvedTheme || theme;
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    const transitionDirection = nextTheme === "dark" ? "to-dark" : "to-light";

    if (!("startViewTransition" in document)) {
      setTheme(nextTheme);
      return;
    }

    document.documentElement.setAttribute(
      "data-theme-transition",
      transitionDirection
    );

    const doc = document as unknown as {
      startViewTransition: (callback: () => Promise<void> | void) => {
        finished: Promise<void>;
      };
    };

    const transition = doc.startViewTransition(async () => {
      setTheme(nextTheme);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    try {
      await transition.finished;
    } finally {
      document.documentElement.removeAttribute("data-theme-transition");
    }
  }, [theme, resolvedTheme, setTheme]);

  return { theme, resolvedTheme, toggleTheme };
}
