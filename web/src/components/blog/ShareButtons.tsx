"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 mr-1">
        Compartilhar:
      </span>

      
      <button
        type="button"
        onClick={shareWhatsApp}
        className="p-1 text-zinc-400 hover:text-emerald-500 transition-colors cursor-pointer bg-transparent border-none"
        title="Compartilhar no WhatsApp"
        aria-label="Compartilhar no WhatsApp"
      >
        <Icon icon="ph:whatsapp-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareLinkedIn}
        className="p-1 text-zinc-400 hover:text-sky-500 transition-colors cursor-pointer bg-transparent border-none"
        title="Compartilhar no LinkedIn"
        aria-label="Compartilhar no LinkedIn"
      >
        <Icon icon="ph:linkedin-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareTwitter}
        className="p-1 text-zinc-400 hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
        title="Compartilhar no X"
        aria-label="Compartilhar no X"
      >
        <Icon icon="ph:x-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={shareFacebook}
        className="p-1 text-zinc-400 hover:text-blue-500 transition-colors cursor-pointer bg-transparent border-none"
        title="Compartilhar no Facebook"
        aria-label="Compartilhar no Facebook"
      >
        <Icon icon="ph:facebook-logo-bold" className="size-4" />
      </button>

      
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-2 py-1 bg-transparent border-none text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
        title="Copiar link do artigo"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 text-emerald-500 font-bold"
            >
              <Icon icon="ph:check-bold" className="size-3.5 text-emerald-500" />
              <span>Copiado!</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5"
            >
              <Icon icon="ph:link-bold" className="size-3.5" />
              <span>Copiar Link</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
