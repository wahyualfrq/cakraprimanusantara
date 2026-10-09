import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/structured-data";

// Manrope (heading) + Inter (body) — sans-serif tegas & profesional, lebih
// sesuai untuk company profile konstruksi/alat berat dibanding serif italic.
const fontHeading = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
