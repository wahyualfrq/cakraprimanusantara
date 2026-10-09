export type UnitAlat = {
  slug: string;
  nama: string;
  kategoriSlug: string;
  brand: string;
  /** true kalau brand disimpulkan dari pola penamaan, bukan tertulis eksplisit di sumber. */
  brandPerluVerifikasi?: boolean;
  /** Kosong kalau spesifikasi tidak terbaca jelas dari sumber — jangan ditebak (CONTENT-SOURCE.md §5). */
  spesifikasi?: string;
  gambar?: string;
  tipe: "sewa" | "penjualan";
};

// Sumber: CONTENT-SOURCE.md §5 (rentalalatberatpalembang.com), daftar Excavator
// (23 entri). Ejaan & spesifikasi semua entri [VERIFIKASI] ke sumber kecuali
// SK 50F-6 (satu-satunya spesifikasi terbaca jelas). Kategori lain (Bulldozer,
// Forklift, Motor Grader, Vibro, Wheel Loader, Dump Truck, Compressor) dan
// Pontoon: daftar unit individual [GAP], tidak diisi — lihat GAP-REPORT.md.
export const unitAlatList: UnitAlat[] = [
  {
    slug: "sk-50f-6-kobelco",
    nama: "SK 50F-6 Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    spesifikasi: "Flywheel 29,6 HP, operating weight 4.720 kg, bucket 0,13 m³.",
    tipe: "sewa",
  },
  {
    slug: "sk-130-hdl-kobelco",
    nama: "SK 130 HDL Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "pc-130-f-7-komatsu",
    nama: "PC 130 F-7 Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "pc-200-8-komatsu",
    nama: "PC 200-8 Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "pc-200-8-grapple-komatsu",
    nama: "PC 200-8 Grapple Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "sk-200-10-hdl-kobelco",
    nama: "SK 200-10 HDL Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "sk-200-8-geospec-grapple-kobelco",
    nama: "SK 200-8 Geospec Grapple Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "zaxis-210-f-5g-hitachi",
    nama: "Zaxis 210 F-5G Hitachi",
    kategoriSlug: "excavator",
    brand: "Hitachi",
    tipe: "sewa",
  },
  {
    slug: "zaxis-210-mf-breaker-hitachi",
    nama: "Zaxis 210 MF Breaker Hitachi",
    kategoriSlug: "excavator",
    brand: "Hitachi",
    tipe: "sewa",
  },
  {
    slug: "zaxis-210-lc-5g-long-arm-hitachi",
    nama: "Zaxis 210 LC-5G Long Arm Hitachi",
    kategoriSlug: "excavator",
    brand: "Hitachi",
    tipe: "sewa",
  },
  {
    slug: "pc-300-8-lc-hicab-grapple-komatsu",
    nama: "PC 300-8 LC Hicab Grapple Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "pc-300-8-bucket-komatsu",
    nama: "PC 300-8 Bucket Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "sk-350-lc-8-korea-geospec-super-x-kobelco",
    nama: "SK 350 LC-8 Korea Geospec/Super X Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "pc-400-lc-8r-komatsu",
    nama: "PC 400 LC-8R Komatsu",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "pc-200-7-komatsu-galeo",
    nama: "PC 200-7 Komatsu Galeo",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    tipe: "sewa",
  },
  {
    slug: "hitachi-zaxis-210-mf",
    nama: "Hitachi Zaxis 210 MF",
    kategoriSlug: "excavator",
    brand: "Hitachi",
    tipe: "sewa",
  },
  {
    slug: "320-d-caterpillar",
    nama: "320 D Caterpillar",
    kategoriSlug: "excavator",
    brand: "Caterpillar",
    tipe: "sewa",
  },
  {
    slug: "pc-300-7",
    nama: "PC 300-7",
    kategoriSlug: "excavator",
    brand: "Komatsu",
    brandPerluVerifikasi: true,
    tipe: "sewa",
  },
  {
    slug: "sk-480-lc-kobelco",
    nama: "SK 480 LC Kobelco",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "kobelco-seri-belum-terverifikasi-1",
    nama: "Kobelco (seri belum terverifikasi)",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "hitachi-zaxis-210-lc",
    nama: "Hitachi Zaxis 210 LC",
    kategoriSlug: "excavator",
    brand: "Hitachi",
    tipe: "sewa",
  },
  {
    slug: "kobelco-seri-belum-terverifikasi-2",
    nama: "Kobelco (seri belum terverifikasi)",
    kategoriSlug: "excavator",
    brand: "Kobelco",
    tipe: "sewa",
  },
  {
    slug: "kubota-u50-5s",
    nama: "Kubota U50-5S",
    kategoriSlug: "excavator",
    brand: "Kubota",
    tipe: "sewa",
  },
];
