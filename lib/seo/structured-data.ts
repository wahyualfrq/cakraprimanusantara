import { SITE_NAME, SITE_URL } from "./metadata";

/**
 * Helper generator JSON-LD — dipanggil dari page yang relevan lalu
 * di-render lewat <script type="application/ld+json"> (STRUCTURE.md §6.2).
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    // TODO: isi logo, sameAs (social media) setelah aset final tersedia
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
    address: input.address,
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

type ItemListInput = {
  name: string;
}[];

export function itemListSchema(items: ItemListInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
    })),
  };
}

type ArticleInput = {
  headline: string;
  /** ISO date — cuma diisi kalau tanggal terbit terverifikasi dari sumber. */
  datePublished?: string;
};

export function articleSchema(input: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
  };
}

type ProductInput = {
  name: string;
  description: string;
  image?: string;
  sku?: string;
};

export function productSchema(input: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image,
    sku: input.sku,
  };
}

type ServiceInput = {
  name: string;
  description: string;
  /** Cuma diisi kalau field area-nya memang ada di data sumber — jangan ditebak. */
  areaServed?: string;
};

export function serviceSchema(input: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(input.areaServed ? { areaServed: input.areaServed } : {}),
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
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
