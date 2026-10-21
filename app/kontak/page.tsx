import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema } from "@/lib/seo/structured-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  lokasiList,
  jamOperasionalCakra,
  type Lokasi,
  type KontakItem,
} from "@/content/kontak";
import { ContactForm } from "./ContactForm";
import { FaqSection } from "./FaqSection";
import styles from "./page.module.css";

const kalimatPembuka =
  "Tim kami siap membantu kebutuhan konstruksi, armada alat berat, distribusi material industrial, maupun solusi agribisnis hayati. Sampaikan pertanyaan atau rencana kerja sama Anda melalui formulir di bawah ini atau hubungi kanal resmi unit usaha kami.";

const palembangSlugs = [
  "kantor-pusat-palembang",
  "kantor-operasional-palembang",
  "workshop-pool-palembang",
];
const jakartaTangerangSlugs = [
  "office-agribisnis-jakarta",
  "pabrik-agribisnis-tangerang",
];

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

function LokasiCard({
  lokasi,
  tampilkanJamKantor,
}: {
  lokasi: Lokasi;
  tampilkanJamKantor?: boolean;
}) {
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
                  href={buildWhatsAppUrl(
                    item.nilai,
                    `Halo, saya ingin menghubungi ${lokasi.nama}.`,
                  )}
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

      {tampilkanJamKantor && (
        <p className={styles.jamKantor}>Jam kantor: {jamOperasionalCakra}</p>
      )}
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
    const teleponUtama = lokasi.kontak?.find(
      (item) => !item.perluVerifikasi && item.tipe === "telepon",
    );
    return localBusinessSchema({
      name: lokasi.nama,
      address: lokasi.alamat,
      telephone: teleponUtama?.nilai,
      openingHours: palembangSlugs.includes(lokasi.slug)
        ? jamOperasionalCakra
        : undefined,
    });
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={lokasiList[index].slug} data={schema} />
      ))}

      {/* 1. Header dan Pengantar Kontak */}
      <PageHeader
        variant="solid"
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Kontak", href: "/kontak" },
        ]}
        title="Hubungi Kami"
        description={kalimatPembuka}
        align="center"
      />

      {/* 2. Informasi Kanal Komunikasi Utama */}
      <Section className={styles.channelsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <SectionHeading
              title="Kanal Komunikasi Utama"
              description="Hubungi representatif unit usaha, layanan cepat proyek, atau operasional kantor kami secara langsung melalui kontak di bawah ini."
              align="center"
            />
          </div>

          <div className={styles.channelsGrid}>
            <div className={styles.channelCard}>
              <span className={styles.channelCategory}>Layanan Cepat</span>
              <h3 className={styles.channelTitle}>Telepon &amp; WhatsApp</h3>
              <ul className={styles.channelList}>
                <li className={styles.channelItem}>
                  <span>Telp:</span>
                  <a href="tel:+62711824980">0711-824980</a>
                </li>
                <li className={styles.channelItem}>
                  <span>WhatsApp:</span>
                  <a
                    href={buildWhatsAppUrl("0811-783-675", "Halo Bpk. Sukartono, saya ingin menghubungi CPN.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    0811-783-675
                  </a>
                  <span className={styles.channelPic}>(Bpk. Sukartono)</span>
                </li>
                <li className={styles.channelItem}>
                  <span>WhatsApp:</span>
                  <a
                    href={buildWhatsAppUrl("0813-6891-8599", "Halo Ibu Ayni, saya ingin menghubungi CPN.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    0813-6891-8599
                  </a>
                  <span className={styles.channelPic}>(Ibu Ayni)</span>
                </li>
                <li className={styles.channelItem}>
                  <span>Agribisnis:</span>
                  <a
                    href={buildWhatsAppUrl("+62 819 2922 6666", "Halo tim Ostindo, saya ingin bertanya tentang produk agribisnis.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +62 819 2922 6666
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.channelCard}>
              <span className={styles.channelCategory}>Surel Resmi</span>
              <h3 className={styles.channelTitle}>Email Unit Usaha</h3>
              <ul className={styles.channelList}>
                <li className={styles.channelItem}>
                  <span>Konstruksi, Alat Berat &amp; Trading:</span>
                  <a href="mailto:info@cakraindopratama.com">info@cakraindopratama.com</a>
                </li>
                <li className={styles.channelItem}>
                  <span>Agribisnis (Ostindo):</span>
                  <a href="mailto:ostindo_mail@yahoo.com">ostindo_mail@yahoo.com</a>
                </li>
              </ul>
            </div>

            <div className={styles.channelCard}>
              <span className={styles.channelCategory}>Jam Layanan &amp; Kantor</span>
              <h3 className={styles.channelTitle}>Operasional Kantor</h3>
              <ul className={styles.channelList}>
                <li className={styles.channelItem}>
                  <span>Jam Kantor:</span>
                  <strong>{jamOperasionalCakra}</strong>
                </li>
                <li className={styles.channelItem}>
                  <p className={styles.channelNote}>
                    Kantor Pusat: Jl. Veteran No. 318, Palembang 30111, Sumatera Selatan.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Formulir Kirim Pesan (Di Bagian Tengah) */}
      <Section className={styles.formSection}>
        <Container>
          <div className={styles.formSectionHeader}>
            <h2 className={styles.formSectionTitle}>Kirim Pesan kepada Kami</h2>
            <p className={styles.formSectionLead}>
              Silakan lengkapi formulir terpusat di bawah ini untuk konsultasi teknis, permintaan penawaran armada, material, maupun kemitraan bisnis.
            </p>
          </div>

          <ContactForm />
        </Container>
      </Section>

      {/* 4. Lokasi Kantor dan Fasilitas Operasional */}
      <Section className={styles.locationsSection}>
        <Container>
          <div className={styles.locationsHeader}>
            <SectionHeading title="Lokasi Kantor & Fasilitas Operasional" />
            <p className={styles.locationsLead}>
              Seluruh fasilitas kantor pusat, kantor operasional, workshop armada, dan pabrik produksi PT Cakra Prima Nusantara dapat dikunjungi melalui alamat berikut.
            </p>
          </div>

          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Palembang &amp; Banyuasin (Sumatera Selatan)</h3>
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
            <h3 className={styles.groupHeading}>Jakarta &amp; Tangerang</h3>
            <div className={styles.cardGrid}>
              {jakartaTangerang.map((lokasi) => (
                <LokasiCard key={lokasi.slug} lokasi={lokasi} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Pertanyaan yang Sering Diajukan (FAQ) */}
      <FaqSection />
    </>
  );
}
