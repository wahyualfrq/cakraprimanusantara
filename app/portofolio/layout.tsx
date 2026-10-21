import { notFound } from "next/navigation";

// Nasib /portofolio belum diputuskan (PRD.md §9 poin 2, keputusan D6). Isinya
// memuat proyek di luar scope dan studi kasus tanpa sumber — route dinonaktifkan
// (404) sementara, file dipertahankan (keputusan D7).
export default function PortofolioLayout({ children }: { children: React.ReactNode }) {
  notFound();
  return <>{children}</>;
}
