"use client";

import { useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import type { TocHeading } from "@/src/lib/blog-utils";

interface TableOfContentsProps {
  headings: TocHeading[];
  variant?: "sidebar" | "inline";
}

export function TableOfContents({ headings, variant = "sidebar" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const updateActiveHeading = useCallback(() => {
    if (headings.length === 0) return;

    let currentActive = headings[0]?.id || "";

    for (let i = 0; i < headings.length; i++) {
      const el = document.getElementById(headings[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          currentActive = headings[i].id;
        }
      }
    }

    setActiveId(currentActive);
  }, [headings]);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    const raf = requestAnimationFrame(updateActiveHeading);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [updateActiveHeading]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 110;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (window.pageYOffset || document.documentElement.scrollTop || 0) - headerOffset;

      if (typeof window.scrollTo === "function") {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setActiveId(id);
    }
  };

  
  if (variant === "inline") {
    return (
      <nav className="w-full bg-transparent p-0 my-6 select-none border-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-foreground cursor-pointer py-2 border-b border-zinc-200 dark:border-white/10"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            <span>Índice do Artigo</span>
          </div>
          <Icon
            icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
            className="size-4 text-zinc-500"
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-2 overflow-hidden"
            >
              {headings.map((h) => {
                const isActive = activeId === h.id;
                return (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(h.id)}
                      className={`text-left text-xs font-mono transition-colors block w-full cursor-pointer leading-relaxed ${
                        isActive
                          ? "text-primary font-bold"
                          : "text-zinc-500 hover:text-foreground"
                      }`}
                    >
                      <span className="line-clamp-2">{h.text}</span>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  
  return (
    <nav className="w-full bg-transparent p-0 select-none border-none">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
            Neste Artigo
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          {headings.length} seções
        </span>
      </div>

      <ul className="space-y-1 relative">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className="relative">
              <button
                type="button"
                onClick={() => scrollToHeading(h.id)}
                className={`group relative text-left py-1.5 pl-3 pr-2 text-xs font-mono transition-colors block w-full cursor-pointer bg-transparent border-none ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-zinc-500 hover:text-foreground"
                }`}
              >
                
                {isActive && (
                  <motion.span
                    layoutId="activeTocBar"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <span className="line-clamp-2 leading-relaxed">
                  {h.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
