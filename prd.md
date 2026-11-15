# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Sistem Simulasi Keputusan Alokasi Kursi Bioskop (CineDecide Pro)
### Berdasarkan Soal Undian 13 - Proyek Akhir Pemrograman Web 1 (Universitas Pamulang)
**NIM:** 241011401829 | **Variasi NIM:** A=9, B=2, C=8, D=1, E=0 | **Seed:** 29

---

# ==============================================================================
# ZONA ATAS: SPESIFIKASI KEBUTUHAN PRODUK (BLUEPRINT AWAL)
# ==============================================================================

## 1. NAMA PROJEK & PROBLEM STATEMENT
- **Nama Aplikasi:** **CineDecide Pro** (Sistem Pendukung Keputusan & Simulasi Alokasi Kursi Bioskop).
- **Problem Statement:** 
  Pada operasional bioskop modern berkapasitas dinamis, proses pemesanan tiket bioskop kerap mengalami kendala saat jam padat (*peak hours*): pemesanan ganda (*double booking*), rombongan penonton yang terpisah kursi karena alokasi acak, dan kebuntuan saat baris kursi yang diinginkan telah penuh. Sistem ini dibangun sebagai simulator keputusan berbasis web murni (HTML5, CSS3, JavaScript Vanilla tanpa backend) yang memodelkan peta kursi bioskop 6x8 (48 kursi), mencegah pemesanan ganda, mencarikan kelompok kursi bersebelahan (*contiguous seats*), serta mengevaluasi 3 aturan konflik dengan menghasilkan minimal 2 solusi alternatif yang diurutkan berdasarkan tingkat risiko.

## 2. PERAN PENGGUNA (USER PERSONA)
- **Pengunjung / Mahasiswa (Simulasi User):** Memasukkan data simulasi (peta kursi awal, kursi terisi, jumlah penonton, preferensi baris, skenario lonjakan, batas tenggat waktu), melihat visualisasi peta kursi, dan mengamati hasil rekomendasi keputusan.
- **Dosen Penguji / Reviewer:** Menguji konsistensi logika keputusan dengan mengubah parameter input secara acak (live demo), meninjau 3 skenario uji resmi (Normal, Konflik, Invalid), dan memeriksa kelengkapan kompetensi akademik M1 s/d M17.

## 3. IDENTITAS MAHASISWA & RUMUS VARIASI NIM
- **NIM:** `241011401829`
- **Nama Mahasiswa:** Mahasiswa Teknik Informatika UNPAM (dapat disesuaikan)
- **Ekstraksi 5 Digit Terakhir (dari kanan ke kiri):**
  - **A (digit terakhir):** `9`
  - **B (digit ke-2 dari kanan):** `2`
  - **C (digit ke-3 dari kanan):** `8`
  - **D (digit ke-4 dari kanan):** `1`
  - **E (digit ke-5 dari kanan):** `0`
  - **2 Digit Terakhir (Seed Dataset):** `29`

### Matriks Aturan Khusus Sesuai Modulo:
| Parameter | Nilai Digit | Operasi Modulo | Hasil Modulo | Aturan Resmi Kasus Bioskop |
| :--- | :---: | :---: | :---: | :--- |
| **A** | 9 | `9 mod 3` | **0** | **Lonjakan Permintaan (+50%):** Saat mode lonjakan diaktifkan, jumlah penonton disimulasikan bertambah 50% untuk menguji batas alokasi kursi berdampingan. |
| **B** | 2 | `2 mod 3` | **2** | **Optimalkan Pemerataan / Keadilan (Fairness):** Sistem wajib menjelaskan alasan keputusan dengan memprioritaskan persebaran penonton yang proporsional di area pandang terbaik (tidak menumpuk di tepi ekstrim). |
| **C** | 8 | `8 mod 3` | **2** | **Tenggat Lebih Pendek (Strict Booking Timeout):** Aturan tambahan berupa pengetatan durasi reservasi kursi (3 menit holding time) untuk mencegah kursi tertahan di jam padat. |
| **D** | 1 | `1 mod 2` | **1** | **Urutan Evaluasi Menurut Tingkat Risiko (Risk Level):** Hasil alternatif keputusan wajib diurutkan dari risiko terendah (*Low Risk*) ke risiko tertinggi (*High Risk*). |
| **E** | 0 | `0 mod 2` | **0** | **Tata Letak Navigasi:** **Sidebar Kiri (Left Sidebar Layout)** dengan struktur DIV semantik. |
| **Seed**| 29 | N/A | **29** | **Seed Dataset Bioskop:** Harga dasar tiket = Rp 35.000 + (29 × 500) = **Rp 49.500**; Penomoran data awal: `FLM-2901` s/d `FLM-2910`, `TKT-2901`, Studio `STD-29`. |

