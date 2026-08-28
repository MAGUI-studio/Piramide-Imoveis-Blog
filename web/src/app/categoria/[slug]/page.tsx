import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORY_BY_SLUG_QUERY,
  POSTS_QUERY,
  CATEGORY_SLUGS_QUERY,
  CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { calculateReadingTime } from "@/src/lib/blog-utils";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

type CategoryDetail = CategoryRef;

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
    query: CATEGORY_SLUGS_QUERY,
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
  const { data: category } = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  const catData = category as CategoryDetail | null;

  if (!catData) {
    return {
      title: "Categoria não encontrada",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";

  return {
    title: `${catData.title} | Blog Pirâmide Imóveis`,
    description: catData.description || `Artigos e análises sobre ${catData.title} no Blog Pirâmide Imóveis.`,
    alternates: {
      canonical: `${baseUrl}/categoria/${slug}`,
    },
    openGraph: {
      title: `${catData.title} | Blog Pirâmide Imóveis`,
      description: catData.description || `Artigos e análises sobre ${catData.title}.`,
      url: `${baseUrl}/categoria/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: category }, { data: allPosts = [] }, { data: allCategories = [] }] =
    await Promise.all([
      sanityFetch({
        query: CATEGORY_BY_SLUG_QUERY,
        params: { slug },
      }),
      sanityFetch({
        query: POSTS_QUERY,
      }),
      sanityFetch({
        query: CATEGORIES_QUERY,
      }),
    ]);

  const catData = category as CategoryDetail | null;

  if (!catData) {
    notFound();
  }

  const posts = (allPosts as PostItem[]) || [];
  const rawCategories = (allCategories as CategoryDetail[]) || [];

  
  const postList = posts.filter((p) =>
    p.categories?.some(
      (c) =>
        c.slug?.current === slug ||
        c._id === catData._id ||
        c.title?.toLowerCase() === catData.title?.toLowerCase()
    )
  );

  
  const categoriesList = rawCategories.map((cat) => {
    const count = posts.filter((p) =>
      p.categories?.some(
        (c) =>
          c.slug?.current === cat.slug?.current ||
          c._id === cat._id ||
          c.title?.toLowerCase() === cat.title?.toLowerCase()
      )
    ).length;

    return {
      ...cat,
      postCount: count,
    };
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const catUrl = `${baseUrl}/categoria/${slug}`;

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${catUrl}/#collection`,
        name: `${catData.title} - Blog Pirâmide Imóveis`,
        description: catData.description || `Artigos e análises sobre ${catData.title}.`,
        url: catUrl,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "Blog Pirâmide Imóveis",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${catUrl}/#breadcrumb`,
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
            name: "Categorias",
            item: `${baseUrl}/#categorias`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: catData.title,
            item: catUrl,
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
          __html: JSON.stringify(categoryJsonLd),
        }}
      />
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-8 sm:py-12 space-y-12 sm:space-y-16">
      
      <section className="border-b border-zinc-200 dark:border-zinc-800 pb-10 space-y-6">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Icon icon="ph:house" className="size-3.5 text-primary" />
            <span>Início</span>
          </Link>
          <span>/</span>
          <span>Categorias</span>
          <span>/</span>
          <span className="text-foreground font-bold">{catData.title}</span>
        </nav>

        <div className="space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-[10px] font-bold uppercase tracking-widest">
            <span>Categoria Selecionada</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase font-heading text-foreground">
            {catData.title}
          </h1>

          {catData.description && (
            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
              {catData.description}
            </p>
          )}
        </div>
      </section>

      
      {categoriesList.length > 0 && (
        <section className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mr-2 flex items-center gap-1.5">
            <Icon icon="ph:funnel-bold" className="size-3.5 text-primary" />
            Categorias:
          </span>

          <Link
            href="/"
            className="px-4 py-2 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground font-mono text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Todos ({posts.length})
          </Link>

          {categoriesList.map((cat) => {
            if (!cat.slug?.current) return null;
            const isCurrent = cat.slug.current === slug;
            return (
              <Link
                key={cat._id}
                href={`/categoria/${cat.slug.current}`}
                className={`px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider transition-all ${
                  isCurrent
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold shadow-xs"
                    : "border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground font-semibold"
                }`}
              >
                {cat.title} ({cat.postCount || 0})
              </Link>
            );
          })}
        </section>
      )}

      
      {postList.length === 0 ? (
        <div className="border border-zinc-200 dark:border-zinc-800 bg-card p-12 sm:p-20 text-center rounded-none shadow-xs">
          <div className="mx-auto flex size-20 items-center justify-center rounded-none bg-zinc-100 dark:bg-zinc-800 text-primary border border-zinc-200 dark:border-zinc-700">
            <Icon icon="ph:article-bold" className="size-10" />
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-black text-foreground font-heading uppercase">
            Nenhum artigo nesta categoria ainda
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-muted-foreground font-light">
            Ainda não há publicações cadastradas em &ldquo;{catData.title}&rdquo;.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-mono font-bold text-xs uppercase tracking-widest rounded-none transition-all"
            >
              <Icon icon="ph:arrow-left-bold" className="size-4" />
              <span>Ver todos os artigos do Blog</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {postList.map((post) => {
            if (!post.slug?.current) return null;
            return (
              <Link
                key={post._id}
                href={`/posts/${post.slug.current}`}
                className="group flex flex-col border border-zinc-200 dark:border-zinc-800 bg-card/80 backdrop-blur-xs rounded-none shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted border-b border-zinc-200 dark:border-zinc-800">
                  {post.mainImage ? (
                    <Image
                      src={urlForImage(post.mainImage)?.width(800).height(500).url() || ""}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-muted">
                      <Icon icon="ph:article" className="size-10 opacity-30 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>•</span>
                      <span>⏱️ {calculateReadingTime(post.body)} min</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-sm leading-relaxed text-muted-foreground font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-foreground truncate max-w-[150px]">
                      {post.author?.name || "Pirâmide"}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Ler</span>
                      <Icon icon="ph:arrow-right-bold" className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}
