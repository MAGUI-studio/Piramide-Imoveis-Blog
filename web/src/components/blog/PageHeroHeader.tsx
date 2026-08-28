import { Icon } from "@iconify/react";

export interface PageHeroHeaderProps {
  badge: string;
  badgeIcon?: string;
  title: string;
  description?: string;
  meta?: string | React.ReactNode;
  className?: string;
}

export function PageHeroHeader({
  badge,
  badgeIcon,
  title,
  description,
  meta,
  className = "",
}: PageHeroHeaderProps) {
  return (
    <section className={`w-full space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="px-4 py-1.5 rounded-tr-3xl rounded-bl-3xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-xs">
          {badgeIcon && <Icon icon={badgeIcon} className="size-3.5 text-white" />}
          <span>{badge}</span>
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-heading text-foreground tracking-tight leading-none">
        {title}
      </h1>

      {description && (
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          {description}
        </p>
      )}

      {meta && (
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>{meta}</span>
        </div>
      )}
    </section>
  );
}
