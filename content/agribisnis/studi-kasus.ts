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
          alt: "Dokumentasi kondisi awal lahan bekas tambang timah Belitung (Januari 2021) - Foto 1",
        },
        {
          id: "belitung-2021-01-foto-2",
          alt: "Dokumentasi survei lahan kritis bekas tambang 114 ha (Januari 2021) - Foto 2",
        },
        {
          id: "belitung-2021-01-foto-3",
          alt: "Dokumentasi penilaian tanah berpasir sebelum aplikasi SOP OSTINDO (Januari 2021) - Foto 3",
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
          alt: "Dokumentasi perkembangan vegetasi sawit di lahan reklamasi (Agustus 2022) - Foto 1",
        },
        {
          id: "belitung-2022-08-foto-2",
          alt: "Dokumentasi pertumbuhan tajuk sawit pasca aplikasi OSTINDO (Agustus 2022) - Foto 2",
        },
        {
          id: "belitung-2022-08-foto-3",
          alt: "Dokumentasi kondisi blok tanaman kelapa sawit (Agustus 2022) - Foto 3",
        },
        {
          id: "belitung-2022-08-foto-4",
          alt: "Dokumentasi monitoring lapangan vegetasi sawit (Agustus 2022) - Foto 4",
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
          alt: "Dokumentasi evaluasi pertumbuhan sawit usia 2 tahun (Januari 2023) - Foto 1",
        },
        {
          id: "belitung-2023-01-foto-2",
          alt: "Dokumentasi penampakan kanopi dan batang sawit di lahan kritis (Januari 2023) - Foto 2",
        },
        {
          id: "belitung-2023-01-foto-3",
          alt: "Dokumentasi kondisi tegakan kelapa sawit di Belitung (Januari 2023) - Foto 3",
        },
        {
          id: "belitung-2023-01-foto-4",
          alt: "Dokumentasi lapangan hasil perlakuan OSTINDO jangka 2 tahun (Januari 2023) - Foto 4",
        },
        {
          id: "belitung-2023-01-foto-5",
          alt: "Dokumentasi lanskap blok perkebunan sawit pasca reklamasi (Januari 2023) - Foto 5",
        },
      ],
    },
  ],
};
