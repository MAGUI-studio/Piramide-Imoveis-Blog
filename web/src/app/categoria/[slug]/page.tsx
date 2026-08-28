import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORY_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { PostsList } from "@/src/components/blog/PostsList";
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
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        
        <Breadcrumbs items={breadcrumbsItems} />

        <PageHeroHeader
          badge="Categoria em Foco"
          badgeIcon="ph:tag-fill"
          title={catData.title}
          description={catData.description}
          meta={`${posts.length} ${posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} nesta categoria`}
        />
        <PostsList posts={posts} hideHeader />
      </div>
    </>
  );
}
