/**
 * CineDecide Pro - Decision Engine & Seat Allocation Simulator
 * Proyek Akhir Pemrograman Web 1 - Soal Undian 13 (Universitas Pamulang)
 * NIM: 241011401829
 * Variasi NIM:
 *   A mod 3 = 0 -> Lonjakan Permintaan (+50% pemesanan)
 *   B mod 3 = 2 -> Optimalkan Pemerataan/Keadilan (Fairness) & Penjelasan Urutan
 *   C mod 3 = 2 -> Tenggat Lebih Pendek (Holding Time 180s)
 *   D mod 2 = 1 -> Urutkan Hasil Menurut Tingkat Risiko (Risk Level)
 *   E mod 2 = 0 -> Layout Sidebar Kiri
 * Kompetensi: M14-M17 (JS Eksternal, Variabel, Operator, If/Else, Switch, Loop, Functions, Array 2D)
 */

// Konstanta Parameter NIM Mahasiswa
const NIM_CONFIG = {
  nim: "241011401829",
  digitA: 9, // 9 mod 3 = 0 (Lonjakan Permintaan)
  digitB: 2, // 2 mod 3 = 2 (Optimalkan Pemerataan/Keadilan)
  digitC: 8, // 8 mod 3 = 2 (Tenggat Lebih Pendek)
  digitD: 1, // 1 mod 2 = 1 (Urutkan Menurut Tingkat Risiko)
  digitE: 0, // 0 mod 2 = 0 (Sidebar Kiri)
  seed: 29
};

// State Peta Kursi Global In-Memory
let seatMatrix = {};
let occupiedSeats = new Set();
let selectedSeats = new Set();
let timerCountdown = null;
let remainingSeconds = 180; // 3 Menit (Aturan C mod 3 = 2)

/**
 * M17 Function 1: Inisialisasi Matriks Kursi 6x8 (48 Kursi: A1 - F8)
 * Menggunakan Loop for dan struktur Array/Objek
 */
function initSeatMatrix(defaultOccupiedList = []) {
  seatMatrix = {};
  occupiedSeats = new Set(defaultOccupiedList);
  selectedSeats.clear();

  // M16: Loop bersarang (Nested Loops) untuk membangun matriks 6x8
  for (let r = 0; r < CINEMA_ROWS.length; r++) {
    const rowName = CINEMA_ROWS[r];
    seatMatrix[rowName] = [];
    
    for (let c = 1; c <= 8; c++) {
      const seatCode = rowName + c;
      const isBooked = occupiedSeats.has(seatCode);
      
      seatMatrix[rowName].push({
        code: seatCode,
        row: rowName,
        col: c,
        status: isBooked ? "booked" : "available"
      });
    }
  }
  return seatMatrix;
}

/**
 * Inisialisasi Default Kursi Terisi untuk Simulasi Awal
 * Mengembalikan array kosong agar seluruh 48 kursi bioskop 100% kosong & tersedia
 */
function getDefaultOccupiedSeats() {
  return [];
}

/**
 * M17 Function 2: Algoritma Pencarian Kelompok Kursi Berdampingan (Contiguous Seats)
 * Mencari k ketersediaan kursi bersebelahan tanpa terputus
 */
function findContiguousSeatsInRow(rowName, countNeeded) {
  const rowSeats = seatMatrix[rowName];
  if (!rowSeats) return [];

  const availableIndices = [];
  // M16: forEach loop untuk memindai kursi kosong
  rowSeats.forEach((seat, idx) => {
    if (seat.status === "available" && !occupiedSeats.has(seat.code)) {
      availableIndices.push(idx);
    }
  });

  // Cari subarray contiguous dengan panjang 'countNeeded'
  const candidateGroups = [];
  for (let i = 0; i <= availableIndices.length - countNeeded; i++) {
    let isContiguous = true;
    const currentGroup = [];

    for (let j = 0; j < countNeeded; j++) {
      const seatIdx = availableIndices[i + j];
      // Pastikan indeks kolom berurutan fisik
      if (j > 0 && seatIdx !== availableIndices[i + j - 1] + 1) {
        isContiguous = false;
        break;
      }
      currentGroup.push(rowSeats[seatIdx].code);
    }

    if (isContiguous) {
      candidateGroups.push(currentGroup);
    }
  }

  return candidateGroups;
}

