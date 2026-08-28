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
import { ReadingProgressBar } from "@/src/components/blog/ReadingProgressBar";
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
  const primaryCategory = postData.categories?.[0];

  const defaultWhatsAppMsg = encodeURIComponent(
    `Olá! Estava lendo o artigo "${postData.title}" no Blog da Pirâmide e gostaria de conversar sobre oportunidades na região.`
  );

  return (
    <>
      
      <ReadingProgressBar targetId="post-article-container" />

      <article className="w-full p-5 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-4">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-wider overflow-x-auto">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 shrink-0">
              <Icon icon="ph:house-fill" className="size-3.5 text-primary" />
              <span>Início</span>
            </Link>
            <span>/</span>
            {primaryCategory?.slug?.current ? (
              <Link
                href={`/categoria/${primaryCategory.slug.current}`}
                className="hover:text-primary transition-colors shrink-0"
              >
                {primaryCategory.title}
              </Link>
            ) : (
              <span className="shrink-0">Artigos</span>
            )}
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-md text-foreground font-semibold">
              {postData.title}
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
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-none bg-zinc-100 dark:bg-white/5 font-mono text-xs text-foreground font-medium border border-zinc-200 dark:border-white/10"
                      >
                        #{tag}
                      </span>
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
            </main>

            
            <aside className="lg:col-span-4 self-stretch">
              <div className="sticky top-28 space-y-8">
                
                {headings.length > 1 && (
                  <div className="hidden lg:block">
                    <TableOfContents headings={headings} variant="sidebar" />
                  </div>
                )}

                
                <div className="p-6 bg-zinc-100/90 dark:bg-[#161616] text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-white/10 rounded-none space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Consultoria Online
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold font-heading uppercase text-zinc-900 dark:text-white leading-snug">
                    Interessado em Imóveis nesta Região?
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    Fale diretamente com nossa equipe de especialistas e receba opções exclusivas no seu WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/5512991599801?text=${defaultWhatsAppMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-none transition-colors shadow-xs"
                  >
                    <Icon icon="ph:whatsapp-logo-bold" className="size-4" />
                    <span>Conversar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        
        {relatedList.length > 0 && (
          <section className="pt-16 sm:pt-20 pb-20 sm:pb-28 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-1">
                  Continue Lendo
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-heading uppercase text-foreground">
                  Artigos Relacionados
                </h2>
              </div>

              <Link
                href="/"
                className="font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1.5"
              >
                <span>Ver Todos os Artigos</span>
                <Icon icon="ph:arrow-right-bold" className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {relatedList.map((relPost) => {
                if (!relPost.slug?.current) return null;
                const relCategory = relPost.categories?.[0];

                return (
                  <Link
                    key={relPost._id}
                    href={`/posts/${relPost.slug.current}`}
                    scroll={true}
                    className="group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full"
                  >
                    
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      {relPost.mainImage ? (
                        <Image
                          src={
                            urlForImage(relPost.mainImage)?.width(800).height(500).url() || ""
                          }
                          alt={(typeof relPost.mainImage === "object" && relPost.mainImage?.alt) || relPost.title}
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
                        {relCategory && (
                          <span className="px-2.5 py-1 bg-black/75 text-white backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-xs">
                            {relCategory.title}
                          </span>
                        )}
                        {relPost.city && (
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/10 shadow-xs">
                            <Icon icon="ph:map-pin-fill" className="size-3 text-white" />
                            {relPost.city.name}
                          </span>
                        )}
                      </div>

                      {relPost.featured && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-xs">
                          Destaque
                        </span>
                      )}
                    </div>

                    
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                          <span>{formatDate(relPost.publishedAt)}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Icon icon="ph:clock-bold" className="size-3 text-zinc-400" />
                            <span>{calculateReadingTime(relPost.body)} min</span>
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {relPost.title}
                        </h3>

                        {relPost.excerpt && (
                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-light line-clamp-2">
                            {relPost.excerpt}
                          </p>
                        )}
                      </div>

                      
                      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                        <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[150px]">
                          {relPost.author?.name || "Redação Pirâmide"}
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
          </section>
        )}
      </article>
    </>
  );
}
