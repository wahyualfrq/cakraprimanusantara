import type { ReactNode } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Variant = "solid" | "outline-glass" | "glass";

type WhatsAppLinkProps = {
  nomor: string;
  pesan: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Link wa.me siap pakai — pesan sudah terisi sesuai konteks halaman pemanggil. */
export function WhatsAppLink({ nomor, pesan, children, variant = "solid", className }: WhatsAppLinkProps) {
  return (
    <PillButton
      href={buildWhatsAppUrl(nomor, pesan)}
      variant={variant}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </PillButton>
  );
}
