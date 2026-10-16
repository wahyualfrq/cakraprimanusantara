export type PilarBisnis = {
  id: "kontraktor" | "alat-berat" | "trading" | "agribisnis";
  judul: string;
  entitas: string;
  deskripsi: string;
  fiturUtama: string[];
  lokasi: string;
  href: string;
};

export type LinimasaItem = {
  tahun: string;
  judul: string;
  entitas: string;
  deskripsi: string;
};

export type ProfilHolding = {
  nama: string;
  // ringkasan: string;
  paragraf: string[];
};

export const profilHoldingData: ProfilHolding = {
  nama: "PT Cakra Prima Nusantara",
  // ringkasan:
  //   "PT Cakra Prima Nusantara merupakan entitas holding korporat yang menaungi dan mengintegrasikan unit usaha jasa konstruksi, rental & penjualan alat berat, perdagangan industrial, serta agribisnis hayati.",
  paragraf: [
    "Sebagai payung korporat, PT Cakra Prima Nusantara mengonsolidasikan kapabilitas operasional yang sebelumnya berjalan melalui entitas PT Cakra Indo Pratama dan PT Anugerah Mustika Ostindo ke dalam satu ekosistem terpadu.",
    "Melalui sinergi lintas sektor ini, grup menghadirkan solusi menyeluruh untuk mendukung percepatan pembangunan infrastruktur fisik, efisiensi operasional industri dan pertambangan, hingga pemenuhan kebutuhan agribisnis ramah lingkungan di berbagai wilayah Indonesia.",
  ],
};

export const pilarBisnisList: PilarBisnis[] = [
  {
    id: "kontraktor",
    judul: "Jasa Konstruksi Umum",
    entitas: "PT Cakra Indo Pratama",
    deskripsi:
      "Penyedia jasa konstruksi terintegrasi mulai dari tahap perencanaan teknis hingga eksekusi akhir, berfokus pada ketahanan struktural dan standar keselamatan kerja.",
    fiturUtama: [
      "Civil Project & pekerjaan tanah",
      "Building Project & fasilitas gedung",
      "Concrete Repair & perbaikan beton industri",
      "Mechanical & Electrical Contractor",
      "Chipping Kelapa Sawit untuk replanting",
    ],
    lokasi: "Palembang, Sumatera Selatan",
    href: "/kontraktor",
  },
  {
    id: "alat-berat",
    judul: "Rental & Penjualan Alat Berat",
    entitas: "PT Cakra Indo Pratama (Lini Alat Berat)",
    deskripsi:
      "Dukungan armada alat berat terlengkap untuk mendukung sektor pertambangan, perkebunan, dan infrastruktur dengan kesiapan unit dan teknisi handal.",
    fiturUtama: [
      "Excavator, Bulldozer, & Motor Grader",
      "Wheel Loader, Vibro Roller, & Dump Truck",
      "Forklift, Pontoon, & Air Compressor",
      "Dukungan Workshop & Pool Pemeliharaan Mandiri",
    ],
    lokasi: "Banyuasin & Palembang, Sumatera Selatan",
    href: "/alat-berat",
  },
  {
    id: "trading",
    judul: "Perdagangan & Distribusi Industrial",
    entitas: "PT Cakra Indo Pratama (Lini Trading)",
    deskripsi:
      "Mitra distribusi resmi untuk material teknik, pelumas performa tinggi, baterai industrial, dan pelapis protektif dari produsen global terkemuka.",
    fiturUtama: [
      "Pelumas & pelumas industri",
      "Baterai & aki komersial",
      "Cat pelapis pelindung & cat industri",
      "Semen & material konstruksi spesialis",
    ],
    lokasi: "Palembang, Sumatera Selatan",
    href: "/trading",
  },
  {
    id: "agribisnis",
    judul: "Agribisnis & Bioteknologi Lingkungan",
    entitas: "PT Anugerah Mustika Ostindo",
    deskripsi:
      "Perintis pengembangan pupuk organik hayati, biofungisida, dan pembenah tanah ramah lingkungan dengan filosofi 'Membangun Tanpa Merusak, Tumbuh Selaras Alam dan Berkembang Berwawasan Lingkungan'.",
    fiturUtama: [
      "Pupuk hayati OSTINDO & biofungisida FUTRICHO",
      "Pupuk NPK & pupuk organik cair BLESS",
      "Invensi alih teknologi pembenah tanah kritis",
      "Pendampingan kemitraan perkebunan nasional",
    ],
    lokasi: "Jakarta Barat & Pabrik Tangerang, Banten",
    href: "/agribisnis",
  },
];

export const linimasaList: LinimasaItem[] = [
  {
    tahun: "1995",
    judul: "Pendirian PT Anugerah Mustika Ostindo",
    entitas: "PT Anugerah Mustika Ostindo",
    deskripsi:
      "Didirikan pada Juli 1995 (Akta Pendirian No. 361) di Jakarta sebagai pionir pengembangan produk bioteknologi pemupukan yang ramah lingkungan di Indonesia.",
  },
  {
    tahun: "1996",
    judul: "Registrasi Produk Pupuk Hayati Pertama",
    entitas: "PT Anugerah Mustika Ostindo",
    deskripsi:
      "Produk pupuk organik hayati OSTINDO terdaftar resmi di Departemen Pertanian (BINUS: G 314/BINUS/VII/1996) dan mulai digunakan pada perkebunan besar serta reklamasi lahan.",
  },
  {
    tahun: "1999",
    judul: "Awal Jejak Operasional Konstruksi & Alat Berat",
    entitas: "PT Cakra Indo Pratama",
    deskripsi:
      "Memulai rekam jejak penyediaan jasa konstruksi sipil, perbaikan beton, dan rental alat berat untuk sektor industri, tambang, dan perkebunan di Sumatera Selatan.",
  },
  {
    tahun: "2014 – 2015",
    judul: "Partisipasi Internasional & Penghargaan LIPI",
    entitas: "PT Anugerah Mustika Ostindo",
    deskripsi:
      "Berpartisipasi dalam International Oil Palm Conference (IOPC 2014) serta menerima Penghargaan Alih Teknologi LIPI 2015 atas invensi formula pembenah tanah untuk lahan kritis.",
  },
  {
    tahun: "Integrasi Holding",
    judul: "Konsolidasi di Bawah PT Cakra Prima Nusantara",
    entitas: "PT Cakra Prima Nusantara",
    deskripsi:
      "Menyatukan seluruh unit usaha di bawah satu brand holding korporat guna memberikan solusi end-to-end yang solid dan terkoordinasi bagi mitra industri nasional.",
  },
];
