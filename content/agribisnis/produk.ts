export type BarisDosis = {
  fase: string;
  dosis: string;
  frekuensi?: string;
  metode?: string;
};

export type FaktaKunci = {
  label: string;
  nilai: string;
  /** true kalau angka/istilahnya [VERIFIKASI] ke client (CONTENT-SOURCE.md §7). */
  perluVerifikasi?: boolean;
};

export type DokumenProduk = {
  judul: string;
  url: string;
  tipe: "pdf" | "gambar";
};

export type Produk = {
  slug: string;
  nama: string;
  kategori: "penyubur-tanah" | "bio-pestisida" | "pupuk-npk" | "pupuk-cair" | "mikoriza" | "bio-activator";
  /** Kalimat pembuka halaman produk di web Ostindo, verbatim (CONTENT-VERBATIM.md §E2). */
  deskripsiSingkat: string;
  /** Paragraf lanjutan, verbatim (web lalu PDF). Kalimat [VERIFIKASI]/klaim absolut tidak dimasukkan. */
  deskripsiLengkap: string[];
  /** Butir daftar di halaman produk web Ostindo, verbatim. */
  poin?: string[];
  /** Kalimat pengantar daftar `poin` dari sumber, bila ada. */
  judulPoin?: string;
  gambar?: string;
  dokumen?: DokumenProduk[];
  faktaKunci?: FaktaKunci[];
  dosisAnjuran?: BarisDosis[];
  /** true kalau susunan tabel dosis di sumber masih [VERIFIKASI] — jangan render tabel sebelum dikonfirmasi. */
  dosisPerluVerifikasi?: boolean;
  /** Dosis ada di sumber tapi belum boleh ditabelkan — tampilkan catatan ini, jangan render tabel. */
  catatanDosis?: string;
  catatanPenyimpanan?: string;
  sertifikasi?: string[];
};

