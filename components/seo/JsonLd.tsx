/**
 * Penyisip <script type="application/ld+json"> — dipakai bareng helper di
 * lib/seo/structured-data.ts (STRUCTURE.md §6.2). Satu komponen bisa
 * menerima satu objek schema atau array (misal Organization + BreadcrumbList
 * di halaman yang sama).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
