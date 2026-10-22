"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { lokasiList } from "@/content/kontak";
import styles from "./ContactForm.module.css";

// Tujuan tunggal: kontak Office Ostindo (CONTENT-VERBATIM.md §H1) — WhatsApp dan
// email dibaca dari content/kontak.ts, bukan di-hardcode.
const office = lokasiList.find((lokasi) => lokasi.slug === "office-agribisnis-jakarta");
const tujuan = {
  nomor: office?.kontak?.find((item) => item.tipe === "whatsapp")?.nilai ?? "",
  email: office?.email ?? "",
};

type FormState = {
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
};

type Kolom = keyof FormState;
type Errors = Partial<Record<Kolom, string>>;

/** Umpan balik setelah tombol kirim: error validasi, atau info bahwa aplikasi tujuan dibuka. */
type Notice = { tipe: "error" | "info"; teks: string; href?: string; hrefLabel?: string };

const initialState: FormState = {
  nama: "",
  email: "",
  telepon: "",
  subjek: "",
  pesan: "",
};

// Label field = istilah form sumber (CONTENT-VERBATIM.md §H1).
const LABEL: Record<Kolom, string> = {
  nama: "Nama Anda",
  email: "Alamat Email",
  telepon: "Nomor Telp",
  subjek: "Subjek",
  pesan: "Pesan",
};

// Bantuan pengisian browser (autofill) dan keyboard yang sesuai di perangkat sentuh.
const INPUT_ATTR: Partial<Record<Kolom, InputHTMLAttributes<HTMLInputElement>>> = {
  nama: { autoComplete: "name" },
  email: { autoComplete: "email", inputMode: "email" },
  telepon: { autoComplete: "tel", inputMode: "tel" },
  subjek: { autoComplete: "off" },
};

const URUTAN: Kolom[] = ["nama", "email", "telepon", "subjek", "pesan"];

// Validasi sederhana di sisi klien (tanpa backend) — pesan error = teks UI.
function validasi(form: FormState): Errors {
  const errors: Errors = {};
  for (const kolom of URUTAN) {
    if (!form[kolom].trim()) errors[kolom] = `${LABEL[kolom]} wajib diisi.`;
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Format alamat email belum benar.";
  }
  return errors;
}

function buildMessageBody(form: FormState): string {
  return [
    `Nama: ${form.nama}`,
    `Email: ${form.email}`,
    `Telepon: ${form.telepon}`,
    `Subjek: ${form.subjek}`,
    "",
    form.pesan,
  ].join("\n");
}

const fieldId = (kolom: Kolom) => `kontak-${kolom}`;
const errorId = (kolom: Kolom) => `kontak-${kolom}-error`;

/**
 * Form kontak tanpa backend: menyusun pesan lalu membukanya di WhatsApp (tab baru) atau
 * aplikasi email pengguna. Website tidak mengirim maupun menyimpan pesan — umpan balik
 * tidak pernah menyatakan pesan "terkirim".
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [pernahKirim, setPernahKirim] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  function updateField(kolom: Kolom, value: string) {
    const next = { ...form, [kolom]: value };
    setForm(next);
    // Setelah percobaan kirim pertama, error diperbarui saat pengguna mengetik.
    if (pernahKirim) setErrors(validasi(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Tombol kirim ada di luar submit default — guard supaya Enter tidak men-submit.
    event.preventDefault();
  }

  function handleKirim(kanal: "whatsapp" | "email") {
    setPernahKirim(true);
    const hasil = validasi(form);
    setErrors(hasil);

    const salah = URUTAN.filter((kolom) => hasil[kolom]);
    if (salah.length > 0) {
      setNotice({ tipe: "error", teks: `Ada ${salah.length} kolom yang perlu diperbaiki.` });
      document.getElementById(fieldId(salah[0]))?.focus();
      return;
    }

    const body = buildMessageBody(form);
    if (kanal === "whatsapp") {
      const url = buildWhatsAppUrl(tujuan.nomor, body);
      const tab = window.open(url, "_blank");
      if (tab) {
        tab.opener = null;
        setNotice({
          tipe: "info",
          teks: "WhatsApp dibuka di tab baru dengan pesan Anda. Tekan kirim di WhatsApp untuk mengirimkannya.",
        });
      } else {
        // Pop-up diblokir browser → beri tautan langsung.
        setNotice({
          tipe: "info",
          teks: "Tab WhatsApp tidak dapat dibuka otomatis.",
          href: url,
          hrefLabel: "Buka WhatsApp",
        });
      }
    } else {
      const subject = encodeURIComponent(form.subjek || "Pertanyaan dari website");
      setNotice({
        tipe: "info",
        teks: "Aplikasi email Anda dibuka dengan pesan yang sudah terisi. Kirim pesan dari aplikasi email tersebut.",
      });
      window.location.href = `mailto:${tujuan.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }
  }

  function renderField(kolom: Kolom, input: "input" | "textarea", type = "text") {
    const error = errors[kolom];
    const common = {
      id: fieldId(kolom),
      name: kolom,
      required: true,
      value: form[kolom],
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId(kolom) : undefined,
      className: error ? styles.invalid : undefined,
    };

    return (
      <div className={styles.field}>
        <label htmlFor={fieldId(kolom)}>
          {LABEL[kolom]}
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        </label>
        {input === "textarea" ? (
          <textarea {...common} rows={6} onChange={(event) => updateField(kolom, event.target.value)} />
        ) : (
          <input
            {...common}
            {...INPUT_ATTR[kolom]}
            type={type}
            onChange={(event) => updateField(kolom, event.target.value)}
          />
        )}
        {error && (
          <p id={errorId(kolom)} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <p className={styles.hint}>
        <span aria-hidden="true">* </span>Semua kolom wajib diisi.
      </p>

      <div className={styles.grid}>
        {renderField("nama", "input")}
        {renderField("email", "input", "email")}
        {renderField("telepon", "input", "tel")}
        {renderField("subjek", "input")}
      </div>
      {renderField("pesan", "textarea")}

      {/* Ringkasan error / info dibacakan pembaca layar (aria-live). */}
      <div
        role="status"
        aria-live="polite"
        className={notice ? (notice.tipe === "error" ? styles.summary : styles.info) : styles.srOnly}
      >
        {notice?.teks}
        {notice?.href && (
          <>
            {" "}
            <a href={notice.href} target="_blank" rel="noopener noreferrer" className={styles.noticeLink}>
              {notice.hrefLabel}
            </a>
          </>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" onClick={() => handleKirim("whatsapp")}>
          Kirim lewat WhatsApp
        </Button>
        <Button type="button" variant="outline" onClick={() => handleKirim("email")}>
          Kirim lewat email
        </Button>
      </div>

      <p className={styles.note}>Data form tidak disimpan di website ini.</p>
    </form>
  );
}
