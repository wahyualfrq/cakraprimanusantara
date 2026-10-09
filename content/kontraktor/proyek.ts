export type KategoriProyek =
  | "chipping"
  | "pekerjaan-tanah-jalan"
  | "bangunan"
  | "concrete-repair"
  | "mekanikal"
  | "alat-berat"
  | "sipil";

export type Proyek = {
  slug: string;
  judul: string;
  kategori: KategoriProyek;
  /** true kalau pemetaan kategori masih usulan, belum dikonfirmasi client (CONTENT-SOURCE.md §4). */
  kategoriPerluVerifikasi?: boolean;
  klien?: string;
  lokasi?: string;
  gambar?: string;
  ringkasan?: string;
};

// Sumber: CONTENT-SOURCE.md §4 (halaman "Pengalaman Kami", 23 proyek).
// Kategori adalah usulan pemetaan dari judul. Deskripsi/tahun/nilai proyek/
// jumlah foto: [GAP], tidak diisi. klien/lokasi hanya diisi kalau tertulis
// eksplisit di judul. `gambar` kosong — belum ada URL Vercel Blob.
export const proyekList: Proyek[] = [
  {
    slug: "tumbang-chipping-perdana-kud-permata-bunda",
    judul: "Tumbang Chipping Perdana KUD Permata Bunda",
    kategori: "chipping",
    klien: "KUD Permata Bunda",
  },
  {
    slug: "hvc-kebun-tanjung-sari-sampoerna",
    judul: "HVC Kebun Tanjung Sari PT. Sampoerna",
    kategori: "pekerjaan-tanah-jalan",
    klien: "PT. Sampoerna",
    lokasi: "Kebun Tanjung Sari",
  },
  {
    slug: "mess-eksekutif-pt-tania-selatan",
    judul: "Pekerjaan Mess Eksekutif di PT Tania Selatan",
    kategori: "bangunan",
    klien: "PT Tania Selatan",
  },
  {
    slug: "renovasi-rumah-g1-g10-bcp-kebun-sukamulya",
    judul: "Renovasi Rumah Type G1 Staff & G10 di PT. BCP Kebun Sukamulya",
    kategori: "bangunan",
    klien: "PT. BCP",
    lokasi: "Kebun Sukamulya",
  },
  {
    slug: "peninggian-tanggul-jalan-sampoerna-kebun-sepucuk",
    judul: "Peninggian Tanggul & Pengerasan Jalan di PT. Sampoerna Kebun Sepucuk",
    kategori: "pekerjaan-tanah-jalan",
    klien: "PT. Sampoerna",
    lokasi: "Kebun Sepucuk",
  },
  {
    slug: "pembentukan-penimbunan-jalan-alternatif-sinar-alam-permai",
    judul: "Pekerjaan Pembentukan & Penimbunan Badan Jalan Alternatif PT. Sinar Alam Permai",
    kategori: "pekerjaan-tanah-jalan",
    klien: "PT. Sinar Alam Permai",
  },
  {
    slug: "pemasangan-anchor-chemical-fender-ban",
    judul: "Pemasangan Anchor Chemical & Fender Ban",
    kategori: "concrete-repair",
  },
  {
    slug: "repair-grouting-injeksi-crack-master-emaco",
    judul: "Pekerjaan Repair Grouting & Injeksi Crack Material Master Emaco",
    kategori: "concrete-repair",
  },
  {
    slug: "grouting-material-masterflow",
    judul: "Pekerjaan Grouting Material Masterflow",
    kategori: "concrete-repair",
  },
  {
    slug: "perbaikan-jetty-tarahan-lampung",
    judul: "Pekerjaan Perbaikan Jetty Tarahan Lampung",
    kategori: "concrete-repair",
    lokasi: "Tarahan, Lampung",
  },
  {
    slug: "perbaikan-jembatan-keramasan",
    judul: "Pekerjaan Perbaikan Jembatan Keramasan",
    kategori: "concrete-repair",
    lokasi: "Keramasan",
  },
  {
    slug: "metal-coating-boiler-pln",
    judul: "Pekerjaan Metal Coating Boiler PLN",
    kategori: "mekanikal",
    klien: "PLN",
  },
  {
    slug: "bongkar-muat-kayu-sumatera-prima-fiberboard",
    judul: "Bongkar Muat Kayu di PT. Sumatera Prima Fiberboard",
    kategori: "alat-berat",
    klien: "PT. Sumatera Prima Fiberboard",
  },
  {
    slug: "pekerjaan-tanah-badan-jalan-zona-4-indralaya",
    judul: "Pekerjaan Tanah Badan Jalan Zona 4 Indralaya",
    kategori: "pekerjaan-tanah-jalan",
    lokasi: "Indralaya",
  },
  {
    slug: "penumbangan-sawit-stacking-chipping-tania-selatan",
    judul: "Penumbangan Pohon Kelapa Sawit, Stacking dan Chipping PT. Tania Selatan",
    kategori: "chipping",
    klien: "PT. Tania Selatan",
  },
  {
    slug: "perbaikan-jalan-sungai-sinar-alam-permai",
    judul: "Pekerjaan Perbaikan Jalan Sungai PT. Sinar Alam Permai",
    kategori: "pekerjaan-tanah-jalan",
    klien: "PT. Sinar Alam Permai",
  },
  {
    slug: "proyek-pt-bukit-asam",
    judul: "Pekerjaan Proyek PT. Bukit Asam",
    kategori: "pekerjaan-tanah-jalan",
    kategoriPerluVerifikasi: true,
    klien: "PT. Bukit Asam",
  },
  {
    slug: "smo-construction-service-work-pp-persero",
    judul: "Pekerjaan SMO Construction Service Work PT. PP Persero",
    kategori: "bangunan",
    kategoriPerluVerifikasi: true,
    klien: "PT. PP Persero",
  },
  {
    slug: "pembangunan-ipal-kebun-burnai-timur",
    judul: "Pembangunan IPAL Kebun Burnai Timur",
    kategori: "sipil",
    lokasi: "Kebun Burnai Timur",
  },
  {
    slug: "concrete-alternative-road",
    judul: "Project of Concrete Alternative Road",
    kategori: "pekerjaan-tanah-jalan",
  },
  {
    slug: "repair-overlay-new-concrete-pavement",
    judul: "Repair & Overlay New Concrete Pavement",
    kategori: "concrete-repair",
  },
  {
    slug: "tanah-oprit-overpass-sta-jalan-tol",
    judul: "Pekerjaan Tanah Oprit Overpass STA Proyek Jalan Tol",
    kategori: "pekerjaan-tanah-jalan",
  },
  {
    slug: "ipal-kebun-tania-selatan-burnai-bambu-kuning",
    judul:
      "Pekerjaan IPAL di Kebun PT. Tania Selatan Kebun Burnai Timur, Burnai Barat & Bambu Kuning",
    kategori: "sipil",
    klien: "PT. Tania Selatan",
    lokasi: "Kebun Burnai Timur, Burnai Barat & Bambu Kuning",
  },
];
