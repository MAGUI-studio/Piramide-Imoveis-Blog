"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import type { TocHeading } from "@/src/lib/blog-utils";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <nav className="my-8 rounded-none border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 p-6 backdrop-blur-xs transition-colors">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground font-mono cursor-pointer"
        >
          <Icon icon="ph:list-bullets-bold" className="size-4 text-primary" />
          <span>Sumário do Artigo</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          aria-label={isOpen ? "Recolher sumário" : "Expandir sumário"}
        >
          <Icon
            icon={isOpen ? "ph:caret-up-bold" : "ph:caret-down-bold"}
            className="size-4"
          />
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 space-y-2.5 border-t border-zinc-200 dark:border-zinc-800 pt-4 text-sm font-light">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                className={h.level === 3 ? "ml-4 text-xs" : "font-medium"}
              >
                <button
                  type="button"
                  onClick={() => scrollToHeading(h.id)}
                  className={`text-left transition-colors flex items-center gap-2 hover:text-primary cursor-pointer w-full ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-none shrink-0 ${
                      isActive ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  />
                  <span className="line-clamp-1">{h.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
