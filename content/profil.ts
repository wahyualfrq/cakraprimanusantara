// Profil PT Anugerah Mustika Ostindo — satu sumber untuk Beranda, Tentang
// Kami, dan Footer. Teks verbatim dari CONTENT-VERBATIM.md (§E1, §G2–§G7,
// §H1); koreksi typo dicatat di TYPO-LOG.md. Jangan menambah kalimat
// deskriptif tanpa sumber (aturan CONTENT-VERBATIM.md #3).

export type NilaiPerusahaan = {
  label: string;
  deskripsi: string;
};

export const profil = {
  nama: "PT Anugerah Mustika Ostindo",

  // §E1 — profil perusahaan (web, halaman Tentang Kami).
  berdiri: {
    teks: "Juli 1995, dengan Akta Pendirian : No. 361 Tanggal 31 Juli 1995",
    tanggal: "1995-07-31",
  },
  kedudukan: {
    kantor: "Kompleks Bojong Indah Jl Pakis Raya 88 B Jakarta Barat",
    pabrik: "Waru Doyong No.59 Jl Raya Balaraja-Serang Km 35, Jayanti Kab. Tangerang – Banten",
  },

  // §E1 — filosofi, ditulis tebal di narasi web.
  filosofi: "Membangun Tanpa Merusak, Tumbuh Selaras Alam Berkembang berwawasan Lingkungan",

  // §E1 — narasi perusahaan (web).
  narasi: [
    "Secara spesifik PT. Anugerah Mustika Ostindo bergerak dibidang Produksi dan Pemasaran Penyubur Tanah, yang menekankan pada seleksi mikroba-mikroba pembangkit kesuburan tanah untuk selanjutnya diformulasikan kedalam bahan organik alami berkualitas.",
    "Produk pertama yang dihasilkan adalah jenis Pupuk Organik Hayati dan telah terdaftar di Departemen Pertanian sejak bulan Juni 1996 dengan nomor BINUS : G 314/BINUS/VII/1996 yang terus diperbarui hingga saat ini.",
    'Seiring perjalanan waktu kemudian dikembangkan dan diproduksi pula produk-produk untuk meningkatkan dan perbaikan kesuburan tanah dengan mengusung Filosofi Membangun Tanpa Merusak, Tumbuh Selaras Alam Berkembang berwawasan Lingkungan. Jenis produk yang sesuai dengan filosofi tersebut antara lain Pupuk Organik Cair, Pupuk Hayati, Biofungisida "Futricho" dan Pupuk NPK yang sudah diperkaya dengan asam humat.',
    "Sejalan dengan perkembangan perusahaan, selanjutnya dikembangkan bidang usaha lain yang saling bersinergi, yaitu Pendampingan dan Pembinaan Petani Plasma Kelapa Sawit dan Pembibitan Kelapa Sawit.",
  ],

  // §E1 — sejarah dan profil (PDF hal. 3).
  sejarah: [
    "PT. Anugerah Mustika Ostindo merupakan perusahaan swasta nasional yang didirikan pada Juli 1995 dengan tujuan awal untuk mengembangkan produk pupuk berbasis bioteknologi yang ramah lingkungan.",
    "Berlatarbelakangkan keprihatinan atas merosotnya daya dukung lingkungan bagi pertanian, mendorong PT. Anugerah Mustika Ostindo untuk secara spesifik masuk sebagai perusahaan yang pertama perintis pengembangan produk pupuk organik hayati di Indonesia yang dikenal dengan nama Organic Soil Treatment (Indonesia) - OSTINDO, sebuah produk bioteknologi bidang pemupukan yang didasarkan atas konsep keselarasan hubungan tanah, hara dan tanaman.",
    "Produk OSTINDO sendiri sejak awal diperkenalkan hingga saat ini telah dipercaya dan digunakan oleh beberapa Perusahaan Perkebunan Besar, Kegiatan Proyek Pembangunan Pertanian/Perkebunan Nasional dan Kegiatan Reklamasi Areal Purna Tambang pada beberapa Perusahaan Pertambangan di Indonesia.",
    'Filosofi " Membangun Tanpa Merusak, Tumbuh Selaras Alam dan Berkembang Berwawasan Lingkungan selalu menjadi "spirit" dalam mengembangkan produk pupuk organik hayati OSTINDO, yang merupakan awal sekaligus core business perusahaan. Untuk itu seiring dengan perjalanan waktu, PT. Anugerah Mustika Ostindo selanjutnya mengembangkan produk-produk yang tetap berorientasi pada produk "ramah lingkungan" diantaranya pupuk organik curah/granuler, pupuk organik cair, pupuk hayati (mycorrhyza dan dekomposer), pestisida hayati (biopestisida), soil conditioner (asam humat) dan pupuk majemuk granuler yang diperkaya dengan asam humat.',
    "Mengingat aktivitas pemasaran yang dilakukan banyak secara langsung menjangkau masyarakat petani/pekebun, maka dikembangkan pula bidang usaha lain yang saling bersinergi, seperti halnya pendampingan/pembinaan petani plasma kelapa sawit dan pembibitan kelapa sawit.",
  ],

  // §G2 — legalitas (jenis dokumen saja; nomor dokumen tidak ada di sumber).
  legalitas: {
    pengantar: "Berikut beberapa Legalitas serta Perijinan",
    daftar: [
      "Surat Ijin Usaha Perdagangan (SIUP)",
      "Tanda Daftar Perusahaan (TDP)",
      "Ijin Industri",
      "Nomor Pokok Wajib Pajak (NPWP)",
    ],
  },

  // §G3 — nilai (web Ostindo, tiga ikon). Tampilkan dengan label "Nilai PT Anugerah Mustika Ostindo".
  nilai: [
    {
      label: "Jujur & Dipercaya",
      deskripsi: "Memberikan pelayanan yang maksimal kepada pelanggan dan mitra usaha",
    },
    { label: "Peduli Lingkungan", deskripsi: "Turut merawat dan mengembangkan lingkungan" },
    {
      label: "Saling Membangun",
      deskripsi: "Saling membangun dan menguntungkan pelanggan dan mitra kami",
    },
  ] satisfies NilaiPerusahaan[],

  // §G4 — kenapa memilih (web Ostindo).
  kenapaMemilih:
    "PT. Anugerah Mustika Ostindo memiliki nilai : Beretika, Loyalitas, Jujur dan dapat dipercaya, Memegang teguh komitmen, Dapat bekerja sama dan saling membangun, dan Peduli pada lingkungan",

  // §G5 — misi dan visi (web Ostindo). "PT. AMO" ditulis lengkap sesuai catatan sumber.
  misi: [
    "Terus melakukan riset dan pengembangan produk seiring dengan kebutuhan dan tantangan di lapangan.",
    "Terus melakukan pemasaran terhadap produk PT Anugerah Mustika Ostindo sehingga kesadaran akan merek Ostindo dari produk dan layanan yang kami berikan semakin tinggi dan terus dipercaya.",
    "Menjadikan merek Ostindo sebagai standar mutu dalam produk pertanian.",
  ],
  visi: [
    "Menjadi perusahaan yang mampu terus melahirkan produk-produk terbaik yang tetap memperhatikan keberlangsungan pertanian dan perkebunan yang ramah lingkungan.",
    "Menjadi perusahaan berskala Internasional yang terus dipercaya untuk menjawab tantangan di dunia pertanian dan perkebunan.",
    "Menjadi perusahaan yang juga bisa membangun semua rekan untuk bekerja sama dengan kami terus tumbuh dan berkembang serta dapat merasakan manfaatnya.",
  ],
  // §G5 — Visi Perusahaan (footer web Ostindo).
  visiPerusahaan:
    "Menjadi perusahaan utama yang mampu memberikan kesejahteraan bagi seluruh pemangku kepentingan, khususnya masyarakat petani dengan berpegang teguh pada prinsip-prinsip ramah lingkungan",

  // §G6 — inovasi perusahaan (web Ostindo).
  inovasi:
    "PT. Anugerah Mustika Ostindo melakukan riset dan produksi secara mandiri di fasilitas produksi kami yang terletak di daerah Balaraja, Banten. Kami juga memiliki laboratorium internal untuk menjaga kualitas produk kami secara terus menerus. Disisi lain, kami tidak hanya menjual produk Ostindo secara umum namun juga sambil melakukan pendampingan kepada konsumen sehingga konsumen dapat mendapatkan hasil yang paling optimal dan maksimal dari penggunaan produk produk Ostindo.",

  // §G7 — Sekapur Sirih (PDF hal. 1). OPSIONAL — tampil hanya bila disetujui.
  sekapurSirih: [
    "Sebagai negara dengan areal pertanian/perkebunan yang sangat luas, maka tuntutan pengelolaan sumber daya alam yang berkelanjutan dan optimal dalam pertanian/perkebunan tetap menjadi issu utama hingga saat ini.",
    "Tanah sebagai medium alam bagi pertanian/perkebunan adalah suatu ekosistem yang rumit, dinamik dan hidup, tersusun atas empat unsur utama, yaitu mineral, air, udara dan bahan organik termasuk didalamnya mikroba tanah. Kesuburan tanah itu sendiri pada dasarnya merupakan salah satu parameter yang sangat menentukan produktivitas dari suatu usaha pertanian/perkebunan.",
    "Pola pemupukan yang makin efisien dan efektif dengan tetap memperhatikan aspek-aspek ramah lingkungan menjadi tantangan sekaligus peluang dalam upaya meningkatkan potensi produktivitas lahan yang berjangka panjang.",
    "PT. Anugerah Mustika Ostindo menangkap tantangan sekaligus peluang tersebut untuk mengembangkan diri untuk menjadi perusahaan pupuk swasta nasional yang dapat dipercaya. Upaya tersebut kami laksanakan dengan komitmen terhadap mutu, ketepatan jadwal pengiriman, supervisi teknis kepada pelanggan, senantiasa melakukan inovasi serta dapat bekerjasama dan saling membangun.",
    "Menyikapi perkembangan dalam industri pupuk dan dunia usaha pada umumnya, PT. Anugerah Mustika Ostindo terus melakukan terobosan untuk menjaga daya saing serta mengembangkan perusahaan guna memastikan kelangsungan perusahaan.",
    "Atas nama Direksi dan Manajemen kami mengucapkan terima kasih atas dukungan segala pihak kepada kami selama ini.",
  ],

  // §H1 — kalimat pembuka halaman "Hubungi Kami" (titik ganda sumber diperbaiki).
  pembukaKontak:
    "Anda dapat mengirimkan pertanyaan mengenai produk maupun layanan dan kami akan berusaha menjawab dengan sebaik mungkin.",
};

// INTERIM — belum disetujui (D2). Copy hero & CTA penutup beranda selama
// pengembangan; hanya frasa sumber. Tidak boleh dipublikasikan sebelum
// disetujui — gerbang rilis Tahap S memeriksa marker INTERIM.
export const heroInterim = {
  // Penggalan filosofi §E1; satu kata aksen italic (DESIGN.md §6.1).
  judulAwal: "Membangun Tanpa Merusak,",
  kataAksen: "Tumbuh",
  judulAkhir: "Selaras Alam",
  // Gabungan frasa §E1 ("Produksi dan Pemasaran Penyubur Tanah") + fakta berdiri Juli 1995.
  subjudul: "Produksi dan Pemasaran Penyubur Tanah sejak Juli 1995",
  ctaUtama: { label: "Lihat Produk", href: "/produk" },
  ctaSekunder: { label: "Hubungi Kami", href: "/hubungi-kami" },
};

// INTERIM — belum disetujui (D2). CTA penutup beranda: judul label UI + kalimat §H1.
export const penutupInterim = {
  judul: "Hubungi Kami",
  teks: profil.pembukaKontak,
};