## 4. ARSITEKTUR SISTEM & STRUKTUR FILE
Projek dibangun 100% menggunakan arsitektur web statis murni (*Client-Side In-Memory Evaluation Engine*) tanpa backend eksternal, sesuai pedoman mata kuliah Pemrograman Web 1 UNPAM.

```
c:\Users\andhi\OneDrive\Documents\Project Web/
│
├── index.html                 # Halaman Beranda (M1-M3, M5, M13)
├── profil.html                # Profil Mahasiswa & Perhitungan Variasi NIM (M1-M3, M6, M13)
├── katalog.html               # Data/Katalog Film & Studio Bioskop (M7 Tabel >= 10 baris, Seed 29)
├── multimedia.html            # Galeri Gambar, Audio Jingle, Video Trailer Lokal, iframe (M4, M10)
├── simulasi.html              # Form Interaktif Simulasi & Peta Kursi (M8 Form lengkap, M14-M17)
├── evaluasi.html              # Hasil Evaluasi, 2 Alternatif Solusi, Bukti 3 Skenario Uji (M16, M17)
├── frame_demo.html            # Halaman Demonstrasi Frameset Legacy (M9)
├── frame_header.html          # Sub-halaman header untuk demonstrasi frameset
├── frame_sidebar.html         # Sub-halaman sidebar untuk demonstrasi frameset
├── frame_content.html         # Sub-halaman konten untuk demonstrasi frameset
│
├── css/
│   └── style.css              # Seluruh styling CSS eksternal (M11-M13, Sidebar Kiri, Desain Anti-AI)
│
├── js/
│   ├── dataset.js             # Dataset awal 10 entri film & studio (Seed 29, Array of Objects)
│   └── simulation.js          # Engine logika keputusan alokasi kursi, konflik, alternatif & risiko
│
├── assets/
│   ├── images/                # Minimal 5 gambar poster film & denah studio bioskop
│   ├── audio/                 # Berkas audio intro/jingle bioskop lokal
│   └── video/                 # Berkas video trailer bioskop lokal
│
├── README.md                  # Panduan lengkap, identitas mahasiswa, dan langkah pengujian dosen
└── ZettBOT.md                 # File lisensi resmi dan gateway operating system ZettBOT
```

