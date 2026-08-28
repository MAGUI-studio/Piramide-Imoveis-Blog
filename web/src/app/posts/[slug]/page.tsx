import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POST_SLUGS_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import { TableOfContents } from "@/src/components/blog/TableOfContents";
import { ShareButtons } from "@/src/components/blog/ShareButtons";
import { calculateReadingTime, extractHeadings } from "@/src/lib/blog-utils";
import type { PostItem, AuthorRef, CityRef, CategoryRef, SanityBody } from "@/src/types/sanity";

interface AuthorWithSocials extends AuthorRef {
  linkedinUrl?: string;
  instagramUrl?: string;
  email?: string;
}

interface PostDetail extends Omit<PostItem, "author" | "categories" | "city"> {
  canonicalUrl?: string;
  noIndex?: boolean;
  author?: AuthorWithSocials;
  city?: CityRef;
  categories?: CategoryRef[];
  body?: SanityBody;
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: POST_SLUGS_QUERY,
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
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    stega: false,
  });

  const postData = post as PostDetail | null;

  if (!postData) {
    return {
      title: "Artigo não encontrado",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const postUrl = `${baseUrl}/posts/${slug}`;
  const title = postData.metaTitle || postData.title;
  const description = postData.metaDescription || postData.excerpt || `Leia ${postData.title} no Blog Pirâmide Imóveis`;

  const ogImageSource = postData.seoImage || postData.mainImage;
  const ogImageUrl = ogImageSource
    ? urlForImage(ogImageSource)?.width(1200).height(630).fit("crop").url()
    : `${baseUrl}/logos/piramide/logo_black.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: postData.canonicalUrl || postUrl,
    },
    robots: postData.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: "article",
      publishedTime: postData.publishedAt,
      modifiedTime: postData.updatedAt || postData.publishedAt,
      authors: postData.author?.name ? [postData.author.name] : ["Pirâmide Imóveis"],
      tags: postData.tags || [],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  const postData = post as PostDetail | null;

  if (!postData) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.piramideimoveissjc.com.br";
  const postUrl = `${baseUrl}/posts/${slug}`;
  const readingTime = calculateReadingTime(postData.body);
  const headings = extractHeadings(postData.body);

  
  const categorySlugs = (postData.categories || [])
    .map((c) => c.slug?.current)
    .filter(Boolean) as string[];

  const { data: relatedPosts = [] } = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: {
      currentSlug: slug,
      categorySlugs: categorySlugs.length > 0 ? categorySlugs : ["none"],
    },
  });

  const relatedList = (relatedPosts as PostItem[]) || [];

  interface FaqBlockItem {
    _type: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  }

  
  const rawBlocks = (Array.isArray(postData.body) ? postData.body : []) as FaqBlockItem[];
  const faqBlocks = rawBlocks.filter((b) => b && typeof b === "object" && b._type === "faqBlock");
  const faqItems = faqBlocks.flatMap((b) => b.items || []);

  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@type": "Blog",
          "@id": `${baseUrl}#blog`,
          name: "Blog Pirâmide Imóveis",
          url: baseUrl,
        },
        headline: postData.title,
        description: postData.metaDescription || postData.excerpt,
        url: postUrl,
        datePublished: postData.publishedAt,
        dateModified: postData.updatedAt || postData.publishedAt,
        mainEntityOfPage: postUrl,
        inLanguage: "pt-BR",
        image: postData.mainImage ? urlForImage(postData.mainImage)?.width(1200).height(630).url() : undefined,
        keywords: postData.tags?.join(", "),
        author: {
          "@type": "Person",
          name: postData.author?.name || "Redação Pirâmide Imóveis",
          jobTitle: postData.author?.role,
          url: postData.author?.linkedinUrl || baseUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Pirâmide Imóveis",
          url: "https://www.piramideimoveissjc.com.br",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logos/piramide/logo_black.svg`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
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
            name: postData.categories?.[0]?.title || "Artigos",
            item: postData.categories?.[0]?.slug?.current
              ? `${baseUrl}/categoria/${postData.categories[0].slug.current}`
              : baseUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: postData.title,
            item: postUrl,
          },
        ],
      },
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}#faq`,
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const primaryCategory = postData.categories?.[0];

  return (
    <>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full px-6 sm:px-10 md:px-14 lg:px-20 py-8 sm:py-12 space-y-12 sm:space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Icon icon="ph:house" className="size-3.5 text-primary" />
              <span>Início</span>
            </Link>
            <span>/</span>
            {primaryCategory?.slug?.current ? (
              <Link
                href={`/categoria/${primaryCategory.slug.current}`}
                className="hover:text-foreground transition-colors"
              >
                {primaryCategory.title}
              </Link>
            ) : (
              <span>Artigos</span>
            )}
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-foreground font-bold">
              {postData.title}
            </span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            <Icon icon="ph:arrow-left-bold" className="size-3.5" />
            <span>Voltar ao Blog</span>
          </Link>
        </div>

        
        <header className="space-y-6 max-w-5xl">
          {postData.categories && postData.categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {postData.categories.map((cat) => (
                cat.slug?.current ? (
                  <Link key={cat._id} href={`/categoria/${cat.slug.current}`}>
                    <span className="px-3 py-1.5 rounded-none bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-widest border border-zinc-800 hover:border-primary transition-all">
                      {cat.title}
                    </span>
                  </Link>
                ) : (
                  <span key={cat._id} className="px-3 py-1.5 rounded-none bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-widest border border-zinc-800">
                    {cat.title}
                  </span>
                )
              ))}

              {postData.city && (
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1.5">
                  <Icon icon="ph:map-pin-fill" className="size-3.5 text-primary" />
                  {postData.city.name}{postData.city.state ? ` - ${postData.city.state}` : ""}
                </span>
              )}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-heading text-foreground leading-[1.0] max-w-5xl">
            {postData.title}
          </h1>

          {postData.excerpt && (
            <p className="text-lg sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-4xl">
              {postData.excerpt}
            </p>
          )}

          
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={postData.author?.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                className="size-12 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden relative shrink-0 hover:scale-105 transition-transform"
              >
                {postData.author?.image ? (
                  <Image
                    src={urlForImage(postData.author.image)?.width(96).height(96).url() || ""}
                    alt={postData.author.name}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center font-bold text-sm font-mono">
                    {postData.author?.name?.charAt(0) || "P"}
                  </div>
                )}
              </Link>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Link
                    href={postData.author?.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                    className="font-bold text-sm text-foreground font-heading uppercase tracking-wide hover:text-primary transition-colors"
                  >
                    {postData.author?.name || "Redação Pirâmide"}
                  </Link>
                  {postData.author?.creci && (
                    <span className="px-2 py-0.5 rounded-none bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] text-muted-foreground">
                      {postData.author.creci}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span>Publicado em {formatDate(postData.publishedAt)}</span>
                  {postData.updatedAt && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Atualizado em {formatDate(postData.updatedAt)}
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Icon icon="ph:clock-bold" className="size-3.5 text-primary" />
                    <span>{readingTime} min de leitura</span>
                  </span>
                </div>
              </div>
            </div>

            <ShareButtons title={postData.title} slug={slug} />
          </div>
        </header>

        
        {postData.mainImage && (
          <figure className="w-full overflow-hidden rounded-none bg-muted border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full">
              <Image
                src={urlForImage(postData.mainImage)?.width(1800).height(900).url() || ""}
                alt={(typeof postData.mainImage === "object" && postData.mainImage?.alt) || postData.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            {typeof postData.mainImage === "object" && postData.mainImage?.caption && (
              <figcaption className="px-5 py-3 text-center text-xs font-mono text-muted-foreground bg-card border-t border-zinc-200 dark:border-zinc-800">
                {postData.mainImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          
          <main className="lg:col-span-8 space-y-10">
            
            <div className="block lg:hidden">
              {headings.length > 1 && <TableOfContents headings={headings} />}
            </div>

            
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              {postData.body ? (
                <PortableText value={postData.body} />
              ) : (
                <p className="text-muted-foreground italic">Sem conteúdo adicional para este artigo.</p>
              )}
            </div>

            
            {postData.tags && postData.tags.length > 0 && (
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                  Tópicos Relacionados:
                </span>
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-none bg-card border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-foreground font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            
            {postData.author && (
              <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-card rounded-none shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
                  <div className="flex items-center gap-4">
                    <Link
                      href={postData.author.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                      className="size-16 sm:size-20 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-primary/20 overflow-hidden relative shrink-0 hover:scale-105 transition-transform"
                    >
                      {postData.author.image ? (
                        <Image
                          src={urlForImage(postData.author.image)?.width(128).height(128).url() || ""}
                          alt={postData.author.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center font-bold text-xl font-mono">
                          {postData.author.name.charAt(0)}
                        </div>
                      )}
                    </Link>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                        Autor do Artigo
                      </span>
                      <h3 className="text-xl font-bold font-heading uppercase text-foreground">
                        <Link
                          href={postData.author.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                          className="hover:text-primary transition-colors"
                        >
                          {postData.author.name}
                        </Link>
                      </h3>
                      {postData.author.role && (
                        <p className="text-xs font-mono text-muted-foreground">
                          {postData.author.role} {postData.author.creci ? `• ${postData.author.creci}` : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-2">
                    {postData.author.linkedinUrl && (
                      <a
                        href={postData.author.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-sky-600 hover:text-white text-muted-foreground transition-all cursor-pointer"
                        title="LinkedIn"
                      >
                        <Icon icon="ph:linkedin-logo-bold" className="size-4" />
                      </a>
                    )}
                    {postData.author.instagramUrl && (
                      <a
                        href={postData.author.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-none border border-zinc-200 dark:border-zinc-800 bg-card hover:bg-pink-600 hover:text-white text-muted-foreground transition-all cursor-pointer"
                        title="Instagram"
                      >
                        <Icon icon="ph:instagram-logo-bold" className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                {postData.author.bio && (
                  <div className="text-sm leading-relaxed text-muted-foreground font-light">
                    <PortableText value={postData.author.bio} />
                  </div>
                )}
              </div>
            )}
          </main>

          
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {headings.length > 1 && (
                <div className="hidden lg:block">
                  <TableOfContents headings={headings} />
                </div>
              )}
            </div>
          </aside>
        </div>

        
        {relatedList.length > 0 && (
          <section className="pt-16 sm:pt-20 border-t border-zinc-200 dark:border-zinc-800 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black font-heading uppercase text-foreground">
                Artigos Relacionados
              </h2>
              <Link
                href="/"
                className="font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
              >
                <span>Ver Todos</span>
                <Icon icon="ph:arrow-right-bold" className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedList.map((relPost) => {
                if (!relPost.slug?.current) return null;
                return (
                  <Link
                    key={relPost._id}
                    href={`/posts/${relPost.slug.current}`}
                    className="group flex flex-col border border-zinc-200 dark:border-zinc-800 bg-card rounded-none shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted border-b border-zinc-200 dark:border-zinc-800">
                      {relPost.mainImage ? (
                        <Image
                          src={urlForImage(relPost.mainImage)?.width(700).height(440).url() || ""}
                          alt={relPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-muted">
                          <Icon icon="ph:article" className="size-10 opacity-30 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {formatDate(relPost.publishedAt)}
                        </span>
                        <h4 className="font-bold text-lg font-heading uppercase text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {relPost.title}
                        </h4>
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Ler Artigo</span>
                        <Icon icon="ph:arrow-right-bold" className="size-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
