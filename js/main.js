// 1. Daftar keahlian (halaman Beranda)
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");

function renderSkills(items) {
  if (!daftarSkill || !jumlahSkill) return;

  daftarSkill.innerHTML = "";
  items.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = `${skill.nama} (${skill.level})`;
    daftarSkill.appendChild(item);
  });

  jumlahSkill.textContent = `Ada ${items.length} keahlian yang sedang saya kembangkan.`;
}

async function muatKeahlian() {
  if (!daftarSkill || !jumlahSkill) return;

  jumlahSkill.textContent = "Memuat keahlian...";

  try {
    const response = await fetch("data/keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const skills = await response.json();
    if (!Array.isArray(skills)) {
      throw new Error("Format data keahlian tidak valid");
    }

    renderSkills(skills);
  } catch (error) {
    jumlahSkill.textContent = "Maaf, daftar keahlian gagal dimuat.";
    console.error("Gagal memuat keahlian:", error);
  }
}

if (daftarSkill && jumlahSkill) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(muatKeahlian, { timeout: 2000 });
  } else {
    window.addEventListener("load", muatKeahlian, { once: true });
  }
}

const tombolSuka = document.querySelector("#tombol-suka");
const jumlahSuka = document.querySelector("#jumlah-suka");
let suka = 0;
if (tombolSuka && jumlahSuka) {
  tombolSuka.addEventListener("click", () => {
    suka += 1;
    jumlahSuka.textContent = `Disukai ${suka} kali.`;
  });
}

const kotakNama = document.querySelector("#nama");
const sapaan = document.querySelector("#sapaan");
if (kotakNama && sapaan) {
  kotakNama.addEventListener("input", () => {
    sapaan.textContent = `Halo, ${kotakNama.value}!`;
  });
}

// 2. Tema gelap (semua halaman)
const tombolTema = document.querySelector("#tombol-tema");

if (tombolTema) {
  const temaTersimpan = localStorage.getItem("tema");
  if (temaTersimpan === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode Terang";
    tombolTema.setAttribute("aria-pressed", "true");
  }

  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    const temaSekarang = document.body.classList.contains("gelap") ? "gelap" : "terang";
    localStorage.setItem("tema", temaSekarang);
    tombolTema.setAttribute("aria-pressed", temaSekarang === "gelap" ? "true" : "false");
    tombolTema.textContent = temaSekarang === "gelap"
      ? "Mode Terang"
      : "Mode Gelap";
  });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan && hitungKarakter) {
  const perbaruiHitungKarakter = () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  };

  kotakPesan.addEventListener("input", perbaruiHitungKarakter);
  perbaruiHitungKarakter();
}

const formKontak = document.querySelector("#form-kontak");
const statusKontak = document.querySelector("#status-kontak");
if (formKontak && statusKontak) {
  formKontak.addEventListener("submit", (event) => {
    event.preventDefault();
    statusKontak.textContent = "Pesan berhasil dipersiapkan. Terima kasih telah menghubungi saya.";
  });
}

// 4. Daftar proyek dan filter (halaman Proyek)
const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");
const kotakCari = document.querySelector("#cari-proyek");
let proyek = daftarProyek
  ? Array.from(daftarProyek.querySelectorAll(".kartu")).map((kartu) => {
      const gambar = kartu.querySelector("img");
      const gambarWebp = kartu.querySelector("picture source");

      return {
        judul: kartu.querySelector("h3").textContent,
        kategori: kartu.querySelector(".label").textContent,
        gambar: gambar.getAttribute("src"),
        gambarWebp: gambarWebp ? gambarWebp.getAttribute("srcset") : "",
        width: gambar.getAttribute("width"),
        height: gambar.getAttribute("height"),
        alt: gambar.alt,
        deskripsi: kartu.querySelector("p").textContent,
      };
    })
  : [];
let kategoriAktif = "Semua";

function buatKartu(item) {
  const isFirstProject = item === proyek[0];
  const imageAttributes = `src="${item.gambar}" alt="${item.alt}" width="${item.width}" height="${item.height}" loading="${isFirstProject ? "eager" : "lazy"}" decoding="async" ${isFirstProject ? 'fetchpriority="high"' : ""}`;
  const image = item.gambarWebp
    ? `<picture><source srcset="${item.gambarWebp}" type="image/webp"><img ${imageAttributes}></picture>`
    : `<img ${imageAttributes}>`;

  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      ${image}
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  if (!daftarProyek || !jumlahProyek) return;

  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.length
    ? semuaKartu.join("")
    : '<p class="keterangan">Tidak ada proyek yang cocok dengan pencarian.</p>';
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function perbaruiProyek() {
  const kataKunci = kotakCari ? kotakCari.value.trim().toLowerCase() : "";
  let daftar = kategoriAktif === "Semua"
    ? proyek
    : proyek.filter((item) => item.kategori === kategoriAktif);

  if (kataKunci) {
    daftar = daftar.filter((item) =>
      `${item.judul} ${item.kategori} ${item.deskripsi}`
        .toLowerCase()
        .includes(kataKunci)
    );
  }

  tampilkanProyek(daftar);
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    const filterAktif = document.querySelector(".tombol-filter.aktif");
    if (filterAktif) {
      filterAktif.classList.remove("aktif");
      filterAktif.setAttribute("aria-pressed", "false");
    }

    tombol.classList.add("aktif");
    tombol.setAttribute("aria-pressed", "true");
    kategoriAktif = kategori;
    perbaruiProyek();
  });
}

