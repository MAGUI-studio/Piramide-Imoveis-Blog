"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { openPrivacyModal } from "@/src/components/common/PrivacyModal";

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Por favor, informe seu nome completo.";
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Informe um WhatsApp ou telefone válido com DDD.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    let msg = "Olá! Gostaria de falar com um consultor da Pirâmide Imóveis.\n\n";
    msg += `• *Nome:* ${name.trim()}\n`;
    msg += `• *WhatsApp:* ${phone.trim()}\n`;
    if (email.trim()) {
      msg += `• *E-mail:* ${email.trim()}\n`;
    }
    if (notes.trim()) {
      msg += `• *Mensagem:* ${notes.trim()}\n`;
    }

    const targetUrl = `https://wa.me/5512991599801?text=${encodeURIComponent(msg)}`;
    setLastWhatsAppUrl(targetUrl);
    setSubmittedName(name.trim());

    setTimeout(() => {
      window.open(targetUrl, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section
      id="contato"
      className="relative w-full bg-[#161616] text-white pt-20 sm:pt-28 pb-16 sm:pb-24 border-t border-zinc-800 transition-colors overflow-hidden mt-16 sm:mt-24"
    >
      
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-440 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left space-y-8"
          >
            <div>
              <div className="w-full sm:w-fit inline-flex items-center justify-center sm:justify-start py-1.5 rounded-tr-full rounded-bl-full px-8 bg-primary text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/20 shadow-sm">
                <span>Atendimento & Consultoria</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.02] font-heading">
                Fale com a nossa equipe de especialistas
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 font-light mt-6 leading-relaxed">
                Tire suas dúvidas sobre o mercado imobiliário, lançamentos exclusivos, compra, venda e locação em São José dos Campos e região.
              </p>
            </div>

            <div className="w-full pt-6 border-t border-white/10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-none bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon="ph:whatsapp-logo-fill" className="size-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    WhatsApp Direto
                  </span>
                  <a
                    href="https://wa.me/5512991599801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-zinc-200 font-mono font-bold hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span>(12) 99159-9801</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-none bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon="ph:map-pin-fill" className="size-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    Sede Pirâmide Imóveis
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                    Av. São João, 1301 - Jardim Esplanada, São José dos Campos - SP
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-none bg-primary/20 border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon="ph:clock-fill" className="size-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    Horário de Atendimento
                  </span>
                  <div className="space-y-1 text-xs font-mono">
                    <p className="text-zinc-200 font-medium">Segunda a Sexta: 08:00 – 18:00</p>
                    <p className="text-zinc-400 font-medium">Sábado: 09:00 – 13:00</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 p-6 sm:p-10 border border-zinc-800 bg-zinc-900/80"
                >
                  <div className="pb-6 border-b border-white/10 space-y-3">
                    <div className="flex items-center gap-2.5 text-primary">
                      <Icon icon="ph:check-circle-fill" className="size-6" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                        Mensagem Preparada
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-heading tracking-tight">
                      Obrigado, {submittedName}!
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                      Sua solicitação foi direcionada para a nossa central de atendimento no WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => window.open(lastWhatsAppUrl, "_blank")}
                      className="w-full px-8 py-4.5 rounded-none bg-primary hover:bg-primary/90 text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl font-mono"
                    >
                      <Icon icon="ph:whatsapp-logo-bold" className="size-5" />
                      <span>Reabrir WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full py-3.5 rounded-none bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border border-white/20 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer font-mono"
                    >
                      <Icon icon="ph:arrow-counter-clockwise-bold" className="size-4" />
                      <span>Enviar outra mensagem</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 sm:p-10 border border-zinc-800 bg-zinc-900/60"
                >
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
                      Envie sua Mensagem
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 leading-relaxed">
                      Preencha os campos abaixo para iniciar seu atendimento personalizado diretamente com um especialista.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                          Nome Completo <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Icon icon="ph:user-bold" className="size-4" />
                          </span>
                          <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Digite seu nome completo"
                            className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none transition-colors"
                          />
                        </div>
                        {errors.name && (
                          <span className="text-xs text-rose-400 font-light block">{errors.name}</span>
                        )}
                      </div>

                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                          WhatsApp / Telefone <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Icon icon="ph:phone-bold" className="size-4" />
                          </span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="(12) 99999-9999"
                            maxLength={16}
                            className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none transition-colors font-mono"
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-xs text-rose-400 font-light block">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        E-mail <span className="text-zinc-500 font-normal">(Opcional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                          <Icon icon="ph:envelope-simple-bold" className="size-4" />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@exemplo.com"
                          className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                        Mensagem ou Dúvida <span className="text-zinc-500 font-normal">(Opcional)</span>
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Como podemos te ajudar hoje?"
                        rows={4}
                        className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-primary text-white text-sm p-4 outline-none transition-colors resize-none"
                      />
                    </div>

                    
                    <div className="pt-1 flex items-start gap-2.5 text-xs text-zinc-400">
                      <Icon icon="ph:shield-check-bold" className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-light">
                        Seus dados estão protegidos pela nossa{" "}
                        <button
                          type="button"
                          onClick={() => openPrivacyModal()}
                          className="underline underline-offset-2 text-zinc-300 hover:text-primary transition-colors cursor-pointer font-medium"
                        >
                          Política de Privacidade (LGPD)
                        </button>
                        .
                      </span>
                    </div>

                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 rounded-none bg-primary hover:bg-primary/90 disabled:opacity-75 text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl font-mono mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon icon="ph:spinner-gap-bold" className="size-5 animate-spin text-white" />
                          <span>Abrindo WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <Icon icon="ph:whatsapp-logo-bold" className="size-5 text-white" />
                          <span>Falar com um Consultor no WhatsApp</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
