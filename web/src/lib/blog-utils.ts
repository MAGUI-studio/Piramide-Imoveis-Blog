export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function slugifyText(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function calculateReadingTime(blocks: unknown): number {
  if (!blocks || !Array.isArray(blocks)) return 3;

  let text = "";

  function extractText(node: unknown) {
    if (typeof node === "string") {
      text += " " + node;
    } else if (Array.isArray(node)) {
      node.forEach(extractText);
    } else if (node && typeof node === "object") {
      const record = node as Record<string, unknown>;
      if (typeof record.text === "string") {
        text += " " + record.text;
      }
      if (record.children) {
        extractText(record.children);
      }
    }
  }

  extractText(blocks);

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);

  return Math.max(1, minutes);
}

export function extractHeadings(blocks: unknown): TocHeading[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  const headings: TocHeading[] = [];

  for (const item of blocks) {
    if (
      item &&
      typeof item === "object" &&
      "style" in item &&
      "_type" in item
    ) {
      const block = item as { _type: string; style: string; children?: { text?: string }[] };
      if (block._type === "block" && (block.style === "h2" || block.style === "h3")) {
        const children = Array.isArray(block.children) ? block.children : [];
        const text = children.map((child) => child.text || "").join("");
        if (text.trim()) {
          const id = slugifyText(text);
          headings.push({
            id,
            text,
            level: block.style === "h2" ? 2 : 3,
          });
        }
      }
    }
  }

  return headings;
}
