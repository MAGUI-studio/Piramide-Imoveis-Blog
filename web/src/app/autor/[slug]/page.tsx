import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  AUTHOR_BY_SLUG_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  AUTHOR_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import type { AuthorRef, PostItem } from "@/src/types/sanity";

export const revalidate = 60;

interface AuthorDetail extends AuthorRef {
  _id: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
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

export async function generateStaticParams() {
  const { data: authors = [] } = await sanityFetch({
    query: AUTHOR_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (authors as Array<{ slug?: string }>).filter((a) => a.slug).map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: author } = await sanityFetch({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
  });

  const authorData = author as AuthorDetail | null;

  if (!authorData) {
    return {
      title: "Autor não encontrado | Blog Pirâmide Imóveis",
    };
  }

  const title = `${authorData.name} | Artigos e Análises | Blog Pirâmide Imóveis`;
  const description = authorData.role
    ? `Leia os artigos e análises imobiliárias de ${authorData.name}, ${authorData.role} na Pirâmide Imóveis.`
    : `Confira todos os artigos publicados por ${authorData.name} no Blog Pirâmide Imóveis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: author }, { data: posts = [] }] = await Promise.all([
    sanityFetch({
      query: AUTHOR_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: POSTS_BY_AUTHOR_QUERY,
      params: { slug },
    }),
  ]);

  const authorData = author as AuthorDetail | null;
  const postList = (posts as PostItem[]) || [];

  if (!authorData) {
    notFound();
  }

  return (
    <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Icon icon="ph:house" className="size-3.5 text-primary" />
          <span>Início</span>
        </Link>
        <span>/</span>
        <span>Autores</span>
        <span>/</span>
        <span className="text-foreground font-bold">{authorData.name}</span>
      </nav>

      
      <header className="border border-zinc-200 dark:border-white/10 bg-card p-6 sm:p-10 md:p-12 rounded-none space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          
          <div className="size-24 sm:size-28 md:size-32 rounded-full overflow-hidden relative bg-zinc-100 dark:bg-zinc-800 border-2 border-primary/20 shrink-0">
            {authorData.image ? (
              <Image
                src={urlForImage(authorData.image)?.width(256).height(256).url() || ""}
                alt={authorData.name}
                fill
                priority
                className="object-cover rounded-full"
              />
            ) : (
              <div className="flex size-full items-center justify-center font-bold text-2xl font-mono text-foreground">
                {authorData.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading uppercase text-foreground">
                {authorData.name}
              </h1>

              {authorData.creci && (
                <span className="px-2.5 py-1 rounded-none bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs font-semibold text-muted-foreground">
                  {authorData.creci}
                </span>
              )}
            </div>

            {authorData.role && (
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                {authorData.role}
              </p>
            )}

            
            <div className="flex items-center gap-3 pt-2">
              {authorData.linkedinUrl && (
                <a
                  href={authorData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="size-8 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Icon icon="ph:linkedin-logo-bold" className="size-4" />
                </a>
              )}
              {authorData.instagramUrl && (
                <a
                  href={authorData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="size-8 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Icon icon="ph:instagram-logo-bold" className="size-4" />
                </a>
              )}
              {authorData.email && (
                <a
                  href={`mailto:${authorData.email}`}
                  aria-label="E-mail"
                  className="size-8 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Icon icon="ph:envelope-simple-bold" className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        
        {authorData.bio && (
          <div className="pt-6 border-t border-zinc-200 dark:border-white/10 text-sm sm:text-base leading-relaxed text-muted-foreground font-light max-w-3xl">
            <PortableText value={authorData.bio} />
          </div>
        )}
      </header>

      
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block mb-1">
              Acervo do Autor
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-heading uppercase">
              Artigos Publicados por {authorData.name}
            </h2>
          </div>

          <span className="font-mono text-xs text-muted-foreground uppercase">
            {postList.length} {postList.length === 1 ? "artigo encontrado" : "artigos encontrados"}
          </span>
        </div>

        {postList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {postList.map((post) => {
              if (!post.slug?.current) return null;
              const postCategory = post.categories?.[0];

              return (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug.current}`}
                  className="group flex flex-col border border-zinc-200 dark:border-white/10 bg-card rounded-none hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted border-b border-zinc-200 dark:border-white/10">
                    {post.mainImage ? (
                      <Image
                        src={urlForImage(post.mainImage)?.width(800).height(500).url() || ""}
                        alt={(typeof post.mainImage === "object" && post.mainImage?.alt) || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-muted">
                        <Icon icon="ph:article" className="size-10 opacity-30 text-muted-foreground" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      {postCategory && (
                        <span className="px-2.5 py-1 rounded-none bg-zinc-900/90 text-white backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest border border-zinc-800">
                          {postCategory.title}
                        </span>
                      )}
                      {post.city && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10">
                          <Icon icon="ph:map-pin-fill" className="size-3" />
                          {post.city.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Icon icon="ph:clock-bold" className="size-3 text-primary" />
                          <span>{calculateReadingTime(post.body)} min</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-sm leading-relaxed text-muted-foreground font-light line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-foreground truncate max-w-[150px]">
                        {post.author?.name || "Pirâmide"}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Ler Artigo</span>
                        <Icon icon="ph:arrow-right-bold" className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="border border-zinc-200 dark:border-white/10 bg-card p-12 text-center rounded-none">
            <h3 className="text-xl font-bold font-heading uppercase text-foreground">
              Nenhum artigo publicado ainda
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-light">
              Este autor ainda não possui artigos públicos vinculados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
