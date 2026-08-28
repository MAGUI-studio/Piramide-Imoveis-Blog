import Link from "next/link";
import { Icon } from "@iconify/react";

interface ArticleCtaButtonProps {
  href: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  scroll?: boolean;
  className?: string;
}

export function ArticleCtaButton({
  href,
  label = "Ler Artigo Completo",
  size = "md",
  scroll = true,
  className = "",
}: ArticleCtaButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-[11px] gap-1.5",
    md: "px-4 py-2 text-xs gap-2",
    lg: "px-7 py-3 text-xs gap-2",
  }[size];

  return (
    <Link
      href={href}
      scroll={scroll}
      className={`group/cta inline-flex items-center justify-center bg-primary hover:bg-zinc-900 dark:hover:bg-white text-white dark:hover:text-zinc-950 font-mono font-bold uppercase tracking-widest rounded-none border border-transparent transition-all duration-300 shrink-0 cursor-pointer shadow-xs ${sizeClasses} ${className}`}
    >
      <span>{label}</span>
      <Icon
        icon="ph:arrow-right-bold"
        className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-1 shrink-0"
      />
    </Link>
  );
}
