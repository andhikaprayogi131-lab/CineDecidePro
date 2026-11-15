# CineDecide Pro &bull; Dokumentasi Proyek Akhir Pemrograman Web 1
## Soal Undian 13: Sistem Simulasi Keputusan Bidang Bioskop
**Universitas Pamulang &bull; Fakultas Ilmu Komputer &bull; Program Studi Teknik Informatika**

---

### 👤 IDENTITAS MAHASISWA & PENUGASAN
- **Nama Mahasiswa:** Mahasiswa Teknik Informatika UNPAM
- **NIM:** `241011401829`
- **Mata Kuliah:** Pemrograman Web 1 (S-1 Teknik Informatika)
- **Nomor Undian:** **Soal 13 (Bidang Bioskop)**
- **Format Penamaan ZIP Pengumpulan:** `241011401829_MahasiswaUNPAM_Soal13.zip`

---

### 📊 KALKULASI RUMUS VARIASI NIM: `241011401829`
Menggunakan 5 digit terakhir NIM dari kanan ke kiri:
`2 4 1 0 1 1 4 0 1 8 2 9` &rarr; **A=9, B=2, C=8, D=1, E=0**, Seed: **29**.

| Parameter | Digit | Rumus Modulo | Hasil | Aturan Resmi Kasus Bioskop |
| :--- | :---: | :---: | :---: | :--- |
| **A** | `9` | `9 mod 3` | **0** | **Lonjakan Permintaan (+50% Penonton):** Saat jam tayang favorit diaktifkan, jumlah pemesanan tiket bertambah 50% untuk menguji daya tampung baris studio. |
| **B** | `2` | `2 mod 3` | **2** | **Optimalkan Pemerataan / Keadilan (Fairness Score):** Sistem wajib menjelaskan alasan urutan keputusan, mengutamakan distribusi kursi simetris menuju titik tengah layar (Kolom 4 & 5). |
| **C** | `8` | `8 mod 3` | **2** | **Tenggat Lebih Pendek (Holding Time 180s):** Aturan nyata pengetatan durasi reservasi kursi (3 menit countdown) untuk mencegah penahanan kursi sepihak. |
| **D** | `1` | `1 mod 2` | **1** | **Urutkan Hasil Menurut Tingkat Risiko (Risk Level):** Alternatif solusi disusun berurutan dari risiko terendah (*Low Risk*) ke risiko tertinggi (*High Risk*). |
| **E** | `0` | `0 mod 2` | **0** | **Tata Letak Navigasi Antarmuka:** Menggunakan **Sidebar Kiri (Left Sidebar)** selebar 270px dengan struktur DIV semantik. |
| **Seed** | `29` | N/A | **29** | **Seed Dataset Konsisten:** Harga tiket dasar = Rp 35.000 + (29 &times; 500) = **Rp 49.500**. ID Film: `FLM-2901` s/d `FLM-2910`, Studio `STD-29A`. |

---

### 📂 STRUKTUR DIREKTORI PROYEK
```
Project Web/
│
├── index.html                 # Halaman Beranda (M1-M3, M5, M6, M13)
├── profil.html                # Profil Mahasiswa & Rincian Variasi NIM (M1-M3, M6, M13)
├── katalog.html               # Data/Katalog Film & Studio Bioskop (M7 Tabel >= 10 baris, Seed 29)
├── multimedia.html            # Galeri Gambar, Audio Jingle, Video Trailer Lokal, iFrame (M4, M10)
├── simulasi.html              # Form Interaktif Simulasi & Peta Kursi 6x8 (M8 Form lengkap, M14-M17)
├── evaluasi.html              # Hasil Evaluasi, 2 Alternatif Solusi, Bukti 3 Skenario Uji (M16, M17)
├── frame_demo.html            # Halaman Khusus Demonstrasi Frameset Legacy (M9)
├── frame_header.html          # Sub-frame header untuk demonstrasi frameset
├── frame_sidebar.html         # Sub-frame sidebar untuk demonstrasi frameset
├── frame_content.html         # Sub-frame konten untuk demonstrasi frameset
│
├── css/
│   └── style.css              # Stylesheet eksternal bertema Midnight Premiere (Anti-AI Aesthetic, M11-M13)
│
├── js/
│   ├── dataset.js             # Dataset awal 10 entri film & studio (Seed 29, Array of Objects, M14-M15)
│   └── simulation.js          # Engine keputusan alokasi kursi, konflik, alternatif & risiko (M16-M17)
│
├── assets/
│   ├── images/                # 6 Poster film & denah studio bioskop vektor SVG lokal (M4)
│   ├── audio/                 # Berkas audio intro/jingle bioskop lokal (M4)
│   └── video/                 # Berkas video trailer bioskop lokal (M4)
│
├── prd.md                     # Master Product Requirements Document & living context
├── ZettBOT.md                 # Berkas sakelar lisensi resmi ZettBOT by Zettbos
└── README.md                  # Petunjuk lengkap pengujian dan laporan proyek
```

