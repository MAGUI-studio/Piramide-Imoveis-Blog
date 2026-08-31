import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POST_SLUGS_QUERY, RELATED_POSTS_QUERY, POST_PREV_NEXT_QUERY } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@/components/PortableText";
import { TableOfContents } from "@/src/components/blog/TableOfContents";
import { ReadingProgressBar } from "@/src/components/blog/ReadingProgressBar";
import { ShareButtons } from "@/src/components/blog/ShareButtons";
import { Breadcrumbs } from "@/src/components/blog/Breadcrumbs";
import { PostCard } from "@/src/components/blog/PostCard";
import { SectionHeader } from "@/src/components/blog/SectionHeader";
import { WhatsAppConsultationCard } from "@/src/components/blog/WhatsAppConsultationCard";
import { ScrollToTop } from "@/src/components/common/ScrollToTop";
import { calculateReadingTime, extractHeadings, slugifyText } from "@/src/lib/blog-utils";
import { getBaseUrl } from "@/src/config/site";
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
      month: "short",
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

  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/posts/${slug}`;
  const title = postData.metaTitle || postData.title;
  const description = postData.metaDescription || postData.excerpt || `Leia ${postData.title} no Blog Pirâmide Imóveis`;

  const ogImageSource = postData.seoImage || postData.mainImage;
  const ogImageUrl = ogImageSource
    ? urlForImage(ogImageSource)?.width(1200).height(630).fit("crop").url()
    : `${baseUrl}/utils/SEO/og-image.jpg`;

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

  const readingTime = calculateReadingTime(postData.body);
  const headings = extractHeadings(postData.body);

  const categorySlugs = (postData.categories || [])
    .map((c) => c.slug?.current)
    .filter(Boolean) as string[];

  const [
    { data: relatedPosts = [] },
    { data: prevNextData = null },
  ] = await Promise.all([
    sanityFetch({
      query: RELATED_POSTS_QUERY,
      params: {
        currentSlug: slug,
        categorySlugs: categorySlugs.length > 0 ? categorySlugs : ["none"],
      },
    }),
    postData.publishedAt
      ? sanityFetch({
          query: POST_PREV_NEXT_QUERY,
          params: { publishedAt: postData.publishedAt },
        })
      : Promise.resolve({ data: null }),
  ]);

  const relatedList = (relatedPosts as PostItem[]) || [];
  const prevPost = prevNextData?.prev as { _id: string; title: string; slug: { current: string } } | null;
  const nextPost = prevNextData?.next as { _id: string; title: string; slug: { current: string } } | null;
  const primaryCategory = postData.categories?.[0];

  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/posts/${slug}`;
  const ogImageUrl = postData.mainImage
    ? urlForImage(postData.mainImage)?.width(1200).height(630).url()
    : `${baseUrl}/utils/SEO/og-image.jpg`;

  interface FaqItemRaw {
    question?: string;
    answer?: string;
  }

  interface FaqBlockRaw {
    _type?: string;
    items?: FaqItemRaw[];
  }

  const faqItems = Array.isArray(postData.body)
    ? (postData.body as unknown[])
        .filter((block): block is FaqBlockRaw => {
          const b = block as FaqBlockRaw | null | undefined;
          return Boolean((b?._type === "faqBlock" || b?._type === "faq") && Array.isArray(b?.items));
        })
        .flatMap((b: FaqBlockRaw) => b.items || [])
        .filter((item): item is { question: string; answer: string } => Boolean(item?.question && item?.answer))
    : [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}/#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "Blog Pirâmide Imóveis",
          url: baseUrl,
        },
        headline: postData.metaTitle || postData.title,
        description: postData.metaDescription || postData.excerpt,
        url: postUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        inLanguage: "pt-BR",
        datePublished: postData.publishedAt || new Date().toISOString(),
        dateModified: postData.updatedAt || postData.publishedAt || new Date().toISOString(),
        author: {
          "@type": "Person",
          name: postData.author?.name || "Redação Pirâmide Imóveis",
          jobTitle: postData.author?.role || "Especialista Imobiliário",
          url: postData.author?.slug?.current
            ? `${baseUrl}/autor/${postData.author.slug.current}`
            : baseUrl,
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
        image: ogImageUrl ? [ogImageUrl] : [],
        articleSection: primaryCategory?.title || "Mercado Imobiliário",
        keywords: (postData.tags || []).join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: baseUrl,
          },
          ...(primaryCategory?.slug?.current
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: primaryCategory.title,
                  item: `${baseUrl}/categoria/${primaryCategory.slug.current}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: postData.title,
                  item: postUrl,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: postData.title,
                  item: postUrl,
                },
              ]),
        ],
      },
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}/#faq`,
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

  const breadcrumbItems = [
    {
      label: "Categorias",
      href: "/categorias",
    },
    ...(primaryCategory?.slug?.current
      ? [
          {
            label: primaryCategory.title || "Categoria",
            href: `/categoria/${primaryCategory.slug.current}`,
          },
        ]
      : []),
    {
      label: postData.title,
    },
  ];

  return (
    <>
      <ScrollToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <ReadingProgressBar targetId="post-article-container" />

      <article className="w-full px-6 pt-6 pb-12 sm:pb-16 space-y-12 sm:space-y-16">
        
        <Breadcrumbs items={breadcrumbItems} />

        
        <div id="post-article-container" className="space-y-10 w-full relative">
          
          <header className="space-y-6 w-full">
            
            <div className="flex flex-wrap items-center gap-3">
              {postData.categories && postData.categories.length > 0 && (
                postData.categories.map((cat) => (
                  cat.slug?.current ? (
                    <Link key={cat._id} href={`/categoria/${cat.slug.current}`}>
                      <span className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-xs">
                        {cat.title}
                      </span>
                    </Link>
                  ) : (
                    <span key={cat._id} className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest shadow-xs">
                      {cat.title}
                    </span>
                  )
                ))
              )}

              
              {postData.city && (
                postData.city.slug?.current ? (
                  <Link
                    href={`/cidade/${postData.city.slug.current}`}
                    className="font-mono text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity inline-flex items-center gap-1.5 bg-transparent border-none p-0"
                    title={`Ver todos os artigos em ${postData.city.name}`}
                  >
                    <Icon icon="ph:map-pin-fill" className="size-3.5 text-primary" />
                    <span>{postData.city.name}{postData.city.state ? ` - ${postData.city.state}` : ""}</span>
                  </Link>
                ) : (
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1.5">
                    <Icon icon="ph:map-pin-fill" className="size-3.5 text-primary" />
                    <span>{postData.city.name}{postData.city.state ? ` - ${postData.city.state}` : ""}</span>
                  </span>
                )
              )}
            </div>

            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase font-heading text-foreground leading-[1.05]">
              {postData.title}
            </h1>

            
            {postData.excerpt && (
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {postData.excerpt}
              </p>
            )}

            
            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Link
                  href={postData.author?.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                  className="size-12 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 overflow-hidden relative shrink-0 hover:scale-105 transition-transform"
                >
                  {postData.author?.image ? (
                    <Image
                      src={urlForImage(postData.author.image)?.width(96).height(96).url() || ""}
                      alt={postData.author.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center font-bold text-sm font-mono text-foreground">
                      {postData.author?.name?.charAt(0) || "P"}
                    </div>
                  )}
                </Link>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={postData.author?.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                      className="font-bold text-sm text-foreground font-heading uppercase tracking-wide hover:text-primary transition-colors"
                    >
                      {postData.author?.name || "Redação Pirâmide"}
                    </Link>
                    {postData.author?.creci && (
                      <span className="font-mono text-[11px] text-zinc-500">
                        • {postData.author.creci}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                    <span>{formatDate(postData.publishedAt)}</span>
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
            <figure className="w-full overflow-hidden rounded-none bg-transparent border-none">
              <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
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
                <figcaption className="px-0 py-2 text-center text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-transparent border-none">
                  {postData.mainImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-2 items-start relative">
            
            <main className="lg:col-span-8 space-y-10">
              
              <div className="block lg:hidden">
                {headings.length > 1 && <TableOfContents headings={headings} variant="inline" />}
              </div>

              
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                {postData.body ? (
                  <PortableText value={postData.body} />
                ) : (
                  <p className="text-muted-foreground italic">Sem conteúdo adicional para este artigo.</p>
                )}
              </div>

              
              {postData.tags && postData.tags.length > 0 && (
                <div className="pt-8 border-t border-zinc-200 dark:border-white/10 space-y-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                    Tags & Tópicos:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {postData.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/tag/${slugifyText(tag)}`}
                        className="px-3 py-1.5 rounded-none bg-zinc-100 dark:bg-white/5 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white font-mono text-xs text-foreground font-medium border border-zinc-200 dark:border-white/10 transition-all cursor-pointer"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              
              {postData.author && (
                <div className="pt-10 border-t border-zinc-200 dark:border-white/10 space-y-4 bg-transparent border-none">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={postData.author.slug?.current ? `/autor/${postData.author.slug.current}` : "#"}
                        className="size-16 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 overflow-hidden relative shrink-0 hover:scale-105 transition-transform"
                      >
                        {postData.author.image ? (
                          <Image
                            src={urlForImage(postData.author.image)?.width(128).height(128).url() || ""}
                            alt={postData.author.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-bold text-xl font-mono text-foreground">
                            {postData.author.name.charAt(0)}
                          </div>
                        )}
                      </Link>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
                          Sobre o Autor
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
                          <p className="text-xs font-mono text-zinc-500">
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
                          className="p-1.5 text-zinc-400 hover:text-sky-500 transition-colors cursor-pointer bg-transparent border-none"
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
                          className="p-1.5 text-zinc-400 hover:text-pink-500 transition-colors cursor-pointer bg-transparent border-none"
                          title="Instagram"
                        >
                          <Icon icon="ph:instagram-logo-bold" className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {postData.author.bio && (
                    <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light pt-1">
                      {typeof postData.author.bio === "string" ? (
                        <p>{postData.author.bio}</p>
                      ) : (
                        <PortableText value={postData.author.bio} />
                      )}
                    </div>
                  )}
                </div>
              )}

              {postData.city && (
                <div className="border border-zinc-200 dark:border-white/10 bg-card p-6 sm:p-8 space-y-4 rounded-none">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
                      <Icon icon="ph:buildings-fill" className="size-3 text-white" />
                      <span>Oportunidades na Região</span>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-foreground">
                    Procurando imóveis em {postData.city.name}?
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    A Pirâmide Imóveis possui a seleção mais exclusiva de apartamentos, casas em condomínio e lançamentos em {postData.city.name}. Fale com nossos consultores especialistas.
                  </p>
                  <div className="flex items-center gap-3 pt-2 flex-wrap">
                    <a
                      href="https://www.piramideimoveissjc.com.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Ver Imóveis Disponíveis</span>
                      <Icon icon="ph:arrow-up-right-bold" className="size-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/5512991599801?text=${encodeURIComponent(`Olá! Li o artigo "${postData.title}" e gostaria de informações sobre imóveis em ${postData.city.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 bg-transparent text-foreground hover:border-emerald-500 hover:text-emerald-500 font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Icon icon="ph:whatsapp-logo-bold" className="size-4 text-emerald-500" />
                      <span>Falar no WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {(prevPost || nextPost) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-white/10">
                  {prevPost ? (
                    <Link
                      href={`/posts/${prevPost.slug.current}`}
                      className="group p-5 border border-zinc-200 dark:border-white/10 hover:border-primary dark:hover:border-primary bg-card/60 hover:bg-card transition-all flex flex-col justify-between space-y-2.5 rounded-none"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                        <Icon icon="ph:arrow-left-bold" className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Artigo Anterior</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold font-heading uppercase text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {prevPost.title}
                      </h4>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {nextPost ? (
                    <Link
                      href={`/posts/${nextPost.slug.current}`}
                      className="group p-5 border border-zinc-200 dark:border-white/10 hover:border-primary dark:hover:border-primary bg-card/60 hover:bg-card transition-all flex flex-col justify-between space-y-2.5 text-left sm:text-right rounded-none"
                    >
                      <div className="flex items-center sm:justify-end gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                        <span>Próximo Artigo</span>
                        <Icon icon="ph:arrow-right-bold" className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <h4 className="text-sm sm:text-base font-bold font-heading uppercase text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {nextPost.title}
                      </h4>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              )}
            </main>

            
            <aside className="lg:col-span-4 self-stretch">
              <div className="sticky top-28 space-y-8">
                
                {headings.length > 1 && (
                  <div className="hidden lg:block">
                    <TableOfContents headings={headings} variant="sidebar" />
                  </div>
                )}

                
                <WhatsAppConsultationCard postTitle={postData.title} />
              </div>
            </aside>
          </div>
        </div>

        
        {relatedList.length > 0 && (
          <section className="pt-12 sm:pt-16 pb-4 space-y-8">
            <SectionHeader
              eyebrow="Continue Lendo"
              eyebrowIcon="ph:newspaper-fill"
              title="Artigos Relacionados"
              action={{
                label: "Ver Todos os Artigos",
                href: "/",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedList.map((relPost) => (
                <PostCard key={relPost._id} post={relPost} scroll={true} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
