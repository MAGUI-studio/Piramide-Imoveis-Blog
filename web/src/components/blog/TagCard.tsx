import Link from "next/link";
import { Icon } from "@iconify/react";

export interface TagItemRef {
  name: string;
  slug: string;
  postCount: number;
}

interface TagCardProps {
  tag: TagItemRef;
  className?: string;
}

export function TagCard({ tag, className = "" }: TagCardProps) {
  if (!tag.slug) return null;

  return (
    <Link
      href={`/tag/${tag.slug}`}
      className={`group relative w-full overflow-hidden rounded-none border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 hover:border-primary dark:hover:border-primary flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 shadow-xs hover:shadow-md ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon icon="ph:hash-bold" className="size-5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-zinc-200/70 dark:bg-white/10 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground shadow-xs border border-zinc-300/60 dark:border-white/10 group-hover:border-primary/40 transition-colors">
            {tag.postCount} {tag.postCount === 1 ? "Artigo" : "Artigos"}
          </span>

          <div className="size-8 rounded-none flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
            <Icon icon="ph:arrow-up-right-bold" className="size-4" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-1.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
          Tópico
        </span>
        <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-1">
          #{tag.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light line-clamp-2">
          Ver todas as publicações e análises sobre #{tag.name}
        </p>
      </div>
    </Link>
  );
}
