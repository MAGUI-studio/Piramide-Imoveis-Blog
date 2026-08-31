import { NextResponse } from "next/server";

function sanitizeInput(str: string): string {
  if (!str) return "";
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    .trim();
}

interface LeadRequestBody {
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  notes?: string;
  type?: "contato" | "newsletter" | string;
  locale?: string;
  utms?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    corretor?: string;
    src?: string;
    ref?: string;
    [key: string]: string | undefined;
  };
}

export async function POST(request: Request) {
  try {
    const json: LeadRequestBody = await request.json();

    const type = sanitizeInput(json.type || "contato");
    const email = sanitizeInput(json.email || "");
    const name = sanitizeInput(json.name || "");
    const phone = sanitizeInput(json.phone || "");
    const interest = sanitizeInput(
      json.interest ||
        (type === "newsletter"
          ? "Newsletter Blog Pirâmide"
          : "Atendimento Geral Blog")
    );
    const notes = sanitizeInput(json.notes || "");
    const locale = sanitizeInput(json.locale || "pt-BR");
    const utms = json.utms || {};

    if (type === "newsletter") {
      if (!email || !email.includes("@") || email.length < 5) {
        return NextResponse.json(
          { success: false, message: "Por favor, informe um e-mail válido." },
          { status: 400 }
        );
      }
    } else {
      if (!name || name.length < 2) {
        return NextResponse.json(
          { success: false, message: "Nome é obrigatório." },
          { status: 400 }
        );
      }

      if (!phone || phone.replace(/\D/g, "").length < 8) {
        return NextResponse.json(
          {
            success: false,
            message: "Telefone/WhatsApp válido é obrigatório.",
          },
          { status: 400 }
        );
      }
    }

    const timestamp = new Date().toISOString();
    const webhookUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;

    const payload = {
      timestamp,
      name,
      phone,
      email,
      interest,
      notes,
      type,
      corretor: utms.corretor ? sanitizeInput(utms.corretor) : "",
      utm_source: utms.utm_source
        ? sanitizeInput(utms.utm_source)
        : utms.src
        ? sanitizeInput(utms.src)
        : "",
      utm_medium: utms.utm_medium ? sanitizeInput(utms.utm_medium) : "",
      utm_campaign: utms.utm_campaign ? sanitizeInput(utms.utm_campaign) : "",
      utm_content: utms.utm_content ? sanitizeInput(utms.utm_content) : "",
      utm_term: utms.utm_term ? sanitizeInput(utms.utm_term) : "",
      locale,
      source: "Blog Pirâmide Imóveis",
    };

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn("[API Lead] Webhook retornou status:", response.status);
        }
      } catch (err) {
        console.warn(
          "[API Lead] Falha ao enviar para o webhook Google Sheets:",
          err
        );
      }
    } else {
      console.info(
        "[API Lead] Lead recebido com sucesso (GOOGLE_SHEETS_WEBHOOK_URL não configurado no .env):",
        payload
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead registrado com sucesso",
      data: payload,
    });
  } catch (error) {
    console.error("[API Lead Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno ao processar o lead",
      },
      { status: 500 }
    );
  }
}
