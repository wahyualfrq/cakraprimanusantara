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

export type BagianNarasiRiset = {
  judul: string;
  paragraf: string[];
};

// Narasi halaman Riset & Inovasi web Ostindo, verbatim (CONTENT-VERBATIM.md §E3),
// urutan sumber. Paragraf terakhir bagian "Kerjasama Penelitian dan
// Pengembangan" ditutup "antara lain :" — di sumber diikuti daftar lembaga
// (lihat mitraRisetList; rekonsiliasi 17 entri vs 23 baris sumber masih
// [VERIFIKASI]). Koreksi typo: TYPO-LOG.md.
export const narasiRisetList: BagianNarasiRiset[] = [
  {
    judul: "Ostindo",
    paragraf: [
      "OSTINDO merupakan suatu produk penyubur tanah hayati dengan formula unggulan yang mengkombinasikan bahan organik berkualitas dengan mikroba terseleksi sehingga berperan dalam meningkatkan kehidupan tanah secara alami melalui proses biologi tanah. OSTINDO mengandung 100% bahan organik yang terdiri atas mikroorganisme (Azotobacter, Azospirillum, Rhizobium, Trichoderma, Aspergillus, dll), humus konsentrat, enzim, protein, tepung fosil, dan mineral alami.",
      "OSTINDO berperan dalam memperbaiki dan meningkatkan kesuburan tanah secara alami karena mengandung bahan-bahan yang bersifat organik, mikroba tanah, humus konsentrat, enzim, protein dan tepung fosil serta unsur hara makro (N, P, K, Mg, S, Ca) dan mikro (Mn, Fe, Cu, Zn), serta asam humat.",
      "OSTINDO tidak hanya sekedar menstimulasi proses biologis di dalam tanah untuk menghasilkan mineral tetapi juga meningkatkan agregat tanah dan membuat lapisan topsoil menjadi lebih stabil. Memperbaiki aerasi pada tanah sehingga penggunaan pupuk lebih efisien.",
    ],
  },
  {
    judul: "Ostindo Dan Penggunaannya Dalam Pengelolaan Perkebunan",
    paragraf: [
      "OSTINDO sebagai sebuah produk penyubur tanah yang mengkombinasikan bahan organik dengan mikroba Penyubur Tanah Selektif dan Unggul, merupakan suatu produk terobosan baru dalam teknologi pemupukan. Produk ini dirancang selain memberikan tambahan bahan organik tanah dan mengandung asam organik, yang dapat mengembalikan dan menjaga kesuburan tanah melalui fasilitas pelepasan hara secara terkendali. Peningkatan kehidupan mikroba tanah, Pelarutan bahan anorganik, perbaikan pH dan aerasi tanah.",
      "Sejalan dengan upaya sosialisasi dan implementasi penggunaan OSTINDO dalam pengelolaan perkebunan, sejumlah penelitian dan kajian manfaat OSTINDO telah dilakukan oleh Lembaga-lembaga Penelitian Nasional antara lain : PPKS Medan (Kelapa Sawit), Puslit Karet Medan (Karet), P3GI Pasuruan (Gula), Puslit Koka (Kopi-Kakao), LPT Tanah Bogor dan LIPI (Mikroba) sejak tahun 1999-2008 dengan hasil yang sangat baik sehingga pada akhirnya produk OSTINDO secara luas pula telah dipergunakan oleh perkebunan-perkebunan besar termasuk pada Perkebunan dilingkungan PT. Perkebunan Nusantara (PTPN I, PTPN III, PTPN IV, PTPN V, PTPN VI, PTPN VII, PTPN VIII, PTPN IX, PTPN X dan PTPN XIII), pada komoditas-komoditas Kelapa Sawit, Karet dan tebu sejak tahun 2000-sekarang.",
    ],
  },
  {
    judul: "Kerjasama Penelitian dan Pengembangan",
    paragraf: [
      "Sebagai produk yang mempunyai nilai tambah spesifik dan mengutamakan kualitas, penyubur tanah OSTINDO telah melalui serangkaian pengujian dengan berbagai lembaga penelitian, Ujicoba dilakukan dengan evaluasi secara berkelanjutan. Untuk menjamin akurasi data pengamatan lapang (baik vegetatif maupun generatif) yang diperoleh tersebut ditunjang dengan data-data analisa tanah, daun dari lembaga penelitian yang bersangkutan.",
      "Kerjasama penelitian dilakukan dengan berbagai institusi/lembaga penelitian terkemuka pada berbagai komoditas pertanian/perkebunan dan kehutanan secara komprehensif, antara lain :",
    ],
  },
];