/**
 * M17 Function 3: Evaluasi Pemerataan / Keadilan Posisi Kursi (B mod 3 = 2)
 * Mengukur skor keadilan posisi pandang (Fairness Score) menuju titik tengah layar (Kolom 4 & 5)
 */
function calculateFairnessScore(seatCodes) {
  if (!seatCodes || seatCodes.length === 0) return 0;
  
  let totalDistanceToCenter = 0;
  seatCodes.forEach(code => {
    const colNum = parseInt(code.substring(1), 10);
    // Jarak dari pusat studio (antara kolom 4 dan 5 = 4.5)
    const distance = Math.abs(colNum - 4.5);
    totalDistanceToCenter += distance;
  });

  const avgDistance = totalDistanceToCenter / seatCodes.length;
  // Skor keadilan: 100 poin maksimal untuk posisi tengah simetris
  const fairnessScore = Math.max(10, Math.round(100 - (avgDistance * 20)));
  return fairnessScore;
}

/**
 * M17 Function 4: Evaluasi Tingkat Risiko Keputusan (D mod 2 = 1)
 * Menghitung persentase risiko berdasarkan contiguity, row distance, dan pemisahan
 */
function calculateRiskLevel(solutionType, isContiguous, rowDistance, fairnessScore) {
  let riskPercent = 0;
  let riskCategory = "Low Risk";

  // M16: Percabangan if/else bertingkat
  if (solutionType === "PRIMARY" && isContiguous) {
    riskPercent = Math.max(10, 30 - Math.round(fairnessScore * 0.15));
    riskCategory = "Low Risk";
  } else if (solutionType === "ALT_ROW" && isContiguous) {
    riskPercent = 35 + (rowDistance * 8);
    riskCategory = "Medium Risk";
  } else if (solutionType === "SPLIT_FAIR") {
    riskPercent = 65 + (rowDistance * 5);
    riskCategory = "High Risk";
  } else {
    riskPercent = 85;
    riskCategory = "High Risk";
  }

  return {
    score: riskPercent,
    category: riskCategory
  };
}

/**
 * M17 Function 5: Simulasi Keputusan Utama & Pembuatan Solusi Alternatif
 * Mencegah pemesanan ganda, menerapkan 3 aturan bertentangan, dan mengurutkan hasil menurut resiko
 */
