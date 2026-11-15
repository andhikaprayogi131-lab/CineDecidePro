/**
 * CineDecide Pro - Dataset Awal Bioskop
 * Proyek Akhir Pemrograman Web 1 - Soal Undian 13 (Universitas Pamulang)
 * NIM: 241011401829 | Seed Dataset: 29
 * Film Bioskop Nyata (Cinema XXI / CGV / Cinepolis)
 * Kompetensi: M14 - M15 (JavaScript Eksternal, Variabel, Tipe Data, Array of Objects)
 */

// Seed NIM 2 digit terakhir
const SEED_NIM = 29;

// Perhitungan Harga Dasar Tiket: Referensi Rp 35.000 + (29 * 500) = Rp 49.500
const BASE_TICKET_PRICE = 35000 + (SEED_NIM * 500); // 49500

/**
 * Dataset 10 Entri Jadwal & Film Bioskop Nyata (Array of Objects)
 * Menggunakan kode awalan Seed 29: FLM-2901 s/d FLM-2910
 */
const CINEMA_DATASET = [
  {
    id: "FLM-2901",
    judul: "3726 MDPL: Ekspedisi Rinjani",
    genre: "Adventure / Survival",
    durasi: "128 Menit",
    rating: "R13+",
    studio: "Studio 1 (Premiere)",
    studioCode: "STD-29A",
    format: "Dolby Atmos 2D",
    jamTayang: ["12:30", "15:45", "19:00", "21:45"],
    hargaDasar: BASE_TICKET_PRICE + 15000, // VIP Premiere Rp 64.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2902",
    judul: "Bila Esok Ibu Tiada",
    genre: "Drama / Keluarga",
    durasi: "110 Menit",
    rating: "SU",
    studio: "Studio 3 (Reguler)",
    studioCode: "STD-29C",
    format: "Digital 2D",
    jamTayang: ["11:30", "14:15", "17:00", "19:45"],
    hargaDasar: BASE_TICKET_PRICE, // Reguler Rp 49.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2903",
    judul: "Gladiator II",
    genre: "Action / Sejarah",
    durasi: "148 Menit",
    rating: "D17+",
    studio: "Studio 2 (IMAX)",
    studioCode: "STD-29B",
    format: "IMAX Laser 3D",
    jamTayang: ["13:00", "16:30", "20:00"],
    hargaDasar: BASE_TICKET_PRICE + 20000, // IMAX Rp 69.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2904",
    judul: "Kang Mak from Pee Mak",
    genre: "Horor / Komedi",
    durasi: "122 Menit",
    rating: "R13+",
    studio: "Studio 1 (Premiere)",
    studioCode: "STD-29A",
    format: "Dolby Atmos 2D",
    jamTayang: ["14:00", "18:00", "21:30"],
    hargaDasar: BASE_TICKET_PRICE + 15000, // Premiere Rp 64.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2905",
    judul: "Lembayung: Poliklinik Angker",
    genre: "Horor / Misteri",
    durasi: "123 Menit",
    rating: "D17+",
    studio: "Studio 2 (IMAX)",
    studioCode: "STD-29B",
    format: "IMAX Laser 2D",
    jamTayang: ["12:00", "15:00", "18:30"],
    hargaDasar: BASE_TICKET_PRICE + 20000, // IMAX Rp 69.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2906",
    judul: "Moana 2: The Ocean Journey",
    genre: "Animasi / Petualangan",
    durasi: "100 Menit",
    rating: "SU",
    studio: "Studio 3 (Reguler)",
    studioCode: "STD-29C",
    format: "Digital 2D",
    jamTayang: ["10:30", "13:00", "15:30"],
    hargaDasar: BASE_TICKET_PRICE, // Reguler Rp 49.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2907",
    judul: "Wicked: Defying Gravity",
    genre: "Fantasi / Musikal",
    durasi: "160 Menit",
    rating: "SU",
    studio: "Studio 2 (IMAX)",
    studioCode: "STD-29B",
    format: "70mm IMAX",
    jamTayang: ["13:15", "17:00", "20:45"],
    hargaDasar: BASE_TICKET_PRICE + 25000, // IMAX 70mm Rp 74.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2908",
    judul: "Santet Segoro Pitu",
    genre: "Horor / Supernatural",
    durasi: "115 Menit",
    rating: "D17+",
    studio: "Studio 3 (Reguler)",
    studioCode: "STD-29C",
    format: "Digital 2D",
    jamTayang: ["11:00", "13:45", "16:30", "19:15"],
    hargaDasar: BASE_TICKET_PRICE, // Reguler Rp 49.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2909",
    judul: "Sekawan Limo: Mitos Madyopuro",
    genre: "Komedi / Horor",
    durasi: "112 Menit",
    rating: "R13+",
    studio: "Studio 1 (Premiere)",
    studioCode: "STD-29A",
    format: "Dolby Atmos 2D",
    jamTayang: ["13:30", "16:45", "20:30"],
    hargaDasar: BASE_TICKET_PRICE + 15000, // Premiere Rp 64.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  },
  {
    id: "FLM-2910",
    judul: "Petaka Gunung Gede",
    genre: "Horor / Misteri Gunung",
    durasi: "105 Menit",
    rating: "R13+",
    studio: "Studio 3 (Reguler)",
    studioCode: "STD-29C",
    format: "Digital 3D",
    jamTayang: ["12:15", "15:15", "18:15", "21:15"],
    hargaDasar: BASE_TICKET_PRICE + 5000, // 3D Rp 54.500
    totalKursi: 48,
    kursiTerisi: 0,
    status: "Sedang Tayang"
  }
];

// Helper: Format Rupiah Standar Indonesia
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

// Konfigurasi Grid Peta Kursi Bioskop (6 Baris: A-F x 8 Kolom: 1-8 = 48 Kursi)
const CINEMA_ROWS = ["A", "B", "C", "D", "E", "F"];
const CINEMA_COLS = [1, 2, 3, 4, 5, 6, 7, 8];
