import React from "react";

interface HighlightTextProps {
  text?: string | null;
  query?: string | null;
  className?: string;
  markClassName?: string;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightText({
  text,
  query,
  className = "",
  markClassName = "bg-primary/20 text-primary dark:bg-primary/35 dark:text-white font-semibold px-0.5 rounded-xs",
}: HighlightTextProps) {
  if (!text) return null;
  const cleanQuery = (query || "").trim();
  if (!cleanQuery || cleanQuery.length < 2) {
    return <span className={className}>{text}</span>;
  }

  const terms = cleanQuery
    .split(/\s+/)
    .filter((term) => term.length >= 2)
    .map(escapeRegExp);

  if (terms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isMatch = terms.some((t) => new RegExp(`^${t}$`, "i").test(part));
        if (isMatch) {
          return (
            <mark key={i} className={markClassName}>
              {part}
            </mark>
          );
        }
        return part;
      })}
    </span>
  );
}