function runDecisionSimulation(inputData) {
  const result = {
    isValid: true,
    scenarioType: "NORMAL",
    customerName: inputData.customerName || "Budi Santoso",
    movieTitle: inputData.movieTitle || "Dune: Prophecy of Arrakis",
    studioName: inputData.studioName || "Studio 1 (Premiere VIP)",
    surgeApplied: false,
    originalCount: inputData.ticketCount,
    effectiveCount: inputData.ticketCount,
    preferredRow: inputData.preferredRow,
    conflictReasons: [],
    primarySolution: null,
    alternatives: [],
    recommendedAction: "",
    timestamp: new Date().toLocaleTimeString("id-ID")
  };

  // M16: Validasi Input (Skenario 3: Input Tidak Valid)
  if (!inputData.customerName || inputData.customerName.trim() === "") {
    result.isValid = false;
    result.scenarioType = "INVALID";
    result.conflictReasons.push("Nama pemesan tidak boleh kosong.");
    result.recommendedAction = "Harap masukkan nama pemesan pada kolom formulir.";
    return result;
  }

  if (isNaN(inputData.ticketCount) || inputData.ticketCount < 1 || inputData.ticketCount > 10) {
    result.isValid = false;
    result.scenarioType = "INVALID";
    result.conflictReasons.push("Jumlah penonton harus di antara 1 hingga 10 tiket per transaksi.");
    result.recommendedAction = "Ubah kuantitas tiket ke angka 1 sampai 10 sesuai kapasitas studio.";
    return result;
  }

  // ATURAN 1 (A mod 3 = 0): Lonjakan Permintaan (+50%)
  if (inputData.enableSurge) {
    result.surgeApplied = true;
    result.effectiveCount = Math.ceil(inputData.ticketCount * 1.5);
    result.conflictReasons.push(
      `Aturan Lonjakan Jam Favorit (A mod 3 = 0) AKTIF: Permintaan penonton melonjak +50% dari ${inputData.ticketCount} menjadi ${result.effectiveCount} kursi.`
    );
  }

  const count = result.effectiveCount;
  const prefRow = result.preferredRow;

  // PRIORITAS PILIHAN MANUAL: Jika pemesan memilih sendiri kursi di denah (manualSeats) & jumlahnya sesuai kuota
  if (inputData.manualSeats && Array.isArray(inputData.manualSeats) && inputData.manualSeats.length === count) {
    const fairness = calculateFairnessScore(inputData.manualSeats);
    const risk = calculateRiskLevel("PRIMARY", true, 0, fairness);

    result.primarySolution = {
      type: "Solusi Pilihan Pemesan (Manual Terkunci)",
      seats: inputData.manualSeats,
      row: inputData.manualSeats[0].charAt(0),
      isContiguous: true,
      fairnessScore: fairness,
      risk: risk,
      explanation: `Seluruh ${count} kursi pilihan pemesan (${inputData.manualSeats.join(", ")}) berhasil dikunci dan dialokasikan ke e-tiket resmi.`
    };

    result.scenarioType = result.surgeApplied ? "SURGE_NORMAL" : "NORMAL";
    result.recommendedAction = "Konfirmasi pemesanan segera sebelum tenggat 180 detik berakhir.";
    return result;
  }

  // Cek ketersediaan kursi di baris preferensi secara algoritmis otomatis
  const primaryCandidates = findContiguousSeatsInRow(prefRow, count);

  if (primaryCandidates.length > 0) {
    // Solusi Utama Berhasil
    // M16: Pilih kelompok dengan Fairness Score terbaik (B mod 3 = 2)
    primaryCandidates.sort((a, b) => calculateFairnessScore(b) - calculateFairnessScore(a));
    const bestPrimarySeats = primaryCandidates[0];
    const fairness = calculateFairnessScore(bestPrimarySeats);
    const risk = calculateRiskLevel("PRIMARY", true, 0, fairness);

    result.primarySolution = {
      type: "Solusi Utama (Baris Pilihan)",
      seats: bestPrimarySeats,
      row: prefRow,
      isContiguous: true,
      fairnessScore: fairness,
      risk: risk,
      explanation: `Seluruh ${count} penonton berhasil dialokasikan berdampingan pada Baris ${prefRow} dengan posisi simetris terbaik menuju tengah layar (Fairness ${fairness}/100).`
    };

    result.scenarioType = result.surgeApplied ? "SURGE_NORMAL" : "NORMAL";
    result.recommendedAction = "Konfirmasi pemesanan segera sebelum tenggat 180 detik berakhir.";
  } else {
    // Terjadi Konflik / Keterbatasan Kapasitas (Skenario 2)
    result.scenarioType = "CONFLICT";
    result.conflictReasons.push(
      `Pencegahan Pemesanan Ganda: Baris ${prefRow} tidak memiliki ${count} kursi kosong berdampingan (kursi telah terisi / kapasitas penuh).`
    );

    // ALTERNATIF 1: Cari baris terdekat yang muat seluruh rombongan secara berdampingan
    let altRowFound = null;
    let minDistance = 99;

    const prefIdx = CINEMA_ROWS.indexOf(prefRow);
    for (let i = 0; i < CINEMA_ROWS.length; i++) {
      if (i === prefIdx) continue;
      const testRow = CINEMA_ROWS[i];
      const candidates = findContiguousSeatsInRow(testRow, count);
      
      if (candidates.length > 0) {
        const dist = Math.abs(i - prefIdx);
        if (dist < minDistance) {
          minDistance = dist;
          candidates.sort((a, b) => calculateFairnessScore(b) - calculateFairnessScore(a));
          altRowFound = {
            row: testRow,
            seats: candidates[0],
            distance: dist
          };
        }
      }
    }

    if (altRowFound) {
      const fairnessAlt = calculateFairnessScore(altRowFound.seats);
      const riskAlt = calculateRiskLevel("ALT_ROW", true, altRowFound.distance, fairnessAlt);
      
      result.alternatives.push({
        id: "ALT-01",
        title: `Alternatif 1: Pindah ke Baris Terdekat (${altRowFound.row})`,
        seats: altRowFound.seats,
        isContiguous: true,
        fairnessScore: fairnessAlt,
        risk: riskAlt,
        explanation: `Rombongan dialokasikan utuh berdampingan di Baris ${altRowFound.row} (selisih ${altRowFound.distance} baris dari preferensi Anda) guna menjaga kebersamaan menonton.`
      });
    }

    // ALTERNATIF 2: Distribusi Adil / Split Seimbang pada 2 Baris Berdekatan
    const splitCount1 = Math.ceil(count / 2);
    const splitCount2 = count - splitCount1;
    let splitSolution = null;

    // Coba pasangkan baris pref dengan baris sebelah
    const adjacentRowIndices = [prefIdx - 1, prefIdx + 1].filter(idx => idx >= 0 && idx < CINEMA_ROWS.length);
    
    for (let adjIdx of adjacentRowIndices) {
      const adjRow = CINEMA_ROWS[adjIdx];
      const group1 = findContiguousSeatsInRow(prefRow, splitCount1);
      const group2 = findContiguousSeatsInRow(adjRow, splitCount2);

      if (group1.length > 0 && group2.length > 0) {
        splitSolution = {
          seats: [...group1[0], ...group2[0]],
          rows: `${prefRow} & ${adjRow}`,
          distance: 1
        };
        break;
      }
    }

    // Jika baris pref benar-benar tidak muat splitCount1, cari 2 baris berdekatan manapun
    if (!splitSolution) {
      for (let i = 0; i < CINEMA_ROWS.length - 1; i++) {
        const r1 = CINEMA_ROWS[i];
        const r2 = CINEMA_ROWS[i + 1];
        const g1 = findContiguousSeatsInRow(r1, splitCount1);
        const g2 = findContiguousSeatsInRow(r2, splitCount2);

        if (g1.length > 0 && g2.length > 0) {
          splitSolution = {
            seats: [...g1[0], ...g2[0]],
            rows: `${r1} & ${r2}`,
            distance: Math.abs(i - prefIdx) + 1
          };
          break;
        }
      }
    }

    if (splitSolution) {
      const fairnessSplit = calculateFairnessScore(splitSolution.seats);
      const riskSplit = calculateRiskLevel("SPLIT_FAIR", false, splitSolution.distance, fairnessSplit);

      result.alternatives.push({
        id: "ALT-02",
        title: `Alternatif 2: Distribusi Simetris 2 Baris (${splitSolution.rows})`,
        seats: splitSolution.seats,
        isContiguous: false,
        fairnessScore: fairnessSplit,
        risk: riskSplit,
        explanation: `Rombongan dibagi menjadi 2 sub-grup (${splitCount1} kursi di Baris 1, ${splitCount2} kursi di Baris 2) dengan nomor kolom sejajar agar komunikasi antar penonton tetap mudah.`
      });
    }

    // M16 & Aturan D mod 2 = 1: Urutkan Hasil Menurut Tingkat Risiko (Ascending: Low ke High)
    result.alternatives.sort((a, b) => a.risk.score - b.risk.score);
    result.recommendedAction = "Pilih salah satu alternatif solusi di bawah ini yang paling sesuai dengan toleransi risiko Anda.";
  }

  // Simpan hasil ke sessionStorage untuk diakses lintas halaman
  try {
    sessionStorage.setItem("cine_last_result", JSON.stringify(result));
    sessionStorage.setItem("cine_occupied_seats", JSON.stringify(Array.from(occupiedSeats)));
  } catch (e) {
    console.warn("Storage warning:", e);
  }

  return result;
}

