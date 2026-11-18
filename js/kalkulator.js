// Fungsi untuk menghitung rata-rata nilai
function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

// Fungsi untuk menentukan predikat berdasarkan rata-rata
function predikat(rataRata) {
  if (rataRata >= 85) {
    return "A";
  } else if (rataRata >= 75) {
    return "B";
  } else if (rataRata >= 60) {
    return "C";
  } else if (rataRata >= 50) {
    return "D";
  } else {
    return "E";
  }
}

// Mengambil elemen DOM berdasarkan ID
const inputTugas = document.querySelector("#tugas");
const inputUts = document.querySelector("#uts");
const inputUas = document.querySelector("#uas");
const tombolHitung = document.querySelector("#hitung");
const elemenHasil = document.querySelector("#hasil");

// Event listener saat tombol "Hitung" diklik
if (inputTugas && inputUts && inputUas && tombolHitung && elemenHasil) {
  tombolHitung.addEventListener("click", () => {
    const nilaiTugas = Number(inputTugas.value);
    const nilaiUts = Number(inputUts.value);
    const nilaiUas = Number(inputUas.value);

    if (inputTugas.value === "" || inputUts.value === "" || inputUas.value === "") {
      elemenHasil.textContent = "Lengkapi semua nilai terlebih dahulu.";
      return;
    }

    if ([nilaiTugas, nilaiUts, nilaiUas].some((nilai) => nilai < 0 || nilai > 100)) {
      elemenHasil.textContent = "Nilai harus berada pada rentang 0 sampai 100.";
      return;
    }

    const rataRata = hitungRataRata(nilaiTugas, nilaiUts, nilaiUas);
    const hasilPredikat = predikat(rataRata);
    elemenHasil.textContent = `Rata-rata ${rataRata.toFixed(1)}, predikat ${hasilPredikat}`;
  });
}

// Pengujian fungsi di console (minimal 3 masukan sesuai kriteria)
console.log("Pengujian hitungRataRata:");
console.log("Uji 1 (80, 80, 80):", hitungRataRata(80, 80, 80));
console.log("Uji 2 (90, 85, 95):", hitungRataRata(90, 85, 95));
console.log("Uji 3 (60, 70, 65):", hitungRataRata(60, 70, 65));

console.log("Pengujian predikat:");
console.log("Uji 1 (88):", predikat(88));
console.log("Uji 2 (78):", predikat(78));
console.log("Uji 3 (55):", predikat(55));