---

### 🎯 CHECKLIST PEMENUHAN KOMPETENSI KURIKULUM (M1 &ndash; M17)
1. **M1 &ndash; M3 (Struktur & Teks):** Tag doctype, html, head, body, heading `h1`-`h6`, format `strong`, `em`, `mark`, `small`, `del`, entitas karakter khusus `&copy;`, `&reg;`, `&bull;`, `&rarr;`, `&quot;`, `&amp;`.
2. **M4 (Multimedia Lokal):** 6 gambar poster film dan denah studio SVG lokal di `assets/images/`, berkas audio jingle di `assets/audio/`, dan video trailer di `assets/video/`.
3. **M5 (Hyperlink):** Tautan internal navigasi halaman `.html`, tautan eksternal ke IMDb & UNPAM (`target="_blank"`), anchor link `#id`, dan tautan `mailto:`.
4. **M6 (List):** Ordered list `<ol>` untuk urutan prioritas, unordered list `<ul>` untuk fitur, dan definition list `<dl><dt><dd>` untuk glosarium bioskop.
5. **M7 (Tabel Lanjutan):** Tabel katalog 10 baris di `katalog.html` dengan pemanfaatan `<th>`, `<td>`, `colspan` (header studio dan footer rekapitulasi), serta `rowspan` (pengelompokan tipe studio).
6. **M8 (Formulir):** Form simulasi lengkap memuat `text`, `radio`, `checkbox`, `select`, `textarea`, tombol `submit`, dan tombol `reset`.
7. **M9 (Frameset Legacy):** Halaman demonstrasi terpisah `frame_demo.html` menggunakan `<frameset rows="64, *">` dan `<frameset cols="250, *">`.
8. **M10 (Inline Frame):** Tag `<iframe>` proporsional disematkan di `multimedia.html` dan `index.html`.
9. **M11 &ndash; M12 (CSS Eksternal):** File `css/style.css` memuat selektor class, id, pseudo-class (`:hover`, `:focus`, `:active`, `:nth-child`), font Google (Space Grotesk & Plus Jakarta Sans), margin/padding, border halus, dan background gradient tema Midnight Premiere.
10. **M13 (Layout Semantik DIV):** Tata letak Header, **Sidebar Kiri (E=0)** selebar 270px, Main Content responsive, dan Footer penutup.
11. **M14 &ndash; M15 (JavaScript Eksternal):** File `js/dataset.js` dan `js/simulation.js`, deklarasi `const`, `let`, tipe data String, Number, Boolean, Array of Objects, Array 2 Dimensi.
12. **M16 (Logika Kontrol):** Percabangan `if / else if / else`, `switch-case`, serta perulangan `for`, `while`, dan `forEach`.
13. **M17 (Fungsi Modular & Array):** 7 fungsi modular (`initSeatMatrix`, `findContiguousSeatsInRow`, `calculateFairnessScore`, `calculateRiskLevel`, `runDecisionSimulation`, `renderSeatGrid`, `startHoldingTimer`).

---

