import type { MDXComponents } from "mdx/types";

// Wajib ada di root untuk @next/mdx (App Router) — lihat next.config.ts.
// Styling konten artikel ditentukan saat halaman /berita/[slug] dibangun
// (Fase 7), bukan di sini.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
