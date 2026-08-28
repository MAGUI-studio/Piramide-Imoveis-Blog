"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/posts/${slug}`;
    }
    return `https://blog.piramideimoveissjc.com.br/posts/${slug}`;
  };

  const handleCopyLink = () => {
    const url = getFullUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const shareWhatsApp = () => {
    const url = getFullUrl();
    const text = encodeURIComponent(`Confira este artigo no Blog Pirâmide Imóveis: "${title}" - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getFullUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(`"${title}" via @piramideimoveis`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(getFullUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mr-1">
        Compartilhar:
      </span>

      
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex size-8 items-center justify-center rounded-none border border-zinc-200 dark:border-zinc-800 bg-card text-emerald-600 hover:bg-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white transition-all cursor-pointer shadow-xs"
        title="Compartilhar no WhatsApp"
        aria-label="Compartilhar no WhatsApp"
      >
        <Icon icon="ph:whatsapp-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareLinkedIn}
        className="inline-flex size-8 items-center justify-center rounded-none border border-zinc-200 dark:border-zinc-800 bg-card text-sky-600 hover:bg-sky-600 hover:text-white dark:text-sky-400 dark:hover:bg-sky-600 dark:hover:text-white transition-all cursor-pointer shadow-xs"
        title="Compartilhar no LinkedIn"
        aria-label="Compartilhar no LinkedIn"
      >
        <Icon icon="ph:linkedin-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareTwitter}
        className="inline-flex size-8 items-center justify-center rounded-none border border-zinc-200 dark:border-zinc-800 bg-card text-zinc-700 hover:bg-zinc-900 hover:text-white dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-all cursor-pointer shadow-xs"
        title="Compartilhar no X"
        aria-label="Compartilhar no X"
      >
        <Icon icon="ph:x-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareFacebook}
        className="inline-flex size-8 items-center justify-center rounded-none border border-zinc-200 dark:border-zinc-800 bg-card text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-all cursor-pointer shadow-xs"
        title="Compartilhar no Facebook"
        aria-label="Compartilhar no Facebook"
      >
        <Icon icon="ph:facebook-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-mono font-medium border transition-all cursor-pointer shadow-xs ${
          copied
            ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-zinc-200 dark:border-zinc-800 bg-card text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
        }`}
        title="Copiar link do artigo"
      >
        <Icon
          icon={copied ? "ph:check-bold" : "ph:link-bold"}
          className={`size-3.5 ${copied ? "text-emerald-600 dark:text-emerald-400" : ""}`}
        />
        <span>{copied ? "COPIADO" : "COPIAR LINK"}</span>
      </button>
    </div>
  );
}
