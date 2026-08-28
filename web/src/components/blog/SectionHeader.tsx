import Link from "next/link";
import { Icon } from "@iconify/react";

export interface SectionHeaderAction {
  label: string;
  href: string;
  icon?: string;
}

export interface SectionHeaderProps {
  eyebrow: string | React.ReactNode;
  eyebrowIcon: string;
  title: string;
  meta?: string | React.ReactNode;
  action?: SectionHeaderAction;
  children?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  meta,
  action,
  children,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${className}`}
    >
      <div className="space-y-1">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 block">
          <Icon icon={eyebrowIcon} className="size-3.5" />
          <span>{eyebrow}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground font-heading uppercase">
          {title}
        </h2>
      </div>

      {children ? (
        <div>{children}</div>
      ) : action ? (
        <Link
          href={action.href}
          className="font-mono text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1.5 shrink-0"
        >
          <span>{action.label}</span>
          <Icon icon={action.icon || "ph:arrow-right-bold"} className="size-3.5" />
        </Link>
      ) : meta ? (
        <span className="font-mono text-xs text-muted-foreground uppercase shrink-0">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
