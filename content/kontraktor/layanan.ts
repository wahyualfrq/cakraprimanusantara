export type PoinLayanan = {
  label: string;
  penjelasan: string;
};

export type Layanan = {
  slug: string;
  nama: string;
  kategori: "civil" | "building" | "concrete-repair" | "mechanical-electrical" | "chipping";
  /**
   * Kalimat pertama dari `intro`, disalin persis — dipakai di baris indeks
   * landing /kontraktor dan sebagai meta description (CONTENT-VERBATIM.md
   * §A1: "Kalimat satu baris di indeks layanan = kalimat pertama dari teks
   * tiap layanan, disalin persis").
   */
  kalimatIndeks: string;
  /** Paragraf pembuka, verbatim. */
  intro: string;
  /** Verbatim. */
  subjudul: string;
  /** Paragraf transisi sebelum daftar poin, verbatim. */
  pengantarPoin: string;
  poinUtama: PoinLayanan[];
  /** Paragraf penutup, verbatim. */
  penutup: string;
  gambar?: string;
  /** Jumlah foto di sumber — kosong = satu ContentImage saja, bukan galeri. */
  jumlahFotoSumber?: number;
  /** ID video YouTube kalau ada di sumber — kosong, LiteYouTube tidak render apa pun. */
  videoId?: string;
};

