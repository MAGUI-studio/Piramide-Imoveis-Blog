"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { AuthorCard } from "@/src/components/blog/AuthorCard";
import type { AuthorRef } from "@/src/types/sanity";

interface AuthorsListProps {
  authors: AuthorRef[];
}

const INITIAL_COUNT = 6;
const STEP = 6;

export function AuthorsList({ authors }: AuthorsListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!authors || authors.length === 0) {
    return (
      <div className="border border-zinc-200 dark:border-white/10 bg-card p-12 text-center rounded-none my-6">
        <h3 className="text-xl font-bold font-heading uppercase text-foreground">
          Nenhum autor encontrado
        </h3>
      </div>
    );
  }

  const visibleAuthors = authors.slice(0, visibleCount);
  const hasMore = visibleCount < authors.length;
  const canShowLess = visibleCount > INITIAL_COUNT;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, authors.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="space-y-8 pt-4">
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24"
      >
        <AnimatePresence mode="popLayout">
          {visibleAuthors.map((author, idx) => (
            <motion.div
              key={author._id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.35,
                delay: Math.min((idx % STEP) * 0.05, 0.25),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              <AuthorCard author={author} className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {(hasMore || canShowLess) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-10 py-4 bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 rounded-none shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Carregar Mais Autores</span>
              <Icon
                icon="ph:arrow-down-bold"
                className="size-4 group-hover:translate-y-0.5 transition-transform"
              />
            </button>
          )}

          {canShowLess && (
            <button
              type="button"
              onClick={handleShowLess}
              className="w-full sm:w-auto px-8 py-4 border border-zinc-200 dark:border-zinc-800 bg-transparent text-muted-foreground hover:text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:border-zinc-400 dark:hover:border-zinc-600 transition-all rounded-none flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Mostrar Menos</span>
              <Icon
                icon="ph:arrow-up-bold"
                className="size-4 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
