/**
 * Google Apps Script para Gestão Automática de Leads & Newsletter
 * Blog Pirâmide Imóveis
 * 
 * INSTRUÇÕES:
 * 1. Crie uma planilha em branco no Google Sheets (não precisa digitar cabeçalho algum).
 * 2. Acesse Extensões > Apps Script.
 * 3. Cole este código no arquivo Código.gs e salve.
 * 4. Clique em "Implantar" > "Nova implantação".
 * 5. Selecione Tipo: "App da Web", Executar como: "Eu", Quem tem acesso: "Qualquer pessoa".
 * 6. Copie a URL do App da Web e cole no seu .env.local como:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

const NOTIFICATION_EMAIL = ""; // Opcional: preencha seu e-mail para receber notificações imediatas

const THEME = {
  BANNER_BG: "#934B96",
  BANNER_TEXT: "#FFFFFF",
  HEADER_BG: "#D051C2",
  HEADER_TEXT: "#FFFFFF",
  ZEBRA_BG: "#FAF3F9",
  BORDER_COLOR: "#E8D8E5",
};

const HEADERS = [
  "Status do Lead",
  "Data / Hora (BRT)",
  "Tipo de Cadastro",
  "Nome do Lead",
  "WhatsApp / Telefone",
  "E-mail",
  "Interesse / Assunto",
  "Observações / Mensagem",
  "Corretor Indicado",
  "Origem (UTM Source)",
  "Mídia (UTM Medium)",
  "Campanha (UTM Campaign)",
  "Conteúdo (UTM Content)",
  "Termo (UTM Term)",
  "Dispositivo / Fonte",
];

const STATUS_OPTIONS = [
  "🟢 Novo Lead",
  "🟡 Em Atendimento",
  "📅 Visita Agendada",
  "⭐ Proposta Enviada",
  "🤝 Negócio Concluído",
  "⚪ Arquivado",
];

const TYPE_OPTIONS = [
  "💬 Contato / Atendimento",
  "✉️ Inscrição Newsletter",
];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() < 2) {
      setupSheetLayout(sheet);
    }

    const formattedDate = Utilities.formatDate(
      new Date(),
      "America/Sao_Paulo",
      "dd/MM/yyyy HH:mm:ss"
    );

    const typeLabel = data.type === "newsletter"
      ? "✉️ Inscrição Newsletter"
      : "💬 Contato / Atendimento";

    const newRow = [
      data.type === "newsletter" ? "🟢 Novo Lead" : "🟢 Novo Lead",
      formattedDate,
      typeLabel,
      data.name || "",
      data.phone || "",
      data.email || "",
      data.interest || (data.type === "newsletter" ? "Newsletter Blog" : "Atendimento Geral"),
      data.notes || "",
      data.corretor || "Geral",
      data.utm_source || "Orgânico / Direto",
      data.utm_medium || "-",
      data.utm_campaign || "-",
      data.utm_content || "-",
      data.utm_term || "-",
      data.source || "Blog Pirâmide Imóveis",
    ];

    sheet.appendRow(newRow);
    const lastRowIndex = sheet.getLastRow();

    formatLeadRow(sheet, lastRowIndex);

    sheet.autoResizeColumns(2, HEADERS.length - 1);
    sheet.setColumnWidth(1, 140);
    sheet.setColumnWidth(3, 160);

    if (NOTIFICATION_EMAIL) {
      sendEmailNotification(data, formattedDate, typeLabel);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Registro adicionado com sucesso!",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function setupSheetLayout(sheet) {
  sheet.clear();
  sheet.setTabColor(THEME.BANNER_BG);

  const bannerRange = sheet.getRange("A1:O1");
  bannerRange.merge();
  bannerRange.setValue(
    "PIRÂMIDE IMÓVEIS  |  PAINEL DE LEADS & NEWSLETTER — BLOG EDITORIAL"
  );
  bannerRange.setBackground(THEME.BANNER_BG);
  bannerRange.setFontColor(THEME.BANNER_TEXT);
  bannerRange.setFontSize(12);
  bannerRange.setFontWeight("bold");
  bannerRange.setHorizontalAlignment("center");
  bannerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 42);

  const headerRange = sheet.getRange(2, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS]);
  headerRange.setBackground(THEME.HEADER_BG);
  headerRange.setFontColor(THEME.HEADER_TEXT);
  headerRange.setFontSize(10);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(2, 34);

  sheet.setFrozenRows(2);

  sheet.autoResizeColumns(2, HEADERS.length - 1);
  sheet.setColumnWidth(1, 140);
  sheet.setColumnWidth(3, 160);
}

function formatLeadRow(sheet, rowIndex) {
  const numColumns = HEADERS.length;
  const rowRange = sheet.getRange(rowIndex, 1, 1, numColumns);

  const isEven = rowIndex % 2 === 0;
  rowRange.setBackground(isEven ? THEME.ZEBRA_BG : "#FFFFFF");
  rowRange.setFontSize(10);
  rowRange.setVerticalAlignment("middle");

  rowRange.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    THEME.BORDER_COLOR,
    SpreadsheetApp.BorderStyle.SOLID
  );

  sheet.getRange(rowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 2).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 3).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 4).setHorizontalAlignment("left").setFontWeight("bold");
  sheet.getRange(rowIndex, 5).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 6).setHorizontalAlignment("left");
  sheet.getRange(rowIndex, 7).setHorizontalAlignment("left");
  sheet.getRange(rowIndex, 8).setHorizontalAlignment("left");
  sheet.getRange(rowIndex, 9).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 10, 1, 5).setHorizontalAlignment("center");
  sheet.getRange(rowIndex, 15).setHorizontalAlignment("center");

  sheet.setRowHeight(rowIndex, 30);

  const statusCell = sheet.getRange(rowIndex, 1);
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  statusCell.setDataValidation(statusRule);

  const typeCell = sheet.getRange(rowIndex, 3);
  const typeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(TYPE_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  typeCell.setDataValidation(typeRule);
}

function sendEmailNotification(data, formattedDate, typeLabel) {
  const isNewsletter = data.type === "newsletter";
  const subject = isNewsletter
    ? `NOVA INSCRIÇÃO NEWSLETTER: ${data.email}`
    : `NOVO LEAD DO BLOG: ${data.name || "Sem Nome"} (${data.interest || "Contato"})`;

  const body = `Novo registro recebido no Blog Pirâmide Imóveis:

• Tipo: ${typeLabel}
• Nome: ${data.name || "Não informado"}
• WhatsApp: ${data.phone || "Não informado"}
• E-mail: ${data.email || "Não informado"}
• Interesse: ${data.interest || "Geral"}
• Mensagem: ${data.notes || "Nenhuma"}

Rastreamento (UTMs):
• Corretor Indicado: ${data.corretor || "Não especificado"}
• Origem (Source): ${data.utm_source || "Direto / Orgânico"}
• Campanha: ${data.utm_campaign || "Nenhuma"}
• Mídia: ${data.utm_medium || "-"}

Data/Hora: ${formattedDate}
Acesse a planilha para visualizar e gerenciar.`;

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}