async function muatProyek() {
  if (!daftarProyek || !jumlahProyek) return;

  jumlahProyek.textContent = "Memuat proyek...";

  try {
    const response = await fetch("data/proyek.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const dataProyek = await response.json();
    if (!Array.isArray(dataProyek)) {
      throw new Error("Format data proyek tidak valid");
    }

    const dataSesuaiHtml = dataProyek.length === proyek.length &&
      dataProyek.every((item, index) => {
        const proyekHtml = proyek[index];
        return item.judul === proyekHtml.judul &&
          item.kategori === proyekHtml.kategori &&
          item.gambar === proyekHtml.gambar &&
          (item.gambarWebp || "") === proyekHtml.gambarWebp &&
          String(item.width) === proyekHtml.width &&
          String(item.height) === proyekHtml.height &&
          item.alt === proyekHtml.alt &&
          item.deskripsi === proyekHtml.deskripsi;
      });

    proyek = dataProyek;
    if (dataSesuaiHtml && kategoriAktif === "Semua" && (!kotakCari || !kotakCari.value.trim())) {
      jumlahProyek.textContent = `Menampilkan ${proyek.length} dari ${proyek.length} proyek`;
    } else {
      perbaruiProyek();
    }
  } catch (error) {
    perbaruiProyek();
    jumlahProyek.textContent = `Menampilkan ${proyek.length} proyek dari HTML; data JSON gagal dimuat.`;
    console.error("Gagal memuat proyek dari JSON; menggunakan data HTML:", error);
  }
}

if (daftarProyek && jumlahProyek) {
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
  if (kotakCari) kotakCari.addEventListener("input", perbaruiProyek);
  jumlahProyek.textContent = `Menampilkan ${proyek.length} dari ${proyek.length} proyek`;
  muatProyek();
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "BIINT4NG";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
const tombolRepo = document.querySelector("#muat-repo");

async function ambilRepo() {
  if (!daftarRepo || !statusRepo) return;

  if (tombolRepo) tombolRepo.disabled = true;
  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) {
      throw new Error("Format respons GitHub tidak valid");
    }

    daftarRepo.innerHTML = "";

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.rel = "noreferrer";
      tautan.textContent = repo.name;
      item.appendChild(tautan);

      const detail = document.createElement("span");
      const bahasa = repo.language || "Bahasa belum tersedia";
      detail.textContent = ` - ${repo.description || "Tanpa deskripsi"} | ${bahasa} | ${repo.stargazers_count} bintang`;
      item.appendChild(detail);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent = "maaf,daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  } finally {
    if (tombolRepo) tombolRepo.disabled = false;
  }
}

if (daftarRepo && statusRepo) {
  if (tombolRepo) tombolRepo.addEventListener("click", ambilRepo);
  ambilRepo();
}

// 6. Kalkulator nilai (halaman Kalkulator)
function hitungRataRata(tugas, uts, uas) {
  return (tugas + uts + uas) / 3;
}

function predikat(rataRata) {
  if (rataRata >= 85) return "A";
  if (rataRata >= 75) return "B";
  if (rataRata >= 60) return "C";
  if (rataRata >= 50) return "D";
  return "E";
}

const inputTugas = document.querySelector("#tugas");
const inputUts = document.querySelector("#uts");
const inputUas = document.querySelector("#uas");
const tombolHitung = document.querySelector("#hitung");
const elemenHasil = document.querySelector("#hasil");
const formKalkulator = document.querySelector("#form-kalkulator");

if (inputTugas && inputUts && inputUas && tombolHitung && elemenHasil && formKalkulator) {
  formKalkulator.addEventListener("submit", (event) => {
    event.preventDefault();
    const nilaiTugas = Number(inputTugas.value);
    const nilaiUts = Number(inputUts.value);
    const nilaiUas = Number(inputUas.value);

    if (!inputTugas.value || !inputUts.value || !inputUas.value) {
      elemenHasil.textContent = "Lengkapi semua nilai terlebih dahulu.";
      return;
    }

    if ([nilaiTugas, nilaiUts, nilaiUas].some((nilai) => nilai < 0 || nilai > 100)) {
      elemenHasil.textContent = "Nilai harus berada pada rentang 0 sampai 100.";
      return;
    }

    const rataRata = hitungRataRata(nilaiTugas, nilaiUts, nilaiUas);
    elemenHasil.textContent = `Rata-rata ${rataRata.toFixed(1)}, predikat ${predikat(rataRata)}`;
  });
}

// 7. Tombol kembali ke atas (semua halaman)
const tombolKeAtas = document.querySelector("#tombol-ke-atas");

if (tombolKeAtas) {
  tombolKeAtas.addEventListener("click", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}