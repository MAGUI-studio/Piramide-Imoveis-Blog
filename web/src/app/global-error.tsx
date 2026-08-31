"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Layout Error]:", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="bg-[#141414] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Erro Crítico no Sistema
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Ocorreu uma falha inesperada no carregamento do Blog Pirâmide Imóveis.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-[#E30613] hover:bg-[#c00510] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Recarregar Aplicação
          </button>
        </div>
      </body>
    </html>
  );
}
