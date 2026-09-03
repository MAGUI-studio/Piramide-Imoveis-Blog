"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import { HighlightText } from "@/src/components/common/HighlightText";
import type { PostItem } from "@/src/types/sanity";

interface PostCardProps {
  post: PostItem;
  priority?: boolean;
  scroll?: boolean;
  highlightQuery?: string;
  className?: string;
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

export function PostCard({
  post,
  priority = false,
  scroll = true,
  highlightQuery,
  className = "",
}: PostCardProps) {
  const router = useRouter();

  if (!post.slug?.current) return null;
  const postCategory = post.categories?.[0];
  const readingTime = calculateReadingTime(post.body);
  const postHref = `/artigos/${post.slug.current}`;
  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(900).height(1200).url()
    : null;

  const handleCategoryClick = (e: React.MouseEvent, catSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/categoria/${catSlug}`);
  };

  const handleCityClick = (e: React.MouseEvent, citySlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/cidade/${citySlug}`);
  };

  const handleAuthorClick = (e: React.MouseEvent, authorSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/autor/${authorSlug}`);
  };

  return (
    <Link
      href={postHref}
      scroll={scroll}
      className={`group relative w-full min-h-[380px] sm:min-h-[420px] aspect-[4/5] overflow-hidden rounded-none border border-zinc-200 dark:border-white/10 bg-zinc-900 flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 shadow-none cursor-pointer select-none ${className}`}
    >
      
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={
            (typeof post.mainImage === "object" && post.mainImage?.alt) ||
            post.title
          }
          fill
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
      )}

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

      
      <div className="relative z-10 flex items-start justify-between gap-2 w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {postCategory && (
            <button
              type="button"
              onClick={(e) =>
                postCategory.slug?.current &&
                handleCategoryClick(e, postCategory.slug.current)
              }
              className="px-2.5 py-1 bg-black/50 hover:bg-black/80 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer"
              title={`Ver categoria ${postCategory.title}`}
            >
              <Icon icon="ph:tag-fill" className="size-3 text-white" />
              <span>
                <HighlightText
                  text={postCategory.title}
                  query={highlightQuery}
                  markClassName="bg-white/30 text-white font-bold px-0.5"
                />
              </span>
            </button>
          )}

          {post.city && (
            <button
              type="button"
              onClick={(e) =>
                post.city?.slug?.current &&
                handleCityClick(e, post.city.slug.current)
              }
              className="font-mono text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 hover:bg-black/80 backdrop-blur-md px-2.5 py-1 shadow-xs inline-flex items-center gap-1.5 transition-all border border-white/10 cursor-pointer"
              title={`Ver artigos em ${post.city.name}`}
            >
              <Icon icon="ph:map-pin-fill" className="size-3 text-white" />
              <span>
                <HighlightText
                  text={post.city.name}
                  query={highlightQuery}
                  markClassName="bg-white/30 text-white font-bold px-0.5"
                />
              </span>
            </button>
          )}
        </div>

        
        <div className="overflow-hidden pointer-events-none shrink-0">
          <Icon
            icon="ph:arrow-up-right-bold"
            className="size-5 text-white drop-shadow-md opacity-0 -translate-x-2.5 translate-y-2.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out"
          />
        </div>
      </div>

      
      <div className="relative z-10 space-y-3.5 text-white w-full">
        
        <div className="flex items-center gap-2 text-xs font-mono text-white/70">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Icon icon="ph:clock-bold" className="size-3 text-white/70" />
            <span>{readingTime} min de leitura</span>
          </span>
        </div>

        
        <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white line-clamp-2 leading-tight">
          <HighlightText text={post.title} query={highlightQuery} />
        </h3>

        
        {post.excerpt && (
          <p className="text-xs sm:text-sm text-white/75 font-light line-clamp-3 leading-relaxed">
            <HighlightText text={post.excerpt} query={highlightQuery} />
          </p>
        )}

        
        <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
          {post.author ? (
            <button
              type="button"
              onClick={(e) =>
                post.author?.slug?.current &&
                handleAuthorClick(e, post.author.slug.current)
              }
              className="flex items-center gap-2 group/author min-w-0 max-w-[65%] text-left cursor-pointer"
              title={
                post.author.name
                  ? `Ver perfil de ${post.author.name}`
                  : undefined
              }
            >
              <div className="size-6 rounded-full overflow-hidden relative bg-white/10 border border-white/20 shrink-0">
                {post.author.image ? (
                  <Image
                    src={
                      urlForImage(post.author.image)
                        ?.width(64)
                        .height(64)
                        .url() || ""
                    }
                    alt={post.author.name || "Autor"}
                    fill
                    className="object-cover rounded-full"
                    sizes="24px"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center font-bold text-[10px] font-mono text-white">
                    {post.author.name?.charAt(0) || "P"}
                  </div>
                )}
              </div>
              <span className="text-xs font-mono font-medium text-white/80 group-hover/author:text-white transition-colors truncate">
                <HighlightText
                  text={post.author.name || "Redação Pirâmide"}
                  query={highlightQuery}
                />
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2 min-w-0 max-w-[65%]">
              <div className="size-6 rounded-full overflow-hidden relative bg-white/10 border border-white/20 shrink-0 flex items-center justify-center font-bold text-[10px] font-mono text-white">
                P
              </div>
              <span className="text-xs font-mono font-medium text-white/80 truncate">
                Redação Pirâmide
              </span>
            </div>
          )}

          <div className="font-mono text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-1 shrink-0">
            <span>Ler Artigo</span>
            <Icon icon="ph:arrow-right-bold" className="size-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
