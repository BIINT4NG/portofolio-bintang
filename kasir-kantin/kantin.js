// 1. HARGA MAKANAN DAN MINUMAN

const hargaNasi = 12000;
const hargaAyam = 15000;
const hargaBakso = 10000;
const hargaMie = 10000;

const hargaEs = 4000;
const hargaJeruk = 5000;
const hargaCokelat = 6000;
const hargaAir = 3000;

// Daftar harga seluruh menu
const daftarHarga = {
    nasiGoreng: hargaNasi,
    ayamGeprek: hargaAyam,
    bakso: hargaBakso,
    mieGoreng: hargaMie,
    sateAyam: 13000,
    sateSapi: 15000,
    nasiUduk: 8000,
    sotoAyam: 12000,
    nasiAyam: 13000,
    tempeMendoan: 5000,
    pempek: 10000,
    siomay: 8000,

    esTeh: hargaEs,
    esJeruk: hargaJeruk,
    esCokelat: hargaCokelat,
    airMineral: hargaAir,
    esKopiSusu: 5000,
    kopi: 5000,
    jusAlpukat: 8000,
    susuCokelat: 5000,
    esLemonTea: 5000,
    tehHangat: 3000,
    esKelapa: 7000,
    wedangJahe: 4000
};

// Nama dan emoji menu
const namaMenu = {
    nasiGoreng: "🍛 Nasi Goreng",
    ayamGeprek: "🍗 Ayam Geprek",
    bakso: "🍲 Bakso",
    mieGoreng: "🍜 Mie Goreng",
    sateAyam: "🍖 Sate Ayam",
    sateSapi: "🥩 Sate Sapi",
    nasiUduk: "🍚 Nasi Uduk",
    sotoAyam: "🍲 Soto Ayam",
    nasiAyam: "🍱 Nasi Ayam",
    tempeMendoan: "🥟 Tempe Mendoan",
    pempek: "🐟 Pempek",
    siomay: "🥟 Siomay",

    esTeh: "🧋 Es Teh",
    esJeruk: "🍊 Es Jeruk",
    esCokelat: "🍫 Es Cokelat",
    airMineral: "💧 Air Mineral",
    esKopiSusu: "🥃 Es Kopi Susu",
    kopi: "☕ Kopi",
    jusAlpukat: "🥑 Jus Alpukat",
    susuCokelat: "🥛 Susu Cokelat",
    esLemonTea: "🍋 Es Lemon Tea",
    tehHangat: "🍵 Teh Hangat",
    esKelapa: "🥥 Es Kelapa",
    wedangJahe: "🫚 Wedang Jahe"
};


// 2. MENAMPILKAN DAFTAR MENU
console.log(`
🍛 DAFTAR MAKANAN
1. Nasi Goreng : Rp12.000
2. Ayam Geprek : Rp15.000
3. Bakso       : Rp10.000
4. Mie Goreng  : Rp10.000
5. Sate Ayam   : Rp13.000
6. Sate Sapi   : Rp15.000
7. Nasi Uduk   : Rp8.000
8. Soto Ayam   : Rp12.000
9. Nasi Ayam   : Rp13.000
10. Tempe Mendoan : Rp5.000
11. Pempek       : Rp10.000
12. Siomay       : Rp8.000

🥤 DAFTAR MINUMAN
1. Es Teh      : Rp4.000
2. Es Jeruk    : Rp5.000
3. Es Cokelat  : Rp6.000
4. Air Mineral : Rp3.000
5. Es Kopi Susu : Rp5.000
6. Kopi         : Rp5.000
7. Jus Alpukat  : Rp8.000
8. Susu Cokelat : Rp5.000
9. Es Lemon Tea : Rp5.000
10. Teh Hangat  : Rp3.000
11. Es Kelapa   : Rp7.000
12. Wedang Jahe : Rp4.000
`);


// 3. FUNGSI HITUNG TOTAL
// Sesuai soal modul
function hitungTotal(jumlahNasi, jumlahEs) {
    return (jumlahNasi * hargaNasi) +
           (jumlahEs * hargaEs);
}

// Fungsi tambahan untuk menghitung semua menu
function hitungTotalMenu(pesanan) {

    let total = hitungTotal(
        pesanan.nasiGoreng || 0,
        pesanan.esTeh || 0
    );

    for (const menu in pesanan) {

        if (menu !== "nasiGoreng" && menu !== "esTeh") {
            total += pesanan[menu] * daftarHarga[menu];
        }

    }

    return total;
}


// 4. ARROW FUNCTION HITUNG KEMBALIAN
// Sesuai soal modul
const hitungKembalian = (bayar, total) => {
    return bayar - total;
};

