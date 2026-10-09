import type { Metadata } from "next";

// TODO: pindahkan ke env var / konfirmasi domain final (lihat PRD.md §9 poin 3)
export const SITE_NAME = "PT Cakra Prima Nusantara";
export const SITE_URL = "https://cakraprimanusantara.co.id";
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

/**
 * Helper terpusat untuk generate metadata konsisten di setiap page.tsx
 * (title, description, canonical, openGraph) — lihat STRUCTURE.md §6.1.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: "id_ID",
      type: "website",
    },
  };
}
