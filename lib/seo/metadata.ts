import type { Metadata } from "next";

// TODO: konfirmasi domain final dengan klien (lihat PRD.md §9 poin 3)
export const SITE_NAME = "PT Cakra Prima Nusantara";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://cakraprimanusantara.co.id";
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /**
   * Jika true, halaman diberi tag robots `noindex, follow`.
   * Digunakan untuk halaman stub/placeholder yang belum siap untuk hasil pencarian
   * tanpa perlu memblokir crawler di robots.txt (GAP-REPORT.md §7.3).
   */
  noindex?: boolean;
};

/**
 * Helper terpusat untuk generate metadata konsisten di setiap page.tsx
 * (title, description, canonical, openGraph, twitter, robots) — lihat STRUCTURE.md §6.1.
 *
 * `title` dikembalikan sebagai string pendek (tanpa suffix SITE_NAME) agar
 * template `%s | ${SITE_NAME}` pada root layout (app/layout.tsx) menerapkan
 * suffix hanya satu kali. OG & Twitter menggunakan fullTitle tersendiri
 * karena keduanya tidak diproses oleh template Next.js.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  // Di Next.js App Router, template `%s | ...` dari root layout hanya berlaku
  // untuk child route segments, bukan untuk root page (`/`). Gunakan fullTitle
  // jika path === "/" agar homepage memiliki title yang lengkap.
  const pageTitle = path === "/" ? fullTitle : title;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
          },
        }
      : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
