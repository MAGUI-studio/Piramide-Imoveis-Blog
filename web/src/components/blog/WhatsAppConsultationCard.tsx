import { Icon } from "@iconify/react";

interface WhatsAppConsultationCardProps {
  postTitle?: string;
  phoneNumber?: string;
  className?: string;
}

export function WhatsAppConsultationCard({
  postTitle,
  phoneNumber = "5512991599801",
  className = "",
}: WhatsAppConsultationCardProps) {
  const message = postTitle
    ? encodeURIComponent(
        `Olá! Estava lendo o artigo "${postTitle}" no Blog da Pirâmide e gostaria de conversar sobre oportunidades na região.`
      )
    : encodeURIComponent(
        "Olá! Vi um conteúdo no Blog da Pirâmide Imóveis e gostaria de conversar com um especialista."
      );

  return (
    <div
      className={`p-6 bg-zinc-100/90 dark:bg-[#161616] text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-white/10 rounded-none space-y-4 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Consultoria Online
        </span>
      </div>

      <h4 className="text-base sm:text-lg font-bold font-heading uppercase text-zinc-900 dark:text-white leading-snug">
        Interessado em Imóveis nesta Região?
      </h4>

      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
        Fale diretamente com nossa equipe de especialistas e receba opções exclusivas no seu WhatsApp.
      </p>

      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-none transition-colors shadow-xs"
      >
        <Icon icon="ph:whatsapp-logo-bold" className="size-4" />
        <span>Conversar no WhatsApp</span>
      </a>
    </div>
  );
}
