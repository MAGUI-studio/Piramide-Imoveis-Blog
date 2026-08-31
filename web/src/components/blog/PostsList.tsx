"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { PostCard } from "@/src/components/blog/PostCard";
import { SectionHeader } from "@/src/components/blog/SectionHeader";
import { LaunchesCarousel } from "@/src/components/blog/LaunchesCarousel";
import type { PostItem } from "@/src/types/sanity";

interface PostsListProps {
  posts: PostItem[];
  hideHeader?: boolean;
  highlightQuery?: string;
  className?: string;
}

const INITIAL_VISIBLE_COUNT = 12;
const STEP = 6;

export function PostsList({
  posts,
  hideHeader = false,
  highlightQuery,
  className = "",
}: PostsListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const secondBatchRef = useRef<HTMLDivElement>(null);

  if (!posts || posts.length === 0) {
    return (
      <div className="border border-zinc-200 dark:border-zinc-800 bg-transparent p-12 text-center rounded-none my-6">
        <h3 className="text-xl font-bold font-heading uppercase text-foreground">
          Nenhum artigo encontrado
        </h3>
        <p className="mt-2 text-sm text-muted-foreground font-light">
          Tente buscar por outras palavras-chave ou explore as categorias acima.
        </p>
      </div>
    );
  }

  const firstBatch = posts.slice(0, 6);
  const secondBatch = posts.slice(6, visibleCount);
  const hasMore = visibleCount < posts.length;
  const canShowLess = visibleCount > INITIAL_VISIBLE_COUNT;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, posts.length));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    if (secondBatchRef.current) {
      secondBatchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderPostCard = (post: PostItem, index: number) => {
    if (!post.slug?.current) return null;

    return (
      <motion.div
        key={post._id}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{
          duration: 0.4,
          delay: Math.min((index % STEP) * 0.06, 0.3),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        <PostCard post={post} highlightQuery={highlightQuery} />
      </motion.div>
    );
  };

  return (
    <section className={`space-y-12 sm:space-y-16 ${hideHeader ? "" : "px-6 pt-8 sm:pt-10 pb-4 sm:pb-6"} ${className}`}>
      
      {!hideHeader && (
        <SectionHeader
          eyebrow="Explorar Acervo"
          eyebrowIcon="ph:books-fill"
          title="Todos os Artigos & Análises"
          meta={`Exibindo ${Math.min(visibleCount, posts.length)} de ${posts.length} artigos`}
        />
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {firstBatch.map((post, idx) => renderPostCard(post, idx))}
      </div>

      
      <div className="w-full py-4 sm:py-6">
        <LaunchesCarousel />
      </div>

      
      {secondBatch.length > 0 && (
        <div
          ref={secondBatchRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24"
        >
          <AnimatePresence mode="popLayout">
            {secondBatch.map((post, idx) => renderPostCard(post, idx))}
          </AnimatePresence>
        </div>
      )}

      
      {(hasMore || canShowLess) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-10 py-4 bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 rounded-none shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Carregar Mais Artigos</span>
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
