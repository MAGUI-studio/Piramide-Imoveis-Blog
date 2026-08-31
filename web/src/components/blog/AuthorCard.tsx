import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { urlForImage } from "@/sanity/lib/image";
import type { AuthorRef } from "@/src/types/sanity";

interface AuthorCardProps {
  author: AuthorRef;
  className?: string;
}

export function AuthorCard({ author, className = "" }: AuthorCardProps) {
  if (!author.slug?.current) return null;

  const imageUrl = author.image
    ? urlForImage(author.image)?.width(700).height(500).url()
    : null;

  return (
    <Link
      href={`/autor/${author.slug.current}`}
      className={`group relative w-full aspect-[4/3] overflow-hidden rounded-none border border-zinc-200 dark:border-white/10 bg-card flex flex-col justify-end p-6 transition-all duration-300 ${className}`}
    >
      
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={author.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
          <Icon icon="ph:user-fill" className="size-20 opacity-20 text-white" />
        </div>
      )}

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      
      <div className="absolute top-5 right-5 z-10 pointer-events-none overflow-hidden">
        <Icon
          icon="ph:arrow-up-right-bold"
          className="size-5 text-white drop-shadow-md opacity-0 -translate-x-2.5 translate-y-2.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out"
        />
      </div>

      
      <div className="relative z-10 space-y-2 text-white pointer-events-none w-full">
        <div>
          <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-block transition-all border border-white/10">
            {author.postCount || 0} {author.postCount === 1 ? "Artigo" : "Artigos"}
          </span>
        </div>

        <h3 className="text-xl font-bold font-heading uppercase text-white leading-tight">
          {author.name}
        </h3>

        {author.role && (
          <p className="text-xs text-white/75 font-light line-clamp-2 leading-relaxed">
            {author.role} {author.creci ? `• CRECI: ${author.creci}` : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
