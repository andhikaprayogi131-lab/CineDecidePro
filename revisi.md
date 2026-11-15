# DRAF RENCANA REVISI: PENGUNCIAN KUOTA PEMILIHAN KURSI (MAKSIMAL N SESUAI JUMLAH PENONTON) & PEMBERSIHAN KURSI MERAH
================================================================================
STATUS: SELESAI DITERAPKAN (COMPLETED & APPLIED)
TANGGAL: 15 November 2026
PROJEK: CineDecide Pro (Soal Undian 13 - NIM: 241011401829)
================================================================================

## 1. LATAR BELAKANG & AKAR MASALAH (ROOT CAUSE ANALYSIS)
Dari tangkapan layar yang dikirimkan pengguna:
- Parameter: **Jumlah Penonton: 6**, **Preferensi Baris: Baris F**.
- Pada peta kursi, kursi baris **E1–E6** dan **F1–F6** (total 12 kursi) malah berubah menjadi **MERAH (Booked / Terisi)** dan pengguna masih bisa mengklik lebih dari 6 kursi tanpa batas.

### Mengapa hal ini bisa terjadi?
1. Pada callback klik kursi sebelumnya, fungsi yang terpasang adalah `toggleSeatOccupied()`. Fungsi tersebut memasukkan kursi yang diklik ke dalam `occupiedSeats` (status MERAH/terisi orang lain), BUKAN ke `selectedSeats` (status EMAS/kursi pilihan pemesan).
2. Belum ada validasi pengecekan kuota terhadap input **Jumlah Penonton** (`ticketCount`). Sehingga ketika pemesan mengisi 6 penonton, sistem tidak membatasi dan membiarkan pengguna mengklik hingga belasan kursi.
3. Kursi merah yang terlanjur terklik sebelumnya tersimpan di `sessionStorage` browser sehingga saat refresh kursi baris E dan F tetap tampak merah.

---

## 2. HASIL PERBAIKAN YANG TELAH DILAKUKAN

### A. Penguncian Kuota Pemilihan Kursi (Strict Seat Selection Quota Lock)
1. **Logika Validasi Batas Kuota:**
   - Membaca nilai **Jumlah Penonton** aktif (misal: 6 kursi).
   - Ketika pemesan mengklik kursi kosong (Biru):
     * Jika kursi yang sudah dipilih `< Jumlah Penonton`: Kursi berubah menjadi **EMAS (Selected)**.
     * Jika kursi yang sudah dipilih `== Jumlah Penonton`: **SISTEM MENOLAK KLIK KE-7!** Muncul notifikasi toast peringatan:
       *"Batas kuota tercapai! Jumlah penonton adalah 6, Anda hanya dapat memilih maksimal 6 kursi."*
   - Ketika pemesan mengklik kursi emas yang sudah ia pilih sebelumnya:
     * Kursi tersebut dilepas (unselect) kembali menjadi Biru (Tersedia).
     * Kuota berkurang kembali.

2. **Indikator Counter Visual Real-Time:**
   - Menambahkan badge status di samping judul Layar Studio:
     `<span id="seatSelectionCounter" class="badge badge-primary">Dipilih: X / N Kursi</span>`
   - Warna badge otomatis berubah menjadi **Hijau Sukses** ketika kuota kursi sudah tepat terisi 6/6:
     `[Lengkap: 6 / 6 Kursi Terpilih]`

3. **Pembersihan Bersih Kursi Merah (Reset Peta):**
   - Membersihkan seluruh sisa kursi merah di baris E dan F pada `sessionStorage` agar seluruh 48 kursi bioskop kembali **100% kosong & bersih** siap dipilih.
   - Tombol **Reset Peta** di pojok kanan atas diperbarui agar langsung membersihkan seluruh seleksi dan mengosongkan peta kursi seketika.

4. **Sakelar Mode Dosen vs Pemesan:**
   - Tombol `[Mode: Pilih Kursi (Emas)]` disediakan jika dosen ingin menguji kasus konflik kapasitas dengan menandai kursi merah (`Mode: Dosen (Isi Merah)`). Default mode adalah Mode Pemesan.

---

## 3. BERKAS YANG TELAH DISINKRONKAN
1. `simulasi.html`:
   - Callback kursi diganti menjadi `handleCustomerSeatSelection` (`handleSeatClick`) dengan batasan kuota ketat `ticketCount`.
   - Sinkronisasi event input Jumlah Penonton dan badge counter kuota.
   - Integrasi pilihan kursi manual ke form submit dan pembuatan e-tiket.
2. `js/simulation.js`:
   - Penambahan parameter `manualSeats` pada `runDecisionSimulation` agar alokasi manual langsung dikunci sebagai solusi utama.
3. `prd.md`:
   - Pencatatan log resmi versi `v1.7.0` di zona bawah PRD.
