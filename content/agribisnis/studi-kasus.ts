export type FotoDokumentasi = {
  id: string;
  /** URL foto asli (Vercel Blob atau path publik). Kosongkan sampai foto di-upload. */
  src?: string;
  alt: string;
  caption?: string;
};

export type FaseStudiKasus = {
  id: string;
  periode: string;
  lokasi: string;
  judul: string;
  deskripsi: string;
  fotos: FotoDokumentasi[];
};

export type StudiKasusProyek = {
  id: string;
  entitasPelaksana: string;
  lokasi: string;
  luasLahan: string;
  jenisLahan: string;
  periode: string;
  faseList: FaseStudiKasus[];
};

/**
 * Studi kasus reklamasi lahan kritis bekas tambang timah Belitung (114 Ha).
 * Dilaksanakan oleh PT Anugerah Mustika Ostindo bekerja sama dengan klien lokal.
 * Sumber linimasa faktual: 3 titik waktu dokumentasi lapangan (Januari 2021, Agustus 2022, Januari 2023).
 *
 * Seluruh 12 slot foto disiapkan di sini. Foto asli BELUM dimasukkan (src dikosongkan),
 * siap diisi secara mandiri oleh pemilik proyek setelah file foto diunggah.
 */
export const studiKasusBelitung: StudiKasusProyek = {
  id: "reklamasi-belitung",
  entitasPelaksana: "PT Anugerah Mustika Ostindo",
  lokasi: "Belitung",
  luasLahan: "114 hektare",
  jenisLahan: "Bekas tambang timah",
  periode: "2021–2023",
  faseList: [
    {
      id: "belitung-2021-01",
      periode: "Januari 2021",
      lokasi: "Belitung",
      judul: "Dokumentasi Awal Pengelolaan Lahan Bekas Tambang Timah (114 Ha)",
      deskripsi:
        "Penerimaan dan survei kondisi awal lahan kritis bekas tambang timah seluas 114 hektare oleh PT Anugerah Mustika Ostindo bekerja sama dengan klien lokal di Belitung. Penilaian mencakup struktur tanah berpasir sebelum perlakuan pembenah tanah dan penerapan SOP OSTINDO.",
      fotos: [
        {
          id: "belitung-2021-01-foto-1",
          src: "/images/portofolio/gambar-2.png",
          alt: "Dokumentasi kondisi awal lanskap lahan kritis bekas tambang timah seluas 114 ha di Belitung sebelum reklamasi (Januari 2021)",
          caption: "Kondisi awal lahan kritis bekas tambang timah 114 ha sebelum reklamasi",
        },
        {
          id: "belitung-2021-01-foto-2",
          src: "/images/portofolio/gambar-1.png",
          alt: "Pengambilan sampel profil tanah kritis berpasir menggunakan auger sampler untuk analisis laboratorium (Januari 2021)",
          caption: "Pengambilan sampel tanah berpasir untuk analisis pra-perlakuan",
        },
        {
          id: "belitung-2021-01-foto-3",
          src: "/images/portofolio/gambar-6.png",
          alt: "Tim teknisi melakukan survei topografi kontur dan pemetaan zonasi awal lahan kritis 114 ha (Januari 2021)",
          caption: "Survei kontur dan pemetaan zonasi awal lahan kritis purna tambang",
        },
      ],
    },
    {
      id: "belitung-2022-08",
      periode: "Agustus 2022",
      lokasi: "Belitung",
      judul: "Dokumentasi Perkembangan Vegetasi Tanaman Sawit",
      deskripsi:
        "Dokumentasi perkembangan vegetasi kelapa sawit setelah penerapan SOP perlakuan pembenah tanah OSTINDO pada lahan reklamasi bekas tambang.",
      fotos: [
        {
          id: "belitung-2022-08-foto-1",
          src: "/images/portofolio/gambar-3.png",
          alt: "Penanaman bibit kelapa sawit muda pada bedengan tanah pasca perlakuan pembenah tanah OSTINDO (Agustus 2022)",
          caption: "Penanaman bibit sawit setelah aplikasi pembenah tanah OSTINDO",
        },
        {
          id: "belitung-2022-08-foto-2",
          src: "/images/portofolio/gambar-4.png",
          alt: "Perkembangan vegetasi penutup tanah (cover crop) di sekitar tanaman sawit muda pada lahan reklamasi (Agustus 2022)",
          caption: "Perkembangan vegetasi penutup tanah pada lahan reklamasi",
        },
        {
          id: "belitung-2022-08-foto-3",
          src: "/images/portofolio/gambar-10.png",
          alt: "Agronomist mengukur pertumbuhan tinggi dan perkembangan tajuk vegetasi kelapa sawit muda (Agustus 2022)",
          caption: "Pengukuran berkala perkembangan tinggi dan tajuk tanaman",
        },
        {
          id: "belitung-2022-08-foto-4",
          src: "/images/portofolio/gambar-8.png",
          alt: "Monitoring lapangan adaptasi dan kesehatan daun kelapa sawit di area reklamasi kolong tambang (Agustus 2022)",
          caption: "Monitoring lapangan adaptasi tanaman di sekitar kolong tambang",
        },
      ],
    },
    {
      id: "belitung-2023-01",
      periode: "Januari 2023",
      lokasi: "Belitung",
      judul: "Dokumentasi Evaluasi Pertumbuhan Tanaman Sawit",
      deskripsi:
        "Dokumentasi evaluasi pertumbuhan tanaman kelapa sawit usia 2 tahun di lahan bekas tambang timah hasil penerapan SOP terpadu pembenah tanah OSTINDO.",
      fotos: [
        {
          id: "belitung-2023-01-foto-1",
          src: "/images/portofolio/gambar-5.png",
          alt: "Perkembangan blok tanaman kelapa sawit usia 2 tahun di lanskap perbukitan Belitung (Januari 2023)",
          caption: "Kondisi blok tanaman sawit usia 2 tahun di perbukitan Belitung",
        },
        {
          id: "belitung-2023-01-foto-2",
          src: "/images/portofolio/gambar-9.png",
          alt: "Penampakan kanopi daun hijau pekat dan pembentukan batang sawit yang kokoh (Januari 2023)",
          caption: "Perkembangan tajuk daun hijau pekat dan batang sawit yang kokoh",
        },
        {
          id: "belitung-2023-01-foto-3",
          src: "/images/portofolio/gambar-7.png",
          alt: "Tegakan tanaman kelapa sawit tumbuh rimbun berlatar bukit granit khas Belitung (Januari 2023)",
          caption: "Tegakan kelapa sawit tumbuh rimbun berlatar bukit granit Belitung",
        },
        {
          id: "belitung-2023-01-foto-4",
          src: "/images/portofolio/gambar-11.png",
          alt: "Evaluasi perakaran kelapa sawit dan pembentukan lapisan topsoil gembur di sekitar pangkal batang (Januari 2023)",
          caption: "Pembentukan lapisan topsoil subur dan perakaran sawit yang sehat",
        },
        {
          id: "belitung-2023-01-foto-5",
          src: "/images/portofolio/gambar-12.png",
          alt: "Foto udara lanskap blok perkebunan kelapa sawit menghijau bersanding dengan danau kolong purna tambang timah (Januari 2023)",
          caption: "Lanskap udara perkebunan sawit pasca reklamasi 2 tahun di Belitung",
        },
      ],
    },
  ],
};