/**
 * M17 Function 6: Render Peta Visual Kursi ke Container DOM
 */
function renderSeatGrid(containerId, onSeatClickCallback = null, isOccupyMode = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  CINEMA_ROWS.forEach(rowName => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";

    // Label Baris
    const labelSpan = document.createElement("span");
    labelSpan.className = "row-label";
    labelSpan.textContent = rowName;
    rowDiv.appendChild(labelSpan);

    // Kursi 1 - 8
    for (let c = 1; c <= 8; c++) {
      // Sisipkan lorong jalan (aisle) di antara kolom 4 dan 5
      if (c === 5) {
        const aisleDiv = document.createElement("div");
        aisleDiv.className = "seat-aisle";
        rowDiv.appendChild(aisleDiv);
      }

      const seatCode = rowName + c;
      const seatBtn = document.createElement("button");
      seatBtn.type = "button";
      seatBtn.className = "seat";
      seatBtn.id = "seat-" + seatCode;
      seatBtn.textContent = c;
      seatBtn.setAttribute("data-seat", seatCode);

      if (occupiedSeats.has(seatCode)) {
        seatBtn.classList.add("booked");
        seatBtn.title = `Kursi ${seatCode} (Sudah Terisi)`;
        if (!isOccupyMode) {
          seatBtn.disabled = true;
        }
      } else if (selectedSeats.has(seatCode)) {
        seatBtn.classList.add("selected");
        seatBtn.title = `Kursi ${seatCode} (Dipilih)`;
      } else {
        seatBtn.title = `Kursi ${seatCode} (Tersedia)`;
      }

      if (onSeatClickCallback) {
        if (isOccupyMode || !occupiedSeats.has(seatCode)) {
          seatBtn.addEventListener("click", () => onSeatClickCallback(seatCode));
        }
      }

      rowDiv.appendChild(seatBtn);
    }

    container.appendChild(rowDiv);
  });
}

