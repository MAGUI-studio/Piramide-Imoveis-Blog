import type { Metadata } from "next";
import Image from "next/image";
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
import { PostCard } from "@/src/components/blog/PostCard";
import type { AuthorRef, PostItem } from "@/src/types/sanity";

export const revalidate = 60;

interface AuthorDetail extends AuthorRef {
  _id: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
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

  if (!authorData) {
    notFound();
  }

  const postList = (posts as PostItem[]) || [];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const authorUrl = `${baseUrl}/autor/${slug}`;
  const authorImageUrl = authorData.image
    ? urlForImage(authorData.image)?.width(400).height(400).url()
    : null;

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${authorUrl}/#profile`,
        name: `Perfil de ${authorData.name} - Blog Pirâmide Imóveis`,
        url: authorUrl,
        mainEntity: {
          "@type": "Person",
          "@id": `${authorUrl}/#person`,
          name: authorData.name,
          jobTitle: authorData.role || "Especialista Imobiliário",
          description: typeof authorData.bio === "string" ? authorData.bio : undefined,
          image: authorImageUrl || undefined,
          sameAs: [authorData.linkedinUrl, authorData.instagramUrl].filter(Boolean),
          worksFor: {
            "@type": "Organization",
            name: "Pirâmide Imóveis",
            url: "https://www.piramideimoveissjc.com.br",
          },
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
            item: `${baseUrl}/#autores`,
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
    { label: "Autores", href: "/#autores" },
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
      <div className="w-full p-5 space-y-12 sm:space-y-16">
        
        <Breadcrumbs items={breadcrumbsItems} />

        
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
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  Especialista / Autor
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground font-heading uppercase">
                  {authorData.name}
                </h1>
                {authorData.role && (
                  <p className="text-sm font-mono text-muted-foreground">
                    {authorData.role} {authorData.creci ? `• CRECI: ${authorData.creci}` : ""}
                  </p>
                )}
              </div>

              
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {postList.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
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
    </>
  );
}
