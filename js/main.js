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
    daftarSkill.innerHTML = "";
    jumlahSkill.textContent = "Maaf, daftar keahlian gagal dimuat.";
    console.error("Gagal memuat keahlian:", error);
  }
}

if (daftarSkill && jumlahSkill) {
  muatKeahlian();
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
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    tombolTema.textContent = document.body.classList.contains("gelap")
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
  ? Array.from(daftarProyek.querySelectorAll(".kartu")).map((kartu) => ({
      judul: kartu.querySelector("h3").textContent,
      kategori: kartu.querySelector(".label").textContent,
      gambar: kartu.querySelector("img").getAttribute("src"),
      alt: kartu.querySelector("img").alt,
      deskripsi: kartu.querySelector("p").textContent,
    }))
  : [];
let kategoriAktif = "Semua";

function buatKartu(item) {
  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      <img src="${item.gambar}" alt="${item.alt}" width="280">
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

    proyek = dataProyek;
    perbaruiProyek();
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
  muatProyek();
}

// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "BIINT4NG";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  if (!daftarRepo || !statusRepo) return;

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
  }
}

if (daftarRepo && statusRepo) {
  ambilRepo();
}
