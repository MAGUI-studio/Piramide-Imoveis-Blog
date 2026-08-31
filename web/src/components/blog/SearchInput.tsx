"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface SearchInputProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  initialQuery = "",
  placeholder = "Buscar por temas, bairros, condomínios ou palavras-chave...",
  className = "",
}: SearchInputProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault(initialQuery).withOptions({ shallow: false, throttleMs: 200 })
  );
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = (query || "").trim();
    if (!clean) {
      router.push("/busca");
      return;
    }
    router.push(`/busca?q=${encodeURIComponent(clean)}`);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`group relative flex items-stretch w-full bg-card dark:bg-zinc-900 border border-zinc-300 dark:border-white/15 focus-within:border-primary dark:focus-within:border-primary transition-all duration-300 shadow-xs ${className}`}
    >
      <div className="flex items-center pl-4 sm:pl-5 text-muted-foreground group-focus-within:text-primary transition-colors">
        <Icon icon="ph:magnifying-glass-bold" className="size-5 sm:size-6" />
      </div>

      <input
        type="text"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-14 sm:h-16 px-3 sm:px-4 bg-transparent border-none text-sm sm:text-base text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-light focus:outline-none focus:ring-0"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Limpar campo de pesquisa"
        >
          <Icon icon="ph:x-circle-fill" className="size-5 opacity-60 hover:opacity-100" />
        </button>
      )}

      <button
        type="submit"
        className="px-6 sm:px-10 bg-primary hover:bg-primary/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
      >
        <span>Buscar</span>
        <Icon icon="ph:arrow-right-bold" className="size-4 hidden sm:block" />
      </button>
    </form>
  );
}