/**
 * M17 Function 7: Timer Countdown Tenggat Lebih Pendek (C mod 3 = 2)
 * Durasi 180 detik (3 menit) pengetatan holding time
 */
function startHoldingTimer(displayElementId, onTimeoutCallback) {
  if (timerCountdown) clearInterval(timerCountdown);
  remainingSeconds = 180;

  const displayEl = document.getElementById(displayElementId);
  if (!displayEl) return;

  function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    displayEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (remainingSeconds <= 30) {
      displayEl.style.color = "#F43F5E"; // Merah peringatan
    } else {
      displayEl.style.color = "#F59E0B"; // Gold
    }
  }

  updateDisplay();

  timerCountdown = setInterval(() => {
    remainingSeconds--;
    updateDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerCountdown);
      if (onTimeoutCallback) onTimeoutCallback();
    }
  }, 1000);
}

/**
 * Toast Notification Kustom (Pengganti Alert Standar Browser)
 */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}



/* ==============================================================================
   Order History & Digital E-Ticket Management (v1.2.0)
   ============================================================================== */

let orderHistory = [];

// Inisialisasi riwayat pesanan dari localStorage
function initOrderHistory() {
  try {
    const saved = localStorage.getItem("cine_order_history");
    if (saved) {
      orderHistory = JSON.parse(saved);
    } else {
      orderHistory = [];
      localStorage.setItem("cine_order_history", JSON.stringify(orderHistory));
    }
  } catch (e) {
    orderHistory = [];
  }
}