## 5. PEMETAAN KOMPETENSI AKADEMIK (M1 - M17)
1. **M1-3 (Struktur HTML & Teks):** Tag doctype, html, head, body, heading `h1`-`h6`, paragraf `p`, pemformatan `strong`, `em`, `mark`, `small`, `del`, `u`, serta entitas karakter khusus (`&copy;`, `&reg;`, `&bull;`, `&rarr;`, `&quot;`, `&amp;`).
2. **M4 (Multimedia Lokal):** Minimal 5 gambar poster film bioskop lokal di folder `assets/images/`, berkas audio jingle bioskop di `assets/audio/`, dan video trailer di `assets/video/` dengan tag HTML5 native `<audio controls>` dan `<video controls>`.
3. **M5 (Hyperlink Terintegrasi):** Tautan internal (navigasi antar halaman .html), tautan eksternal (link ke IMDb, UNPAM, Cinema XXI dengan target `_blank`), tautan anchor loncat (`#section-seed`, `#hasil-simulasi`), dan tautan `mailto:mahasiswa@unpam.ac.id`.
4. **M6 (Daftar List):** Ordered list `<ol>` untuk tata tertib bioskop & urutan prioritas aturan; Unordered list `<ul>` untuk fitur fasilitas studio; Definition list `<dl><dt><dd>` untuk glosarium istilah bioskop (Contiguous, Double Booking, Fairness Score, Risk Level).
5. **M7 (Tabel Lanjutan):** Tabel katalog penayangan film >= 10 baris di `katalog.html`, dilengkapi `<th>`, `<td>`, serta pemanfaatan `colspan` (header gabungan studio) dan `rowspan` (kategori film gabungan).
6. **M8 (Formulir Lengkap):** Form simulasi di `simulasi.html` memuat: `input type="text"` (nama pemesan), `radio` (pilihan tipe studio: Reguler/VIP), `checkbox` (aturan lonjakan permintaan +50%, aturan tenggat pendek), `select` dropdown (preferensi baris A-F), `textarea` (catatan khusus penonton), serta tombol `submit` ("Jalankan Simulasi Keputusan") dan `reset` ("Reset Peta & Form").
7. **M9 (Frameset Legacy):** Halaman terpisah `frame_demo.html` yang menggunakan tag `<frameset cols="260, *">` dan sub-frame `<frame src="...">` untuk memenuhi kompetensi legacy frameset.
8. **M10 (Inline Frame):** Tag `<iframe>` pada halaman `multimedia.html` dan `index.html` untuk memuat informasi pendukung atau peta interaktif.
9. **M11-12 (CSS Eksternal Terstruktur):** File `css/style.css` memuat selektor class, id, pseudo-class (`:hover`, `:focus`, `:active`, `:nth-child(even)`), font kustom Google Fonts, margin, padding, border, serta background gradients halus bertema Midnight Premiere.
10. **M13 (Layout Semantik DIV):** Tata letak Header, **Sidebar Kiri** (sesuai E mod 2 = 0), Main Content, dan Footer yang rapi dan seragam di semua halaman.
11. **M14-15 (JavaScript Eksternal & Variabel):** File `js/simulation.js`, deklarasi `const`, `let`, tipe data String, Number, Boolean, Array 2D, Object, serta operator aritmatika, relasional, dan logika.
12. **M16 (Logika Kontrol):** Percabangan `if / else if / else` untuk validasi input dan cek benturan aturan; struktur `switch(preferensiBaris)` untuk pemetaan baris bioskop; serta perulangan `for`, `while`, dan `forEach` untuk penelusuran kursi kosong bersebelahan.
13. **M17 (Fungsi Modular & Array):** Lebih dari 3 fungsi modular terpisah:
    - `initSeatMatrix()`: Inisialisasi peta 48 kursi bioskop (Baris A s/d F, Kolom 1 s/d 8).
    - `findContiguousSeats(matrix, row, count)`: Algoritma pencarian kursi berdampingan tanpa terpisah.
    - `evaluateConflictRules(request, studioState)`: Evaluasi 3 aturan benturan (Lonjakan, Keadilan, Tenggat Waktu).
    - `generateAlternativeSolutions(request, matrix)`: Pembuatan 2 solusi alternatif saat preferensi utama penuh.
    - `calculateRiskScore(solution)`: Perhitungan tingkat risiko alokasi dan pengurutan (*Risk Sorting*).

## 6. LOGIKA INTI KEPUTUSAN BIOSKOP & PENANGANAN KONFLIK
1. **Pencegahan Pemesanan Ganda (Anti Double-Booking):**
   Setiap kursi memiliki status unik (`available`, `booked`, `selected`). Sistem memverifikasi status kursi sebelum dialokasikan. Kursi yang telah berstatus `booked` dikunci dan tidak dapat dipilih ulang dalam transaksi baru.
2. **Tiga Aturan yang Saling Bertentangan:**
   - **Aturan 1 (Kebutuhan Kontiguitas):** Penonton meminta seluruh kursi berada dalam satu baris berdampingan.
   - **Aturan 2 (Lonjakan Permintaan A=0):** Beban kuantitas penonton naik +50% secara mendadak saat jam tayang favorit.
   - **Aturan 3 (Optimasi Keadilan B=2 & Tenggat Singkat C=2):** Alokasi kursi tidak boleh memonopoli satu area sayap saja, dan kursi terkunci otomatis dilepas jika transaksi tidak diselesaikan dalam 3 menit.
   - **Urutan Prioritas Aturan yang Ditetapkan Eksplisit:**
     `Prioritas 1: Integritas Kapasitas & Pencegahan Pemesanan Ganda` > 
     `Prioritas 2: Pemerataan / Keadilan Alokasi Baris (Fairness)` > 
     `Prioritas 3: Kedekatan Kursi (Contiguity)` > 
     `Prioritas 4: Toleransi Batas Waktu Tenggat (Timeout)`.
