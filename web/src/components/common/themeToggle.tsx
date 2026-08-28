"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useThemeTransition } from "@/src/lib/hooks/useThemeTransition";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  isDarkOverlay?: boolean;
}

export function ThemeToggle({
  isDarkOverlay = false,
}: ThemeToggleProps): React.JSX.Element {
  const { resolvedTheme, toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-18 animate-pulse rounded-none bg-transparent" />
    );
  }

  const isLight = resolvedTheme === "light";

  return (
    <div className="group relative flex h-9 w-18 items-center rounded-none bg-transparent p-1 transition-all">
      <motion.div
        className={cn(
          "absolute z-0 h-7 w-7 rounded-none shadow-xs",
          isDarkOverlay ? "bg-white/20" : "bg-zinc-200/80 dark:bg-zinc-800/80"
        )}
        initial={false}
        animate={{
          x: isLight ? 0 : 34,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <button
        type="button"
        onClick={() => (isLight ? null : toggleTheme())}
        className={cn(
          "relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-none transition-colors duration-200",
          isDarkOverlay
            ? isLight
              ? "text-white"
              : "text-white/40 hover:text-white/80"
            : isLight
              ? "text-zinc-900"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        )}
        title="Tema claro (ou pressione 'D')"
        aria-label="Ativar tema claro"
      >
        <Icon
          icon={isLight ? "ph:sun-fill" : "ph:sun"}
          className="size-3.5 transition-transform duration-300"
        />
      </button>

      <button
        type="button"
        onClick={() => (!isLight ? null : toggleTheme())}
        className={cn(
          "relative z-10 ml-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-none transition-colors duration-200",
          isDarkOverlay
            ? !isLight
              ? "text-white"
              : "text-white/40 hover:text-white/80"
            : !isLight
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        )}
        title="Tema escuro (ou pressione 'D')"
        aria-label="Ativar tema escuro"
      >
        <Icon
          icon={!isLight ? "ph:moon-fill" : "ph:moon"}
          className="size-3.5 transition-transform duration-300"
        />
      </button>
    </div>
  );
}