// Generator Kode Tiket Berurutan: TKT-2901, TKT-2902, TKT-2903, dst (Seed 29)
function generateNextTicketId() {
  const baseNum = 2900;
  let maxNum = baseNum;

  orderHistory.forEach(order => {
    if (order.ticketId && order.ticketId.startsWith("TKT-")) {
      const numPart = parseInt(order.ticketId.replace("TKT-", ""), 10);
      if (!isNaN(numPart) && numPart > maxNum) {
        maxNum = numPart;
      }
    }
  });

  return "TKT-" + (maxNum + 1);
}

// Simpan Transaksi Baru ke Riwayat
function addOrderToHistory(orderData) {
  const newTicketId = generateNextTicketId();
  const newOrder = {
    ticketId: newTicketId,
    customerName: orderData.customerName,
    movieTitle: orderData.movieTitle,
    studioName: orderData.studioName,
    showtime: orderData.showtime || "19:00 WIB",
    seats: orderData.seats,
    seatCount: orderData.seats.length,
    pricePerTicket: orderData.pricePerTicket || 49500,
    totalPrice: (orderData.pricePerTicket || 49500) * orderData.seats.length,
    timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
    fairnessScore: orderData.fairnessScore || 75,
    riskCategory: orderData.riskCategory || "Low Risk"
  };

  orderHistory.unshift(newOrder); // Masukkan paling atas

  // Kunci kursi secara permanen
  orderData.seats.forEach(s => occupiedSeats.add(s));

  try {
    localStorage.setItem("cine_order_history", JSON.stringify(orderHistory));
    sessionStorage.setItem("cine_occupied_seats", JSON.stringify(Array.from(occupiedSeats)));
  } catch (e) {}

  return newOrder;
}

// Batalkan / Hapus Transaksi dari Riwayat
function deleteOrderFromHistory(ticketId) {
  const targetIdx = orderHistory.findIndex(o => o.ticketId === ticketId);
  if (targetIdx !== -1) {
    const targetOrder = orderHistory[targetIdx];
    // Lepas kursi dari status occupied
    targetOrder.seats.forEach(s => occupiedSeats.delete(s));
    orderHistory.splice(targetIdx, 1);

    try {
      localStorage.setItem("cine_order_history", JSON.stringify(orderHistory));
      sessionStorage.setItem("cine_occupied_seats", JSON.stringify(Array.from(occupiedSeats)));
    } catch (e) {}

    showToast(`Tiket ${ticketId} berhasil dibatalkan. Kursi telah dilepas.`, "info");
    return true;
  }
  return false;
}

