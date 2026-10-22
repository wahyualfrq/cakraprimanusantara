import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { lokasiList, type Lokasi, type KontakItem } from "@/content/kontak";
import { profil } from "@/content/profil";
import { ContactForm } from "./ContactForm";
import styles from "./page.module.css";

// Hanya lokasi Ostindo (Office & Factory, CONTENT-VERBATIM.md §H1). Lokasi lain
// di content/kontak.ts di luar scope — tidak dirender dan tidak masuk JSON-LD.
// FAQ (app/kontak/FaqSection.tsx) dilepas dari render: tidak ada FAQ di sumber (D8).
const lokasiOstindo = lokasiList.filter((lokasi) => lokasi.unitUsaha.includes("agribisnis"));

const kontakLabel: Record<KontakItem["tipe"], string> = {
  telepon: "Telepon",
  whatsapp: "WhatsApp",
  fax: "Fax",
  instagram: "Instagram",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hubungi Kami",
    // INTERIM — belum disetujui (D2). Kalimat CONTENT-VERBATIM.md §H1 (titik ganda sumber diperbaiki — TYPO-LOG.md).
    description:
      "Anda dapat mengirimkan pertanyaan mengenai produk maupun layanan dan kami akan berusaha menjawab dengan sebaik mungkin.",
    path: "/hubungi-kami",
  });
}

function mapsUrl(alamat: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`;
}

function telHref(nomor: string): string {
  const digits = nomor.replace(/\D/g, "");
  const international = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `tel:+${international}`;
}

function LokasiCard({ lokasi }: { lokasi: Lokasi }) {
  const kontak = (lokasi.kontak ?? []).filter((item) => !item.perluVerifikasi);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{lokasi.nama}</h3>
      <address className={styles.address}>{lokasi.alamat}</address>
      <a
        href={mapsUrl(lokasi.alamat)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mapsLink}
      >
        <span>Buka di Google Maps</span>
        <span aria-hidden="true">↗</span>
      </a>

      {kontak.length > 0 && (
        <ul className={styles.kontakList}>
          {kontak.map((item, index) => (
            <li key={index} className={styles.kontakItem}>
              <span className={styles.kontakLabel}>{kontakLabel[item.tipe]}:</span>
              {item.tipe === "telepon" && (
                <a href={telHref(item.nilai)}>{item.nilai}</a>
              )}
              {item.tipe === "whatsapp" && (
                <a
                  href={buildWhatsAppUrl(item.nilai, `Halo, saya ingin menghubungi ${profil.nama}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.nilai}
                </a>
              )}
              {item.tipe === "fax" && <span>{item.nilai}</span>}
              {item.tipe === "instagram" && (
                <a
                  href={`https://instagram.com/${item.nilai.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.nilai}
                </a>
              )}
              {item.label && (
                <span className={styles.kontakPic}>({item.label})</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {lokasi.email && (
        <p className={styles.email}>
          <span className={styles.kontakLabel}>Email: </span>
          <a href={`mailto:${lokasi.email}`}>{lokasi.email}</a>
        </p>
      )}
    </div>
  );
}

export default function KontakPage() {
  // LocalBusiness hanya untuk lokasi Ostindo; jam operasional tidak ada di sumber Ostindo.
  const schemas = lokasiOstindo.map((lokasi) => {
    const teleponUtama = lokasi.kontak?.find(
      (item) => !item.perluVerifikasi && item.tipe === "telepon",
    );
    return localBusinessSchema({
      name: `${profil.nama} — ${lokasi.nama}`,
      address: lokasi.alamat,
      telephone: teleponUtama?.nilai,
    });
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={lokasiOstindo[index].slug} data={schema} />
      ))}

      {/* 1. Header dan Pengantar Kontak — kalimat pembuka verbatim §H1. */}
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Hubungi Kami", href: "/hubungi-kami" },
        ]}
        title="Hubungi Kami"
        description={profil.pembukaKontak}
      />

      {/* 2. Form + direktori lokasi Ostindo (DESIGN.md §8.11 "Kontak") */}
      <Section>
        <Container className={styles.layout}>
          <div className={styles.formColumn}>
            <SectionHeading title="Kirim Pesan kepada Kami" />
            <ContactForm />
          </div>

          <aside className={styles.locations} aria-labelledby="lokasi-ostindo">
            <h2 id="lokasi-ostindo" className={styles.locationsTitle}>
              Lokasi
            </h2>
            <div className={styles.cardList}>
              {lokasiOstindo.map((lokasi) => (
                <LokasiCard key={lokasi.slug} lokasi={lokasi} />
              ))}
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
