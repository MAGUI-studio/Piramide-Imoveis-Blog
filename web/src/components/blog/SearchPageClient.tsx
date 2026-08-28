"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { PageHeroHeader } from "@/src/components/blog/PageHeroHeader";
import { CategoryShowcase } from "@/src/components/blog/CategoryShowcase";
import { PostsList } from "@/src/components/blog/PostsList";
import type { PostItem, CategoryRef } from "@/src/types/sanity";

interface SearchPageClientProps {
  initialQuery?: string;
  allPosts: PostItem[];
  categoryList: CategoryRef[];
}

type FilterType = "all" | "categories" | "cities" | "authors";

export function SearchPageClient({
  initialQuery = "",
  allPosts,
  categoryList,
}: SearchPageClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleQueryChange = (val: string) => {
    setQuery(val);
    startTransition(() => {
      const trimmed = val.trim();
      if (trimmed) {
        window.history.replaceState(null, "", `/busca?q=${encodeURIComponent(trimmed)}`);
      } else {
        window.history.replaceState(null, "", "/busca");
      }
    });
  };

  const handleClear = () => {
    setQuery("");
    router.replace("/busca");
  };

  const searchTerm = query.toLowerCase().trim();

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return [];

    return allPosts.filter((p) => {
      const matchTitle = p.title?.toLowerCase().includes(searchTerm);
      const matchExcerpt = p.excerpt?.toLowerCase().includes(searchTerm);
      const matchTag = p.tags?.some((t) => t.toLowerCase().includes(searchTerm));
      const matchCity = p.city?.name?.toLowerCase().includes(searchTerm);
      const matchAuthor = p.author?.name?.toLowerCase().includes(searchTerm);
      const matchCategory = p.categories?.some((c) =>
        c.title?.toLowerCase().includes(searchTerm),
      );

      if (activeFilter === "categories") return matchCategory;
      if (activeFilter === "cities") return matchCity;
      if (activeFilter === "authors") return matchAuthor;

      return matchTitle || matchExcerpt || matchTag || matchCity || matchAuthor || matchCategory;
    });
  }, [allPosts, searchTerm, activeFilter]);

  const filterTabs: Array<{ id: FilterType; label: string; icon: string }> = [
    { id: "all", label: "Todos os Resultados", icon: "ph:squares-four-bold" },
    { id: "categories", label: "Por Categoria", icon: "ph:tag-bold" },
    { id: "cities", label: "Por Cidade", icon: "ph:map-pin-bold" },
    { id: "authors", label: "Por Autor", icon: "ph:user-bold" },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      <PageHeroHeader
        badge={searchTerm ? "Resultado da Busca" : "Pesquisa no Acervo"}
        badgeIcon="ph:magnifying-glass-bold"
        title={
          searchTerm
            ? `Resultados para "${query.trim()}"`
            : "Buscar Artigos & Análises"
        }
        description={
          searchTerm
            ? filteredPosts.length > 0
              ? "Confira os artigos, matérias e análises correspondentes à sua pesquisa."
              : "Não encontramos nenhum artigo correspondente à sua pesquisa."
            : "Digite palavras-chave, temas, bairros ou autores para encontrar inteligência de mercado imobiliário."
        }
        meta={
          searchTerm
            ? `${filteredPosts.length} ${filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}`
            : "Utilize o campo de busca abaixo para pesquisar"
        }
      />

      <div className="space-y-4 pt-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="group relative flex items-stretch w-full bg-card dark:bg-zinc-900 border border-zinc-300 dark:border-white/15 focus-within:border-primary dark:focus-within:border-primary transition-all duration-300 shadow-xs"
        >
          <div className="flex items-center pl-4 sm:pl-5 text-muted-foreground group-focus-within:text-primary transition-colors">
            <Icon icon="ph:magnifying-glass-bold" className="size-5 sm:size-6" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Buscar por temas, bairros, condomínios ou palavras-chave..."
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

          <div className="px-6 sm:px-10 bg-primary text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0">
            <span>Buscar</span>
            <Icon icon="ph:arrow-right-bold" className="size-4 hidden sm:block" />
          </div>
        </form>

        {searchTerm && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
                      : "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground hover:text-foreground border border-zinc-200 dark:border-white/10"
                  }`}
                >
                  <Icon icon={tab.icon} className="size-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!searchTerm ? (
        <div className="border border-zinc-200 dark:border-zinc-800 bg-transparent p-12 text-center rounded-none my-6 space-y-2">
          <h3 className="text-xl font-bold font-heading uppercase text-foreground">
            Pronto para pesquisar?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
            Digite um termo, tema, bairro, cidade ou autor no campo de busca acima para explorar nosso acervo.
          </p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="space-y-8 my-6">
          <div className="border border-zinc-200 dark:border-zinc-800 bg-transparent p-12 text-center rounded-none space-y-2">
            <h3 className="text-xl font-bold font-heading uppercase text-foreground">
              Nenhum artigo encontrado para &ldquo;{query.trim()}&rdquo;
            </h3>
            <p className="mt-2 text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              Tente buscar por outras palavras-chave ou explore as categorias abaixo.
            </p>
          </div>

          {categoryList.length > 0 && (
            <div className="pt-4">
              <CategoryShowcase categories={categoryList} />
            </div>
          )}
        </div>
      ) : (
        <PostsList posts={filteredPosts} hideHeader />
      )}
    </div>
  );
}