// Render Tabel Riwayat Pemesanan ke DOM
function renderOrderHistoryTable(tableBodyId) {
  const tbody = document.getElementById(tableBodyId);
  if (!tbody) return;

  if (orderHistory.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem; color: #94A3B8;">
          Belum ada riwayat pemesanan tiket. Silakan isi formulir di atas untuk memesan tiket bioskop!
        </td>
      </tr>
    `;
    return;
  }

  let rowsHtml = "";
  orderHistory.forEach((item, idx) => {
    rowsHtml += `
      <tr>
        <td><strong>${item.ticketId}</strong></td>
        <td>
          <strong style="color: #FFF;">${item.customerName}</strong>
          <br><small style="color: #94A3B8;">Waktu: ${item.timestamp}</small>
        </td>
        <td>
          <span style="color: #F59E0B; font-weight: 600;">${item.movieTitle}</span>
          <br><small style="color: #64748B;">${item.studioName}</small>
        </td>
        <td>
          <span class="badge badge-primary">${item.seats.join(", ")}</span>
          <small style="color: #94A3B8; display: block; margin-top: 2px;">(${item.seatCount} Kursi)</small>
        </td>
        <td><strong>Rp ${Number(item.totalPrice).toLocaleString("id-ID")}</strong></td>
        <td>
          <span class="badge ${item.riskCategory === 'Low Risk' ? 'badge-success' : (item.riskCategory === 'Medium Risk' ? 'badge-info' : 'badge-danger')}">
            ${item.riskCategory}
          </span>
        </td>
        <td style="white-space: nowrap;">
          <button type="button" class="btn btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="openETicketModal('${item.ticketId}')">
            Lihat E-Tiket
          </button>
          <button type="button" class="btn btn-danger" style="padding: 0.35rem 0.65rem; font-size: 0.75rem; margin-left: 4px;" onclick="cancelBookingAction('${item.ticketId}')">
            Batal
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = rowsHtml;
}

// Tampilkan Modal E-Tiket Digital Bioskop
function openETicketModal(ticketId) {
  const order = orderHistory.find(o => o.ticketId === ticketId);
  if (!order) return;

  let modal = document.getElementById("eTicketModalBackdrop");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "eTicketModalBackdrop";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  const seatsPills = order.seats.map(s => `<span class="seat-pill">${s}</span>`).join(" ");

  modal.innerHTML = `
    <div class="e-ticket-card">
      <div class="ticket-header-strip">
        <h3>🎬 CINEDECIDE PRO</h3>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.72rem; font-weight: 700; background: rgba(0,0,0,0.15); padding: 0.2rem 0.5rem; border-radius: 4px;">E-TICKET RESMI</span>
          <button type="button" class="ticket-close-btn" onclick="closeETicketModal()" title="Tutup Tiket">&times;</button>
        </div>
      </div>

      <div class="ticket-body">
        <div>
          <div class="ticket-movie-title">${order.movieTitle}</div>
          <span style="font-size: 0.78rem; color: #F59E0B; font-weight: 600;">${order.studioName} &bull; Jam: ${order.showtime}</span>
        </div>

        <div class="ticket-grid-info">
          <div class="info-item">
            <label>NAMA PEMESAN</label>
            <span>${order.customerName}</span>
          </div>
          <div class="info-item">
            <label>KODE BOOKING (SEED 29)</label>
            <span style="color: #F59E0B;">${order.ticketId}</span>
          </div>
          <div class="info-item">
            <label>JUMLAH PENONTON</label>
            <span>${order.seatCount} Tiket</span>
          </div>
          <div class="info-item">
            <label>TOTAL BIAYA</label>
            <span style="color: #10B981;">Rp ${Number(order.totalPrice).toLocaleString("id-ID")}</span>
          </div>
        </div>

        <div>
          <label style="font-size: 0.72rem; color: #94A3B8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">
            KURSI DIALOKASIKAN:
          </label>
          <div class="ticket-seats-pillbox">
            ${seatsPills}
          </div>
        </div>

        <!-- Perforation Notch -->
        <div class="ticket-perforation">
          <div class="ticket-perforation-line"></div>
        </div>

        <!-- Barcode Simulation -->
        <div class="ticket-barcode-box">
          <div class="barcode-stripes"></div>
          <div class="barcode-text">* ${order.ticketId} - 241011401829 - UNPAM *</div>
        </div>
      </div>

      <div class="ticket-footer-actions">
        <button type="button" class="btn btn-secondary" style="flex: 1;" onclick="closeETicketModal()">
          Tutup Tiket
        </button>
        <button type="button" class="btn btn-primary" style="flex: 1;" onclick="window.print()">
          Cetak Tiket PDF
        </button>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

function closeETicketModal() {
  const modal = document.getElementById("eTicketModalBackdrop");
  if (modal) {
    modal.style.display = "none";
  }
}
