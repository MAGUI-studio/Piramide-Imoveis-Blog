import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORY_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PostCard } from "@/src/components/blog/PostCard";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

type CategoryDetail = CategoryRef;

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

  const [{ data: category }, { data: categoryPosts = [] }] =
    await Promise.all([
      sanityFetch({
        query: CATEGORY_BY_SLUG_QUERY,
        params: { slug },
      }),
      sanityFetch({
        query: POSTS_BY_CATEGORY_QUERY,
        params: { slug },
      }),
    ]);

  const catData = category as CategoryDetail | null;

  if (!catData) {
    notFound();
  }

  const posts = (categoryPosts as PostItem[]) || [];

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

  const breadcrumbsItems = [
    { label: "Categorias", href: "/#categorias" },
    { label: catData.title },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryJsonLd),
        }}
      />
      <div className="w-full p-5 space-y-12">
        
        <Breadcrumbs items={breadcrumbsItems} />

        
        <section className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-xs">
              <Icon icon="ph:tag-fill" className="size-3.5 text-white" />
              <span>Categoria em Foco</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-heading text-foreground tracking-tight leading-none">
            {catData.title}
          </h1>

          {catData.description && (
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {catData.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-200 dark:border-white/10">
            <span>
              {posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} nesta categoria
            </span>
          </div>
        </section>

        
        <section className="space-y-8 pt-4">
          {posts.length === 0 ? (
            <div className="p-12 text-center rounded-none border border-zinc-200 dark:border-white/10">
              <h3 className="text-xl font-bold font-heading uppercase text-foreground">
                Nenhum artigo publicado ainda para {catData.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 font-light">
                Em breve traremos novos conteúdos e análises para esta categoria.
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
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
