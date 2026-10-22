import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/structured-data";

// Tipografi DESIGN.md §6 (keputusan D1): Fraunces untuk heading, Inter untuk
// body. Fraunces di-load sebagai variable font dengan style italic ASLI dan axis
// optical size (opsz) — italic aksen tidak boleh fake/synthetic (§6.1).
const fontHeading = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Metadata default/title-template. Tiap page.tsx tetap wajib punya
// generateMetadata() sendiri (STRUCTURE.md §6.1) — ini hanya fallback.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const orgSchema = organizationSchema();

  return (
    <html lang="id" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Skip link — elemen fokus pertama, melompati navigasi (WCAG 2.4.1). */}
        <a href="#konten-utama" className="skipLink">
          Langsung ke konten utama
        </a>
        <Navbar />
        <main id="konten-utama" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
