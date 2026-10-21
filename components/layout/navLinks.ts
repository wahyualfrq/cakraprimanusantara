// Menu utama mengikuti struktur situs resmi Ostindo (PRD.md §6.2): Tentang Kami,
// Produk, Riset & Inovasi, Berita — "Hubungi Kami" tampil sebagai tombol CTA
// terpisah. Satu sumber untuk Navbar, MobileNav, Footer, dan halaman 404.
// Path /agribisnis/* masih sementara sampai keputusan URL final (PRD.md §9 poin 1).
export const navLinks = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Produk", href: "/agribisnis/produk" },
  { label: "Riset & Inovasi", href: "/agribisnis/riset-inovasi" },
  { label: "Berita", href: "/berita" },
];

export const kontakLink = { label: "Hubungi Kami", href: "/kontak" };

/**
 * aria-current untuk item navigasi: "page" bila URL persis sama, "true" bila
 * URL berada di bawah item itu (mis. detail produk di bawah "Produk").
 */
export function ariaCurrentFor(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  if (pathname.startsWith(`${href}/`)) return "true";
  return undefined;
}