// Sumber teks: CONTENT-VERBATIM.md §E2 (menang atas CONTENT-SOURCE.md). Data
// terstruktur (kemasan, baris dosis Futricho): CONTENT-SOURCE.md §7. Koreksi
// typo dicatat di TYPO-LOG.md. Tidak dimasukkan sampai dikonfirmasi client:
// paragraf PDF hal. 9 Ostindo ("lebih dari 25 tahun", "terbaik di kelasnya"),
// kalimat spora "106" dan "yang terbaik" Futricho, klaim "tidak berbahaya dan
// tidak memiliki efek samping" Bless Cair, tabel dosis Bless Cair.
export const produkList: Produk[] = [
  {
    slug: "ostindo",
    nama: "Ostindo",
    kategori: "penyubur-tanah",
    gambar: "/produk/Ostindo.png",
    dokumen: [
      { judul: "Brosur Ostindo (Halaman 1)", url: "/produk/ostindo1.jpg", tipe: "gambar" },
      { judul: "Brosur Ostindo (Halaman 2)", url: "/produk/ostindo2.jpg", tipe: "gambar" },
    ],
    deskripsiSingkat:
      "OSTINDO merupakan pupuk penyubur tanah organik yang diperkaya dengan mikroba lengkap sesuai kebutuhan tanah untuk mengembalikan serta menjaga kesuburan tanah.",
    poin: [
      "Lahir dari hasil riset yang tidak mudah dan panjang sehingga dapat dipastikan efektifitasnya.",
      "Menggunakan formulasi lengkap yang sudah teruji dengan 7 jenis mikroba esensial tanah dan 2 fungi yang mampu bersimbiosis dengan tanah untuk menjaga kesuburan tanah.",
      "Dapat dikustomisasi sesuai dengan keadaan tanah yang dimiliki oleh konsumen.",
      "Menggunakan indukan mikroba yang terus diperbaharui sehingga tidak menimbulkan mutasi.",
    ],
    deskripsiLengkap: [
      // PDF hal. 6
      "OSTINDO sebagai sebuah produk pupuk yang mengkombinasikan bahan organik dengan mikroba penyubur tanah selektif dan unggul, merupakan sebuah produk bioteknologi terobosan baru dalam teknologi pemupukan. Produk ini dirancang selain memberikan tambahan bahan organik tanah dan mengandung asam organik juga dapat mengembalikan dan menjaga kesuburan tanah melalui fasilitasi pelepasan hara secara terkendali, peningkatan kehidupan mikroba tanah, pelarutan bahan organik, perbaikan pH dan aerasi tanah. Azospirillium, Aspergillus, Pseudomonas, Bacillus, Penicillium, Rhizobium, Mycorrhizha, Trichoderma, Streptomyces, dll. Ini berarti mekanisme kerja yang dilakukan oleh OSTINDO lebih dititik beratkan pada peningkatan aktivitas biologi dalam tanah untuk menuju keseimbangan lahan dan kesuburan tanah optimal.",
      "Pola keterpaduan kerja bahan organik, asam organik dan mikroba-mikroba penyubur tanah terseleksi serta perakaran tanaman didalam tanah akan mendorong suplai dan pemanfaatan hara secara optimal, efisien, efektif serta berkesinambungan, sehingga akan meningkatkan potensi pertumbuhan dan produksi tanaman pertanian/perkebunan.",
      "Secara khusus mikroba OSTINDO™ diseleksi dan diformulasi sebagai perombak bahan organik dan penyedia nutrisi dan mineral, pengikat nitrogen, penghasil hormon dan penghambat penyakit tanaman *(fitopatogen)*. Sebagian besar bakteri dan jamur terseleksi bertindak sebagai *decomposer* yang merombak bahan organik komplek menjadi bahan nutrisi dan mineral siap pakai untuk tanaman. Beberapa *decomposer* terseleksi memproduksi asam organik seperti asam humat yang penting dalam mobilisasi nutrisi dalam tanah untuk tanaman.",
      // PDF hal. 7
      "Beberapa jenis bakteri Rhizobium, Bradyrhizobium, Azotobacter dan Azospirillum diseleksi untuk dapat tepat guna mengikat nitrogen bebas, mengubahnya dan mensuplainya ke tanah dan tanaman. Selain itu ada bakteri Agrobacterium, Pseudomonas, Frankia, Azospirillum dan mikorhiza Glomus yang berperan dalam peningkatan ketersediaan unsur essensial seperti besi dan fosfor, dan membuat fitohormon untuk memacu pertumbuhan tanaman. Mikrob pelarut fosfat seperti Azospirillum, Azotobacter, Aerobacter, Bacillus, Pseudomonas dan Streptomyces, sangat berperan dalam menyediakan fosfat siap pakai bagi tanaman.",
      "Jenis bakteri Bacillus dan Pseudomonas dan kapang Trichoderma terseleksi mampu menghambat pertumbuhan mikrob fitopatogen sehingga dapat mencegahnya merusak pertumbuhan tanaman dan hasil panen nantinya. Mekanisme penghambatannya cukup menarik karena dilakukan melalui proses penghilangan sumber unsur essensial bagi mikrob patogen dan produksi serta pelepasan senyawa antibiosis yang menghambat pertumbuhan fitopatogen.",
      "Selain komposisi dalam formulasi, satu hal lagi yang penting adalah bahwa mikroba terseleksi juga dirancang untuk membawa sifat genetis yang berguna kedalam tanah. Sifat ini secara alami dapat tersebar ke populasi mikroba lainnya sehingga peran pembenahan, pembangunan dan pemeliharaan fungsi tanah lebih dinamis stabil dan tepat guna.",
    ],
    faktaKunci: [
      // Spesifikasi dari kemasan (CONTENT-VERBATIM.md §E2).
      { label: "Kemasan", nilai: "Netto 40 kg" },
      { label: "C/N ratio", nilai: "15-25" },
      { label: "pH", nilai: "6.5-7.5" },
      { label: "Kandungan Isolat Terseleksi", nilai: "Streptomyces, Azotobacter, Pseudomonas, Bacillus" },
    ],
    // Tabel "DOSIS DAN METODE PEMUPUKAN OSTINDO" (PDF hal. 9), verbatim.
    dosisAnjuran: [
      {
        fase: "Pembibitan: pre-nursery",
        dosis: "3 - 5 gram",
        frekuensi: "1 kali",
        metode: "Campur dengan media atau ditabur pada media dalam polybag.",
      },
      {
        fase: "Pembibitan: main nursery",
        dosis: "50 - 100 gram",
        frekuensi: "1 kali",
        metode: "Tugal atau ditabur pada media dalam polybag.",
      },
      {
        fase: "TBM (Tanaman Belum Menghasilkan): TBM 1",
        dosis: "200 - 300 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "ditabur di bawah tajuk tanaman",
      },
      {
        fase: "TBM 2",
        dosis: "300 - 400 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "ditabur di bawah tajuk tanaman",
      },
      {
        fase: "TBM 3",
        dosis: "400 - 500 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "ditabur di bawah tajuk tanaman",
      },
      {
        // VERIFY: sumber menulis "TBM (Tanaman Menghasilkan)"; dikoreksi ke "TM"
        // sesuai instruksi CONTENT-VERBATIM.md §E2 (TYPO-LOG.md) — konfirmasi klien.
        fase: "TM (Tanaman Menghasilkan)",
        dosis: "500 - 1000 gram/pohon",
        frekuensi: "2 kali setahun",
        metode: "ditabur di bawah tajuk tanaman",
      },
    ],
  },
  {
    slug: "futricho",
    nama: "Futricho",
    kategori: "bio-pestisida",
    gambar: "/produk/Futricho.png",
    dokumen: [
      { judul: "Brosur Futricho (PDF)", url: "/produk/futricho.pdf", tipe: "pdf" },
      { judul: "Diagram Cara Kerja Futricho", url: "/produk/cara-kerja-futricho.jpg", tipe: "gambar" },
    ],
    deskripsiSingkat:
      "Biofungisida alami Trichoderma yang berfungsi untuk mencegah penyakit jamur pada tanaman dengan merk Futricho.",
    deskripsiLengkap: [
      "Diproduksi sesuai pesanan sehingga Trichoderma yang terkandung dalam futricho merupakan Trichoderma aktif yang dapat langsung digunakan.",
      "Mengandung 2 jenis Trichoderma yang sudah diseleksi sehingga dapat digunakan bukan hanya di tanaman keras/jangka panjang namun juga tanaman hortikultura atau semusim.",
      // PDF hal. 10 — kalimat ke-1 saja; kalimat spora "106" dan "yang terbaik" menunggu konfirmasi.
      "Futricho merupakan sebuah inovasi praktis dalam dunia biofungisida. Kombinasi Trichoderma koningii dan Trichoderma harzianum dalam satu formulasi untuk melawan agen penyakit pathogen pada tanaman. Trichoderma koningii sudah lama diketahui dapat mengendalikan penyakit busuk pangkal batang pada tanaman sawit yang disebabkan oleh Ganoderma boniense sedangkan Trichoderma harzianum mencegah pertumbuhan fungi pathogen Botrytis, Sklerotium, dan Fusarium.",
    ],
    faktaKunci: [
      // VERIFY: kemasan 25 kg hanya di CONTENT-SOURCE.md §7, tidak ada di
      // CONTENT-VERBATIM.md §E2 ("25 kg" di §E2 milik Actifert) — tidak dirender.
      { label: "Kemasan", nilai: "25 kg", perluVerifikasi: true },
      { label: "Kandungan spora", nilai: "10^6 per gram", perluVerifikasi: true },
    ],
    // CONTENT-SOURCE.md §7. Pasangan label ↔ metode ↔ dosis di PDF bercampur —
    // [VERIFIKASI] CONTENT-VERBATIM.md §E2, jangan dirender sebelum dikonfirmasi.
    dosisPerluVerifikasi: true,
    dosisAnjuran: [
      {
        fase: "Kelapa sawit — Pembibitan",
        dosis: "10 gr/polybag",
        metode: "Tabur di permukaan tanah",
      },
      {
        fase: "Kelapa sawit — TBM",
        dosis: "400 gr/lubang tanam",
        metode: "Tabur di lubang tanam",
      },
      {
        fase: "Kelapa sawit — TBM (lanjutan)",
        dosis: "200 gr/tanaman/tahun selama 3 tahun",
        metode: "Tabur di pinggiran",
      },
      {
        fase: "Karet — Pembibitan, TBM",
        dosis: "10 gr/polybag; 400 gr/lubang; 200 gr/tanaman/tahun selama 3 tahun",
        metode: "Sama dengan kelapa sawit",
      },
      {
        fase: "Hortikultura",
        dosis: "25-50 kg/Ha",
        metode: "Tabur di permukaan tanah atau lubang tanam",
      },
    ],
    catatanPenyimpanan:
      "Simpan pada tempat yang kering. Tidak terkena sinar matahari langsung atau percikan air hujan. Futricho dapat bertahan sampai satu tahun setelah produksi",
  },
  {
    slug: "bless-npk",
    nama: "Bless NPK",
    kategori: "pupuk-npk",
    gambar: "/produk/npk-new.png",
    dokumen: [
      { judul: "Brosur NPK 12.6.22.3+TE", url: "/produk/brosur-npk-12-6-22-3.jpg", tipe: "gambar" },
      { judul: "Brosur NPK 16.16.16", url: "/produk/brosur-NPK-161616.jpg", tipe: "gambar" },
    ],
    deskripsiSingkat:
      'Produk pupuk NPK disesuaikan berdasarkan pesanan baik berupa NPK "Blending" maupun NPK "Compound"',
    deskripsiLengkap: [],
    // Sumber §E2: "Jenis yang telah dipasarkan (klik untuk lihat brosur) :" —
    // instruksi "(klik untuk lihat brosur)" dilepas karena file brosur [GAP].
    judulPoin: "Jenis yang telah dipasarkan",
    // Komposisi "+TE" [VERIFIKASI] (GAP-REPORT.md §8.3).
    poin: ["NPK 12.6.22.3+TE", "NPK 12.12.17.2+TE", "NPK 15.15.6.4", "NPK 16.16.16"],
    faktaKunci: [{ label: "Kemasan", nilai: "50 kg", perluVerifikasi: true }],
    // Verbatim CONTENT-VERBATIM.md §E2 (milestone PDF 2010).
    sertifikasi: ["Pupuk NPK BLESS memperoleh sertifikat SNI"],
  },
  {
    slug: "bless-cair",
    nama: "Bless Cair",
    kategori: "pupuk-cair",
    gambar: "/produk/bless-cair-cut-bg.jpg",
    dokumen: [
      { judul: "Brosur Bless Cair (PDF)", url: "/produk/brosurblesscair.pdf", tipe: "pdf" },
    ],
    deskripsiSingkat:
      "Pupuk organik cair Bless adalah suatu konsep penyubur tanah dan tanaman secara alami yang terdiri dari 100% organik hayati mengandung unsur hara Makro (C, N, P, K) dan Mikro (Cu, Co, Fe, Mn, Mo, Zn), zat pengatur Tumbuh dan mikroba tanah terseleksi.",
    poin: [
      "Meningkatkan produktivitas tanaman.",
      "Memperbaiki sifat fisik, kimia, dan biologis tanah.",
      "Meningkatkan penetrasi tanah.",
    ],
    deskripsiLengkap: [
      // PDF hal. 11 — kalimat "tidak berbahaya dan tidak memiliki efek samping" tidak dimasukkan.
      "Pupuk organik cair Bless adalah suatu konsep penyubur tanah dan tanaman secara alami yang terdiri dari 100% organik hayati mengandung unsur hara makro C,N,P,K dan mikro (Cu,Co,Fe,Mn,Mo,Zn) zat pengatur tumbuhan dan mikroba tanah terseleksi seperti Azospirillum, Azotobacter, Pseudomonas, Bacillus dan Bakteri penambat fosfat.",
      "Mikroba tanah dan hormon pengatur tumbuhan sangat berguna untuk mempercepat kemunculan akar, peningkatan jumlah akar, meningkatkan kesuburan tanah, mempercepat penguraian unsur hara bagi tanaman dan percepatan pertumbuhan tanaman.",
      "Mengurangi penggunaan pupuk kimia mengurangi serangan hama, tanaman menjadi lebih tahan terhadap penyakit.",
    ],
    // Kalimat yang ditetapkan CONTENT-VERBATIM.md §E2 sampai satuan "Dosis 9ml/lt/air" dikonfirmasi.
    catatanDosis: "Dosis tersedia pada brosur.",
  },
  {
    slug: "rizafert",
    nama: "Rizafert",
    kategori: "mikoriza",
    gambar: "/produk/Rizafert.png",
    deskripsiSingkat: "Perangsang akar dengan menggunakan Mycorrhiza dengan merk Rizafert.",
    poin: [
      "Mycorrhiza aktif yang dapat terlihat dengan kasat mata sehingga dapat dipertanggungjawabkan kualitasnya.",
      "Sudah teruji dan terbukti digunakan dalam beberapa pembibitan di konsumen.",
    ],
    deskripsiLengkap: [
      // PDF hal. 11 (ejaan merek mengikuti kemasan: Rizafert).
      "Rizafert merupakan pupuk yg mengandung mikoriza arbuskular terseleksi yg bersimbiosis alami dengan akar tanaman.",
      "Diproduksi dengan proses alami terstandarisasi sehingga memungkinkan jumlah spora yang terkandung mencapai 60 spora per gram.",
      "Berfungsi untuk meningkatkan pertumbuhan tanaman dan meningkatkan ketahanan tanaman terhadap serangan penyakit di akar.",
      "Meningkatkan kemampuan tanaman dalam menyerap unsur hara yang ada di dalam tanah terutama P,Ca,N,Cu,Mn,K, dan Mg selain itu juga menghasilkan zat pengatur tumbuh yang berguna dalam meningkatkan ketahanan tanaman terhadap stress.",
      "Rizafert memberikan nilai tambah dalam proses pemupukan.",
    ],
    faktaKunci: [{ label: "Jumlah spora", nilai: "Mencapai 60 spora per gram" }],
  },
  {
    slug: "actifert",
    nama: "Actifert",
    kategori: "bio-activator",
    gambar: "/produk/activert.jpg",
    deskripsiSingkat: "Merupakan suatu produk Bio Activator.",
    deskripsiLengkap: [
      "Merupakan suatu produk Bio Activator. Actifert mengandung unsur hara makro/mikro yang seimbang dalam bentuk yang tersedia untuk penyerapan mikroba didalamnya. Produk ini bekerja dengan cara meningkatkan perpindahan oksigen terlarut dan mempercepat degradasi dengan cara mempercepat proses pembusukan. Actifert mengandung campuran nutrisi dan mikroba terseleksi, campuran ini proporsional dengan kebutuhan biologis tanaman.",
    ],
    faktaKunci: [{ label: "Kemasan", nilai: "25 kg", perluVerifikasi: true }],
  },
];

// Label kategori untuk UI (tag hero, karusel, indeks produk) — frasa sumber, bukan
// istilah baru: Ostindo "pupuk penyubur tanah" (§E2), "Biofungisida" (§E1/§E2 Futricho),
// "Pupuk NPK" (judul sumber §E2), "Pupuk Organik Cair" (§E1/§E2 Bless), "pupuk hayati
// (mycorrhyza …)" (§E1, PDF hal. 3), "produk Bio Activator" (§E2 Actifert).
export const kategoriLabel: Record<Produk["kategori"], string> = {
  "penyubur-tanah": "Penyubur Tanah",
  "bio-pestisida": "Biofungisida",
  "pupuk-npk": "Pupuk NPK",
  "pupuk-cair": "Pupuk Organik Cair",
  mikoriza: "Pupuk Hayati",
  "bio-activator": "Bio Activator",
};
