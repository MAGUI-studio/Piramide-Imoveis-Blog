"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { TeamMemberCard, type TeamMember } from "./TeamMemberCard";

export type LeadershipMember = TeamMember;

interface LeadershipSectionProps {
  members: LeadershipMember[];
}

export function LeadershipSection({ members }: LeadershipSectionProps) {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-28">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 space-y-10 sm:space-y-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center justify-center space-y-4"
        >
          <div className="inline-flex items-center justify-center py-1.5 rounded-tr-full rounded-bl-full px-8 bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-sm">
            <span>Governança & Liderança</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase font-heading tracking-tight text-foreground leading-[1.03]">
            Nossa Diretoria & Liderança
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Governança ética, visão estratégica e compromisso contínuo com a realização dos melhores negócios.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <TeamMemberCard member={member} priority isSquare={false} />
            </motion.div>
          ))}
        </div>

        
        <div className="flex justify-end pt-2">
          <Link
            href="/sobre-nos/nosso-time"
            className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors py-2"
          >
            <span>Ver Nosso Time Completo</span>
            <Icon
              icon="ph:arrow-right-bold"
              className="size-4 text-primary transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
