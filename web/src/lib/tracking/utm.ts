export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  broker?: string;
  corretor?: string;
  src?: string;
  ref?: string;
  [key: string]: string | undefined;
}

const STORAGE_KEY = "piramide_blog_utm_params";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "broker",
  "corretor",
  "src",
  "ref",
] as const;

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const foundFromUrl: UtmParams = {};

  TRACKING_KEYS.forEach((key) => {
    const val = urlParams.get(key);
    if (val && val.trim()) {
      foundFromUrl[key] = val.trim();
    }
  });

  try {
    const storedRaw = sessionStorage.getItem(STORAGE_KEY);
    const stored: UtmParams = storedRaw ? JSON.parse(storedRaw) : {};

    if (Object.keys(foundFromUrl).length > 0) {
      const merged = { ...stored, ...foundFromUrl };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }

    return stored;
  } catch {
    return foundFromUrl;
  }
}

export function formatTrackingForWhatsApp(params?: UtmParams): string {
  const effective = params || getStoredUtmParams();
  const brokerName = effective.broker || effective.corretor;

  if (brokerName) {
    return `\n\n• *Consultor indicado:* ${brokerName}`;
  }

  return "";
}

export function getWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5512991599801";
  const digits = envNumber.replace(/\D/g, "");
  if (digits.startsWith("55")) {
    return digits;
  }
  return `55${digits}`;
}

export function createWhatsAppUrl(
  phoneNumberOrMessage?: string,
  baseMessage?: string,
  customParams?: UtmParams
): string {
  let targetPhone = getWhatsAppNumber();
  let message = "";
  let params = customParams;

  if (baseMessage !== undefined) {
    if (phoneNumberOrMessage && phoneNumberOrMessage.trim()) {
      const cleanInput = phoneNumberOrMessage.replace(/\D/g, "");
      targetPhone = cleanInput.startsWith("55") ? cleanInput : `55${cleanInput}`;
    }
    message = baseMessage;
  } else {
    message = phoneNumberOrMessage || "";
    params = customParams;
  }

  const trackingSuffix = formatTrackingForWhatsApp(params);
  const fullMessage = `${message.trim()}${trackingSuffix}`;
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullMessage)}`;
}
