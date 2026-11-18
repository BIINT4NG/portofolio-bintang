// =======================================
// KASIR KANTIN SMKN 1 Pasuruan
// =======================================

console.log("🍽️ KASIR KANTIN SMKN 1 Pasuruan");


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

    esTeh: hargaEs,
    esJeruk: hargaJeruk,
    esCokelat: hargaCokelat,
    airMineral: hargaAir
};

// Nama dan emoji menu
const namaMenu = {
    nasiGoreng: "🍛 Nasi Goreng",
    ayamGeprek: "🍗 Ayam Geprek",
    bakso: "🍲 Bakso",
    mieGoreng: "🍜 Mie Goreng",

    esTeh: "🧋 Es Teh",
    esJeruk: "🍊 Es Jeruk",
    esCokelat: "🍫 Es Cokelat",
    airMineral: "💧 Air Mineral"
};


// 2. MENAMPILKAN DAFTAR MENU
console.log(`
🍛 DAFTAR MAKANAN
1. Nasi Goreng : Rp12.000
2. Ayam Geprek : Rp15.000
3. Bakso       : Rp10.000
4. Mie Goreng  : Rp10.000

🥤 DAFTAR MINUMAN
1. Es Teh      : Rp4.000
2. Es Jeruk    : Rp5.000
3. Es Cokelat  : Rp6.000
4. Air Mineral : Rp3.000
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

// Tema gelap terang
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang☀️";
    } else {
      tombolTema.textContent = "Mode Gelap🌙";
    }
  });
}
