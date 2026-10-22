import type { KontakItem } from "@/content/kontak";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Label UI per tipe kontak — satu sumber untuk halaman Kontak dan Footer. */
export const kontakLabel: Record<KontakItem["tipe"], string> = {
  telepon: "Telepon",
  whatsapp: "WhatsApp",
  fax: "Fax",
  instagram: "Instagram",
};

export function mapsUrl(alamat: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`;
}

export function telHref(nomor: string): string {
  const digits = nomor.replace(/\D/g, "");
  const international = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `tel:+${international}`;
}

/**
 * Tautan untuk satu item kontak; `undefined` bila tipenya tidak bisa ditautkan (fax).
 * `pesanWhatsApp` = teks awal percakapan WhatsApp.
 */
export function kontakHref(item: KontakItem, pesanWhatsApp: string): string | undefined {
  switch (item.tipe) {
    case "telepon":
      return telHref(item.nilai);
    case "whatsapp":
      return buildWhatsAppUrl(item.nilai, pesanWhatsApp);
    case "instagram":
      return `https://instagram.com/${item.nilai.replace(/^@/, "")}`;
    default:
      return undefined;
  }
}
