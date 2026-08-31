import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getStoredUtmParams,
  formatTrackingForWhatsApp,
  getWhatsAppNumber,
  createWhatsAppUrl,
} from "@/src/lib/tracking/utm";
import {
  trackEvent,
  trackContact,
  trackLead,
  trackViewContent,
} from "@/src/lib/tracking/analytics";

describe("UTM and Tracking", () => {
  beforeEach(() => {
    sessionStorage.clear();
    delete (window as unknown as { fbq?: unknown }).fbq;
    delete (window as unknown as { gtag?: unknown }).gtag;
    delete (window as unknown as { dataLayer?: unknown }).dataLayer;
  });

  describe("UTM parameters", () => {
    it("should return empty object when no UTM parameters are stored", () => {
      const params = getStoredUtmParams();
      expect(params).toEqual({});
    });

    it("should format tracking text with broker/corretor name", () => {
      const text = formatTrackingForWhatsApp({
        corretor: "Carlos",
      });

      expect(text).toContain("• *Consultor indicado:* Carlos");
    });

    it("should return clean WhatsApp number with 55 country code", () => {
      const number = getWhatsAppNumber();
      expect(number).toMatch(/^55\d{10,11}$/);
    });

    it("should generate full wa.me link with encoded message and broker reference", () => {
      const url = createWhatsAppUrl(
        "Olá, gostaria de informações sobre casas no Urbanova",
        undefined,
        { corretor: "Carlos" },
      );

      expect(url).toContain("https://wa.me/");
      expect(url).toContain("Urbanova");
      expect(url).toContain("Carlos");
    });
  });

  describe("Analytics & Pixel Events", () => {
    it("should dispatch custom events to fbq, gtag and dataLayer when available", () => {
      const fbqMock = vi.fn();
      const gtagMock = vi.fn();
      const dataLayerMock: Array<Record<string, unknown>> = [];

      window.fbq = fbqMock;
      window.gtag = gtagMock;
      window.dataLayer = dataLayerMock;

      trackEvent("custom_click", { button: "cta_hero" });

      expect(fbqMock).toHaveBeenCalledWith("trackCustom", "custom_click", { button: "cta_hero" });
      expect(gtagMock).toHaveBeenCalledWith("event", "custom_click", { button: "cta_hero" });
      expect(dataLayerMock).toContainEqual(expect.objectContaining({ event: "custom_click", button: "cta_hero" }));
    });

    it("should trigger trackContact for WhatsApp clicks", () => {
      const gtagMock = vi.fn();
      window.gtag = gtagMock;

      trackContact("whatsapp", "Botão CTA Artigo");

      expect(gtagMock).toHaveBeenCalledWith("event", "contact", {
        method: "whatsapp",
        event_label: "Botão CTA Artigo",
      });
    });

    it("should trigger trackLead for form submissions", () => {
      const gtagMock = vi.fn();
      window.gtag = gtagMock;

      trackLead({ email: "cliente@teste.com" });

      expect(gtagMock).toHaveBeenCalledWith("event", "generate_lead", expect.objectContaining({
        currency: "BRL",
        value: 1,
        email: "cliente@teste.com",
      }));
    });

    it("should trigger trackViewContent for page views", () => {
      const gtagMock = vi.fn();
      window.gtag = gtagMock;

      trackViewContent("Mansões no Urbanova", "Artigo");

      expect(gtagMock).toHaveBeenCalledWith("event", "view_item", {
        item_name: "Mansões no Urbanova",
        item_category: "Artigo",
      });
    });
  });
});
