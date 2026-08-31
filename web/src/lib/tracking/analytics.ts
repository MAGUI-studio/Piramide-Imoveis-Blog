declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    gtag?: (
      command: string,
      actionOrId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, params);
    } catch (e) {
      console.debug("[Analytics] Meta Pixel Custom Event error:", e);
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params);
    } catch (e) {
      console.debug("[Analytics] GA4 Event error:", e);
    }
  }

  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    } catch (e) {
      console.debug("[Analytics] GTM dataLayer push error:", e);
    }
  }
}

export function trackContact(channel: string = "whatsapp", label?: string) {
  if (typeof window === "undefined") return;

  const data: Record<string, unknown> = {
    channel,
    content_name: label || "Atendimento WhatsApp Blog Pirâmide",
    content_category: "Contact",
  };

  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "Contact", data);
    } catch (e) {
      console.debug("[Analytics] fbq Contact error:", e);
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "contact", {
        method: channel,
        event_label: label,
      });
    } catch (e) {
      console.debug("[Analytics] gtag contact error:", e);
    }
  }

  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: "contact_click",
        ...data,
      });
    } catch (e) {
      console.debug("[Analytics] GTM contact error:", e);
    }
  }
}

export function trackLead(leadDetails: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const data: Record<string, unknown> = {
    content_name: "Formulário Blog Pirâmide Imóveis",
    content_category: "Lead",
    ...leadDetails,
  };

  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "Lead", data);
    } catch (e) {
      console.debug("[Analytics] fbq Lead error:", e);
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "generate_lead", {
        currency: "BRL",
        value: 1,
        ...leadDetails,
      });
    } catch (e) {
      console.debug("[Analytics] gtag generate_lead error:", e);
    }
  }

  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: "generate_lead",
        ...data,
      });
    } catch (e) {
      console.debug("[Analytics] GTM lead error:", e);
    }
  }
}

export function trackViewContent(title: string, category: string = "Blog Post") {
  if (typeof window === "undefined") return;

  const data: Record<string, unknown> = {
    content_name: title,
    content_category: category,
  };

  if (typeof window.fbq === "function") {
    try {
      window.fbq("track", "ViewContent", data);
    } catch (e) {
      console.debug("[Analytics] fbq ViewContent error:", e);
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "view_item", {
        item_name: title,
        item_category: category,
      });
    } catch (e) {
      console.debug("[Analytics] gtag view_item error:", e);
    }
  }

  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: "view_content",
        ...data,
      });
    } catch (e) {
      console.debug("[Analytics] GTM view_content error:", e);
    }
  }
}
