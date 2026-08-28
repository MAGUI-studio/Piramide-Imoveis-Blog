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

function CalloutComponent({ value }: { value: CalloutValue }) {
  const type = value?.type || "tip";

  const config = {
    tip: {
      border: "border-l-4 border-l-amber-500 border-zinc-200 dark:border-zinc-800 bg-amber-500/5 text-amber-950 dark:text-amber-200",
      icon: "ph:lightbulb-filament-fill",
      iconColor: "text-amber-500",
      defaultTitle: "Dica de Especialista",
    },
    info: {
      border: "border-l-4 border-l-sky-500 border-zinc-200 dark:border-zinc-800 bg-sky-500/5 text-sky-950 dark:text-sky-200",
      icon: "ph:info-fill",
      iconColor: "text-sky-500",
      defaultTitle: "Informação Importante",
    },
    warning: {
      border: "border-l-4 border-l-rose-500 border-zinc-200 dark:border-zinc-800 bg-rose-500/5 text-rose-950 dark:text-rose-200",
      icon: "ph:warning-circle-fill",
      iconColor: "text-rose-500",
      defaultTitle: "Atenção & Cuidados",
    },
    quote: {
      border: "border-l-4 border-l-purple-500 border-zinc-200 dark:border-zinc-800 bg-purple-500/5 text-purple-950 dark:text-purple-200",
      icon: "ph:quotes-fill",
      iconColor: "text-purple-500",
      defaultTitle: "Citação",
    },
  }[type as "tip" | "info" | "warning" | "quote"] || {
    border: "border-l-4 border-l-amber-500 border-zinc-200 dark:border-zinc-800 bg-amber-500/5 text-amber-950 dark:text-amber-200",
    icon: "ph:lightbulb-filament-fill",
    iconColor: "text-amber-500",
    defaultTitle: "Dica",
  };

  return (
    <div className={`my-8 border p-5 sm:p-6 rounded-none ${config.border}`}>
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

interface CtaValue {
  isWhatsApp?: boolean;
  buttonUrl?: string;
  buttonText?: string;
  title?: string;
  description?: string;
}

function CtaComponent({ value }: { value: CtaValue }) {
  const isWhatsApp = value?.isWhatsApp !== false;
  const defaultWhatsAppMsg = encodeURIComponent("Olá! Vi um artigo no Blog da Pirâmide Imóveis e gostaria de mais informações.");
  const href = isWhatsApp
    ? (value.buttonUrl?.startsWith("http") ? value.buttonUrl : `https://wa.me/5512991599801?text=${defaultWhatsAppMsg}`)
    : (value.buttonUrl || "https://www.piramideimoveissjc.com.br/");

  return (
    <div className="my-12 border border-zinc-800 bg-[#161616] text-white p-6 sm:p-10 rounded-none shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-none blur-3xl pointer-events-none" />
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-primary">
            <Icon icon="ph:sparkle-fill" className="size-3.5" />
            Oportunidade Exclusiva
          </span>
          <h4 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight uppercase text-white">
            {value.title}
          </h4>
          {value.description && (
            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              {value.description}
            </p>
          )}
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] rounded-none shrink-0 w-full sm:w-auto cursor-pointer"
        >
          {isWhatsApp && <Icon icon="ph:whatsapp-logo-bold" className="size-4" />}
          <span>{value.buttonText || "Falar com Consultor"}</span>
        </a>
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

function TableComponent({ value }: { value: TableValue }) {
  const headers = value?.headers || [];
  const rows = value?.rows || [];

  if (headers.length === 0) return null;

  return (
    <div className="my-8 overflow-hidden rounded-none border border-zinc-200 dark:border-zinc-800 bg-card">
      {value.title && (
        <div className="bg-zinc-100 dark:bg-zinc-900 px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs uppercase tracking-wider text-foreground">
          {value.title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900/60 text-xs uppercase tracking-wider text-muted-foreground font-mono">
            <tr>
              {headers.map((h: string, idx: number) => (
                <th key={idx} className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
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

function FaqComponent({ value }: { value: FaqValue }) {
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
              className="rounded-none border border-zinc-200 dark:border-zinc-800 bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <span className="font-heading text-base sm:text-lg tracking-tight">{item.question}</span>
                <Icon
                  icon={isOpen ? "ph:minus-bold" : "ph:plus-bold"}
                  className="size-4 shrink-0 text-primary transition-transform"
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm sm:text-base leading-relaxed text-muted-foreground border-t border-zinc-100 dark:border-zinc-800/80 pt-4 font-light">
                  {item.answer}
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

function YoutubeComponent({ value }: { value: YoutubeValue }) {
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
    <figure className="my-10 overflow-hidden rounded-none border border-zinc-200 dark:border-zinc-800 bg-black shadow-lg">
      <div className="relative aspect-video w-full">
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
        <figcaption className="bg-card px-4 py-3 text-center text-xs text-muted-foreground font-mono border-t border-zinc-200 dark:border-zinc-800">
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

function GalleryComponent({ value }: { value: GalleryValue }) {
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
              className="group overflow-hidden rounded-none bg-muted border border-zinc-200 dark:border-zinc-800"
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
                <figcaption className="p-2.5 text-center text-xs text-muted-foreground font-mono bg-card border-t border-zinc-200 dark:border-zinc-800">
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

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlForImage(value)?.width(1400).height(800).url();
      if (!imageUrl) return null;

      return (
        <figure className="my-10 overflow-hidden rounded-none bg-muted border border-zinc-200 dark:border-zinc-800 w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem do artigo"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="px-4 py-3 text-center text-xs text-muted-foreground font-mono bg-card border-t border-zinc-200 dark:border-zinc-800">
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
        <figure className="my-10 overflow-hidden rounded-none bg-muted border border-zinc-200 dark:border-zinc-800 w-full">
          <div className="relative aspect-video w-full">
            <Image
              src={imageUrl}
              alt={value.alt || "Imagem do artigo"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
          {value.caption && (
            <figcaption className="px-4 py-3 text-center text-xs text-muted-foreground font-mono bg-card border-t border-zinc-200 dark:border-zinc-800">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    galleryBlock: ({ value }) => <GalleryComponent value={value as GalleryValue} />,
    youtubeBlock: ({ value }) => <YoutubeComponent value={value as YoutubeValue} />,
    calloutBlock: ({ value }) => <CalloutComponent value={value as CalloutValue} />,
    ctaBlock: ({ value }) => <CtaComponent value={value as CtaValue} />,
    tableBlock: ({ value }) => <TableComponent value={value as TableValue} />,
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
      <blockquote className="my-10 border-l-4 border-primary bg-zinc-100/60 dark:bg-zinc-900/60 py-5 pl-6 pr-6 italic text-foreground rounded-none text-lg sm:text-xl font-light leading-relaxed">
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
      <code className="rounded-none bg-muted px-2 py-0.5 font-mono text-xs text-primary border border-zinc-200 dark:border-zinc-800">
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
          className="font-medium text-primary underline decoration-primary/40 decoration-2 underline-offset-4 hover:decoration-primary transition-colors"
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
          href={`/posts/${slug}`}
          className="font-semibold text-primary underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value: SanityBody }) {
  if (!value) return null;
  return <PortableTextComponent value={value as unknown as import("next-sanity").PortableTextBlock[]} components={components} />;
}
