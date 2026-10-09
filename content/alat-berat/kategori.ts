export type KategoriAlat = {
  slug: string;
  nama: string;
  /** Kosong kalau sumber tidak punya deskripsi spesifik per kategori (CONTENT-SOURCE.md §5). */
  deskripsi?: string;
  gambar?: string;
};

// Sumber: CONTENT-SOURCE.md §5 (rentalalatberatpalembang.com). Jumlah unit per
// kategori dihitung dari content/alat-berat/unit.ts, bukan field statis di sini.
export const kategoriAlatList: KategoriAlat[] = [
  {
    slug: "excavator",
    nama: "Excavator",
    deskripsi: "23 unit terdaftar dari merek Kobelco, Komatsu, Hitachi, Caterpillar, dan Kubota.",
  },
  { slug: "bulldozer", nama: "Bulldozer" },
  { slug: "forklift", nama: "Forklift" },
  { slug: "motor-grader", nama: "Motor Grader" },
  { slug: "vibro", nama: "Vibro" },
  { slug: "wheel-loader", nama: "Wheel Loader" },
  { slug: "dump-truck", nama: "Dump Truck" },
  { slug: "compressor", nama: "Compressor" },
  {
    slug: "pontoon",
    nama: "Pontoon",
    deskripsi: "Excavator di atas pontoon untuk pekerjaan perairan.",
  },
];
