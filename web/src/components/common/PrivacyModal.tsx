"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

const emptySubscribe = () => () => {};

let isPrivacyModalOpen =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("privacidade") === "true"
    : false;

const listeners = new Set<() => void>();

function subscribePrivacyModal(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getPrivacyModalSnapshot() {
  return isPrivacyModalOpen;
}

function getPrivacyModalServerSnapshot() {
  return false;
}

export function openPrivacyModal() {
  isPrivacyModalOpen = true;
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.searchParams.set("privacidade", "true");
    window.history.pushState({}, "", url.toString());
  }
  listeners.forEach((listener) => listener());
}

export function closePrivacyModal() {
  isPrivacyModalOpen = false;
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    url.searchParams.delete("privacidade");
    window.history.pushState({}, "", url.toString());
  }
  listeners.forEach((listener) => listener());
}

export function PrivacyModal() {
  const isOpen = useSyncExternalStore(
    subscribePrivacyModal,
    getPrivacyModalSnapshot,
    getPrivacyModalServerSnapshot
  );

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePrivacyModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleContactDpo = () => {
    const defaultMsg = encodeURIComponent(
      "Olá! Gostaria de falar com o encarregado de atendimento sobre privacidade e dados (LGPD) da Pirâmide Imóveis."
    );
    window.open(`https://wa.me/5512991599801?text=${defaultMsg}`, "_blank");
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePrivacyModal}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-none"
          >
            <div className="p-6 sm:p-7 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4 shrink-0 bg-zinc-50/70 dark:bg-zinc-900/90">
              <div className="space-y-1.5 pr-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Icon icon="ph:shield-check-bold" className="size-3.5" />
                  <span>LGPD & Transparência</span>
                </div>
                <h3
                  id="privacy-modal-title"
                  className="text-lg sm:text-xl font-bold font-heading text-zinc-900 dark:text-white tracking-tight"
                >
                  Política de Privacidade e Proteção de Dados
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
                  Compromisso com a sua privacidade, transparência e segurança na Pirâmide Imóveis.
                </p>
              </div>

              <button
                type="button"
                onClick={closePrivacyModal}
                aria-label="Fechar"
                className="p-2 rounded-none text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
              >
                <Icon icon="ph:x-bold" className="size-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>1. Controlador dos Dados</span>
                </h4>
                <p className="pl-3.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  A Pirâmide Imóveis (Queops Empreendimentos Imobiliários Ltda, CRECI 9390-J), com sede na Av. São João, 1301 - Jardim Esplanada, São José dos Campos - SP, atua como controladora e responsável pelos dados tratados neste portal.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>2. Coleta e Finalidade Exclusiva</span>
                </h4>
                <p className="pl-3.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Os dados pessoais informados voluntariamente (como Nome, WhatsApp/Telefone e E-mail) são utilizados exclusivamente para que nossos corretores e consultores oficiais possam responder às suas solicitações, enviar tabelas de preços, novidades do blog e prestar atendimento imobiliário personalizado em São José dos Campos e região.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>3. Cookies e Rastreamento Estatístico</span>
                </h4>
                <p className="pl-3.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Utilizamos cookies e serviços de análise estatística de navegação (como Google Analytics e Meta Ads) para mensurar a audiência, entender os artigos mais lidos e aprimorar a relevância dos nossos serviços. Essas ferramentas não armazenam senhas ou dados financeiros sigilosos.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>4. Não Compartilhamento e Segurança</span>
                </h4>
                <p className="pl-3.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Seus dados nunca serão comercializados, cedidos ou compartilhados com terceiros não autorizados. Mantemos medidas técnicas adequadas de segurança da informação e criptografia para proteger seus dados contra acessos não autorizados.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>5. Seus Direitos (LGPD - Lei nº 13.709/2018)</span>
                </h4>
                <p className="pl-3.5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Você possui o direito de confirmar a existência de tratamento, acessar seus dados, solicitar correções ou a exclusão definitiva dos seus dados de nossas listas a qualquer momento, sem qualquer burocracia, mediante solicitação em nosso canal oficial de atendimento.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={closePrivacyModal}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={handleContactDpo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                <Icon icon="ph:whatsapp-logo" className="size-4" />
                <span>Falar com o Atendimento no WhatsApp</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
