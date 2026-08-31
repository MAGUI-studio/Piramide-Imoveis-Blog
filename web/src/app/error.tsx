"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[App Error Boundary Caught]:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[65vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Icon icon="ph:warning-octagon-bold" className="size-4" />
            <span>Instabilidade Temporária</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase font-heading text-foreground tracking-tight">
            Algo inesperado aconteceu
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
            Não foi possível carregar as informações solicitadas no momento. Nossa equipe técnica já foi alertada.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Icon icon="ph:arrow-counter-clockwise-bold" className="size-3.5" />
            <span>Tentar Novamente</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 bg-card border border-zinc-300 dark:border-zinc-700 text-foreground hover:border-primary hover:text-primary font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <Icon icon="ph:house-bold" className="size-3.5" />
            <span>Voltar ao Início</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
