import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CITY_BY_SLUG_QUERY,
  POSTS_BY_CITY_QUERY,
  CITY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PostCard } from "@/src/components/blog/PostCard";
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
      <div className="w-full p-5 space-y-12">
        
        <Breadcrumbs items={breadcrumbItems} />

        
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
            <span>
              {posts.length} {posts.length === 1 ? "artigo encontrado" : "artigos encontrados"} nesta cidade
            </span>
          </div>
        </section>

        
        <section className="space-y-8 pt-4">
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
