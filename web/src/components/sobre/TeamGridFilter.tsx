"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { TeamMemberCard, type TeamMember } from "./TeamMemberCard";

interface TeamGridFilterProps {
  members: TeamMember[];
}

function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function TeamGridFilter({ members }: TeamGridFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const query = normalizeText(searchQuery);
    if (!query) return members;

    return members.filter((member) => {
      const normName = normalizeText(member.name);
      const normCreci = member.creci ? normalizeText(member.creci) : "";
      const normRole = normalizeText(member.role);
      const normEmail = member.email ? normalizeText(member.email) : "";

      return (
        normName.includes(query) ||
        normCreci.includes(query) ||
        normRole.includes(query) ||
        normEmail.includes(query)
      );
    });
  }, [members, searchQuery]);

  return (
    <div className="w-full space-y-8">
      
      <div className="w-full flex flex-col items-start justify-center space-y-3">
        <div className="relative w-full flex items-center">
          <Icon
            icon="ph:magnifying-glass-bold"
            className="absolute left-4 size-5 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou CRECI..."
            className="w-full pl-12 pr-12 py-3.5 bg-zinc-100 dark:bg-zinc-900/90 text-foreground placeholder:text-zinc-400 text-sm font-sans border border-zinc-300 dark:border-white/15 focus:outline-hidden focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 p-1 text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
              title="Limpar busca"
            >
              <Icon icon="ph:x-bold" className="size-4" />
            </button>
          )}
        </div>

        
        {searchQuery && (
          <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <span>
              Exibindo{" "}
              <strong className="text-foreground font-bold">
                {filteredMembers.length}
              </strong>{" "}
              de {members.length} profissionais
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-primary hover:underline font-bold uppercase tracking-wider text-[11px] cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {filteredMembers.map((member, idx) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              priority={idx < 8}
              isSquare={true}
            />
          ))}
        </div>
      ) : (
        
        <div className="w-full py-16 px-6 border border-dashed border-zinc-300 dark:border-white/15 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
            <Icon icon="ph:user-focus-thin" className="size-12" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-heading font-black uppercase tracking-tight text-foreground">
              Nenhum profissional encontrado
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              Não encontramos nenhum resultado para{" "}
              <span className="font-mono font-bold text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="px-6 py-2.5 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Limpar Busca
          </button>
        </div>
      )}
    </div>
  );
}
