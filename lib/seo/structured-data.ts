import { SITE_NAME, absoluteUrl } from "./metadata";

/**
 * Helper generator JSON-LD — dipanggil dari page yang relevan lalu
 * di-render lewat <script type="application/ld+json"> (STRUCTURE.md §6.2).
 */

/** Hanya fakta bersumber: berdiri = Akta Pendirian No. 361 Tanggal 31 Juli 1995 (CONTENT-VERBATIM.md §E1); Instagram = satu-satunya sosmed terverifikasi. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    foundingDate: "1995-07-31",
    sameAs: ["https://instagram.com/pupukkebun"],
    // logo sengaja tidak diisi: status logo belum final (D3a) — belum ada aset logo Ostindo yang sah.
  };
}

type LocalBusinessInput = {
  name: string;
  address: string;
  telephone?: string;
  latitude?: number;
  longitude?: number;
  /** Cuma diisi kalau jam operasional memang tertulis di sumber untuk lokasi ini. */
  openingHours?: string;
};

export function localBusinessSchema(input: LocalBusinessInput) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    // PostalAddress (format yang diharapkan Google untuk LocalBusiness). Alamat sumber
    // tidak dipecah ke kota/kode pos supaya tidak ada bagian yang ditebak.
    address: {
      "@type": "PostalAddress",
      streetAddress: input.address,
      addressCountry: "ID",
    },
    telephone: input.telephone,
    openingHours: input.openingHours,
    geo:
      input.latitude && input.longitude
        ? {
            "@type": "GeoCoordinates",
            latitude: input.latitude,
            longitude: input.longitude,
          }
        : undefined,
  };
}

type ArticleInput = {
  headline: string;
  /** Path artikel (mis. /berita/kerjasama-dengan-lipi). */
  path: string;
  /** ISO date — cuma diisi kalau tanggal terbit terverifikasi dari sumber. */
  datePublished?: string;
};

export function articleSchema(input: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}

type ProductInput = {
  name: string;
  description: string;
  /** Path halaman produk (mis. /produk/ostindo). */
  path?: string;
  image?: string;
  sku?: string;
};

/**
 * Product tanpa harga, penawaran, maupun rating (DESIGN.md §8.11) — hanya fakta
 * bersumber. Produsen = organisasi situs (PT Anugerah Mustika Ostindo).
 */
export function productSchema(input: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    ...(input.path ? { url: absoluteUrl(input.path) } : {}),
    image: input.image,
    sku: input.sku,
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