// 5. FUNGSI CEK PEMBAYARAN
// Menggunakan if, else if, dan else
function cekPembayaran(bayar, total) {

    if (bayar < total) {

        return `Uang kurang Rp${Math.abs(
            hitungKembalian(bayar, total)
        ).toLocaleString("id-ID")}`;

    } else if (bayar === total) {

        return "Uang pas";

    } else {

        return `Kembalian Rp${hitungKembalian(
            bayar, total
        ).toLocaleString("id-ID")}`;

    }

}


// 6. FUNGSI CETAK STRUK
function cetakStruk(nama, pesanan, bayar) {

    const total = hitungTotalMenu(pesanan);

    console.log(`
========== STRUK KASIR ==========
🏫 KANTIN SMKN 1 Pasuruan
👤 Pembeli: ${nama}

DAFTAR PESANAN:
`);

    for (const menu in pesanan) {

        const jumlah = pesanan[menu];

        if (jumlah > 0) {

            const subtotal = jumlah * daftarHarga[menu];

            console.log(
                `${namaMenu[menu]} x${jumlah} = Rp${subtotal.toLocaleString("id-ID")}`
            );

        }

    }

    console.log(`
---------------------------------
💰 Total       : Rp${total.toLocaleString("id-ID")}
💵 Uang Bayar  : Rp${bayar.toLocaleString("id-ID")}
📢 ${cekPembayaran(bayar, total)}
=================================
    `);

}


// 7. CONTOH TRANSAKSI TIGA PEMBELI


// PEMBELI 1: UANG KURANG

const pesanan1 = {
    ayamGeprek: 1,
    airMineral: 1
};

cetakStruk("Pembeli 1", pesanan1, 15000);

// PEMBELI 2: UANG PAS
const pesanan2 = {
    bakso: 1,
    esTeh: 1
};

cetakStruk("Pembeli 2", pesanan2, 14000);


// PEMBELI 3: UANG BERLEBIH
const pesanan3 = {
    nasiGoreng: 1,
    esCokelat: 1
};

cetakStruk("Pembeli 3", pesanan3, 30000);

// Tampilan Menu Dengan Cara JSON
let menu = [];

const daftarMenu = document.querySelector("#daftar-menu");
const jumlahMenu = document.querySelector("#jumlah-menu");

async function muatMenu() {
    if (jumlahMenu) {
        jumlahMenu.textContent = "Memuat menu...";
    }

    try {
        const response = await fetch("../data/menu.json");

        if (!response.ok) {
            throw new Error("Data menu gagal dimuat");
        }

        menu = await response.json();

        tampilkanMenu(menu);

    } catch (error) {
        console.error("Error:", error);

        if (jumlahMenu) {
            jumlahMenu.textContent = "Data Menu gagal dimuat.";
        }
    }
}

function buatKartu(item) {
  return `
<article class="kartu">
<span class="label">${item.kategori}</span>
<h3>${item.nama}</h3>
<h3>${item.harga}</h3>
<p>${item.deskripsi}</p>
</article>`;
}

function tampilkanMenu(daftar) {
  if (!daftarMenu) return;
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarMenu.innerHTML = semuaKartu.join("");
  if (jumlahMenu) {
    jumlahMenu.textContent = `Menampilkan ${daftar.length} dari total ${menu.length} menu`;
  }
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    document.querySelectorAll(".tombol-filter").forEach((item) => {
      item.classList.remove("aktif");
    });
    tombol.classList.add("aktif");

    if (kategori === "Semua") {
      tampilkanMenu(menu);
    } else {
      tampilkanMenu(menu.filter((item) => item.kategori === kategori));
    }
  });
}


if (daftarMenu) {
  muatMenu();
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-makanan", "Makanan");
  pasangFilter("#filter-minuman", "Minuman");
}

const kotakCariMenu = document.querySelector("#cari-menu");
if (kotakCariMenu && jumlahMenu) {
  const kartuMenu = Array.from(
    document.querySelectorAll("main .daftar-kartu .kartu")
  );

  const cariMenu = () => {
    const kataKunci = kotakCariMenu.value.trim().toLowerCase();
    const jumlahCocok = kartuMenu.filter((kartu) => {
      const bagian = kartu.closest("section");
      const kategori = bagian.querySelector("h2").textContent;
      const cocok = `${kartu.textContent} ${kategori}`
        .toLowerCase()
        .includes(kataKunci);

      kartu.hidden = !cocok;
      return cocok;
    }).length;

    document.querySelectorAll("main .daftar-kartu").forEach((daftar) => {
      const bagian = daftar.closest("section");
      bagian.hidden = !Array.from(daftar.querySelectorAll(".kartu")).some(
        (kartu) => !kartu.hidden
      );
    });

    jumlahMenu.textContent = jumlahCocok
      ? `Menampilkan ${jumlahCocok} dari ${kartuMenu.length} menu`
      : "Tidak ada menu yang cocok dengan pencarian.";
  };

  kotakCariMenu.addEventListener("input", cariMenu);
}
