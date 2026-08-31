"use client";

import { useMemo, useRef } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthorCard } from "@/src/components/blog/AuthorCard";
import type { AuthorRef } from "@/src/types/sanity";

interface AuthorsExplorerProps {
  authors: AuthorRef[];
}

const SORT_OPTIONS = ["title-asc", "title-desc", "count-desc", "count-asc"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export function AuthorsExplorer({ authors = [] }: AuthorsExplorerProps) {
  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 250 }),
  );

  const [sortBy, setSortBy] = useQueryState(
    "orderby",
    parseAsStringLiteral(SORT_OPTIONS)
      .withDefault("count-desc")
      .withOptions({ shallow: false }),
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(12).withOptions({ shallow: false }),
  );

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const gridTopRef = useRef<HTMLDivElement | null>(null);

  
  const filteredAuthors = useMemo(() => {
    return authors.filter((author) => {
      if (searchTerm && searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = author.name?.toLowerCase().includes(q);
        const matchRole = author.role?.toLowerCase().includes(q);
        const matchCreci = author.creci?.toLowerCase().includes(q);
        if (!matchName && !matchRole && !matchCreci) return false;
      }
      return true;
    });
  }, [authors, searchTerm]);

  
  const sortedAuthors = useMemo(() => {
    const list = [...filteredAuthors];

    switch (sortBy) {
      case "title-asc":
        return list.sort((a, b) => (a.name || "").localeCompare(b.name || "", "pt-BR"));
      case "title-desc":
        return list.sort((a, b) => (b.name || "").localeCompare(a.name || "", "pt-BR"));
      case "count-asc":
        return list.sort((a, b) => (a.postCount || 0) - (b.postCount || 0));
      case "count-desc":
      default:
        return list.sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
    }
  }, [filteredAuthors, sortBy]);

  
  const currentLimit = pageSize || 12;
  const totalPages = Math.max(1, Math.ceil(sortedAuthors.length / currentLimit));
  const safeCurrentPage = Math.min(Math.max(1, currentPage || 1), totalPages);

  const paginatedAuthors = useMemo(() => {
    const start = (safeCurrentPage - 1) * currentLimit;
    return sortedAuthors.slice(start, start + currentLimit);
  }, [sortedAuthors, safeCurrentPage, currentLimit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val || null);
    setCurrentPage(1);
  };

  const handleSortChange = (val: SortOption) => {
    setSortBy(val === "count-desc" ? null : val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (val: number) => {
    setPageSize(val === 12 ? null : val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm(null);
    setSortBy(null);
    setPageSize(null);
    setCurrentPage(null);
  };

  const hasActiveFilters =
    (searchTerm && searchTerm.trim() !== "") ||
    (sortBy && sortBy !== "count-desc") ||
    (pageSize && pageSize !== 12);

  return (
    <div ref={gridTopRef} className="w-full space-y-8 scroll-mt-20">
      
      <div className="space-y-5">
        
        <div className="relative w-full">
          <Icon
            icon="ph:magnifying-glass-bold"
            className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={searchTerm || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Pesquisar por nome do autor, cargo ou CRECI..."
            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Icon icon="ph:x-bold" className="size-4" />
            </button>
          )}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Ordenar por
            </label>
            <div className="relative">
              <select
                value={sortBy || "count-desc"}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="count-desc">Mais artigos primeiro</option>
                <option value="count-asc">Menos artigos primeiro</option>
                <option value="title-asc">Nome (A - Z)</option>
                <option value="title-desc">Nome (Z - A)</option>
              </select>
              <Icon
                icon="ph:caret-down-bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Exibir por página
            </label>
            <div className="relative">
              <select
                value={pageSize || 12}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value={6}>6 autores</option>
                <option value={12}>12 autores</option>
                <option value={24}>24 autores</option>
              </select>
              <Icon
                icon="ph:caret-down-bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-mono">
          <div className="text-muted-foreground">
            Exibindo{" "}
            <strong className="text-foreground">
              {sortedAuthors.length > 0 ? (safeCurrentPage - 1) * currentLimit + 1 : 0} -{" "}
              {Math.min(safeCurrentPage * currentLimit, sortedAuthors.length)}
            </strong>{" "}
            de <strong className="text-foreground">{sortedAuthors.length}</strong> autores encontrados
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors uppercase font-bold text-[11px] cursor-pointer"
            >
              <Icon icon="ph:trash-bold" className="size-3.5" />
              <span>Limpar todos os filtros</span>
            </button>
          )}
        </div>
      </div>

      
      {paginatedAuthors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedAuthors.map((author, idx) => (
              <motion.div
                key={author._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.04, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full"
              >
                <AuthorCard author={author} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full py-16 px-6 text-center border border-dashed border-zinc-300 dark:border-white/15 space-y-4">
          <Icon
            icon="ph:user-circle-dashed-bold"
            className="size-12 text-zinc-400 mx-auto"
          />
          <h3 className="font-heading font-black text-xl uppercase text-foreground">
            Nenhum autor encontrado
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Não encontramos autores com os termos digitados. Tente buscar por outros nomes.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-6 py-2.5 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-sm hover:bg-primary/90 transition-colors"
          >
            <Icon icon="ph:arrow-counter-clockwise-bold" className="size-4" />
            <span>Resetar Filtros</span>
          </button>
        </div>
      )}

      
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary transition-colors cursor-pointer"
          >
            <Icon icon="ph:caret-left-bold" className="size-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - safeCurrentPage) <= 1
              ) {
                const isActive = pageNum === safeCurrentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`size-9 flex items-center justify-center font-mono text-xs font-bold border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-white/10 hover:border-primary text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }

              if (
                pageNum === safeCurrentPage - 2 ||
                pageNum === safeCurrentPage + 2
              ) {
                return (
                  <span
                    key={pageNum}
                    className="px-1 text-muted-foreground font-mono text-xs"
                  >
                    ...
                  </span>
                );
              }

              return null;
            })}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary transition-colors cursor-pointer"
          >
            <span>Próxima</span>
            <Icon icon="ph:caret-right-bold" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
