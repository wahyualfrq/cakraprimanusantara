import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./FaqSection.module.css";

type FaqItem = {
  pertanyaan: string;
  jawaban: string;
};

const faqList: FaqItem[] = [
  {
    pertanyaan: "Bidang usaha apa saja yang dijalankan CPN?",
    jawaban:
      "PT Cakra Prima Nusantara menaungi empat bidang usaha utama yang terintegrasi: Jasa Konstruksi Umum dan perbaikan beton struktural (PT Cakra Indo Pratama), Rental & Penjualan Alat Berat, Perdagangan & Distribusi Industrial, serta Agribisnis & Bioteknologi Lingkungan (PT Anugerah Mustika Ostindo).",
  },
  {
    pertanyaan: "Bagaimana cara menghubungi tim CPN?",
    jawaban:
      "Anda dapat menghubungi kami melalui formulir kirim pesan di halaman ini, atau langsung menghubungi nomor telepon, WhatsApp PIC resmi, dan email yang tertera pada masing-masing lokasi operasional.",
  },
  {
    pertanyaan: "Di mana lokasi kantor dan fasilitas operasional CPN?",
    jawaban:
      "Kantor pusat, kantor operasional, dan workshop alat berat CPN berpusat di Palembang dan Banyuasin (Sumatera Selatan). Sedangkan kantor operasional agribisnis berlokasi di Jakarta Barat dengan fasilitas pabrik produksi di Jayanti, Tangerang (Banten).",
  },
  {
    pertanyaan: "Bagaimana cara menyampaikan pertanyaan tentang produk atau layanan?",
    jawaban:
      "Gunakan formulir kontak di halaman ini dengan memilih topik bidang yang sesuai (Konstruksi, Alat Berat, Trading, atau Agribisnis). Pesan Anda akan langsung disiapkan dan diteruskan ke perwakilan unit usaha yang relevan.",
  },
  {
    pertanyaan: "Bagaimana cara mengajukan kerja sama bisnis?",
    jawaban:
      "Pengajuan kerja sama bisnis, permintaan penawaran proyek, maupun kemitraan distribusi dapat disampaikan melalui formulir pesan di halaman ini atau dikirimkan langsung ke email resmi info@cakraindopratama.com.",
  },
];

export function FaqSection() {
  return (
    <Section className={styles.faqSection}>
      <Container>
        <div className={styles.faqWrapper}>
          <div className={styles.sectionHeader}>
            <SectionHeading
              title="Pertanyaan yang Sering Diajukan"
              // description="Jawaban ringkas dan faktual seputar bidang usaha, lokasi fasilitas, dan tata cara komunikasi dengan PT Cakra Prima Nusantara."
              align="center"
            />
          </div>

          <div className={styles.faqList}>
            {faqList.map((item, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span className={styles.faqQuestion}>{item.pertanyaan}</span>
                  <span className={styles.faqIcon} aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>{item.jawaban}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
