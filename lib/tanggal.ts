const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** Format ISO date ("2023-06-05") jadi "5 Juni 2023". */
export function formatTanggalIndonesia(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${BULAN[month - 1]} ${year}`;
}
