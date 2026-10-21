import { notFound } from "next/navigation";

// Di luar scope Ostindo — route dinonaktifkan (404), file dipertahankan sampai
// ada persetujuan penghapusan (keputusan D7, GAP-REPORT.md §8).
export default function TradingLayout({ children }: { children: React.ReactNode }) {
  notFound();
  return <div data-theme="konstruksi">{children}</div>;
}
