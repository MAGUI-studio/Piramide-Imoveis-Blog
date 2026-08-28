import Link from "next/link";
import { Icon } from "@iconify/react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function Breadcrumbs({
  items,
  backHref = "/",
  backLabel = "Voltar ao Blog",
  className = "",
}: BreadcrumbsProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-4 ${className}`}
    >
      <nav
        aria-label="Breadcrumbs"
        className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-wider overflow-x-auto"
      >
        <Link
          href="/"
          className="hover:text-primary transition-colors flex items-center gap-1 shrink-0"
        >
          <Icon icon="ph:house-fill" className="size-3.5 text-primary" />
          <span>Início</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span>/</span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors shrink-0"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "truncate max-w-[200px] sm:max-w-md text-foreground font-semibold"
                      : "shrink-0"
                  }
                >
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity shrink-0"
        >
          <Icon icon="ph:arrow-left-bold" className="size-3.5" />
          <span>{backLabel}</span>
        </Link>
      )}
    </div>
  );
}