// Sumber: CONTENT-VERBATIM.md §A (cakraindopratamagroup.co.id). Teks disalin
// persis kata per kata (aturan B.4) — termasuk kata klise ("terintegrasi",
// "profesional") yang sengaja BELUM dipoles (pemolesan tahap terpisah).
// Tanda *kata* = italic di sumber, dirender lewat lib/text.tsx
// renderInlineEmphasis(). `gambar` kosong di semua entri — belum ada URL
// Vercel Blob, lihat GAP-REPORT.md.
export const layananList: Layanan[] = [
  {
    slug: "civil-project",
    nama: "Civil Project",
    kategori: "civil",
    kalimatIndeks:
      "Kami menyediakan solusi komprehensif untuk berbagai kebutuhan proyek sipil, mulai dari perencanaan hingga tahap eksekusi.",
    intro:
      "Kami menyediakan solusi komprehensif untuk berbagai kebutuhan proyek sipil, mulai dari perencanaan hingga tahap eksekusi. Dengan fokus pada kualitas konstruksi dan ketepatan teknis, kami berkomitmen untuk mewujudkan struktur yang aman, fungsional, dan memiliki durabilitas tinggi untuk mendukung kebutuhan bisnis maupun infrastruktur Anda.",
    subjudul: "Solusi Konstruksi Terintegrasi",
    pengantarPoin:
      "Setiap proyek sipil memiliki kompleksitasnya sendiri. Kami menawarkan pendekatan terstruktur untuk memastikan seluruh tahapan pengerjaan memenuhi standar kualitas yang ketat, meliputi:",
    poinUtama: [
      {
        label: "Perencanaan dan Konsultasi Teknis",
        penjelasan:
          "Memberikan analisis mendalam terhadap kebutuhan struktural proyek untuk memastikan efisiensi dan keamanan jangka panjang.",
      },
      {
        label: "Pengerjaan Struktur Berkualitas",
        penjelasan:
          "Melibatkan tim berpengalaman yang mengutamakan ketelitian dalam penggunaan material dan metode konstruksi terkini.",
      },
      {
        label: "Manajemen Proyek yang Efisien",
        penjelasan:
          "Melakukan pengawasan ketat terhadap progres pekerjaan guna memastikan ketepatan waktu penyelesaian sesuai dengan jadwal yang telah ditentukan.",
      },
    ],
    penutup:
      "Kami percaya bahwa hasil akhir yang solid adalah fondasi bagi keberlanjutan operasional Anda. Dengan pengalaman dan dedikasi pada pekerjaan sipil, kami siap bermitra untuk memberikan solusi konstruksi yang dapat diandalkan dan berstandar profesional.",
  },
  {
    slug: "building-project",
    nama: "Building Project",
    kategori: "building",
    kalimatIndeks:
      "Kami menyediakan solusi komprehensif untuk berbagai kebutuhan pembangunan gedung dan fasilitas, mulai dari perencanaan arsitektural hingga tahap penyelesaian akhir.",
    intro:
      "Kami menyediakan solusi komprehensif untuk berbagai kebutuhan pembangunan gedung dan fasilitas, mulai dari perencanaan arsitektural hingga tahap penyelesaian akhir. Dengan fokus pada kenyamanan, fungsionalitas, dan estetika, kami berkomitmen untuk mewujudkan bangunan yang aman, efisien, dan memiliki standar kualitas tinggi untuk mendukung produktivitas serta operasional bisnis Anda.",
    subjudul: "Solusi Konstruksi Bangunan Terintegrasi",
    pengantarPoin:
      "Setiap proyek pembangunan memiliki karakteristik unik yang memerlukan perhatian khusus. Kami menawarkan pendekatan terstruktur untuk memastikan seluruh tahapan pengerjaan memenuhi standar kualitas yang ketat, meliputi:",
    poinUtama: [
      {
        label: "Perencanaan dan Konsultasi Bangunan",
        penjelasan:
          "Memberikan analisis mendalam terhadap kebutuhan ruang dan spesifikasi teknis untuk memastikan bangunan yang efisien, aman, dan fungsional.",
      },
      {
        label: "Konstruksi Gedung dan Fasilitas",
        penjelasan:
          "Melibatkan tim berpengalaman yang mengutamakan ketelitian dalam penggunaan material dan metode konstruksi terkini, mulai dari struktur utama hingga *finishing*.",
      },
      {
        label: "Manajemen Proyek yang Efisien",
        penjelasan:
          "Melakukan pengawasan ketat terhadap setiap progres pembangunan guna memastikan ketepatan waktu penyelesaian sesuai dengan jadwal yang telah ditentukan.",
      },
    ],
    penutup:
      "Kami percaya bahwa bangunan yang dirancang dan dibangun dengan baik adalah aset strategis bagi bisnis Anda. Dengan pengalaman dan dedikasi pada pekerjaan konstruksi, kami siap bermitra untuk memberikan solusi bangunan yang andal, nyaman, dan berstandar profesional.",
  },
  {
    slug: "concrete-repair",
    nama: "Concrete Repair",
    kategori: "concrete-repair",
    kalimatIndeks:
      "Struktur beton yang mengalami kerusakan, retak, atau penurunan kualitas memerlukan penanganan yang tepat dan teknis agar kekuatan serta masa pakainya tetap terjaga.",
    intro:
      "Struktur beton yang mengalami kerusakan, retak, atau penurunan kualitas memerlukan penanganan yang tepat dan teknis agar kekuatan serta masa pakainya tetap terjaga. Sebagai spesialis, kami menyediakan solusi perbaikan beton (*concrete repair*) yang komprehensif untuk berbagai kebutuhan industri dan komersial.",
    subjudul: "Mengapa Memilih Layanan Kami?",
    pengantarPoin:
      "Kami mengedepankan presisi dalam setiap tahap pekerjaan, mulai dari identifikasi kerusakan hingga proses restorasi. Tim kami melakukan persiapan permukaan secara teliti menggunakan alat yang tepat untuk memastikan material perbaikan dapat melekat dengan sempurna. Pendekatan ini sangat krusial untuk:",
    poinUtama: [
      {
        label: "Mengembalikan Integritas Struktur",
        penjelasan: "Memperbaiki keretakan dan permukaan yang rusak untuk memastikan beton kembali kokoh.",
      },
      {
        label: "Meningkatkan Durabilitas",
        penjelasan: "Menggunakan material berkualitas tinggi yang tahan terhadap cuaca dan beban operasional.",
      },
      {
        label: "Pengerjaan yang Efisien",
        penjelasan:
          "Prosedur kerja yang sistematis memastikan perbaikan dilakukan dengan cepat tanpa mengabaikan aspek keselamatan dan standar kualitas yang ketat.",
      },
    ],
    penutup:
      "Kami memahami bahwa setiap proyek memiliki tantangan unik. Oleh karena itu, kami siap memberikan solusi yang disesuaikan dengan kondisi kerusakan beton Anda untuk hasil yang tahan lama dan aman bagi operasional bisnis Anda.",
    // Sumber: 8 foto (pekerjaan jetty & jembatan), belum dimigrasikan — GAP-REPORT.md.
    jumlahFotoSumber: 8,
  },
  {
    slug: "mechanical-electrical",
    nama: "Mechanical & Electrical Contractor",
    kategori: "mechanical-electrical",
    kalimatIndeks:
      "Kami menyediakan solusi komprehensif untuk kebutuhan sistem mekanikal dan elektrikal, mulai dari perencanaan teknis hingga instalasi serta pemeliharaan sistem.",
    intro:
      "Kami menyediakan solusi komprehensif untuk kebutuhan sistem mekanikal dan elektrikal, mulai dari perencanaan teknis hingga instalasi serta pemeliharaan sistem. Dengan fokus pada keandalan operasional dan efisiensi energi, kami berkomitmen untuk memastikan seluruh sistem pendukung bangunan atau industri Anda bekerja secara optimal, aman, dan tahan lama.",
    subjudul: "Solusi Sistem Terintegrasi",
    pengantarPoin:
      "Setiap sistem mekanikal dan elektrikal memerlukan presisi tinggi agar dapat mendukung produktivitas bisnis secara maksimal. Kami menawarkan pendekatan terstruktur untuk memastikan setiap tahapan pekerjaan memenuhi standar teknis yang ketat, meliputi:",
    poinUtama: [
      {
        label: "Perencanaan dan Desain Sistem",
        penjelasan:
          "Memberikan analisis mendalam terhadap kebutuhan spesifikasi teknis untuk memastikan sistem yang dirancang efisien, aman, dan sesuai dengan standar keselamatan.",
      },
      {
        label: "Instalasi dan Implementasi Profesional",
        penjelasan:
          "Melibatkan tim teknisi berpengalaman yang mengutamakan ketelitian dalam pemasangan komponen mekanikal maupun instalasi kabel dan panel elektrikal menggunakan material berkualitas.",
      },
      {
        label: "Pengujian dan Pemeliharaan",
        penjelasan:
          "Melakukan pengujian fungsional secara berkala serta pengawasan ketat terhadap kinerja sistem guna memastikan keandalan operasional jangka panjang sesuai dengan jadwal yang ditentukan.",
      },
    ],
    penutup:
      "Kami percaya bahwa sistem mekanikal dan elektrikal yang andal adalah jantung dari setiap operasional bangunan. Dengan pengalaman dan dedikasi di bidang teknik, kami siap bermitra untuk memberikan solusi instalasi yang aman, efisien, dan berstandar profesional.",
  },
  {
    slug: "chipping-kelapa-sawit",
    nama: "Chipping Kelapa Sawit",
    kategori: "chipping",
    kalimatIndeks:
      "Dalam industri pengolahan kelapa sawit, manajemen limbah dan pembersihan lahan yang efisien merupakan aspek krusial bagi keberlangsungan operasional.",
    intro:
      "Dalam industri pengolahan kelapa sawit, manajemen limbah dan pembersihan lahan yang efisien merupakan aspek krusial bagi keberlangsungan operasional. Kami menyediakan layanan *chipping* kelapa sawit yang handal untuk membantu Anda dalam proses *replanting* maupun pengelolaan sisa tanaman secara efektif dan ramah lingkungan.",
    subjudul: "Mengapa Memilih Layanan Kami?",
    pengantarPoin:
      "Kami mengombinasikan keahlian teknis dengan penggunaan mesin *chipper* yang bertenaga untuk memastikan hasil pencacahan batang sawit menjadi ukuran yang optimal. Fokus utama kami adalah memberikan solusi yang meningkatkan efisiensi kerja Anda:",
    poinUtama: [
      {
        label: "Pembersihan Lahan yang Cepat",
        penjelasan: "Mempercepat proses peremajaan tanaman (*replanting*) dengan menghancurkan batang pohon secara sistematis.",
      },
      {
        label: "Optimalisasi Dekomposisi",
        penjelasan:
          "Hasil *chipping* yang seragam membantu mempercepat proses penguraian alami batang sawit, yang pada akhirnya akan menjadi pupuk organik bermanfaat bagi tanah.",
      },
      {
        label: "Pengerjaan Standar Industri",
        penjelasan:
          "Didukung oleh operator berpengalaman yang mengutamakan prosedur keselamatan kerja serta ketepatan waktu dalam setiap proyek.",
      },
    ],
    penutup:
      "Kami siap mendukung kebutuhan operasional perkebunan Anda dengan hasil kerja yang bersih, rapi, dan sesuai dengan standar pengelolaan lahan yang baik.",
    // Sumber: 3 foto + 1 video YouTube "Chipping Buah Sawit Palembang - Sumatera
    // Selatan" (excavator Kobelco). ID video [GAP] — GAP-REPORT.md.
    jumlahFotoSumber: 3,
    videoId: undefined,
  },
];
