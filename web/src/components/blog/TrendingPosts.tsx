import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/src/sanity/lib/image";
import { SectionHeader } from "@/src/components/blog/SectionHeader";
import type { PostItem } from "@/src/types/sanity";

interface TrendingPostsProps {
  posts: PostItem[];
  variant?: "sidebar" | "home";
  title?: string;
}

function formatViews(views?: number): string {
  const count = views && views > 0 ? views : 0;
  if (count === 1) return "1 view";
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k views`;
  }
  return `${count} views`;
}

export function TrendingPosts({
  posts,
  variant = "sidebar",
  title = "Mais Lidos da Semana",
}: TrendingPostsProps) {
  if (!posts || posts.length === 0) return null;

  
  const nonFeaturedPosts = posts.filter((p) => !p.featured);
  if (nonFeaturedPosts.length === 0) return null;

  const topPosts = nonFeaturedPosts.slice(0, 5);
  const heroPost = topPosts[0];
  const listPosts = topPosts.slice(1);

  if (variant === "home") {
    const heroImage = heroPost.mainImage
      ? urlForImage(heroPost.mainImage)?.width(1200).height(800).url()
      : null;

    return (
      <section className="w-full space-y-8 sm:space-y-10">
        <SectionHeader
          eyebrow="Em Alta"
          eyebrowIcon="ph:fire-fill"
          title="Os Artigos Mais Lidos da Semana"
          meta="Mais Acessados"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          <div className="lg:col-span-6 flex flex-col">
            <Link
              href={heroPost.slug?.current ? `/artigos/${heroPost.slug.current}` : "#"}
              className="group relative flex flex-col justify-between overflow-hidden border border-zinc-200 dark:border-white/10 p-6 sm:p-8 min-h-[420px] lg:min-h-[480px] h-full bg-zinc-900 transition-all duration-500 cursor-pointer shadow-xs select-none"
            >
              
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroPost.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

              
              <div className="relative flex items-center justify-between z-10">
                <div className="px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-xs">
                  <span>Em Alta</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/80 font-normal lowercase tracking-normal text-[11px] inline-flex items-center gap-1">
                    <Icon icon="ph:eye-bold" className="size-3 text-white/70" />
                    <span>{formatViews(heroPost.views)}</span>
                  </span>
                </div>
              </div>

              
              <div className="relative z-10 space-y-3 pt-12">
                <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white leading-tight group-hover:text-white/85 transition-colors">
                  {heroPost.title}
                </h3>

                {heroPost.excerpt && (
                  <p className="text-sm text-zinc-300 line-clamp-2 font-light leading-relaxed">
                    {heroPost.excerpt}
                  </p>
                )}

                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {heroPost.author?.image && (
                      <div className="relative size-6 rounded-full overflow-hidden border border-white/20">
                        <Image
                          src={urlForImage(heroPost.author.image)?.width(48).height(48).url() || ""}
                          alt={heroPost.author.name || "Autor"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="font-mono text-xs text-zinc-300">
                      {heroPost.author?.name || "Redação Pirâmide"}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>Ler Artigo</span>
                    <Icon icon="ph:arrow-right-bold" className="size-3.5 text-white" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {listPosts.map((post, idx) => {
              const rank = String(idx + 2).padStart(2, "0");
              const imageUrl = post.mainImage
                ? urlForImage(post.mainImage)?.width(600).height(400).url()
                : null;

              return (
                <Link
                  key={post._id}
                  href={post.slug?.current ? `/artigos/${post.slug.current}` : "#"}
                  className="group relative flex flex-col justify-between overflow-hidden border border-zinc-200 dark:border-white/10 p-5 min-h-[220px] sm:min-h-[230px] bg-zinc-900 transition-all duration-500 select-none cursor-pointer shadow-xs"
                >
                  
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                  
                  <div className="relative flex items-center justify-between z-10">
                    <div className="px-2 py-0.5 bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
                      <span>#{rank}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/80 font-normal text-[10px] inline-flex items-center gap-1">
                        <Icon icon="ph:eye-bold" className="size-2.5 text-white/70" />
                        <span>{formatViews(post.views)}</span>
                      </span>
                    </div>
                  </div>

                  
                  <div className="relative z-10 space-y-2 pt-6">
                    <h4 className="font-bold text-xs sm:text-sm font-heading uppercase text-white line-clamp-2 leading-snug group-hover:text-white/85 transition-colors">
                      {post.title}
                    </h4>

                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                      <span className="truncate">
                        {post.author?.name || "Pirâmide"}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-white font-bold shrink-0">
                        <Icon icon="ph:arrow-right-bold" className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  
  return (
    <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/60 p-5 sm:p-6 space-y-4 rounded-none select-none">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-primary text-white">
            <Icon icon="ph:fire-fill" className="size-3.5" />
          </span>
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
            {title}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Em Alta
        </span>
      </div>

      <div className="space-y-3.5 divide-y divide-zinc-200/60 dark:divide-white/5">
        {topPosts.map((post, idx) => {
          const rank = String(idx + 1).padStart(2, "0");

          return (
            <Link
              key={post._id}
              href={post.slug?.current ? `/artigos/${post.slug.current}` : "#"}
              className="group flex items-start gap-3.5 pt-3 first:pt-0 cursor-pointer transition-colors"
            >
              <span className="font-mono font-bold text-sm text-zinc-400 group-hover:text-primary transition-colors shrink-0 leading-none mt-0.5">
                {rank}
              </span>

              <div className="space-y-1 min-w-0 flex-1">
                {post.categories && post.categories[0] && (
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-primary block truncate">
                    {post.categories[0].title}
                  </span>
                )}
                <h5 className="font-bold text-xs font-heading uppercase text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h5>
                <span className="font-mono text-[10px] text-zinc-500 inline-flex items-center gap-1">
                  <Icon icon="ph:eye-bold" className="size-2.5 text-zinc-400" />
                  <span>{formatViews(post.views)}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
