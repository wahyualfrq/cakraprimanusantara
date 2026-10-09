/**
 * Bangun URL wa.me dari nomor (format lokal "0811-..." atau internasional
 * "+62 819 ...") dan pesan yang sudah terisi sesuai konteks halaman.
 */
export function buildWhatsAppUrl(nomor: string, pesan: string): string {
  const digits = nomor.replace(/\D/g, "");
  const internationalDigits = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${internationalDigits}?text=${encodeURIComponent(pesan)}`;
}
