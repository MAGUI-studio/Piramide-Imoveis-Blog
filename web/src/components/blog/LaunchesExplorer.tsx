"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export interface LaunchItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  tag: string;
}

interface LaunchesExplorerProps {
  launches: LaunchItem[];
}

const SORT_OPTIONS = ["featured", "title-asc", "title-desc"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export function LaunchesExplorer({ launches = [] }: LaunchesExplorerProps) {
  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 250 }),
  );

  const [selectedTag, setSelectedTag] = useQueryState(
    "tag",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  const [sortBy, setSortBy] = useQueryState(
    "orderby",
    parseAsStringLiteral(SORT_OPTIONS)
      .withDefault("featured")
      .withOptions({ shallow: false }),
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(6).withOptions({ shallow: false }),
  );

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const gridTopRef = useRef<HTMLDivElement | null>(null);

  
  const allTags = useMemo(() => {
    const tags = Array.from(new Set(launches.map((l) => l.tag).filter(Boolean)));
    return tags.sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [launches]);

  
  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      
      if (searchTerm && searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchTitle = launch.title?.toLowerCase().includes(q);
        const matchDesc = launch.description?.toLowerCase().includes(q);
        const matchTag = launch.tag?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTag) return false;
      }

      
      if (selectedTag && selectedTag.trim()) {
        if (launch.tag.toLowerCase() !== selectedTag.toLowerCase()) return false;
      }

      return true;
    });
  }, [launches, searchTerm, selectedTag]);

  
  const sortedLaunches = useMemo(() => {
    const list = [...filteredLaunches];

    switch (sortBy) {
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
      case "title-desc":
        return list.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
      case "featured":
      default:
        return list;
    }
  }, [filteredLaunches, sortBy]);

  
  const currentLimit = pageSize || 6;
  const totalPages = Math.max(1, Math.ceil(sortedLaunches.length / currentLimit));
  const safeCurrentPage = Math.min(Math.max(1, currentPage || 1), totalPages);

  const paginatedLaunches = useMemo(() => {
    const start = (safeCurrentPage - 1) * currentLimit;
    return sortedLaunches.slice(start, start + currentLimit);
  }, [sortedLaunches, safeCurrentPage, currentLimit]);

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

  const handleTagChange = (val: string) => {
    setSelectedTag(val || null);
    setCurrentPage(1);
  };

  const handleSortChange = (val: SortOption) => {
    setSortBy(val === "featured" ? null : val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (val: number) => {
    setPageSize(val === 6 ? null : val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm(null);
    setSelectedTag(null);
    setSortBy(null);
    setPageSize(null);
    setCurrentPage(null);
  };

  const hasActiveFilters =
    (searchTerm && searchTerm.trim() !== "") ||
    (selectedTag && selectedTag.trim() !== "") ||
    (sortBy && sortBy !== "featured") ||
    (pageSize && pageSize !== 6);

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
            placeholder="Pesquisar lançamentos por nome, bairro, condomínio ou conceito..."
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

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Segmento / Tag
            </label>
            <div className="relative">
              <select
                value={selectedTag || ""}
                onChange={(e) => handleTagChange(e.target.value)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">Todos os Segmentos</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <Icon
                icon="ph:caret-down-bold"
                className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Ordenar por
            </label>
            <div className="relative">
              <select
                value={sortBy || "featured"}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="featured">Destaques Recomendados</option>
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
                value={pageSize || 6}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value={6}>6 empreendimentos</option>
                <option value={12}>12 empreendimentos</option>
                <option value={24}>24 empreendimentos</option>
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
              {sortedLaunches.length > 0 ? (safeCurrentPage - 1) * currentLimit + 1 : 0} -{" "}
              {Math.min(safeCurrentPage * currentLimit, sortedLaunches.length)}
            </strong>{" "}
            de <strong className="text-foreground">{sortedLaunches.length}</strong> lançamentos encontrados
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

      
      {paginatedLaunches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {paginatedLaunches.map((launch, idx) => (
              <motion.article
                key={launch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.04, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col bg-transparent space-y-4 transition-all duration-300 overflow-hidden h-full"
              >
                
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                  <a
                    href={launch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block size-full relative"
                    aria-label={launch.title}
                  >
                    <Image
                      src={launch.image}
                      alt={launch.title}
                      fill
                      priority={idx < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap z-10 pointer-events-none">
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs inline-flex items-center gap-1.5 border border-white/10">
                      <Icon icon="ph:buildings-bold" className="size-3 text-white" />
                      <span>{launch.tag}</span>
                    </span>
                  </div>
                </div>

                
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <a
                      href={launch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group/title"
                    >
                      <h3 className="font-heading font-black text-lg sm:text-xl uppercase text-zinc-900 dark:text-white group-hover/title:text-primary transition-colors leading-tight line-clamp-2">
                        {launch.title}
                      </h3>
                    </a>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light line-clamp-3 leading-relaxed">
                      {launch.description}
                    </p>
                  </div>

                  <div className="pt-1">
                    <a
                      href={launch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Conhecer Empreendimento</span>
                      <Icon icon="ph:arrow-right-bold" className="size-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full py-16 px-6 text-center border border-dashed border-zinc-300 dark:border-white/15 space-y-4">
          <Icon
            icon="ph:buildings-slash-bold"
            className="size-12 text-zinc-400 mx-auto"
          />
          <h3 className="font-heading font-black text-xl uppercase text-foreground">
            Nenhum lançamento encontrado
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Não encontramos empreendimentos correspondentes aos filtros aplicados.
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
