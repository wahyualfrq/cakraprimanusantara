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
};

export function localBusinessSchema(input: LocalBusinessInput) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: input.name,
    address: input.address,
    telephone: input.telephone,
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
