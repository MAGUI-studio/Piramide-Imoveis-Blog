import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CITY_BY_SLUG_QUERY,
  POSTS_BY_CITY_QUERY,
  CITY_SLUGS_QUERY,
  CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import type { PostItem, CategoryRef, CityRef } from "@/src/types/sanity";

interface CityDetail extends CityRef {
  description?: string;
  postCount?: number;
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
  const { data: slugs } = await sanityFetch({
    query: CITY_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return ((slugs as { slug: string }[]) || []).map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: city } = await sanityFetch({
    query: CITY_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const cityData = city as CityDetail | null;

  if (!cityData) {
    return {
      title: "Cidade não encontrada",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  return {
    title: `${cityData.name} (${cityData.state || "SP"}) | Blog Pirâmide Imóveis`,
    description: cityData.description || `Artigos, análises e lançamentos imobiliários em ${cityData.name}.`,
    alternates: {
      canonical: `${baseUrl}/cidade/${slug}`,
    },
    openGraph: {
      title: `${cityData.name} | Blog Pirâmide Imóveis`,
      description: cityData.description || `Artigos e análises sobre o mercado imobiliário em ${cityData.name}.`,
      url: `${baseUrl}/cidade/${slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: city }, { data: cityPosts = [] }, { data: allCategories = [] }] =
    await Promise.all([
      sanityFetch({
        query: CITY_BY_SLUG_QUERY,
        params: { slug },
      }),
      sanityFetch({
        query: POSTS_BY_CITY_QUERY,
        params: { slug },
      }),
      sanityFetch({
        query: CATEGORIES_QUERY,
      }),
    ]);

  const cityData = city as CityDetail | null;

  if (!cityData) {
    notFound();
  }

  const posts = (cityPosts as PostItem[]) || [];
  const categories = (allCategories as CategoryRef[]) || [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const cityUrl = `${baseUrl}/cidade/${slug}`;

  const cityJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${cityUrl}/#collection`,
        name: `Artigos e Imóveis em ${cityData.name} - Blog Pirâmide Imóveis`,
        description: cityData.description || `Artigos e análises sobre o mercado imobiliário em ${cityData.name}.`,
        url: cityUrl,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "Blog Pirâmide Imóveis",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${cityUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cidades",
            item: `${baseUrl}/#cidades`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cityData.name,
            item: cityUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cityJsonLd),
        }}
      />
      <div className="w-full p-5 space-y-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-4">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-wider overflow-x-auto">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
            <Icon icon="ph:house-fill" className="size-3.5 text-primary" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <span className="shrink-0">Cidades</span>
          <span>/</span>
          <span className="truncate text-foreground font-semibold">
            {cityData.name}
          </span>
        </nav>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity shrink-0"
        >
          <Icon icon="ph:arrow-left-bold" className="size-3.5" />
          <span>Voltar ao Blog</span>
        </Link>
      </div>

      
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-xs">
            <Icon icon="ph:map-pin-fill" className="size-3.5 text-white" />
            <span>Cidade em Foco</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-heading text-foreground tracking-tight leading-none">
          {cityData.name} {cityData.state ? `- ${cityData.state}` : ""}
        </h1>

        {cityData.description && (
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            {cityData.description}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-200 dark:border-white/10">
          <span>{posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} nesta cidade</span>
        </div>
      </section>

      
      {categories.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-zinc-200 dark:border-white/10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
            Filtrar por Categoria:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              cat.slug?.current && (
                <Link
                  key={cat._id}
                  href={`/categoria/${cat.slug.current}`}
                  className="shrink-0 px-3.5 py-1.5 bg-zinc-100 dark:bg-white/5 hover:bg-primary hover:text-white dark:hover:bg-primary text-zinc-700 dark:text-zinc-300 font-mono text-xs font-medium uppercase tracking-wider transition-colors border border-zinc-200 dark:border-white/10 rounded-none"
                >
                  {cat.title}
                </Link>
              )
            ))}
          </div>
        </section>
      )}

      
      <section className="space-y-8 pt-6">
        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-none border border-zinc-200 dark:border-white/10">
            <h3 className="text-xl font-bold font-heading uppercase text-foreground">
              Nenhum artigo publicado ainda para {cityData.name}
            </h3>
            <p className="mt-2 text-sm text-zinc-500 font-light">
              Em breve nossos especialistas trarão análises exclusivas sobre esta região.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <Icon icon="ph:arrow-left-bold" className="size-3.5" />
              <span>Ver Todos os Artigos</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {posts.map((post) => {
              if (!post.slug?.current) return null;
              const postCategory = post.categories?.[0];

              return (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug.current}`}
                  className="group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full"
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
            })}
          </div>
        )}
      </section>
    </div>
    </>
  );
}
