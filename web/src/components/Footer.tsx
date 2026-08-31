"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTopLink } from "@/src/components/common/ScrollTopLink";
import { openPrivacyModal } from "@/src/components/common/PrivacyModal";
import { createWhatsAppUrl, getStoredUtmParams } from "@/src/lib/tracking/utm";
import { trackContact, trackLead } from "@/src/lib/tracking/analytics";

function ContactSectionIntegrated() {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    const utms = getStoredUtmParams();

    let msg = "Olá! Gostaria de falar com um consultor da Pirâmide Imóveis.\n\n";
    msg += `• *Nome:* ${name.trim()}\n`;
    msg += `• *WhatsApp:* ${phone.trim()}\n`;
    if (email.trim()) {
      msg += `• *E-mail:* ${email.trim()}\n`;
    }
    if (notes.trim()) {
      msg += `• *Mensagem:* ${notes.trim()}\n`;
    }

    const targetUrl = createWhatsAppUrl(undefined, msg, utms);
    setLastWhatsAppUrl(targetUrl);
    setSubmittedName(name.trim());

    trackLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest: "Contato Geral Blog Pirâmide",
      corretor: utms?.broker || utms?.corretor || "Geral",
      utm_source: utms?.utm_source || utms?.src || "Direto",
    });
    trackContact("whatsapp", "Formulário de Contato Blog");

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          interest: "Atendimento Geral Blog Pirâmide",
          notes: notes.trim(),
          type: "contato",
          utms,
          locale: "pt-BR",
        }),
      });
    } catch (err) {
      console.warn("[FooterContact] Falha ao enviar para /api/lead:", err);
    } finally {
      window.open(targetUrl, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setErrors({});
    setIsSuccess(false);
    setSubmittedName("");
    setLastWhatsAppUrl("");
  };

  return (
    <section
      id="contato"
      className="relative w-full bg-[#161616] text-white pt-20 sm:pt-28 pb-16 sm:pb-20 border-t border-zinc-800 transition-colors overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/utils/piramide-imoveis-fachada.webp"
          alt="Sede Pirâmide Imóveis"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/95 via-[#161616]/85 to-[#161616]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

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
                    href={createWhatsAppUrl(undefined, "Olá! Gostaria de falar com a equipe da Pirâmide Imóveis.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact("whatsapp", "Contato Direto Sede")}
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
                  className="space-y-8"
                >
                  <div className="mb-8 pb-6 border-b border-white/10 space-y-3">
                    <div className="flex items-center gap-2.5 text-primary">
                      <Icon icon="ph:check-circle-fill" className="size-6" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                        Mensagem Enviada com Sucesso
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight">
                      Obrigado, {submittedName}!
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                      Sua solicitação foi registrada e direcionada para nossa central de consultores especialistas.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => window.open(lastWhatsAppUrl, "_blank")}
                      className="w-full px-10 py-4.5 rounded-none bg-primary hover:bg-primary/90 text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl font-mono"
                    >
                      <Icon icon="ph:whatsapp-logo-bold" className="size-5 text-white" />
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
                >
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
                      Envie sua Mensagem
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 leading-relaxed">
                      Preencha os campos abaixo para iniciar seu atendimento personalizado diretamente com um especialista.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                          Nome Completo <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                            <Icon icon="ph:user-bold" className="size-4.5" />
                          </span>
                          <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Digite seu nome completo"
                            className="w-full bg-zinc-900/90 border border-white/20 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none rounded-none transition-colors"
                          />
                        </div>
                        {errors.name && (
                          <span className="text-xs text-rose-400 font-light block">{errors.name}</span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                          WhatsApp / Telefone <span className="text-primary">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                            <Icon icon="ph:phone-bold" className="size-4.5" />
                          </span>
                          <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="(12) 99999-9999"
                            maxLength={16}
                            className="w-full bg-zinc-900/90 border border-white/20 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none rounded-none transition-colors font-mono"
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-xs text-rose-400 font-light block">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                        E-mail <span className="text-zinc-500 font-normal">(Opcional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                          <Icon icon="ph:envelope-simple-bold" className="size-4.5" />
                        </span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu.email@exemplo.com"
                          className="w-full bg-zinc-900/90 border border-white/20 focus:border-primary text-white text-sm py-3.5 pl-10 pr-4 outline-none rounded-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                        Mensagem ou Dúvida <span className="text-zinc-500 font-normal">(Opcional)</span>
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Como podemos te ajudar hoje? (ex: busca de imóveis no Aquarius, financiamento, etc)"
                        rows={4}
                        className="w-full bg-zinc-900/90 border border-white/20 focus:border-primary text-white text-sm p-4 outline-none rounded-none transition-colors resize-none min-h-[100px]"
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
                      className="w-full px-10 py-4.5 rounded-none bg-primary hover:bg-primary/90 disabled:opacity-75 text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl font-mono mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon icon="ph:spinner-gap-bold" className="size-5 animate-spin text-white" />
                          <span>Enviando...</span>
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

export function Footer() {
  const currentYear = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@") || newsletterEmail.length < 5) {
      setNewsletterError("Por favor, informe um e-mail válido.");
      return;
    }

    setNewsletterError("");
    setNewsletterSubmitting(true);
    const utms = getStoredUtmParams();

    trackLead({
      email: newsletterEmail.trim(),
      interest: "Newsletter Footer",
      corretor: utms?.broker || utms?.corretor || "Geral",
      utm_source: utms?.utm_source || utms?.src || "Direto",
    });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          type: "newsletter",
          interest: "Inscrição Newsletter Rodapé",
          notes: "Lead capturado via input de newsletter no rodapé do blog",
          utms,
          locale: "pt-BR",
        }),
      });

      if (res.ok) {
        setNewsletterSuccess(true);
        setNewsletterEmail("");
      } else {
        setNewsletterError("Ocorreu um erro ao cadastrar. Tente novamente.");
      }
    } catch {
      setNewsletterError("Erro de conexão. Tente novamente.");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/piramideimoveis",
      icon: "ph:instagram-logo-bold",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@piramideimoveis9390/featured",
      icon: "ph:youtube-logo-bold",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/piramide-im%C3%B3veis-queops-ltda",
      icon: "ph:linkedin-logo-bold",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/imobiliariapiramide",
      icon: "ph:facebook-logo-bold",
    },
    {
      label: "Portal Oficial",
      href: "https://www.piramideimoveissjc.com.br/",
      icon: "ph:globe-bold",
    },
  ];

  return (
    <footer className="relative w-full bg-[#161616] text-zinc-400 border-t border-zinc-800 transition-colors overflow-hidden">
      {/* 1. Seção de Contato & Consultoria Integrada Diretamente no Topo do Footer */}
      <ContactSectionIntegrated />

      {/* 2. Navegação, Unidades, Newsletter e Copyright */}
      <div className="relative w-full py-16 sm:py-20 px-6 md:px-12 border-t border-zinc-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        <div className="absolute -bottom-6 inset-x-0 flex justify-center pointer-events-none overflow-hidden select-none">
          <span className="text-7xl sm:text-9xl lg:text-[140px] font-black uppercase tracking-tighter text-white/[0.03] font-heading whitespace-nowrap leading-none">
            PIRÂMIDE IMÓVEIS
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-440 mx-auto space-y-12 sm:space-y-16"
        >
          <div className="pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="text-xs text-zinc-300 font-medium leading-relaxed">
                Conteúdo exclusivo e atualizado sobre o mercado imobiliário do Vale do Paraíba e Litoral Norte
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-5 shrink-0 self-start md:self-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white hover:text-primary transition-colors duration-300 cursor-pointer group"
                >
                  <Icon
                    icon={social.icon}
                    className="size-[22px] transition-transform group-hover:scale-110 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
            <div className="md:col-span-12 lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <a
                  href="https://www.piramideimoveissjc.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/logos/piramide/logo_white.svg"
                    alt="Pirâmide Imóveis"
                    width={280}
                    height={70}
                    className="h-14 sm:h-18 w-auto object-contain"
                  />
                </a>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-md">
                Mais de 40 anos de tradição, credibilidade e excelência no mercado imobiliário de São José dos Campos e região.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-zinc-900 border border-zinc-800 text-xs">
                <span className="font-mono font-bold text-primary">
                  CRECI 3787-J
                </span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-300 font-medium">
                  Imobiliária Oficial
                </span>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
                Navegação
              </h4>
              <ul className="space-y-2.5 text-sm font-light">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Todos os Artigos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categorias"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Categorias</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cidades"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Cidades</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/autores"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Autores</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 lg:col-span-2 space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
                Pirâmide Imóveis
              </h4>
              <ul className="space-y-2.5 text-sm font-light">
                <li>
                  <a
                    href="https://www.piramideimoveissjc.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Buscar Imóveis</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.piramideimoveissjc.com.br/sobre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Sobre a Pirâmide</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/5512991599801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    <span>Fale Conosco</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-7 lg:col-span-4 space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
                Sede Principal
              </h4>
              <div className="space-y-3.5 text-xs font-light">
                <div className="flex items-start gap-2.5">
                  <Icon icon="ph:map-pin-fill" className="text-primary shrink-0 mt-0.5 size-4" />
                  <span className="leading-relaxed text-zinc-300">
                    Av. São João, 1301 - Jardim Esplanada, São José dos Campos - SP, 12242-840
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icon icon="ph:clock-fill" className="text-primary shrink-0 mt-0.5 size-4" />
                  <div className="space-y-0.5 text-zinc-300 font-mono">
                    <p>Segunda a Sexta: 08h às 18h</p>
                    <p className="text-zinc-400">Sábado: 09h às 13h</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Icon icon="ph:buildings-fill" className="text-primary size-3.5" />
                    <span>Outras Unidades:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href="https://www.google.com/search?q=Pir%C3%A2mide+im%C3%B3veis+unidade+Urbanova+SJC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>Unidade Urbanova</span>
                      <Icon icon="ph:magnifying-glass-bold" className="text-zinc-500 size-3" />
                    </a>
                    <a
                      href="https://www.google.com/search?q=Pir%C3%A2mide+im%C3%B3veis+unidade+caraguatatuba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition-colors"
                    >
                      <span>Unidade Litoral</span>
                      <Icon icon="ph:magnifying-glass-bold" className="text-zinc-500 size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-mono text-[11px] font-bold uppercase tracking-wider">
                  <Icon icon="ph:paper-plane-tilt-bold" className="size-3.5" />
                  <span>Newsletter Pirâmide</span>
                </div>
                <p className="text-xs text-zinc-300 font-light">
                  Receba novidades e análises do mercado imobiliário no seu e-mail.
                </p>
              </div>

              <div className="w-full md:w-auto md:min-w-[340px]">
                {newsletterSuccess ? (
                  <div className="flex items-center gap-2 p-2 text-emerald-400 text-xs font-mono">
                    <Icon icon="ph:check-circle-fill" className="size-4 shrink-0 text-emerald-500" />
                    <span>E-mail cadastrado com sucesso!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-1" noValidate>
                    <div className="flex items-stretch gap-1.5">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterError) setNewsletterError("");
                        }}
                        placeholder="Seu e-mail..."
                        className="flex-1 bg-zinc-950 border border-zinc-700 focus:border-primary text-white text-xs px-3 py-2 outline-none rounded-none transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={newsletterSubmitting}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-70"
                      >
                        {newsletterSubmitting ? (
                          <Icon icon="ph:spinner-gap-bold" className="size-3.5 animate-spin" />
                        ) : (
                          <span>Assinar</span>
                        )}
                      </button>
                    </div>
                    {newsletterError && (
                      <span className="text-[10px] text-rose-400 font-light block">
                        {newsletterError}
                      </span>
                    )}
                  </form>
                )}
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed font-light text-center mx-auto max-w-2xl">
              As informações contidas nos artigos do blog são de caráter informativo e podem sofrer alterações conforme as atualizações da legislação e do mercado imobiliário.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left pt-4 border-t border-zinc-900">
              <p>© {currentYear} Pirâmide Imóveis. Todos os direitos reservados.</p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openPrivacyModal()}
                  className="text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                >
                  Privacidade & Termos (LGPD)
                </button>
                <span className="text-white/24">|</span>
                <ScrollTopLink className="text-white transition-colors hover:text-primary cursor-pointer inline-flex items-center gap-1 font-medium">
                  <span>Voltar ao topo</span>
                  <Icon icon="ph:caret-up-bold" className="size-3.5 shrink-0" />
                </ScrollTopLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
