import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/src/app/api/lead/route";
import { formatTrackingForWhatsApp, getWhatsAppNumber, createWhatsAppUrl } from "@/src/lib/tracking/utm";
import { trackEvent, trackLead, trackContact } from "@/src/lib/tracking/analytics";

describe("API /api/lead", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return 400 if name is missing or too short on contato", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A",
        phone: "(12) 99999-9999",
        type: "contato",
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("should return 400 if phone is missing or too short on contato", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Maria Silva",
        phone: "123",
        type: "contato",
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("should successfully process newsletter lead with only email", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "leitor@piramide.com.br",
        type: "newsletter",
        interest: "Newsletter Footer",
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.email).toBe("leitor@piramide.com.br");
    expect(json.data.name).toBe("");
    expect(json.data.phone).toBe("");
    expect(json.data.type).toBe("newsletter");
  });

  it("should return 400 for invalid email on newsletter", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "invalid-email",
        type: "newsletter",
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
  });

  it("should successfully process contact lead and sanitize fields", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "<b>João Silva</b>",
        phone: "(12) 99159-9801",
        email: "joao@example.com",
        interest: "Imóveis no Aquarius",
        notes: "<script>alert('xss')</script>Quero conhecer casas",
        type: "contato",
        utms: {
          corretor: "Carlos",
          utm_source: "google",
        },
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.name).toBe("João Silva");
    expect(json.data.notes).not.toContain("<script>");
    expect(json.data.corretor).toBe("Carlos");
    expect(json.data.utm_source).toBe("google");
  });
});

describe("UTM & WhatsApp tracking utilities", () => {
  it("should format tracking suffix with corretor", () => {
    const suffix = formatTrackingForWhatsApp({ corretor: "Renata" });
    expect(suffix).toContain("Renata");
  });

  it("should get standard whatsapp number", () => {
    const number = getWhatsAppNumber();
    expect(number).toContain("5512991599801");
  });

  it("should generate proper WhatsApp URL with message and parameters", () => {
    const url = createWhatsAppUrl(
      undefined,
      "Olá! Gostaria de informações.",
      { corretor: "Marcelo" }
    );
    expect(url).toContain("https://wa.me/5512991599801");
    expect(url).toContain(encodeURIComponent("Marcelo"));
  });
});

describe("Analytics dispatcher utilities", () => {
  it("should safely dispatch trackEvent without crashing when window is undefined or defined", () => {
    expect(() => trackEvent("test_event", { foo: "bar" })).not.toThrow();
    expect(() => trackContact("whatsapp", "teste")).not.toThrow();
    expect(() => trackLead({ name: "Teste" })).not.toThrow();
  });
});
