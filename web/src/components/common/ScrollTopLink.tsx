"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type ScrollTopLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  children: ReactNode;
  targetId?: string;
};

export function ScrollTopLink({
  children,
  onClick,
  targetId = "inicio",
  ...props
}: ScrollTopLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    const target = document.getElementById(targetId);
    const nextUrl = `${window.location.pathname}${window.location.search}`;

    window.history.replaceState(null, "", nextUrl);

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
