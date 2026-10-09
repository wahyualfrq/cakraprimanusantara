export type MitraRiset = {
  slug: string;
  nama: string;
  jenis: string;
  lokasi?: string;
  /** String, bukan number — beberapa sumber berupa rentang tahun ("2000-2004"). */
  tahun?: string;
  deskripsi?: string;
  /** true — tahun dibaca dari screenshot web lama, [VERIFIKASI] ke client (CONTENT-SOURCE.md §7). */
  perluVerifikasi?: boolean;
  logo?: string;
};

// Sumber: CONTENT-SOURCE.md §7 (web ostindo.co.id, tahun dari screenshot —
// semua [VERIFIKASI]). IPB dan Balai Penelitian Tanaman Jagung Serealia Maros
// cuma disebut di PDF, bukan di web — tahun tidak ada, ditandai terpisah.
export const mitraRisetList: MitraRiset[] = [
  {
    slug: "lipi-bogor",
    nama: "Pusat Penelitian Biologi LIPI",
    jenis: "Lembaga Riset Nasional",
    lokasi: "Bogor",
    tahun: "2007",
    perluVerifikasi: true,
  },
  {
    slug: "ppks-medan",
    nama: "PPKS (Pusat Penelitian Kelapa Sawit)",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Medan, Sumatera Utara",
    tahun: "2000-2004",
    perluVerifikasi: true,
  },
  {
    slug: "puslit-kopi-kakao-jember",
    nama: "Pusat Penelitian Kopi dan Kakao",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Jember",
    tahun: "2008-2010",
    perluVerifikasi: true,
  },
  {
    slug: "puslit-karet-medan",
    nama: "Pusat Penelitian Karet",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Medan",
    tahun: "2002-2004",
    perluVerifikasi: true,
  },
  {
    slug: "p3gi-pasuruan",
    nama: "P3GI (Pusat Penelitian Perkebunan Gula Indonesia)",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Pasuruan",
    tahun: "2004",
    perluVerifikasi: true,
  },
  {
    slug: "puslitbang-perkebunan-bogor",
    nama: "Pusat Penelitian dan Pengembangan Perkebunan",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Bogor",
    tahun: "2007",
    perluVerifikasi: true,
  },
  {
    slug: "pusat-agronomi-rni-cirebon",
    nama: "Pusat Agronomi RNI",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Cirebon",
    tahun: "2008",
    perluVerifikasi: true,
  },
  {
    slug: "puslitbang-perhutani-cepu",
    nama: "Pusat Penelitian dan Pengembangan Perhutani",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Cepu",
    tahun: "2008",
    perluVerifikasi: true,
  },
  {
    slug: "puslit-tanah-agroklimat-bogor",
    nama: "Pusat Penelitian Tanah dan Agroklimat",
    jenis: "Pusat Penelitian Komoditas",
    lokasi: "Bogor",
    tahun: "2002",
    perluVerifikasi: true,
  },
  {
    slug: "balitbu-solok",
    nama: "Balai Penelitian Tanaman Buah",
    jenis: "Balai Penelitian",
    lokasi: "Solok",
    tahun: "2000",
    perluVerifikasi: true,
  },
  {
    slug: "balitpa-sukamandi",
    nama: "Balai Penelitian Tanaman Padi",
    jenis: "Balai Penelitian",
    lokasi: "Sukamandi",
    tahun: "1999",
    perluVerifikasi: true,
  },
  {
    slug: "balittro-bogor",
    nama: "Balai Penelitian Tanaman Rempah dan Obat",
    jenis: "Balai Penelitian",
    lokasi: "Bogor",
    tahun: "1999",
    perluVerifikasi: true,
  },
  {
    slug: "mine-reforestation-inco-vale-sulsel",
    nama: "Mine Reforestation Improvement Research — PT Inco/Vale",
    jenis: "Riset Industri Tambang",
    lokasi: "Sulawesi Selatan",
    tahun: "2003",
    perluVerifikasi: true,
  },
  {
    slug: "dinas-pertanian-daerah",
    nama: "Dinas Pertanian Daerah",
    jenis: "Instansi Pemerintah Daerah",
    lokasi: "Magelang, Karawang, Malang, Karo, Tulangbawang, Cirebon, Majalengka, NTT, NTB",
    tahun: "1997-2002",
    deskripsi: "Beberapa dinas pertanian daerah, disebut sebagai satu kelompok di sumber.",
    perluVerifikasi: true,
  },
  {
    slug: "ipb",
    nama: "IPB (Institut Pertanian Bogor)",
    jenis: "Perguruan Tinggi",
    deskripsi: "Disebut di PDF Company Profile saja, tidak ada di web — tahun kerja sama tidak tercantum.",
  },
  {
    slug: "balit-jagung-serealia-maros",
    nama: "Balai Penelitian Tanaman Jagung dan Serealia",
    jenis: "Balai Penelitian",
    lokasi: "Maros",
    deskripsi: "Disebut di PDF Company Profile saja, tidak ada di web — tahun kerja sama tidak tercantum.",
  },
];