### 🧪 BUKTI 3 SKENARIO PENGUJIAN AKADEMIK
Sistem telah dilengkapi tombol pintasan instan di sidebar halaman `simulasi.html` dan `evaluasi.html` untuk mempermudah demonstrasi di depan Dosen Penguji:

#### 1. Skenario 1 &mdash; Keadaan Normal (Kapasitas Cukup)
- **Input:** Pemesan: *Ahmad Faisal*, Jumlah Tiket: *3 Kursi*, Preferensi: *Baris C*, Mode Lonjakan: *Nonaktif*.
- **Logika:** Baris C memiliki kursi kosong berdampingan. Kursi C1, C2, C3 berhasil dialokasikan.
- **Hasil Keputusan:** Solusi Utama berhasil diaplikasikan secara instan.
- **Evaluasi:** Fairness Score: 75/100, Tingkat Risiko: **Low Risk (15%)**. Anti-pemesanan ganda terverifikasi.

#### 2. Skenario 2 &mdash; Keadaan Konflik / Keterbatasan Kapasitas
- **Input:** Pemesan: *Rombongan Bioskop*, Jumlah Tiket: *4 Kursi*, Preferensi: *Baris D (VIP)*, **Mode Lonjakan A=0 (+50%): AKTIF &rarr; Menjadi 6 Kursi**, Kursi D1 s/d D5 terisi.
- **Logika:** Terjadi benturan 3 aturan (Permintaan 6 kursi contiguous bertentangan dengan sisa 3 kursi di Baris D). Sistem mencegah pemesanan ganda di Baris D dan mengevaluasi alternatif.
- **Hasil Keputusan:** Sistem menolak pemesanan ganda di Baris D, menyajikan penjelasan keputusan yang mengutamakan keadilan (Fairness), dan menghasilkan **2 alternatif solusi terurut tingkat risiko (D mod 2 = 1)**:
  1. *Alternatif 1 (Baris Terdekat E):* [E1, E2, E3, E4, E5, E6] &bull; **Medium Risk (42%)** &mdash; Rombongan tetap utuh bersebelahan.
  2. *Alternatif 2 (Split Baris D & E):* 3 kursi di D, 3 kursi di E &bull; **High Risk (70%)** &mdash; Rombongan terbagi 2 baris sejajar.

#### 3. Skenario 3 &mdash; Keadaan Input Tidak Valid (Validasi Form)
- **Input:** Nama: *(Kosong)*, Jumlah Tiket: *15 Kursi* (Melebihi batas maksimal 10 kursi).
- **Logika:** Sistem mencegat pengiriman formulir pada layer validasi input data primitif.
- **Hasil Keputusan:** Validasi ditolak, sistem memunculkan pesan error eksplisit:
  * *Pesan Penyebab:* "Jumlah tiket harus di antara 1 sampai 10 dan nama pemesan tidak boleh kosong."
  * *Rekomendasi Perbaikan:* "Harap isi nama pemesan dan kurangi kuantitas tiket ke batas 1 s/d 10 kursi."

---

### 🚀 CARA MENJALANKAN APLIKASI
Aplikasi ini dibangun 100% menggunakan web statis murni tanpa server backend atau database eksternal:
1. Cukup buka berkas **`index.html`** langsung menggunakan peramban modern apapun (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
2. Navigasi ke menu **Form Simulasi** (`simulasi.html`) untuk mencoba mengalokasikan kursi atau klik tombol **1. Skenario Normal**, **2. Skenario Konflik**, atau **3. Skenario Input Invalid** untuk melihat respon otomatis algoritma.
3. Klik kursi pada denah visual untuk mengubah status kursi menjadi *Booked* atau *Available* secara real-time.
4. Buka halaman **Hasil & Evaluasi** (`evaluasi.html`) untuk melihat rincian kalkulasi risiko dan mencetak laporan via tombol **Cetak / Simpan Bukti PDF**.
5. Buka halaman **Demo Frameset (M9)** (`frame_demo.html`) untuk melihat demonstrasi arsitektur frame legacy.

---
*(c) 2026 Mahasiswa Teknik Informatika UNPAM &bull; CineDecide Pro &bull; ZettBOT Operating System*

