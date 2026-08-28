import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import { ArticleCtaButton } from "@/src/components/blog/ArticleCtaButton";
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
  const postHref = `/posts/${post.slug.current}`;

  return (
    <article
      className={`group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full ${className}`}
    >
      
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <Link
          href={postHref}
          scroll={scroll}
          className="block size-full relative"
          aria-label={post.title}
        >
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
        </Link>

        
        <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap z-10">
          {postCategory && (
            postCategory.slug?.current ? (
              <Link
                href={`/categoria/${postCategory.slug.current}`}
                className="px-2.5 py-1 bg-black/40 hover:bg-black/60 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 transition-all border-none"
                title={`Ver categoria ${postCategory.title}`}
              >
                <Icon icon="ph:tag-fill" className="size-3 text-white" />
                <span>{postCategory.title}</span>
              </Link>
            ) : (
              <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 border-none">
                <Icon icon="ph:tag-fill" className="size-3 text-white" />
                <span>{postCategory.title}</span>
              </span>
            )
          )}

          {post.city && (
            post.city.slug?.current ? (
              <Link
                href={`/cidade/${post.city.slug.current}`}
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-2.5 py-1 shadow-xs inline-flex items-center gap-1.5 transition-all border-none"
                title={`Ver artigos em ${post.city.name}`}
              >
                <Icon icon="ph:map-pin-fill" className="size-3 text-white" />
                <span>{post.city.name}</span>
              </Link>
            ) : (
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md px-2.5 py-1 shadow-xs inline-flex items-center gap-1.5 border-none">
                <Icon icon="ph:map-pin-fill" className="size-3 text-white" />
                <span>{post.city.name}</span>
              </span>
            )
          )}
        </div>
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

          <Link href={postHref} scroll={scroll} className="block group/title">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase group-hover/title:text-primary transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <Link href={postHref} scroll={scroll} className="block">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          )}
        </div>

        
        
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-3">
          {post.author ? (
            <Link
              href={post.author.slug?.current ? `/autor/${post.author.slug.current}` : "#"}
              className="flex items-center gap-2 group/author min-w-0 max-w-[65%]"
              title={post.author.name ? `Ver perfil de ${post.author.name}` : undefined}
            >
              <div className="size-6 rounded-full overflow-hidden relative bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 shrink-0">
                {post.author.image ? (
                  <Image
                    src={urlForImage(post.author.image)?.width(64).height(64).url() || ""}
                    alt={post.author.name || "Autor"}
                    fill
                    className="object-cover rounded-full"
                    sizes="24px"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center font-bold text-[10px] font-mono text-foreground">
                    {post.author.name?.charAt(0) || "P"}
                  </div>
                )}
              </div>
              <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 group-hover/author:text-primary transition-colors truncate">
                {post.author.name || "Redação Pirâmide"}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 min-w-0 max-w-[65%]">
              <div className="size-6 rounded-full overflow-hidden relative bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 shrink-0 flex items-center justify-center font-bold text-[10px] font-mono text-foreground">
                P
              </div>
              <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 truncate">
                Redação Pirâmide
              </span>
            </div>
          )}

          <ArticleCtaButton
            href={postHref}
            label="Ler Artigo"
            size="sm"
            scroll={scroll}
          />
        </div>
      </div>
    </article>
  );
}
