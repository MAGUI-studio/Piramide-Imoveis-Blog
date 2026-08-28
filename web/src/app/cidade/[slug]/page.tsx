import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CITY_BY_SLUG_QUERY,
  POSTS_BY_CITY_QUERY,
  CITY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { PostsList } from "@/src/components/blog/PostsList";
import type { PostItem, CityRef } from "@/src/types/sanity";

interface CityDetail extends CityRef {
  description?: string;
  postCount?: number;
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

  return {
    title: `${cityData.name} (${cityData.state || "SP"}) | Blog Pirâmide Imóveis`,
    description: cityData.description || `Artigos, análises e lançamentos imobiliários em ${cityData.name}.`,
    alternates: {
      canonical: `/cidade/${slug}`,
    },
    openGraph: {
      title: `${cityData.name} | Blog Pirâmide Imóveis`,
      description: cityData.description || `Artigos e análises sobre o mercado imobiliário em ${cityData.name}.`,
      url: `/cidade/${slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: city }, { data: cityPosts = [] }] =
    await Promise.all([
      sanityFetch({
        query: CITY_BY_SLUG_QUERY,
        params: { slug },
      }),
      sanityFetch({
        query: POSTS_BY_CITY_QUERY,
        params: { slug },
      }),
    ]);

  const cityData = city as CityDetail | null;

  if (!cityData) {
    notFound();
  }

  const posts = (cityPosts as PostItem[]) || [];

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

  const breadcrumbItems = [
    { label: "Cidades", href: "/#cidades" },
    { label: cityData.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cityJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        
        <Breadcrumbs items={breadcrumbItems} />

        <PageHeroHeader
          badge="Cidade em Foco"
          badgeIcon="ph:map-pin-fill"
          title={`${cityData.name}${cityData.state ? ` - ${cityData.state}` : ""}`}
          description={cityData.description}
          meta={`${posts.length} ${posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} nesta cidade`}
        />
        <PostsList posts={posts} hideHeader />
      </div>
    </>
  );
}
