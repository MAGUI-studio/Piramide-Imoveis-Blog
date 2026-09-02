"use client";

import { useState } from "react";
import { PortableText as PortableTextComponent, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import { slugifyText } from "@/src/lib/blog-utils";
import type { SanityBody, SanityImage } from "@/src/types/sanity";

interface CalloutValue {
  type?: "tip" | "info" | "warning" | "quote";
  title?: string;
  content?: string;
}

export function CalloutComponent({ value }: { value: CalloutValue }) {
  const type = value?.type || "tip";

  const config = {
    tip: {
      border: "border-l-2 border-primary bg-primary/[0.03] text-foreground",
      icon: "ph:lightbulb-filament-fill",
      iconColor: "text-primary",
      defaultTitle: "Dica de Especialista",
    },
    info: {
      border: "border-l-2 border-sky-500 bg-sky-500/[0.03] text-foreground",
      icon: "ph:info-fill",
      iconColor: "text-sky-500",
      defaultTitle: "Informação Importante",
    },
    warning: {
      border: "border-l-2 border-amber-500 bg-amber-500/[0.03] text-foreground",
      icon: "ph:warning-circle-fill",
      iconColor: "text-amber-500",
      defaultTitle: "Atenção & Cuidados",
    },
    quote: {
      border: "border-l-2 border-zinc-500 bg-zinc-500/[0.03] text-foreground",
      icon: "ph:quotes-fill",
      iconColor: "text-zinc-400",
      defaultTitle: "Citação",
    },
  }[type as "tip" | "info" | "warning" | "quote"] || {
    border: "border-l-2 border-primary bg-primary/[0.03] text-foreground",
    icon: "ph:lightbulb-filament-fill",
    iconColor: "text-primary",
    defaultTitle: "Dica",
  };

  return (
    <div className={`my-8 p-5 sm:p-6 rounded-none ${config.border}`}>
      <div className="flex items-start gap-3.5">
        <Icon icon={config.icon} className={`size-5 shrink-0 mt-0.5 ${config.iconColor}`} />
        <div className="space-y-1.5 flex-1">
          <h4 className="font-bold text-xs text-foreground uppercase tracking-widest font-mono">
            {value.title || config.defaultTitle}
          </h4>
          <p className="text-sm sm:text-base leading-relaxed opacity-90 whitespace-pre-line font-light">
            {value.content}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TableRow {
  cells?: string[];
}

interface TableValue {
  title?: string;
  headers?: string[];
  rows?: TableRow[];
}

export function TableComponent({ value }: { value: TableValue }) {
  const headers = value?.headers || [];
  const rows = value?.rows || [];

  if (headers.length === 0) return null;

  return (
    <div className="my-8 overflow-hidden rounded-none border border-zinc-200 dark:border-white/10 bg-card">
      {value.title && (
        <div className="bg-zinc-100 dark:bg-zinc-900 px-5 py-3 border-b border-zinc-200 dark:border-white/10 font-mono font-bold text-xs uppercase tracking-wider text-foreground">
          {value.title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/60 text-xs uppercase tracking-wider text-muted-foreground font-mono">
            <tr>
              {headers.map((h: string, idx: number) => (
                <th key={idx} className="px-5 py-3.5 border-b border-zinc-200 dark:border-white/10 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
            {rows.map((row: TableRow, rIdx: number) => (
              <tr key={rIdx} className="hover:bg-zinc-500/5 transition-colors">
                {(row.cells || []).map((cell: string, cIdx: number) => (
                  <td key={cIdx} className="px-5 py-3.5 text-foreground/90 font-light">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqValue {
  title?: string;
  items?: FaqItem[];
}

export function FaqComponent({ value }: { value: FaqValue }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = value?.items || [];

  if (items.length === 0) return null;

  return (
    <div className="my-12 space-y-4">
      {value.title && (
        <h3 className="text-xl sm:text-2xl font-bold text-foreground font-heading tracking-tight uppercase flex items-center gap-2">
          <Icon icon="ph:question-fill" className="size-5 text-primary" />
          <span>{value.title}</span>
        </h3>
      )}
      <div className="space-y-2">
        {items.map((item: FaqItem, idx: number) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-zinc-200 dark:border-white/10 rounded-none bg-card overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-foreground font-heading hover:bg-zinc-500/5 transition-colors gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <Icon
                  icon="ph:caret-down-bold"
                  className={`size-4 text-primary shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground font-light leading-relaxed border-t border-zinc-200/60 dark:border-white/5">
                  <p className="whitespace-pre-line pt-3">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface YoutubeValue {
  url?: string;
  title?: string;
  caption?: string;
}

export function YoutubeComponent({ value }: { value: YoutubeValue }) {
  if (!value?.url) return null;

  let embedUrl = value.url;
  if (value.url.includes("youtube.com/watch?v=")) {
    embedUrl = value.url.replace("watch?v=", "embed/");
  } else if (value.url.includes("youtu.be/")) {
    embedUrl = value.url.replace("youtu.be/", "www.youtube.com/embed/");
  } else if (value.url.includes("vimeo.com/")) {
    embedUrl = value.url.replace("vimeo.com/", "player.vimeo.com/video/");
  }

  return (
    <figure className="my-10 overflow-hidden rounded-none w-full bg-transparent border-none shadow-none">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={embedUrl}
          title={value.title || "Vídeo incorporado"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
          loading="lazy"
        />
      </div>
      {value.caption && (
        <figcaption className="px-0 py-2.5 text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-transparent border-none">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

interface GalleryImage {
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

interface GalleryValue {
  title?: string;
  columns?: number;
  images?: GalleryImage[];
}

export function GalleryComponent({ value }: { value: GalleryValue }) {
  const images = value?.images || [];
  const columns = value?.columns || 2;

  if (images.length === 0) return null;

  return (
    <div className="my-10 space-y-3">
      {value.title && (
        <h4 className="text-base font-bold text-foreground font-heading uppercase tracking-wide">
          {value.title}
        </h4>
      )}
      <div
        className={`grid gap-4 ${
          columns === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {images.map((img: GalleryImage, idx: number) => {
          const imgUrl = urlForImage(img as SanityImage)?.width(1000).height(750).url();
          if (!imgUrl) return null;
          return (
            <figure
              key={idx}
              className="group overflow-hidden rounded-none bg-transparent border-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={imgUrl}
                  alt={img.alt || `Foto ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <figcaption className="px-0 py-2 text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-transparent border-none">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}

interface CtaValue {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  isWhatsApp?: boolean;
}

export function CtaComponent({ value }: { value: CtaValue }) {
  if (!value?.title) return null;

  const isWhatsApp = value.isWhatsApp !== false;
  const buttonText = value.buttonText || (isWhatsApp ? "Falar no WhatsApp" : "Saiba Mais");

  let href = value.buttonUrl || "";
  if (isWhatsApp && (!href || !href.startsWith("http"))) {
    const text = encodeURIComponent(
      href || `Olá! Li sobre "${value.title}" no Blog Pirâmide Imóveis e gostaria de mais informações.`
    );
    href = `https://wa.me/5512991599801?text=${text}`;
  }

  const isExternal = href.startsWith("http");

  return (
    <div className="my-10 p-6 sm:p-8 bg-zinc-900 text-white border-l-4 border-primary rounded-none shadow-xl relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 text-white/[0.03] pointer-events-none select-none">
        <Icon icon="ph:buildings-fill" className="size-48" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-widest">
          <Icon icon={isWhatsApp ? "ph:whatsapp-logo-fill" : "ph:sparkle-fill"} className="size-3.5" />
          <span>Oportunidade Especial</span>
        </div>

        <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-white tracking-tight leading-snug">
          {value.title}
        </h4>

        {value.description && (
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-2xl">
            {value.description}
          </p>
        )}

        <div className="pt-2">
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              {isWhatsApp && <Icon icon="ph:whatsapp-logo-bold" className="size-4 text-white" />}
              <span>{buttonText}</span>
              <Icon icon="ph:arrow-up-right-bold" className="size-3.5" />
            </a>
          ) : (
            <Link
              href={href || "#"}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>{buttonText}</span>
              <Icon icon="ph:arrow-right-bold" className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlForImage(value)?.width(1400).height(800).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-10 overflow-hidden rounded-none w-full bg-transparent border-none">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem do artigo"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="px-0 py-2 text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-transparent border-none">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    imageBlock: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlForImage(value)?.width(1400).height(800).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-10 overflow-hidden rounded-none w-full bg-transparent border-none">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem do artigo"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="px-0 py-2 text-center text-xs text-zinc-500 dark:text-zinc-400 font-mono bg-transparent border-none">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    gallery: ({ value }) => <GalleryComponent value={value as GalleryValue} />,
    galleryBlock: ({ value }) => <GalleryComponent value={value as GalleryValue} />,
    youtube: ({ value }) => <YoutubeComponent value={value as YoutubeValue} />,
    youtubeBlock: ({ value }) => <YoutubeComponent value={value as YoutubeValue} />,
    callout: ({ value }) => <CalloutComponent value={value as CalloutValue} />,
    calloutBlock: ({ value }) => <CalloutComponent value={value as CalloutValue} />,
    cta: ({ value }) => <CtaComponent value={value as CtaValue} />,
    ctaBlock: ({ value }) => <CtaComponent value={value as CtaValue} />,
    table: ({ value }) => <TableComponent value={value as TableValue} />,
    tableBlock: ({ value }) => <TableComponent value={value as TableValue} />,
    faq: ({ value }) => <FaqComponent value={value as FaqValue} />,
    faqBlock: ({ value }) => <FaqComponent value={value as FaqValue} />,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-4 text-3xl sm:text-4xl font-black tracking-tight text-foreground font-heading uppercase">
        {children}
      </h1>
    ),
    h2: ({ children }) => {
      const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
      const id = slugifyText(text);
      return (
        <h2
          id={id}
          className="group mt-12 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading uppercase scroll-mt-28 flex items-center gap-2"
        >
          <span>{children}</span>
          <a
            href={`#${id}`}
            aria-label={`Link direto para ${text}`}
            className="opacity-0 group-hover:opacity-100 text-primary transition-opacity text-base font-mono"
          >
            #
          </a>
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
      const id = slugifyText(text);
      return (
        <h3
          id={id}
          className="group mt-8 mb-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading uppercase scroll-mt-28 flex items-center gap-2"
        >
          <span>{children}</span>
          <a
            href={`#${id}`}
            aria-label={`Link direto para ${text}`}
            className="opacity-0 group-hover:opacity-100 text-primary transition-opacity text-sm font-mono"
          >
            #
          </a>
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-bold text-foreground font-heading uppercase">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-primary py-2 pl-6 italic text-foreground rounded-none text-lg sm:text-xl font-light leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-6 list-disc space-y-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal space-y-2.5 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through opacity-70">{children}</span>,
    code: ({ children }) => (
      <code className="rounded-none bg-muted px-2 py-0.5 font-mono text-xs text-primary border border-zinc-200 dark:border-white/10">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isExternal = (value?.href || "").startsWith("http");
      const target = value?.blank !== false && isExternal ? "_blank" : undefined;
      const rel = [
        target === "_blank" ? "noopener noreferrer" : undefined,
        value?.nofollow ? "nofollow" : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

      return (
        <a
          href={value?.href || "#"}
          target={target}
          rel={rel}
          className="font-semibold text-primary underline decoration-primary/50 decoration-1 underline-offset-4 hover:decoration-primary transition-colors cursor-pointer"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const slug = value?.slug;
      if (!slug) return <span>{children}</span>;

      return (
        <Link
          href={`/artigos/${slug}`}
          className="font-semibold text-primary underline decoration-primary/50 decoration-1 underline-offset-4 hover:decoration-primary transition-colors cursor-pointer"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value?: SanityBody | null }) {
  if (!value) return null;
  return <PortableTextComponent value={value as unknown as import("next-sanity").PortableTextBlock[]} components={components} />;
}
