"use client";

import { useRef, useState, type FormEvent } from "react";
import { PillButton } from "@/components/ui/PillButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import styles from "./ContactForm.module.css";

type UnitUsaha = "kontraktor" | "alat-berat" | "trading" | "agribisnis";

const unitLabel: Record<UnitUsaha, string> = {
  kontraktor: "Kontraktor",
  "alat-berat": "Alat Berat",
  trading: "Trading",
  agribisnis: "Agribisnis",
};

// Routing kontak per unit — CONTENT-VERBATIM.md §H / brief Fase 6+7+8.
const routingByUnit: Record<UnitUsaha, { nomor: string; email: string }> = {
  kontraktor: { nomor: "0811-783-675", email: "info@cakraindopratama.com" },
  "alat-berat": { nomor: "0811-783-675", email: "info@cakraindopratama.com" },
  trading: { nomor: "0811-783-675", email: "info@cakraindopratama.com" },
  agribisnis: { nomor: "+62 819 2922 6666", email: "ostindo_mail@yahoo.com" },
};

type FormState = {
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
  unit: UnitUsaha;
};

const initialState: FormState = {
  nama: "",
  email: "",
  telepon: "",
  subjek: "",
  pesan: "",
  unit: "kontraktor",
};

function buildMessageBody(form: FormState): string {
  return [
    `Nama: ${form.nama}`,
    `Email: ${form.email}`,
    `Telepon: ${form.telepon}`,
    `Unit usaha: ${unitLabel[form.unit]}`,
    `Subjek: ${form.subjek}`,
    "",
    form.pesan,
  ].join("\n");
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(initialState);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Tombol pengirim sebenarnya ada di luar <form> submit default — ini
    // hanya guard supaya Enter di field teks tidak men-submit browser-native.
    event.preventDefault();
  }

  function handleKirim(tujuan: "whatsapp" | "email") {
    if (!formRef.current?.reportValidity()) return;

    const routing = routingByUnit[form.unit];
    const body = buildMessageBody(form);

    if (tujuan === "whatsapp") {
      window.open(buildWhatsAppUrl(routing.nomor, body), "_blank", "noopener,noreferrer");
    } else {
      const subject = encodeURIComponent(form.subjek || "Pertanyaan dari website");
      window.location.href = `mailto:${routing.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate={false}>
      <div className={styles.field}>
        <label htmlFor="kontak-nama">Nama Anda</label>
        <input
          id="kontak-nama"
          name="nama"
          type="text"
          required
          value={form.nama}
          onChange={(event) => updateField("nama", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="kontak-email">Alamat Email</label>
        <input
          id="kontak-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="kontak-telepon">Nomor Telp</label>
        <input
          id="kontak-telepon"
          name="telepon"
          type="tel"
          required
          value={form.telepon}
          onChange={(event) => updateField("telepon", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="kontak-unit">Unit usaha</label>
        <select
          id="kontak-unit"
          name="unit"
          value={form.unit}
          onChange={(event) => updateField("unit", event.target.value as UnitUsaha)}
        >
          {Object.entries(unitLabel).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="kontak-subjek">Subjek</label>
        <input
          id="kontak-subjek"
          name="subjek"
          type="text"
          required
          value={form.subjek}
          onChange={(event) => updateField("subjek", event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="kontak-pesan">Pesan</label>
        <textarea
          id="kontak-pesan"
          name="pesan"
          required
          rows={5}
          value={form.pesan}
          onChange={(event) => updateField("pesan", event.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <PillButton type="button" onClick={() => handleKirim("whatsapp")}>
          Kirim lewat WhatsApp
        </PillButton>
        <button type="button" className={styles.btnSecondary} onClick={() => handleKirim("email")}>
          Kirim lewat email
        </button>
      </div>

      <p className={styles.note}>Data form tidak disimpan di website ini.</p>
    </form>
  );
}
