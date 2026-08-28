"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import { LaunchesCarousel } from "@/src/components/blog/LaunchesCarousel";
import type { PostItem } from "@/src/types/sanity";

interface PostsListProps {
  posts: PostItem[];
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

const INITIAL_VISIBLE_COUNT = 12; 
const STEP = 6;

export function PostsList({ posts }: PostsListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + STEP);
  };

  const renderPostCard = (post: PostItem) => {
    if (!post.slug?.current) return null;
    const postCategory = post.categories?.[0];

    return (
      <Link
        key={post._id}
        href={`/posts/${post.slug.current}`}
        className="group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden"
      >
        
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
          {post.mainImage ? (
            <Image
              src={
                urlForImage(post.mainImage)?.width(800).height(500).url() || ""
              }
              alt={(typeof post.mainImage === "object" && post.mainImage?.alt) || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted">
              <Icon
                icon="ph:article"
                className="size-10 opacity-30 text-muted-foreground"
              />
            </div>
          )}

          
          <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
            {postCategory && (
              <span className="px-2.5 py-1 bg-black/75 text-white backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-xs">
                {postCategory.title}
              </span>
            )}
            {post.city && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/10 shadow-xs">
                <Icon icon="ph:map-pin-fill" className="size-3 text-white" />
                {post.city.name}
              </span>
            )}
          </div>

          {post.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-xs">
              Destaque
            </span>
          )}
        </div>

        
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Icon icon="ph:clock-bold" className="size-3 text-zinc-400" />
                <span>{calculateReadingTime(post.body)} min</span>
              </span>
            </div>

            
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>

            
            {post.excerpt && (
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>

          
          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[150px]">
              {post.author?.name || "Redação Pirâmide"}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ler Artigo</span>
              <Icon icon="ph:arrow-right-bold" className="size-3.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="space-y-12 px-6 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block mb-1">
            Explorar Acervo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading uppercase">
            Todos os Artigos & Análises
          </h2>
        </div>

        <span className="font-mono text-xs text-muted-foreground uppercase">
          Exibindo {Math.min(visibleCount, posts.length)} de {posts.length} artigos
        </span>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {firstBatch.map(renderPostCard)}
      </div>

      
      <div className="w-full py-4 sm:py-6">
        <LaunchesCarousel />
      </div>

      
      {secondBatch.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {secondBatch.map(renderPostCard)}
        </div>
      )}

      
      {hasMore && (
        <div className="flex justify-center pt-8 pb-4">
          <button
            type="button"
            onClick={handleLoadMore}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-foreground border border-zinc-300 dark:border-zinc-700 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            <span>Ver mais artigos</span>
            <Icon
              icon="ph:arrow-down-bold"
              className="size-4 text-primary group-hover:translate-y-1 transition-transform"
            />
          </button>
        </div>
      )}
    </section>
  );
}
