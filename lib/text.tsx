import type { ReactNode } from "react";

/**
 * Render `*kata*` sebagai <em>kata</em> — dipakai untuk teks verbatim dari
 * CONTENT-VERBATIM.md yang menandai istilah asing/teknis dengan italic
 * (mis. *concrete repair*, *chipping*, *finishing*). Bukan parser Markdown
 * umum, cuma pola sederhana ini.
 */
export function renderInlineEmphasis(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  );
}
