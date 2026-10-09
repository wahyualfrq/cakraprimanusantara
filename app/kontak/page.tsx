import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { lokasiList, jamOperasionalCakra, type Lokasi, type KontakItem } from "@/content/kontak";
import { ContactForm } from "./ContactForm";
import styles from "./page.module.css";

// Sumber Ostindo "Hubungi Kami" — CONTENT-VERBATIM.md §H1. Sumber menulis
// ".." di akhir kalimat; dirapikan jadi satu titik (dicatat di TYPO-LOG.md).
const kalimatPembuka =
  "Anda dapat mengirimkan pertanyaan mengenai produk maupun layanan dan kami akan berusaha menjawab dengan sebaik mungkin.";

const palembangSlugs = ["kantor-pusat-palembang", "kantor-operasional-palembang", "workshop-pool-palembang"];
const jakartaTangerangSlugs = ["office-agribisnis-jakarta", "pabrik-agribisnis-tangerang"];

const kontakLabel: Record<KontakItem["tipe"], string> = {
  telepon: "Telepon",
  whatsapp: "WhatsApp",
  fax: "Fax",
  instagram: "Instagram",
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Hubungi Kami",
    description: "Kontak dan lokasi seluruh unit usaha PT Cakra Prima Nusantara.",
    path: "/kontak",
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

function LokasiCard({ lokasi, tampilkanJamKantor }: { lokasi: Lokasi; tampilkanJamKantor?: boolean }) {
  // Nomor fax 0711-819821: jenisnya (telepon/fax) belum terverifikasi di
  // sumber — sengaja tidak ditampilkan (lihat GAP-REPORT.md).
  const kontak = (lokasi.kontak ?? []).filter((item) => !item.perluVerifikasi);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{lokasi.nama}</h3>
      <address className={styles.address}>{lokasi.alamat}</address>
      <a href={mapsUrl(lokasi.alamat)} target="_blank" rel="noopener noreferrer" className={styles.mapsLink}>
        Buka di Google Maps
      </a>

      {kontak.length > 0 && (
        <ul className={styles.kontakList}>
          {kontak.map((item, index) => (
            <li key={index} className={styles.kontakItem}>
              <span className={styles.kontakLabel}>{kontakLabel[item.tipe]}</span>
              {item.tipe === "telepon" && <a href={telHref(item.nilai)}>{item.nilai}</a>}
              {item.tipe === "whatsapp" && (
                <a
                  href={buildWhatsAppUrl(item.nilai, `Halo, saya ingin menghubungi ${lokasi.nama}.`)}
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
              {item.label && <span className={styles.kontakPic}>({item.label})</span>}
            </li>
          ))}
        </ul>
      )}

      {lokasi.email && (
        <p className={styles.email}>
          <a href={`mailto:${lokasi.email}`}>{lokasi.email}</a>
        </p>
      )}

      {tampilkanJamKantor && <p className={styles.jamKantor}>Jam kantor: {jamOperasionalCakra}</p>}
    </div>
  );
}

export default function KontakPage() {
  const palembang = palembangSlugs.map(
    (slug) => lokasiList.find((lokasi) => lokasi.slug === slug)!,
  );
  const jakartaTangerang = jakartaTangerangSlugs.map(
    (slug) => lokasiList.find((lokasi) => lokasi.slug === slug)!,
  );

  const schemas = lokasiList.map((lokasi) => {
    const teleponUtama = lokasi.kontak?.find((item) => !item.perluVerifikasi && item.tipe === "telepon");
    return localBusinessSchema({
      name: lokasi.nama,
      address: lokasi.alamat,
      telephone: teleponUtama?.nilai,
      openingHours: palembangSlugs.includes(lokasi.slug) ? jamOperasionalCakra : undefined,
    });
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={lokasiList[index].slug} data={schema} />
      ))}

      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontak", href: "/kontak" },
        ]}
        title="Hubungi Kami"
      />

      <Section>
        <Container>
          <p className={styles.pembuka}>{kalimatPembuka}</p>

          <div className={styles.group}>
            <SectionHeading title="Palembang" />
            <div className={styles.cardGrid}>
              {palembang.map((lokasi) => (
                <LokasiCard
                  key={lokasi.slug}
                  lokasi={lokasi}
                  tampilkanJamKantor={lokasi.slug === "kantor-operasional-palembang"}
                />
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <SectionHeading title="Jakarta dan Tangerang" />
            <div className={styles.cardGrid}>
              {jakartaTangerang.map((lokasi) => (
                <LokasiCard key={lokasi.slug} lokasi={lokasi} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.formSection}>
        <Container>
          <SectionHeading title="Kirim Pesan" />
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
