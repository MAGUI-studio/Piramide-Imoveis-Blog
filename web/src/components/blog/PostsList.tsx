"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PostCard } from "@/src/components/blog/PostCard";
import { SectionHeader } from "@/src/components/blog/SectionHeader";
import type { PostItem } from "@/src/types/sanity";

interface PostsListProps {
  posts: PostItem[];
  hideHeader?: boolean;
  highlightQuery?: string;
  className?: string;
}

export function PostsList({
  posts,
  hideHeader = false,
  highlightQuery,
  className = "",
}: PostsListProps) {
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

  const renderPostCard = (post: PostItem, index: number) => {
    if (!post.slug?.current) return null;

    return (
      <motion.div
        key={post._id}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: Math.min((index % 6) * 0.06, 0.3),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
      >
        <PostCard post={post} highlightQuery={highlightQuery} />
      </motion.div>
    );
  };

  if (hideHeader) {
    return (
      <section className={`space-y-8 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => renderPostCard(post, idx))}
        </div>
      </section>
    );
  }

  const latestPosts = posts.slice(0, 6);

  return (
    <section className={`space-y-10 sm:space-y-14 px-6 pt-8 sm:pt-10 pb-4 sm:pb-6 ${className}`}>
      <SectionHeader
        eyebrow="Explorar Acervo"
        eyebrowIcon="ph:books-fill"
        title="Artigos mais recentes"
      />

      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, idx) => renderPostCard(post, idx))}
        </div>

        
        <div className="flex items-center justify-end pt-2">
          <Link
            href="/artigos"
            className="group/action font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ver todos os artigos</span>
            <Icon
              icon="ph:arrow-right-bold"
              className="size-3.5 transition-transform duration-300 ease-out group-hover/action:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