3. **Penyediaan Minimal 2 Alternatif Solusi:**
   - **Solusi Utama:** Seluruh kursi dialokasikan berdampingan pada baris preferensi yang diminta pemesan.
   - **Alternatif Solusi 1 (Baris Terdekat):** Jika baris preferensi tidak muat, sistem mencarikan kursi berdampingan penuh pada baris terdekat (misal minta Baris C, dialokasikan ke Baris D atau B).
   - **Alternatif Solusi 2 (Distribusi Seimbang / Split Fair):** Jika tidak ada satu baris pun yang muat menampung seluruh rombongan secara berdampingan, rombongan dibagi menjadi 2 sub-kelompok yang ditempatkan secara simetris dan adil pada baris berdekatan (misal 2 kursi di Baris C dan 2 kursi di Baris D, nomor kursi selaras).
4. **Pengurutan Hasil Berdasarkan Tingkat Risiko (D=1):**
   Setiap solusi dihitung skor risikonya:
   - *Skor Risiko Rendah (Low Risk)*: Nilai risiko 10-25% (Rombongan tetap satu baris, pandangan optimal).
   - *Skor Risiko Sedang (Medium Risk)*: Nilai risiko 30-55% (Pindah baris namun tetap bersama).
   - *Skor Risiko Tinggi (High Risk)*: Nilai risiko 60-85% (Rombongan terbagi 2 baris atau mendekati layar depan Baris A).
   Daftar alternatif solusi disajikan secara terurut dari risiko terendah ke tertinggi.
5. **Tiga Skenario Pengujian Wajib:**
   - **Skenario 1 (Normal):** Permintaan 3 kursi pada Baris C yang masih kosong banyak. Keputusan: Solusi Utama berhasil diaplikasikan langsung dengan risiko rendah.
   - **Skenario 2 (Konflik / Keterbatasan Kapasitas):** Permintaan 4 kursi pada Baris D dengan lonjakan aktif (+50% menjadi 6 kursi), sementara Baris D hanya menyisakan 3 kursi kosong. Keputusan: Sistem menolak pemesanan ganda di Baris D, menjelaskan alasan konflik, lalu menawarkan Alternatif 1 (Baris E penuh berdampingan) dan Alternatif 2 (Split Baris D & E) terurut risiko.
   - **Skenario 3 (Input Tidak Valid):** Jumlah kursi diisi 0 atau melebihi kapasitas studio (>10), atau memilih kursi yang sudah terisi. Keputusan: Validasi menolak proses, menampilkan pesan error informatif dan instruksi perbaikan yang jelas.

## 7. RENCANA TAMPILAN & ESTETIKA VISUAL (ANTI-AI AESTHETIC)
- **Tema Palet:** Midnight Premiere (Background Dark Slate `#0F172A`, Card Navy `#1E293B`, Border Halus `#334155`, Aksen Emas Bioskop `#EAB308` / `#F59E0B`, Teks Slate Light `#F8FAFC`).
- **Layout Struktur:**
  - **Header:** Logo CineDecide Pro, Judul Matakuliah Pemrograman Web 1 UNPAM, Indikator NIM Mahasiswa.
  - **Sidebar Kiri (E=0):** Navigasi Beranda, Profil, Katalog, Multimedia, Form Simulasi, Hasil Evaluasi, Demo Frame, serta Ringkasan Aturan NIM.
  - **Main Content:** Konten utama berbayangan lembut, kartu metrik grid, denah bioskop interaktif.
  - **Footer:** Hak cipta resmi &copy; 2026, NIM: 241011401829, Teknik Informatika Universitas Pamulang.

---

# ==============================================================================
# ZONA BAWAH: MASTER CONTEXT & LOGIKA SISTEM TERKINI (LIVING CONTEXT)
# ==============================================================================

