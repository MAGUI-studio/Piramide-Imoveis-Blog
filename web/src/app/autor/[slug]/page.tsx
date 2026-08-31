import type { Metadata } from "next";
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
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { PostsList } from "@/src/components/blog/PostsList";
import type { AuthorRef, PostItem } from "@/src/types/sanity";

export const revalidate = 60;

interface AuthorDetail extends AuthorRef {
  _id: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: AUTHOR_SLUGS_QUERY,
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
  const { data: author } = await sanityFetch({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
  });

  const authorData = author as AuthorDetail | null;

  if (!authorData) {
    return {
      title: "Autor não encontrado | Blog Pirâmide Imóveis",
      description: "O autor solicitado não foi encontrado.",
    };
  }

  const title = `${authorData.name} | Blog Pirâmide Imóveis`;
  const description =
    authorData.role ||
    `Artigos, análises de mercado e inteligência imobiliária por ${authorData.name}.`;
  const canonicalUrl = `/autor/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ data: author }, { data: authorPosts }] = await Promise.all([
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

  if (!authorData) {
    notFound();
  }

  const postList = (authorPosts as PostItem[]) || [];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const authorUrl = `${baseUrl}/autor/${slug}`;

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${authorUrl}/#profile`,
        name: `${authorData.name} - Blog Pirâmide Imóveis`,
        url: authorUrl,
        mainEntity: {
          "@type": "Person",
          name: authorData.name,
          jobTitle: authorData.role || "Consultor Imobiliário",
          worksFor: {
            "@type": "Organization",
            name: "Pirâmide Imóveis",
          },
          ...(authorData.image
            ? {
                image: urlForImage(authorData.image)?.width(400).height(400).url(),
              }
            : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${authorUrl}/#breadcrumb`,
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
            name: "Autores",
            item: `${baseUrl}/autores`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: authorData.name,
            item: authorUrl,
          },
        ],
      },
    ],
  };

  const breadcrumbsItems = [
    { label: "Autores", href: "/autores" },
    { label: authorData.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(authorJsonLd),
        }}
      />
      <div className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-12">
        <Breadcrumbs items={breadcrumbsItems} />

          <PageHeroHeader
            badge="Especialista / Autor"
            badgeIcon="ph:user-circle-fill"
            title={authorData.name}
            description={
              authorData.role
                ? `${authorData.role}${authorData.creci ? ` • CRECI: ${authorData.creci}` : ""}`
                : "Especialista em análises imobiliárias e inteligência de mercado."
            }
            meta={`${postList.length} ${postList.length === 1 ? "artigo encontrado" : "artigos encontrados"} deste autor`}
          />

          {(authorData.bio || authorData.linkedinUrl || authorData.instagramUrl || authorData.email) && (
            <div className="space-y-4 max-w-4xl -mt-4">
              {authorData.bio && (
                <div className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-light">
                  <PortableText value={authorData.bio} />
                </div>
              )}

            {(authorData.linkedinUrl || authorData.instagramUrl || authorData.email) && (
              <div className="flex items-center gap-2 pt-1">
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
            )}
          </div>
        )}
        <PostsList posts={postList} hideHeader />
      </div>
    </>
  );
}
