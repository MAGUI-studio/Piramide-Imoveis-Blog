import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import type { PostItem } from "@/src/types/sanity";

interface PostCardProps {
  post: PostItem;
  priority?: boolean;
  scroll?: boolean;
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
  className = "",
}: PostCardProps) {
  if (!post.slug?.current) return null;
  const postCategory = post.categories?.[0];
  const readingTime = calculateReadingTime(post.body);

  return (
    <Link
      href={`/posts/${post.slug.current}`}
      scroll={scroll}
      className={`group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full ${className}`}
    >
      
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {post.mainImage ? (
          <Image
            src={urlForImage(post.mainImage)?.width(800).height(500).url() || ""}
            alt={(typeof post.mainImage === "object" && post.mainImage?.alt) || post.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <Icon icon="ph:article" className="size-10 opacity-30 text-muted-foreground" />
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
              <span>{readingTime} min</span>
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
}
