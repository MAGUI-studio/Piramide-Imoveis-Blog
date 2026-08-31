"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoModalPlayer } from "@/src/components/blog/VideoModalPlayer";
import { urlForImage } from "@/sanity/lib/image";
import type { ReelItem } from "@/src/types/sanity";

interface VideosExplorerProps {
  reels: ReelItem[];
}

const SORT_OPTIONS = ["newest", "oldest", "title-asc", "title-desc"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export function VideosExplorer({ reels = [] }: VideosExplorerProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  
  const [searchTerm, setSearchTerm] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 250 }),
  );

  const [sortBy, setSortBy] = useQueryState(
    "orderby",
    parseAsStringLiteral(SORT_OPTIONS)
      .withDefault("newest")
      .withOptions({ shallow: false }),
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(8).withOptions({ shallow: false }),
  );

  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const gridTopRef = useRef<HTMLDivElement | null>(null);

  
  const filteredReels = useMemo(() => {
    return reels.filter((reel) => {
      if (searchTerm && searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchTitle = reel.title?.toLowerCase().includes(q);
        const matchProp = reel.propertyTitle?.toLowerCase().includes(q);
        const matchDesc = reel.description?.toLowerCase().includes(q);

        if (!matchTitle && !matchProp && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [reels, searchTerm]);

  
  const sortedReels = useMemo(() => {
    const list = [...filteredReels];

    switch (sortBy) {
      case "oldest":
        return list.sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateA - dateB;
        });
      case "title-asc":
        return list.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "", "pt-BR"),
        );
      case "title-desc":
        return list.sort((a, b) =>
          (b.title || "").localeCompare(a.title || "", "pt-BR"),
        );
      case "newest":
      default:
        return list.sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
    }
  }, [filteredReels, sortBy]);

  
  const currentLimit = pageSize || 8;
  const totalPages = Math.max(1, Math.ceil(sortedReels.length / currentLimit));
  const safeCurrentPage = Math.min(Math.max(1, currentPage || 1), totalPages);

  const paginatedReels = useMemo(() => {
    const start = (safeCurrentPage - 1) * currentLimit;
    return sortedReels.slice(start, start + currentLimit);
  }, [sortedReels, safeCurrentPage, currentLimit]);

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
    setSortBy(val === "newest" ? null : val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (val: number) => {
    setPageSize(val === 8 ? null : val);
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
    (sortBy && sortBy !== "newest") ||
    (pageSize && pageSize !== 8);

  const handleCardClick = (reelId: string) => {
    const idx = sortedReels.findIndex((r) => r._id === reelId);
    if (idx !== -1) {
      setSelectedIdx(idx);
    }
  };

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
            placeholder="Pesquisar por título do vídeo, nome do imóvel, detalhes..."
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
                value={sortBy || "newest"}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="newest">Mais recentes primeiro</option>
                <option value="oldest">Mais antigos primeiro</option>
                <option value="title-asc">Título (A - Z)</option>
                <option value="title-desc">Título (Z - A)</option>
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
                value={pageSize || 8}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-white/15 text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value={8}>8 vídeos</option>
                <option value={16}>16 vídeos</option>
                <option value={24}>24 vídeos</option>
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
              {sortedReels.length > 0 ? (safeCurrentPage - 1) * currentLimit + 1 : 0} -{" "}
              {Math.min(safeCurrentPage * currentLimit, sortedReels.length)}
            </strong>{" "}
            de <strong className="text-foreground">{sortedReels.length}</strong> vídeos encontrados
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

      
      {paginatedReels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedReels.map((reel, idx) => {
              const thumbUrl = reel.thumbnail
                ? urlForImage(reel.thumbnail)?.width(600).height(1066).fit("crop").url()
                : null;

              return (
                <motion.div
                  key={reel._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.04, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleCardClick(reel._id)}
                  className="group/card relative w-full aspect-[9/16] overflow-hidden bg-zinc-900 cursor-pointer shadow-none"
                >
                  
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={reel.title}
                      fill
                      priority={idx < 4}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center select-none pointer-events-none transition-transform duration-700 group-hover/card:scale-105"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                      <Icon icon="ph:video-camera-fill" className="size-12" />
                    </div>
                  )}

                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="size-12 sm:size-14 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-xl transition-all duration-300 group-hover/card:scale-115 group-hover/card:bg-black/60 group-hover/card:border-white/40">
                      <Icon icon="ph:play-fill" className="size-5 sm:size-6 ml-0.5 text-white" />
                    </div>
                  </div>

                  
                  <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 z-10 pointer-events-none">
                    {reel.propertyTitle && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-xs border-none rounded-none max-w-full">
                        <Icon icon="ph:buildings-fill" className="size-3 text-white shrink-0" />
                        <span className="truncate">{reel.propertyTitle}</span>
                      </div>
                    )}
                    <h4 className="font-heading font-black text-sm sm:text-base uppercase text-white leading-tight line-clamp-2">
                      {reel.title}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-full py-16 px-6 text-center border border-dashed border-zinc-300 dark:border-white/15 space-y-4">
          <Icon
            icon="ph:video-camera-slash-bold"
            className="size-12 text-zinc-400 mx-auto"
          />
          <h3 className="font-heading font-black text-xl uppercase text-foreground">
            Nenhum vídeo encontrado
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Não encontramos vídeos que correspondam aos filtros selecionados.
            Tente ajustar os termos de busca ou limpar os filtros.
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

      
      <VideoModalPlayer
        reels={sortedReels}
        selectedIdx={selectedIdx}
        onClose={() => setSelectedIdx(null)}
        onSelectIdx={setSelectedIdx}
      />
    </div>
  );
}
