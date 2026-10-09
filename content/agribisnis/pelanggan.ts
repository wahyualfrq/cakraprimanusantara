export type Pelanggan = {
  nama: string;
  /** Provinsi/lokasi singkat persis seperti di sumber — jangan diperluas/ditebak. */
  lokasi?: string;
};

// Sumber: CONTENT-SOURCE.md §7, PDF "Daftar Konsumen/Pelanggan" Ostindo.
// Dipakai di band kepercayaan /agribisnis (Fase 5) — bukti klien, bukan proyek.
export const pelangganList: Pelanggan[] = [
  { nama: "Astra Agro Lestari Group" },
  { nama: "Agro Abadi Cemerlang", lokasi: "Kalbar" },
  { nama: "Bintang Harapan Desa-Duta Surya Pratama", lokasi: "Kalbar" },
  { nama: "Barito Pasific Group", lokasi: "Kalbar" },
  { nama: "Buana Karya Bakti", lokasi: "Kalsel" },
  { nama: "Bukit Barisan Indah Prima Group" },
  { nama: "Bio Inti Agrindo", lokasi: "Merauke, Papua" },
  { nama: "Incasi Raya Group" },
  { nama: "Duta Palma/Darmex Group" },
  { nama: "Egasuti Nasakti", lokasi: "Riau" },
  { nama: "First Mujur Plantation", lokasi: "Sumut" },
  { nama: "Gemareksa Mekarsari-Inhasana", lokasi: "Kalteng" },
  { nama: "Hindoli-Cargill", lokasi: "Sumsel" },
  { nama: "Ichtiar Gusti Pudi", lokasi: "Kalbar" },
  { nama: "Kurnia Luwuk Sejati", lokasi: "Sulteng" },
  { nama: "Musirawas-Uni Primacom", lokasi: "Kalteng" },
  { nama: "Metaepsi Agro", lokasi: "Kalteng" },
  { nama: "Mitra Ogan", lokasi: "Sumsel" },
  { nama: "Pulau Subur", lokasi: "Sumsel" },
  { nama: "Polyplant", lokasi: "Kalbar" },
  { nama: "Rudy Agung Agralaksana", lokasi: "Jambi" },
  { nama: "Sawit Unggul", lokasi: "Riau" },
  { nama: "Sungai Rangit", lokasi: "Kalteng" },
  { nama: "Sawitmas Nugraha Perdana", lokasi: "Kalteng" },
  { nama: "Tanie Abadi Sejahtera", lokasi: "Sumsel" },
  { nama: "Velindo Aneka Tani", lokasi: "Jambi" },
  { nama: "Vale Indonesia/Inco", lokasi: "Sulsel" },
  { nama: "Wira Kencana", lokasi: "Riau" },
  { nama: "Wanasawit Subur Lestari-BEST Agro Group" },
  { nama: "PT Perkebunan Nusantara" },
  { nama: "Perhutani" },
];