- **Status Arsitektur:** Web Statis Murni (HTML5, CSS3, JavaScript Vanilla).
- **Format Pengumpulan:** Berkas ZIP bernama `241011401829_MahasiswaUNPAM_Soal13.zip` berisi seluruh source code, assets lokal, README.md, dan 3 screenshot/log skenario uji.
- **Konstanta Parameter NIM 241011401829:**
  - `SEED_DATASET = 29`
  - `BASE_PRICE = 49500` (Rp 35.000 + 29*500)
  - `RULE_A_SURGE = true` (+50% kuantitas penonton saat mode lonjakan)
  - `RULE_B_OPTIMIZE = "FAIRNESS"` (Pemerataan seimbang posisi pandang dan jarak lorong)
  - `RULE_C_TIMEOUT = 180` (Tenggat pendek 3 menit / 180 detik)
  - `RULE_D_SORT = "RISK_ASC"` (Urutkan alternatif dari risiko terendah)
  - `RULE_E_SIDEBAR = "LEFT"` (Sidebar kiri 260px)
- **Log Pembaruan Resmi:**
  - [v1.0.0] Inisialisasi PRD Blueprint lengkap berdasarkan foto lembar soal Undian 13 Pemrograman Web 1 UNPAM & NIM 241011401829. Menunggu persetujuan pengguna untuk eksekusi kode.
  - [v1.1.0] Eksekusi penuh implementasi kode selesai: 6 halaman utama + 1 legacy frameset demo, stylesheet Midnight Premiere, dataset 10 entri bioskop seed 29, engine keputusan bioskop, seluruh aset media vektor SVG lokal, dan README.md.
  - [v1.2.0] Penambahan Tabel Riwayat Pemesanan Tiket Bioskop Real-Time (Order History), generator ID Tiket otomatis TKT-2901 dst, pilihan 10 film bioskop di formulir simulasi, serta kartu modal E-Tiket Digital Bioskop resmi (Cinema XXI / CGV style). Sinkronisasi nama pemesan di simulasi.html dan evaluasi.html.
  - [v1.3.0] Pembatasan pemilihan kursi interaktif (Seat Selection Quota Lock): Jika jumlah penonton = N (misal 4), pemesan hanya dapat memilih maksimal N kursi (berwarna Emas). Sistem menolak pemilihan kursi ke-(N+1) dengan notifikasi batas kuota, serta menyediakan badge counter [Dipilih: X / N Kursi] dan tombol sakelar Mode Dosen.
  - [v1.4.0] Pengosongan seluruh kursi terisi awal: seluruh 48 kursi studio (A1-F8) berstatus 100% kosong (tersedia) saat halaman dibuka, memberikan kebebasan penuh alokasi penonton. Kursi terisi hanya muncul saat pesanan berhasil disimpan atau saat memuat Skenario 2 (Konflik Kapasitas).
  - [v1.5.0] Optimalisasi responsivitas kartu modal E-Tiket Digital Bioskop: perampingan dimensi (max-width: 400px, max-height: 90vh) dan barcode agar seluruh konten serta tombol cetak tiket PDF di bagian bawah pas sempurna (fit) di layar laptop tanpa terpotong. Penambahan tombol tutup cepat [X] di pojok kanan atas tiket.
  - [v1.6.0] Pembaruan total dataset film ke film bioskop nyata box-office (XXI / CGV / Cinepolis) sesuai permintaan: FLM-2901: 3726 MDPL: Ekspedisi Rinjani, FLM-2902: Bila Esok Ibu Tiada, FLM-2903: Gladiator II, FLM-2904: Kang Mak from Pee Mak, FLM-2905: Lembayung, FLM-2906: Moana 2, FLM-2907: Wicked, FLM-2908: Santet Segoro Pitu, FLM-2909: Sekawan Limo, FLM-2910: Petaka Gunung Gede. Sinkronisasi penuh di js/dataset.js, katalog.html, simulasi.html, multimedia.html, evaluasi.html, dan seluruh aset poster vektor lokal poster1.svg s/d poster5.svg.
  - [v1.7.0] Penguncian kuota pemilihan kursi interaktif (Strict Quota Lock) & pembersihan tuntas kursi merah: Jika Jumlah Penonton diisi N (misal 6), pemesan hanya dapat memilih maksimal N kursi (berwarna Emas). Sistem langsung menolak pemilihan kursi ke-(N+1) dengan notifikasi batas kuota, serta menyediakan badge counter visual [Dipilih: X / N Kursi]. Kursi merah sisa uji coba di baris E & F dibersihkan tuntas pada session storage sehingga peta kembali 100% bersih. Pilihan kursi manual terintegrasi langsung dengan konfirmasi tiket resmi.

