import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import { kontakHref, mapsUrl } from "@/lib/kontak";
import { lokasiList, type KontakItem } from "@/content/kontak";
import { profil } from "@/content/profil";
import { ContactForm } from "./ContactForm";
import { CopyAddress } from "./CopyAddress";
import styles from "./page.module.css";

// Hanya lokasi Ostindo (Office & Factory, CONTENT-VERBATIM.md §H1). Lokasi lain
// di content/kontak.ts di luar scope — tidak dirender dan tidak masuk JSON-LD.
const lokasiOstindo = lokasiList.filter((lokasi) => lokasi.unitUsaha.includes("agribisnis"));
const pesanWhatsApp = `Halo, saya ingin menghubungi ${profil.nama}.`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hubungi Kami",
    // INTERIM — belum disetujui (D2). Kalimat CONTENT-VERBATIM.md §H1 (titik ganda sumber diperbaiki — TYPO-LOG.md).
    description:
      "Anda dapat mengirimkan pertanyaan mengenai produk maupun layanan dan kami akan berusaha menjawab dengan sebaik mungkin.",
    path: "/hubungi-kami",
  });
}

// Ikon pengenal jenis kanal (outline 24 px, gaya ikon proyek) — dekoratif, label tetap teks.
const IKON: Record<string, ReactNode> = {
  whatsapp: (
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5z" />
  ),
  telepon: (
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  email: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" />
    </>
  ),
};

type Kanal = { tipe: string; label: string; nilai: string; aksi: string; href: string; external: boolean };

/** Kanal kontak utama dari data Office (content/kontak.ts) — tanpa item perluVerifikasi. */
function kanalKontak(): { kanal: Kanal[]; fax?: string } {
  const office = lokasiOstindo.find((lokasi) => (lokasi.kontak ?? []).length > 0);
  const items = (office?.kontak ?? []).filter((item) => !item.perluVerifikasi);
  const cari = (tipe: KontakItem["tipe"]) => items.find((item) => item.tipe === tipe);
  const kanal: Kanal[] = [];
  const wa = cari("whatsapp");
  if (wa) kanal.push({ tipe: "whatsapp", label: "WhatsApp", nilai: wa.nilai, aksi: "Mulai chat", href: kontakHref(wa, pesanWhatsApp)!, external: true });
  const tel = cari("telepon");
  if (tel) kanal.push({ tipe: "telepon", label: "Telepon", nilai: tel.nilai, aksi: "Telepon kantor", href: kontakHref(tel, pesanWhatsApp)!, external: false });
  if (office?.email) kanal.push({ tipe: "email", label: "Email", nilai: office.email, aksi: "Kirim email", href: `mailto:${office.email}`, external: false });
  const ig = cari("instagram");
  if (ig) kanal.push({ tipe: "instagram", label: "Instagram", nilai: ig.nilai, aksi: "Lihat profil", href: kontakHref(ig, pesanWhatsApp)!, external: true });
  return { kanal, fax: cari("fax")?.nilai };
}

export default function KontakPage() {
  // LocalBusiness hanya untuk lokasi Ostindo; jam operasional tidak ada di sumber Ostindo.
  const schemas = lokasiOstindo.map((lokasi) => {
    const teleponUtama = lokasi.kontak?.find((item) => !item.perluVerifikasi && item.tipe === "telepon");
    return localBusinessSchema({
      name: `${profil.nama} — ${lokasi.nama}`,
      address: lokasi.alamat,
      telephone: teleponUtama?.nilai,
    });
  });
  const { kanal, fax } = kanalKontak();

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={lokasiOstindo[index].slug} data={schema} />
      ))}

      {/* Header ringkas — ilustrasi kebun (D4, dekoratif) + kalimat pembuka verbatim §H1. */}
      <PageHeader
        variant="photo"
        photoSrc="/images/gambar-4.png"
        photoPosition="center 45%"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Hubungi Kami", href: "/hubungi-kami" },
        ]}
        title="Hubungi Kami"
        description={profil.pembukaKontak}
      />

      {/* 1. Kanal kontak utama — satu tautan per kanal, langsung bisa dipakai. */}
      <Section aria-labelledby="kanal-kontak">
        <Container>
          <h2 id="kanal-kontak" className={styles.channelsTitle}>
            Kontak langsung
          </h2>
          <Reveal as="ul" stagger className={styles.channels}>
            {kanal.map((item) => (
              <li key={item.tipe}>
                <a
                  href={item.href}
                  className={styles.channel}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <svg className={styles.channelIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                    {IKON[item.tipe]}
                  </svg>
                  <span className={styles.channelLabel}>{item.label}</span>
                  {/* <wbr> setelah "@": email panjang terpotong rapi di layar sempit. */}
                  <span className={styles.channelValue}>
                    {item.nilai.includes("@") && item.tipe === "email" ? (
                      <>
                        {item.nilai.split("@")[0]}@<wbr />
                        {item.nilai.split("@")[1]}
                      </>
                    ) : (
                      item.nilai
                    )}
                  </span>
                  <span className={styles.channelAction}>
                    {item.aksi}
                    {item.external && <span className={styles.srOnly}> (tab baru)</span>}
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
          {fax && (
            <p className={styles.fax}>
              <span className={styles.faxLabel}>Fax</span> {fax}
            </p>
          )}
        </Container>
      </Section>

      {/* 2. Form (fokus utama) | lokasi. Mobile: form dulu, lalu lokasi. */}
      <Section aria-label="Kirim pesan dan lokasi">
        <Container className={styles.layout}>
          <Reveal variant="fade" className={styles.formColumn}>
            <Card as="section" className={styles.formPanel} aria-labelledby="form-kontak">
              <div className={styles.formHead}>
                <h2 id="form-kontak" className={styles.sectionTitle}>
                  Kirim Pesan kepada Kami
                </h2>
                <p className={styles.formIntro}>
                  Isi form di bawah, lalu pilih kirim lewat WhatsApp atau email. Pesan Anda akan dibuka
                  di aplikasi tersebut untuk dikirim.
                </p>
              </div>
              <ContactForm />
            </Card>
          </Reveal>

          <section className={styles.directory} aria-labelledby="lokasi-ostindo">
            <h2 id="lokasi-ostindo" className={styles.sectionTitle}>
              Lokasi
            </h2>
            <Reveal as="ul" stagger className={styles.locations}>
              {lokasiOstindo.map((lokasi) => (
                <li key={lokasi.slug} className={styles.location}>
                  <h3 className={styles.locationName}>{lokasi.nama}</h3>
                  <address className={styles.address}>{lokasi.alamat}</address>
                  <div className={styles.locationActions}>
                    <a
                      href={mapsUrl(lokasi.alamat)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      Buka di Google Maps<span className={styles.srOnly}> (tab baru)</span>
                    </a>
                    <CopyAddress alamat={lokasi.alamat} label={lokasi.nama} />
                  </div>
                </li>
              ))}
            </Reveal>
          </section>
        </Container>
      </Section>
    </>
  );
}
